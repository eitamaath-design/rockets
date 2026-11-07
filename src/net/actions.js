/**
 * Universal Trystero action channel wrapper.
 * Adapts to modern Trystero (v0.22+) which returns an object { send, onReceive, onMessage }
 * and legacy Trystero (v0.x) which returned an array [send, onReceive].
 */
export function createActionChannel(room, actionName) {
  if (!room || typeof room.makeAction !== 'function') {
    return {
      send: () => {},
      onReceive: () => {}
    };
  }

  const rawAction = room.makeAction(actionName);

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
          rawAction[1](handler);
        } catch (e) {
          console.warn(`[Action:${actionName}] onReceive error:`, e);
        }
      }
    };
  }

  return {
    send: (data, target) => {
      try {
        if (rawAction && typeof rawAction.send === 'function') {
          const res = rawAction.send(data, target);
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
        if (rawAction) {
          rawAction.onReceive = handler;
        }
      } catch (e) {
        console.warn(`[Action:${actionName}] onReceive error:`, e);
      }
    }
  };
}
