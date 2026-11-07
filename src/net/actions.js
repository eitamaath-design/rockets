/**
 * Universal Trystero action channel wrapper.
 * Adapts to modern Trystero (v0.22+) which returns an object { send, onReceive, onMessage }
 * and legacy Trystero (v0.x) which returned an array [send, onReceive].
 *
 * Normalizes arguments so that `handler(data, peerId)` ALWAYS receives a valid
 * string peerId regardless of Trystero internal metadata wrapping.
 */
export function createActionChannel(room, actionName) {
  if (!room || typeof room.makeAction !== 'function') {
    return {
      send: () => {},
      onReceive: () => {}
    };
  }

  const rawAction = room.makeAction(actionName);

  // Helper to extract clean peerId string from string, metadata object, or payload id
  const extractPeerId = (meta, payload) => {
    if (typeof meta === 'string' && meta.length > 0) return meta;
    if (meta && typeof meta === 'object') {
      if (typeof meta.peerId === 'string' && meta.peerId.length > 0) return meta.peerId;
      if (typeof meta.id === 'string' && meta.id.length > 0) return meta.id;
    }
    if (payload && typeof payload === 'object') {
      if (typeof payload.id === 'string' && payload.id.length > 0) return payload.id;
      if (typeof payload.senderId === 'string' && payload.senderId.length > 0) return payload.senderId;
    }
    return null;
  };

  // Legacy array format: [send, onReceive]
  if (Array.isArray(rawAction)) {
    return {
      send: (data, target) => {
        try {
          rawAction[0](data, target);
        } catch (e) {
          console.warn(`[Action:${actionName}] send error:`, e);
        }
      },
      onReceive: (handler) => {
        try {
          rawAction[1]((data, peerMeta) => {
            const peerId = extractPeerId(peerMeta, data);
            if (peerId) {
              handler(data, peerId);
            }
          });
        } catch (e) {
          console.warn(`[Action:${actionName}] onReceive error:`, e);
        }
      }
    };
  }

  // Modern object format: { send, onMessage, onReceive }
  return {
    send: (data, target) => {
      try {
        if (rawAction && typeof rawAction.send === 'function') {
          let res;
          if (target && typeof target === 'string') {
            res = rawAction.send(data, { target });
          } else {
            res = rawAction.send(data);
          }
          if (res && typeof res.catch === 'function') {
            res.catch(() => {});
          }
        }
      } catch (e) {
        console.warn(`[Action:${actionName}] send error:`, e);
      }
    },
    onReceive: (handler) => {
      try {
        if (!rawAction) return;

        const normalizedCallback = (payload, meta) => {
          const peerId = extractPeerId(meta, payload);
          if (peerId) {
            handler(payload, peerId);
          }
        };

        // Modern Trystero uses onMessage for message actions.
        // DO NOT set onReceive if onMessage exists, as onReceive configures binary stream mode!
        if ('onMessage' in rawAction) {
          rawAction.onMessage = normalizedCallback;
        } else if ('onReceive' in rawAction) {
          if (typeof rawAction.onReceive === 'function') {
            rawAction.onReceive(normalizedCallback);
          } else {
            rawAction.onReceive = normalizedCallback;
          }
        }
      } catch (e) {
        console.warn(`[Action:${actionName}] onReceive error:`, e);
      }
    }
  };
}
