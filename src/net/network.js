import { joinRoom, selfId } from '@trystero-p2p/nostr';
import { lobbyService, APP_ID, RELIABLE_NOSTR_RELAYS } from './lobby.js';
import { createActionChannel } from './actions.js';

export class GameNetwork {
  constructor({ roomId, roomName, mapSeed, playerName, onPeerJoined, onPeerLeft, onMasterChanged, onCombatLog }) {
    this.roomId = roomId;
    this.roomName = roomName || roomId;
    this.mapSeed = mapSeed || 42;
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

    // Action listeners registered by game systems
    this.cannonListeners = new Set();
    this.mineListeners = new Set();
    this.hitListeners = new Set();
    this.killListeners = new Set();
    this.laserListeners = new Set();
    this.decoyListeners = new Set();
    this.missileListeners = new Set();

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
      console.log(`[Mesh] Peer connected: ${peerId}`);
      this.peers.set(peerId, { id: peerId, ping: 40, lastSeen: Date.now() });
      this.updateMasterElection();
      this.onPeerJoined(peerId);
      this.onCombatLog(`🛰️ Pilot joined the mesh: ${peerId.slice(0, 5)}`);
    };

    const handlePeerLeave = (peerId) => {
      if (!peerId || typeof peerId !== 'string') return;
      console.log(`[Mesh] Peer disconnected: ${peerId}`);
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

      console.log(`[Mesh] Master Election: elected ${electedMasterId} (Self is master: ${amIMaster})`);

      if (amIMaster) {
        // Start publishing keep-alive TTL heartbeats to public lobby
        lobbyService.startMasterKeepAlive({
          roomId: this.roomId,
          roomName: this.roomName,
          mapSeed: this.mapSeed,
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

  
  broadcastLaser(laserData) {
    if (this.sendLaser) {
      this.sendLaser(laserData);
    }
  }

  broadcastMissile(missileData) {
    if (this.sendMissile) {
      const payload = {
        ...missileData,
        targetPeerId: missileData.targetPeerId !== undefined ? missileData.targetPeerId : null
      };
      this.sendMissile(payload);
    }
  }

  broadcastDecoy(decoyData) {
    if (this.sendDecoy) {
      this.sendDecoy(decoyData);
    }
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
  }
}
