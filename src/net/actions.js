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

  // Helper to extract clean peerId string from either string or metadata object
  const extractPeerId = (meta) => {
    if (typeof meta === 'string') return meta;
    if (meta && typeof meta === 'object') {
      if (typeof meta.peerId === 'string') return meta.peerId;
      if (typeof meta.id === 'string') return meta.id;
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
            const peerId = extractPeerId(peerMeta);
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
          // Modern Trystero expects options object { target: peerId }
          const options = typeof target === 'string' ? { target } : (target || {});
          let res;
          try {
            res = rawAction.send(data, options);
          } catch (_) {
            // Fallback for signatures expecting (data, target)
            res = rawAction.send(data, target);
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
          const peerId = extractPeerId(meta);
          if (peerId) {
            handler(payload, peerId);
          }
        };

        // Modern Trystero uses onMessage for message-type actions
        if ('onMessage' in rawAction) {
          rawAction.onMessage = normalizedCallback;
        }

        // Also bind onReceive as fallback if onMessage was not provided or for older v0.2x
        if ('onReceive' in rawAction) {
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
