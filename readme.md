===============
Level editor
===============
-Remember last tool used and keep it open

===============
Features
===============

-A way to quickly start testing a map

-More maps:
  -Boomer kwanger (no new features needed)
  -Launch octopus (inclined colliders, underwater coding)
  -Highway (level foreground layer)
  -Armored armadillo (inclined colliders, fall-death, minecart)

-Menu/UI system
  -decorative background

-Stop vue temp UI flashing

-All the special weapon charges

===============
Post-V1 Features
===============

-Play as Zero
-HUD changes

-Team games:
  -team-colored outline instead of palette swap
  -possibly team-colored projectiles as well
  -allies: show health bar
-Should not be able to destroy teammates' projectiles
-CTF

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