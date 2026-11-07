import * as THREE from 'three';

/**
 * Deterministic Pseudo-Random Number Generator (Mulberry32).
 * Allows all connected peers to generate the exact same map given the same seed.
 */
export function createPRNG(seed) {
  let s = (typeof seed === 'number' ? seed : hashString(seed || 'rockets-default-seed')) >>> 0;
  return function next() {
    s |= 0;
    s = (s + 0x6d2b79f5) | 0;
    let t = Math.imul(s ^ (s >>> 15), 1 | s);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

export function hashString(str) {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = (hash << 5) - hash + str.charCodeAt(i);
    hash |= 0;
  }
  return hash >>> 0;
}

/**
 * Linear interpolation
 */
export function lerp(a, b, t) {
  return a + (b - a) * t;
}

/**
 * Clamp a number between min and max
 */
export function clamp(val, min, max) {
  return Math.max(min, Math.min(max, val));
}

/**
 * Spherical linear interpolation between two vectors
 */
export function slerpVectors(v1, v2, t) {
  const result = new THREE.Vector3();
  const q1 = new THREE.Quaternion().setFromUnitVectors(new THREE.Vector3(0, 0, 1), v1.clone().normalize());
  const q2 = new THREE.Quaternion().setFromUnitVectors(new THREE.Vector3(0, 0, 1), v2.clone().normalize());
  q1.slerp(q2, t);
  result.set(0, 0, 1).applyQuaternion(q1).multiplyScalar(lerp(v1.length(), v2.length(), t));
  return result;
}

/**
 * Distance squared between two vectors
 */
export function distSq(v1, v2) {
  const dx = v1.x - v2.x;
  const dy = v1.y - v2.y;
  const dz = v1.z - v2.z;
  return dx * dx + dy * dy + dz * dz;
}
