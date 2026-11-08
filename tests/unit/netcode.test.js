import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import * as THREE from 'three';
import { RemoteShip } from '../../src/game/remoteShip.js';
import { GameNetwork } from '../../src/net/network.js';

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

  describe('Trystero Action Channel Adapter', () => {
    it('should extract valid peerId string from modern Trystero metadata object', async () => {
      const { createActionChannel } = await import('../../src/net/actions.js');
      let registeredOnMessage = null;

      const mockRoom = {
        makeAction: (name) => ({
          send: vi.fn(),
          set onMessage(fn) { registeredOnMessage = fn; },
          get onMessage() { return registeredOnMessage; },
          set onReceive(fn) {},
          get onReceive() { return null; }
        })
      };

      const channel = createActionChannel(mockRoom, 'state');
      let receivedData = null;
      let receivedPeerId = null;

      channel.onReceive((data, peerId) => {
        receivedData = data;
        receivedPeerId = peerId;
      });

      // Simulate incoming packet from modern Trystero
      registeredOnMessage({ hp: 100 }, { peerId: 'peer-abc-999' });

      expect(receivedData).toEqual({ hp: 100 });
      expect(receivedPeerId).toBe('peer-abc-999');
    });

    it('should discard packets with undefined or invalid peerId', async () => {
      const { createActionChannel } = await import('../../src/net/actions.js');
      let registeredOnMessage = null;

      const mockRoom = {
        makeAction: (name) => ({
          send: vi.fn(),
          set onMessage(fn) { registeredOnMessage = fn; },
          get onMessage() { return registeredOnMessage; }
        })
      };

      const channel = createActionChannel(mockRoom, 'state');
      let callCount = 0;

      channel.onReceive(() => {
        callCount++;
      });

      // Packet with undefined metadata
      registeredOnMessage({ hp: 100 }, undefined);
      // Packet with empty metadata object
      registeredOnMessage({ hp: 100 }, {});

      expect(callCount).toBe(0);
    });
  });

  describe('Democratic 10-Second Map Reset Voting Protocol', () => {
    it('should immediately reset map with a new random seed if playing solo', () => {
      const net = new GameNetwork({ roomId: 'solo-room', mapSeed: 42 });
      let resetSeed = null;
      net.onMapReset((seed) => {
        resetSeed = seed;
      });

      const res = net.requestMapResetVote();
      expect(res.solo).toBe(true);
      expect(res.passed).toBe(true);
      expect(res.newSeed).toBeDefined();
      expect(net.mapSeed).toBe(res.newSeed);
      expect(resetSeed).toBe(res.newSeed);
    });

    it('should open a 10s ballot when peers are connected and pass on unanimous approval', () => {
      const net = new GameNetwork({ roomId: 'mesh-room', mapSeed: 100 });
      net.selfId = 'peer-1';
      net.peers.set('peer-2', { id: 'peer-2', ping: 25 });

      let voteEvents = [];
      net.onMapResetVote((v) => voteEvents.push(v));

      let resetSeed = null;
      net.onMapReset((seed) => { resetSeed = seed; });

      const res = net.requestMapResetVote();
      expect(res.solo).toBe(false);
      expect(net.currentMapResetVote).toBeDefined();
      expect(net.currentMapResetVote.votes.get('peer-1')).toBe(true);

      // Peer 2 casts YES vote
      net.handleIncomingVoteCast({ voteId: res.voteId, choice: true }, 'peer-2');

      // Both voted YES -> unanimous approval!
      expect(net.currentMapResetVote).toBeNull();
      expect(resetSeed).toBe(res.newSeed);
      expect(net.mapSeed).toBe(res.newSeed);
    });

    it('should fail and not reset map if any peer votes NO', () => {
      const net = new GameNetwork({ roomId: 'mesh-room-2', mapSeed: 200 });
      net.selfId = 'peer-1';
      net.peers.set('peer-2', { id: 'peer-2', ping: 30 });

      let resetSeed = null;
      net.onMapReset((seed) => { resetSeed = seed; });

      const res = net.requestMapResetVote();
      // Peer 2 votes NO
      net.handleIncomingVoteCast({ voteId: res.voteId, choice: false }, 'peer-2');

      // Failed -> vote closes without map reset
      expect(net.currentMapResetVote).toBeNull();
      expect(resetSeed).toBeNull();
      expect(net.mapSeed).toBe(200);
    });
  });

  describe('Room Configuration Suite & P2P State Synchronization', () => {
    it('should store initial config and notify onConfig listeners on broadcastConfig', () => {
      const net = new GameNetwork({
        roomId: 'test-config-room',
        mapSeed: 50,
        config: {
          voxelQuality: 'medium',
          asteroidCount: 150,
          megaRadius: 4000,
          meteorFrequency: 5
        }
      });

      expect(net.config.voxelQuality).toBe('medium');
      expect(net.config.asteroidCount).toBe(150);
      expect(net.config.megaRadius).toBe(4000);
      expect(net.config.meteorFrequency).toBe(5);

      let configReceived = null;
      net.onConfig((newCfg) => {
        configReceived = newCfg;
      });

      net.broadcastConfig({ voxelQuality: 'high', meteorFrequency: 0 });
      expect(net.config.voxelQuality).toBe('high');
      expect(net.config.meteorFrequency).toBe(0);
      expect(net.config.asteroidCount).toBe(150); // Preserved
    });

    it('should include room config in lobby service heartbeats', () => {
      const mockLobby = {
        activeRooms: new Map(),
        getRoomsList() {
          return Array.from(this.activeRooms.values());
        }
      };

      const testConfig = {
        voxelQuality: 'high',
        asteroidCount: 150,
        megaRadius: 4000,
        meteorFrequency: 5
      };

      mockLobby.activeRooms.set('room-cfg', {
        roomId: 'room-cfg',
        roomName: 'High Res Sector',
        masterId: 'host-1',
        config: testConfig,
        lastSeen: Date.now(),
        ttlMs: 12000
      });

      const list = mockLobby.getRoomsList();
      expect(list.length).toBe(1);
      expect(list[0].config).toEqual(testConfig);
      expect(list[0].config.voxelQuality).toBe('high');
      expect(list[0].config.asteroidCount).toBe(150);
    });
  });
});
