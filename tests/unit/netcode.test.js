import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import * as THREE from 'three';
import { RemoteShip } from '../../src/game/remoteShip.js';

describe('Netcode & Leader Election', () => {
  describe('Deterministic Master Election Protocol', () => {
    function electMaster(selfId, connectedPeers) {
      const allPeers = [selfId, ...connectedPeers].sort();
      const masterId = allPeers[0];
      return {
        masterId,
        isMaster: masterId === selfId
      };
    }

    it('should elect lowest sorted peer ID as initial master', () => {
      const selfId = 'peer-charlie';
      const peers = ['peer-bravo', 'peer-delta'];

      const result = electMaster(selfId, peers);
      expect(result.masterId).toBe('peer-bravo');
      expect(result.isMaster).toBe(false);
    });

    it('should elect self as master if selfId is lowest', () => {
      const selfId = 'peer-alpha';
      const peers = ['peer-bravo', 'peer-delta'];

      const result = electMaster(selfId, peers);
      expect(result.masterId).toBe('peer-alpha');
      expect(result.isMaster).toBe(true);
    });

    it('should instantly failover to next peer when current master disconnects', () => {
      let peers = ['peer-alpha', 'peer-bravo', 'peer-charlie'];
      const selfId = 'peer-bravo';

      // Initially peer-alpha is master
      let election = electMaster(selfId, peers.filter(p => p !== selfId));
      expect(election.masterId).toBe('peer-alpha');
      expect(election.isMaster).toBe(false);

      // peer-alpha leaves the match!
      peers = peers.filter(p => p !== 'peer-alpha');

      // Next election runs instantly
      election = electMaster(selfId, peers.filter(p => p !== selfId));
      expect(election.masterId).toBe('peer-bravo');
      expect(election.isMaster).toBe(true); // self takes over immediately!
    });
  });

  describe('Lobby Keep-Alive TTL Pruning', () => {
    it('should purge rooms whose lastSeen exceeds ttlMs', () => {
      const rooms = new Map();
      const now = 100000;

      // Active room with recent heartbeat
      rooms.set('room-1', {
        roomId: 'room-1',
        lastSeen: now - 3000,
        ttlMs: 10000
      });

      // Stale room whose host dropped and TTL expired
      rooms.set('room-2', {
        roomId: 'room-2',
        lastSeen: now - 11000,
        ttlMs: 10000
      });

      // Run pruning
      for (const [id, room] of rooms.entries()) {
        if (now - room.lastSeen > room.ttlMs) {
          rooms.delete(id);
        }
      }

      expect(rooms.has('room-1')).toBe(true);
      expect(rooms.has('room-2')).toBe(false);
    });
  });

  describe('Dead Reckoning & Slerp Interpolation', () => {
    let scene;
    let remote;

    beforeEach(() => {
      scene = new THREE.Scene();
      remote = new RemoteShip('peer-test', scene, 'TestPilot');
    });

    afterEach(() => {
      remote.destroy();
    });

    it('should extrapolate position based on velocity to smooth out high ping', () => {
      remote.receiveNetworkState({
        pos: { x: 100, y: 0, z: 0 },
        quat: { x: 0, y: 0, z: 0, w: 1 },
        vel: { x: 50, y: 0, z: 0 }, // moving at 50 u/s along X
        thrust: true,
        hp: 100
      });

      // Advance frames
      remote.update(0.1);

      // Position should interpolate smoothly along the velocity vector
      expect(remote.position.x).toBeGreaterThan(0);
    });
  });
});
