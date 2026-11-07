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
    const hemiLight = new THREE.HemisphereLight(0x446688, 0x182233, 1.4);
    this.scene.add(hemiLight);

    // Cosmic ambient light
    const ambient = new THREE.AmbientLight(0x334455, 1.0);
    this.scene.add(ambient);

    // Primary bright directional sunlight
    const sunLight = new THREE.DirectionalLight(0xfff5e6, 3.0);
    sunLight.position.set(600, 400, 500);
    this.scene.add(sunLight);

    // Secondary cyan/blue rim light from opposite angle
    const rimLight = new THREE.DirectionalLight(0x00aaff, 1.6);
    rimLight.position.set(-500, -300, -400);
    this.scene.add(rimLight);
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
   */
  createAsteroidField() {
    const prng = createPRNG(this.mapSeed);
    const count = 180;
    const playAreaRadius = 850;

    // Rock materials with crisp shading and visible contrast
    const grayRock = new THREE.MeshStandardMaterial({
      color: 0x8a929a,
      roughness: 0.75,
      metalness: 0.2,
      flatShading: true
    });

    const rustRock = new THREE.MeshStandardMaterial({
      color: 0xa48570,
      roughness: 0.7,
      metalness: 0.25,
      flatShading: true
    });

    const darkBasalt = new THREE.MeshStandardMaterial({
      color: 0x727b85,
      roughness: 0.8,
      metalness: 0.3,
      flatShading: true
    });

    const materials = [grayRock, rustRock, darkBasalt];

    for (let i = 0; i < count; i++) {
      const radius = 8 + Math.pow(prng(), 1.7) * 32;
      const detail = radius > 20 ? 2 : 1;
      const geom = new THREE.IcosahedronGeometry(radius, detail);
      const posAttr = geom.attributes.position;
      const vertex = new THREE.Vector3();

      // Deform vertices for craggy asteroid appearance
      for (let v = 0; v < posAttr.count; v++) {
        vertex.fromBufferAttribute(posAttr, v);
        const len = vertex.length();
        const disp = 1.0 + (prng() - 0.5) * 0.35;
        vertex.normalize().multiplyScalar(len * disp);
        posAttr.setXYZ(v, vertex.x, vertex.y, vertex.z);
      }
      geom.computeVertexNormals();

      const mat = materials[Math.floor(prng() * materials.length)];
      const mesh = new THREE.Mesh(geom, mat);

      let posX = 0, posY = 0, posZ = 0;

      // Ensure the first 25 asteroids are positioned in immediate forward view (Z between -30 and -250)
      if (i < 25) {
        posX = (prng() - 0.5) * 160;
        posY = (prng() - 0.5) * 70;
        posZ = -30 - prng() * 220; // directly ahead in the pilot's forward field of view!
      } else {
        // Distribute remaining asteroids across outer playfield
        let posFound = false;
        while (!posFound) {
          posX = (prng() - 0.5) * playAreaRadius * 2;
          posY = (prng() - 0.5) * (playAreaRadius * 0.8);
          posZ = (prng() - 0.5) * playAreaRadius * 2;
          const dist = Math.sqrt(posX * posX + posY * posY + posZ * posZ);
          if (dist > 35 && dist < playAreaRadius) {
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
          (prng() - 0.5) * 0.004,
          (prng() - 0.5) * 0.004,
          (prng() - 0.5) * 0.004
        ),
        boundingSphere: new THREE.Sphere(mesh.position, radius * 1.05)
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
