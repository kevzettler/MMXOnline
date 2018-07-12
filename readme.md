===============
Features
===============

-Characters sometimes mtv out of each other, test collision
-Debug Memory Usage
-Optimize getting collision cells: only get ones that intersect with shape. Or at least do for lines/raycast only
-getHex is called many times and should be optimized
-Optimize drawing ideas:
  -Only draw things on-screen
  -Only draw things that actually moved
  -For very large backgrounds, only draw part of it
  -For static backgrounds draw a canvas of it not the whole thing

-A "prod" system/switch
  -Hook up google analytics if it's on
  -A telemetry system: send error logs to Azure; build some authentication app for this to view the logs

-Remove special weapon charge
-Remove "switch" button

Collision Engine rules:
  -An actor must never have its pos modified manually. Always use incPos() or move() function

===============
Post-V1 Features
===============

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