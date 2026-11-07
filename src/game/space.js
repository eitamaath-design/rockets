import * as THREE from 'three';
import { createPRNG } from '../utils/math.js';

export class SpaceEnvironment {
  constructor(scene, mapSeed = 42) {
    this.scene = scene;
    this.mapSeed = mapSeed;
    this.asteroids = []; // { mesh, radius, position, rotationSpeed, boundingSphere }
    this.asteroidGroup = new THREE.Group();

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
  }

  createStarfield() {
    const starCount = 4000;
    const geometry = new THREE.BufferGeometry();
    const positions = new Float32Array(starCount * 3);
    const colors = new Float32Array(starCount * 3);

    const prng = createPRNG('stars-fixed-background');
    for (let i = 0; i < starCount; i++) {
      const idx = i * 3;
      const u = prng();
      const v = prng();
      const theta = u * 2.0 * Math.PI;
      const phi = Math.acos(2.0 * v - 1.0);
      const r = 1400 + prng() * 600;

      positions[idx] = r * Math.sin(phi) * Math.cos(theta);
      positions[idx + 1] = r * Math.sin(phi) * Math.sin(theta);
      positions[idx + 2] = r * Math.cos(phi);

      const colorType = prng();
      if (colorType < 0.25) {
        colors[idx] = 0.6; colors[idx + 1] = 0.85; colors[idx + 2] = 1.0; // electric blue
      } else if (colorType < 0.45) {
        colors[idx] = 1.0; colors[idx + 1] = 0.85; colors[idx + 2] = 0.6; // golden yellow
      } else if (colorType < 0.6) {
        colors[idx] = 0.9; colors[idx + 1] = 0.6; colors[idx + 2] = 1.0; // magenta star
      } else {
        colors[idx] = 1.0; colors[idx + 1] = 1.0; colors[idx + 2] = 1.0; // pure diamond white
      }
    }

    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));

    const material = new THREE.PointsMaterial({
      size: 3.2,
      vertexColors: true,
      transparent: true,
      opacity: 0.95,
      sizeAttenuation: false,
      fog: false // Crucial: stars remain crystal clear without fogging to black
    });

    const starfield = new THREE.Points(geometry, material);
    this.scene.add(starfield);

    // Glowing deep space nebulae clouds
    this.createNebulae(prng);
  }

  createNebulae(prng) {
    const nebulaCount = 500;
    const geom = new THREE.BufferGeometry();
    const positions = new Float32Array(nebulaCount * 3);
    const colors = new Float32Array(nebulaCount * 3);

    const clusterColors = [
      new THREE.Color(0x0088ff),
      new THREE.Color(0x9922ff),
      new THREE.Color(0x00ffcc),
      new THREE.Color(0xff3388)
    ];

    for (let i = 0; i < nebulaCount; i++) {
      const idx = i * 3;
      const clusterIdx = Math.floor(prng() * clusterColors.length);
      const baseColor = clusterColors[clusterIdx];

      const angle = (clusterIdx / clusterColors.length) * Math.PI * 2 + (prng() - 0.5) * 0.8;
      const dist = 1100 + prng() * 400;

      positions[idx] = Math.cos(angle) * dist + (prng() - 0.5) * 300;
      positions[idx + 1] = (prng() - 0.5) * 600;
      positions[idx + 2] = Math.sin(angle) * dist + (prng() - 0.5) * 300;

      colors[idx] = baseColor.r;
      colors[idx + 1] = baseColor.g;
      colors[idx + 2] = baseColor.b;
    }

    geom.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    geom.setAttribute('color', new THREE.BufferAttribute(colors, 3));

    const mat = new THREE.PointsMaterial({
      size: 45.0,
      vertexColors: true,
      transparent: true,
      opacity: 0.35,
      blending: THREE.AdditiveBlending,
      sizeAttenuation: true,
      fog: false
    });

    const nebula = new THREE.Points(geom, mat);
    this.scene.add(nebula);
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

    // Solid opaque planetary rock materials
    const rustChondrite = new THREE.MeshStandardMaterial({
      color: 0xa25f46,
      roughness: 0.88,
      metalness: 0.18,
      flatShading: true,
      depthWrite: true,
      side: THREE.FrontSide
    });

    const charcoalBasalt = new THREE.MeshStandardMaterial({
      color: 0x3d434c,
      roughness: 0.92,
      metalness: 0.10,
      flatShading: true,
      depthWrite: true,
      side: THREE.FrontSide
    });

    const slateRock = new THREE.MeshStandardMaterial({
      color: 0x677280,
      roughness: 0.86,
      metalness: 0.14,
      flatShading: true,
      depthWrite: true,
      side: THREE.FrontSide
    });

    const nickelGranite = new THREE.MeshStandardMaterial({
      color: 0x8898a7,
      roughness: 0.78,
      metalness: 0.28,
      flatShading: true,
      depthWrite: true,
      side: THREE.FrontSide
    });

    const materials = [rustChondrite, charcoalBasalt, slateRock, nickelGranite];

    for (let i = 0; i < count; i++) {
      // Scale distribution: Titan (75-140), Large (42-75), Medium (22-42)
      let radius;
      let detail;
      if (i < 20) {
        radius = 75 + prng() * 65; // 75 to 140 units
        detail = 3;
      } else if (i < 65) {
        radius = 42 + prng() * 33; // 42 to 75 units
        detail = 2;
      } else {
        radius = 22 + prng() * 20; // 22 to 42 units
        detail = 2;
      }

      const geom = new THREE.IcosahedronGeometry(radius, detail);
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

      this.asteroids.push({
        mesh,
        radius,
        position: mesh.position,
        rotationSpeed: new THREE.Vector3(
          (prng() - 0.5) * 0.003,
          (prng() - 0.5) * 0.003,
          (prng() - 0.5) * 0.003
        ),
        boundingSphere: new THREE.Sphere(mesh.position, radius * 1.1)
      });
    }

    this.scene.add(this.asteroidGroup);
  }

  update(dt, playerPosition, playerVelocity) {
    // Slowly rotate asteroids
    for (let i = 0; i < this.asteroids.length; i++) {
      const a = this.asteroids[i];
      a.mesh.rotation.x += a.rotationSpeed.x;
      a.mesh.rotation.y += a.rotationSpeed.y;
      a.mesh.rotation.z += a.rotationSpeed.z;
    }
  }

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
}
