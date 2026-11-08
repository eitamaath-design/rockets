# Rockets: Master Project Knowledge Base

This document serves as the permanent master reference for the **Rockets** multiplayer space shooter infrastructure, architecture, configuration, and operational runbooks. It maintains all architectural decisions, resource IDs, security/environment variables, operational procedures, and file locations across sessions.

---

## 1. Executive Summary & Architecture Overview

- **Project Goal:** A responsive, web-based, real-time 3D multiplayer space shooter running entirely peer-to-peer using WebRTC with zero registration, zero central server cost, decentralized master failover with keep-alive TTL heartbeats, set in a **Persistent Planetary Exploration & Orbital Dogfighting Arena** featuring a central mega-asteroid and an orbiting asteroid belt rendered via Three.js MarchingCubes volumetric density fields, complete with a P2P-synchronized Room Configuration Suite.
- **Core Technology Stack:**
  - **Frontend / Rendering:** Three.js (WebGL 3D graphics, procedural MarchingCubes volumetric density meshes, particle systems, cockpit interior).
  - **Networking / P2P Mesh:** `@trystero-p2p/nostr` and `@trystero-p2p/torrent` (serverless WebRTC signaling using open decentralized Nostr relays and public BitTorrent trackers).
  - **Build Tooling:** Vite (fast ESM bundler, production minification, asset pipeline).
  - **Hosting:** GitHub Pages via GitHub Actions / automated deployment.
- **Deployment & Hosting Model:** Static site hosted on GitHub Pages (`https://eitamaath-design.github.io/rockets/`).

```
                    +-------------------------------------+
                    |   Decentralized Public Relays       |
                    | (Nostr Relays / BitTorrent Trackers)|
                    +-------------------+-----------------+
                                        ^
                          WebRTC SDP    |    Signaling &
                         Exchange Only  |    Lobby Heartbeats
                                        v
  +------------------+         P2P DataChannels         +------------------+
  |  Player 1 Client | <==============================> |  Player 2 Client |
  | (Elected Master) |                                  |  (Mesh Peer)     |
  | - 60 FPS Physics | <------------------------------+ | - 60 FPS Physics |
  | - TTL Heartbeat  |                                | | - Dead Reckoning |
  +------------------+                                | +------------------+
          ^                                           |          ^
          |             P2P DataChannels              |          |
          +===========================================+==========+
                                      |
                                      v
                             +------------------+
                             |  Player N Client |
                             |  (Mesh Peer)     |
                             | - Interpolation  |
                             +------------------+
```

---

## 2. Key Decisions & Rationale

| Decision Area | Choice Made | Rationale & Trade-offs |
| :--- | :--- | :--- |
| **1000% Laser Efficiency & Small Asteroid Obliteration vs Mega Tunnel Excavation** | Deep Tunnel Carving ($r=42-48\text{u}, d=32-40\text{u}$) + Small Asteroid HP & Disintegration (`weapons.js`, `space.js`) | Primary laser beam features 1000% enhanced excavation yield. Small asteroids ($R \le 42\text{u}$) have finite hit points ($\approx 20$ HP) and are obliterated after 3–5 laser ticks, spawning 20–30 rock debris chunks with sound effects. Large and colossal asteroids ($R > 42\text{u}$) undergo massive deep carving ($r=42-48\text{u}$, $d=32-40\text{u}$) per tick, enabling players to rapidly drill navigable cavern corridors and mega-tunnels to hide or fly completely through. |
| **Multi-Stage Missile Visual Overhaul** | Unculled Billowing Exhaust Trails (`frustumCulled = false`) & Multi-Stage Detonations (`weapons.js`) | Eliminates sudden disappearing trail bugs when looking away or during turns by setting `fireTrails.points.frustumCulled = false`. Particle lifetime lengthened to $0.8-1.4\text{s}$, size scaled to $8.0-16.0$, with a realistic core-to-smoke gradient (white/yellow $\to$ orange flame $\to$ charcoal grey smoke). Missile explosions transition through a multi-stage sequence: expanding blinding fireball core, planar expanding shockwave ring/torus fading out, and radial spark debris burst. |
| **Procedural Colossal Asteroids & Sector-Wide Non-Overlap Placement** | Guaranteed 3+ Colossal Asteroids ($R=160-240$, Detail 4) & Sector Distribution (`space.js`) | Completely eliminates the cramped 12-titan box constraint (`220 x 110 x 320`) that caused initial spawn clumping and high-density pileups. Replaces it with sector-wide Poisson-style spacing verification ($dist \ge r_1 + r_2 + 25\text{u}$) ensuring at least 3 Colossal Asteroids ($R=160-240\text{u}$, detail 4 = 5,120 faces) spawn cleanly without overlapping, distributed evenly across the sector. |
| **Unified 360° Collision Matrix & 3-Pass PBD Separation** | 3-Pass Position-Based Dynamics (PBD) Solver, Deep Cavern Clearance & Ship-Ship Bumper Bounce (`space.js`, `blackhole.js`, `engine.js`, `ship.js`) | Replaces single-pass push with a 3-pass PBD relaxation solver in `spaceEnv.update` that firmly separates overlapping asteroids and clamps relative velocities ($\le 40\text{u/s}$). Cavern clearance in `resolveShipCollision` verifies ship position within deep carved cavity corridors so players can navigate carved tunnels without phantom collision deaths. Black Hole safely detaches consumed asteroids from `this.asteroidGroup` (via `spaceEnv.removeAsteroid(a)`) and uses an expanded threshold ($dist \le eventHorizonRadius + a.radius \times 0.85$). Local and remote starfighters execute elastic bumper bounces with velocity deflection and 0.25s damage debounce. |
| **Central Colossus Mega-Asteroid & Keplerian Orbital Belt** | Stationary Mega-Asteroid ($R=2800\text{u}$ at `(0,0,0)`) + Orbital Belt ($R=3300-5500\text{u}$) (`space.js`, `engine.js`, `ship.js`) | Replaces the encroaching Black Hole with a colossal planetary exploration setting. A stationary central mega-asteroid of 1000x ship scale ($R=2800\text{u}$, detail 4) sits at `(0,0,0)`. Surrounding it is a Keplerian orbital belt of 90–110 small ($R=15-35\text{u}$) and medium ($R=40-90\text{u}$) asteroids orbiting at $R_{orbit} \in [3300, 5500]\text{u}$ with tangential velocities $\vec{v} = \vec{\omega} \times \vec{r}$. Starfield sphere expanded to $7500-8500\text{u}$, ship sector boundary to $6500\text{u}$, and camera far clip to $12000\text{u}$ with low-density space fog ($0.00004$). Ships spawn safely in orbit at `(0, 80, 3200)`. |
| **Volumetric Voxel Marching Cubes Asteroids with Runtime Density Carving & Continuous Gradient Collision** | Three.js `MarchingCubes` Density Fields with Local Density Subtraction & Gradient Collision (`space.js`, `weapons.js`, `meteor.js`) | Replaces legacy Icosahedron vertex deformation meshes with volumetric `MarchingCubes` density fields. Laser beams, missiles, and meteors execute local density brush subtraction directly in `mc.field`, carving true organic tunnels, caverns, and deep craters with localized updates (`mc.update()`). Collision detection calculates the continuous density gradient $\nabla D$ to push ships out of solid terrain while providing natural flight clearance inside excavated cavities wherever density $D \le \text{mc.isolation}$. |
| **Configurable Asteroid Voxel Quality & Performance Scaling Parameter** | 3-Tier Grid Scaling: 'low' ($32^3$), 'medium' ($48^3$), 'high' ($64^3$) (`space.js`, `engine.js`, `main.js`) | Provides selectable volumetric resolution presets for testing and hardware scalability. 'low' ($32^3$) maximizes frame rate on integrated GPUs/mobile; 'medium' ($48^3$) provides crisp cave geometry; 'high' ($64^3$) renders fine-grained subterranean tunnels and detailed crater rims. |
| **Room Creator Configuration Suite & P2P State Synchronization** | Creator Drawer Controls with Nostr Heartbeats & WebRTC Config Channel (`lobby.js`, `network.js`, `main.js`, `hud.js`) | Allows the match creator to configure Voxel Quality, Belt Asteroid Count (50/100/150), Mega Asteroid Radius (1400/2800/4000u), and Meteor Hazard Frequency (0s/20s/10s/5s). Parameters are broadcast via Nostr lobby heartbeats, synchronized during WebRTC peer handshakes, displayed as lobby badges, and mirrored in a HUD configuration pill. |
| **Democratic 10-Second P2P Map Reset Voting Protocol** | Unanimous 10s P2P Ballot & Synchronized Seed Re-Generation (`network.js`, `engine.js`, `hud.js`) | Any peer can call for a sector re-seed via the `[🔄 Reset Map]` HUD button. A 10-second interactive countdown banner appears for all peers with live vote tallies and `[✓ Accept (Y)]` / `[✕ Decline (N)]` options. If all connected peers vote to accept (or immediately if playing solo), a synchronized new random seed is generated and broadcast, cleanly re-instantiating `SpaceEnvironment`, repositioning starfighters to safe orbital coordinates, and clearing old asteroid state without page reload. |
| **Periodic Meteor Bombardment with Mega-Asteroid Crater Carving** | Deep Crater Carving ($r \ge 120\text{u}, d \ge 80\text{u}$) on Stationary Colossus (`meteor.js`, `space.js`) | Meteors spawn at $6500-7000\text{u}$ traversing the orbital belt and colossus. On direct impact with the stationary central mega-asteroid, meteors blast massive craters ($r \ge 120\text{u}, d \ge 80\text{u}$) and eject rock debris without imparting kinetic impulse to the stationary central body. |
| **[Deprecated] Battle Royale Mode & Black Hole Devour** | Replaced by Persistent Planetary Exploration & Dogfighting | The shrinking safe zone and singularity devour mechanics have been superseded by the persistent planetary exploration arena and democratic map reset workflow. `blackhole.js` is deprecated. |
| **Continuous Sustained Laser Beam & Enhanced Asteroid Excavation** | Sustained Forward High-Yield Beam (`weapons.js`, `space.js`, `audio.js`, `hud.js`) | Replaces short intermittent pulses with a continuous, sustained twin converging coherent laser beam. Energy capacity (100) and drain rate (~18-20/s with 0.08s tick interval) support sustained carving fire for ~5 seconds. Primary laser carves tunnels and drills into asteroids with expanded carve radius ($r=30$) and depth ($d=20$), enabling pilots to tunnel deep into asteroids. Audio utilizes a continuous, smooth beam frequency cadence without cracking. |
| **Dual-Mode Missile Arsenal** | 3s Target Lock Guided + Unguided Dumb-Fire (`weapons.js`, `network.js`, `hud.js`) | Secondary weapon fires high-velocity missiles in two modes: (1) **Guided Mode**: if target is locked within crosshair cone for 3.0s, launches with `StandardPursuitGuidance`; (2) **Dumb-Fire Mode**: if unlocked, launches immediately forward along ship heading with `targetId = null` and proximity detonation against enemy ships. Impacts against asteroids blast massive craters ($r=45$, $d=35$) with heavy rock ejection. HUD clearly indicates `MISSILE [LOCKED]` vs `MISSILE [DUMB-FIRE]`. |
| **Asteroid Procedural Non-Overlap Spawn, Momentum Capping & Cavern Clearance** | Spacing Verification, Momentum Clamping & Crater Cavity Flight Clearance (`space.js`, `meteor.js`, `ship.js`) | Prevents asteroid-asteroid clipping on spawn by enforcing pairwise distance check ($dist \ge r_1 + r_2 + \text{margin}$) in both view cluster and sector field. Runtime pairwise collision limits separation push and clamps bounce speed. Meteor collisions cap asteroid impulse ($\le 30$ u/s) and top speed ($\le 40$ u/s) to prevent asteroids rocketing across the sector at hyper-speeds. Asteroids track all carving operations (`asteroid.carvings`); ship collision detection tests whether the ship is inside a carved crater cavity, exempting it from phantom collision deaths. Collision damage in `ship.js` uses impact debounce (0.25s) to avoid multi-frame lethal grinds. |
| **Dedicated Special Power-Up Button** | Dedicated Touch & Key [R] Slot with Neon Status Lighting (`ship.js`, `hud.js`, `powerups.js`) | Collecting power-ups stores them in `ship.storedPowerUp`. Special button (`btn-special` / `KeyR`) is grayed out and disabled when empty (`[EMPTY]`), and lights up with neon borders and icons when loaded (`🛡️ REPAIR [R]`, `👁️ CLOAK [R]`, `👥 DECOY [R]`). Pressing uses the powerup and clears the slot. Hologram decoy clone deploys a 15-second phantom starfighter. |
| **Broken Shields & Tactical Power-Ups** | Broken Shield Lockout + 10s Random Power-Ups (`powerups.js`, `ship.js`) | Shields recharge over 15s if intact; however, if fully depleted to 0 HP, `isShieldBroken` triggers and shields **never recharge** unless repaired. Power-ups spawn every 10s within the safe zone, lasting 60s: **Shield Replenish** (100% restore), **Cloaking Device** (60s invisible to enemies until firing), and **Hologram Decoy Clone** (phantom ship decoy). |
| **Evasive Boost** | 300% Stronger Boost with 2.0s Cooldown (`ship.js`) | Double-tapping thrust triggers an instant forward dodge impulse (+180 u/s) to evade incoming fire with blue plasma flash, sound effect, and HUD status badge. Cooldown reduced to 2.0s (usable every 2s). |
| **Panoramic Cockpit Frame** | Ultra-Slim Low-Profile Canopy & Recessed Autocannons (`cockpit.js`) | Lowered instrument dash ($y = -0.58$), widened A-pillars ($x = \pm 0.92$), and pushed heavy fluted autocannons to lateral wing mounts ($x = \pm 0.72$), dramatically expanding the unobstructed galactic view. |
| **P2P Signaling & Lobby Directory** | Trystero (`@trystero-p2p/nostr`) with `RELIABLE_NOSTR_RELAYS` | Eliminates expensive backend signaling servers and user authentication. Uses dedicated high-availability Nostr relays (`nos.lol`, `relay.damus.io`, `relay.snort.social`, `nostr.mom`) ensuring 100% peer discovery overlap across clients. Action channels use universal `createActionChannel` strictly listening to `onMessage` for message packets and normalizing peer IDs from metadata and payload. |
| **Periodic Fiery Meteors** | Asteroid-Sized Chaotic Sector Hazard with Fire Envelopes (`meteor.js`) | Spawns an asteroid-sized raging flaming meteor ($r = 56$ u, $m = 1,200,000$, $v \approx 260$ u/s) every 10s. Enveloped in dual turbulent flame mantles and trailing a 250-particle billowing plume. Clamped momentum transfer prevents asteroid warping while incinerating ships on direct contact. |
| **3D Positional Spatial Audio** | Web Audio API HRTF Spatial Panning with Real-Time Listener Tracking (`audio.js`) | Explosions, laser hums, missile launches, meteor flybys, and engagement beacons utilize 3D spatial `PannerNode`s (HRTF model, inverse distance attenuation). The audio listener continuously tracks camera position and orientation in world space. |
| **Shader Performance & Zero-Freeze Combat** | Pre-Allocated Static Lighting Pool & `renderer.compile()` Pre-Warming | Eliminates mid-game WebGL shader recompilations (`#define NUM_POINT_LIGHTS N`) that caused severe browser freezes and frame drops during close-quarters dogfights. Weapons, beacons, and explosions use pre-allocated static lights (`combatFlashLight`, `meteorLight`) and additive emissive materials instead of dynamically creating/destroying lights. |
| **Thruster Trails** | Engine-Propelled Vapor Plumes Decaying over 15s (`trail.js`) | Dynamic 3D particle exhaust plumes stream from ship thrusters strictly when active engine propulsion is engaged (`input.thrust`). Decays over 15 seconds. If drifting with momentum, no trail is emitted. |
| **Watertight Asteroids & Distant Celestial Sphere** | `BufferGeometryUtils.mergeVertices` + Seamless Normals + Background Starfield | Asteroids are indexed, welded manifolds without seams or split faces. Starfield is placed on a distant celestial sphere ($r = 7500-8500\text{u}$) with small pinprick sizing, eliminating all near-field floating white dust or blocky artifacts. |
| **Inactivity Engagement Beacon** | 30s Combat Inactivity Holographic Light Ripple & Sonar Ping (`beacon.js`) | If more than 30s elapse without combat between players, ships emit expanding 280u holographic ripples and spatial sonar audio pings every 3.5s to draw players together. Resets instantly upon firing weapons or landing hits. |
| **Diagnostics & Telemetry** | In-Memory Circular Logger + 5-Second Peer Telemetry Stats | Client-side circular event logger recording WebGL capabilities, input events, and errors. Automatically logs structured 5-second network statistics (packet arrival rates, latency, distance to remote ships, and scene visibility) to clipboard report via `🐞 Logs` button. |
| **Service Worker & Caching** | PWA Service Worker v12 (Network-First HTML, Cache-First Assets) | Guarantees mobile and desktop users immediately receive newly deployed builds on navigation while maintaining offline PWA caching. |
| **High-Ping Netcode** | Client-Side Prediction + Dead Reckoning & Interpolation | Local ship movement has zero input lag; remote peer movements are smoothed with velocity extrapolation and Hermite/spherical interpolation to mask latency. |

---

## 3. Environment, Infrastructure & Credentials

> [!NOTE]
> Rockets is fully serverless. No paid backend, API keys, or private database credentials are required.

### Services & Infrastructure Inventory
- **GitHub Repository:** `https://github.com/eitamaath-design/rockets`
- **GitHub Pages URL (Live):** `https://eitamaath-design.github.io/rockets/`
- **Deployment Status:** Active & Built (`gh-pages` branch + GitHub Actions)
- **Signaling Infrastructure:**
  - Public Nostr Relays: `wss://relay.damus.io`, `wss://nos.lol`, `wss://relay.snort.social`, `wss://nostr.mom`
  - Public STUN Servers: `stun:stun.l.google.com:19302`, `stun:stun1.l.google.com:19302`

---

## 4. Operations & Maintenance Runbook

### Prerequisites & Setup
1. Node.js (>= 18.0.0)
2. npm (>= 9.0.0)
3. Git & GitHub CLI (`gh`) authenticated with repository write access

### Common Run / Start / Stop Commands
- **Development Server:**
  ```bash
  npm run dev
  ```
- **Run Unit & Integration Tests (Vitest):**
  ```bash
  npm run test:unit
  ```
- **Run Headless Browser E2E Tests (Playwright):**
  ```bash
  npm run test:e2e
  ```
- **Compile Production Bundle:**
  ```bash
  npm run build
  ```
- **Deploy to Live Production (GitHub Pages):**
  ```bash
  npm run deploy
  ```

### Mandatory Automatic End-of-Task Deployment Policy
Any task or turn introducing bug fixes, new features, or configuration adjustments in the **Rockets** workspace **must always deploy automatically at the end of the turn**:
1. Run test verification (`npm run test:unit`).
2. Build production assets (`npm run build`).
3. Deploy directly to GitHub Pages (`npm run deploy`).
4. Stage, commit, and push changes to `main` (`git add -A && git commit -m "..." && git push origin main`).
5. Verify live production link: `https://eitamaath-design.github.io/rockets/`.

---

## 5. File & Directory Inventory

| File / Directory | Purpose |
| :--- | :--- |
| `src/main.js` | App entrypoint, lobby routing, URL param handling (`?room=`, `?quality=`, `?density=`, `?mega=`, `?meteor=`), Room Configuration Drawer, room badge rendering, and engine bootstrap. |
| `src/game/engine.js` | Core game loop, 60 FPS physics, scene orchestration, subsystem management with room configuration propagation, democratic map reset coordination (`resetMap(newSeed)`), safe orbital ship spawning, and ship-ship elastic bumper bounce. |
| `src/game/blackhole.js` | [Deprecated] Battle Royale Black Hole, retained for reference or optional legacy modes. |
| `src/game/powerups.js` | Tactical space power-ups (Shield Replenish, Invisibility Cloak, Hologram Decoy Clone) spawned across the Keplerian asteroid belt. |
| `src/game/space.js` | Three.js `MarchingCubes` volumetric density field asteroid rendering, central mega-asteroid ($R=2800\text{u}$ at `(0,0,0)`), Keplerian orbital asteroid belt ($R=3300-5500\text{u}$), runtime density brush carving (`carveAsteroid`), continuous density gradient ($\nabla D$) collision detection and tunnel/cavern clearance, configurable voxel quality ('low' 32³, 'medium' 48³, 'high' 64³), and `destroy()` cleanup. |
| `src/game/ship.js` | 6DOF player flight physics, orbital safe spawn at `(0, 80, 3200)`, $6500\text{u}$ sector clamp, 2s 300% boost, broken shields, cloaking, decoy power-up tracking, ship-ship collision bounce support, and impact debounce. |
| `src/game/cockpit.js` | Low-profile panoramic cockpit interior, vector displays, damage flash, boost recoil. |
| `src/game/weapons.js` | Dual arsenals: continuous sustained laser beam (1000% carving & small asteroid disintegration) + dual-mode missile with unculled billowing fire/smoke trails & multi-stage explosions. |
| `src/game/remoteShip.js` | Opponent 3D starfighter mesh, dead reckoning interpolation, invisibility cloak hiding. |
| `src/game/trail.js` | Engine-propelled 15s decaying particle plumes. |
| `src/game/beacon.js` | 30s inactivity holographic ripple and sonar ping. |
| `src/game/meteor.js` | Configurable chaotic flaming meteor hazard (frequency 0 [off], 20s, 10s, 5s), clamped momentum transfer, and volumetric mega-asteroid crater carving via `carveAsteroid`. |
| `src/game/audio.js` | Web Audio procedural synthesis (HRTF 3D positional panners, smooth continuous laser beam cadence, missile launches, boost, engine, chimes). |
| `src/game/hud.js` | Responsive HUD, touch controls, laser energy bar, missile lock/dumb-fire state indicators, active room configuration badge pill, `[🔄 Reset Map]` trigger button, and 10-second interactive P2P map reset voting banner. |
| `src/net/network.js` | WebRTC peer-to-peer data channels, master election, room configuration exchange handshake (`config` channel / `onConfig`), state, laser, guided/dumb-fire missile broadcast, decoy, hit, kill packets, and democratic map reset voting coordination (`map_reset_vote`). |
| `src/net/lobby.js` | Decentralized lobby discovery, room creation with serialized room configuration, Nostr TTL keep-alive heartbeats carrying config metadata. |
| `src/styles/main.css` | Cyberpunk flight HUD styling, touch controls, lobby room configuration drawer, room badges, map reset interactive banner, responsive layout. |
| `public/sw.js` | PWA Service Worker v12 with network-first HTML caching. |
| `tests/unit/mega_asteroid.test.js` | Comprehensive unit tests for Central Mega-Asteroid, Keplerian orbital belt, Three.js `MarchingCubes` volumetric density fields, configurable `voxelQuality` ('low', 'medium', 'high'), runtime density carving, density gradient collision clearance, cavity raycasting, and capsule flight clearance. |
| `GEMINI.md` | Project-level Antigravity directives enforcing automatic end-of-task build, test, and production deployment. |
| `.agent/rules/auto-deploy.md` | Workspace rule file enforcing automatic deployment to GitHub Pages. |
| `KNOWLEDGE_BASE.md` | Master project knowledge base. |
