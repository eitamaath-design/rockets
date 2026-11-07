import { joinRoom, selfId } from '@trystero-p2p/nostr';

const APP_ID = 'rockets-3d-space-shooter';
const LOBBY_ROOM_ID = 'rockets_public_directory_v1';
const HEARTBEAT_INTERVAL_MS = 3500;
const ROOM_TTL_MS = 10000;

class LobbyService {
  constructor() {
    this.lobbyRoom = null;
    this.activeRooms = new Map(); // roomId -> { roomId, roomName, masterId, playerCount, mapSeed, lastSeen, ttlMs }
    this.listeners = new Set();
    this.heartbeatTimer = null;
    this.purgeTimer = null;
    this.currentHostingMatch = null; // { roomId, roomName, mapSeed, getPlayerCount }
    this.sendHeartbeat = null;
    this.sendQuery = null;
    this.isInitialized = false;
  }

  init() {
    if (this.isInitialized) return;
    this.isInitialized = true;

    try {
      this.lobbyRoom = joinRoom({ appId: APP_ID }, LOBBY_ROOM_ID);

      const [sendHb, getHb] = this.lobbyRoom.makeAction('room_heartbeat');
      const [sendQ, getQ] = this.lobbyRoom.makeAction('query_rooms');

      this.sendHeartbeat = sendHb;
      this.sendQuery = sendQ;

      getHb((data, peerId) => {
        if (!data || !data.roomId) return;
        this.activeRooms.set(data.roomId, {
          ...data,
          lastSeen: Date.now(),
          ttlMs: data.ttlMs || ROOM_TTL_MS
        });
        this.notifyListeners();
      });

      getQ((data, peerId) => {
        // If we are hosting a match and are the designated master, respond immediately
        if (this.currentHostingMatch && this.currentHostingMatch.isMaster()) {
          this.broadcastCurrentRoom();
        }
      });

      // Periodic check to purge dead rooms that exceeded TTL
      this.purgeTimer = setInterval(() => {
        const now = Date.now();
        let changed = false;
        for (const [roomId, room] of this.activeRooms.entries()) {
          if (now - room.lastSeen > room.ttlMs) {
            this.activeRooms.delete(roomId);
            changed = true;
          }
        }
        if (changed) {
          this.notifyListeners();
        }
      }, 2000);

      // Periodically request rooms when in lobby
      this.refreshRooms();
    } catch (err) {
      console.warn('Lobby network init warning:', err);
    }
  }

  refreshRooms() {
    if (this.sendQuery) {
      try {
        this.sendQuery({ req: 'list', from: selfId });
      } catch (e) {
        console.error(e);
      }
    }
  }

  /**
   * Called by the game session when the local player is (or becomes) the master of an active game.
   */
  startMasterKeepAlive(matchInfo) {
    this.currentHostingMatch = matchInfo;
    this.stopMasterKeepAlive();

    // Broadcast immediately upon becoming master
    this.broadcastCurrentRoom();

    // Schedule regular TTL heartbeats
    this.heartbeatTimer = setInterval(() => {
      if (this.currentHostingMatch && this.currentHostingMatch.isMaster()) {
        this.broadcastCurrentRoom();
      }
    }, HEARTBEAT_INTERVAL_MS);
  }

  stopMasterKeepAlive() {
    if (this.heartbeatTimer) {
      clearInterval(this.heartbeatTimer);
      this.heartbeatTimer = null;
    }
  }

  broadcastCurrentRoom() {
    if (!this.currentHostingMatch || !this.sendHeartbeat) return;
    try {
      const match = this.currentHostingMatch;
      const count = match.getPlayerCount ? match.getPlayerCount() : 1;
      const payload = {
        roomId: match.roomId,
        roomName: match.roomName || match.roomId,
        masterId: selfId,
        playerCount: count,
        mapSeed: match.mapSeed || 42,
        timestamp: Date.now(),
        ttlMs: ROOM_TTL_MS
      };
      this.sendHeartbeat(payload);

      // Also register locally so host sees own room in list
      this.activeRooms.set(match.roomId, {
        ...payload,
        lastSeen: Date.now()
      });
      this.notifyListeners();
    } catch (e) {
      console.error('Failed to send heartbeat:', e);
    }
  }

  onRoomsUpdated(cb) {
    this.listeners.add(cb);
    cb(this.getRoomsList());
    return () => this.listeners.delete(cb);
  }

  notifyListeners() {
    const list = this.getRoomsList();
    for (const cb of this.listeners) {
      cb(list);
    }
  }

  getRoomsList() {
    const now = Date.now();
    const result = [];
    for (const room of this.activeRooms.values()) {
      const remainingTTL = Math.max(0, Math.round((room.lastSeen + room.ttlMs - now) / 1000));
      result.push({
        ...room,
        ttlSecondsRemaining: remainingTTL
      });
    }
    // Sort by most recent/active
    return result.sort((a, b) => b.lastSeen - a.lastSeen);
  }

  destroy() {
    this.stopMasterKeepAlive();
    if (this.purgeTimer) clearInterval(this.purgeTimer);
    if (this.lobbyRoom) {
      try {
        this.lobbyRoom.leave();
      } catch (e) {}
    }
    this.activeRooms.clear();
    this.listeners.clear();
  }
}

export const lobbyService = new LobbyService();
