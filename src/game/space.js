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
    // Soft cosmic ambient light
    const ambient = new THREE.AmbientLight(0x223344, 1.2);
    this.scene.add(ambient);

    // Distant star / sun directional light
    const sunLight = new THREE.DirectionalLight(0xfff5e6, 2.5);
    sunLight.position.set(500, 300, 400);
    this.scene.add(sunLight);

    // Blueish rim light from opposite angle
    const rimLight = new THREE.DirectionalLight(0x3366bb, 1.0);
    rimLight.position.set(-400, -200, -300);
    this.scene.add(rimLight);
  }

  createStarfield() {
    const starCount = 3000;
    const geometry = new THREE.BufferGeometry();
    const positions = new Float32Array(starCount * 3);
    const colors = new Float32Array(starCount * 3);

    const prng = createPRNG('stars-fixed-background');
    for (let i = 0; i < starCount; i++) {
      const idx = i * 3;
      // Distribute stars on a large sphere
      const u = prng();
      const v = prng();
      const theta = u * 2.0 * Math.PI;
      const phi = Math.acos(2.0 * v - 1.0);
      const r = 2500 + prng() * 500;

      positions[idx] = r * Math.sin(phi) * Math.cos(theta);
      positions[idx + 1] = r * Math.sin(phi) * Math.sin(theta);
      positions[idx + 2] = r * Math.cos(phi);

      // Star color variation (cool blue, warm yellow, pure white)
      const colorType = prng();
      if (colorType < 0.2) {
        colors[idx] = 0.7; colors[idx + 1] = 0.85; colors[idx + 2] = 1.0; // blue-white
      } else if (colorType < 0.4) {
        colors[idx] = 1.0; colors[idx + 1] = 0.8; colors[idx + 2] = 0.5; // warm orange
      } else {
        colors[idx] = 0.95; colors[idx + 1] = 0.95; colors[idx + 2] = 0.95; // silver white
      }
    }

    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));

    const material = new THREE.PointsMaterial({
      size: 3.5,
      vertexColors: true,
      transparent: true,
      opacity: 0.85,
      sizeAttenuation: false
    });

    const starfield = new THREE.Points(geometry, material);
    this.scene.add(starfield);

    // Distant colorful nebulae
    this.createNebulae(prng);
  }

  createNebulae(prng) {
    const nebulaColors = [0x552288, 0x114477, 0x882255, 0x006677];
    for (let i = 0; i < 6; i++) {
      const color = nebulaColors[i % nebulaColors.length];
      const light = new THREE.PointLight(color, 2.0, 3000);
      const angle = (i / 6) * Math.PI * 2 + prng() * 0.5;
      const dist = 1800 + prng() * 400;
      light.position.set(
        Math.cos(angle) * dist,
        (prng() - 0.5) * 800,
        Math.sin(angle) * dist
      );
      this.scene.add(light);
    }
  }

  /**
   * Deterministic asteroid generation based on room seed.
   */
  createAsteroidField() {
    const prng = createPRNG(this.mapSeed);
    const count = 160;
    const playAreaRadius = 850;

    // Rock materials with slight variations
    const baseRockMaterial = new THREE.MeshStandardMaterial({
      color: 0x6e6e6e,
      roughness: 0.9,
      metalness: 0.15,
      flatShading: true
    });

    const darkRockMaterial = new THREE.MeshStandardMaterial({
      color: 0x4a4744,
      roughness: 0.95,
      metalness: 0.2,
      flatShading: true
    });

    const rustRockMaterial = new THREE.MeshStandardMaterial({
      color: 0x7c5d4b,
      roughness: 0.85,
      metalness: 0.25,
      flatShading: true
    });

    const materials = [baseRockMaterial, darkRockMaterial, rustRockMaterial];

    for (let i = 0; i < count; i++) {
      // Asteroid radius between 8 and 42 units
      const radius = 8 + Math.pow(prng(), 1.8) * 34;

      // Deformed icosahedron geometry for craggy asteroid shape
      const detail = radius > 22 ? 2 : 1;
      const geom = new THREE.IcosahedronGeometry(radius, detail);
      const posAttr = geom.attributes.position;
      const vertex = new THREE.Vector3();

      // Displace vertices to create craters and bumpy rocks
      const noiseSeed = prng() * 1000;
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

      // Position in a 3D field with clear center spawn buffer
      let posFound = false;
      let posX = 0, posY = 0, posZ = 0;
      while (!posFound) {
        posX = (prng() - 0.5) * playAreaRadius * 2;
        posY = (prng() - 0.5) * (playAreaRadius * 0.9);
        posZ = (prng() - 0.5) * playAreaRadius * 2;
        // Keep central spawn sphere relatively clear
        const distFromCenter = Math.sqrt(posX * posX + posY * posY + posZ * posZ);
        if (distFromCenter > 75 && distFromCenter < playAreaRadius) {
          posFound = true;
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
      size: 2.2,
      transparent: true,
      opacity: 0.55,
      blending: THREE.AdditiveBlending
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
        // Wrap particles around player position
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
