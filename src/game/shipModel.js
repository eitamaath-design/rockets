import * as THREE from 'three';
import { clamp } from '../utils/math.js';

// Module-scoped scratch objects to guarantee zero per-frame heap allocation during vibration
const _twistEuler = new THREE.Euler();
const _twistQuat = new THREE.Quaternion();

/**
 * Creates a high-fidelity 12-component starfighter replica group scaled 5x
 * matching the exact geometry of the starfighter hull (length 28.0u, wingspan 29.0u, radius 14.0u).
 * 
 * Used for predictive blink landing holograms and tactical hologram decoy clones.
 * 
 * @param {Object} options
 * @param {string} [options.mode='hologram'] - 'hologram' | 'blink' | 'decoy' | 'solid'
 * @param {number} [options.color=0x00ffff] - Base hex color
 * @param {number} [options.translucency=80] - Translucency percentage [10, 95] (80% = 0.20 base opacity)
 * @param {number} [options.scale=5.0] - Base scale factor
 * @param {boolean} [options.wireframe] - Explicit wireframe override
 * @returns {THREE.Group}
 */
export function createShipReplicaGroup(options = {}) {
  const mode = options.mode || 'hologram';
  const color = options.color !== undefined ? options.color : (mode === 'decoy' ? 0x00ffff : 0x00ffff);
  const baseScale = options.scale !== undefined ? options.scale : 5.0;
  const isHolo = mode === 'hologram' || mode === 'blink' || mode === 'decoy';

  const rawTranslucency = options.translucency !== undefined ? options.translucency : 80;
  const translucency = clamp(Number(rawTranslucency) || 80, 10, 95);
  let baseOpacity = clamp((100 - translucency) / 100, 0.05, 0.90);

  const wireframe = options.wireframe !== undefined ? options.wireframe : isHolo;

  const group = new THREE.Group();
  const materials = [];

  // Create materials according to mode
  let primaryMat;
  let accentMat;
  let flareMat;

  if (isHolo) {
    primaryMat = new THREE.MeshBasicMaterial({
      color,
      wireframe,
      transparent: true,
      opacity: baseOpacity,
      blending: THREE.AdditiveBlending,
      depthWrite: false
    });
    materials.push(primaryMat);

    accentMat = new THREE.MeshBasicMaterial({
      color: 0x00e5ff,
      wireframe,
      transparent: true,
      opacity: baseOpacity,
      blending: THREE.AdditiveBlending,
      depthWrite: false
    });
    materials.push(accentMat);

    flareMat = new THREE.MeshBasicMaterial({
      color: 0x00c8ff,
      wireframe: false,
      transparent: true,
      opacity: baseOpacity,
      blending: THREE.AdditiveBlending,
      depthWrite: false
    });
    materials.push(flareMat);
  } else {
    primaryMat = new THREE.MeshStandardMaterial({
      color: 0x9e2424,
      roughness: 0.35,
      metalness: 0.85,
      flatShading: true
    });
    materials.push(primaryMat);

    accentMat = new THREE.MeshStandardMaterial({
      color: 0x181c24,
      roughness: 0.45,
      metalness: 0.80,
      flatShading: true
    });
    materials.push(accentMat);

    flareMat = new THREE.MeshBasicMaterial({
      color: 0x00c8ff,
      transparent: true,
      opacity: 0.90,
      blending: THREE.AdditiveBlending
    });
    materials.push(flareMat);
  }

  // 1. Chiseled Forward Stealth Nosecone
  const noseGeom = new THREE.ConeGeometry(0.75, 2.6, 5);
  noseGeom.rotateX(-Math.PI / 2);
  const nose = new THREE.Mesh(noseGeom, primaryMat);
  nose.position.set(0, 0, -2.1);
  group.add(nose);

  // 2. Forward Canard Wings
  const canardGeom = new THREE.BoxGeometry(1.8, 0.04, 0.6);
  const canards = new THREE.Mesh(canardGeom, accentMat);
  canards.position.set(0, 0.05, -1.5);
  group.add(canards);

  // 3. Main Center Hull Chassis / Fuselage
  const hullGeom = new THREE.BoxGeometry(1.4, 0.8, 3.2);
  const mainHull = new THREE.Mesh(hullGeom, primaryMat);
  mainHull.position.set(0, 0, 0.2);
  group.add(mainHull);

  // 4. Lateral Recessed Plasma Intake Cowlings (left & right)
  const intakeGeom = new THREE.BoxGeometry(0.35, 0.55, 1.8);
  const leftIntake = new THREE.Mesh(intakeGeom, accentMat);
  leftIntake.position.set(-0.85, -0.05, 0.1);
  group.add(leftIntake);

  const rightIntake = leftIntake.clone();
  rightIntake.position.set(0.85, -0.05, 0.1);
  group.add(rightIntake);

  // 5. Faceted Stealth Cockpit Canopy
  const canopyGeom = new THREE.ConeGeometry(0.48, 1.8, 5);
  canopyGeom.rotateX(-Math.PI / 2);
  const canopy = new THREE.Mesh(canopyGeom, isHolo ? accentMat : primaryMat);
  canopy.position.set(0, 0.44, -0.4);
  group.add(canopy);

  // 6. Swept Compound Delta Wings
  const wingGeom = new THREE.BoxGeometry(5.8, 0.08, 2.0);
  const wing = new THREE.Mesh(wingGeom, primaryMat);
  wing.position.set(0, -0.08, 0.6);
  group.add(wing);

  // 7. Underwing Heavy Plasma Cannon Pods (left & right)
  const podGeom = new THREE.CylinderGeometry(0.10, 0.12, 1.6, 8);
  podGeom.rotateX(Math.PI / 2);
  const leftPod = new THREE.Mesh(podGeom, accentMat);
  leftPod.position.set(-1.8, -0.22, 0.3);
  group.add(leftPod);

  const rightPod = leftPod.clone();
  rightPod.position.set(1.8, -0.22, 0.3);
  group.add(rightPod);

  // 8. Wingtip Plasma Accelerator Rings (left & right)
  const ringGeom = new THREE.TorusGeometry(0.12, 0.02, 6, 12);
  const leftRing = new THREE.Mesh(ringGeom, accentMat);
  leftRing.position.set(-1.8, -0.22, -0.5);
  group.add(leftRing);

  const rightRing = leftRing.clone();
  rightRing.position.set(1.8, -0.22, -0.5);
  group.add(rightRing);

  // 9. Twin Canted Vertical Stabilizer Tailfins (Stealth V-Tail)
  const finGeom = new THREE.BoxGeometry(0.08, 1.25, 1.2);
  const leftFin = new THREE.Mesh(finGeom, accentMat);
  leftFin.position.set(-0.65, 0.62, 1.2);
  leftFin.rotation.z = -0.32;
  group.add(leftFin);

  const rightFin = leftFin.clone();
  rightFin.position.set(0.65, 0.62, 1.2);
  rightFin.rotation.z = 0.32;
  group.add(rightFin);

  // 10. Dual Heavy Ion Thruster Nozzles (left & right)
  const nozzleGeom = new THREE.CylinderGeometry(0.32, 0.42, 0.75, 10);
  nozzleGeom.rotateX(Math.PI / 2);
  const leftNozzle = new THREE.Mesh(nozzleGeom, accentMat);
  leftNozzle.position.set(-0.48, 0, 1.95);
  group.add(leftNozzle);

  const rightNozzle = leftNozzle.clone();
  rightNozzle.position.set(0.48, 0, 1.95);
  group.add(rightNozzle);

  // 11. Glowing Ion Thruster Exhaust Coils (left & right)
  const nozzleRingGeom = new THREE.TorusGeometry(0.30, 0.03, 6, 12);
  const leftNozzleRing = new THREE.Mesh(nozzleRingGeom, accentMat);
  leftNozzleRing.position.set(-0.48, 0, 2.32);
  group.add(leftNozzleRing);

  const rightNozzleRing = leftNozzleRing.clone();
  rightNozzleRing.position.set(0.48, 0, 2.32);
  group.add(rightNozzleRing);

  // 12. Thruster Exhaust Flares & Core Nozzle Beacons (left & right)
  const flareGeom = new THREE.ConeGeometry(0.32, 2.6, 8);
  flareGeom.rotateX(-Math.PI / 2);
  const leftFlare = new THREE.Mesh(flareGeom, flareMat);
  leftFlare.position.set(-0.48, 0, 3.6);
  group.add(leftFlare);

  const rightFlare = leftFlare.clone();
  rightFlare.position.set(0.48, 0, 3.6);
  group.add(rightFlare);

  const coreFlareGeom = new THREE.SphereGeometry(0.55, 8, 8);
  const leftCoreFlare = new THREE.Mesh(coreFlareGeom, flareMat);
  leftCoreFlare.position.set(-0.48, 0, 2.35);
  group.add(leftCoreFlare);

  const rightCoreFlare = leftCoreFlare.clone();
  rightCoreFlare.position.set(0.48, 0, 2.35);
  group.add(rightCoreFlare);

  // Set initial base scale
  group.scale.set(baseScale, baseScale, baseScale);

  // Expose userData helpers
  group.userData = {
    mode,
    baseScale,
    translucency,
    baseOpacity,
    materials,
    /**
     * Dynamically updates translucency percentage and child materials
     * @param {number} val - Translucency [10, 95]
     */
    setTranslucency(val) {
      const clamped = clamp(Number(val) || 80, 10, 95);
      group.userData.translucency = clamped;
      group.userData.baseOpacity = clamp((100 - clamped) / 100, 0.05, 0.90);
      for (const mat of group.userData.materials) {
        if (mat && mat.opacity !== undefined) {
          mat.opacity = group.userData.baseOpacity;
        }
      }
    },
    /**
     * Real-time vibrating focus during warp charging:
     * Spatial micro-jitter, out-of-focus scale/angular oscillation, and dynamic opacity shimmer.
     * 
     * @param {THREE.Vector3} landingPos - Target landing position
     * @param {THREE.Quaternion} playerQuat - Ship orientation quaternion
     * @param {number} chargeRatio - Warp charge ratio [0.0, 1.0]
     * @param {number} time - Current timestamp in seconds (or performance.now() in ms)
     */
    updateVibration(landingPos, playerQuat, chargeRatio, time = 0) {
      const t = time > 100000 ? time / 1000 : time;
      const bScale = group.userData.baseScale || 5.0;

      if (chargeRatio > 0) {
        // 1. Spatial micro-jitter
        const amp = 0.25 + 1.25 * chargeRatio;
        const dx = Math.sin(73.0 * t) * amp;
        const dy = Math.cos(89.0 * t) * amp * 0.8;
        const dz = Math.sin(97.0 * t) * amp * 0.6;
        group.position.set(landingPos.x + dx, landingPos.y + dy, landingPos.z + dz);

        // 2. Out-of-focus scale oscillation
        const sFactor = 1.0 + Math.sin(45.0 * t) * (0.04 + 0.12 * chargeRatio);
        const s = bScale * sFactor;
        group.scale.set(s, s, s);

        // 3. Angular twist oscillation
        const roll = Math.sin(53.0 * t) * (0.02 + 0.07 * chargeRatio);
        const yaw = Math.cos(61.0 * t) * (0.015 + 0.05 * chargeRatio);
        _twistEuler.set(0, yaw, roll, 'YXZ');
        _twistQuat.setFromEuler(_twistEuler);
        group.quaternion.copy(playerQuat).multiply(_twistQuat);

        // 4. Dynamic opacity shimmer
        const shimmerOpacity = clamp(
          group.userData.baseOpacity * (1.0 + Math.sin(37.0 * t) * (0.20 + 0.40 * chargeRatio)),
          0.02,
          1.0
        );
        for (const mat of group.userData.materials) {
          if (mat && mat.opacity !== undefined) {
            mat.opacity = shimmerOpacity;
          }
        }
      } else {
        // Reset to exact landing state
        group.position.copy(landingPos);
        group.quaternion.copy(playerQuat);
        group.scale.set(bScale, bScale, bScale);
        for (const mat of group.userData.materials) {
          if (mat && mat.opacity !== undefined) {
            mat.opacity = group.userData.baseOpacity;
          }
        }
      }
    }
  };

  return group;
}

/**
 * Alias for createShipReplicaGroup
 */
export function createStarfighterReplica(options = {}) {
  return createShipReplicaGroup(options);
}
