import { describe, it, expect, beforeEach } from 'vitest';
import { AudioManager } from '../../src/game/audio.js';

describe('Web Audio System', () => {
  it('should initialize gracefully in test or headless environments without throwing errors', () => {
    const audio = new AudioManager();
    expect(audio).toBeDefined();

    // Calling SFX methods in headless environment should safely no-op
    expect(() => {
      audio.playCannonShot(true);
      audio.playCannonShot(false);
      audio.playMineDeploy();
      audio.playExplosion(1.0);
      audio.playDamageHit();
      audio.playScoreChime();
      audio.playStrafeBurst();
      audio.startLaserLoop(true);
      audio.startLaserLoop(false);
      audio.stopLaserLoop();
      audio.playLaserShot(true);
      audio.playLaserShot(false);
      audio.updateEngine(true, false, 0.016);
      audio.updateEngine(false, true, 0.016);
      audio.resume();
    }).not.toThrow();
  });

  describe('Futuristic Sci-Fi Laser Plasma Hum Synthesis', () => {
    let mockCtx;
    let createdOscillators = [];
    let createdFilters = [];
    let createdGains = [];
    let audio;

    beforeEach(() => {
      createdOscillators = [];
      createdFilters = [];
      createdGains = [];

      class MockParam {
        constructor(val = 0) {
          this.value = val;
          this.scheduled = [];
        }
        setValueAtTime(v, t) {
          this.value = v;
          this.scheduled.push({ type: 'set', v, t });
        }
        linearRampToValueAtTime(v, t) {
          this.value = v;
          this.scheduled.push({ type: 'linear', v, t });
        }
        exponentialRampToValueAtTime(v, t) {
          this.value = v;
          this.scheduled.push({ type: 'exponential', v, t });
        }
        cancelScheduledValues(t) {
          this.scheduled.push({ type: 'cancel', t });
        }
      }

      class MockNode {
        constructor() {
          this.connections = [];
        }
        connect(target) {
          this.connections.push(target);
          return target;
        }
        disconnect() {}
      }

      class MockOscillator extends MockNode {
        constructor() {
          super();
          this.type = 'sine';
          this.frequency = new MockParam(440);
          this.started = false;
          this.stopped = false;
          this.stopTime = null;
          createdOscillators.push(this);
        }
        start(t) { this.started = true; }
        stop(t) { this.stopped = true; this.stopTime = t; }
      }

      class MockBiquadFilter extends MockNode {
        constructor() {
          super();
          this.type = 'lowpass';
          this.frequency = new MockParam(1000);
          this.Q = new MockParam(1);
          createdFilters.push(this);
        }
      }

      class MockGain extends MockNode {
        constructor() {
          super();
          this.gain = new MockParam(1);
          createdGains.push(this);
        }
      }

      mockCtx = {
        currentTime: 10.0,
        destination: new MockNode(),
        createOscillator: () => new MockOscillator(),
        createBiquadFilter: () => new MockBiquadFilter(),
        createGain: () => new MockGain(),
        createDynamicsCompressor: () => {
          const comp = new MockNode();
          comp.threshold = new MockParam(-12);
          comp.knee = new MockParam(8);
          comp.ratio = new MockParam(4);
          comp.attack = new MockParam(0.005);
          comp.release = new MockParam(0.08);
          return comp;
        },
        createBufferSource: () => {
          const src = new MockNode();
          src.start = () => {};
          src.stop = () => {};
          return src;
        },
        createBuffer: () => ({ getChannelData: () => new Float32Array(100) }),
        resume: () => Promise.resolve()
      };

      audio = new AudioManager();
      audio.ctx = mockCtx;
      audio.compressor = mockCtx.createDynamicsCompressor();
      audio.masterGain = mockCtx.createGain();
    });

    it('should initialize dual-oscillator sci-fi plasma synth graph in startLaserLoop', () => {
      audio.startLaserLoop(true);

      expect(audio._laserLoopActive).toBe(true);
      expect(createdOscillators.length).toBe(2);

      const [osc1, osc2] = createdOscillators;
      expect(osc1.type).toBe('sine');
      expect(osc1.frequency.value).toBe(155); // Deep foundational body
      expect(osc1.started).toBe(true);

      expect(osc2.type).toBe('sawtooth');
      expect(osc2.frequency.value).toBe(313); // Warm detuned plasma harmonic (3Hz flutter)
      expect(osc2.started).toBe(true);

      expect(createdFilters.length).toBe(1);
      const filter = createdFilters[0];
      expect(filter.type).toBe('lowpass');
      expect(filter.frequency.value).toBe(920); // Low-pass filter eliminating high-frequency screech
      expect(filter.Q.value).toBe(1.2);

      const gain = audio._laserGain;
      expect(gain).toBeDefined();
      expect(gain.gain.scheduled.some(s => s.type === 'linear' && s.v === 0.22)).toBe(true);
    });

    it('should smoothly fade out gain and stop oscillators on stopLaserLoop', () => {
      audio.startLaserLoop(true);
      const [osc1, osc2] = createdOscillators;
      const gain = audio._laserGain;

      audio.stopLaserLoop();

      expect(audio._laserLoopActive).toBe(false);
      expect(gain.gain.scheduled.some(s => s.type === 'linear' && s.v === 0.0001)).toBe(true);
      expect(osc1.stopped).toBe(true);
      expect(osc2.stopped).toBe(true);

      // Verify node references reset to null
      expect(audio._laserOsc1).toBeNull();
      expect(audio._laserOsc2).toBeNull();
      expect(audio._laserGain).toBeNull();
      expect(audio._laserFilter).toBeNull();
    });

    it('should remain stable under rapid interleaved start and stop calls', () => {
      expect(() => {
        audio.startLaserLoop(true);
        audio.stopLaserLoop();
        audio.startLaserLoop(true);
        audio.startLaserLoop(true); // Should guard against double start
        audio.stopLaserLoop();
        audio.stopLaserLoop(); // Should safely no-op
      }).not.toThrow();

      expect(audio._laserLoopActive).toBe(false);
      expect(audio._laserGain).toBeNull();
    });
  });
});
