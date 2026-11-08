# Rockets: Master Project Knowledge Base

This document serves as the permanent master reference for the **Rockets** multiplayer space shooter infrastructure, architecture, configuration, and operational runbooks. It maintains all architectural decisions, resource IDs, security/environment variables, operational procedures, and file locations across sessions.

---

## 1. Executive Summary & Architecture Overview

- **Project Goal:** A responsive, web-based, real-time 3D multiplayer space shooter running entirely peer-to-peer using WebRTC with zero registration, zero central server cost, decentralized master failover with keep-alive TTL heartbeats, and a fast-paced 10-minute **Battle Royale** format.
- **Core Technology Stack:**
  - **Frontend / Rendering:** Three.js (WebGL 3D graphics, procedural meshes, particle systems, cockpit interior).
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
| **Battle Royale Mode & Robust Black Hole Devour Callback** | 10-Minute Encroaching Singularity & Dual-Signature Devour Callback (`blackhole.js`, `engine.js`) | Matches last max 10 minutes ($600$s). An encroaching Black Hole with an event horizon sphere ($r=65$), gravitational lensing ring, dual swirling accretion disks, and inward particle vortex gradually shrinks the safe zone from $R=1100$ down to $R=120$. Exerts continuous gravitational acceleration pulling ships, asteroids, and meteors towards it. Any entity crossing the event horizon is devoured. To eliminate crashes (`TypeError: r is not a function`), `BlackHoleSystem.prototype.update` safely accepts both dual signatures: `(dt, playerShip, remoteShipsMap, meteorSystem, onPlayerDevoured)` and `(dt, playerShip, remoteShipsMap, spaceEnv, meteorSystem, onPlayerDevoured)`. Safely type-checks `typeof onPlayerDevoured === 'function'` before invoking. Includes `getMatchTimeRemaining()` alias to prevent render loop exceptions. |
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
| **Watertight Asteroids & Distant Celestial Sphere** | `BufferGeometryUtils.mergeVertices` + Seamless Normals + Background Starfield | Asteroids are indexed, welded manifolds without seams or split faces. Starfield is placed on a distant celestial sphere ($r = 2900-3400$) with small pinprick sizing, eliminating all near-field floating white dust or blocky artifacts. |
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
| `src/main.js` | App entrypoint, lobby routing, URL param handling (`?room=`), and engine bootstrap. |
| `src/game/engine.js` | Core game loop, 60 FPS physics, scene orchestration, subsystem management, Battle Royale match loop, and ship-ship elastic bumper bounce. |
| `src/game/blackhole.js` | Battle Royale Black Hole, safe zone contraction, gravitational pull, safe `asteroidGroup` detachment via `removeAsteroid(a)`, dual-signature update & devour callback. |
| `src/game/powerups.js` | Tactical space power-ups (Shield Replenish, Invisibility Cloak, Hologram Decoy Clone). |
| `src/game/space.js` | Colossal asteroids ($R=160-240$), sector-wide non-overlap Poisson placement, 3-pass PBD separation, 1000% laser excavation & small asteroid HP obliteration, deep cavern clearance. |
| `src/game/ship.js` | 6DOF player flight physics, 2s 300% boost, broken shields, cloaking, decoy power-up tracking, ship-ship collision bounce support, and impact debounce. |
| `src/game/cockpit.js` | Low-profile panoramic cockpit interior, vector displays, damage flash, boost recoil. |
| `src/game/weapons.js` | Dual arsenals: continuous sustained laser beam (1000% carving & small asteroid disintegration) + dual-mode missile with unculled billowing fire/smoke trails & multi-stage explosions. |
| `src/game/remoteShip.js` | Opponent 3D starfighter mesh, dead reckoning interpolation, invisibility cloak hiding. |
| `src/game/trail.js` | Engine-propelled 15s decaying particle plumes. |
| `src/game/beacon.js` | 30s inactivity holographic ripple and sonar ping. |
| `src/game/meteor.js` | 10s chaotic flaming meteor hazard with clamped collision impulse ($\le 30$ u/s) and velocity cap ($\le 40$ u/s). |
| `src/game/audio.js` | Web Audio procedural synthesis (HRTF 3D positional panners, smooth continuous laser beam cadence, missile launches, boost, engine, chimes). |
| `src/game/hud.js` | Responsive HUD, touch controls, match clock, safe zone gauge, alive counter, victory banner, laser energy bar, and missile lock/dumb-fire state indicators. |
| `src/net/network.js` | WebRTC peer-to-peer data channels, master election, state, laser, guided/dumb-fire missile broadcast, decoy, hit, kill packets. |
| `src/net/lobby.js` | Decentralized lobby discovery, room creation, TTL keep-alive heartbeats. |
| `src/styles/main.css` | Cyberpunk flight HUD styling, touch controls, victory banner, responsive layout. |
| `public/sw.js` | PWA Service Worker v12 with network-first HTML caching. |
| `GEMINI.md` | Project-level Antigravity directives enforcing automatic end-of-task build, test, and production deployment. |
| `.agent/rules/auto-deploy.md` | Workspace rule file enforcing automatic deployment to GitHub Pages. |
| `KNOWLEDGE_BASE.md` | Master project knowledge base. |
