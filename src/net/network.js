import { joinRoom, selfId } from '@trystero-p2p/nostr';
import { lobbyService, APP_ID, RELIABLE_NOSTR_RELAYS } from './lobby.js';
import { createActionChannel } from './actions.js';
import { logger } from '../utils/logger.js';

export class GameNetwork {
  constructor({ roomId, roomName, mapSeed, config, playerName, onPeerJoined, onPeerLeft, onMasterChanged, onCombatLog }) {
    this.roomId = roomId;
    this.roomName = roomName || roomId;
    this.mapSeed = mapSeed || 42;
    this.config = {
      voxelQuality: 'high',
      asteroidCount: 100,
      megaRadius: 2800,
      meteorFrequency: 10,
      forwardAccel: 180,
      momentumShearing: 0.1,
      carveRadius: 6.5,
      blinkTranslucency: 80,
      blinkDuration: 750,
      renderScale: 1.0,
      maxFps: 60,
      shaderQuality: 'balanced',
      particleDensity: 'balanced',
      showStats: false,
      ...(config || {})
    };
    this.playerName = playerName || `Pilot-${(selfId || 'Host').slice(0, 4)}`;
    this.selfId = selfId;

    this.onPeerJoined = onPeerJoined || (() => {});
    this.onPeerLeft = onPeerLeft || (() => {});
    this.onMasterChanged = onMasterChanged || (() => {});
    this.onCombatLog = onCombatLog || (() => {});

    this.room = null;
    this.currentMasterId = this.selfId;
    this.isMaster = true;
    this.peers = new Map(); // peerId -> { lastState, ping, lastSeen }

    // Action dispatchers
    this.sendState = null;
    this.sendCannon = null;
    this.sendMine = null;
    this.sendHit = null;
    this.sendKill = null;
    this.sendPing = null;
    this.sendPong = null;
    this.sendLaser = null;
    this.sendDecoy = null;
    this.sendMissile = null;
    this.sendMapResetVote = null;
    this.sendMapReset = null;
    this.sendConfig = null;

    // Action listeners registered by game systems
    this.cannonListeners = new Set();
    this.mineListeners = new Set();
    this.hitListeners = new Set();
    this.killListeners = new Set();
    this.laserListeners = new Set();
    this.decoyListeners = new Set();
    this.missileListeners = new Set();
    this.mapResetVoteListeners = new Set();
    this.mapResetListeners = new Set();
    this.configListeners = new Set();
    this.asteroidCarveListeners = new Set();
    this.asteroidWorldSyncListeners = new Set();
    this.onPeerNeedWorldSync = null;

    this.currentMapResetVote = null;
    this.voteTimeoutTimer = null;

    this.pingInterval = null;
    this.stateBroadcastInterval = null;
  }

  join() {
    this.room = joinRoom({
      appId: APP_ID,
      relayConfig: { urls: RELIABLE_NOSTR_RELAYS }
    }, this.roomId);

    // Initialize WebRTC Actions
    const stateChannel = createActionChannel(this.room, 'state');
    const cannonChannel = createActionChannel(this.room, 'cannon');
    const mineChannel = createActionChannel(this.room, 'mine');
    const hitChannel = createActionChannel(this.room, 'hit');
    const killChannel = createActionChannel(this.room, 'kill');
    const pingChannel = createActionChannel(this.room, 'ping');
    const pongChannel = createActionChannel(this.room, 'pong');
    const laserChannel = createActionChannel(this.room, 'laser');
    const missileChannel = createActionChannel(this.room, 'missile');
    const decoyChannel = createActionChannel(this.room, 'decoy');
    const mapResetVoteChannel = createActionChannel(this.room, 'map_reset_vote');
    const mapResetChannel = createActionChannel(this.room, 'map_reset');
    const configChannel = createActionChannel(this.room, 'config');
    const asteroidCarveChannel = createActionChannel(this.room, 'asteroid_carve');
    const asteroidWorldSyncChannel = createActionChannel(this.room, 'asteroid_world_sync');

    this.sendState = stateChannel.send;
    this.sendCannon = cannonChannel.send;
    this.sendMine = mineChannel.send;
    this.sendHit = hitChannel.send;
    this.sendKill = killChannel.send;
    this.sendPing = pingChannel.send;
    this.sendPong = pongChannel.send;
    this.sendLaser = laserChannel.send;
    this.sendMissile = missileChannel.send;
    this.sendDecoy = decoyChannel.send;
    this.sendMapResetVote = mapResetVoteChannel.send;
    this.sendMapReset = mapResetChannel.send;
    this.sendConfig = configChannel.send;
    this.sendAsteroidCarve = asteroidCarveChannel.send;
    this.sendAsteroidWorldSync = asteroidWorldSyncChannel.send;

    // Incoming synchronized asteroid carve actions
    asteroidCarveChannel.onReceive((data, peerId) => {
      if (!peerId || typeof peerId !== 'string' || !data) return;
      for (const cb of this.asteroidCarveListeners) {
        cb(data, peerId);
      }
    });

    // Incoming synchronized asteroid world sync (history) actions
    asteroidWorldSyncChannel.onReceive((data, peerId) => {
      if (!peerId || typeof peerId !== 'string' || !data) return;
      for (const cb of this.asteroidWorldSyncListeners) {
        cb(data, peerId);
      }
    });

    // Incoming synchronized room configuration from host
    configChannel.onReceive((data, peerId) => {
      if (!data || !data.config) return;
      const incoming = { ...data.config };
      if (incoming.forwardAccel !== undefined) incoming.forwardAccel = Math.min(180, Math.max(20, Number(incoming.forwardAccel) || 60));
      if (incoming.momentumShearing !== undefined) incoming.momentumShearing = Math.min(1.0, Math.max(0.0, Number(incoming.momentumShearing) || 0.0));
      if (incoming.carveRadius !== undefined) incoming.carveRadius = Math.min(20.0, Math.max(2.0, Number(incoming.carveRadius) || 6.5));
      if (incoming.blinkDuration !== undefined) incoming.blinkDuration = Math.min(2000, Math.max(200, Math.round(Number(incoming.blinkDuration)) || 750));
    if (incoming.blinkTranslucency !== undefined) incoming.blinkTranslucency = Math.min(95, Math.max(10, Math.round(Number(incoming.blinkTranslucency)) || 80));
      this.config = { ...this.config, ...incoming };
      if (data.mapSeed !== undefined) this.mapSeed = data.mapSeed;
      for (const cb of this.configListeners) {
        cb(this.config, peerId);
      }
    });

    // Incoming map reset vote actions
    mapResetVoteChannel.onReceive((data, peerId) => {
      if (!peerId || typeof peerId !== 'string' || !data) return;
      if (data.type === 'start') {
        this.handleIncomingVoteStart(data);
      } else if (data.type === 'vote') {
        this.handleIncomingVoteCast(data, peerId);
      }
    });

    // Synchronized map reset execution across peers
    mapResetChannel.onReceive((data, peerId) => {
      if (!data || data.seed === undefined) return;
      this.triggerMapResetLocally(data.seed);
    });

    // Incoming state packets
    stateChannel.onReceive((data, peerId) => {
      if (!peerId || typeof peerId !== 'string') return;
      if (!this.peers.has(peerId)) {
        this.peers.set(peerId, { id: peerId, ping: 30, lastSeen: Date.now(), packetsReceived: 0 });
      }
      const p = this.peers.get(peerId);
      p.lastState = data;
      p.lastSeen = Date.now();
      p.packetsReceived = (p.packetsReceived || 0) + 1;
    });

    // Cannon fire events
    cannonChannel.onReceive((data, peerId) => {
      if (!peerId || typeof peerId !== 'string') return;
      for (const cb of this.cannonListeners) {
        cb(data, peerId);
      }
    });

    // Mine drop events
    
    // Laser fire events
    laserChannel.onReceive((data, peerId) => {
      if (!peerId || typeof peerId !== 'string') return;
      for (const cb of this.laserListeners) {
        cb(data, peerId);
      }
    });

    // Homing missile launch events
    missileChannel.onReceive((data, peerId) => {
      if (!peerId || typeof peerId !== 'string') return;
      for (const cb of this.missileListeners) {
        cb(data, peerId);
      }
    });

    // Decoy clone launch events
    decoyChannel.onReceive((data, peerId) => {
      if (!peerId || typeof peerId !== 'string') return;
      for (const cb of this.decoyListeners) {
        cb(data, peerId);
      }
    });
    mineChannel.onReceive((data, peerId) => {
      if (!peerId || typeof peerId !== 'string') return;
      for (const cb of this.mineListeners) {
        cb(data, peerId);
      }
    });

    // Damage / Hit events
    hitChannel.onReceive((data, peerId) => {
      if (!peerId || typeof peerId !== 'string') return;
      for (const cb of this.hitListeners) {
        cb(data, peerId);
      }
    });

    // Kill events
    killChannel.onReceive((data, peerId) => {
      if (!peerId || typeof peerId !== 'string') return;
      for (const cb of this.killListeners) {
        cb(data, peerId);
      }
    });

    // Ping / Pong for latency measurement
    pingChannel.onReceive((data, peerId) => {
      if (!peerId || typeof peerId !== 'string') return;
      if (this.sendPong) {
        this.sendPong({ t: data.t }, peerId);
      }
    });

    pongChannel.onReceive((data, peerId) => {
      if (!peerId || typeof peerId !== 'string') return;
      if (data && data.t && this.peers.has(peerId)) {
        const rtt = Math.max(1, Date.now() - data.t);
        this.peers.get(peerId).ping = rtt;
      }
    });

    // Peer Join / Leave callbacks (supports both modern setter and legacy function APIs)
    const handlePeerJoin = (peerId) => {
      if (!peerId || typeof peerId !== 'string') return;
      logger.log('MESH', `Peer connected: ${peerId}`);
      this.peers.set(peerId, { id: peerId, ping: 40, lastSeen: Date.now() });
      this.updateMasterElection();
      if (this.isMaster && this.sendConfig) {
        this.sendConfig({ config: this.config, mapSeed: this.mapSeed }, peerId);
      }
      if (typeof this.onPeerNeedWorldSync === 'function') {
        this.onPeerNeedWorldSync(peerId);
      }
      this.onPeerJoined(peerId);
      this.onCombatLog(`🛰️ Pilot joined the mesh: ${peerId.slice(0, 5)}`);
    };

    const handlePeerLeave = (peerId) => {
      if (!peerId || typeof peerId !== 'string') return;
      logger.log('MESH', `Peer disconnected: ${peerId}`);
      this.peers.delete(peerId);
      this.updateMasterElection();
      this.onPeerLeft(peerId);
      this.onCombatLog(`💨 Pilot left the mesh: ${peerId.slice(0, 5)}`);
    };

    if (typeof this.room.onPeerJoin === 'function') {
      this.room.onPeerJoin(handlePeerJoin);
    } else {
      this.room.onPeerJoin = handlePeerJoin;
    }

    if (typeof this.room.onPeerLeave === 'function') {
      this.room.onPeerLeave(handlePeerLeave);
    } else {
      this.room.onPeerLeave = handlePeerLeave;
    }

    // Initial master election check and immediate keep-alive activation
    this.updateMasterElection();
    if (this.isMaster) {
      lobbyService.startMasterKeepAlive({
        roomId: this.roomId,
        roomName: this.roomName,
        mapSeed: this.mapSeed,
        config: this.config,
        isMaster: () => this.isMaster,
        getPlayerCount: () => this.peers.size + 1
      });
    }

    // Regular ping measurements
    this.pingInterval = setInterval(() => {
      if (this.sendPing && this.peers.size > 0) {
        this.sendPing({ t: Date.now() });
      }
    }, 2000);
  }

  /**
   * Deterministic Leader / Master Election.
   * Compares the sorted list of all active peer IDs in the mesh.
   * The lexicographically lowest ID is elected Master.
   * If the current master disconnects, the next takes over instantly!
   */
  updateMasterElection() {
    if (!this.room) return;
    const connectedPeerIds = Object.keys(this.room.getPeers() || {});
    const allPeerIds = [this.selfId, ...connectedPeerIds].sort();

    const electedMasterId = allPeerIds[0];
    const amIMaster = (electedMasterId === this.selfId);

    if (this.currentMasterId !== electedMasterId || this.isMaster !== amIMaster) {
      const previousMaster = this.currentMasterId;
      this.currentMasterId = electedMasterId;
      this.isMaster = amIMaster;

      logger.log('MESH', `Master Election: elected ${electedMasterId} (Self is master: ${amIMaster})`);

      if (amIMaster) {
        // Start publishing keep-alive TTL heartbeats to public lobby
        lobbyService.startMasterKeepAlive({
          roomId: this.roomId,
          roomName: this.roomName,
          mapSeed: this.mapSeed,
          config: this.config,
          isMaster: () => this.isMaster,
          getPlayerCount: () => this.peers.size + 1
        });
        if (previousMaster && previousMaster !== this.selfId) {
          this.onCombatLog(`👑 Previous host left. You took over as Master! Keep-alive active.`);
        }
      } else {
        lobbyService.stopMasterKeepAlive();
      }

      this.onMasterChanged(electedMasterId, amIMaster);
    }
  }

  broadcastLocalState(state) {
    if (this.sendState) {
      this.sendState({
        ...state,
        id: this.selfId,
        name: this.playerName,
        time: Date.now()
      });
    }
  }

  broadcastCannon(shotData) {
    if (this.sendCannon) {
      this.sendCannon(shotData);
    }
  }

  onConfig(cb) {
    this.configListeners.add(cb);
    return () => this.configListeners.delete(cb);
  }

  broadcastConfig(newConfig) {
    const sanitized = { ...(newConfig || {}) };
    if (sanitized.forwardAccel !== undefined) sanitized.forwardAccel = Math.min(180, Math.max(20, Number(sanitized.forwardAccel) || 60));
    if (sanitized.momentumShearing !== undefined) sanitized.momentumShearing = Math.min(1.0, Math.max(0.0, Number(sanitized.momentumShearing) || 0.0));
    if (sanitized.carveRadius !== undefined) sanitized.carveRadius = Math.min(20.0, Math.max(2.0, Number(sanitized.carveRadius) || 6.5));
    if (sanitized.blinkDuration !== undefined) sanitized.blinkDuration = Math.min(2000, Math.max(200, Math.round(Number(sanitized.blinkDuration)) || 750));
    if (sanitized.blinkTranslucency !== undefined) sanitized.blinkTranslucency = Math.min(95, Math.max(10, Math.round(Number(sanitized.blinkTranslucency)) || 80));
    this.config = { ...this.config, ...sanitized };
    if (this.sendConfig) {
      this.sendConfig({ config: this.config, mapSeed: this.mapSeed });
    }
  }

  
  broadcastLaser(laserData) {
    if (this.sendLaser) {
      this.sendLaser(laserData);
    }
  }

  broadcastMissile(missileData) {
    if (this.sendMissile) {
      const payload = {
        ...missileData,
        targetPeerId: missileData.targetPeerId !== undefined ? missileData.targetPeerId : null,
        velocity: missileData.velocity || { x: 0, y: 0, z: 0 }
      };
      this.sendMissile(payload);
    }
  }

  broadcastDecoy(decoyData) {
    if (this.sendDecoy) {
      this.sendDecoy(decoyData);
    }
  }

  broadcastAsteroidCarve(carveData) {
    if (this.sendAsteroidCarve) {
      this.sendAsteroidCarve(carveData);
    }
  }

  broadcastAsteroidWorldSync(syncData, targetPeerId) {
    if (this.sendAsteroidWorldSync) {
      this.sendAsteroidWorldSync(syncData, targetPeerId);
    }
  }

  onAsteroidCarve(cb) {
    this.asteroidCarveListeners.add(cb);
    return () => this.asteroidCarveListeners.delete(cb);
  }

  onAsteroidWorldSync(cb) {
    this.asteroidWorldSyncListeners.add(cb);
    return () => this.asteroidWorldSyncListeners.delete(cb);
  }

  onLaser(cb) {
    this.laserListeners.add(cb);
    return () => this.laserListeners.delete(cb);
  }

  onMissile(cb) {
    this.missileListeners.add(cb);
    return () => this.missileListeners.delete(cb);
  }

  onDecoy(cb) {
    this.decoyListeners.add(cb);
    return () => this.decoyListeners.delete(cb);
  }
  broadcastMine(mineData) {
    if (this.sendMine) {
      this.sendMine(mineData);
    }
  }

  sendHitTarget(targetPeerId, damage, weaponType) {
    if (this.sendHit) {
      this.sendHit({
        targetId: targetPeerId,
        attackerId: this.selfId,
        attackerName: this.playerName,
        damage,
        weapon: weaponType,
        time: Date.now()
      });
    }
  }

  broadcastKill(victimId, killerId, killerName) {
    if (this.sendKill) {
      this.sendKill({
        victimId,
        killerId,
        killerName,
        time: Date.now()
      });
    }
  }

  onCannon(cb) {
    this.cannonListeners.add(cb);
    return () => this.cannonListeners.delete(cb);
  }

  onMine(cb) {
    this.mineListeners.add(cb);
    return () => this.mineListeners.delete(cb);
  }

  onHit(cb) {
    this.hitListeners.add(cb);
    return () => this.hitListeners.delete(cb);
  }

  onKill(cb) {
    this.killListeners.add(cb);
    return () => this.killListeners.delete(cb);
  }

  /**
   * Request a sector map re-seed.
   * If solo (0 peers), executes map reset immediately with a fresh random seed.
   * If in mesh multiplayer, opens a 10-second interactive ballot requiring unanimous consensus.
   */
  requestMapResetVote() {
    if (this.peers.size === 0) {
      const newSeed = Math.floor(Math.random() * 1000000) + 1;
      this.triggerMapResetLocally(newSeed);
      return { solo: true, passed: true, newSeed };
    }

    if (this.currentMapResetVote) {
      return { error: 'Vote already in progress' };
    }

    const voteId = 'vote-' + Date.now() + '-' + Math.random().toString(36).slice(2, 6);
    const newSeed = Math.floor(Math.random() * 1000000) + 1;

    this.currentMapResetVote = {
      id: voteId,
      initiatorId: this.selfId,
      initiatorName: this.playerName,
      newSeed,
      startTime: Date.now(),
      expiresAt: Date.now() + 10000,
      votes: new Map([[this.selfId, true]]) // Initiator agrees
    };

    if (this.sendMapResetVote) {
      this.sendMapResetVote({
        type: 'start',
        voteId,
        initiatorId: this.selfId,
        initiatorName: this.playerName,
        newSeed
      });
    }

    if (this.voteTimeoutTimer) clearTimeout(this.voteTimeoutTimer);
    this.voteTimeoutTimer = setTimeout(() => {
      this.finalizeMapResetVote(voteId);
    }, 10000);

    this.emitMapResetVoteUpdate();
    return { solo: false, voteId, newSeed };
  }

  handleIncomingVoteStart(data) {
    if (this.currentMapResetVote) return;
    this.currentMapResetVote = {
      id: data.voteId,
      initiatorId: data.initiatorId,
      initiatorName: data.initiatorName || 'Host',
      newSeed: data.newSeed,
      startTime: Date.now(),
      expiresAt: Date.now() + 10000,
      votes: new Map([[data.initiatorId, true]])
    };

    if (this.voteTimeoutTimer) clearTimeout(this.voteTimeoutTimer);
    this.voteTimeoutTimer = setTimeout(() => {
      this.finalizeMapResetVote(data.voteId);
    }, 10000);

    this.emitMapResetVoteUpdate();
  }

  castMapResetVote(choice) {
    if (!this.currentMapResetVote) return;
    const voteChoice = !!choice;
    this.currentMapResetVote.votes.set(this.selfId, voteChoice);

    if (this.sendMapResetVote) {
      this.sendMapResetVote({
        type: 'vote',
        voteId: this.currentMapResetVote.id,
        choice: voteChoice
      });
    }

    this.emitMapResetVoteUpdate();

    const totalPeers = this.peers.size + 1;
    if (this.currentMapResetVote.votes.size >= totalPeers) {
      this.finalizeMapResetVote(this.currentMapResetVote.id);
    }
  }

  handleIncomingVoteCast(data, peerId) {
    if (!this.currentMapResetVote || this.currentMapResetVote.id !== data.voteId) return;
    this.currentMapResetVote.votes.set(peerId, !!data.choice);
    this.emitMapResetVoteUpdate();

    const totalPeers = this.peers.size + 1;
    if (this.currentMapResetVote.votes.size >= totalPeers) {
      this.finalizeMapResetVote(this.currentMapResetVote.id);
    }
  }

  finalizeMapResetVote(voteId) {
    if (!this.currentMapResetVote || this.currentMapResetVote.id !== voteId) return;
    if (this.voteTimeoutTimer) {
      clearTimeout(this.voteTimeoutTimer);
      this.voteTimeoutTimer = null;
    }

    const vote = this.currentMapResetVote;
    this.currentMapResetVote = null;

    const totalPeers = this.peers.size + 1;
    let yesCount = 0;
    for (const [, choice] of vote.votes.entries()) {
      if (choice === true) yesCount++;
    }

    const passed = (yesCount === totalPeers && yesCount > 0);

    if (passed) {
      this.onCombatLog(`✅ Map reset passed unanimously (${yesCount}/${totalPeers})! Reseeding sector...`);
      if (vote.initiatorId === this.selfId || this.isMaster) {
        if (this.sendMapReset) {
          this.sendMapReset({ seed: vote.newSeed });
        }
      }
      this.triggerMapResetLocally(vote.newSeed);
    } else {
      this.onCombatLog(`❌ Map reset vote failed (${yesCount}/${totalPeers} agreed).`);
    }

    this.emitMapResetVoteEnd(passed);
  }

  emitMapResetVoteUpdate() {
    if (!this.currentMapResetVote) return;
    const totalPeers = this.peers.size + 1;
    let yesCount = 0;
    let noCount = 0;
    for (const [, choice] of this.currentMapResetVote.votes.entries()) {
      if (choice) yesCount++;
      else noCount++;
    }
    const remainingTime = Math.max(0, Math.ceil((this.currentMapResetVote.expiresAt - Date.now()) / 1000));
    const voteData = {
      active: true,
      voteId: this.currentMapResetVote.id,
      initiatorId: this.currentMapResetVote.initiatorId,
      initiatorName: this.currentMapResetVote.initiatorName,
      yesCount,
      noCount,
      totalPeers,
      remainingTime,
      hasVoted: this.currentMapResetVote.votes.has(this.selfId)
    };
    for (const cb of this.mapResetVoteListeners) {
      cb(voteData);
    }
  }

  emitMapResetVoteEnd(passed) {
    for (const cb of this.mapResetVoteListeners) {
      cb({ active: false, passed });
    }
  }

  triggerMapResetLocally(seed) {
    this.mapSeed = seed;
    for (const cb of this.mapResetListeners) {
      cb(seed);
    }
  }

  onMapResetVote(cb) {
    this.mapResetVoteListeners.add(cb);
    return () => this.mapResetVoteListeners.delete(cb);
  }

  onMapReset(cb) {
    this.mapResetListeners.add(cb);
    return () => this.mapResetListeners.delete(cb);
  }

  getAveragePing() {
    if (this.peers.size === 0) return 0;
    let sum = 0;
    for (const p of this.peers.values()) {
      sum += (p.ping || 30);
    }
    return Math.round(sum / this.peers.size);
  }

  leave() {
    lobbyService.stopMasterKeepAlive();
    if (this.pingInterval) clearInterval(this.pingInterval);
    if (this.stateBroadcastInterval) clearInterval(this.stateBroadcastInterval);
    if (this.voteTimeoutTimer) clearTimeout(this.voteTimeoutTimer);
    if (this.room) {
      try {
        this.room.leave();
      } catch (e) {}
      this.room = null;
    }
    this.peers.clear();
    this.cannonListeners.clear();
    this.mineListeners.clear();
    this.hitListeners.clear();
    this.killListeners.clear();
    this.laserListeners.clear();
    this.decoyListeners.clear();
    this.missileListeners.clear();
    this.mapResetVoteListeners.clear();
    this.mapResetListeners.clear();
    this.currentMapResetVote = null;
  }
}
