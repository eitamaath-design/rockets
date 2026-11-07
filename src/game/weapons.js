import * as THREE from 'three';

export class WeaponsSystem {
  constructor(scene, spaceEnv, network) {
    this.scene = scene;
    this.spaceEnv = spaceEnv;
    this.network = network;

    // Cannon parameters
    this.cannonMaxEnergy = 100.0;
    this.cannonEnergy = 100.0;
    this.cannonDrainPerSec = 28.0; // ~3.5s of continuous fire
    this.cannonShotCost = 2.8;
    this.cannonCooldownDelay = 1.0; // 1s pause before recharge starts
    this.cannonCooldownTimer = 0;
    this.cannonRechargeRate = 35.0; // units per second
    this.cannonFireInterval = 0.1; // 10 shots/sec
    this.cannonLastFireTime = 0;
    this.cannonDamage = 5.0; // 20 hits in 2.0s = 100 HP (TTK = 2.0s)
    this.cannonSpeed = 380.0;

    // Rear Mine parameters
    this.mineMaxCharges = 2;
    this.mineCharges = 2;
    this.mineRechargeTime = 5.5; // seconds per charge
    this.mineRechargeProgress = 0;
    this.mineForwardImpulse = 20.0;
    this.mineFuseTime = 3.0; // 3 seconds fuse
    this.mineDetonationRadius = 8.0;
    this.mineExplosionDamage = 50.0;
    this.mineExplosionRadius = 18.0;

    // Active projectiles, mines, and explosions
    this.projectiles = []; // { mesh, dir, speed, life, origin, isLocal, id }
    this.mines = []; // { mesh, light, pos, life, ownerId, id, isLocal }
    this.explosions = []; // { mesh, light, life, maxLife }

    // Reusable materials & geometries for performance
    this.cannonGeom = new THREE.CylinderGeometry(0.12, 0.12, 2.4, 6);
    this.cannonGeom.rotateX(Math.PI / 2);
    this.localLaserMat = new THREE.MeshBasicMaterial({ color: 0x00ffff });
    this.remoteLaserMat = new THREE.MeshBasicMaterial({ color: 0xff3344 });

    this.mineGeom = new THREE.DodecahedronGeometry(1.6, 1);
    this.mineMat = new THREE.MeshStandardMaterial({
      color: 0x222222,
      roughness: 0.3,
      metalness: 0.9,
      emissive: 0xff1100,
      emissiveIntensity: 0.4
    });

    this.listenToNetworkEvents();
  }

  listenToNetworkEvents() {
    // Remote peer fired cannon
    this.network.onCannon((data, peerId) => {
      this.spawnRemoteProjectile(data, peerId);
    });

    // Remote peer dropped mine
    this.network.onMine((data, peerId) => {
      this.spawnRemoteMine(data, peerId);
    });
  }

  triggerCannon(isHolding, ship, now) {
    if (isHolding) {
      this.cannonCooldownTimer = this.cannonCooldownDelay; // reset cooldown

      if (this.cannonEnergy >= this.cannonShotCost && (now - this.cannonLastFireTime) >= this.cannonFireInterval) {
        this.cannonLastFireTime = now;
        this.cannonEnergy = Math.max(0, this.cannonEnergy - this.cannonShotCost);

        // Fire alternating dual bolts from ship wings
        const fwd = ship.getForwardVector();
        const right = ship.getRightVector();
        const wingOffset = (Math.random() > 0.5 ? 1 : -1) * 0.9;
        const origin = ship.position.clone()
          .addScaledVector(fwd, 1.2)
          .addScaledVector(right, wingOffset)
          .add(new THREE.Vector3(0, -0.4, 0));

        const shotId = `${this.network.selfId}-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`;
        this.spawnProjectile(origin, fwd, ship.velocity, true, shotId);

        // Broadcast to mesh
        this.network.broadcastCannon({
          id: shotId,
          origin: { x: origin.x, y: origin.y, z: origin.z },
          dir: { x: fwd.x, y: fwd.y, z: fwd.z },
          vel: { x: ship.velocity.x, y: ship.velocity.y, z: ship.velocity.z },
          time: now
        });
      }
    }
  }

  triggerRearMine(ship) {
    if (this.mineCharges < 1 || ship.isDead) return false;

    this.mineCharges--;
    const fwd = ship.getForwardVector();

    // 1. Ship thrusts a bit forward
    ship.applyImpulse(fwd.clone().multiplyScalar(this.mineForwardImpulse));

    // 2. Mine is left where the ship was when fired
    const minePos = ship.position.clone().addScaledVector(fwd, -1.8);
    const mineId = `mine-${this.network.selfId}-${Date.now()}`;

    this.spawnMine(minePos, true, this.network.selfId, mineId);

    // Broadcast to peers
    this.network.broadcastMine({
      id: mineId,
      pos: { x: minePos.x, y: minePos.y, z: minePos.z },
      ownerId: this.network.selfId,
      time: Date.now()
    });

    return true;
  }

  spawnProjectile(origin, dir, initialVel, isLocal, id) {
    const mesh = new THREE.Mesh(this.cannonGeom, isLocal ? this.localLaserMat : this.remoteLaserMat);
    mesh.position.copy(origin);
    mesh.quaternion.setFromUnitVectors(new THREE.Vector3(0, 0, 1), dir);

    this.scene.add(mesh);
    this.projectiles.push({
      mesh,
      dir: dir.clone().normalize(),
      speed: this.cannonSpeed,
      initialVel: initialVel ? initialVel.clone() : new THREE.Vector3(),
      life: 1.5, // 1.5s max flight range (~570 units)
      isLocal,
      id
    });
  }

  spawnRemoteProjectile(data, peerId) {
    const origin = new THREE.Vector3(data.origin.x, data.origin.y, data.origin.z);
    const dir = new THREE.Vector3(data.dir.x, data.dir.y, data.dir.z);
    const vel = data.vel ? new THREE.Vector3(data.vel.x, data.vel.y, data.vel.z) : new THREE.Vector3();
    this.spawnProjectile(origin, dir, vel, false, data.id);
  }

  spawnMine(pos, isLocal, ownerId, id) {
    const mesh = new THREE.Mesh(this.mineGeom, this.mineMat);
    mesh.position.copy(pos);

    // Flashing red beacon point light
    const light = new THREE.PointLight(0xff2200, 2.5, 30);
    mesh.add(light);

    this.scene.add(mesh);
    this.mines.push({
      mesh,
      light,
      pos: mesh.position,
      life: this.mineFuseTime, // 3.0s fuse
      ownerId,
      isLocal,
      id
    });
  }

  spawnRemoteMine(data, peerId) {
    const pos = new THREE.Vector3(data.pos.x, data.pos.y, data.pos.z);
    this.spawnMine(pos, false, data.ownerId || peerId, data.id);
  }

  spawnExplosion(pos, radius = 12, color = 0xff6600) {
    const geom = new THREE.SphereGeometry(radius * 0.4, 12, 10);
    const mat = new THREE.MeshBasicMaterial({
      color: color,
      transparent: true,
      opacity: 0.9,
      blending: THREE.AdditiveBlending
    });
    const mesh = new THREE.Mesh(geom, mat);
    mesh.position.copy(pos);

    const light = new THREE.PointLight(color, 4.0, radius * 3.5);
    mesh.add(light);

    this.scene.add(mesh);
    this.explosions.push({
      mesh,
      light,
      maxLife: 0.45,
      life: 0.45,
      maxRadius: radius
    });
  }

  update(dt, localShip, remoteShipsMap, onDamageEvent) {
    // 1. Weapon Energy & Cooldown recharge
    if (this.cannonCooldownTimer > 0) {
      const elapsedInCooldown = Math.min(this.cannonCooldownTimer, dt);
      this.cannonCooldownTimer -= elapsedInCooldown;
      const remainingDt = dt - elapsedInCooldown;
      if (remainingDt > 0 && this.cannonEnergy < this.cannonMaxEnergy) {
        this.cannonEnergy = Math.min(this.cannonMaxEnergy, this.cannonEnergy + this.cannonRechargeRate * remainingDt);
      }
    } else {
      if (this.cannonEnergy < this.cannonMaxEnergy) {
        this.cannonEnergy = Math.min(this.cannonMaxEnergy, this.cannonEnergy + this.cannonRechargeRate * dt);
      }
    }

    // 2. Mine Charge recharge
    if (this.mineCharges < this.mineMaxCharges) {
      this.mineRechargeProgress += dt / this.mineRechargeTime;
      if (this.mineRechargeProgress >= 1.0) {
        this.mineCharges++;
        this.mineRechargeProgress = 0;
      }
    } else {
      this.mineRechargeProgress = 0;
    }

    // 3. Update Cannon Projectiles
    for (let i = this.projectiles.length - 1; i >= 0; i--) {
      const p = this.projectiles[i];
      p.life -= dt;

      // Move projectile along forward + slight initial velocity
      const move = p.dir.clone().multiplyScalar(p.speed * dt);
      p.mesh.position.add(move);

      let destroyed = false;

      // Asteroid collision
      if (this.spaceEnv.checkCollision(p.mesh.position, 1.0)) {
        this.spawnExplosion(p.mesh.position, 4, 0x00d4ff);
        destroyed = true;
      }

      // Check hits on local player (if projectile is from remote peer)
      if (!destroyed && !p.isLocal && !localShip.isDead && localShip.invulnerableTimer <= 0) {
        if (p.mesh.position.distanceToSquared(localShip.position) < 16.0) { // radius ~4
          this.spawnExplosion(p.mesh.position, 6, 0xff2200);
          localShip.takeDamage(this.cannonDamage);
          if (onDamageEvent) onDamageEvent(this.cannonDamage, 'cannon', null);
          destroyed = true;
        }
      }

      // Check hits on remote players (if projectile is from local player)
      if (!destroyed && p.isLocal) {
        for (const [peerId, remote] of remoteShipsMap.entries()) {
          if (!remote.isDead && p.mesh.position.distanceToSquared(remote.position) < 16.0) {
            this.spawnExplosion(p.mesh.position, 6, 0x00ffff);
            this.network.sendHitTarget(peerId, this.cannonDamage, 'cannon');
            destroyed = true;
            break;
          }
        }
      }

      if (destroyed || p.life <= 0) {
        this.scene.remove(p.mesh);
        this.projectiles.splice(i, 1);
      }
    }

    // 4. Update Rear Mines
    for (let i = this.mines.length - 1; i >= 0; i--) {
      const m = this.mines[i];
      m.life -= dt;

      // Pulse beacon light and spin
      m.mesh.rotation.y += dt * 2.0;
      m.mesh.rotation.x += dt * 1.5;
      const flash = Math.sin(m.life * 12.0) > 0;
      m.light.intensity = flash ? 3.5 : 0.8;

      let shouldDetonate = false;
      let detonationReason = 'timer';

      // "Mines explode on impact with any player, or after 3 seconds."
      // Check collision with local ship (with 0.6s arming grace for the owner)
      const isOwnerGrace = (m.isLocal && m.life > (this.mineFuseTime - 0.6));
      if (!localShip.isDead && !isOwnerGrace) {
        const dLocalSq = m.pos.distanceToSquared(localShip.position);
        if (dLocalSq <= this.mineDetonationRadius * this.mineDetonationRadius) {
          shouldDetonate = true;
          detonationReason = 'impact-local';
        }
      }

      // Check collision with remote ships
      if (!shouldDetonate) {
        for (const [peerId, remote] of remoteShipsMap.entries()) {
          if (!remote.isDead && m.pos.distanceToSquared(remote.position) <= this.mineDetonationRadius * this.mineDetonationRadius) {
            shouldDetonate = true;
            detonationReason = `impact-${peerId}`;
            break;
          }
        }
      }

      // Check 3-second fuse expiration
      if (m.life <= 0) {
        shouldDetonate = true;
        detonationReason = 'expired';
      }

      if (shouldDetonate) {
        // Mine Detonation!
        this.spawnExplosion(m.pos, this.mineExplosionRadius, 0xff4400);

        // Calculate area blast damage and shockwave impulse on local player
        if (!localShip.isDead && localShip.invulnerableTimer <= 0) {
          const distToLocal = m.pos.distanceTo(localShip.position);
          if (distToLocal <= this.mineExplosionRadius) {
            const damageRatio = 1.0 - (distToLocal / this.mineExplosionRadius);
            const actualDamage = Math.round(this.mineExplosionDamage * damageRatio);
            localShip.takeDamage(actualDamage);

            // Knockback impulse
            const knockDir = localShip.position.clone().sub(m.pos).normalize();
            localShip.applyImpulse(knockDir.multiplyScalar(25 * damageRatio));

            if (onDamageEvent) onDamageEvent(actualDamage, 'mine', m.ownerId);
          }
        }

        // If local player owned the mine, notify any remote peers hit in blast radius
        if (m.isLocal) {
          for (const [peerId, remote] of remoteShipsMap.entries()) {
            if (!remote.isDead) {
              const distToRemote = m.pos.distanceTo(remote.position);
              if (distToRemote <= this.mineExplosionRadius) {
                const damageRatio = 1.0 - (distToRemote / this.mineExplosionRadius);
                const actualDamage = Math.round(this.mineExplosionDamage * damageRatio);
                this.network.sendHitTarget(peerId, actualDamage, 'mine');
              }
            }
          }
        }

        this.scene.remove(m.mesh);
        this.mines.splice(i, 1);
      }
    }

    // 5. Update Explosions
    for (let i = this.explosions.length - 1; i >= 0; i--) {
      const e = this.explosions[i];
      e.life -= dt;
      const progress = 1.0 - (e.life / e.maxLife);
      const scale = 1.0 + progress * 2.5;
      e.mesh.scale.set(scale, scale, scale);
      e.mesh.material.opacity = Math.max(0, 1.0 - progress);
      e.light.intensity = Math.max(0, (1.0 - progress) * 4.0);

      if (e.life <= 0) {
        this.scene.remove(e.mesh);
        this.explosions.splice(i, 1);
      }
    }
  }

  cleanup() {
    for (const p of this.projectiles) this.scene.remove(p.mesh);
    for (const m of this.mines) this.scene.remove(m.mesh);
    for (const e of this.explosions) this.scene.remove(e.mesh);
    this.projectiles = [];
    this.mines = [];
    this.explosions = [];
  }
}
