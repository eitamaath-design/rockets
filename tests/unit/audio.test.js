import { describe, it, expect } from 'vitest';
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
      audio.updateEngine(true, false, 0.016);
      audio.updateEngine(false, true, 0.016);
      audio.resume();
    }).not.toThrow();
  });
});
