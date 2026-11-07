/**
 * Rockets Space Audio System
 * Synthesizes dynamic, zero-dependency procedural SFX and engine ambiances
 * using the Web Audio API with automatic user-gesture unlock.
 */
export class AudioManager {
  constructor() {
    this.ctx = null;
    this.masterGain = null;
    this.compressor = null;
    this.isMuted = false;
    this.isUnlocked = false;

    // Thruster engine loop nodes
    this.engineGain = null;
    this.engineFilter = null;
    this.engineOsc1 = null;
    this.engineOsc2 = null;
    this.engineNoiseNode = null;
    this.currentEngineVol = 0;

    // Brake reverse-thruster loop nodes
    this.brakeGain = null;
    this.brakeFilter = null;
    this.brakeNoiseNode = null;
    this.currentBrakeVol = 0;

    // Noise buffer cache
    this.noiseBuffer = null;

    this.init();
  }

  init() {
    if (typeof window === 'undefined') return;

    const AudioContextClass = window.AudioContext || window.webkitAudioContext;
    if (!AudioContextClass) return;

    try {
      this.ctx = new AudioContextClass();

      // Master dynamics compressor to keep mix punchy and avoid digital clipping
      this.compressor = this.ctx.createDynamicsCompressor();
      this.compressor.threshold.setValueAtTime(-12, this.ctx.currentTime);
      this.compressor.knee.setValueAtTime(8, this.ctx.currentTime);
      this.compressor.ratio.setValueAtTime(4, this.ctx.currentTime);
      this.compressor.attack.setValueAtTime(0.005, this.ctx.currentTime);
      this.compressor.release.setValueAtTime(0.08, this.ctx.currentTime);

      this.masterGain = this.ctx.createGain();
      this.masterGain.gain.setValueAtTime(0.85, this.ctx.currentTime);

      this.compressor.connect(this.masterGain);
      this.masterGain.connect(this.ctx.destination);

      this.generateNoiseBuffer();
      this.initEngineSynth();
      this.initBrakeSynth();
      this.setupAutoUnlock();
    } catch (err) {
      console.warn('AudioContext initialization failed:', err);
    }
  }

  setupAutoUnlock() {
    if (!this.ctx) return;

    const unlock = () => {
      if (this.ctx && this.ctx.state === 'suspended') {
        this.ctx.resume().then(() => {
          this.isUnlocked = true;
        }).catch(() => {});
      } else {
        this.isUnlocked = true;
      }
      window.removeEventListener('pointerdown', unlock);
      window.removeEventListener('keydown', unlock);
      window.removeEventListener('touchstart', unlock);
    };

    window.addEventListener('pointerdown', unlock, { passive: true, once: true });
    window.addEventListener('keydown', unlock, { passive: true, once: true });
    window.addEventListener('touchstart', unlock, { passive: true, once: true });
  }

  resume() {
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume().catch(() => {});
    }
  }

  generateNoiseBuffer() {
    if (!this.ctx) return;
    const bufferSize = this.ctx.sampleRate * 2.0; // 2 seconds looped noise
    this.noiseBuffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
    const output = this.noiseBuffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) {
      output[i] = Math.random() * 2 - 1;
    }
  }

  initEngineSynth() {
    if (!this.ctx || !this.noiseBuffer) return;

    // Dual low oscillator rumble
    this.engineOsc1 = this.ctx.createOscillator();
    this.engineOsc1.type = 'sawtooth';
    this.engineOsc1.frequency.setValueAtTime(55, this.ctx.currentTime);

    this.engineOsc2 = this.ctx.createOscillator();
    this.engineOsc2.type = 'triangle';
    this.engineOsc2.frequency.setValueAtTime(110, this.ctx.currentTime);

    // Looping noise for exhaust turbulence
    this.engineNoiseNode = this.ctx.createBufferSource();
    this.engineNoiseNode.buffer = this.noiseBuffer;
    this.engineNoiseNode.loop = true;

    this.engineFilter = this.ctx.createBiquadFilter();
    this.engineFilter.type = 'lowpass';
    this.engineFilter.frequency.setValueAtTime(120, this.ctx.currentTime);
    this.engineFilter.Q.setValueAtTime(3.0, this.ctx.currentTime);

    this.engineGain = this.ctx.createGain();
    this.engineGain.gain.setValueAtTime(0.0001, this.ctx.currentTime);

    this.engineOsc1.connect(this.engineFilter);
    this.engineOsc2.connect(this.engineFilter);
    this.engineNoiseNode.connect(this.engineFilter);

    this.engineFilter.connect(this.engineGain);
    this.engineGain.connect(this.compressor);

    try {
      this.engineOsc1.start();
      this.engineOsc2.start();
      this.engineNoiseNode.start();
    } catch (_) {}
  }

  initBrakeSynth() {
    if (!this.ctx || !this.noiseBuffer) return;

    this.brakeNoiseNode = this.ctx.createBufferSource();
    this.brakeNoiseNode.buffer = this.noiseBuffer;
    this.brakeNoiseNode.loop = true;

    this.brakeFilter = this.ctx.createBiquadFilter();
    this.brakeFilter.type = 'bandpass';
    this.brakeFilter.frequency.setValueAtTime(1400, this.ctx.currentTime);
    this.brakeFilter.Q.setValueAtTime(2.5, this.ctx.currentTime);

    this.brakeGain = this.ctx.createGain();
    this.brakeGain.gain.setValueAtTime(0.0001, this.ctx.currentTime);

    this.brakeNoiseNode.connect(this.brakeFilter);
    this.brakeFilter.connect(this.brakeGain);
    this.brakeGain.connect(this.compressor);

    try {
      this.brakeNoiseNode.start();
    } catch (_) {}
  }

  /**
   * Smooth dynamic update for continuous engine thrust & brake reverse thrusters
   */
  updateEngine(isThrusting, isBraking, dt) {
    if (!this.ctx || !this.engineGain || !this.brakeGain) return;
    this.resume();

    // Target engine volume & pitch filter
    const targetEngineVol = isThrusting ? 0.38 : 0.0;
    const targetFilterFreq = isThrusting ? 460 : 120;
    this.currentEngineVol += (targetEngineVol - this.currentEngineVol) * Math.min(1, dt * 10);

    const now = this.ctx.currentTime;
    this.engineGain.gain.setTargetAtTime(Math.max(0.0001, this.currentEngineVol), now, 0.05);
    this.engineFilter.frequency.setTargetAtTime(targetFilterFreq, now, 0.08);

    // Target brake reverse hiss
    const targetBrakeVol = isBraking ? 0.32 : 0.0;
    this.currentBrakeVol += (targetBrakeVol - this.currentBrakeVol) * Math.min(1, dt * 12);
    this.brakeGain.gain.setTargetAtTime(Math.max(0.0001, this.currentBrakeVol), now, 0.04);
  }

  /**
   * Front Cannon projectile blast: sharp transient + sweeping laser chirp
   */
  playCannonShot(isLocal = true) {
    if (!this.ctx || this.isMuted) return;
    this.resume();

    const now = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    const filter = this.ctx.createBiquadFilter();

    osc.type = isLocal ? 'sawtooth' : 'sine';
    const startFreq = isLocal ? 920 : 680;
    const endFreq = isLocal ? 110 : 90;

    osc.frequency.setValueAtTime(startFreq, now);
    osc.frequency.exponentialRampToValueAtTime(endFreq, now + 0.08);

    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(2800, now);
    filter.frequency.exponentialRampToValueAtTime(400, now + 0.09);

    const vol = isLocal ? 0.36 : 0.18;
    gain.gain.setValueAtTime(vol, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.095);

    osc.connect(filter);
    filter.connect(gain);
    gain.connect(this.compressor);

    osc.start(now);
    osc.stop(now + 0.1);
  }

  /**
   * Rear Mine Deployment: mechanical drop release + dual high-tech arming chime
   */
  playMineDeploy() {
    if (!this.ctx || this.isMuted) return;
    this.resume();

    const now = this.ctx.currentTime;

    // 1. Mechanical release clank
    const clankOsc = this.ctx.createOscillator();
    const clankGain = this.ctx.createGain();
    clankOsc.type = 'triangle';
    clankOsc.frequency.setValueAtTime(260, now);
    clankOsc.frequency.exponentialRampToValueAtTime(60, now + 0.12);

    clankGain.gain.setValueAtTime(0.35, now);
    clankGain.gain.exponentialRampToValueAtTime(0.001, now + 0.13);

    clankOsc.connect(clankGain);
    clankGain.connect(this.compressor);
    clankOsc.start(now);
    clankOsc.stop(now + 0.14);

    // 2. High-tech arming chime (two staggered frequencies: 1250Hz -> 1750Hz)
    const chimeOsc = this.ctx.createOscillator();
    const chimeGain = this.ctx.createGain();
    chimeOsc.type = 'sine';
    chimeOsc.frequency.setValueAtTime(1250, now + 0.06);
    chimeOsc.frequency.setValueAtTime(1750, now + 0.14);

    chimeGain.gain.setValueAtTime(0.0001, now);
    chimeGain.gain.setValueAtTime(0.22, now + 0.06);
    chimeGain.gain.setValueAtTime(0.25, now + 0.14);
    chimeGain.gain.exponentialRampToValueAtTime(0.001, now + 0.28);

    chimeOsc.connect(chimeGain);
    chimeGain.connect(this.compressor);
    chimeOsc.start(now + 0.05);
    chimeOsc.stop(now + 0.30);
  }

  /**
   * Explosions (projectile hit or mine detonation)
   * Deep sub-bass boom + filtered noise burst
   */
  playExplosion(intensity = 1.0) {
    if (!this.ctx || this.isMuted) return;
    this.resume();

    const now = this.ctx.currentTime;

    // 1. Sub-bass punch oscillator
    const boomOsc = this.ctx.createOscillator();
    const boomGain = this.ctx.createGain();
    boomOsc.type = 'sine';
    boomOsc.frequency.setValueAtTime(140, now);
    boomOsc.frequency.exponentialRampToValueAtTime(28, now + 0.7 * intensity);

    const boomVol = Math.min(0.7, 0.45 * intensity);
    boomGain.gain.setValueAtTime(boomVol, now);
    boomGain.gain.exponentialRampToValueAtTime(0.001, now + 0.75 * intensity);

    boomOsc.connect(boomGain);
    boomGain.connect(this.compressor);
    boomOsc.start(now);
    boomOsc.stop(now + 0.8 * intensity);

    // 2. Filtered noise blast
    if (this.noiseBuffer) {
      const noise = this.ctx.createBufferSource();
      noise.buffer = this.noiseBuffer;

      const filter = this.ctx.createBiquadFilter();
      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(900, now);
      filter.frequency.exponentialRampToValueAtTime(80, now + 0.6 * intensity);

      const noiseGain = this.ctx.createGain();
      noiseGain.gain.setValueAtTime(0.5 * intensity, now);
      noiseGain.gain.exponentialRampToValueAtTime(0.001, now + 0.65 * intensity);

      noise.connect(filter);
      filter.connect(noiseGain);
      noiseGain.connect(this.compressor);

      noise.start(now);
      noise.stop(now + 0.7 * intensity);
    }
  }

  /**
   * Hull damage impact
   */
  playDamageHit() {
    if (!this.ctx || this.isMuted) return;
    this.resume();

    const now = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc.type = 'sawtooth';
    osc.frequency.setValueAtTime(320, now);
    osc.frequency.exponentialRampToValueAtTime(70, now + 0.16);

    gain.gain.setValueAtTime(0.42, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.18);

    osc.connect(gain);
    gain.connect(this.compressor);
    osc.start(now);
    osc.stop(now + 0.2);
  }

  /**
   * Kill / Score confirmed chime
   */
  playScoreChime() {
    if (!this.ctx || this.isMuted) return;
    this.resume();

    const now = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc.type = 'triangle';
    osc.frequency.setValueAtTime(880, now);
    osc.frequency.setValueAtTime(1320, now + 0.08);

    gain.gain.setValueAtTime(0.25, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.35);

    osc.connect(gain);
    gain.connect(this.compressor);
    osc.start(now);
    osc.stop(now + 0.36);
  }

  /**
   * Lateral strafe gas puff
   */
  playStrafeBurst() {
    if (!this.ctx || this.isMuted || !this.noiseBuffer) return;
    this.resume();

    const now = this.ctx.currentTime;
    const noise = this.ctx.createBufferSource();
    noise.buffer = this.noiseBuffer;

    const filter = this.ctx.createBiquadFilter();
    filter.type = 'bandpass';
    filter.frequency.setValueAtTime(1600, now);
    filter.Q.setValueAtTime(2.0, now);

    const gain = this.ctx.createGain();
    gain.gain.setValueAtTime(0.20, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.12);

    noise.connect(filter);
    filter.connect(gain);
    gain.connect(this.compressor);

    noise.start(now);
    noise.stop(now + 0.13);
  }

  /**
   * 30-Second Inactivity Engagement Beacon: resonant high-tech sonar ping
   */
  playEngagementBeacon() {
    if (!this.ctx || this.isMuted) return;
    this.resume();

    const now = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    const filter = this.ctx.createBiquadFilter();

    osc.type = 'sine';
    osc.frequency.setValueAtTime(1480, now);
    osc.frequency.exponentialRampToValueAtTime(520, now + 0.45);

    filter.type = 'bandpass';
    filter.frequency.setValueAtTime(1200, now);
    filter.Q.setValueAtTime(4.0, now);

    gain.gain.setValueAtTime(0.0001, now);
    gain.gain.linearRampToValueAtTime(0.38, now + 0.04);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.95);

    osc.connect(filter);
    filter.connect(gain);
    gain.connect(this.compressor);

    osc.start(now);
    osc.stop(now + 1.0);
  }
}

export const audio = new AudioManager();
