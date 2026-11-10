import * as THREE from 'three';
import { MarchingCubes } from 'three/examples/jsm/objects/MarchingCubes.js';
import { createPRNG } from '../utils/math.js';
import { audio } from './audio.js';
import { logger } from '../utils/logger.js';
import { createRadialGlowTexture } from './trail.js';

// Module-level scratch objects for GPU InstancedMesh debris & explosions (zero heap allocation)
const _debrisDummy = new THREE.Object3D();
const _flashDummy = new THREE.Object3D();
const _debrisColor = new THREE.Color();
const _flashColor = new THREE.Color();
const _debrisHideMat = new THREE.Matrix4().makeScale(0, 0, 0);
const _spaceCamQuat = new THREE.Quaternion();

// Module-level scratch math objects for zero-allocation carving & normal transforms (SME PoC 2/4 recommendation)
const _scratchMat = new THREE.Matrix4();
const _scratchInvMat = new THREE.Matrix4();
const _scratchLocalHit = new THREE.Vector3();
const _scratchLocalDir = new THREE.Vector3();
const _scratchHitPoint = new THREE.Vector3();
const _scratchHitDir = new THREE.Vector3();

export const ISOSURFACE_SCALE = 0.80;

/**
 * Creates deterministic 3D smooth Perlin/Gradient noise + FBM + Ridged Multifractal
 * generators seeded by map seed.
 */
function create3DNoise(seed) {
  const p = new Uint8Array(512);
  const prng = createPRNG(seed);
  const perm = new Uint8Array(256);
  for (let i = 0; i < 256; i++) perm[i] = i;
  for (let i = 255; i > 0; i--) {
    const j = Math.floor(prng() * (i + 1));
    const t = perm[i];
    perm[i] = perm[j];
    perm[j] = t;
  }
  for (let i = 0; i < 512; i++) {
    p[i] = perm[i & 255];
  }

  function fade(t) {
    return t * t * t * (t * (t * 6.0 - 15.0) + 10.0);
  }
  function lerp(t, a, b) {
    return a + t * (b - a);
  }
  function grad(hash, x, y, z) {
    const h = hash & 15;
    const u = h < 8 ? x : y;
    const v = h < 4 ? y : (h === 12 || h === 14 ? x : z);
    return ((h & 1) === 0 ? u : -u) + ((h & 2) === 0 ? v : -v);
  }

  function noise(x, y, z) {
    const X = Math.floor(x) & 255;
    const Y = Math.floor(y) & 255;
    const Z = Math.floor(z) & 255;
    const fx = x - Math.floor(x);
    const fy = y - Math.floor(y);
    const fz = z - Math.floor(z);
    const u = fade(fx);
    const v = fade(fy);
    const w = fade(fz);

    const A = p[X] + Y, AA = p[A] + Z, AB = p[A + 1] + Z;
    const B = p[X + 1] + Y, BA = p[B] + Z, BB = p[B + 1] + Z;

    return lerp(w,
      lerp(v,
        lerp(u, grad(p[AA], fx, fy, fz), grad(p[BA], fx - 1, fy, fz)),
        lerp(u, grad(p[AB], fx, fy - 1, fz), grad(p[BB], fx - 1, fy - 1, fz))
      ),
      lerp(v,
        lerp(u, grad(p[AA + 1], fx, fy, fz - 1), grad(p[BA + 1], fx - 1, fy, fz - 1)),
        lerp(u, grad(p[AB + 1], fx, fy - 1, fz - 1), grad(p[BB + 1], fx - 1, fy - 1, fz - 1))
      )
    );
  }

  function fbm(x, y, z, octaves = 3) {
    let total = 0;
    let freq = 1.0;
    let amp = 1.0;
    let maxAmp = 0;
    for (let i = 0; i < octaves; i++) {
      total += noise(x * freq, y * freq, z * freq) * amp;
      maxAmp += amp;
      freq *= 2.0;
      amp *= 0.5;
    }
    return total / maxAmp;
  }

  function ridge(x, y, z, octaves = 3) {
    let total = 0;
    let freq = 1.0;
    let amp = 1.0;
    let maxAmp = 0;
    for (let i = 0; i < octaves; i++) {
      let n = noise(x * freq, y * freq, z * freq);
      n = 1.0 - Math.abs(n);
      n = n * n;
      total += n * amp;
      maxAmp += amp;
      freq *= 2.0;
      amp *= 0.5;
    }
    return total / maxAmp;
  }

  return { noise, fbm, ridge };
}

/**
 * Fast, unit-normalized central-difference normal computation for MarchingCubes.
 * Pre-populates mc.normal_cache with strictly unit-length normals and guarantees nx !== 0,
 * preventing MarchingCubes' internal un-normalized compNorm() from overwriting it.
 * Supports optional dirty AABB bounds [minX..maxX, minY..maxY, minZ..maxZ] for localized updates.
 */
export function updateNormalCache(mc, minX, maxX, minY, maxY, minZ, maxZ) {
  if (!mc || !mc.field || !mc.normal_cache) return 0;
  const res = mc.resolution;
  const x0 = Math.max(1, minX !== undefined ? minX : 1);
  const x1 = Math.min(res - 2, maxX !== undefined ? maxX : res - 2);
  const y0 = Math.max(1, minY !== undefined ? minY : 1);
  const y1 = Math.min(res - 2, maxY !== undefined ? maxY : res - 2);
  const z0 = Math.max(1, minZ !== undefined ? minZ : 1);
  const z1 = Math.min(res - 2, maxZ !== undefined ? maxZ : res - 2);

  let updatedCount = 0;
  for (let z = z0; z <= z1; z++) {
    const zOffset = z * mc.size2;
    for (let y = y0; y <= y1; y++) {
      const yzOffset = zOffset + y * mc.size;
      for (let x = x0; x <= x1; x++) {
        const q = yzOffset + x;
        const q3 = q * 3;
        let nx = mc.field[q - 1] - mc.field[q + 1];
        let ny = mc.field[q - mc.yd] - mc.field[q + mc.yd];
        let nz = mc.field[q - mc.zd] - mc.field[q + mc.zd];
        const len = Math.hypot(nx, ny, nz);
        if (len > 0.0001) {
          nx /= len;
          ny /= len;
          nz /= len;
        } else {
          nx = 1e-5;
          ny = 0;
          nz = 0;
        }
        if (nx === 0.0) nx = 1e-5;
        mc.normal_cache[q3] = nx;
        mc.normal_cache[q3 + 1] = ny;
        mc.normal_cache[q3 + 2] = nz;
        updatedCount++;
      }
    }
  }
  return updatedCount;
}

/**
 * Custom 3D world/local-space triplanar rock grain, progressive fracture fissure overlay,
 * and configurable normal-perturbation shader ('low', 'balanced', 'high').
 * In 'low' and 'balanced' modes, uses hardware screen-space derivatives dFdx/dFdy of
 * vRockHeightSignal instead of 4x central-difference rockDetailHeight evaluations.
 */
export function applyTriplanarRockShader(target, seedOffset = 0, shaderQuality = 'balanced') {
  if (!target) return;

  // Support being called either with a THREE.Material or directly as an onBeforeCompile(shader) callback
  if (typeof target.vertexShader !== 'string' || typeof target.fragmentShader !== 'string') {
    const mat = target;
    mat.userData = mat.userData || {};
    mat.userData.seedOffset = seedOffset;
    mat.userData.shaderQuality = shaderQuality;
    mat.customProgramCacheKey = () => `triplanar_rock_${mat.userData.shaderQuality || shaderQuality}_${mat.userData.seedOffset || 0}`;
    mat.onBeforeCompile = (shader) => {
      applyTriplanarRockShader(shader, mat.userData.seedOffset || seedOffset, mat.userData.shaderQuality || shaderQuality);
    };
    return mat;
  }

  const shader = target;
  const quality = (shaderQuality === 'low' || shaderQuality === 'high') ? shaderQuality : 'balanced';
  const seedVecLit = `vec3(${Number(seedOffset * 1.73).toFixed(2)}, ${Number(seedOffset * 2.41).toFixed(2)}, ${Number(seedOffset * 3.19).toFixed(2)})`;

  shader.vertexShader = `
    varying vec3 vRockLocalPos;
    varying vec3 vRockWorldPos;
  ` + shader.vertexShader;

  shader.vertexShader = shader.vertexShader.replace(
    '#include <begin_vertex>',
    `#include <begin_vertex>
     vRockLocalPos = position;
    `
  );
  shader.vertexShader = shader.vertexShader.replace(
    '#include <worldpos_vertex>',
    `#include <worldpos_vertex>
     vRockWorldPos = (modelMatrix * vec4(transformed, 1.0)).xyz + ${seedVecLit};
    `
  );

  const fbmBody = quality === 'low'
    ? `
    float rockFbmTriplanar(vec3 p) {
      return rockNoise3D(p) * 0.65;
    }
    `
    : (quality === 'balanced'
      ? `
    float rockFbmTriplanar(vec3 p) {
      float v = 0.0;
      v += rockNoise3D(p) * 0.55;
      v += rockNoise3D(p * 2.02) * 0.30;
      return v;
    }
      `
      : `
    float rockFbmTriplanar(vec3 p) {
      float v = 0.0;
      v += rockNoise3D(p) * 0.50;
      v += rockNoise3D(p * 2.02) * 0.25;
      v += rockNoise3D(p * 4.04) * 0.125;
      return v;
    }

    float rockDetailHeight(vec3 wp, float closeFactor) {
      float h = rockFbmTriplanar(wp * 0.006) * 0.55
              + rockFbmTriplanar(wp * 0.022) * 0.30
              + (1.0 - abs(rockNoise3D(wp * 0.012) * 2.0 - 1.0)) * 0.15;
      if (closeFactor > 0.001) {
        float fine = rockFbmTriplanar(wp * 0.09) * 0.65
                   + rockFbmTriplanar(wp * 0.32) * 0.35;
        h += (fine - 0.45) * 0.45 * closeFactor;
      }
      return h;
    }
      `);

  shader.fragmentShader = `
    varying vec3 vRockLocalPos;
    varying vec3 vRockWorldPos;
    float vRockHeightSignal = 0.0;

    float rockHash3D(vec3 p) {
      p = fract(p * 0.3183099 + 0.1);
      p *= 17.0;
      return fract(p.x * p.y * p.z * (p.x + p.y + p.z));
    }

    float rockNoise3D(vec3 x) {
      vec3 i = floor(x);
      vec3 f = fract(x);
      f = f * f * (3.0 - 2.0 * f);
      return mix(
        mix(mix(rockHash3D(i + vec3(0,0,0)), rockHash3D(i + vec3(1,0,0)), f.x),
            mix(rockHash3D(i + vec3(0,1,0)), rockHash3D(i + vec3(1,1,0)), f.x), f.y),
        mix(mix(rockHash3D(i + vec3(0,0,1)), rockHash3D(i + vec3(1,0,1)), f.x),
            mix(rockHash3D(i + vec3(0,1,1)), rockHash3D(i + vec3(1,1,1)), f.x), f.y), f.z
      );
    }
    ${fbmBody}
  ` + shader.fragmentShader;

  const colorFragmentInjection = quality === 'low'
    ? `#include <color_fragment>
     float nMacro = rockFbmTriplanar(vRockWorldPos * 0.006);
     float nRidge = 1.0 - abs(rockNoise3D(vRockWorldPos * 0.012) * 2.0 - 1.0);
     float rockContrast = clamp(0.64 + (nMacro - 0.35) * 0.65 + (nRidge - 0.5) * 0.25, 0.32, 1.32);

     float vLuma = dot(vColor.rgb, vec3(0.299, 0.587, 0.114));
     float crackMask = smoothstep(0.28, 0.05, vLuma);
     if (crackMask > 0.01) {
       float r1 = 1.0 - abs(rockNoise3D(vRockWorldPos * 0.09) * 2.0 - 1.0);
       float r2 = 1.0 - abs(rockNoise3D(vRockWorldPos * 0.22 + vec3(3.7, 9.1, 2.4)) * 2.0 - 1.0);
       float fissureLine = smoothstep(0.55 - crackMask * 0.28, 0.92, r1 * r2);
       diffuseColor.rgb = mix(diffuseColor.rgb, vec3(0.02, 0.025, 0.035), fissureLine * crackMask * 0.92);
       rockContrast -= fissureLine * crackMask * 0.45;
     }

     diffuseColor.rgb *= rockContrast;
     vRockHeightSignal = rockContrast;
    `
    : `#include <color_fragment>
     float cDist = length(vViewPosition);
     float cClose = smoothstep(2400.0, 250.0, cDist);
     float nMacro = rockFbmTriplanar(vRockWorldPos * 0.005);
     float nMid = rockFbmTriplanar(vRockWorldPos * 0.020);
     float nFine = mix(0.45, rockFbmTriplanar(vRockWorldPos * 0.10), cClose);
     float nRidge = 1.0 - abs(rockNoise3D(vRockWorldPos * 0.011) * 2.0 - 1.0);

     float rockContrast = clamp(0.62 + (nMacro - 0.45) * 0.55 + (nMid - 0.45) * 0.45 + (nFine - 0.45) * 0.40 + (nRidge - 0.5) * 0.28, 0.32, 1.32);
     diffuseColor.rgb *= rockContrast;

     // Progressive surface fracture fissure network (stages 1-4)
     float vLuma = dot(vColor.rgb, vec3(0.299, 0.587, 0.114));
     float crackMask = smoothstep(0.28, 0.05, vLuma);
     if (crackMask > 0.01) {
       float r1 = 1.0 - abs(rockNoise3D(vRockWorldPos * 0.09) * 2.0 - 1.0);
       float r2 = 1.0 - abs(rockNoise3D(vRockWorldPos * 0.22 + vec3(3.7, 9.1, 2.4)) * 2.0 - 1.0);
       float fissureLine = smoothstep(0.55 - crackMask * 0.28, 0.92, r1 * r2);
       diffuseColor.rgb = mix(diffuseColor.rgb, vec3(0.02, 0.025, 0.035), fissureLine * crackMask * 0.92);
       float stressGlow = smoothstep(0.84, 0.96, r1 * r2) * smoothstep(0.45, 0.85, crackMask);
       diffuseColor.rgb += vec3(0.0, 0.42, 0.65) * stressGlow * 0.35;
       rockContrast -= fissureLine * crackMask * 0.45;
     }

     // Slope dust / regolith highlight on upper sunlit rock faces
     vec3 worldN = normalize(( vec4(vNormal, 0.0) * viewMatrix ).xyz);
     float slope = clamp(dot(worldN, vec3(0.35, 0.85, 0.38)), 0.0, 1.0);
     float dust = smoothstep(0.42, 0.82, slope + (nMid - 0.45) * 0.25);
     diffuseColor.rgb = mix(diffuseColor.rgb, diffuseColor.rgb * vec3(1.14, 1.10, 1.04) + vec3(0.05, 0.04, 0.03), dust * 0.50);

     // Subterranean carved tunnel interior strata & mineral veins
     float rLocal = length(vRockLocalPos);
     if (rLocal < 0.75) {
       float depthFactor = clamp((0.75 - rLocal) / 0.22, 0.0, 1.0);
       float strata = sin(rLocal * 95.0 + nMacro * 8.0) * 0.5 + 0.5;
       vec3 strataCol = mix(vec3(0.18, 0.20, 0.25), vec3(0.42, 0.36, 0.30), strata);
       float veinNoise = rockNoise3D(vRockWorldPos * 0.035);
       float cyanVein = smoothstep(0.74, 0.82, veinNoise);
       float goldVein = smoothstep(0.24, 0.16, veinNoise);
       strataCol += cyanVein * vec3(0.15, 0.65, 0.85) + goldVein * vec3(0.75, 0.48, 0.12);
       diffuseColor.rgb = mix(diffuseColor.rgb, strataCol * rockContrast, depthFactor * 0.75);
     }
     vRockHeightSignal = rockContrast;
    `;

  shader.fragmentShader = shader.fragmentShader.replace(
    '#include <color_fragment>',
    colorFragmentInjection
  );

  const normalFragmentInjection = quality === 'high'
    ? `#include <normal_fragment_maps>
     float distToCam = length(vViewPosition);
     float closeDetail = smoothstep(2400.0, 250.0, distToCam);
     float eps = mix(4.5, 0.65, closeDetail);
     float h0 = rockDetailHeight(vRockWorldPos, closeDetail);
     vec3 worldGrad = vec3(
       rockDetailHeight(vRockWorldPos + vec3(eps, 0.0, 0.0), closeDetail) - h0,
       rockDetailHeight(vRockWorldPos + vec3(0.0, eps, 0.0), closeDetail) - h0,
       rockDetailHeight(vRockWorldPos + vec3(0.0, 0.0, eps), closeDetail) - h0
     ) / eps;
     vec3 viewGrad = mat3(viewMatrix) * worldGrad;
     viewGrad -= normal * dot(viewGrad, normal);
     normal = normalize(normal - viewGrad * mix(2.4, 1.35, closeDetail));
    `
    : `#include <normal_fragment_maps>
     vec3 dPosdx = dFdx(vViewPosition);
     vec3 dPosdy = dFdy(vViewPosition);
     float dHdx = dFdx(vRockHeightSignal);
     float dHdy = dFdy(vRockHeightSignal);
     vec3 r1 = cross(dPosdy, normal);
     vec3 r2 = cross(normal, dPosdx);
     float det = dot(dPosdx, r1);
     vec3 surfGrad = sign(det) * (dHdx * r1 + dHdy * r2);
     float bumpScale = mix(1.8, 0.85, smoothstep(250.0, 2400.0, length(vViewPosition)));
     normal = normalize(normal - surfGrad * (bumpScale / max(abs(det), 1e-4)));
    `;

  shader.fragmentShader = shader.fragmentShader.replace(
    '#include <normal_fragment_maps>',
    normalFragmentInjection
  );
}

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
      shaderQuality: 'balanced',
      particleDensity: 'balanced',
      physicsQuality: 'balanced',
      ...options
    };

    this.voxelQuality = this.options.voxelQuality || 'low';
    this.asteroidCount = this.options.asteroidCount !== undefined ? this.options.asteroidCount : 100;
    this.megaRadius = this.options.megaRadius !== undefined ? this.options.megaRadius : 2800;
    this.shaderQuality = this.options.shaderQuality || 'balanced';
    this.particleDensity = this.options.particleDensity || 'balanced';
    this.physicsQuality = this.options.physicsQuality || 'balanced';
    this._updateFrame = 0;

    const DENSITY_MULT = { low: 0.5, balanced: 1.0, high: 1.5 };
    this.particleDensityMultiplier = DENSITY_MULT[this.particleDensity] || 1.0;

    const QUALITY_RES = { low: 32, medium: 48, high: 64 };
    this.megaResolution = QUALITY_RES[this.voxelQuality] || 32;

    this.asteroids = []; // { mesh, mc, radius, position, rotationSpeed, boundingSphere }
    this.asteroidGroup = new THREE.Group();
    this.debrisList = [];
    this.rockMaterials = [];

    // P2P Asteroid Carve Synchronization state
    this.onCarve = null;
    this.carveHistory = [];
    this.isApplyingRemoteCarve = false;

    // Pre-allocated GPU InstancedMesh rock debris & explosion flash
    this.maxDebris = 400;
    this._prevDebrisCount = 0;
    this._debrisGeo = new THREE.DodecahedronGeometry(0.85, 0);
    this._debrisMat = new THREE.MeshStandardMaterial({
      color: 0x6a727d,
      roughness: 0.88,
      metalness: 0.12
    });
    this.debrisMesh = new THREE.InstancedMesh(this._debrisGeo, this._debrisMat, this.maxDebris);
    this.debrisMesh.instanceMatrix.setUsage(THREE.DynamicDrawUsage);
    this.debrisMesh.instanceColor = new THREE.InstancedBufferAttribute(new Float32Array(this.maxDebris * 3), 3);
    this.debrisMesh.instanceColor.setUsage(THREE.DynamicDrawUsage);
    this.debrisMesh.frustumCulled = false;

    this._flashGeo = new THREE.PlaneGeometry(1, 1);
    this._flashTex = createRadialGlowTexture(64);
    this._flashMat = new THREE.MeshBasicMaterial({
      map: this._flashTex,
      transparent: true,
      opacity: 0.85,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
      side: THREE.DoubleSide
    });
    this.debrisFlashMesh = new THREE.InstancedMesh(this._flashGeo, this._flashMat, this.maxDebris);
    this.debrisFlashMesh.instanceMatrix.setUsage(THREE.DynamicDrawUsage);
    this.debrisFlashMesh.instanceColor = new THREE.InstancedBufferAttribute(new Float32Array(this.maxDebris * 3), 3);
    this.debrisFlashMesh.instanceColor.setUsage(THREE.DynamicDrawUsage);
    this.debrisFlashMesh.frustumCulled = false;

    for (let i = 0; i < this.maxDebris; i++) {
      this.debrisMesh.setMatrixAt(i, _debrisHideMat);
      this.debrisFlashMesh.setMatrixAt(i, _debrisHideMat);
    }
    this.debrisMesh.instanceMatrix.needsUpdate = true;
    this.debrisFlashMesh.instanceMatrix.needsUpdate = true;

    this.scene.add(this.debrisMesh);
    this.scene.add(this.debrisFlashMesh);

    this.init();
  }

  setPerformanceConfig(newConfig = {}) {
    if (!newConfig || typeof newConfig !== 'object') return;
    if (newConfig.shaderQuality) {
      this.shaderQuality = newConfig.shaderQuality;
      if (this.rockMaterials) {
        for (let i = 0; i < this.rockMaterials.length; i++) {
          const mat = this.rockMaterials[i];
          if (mat) {
            applyTriplanarRockShader(mat, i, this.shaderQuality);
            mat.needsUpdate = true;
          }
        }
      }
    }
    if (newConfig.particleDensity) {
      this.particleDensity = newConfig.particleDensity;
      const DENSITY_MULT = { low: 0.5, balanced: 1.0, high: 1.5 };
      this.particleDensityMultiplier = DENSITY_MULT[this.particleDensity] || 1.0;
    }
    if (newConfig.physicsQuality) {
      this.physicsQuality = newConfig.physicsQuality;
    }
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

    // Permanent combat flash point light (pre-allocated & preserved visible to maintain fixed shader defines)
    this.combatFlashLight = new THREE.PointLight(0xff6600, 0.0, 160);
    this.combatFlashLight.position.set(0, 0, 0);
    this.combatFlashLight.visible = true;
    this.scene.add(this.combatFlashLight);

    // Permanent meteor hazard light (pre-allocated & preserved visible to maintain fixed shader defines)
    this.meteorLight = new THREE.PointLight(0xff3300, 0.0, 450);
    this.meteorLight.position.set(0, 0, 0);
    this.meteorLight.visible = true;
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

    // Smooth-shaded planetary rock materials with vertexColors & 3D triplanar shader
    // Belt asteroids use THREE.FrontSide backface culling (50% overdraw elimination);
    // Mega-Asteroid uses THREE.DoubleSide so interior excavated tunnel walls remain visible.
    const rustChondrite = new THREE.MeshStandardMaterial({
      color: 0xffffff,
      roughness: 0.88,
      metalness: 0.16,
      flatShading: false,
      bumpMap: null,
      depthWrite: true,
      side: THREE.FrontSide,
      vertexColors: true
    });
    applyTriplanarRockShader(rustChondrite, 0, this.shaderQuality);

    const charcoalBasalt = new THREE.MeshStandardMaterial({
      color: 0xffffff,
      roughness: 0.92,
      metalness: 0.10,
      flatShading: false,
      bumpMap: null,
      depthWrite: true,
      side: THREE.FrontSide,
      vertexColors: true
    });
    applyTriplanarRockShader(charcoalBasalt, 1, this.shaderQuality);

    const slateRock = new THREE.MeshStandardMaterial({
      color: 0xffffff,
      roughness: 0.86,
      metalness: 0.14,
      flatShading: false,
      bumpMap: null,
      depthWrite: true,
      side: THREE.FrontSide,
      vertexColors: true
    });
    applyTriplanarRockShader(slateRock, 2, this.shaderQuality);

    const nickelGranite = new THREE.MeshStandardMaterial({
      color: 0xffffff,
      roughness: 0.80,
      metalness: 0.26,
      flatShading: false,
      bumpMap: null,
      depthWrite: true,
      side: THREE.FrontSide,
      vertexColors: true
    });
    applyTriplanarRockShader(nickelGranite, 3, this.shaderQuality);

    const megaMat = rustChondrite.clone();
    megaMat.side = THREE.DoubleSide;
    applyTriplanarRockShader(megaMat, 0, this.shaderQuality);

    const materials = [rustChondrite, charcoalBasalt, slateRock, nickelGranite];
    this.megaMaterial = megaMat;
    this.beltMaterial = rustChondrite;
    this.rockMaterials = [megaMat, ...materials];

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

      const baseMat = materials[Math.floor(prng() * materials.length)];
      const mat = isMega ? megaMat : baseMat;
      const res = isMega ? this.megaResolution : (isMedium ? 20 : 16);
      const maxPolys = isMega ? 150000 : 30000;
      const polyAlloc = isMega ? 150000 : 6000;

      const mc = new MarchingCubes(res, mat, false, true, polyAlloc);
      mc.maxPolys = maxPolys;
      mc.isolation = 40.0;
      mc.frustumCulled = true;
      mc.crackField = new Float32Array(mc.size3);

      // Seeded impact crater basins (16-18 for mega, 3-5 for medium)
      const numCraters = isMega ? Math.floor(16 + prng() * 3) : (isMedium ? Math.floor(3 + prng() * 3) : 0);
      const craters = [];
      for (let c = 0; c < numCraters; c++) {
        const u = prng();
        const v = prng();
        const theta = u * 2.0 * Math.PI;
        const phi = Math.acos(2.0 * v - 1.0);
        craters.push({
          cx: Math.sin(phi) * Math.cos(theta),
          cy: Math.sin(phi) * Math.sin(theta),
          cz: Math.cos(phi),
          radius: 0.18 + prng() * 0.22,
          depth: 0.07 + prng() * 0.08,
          rimHeight: 0.03 + prng() * 0.03
        });
      }

      const half = mc.halfsize;
      const hInv = 1.0 / half;
      const noiseGen = create3DNoise(this.mapSeed + i * 47);

      for (let z = 0; z < res; z++) {
        const dz = (z - half) * hInv;
        for (let y = 0; y < res; y++) {
          const dy = (y - half) * hInv;
          for (let x = 0; x < res; x++) {
            const dx = (x - half) * hInv;
            const index = mc.size2 * z + mc.size * y + x;

            // 1. Boundary Safety: Strictly D = 0 on all outer boundary faces of mc.field to eliminate flat clipping
            if (x === 0 || x === res - 1 || y === 0 || y === res - 1 || z === 0 || z === res - 1) {
              mc.setCell(x, y, z, 0);
              if (mc.palette) {
                mc.palette[index * 3] = 0.2;
                mc.palette[index * 3 + 1] = 0.2;
                mc.palette[index * 3 + 2] = 0.2;
              }
              continue;
            }

            // Triaxial planetesimal asymmetry
            const dxA = dx * 1.02;
            const dyA = dy * 0.98;
            const dzA = dz * 1.03;
            const dist = Math.sqrt(dxA * dxA + dyA * dyA + dzA * dzA);

            if (dist < 0.0001) {
              mc.setCell(x, y, z, 100.0);
              if (mc.palette) {
                mc.palette[index * 3] = 0.20;
                mc.palette[index * 3 + 1] = 0.22;
                mc.palette[index * 3 + 2] = 0.25;
              }
              continue;
            }

            // 2. Multi-octave FBM + Ridged Noise
            const nFbm = noiseGen.fbm(dx * 2.8, dy * 2.8, dz * 2.8, 3) * 0.08;
            const nRidge = noiseGen.ridge(dx * 3.6, dy * 3.6, dz * 3.6, 3) * 0.06;

            // 3. Impact Craters SDF
            const dirX = dx / dist;
            const dirY = dy / dist;
            const dirZ = dz / dist;
            let craterDisplacement = 0;
            let craterTotalDepth = 0;

            for (let c = 0; c < craters.length; c++) {
              const cr = craters[c];
              const dot = dirX * cr.cx + dirY * cr.cy + dirZ * cr.cz;
              const chordSq = Math.max(0, 2.0 * (1.0 - dot));
              const chord = Math.sqrt(chordSq);
              if (chord < cr.radius * 1.35) {
                if (chord < cr.radius) {
                  // Bowl indentation
                  const normDist = chord / cr.radius;
                  const bowl = cr.depth * (1.0 - normDist * normDist);
                  craterDisplacement -= bowl;
                  craterTotalDepth += bowl;
                } else {
                  // Raised rim ring
                  const rimNorm = (chord - cr.radius) / (cr.radius * 0.35);
                  const rim = cr.rimHeight * (1.0 - rimNorm * rimNorm);
                  craterDisplacement += rim;
                }
              }
            }

            const distEff = dist + nFbm + nRidge - craterDisplacement;

            // 4. Smooth Hermite spherical boundary falloff near grid edge to guarantee zero clipping
            const radialDist = Math.hypot(dx, dy, dz);
            const edgeFalloff = radialDist > 0.82 ? Math.max(0, 1.0 - (radialDist - 0.82) / 0.13) : 1.0;
            const smoothEdge = edgeFalloff * edgeFalloff * (3.0 - 2.0 * edgeFalloff);

            // 5. Monotonic Solid Core Density Formulation (Center=100, Surface=isolation 40.0)
            let density;
            if (distEff <= ISOSURFACE_SCALE) {
              const t = Math.max(0.0, distEff / ISOSURFACE_SCALE);
              density = 100.0 - Math.pow(t, 1.4) * 60.0;
            } else {
              const t = Math.min(1.0, (distEff - ISOSURFACE_SCALE) / (0.94 - ISOSURFACE_SCALE));
              density = Math.max(0, 40.0 * (1.0 - t * t));
            }
            density *= smoothEdge;
            mc.setCell(x, y, z, density);

            // 6. Geological Strata Palette
            if (mc.palette) {
              const heightFactor = Math.min(1.0, Math.max(0.0, (dist - 0.55) / 0.25));
              const craterDarken = Math.max(0.0, Math.min(1.0, craterTotalDepth * 6.0));
              const ridgeFactor = Math.max(0.0, nRidge * 2.0);

              let r, g, b;
              if (dist < 0.55) {
                const oreNoise = noiseGen.noise(dx * 12.0 + 10.0, dy * 12.0 + 10.0, dz * 12.0 + 10.0);
                if (oreNoise > 0.62) {
                  r = 0.95; g = 0.62; b = 0.15; // rich amber/gold ore
                } else if (oreNoise < -0.65) {
                  r = 0.22; g = 0.80; b = 0.92; // cyan crystal/mineral vein
                } else {
                  r = 0.28; g = 0.30; b = 0.34; // dark subterranean basalt
                }
              } else {
                const baseR = 0.52, baseG = 0.50, baseB = 0.48;
                const ridgeR = 0.85, ridgeG = 0.75, ridgeB = 0.62; // weathered tan ridge
                const floorR = 0.25, floorG = 0.26, floorB = 0.29; // deep charcoal crater floor

                r = baseR * (1.0 - heightFactor) + ridgeR * heightFactor;
                g = baseG * (1.0 - heightFactor) + ridgeG * heightFactor;
                b = baseB * (1.0 - heightFactor) + ridgeB * heightFactor;

                r += ridgeFactor * 0.18;
                g += ridgeFactor * 0.14;
                b += ridgeFactor * 0.08;

                r = r * (1.0 - craterDarken) + floorR * craterDarken;
                g = g * (1.0 - craterDarken) + floorG * craterDarken;
                b = b * (1.0 - craterDarken) + floorB * craterDarken;
              }
              mc.palette[index * 3 + 0] = Math.min(1.0, Math.max(0.0, r));
              mc.palette[index * 3 + 1] = Math.min(1.0, Math.max(0.0, g));
              mc.palette[index * 3 + 2] = Math.min(1.0, Math.max(0.0, b));
            }
          }
        }
      }

      mc.basePalette = mc.palette ? new Float32Array(mc.palette) : null;

      updateNormalCache(mc, 1, res - 2, 1, res - 2, 1, res - 2);
      mc.update();
      if (mc.geometry && typeof mc.geometry.computeBoundingSphere === 'function') {
        if (!mc.geometry.boundingSphere) {
          mc.geometry.computeBoundingSphere();
        }
      }
      mc.scale.set(radius / ISOSURFACE_SCALE, radius / ISOSURFACE_SCALE, radius / ISOSURFACE_SCALE);

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
        id: isMega ? 'mega' : `ast_${i}`,
        index: i,
        mesh: mc,
        mc,
        radius,
        mass,
        hp,
        maxHp: hp,
        isMega,
        isMegaAsteroid: isMega,
        crackZones: [],
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
    const scaleR = radius / ISOSURFACE_SCALE;
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
    const scaleR = R / ISOSURFACE_SCALE;
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

      if (carving.carveShape === 'sphere') {
        if (distToCavity < (carving.carveRadius * 1.05)) {
          return true;
        }
        continue;
      }

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
    this.combatFlashLight.visible = true;
  }

  /**
   * Update asteroid drift, Keplerian orbital dynamics, and resolve pairwise asteroid-asteroid momentum collisions.
   */
  update(dt, playerPosition, playerVelocity, camera = null) {
    this._updateFrame = (this._updateFrame || 0) + 1;
    if (camera && camera.quaternion) {
      _spaceCamQuat.copy(camera.quaternion);
    } else {
      _spaceCamQuat.identity();
    }

    // Update rock debris particles via GPU InstancedMesh
    for (let i = this.debrisList.length - 1; i >= 0; i--) {
      const d = this.debrisList[i];
      d.life -= dt;
      if (d.life <= 0) {
        this.debrisList.splice(i, 1);
        continue;
      }
      d.pos.addScaledVector(d.vel, dt);
      d.vel.multiplyScalar(Math.pow(0.94, dt * 60));
      if (d.rot && d.rotAngle) {
        d.rotAngle.x += d.rot.x * dt;
        d.rotAngle.y += d.rot.y * dt;
        d.rotAngle.z += d.rot.z * dt;
      }
      if (d.mesh) {
        if (d.mesh.position) d.mesh.position.copy(d.pos);
        if (d.mesh.rotation && d.rotAngle) d.mesh.rotation.copy(d.rotAngle);
      }
    }

    const activeDebrisCount = this.debrisList.length;
    if (activeDebrisCount > 0 || this._prevDebrisCount > 0) {
      for (let i = 0; i < activeDebrisCount; i++) {
        const d = this.debrisList[i];
        const normLife = d.life / d.maxLife;
        const scale = (d.baseScale || 1.0) * normLife;

        // 1. Rock chunk instance
        _debrisDummy.position.copy(d.pos);
        if (d.rotAngle) _debrisDummy.rotation.copy(d.rotAngle);
        _debrisDummy.scale.set(scale, scale, scale);
        _debrisDummy.updateMatrix();
        this.debrisMesh.setMatrixAt(i, _debrisDummy.matrix);

        _debrisColor.setRGB(0.42 * normLife, 0.45 * normLife, 0.48 * normLife);
        this.debrisMesh.setColorAt(i, _debrisColor);

        // 2. Dust/flash billboard instance
        _flashDummy.position.copy(d.pos);
        _flashDummy.quaternion.copy(_spaceCamQuat);
        const flashScale = scale * 2.8;
        _flashDummy.scale.set(flashScale, flashScale, flashScale);
        _flashDummy.updateMatrix();
        this.debrisFlashMesh.setMatrixAt(i, _flashDummy.matrix);

        _flashColor.setRGB(1.0 * normLife, 0.75 * normLife, 0.45 * normLife);
        this.debrisFlashMesh.setColorAt(i, _flashColor);
      }

      // Only hide the dirty range [activeDebrisCount .. _prevDebrisCount - 1]
      for (let i = activeDebrisCount; i < this._prevDebrisCount; i++) {
        this.debrisMesh.setMatrixAt(i, _debrisHideMat);
        this.debrisFlashMesh.setMatrixAt(i, _debrisHideMat);
      }

      this.debrisMesh.instanceMatrix.needsUpdate = true;
      if (this.debrisMesh.instanceColor) this.debrisMesh.instanceColor.needsUpdate = true;
      this.debrisFlashMesh.instanceMatrix.needsUpdate = true;
      if (this.debrisFlashMesh.instanceColor) this.debrisFlashMesh.instanceColor.needsUpdate = true;
      this._prevDebrisCount = activeDebrisCount;
    }

    if (this.combatFlashLight) {
      if (this.combatFlashLight.intensity > 0) {
        this.combatFlashLight.intensity = Math.max(0, this.combatFlashLight.intensity - dt * 6.0);
      }
      this.combatFlashLight.visible = true;
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

      if (this.physicsQuality !== 'eco' || ((i + this._updateFrame) & 1) === 0) {
        const rotDt = this.physicsQuality === 'eco' ? dt * 2.0 : dt;
        a.mesh.rotation.x += a.rotationSpeed.x * rotDt;
        a.mesh.rotation.y += a.rotationSpeed.y * rotDt;
        a.mesh.rotation.z += a.rotationSpeed.z * rotDt;
      }

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

    // 2. Asteroid-Asteroid Pairwise Collision & Angular Sector-Pruned PBD Separation Solver
    // Belt asteroids orbit in an annular disc between R=3300 and 5500.
    // Asteroid 0 is the stationary Central Mega-Asteroid at (0,0,0) with R=megaRadius.
    // Using 24 angular sectors prunes >90% of pairwise checks without missing potential overlaps.
    const pbdPasses = this.physicsQuality === 'eco' ? 1 : 2;
    const sectorBins = new Array(24);
    for (let s = 0; s < 24; s++) sectorBins[s] = [];

    for (let i = 1; i < numAsteroids; i++) {
      const a = this.asteroids[i];
      if (!a) continue;
      const angle = Math.atan2(a.position.z, a.position.x);
      const bin = Math.floor(((angle + Math.PI) / (Math.PI * 2)) * 24) % 24;
      sectorBins[bin].push(i);
    }

    const aMega = this.asteroids[0];
    const megaRadius = aMega ? aMega.radius : 2800;

    for (let pass = 0; pass < pbdPasses; pass++) {
      // Mega-Asteroid vs Belt Asteroids (only if asteroid encroaches into mega zone)
      if (aMega) {
        for (let i = 1; i < numAsteroids; i++) {
          const a2 = this.asteroids[i];
          if (!a2) continue;
          const minDist = megaRadius + a2.radius;
          const p2 = a2.position;
          const distSq = p2.x * p2.x + p2.y * p2.y + p2.z * p2.z;
          if (distSq < minDist * minDist && distSq > 0.0001) {
            const dist = Math.sqrt(distSq);
            const nx = p2.x / dist;
            const ny = p2.y / dist;
            const nz = p2.z / dist;
            const overlap = minDist - dist;
            const push = Math.min(overlap * 0.55, 20.0);
            p2.x += nx * push;
            p2.y += ny * push;
            p2.z += nz * push;
            if (a2.boundingSphere) a2.boundingSphere.center.copy(p2);
            if (pass === 0) {
              const velAlong = a2.velocity.x * (-nx) + a2.velocity.y * (-ny) + a2.velocity.z * (-nz);
              if (velAlong > 0) {
                a2.velocity.x -= (1 + 0.5) * velAlong * (-nx);
                a2.velocity.y -= (1 + 0.5) * velAlong * (-ny);
                a2.velocity.z -= (1 + 0.5) * velAlong * (-nz);
              }
            }
          }
        }
      }

      // Belt Asteroids vs Belt Asteroids within same or adjacent angular sectors
      for (let s = 0; s < 24; s++) {
        const binA = sectorBins[s];
        const nextSector = (s + 1) % 24;
        const binB = sectorBins[nextSector];

        for (let idx1 = 0; idx1 < binA.length; idx1++) {
          const i = binA[idx1];
          const a1 = this.asteroids[i];
          const p1 = a1.position;

          // Same sector
          for (let idx2 = idx1 + 1; idx2 < binA.length; idx2++) {
            const j = binA[idx2];
            const a2 = this.asteroids[j];
            const minDist = a1.radius + a2.radius;
            const dx = p1.x - a2.position.x;
            if (Math.abs(dx) >= minDist) continue;
            const dz = p1.z - a2.position.z;
            if (Math.abs(dz) >= minDist) continue;
            const dy = p1.y - a2.position.y;
            if (Math.abs(dy) >= minDist) continue;

            const distSq = dx * dx + dy * dy + dz * dz;
            if (distSq < minDist * minDist && distSq > 0.0001) {
              this._resolvePairwiseAsteroidCollision(a1, a2, dx, dy, dz, minDist, Math.sqrt(distSq), pass);
            }
          }

          // Adjacent sector
          for (let idx2 = 0; idx2 < binB.length; idx2++) {
            const j = binB[idx2];
            const a2 = this.asteroids[j];
            const minDist = a1.radius + a2.radius;
            const dx = p1.x - a2.position.x;
            if (Math.abs(dx) >= minDist) continue;
            const dz = p1.z - a2.position.z;
            if (Math.abs(dz) >= minDist) continue;
            const dy = p1.y - a2.position.y;
            if (Math.abs(dy) >= minDist) continue;

            const distSq = dx * dx + dy * dy + dz * dz;
            if (distSq < minDist * minDist && distSq > 0.0001) {
              this._resolvePairwiseAsteroidCollision(a1, a2, dx, dy, dz, minDist, Math.sqrt(distSq), pass);
            }
          }
        }
      }
    }
  }

  _resolvePairwiseAsteroidCollision(a1, a2, dx, dy, dz, minDist, dist, pass) {
    const nx = dx / dist;
    const ny = dy / dist;
    const nz = dz / dist;
    const overlap = minDist - dist;
    const push = Math.min(overlap * 0.55, 20.0);

    const totalMass = a1.mass + a2.mass;
    const ratio1 = a2.mass / totalMass;
    const ratio2 = a1.mass / totalMass;

    a1.position.x += nx * push * ratio1;
    a1.position.y += ny * push * ratio1;
    a1.position.z += nz * push * ratio1;

    a2.position.x -= nx * push * ratio2;
    a2.position.y -= ny * push * ratio2;
    a2.position.z -= nz * push * ratio2;

    if (a1.boundingSphere) a1.boundingSphere.center.copy(a1.position);
    if (a2.boundingSphere) a2.boundingSphere.center.copy(a2.position);

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

    if (a1.velocity.length() > 40.0) a1.velocity.setLength(40.0);
    if (a2.velocity.length() > 40.0) a2.velocity.setLength(40.0);
  }

  /**
   * Fast collision query for projectiles and weapons
   * Uses volumetric density narrowphase for MarchingCubes asteroids so projectiles/missiles
   * can fly cleanly through carved tunnel corridors and only collide when striking solid rock.
   */
  checkCollision(position, radius = 2.5) {
    for (let i = 0; i < this.asteroids.length; i++) {
      const a = this.asteroids[i];
      const distSq = position.distanceToSquared(a.position);
      const combinedRadius = a.radius + radius;
      if (distSq < combinedRadius * combinedRadius) {
        if (a.mc && a.mc.field) {
          if (a.mesh && a.mesh.matrixWorld) a.mesh.updateMatrixWorld(true);
          const invMatrix = a.mesh?.matrixWorld ? a.mesh.matrixWorld.clone().invert() : new THREE.Matrix4().copy(a.mesh.matrix).invert();
          const scaleR = a.radius / ISOSURFACE_SCALE;
          const localPt = position.clone().applyMatrix4(invMatrix).multiplyScalar(scaleR);
          const density = this.sampleDensity(a.mc, localPt.x, localPt.y, localPt.z, a.radius);
          const iso = a.mc.isolation || 40.0;
          if (density > iso) {
            return a;
          }
        } else {
          return a;
        }
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
            const scaleR = a.radius / ISOSURFACE_SCALE;
            const localStart = startPos.clone().applyMatrix4(invMatrix).multiplyScalar(scaleR);
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

    // Check if ray is blocked by active flaming meteor hazard
    if (this.meteorSystem && this.meteorSystem.activeMeteor) {
      const m = this.meteorSystem.activeMeteor;
      const mPos = m.position || m.group?.position;
      if (mPos) {
        const toCenter = mPos.clone().sub(startPos);
        const proj = toCenter.dot(segDir);
        if (proj > 0 && proj < segLen) {
          const perpDistSq = toCenter.lengthSq() - (proj * proj);
          const r = (m.radius || 100) * 0.95;
          if (perpDistSq < r * r) {
            return true;
          }
        }
      }
    }

    return false;
  }

  /**
   * Cast a ray forward and find closest asteroid hit within maxDist.
   * Performs true volumetric ray-marching through mc.field with sub-voxel bisection refinement.
   * Penetrates excavated tunnels and hollow cavities.
   */
  checkRayCollision(origin, dir, maxDist = 3500.0) {
    const _t0 = performance.now();
    let closestHit = null;
    let closestDist = maxDist;

    for (let i = 0; i < this.asteroids.length; i++) {
      const a = this.asteroids[i];
      const toCenter = a.position.clone().sub(origin);
      const tca = toCenter.dot(dir);
      const distSqToCenter = toCenter.lengthSq();
      const rBound = a.radius * 1.15;
      const rBoundSq = rBound * rBound;

      let tEnter, tExit;
      if (distSqToCenter <= rBoundSq) {
        // Origin is already inside or on the bounding sphere
        tEnter = 0.0;
        const d2 = distSqToCenter - (tca * tca);
        const thc = Math.sqrt(Math.max(0, rBoundSq - d2));
        tExit = Math.min(closestDist, tca + thc);
      } else {
        if (tca < 0) continue; // Sphere is behind ray
        const d2 = distSqToCenter - (tca * tca);
        if (d2 > rBoundSq) continue; // Ray misses bounding sphere
        const thc = Math.sqrt(Math.max(0, rBoundSq - d2));
        tEnter = Math.max(0.0, tca - thc);
        tExit = Math.min(closestDist, tca + thc);
        if (tEnter > closestDist || tEnter >= tExit) continue;
      }

      if (a.mc && a.mc.field) {
        if (a.mesh && a.mesh.matrixWorld) a.mesh.updateMatrixWorld(true);
        const invMatrix = a.mesh?.matrixWorld ? a.mesh.matrixWorld.clone().invert() : new THREE.Matrix4().copy(a.mesh.matrix).invert();
        const scaleR = a.radius / ISOSURFACE_SCALE;
        const iso = a.mc.isolation || 40.0;
        const stepSize = a.isMegaAsteroid ? 28.0 : Math.max(4.0, a.radius * 0.12);

        let hitFound = false;
        let tHit = -1;
        let prevT = tEnter;

        for (let t = tEnter; t <= tExit; t += stepSize) {
          const pt = origin.clone().addScaledVector(dir, t);
          const localPt = pt.applyMatrix4(invMatrix).multiplyScalar(scaleR);
          const density = this.sampleDensity(a.mc, localPt.x, localPt.y, localPt.z, a.radius);
          const insideCarving = (!a.isMegaAsteroid && this.checkInsideCarvings(a, localPt));

          if (density > iso && !insideCarving) {
            // Sub-voxel bisection refinement between prevT and t
            let tLow = prevT;
            let tHigh = t;
            for (let iter = 0; iter < 4; iter++) {
              const tMid = 0.5 * (tLow + tHigh);
              const midPt = origin.clone().addScaledVector(dir, tMid);
              const midLocal = midPt.applyMatrix4(invMatrix).multiplyScalar(scaleR);
              const midDensity = this.sampleDensity(a.mc, midLocal.x, midLocal.y, midLocal.z, a.radius);
              const midInside = (!a.isMegaAsteroid && this.checkInsideCarvings(a, midLocal));
              if (midDensity > iso && !midInside) {
                tHigh = tMid;
              } else {
                tLow = tMid;
              }
            }
            tHit = 0.5 * (tLow + tHigh);
            hitFound = true;
            break;
          }
          prevT = t;
        }

        if (hitFound && tHit > 0 && tHit < closestDist) {
          closestDist = tHit;
          closestHit = {
            asteroid: a,
            distance: tHit,
            hitPoint: origin.clone().addScaledVector(dir, tHit)
          };
        }
      } else {
        // Fallback for non-marching cubes bodies
        let t0 = tEnter > 0 ? tEnter : tExit;
        if (t0 > 0 && t0 < closestDist) {
          closestDist = t0;
          closestHit = {
            asteroid: a,
            distance: t0,
            hitPoint: origin.clone().addScaledVector(dir, t0)
          };
        }
      }
    }
    const _dt = performance.now() - _t0;
    if (_dt > 5.0) {
      logger.warn('PERF:WARN', `[PERF:RAYCAST] checkRayCollision took ${_dt.toFixed(2)}ms (>5ms threshold)`);
    } else {
      logger.info('PERF:RAYCAST', `checkRayCollision completed in ${_dt.toFixed(2)}ms (hit: ${Boolean(closestHit)})`);
    }
    return closestHit;
  }

  /**
   * Resolves physical collision between ship and asteroid with hull-radius-aware multi-point sampling & swept density gradient.
   * Samples center, nose, tail, left/right wings, and belly using orientation quaternion (or velocity direction).
   * Ensures zero visual clipping with robust outward margin while maintaining insideCarving tunnel/cavern clearance.
   */
  resolveShipCollision(position, velocity, shipRadius = 14.0, shipMass = 1200, orientation = null, dt = 0.016) {
    this.lastCollisionLogTime = this.lastCollisionLogTime || 0;
    this.lastClipWarnTime = this.lastClipWarnTime || 0;
    const now = Date.now();

    for (let i = 0; i < this.asteroids.length; i++) {
      const a = this.asteroids[i];
      const dist = position.distanceTo(a.position);
      const boundCheck = a.radius * 1.12 + shipRadius + (velocity ? velocity.length() * dt : 0);

      if (dist < boundCheck) {
        if (a.mesh && a.mesh.matrixWorld) a.mesh.updateMatrixWorld(true);
        const invMatrix = a.mesh?.matrixWorld ? a.mesh.matrixWorld.clone().invert() : new THREE.Matrix4().copy(a.mesh.matrix).invert();
        const scaleR = a.radius / ISOSURFACE_SCALE;

        const forward = orientation ? new THREE.Vector3(0, 0, -1).applyQuaternion(orientation).normalize() : (velocity.lengthSq() > 0.001 ? velocity.clone().normalize() : new THREE.Vector3(0, 0, -1));
        const right = orientation ? new THREE.Vector3(1, 0, 0).applyQuaternion(orientation).normalize() : new THREE.Vector3(1, 0, 0).cross(forward).normalize();
        if (right.lengthSq() < 0.001) right.set(1, 0, 0);
        const up = orientation ? new THREE.Vector3(0, 1, 0).applyQuaternion(orientation).normalize() : new THREE.Vector3(0, 1, 0);

        const iso = a.mc?.isolation || 40.0;

        // Swept sub-stepping if velocity is significant and dt > 0.0001
        const speed = velocity ? velocity.length() : 0;
        const d = speed * dt;
        const voxelSize = (2.0 * scaleR) / (a.mc?.resolution || 32);
        const maxStep = Math.max(0.6, 0.5 * voxelSize);
        const N_steps = (speed > 0.1 && dt > 0.0001) ? Math.max(1, Math.min(16, Math.ceil(d / maxStep))) : 1;
        const subDt = dt / N_steps;

        const startPos = position.clone().addScaledVector(velocity || new THREE.Vector3(), -dt);

        const hasMC = !!(a.mc && a.mc.field);
        let colliding = false;
        let intersectingLocalPt = null;
        let collisionPos = position.clone();
        let hitPointName = 'center';
        let maxHullDensity = -999;
        let densityCenter = 0;
        let insideCarvingAny = false;
        let subStepInfo = `1/${N_steps}`;

        for (let s = 1; s <= N_steps; s++) {
          const currPos = startPos.clone().addScaledVector(velocity || new THREE.Vector3(), subDt * s);
          const hullPoints = [
            { name: 'center', pt: currPos.clone() },
            { name: 'nose', pt: currPos.clone().addScaledVector(forward, shipRadius) },
            { name: 'tail', pt: currPos.clone().addScaledVector(forward, -shipRadius * 0.7) },
            { name: 'leftWing', pt: currPos.clone().addScaledVector(right, -shipRadius * 0.8) },
            { name: 'rightWing', pt: currPos.clone().addScaledVector(right, shipRadius * 0.8) },
            { name: 'belly', pt: currPos.clone().addScaledVector(up, -shipRadius * 0.6) },
            { name: 'canopy', pt: currPos.clone().addScaledVector(up, shipRadius * 0.6) },
            { name: 'noseLeft', pt: currPos.clone().addScaledVector(forward, shipRadius * 0.7).addScaledVector(right, -shipRadius * 0.5) },
            { name: 'noseRight', pt: currPos.clone().addScaledVector(forward, shipRadius * 0.7).addScaledVector(right, shipRadius * 0.5) }
          ];

          let stepColliding = false;
          let stepIntersectingLocal = null;

          for (const hp of hullPoints) {
            const localPt = hp.pt.clone().applyMatrix4(invMatrix).multiplyScalar(scaleR);
            const insideCarving = this.checkInsideCarvings(a, localPt);
            if (insideCarving) insideCarvingAny = true;
            const density = this.sampleDensity(a.mc || a.mesh, localPt.x, localPt.y, localPt.z, a.radius);

            if (hp.name === 'center') densityCenter = density;
            if (density > maxHullDensity) {
              maxHullDensity = density;
              hitPointName = hp.name;
            }

            const isSolidRock = hasMC ? (density > iso) : (!insideCarving && density > iso);
            if (isSolidRock) {
              stepColliding = true;
              stepIntersectingLocal = localPt;
              break;
            }
          }

          if (stepColliding) {
            colliding = true;
            intersectingLocalPt = stepIntersectingLocal;
            collisionPos.copy(currPos);
            subStepInfo = `${s}/${N_steps}`;
            break;
          }
        }

        if (!colliding) {
          // Check for clipping warning even if no collision resolution returned
          const localCenter = position.clone().applyMatrix4(invMatrix).multiplyScalar(scaleR);
          const postDensity = this.sampleDensity(a.mc || a.mesh, localCenter.x, localCenter.y, localCenter.z, a.radius);
          if (postDensity > iso) {
            if (now - this.lastClipWarnTime >= 300) {
              this.lastClipWarnTime = now;
              const astId = a.id || (a.isMegaAsteroid ? 'mega' : 'asteroid');
              logger.log('COLLISION_CLIP_WARN', `UNRESOLVED_DENSITY asteroid=${astId} density=${postDensity.toFixed(1)} iso=40 pt=(${position.x.toFixed(1)},${position.y.toFixed(1)},${position.z.toFixed(1)})`);
            }
          }
          continue;
        }

        position.copy(collisionPos);

        // Intersecting solid rock! Calculate outward normal from continuous density gradient ∇D
        const normal = this.computeDensityGradientNormal(a, intersectingLocalPt || position.clone().applyMatrix4(invMatrix).multiplyScalar(scaleR));

        let stepDist = 0;
        const maxPush = a.isMegaAsteroid ? 50.0 : (shipRadius * 2.0 + 20.0);
        const stepInc = 1.5;
        const safeMargin = shipRadius + 0.6;

        const hullPointsAtCollision = [
          { name: 'center', pt: position.clone() },
          { name: 'nose', pt: position.clone().addScaledVector(forward, shipRadius) },
          { name: 'tail', pt: position.clone().addScaledVector(forward, -shipRadius * 0.7) },
          { name: 'leftWing', pt: position.clone().addScaledVector(right, -shipRadius * 0.8) },
          { name: 'rightWing', pt: position.clone().addScaledVector(right, shipRadius * 0.8) },
          { name: 'belly', pt: position.clone().addScaledVector(up, -shipRadius * 0.6) },
          { name: 'canopy', pt: position.clone().addScaledVector(up, shipRadius * 0.6) },
          { name: 'noseLeft', pt: position.clone().addScaledVector(forward, shipRadius * 0.7).addScaledVector(right, -shipRadius * 0.5) },
          { name: 'noseRight', pt: position.clone().addScaledVector(forward, shipRadius * 0.7).addScaledVector(right, shipRadius * 0.5) }
        ];

        while (stepDist < maxPush) {
          position.addScaledVector(normal, stepInc);
          stepDist += stepInc;

          let allClear = true;
          for (const hp of hullPointsAtCollision) {
            const testPt = hp.pt.clone().addScaledVector(normal, stepDist);
            const testLocal = testPt.applyMatrix4(invMatrix).multiplyScalar(scaleR);
            const density = this.sampleDensity(a.mc || a.mesh, testLocal.x, testLocal.y, testLocal.z, a.radius);
            const isPointSolid = hasMC ? (density > iso) : (!this.checkInsideCarvings(a, testLocal) && density > iso);
            if (isPointSolid) {
              allClear = false;
              break;
            }
          }
          if (allClear) break;
        }
        position.addScaledVector(normal, safeMargin);

        // Fail-safe post-resolution guarantee loop to ensure density <= iso
        if (hasMC) {
          let emergencySteps = 0;
          while (emergencySteps < 20) {
            const localCenter = position.clone().applyMatrix4(invMatrix).multiplyScalar(scaleR);
            const dCenter = this.sampleDensity(a.mc || a.mesh, localCenter.x, localCenter.y, localCenter.z, a.radius);
            if (dCenter <= iso) break;
            position.addScaledVector(normal, 1.5);
            emergencySteps++;
          }
        }

        const relVel = (velocity || new THREE.Vector3()).clone().sub(a.velocity);
        const vNorm = relVel.dot(normal);

        const localResolved = position.clone().applyMatrix4(invMatrix).multiplyScalar(scaleR);
        const postDensity = this.sampleDensity(a.mc || a.mesh, localResolved.x, localResolved.y, localResolved.z, a.radius);

        if (now - this.lastCollisionLogTime >= 350) {
          this.lastCollisionLogTime = now;
          const astId = a.id || (a.isMegaAsteroid ? 'mega' : 'asteroid');
          const isMega = !!a.isMegaAsteroid;
          const vNormStr = vNorm !== undefined ? vNorm.toFixed(1) : 'N/A';
          logger.log('COLLISION', `asteroid=${astId} isMega=${isMega} dist=${dist.toFixed(1)} speed=${speed.toFixed(1)} pt=(${position.x.toFixed(1)},${position.y.toFixed(1)},${position.z.toFixed(1)}) density=${densityCenter.toFixed(1)}/${maxHullDensity.toFixed(1)} iso=40 subStep=${subStepInfo} hitPt=${hitPointName} stepDist=${stepDist.toFixed(1)} vNorm=${vNormStr} insideCarve=${insideCarvingAny} postDensity=${postDensity.toFixed(1)}`);
        }

        if (postDensity > iso) {
          if (now - this.lastClipWarnTime >= 300) {
            this.lastClipWarnTime = now;
            const astId = a.id || (a.isMegaAsteroid ? 'mega' : 'asteroid');
            logger.log('COLLISION_CLIP_WARN', `UNRESOLVED_DENSITY asteroid=${astId} density=${postDensity.toFixed(1)} iso=40 pt=(${position.x.toFixed(1)},${position.y.toFixed(1)},${position.z.toFixed(1)})`);
          }
        } else if (insideCarvingAny) {
          if (now - this.lastClipWarnTime >= 300) {
            this.lastClipWarnTime = now;
            const astId = a.id || (a.isMegaAsteroid ? 'mega' : 'asteroid');
            logger.log('COLLISION_CARVE_EXEMPTION', `asteroid=${astId} density=${maxHullDensity.toFixed(1)} insideCarve=true pt=(${position.x.toFixed(1)},${position.y.toFixed(1)},${position.z.toFixed(1)})`);
          }
        }

        if (vNorm < 0) {
          const restitution = 0.85;
          const impulse = -(1 + restitution) * vNorm * shipMass;

          if (velocity) {
            velocity.addScaledVector(normal, (impulse / shipMass));
            // tangential friction damping
            const tangentVel = velocity.clone().addScaledVector(normal, -velocity.dot(normal));
            velocity.addScaledVector(tangentVel, -0.15);
          }

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
    const scaledCount = this.particleDensity === 'balanced'
      ? count
      : Math.max(1, Math.round(count * (this.particleDensityMultiplier || 1.0)));
    for (let i = 0; i < scaledCount; i++) {
      if (this.debrisList.length >= this.maxDebris) {
        this.debrisList.shift();
      }
      const spread = new THREE.Vector3(
        (Math.random() - 0.5) * 35.0,
        (Math.random() - 0.5) * 35.0,
        (Math.random() - 0.5) * 35.0
      );
      const vel = hitDir.clone().multiplyScalar(-18.0).add(spread);
      const maxLife = 0.5 + Math.random() * 0.4;
      const baseScale = 0.85 + Math.random() * 0.75;
      const rotSpeed = new THREE.Vector3(Math.random() * 8, Math.random() * 8, Math.random() * 8);
      const rotAngle = new THREE.Euler(Math.random() * Math.PI, Math.random() * Math.PI, Math.random() * Math.PI);
      const pos = hitPoint.clone();

      const mesh = {
        position: pos,
        rotation: rotAngle,
        scale: new THREE.Vector3(baseScale, baseScale, baseScale)
      };

      this.debrisList.push({
        pos,
        vel,
        rot: rotSpeed,
        rotAngle,
        life: maxLife,
        maxLife,
        baseScale,
        mesh
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
      asteroid.mc.basePalette = null;
      asteroid.mc.crackField = null;
    }
    return true;
  }

  getCrackStageAt(asteroid, worldPoint) {
    if (!asteroid || !asteroid.mesh || !worldPoint) return 0;
    if (asteroid.mesh.matrixWorld) asteroid.mesh.updateMatrixWorld(true);
    const invMatrix = asteroid.mesh.matrixWorld
      ? asteroid.mesh.matrixWorld.clone().invert()
      : new THREE.Matrix4().copy(asteroid.mesh.matrix).invert();
    const scaleR = asteroid.radius / ISOSURFACE_SCALE;
    const localPt = worldPoint.clone().applyMatrix4(invMatrix).multiplyScalar(scaleR);

    let maxStage = 0;
    if (Array.isArray(asteroid.crackZones)) {
      for (const z of asteroid.crackZones) {
        if ((z.localHit.distanceTo(localPt) / scaleR) <= z.localRadius * 1.15) {
          if (z.stage > maxStage) maxStage = z.stage;
        }
      }
    }

    const mc = asteroid.mc || asteroid.mesh;
    if (mc && mc.crackField) {
      const half = mc.halfsize;
      const res = mc.resolution;
      const gx = Math.max(0, Math.min(res - 1, Math.round((localPt.x / scaleR) * half + half)));
      const gy = Math.max(0, Math.min(res - 1, Math.round((localPt.y / scaleR) * half + half)));
      const gz = Math.max(0, Math.min(res - 1, Math.round((localPt.z / scaleR) * half + half)));
      const idx = mc.size2 * gz + mc.size * gy + gx;
      const vStage = Math.round(mc.crackField[idx] || 0);
      if (vStage > maxStage) maxStage = vStage;
    }
    return maxStage;
  }

  damageAsteroid(asteroid, damage = 5, hitPoint = null, hitDir = null, carveRadius = 24.0, carveDepth = 16.0, strength = 75.0, isRemote = false, maxCrackStages = 5) {
    if (!asteroid) return { destroyed: false, carved: false, cracked: false, crackStage: 0, carveResult: null };

    // Small asteroids have finite HP (20 HP = 50 laser shots at 0.4 damage each) and fracture visibly before shattering
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
        return { destroyed: true, carved: false, cracked: false, crackStage: maxCrackStages, asteroid, hp: 0, carveResult: null };
      }

      let carveRes = null;
      if (hitPoint && hitDir) {
        carveRes = this.fractureAsteroid(asteroid, hitPoint, hitDir, carveRadius, carveDepth, strength, isRemote, maxCrackStages);
      }
      return {
        destroyed: false,
        carved: Boolean(carveRes && carveRes.isosurfaceCrossed),
        cracked: Boolean(carveRes && carveRes.cracked),
        crackStage: carveRes ? carveRes.crackStage : 0,
        asteroid,
        hp: asteroid.hp,
        carveResult: carveRes
      };
    }

    // Medium/large belt asteroids and Central Mega-Asteroid undergo progressive fracture -> volumetric excavation
    let carveRes = null;
    if (hitPoint && hitDir) {
      carveRes = this.fractureAsteroid(asteroid, hitPoint, hitDir, carveRadius, carveDepth, strength, isRemote, maxCrackStages);
    }
    return {
      destroyed: false,
      carved: Boolean(carveRes && carveRes.isosurfaceCrossed),
      cracked: Boolean(carveRes && carveRes.cracked),
      crackStage: carveRes ? carveRes.crackStage : 0,
      asteroid,
      hp: asteroid.hp,
      carveResult: carveRes
    };
  }

  /**
   * Progressive Asteroid Fracture & Surface Cracking:
   * - Accumulates fracture stages in a localized impact zone
   * - Triggers volumetric excavation at maxCrackStages.
   */
  fractureAsteroid(asteroid, hitPoint, hitDir, carveRadius = 24.0, carveDepth = 16.0, strength = 75.0, isRemote = false, maxCrackStages = 5) {
    const _t0 = performance.now();
    if (!asteroid || !asteroid.mesh || !hitPoint || !hitDir) {
      return {
        voxelsModified: 0,
        crackStage: 0,
        maxCrackStage: 5,
        cracked: false,
        excavated: false,
        isosurfaceCrossed: false,
        isosurfaceCrossedCount: 0,
        totalDensityDelta: 0,
        maxDensityDelta: 0,
        carveRadius: 0,
        carveDepth: 0,
        isMega: false,
        reason: 'invalid_asteroid'
      };
    }

    const mc = asteroid.mc || asteroid.mesh;
    if (!mc || !mc.field || typeof mc.getCell !== 'function') {
      return {
        voxelsModified: 0,
        crackStage: 0,
        maxCrackStage: 5,
        cracked: false,
        excavated: false,
        isosurfaceCrossed: false,
        isosurfaceCrossedCount: 0,
        totalDensityDelta: 0,
        maxDensityDelta: 0,
        carveRadius: 0,
        carveDepth: 0,
        isMega: false,
        reason: 'invalid_mc_field'
      };
    }

    if (!mc.crackField && mc.size3) {
      mc.crackField = new Float32Array(mc.size3);
    }
    if (!mc.basePalette && mc.palette) {
      mc.basePalette = new Float32Array(mc.palette);
    }
    if (!Array.isArray(asteroid.crackZones)) {
      asteroid.crackZones = [];
    }

    if (asteroid.mesh.matrixWorld) asteroid.mesh.updateMatrixWorld(true);
    const sourceMat = asteroid.mesh.matrixWorld || asteroid.mesh.matrix;
    _scratchInvMat.copy(sourceMat).invert();
    const scaleR = asteroid.radius / ISOSURFACE_SCALE;
    const localHit = _scratchLocalHit.copy(hitPoint).applyMatrix4(_scratchInvMat).multiplyScalar(scaleR);
    const localDir = _scratchLocalDir.copy(hitDir).transformDirection(_scratchInvMat).normalize();

    const isMega = Boolean(asteroid.isMega || asteroid.isMegaAsteroid || asteroid.radius >= 1000);
    const half = mc.halfsize;
    const res = mc.resolution;

    const effectiveRadius = carveRadius;
    const effectiveDepth = carveDepth || carveRadius;
    const localRadius = (effectiveRadius / scaleR) * 0.95;

    let zone = null;
    for (let i = 0; i < asteroid.crackZones.length; i++) {
      const z = asteroid.crackZones[i];
      const matchRadius = Math.max(z.localRadius, localRadius);
      if ((z.localHit.distanceTo(localHit) / scaleR) <= matchRadius) {
        zone = z;
        break;
      }
    }

    if (zone) {
      zone.stage += 1;
      zone.localHit.lerp(localHit, 0.25);
    } else {
      zone = {
        localHit: localHit.clone(),
        localDir: localDir.clone(),
        localRadius,
        stage: 1
      };
      asteroid.crackZones.push(zone);
    }

    // Excavate rock volume!
    if (zone.stage >= maxCrackStages) {
      const zIdx = asteroid.crackZones.indexOf(zone);
      if (zIdx !== -1) asteroid.crackZones.splice(zIdx, 1);

      const resCarve = this.carveAsteroid(asteroid, hitPoint, hitDir, carveRadius, carveDepth, strength, isRemote);
      return {
        ...resCarve,
        crackStage: maxCrackStages,
        maxCrackStage: maxCrackStages,
        cracked: false,
        excavated: true
      };
    }

    // Progressive non-destructive surface fracture & palette fissure etching
    const severity = zone.stage / maxCrackStages;
    const iso = mc.isolation || 40.0;
    const hInv = 1.0 / half;
    const lhx = localHit.x, lhy = localHit.y, lhz = localHit.z;
    const rSq = effectiveRadius * effectiveRadius;
    const invR = 1.0 / effectiveRadius;

    // Spherical bounding box in local coordinates
    const minPx = lhx - effectiveRadius;
    const maxPx = lhx + effectiveRadius;
    const minPy = lhy - effectiveRadius;
    const maxPy = lhy + effectiveRadius;
    const minPz = lhz - effectiveRadius;
    const maxPz = lhz + effectiveRadius;

    const minX = Math.max(0, Math.floor((minPx / scaleR) * half + half) - 1);
    const maxX = Math.min(res - 1, Math.ceil((maxPx / scaleR) * half + half) + 1);
    const minY = Math.max(0, Math.floor((minPy / scaleR) * half + half) - 1);
    const maxY = Math.min(res - 1, Math.ceil((maxPy / scaleR) * half + half) + 1);
    const minZ = Math.max(0, Math.floor((minPz / scaleR) * half + half) - 1);
    const maxZ = Math.min(res - 1, Math.ceil((maxPz / scaleR) * half + half) + 1);

    let voxelsModified = 0;
    let totalDensityDelta = 0.0;
    let maxDensityDelta = 0.0;
    let closestSolidVoxel = null;
    let minSolidDistSq = Infinity;

    const applyPaletteFracture = (x, y, z, idx, factor) => {
      if (!mc.palette) return;
      const pIdx = idx * 3;
      const baseR = mc.basePalette ? mc.basePalette[pIdx] : mc.palette[pIdx];
      const baseG = mc.basePalette ? mc.basePalette[pIdx + 1] : mc.palette[pIdx + 1];
      const baseB = mc.basePalette ? mc.basePalette[pIdx + 2] : mc.palette[pIdx + 2];

      const px = (x - half) * hInv;
      const py = (y - half) * hInv;
      const pz = (z - half) * hInv;
      const fissureWave = Math.abs(
        Math.sin(px * 19.0 + py * 23.0 - pz * 17.0) *
        Math.cos(px * 13.0 - py * 29.0 + pz * 31.0)
      );
      const darken = Math.min(1.0, severity * (0.45 + 0.55 * factor) * (0.65 + 0.35 * fissureWave));
      const newR = baseR * (1.0 - darken) + 0.03 * darken;
      const newG = baseG * (1.0 - darken) + 0.04 * darken;
      const newB = baseB * (1.0 - darken) + 0.06 * darken;

      const curLuma = mc.palette[pIdx] * 0.299 + mc.palette[pIdx + 1] * 0.587 + mc.palette[pIdx + 2] * 0.114;
      const newLuma = newR * 0.299 + newG * 0.587 + newB * 0.114;
      if (newLuma <= curLuma + 1e-5) {
        mc.palette[pIdx] = newR;
        mc.palette[pIdx + 1] = newG;
        mc.palette[pIdx + 2] = newB;
      }
    };

    for (let z = minZ; z <= maxZ; z++) {
      const lz = (z - half) * hInv * scaleR;
      const diffZ = lz - lhz;
      for (let y = minY; y <= maxY; y++) {
        const ly = (y - half) * hInv * scaleR;
        const diffY = ly - lhy;
        for (let x = minX; x <= maxX; x++) {
          const lx = (x - half) * hInv * scaleR;
          const diffX = lx - lhx;
          const distSq = diffX * diffX + diffY * diffY + diffZ * diffZ;

          const idx = mc.size2 * z + mc.size * y + x;
          const current = mc.field[idx];

          if (current > iso && distSq < minSolidDistSq) {
            minSolidDistSq = distSq;
            closestSolidVoxel = { x, y, z, idx, val: current };
          }

          if (distSq < rSq && current > 0) {
            const dist = Math.sqrt(distSq);
            const u = 1.0 - (dist * invR);
            let factor;
            if (u >= 0.35) {
              factor = 1.0;
            } else {
              const s = Math.max(0.0, u / 0.35);
              factor = s * s * (3.0 - 2.0 * s);
            }

            if (factor > 0) {
              const newCrack = Math.min(4.0, zone.stage * factor);
              if (mc.crackField && newCrack > mc.crackField[idx]) {
                mc.crackField[idx] = newCrack;
              }

              // Subtle non-destructive surface stress indentation (strictly remains > iso)
              if (current > iso + 4.0) {
                const nextVal = Math.max(iso + 2.0, current - factor * 2.5);
                const delta = current - nextVal;
                if (delta > 0.001) {
                  mc.field[idx] = nextVal;
                  totalDensityDelta += delta;
                  if (delta > maxDensityDelta) maxDensityDelta = delta;
                }
              }

              applyPaletteFracture(x, y, z, idx, factor);
              voxelsModified++;
            }
          }
        }
      }
    }

    // Nearest-voxel fallback if grid spacing missed the brush
    if (voxelsModified === 0) {
      let fb = closestSolidVoxel;
      if (!fb) {
        const gx = Math.max(0, Math.min(res - 1, Math.round((lhx / scaleR) * half + half)));
        const gy = Math.max(0, Math.min(res - 1, Math.round((lhy / scaleR) * half + half)));
        const gz = Math.max(0, Math.min(res - 1, Math.round((lhz / scaleR) * half + half)));
        const fIdx = mc.size2 * gz + mc.size * gy + gx;
        fb = { x: gx, y: gy, z: gz, idx: fIdx, val: mc.field[fIdx] };
      }
      if (fb) {
        if (mc.crackField && zone.stage > mc.crackField[fb.idx]) {
          mc.crackField[fb.idx] = zone.stage;
        }
        if (fb.val > iso + 4.0) {
          const nextVal = Math.max(iso + 2.0, fb.val - 2.5);
          const delta = fb.val - nextVal;
          mc.field[fb.idx] = nextVal;
          totalDensityDelta += delta;
          if (delta > maxDensityDelta) maxDensityDelta = delta;
        }
        applyPaletteFracture(fb.x, fb.y, fb.z, fb.idx, 1.0);
        voxelsModified = 1;
      }
    }

    updateNormalCache(mc, minX - 1, maxX + 1, minY - 1, maxY + 1, minZ - 1, maxZ + 1);
    mc.update();
    if (mc.geometry && typeof mc.geometry.computeBoundingSphere === 'function') {
      if (!mc.geometry.boundingSphere) {
        mc.geometry.computeBoundingSphere();
      }
    }

    this.spawnRockDebris(hitPoint, hitDir, 2 + zone.stage * 2);

    const carveResult = {
      voxelsModified,
      crackStage: zone.stage,
      maxCrackStage: 5,
      cracked: true,
      excavated: false,
      isosurfaceCrossed: false,
      isosurfaceCrossedCount: 0,
      totalDensityDelta: Number(totalDensityDelta.toFixed(1)),
      maxDensityDelta: Number(maxDensityDelta.toFixed(1)),
      carveRadius: Number(effectiveRadius.toFixed(1)),
      carveDepth: Number(effectiveDepth.toFixed(1)),
      isMega,
      reason: 'cracked_stage_' + zone.stage
    };

    logger.log('CARVE', `asteroid=${asteroid.id || (isMega ? 'mega' : 'asteroid')} isMega=${isMega} crackStage=${zone.stage}/5 hit=(${hitPoint.x.toFixed(1)},${hitPoint.y.toFixed(1)},${hitPoint.z.toFixed(1)}) r=${carveResult.carveRadius} d=${carveResult.carveDepth} voxels=${carveResult.voxelsModified} crossed=0 delta=${carveResult.totalDensityDelta}`);

    if (!isRemote && !this.isApplyingRemoteCarve) {
      const targetIdx = this.asteroids.indexOf(asteroid);
      const carvePayload = {
        asteroidIndex: targetIdx >= 0 ? targetIdx : (asteroid.index !== undefined ? asteroid.index : 0),
        isMega,
        hitPoint: { x: hitPoint.x, y: hitPoint.y, z: hitPoint.z },
        hitDir: { x: hitDir.x, y: hitDir.y, z: hitDir.z },
        carveRadius: Number(effectiveRadius.toFixed(1)),
        carveDepth: Number(effectiveDepth.toFixed(1)),
        strength,
        isFracture: true,
        stage: zone.stage,
        timestamp: Date.now()
      };
      this.recordCarveHistory(carvePayload);
      if (typeof this.onCarve === 'function') {
        this.onCarve(carvePayload);
      }
    }

    const _dt = performance.now() - _t0;
    if (_dt > 5.0) {
      logger.warn('PERF:WARN', `[PERF:ASTEROID_FRACTURE] fractureAsteroid took ${_dt.toFixed(2)}ms (>5ms threshold)`);
    } else {
      logger.info('PERF:ASTEROID_FRACTURE', `fractureAsteroid completed in ${_dt.toFixed(2)}ms (stage: ${zone.stage})`);
    }

    return carveResult;
  }

  /**
   * Runtime volumetric MarchingCubes asteroid carving:
   * - Converts hitPoint and hitDir to asteroid local space
   * - Maps local coordinates [-R, R] to grid cells [0, res-1]
   * - Spherical carve shape centered at localHit on the asteroid surface
   * - Cubic Hermite smoothstep falloff u^2 * (3 - 2u)
   * - Carves localized spherical voids (default ~10% ship volume at 6.5u radius)
   * - Exposes carveRadius as room configuration parameter
   * - Updates mc.palette on partially carved cells for scorched walls & exposed ore
   * - Localized mc.update() to regenerate surface polygons
   * - Returns structured carveResult telemetry payload
   */
  carveAsteroid(asteroid, hitPoint, hitDir, carveRadius = 6.5, carveDepth = null, strength = 80.0, isRemote = false) {
    const _t0 = performance.now();
    if (!asteroid || !asteroid.mesh) {
      return {
        voxelsModified: 0,
        isosurfaceCrossed: false,
        isosurfaceCrossedCount: 0,
        totalDensityDelta: 0,
        maxDensityDelta: 0,
        carveShape: 'sphere',
        carveRadius: 0,
        carveDepth: 0,
        isMega: false,
        reason: 'invalid_asteroid'
      };
    }
    const mc = asteroid.mc || asteroid.mesh;
    if (!mc || !mc.field || typeof mc.getCell !== 'function') {
      return {
        voxelsModified: 0,
        isosurfaceCrossed: false,
        isosurfaceCrossedCount: 0,
        totalDensityDelta: 0,
        maxDensityDelta: 0,
        carveShape: 'sphere',
        carveRadius: 0,
        carveDepth: 0,
        isMega: false,
        reason: 'invalid_mc_field'
      };
    }

    if (asteroid.mesh.matrixWorld) asteroid.mesh.updateMatrixWorld(true);
    const sourceMat = asteroid.mesh.matrixWorld || asteroid.mesh.matrix;
    _scratchInvMat.copy(sourceMat).invert();
    const scaleR = asteroid.radius / ISOSURFACE_SCALE;
    const localHit = _scratchLocalHit.copy(hitPoint).applyMatrix4(_scratchInvMat).multiplyScalar(scaleR);
    const localDir = _scratchLocalDir.copy(hitDir).transformDirection(_scratchInvMat).normalize();

    const isMega = !!(asteroid.radius >= 2500 || asteroid.isMegaAsteroid || asteroid.isMega);

    const half = mc.halfsize;
    const res = mc.resolution;
    const voxelSize = (scaleR * 2.0) / res;

    // Continuous spherical carving centered at laser hit point
    const sphereRadius = (typeof carveRadius === 'number' && carveRadius > 0) ? carveRadius : 6.5;
    const depth = carveDepth || sphereRadius;
    // On coarse MarchingCubes lattices (e.g. Mega-Asteroid where voxelSize can be ~109u),
    // ensure the brush influence touches the neighboring voxel cell vertices enclosing localHit.
    const effectiveBrushRadius = (isMega && sphereRadius < voxelSize * 1.1)
      ? Math.max(sphereRadius, voxelSize * 1.1)
      : sphereRadius;
    const effectiveBrushRadiusSq = effectiveBrushRadius * effectiveBrushRadius;
    const invBrushRadius = 1.0 / effectiveBrushRadius;
    const carveStrength = (strength !== undefined && strength !== null) ? strength : (isMega ? 160.0 : 80.0);

    let voxelsModified = 0;
    let isosurfaceCrossedCount = 0;
    let totalDensityDelta = 0.0;
    let maxDensityDelta = 0.0;

    const iso = mc.isolation || 40.0;
    const hInv = 1.0 / half;
    const lhx = localHit.x, lhy = localHit.y, lhz = localHit.z;

    // Spherical bounding box in local coordinates around localHit
    const minPx = lhx - effectiveBrushRadius;
    const maxPx = lhx + effectiveBrushRadius;
    const minPy = lhy - effectiveBrushRadius;
    const maxPy = lhy + effectiveBrushRadius;
    const minPz = lhz - effectiveBrushRadius;
    const maxPz = lhz + effectiveBrushRadius;

    // Clamped grid AABB
    const minX = Math.max(0, Math.floor((minPx / scaleR) * half + half) - 1);
    const maxX = Math.min(res - 1, Math.ceil((maxPx / scaleR) * half + half) + 1);
    const minY = Math.max(0, Math.floor((minPy / scaleR) * half + half) - 1);
    const maxY = Math.min(res - 1, Math.ceil((maxPy / scaleR) * half + half) + 1);
    const minZ = Math.max(0, Math.floor((minPz / scaleR) * half + half) - 1);
    const maxZ = Math.min(res - 1, Math.ceil((maxPz / scaleR) * half + half) + 1);

    let closestSolidVoxel = null;
    let minSolidDistSq = Infinity;

    for (let z = minZ; z <= maxZ; z++) {
      const lz = (z - half) * hInv * scaleR;
      const diffZ = lz - lhz;
      for (let y = minY; y <= maxY; y++) {
        const ly = (y - half) * hInv * scaleR;
        const diffY = ly - lhy;
        for (let x = minX; x <= maxX; x++) {
          const lx = (x - half) * hInv * scaleR;
          const diffX = lx - lhx;
          const distSq = diffX * diffX + diffY * diffY + diffZ * diffZ;

          const current = mc.getCell(x, y, z);
          if (current > iso) {
            if (distSq < minSolidDistSq) {
              minSolidDistSq = distSq;
              closestSolidVoxel = { x, y, z, val: current };
            }
          }

          if (distSq < effectiveBrushRadiusSq) {
            const dist = Math.sqrt(distSq);
            const u = 1.0 - (dist * invBrushRadius);
            const factor = u * u * (3.0 - 2.0 * u);

            if (current > 0 && factor > 0) {
              const sub = factor * carveStrength;
              const nextVal = Math.max(0, current - sub);
              const delta = current - nextVal;

              if (delta > 0.001) {
                mc.setCell(x, y, z, nextVal);
                voxelsModified++;
                totalDensityDelta += delta;
                if (delta > maxDensityDelta) maxDensityDelta = delta;

                const idx = mc.size2 * z + mc.size * y + x;
                if (nextVal <= iso && mc.crackField) {
                  mc.crackField[idx] = 0;
                }

                if (current > iso && nextVal <= iso) {
                  isosurfaceCrossedCount++;
                }

                // Update palette on tunnel wall / partially carved cells
                if (mc.palette && nextVal > 0 && nextVal < 60) {
                  const pIdx = idx * 3;
                  const ore = Math.sin(x * 1.5 + y * 2.3 + z * 1.8);
                  if (ore > 0.55) {
                    mc.palette[pIdx] = 1.0;
                    mc.palette[pIdx + 1] = 0.55;
                    mc.palette[pIdx + 2] = 0.12;
                  } else if (ore < -0.6) {
                    mc.palette[pIdx] = 0.25;
                    mc.palette[pIdx + 1] = 0.85;
                    mc.palette[pIdx + 2] = 0.98;
                  } else {
                    mc.palette[pIdx] = 0.16;
                    mc.palette[pIdx + 1] = 0.17;
                    mc.palette[pIdx + 2] = 0.19;
                  }
                }
              }
            }
          }
        }
      }
    }

    // Guaranteed Nearest-Voxel Fallback for Mega-Asteroid
    if (isMega && isosurfaceCrossedCount === 0) {
      let fallbackVoxel = closestSolidVoxel;
      if (!fallbackVoxel) {
        // Search immediate 5x5x5 neighborhood around localHit in grid
        const gx = Math.round((lhx / scaleR) * half + half);
        const gy = Math.round((lhy / scaleR) * half + half);
        const gz = Math.round((lhz / scaleR) * half + half);
        for (let dz = -2; dz <= 2 && !fallbackVoxel; dz++) {
          const cz = Math.max(0, Math.min(res - 1, gz + dz));
          for (let dy = -2; dy <= 2 && !fallbackVoxel; dy++) {
            const cy = Math.max(0, Math.min(res - 1, gy + dy));
            for (let dx = -2; dx <= 2 && !fallbackVoxel; dx++) {
              const cx = Math.max(0, Math.min(res - 1, gx + dx));
              const val = mc.getCell(cx, cy, cz);
              if (val > iso) {
                fallbackVoxel = { x: cx, y: cy, z: cz, val };
              }
            }
          }
        }
      }

      if (fallbackVoxel) {
        const prev = mc.getCell(fallbackVoxel.x, fallbackVoxel.y, fallbackVoxel.z);
        if (prev > iso) {
          mc.setCell(fallbackVoxel.x, fallbackVoxel.y, fallbackVoxel.z, 0);
          voxelsModified++;
          isosurfaceCrossedCount++;
          totalDensityDelta += prev;
          if (prev > maxDensityDelta) maxDensityDelta = prev;
          const fIdx = mc.size2 * fallbackVoxel.z + mc.size * fallbackVoxel.y + fallbackVoxel.x;
          if (mc.crackField) mc.crackField[fIdx] = 0;
          if (mc.palette) {
            const pIdx = fIdx * 3;
            mc.palette[pIdx] = 0.16;
            mc.palette[pIdx + 1] = 0.17;
            mc.palette[pIdx + 2] = 0.19;
          }
        }
      }
    }

    if (voxelsModified > 0) {
      updateNormalCache(mc, minX - 1, maxX + 1, minY - 1, maxY + 1, minZ - 1, maxZ + 1);
      mc.update();
      if (mc.geometry && typeof mc.geometry.computeBoundingSphere === 'function') {
        if (!mc.geometry.boundingSphere) {
          mc.geometry.computeBoundingSphere();
        }
      }
    }

    const carveResult = {
      voxelsModified,
      isosurfaceCrossed: isosurfaceCrossedCount > 0,
      isosurfaceCrossedCount,
      totalDensityDelta: Number(totalDensityDelta.toFixed(1)),
      maxDensityDelta: Number(maxDensityDelta.toFixed(1)),
      carveShape: 'sphere',
      carveRadius: Number(sphereRadius.toFixed(1)),
      carveDepth: Number(depth.toFixed(1)),
      hitPoint: { x: hitPoint.x, y: hitPoint.y, z: hitPoint.z },
      isMega,
      reason: voxelsModified > 0 ? 'ok' : 'no_solid_voxels_in_brush'
    };

    logger.log('CARVE', `asteroid=${asteroid.id || (isMega ? 'mega' : 'asteroid')} isMega=${isMega} hit=(${hitPoint.x.toFixed(1)},${hitPoint.y.toFixed(1)},${hitPoint.z.toFixed(1)}) r=${carveResult.carveRadius} shape=sphere voxels=${carveResult.voxelsModified} crossed=${carveResult.isosurfaceCrossedCount} delta=${carveResult.totalDensityDelta}`);

    asteroid.carvings = asteroid.carvings || [];
    asteroid.carvings.push({
      localHit: localHit.clone(),
      localDir: localDir.clone(),
      cavityCenter: localHit.clone(),
      carveShape: 'sphere',
      carveRadius: sphereRadius,
      carveDepth: depth,
      isThroughTunnel: false,
      carvedVolume: totalDensityDelta,
      carvedCells: voxelsModified,
      carveResult,
      timestamp: Date.now()
    });

    const debrisCount = sphereRadius > 20 ? 16 : 8;
    this.spawnRockDebris(hitPoint, hitDir, debrisCount);

    if (!isRemote && !this.isApplyingRemoteCarve) {
      const targetIdx = this.asteroids.indexOf(asteroid);
      const carvePayload = {
        asteroidIndex: targetIdx >= 0 ? targetIdx : (asteroid.index !== undefined ? asteroid.index : 0),
        isMega,
        hitPoint: { x: hitPoint.x, y: hitPoint.y, z: hitPoint.z },
        hitDir: { x: hitDir.x, y: hitDir.y, z: hitDir.z },
        carveShape: 'sphere',
        carveRadius: Number(sphereRadius.toFixed(1)),
        carveDepth: Number(depth.toFixed(1)),
        strength,
        isFracture: false,
        timestamp: Date.now()
      };
      this.recordCarveHistory(carvePayload);
      if (typeof this.onCarve === 'function') {
        this.onCarve(carvePayload);
      }
    }

    const _dt = performance.now() - _t0;
    if (_dt > 5.0) {
      logger.warn('PERF:WARN', `[PERF:ASTEROID_FRACTURE] carveAsteroid took ${_dt.toFixed(2)}ms (>5ms threshold)`);
    } else {
      logger.info('PERF:ASTEROID_FRACTURE', `carveAsteroid completed in ${_dt.toFixed(2)}ms (voxels: ${voxelsModified})`);
    }

    return carveResult;
  }

  getAsteroid(target) {
    if (!target) return null;
    if (target.mesh && target.mc) return target;
    if (target.isMega) {
      return this.asteroids.find(a => a.isMega) || this.asteroids[0];
    }
    if (typeof target.asteroidIndex === 'number' && target.asteroidIndex >= 0 && target.asteroidIndex < this.asteroids.length) {
      return this.asteroids[target.asteroidIndex];
    }
    if (typeof target === 'number' && target >= 0 && target < this.asteroids.length) {
      return this.asteroids[target];
    }
    if (typeof target.asteroidId === 'string') {
      return this.asteroids.find(a => a.id === target.asteroidId) || null;
    }
    return this.asteroids[0] || null;
  }

  applyRemoteCarve(carveData) {
    if (!carveData) return null;
    const ast = this.getAsteroid(carveData);
    if (!ast) return null;
    const hp = carveData.hitPoint;
    const hd = carveData.hitDir;
    if (!hp || !hd) return null;
    const hitPoint = _scratchHitPoint.set(hp.x, hp.y, hp.z);
    const hitDir = _scratchHitDir.set(hd.x, hd.y, hd.z);
    const carveRadius = carveData.carveRadius !== undefined ? carveData.carveRadius : 32.0;
    const carveDepth = carveData.carveDepth !== undefined ? carveData.carveDepth : 36.0;
    const strength = carveData.strength !== undefined ? carveData.strength : 80.0;

    this.isApplyingRemoteCarve = true;
    try {
      this.recordCarveHistory(carveData);
      if (carveData.isFracture) {
        return this.fractureAsteroid(ast, hitPoint, hitDir, carveRadius, carveDepth, strength, true);
      } else {
        return this.carveAsteroid(ast, hitPoint, hitDir, carveRadius, carveDepth, strength, true);
      }
    } finally {
      this.isApplyingRemoteCarve = false;
    }
  }

  recordCarveHistory(carveData) {
    if (!carveData || !carveData.hitPoint || !carveData.hitDir) return;
    if (this.carveHistory.length >= 500) {
      this.carveHistory.shift();
    }
    this.carveHistory.push({
      asteroidIndex: carveData.asteroidIndex !== undefined ? carveData.asteroidIndex : 0,
      isMega: !!carveData.isMega,
      hitPoint: { x: carveData.hitPoint.x, y: carveData.hitPoint.y, z: carveData.hitPoint.z },
      hitDir: { x: carveData.hitDir.x, y: carveData.hitDir.y, z: carveData.hitDir.z },
      carveRadius: carveData.carveRadius,
      carveDepth: carveData.carveDepth,
      strength: carveData.strength,
      isFracture: !!carveData.isFracture,
      timestamp: carveData.timestamp || Date.now()
    });
  }

  getCarveHistory() {
    return this.carveHistory.slice();
  }

  applyCarveHistory(history) {
    if (!Array.isArray(history) || history.length === 0) return;
    for (const item of history) {
      this.applyRemoteCarve(item);
    }
  }

  cleanup() {
    this.destroy();
  }

  destroy() {
    if (this.debrisMesh) {
      if (this.debrisMesh.parent) this.debrisMesh.parent.remove(this.debrisMesh);
      if (this._debrisGeo) this._debrisGeo.dispose();
      if (this._debrisMat) this._debrisMat.dispose();
    }
    if (this.debrisFlashMesh) {
      if (this.debrisFlashMesh.parent) this.debrisFlashMesh.parent.remove(this.debrisFlashMesh);
      if (this._flashGeo) this._flashGeo.dispose();
      if (this._flashTex) this._flashTex.dispose();
      if (this._flashMat) this._flashMat.dispose();
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
        a.mc.basePalette = null;
        a.mc.crackField = null;
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
