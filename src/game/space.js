import * as THREE from 'three';
import { mergeVertices } from 'three/examples/jsm/utils/BufferGeometryUtils.js';
import { createPRNG } from '../utils/math.js';

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
  constructor(scene, mapSeed = 42) {
    this.scene = scene;
    this.mapSeed = mapSeed;
    this.asteroids = []; // { mesh, radius, position, rotationSpeed, boundingSphere }
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
    const hemiLight = new THREE.HemisphereLight(0x557799, 0x1a2433, 1.6);
    this.scene.add(hemiLight);

    // Cosmic ambient light
    const ambient = new THREE.AmbientLight(0x3a4b5c, 1.2);
    this.scene.add(ambient);

    // Primary bright directional sunlight casting strong crater shadows
    const sunLight = new THREE.DirectionalLight(0xfff6ea, 3.2);
    sunLight.position.set(700, 450, 600);
    this.scene.add(sunLight);

    // Secondary cyan/blue rim light from opposite angle
    const rimLight = new THREE.DirectionalLight(0x00b4ff, 1.8);
    rimLight.position.set(-600, -350, -500);
    this.scene.add(rimLight);

    // Warm foreground point light illuminating asteroids ahead of player spawn
    const spawnLight = new THREE.PointLight(0xffeedd, 3.2, 900);
    spawnLight.position.set(0, 60, 160);
    this.scene.add(spawnLight);

    // Permanent combat flash point light (pre-allocated to eliminate WebGL shader recompilations)
    this.combatFlashLight = new THREE.PointLight(0xff6600, 0.0, 120);
    this.combatFlashLight.position.set(0, 0, 0);
    this.scene.add(this.combatFlashLight);

    // Permanent meteor hazard light (pre-allocated to eliminate WebGL shader recompilations)
    this.meteorLight = new THREE.PointLight(0xff3300, 0.0, 350);
    this.meteorLight.position.set(0, 0, 0);
    this.scene.add(this.meteorLight);
  }

  createStarfield() {
    // True distant celestial sphere (r = 2900-3400) - completely outside player sector.
    // Zero white dust / blocks floating anywhere near the cockpit!
    const starCount = 350;
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
      const r = 2900 + prng() * 500; // Far celestial sphere

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
      size: 2.5,
      map: starTexture || undefined,
      vertexColors: true,
      transparent: true,
      opacity: 0.9,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
      sizeAttenuation: false, // Consistent pinprick star sizing without blocky artifacts
      fog: false
    });

    const starfield = new THREE.Points(geometry, material);
    this.scene.add(starfield);
  }

  /**
   * Deterministic asteroid generation based on room seed.
   * Generates seamless, 100% watertight, solid rocky masses with deep impact craters,
   * raised ridges, and dramatic elevation changes.
   */
  createAsteroidField() {
    const prng = createPRNG(this.mapSeed);
    const count = 120;
    const playAreaRadius = 1000;

    const rockBump = createRockBumpTexture();

    // High-quality smooth-shaded planetary rock materials with subtle micro-relief bump mapping
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

    for (let i = 0; i < count; i++) {
      // High-resolution subdivision so individual polygons are completely imperceptible:
      // Titan (detail 4 = 5,120 faces), Large (detail 3 = 1,280 faces), Medium (detail 3 = 1,280 faces)
      let radius;
      let detail;
      if (i < 20) {
        radius = 75 + prng() * 65; // 75 to 140 units
        detail = 4;
      } else if (i < 65) {
        radius = 42 + prng() * 33; // 42 to 75 units
        detail = 3;
      } else {
        radius = 22 + prng() * 20; // 22 to 42 units
        detail = 3;
      }

      let geom = mergeVertices(new THREE.IcosahedronGeometry(radius, detail));
      const posAttr = geom.attributes.position;
      const vertex = new THREE.Vector3();

      // Oblong non-spherical stretch factors
      const stretchX = 0.82 + prng() * 0.40;
      const stretchY = 0.78 + prng() * 0.44;
      const stretchZ = 0.82 + prng() * 0.40;

      // Deterministic continuous 3D noise phases for this asteroid
      const p1 = prng() * Math.PI * 2;
      const p2 = prng() * Math.PI * 2;
      const p3 = prng() * Math.PI * 2;

      // 4-6 procedural crater indentation centers
      const numCraters = Math.floor(4 + prng() * 3);
      const craters = [];
      for (let c = 0; c < numCraters; c++) {
        const cTheta = prng() * Math.PI * 2;
        const cPhi = Math.acos(2.0 * prng() - 1.0);
        craters.push({
          dir: new THREE.Vector3(
            Math.sin(cPhi) * Math.cos(cTheta),
            Math.sin(cPhi) * Math.sin(cTheta),
            Math.cos(cPhi)
          ),
          depth: 0.16 + prng() * 0.16,
          radiusCos: 0.78 + prng() * 0.14
        });
      }

      // CRITICAL: Compute displacement ONLY from normalized spatial direction u!
      // This ensures coincident vertices get the exact same displacement,
      // guaranteeing the mesh remains 100% solid, unified, and watertight with NO split polygons.
      for (let v = 0; v < posAttr.count; v++) {
        vertex.fromBufferAttribute(posAttr, v);
        const u = vertex.clone().normalize();

        // 1. Multi-octave continuous trigonometric 3D noise for rocky crags & ridges
        const n1 = 0.10 * Math.sin(u.x * 3.2 + p1) * Math.cos(u.y * 3.2 + p2) +
                   0.08 * Math.sin(u.z * 3.8 + p3);
        const n2 = 0.05 * Math.sin(u.x * 6.5 - u.z * 5.2) * Math.cos(u.y * 6.1);
        const n3 = 0.025 * Math.sin(u.y * 12.0 + u.x * 10.5) * Math.sin(u.z * 11.8);
        const ridgeNoise = n1 + n2 + n3;

        // 2. Smooth impact craters with raised debris rims
        let craterDisp = 0;
        for (let c = 0; c < craters.length; c++) {
          const crater = craters[c];
          const dot = u.dot(crater.dir);
          if (dot > crater.radiusCos) {
            // Inside crater bowl: dip inward smoothly
            const insideFactor = (dot - crater.radiusCos) / (1.0 - crater.radiusCos);
            craterDisp -= crater.depth * Math.cos(insideFactor * (Math.PI / 2));
          } else if (dot > crater.radiusCos - 0.12) {
            // Raised outer crater rim
            const rimFactor = (dot - (crater.radiusCos - 0.12)) / 0.12;
            craterDisp += 0.35 * crater.depth * Math.sin(rimFactor * Math.PI);
          }
        }

        // 3. Final watertight radial displacement
        const finalFactor = Math.max(0.60, 1.0 + ridgeNoise + craterDisp);
        vertex.copy(u).multiplyScalar(radius * finalFactor);

        // 4. Apply oblong stretch
        vertex.x *= stretchX;
        vertex.y *= stretchY;
        vertex.z *= stretchZ;

        posAttr.setXYZ(v, vertex.x, vertex.y, vertex.z);
      }
      geom.computeVertexNormals();

      const mat = materials[Math.floor(prng() * materials.length)];
      const mesh = new THREE.Mesh(geom, mat);

      let posX = 0, posY = 0, posZ = 0;

      // The first 12 asteroids are placed directly in the player's forward view down -Z
      // (Spawns at z = 180 looking down -Z, so z from 60 down to -260 are 120 to 440 units ahead)
      if (i < 12) {
        posX = (prng() - 0.5) * 180;
        posY = (prng() - 0.5) * 90;
        posZ = 60 - prng() * 320;
      } else {
        let posFound = false;
        let attempts = 0;
        while (!posFound && attempts < 50) {
          attempts++;
          posX = (prng() - 0.5) * playAreaRadius * 2;
          posY = (prng() - 0.5) * (playAreaRadius * 0.7);
          posZ = (prng() - 0.5) * playAreaRadius * 2;
          const distToSpawn = Math.hypot(posX - 0, posY - 0, posZ - 180);
          const distToCenter = Math.hypot(posX, posY, posZ);
          if (distToSpawn > radius + 50 && distToCenter < playAreaRadius) {
            posFound = true;
          }
        }
      }

      mesh.position.set(posX, posY, posZ);
      mesh.rotation.set(prng() * Math.PI, prng() * Math.PI, prng() * Math.PI);

      this.asteroidGroup.add(mesh);

      // Mass proportional to spherical volume (r^3)
      // Titan (r~100): mass ~ 4,188,000 | Large (r~50): mass ~ 523,000 | Medium (r~25): mass ~ 65,000
      const mass = (4 / 3) * Math.PI * Math.pow(radius, 3) * 0.001;

      // Deterministic slow drift velocity for dynamic orbital motion
      const driftVelocity = new THREE.Vector3(
        (prng() - 0.5) * 4.0,
        (prng() - 0.5) * 2.2,
        (prng() - 0.5) * 4.0
      );

      this.asteroids.push({
        mesh,
        radius,
        mass,
        position: mesh.position,
        velocity: driftVelocity,
        rotationSpeed: new THREE.Vector3(
          (prng() - 0.5) * 0.08,
          (prng() - 0.5) * 0.08,
          (prng() - 0.5) * 0.08
        ),
        boundingSphere: new THREE.Sphere(mesh.position, radius * 1.05)
      });
    }

    this.scene.add(this.asteroidGroup);
  }

  triggerCombatFlash(pos, color = 0xff6600, intensity = 4.0) {
    if (!this.combatFlashLight) return;
    this.combatFlashLight.position.copy(pos);
    this.combatFlashLight.color.setHex(color);
    this.combatFlashLight.intensity = intensity;
  }

  /**
   * Update asteroid drift, rotational kinematics, boundary confinement,
   * and resolve pairwise asteroid-asteroid momentum collisions.
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
    // Smoothly decay permanent combat flash light
    if (this.combatFlashLight && this.combatFlashLight.intensity > 0) {
      this.combatFlashLight.intensity = Math.max(0, this.combatFlashLight.intensity - dt * 6.0);
    }

    const playAreaRadius = 1000;
    const numAsteroids = this.asteroids.length;

    // 1. Move and rotate asteroids
    for (let i = 0; i < numAsteroids; i++) {
      const a = this.asteroids[i];
      a.position.addScaledVector(a.velocity, dt);
      a.boundingSphere.center.copy(a.position);

      a.mesh.rotation.x += a.rotationSpeed.x * dt;
      a.mesh.rotation.y += a.rotationSpeed.y * dt;
      a.mesh.rotation.z += a.rotationSpeed.z * dt;

      // Soft boundary confinement: gently steer asteroids back toward sector center
      const distFromCenter = a.position.length();
      if (distFromCenter > playAreaRadius) {
        const pull = a.position.clone().normalize().multiplyScalar(-6.0 * dt);
        a.velocity.add(pull);
      }
    }

    // 2. Asteroid-Asteroid Pairwise Collision & Momentum Exchange
    // Mass-based momentum transfer: m1*v1 + m2*v2 = m1*v1' + m2*v2'
    for (let i = 0; i < numAsteroids; i++) {
      const a1 = this.asteroids[i];
      const p1 = a1.position;

      for (let j = i + 1; j < numAsteroids; j++) {
        const a2 = this.asteroids[j];
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

          // Mass-weighted positional separation (heavier asteroid budges less)
          const overlap = minDist - dist;
          const totalMass = a1.mass + a2.mass;
          const ratio1 = a2.mass / totalMass;
          const ratio2 = a1.mass / totalMass;

          p1.x += nx * overlap * ratio1;
          p1.y += ny * overlap * ratio1;
          p1.z += nz * overlap * ratio1;

          p2.x -= nx * overlap * ratio2;
          p2.y -= ny * overlap * ratio2;
          p2.z -= nz * overlap * ratio2;

          // Relative velocity along collision normal
          const rvx = a1.velocity.x - a2.velocity.x;
          const rvy = a1.velocity.y - a2.velocity.y;
          const rvz = a1.velocity.z - a2.velocity.z;
          const velAlongNormal = rvx * nx + rvy * ny + rvz * nz;

          // Only transfer momentum if asteroids are moving toward each other
          if (velAlongNormal < 0) {
            const restitution = 0.65; // Inelastic planetary rock impact
            const impulse = -(1 + restitution) * velAlongNormal / (1 / a1.mass + 1 / a2.mass);

            a1.velocity.x += (impulse / a1.mass) * nx;
            a1.velocity.y += (impulse / a1.mass) * ny;
            a1.velocity.z += (impulse / a1.mass) * nz;

            a2.velocity.x -= (impulse / a2.mass) * nx;
            a2.velocity.y -= (impulse / a2.mass) * ny;
            a2.velocity.z -= (impulse / a2.mass) * nz;
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
   * Resolves physical collision between a ship and asteroids with Newtonian momentum bounce
   */
  /**
   * Check if line-of-sight between two points is obstructed by any asteroid
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
          return true;
        }
      }
    }
    return false;
  }

  /**
   * Cast a ray forward and find closest asteroid hit within maxDist
   */
  checkRayCollision(origin, dir, maxDist = 750.0) {
    let closestHit = null;
    let closestDist = maxDist;

    for (let i = 0; i < this.asteroids.length; i++) {
      const a = this.asteroids[i];
      const toCenter = a.position.clone().sub(origin);
      const tca = toCenter.dot(dir);
      if (tca < 0) continue;
      const r = a.radius;
      if (tca - r > closestDist) continue;

      const d2 = toCenter.lengthSq() - (tca * tca);
      if (d2 > r * r) continue;

      const thc = Math.sqrt(Math.max(0, r * r - d2));
      let t0 = tca - thc;
      if (t0 < 0) t0 = tca + thc;

      if (t0 > 0 && t0 < closestDist) {
        closestDist = t0;
        closestHit = {
          asteroid: a,
          distance: t0,
          hitPoint: origin.clone().addScaledVector(dir, t0)
        };
      }
    }
    return closestHit;
  }

  resolveShipCollision(position, velocity, shipRadius = 2.8, shipMass = 1200) {
    for (let i = 0; i < this.asteroids.length; i++) {
      const a = this.asteroids[i];
      const dist = position.distanceTo(a.position);
      const minDist = a.radius + shipRadius;

      if (dist < minDist) {
        const normal = position.clone().sub(a.position);
        if (normal.lengthSq() < 0.0001) {
          normal.set(0, 1, 0);
        } else {
          normal.normalize();
        }

        // Push ship out of penetration along surface normal
        position.copy(a.position).addScaledVector(normal, minDist + 0.3);

        // Normal relative velocity
        const relVel = velocity.clone().sub(a.velocity);
        const vNorm = relVel.dot(normal);

        if (vNorm < 0) {
          const restitution = 0.85; // Bouncy shield restitution
          const impulse = -(1 + restitution) * vNorm * shipMass;

          // Ship bounces away along the normal
          velocity.addScaledVector(normal, (impulse / shipMass));

          // Asteroid receives reaction impulse based on mass ratio
          a.velocity.addScaledVector(normal, -(impulse / a.mass));

          // Calculate impact speed & damage
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

  carveAsteroid(asteroid, hitPoint, hitDir, carveRadius = 22.0, carveDepth = 16.0) {
    if (!asteroid || !asteroid.mesh) return;
    const geom = asteroid.mesh.geometry;
    const posAttr = geom.attributes.position;
    if (!posAttr) return;

    const invMatrix = asteroid.mesh.matrixWorld.clone().invert();
    const localHit = hitPoint.clone().applyMatrix4(invMatrix);
    const localDir = hitDir.clone().transformDirection(invMatrix).normalize();

    const v = new THREE.Vector3();
    let deformedCount = 0;

    for (let i = 0; i < posAttr.count; i++) {
      v.fromBufferAttribute(posAttr, i);
      const dist = v.distanceTo(localHit);
      if (dist < carveRadius) {
        const falloff = 1.0 - Math.pow(dist / carveRadius, 1.4);
        const pushDistance = carveDepth * falloff;
        v.addScaledVector(localDir, pushDistance);
        posAttr.setXYZ(i, v.x, v.y, v.z);
        deformedCount++;
      }
    }

    if (deformedCount > 0) {
      posAttr.needsUpdate = true;
      geom.computeVertexNormals();
      geom.computeBoundingSphere();
      if (geom.boundingSphere) {
        asteroid.boundingSphere.radius = Math.max(10, geom.boundingSphere.radius);
      }
    }

    this.spawnRockDebris(hitPoint, hitDir);
  }
}
