# 🚀 Rockets: 3D P2P WebRTC Multiplayer Space Shooter

A fast, responsive, web-based 3D multiplayer space shooter running entirely **peer-to-peer using WebRTC** with zero accounts, zero registration, and zero central server costs.

**Live Game:** [https://eitamaath-design.github.io/rockets/](https://eitamaath-design.github.io/rockets/)

---

## 🌟 Key Features

- **Zero-Registration Serverless Matchmaking:**
  - Connects peers via decentralized WebRTC signaling over open Nostr relays and BitTorrent trackers powered by `@trystero-p2p/nostr`.
  - No database, no backend server, and no authentication needed.
- **Dynamic Master Election & Keep-Alive TTL:**
  - Games announce themselves to a decentralized public directory via a 10-second keep-alive TTL heartbeat.
  - Mesh peers run a deterministic leader election (lowest sorted peer UUID).
  - The elected session Master posts keep-alive TTL refreshes every 3.5 seconds.
  - If the master leaves or disconnects, the next peer in line takes over **instantly** without interrupting the game or dropping the room from discovery.
- **Seeded Procedural Asteroid Map:**
  - Room seed generates identical 3D asteroid fields deterministically for all peers.
  - Asteroids feature procedural craggy rock meshes, collision detection, and rotation.
- **First-Person 3D Cockpit:**
  - Detailed cockpit interior with HUD instruments, holographic crosshairs, velocity meters, and dynamic cockpit inertia/tilt responding to G-forces.
  - Shield glass hit flashes and low-health alarms.
- **Flight Physics & Momentum:**
  - **Forward Thrust:** Accelerates up to max speed (`90 u/s`) in the forward direction.
  - **Brake Thrusters:** Progressively decelerates the ship to a complete halt in **exactly 2.0 seconds** from full speed.
  - **Flight D-Pad & Controls:** 3-axis rotation (Pitch, Yaw/Pan, Roll).
  - **Lateral Strafing:** Dedicated left and right side thrusters.
- **Weapons Systems:**
  - **Front Firing Cannon:** Rapid-fire continuous plasma bolts. Time-To-Kill (TTK) is **2.0 seconds** if all projectiles hit. Depletable ammo with a 1.0-second delay cooldown before auto-recharging back to 100%.
  - **Rear Mines:** Max 2 charges with gradual auto-recharge. Upon activation, provides a forward impulse boost, leaves a proximity mine where the ship was, and detonates on player impact or after an automatic **3.0-second fuse**.
- **Lag Compensation & High Ping Netcode:**
  - **Client-Side Prediction:** Instant flight response with zero local input lag.
  - **Dead Reckoning & Interpolation:** Extrapolates remote player positions using velocity vectors and spherical quaternion slerp to smooth out jitter and latency spikes.
- **Scoreboard & HUD:**
  - Bottom HUD displays live score, kills, deaths, speed, shield/hull integrity, cannon ammo gauge, and mine charges.
  - Top bar shows room info, one-click copy invite link, connected pilot count, ping in ms, and current Master / Keep-Alive TTL status.
- **Responsive Controls:**
  - Desktop: Flight-sim keyboard (`W/A/S/D`, `Q/E`, `Space`, `F`) + mouse-look pointer lock.
  - Mobile & Tablet: On-screen touch D-pad, roll controls, side thruster buttons, and weapon triggers.

---

## 🎮 Flight & Combat Controls

| Action | Desktop Keyboard / Mouse | Touch / On-Screen HUD |
| :--- | :--- | :--- |
| **Thrust Forward** | `W` (Hold) | 🚀 **THRUST** (Hold) |
| **Slow Down (Brake)** | `S` (Hold to stop in 2.0s) | 🛑 **BRAKE** (Hold to stop in 2.0s) |
| **Strafe Left / Right** | `A` / `D` | ⬅ / ➡ Side Thruster Buttons |
| **Pitch & Yaw (Pan)** | Arrow Keys or Mouse Look | Left D-Pad (▲ ▼ ◀ ▶) |
| **Roll (Bank)** | `Q` / `E` | ↺ Roll L / ↻ Roll R Buttons |
| **Front Cannon** | `Space` / Left Mouse (Hold) | ⚡ **CANNON** (Hold) |
| **Rear Mine** | `F` / Right Mouse (Tap) | 💣 **MINE** (Tap) |

---

## 🛠️ Technology Stack

- **Graphics & Rendering:** [Three.js](https://threejs.org/) (WebGL)
- **P2P Networking:** [@trystero-p2p/nostr](https://github.com/dmotz/trystero) (Serverless WebRTC via Nostr relays)
- **Build System:** [Vite](https://vitejs.dev/)
- **Hosting:** [GitHub Pages](https://pages.github.com/)

---

## 🚀 Local Development

1. **Clone the repository:**
   ```bash
   git clone https://github.com/eitamaath-design/rockets.git
   cd rockets
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Start the local development server:**
   ```bash
   npm run dev
   ```

4. **Build for production:**
   ```bash
   npm run build
   ```

5. **Preview production build locally:**
   ```bash
   npm run preview
   ```

---

## 📄 License

MIT License. Open source and free for all pilots!
