===============
Post-V1 Features
===============

-Play as Zero
-All the special weapon charges
-HUD changes: -Switch UI - switch weapons/char, and the menu HUDs too

-More nav-mesh features:
  -Ability to climb a wall to a waypoint
  -Ability to drop down to a waypoint
  -Ability to jump over gaps

-A "prod" system/switch
  -Hook up google analytics if it's on
  -A telemetry system
    -Send error logs to Azure; build some authentication app for this to view the logs
    -Send events on useful actions (start game, win/lose game, etc)
    -

-CTF 
-CTF AI
-More maps:
  -Boomer kwanger (no new features needed)
  -Launch octopus (underwater coding)

===============
Fixes
===============
-Health not spawning in powerplant sometimes (try after a second game)
-Stage music continues playing in menu if quit right when it starts
-Should not be able to destroy teammates' projectiles
Scoreboard should go above victory screen
-Jerky walking animation again

-Storm tornado glitches when pushing against wall (doesn't go forward)
-AI should switch weapons that have no ammo
-Walls stop weapons

-Collision system
  -Ability for "soft collision"
  -Need matrix collision system / way for 2 non-triggers to avoid collision

-Homing torpedo better behavior
-Shotgun ice meatshot when hit
-If pushing against wall don't play run animation

===============
Abstraction
===============
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