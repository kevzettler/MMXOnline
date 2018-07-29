-Favicon broken
-Add Online button, disabled with tooltip coming soon!
-Google analytics, after site is deployed
-Deploy and hook up analytics (don't forget to change the ProdUrl)

===============
Post-V1 Features
===============
-MTV occasionally snaps out too far
-DOM nodes growing and not getting GC'd
-Have a level loading screen that only loads level backgrounds/music
-Sprite transitions screw up win animation alignment
-Some MTV issues (snapping out). Test the climb in gallery stage, and inclines
-Intro when starting match
-Stage music continues playing in menu if quit right when it starts
-Climbing down ladders broken sometimes
-Homing torpedo better behavior
-If pushing against wall don't play run animation
-Soft collision with allies
-AI should switch weapons that have no ammo
-Walls stop weapons

-Play as Zero
-All the special weapon charges
-HUD changes: -Switch UI - switch weapons/char, and the menu HUDs too

-More nav-mesh features:
  -Ability to climb a wall to a waypoint
  -Ability to drop down to a waypoint
  -Ability to jump over gaps

-AI Use charged weapons

-CTF 
-CTF AI
-More maps:
  -Boomer kwanger (no new features needed)
  -Launch octopus (underwater coding)

===============
Abstraction
===============
-CheckCollisionActor, add gameobject array param
-HUD System/framework? Consider HTML-like abstraction
-Effects are messy. Think of a better abstraction
-Object instantiation
-Sprite refactor: pass in only name
-Press button to stop all AI in tracks

===============
Optimization
===============

-Performance concerns: death effect, change sprite indexof 
-Figure out how to measure GPU performance precisely
-Avoid new's
-Object pool for actors
-Only draw things on-screen
-Use particle containers for:
  -HUD stuff
  -Backgrounds
  -Effects

===============
Level editor
===============
-Remember last tool used and keep it open
-Basic undo
-The json data binding is weird/has issues
-be able to select under images/change z-order
-Rectangle select on the spritesheet canvas

========================
LEVEL EDITOR DOCS
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