import * as THREE from 'three';
import { MarchingCubes } from 'three/examples/jsm/objects/MarchingCubes.js';
import { createPRNG } from '../utils/math.js';
import { audio } from './audio.js';

/**
 * Creates a circular soft glow texture so point particles render as
 * smooth celestial orbs instead of hard square pixel blocks on any GPU.
 */
function createGlowPointTexture() {
  if (typeof document === 'undefined') return null;
  try {
    const canvas = document.createElement('canvas');
    canvas.width = 64;
    canvas.height = 64;
    const ctx = canvas.getContext('2d');
    if (!ctx) return null;

    const grad = ctx.createRadialGradient(32, 32, 0, 32, 32, 32);
    grad.addColorStop(0.0, 'rgba(255, 255, 255, 1)');
    grad.addColorStop(0.25, 'rgba(235, 245, 255, 0.85)');
    grad.addColorStop(0.55, 'rgba(160, 205, 255, 0.35)');
    grad.addColorStop(0.85, 'rgba(100, 150, 255, 0.08)');
    grad.addColorStop(1.0, 'rgba(0, 0, 0, 0)');

    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, 64, 64);

    const texture = new THREE.CanvasTexture(canvas);
    texture.generateMipmaps = true;
    return texture;
  } catch (_) {
    return null;
  }
}

/**
 * Creates high-frequency procedural rock surface micro-texture for realistic
 * stony roughness and elevation grain without visible polygon facets.
 */
function createRockBumpTexture() {
  if (typeof document === 'undefined') return null;
  try {
    const canvas = document.createElement('canvas');
    canvas.width = 256;
    canvas.height = 256;
    const ctx = canvas.getContext('2d');
    if (!ctx) return null;

    const imgData = ctx.createImageData(256, 256);
    const data = imgData.data;

    for (let y = 0; y < 256; y++) {
      for (let x = 0; x < 256; x++) {
        const idx = (y * 256 + x) * 4;
        const nx = x / 256;
        const ny = y / 256;

        const n = Math.sin(nx * 32.0) * Math.cos(ny * 32.0) * 0.35 +
                  Math.sin(nx * 64.0 + ny * 48.0) * 0.25 +
                  Math.sin(nx * 128.0 - ny * 96.0) * 0.15;
        const grit = (Math.random() - 0.5) * 0.25;
        const val = Math.floor(Math.min(255, Math.max(0, (n + grit + 0.5) * 255)));

        data[idx] = val;
        data[idx + 1] = val;
        data[idx + 2] = val;
        data[idx + 3] = 255;
      }
    }

    ctx.putImageData(imgData, 0, 0);
    const texture = new THREE.CanvasTexture(canvas);
    texture.wrapS = THREE.RepeatWrapping;
    texture.wrapT = THREE.RepeatWrapping;
    texture.repeat.set(4, 4);
    return texture;
  } catch (_) {
    return null;
  }
}

export class SpaceEnvironment {
  constructor(scene, mapSeed = 42, options = {}) {
    this.scene = scene;
    this.mapSeed = mapSeed;
    this.options = {
      voxelQuality: 'low',
      asteroidCount: 100,
      megaRadius: 2800,
      ...options
    };

    this.voxelQuality = this.options.voxelQuality || 'low';
    this.asteroidCount = this.options.asteroidCount !== undefined ? this.options.asteroidCount : 100;
    this.megaRadius = this.options.megaRadius !== undefined ? this.options.megaRadius : 2800;

    const QUALITY_RES = { low: 32, medium: 48, high: 64 };
    this.megaResolution = QUALITY_RES[this.voxelQuality] || 32;

    this.asteroids = []; // { mesh, mc, radius, position, rotationSpeed, boundingSphere }
    this.asteroidGroup = new THREE.Group();
    this.debrisList = [];

    this.init();
  }

  init() {
    this.setupLighting();
    this.createStarfield();
    this.createAsteroidField();
  }

  setupLighting() {
    // Soft cosmic hemisphere light (bright sky, subtle ground bounce)
    const hemiLight = new THREE.HemisphereLight(0x557799, 0x1a2433, 1.8);
    this.scene.add(hemiLight);

    // Cosmic ambient light
    const ambient = new THREE.AmbientLight(0x3a4b5c, 1.4);
    this.scene.add(ambient);

    // Primary bright directional sunlight casting strong crater shadows
    const sunLight = new THREE.DirectionalLight(0xfff6ea, 3.4);
    sunLight.position.set(3500, 2500, 3000);
    this.scene.add(sunLight);

    // Secondary cyan/blue rim light from opposite angle
    const rimLight = new THREE.DirectionalLight(0x00b4ff, 2.0);
    rimLight.position.set(-3000, -2000, -3000);
    this.scene.add(rimLight);

    // Warm foreground point light illuminating orbital player spawn area
    const spawnLight = new THREE.PointLight(0xffeedd, 3.5, 2500);
    spawnLight.position.set(0, 120, 3200);
    this.scene.add(spawnLight);

    // Permanent combat flash point light (pre-allocated to eliminate WebGL shader recompilations)
    this.combatFlashLight = new THREE.PointLight(0xff6600, 0.0, 160);
    this.combatFlashLight.position.set(0, 0, 0);
    this.scene.add(this.combatFlashLight);

    // Permanent meteor hazard light (pre-allocated to eliminate WebGL shader recompilations)
    this.meteorLight = new THREE.PointLight(0xff3300, 0.0, 450);
    this.meteorLight.position.set(0, 0, 0);
    this.scene.add(this.meteorLight);
  }

  createStarfield() {
    // Distant celestial sphere (r = 7500-8500) - completely surrounding the planetary sector.
    const starCount = 500;
    const geometry = new THREE.BufferGeometry();
    const positions = new Float32Array(starCount * 3);
    const colors = new Float32Array(starCount * 3);

    const prng = createPRNG('stars-fixed-celestial');
    for (let i = 0; i < starCount; i++) {
      const idx = i * 3;
      const u = prng();
      const v = prng();
      const theta = u * 2.0 * Math.PI;
      const phi = Math.acos(2.0 * v - 1.0);
      const r = 7500 + prng() * 1000; // Celestial sphere at 7500-8500u

      positions[idx] = r * Math.sin(phi) * Math.cos(theta);
      positions[idx + 1] = r * Math.sin(phi) * Math.sin(theta);
      positions[idx + 2] = r * Math.cos(phi);

      const colorType = prng();
      if (colorType < 0.25) {
        colors[idx] = 0.65; colors[idx + 1] = 0.88; colors[idx + 2] = 1.0; // electric blue
      } else if (colorType < 0.45) {
        colors[idx] = 1.0; colors[idx + 1] = 0.88; colors[idx + 2] = 0.65; // golden yellow
      } else if (colorType < 0.6) {
        colors[idx] = 0.92; colors[idx + 1] = 0.65; colors[idx + 2] = 1.0; // soft magenta
      } else {
        colors[idx] = 1.0; colors[idx + 1] = 1.0; colors[idx + 2] = 1.0; // pure diamond white
      }
    }

    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));

    const starTexture = createGlowPointTexture();
    const material = new THREE.PointsMaterial({
      size: 2.8,
      map: starTexture || undefined,
      vertexColors: true,
      transparent: true,
      opacity: 0.9,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
      sizeAttenuation: false,
      fog: false
    });

    const starfield = new THREE.Points(geometry, material);
    this.scene.add(starfield);
  }

  /**
   * Deterministic planetary sector generation using Three.js MarchingCubes volumetric density fields.
   * Generates:
   * 1. Central Colossus Mega-Asteroid at (0,0,0) scaled to R=megaRadius, with resolution
   *    scaled by voxelQuality ('low': 32³, 'medium': 48³, 'high': 64³).
   * 2. Keplerian orbital asteroid belt of asteroids orbiting between R=3300 and 5500.
   */
  createAsteroidField() {
    const prng = createPRNG(this.mapSeed);
    const beltCount = this.asteroidCount;
    const totalCount = beltCount + 1;

    const rockBump = createRockBumpTexture();

    // Smooth-shaded planetary rock materials with subtle micro-relief bump mapping & DoubleSide rendering
    const rustChondrite = new THREE.MeshStandardMaterial({
      color: 0x9b5842,
      roughness: 0.88,
      metalness: 0.16,
      flatShading: false,
      bumpMap: rockBump || null,
      bumpScale: 1.2,
      depthWrite: true,
      side: THREE.DoubleSide
    });

    const charcoalBasalt = new THREE.MeshStandardMaterial({
      color: 0x383e46,
      roughness: 0.92,
      metalness: 0.10,
      flatShading: false,
      bumpMap: rockBump || null,
      bumpScale: 1.2,
      depthWrite: true,
      side: THREE.DoubleSide
    });

    const slateRock = new THREE.MeshStandardMaterial({
      color: 0x5e6875,
      roughness: 0.86,
      metalness: 0.14,
      flatShading: false,
      bumpMap: rockBump || null,
      bumpScale: 1.2,
      depthWrite: true,
      side: THREE.DoubleSide
    });

    const nickelGranite = new THREE.MeshStandardMaterial({
      color: 0x7e8c9a,
      roughness: 0.80,
      metalness: 0.26,
      flatShading: false,
      bumpMap: rockBump || null,
      bumpScale: 1.2,
      depthWrite: true,
      side: THREE.DoubleSide
    });

    const materials = [rustChondrite, charcoalBasalt, slateRock, nickelGranite];

    for (let i = 0; i < totalCount; i++) {
      let radius;
      let hp = Infinity;
      let isMega = false;
      let isMedium = false;

      if (i === 0) {
        // Central Colossus Mega-Asteroid: R=megaRadius at (0,0,0)
        radius = this.megaRadius;
        hp = Infinity;
        isMega = true;
      } else {
        // Orbital Belt Asteroids: small (R=15-35, hp=20) and medium (R=40-90, hp=Infinity)
        isMedium = (i % 3 === 0);
        if (isMedium) {
          radius = 40 + prng() * 50; // Medium: R=40 to 90
          hp = Infinity;
        } else {
          radius = 15 + prng() * 20; // Small: R=15 to 35
          hp = 20;
        }
      }

      const mat = materials[Math.floor(prng() * materials.length)];
      const res = isMega ? this.megaResolution : (isMedium ? 20 : 16);
      const maxPolys = isMega ? 120000 : 30000;

      const mc = new MarchingCubes(res, mat, true, false, maxPolys);
      mc.maxPolys = maxPolys;
      mc.isolation = 40.0;

      // Initialize density field: Solid rock core formulation (dist < 0.6 => D >> 40.0, D approx 70-100)
      const half = mc.halfsize;
      for (let z = 0; z < res; z++) {
        const dz = (z - half) / half;
        for (let y = 0; y < res; y++) {
          const dy = (y - half) / half;
          for (let x = 0; x < res; x++) {
            const dx = (x - half) / half;
            const dist = Math.sqrt(dx * dx + dy * dy + dz * dz);
            const noise = Math.sin(dx * 8) * Math.cos(dy * 8) * Math.sin(dz * 8) * 0.15
                        + Math.sin(dx * 18) * Math.cos(dz * 18) * 0.08;
            const density = Math.max(0, (1.0 - (dist + noise)) * 100);
            mc.setCell(x, y, z, density);
          }
        }
      }

      mc.update();
      mc.scale.set(radius / 0.65, radius / 0.65, radius / 0.65);

      let posX = 0, posY = 0, posZ = 0;
      let driftVelocity = new THREE.Vector3(0, 0, 0);
      let rotationSpeed = new THREE.Vector3(0, 0, 0);

      if (isMega) {
        // Stationary Mega-Asteroid centered at (0,0,0)
        posX = 0;
        posY = 0;
        posZ = 0;
      } else {
        // Place in Keplerian orbital belt between R=3300 and R=5500 with Poisson spacing
        const margin = 20.0;
        let posFound = false;
        let attempts = 0;
        const maxAttempts = 200;

        while (!posFound && attempts < maxAttempts) {
          attempts++;
          const orbitR = 3300 + prng() * 2200; // 3300 to 5500
          const angle = prng() * Math.PI * 2;
          posX = Math.cos(angle) * orbitR;
          posY = (prng() - 0.5) * 450;
          posZ = Math.sin(angle) * orbitR;

          let overlaps = false;
          for (let k = 0; k < this.asteroids.length; k++) {
            const other = this.asteroids[k];
            const dist = Math.hypot(posX - other.position.x, posY - other.position.y, posZ - other.position.z);
            if (dist < (radius + other.radius + margin)) {
              overlaps = true;
              break;
            }
          }
          if (!overlaps) {
            posFound = true;
          }
        }

        // Tangential orbital velocity: v = omega x r (counter-clockwise along XZ)
        const angle = Math.atan2(posZ, posX);
        const vOrbit = 16.0 + prng() * 14.0; // 16-30 u/s
        driftVelocity.set(-Math.sin(angle) * vOrbit, (prng() - 0.5) * 1.5, Math.cos(angle) * vOrbit);
        rotationSpeed.set(
          (prng() - 0.5) * 0.05,
          (prng() - 0.5) * 0.05,
          (prng() - 0.5) * 0.05
        );
      }

      mc.position.set(posX, posY, posZ);
      mc.rotation.set(prng() * Math.PI, prng() * Math.PI, prng() * Math.PI);

      this.asteroidGroup.add(mc);

      const mass = (4 / 3) * Math.PI * Math.pow(radius, 3) * 0.001;

      this.asteroids.push({
        mesh: mc,
        mc,
        radius,
        mass,
        hp,
        maxHp: hp,
        isMegaAsteroid: isMega,
        carvings: [],
        position: mc.position,
        velocity: driftVelocity,
        rotationSpeed,
        boundingSphere: new THREE.Sphere(mc.position, radius * 1.05)
      });
    }

    this.scene.add(this.asteroidGroup);
  }

  /**
   * Sample volumetric density at local coordinate (lx, ly, lz) within radius R using trilinear interpolation.
   */
  sampleDensity(target, lx, ly, lz, R) {
    const mc = target && target.field ? target : (target ? (target.mc || target.mesh) : null);
    if (!mc || !mc.field) return 0;
    const radius = R !== undefined ? R : (target.radius || 1.0);
    const scaleR = radius / 0.65;
    const res = mc.resolution;
    const half = mc.halfsize;
    const gx = (lx / scaleR) * half + half;
    const gy = (ly / scaleR) * half + half;
    const gz = (lz / scaleR) * half + half;

    if (gx < 0 || gx >= res - 1 || gy < 0 || gy >= res - 1 || gz < 0 || gz >= res - 1) {
      if (gx < 0 || gx >= res || gy < 0 || gy >= res || gz < 0 || gz >= res) return 0;
      const ix = Math.floor(Math.max(0, Math.min(res - 1, gx)));
      const iy = Math.floor(Math.max(0, Math.min(res - 1, gy)));
      const iz = Math.floor(Math.max(0, Math.min(res - 1, gz)));
      return mc.getCell(ix, iy, iz);
    }

    const x0 = Math.floor(gx), x1 = x0 + 1;
    const y0 = Math.floor(gy), y1 = y0 + 1;
    const z0 = Math.floor(gz), z1 = z0 + 1;
    const tx = gx - x0, ty = gy - y0, tz = gz - z0;

    const c000 = mc.getCell(x0, y0, z0);
    const c100 = mc.getCell(x1, y0, z0);
    const c010 = mc.getCell(x0, y1, z0);
    const c110 = mc.getCell(x1, y1, z0);
    const c001 = mc.getCell(x0, y0, z1);
    const c101 = mc.getCell(x1, y0, z1);
    const c011 = mc.getCell(x0, y1, z1);
    const c111 = mc.getCell(x1, y1, z1);

    const c00 = c000 * (1 - tx) + c100 * tx;
    const c10 = c010 * (1 - tx) + c110 * tx;
    const c01 = c001 * (1 - tx) + c101 * tx;
    const c11 = c011 * (1 - tx) + c111 * tx;

    const c0 = c00 * (1 - ty) + c10 * ty;
    const c1 = c01 * (1 - ty) + c11 * ty;

    return c0 * (1 - tz) + c1 * tz;
  }

  /**
   * Compute outward surface normal from continuous density gradient ∇D.
   */
  computeDensityGradientNormal(asteroid, localPos) {
    const mc = asteroid.mc || asteroid.mesh;
    const R = asteroid.radius;
    const scaleR = R / 0.65;
    const delta = (scaleR / mc.halfsize) * 0.5;

    const dx = this.sampleDensity(mc, localPos.x + delta, localPos.y, localPos.z, R) -
               this.sampleDensity(mc, localPos.x - delta, localPos.y, localPos.z, R);
    const dy = this.sampleDensity(mc, localPos.x, localPos.y + delta, localPos.z, R) -
               this.sampleDensity(mc, localPos.x, localPos.y - delta, localPos.z, R);
    const dz = this.sampleDensity(mc, localPos.x, localPos.y, localPos.z + delta, R) -
               this.sampleDensity(mc, localPos.x, localPos.y, localPos.z - delta, R);

    // Normal points outward into free space (opposite of increasing rock density)
    const localNorm = new THREE.Vector3(-dx, -dy, -dz);
    if (localNorm.lengthSq() < 0.0001) {
      localNorm.copy(localPos).normalize();
      if (localNorm.lengthSq() < 0.0001) localNorm.set(0, 1, 0);
    } else {
      localNorm.normalize();
    }

    if (asteroid.mesh && asteroid.mesh.matrixWorld) {
      return localNorm.transformDirection(asteroid.mesh.matrixWorld).normalize();
    }
    return localNorm;
  }

  /**
   * Verify whether a local point lies within an excavated cavern corridor or through-tunnel.
   */
  checkInsideCarvings(asteroid, localPoint) {
    if (!asteroid.carvings || asteroid.carvings.length === 0) return false;
    for (let c = 0; c < asteroid.carvings.length; c++) {
      const carving = asteroid.carvings[c];
      const distToCavity = localPoint.distanceTo(carving.cavityCenter || carving.localHit);

      if (carving.isThroughTunnel && carving.localDir && carving.carveDepth) {
        const vToPt = localPoint.clone().sub(carving.localHit);
        const proj = vToPt.dot(carving.localDir);
        if (proj >= -25.0 && proj <= (carving.carveDepth + 25.0)) {
          const axisPt = carving.localHit.clone().addScaledVector(carving.localDir, proj);
          const distToAxis = localPoint.distanceTo(axisPt);
          if (distToAxis < carving.carveRadius * 0.95) {
            return true;
          }
        }
      } else if (carving.localDir && carving.carveDepth) {
        const segLen = carving.carveDepth;
        const vToPt = localPoint.clone().sub(carving.localHit);
        const proj = vToPt.dot(carving.localDir);
        const t = Math.max(0, Math.min(1, proj / Math.max(0.1, segLen)));
        const closestPoint = carving.localHit.clone().addScaledVector(carving.localDir, t * segLen);
        const distToCorridor = localPoint.distanceTo(closestPoint);

        if (distToCavity < (carving.carveRadius * 1.05) || distToCorridor < (carving.carveRadius * 0.95)) {
          return true;
        }
      } else if (distToCavity < (carving.carveRadius * 1.05)) {
        return true;
      }
    }
    return false;
  }

  triggerCombatFlash(pos, color = 0xff6600, intensity = 4.0) {
    if (!this.combatFlashLight) return;
    this.combatFlashLight.position.copy(pos);
    this.combatFlashLight.color.setHex(color);
    this.combatFlashLight.intensity = intensity;
  }

  /**
   * Update asteroid drift, Keplerian orbital dynamics, and resolve pairwise asteroid-asteroid momentum collisions.
   */
  update(dt, playerPosition, playerVelocity) {
    // Update rock debris particles
    for (let i = this.debrisList.length - 1; i >= 0; i--) {
      const d = this.debrisList[i];
      d.life -= dt;
      if (d.life <= 0) {
        this.scene.remove(d.mesh);
        this.debrisList.splice(i, 1);
        continue;
      }
      d.mesh.position.addScaledVector(d.vel, dt);
      d.mesh.rotation.x += d.rot.x * dt;
      d.mesh.rotation.y += d.rot.y * dt;
      const scale = (d.life / d.maxLife);
      d.mesh.scale.set(scale, scale, scale);
    }

    if (this.combatFlashLight && this.combatFlashLight.intensity > 0) {
      this.combatFlashLight.intensity = Math.max(0, this.combatFlashLight.intensity - dt * 6.0);
    }

    const numAsteroids = this.asteroids.length;

    // 1. Move and rotate asteroids with orbital centripetal acceleration
    for (let i = 0; i < numAsteroids; i++) {
      const a = this.asteroids[i];
      if (a.isMegaAsteroid) {
        // Stationary Central Mega-Asteroid
        a.position.set(0, 0, 0);
        a.velocity.set(0, 0, 0);
        a.boundingSphere.center.set(0, 0, 0);
        continue;
      }

      a.position.addScaledVector(a.velocity, dt);
      a.boundingSphere.center.copy(a.position);

      a.mesh.rotation.x += a.rotationSpeed.x * dt;
      a.mesh.rotation.y += a.rotationSpeed.y * dt;
      a.mesh.rotation.z += a.rotationSpeed.z * dt;

      // Keplerian centripetal force holding belt asteroids in orbit around (0,0,0)
      const rHoriz = Math.hypot(a.position.x, a.position.z);
      if (rHoriz > 10.0) {
        const dirX = a.position.x / rHoriz;
        const dirZ = a.position.z / rHoriz;
        const vHoriz = Math.hypot(a.velocity.x, a.velocity.z);
        const aCentripetal = (vHoriz * vHoriz) / rHoriz;

        a.velocity.x -= dirX * aCentripetal * dt;
        a.velocity.z -= dirZ * aCentripetal * dt;
        a.velocity.y -= a.position.y * 0.08 * dt; // vertical damping towards orbital plane

        // Belt radius confinement (3300 <= rHoriz <= 5500)
        if (rHoriz < 3300) {
          const push = (3300 - rHoriz) * 0.12 * dt;
          a.velocity.x += dirX * push;
          a.velocity.z += dirZ * push;
        } else if (rHoriz > 5500) {
          const pull = (rHoriz - 5500) * 0.12 * dt;
          a.velocity.x -= dirX * pull;
          a.velocity.z -= dirZ * pull;
        }
      }
    }

    // 2. Asteroid-Asteroid Pairwise Collision & 3-Pass PBD Separation Solver
    for (let pass = 0; pass < 3; pass++) {
      for (let i = 0; i < numAsteroids; i++) {
        const a1 = this.asteroids[i];
        if (!a1) continue;
        const p1 = a1.position;

        for (let j = i + 1; j < numAsteroids; j++) {
          const a2 = this.asteroids[j];
          if (!a2) continue;
          const p2 = a2.position;

          const dx = p1.x - p2.x;
          const dy = p1.y - p2.y;
          const dz = p1.z - p2.z;
          const distSq = dx * dx + dy * dy + dz * dz;
          const minDist = a1.radius + a2.radius;

          if (distSq < minDist * minDist && distSq > 0.0001) {
            const dist = Math.sqrt(distSq);
            const nx = dx / dist;
            const ny = dy / dist;
            const nz = dz / dist;
            const overlap = minDist - dist;
            const push = Math.min(overlap * 0.55, 20.0);

            if (a1.isMegaAsteroid) {
              // Mega-asteroid stays stationary; a2 gets pushed away completely
              p2.x -= nx * push;
              p2.y -= ny * push;
              p2.z -= nz * push;
              if (a2.boundingSphere) a2.boundingSphere.center.copy(p2);
              if (pass === 0) {
                const velAlong = a2.velocity.x * nx + a2.velocity.y * ny + a2.velocity.z * nz;
                if (velAlong > 0) {
                  a2.velocity.x -= (1 + 0.5) * velAlong * nx;
                  a2.velocity.y -= (1 + 0.5) * velAlong * ny;
                  a2.velocity.z -= (1 + 0.5) * velAlong * nz;
                }
              }
            } else if (a2.isMegaAsteroid) {
              // Mega-asteroid stays stationary; a1 gets pushed away completely
              p1.x += nx * push;
              p1.y += ny * push;
              p1.z += nz * push;
              if (a1.boundingSphere) a1.boundingSphere.center.copy(p1);
              if (pass === 0) {
                const velAlong = a1.velocity.x * (-nx) + a1.velocity.y * (-ny) + a1.velocity.z * (-nz);
                if (velAlong > 0) {
                  a1.velocity.x -= (1 + 0.5) * velAlong * (-nx);
                  a1.velocity.y -= (1 + 0.5) * velAlong * (-ny);
                  a1.velocity.z -= (1 + 0.5) * velAlong * (-nz);
                }
              }
            } else {
              const totalMass = a1.mass + a2.mass;
              const ratio1 = a2.mass / totalMass;
              const ratio2 = a1.mass / totalMass;

              p1.x += nx * push * ratio1;
              p1.y += ny * push * ratio1;
              p1.z += nz * push * ratio1;

              p2.x -= nx * push * ratio2;
              p2.y -= ny * push * ratio2;
              p2.z -= nz * push * ratio2;

              if (a1.boundingSphere) a1.boundingSphere.center.copy(p1);
              if (a2.boundingSphere) a2.boundingSphere.center.copy(p2);

              if (pass === 0) {
                const rvx = a1.velocity.x - a2.velocity.x;
                const rvy = a1.velocity.y - a2.velocity.y;
                const rvz = a1.velocity.z - a2.velocity.z;
                const velAlongNormal = rvx * nx + rvy * ny + rvz * nz;

                if (velAlongNormal < 0) {
                  const restitution = 0.55;
                  const impulse = -(1 + restitution) * velAlongNormal / (1 / a1.mass + 1 / a2.mass);

                  const dv1 = Math.min(25.0, impulse / a1.mass);
                  const dv2 = Math.min(25.0, impulse / a2.mass);

                  a1.velocity.x += dv1 * nx;
                  a1.velocity.y += dv1 * ny;
                  a1.velocity.z += dv1 * nz;

                  a2.velocity.x -= dv2 * nx;
                  a2.velocity.y -= dv2 * ny;
                  a2.velocity.z -= dv2 * nz;
                }
              }
            }

            if (a1.velocity.length() > 40.0) a1.velocity.setLength(40.0);
            if (a2.velocity.length() > 40.0) a2.velocity.setLength(40.0);
          }
        }
      }
    }
  }

  /**
   * Fast collision query for projectiles and weapons
   */
  checkCollision(position, radius = 2.5) {
    for (let i = 0; i < this.asteroids.length; i++) {
      const a = this.asteroids[i];
      const distSq = position.distanceToSquared(a.position);
      const combinedRadius = a.radius + radius;
      if (distSq < combinedRadius * combinedRadius) {
        return a;
      }
    }
    return null;
  }

  /**
   * Check if line-of-sight between two points is obstructed by any asteroid,
   * accounting for through-and-through tunnels and excavated cavities.
   */
  checkRayBlocked(startPos, endPos) {
    const seg = endPos.clone().sub(startPos);
    const segLen = seg.length();
    if (segLen < 0.001) return false;
    const segDir = seg.clone().divideScalar(segLen);

    for (let i = 0; i < this.asteroids.length; i++) {
      const a = this.asteroids[i];
      const toCenter = a.position.clone().sub(startPos);
      const proj = toCenter.dot(segDir);
      if (proj > 0 && proj < segLen) {
        const perpDistSq = toCenter.lengthSq() - (proj * proj);
        const r = a.radius * 0.95;
        if (perpDistSq < r * r) {
          // Check if ray passes through a through-tunnel or excavated corridor
          if (a.carvings && a.carvings.length > 0 && a.mesh) {
            if (a.mesh.matrixWorld) a.mesh.updateMatrixWorld(true);
            const invMatrix = a.mesh.matrixWorld ? a.mesh.matrixWorld.clone().invert() : new THREE.Matrix4().copy(a.mesh.matrix).invert();
            const localStart = startPos.clone().applyMatrix4(invMatrix).multiplyScalar(a.radius);
            const localDir = segDir.clone().transformDirection(invMatrix).normalize();

            let passesThroughHole = false;
            for (let c = 0; c < a.carvings.length; c++) {
              const carving = a.carvings[c];
              if (carving.isThroughTunnel) {
                const toHole = carving.localHit.clone().sub(localStart);
                const rayProj = toHole.dot(localDir);
                const perp = toHole.clone().addScaledVector(localDir, -rayProj);
                if (perp.length() < carving.carveRadius * 0.95) {
                  passesThroughHole = true;
                  break;
                }
              }
            }
            if (passesThroughHole) continue;
          }
          return true;
        }
      }
    }
    return false;
  }

  /**
   * Cast a ray forward and find closest asteroid hit within maxDist.
   * If ray enters an excavated tunnel or cavern, it checks volumetric density
   * and carving corridor to allow penetrating through hollowed tunnels!
   */
  checkRayCollision(origin, dir, maxDist = 750.0) {
    let closestHit = null;
    let closestDist = maxDist;

    for (let i = 0; i < this.asteroids.length; i++) {
      const a = this.asteroids[i];
      const toCenter = a.position.clone().sub(origin);
      const tca = toCenter.dot(dir);
      const r = a.radius;
      const distToCenter = toCenter.length();
      const isInsideSphere = distToCenter < r;

      if (tca < 0 && !isInsideSphere) continue;
      if (tca - r > closestDist) continue;

      const d2 = toCenter.lengthSq() - (tca * tca);
      if (d2 > r * r) continue;

      const thc = Math.sqrt(Math.max(0, r * r - d2));
      let t0 = tca - thc;
      if (t0 < 0) t0 = tca + thc;

      if (t0 > 0 && t0 < closestDist) {
        let hitPt = origin.clone().addScaledVector(dir, t0);
        let entersCavity = false;
        let deepestDist = t0;

        if (a.mesh) {
          if (a.mesh.matrixWorld) a.mesh.updateMatrixWorld(true);
          const invMatrix = a.mesh.matrixWorld ? a.mesh.matrixWorld.clone().invert() : new THREE.Matrix4().copy(a.mesh.matrix).invert();
          const scaleR = a.radius / 0.65;
          const localHit = hitPt.clone().applyMatrix4(invMatrix).multiplyScalar(scaleR);

          // Check density at hit point or along tunnel
          const density = this.sampleDensity(a.mc || a.mesh, localHit.x, localHit.y, localHit.z, a.radius);
          const insideCarving = this.checkInsideCarvings(a, localHit);

          if (density <= (a.mc?.isolation || 40.0) || insideCarving) {
            entersCavity = true;
            // Ray penetrates through tunnel
            if (a.carvings && a.carvings.some(c => c.isThroughTunnel)) {
              deepestDist = Math.max(deepestDist, tca + thc + 5.0);
            } else {
              deepestDist = Math.max(deepestDist, t0 + 60.0);
            }
          }
        }

        if (entersCavity) {
          if (deepestDist >= (tca + thc)) {
            // Ray punches completely through the excavated tunnel!
            continue;
          }
          t0 = deepestDist;
          hitPt = origin.clone().addScaledVector(dir, t0);
        }

        if (t0 > 0 && t0 < closestDist) {
          closestDist = t0;
          closestHit = {
            asteroid: a,
            distance: t0,
            hitPoint: hitPt
          };
        }
      }
    }
    return closestHit;
  }

  /**
   * Resolves physical collision between ship and asteroid.
   * Narrowphase samples MarchingCubes volumetric density field and continuous capsule corridor.
   * If D <= mc.isolation (or inside carved tunnel corridor), free flight clearance is granted!
   * If D > mc.isolation, calculates outward surface normal from density gradient ∇D,
   * separates position, deflects velocity, and inflicts debounced impact damage.
   */
  resolveShipCollision(position, velocity, shipRadius = 2.8, shipMass = 1200) {
    for (let i = 0; i < this.asteroids.length; i++) {
      const a = this.asteroids[i];
      const dist = position.distanceTo(a.position);
      const minDist = a.radius + shipRadius;

      if (dist < minDist) {
        if (a.mesh.matrixWorld) a.mesh.updateMatrixWorld(true);
        const invMatrix = a.mesh.matrixWorld ? a.mesh.matrixWorld.clone().invert() : new THREE.Matrix4().copy(a.mesh.matrix).invert();
        const scaleR = a.radius / 0.65;
        const localShip = position.clone().applyMatrix4(invMatrix).multiplyScalar(scaleR);

        // Narrowphase: Check volumetric density & carved corridor clearance
        const insideCarving = this.checkInsideCarvings(a, localShip);
        const density = this.sampleDensity(a.mc || a.mesh, localShip.x, localShip.y, localShip.z, a.radius);
        const iso = a.mc?.isolation || 40.0;

        if (insideCarving || density <= iso) {
          // Free flight clearance through space, excavated cavern, or through-tunnel!
          continue;
        }

        // Intersecting solid rock! Calculate outward normal from continuous density gradient ∇D
        const normal = this.computeDensityGradientNormal(a, localShip);

        // Push ship out of penetration along surface normal
        position.copy(a.position).addScaledVector(normal, minDist + 0.3);

        const relVel = velocity.clone().sub(a.velocity);
        const vNorm = relVel.dot(normal);

        if (vNorm < 0) {
          const restitution = 0.85;
          const impulse = -(1 + restitution) * vNorm * shipMass;

          velocity.addScaledVector(normal, (impulse / shipMass));

          if (!a.isMegaAsteroid) {
            a.velocity.addScaledVector(normal, -(impulse / a.mass));
          }

          const impactSpeed = Math.abs(vNorm);
          const impactDamage = Math.round(Math.min(45, Math.max(10, impactSpeed * 0.75)));

          return { asteroid: a, normal, impactDamage, impactSpeed };
        }
      }
    }
    return null;
  }

  spawnRockDebris(hitPoint, hitDir, count = 8) {
    const chunkGeom = new THREE.DodecahedronGeometry(0.85, 0);
    const chunkMat = new THREE.MeshStandardMaterial({
      color: 0x5a626d,
      roughness: 0.9,
      metalness: 0.1
    });

    for (let i = 0; i < count; i++) {
      if (this.debrisList.length > 60) {
        const old = this.debrisList.shift();
        this.scene.remove(old.mesh);
      }
      const mesh = new THREE.Mesh(chunkGeom, chunkMat);
      mesh.position.copy(hitPoint);
      this.scene.add(mesh);

      const spread = new THREE.Vector3(
        (Math.random() - 0.5) * 35.0,
        (Math.random() - 0.5) * 35.0,
        (Math.random() - 0.5) * 35.0
      );
      const vel = hitDir.clone().multiplyScalar(-18.0).add(spread);
      const maxLife = 0.5 + Math.random() * 0.4;

      this.debrisList.push({
        mesh,
        vel,
        rot: new THREE.Vector3(Math.random() * 8, Math.random() * 8, Math.random() * 8),
        life: maxLife,
        maxLife
      });
    }
  }

  removeAsteroid(asteroid) {
    if (!asteroid) return false;
    const index = this.asteroids.indexOf(asteroid);
    if (index !== -1) {
      this.asteroids.splice(index, 1);
    }
    if (asteroid.mesh) {
      if (asteroid.mesh.parent) {
        asteroid.mesh.parent.remove(asteroid.mesh);
      } else {
        this.asteroidGroup.remove(asteroid.mesh);
        this.scene.remove(asteroid.mesh);
      }
      if (asteroid.mesh.geometry) {
        asteroid.mesh.geometry.dispose();
      }
    }
    if (asteroid.mc) {
      if (asteroid.mc.geometry) asteroid.mc.geometry.dispose();
      asteroid.mc.field = null;
      asteroid.mc.normal_cache = null;
      asteroid.mc.palette = null;
    }
    return true;
  }

  damageAsteroid(asteroid, damage = 5, hitPoint, hitDir, carveRadius = 32.0, carveDepth = 36.0) {
    if (!asteroid) return { destroyed: false };

    // Small asteroids have finite HP and get obliterated when depleted
    if (asteroid.hp !== undefined && asteroid.hp !== Infinity) {
      asteroid.hp -= damage;
      if (asteroid.hp <= 0) {
        const blastPos = hitPoint ? hitPoint.clone() : asteroid.position.clone();
        const blastDir = hitDir ? hitDir.clone() : new THREE.Vector3(0, 0, 1);
        this.spawnRockDebris(blastPos, blastDir, 28);
        if (audio && typeof audio.playExplosion === 'function') {
          audio.playExplosion(1.2, blastPos);
        }
        this.removeAsteroid(asteroid);
        return { destroyed: true, asteroid };
      }
    }

    // Medium asteroids and central mega-asteroid undergo volumetric carving
    if (hitPoint && hitDir) {
      this.carveAsteroid(asteroid, hitPoint, hitDir, carveRadius, carveDepth);
    }
    return { destroyed: false, asteroid, hp: asteroid.hp };
  }

  /**
   * Runtime volumetric MarchingCubes asteroid carving:
   * - Converts hitPoint and hitDir to asteroid local space
   * - Maps local coordinates [-R, R] to grid cells [0, res-1]
   * - Subtracts density brush: current = mc.getCell(); mc.setCell(Math.max(0, current - factor * strength))
   * - Localized mc.update() to regenerate surface polygons
   * - Tracks carved volume, cells, and corridor metadata for continuous clearance
   */
  carveAsteroid(asteroid, hitPoint, hitDir, carveRadius = 32.0, carveDepth = 36.0, strength = 80.0) {
    if (!asteroid || !asteroid.mesh) return;
    const mc = asteroid.mc || asteroid.mesh;

    if (asteroid.mesh.matrixWorld) asteroid.mesh.updateMatrixWorld(true);
    const invMatrix = asteroid.mesh.matrixWorld ? asteroid.mesh.matrixWorld.clone().invert() : new THREE.Matrix4().copy(asteroid.mesh.matrix).invert();
    const scaleR = asteroid.radius / 0.65;
    const localHit = hitPoint.clone().applyMatrix4(invMatrix).multiplyScalar(scaleR);
    const localDir = hitDir.clone().transformDirection(invMatrix).normalize();

    const isMega = (asteroid.radius >= 2500 || asteroid.isMegaAsteroid);
    const isMedium = (!isMega && asteroid.radius >= 38.0);

    const half = mc.halfsize;
    // Medium asteroids support through-and-through cylindrical tunnel holes; mega asteroids scale to voxel grid spacing
    const tunnelRadius = isMedium
      ? Math.max(28.0, Math.min(36.0, carveRadius))
      : (isMega ? Math.max(carveRadius, (scaleR / half) * 0.75) : carveRadius);
    const effectiveDepth = isMega ? Math.max(120.0, Math.min(180.0, carveDepth * 3.5)) : (isMedium ? asteroid.radius * 2.5 : carveDepth);

    let carvedVolume = 0;
    let carvedCells = 0;

    if (mc && mc.field && typeof mc.getCell === 'function') {
      const res = mc.resolution;
      const half = mc.halfsize;

      for (let z = 0; z < res; z++) {
        for (let y = 0; y < res; y++) {
          for (let x = 0; x < res; x++) {
            const lp = new THREE.Vector3(
              (x - half) / half * scaleR,
              (y - half) / half * scaleR,
              (z - half) / half * scaleR
            );

            const toP = lp.clone().sub(localHit);
            const proj = toP.dot(localDir);
            let dist;

            if (isMedium) {
              if (proj >= -25.0 && proj <= (effectiveDepth + 25.0)) {
                const segPt = localHit.clone().addScaledVector(localDir, proj);
                dist = lp.distanceTo(segPt);
              } else {
                dist = Infinity;
              }
            } else {
              const t = Math.max(0, Math.min(effectiveDepth, proj));
              const segPt = localHit.clone().addScaledVector(localDir, t);
              dist = lp.distanceTo(segPt);
            }

            if (dist < tunnelRadius) {
              const factor = Math.max(0, 1.0 - (dist / tunnelRadius));
              const current = mc.getCell(x, y, z);
              if (current > 0) {
                const sub = factor * (strength || 80.0);
                const nextVal = Math.max(0, current - sub);
                mc.setCell(x, y, z, nextVal);
                carvedCells++;
                carvedVolume += (current - nextVal);
              }
            }
          }
        }
      }

      mc.update();
      if (mc.geometry) {
        mc.geometry.computeBoundingSphere?.();
      }
    }

    asteroid.carvings = asteroid.carvings || [];
    asteroid.carvings.push({
      localHit: localHit.clone(),
      localDir: localDir.clone(),
      cavityCenter: localHit.clone().addScaledVector(localDir, effectiveDepth * 0.5),
      carveRadius: tunnelRadius,
      carveDepth: effectiveDepth,
      isThroughTunnel: isMedium,
      carvedVolume,
      carvedCells,
      timestamp: Date.now()
    });

    const debrisCount = tunnelRadius > 35 ? 16 : 8;
    this.spawnRockDebris(hitPoint, hitDir, debrisCount);
  }

  cleanup() {
    this.destroy();
  }

  destroy() {
    for (const d of this.debrisList) {
      if (d.mesh) {
        this.scene.remove(d.mesh);
        if (d.mesh.geometry) d.mesh.geometry.dispose();
      }
    }
    this.debrisList = [];

    for (const a of this.asteroids) {
      if (a.mesh) {
        if (a.mesh.parent) a.mesh.parent.remove(a.mesh);
        if (a.mesh.geometry) a.mesh.geometry.dispose();
      }
      if (a.mc) {
        if (a.mc.geometry) a.mc.geometry.dispose();
        a.mc.field = null;
        a.mc.normal_cache = null;
        a.mc.palette = null;
      }
    }
    this.asteroids = [];

    if (this.asteroidGroup) {
      this.scene.remove(this.asteroidGroup);
      this.asteroidGroup.clear?.();
    }

    if (this.combatFlashLight) this.scene.remove(this.combatFlashLight);
    if (this.meteorLight) this.scene.remove(this.meteorLight);
  }
}
