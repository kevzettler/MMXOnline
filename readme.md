-AI Nav-mesh + navigation system
-Rework HUD for scrolling maps
-Add a score menu and killcam
-Death/respawn system
-Only play sounds if near screen

-Menu system
-More levles/background+foreground system

-character heights vary on ground
-Rolling shield on ceiling

-All the special weapon charges

-Collision system
  -Ability for "soft collision"
  -Need matrix collision system / way for 2 non-triggers to avoid collision
  -Collision callbacks with parent actor/gameobject available

-CollideData does not need both gameobjec tand gameobject.collider

========================
Useful optimizations and fixes
========================
-Homing torpedo better behavior
-Shotgun ice meatshot when hit
-If pushing against wall don't play run animation
-Characters y positions can be inconsistent on ground
-Shoot offsets are bad for wall slide

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