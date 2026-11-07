import { joinRoom, selfId } from '@trystero-p2p/nostr';
import { lobbyService } from './lobby.js';

const APP_ID = 'rockets-3d-space-shooter';

export class GameNetwork {
  constructor({ roomId, roomName, mapSeed, playerName, onPeerJoined, onPeerLeft, onMasterChanged, onCombatLog }) {
    this.roomId = roomId;
    this.roomName = roomName || roomId;
    this.mapSeed = mapSeed || 42;
    this.playerName = playerName || `Pilot-${selfId.slice(0, 4)}`;
    this.selfId = selfId;

    this.onPeerJoined = onPeerJoined || (() => {});
    this.onPeerLeft = onPeerLeft || (() => {});
    this.onMasterChanged = onMasterChanged || (() => {});
    this.onCombatLog = onCombatLog || (() => {});

    this.room = null;
    this.currentMasterId = null;
    this.isMaster = false;
    this.peers = new Map(); // peerId -> { lastState, ping, lastSeen }

    // Action dispatchers
    this.sendState = null;
    this.sendCannon = null;
    this.sendMine = null;
    this.sendHit = null;
    this.sendKill = null;
    this.sendPing = null;
    this.sendPong = null;

    // Action listeners registered by game systems
    this.cannonListeners = new Set();
    this.mineListeners = new Set();
    this.hitListeners = new Set();
    this.killListeners = new Set();

    this.pingInterval = null;
    this.stateBroadcastInterval = null;
  }

  join() {
    this.room = joinRoom({ appId: APP_ID }, this.roomId);

    // Initialize WebRTC Actions
    const [sendState, getState] = this.room.makeAction('state');
    const [sendCannon, getCannon] = this.room.makeAction('cannon');
    const [sendMine, getMine] = this.room.makeAction('mine');
    const [sendHit, getHit] = this.room.makeAction('hit');
    const [sendKill, getKill] = this.room.makeAction('kill');
    const [sendPing, getPing] = this.room.makeAction('ping');
    const [sendPong, getPong] = this.room.makeAction('pong');

    this.sendState = sendState;
    this.sendCannon = sendCannon;
    this.sendMine = sendMine;
    this.sendHit = sendHit;
    this.sendKill = sendKill;
    this.sendPing = sendPing;
    this.sendPong = sendPong;

    // Incoming state packets
    getState((data, peerId) => {
      if (!this.peers.has(peerId)) {
        this.peers.set(peerId, { id: peerId, ping: 30, lastSeen: Date.now() });
      }
      const p = this.peers.get(peerId);
      p.lastState = data;
      p.lastSeen = Date.now();
    });

    // Cannon fire events
    getCannon((data, peerId) => {
      for (const cb of this.cannonListeners) {
        cb(data, peerId);
      }
    });

    // Mine drop events
    getMine((data, peerId) => {
      for (const cb of this.mineListeners) {
        cb(data, peerId);
      }
    });

    // Damage / Hit events
    getHit((data, peerId) => {
      for (const cb of this.hitListeners) {
        cb(data, peerId);
      }
    });

    // Kill events
    getKill((data, peerId) => {
      for (const cb of this.killListeners) {
        cb(data, peerId);
      }
    });

    // Ping / Pong for latency measurement
    getPing((data, peerId) => {
      if (this.sendPong) {
        this.sendPong({ t: data.t }, peerId);
      }
    });

    getPong((data, peerId) => {
      if (data && data.t && this.peers.has(peerId)) {
        const rtt = Math.max(1, Date.now() - data.t);
        this.peers.get(peerId).ping = rtt;
      }
    });

    // Peer Join / Leave callbacks
    this.room.onPeerJoin(peerId => {
      console.log(`[Mesh] Peer connected: ${peerId}`);
      this.peers.set(peerId, { id: peerId, ping: 40, lastSeen: Date.now() });
      this.updateMasterElection();
      this.onPeerJoined(peerId);
      this.onCombatLog(`🛰️ Pilot joined the mesh: ${peerId.slice(0, 5)}`);
    });

    this.room.onPeerLeave(peerId => {
      console.log(`[Mesh] Peer disconnected: ${peerId}`);
      this.peers.delete(peerId);
      this.updateMasterElection();
      this.onPeerLeft(peerId);
      this.onCombatLog(`💨 Pilot left the mesh: ${peerId.slice(0, 5)}`);
    });

    // Initial master election check
    this.updateMasterElection();

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
  }
}
