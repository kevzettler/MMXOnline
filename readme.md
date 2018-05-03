-Fix framerate
-Quadtrees
-Snap to ground on move() function
  -Characters y positions can be inconsistent on ground
-Charge sound and effect

-Hurt/death
-Player 2
-AI
-Menu system
-More levles/background+foreground system

-Collision system
  -Ability for "soft collision"
  -Need matrix collision system / way for 2 non-triggers to avoid collision
  -Collision callbacks with parent actor/gameobject available

========================
Useful helpers
========================
Delete from array
Find in array
Cast to type

========================
Useful optimizations and fixes
========================
-If pushing against wall don't play run animation

========================
Sprite editor useful features
========================
Rectangle select on the spritesheet canvas
Optimize image graph read
Auto-create hitbox based on bounds
Remember selected frame index for different sprites
"Ghost" mode: press "G" to enter "ghost mode". In ghost mode, the last drawn sprite will overlay as transparent on current draw sprite for sprite comparison