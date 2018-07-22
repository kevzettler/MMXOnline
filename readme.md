
===============
Abstraction
===============

-Effects
-Z-Index problem: projectiles are behind players, etc.
-When restarting, clear the Pixi stage of objects
-HUD System/framework
-Effect system

-???
-Object instantiation
-Sprite refactor: pass in only name
-Press button to stop all AI in tracks

===============
Bugs
===============
-Jerky walking animation again

===============
Optimization
===============

-Memory optimization: avoid new's, use object pooling for sprites, or pre-allocate
-Optimize getting collision cells: only get ones that intersect with shape. Or at least do for lines/raycast only
-Only draw things on-screen
-Use particle containers for:
  -HUD stuff
  -Backgrounds
  -Effects

===============
Post-V1 Features
===============

-A "prod" system/switch
  -Hook up google analytics if it's on
  -A telemetry system: send error logs to Azure; build some authentication app for this to view the logs

-Remove special weapon charge
-Remove "switch" button

-All the special weapon charges
-Play as Zero
-HUD changes: -Switch UI - switch weapons/char, and the menu HUDs too

-Team games:
  -team-colored outline instead of palette swap
  -possibly team-colored projectiles as well
  -allies: show health bar + name
-Should not be able to destroy teammates' projectiles

-More nav-mesh features:
  -Ability to climb a wall to a waypoint
  -Ability to drop down to a waypoint
  -Ability to jump over gaps

-CTF 
-CTF AI

-More maps:
  -Boomer kwanger (no new features needed)
  -Launch octopus (underwater coding)

===============
Level editor
===============
-Remember last tool used and keep it open
-Basic undo
-The json data binding is weird/has issues
-be able to select under images/change z-order

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

-Refactor sprite system; don't use prototype, use "SpriteData'

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