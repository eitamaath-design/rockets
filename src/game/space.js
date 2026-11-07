import * as THREE from 'three';
import { createPRNG } from '../utils/math.js';

export class SpaceEnvironment {
  constructor(scene, mapSeed = 42) {
    this.scene = scene;
    this.mapSeed = mapSeed;
    this.asteroids = []; // { mesh, radius, position, rotationSpeed, boundingSphere }
    this.dustParticles = null;
    this.dustPositions = null;
    this.dustCount = 1200;
    this.asteroidGroup = new THREE.Group();

    this.init();
  }

  init() {
    this.setupLighting();
    this.createStarfield();
    this.createAsteroidField();
    this.createSpeedDust();
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
   * Features massive Titan, Large, and Medium cratered asteroids
   * that ships can easily hide behind for tactical dogfighting cover.
   */
  createAsteroidField() {
    const prng = createPRNG(this.mapSeed);
    const count = 120;
    const playAreaRadius = 1000;

    // Rock materials with rich planetary rock colors and crisp flat shading
    const grayChondrite = new THREE.MeshStandardMaterial({
      color: 0x828b96,
      roughness: 0.85,
      metalness: 0.15,
      flatShading: true
    });

    const rustIron = new THREE.MeshStandardMaterial({
      color: 0x9b6b55,
      roughness: 0.75,
      metalness: 0.35,
      flatShading: true
    });

    const darkBasalt = new THREE.MeshStandardMaterial({
      color: 0x48505a,
      roughness: 0.9,
      metalness: 0.1,
      flatShading: true
    });

    const nickelGranite = new THREE.MeshStandardMaterial({
      color: 0x94a3af,
      roughness: 0.7,
      metalness: 0.25,
      flatShading: true
    });

    const materials = [grayChondrite, rustIron, darkBasalt, nickelGranite];

    for (let i = 0; i < count; i++) {
      // Scale distribution: Titan (75-140), Large (42-75), Medium (22-42)
      let radius;
      let detail;
      if (i < 20) {
        // Massive Titan asteroids for ship cover & hiding
        radius = 75 + prng() * 65; // 75 to 140 units
        detail = 3;
      } else if (i < 65) {
        // Large asteroids
        radius = 42 + prng() * 33; // 42 to 75 units
        detail = 2;
      } else {
        // Medium asteroids
        radius = 22 + prng() * 20; // 22 to 42 units
        detail = 2;
      }

      const geom = new THREE.IcosahedronGeometry(radius, detail);
      const posAttr = geom.attributes.position;
      const vertex = new THREE.Vector3();

      // Oblong non-spherical shape factors
      const stretchX = 0.8 + prng() * 0.45;
      const stretchY = 0.75 + prng() * 0.5;
      const stretchZ = 0.8 + prng() * 0.45;

      // 3-5 procedural crater indentation centers
      const numCraters = Math.floor(3 + prng() * 3);
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
          depth: 0.18 + prng() * 0.16,
          radiusCos: 0.75 + prng() * 0.18
        });
      }

      // Deform vertices for craggy craters, ridges, and crags
      for (let v = 0; v < posAttr.count; v++) {
        vertex.fromBufferAttribute(posAttr, v);
        const normDir = vertex.clone().normalize();

        // Apply oblong stretches
        vertex.x *= stretchX;
        vertex.y *= stretchY;
        vertex.z *= stretchZ;

        // Apply craters
        let craterDisp = 0;
        for (const crater of craters) {
          const dot = normDir.dot(crater.dir);
          if (dot > crater.radiusCos) {
            const factor = (dot - crater.radiusCos) / (1.0 - crater.radiusCos);
            craterDisp += Math.sin(factor * Math.PI) * crater.depth;
          }
        }

        // Craggy noise
        const crag = (prng() - 0.5) * 0.18;
        const finalScale = Math.max(0.65, 1.0 - craterDisp + crag);
        vertex.multiplyScalar(finalScale);

        posAttr.setXYZ(v, vertex.x, vertex.y, vertex.z);
      }
      geom.computeVertexNormals();

      const mat = materials[Math.floor(prng() * materials.length)];
      const mesh = new THREE.Mesh(geom, mat);

      let posX = 0, posY = 0, posZ = 0;

      // The first 12 asteroids are placed directly in the player's forward view down -Z
      // (Player spawns at z = 180 looking down -Z, so z values from 70 down to -250 are 110 to 430 units ahead)
      if (i < 12) {
        posX = (prng() - 0.5) * 180;
        posY = (prng() - 0.5) * 90;
        posZ = 70 - prng() * 320;
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
          if (distToSpawn > radius + 40 && distToCenter < playAreaRadius) {
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

  /**
   * Floating space dust / warp streak particles around player to give velocity feedback.
   */
  createSpeedDust() {
    const geom = new THREE.BufferGeometry();
    const positions = new Float32Array(this.dustCount * 3);
    const boxSize = 250;

    for (let i = 0; i < this.dustCount; i++) {
      const idx = i * 3;
      positions[idx] = (Math.random() - 0.5) * boxSize;
      positions[idx + 1] = (Math.random() - 0.5) * boxSize;
      positions[idx + 2] = (Math.random() - 0.5) * boxSize;
    }

    geom.setAttribute('position', new THREE.BufferAttribute(positions, 3));

    const mat = new THREE.PointsMaterial({
      color: 0x88ccff,
      size: 2.5,
      transparent: true,
      opacity: 0.6,
      blending: THREE.AdditiveBlending,
      fog: false
    });

    this.dustParticles = new THREE.Points(geom, mat);
    this.scene.add(this.dustParticles);
    this.dustPositions = positions;
  }

  update(dt, playerPosition, playerVelocity) {
    // Slowly rotate asteroids
    for (let i = 0; i < this.asteroids.length; i++) {
      const a = this.asteroids[i];
      a.mesh.rotation.x += a.rotationSpeed.x;
      a.mesh.rotation.y += a.rotationSpeed.y;
      a.mesh.rotation.z += a.rotationSpeed.z;
    }

    // Keep speed dust centered on player
    if (this.dustParticles && playerPosition) {
      const boxSize = 250;
      const halfBox = boxSize / 2;
      const posAttr = this.dustParticles.geometry.attributes.position;
      const array = posAttr.array;

      for (let i = 0; i < this.dustCount; i++) {
        const idx = i * 3;
        let dx = array[idx] - playerPosition.x;
        let dy = array[idx + 1] - playerPosition.y;
        let dz = array[idx + 2] - playerPosition.z;

        if (dx > halfBox) array[idx] -= boxSize;
        if (dx < -halfBox) array[idx] += boxSize;
        if (dy > halfBox) array[idx + 1] -= boxSize;
        if (dy < -halfBox) array[idx + 1] += boxSize;
        if (dz > halfBox) array[idx + 2] -= boxSize;
        if (dz < -halfBox) array[idx + 2] += boxSize;
      }
      posAttr.needsUpdate = true;
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
