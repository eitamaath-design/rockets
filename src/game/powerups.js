import * as THREE from 'three';
import { audio } from './audio.js';
import { logger } from '../utils/logger.js';

export const POWERUP_TYPES = {
  SHIELD_REPAIR: 'shield_repair',
  INVISIBILITY: 'invisibility',
  HOLOGRAM_CLONE: 'hologram_clone'
};

/**
 * Procedural Space Power-Up System
 * Randomly spawns valuable tactical power-ups across the asteroid field every 10 seconds.
 * Power-ups remain in space for exactly 1 minute (60s) before despawning.
 */
export class PowerUpSystem {
  constructor(scene, blackHoleSystem) {
    this.scene = scene;
    this.blackHoleSystem = blackHoleSystem;

    this.spawnInterval = 10.0; // Spawns every 10 seconds
    this.spawnTimer = 2.0; // First powerup spawns 2s after match start
    this.itemLifetime = 60.0; // Remains for 1 minute

    this.powerups = []; // Array of active power-up entities
    this.maxConcurrent = 12;

    // Shared reusable geometries
    this.orbGeom = new THREE.IcosahedronGeometry(3.2, 2);
    this.ringGeom = new THREE.TorusGeometry(4.5, 0.25, 8, 24);
    this.iconGeom = new THREE.BoxGeometry(1.6, 1.6, 1.6);
  }

  spawnPowerUp() {
    if (this.powerups.length >= this.maxConcurrent) return;

    // Determine spawn coordinate within current safe zone
    const safeRadius = this.blackHoleSystem ? this.blackHoleSystem.getSafeRadius() * 0.75 : 600;
    const angle = Math.random() * Math.PI * 2;
    const r = 80 + Math.random() * safeRadius;
    const pos = new THREE.Vector3(
      Math.cos(angle) * r,
      (Math.random() - 0.5) * 160.0,
      Math.sin(angle) * r
    );

    // Choose random powerup type
    const roll = Math.random();
    let type = POWERUP_TYPES.SHIELD_REPAIR;
    let color = 0x00ffff; // Cyan shield
    let name = 'Shield Repair';

    if (roll < 0.36) {
      type = POWERUP_TYPES.SHIELD_REPAIR;
      color = 0x00ffcc;
      name = 'Shield Replenish';
    } else if (roll < 0.68) {
      type = POWERUP_TYPES.INVISIBILITY;
      color = 0xcc22ff; // Violet stealth
      name = 'Cloaking Device';
    } else {
      type = POWERUP_TYPES.HOLOGRAM_CLONE;
      color = 0x00ff66; // Emerald hologram
      name = 'Hologram Decoy';
    }

    const group = new THREE.Group();
    group.position.copy(pos);

    // 1. Glowing central core orb
    const coreMat = new THREE.MeshBasicMaterial({
      color,
      transparent: true,
      opacity: 0.85,
      blending: THREE.AdditiveBlending
    });
    const coreMesh = new THREE.Mesh(this.orbGeom, coreMat);
    group.add(coreMesh);

    // 2. Orbiting gyroscopic halo ring
    const ringMat = new THREE.MeshBasicMaterial({
      color,
      wireframe: true,
      transparent: true,
      opacity: 0.75,
      blending: THREE.AdditiveBlending
    });
    const ringMesh = new THREE.Mesh(this.ringGeom, ringMat);
    group.add(ringMesh);

    // 3. Central floating icon glyph
    const iconMat = new THREE.MeshBasicMaterial({
      color: 0xffffff,
      wireframe: true
    });
    const iconMesh = new THREE.Mesh(this.iconGeom, iconMat);
    group.add(iconMesh);

    this.scene.add(group);

    this.powerups.push({
      group,
      coreMesh,
      ringMesh,
      iconMesh,
      type,
      name,
      pos,
      life: this.itemLifetime,
      maxLife: this.itemLifetime,
      initialY: pos.y,
      seed: Math.random() * 10.0
    });

    logger.log('POWERUP', `Spawned [${name}] at (${Math.round(pos.x)}, ${Math.round(pos.y)}, ${Math.round(pos.z)})`);
  }

  update(dt, playerShip, onPowerUpCollected) {
    // 1. Spawn timer
    this.spawnTimer += dt;
    if (this.spawnTimer >= this.spawnInterval) {
      this.spawnTimer = 0;
      this.spawnPowerUp();
    }

    // 2. Update active power-ups
    for (let i = this.powerups.length - 1; i >= 0; i--) {
      const p = this.powerups[i];
      p.life -= dt;

      // Despawn after 1 minute (60s)
      if (p.life <= 0) {
        this.scene.remove(p.group);
        this.powerups.splice(i, 1);
        continue;
      }

      // Gentle floating levitation & spin
      const age = p.maxLife - p.life;
      p.group.rotation.y += dt * 1.6;
      p.ringMesh.rotation.x += dt * 2.4;
      p.ringMesh.rotation.z += dt * 1.8;
      p.iconMesh.rotation.y -= dt * 3.0;
      p.group.position.y = p.initialY + Math.sin(age * 2.5 + p.seed) * 3.5;

      // Pulsing glow as lifetime nears expiration
      if (p.life < 10.0) {
        const flash = (Math.sin(age * 12.0) + 1.0) * 0.5;
        p.coreMesh.material.opacity = 0.3 + flash * 0.6;
      }

      // 3. Collection Check with Player Ship
      if (playerShip && !playerShip.isDead) {
        const distSq = playerShip.position.distanceToSquared(p.group.position);
        const pickupRadius = 8.0;

        if (distSq <= pickupRadius * pickupRadius) {
          // Player collected powerup!
          this.applyPowerUp(p.type, playerShip, onPowerUpCollected);
          audio.playScoreChime();

          this.scene.remove(p.group);
          this.powerups.splice(i, 1);
        }
      }
    }
  }

  applyPowerUp(type, ship, callback) {
    switch (type) {
      case POWERUP_TYPES.SHIELD_REPAIR:
        // Fully restore shield and reset broken state
        ship.shield = ship.maxShield;
        ship.isShieldBroken = false;
        logger.log('POWERUP', 'Collected: Shield Replenish! Shield restored to 100%');
        if (callback) callback('🛡️ SHIELD REPLENISHED: 100%');
        break;

      case POWERUP_TYPES.INVISIBILITY:
        // Cloaking: 60 seconds of complete invisibility (breaks on weapon fire)
        ship.isInvisible = true;
        ship.invisibilityTimer = 60.0;
        logger.log('POWERUP', 'Collected: Invisibility! Ship cloaked for 60 seconds');
        if (callback) callback('👁️ CLOAK ACTIVATED (1 MINUTE)');
        break;

      case POWERUP_TYPES.HOLOGRAM_CLONE:
        // Grants decoy clone deployment
        ship.hasHologramDecoy = true;
        logger.log('POWERUP', 'Collected: Hologram Decoy Clone!');
        if (callback) callback('👥 HOLOGRAM CLONE READY (FIRE TO DEPLOY)');
        break;
    }
  }

  cleanup() {
    for (const p of this.powerups) {
      this.scene.remove(p.group);
    }
    this.powerups = [];
    this.orbGeom.dispose();
    this.ringGeom.dispose();
    this.iconGeom.dispose();
  }
}
