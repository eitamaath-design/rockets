import * as THREE from 'three';
import { audio } from './audio.js';
import { logger } from '../utils/logger.js';

export const POWERUP_TYPES = {
  SHIELD_REPAIR: 'shield_repair',
  INVISIBILITY: 'invisibility',
  HOLOGRAM_CLONE: 'hologram_clone',
  FIRE_LASER: 'fire_laser'
};

/**
 * Procedural Space Power-Up System
 * Randomly spawns valuable tactical power-ups across the asteroid field every 10 seconds.
 * Power-ups remain in space for exactly 1 minute (60s) before despawning.
 */
export class PowerUpSystem {
  constructor(scene, blackHoleSystem = null) {
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

    // Distribute powerups across the Keplerian orbital belt (R in [3300, 5200], Y in [-200, 200])
    const angle = Math.random() * Math.PI * 2;
    const r = 3300 + Math.random() * 1900;
    const pos = new THREE.Vector3(
      Math.cos(angle) * r,
      (Math.random() - 0.5) * 400.0,
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

  /**
   * Spawns a collectible Fire Laser upgrade inside a newly blasted Mega-Asteroid crater basin.
   */
  spawnCraterPowerUp(pos, options = {}) {
    const lifetime = options.lifetime || 120.0; // 2 minutes in crater
    const group = new THREE.Group();
    group.position.copy(pos);

    // Glowing blazing core orb
    const coreMat = new THREE.MeshBasicMaterial({
      color: 0xff3300,
      transparent: true,
      opacity: 0.95,
      blending: THREE.AdditiveBlending
    });
    const coreMesh = new THREE.Mesh(this.orbGeom, coreMat);
    group.add(coreMesh);

    // Fiery golden spinning ring
    const ringMat = new THREE.MeshBasicMaterial({
      color: 0xffaa00,
      wireframe: true,
      transparent: true,
      opacity: 0.85,
      blending: THREE.AdditiveBlending
    });
    const ringMesh = new THREE.Mesh(this.ringGeom, ringMat);
    group.add(ringMesh);

    // Inner floating fire glyph
    const iconMat = new THREE.MeshBasicMaterial({
      color: 0xffffff,
      wireframe: true
    });
    const iconMesh = new THREE.Mesh(this.iconGeom, iconMat);
    group.add(iconMesh);

    this.scene.add(group);

    const powerupObj = {
      group,
      coreMesh,
      ringMesh,
      iconMesh,
      type: POWERUP_TYPES.FIRE_LASER,
      name: 'Fire Laser',
      pos: pos.clone(),
      life: lifetime,
      maxLife: lifetime,
      initialY: pos.y,
      seed: Math.random() * 10.0,
      isCraterPowerUp: true
    };
    this.powerups.push(powerupObj);

    logger.log('POWERUP', `Spawned [Fire Laser] in crater basin at (${Math.round(pos.x)}, ${Math.round(pos.y)}, ${Math.round(pos.z)})`);
    return powerupObj;
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
    if (type === POWERUP_TYPES.FIRE_LASER) {
      if (typeof ship.activateFireLaser === 'function') {
        ship.activateFireLaser(75.0);
      }
      logger.log('POWERUP', 'Collected Fire Laser! Upgraded lasers with 1.75x damage, flame beams, and enhanced crater excavation');
      if (callback) callback('🔥 FIRE LASER UPGRADE ARMED! 1.75x DAMAGE & FLAME EXCAVATION');
      return;
    }

    let name = 'Special';
    let icon = '✨';
    let color = '#00ffff';

    switch (type) {
      case POWERUP_TYPES.SHIELD_REPAIR:
        name = 'REPAIR SHIELD';
        icon = '🛡️';
        color = '#00d4ff';
        break;
      case POWERUP_TYPES.INVISIBILITY:
        name = 'CLOAK';
        icon = '👁️';
        color = '#c084fc';
        break;
      case POWERUP_TYPES.HOLOGRAM_CLONE:
        name = 'DECOY CLONE';
        icon = '👥';
        color = '#00ff88';
        break;
    }

    ship.storedPowerUp = { type, name, icon, color };
    logger.log('POWERUP', `Collected and stored [${name}] in Special slot`);
    if (callback) callback(`✨ ${icon} ${name} ARMED! PRESS [R] OR SPECIAL BUTTON TO USE`);
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
