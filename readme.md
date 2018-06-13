===============
Features
===============

-Loading screen
-Add to logo "deathmatch"
-Validate number of bots and play to
-Background image on main menu
-1v1 bossroom scale is off
-1 and 2 keep getting rebinded

-Climbing up slopes: constantly jumping
-Camera/sprite anim jittering
-Profiling/optimization

-Stop vue temp UI flashing
-Can't check score when dead
-Incorrect team report won (always blue)

-All the special weapon charges

-E.spark follow normals

-Remove all console logging
-An analytics/telemetry system

===============
Level editor
===============
-Remember last tool used and keep it open
-Basic undo
-The json data binding is weird/has issues

===============
Post-V1 Features
===============

-More maps:
  -Boomer kwanger (no new features needed)
  -Launch octopus (underwater coding)

-Play as Zero
-HUD changes

-Team games:
  -team-colored outline instead of palette swap
  -possibly team-colored projectiles as well
  -allies: show health bar
-Should not be able to destroy teammates' projectiles
-CTF

-More nav-mesh features:
  -Ability to climb a wall to a waypoint
  -Ability to drop down to a waypoint
  -Ability to jump over gaps

-Vue must be set for prod mode once deployed

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