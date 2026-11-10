# Rockets: Master Project Knowledge Base

This document serves as the permanent master reference for the **Rockets** multiplayer space shooter infrastructure, architecture, configuration, domain concepts, decisions, and operational runbooks. It maintains all architectural decisions, resource IDs, security/environment variables, operational procedures, and file locations across sessions and must be updated **before** making code changes (KB-First Pipeline).

---

## 1. Executive Summary & Architecture Overview

- **Project Goal:** A responsive, web-based, real-time 3D multiplayer space shooter running entirely peer-to-peer using WebRTC with zero registration, zero central server cost, decentralized master failover with keep-alive TTL heartbeats, set in a **Persistent Planetary Exploration & Orbital Dogfighting Arena** featuring a central mega-asteroid encircled by a halo of 32 large stationary asteroids and an orbiting asteroid belt rendered via Three.js MarchingCubes volumetric density fields, complete with a P2P-synchronized Room Configuration Suite.
- **Core Technology Stack:**
  - **Frontend / Rendering:** Three.js (WebGL 3D graphics, procedural MarchingCubes volumetric density fields, high-performance GPU `THREE.InstancedMesh` quad billboarding particle & explosion systems with zero heap allocation, low-profile cockpit interior).
  - **Networking / P2P Mesh:** `@trystero-p2p/nostr` (serverless WebRTC signaling using open decentralized Nostr relays).
  - **Build Tooling:** Vite (fast ESM bundler, production minification, automated build-time service worker cache ID injection, hidden sourcemaps).
  - **Hosting:** GitHub Pages via `gh-pages` branch deployment (`npm run deploy`).
- **Deployment & Hosting Model:** Static Progressive Web App (PWA) hosted on GitHub Pages (`https://eitamaath-design.github.io/rockets/`).

```
                    +-------------------------------------+
                    |   Decentralized Public Relays       |
                    |           (Nostr Relays)            |
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

## 2. Core Domain Concepts & Feature Specifications

### Domain Concepts & Invariants

- **Peer-to-Peer Mesh & Master Election:** The game runs completely serverless using WebRTC data channels brokered by public Nostr relays. The client with the lowest peer ID or earliest connection acts as Room Master (`isMaster === true`), orchestrating authoritative asteroid fracture/carve synchronization, periodic hazard clocks, and lobby discovery heartbeats. If the master disconnects, peers execute deterministic leader re-election without gameplay interruption.
- **Persistent Arena Coordinate Space:** The simulation takes place in a fixed cosmic reference frame:
  - Central Colossus Mega-Asteroid is stationary at `(0, 0, 0)` with nominal radius $R = 2800\text{u}$ ($scaleR = 3500\text{u}$).
  - Keplerian Orbital Belt spans $R_{\text{orbit}} \in [3300, 5500]\text{u}$ containing 90–110 procedural asteroids.
  - Ships spawn safely in orbit at `(0, 80, 3200)` with camera far clip set to $12000\text{u}$, starfield radius at $7500\text{--}8500\text{u}$, and hard sector boundary at $6500\text{u}$.
- **Volumetric MarchingCubes Density Invariant:** Asteroids are defined by discrete 3D density fields ($D \in [0, 100]$) evaluated across a cubic lattice (`mc.field`).
  - Solid terrain exists where $D > \text{mc.isolation}$ ($40.0$).
  - Navigable cavity, cavern corridors, and exterior space exist where $D \le 40.0$.
  - Density fields follow a solid core radial gradient $D = \max(0, (1.0 - (dist + noise)) \times 100)$ with `scaleR = radius / 0.80`, guaranteeing solid interiors ($D \ge 70-100$) and smooth Hermite boundary falloff ($D = 0$ on all outer bounding faces to prevent box-clipping artifacts).
- **Decoupled Pilot POV & Hull Orientation Invariant:** The starfighter employs an instant, unthrottled Pilot POV look target (`desiredQuaternion`, camera look) steered by mouse or touch, while the physical starfighter hull (`quaternion`) rotates toward `desiredQuaternion` bounded strictly by the ship's upgradeable capability limit `capabilities.maxTurnRate = 0.75 rad/s`. Forward propulsion and fixed weapon boresights align strictly with the physical hull (`ship.getForwardVector()`).
- **Dual-Gate Combat Engagement Invariant:** Fire Laser power-ups collected from meteor crater basins persist for a baseline duration (75 seconds) and are guaranteed never to expire until at least one complete dogfight engagement (`engagementsCompleted >= 1`) against an opponent starfighter has concluded.
- **Deterministic World State & Carve History Replay:** All density modifications (laser borer shafts, missile explosions, meteor impact craters) are broadcast with deterministic parameters over P2P data channels (`asteroid_carve`). Late-joining peers request and replay the full historical sequence (`applyCarveHistory`) with loopback echo suppression to maintain identical MarchingCubes meshes across all clients.

### Feature Specifications

#### Flight Subsystem
- **6DOF Flight Physics:** Newtonian starfighter dynamics with forward thrust, lateral strafe, pitch, yaw, and roll.
- **Speed Regimes:**
  - Sustained Cruising Speed: `maxSpeed = 280.0 u/s` with forward acceleration `forwardAccel = 60.0 u/s^2`.
  - Continuous-Thrust Hyper-Speed: Holding thrust while at or above cruising speed accelerates the starfighter at `hyperAccel = 90.0 u/s^2` up to `hyperSpeed = 560.0 u/s`.
  - Thrust-Release Deceleration: Releasing the thrust key decelerates the ship back to `maxSpeed` at `hyperDecelRate = 350.0 u/s^2`, smoothly preserving cruising momentum in zero gravity.
  - Emergency Braking: Decelerates the starfighter to a complete halt at `decelRate = 420.0 u/s^2` (~0.67s from full cruising speed).
- **Roll Input Smoothing:** Target roll inputs ramp smoothly at 6.0 units/s (`currentRollInput` to `targetRollInput`), eliminating abrupt snaps when pressing or releasing keyboard roll keys (`Q`/`E`) or analog triggers.
- **Rotational Capability Limits:** Pitch and yaw input rates operate at 3.2 rad/s for pilot look, while physical hull orientation tracks look direction limited by `capabilities.maxTurnRate = 0.75 rad/s`.
- **Momentum-Directed Charged Blink:** Continuous charging up to 1.0s displaces the starfighter forward by 1x to 10x hull length (28.0u to 280.0u) along its forward vector upon release. Velocity vectors are completely preserved (blink teleportation, no speed boost) with 2.0s cooldown.
- **Ship-to-Ship Bumper Collision:** Elastic bumper deflection with relative velocity deflection and a 0.25s damage debounce to avoid multi-frame collision grinds.

#### Weapons Subsystem
- **Primary Continuous Sustained Laser Beam:**
  - Twin converging high-energy laser beams emitted from wing hardpoints, tracking dynamically from ship emitters to hit point every frame.
  - Range: $3500.0\text{u}$ reach with $160.0\text{ u/s}$ projectile visual velocity.
  - Energy Economy: Max energy 100.0, consumption 20.0 energy/s (3.2 per 0.16s tick), sustaining exactly 5.0 seconds of continuous fire. 0.5s cooldown delay, then full recharge in 4.0s at 25.0 energy/s.
  - Combat Damage: 2.4 damage per tick (30 DPS hull, 72 DPS shield).
  - Progressive Asteroid Fracture: Hits invoke `space.fractureAsteroid` across 17 stages (`maxCrackStages = 17`). Hits 1–16 etch localized dark charcoal fissures into `mc.palette` and surface stress indentations; hit 17 triggers volumetric excavation via `carveAsteroid` (carve strength 48.0, volumetric yield factor 0.6692). Small 20 HP asteroids take 1.2 damage/tick and shatter into 28 debris chunks on the 17th shot ($1.2 \times 17 = 20.4$).
- **Crater Fire Laser Upgrade:**
  - 1.75x damage multiplier (4.2/tick vs ships, 2.1 vs small asteroids, 23.6 vs mega-asteroids).
  - 1.4x larger asteroid excavation volume with fiery orange/gold beam materials and fiery spark bursts.
  - Governed by the dual-gate persistence model (75s baseline + $\ge 1$ dogfight engagement completed).
- **Secondary Dual-Mode Missile Arsenal:**
  - Guided Mode: Line-of-sight tracking within crosshair cone for 3.0 seconds achieves target lock with `StandardPursuitGuidance` (max turn rate 3.2 rad/s, base acceleration 50.0 u/s²).
  - Dumb-Fire Mode: Unlocked firing launches missiles directly forward along hull heading with proximity detonation against enemy starfighters.
  - Ventral Underbelly Launch: Missiles fire from a ventral hardpoint displaced downward by 3.0u along the ship's local down vector (`ship.getDownVector()`) and 2.5u forward along the nose, ensuring billowing GPU smoke plumes remain completely beneath the cockpit canopy FOV.
  - Velocity Inheritance & Separation Clamping: Missiles inherit the starfighter's 3D velocity vector. Dynamic separation clamping enforces $v_{\text{missile}} \ge v_{\text{ship}} + 85.0\text{ u/s}$ and $v_{\text{max}} \ge v_{\text{ship}} + 210.0\text{ u/s}$ across cruising ($280\text{ u/s}$) and hyper-speed ($560\text{ u/s}$) regimes, preventing ships from catching up to their own ordnance.
  - Detonations: Impacts blast large craters ($r=45\text{u}, d=35\text{u}$) with multi-stage GPU instanced explosions (Stage 1 core, Stage 2 planar shockwave ring & puffs, Stage 3 radial sparks & outer smoke).

#### Asteroids & Volumetric Voxels Subsystem
- **Volumetric MarchingCubes Fields:** Replaces polygonal meshes with dynamic density fields using `ISOSURFACE_SCALE = 0.80` and `isolation = 40.0`.
- **Quality Presets:** Configurable 3-tier grid scaling: `'low'` ($32^3$), `'medium'` ($48^3$), `'high'` ($64^3$, default).
- **Volumetric Ray-Marching Hitscan:** `checkRayCollision` marches through `mc.field` with binary search sub-voxel bisection refinement to pinpoint exact isosurface crossings up to 3500u.
- **High-Yield Flat Core Tunnel Borer:** Cylindrical borer ($r \ge 180\text{u}, d \ge 260\text{u}, \text{strength} \ge 48\text{--}160$) with 65% flat core falloff and nearest-voxel fallback, carving navigable through-and-through tunnel shafts through the Mega-Asteroid.
- **Continuous Swept Multi-Point Density Field (CCD):** Velocity-adaptive sub-stepping ($N \le 16$) evaluating a 6-point hull envelope (center, nose, tail, wings, belly) along swept paths across 280–560 u/s. Collisions push ships outward along the local density gradient $\nabla D$ with `safeMargin = shipRadius + 0.6`, while granting natural clearance inside excavated cavern corridors where $D \le 40.0$.
- **Geological Strata & Shaders:** Dynamic vertex colors (`enableColors = true`) in `mc.palette` with altitude/crater darkening; dirty-subvolume AABB `updateNormalCache` unit-normalized gradients; custom triplanar shader `applyTriplanarRockShader` supporting `'low'`, `'balanced'` (hardware screen-space `dFdx`/`dFdy` derivative normal perturbation), and `'high'`.

#### Hazards & Power-ups Subsystem
- **Periodic Flaming Meteor Hazard:** Sized to 5%–10% of Central Mega-Asteroid radius ($140\text{--}280\text{u}$), featuring a craggy basaltic core (`0x1f1814`, roughness 0.90), glowing heat fissures (`0xff4400`, intensity 3.5), see-through transparent additive fire shroud and outer plasma halo, trailing instanced quad plumes. Blasts massive crater basins ($r \ge 1.5 \times r_{\text{meteor}}, d \ge 1.1 \times r_{\text{meteor}}$) on the Mega-Asteroid and spawns Crater Fire Laser power-ups.
- **Tactical Belt Power-ups:** Spawned every 10s across the orbital belt:
  - Shield Replenish: Instantly restores shields to 100%.
  - Invisibility Cloak: Grants 60s stealth; starfighter becomes invisible to enemy radar, HUD brackets, and star-glow beacons until weapons are fired.
  - Hologram Decoy Clone: Deploys a 15-second phantom starfighter that mimics flight maneuvers to decoy enemy missiles.
- **Broken Shield Lockout:** Depleted shields (0 HP) trigger `isShieldBroken` and never passively regenerate; shields remain offline until repaired by a Shield Replenish power-up.
- **Dedicated Power-Up HUD Slot:** Loaded power-ups display in `#btn-special` / Key [R] with neon border styling and icons (`🛡️ REPAIR`, `👁️ CLOAK`, `👥 DECOY`).

#### HUD & Input Subsystem
- **Dual-Reticle HUD:** Fixed center crosshair (`.hud-center-crosshair`) indicates Pilot POV look target; dynamic Ship Bore-Sight Reticle (`#hud-ship-boresight`) projects physical hull nose vector onto screen with `.tracking` (angular offset degree readout) and `.offscreen` (perimeter clamped with directional arrow pointer) states.
- **Line-of-Sight Corner Bracket Targeting:** 3D-to-2D projection with camera-forward dot-product frustum filtering, multi-hazard raycast obstruction checks (asteroids and active meteor hazards), full-rate per-frame execution across all clients (host and non-master peers alike) independent of diagnostic monitors, and distance-scaled sci-fi corner brackets (`.tl`, `.tr`, `.bl`, `.br`) with cyan shield and green/red HP bars over in-LOS enemy ships.
- **Animated 360° Tactical Radar:** 4500u range, viewpoint plane projection, relative elevation angles with degree readouts (`▲ +18°`, `▼ -24°`, `● 0°`), 3.0s animated sweep cycle.
- **Room Master Debug Monitor UX:** Optional, draggable, and minimizable diagnostic window (`#hud-master-monitor`) showing FPS, Frame Time, Draw Calls, Triangles, Memory, Ping, Mega Proximity, and Speed with 10Hz throttle and edge docking.
- **Ergonomic Android Mobile Fullscreen Exit:** Dedicated floating cyberpunk button (`#hud-float-exit-fullscreen`, min-height 44px, z-index 120) with `stopPropagation()` and `engine.isInteractiveTarget` registration.
- **Mobile Touch Controls:** Per-identifier multi-touch tracking (`changedTouches`, `activeTouchIds` Set), dynamic floating joystick with touch-down origin centering, circular ergonomic action buttons (`.action-touch-btn.touch-btn`).
- **Seamless Mouse Steering:** Unthrottled mouse look in both Pointer Lock mode and free-cursor hover mode with `engine.isInteractiveTarget` exclusion guards over HUD panels.
- **Democratic Map Reset:** 10s interactive P2P ballot countdown banner with live vote tallies and synchronized sector re-seeding.

#### Networking & P2P Subsystem
- **Serverless WebRTC Mesh:** Connected via `@trystero-p2p/nostr` over reliable public relays (`relay.primal.net`, `nos.lol`, `nostr.mom`).
- **Relaxed Keep-Alive Heartbeats:** 6-second heartbeat interval (`HEARTBEAT_INTERVAL_MS = 6000`, `ROOM_TTL_MS = 18000`), completely eliminating HTTP 429 rate-limiting bans.
- **High-Ping Netcode:** Client-side prediction with dead reckoning and spherical/Hermite interpolation to mask latency.
- **P2P Action Channels:** Dedicated channels for room configuration exchange (`config`), ship state, laser fire (`isFireLaser`), missile launches with initial velocity vector, decoy deployment, asteroid carve (`asteroid_carve`), and late-joiner world sync (`asteroid_world_sync`).

#### Rendering & Performance Subsystem
- **Uncapped High-Framerate Engine (200+ FPS):** Default `maxFps = 0` (Unlimited) across engine, lobby, and URL params; selectable options: `0` (Unlimited), `240` (Ultra), `120` (Pro), `90` (High), `60` (Eco).
- **Configurable DPI / Render Scale:** `renderScale` options: `0.75`, `1.0`, `1.5`, `2.0`.
- **Angular Sector PBD Spatial Pruning:** Replaces $O(N^2)$ brute-force asteroid collision checks with angular sector binning, eliminating >90% of pairwise checks.
- **Belt Asteroid Culling & Right-Sized VBOs:** `THREE.FrontSide` backface culling, bounding sphere frustum culling, and 6,000-poly MarchingCubes VBO allocation saving ~275 MB VRAM.
- **GPU InstancedMesh Quad Billboarding:** Unified single-draw-call particles with sub-frame distance interpolation, dirty-range `_prevActiveCount` upload skipping, and configurable `particleDensity` ('low' 0.5x, 'balanced' 1.0x, 'high' 1.5x).
- **Static Lighting Pre-Warming:** Pre-allocated static lights (`combatFlashLight`, `meteorLight`) with automatic `visible = false` culling when zero intensity, eliminating mid-game WebGL shader recompilations.
- **Distant Star-Glow Beacon:** Additive billboard with radial soft-glow DataTexture scaling smoothly from 100u to 6000u+ for long-range target acquisition.

#### Audio Subsystem
- **Web Audio API 3D Positional Audio:** HRTF spatial `PannerNode`s with inverse distance attenuation continuously tracking camera position and orientation in world space.
- **Procedural Audio Synthesis:** Continuous plasma hum loop for sustained laser fire (`startLaserLoop`, `stopLaserLoop`), missile launch whooshes, warp charging frequency sweep, warp sonic boom, engine hum, and 30s inactivity sonar ping.

---

## 3. Key Decisions & Rationale

| Decision Area | Choice Made | Rationale & Trade-offs |
| :--- | :--- | :--- |
| **WebRTC P2P Mesh over Nostr Relays** | `@trystero-p2p/nostr` with `RELIABLE_NOSTR_RELAYS` (`relay.primal.net`, `nos.lol`, `nostr.mom`) and 6s heartbeat cadence (`network.js`, `lobby.js`) | Eliminates expensive backend game server infrastructure and database costs while providing robust WebRTC signaling. Relaxed 6s heartbeat / 18s TTL prevents HTTP 429 rate-limiting bans. |
| **Continuous Sustained Twin Laser Beam & 17-Stage Progressive Asteroid Carving** | Continuous Converging Beam with Dynamic Geometry Tracking, Smooth Web Audio Hum, and 17-Stage Progressive Asteroid Fracture (`weapons.js`, `space.js`, `audio.js`, `tests/unit/weapons.test.js`) | Replaces discrete pulsing with continuous sustained twin beams ($3500\text{u}$ range, $160\text{ u/s}$ speed, $20\text{ energy/s}$, $5\text{s}$ fire capacity, $25\text{/s}$ recharge) and 17-stage fracture cracking ($1.2\text{ dmg/tick}$ on small asteroids, $13.5$ on mega/medium, $48.0$ carving strength) before triggering volumetric excavation, balancing arcade responsiveness with tactile asteroid excavation. |
| **Dual-Mode Missile Arsenal & Newtonian Velocity Inheritance** | 3.0s LOS Lock Guided + Unguided Dumb-Fire with Velocity Inheritance & Dynamic Separation Clamping (`weapons.js`, `network.js`, `tests/unit/weapons.test.js`) | Missiles inherit parent starfighter 3D velocity with dynamic separation speed clamping ($v_{\text{missile}} \ge v_{\text{ship}} + 85.0\text{ u/s}$, $v_{\text{max}} \ge v_{\text{ship}} + 210.0\text{ u/s}$) across cruising ($280\text{ u/s}$) and hyper-speed ($560\text{ u/s}$) flight, ensuring ships can never overtake their own ordnance. |
| **Ventral Missile Hardpoint Underbelly Launch & FOV Clearance** | Ventral Launch Pylon displaced 3.0u downward along local down vector and 2.5u forward along nose (`weapons.js`, `ship.js`) | Solves visual occlusion where missile exhaust plumes obstructed the cockpit sightline, ensuring a completely clear forward crosshair during missile launches. |
| **Volumetric MarchingCubes Asteroids & Solid Core Monotonic Density Gradient** | Three.js `MarchingCubes` with Solid Core Radial Gradient $D = \max(0, (1 - (dist+noise))\times 100)$, `scaleR = radius / 0.80`, `isolation = 40.0`, and Right-Sized VBOs (`space.js`, `tests/unit/mega_asteroid.test.js`) | Replaces polygonal meshes with destructible volumetric density fields. Solid core radial gradient prevents hollow void artifacts, while right-sized VBO buffers (150k polys for mega, 6k for belt) save ~275 MB of VRAM. |
| **Volumetric Ray-Marching Hitscan & Flat-Core Capsule Tunnel Borer** | Volumetric Density Ray-Marching with Sub-Voxel Bisection & High-Yield Flat Core Borer ($r \ge 180\text{u}, d \ge 260\text{u}$) (`space.js`, `weapons.js`) | Allows laser beams to penetrate deep into excavated shafts ($maxDist = 3500\text{u}$) and ensures borer rays reliably excavate solid rock without falloff starvation, creating through-and-through navigable cavern tunnels. |
| **Geological Strata Vertex Colors & Screen-Space Derivative Triplanar Rock Shaders** | Dynamic `mc.palette` Strata + Localized AABB `updateNormalCache` + Configurable `applyTriplanarRockShader` with `dFdx`/`dFdy` Derivative Bump (`space.js`, `tests/unit/performance_config.test.js`) | Renders realistic geological rock strata and surface fracture fissures without UV texture mapping. Hardware screen-space derivatives eliminate 87% of noise ALU in rock shaders. |
| **Continuous Swept Multi-Point Density Field (CCD) with Velocity-Adaptive Sub-Stepping** | 6-Point Hull Envelope with Velocity-Adaptive Sub-Stepping ($N \le 16$) and Density Gradient Normal Repulsion (`space.js`, `ship.js`, `tests/unit/ship_collision.test.js`) | Eliminates tunneling and clipping artifacts across high-speed flight regimes ($280\text{--}560\text{ u/s}$), pushing starfighters outward along $\nabla D$ with `shipRadius + 0.6` safety margin while granting clearance inside excavated caverns where $D \le 40.0$. |
| **Decoupled Unthrottled Pilot POV & Capability-Limited Hull Navigation Controller** | Instant Pilot POV Look Target & Rate-Limited Hull Catch-Up (`capabilities.maxTurnRate = 0.75 rad/s`) (`ship.js`, `engine.js`, `tests/unit/flight.test.js`) | Pilot look target steers instantly via unthrottled mouse or touch input, while the physical starfighter hull catches up bounded by its upgradeable turn rate limit, making high-deflection dogfighting visceral and skillful. |
| **Dual-Reticle HUD Bore-Sight & Visceral Lagging 3D Cockpit Dynamics** | Relative Angular Cockpit Deflection & Dynamic Projected Bore-Sight Reticle (`cockpit.js`, `hud.js`, `engine.js`, `src/styles/main.css`) | Cockpit canopy visibly trails rapid turns ($Q_{rel} = Q_{desired}^{-1} \times Q_{ship}$, clamped to 0.45 rad). Dual-reticle HUD decouples aiming: center crosshair represents pilot look, while dynamic Ship Bore-Sight (`#hud-ship-boresight`) projects physical weapon alignment. |
| **GPU InstancedMesh Quad Billboarding Particle Architecture with Dirty-Range PCIe Uploads** | Unified Single-Draw-Call `THREE.InstancedMesh` Quad Billboarding with Dirty-Range Matrix Uploads & Configurable `particleDensity` (`trail.js`, `weapons.js`, `space.js`, `meteor.js`, `tests/unit/particles.test.js`) | Replaces per-particle scene graph objects with unified GPU instancing. Tracking `_prevActiveCount` zeroes only deactivated slots, eliminating idle per-frame PCIe buffer uploads. |
| **High-Framerate (200+ FPS) Engine Architecture & GPU/CPU Performance Optimization Suite** | Uncapped Default `maxFps = 0`, Angular Sector Spatial Pruning, Screen-Space Derivative Shaders, Dirty Normal Caches & InstancedMesh Dirty-Range Uploads (`engine.js`, `main.js`, `space.js`, `trail.js`, `weapons.js`, `hud.js`, `tests/unit/performance_config.test.js`) | Delivers 200+ FPS by setting default `maxFps = 0` (with options 0, 240, 120, 90, 60), pruning >90% of pairwise asteroid physics checks via angular sector binning, replacing 52 noise calls/pixel with `dFdx`/`dFdy` screen-space rock derivatives, restricting normal updates to dirty AABBs, culling belt backfaces and offscreen frustums with 6,000-poly VBOs (saving ~275 MB VRAM), skipping idle InstancedMesh PCIe uploads via `_prevActiveCount`, culling zero-intensity combat lights, and dirty-checking HUD gauge writes. |
| **Distant Celestial Star-Glow Beacon for Remote Starfighters** | Distance-Adaptive Additive Star-Glow Billboard with Radial Soft-Glow DataTexture (`remoteShip.js`, `trail.js`, `tests/unit/distant_ship_glow.test.js`) | Renders a celestial beacon billboard for remote starfighters (100u to 6000u+) so enemy ships remain trackable across deep space without occluding close-range 3D hull geometry. Automatically respects cloaking and death. |
| **Periodic Meteor Bombardment & Mega-Asteroid Crater Carving** | Dynamic 5%–10% Mega-Asteroid Impactor & Deep Crater Carving on Stationary Colossus (`meteor.js`, `space.js`, `powerups.js`, `tests/unit/meteor_crater.test.js`) | Periodically spawns flaming meteors traversing the arena. Impacts blast massive craters ($r \ge 1.5 \times r_{\text{meteor}}, d \ge 1.1 \times r_{\text{meteor}}$) in the Mega-Asteroid and deposit collectible Fire Laser power-ups inside crater basins. |
| **Collectible Crater Fire Laser Upgrade & Dual-Gate Combat Persistence** | Crater Power-Up, Enhanced Fiery Weaponry & Dual-Gate Enemy Engagement Persistence (`powerups.js`, `ship.js`, `weapons.js`, `engine.js`, `hud.js`, `src/styles/main.css`) | Equips starfighters with 1.75x damage and 1.4x larger excavation yield. Governed by dual-gate persistence: 75s baseline duration AND guaranteed never to expire until at least 1 full enemy engagement (`engagementsCompleted >= 1`) has concluded. |
| **Line-of-Sight Corner Bracket Targeting System with Status Bars** | Full-Rate DOM HUD Overlay Targeting System with 3D Projection, Multi-Hazard Raycast Obstruction Checking, and Shield/HP Bars (`hud.js`, `space.js`, `engine.js`, `remoteShip.js`, `src/styles/main.css`, `tests/unit/targetingSystem.test.js`) | Displays sci-fi corner brackets (`.tl`, `.tr`, `.bl`, `.br`) and dual status bars over enemy ships in direct line of sight at full 60fps across all clients (master and non-master peers alike). Evaluates line of sight against both MarchingCubes asteroids and active meteor hazards, suppresses behind-camera projection via camera forward dot products, and automatically ignores dead or cloaked starfighters. |
| **360° Tactical Elevation Radar HUD Overlay** | 4500u Viewpoint Plane Radar with Elevation Degrees and 3.0s Sweep Cadence (`hud.js`, `src/styles/main.css`, `tests/unit/radar.test.js`) | Circular radar projecting relative enemy positions onto the pilot's viewpoint plane, displaying relative elevation angles (`▲ +18°`, `▼ -24°`, `● 0°`) refreshed every 3.0s with animated sweep arm. |
| **Room Master Debug Monitor UX & Telemetry Throttling** | Optional, Minimizable & Draggable Real-Time Diagnostics Window (`hud.js`, `engine.js`, `main.js`, `src/styles/main.css`, `tests/unit/hud_monitor.test.js`) | Displays FPS, frame time, draw calls, triangles, memory, ping, mega-asteroid distance, and speed on Room Master clients (`showStats !== false`), throttled to 10Hz DOM updates with edge docking and multi-touch dragging. |
| **Ergonomic Android Mobile Fullscreen Exit Control** | Dedicated Floating Cyberpunk Fullscreen Exit Button (`#hud-float-exit-fullscreen`, min-height 44px, z-index 120) (`hud.js`, `src/styles/main.css`, `engine.js`, `tests/unit/hud_fullscreen.test.js`) | Solves mobile fullscreen exit usability challenges on Android devices. High z-index, touch-optimized hit target with `stopPropagation()` and `engine.isInteractiveTarget` registration. |
| **Automated Build-Time Service Worker Cache Name Derivation** | Build-Time Cache Derivation (`rockets-pwa-${gitSha}-${timestamp}`) via Vite Plugin (`vite.config.js`, `src/utils/sw_build.js`, `public/sw.js`, `tests/unit/sw_cache.test.js`) | Replaces `__BUILD_ID__` in `dist/sw.js` with git short SHA + build timestamp during `npm run build`, guaranteeing mobile and desktop users receive newly deployed builds on navigation while eliminating manual version bumps. |
| **3D Positional Spatial Audio via Web Audio API HRTF Panners** | Web Audio API HRTF Spatial Panning with Real-Time Listener Tracking (`audio.js`, `tests/unit/audio.test.js`) | All weapon blasts, engine hums, explosions, and beacons utilize 3D spatial `PannerNode`s continuously tracking camera position and orientation in world space. |
| **Democratic 10-Second P2P Map Reset Voting Protocol** | Unanimous 10s P2P Ballot & Synchronized Seed Re-Generation (`network.js`, `engine.js`, `hud.js`) | Any peer can call for a map re-seed via the `[🔄 Reset Map]` HUD button. A 10s interactive banner tallies votes; unanimous acceptance cleanly re-instantiates `SpaceEnvironment` with a synchronized seed without reloading the page. |
| **5x Starfighter Hull & Collision Scaling** | Hull Length 28.0u, Radius 14.0u, Blink 28u to 280u (`ship.js`, `remoteShip.js`, `engine.js`, `space.js`, `weapons.js`, `tests/unit/flight.test.js`) | Scaled starfighter meshes, collision envelopes, engine flares, and blink teleportation ranges 5x across the simulation for dramatic visual presence and cavern navigation balance. |

### Superseded & Deprecated Architectural Decisions

- **Battle Royale Mode & Shrinking Zone (`blackhole.js`):** Removed in favor of persistent planetary exploration, Keplerian orbital belt, and stationary central mega-asteroid.
- **Discrete Pulsed Laser Fire & Legacy Damage Tunings:** Superseded by continuous sustained twin laser beam with 17-stage fracture cracking.
- **Legacy Low-Speed Cruising (140 u/s) & Evasive Boost:** Superseded by doubled cruising speed (280 u/s), continuous-thrust hyper-speed acceleration (560 u/s), and momentum-directed charged blink.
- **Manual Service Worker Version Bumping:** Superseded by automated build-time cache ID injection (`__BUILD_ID__`).

---

## 4. Environment, Infrastructure & Credentials

> [!CAUTION]
> If committing this file to version control, ensure production secrets/passwords are kept in `.env` files or secret managers, referencing only variable names and key IDs here.

### Services & Infrastructure Inventory

- **Hosting Platform:** GitHub Pages (`https://eitamaath-design.github.io/rockets/`) deployed via the `gh-pages` branch.
- **Signaling Infrastructure (Serverless Public Nostr Relays):**
  - `wss://relay.primal.net`
  - `wss://nos.lol`
  - `wss://nostr.mom`
- **STUN Infrastructure (WebRTC NAT Traversal):**
  - `stun:stun.l.google.com:19302`
  - `stun:stun1.l.google.com:19302`

### Configuration Keys & URL Parameters

| Parameter | Type / Options | Default | Purpose |
| :--- | :--- | :--- | :--- |
| `?room=` | String | Random sector name | Sector / room identifier for WebRTC mesh and Nostr lobby discovery. |
| `?quality=` | `'low'`, `'medium'`, `'high'` | `'high'` | Volumetric MarchingCubes grid resolution ($32^3$, $48^3$, $64^3$). |
| `?density=` | `50`, `100`, `150` | `100` | Number of procedural asteroids spawned in the Keplerian orbital belt. |
| `?mega=` | `1400`, `2800`, `4000` | `2800` | Radius of the stationary Central Mega-Asteroid in world units. |
| `?meteor=` | `0`, `5`, `10`, `20` | `10` | Frequency of periodic flaming meteor hazards in seconds (`0` disables). |
| `?scale=` | `0.75`, `1.0`, `1.5`, `2.0` | `1.0` | Viewport render scale / DPI cap for GPU performance tuning. |
| `?fps=` | `0`, `240`, `120`, `90`, `60` | `0` (Unlimited) | Target frame-rate cap (`0` unlocks 200+ FPS rendering). |
| `?shader=` | `'low'`, `'balanced'`, `'high'` | `'balanced'` | Procedural rock shader detail (`balanced` uses screen-space `dFdx`/`dFdy`). |
| `?particles=`| `'low'`, `'balanced'`, `'high'` | `'balanced'` | Particle count multiplier for GPU InstancedMesh vapor and explosion pools. |
| `?stats=` | `true`, `false` | `true` | Enables the draggable Room Master Debug Monitor `#hud-master-monitor`. |

---

## 5. Testing Strategy & Quality Gates

- **Test Frameworks & Runners:**
  - **Vitest:** Headless unit and integration testing running in Node.js environment (`npm run test:unit`).
  - **Playwright:** End-to-end headless browser and visual screenshot verification (`npm run test:e2e`).
- **Coverage & Invariant Requirements:** All flight dynamics, weapons, volumetric MarchingCubes carving, netcode synchronization, and UI controls must have automated test coverage. All 217+ unit tests must pass cleanly before any code or documentation changes are released.

| Test Suite / File | Scope & Covered Scenarios | Execution Command |
| :--- | :--- | :--- |
| `tests/unit/weapons.test.js` | Dual weapon systems, sustained laser beam, 17-stage progressive fracture ($1.2\text{ damage}$ each on 20 HP asteroids), missiles, velocity inheritance, separation clamping. | `npm run test:unit` |
| `tests/unit/mega_asteroid.test.js` | MarchingCubes volumetric density fields, quality presets, progressive fracture API (default 5-stage), carving telemetry, narrowphase density collision. | `npm run test:unit` |
| `tests/unit/performance_config.test.js` | 5 GPU/CPU performance optimizations, shaders, normal cache, render scale, max fps, instanced mesh dirty ranges. | `npm run test:unit` |
| `tests/unit/space_carve_sync.test.js` | P2P asteroid carve and fracture synchronization, deterministic MarchingCubes density updates across peers, echo suppression, and late-joiner carve history replay. | `npm run test:unit` |
| `tests/unit/particles.test.js` | GPU `THREE.InstancedMesh` particle systems, single draw calls, pooling, decay, and color ramps. | `npm run test:unit` |
| `tests/unit/flight.test.js` | Flight physics, sustained cruising `maxSpeed = 280.0 u/s`, continuous-thrust hyper-speed (`560.0 u/s`), emergency braking (`420.0 u/s^2`), Pilot POV decoupling, capability limits (`maxTurnRate = 0.75`), mouse look, roll smoothing, charged blink. | `npm run test:unit` |
| `tests/unit/hud_monitor.test.js` | Room Master Debug Monitor UX, docking, dragging, telemetry throttling, bore-sight reticle. | `npm run test:unit` |
| `tests/unit/hud_fullscreen.test.js` | Floating fullscreen exit button (`#hud-float-exit-fullscreen`), visibility toggling on fullscreen changes, click and touch event handling with `stopPropagation()`, and engine interactive target verification. | `npm run test:unit` |
| `tests/unit/sw_cache.test.js` | Build-time service worker cache ID injection helper, git SHA resolution, and asset caching whitelist integrity. | `npm run test:unit` |
| `tests/unit/meteor_crater.test.js` | Meteor hazard, sizing, fiery trails, crater excavation, Fire Laser power-up, dual-gate persistence. | `npm run test:unit` |
| `tests/unit/ship_collision.test.js` | Hull-radius-aware multi-point hull sampling, orientation quaternions, high-speed impact collision detection & zero-clipping resolution across 280–560 u/s, cavern navigation inside carved cavities. | `npm run test:unit` |
| `tests/unit/engine_visibility.test.js` | Engine nozzle flare attachments, idle reactor glow, thrust-activated plumes, standoff distance-adaptive scaling factor at up to 3500u. | `npm run test:unit` |
| `tests/unit/distant_ship_glow.test.js` | Distance-adaptive additive star-glow billboard for remote starfighters, radial soft-glow DataTexture, 100u–6000u+ scaling, cloaking/death suppression. | `npm run test:unit` |
| `tests/unit/radar.test.js` | 360° tactical elevation radar HUD overlay, 4500u range, relative elevation angle computation, 3.0s sweep cadence, filter dead/cloaked ships. | `npm run test:unit` |
| `tests/unit/targetingSystem.test.js` | Line-of-sight corner bracket targeting system, 3D projection, raycast obstruction check, dual shield/HP status bars. | `npm run test:unit` |
| `tests/unit/hazards.test.js` | Space hazards, asteroid collisions, power-up pickups, shield depletion and damage mechanics. | `npm run test:unit` |
| `tests/unit/netcode.test.js` | P2P netcode, master election, client-side prediction, dead reckoning, latency interpolation, and keep-alive heartbeats. | `npm run test:unit` |
| `tests/unit/math.test.js` | Math utility helpers (`clamp`, angles, vectors, normalization). | `npm run test:unit` |
| `tests/unit/audio.test.js` | Web Audio API sound synthesis, 3D spatial audio panners, laser hum loops, volume controls. | `npm run test:unit` |
| `tests/integration/combat.test.js` | Multi-ship dogfight integration, weapon hits, damage resolution, shield breaking, kill scoring, and respawn cycles. | `npm run test:unit` |
| `tests/e2e/browser.test.js` | Playwright headless browser E2E tests across desktop and mobile viewports verifying lobby, canvas init, dual-reticle HUD, mouse look flight. | `npm run test:e2e` |
| `tests/e2e/capture.test.js` | Playwright automated visual verification suite capturing progressive tunnel excavation screenshots. | `npm run test:e2e` |
| `tests/e2e/enemy_ship_glow.test.js` | Playwright visual verification of distant enemy starfighter star-glow billboard rendering across space. | `npm run test:e2e` |
| `tests/e2e/trails_visual.test.js` | Playwright visual verification of thruster vapor wakes, missile plumes, and multi-stage explosions. | `npm run test:e2e` |

---

## 6. Operations & Maintenance Runbook

### Prerequisites & Setup
1. Node.js (>= 20.0.0, specified via `.nvmrc` and `engines` in `package.json`)
2. npm (>= 9.0.0)
3. Git & GitHub CLI (`gh`) authenticated with repository write access

### Common Run / Start / Stop Commands
- **Development Server:**
  ```bash
  npm run dev
  ```
- **Code Linting (ESLint):**
  ```bash
  npm run lint
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
  *(Note: `npm run deploy` is test-gated via `predeploy`, which automatically runs `npm run test:unit && npm run build` before publishing `dist/` to the `gh-pages` branch).*

### Deployment Policy & Strategy
- **Auto-Deploy Per Task:** `true` (Every individual task, bug fix, or feature MUST automatically build, test, deploy to GitHub Pages, and push to `main` before moving to the next task).
- **Target Platform:** GitHub Pages (`gh-pages` branch)
- **Build Command:** `npm run build`
- **Deploy Command:** `npm run deploy` (automatically triggers `predeploy` test gate and build)
- **Live URL:** `https://eitamaath-design.github.io/rockets/`
- **Cache Invalidation:** Automated at build time via Vite plugin in `vite.config.js` (replaces `__BUILD_ID__` in `dist/sw.js` with git short SHA + build timestamp; manual cache bumps no longer required).

### Mandatory Automatic Per-Task Deployment Runbook
Every individual task lead in the **Rockets** workspace must execute this release sequence at the conclusion of Step E before concluding the task:
1. **Unit Tests:** Ensure all unit tests pass cleanly: `npm run test:unit`.
2. **Proof of Work:** Verify `git diff --stat` contains physical code changes on disk (never accept natural language assertions of completion without disk diffs).
3. **Automated SW Cache & Build:** Cache invalidation is automated at build time via Vite plugin (replaces `__BUILD_ID__` in `dist/sw.js` during `npm run build`, generating hidden sourcemaps).
4. **Deploy to Production:** Publish to GitHub Pages via `npm run deploy` (automatically triggers `predeploy`, which runs `npm run test:unit && npm run build` and publishes `dist/` to the `gh-pages` branch).
5. **Commit & Push to Remote:**
   ```bash
   git add .
   git commit -m "<concise descriptive summary of completed task>"
   git push origin main
   ```
6. **Confirm Live URL:** Confirm live URL (`https://eitamaath-design.github.io/rockets/`) and report deployment exit code, commit SHA, and test status to the parent orchestrator.

---

## 7. Financial & Safety Guardrails

- **Cost Management & Serverless Architecture:**
  - **Zero Central Hosting Cost:** Hosted 100% statically on GitHub Pages with zero cloud compute, database, or server maintenance bills ($0.00/month).
  - **Decentralized Data Transport:** Direct peer-to-peer WebRTC data channels carry all per-frame multiplayer physics, orientation, and combat packets, incurring zero central bandwidth expenses.
- **Safety & Decentralized Relay Rate-Limit Guardrails:**
  - **Public Nostr Relay Rate-Limit Protection:** Client signaling utilizes a relaxed 6-second heartbeat cadence (`HEARTBEAT_INTERVAL_MS = 6000`, `ROOM_TTL_MS = 18000`) across `relay.primal.net`, `nos.lol`, and `nostr.mom`. This prevents HTTP 429 rate-limiting bans on public relays and ensures continuous lobby discovery.
  - **Multi-Relay Fallback:** If any single Nostr relay experiences downtime or rate limits, remaining relays maintain lobby discovery and WebRTC connection negotiation.
  - **Packet Size Guardrails:** Peer-to-peer data packets are strictly capped (<64 KB per payload) with binary or compact JSON serialization to prevent browser memory leaks or WebGL frame stalls.
- **Security & Secrets Management:**
  - **Zero Repository Secrets:** No API keys, credentials, or private keys are stored in the codebase or repository.
  - **Ephemeral Nostr Keys:** Nostr client keypairs are generated ephemerally in browser memory per session and are never written to disk or transmitted to external servers.
  - **Hidden Production Sourcemaps:** Sourcemaps are configured as `hidden` (`sourcemap: 'hidden'` in `vite.config.js`) to enable error stack resolution in diagnostic logs without exposing proprietary source code files publicly.

---

## 8. Workspace Files & Entry Points

| File / Directory | Purpose |
| :--- | :--- |
| `src/main.js` | App entrypoint, lobby routing, URL param handling (`?room=`, `?quality=`, `?density=`, `?mega=`, `?meteor=`, `?scale=`, `?fps=`, `?shader=`, `?particles=`, `?stats=`), Room Configuration Drawer (defaulting to High 64³ voxel quality, 1.0x render scale, 0 Unlimited FPS cap, Balanced derivative shader, Balanced 100% particle density, `showStats: true`), room badge rendering, and engine bootstrap. |
| `src/game/engine.js` | Core game loop, configurable frame-rate pacing (`maxFps`: 0 Unlimited, 240, 120, 90, 60), DPI scaling (`renderScale`: 0.75x–2.0x), and `showStats` configuration via `applyPerformanceConfig`, 60 FPS physics, scene orchestration, seamless pointer-lock and free-cursor mouse look forwarding (`applyMouseLook`) with interactive UI exclusion guards (`isInteractiveTarget`), projection of ship bore-sight vector onto screen coordinates (`boreScreen`) for Dual-Reticle HUD, cockpit lag updates, subsystem management with room configuration propagation, democratic map reset coordination (`resetMap(newSeed)`), safe orbital ship spawning, ship-ship elastic bumper bounce, meteor crater fire laser powerup coordination, per-frame thruster trail emission, real-time P2P asteroid carve and late-joiner world sync event orchestration (`onAsteroidCarve`, `onAsteroidWorldSync`, `onPeerNeedWorldSync`), and real-time telemetry gathering passed to HUD at 60 FPS. Exposes `window.gameEngine` for deterministic visual testing. |
| `src/game/ship.js` | 6DOF player flight physics with decoupled unthrottled Pilot POV look target (`desiredQuaternion`, `applyMouseLook`, unthrottled analog/keyboard controls, camera quaternion sync) and capability-limited physical hull rotation (`this.capabilities = { maxTurnRate: 0.75 }`, backward-compatible `ship.maxTurnRate` getter/setter, `rotateTowards` bounded strictly by capability limit), sustained cruising `maxSpeed = 280.0 u/s` (`forwardAccel = 60.0 u/s^2`), continuous-thrust hyper-speed acceleration (`hyperAccel = 90.0 u/s^2` up to `hyperSpeed = 560.0 u/s`), thrust-release deceleration (`hyperDecelRate = 350.0 u/s^2`) back to sustained cruising speed with space inertia preservation at or below sustained speed, braking halt (~0.67s via `decelRate = 420.0 u/s^2`), roll input smoothing at 6.0 u/s, physical hull forward thrust and weapon boresight alignment, quaternion-aware hull collision resolution passing `this.quaternion` to `spaceEnv.resolveShipCollision`, orbital safe spawn at `(0, 80, 3200)`, $6500\text{u}$ sector clamp, Momentum-Directed Charged Blink up to 1.0s continuous charging until release with 1x to 10x ship length displacement (28u to 280u), velocity preservation, predictive landing calculations (`getBlinkLandingPosition`), obstacle clearance raycasting, broken shields, cloaking, decoy power-up tracking, Fire Laser upgrade state with dual-gate enemy engagement persistence (`hasFireLaser`, `fireLaserTimer`, `engagementsCompleted`, `inCombatEngagement`), ship-ship collision bounce support, and impact debounce. |
| `src/game/weapons.js` | Dual arsenals: continuous sustained laser beam with extended 3500u range, Fire Laser upgrade integration (1.75x damage, enhanced rock excavation, fiery beam core/glow materials, fiery impact sparks/particles, P2P network sync `isFireLaser`), 17-stage progressive asteroid fracture/destruction ($1.2\text{ damage}$ per hit on 20 HP small asteroids, 17 hits to destroy; 17-stage `fractureAsteroid` on medium/large/mega asteroids, carve strength 48.0), structured `WEAPON_HIT` and `WEAPON_MISS` telemetry logging + dual-mode missile with initial velocity inheritance (`ship.velocity`), guaranteed forward separation speed clamping (`ensureSeparationSpeed`), 3D velocity tracking, ventral underbelly launch origin displaced along local down vector clear of cockpit FOV, dirty-range GPU `THREE.InstancedMesh` unculled billowing fire/smoke trails (`FireTrailSystem`), dirty-range `THREE.InstancedMesh` explosion & laser impact spark pool (`explosionMesh`) with `particleDensity` scaling, and narrowphase density cave penetration. |
| `src/game/space.js` | High-fidelity Three.js `MarchingCubes` volumetric density field asteroid rendering with `ISOSURFACE_SCALE = 0.80`, 3D seeded gradient/value noise, ridged multifractal FBM, 16–18 impact crater SDF basins with ejecta rims, smooth Hermite spherical boundary falloff, vertex colors (`enableColors = true`) with geological strata `mc.palette` and `mc.basePalette`, localized `updateNormalCache(mc, minX, maxX, minY, maxY, minZ, maxZ)` unit-normalized normal pre-population, 3D procedural triplanar rock micro-detail & hardware screen-space derivative (`dFdx`/`dFdy`) normal perturbation (`applyTriplanarRockShader` supporting `'low'`, `'balanced'`, `'high'`), progressive surface cracking (`fractureAsteroid`, `damageAsteroid` with configurable `maxCrackStages`, `getCrackStageAt`, `mc.crackField`, `asteroid.crackZones`) before volumetric density excavation (`carveAsteroid`), volumetric density ray-marching with sub-voxel bisection hitscan ($maxDist=3500\text{u}$), high-yield flat core AABB capsule tunnel borer ($r \ge 180\text{u}, d \ge 260\text{u}, \text{strength} \ge 48\text{--}160$) with nearest-voxel fallback and structured `carveResult` telemetry, zero-allocation scratch math pools, deterministic P2P carve application (`applyRemoteCarve`, `getCarveHistory`, `applyCarveHistory`, `onCarve`), `THREE.FrontSide` belt backface culling, `computeBoundingSphere()` frustum culling, right-sized 6,000-poly belt VBO allocation (`mc.maxPolys = 30000`), automatic `combatFlashLight.visible` culling, radial PBD pre-filtering, hull-radius-aware multi-point & swept density gradient collision resolution (`resolveShipCollision` sampling center, nose, tail, left/right wings, and belly across 280–560 u/s flight with orientation quaternions and `shipRadius + 0.6` outward push margin to ensure zero visual clipping while maintaining interior cavern/tunnel navigation clearance where $D \le \text{isolation}$), central stationary Mega-Asteroid ($R=2800\text{u}$ at `(0,0,0)`), Keplerian orbital asteroid belt ($R=3300-5500\text{u}$), configurable voxel quality ('low', 'medium', 'high'), and dirty-range GPU `THREE.InstancedMesh` rock debris & explosion flash system (`debrisMesh` and `debrisFlashMesh`). |
| `src/game/cockpit.js` | Low-profile panoramic cockpit interior, vector displays, damage flash, boost recoil, and visceral lagging 3D cockpit dynamics computing relative angular lag $Q_{rel} = Q_{desired}^{-1} \times Q_{ship}$ (clamped to comfortable $0.45\text{ rad}$ / ~26° deflection) so the canopy and wing autocannons visually trail rapid POV turns and sweep into alignment. |
| `src/game/hud.js` | Responsive HUD, Dynamic Floating D-Pad / Virtual Joystick with dynamic touch-down origin centering and relative offset steering, multi-touch controls (`e.changedTouches` identifier tracking on joystick and `activeTouchIds` Set on hold buttons, circular `.action-touch-btn.touch-btn` buttons), laser energy bar with Fire Laser visual theme (`.fire-laser`, fiery badge, glowing button), missile lock/dumb-fire state indicators, dynamic Dual-Reticle Ship Bore-Sight `#hud-ship-boresight` with `.tracking` and `.offscreen` states, Line-of-Sight Corner Bracket Targeting System (`.target-bracket`, distance-scaled crosshairs, cyan shield and HP status bars), 360° tactical elevation radar (`#hud-radar`), active room configuration badge pill (`VOX | BELT | METEOR | FPS | DPI`), floating fullscreen exit button (`#hud-float-exit-fullscreen`), `[🔄 Reset Map]` trigger button, 10-second interactive P2P map reset voting banner, and optional/minimizable/draggable Room Master Debug Monitor `#hud-master-monitor` (`showStats`, `#btn-minimize-monitor`, `#btn-restore-monitor`, mouse/touch drag with viewport clamping) with 10Hz throttled telemetry badge rendering and clean window listener teardown in `destroy()`. |
| `src/game/meteor.js` | Configurable chaotic flaming meteor hazard sized dynamically to 5%–10% of Central Mega-Asteroid radius ($140\text{--}280\text{u}$), featuring a craggy asteroid rock core with perturbed polygonal rock geometry (`0x1f1814`, roughness 0.90, emissive heat fissures `0xff4400`, intensity 3.5), inner glowing magma layer (`0xff6600`), see-through transparent fire shroud/mantle (`opacity: 0.50-0.55`, `depthWrite: false`, `blending: THREE.AdditiveBlending`), and outer plasma halo (`opacity: 0.35`) with counter-rotating turbulent pulsing so the rocky core is clearly visible through the transparent flames, trailing an instanced quad particle plume. Blasts massive craters and spawns crater Fire Laser power-ups. |
| `src/game/powerups.js` | Tactical space power-ups (Shield Replenish, Invisibility Cloak, Hologram Decoy Clone) spawned across the Keplerian asteroid belt, plus Crater Fire Laser power-up (`POWERUP_TYPES.FIRE_LASER`) spawned directly inside newly blasted meteor crater basins on the Central Mega-Asteroid. |
| `src/game/remoteShip.js` | Opponent 3D starfighter mesh, dead reckoning interpolation, dual bright emissive nozzle core flares (`coreFlares`) with additive blending and directional cone exhaust flares (`engineFlares`), idle ion reactor glow, standoff distance-adaptive scaling factor ($\le 8.0\text{x}$) to guarantee visibility across $500\text{u}-3500\text{u}$ combat ranges, distant celestial star-glow billboard beacon (`distant_ship_glow.test.js`) scaling smoothly from 100u to 6000u+, and invisibility cloak hiding. |
| `src/game/trail.js` | GPU `THREE.InstancedMesh` quad billboarding thruster vapor plume system (`maxParticles = 2400`, `PlaneGeometry(1, 1)`, `DynamicDrawUsage`, `frustumCulled = false`) with dirty-range `_prevActiveCount` GPU buffer uploads, `particleDensity` scaling, sub-frame distance interpolation, enhanced base particle scale ($3.0-4.8\text{u}$), camera-distance scale and luminance compensation for long-distance visibility across deep space, procedural 128x128 bilinear `LinearFilter` radial glow `DataTexture` without pixel grids, dual-nozzle emission, camera billboarding, pseudo-curl turbulence, and 15s non-linear decay. |
| `src/game/beacon.js` | 30s combat inactivity holographic ripple and sonar ping emitter. |
| `src/game/audio.js` | Web Audio procedural synthesis (HRTF 3D positional panners, smooth continuous laser beam plasma loop cadence, missile launches, warp charging frequency sweep, warp sonic boom, engine, chimes). |
| `src/net/network.js` | WebRTC peer-to-peer data channels, master election, room configuration exchange handshake (`config` channel / `onConfig` including `renderScale`, `maxFps`, `shaderQuality`, `particleDensity`, `showStats`), state, laser (with `isFireLaser` flag), guided/dumb-fire missile broadcast with initial velocity vector synchronization (`velocity`), decoy, hit, kill packets, democratic map reset voting coordination (`map_reset_vote`), and dedicated asteroid carve / world sync channels (`asteroid_carve`, `asteroid_world_sync`, `onPeerNeedWorldSync`). |
| `src/net/lobby.js` | Decentralized lobby discovery, room creation with serialized room configuration (including performance parameters and `showStats`), Nostr TTL keep-alive heartbeats carrying config metadata over high-reliability relays (`relay.primal.net`, `nos.lol`, `nostr.mom`) with relaxed 6s cadence (`HEARTBEAT_INTERVAL_MS = 6000`, `ROOM_TTL_MS = 18000`). |
| `src/net/actions.js` | Universal action channel wrapper (`createActionChannel`) for `@trystero-p2p/nostr` providing reliable packet handling, metadata peer ID normalization, and connection management. |
| `src/styles/main.css` | Cyberpunk flight HUD styling, Fire Laser fiery visual theme (`.bar-laser.fire-laser`, `.btn-laser.fire-active`, `.hud-powerup-badge.fire-laser`, `fireLaserPulse` keyframe animations), circular ergonomic mobile touch controls (`.action-touch-btn, .touch-btn` with `border-radius: 50%` and right-hand thumb cluster layout across landscape/portrait), dynamic floating joystick styling (`#joystick-base` transform positioning, active state glow, smooth release transition), lobby room configuration drawer, room badges, map reset interactive banner, floating draggable & minimizable `#hud-master-monitor` styling (`.minimized`, `.docked-right`, `.master-monitor-dock-tab`) with green/amber/red telemetry badges, Dual-Reticle Ship Bore-Sight `#hud-ship-boresight` reticle styling with directional edge pointer and states, responsive layout. |
| `src/utils/logger.js` | Client-side diagnostic and telemetry circular logger with WebGL inspection, error tracking, structured event stream, dedicated `[--- Recent Weapon & Excavation Telemetry ---]` section filtering hits/misses/carves, and 1-click clipboard export. |
| `src/utils/math.js` | Common math utility helpers including `clamp`, numeric clamping, degree/radian conversions, and vector math helpers. |
| `src/utils/sw_build.js` | Build-time helper script and Vite plugin for git short SHA retrieval, timestamp generation, and service worker cache ID injection (`__BUILD_ID__`). |
| `public/manifest.json` | PWA web app manifest for installable full-screen mobile and desktop browser gameplay. |
| `public/icon.svg` | Scalable vector application icon for PWA installation and favicon. |
| `public/sw.js` | PWA Service Worker with build-time derived cache version (`rockets-pwa-${gitSha}-${timestamp}`) and network-first HTML caching. |
| `index.html` | HTML5 shell, WebGL canvas container, HUD overlay DOM nodes, and script bootstrap. |
| `package.json` | Project manifest, dependencies (`three`, `@trystero-p2p/nostr`), devDependencies (`eslint`, `vitest`, `vite`, `playwright`), and npm scripts. |
| `package-lock.json` | Deterministic dependency tree lockfile for npm. |
| `vite.config.js` | Vite configuration with `swBuildPlugin` and hidden sourcemaps (`sourcemap: 'hidden'`). |
| `vitest.config.js` | Vitest configuration for unit and integration test runners with browser-like mocks. |
| `playwright.config.js` | Playwright configuration for automated headless end-to-end browser and visual verification tests. |
| `eslint.config.js` | Flat ESLint configuration with `@eslint/js` recommended, browser/Node globals, Vitest test globals, ignoring `dist/`, `node_modules/`, `test-results/`. |
| `.nvmrc` | Node.js runtime version pinned to v20. |
| `.gitignore` | Git ignore rules for node_modules, build outputs (`dist/`), test results, logs, and OS files. |
| `README.md` | Human-facing project overview, gameplay summary, controls, and quick start guide. |
| `GEMINI.md` | Project-level Antigravity directives enforcing automatic end-of-task build, test, and production deployment linking to §6 Runbook. |
| `.agent/rules/auto-deploy.md` | Workspace rule file enforcing automatic deployment to GitHub Pages linking to §6 Runbook. |
| `KNOWLEDGE_BASE.md` | Master project knowledge base and single source of truth across all 8 standard sections. |
| `tests/unit/weapons.test.js` | Comprehensive unit tests for dual weapons systems: primary continuous laser beam, 17-stage progressive asteroid cracking & destruction ($1.2\text{ damage}$ per hit on 20 HP small asteroids, 17 hits to destroy), sustained firing and energy drain, secondary dual-mode missile targeting lock (3.0s LOS), unguided dumb-fire, ventral underbelly launch origin along local down vector clear of cockpit FOV, initial velocity inheritance across cruising (280 u/s) and hyper-speed (560 u/s), guaranteed forward separation without ship overtaking, remote P2P missile velocity broadcast, and multi-stage detonations. |
| `tests/unit/mega_asteroid.test.js` | Comprehensive unit tests for Central Mega-Asteroid, Keplerian orbital belt, Three.js `MarchingCubes` volumetric density fields, configurable `voxelQuality` ('low', 'medium', 'high'), progressive surface cracking (`fractureAsteroid`, default 5-stage API, `mc.crackField`, `mc.palette` darkening) before excavation, guaranteed flat core density excavation across quality presets, structured `carveResult` telemetry, narrowphase missile/projectile density collision inside caverns, multi-shot progressive through-tunnel drilling, and boundary safety. |
| `tests/unit/performance_config.test.js` | Unit tests for GPU/CPU performance optimizations and Room Configuration controls: hardware derivative rock shader (`shaderQuality`: 'low', 'balanced', 'high'), localized AABB `updateNormalCache`, `renderScale` & `maxFps` pacing in `GameEngine`, belt `FrontSide` backface culling & bounding sphere frustum culling, dirty-range `InstancedMesh` uploads (`_prevActiveCount`), inactive PointLight visibility culling, and HUD/lobby/network performance config synchronization including `showStats`. |
| `tests/unit/space_carve_sync.test.js` | Comprehensive unit tests for P2P asteroid carve and fracture synchronization across peers, verifying deterministic local and remote density excavation, suppression of echo broadcast loops, late-joiner historical carve replay via `applyCarveHistory`, and zero-allocation scratch math stability. |
| `tests/unit/particles.test.js` | Comprehensive unit tests for GPU `THREE.InstancedMesh` particle and explosion systems across thruster trails, missile contrails, weapon explosions/sparks, asteroid rock debris, and meteor hazards verifying single draw calls, `DynamicDrawUsage`, `frustumCulled = false`, dirty-range uploads, sub-frame interpolation, color ramps, and 15s decay. |
| `tests/unit/flight.test.js` | Unit tests for Player Flight Physics, sustained cruising `maxSpeed = 280.0 u/s`, continuous-thrust hyper-speed acceleration (`560.0 u/s`), thrust-release deceleration back to 280.0 u/s, momentum preservation, emergency braking halt (~0.67s via `decelRate = 420.0 u/s^2`), roll input smoothing at 6.0 u/s, decoupled unthrottled Pilot POV steering, upgradeable `capabilities.maxTurnRate = 0.75`, rate-limited physical hull rotation, weapon boresight alignment, cockpit visual lag, and seamless pointer-locked/free-cursor mouse look with coordinate fallback and UI exclusion (`isInteractiveTarget`). |
| `tests/unit/hud_monitor.test.js` | Unit tests for Room Master Debug Monitor UX, visibility toggling on `isMaster` and `showStats`, minimize/restore edge docking (`.minimized`, `.docked-right`, `#btn-minimize-monitor`, `#btn-restore-monitor`), floating window mouse & multi-touch dragging with viewport clamping, telemetry threshold categorization, 10Hz throttle, Dual-Reticle Ship Bore-Sight HUD states (`.tracking`, `.offscreen`), Dynamic Floating D-Pad / Virtual Joystick dynamic base centering, relative offset computation, clamping, release reset, multi-touch isolation with `e.changedTouches`, and circular `.touch-btn` action buttons. |
| `tests/unit/hud_fullscreen.test.js` | Unit tests for Android mobile ergonomic floating fullscreen exit button (`#hud-float-exit-fullscreen`), visibility toggling on fullscreen changes, click and touch event propagation suppression, and `engine.isInteractiveTarget` registration. |
| `tests/unit/sw_cache.test.js` | Unit tests for automated build-time PWA service worker cache name derivation, git short SHA and timestamp injection, and cache asset whitelist verification. |
| `tests/unit/meteor_crater.test.js` | Unit tests for Meteor Hazard dynamic 5%–10% mega-asteroid sizing, craggy asteroid rock core (`coreMesh`), see-through transparent fire shroud (`fireShroudMesh`), magma layer, outer plasma halo, transparency flags (`transparent === true`, `depthWrite === false`), crater excavation, Fire Laser power-up, and dual-gate persistence. |
| `tests/unit/ship_collision.test.js` | Hull-radius-aware multi-point hull sampling (center, nose, tail, left/right wings, belly), orientation quaternions, high-speed impact collision detection & zero-clipping resolution across 280–560 u/s flight, oblique velocity deflection along surface normal, nose-first boundary clearance triggering before center reaches isosurface, and cavern/tunnel navigation inside carved cavities without false-positive collision. |
| `tests/unit/engine_visibility.test.js` | Unit tests for long-distance engine visibility, dual nozzle core flares, idle reactor glow, thrust and boost scaling response, standoff distance-adaptive scaling factor ($\le 8.0\text{x}$) at up to $3500\text{u}$, and thruster trail distance persistence. |
| `tests/unit/distant_ship_glow.test.js` | Unit tests for remote starfighter distant celestial star-glow billboard beacon, distance-based visibility and opacity curve (0.0 below 100u, scaling up to 6000u+), radial soft-glow DataTexture, and cloak/dead suppression. |
| `tests/unit/radar.test.js` | Unit tests for 360° tactical elevation radar HUD overlay (`#hud-radar`), 4500u tracking range, viewpoint plane projection, relative elevation angles with degree readouts (`▲ +18°`, `▼ -24°`, `● 0°`), 3.0s animated sweep cycle, and dead/cloaked ship filtering. |
| `tests/unit/targetingSystem.test.js` | Unit tests for Line-of-Sight Corner Bracket Targeting System (`.target-bracket`), verifying 3D-to-2D projection, full-rate execution across non-master peers with hidden or minimized diagnostics, camera-forward dot-product frustum filtering, multi-hazard raycast obstruction checks across asteroids and active meteor hazards, and cyan shield / green HP status bar rendering over in-LOS enemy ships. |
| `tests/unit/hazards.test.js` | Unit tests for space hazards, asteroid collision damage, broken shield mechanics, tactile power-up pickups, and shield recharge timers. |
| `tests/unit/netcode.test.js` | Unit tests for decentralized WebRTC netcode, master election, client-side prediction, dead reckoning, latency interpolation, and keep-alive heartbeats. |
| `tests/unit/math.test.js` | Unit tests for math utilities, numeric clamping, vector angle calculations, and normalization. |
| `tests/unit/audio.test.js` | Unit tests for Web Audio API procedural synthesis, HRTF 3D positional spatial panners, laser hum loops, and master volume controls. |
| `tests/integration/combat.test.js` | Integration tests for multi-ship combat dogfights, weapon firing, damage resolution, shield breaking, kill scoring, and respawn cycles. |
| `tests/e2e/browser.test.js` | Playwright headless browser end-to-end tests across desktop and mobile-landscape viewports verifying lobby, PWA manifest, sector launching, WebGL canvas initialization, Dual-Reticle HUD display (`.hud-center-crosshair` & `#hud-ship-boresight`), and seamless unthrottled free-cursor mouse look flight steering. |
| `tests/e2e/capture.test.js` | Playwright automated visual verification suite capturing progressive tunnel excavation screenshots along with overview and tunnel portraits. |
| `tests/e2e/enemy_ship_glow.test.js` | Playwright automated visual verification test suite capturing distant enemy starfighter star-glow billboard rendering across space. |
| `tests/e2e/trails_visual.test.js` | Playwright automated visual verification test suite capturing high-resolution screenshots verifying glowing continuous plasma wakes, billowing rocket plumes, and multi-stage explosions in WebGL. |
| `tests/e2e/targeting_brackets.test.js` | Playwright automated visual verification suite capturing line-of-sight corner bracket targeting indicators (`.target-bracket.tl/.tr/.bl/.br`) on enemy ships in direct LOS and verifying disappearance under meteor/obstacle occlusion. |
