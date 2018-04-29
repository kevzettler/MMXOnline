-If pushing against wall don't play run animation
-Investigate left run anim being off

-Input system needs "press" concept
  -Polish/fix dash, climb and jump using this concept
  -Jump/wallkick: holding frames

-Fix sprites, polish positions
-Hurt/death

-AI
-Sound
-Weapons
-Charge shot
-HUD
-Player 2
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
-requestAnimationFrame
-

========================
Sprite editor useful features
========================
Rectangle select on the spritesheet canvas
Optimize image graph read
Auto-create hitbox based on bounds
Remember selected frame index for different sprites
"Ghost" mode: press "G" to enter "ghost mode". In ghost mode, the last drawn sprite will overlay as transparent on current draw sprite for sprite comparison