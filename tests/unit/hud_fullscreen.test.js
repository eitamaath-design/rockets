import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { GameHUD } from '../../src/game/hud.js';
import { GameEngine } from '../../src/game/engine.js';

describe('Floating Fullscreen Exit Control & Interactive Target Registration', () => {
  let container;
  let hud;
  let mockEngine;

  beforeEach(() => {
    container = document.createElement('div');
    document.body.appendChild(container);

    mockEngine = {
      network: {
        roomName: 'Test Sector',
        roomId: 'test-room',
        isMaster: true,
        getAveragePing: () => 35,
        onMapResetVote: vi.fn()
      },
      config: {
        voxelQuality: 'medium',
        asteroidCount: 100,
        megaRadius: 2800,
        meteorFrequency: 10
      },
      playerShip: {
        input: {
          analogPitch: 0,
          analogYaw: 0
        }
      }
    };

    hud = new GameHUD(container, mockEngine);
  });

  afterEach(() => {
    if (hud) hud.destroy();
    if (container && container.parentNode) {
      container.parentNode.removeChild(container);
    }
    vi.restoreAllMocks();
  });

  it('should initialize #hud-float-exit-fullscreen in the DOM, initially hidden', () => {
    const floatBtn = document.getElementById('hud-float-exit-fullscreen');
    expect(floatBtn).not.toBeNull();
    expect(floatBtn.tagName).toBe('BUTTON');
    expect(floatBtn.style.display).toBe('none');
    expect(floatBtn.classList.contains('hud-float-exit-fullscreen')).toBe(true);
  });

  it('should display floating exit button when fullscreen is active and hide when exited', () => {
    const floatBtn = document.getElementById('hud-float-exit-fullscreen');
    const fsBtn = document.getElementById('hud-btn-fullscreen');

    expect(floatBtn.style.display).toBe('none');

    // Simulate entering fullscreen
    Object.defineProperty(document, 'fullscreenElement', {
      value: document.documentElement,
      configurable: true,
      writable: true
    });
    document.dispatchEvent(new Event('fullscreenchange'));

    expect(floatBtn.style.display).toBe('flex');
    expect(fsBtn.textContent).toContain('Exit');

    // Simulate exiting fullscreen
    document.fullscreenElement = null;
    document.dispatchEvent(new Event('fullscreenchange'));

    expect(floatBtn.style.display).toBe('none');
    expect(fsBtn.textContent).toContain('Fullscreen');
  });

  it('should handle webkitfullscreenchange events similarly', () => {
    const floatBtn = document.getElementById('hud-float-exit-fullscreen');

    Object.defineProperty(document, 'fullscreenElement', {
      value: null,
      configurable: true,
      writable: true
    });
    Object.defineProperty(document, 'webkitFullscreenElement', {
      value: document.documentElement,
      configurable: true,
      writable: true
    });

    document.dispatchEvent(new Event('webkitfullscreenchange'));
    expect(floatBtn.style.display).toBe('flex');

    document.webkitFullscreenElement = null;
    document.dispatchEvent(new Event('webkitfullscreenchange'));
    expect(floatBtn.style.display).toBe('none');
  });

  it('should trigger document.exitFullscreen with stopPropagation on click', () => {
    const floatBtn = document.getElementById('hud-float-exit-fullscreen');
    const mockExitFs = vi.fn().mockResolvedValue(undefined);
    document.exitFullscreen = mockExitFs;

    const clickEvent = new MouseEvent('click', { bubbles: true, cancelable: true });
    const stopPropagationSpy = vi.spyOn(clickEvent, 'stopPropagation');

    floatBtn.dispatchEvent(clickEvent);

    expect(mockExitFs).toHaveBeenCalledTimes(1);
    expect(stopPropagationSpy).toHaveBeenCalled();
  });

  it('should trigger document.exitFullscreen with stopPropagation and preventDefault on touchstart', () => {
    const floatBtn = document.getElementById('hud-float-exit-fullscreen');
    const mockExitFs = vi.fn().mockResolvedValue(undefined);
    document.exitFullscreen = mockExitFs;

    const touchEvent = new CustomEvent('touchstart', { bubbles: true, cancelable: true });
    touchEvent.stopPropagation = vi.fn();
    touchEvent.preventDefault = vi.fn();

    floatBtn.dispatchEvent(touchEvent);

    expect(mockExitFs).toHaveBeenCalledTimes(1);
    expect(touchEvent.stopPropagation).toHaveBeenCalled();
    expect(touchEvent.preventDefault).toHaveBeenCalled();
  });

  it('should fallback to webkitExitFullscreen if document.exitFullscreen is missing', () => {
    const floatBtn = document.getElementById('hud-float-exit-fullscreen');
    delete document.exitFullscreen;
    const mockWebkitExit = vi.fn();
    document.webkitExitFullscreen = mockWebkitExit;

    const clickEvent = new MouseEvent('click', { bubbles: true, cancelable: true });
    floatBtn.dispatchEvent(clickEvent);

    expect(mockWebkitExit).toHaveBeenCalledTimes(1);
  });

  it('engine.isInteractiveTarget should recognize fullscreen buttons as interactive', () => {
    const floatBtn = document.getElementById('hud-float-exit-fullscreen');
    const fsBtn = document.getElementById('hud-btn-fullscreen');
    const canvas = document.createElement('canvas');

    const engineIsInteractive = GameEngine.prototype.isInteractiveTarget;

    expect(engineIsInteractive(floatBtn)).toBe(true);
    expect(engineIsInteractive(fsBtn)).toBe(true);
    expect(engineIsInteractive(canvas)).toBe(false);
    expect(engineIsInteractive(null)).toBe(false);

    // Child elements inside the floating exit button
    const spanInside = document.createElement('span');
    floatBtn.appendChild(spanInside);
    expect(engineIsInteractive(spanInside)).toBe(true);
  });
});
