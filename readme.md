===============
Features
===============

-Camera/sprite anim jittering
  -Camera + sprite can cause jitter due to camera offsetting proper floor/ceil logic in drawImage
  -Sprites with odd number width/height can also cause problems
  
-The camera for gallery stage is weird down the slope
-Walking up/down slopes jittering camera
-Profiling/optimization

-Default to max players
-Reduce jump height
-E.spark follow normals

-A "prod" system
  -Remove dev options
  -Remove all console logging
  -Vue must be set for prod mode once deployed
  -An analytics/telemetry system only in prod mode

-P2 controls in in-game options
-Gallery stage needs deathY and a block on left side of map
-in 1v1, turn on flich or hitstun
-Remove special weapon charge
-Remove "switch" button

===============
Post-V1 Features
===============

-More maps:
  -Boomer kwanger (no new features needed)
  -Launch octopus (underwater coding)

-All the special weapon charges
-Play as Zero
-HUD changes: -Switch UI - switch weapons/char, and the menu HUDs too


-Team games:
  -team-colored outline instead of palette swap
  -possibly team-colored projectiles as well
  -allies: show health bar + name
-Should not be able to destroy teammates' projectiles
-CTF

-More nav-mesh features:
  -Ability to climb a wall to a waypoint
  -Ability to drop down to a waypoint
  -Ability to jump over gaps

===============
Level editor
===============
-Remember last tool used and keep it open
-Basic undo
-The json data binding is weird/has issues

===============
Bugs/improvements
===============

-Storm tornado glitches when pushing against wall (doesn't go forward)
-AI should switch weapons that have no ammon
-Walls stop weapons
-Free the stuck object(s) with the "path of least resistance"

-Collision system
  -Ability for "soft collision"
  -Need matrix collision system / way for 2 non-triggers to avoid collision

========================
Useful optimizations and fixes
========================

-Homing torpedo better behavior
-Shotgun ice meatshot when hit
-If pushing against wall don't play run animation

========================
Sprite editor useful features
========================
Rectangle select on the spritesheet canvas

========================
DOCS
========================
Non-serializable code locations:
helpers.js: Search for 
  function serializeES6(obj) {
levelEditor.js: Search for
  saveLevel() {
sprite path saving is automatic using the name. 
onDeserialize() and onSerialize() of the classes that you are deserializing/serializing.

{
  "nodeName": "",
  "ladderName": "",
  "isJumpNode": false,
  "isDropNode": false,
  "isLadderNode": false
}