-Shotgun ice meatshot when hit
-Spazzy homing things
-Spazzy rapid fire animation
-sting left shoot offset is wrong
-rolling shield + other explosions played at wrong locations sometimes
-Fire wave adds an extra ammo bar
-rolling shield too slow

-All the special weapon charges
-Menu system
-More levles/background+foreground system

-Collision system
  -Ability for "soft collision"
  -Need matrix collision system / way for 2 non-triggers to avoid collision
  -Collision callbacks with parent actor/gameobject available

========================
Useful optimizations and fixes
========================
-If pushing against wall don't play run animation
-Characters y positions can be inconsistent on ground
-Shoot offsets are bad for wall slide

========================
Sprite editor useful features
========================
Rectangle select on the spritesheet canvas
Optimize image graph read
Auto-create hitbox based on bounds
Remember selected frame index for different sprites
"Ghost" mode: press "G" to enter "ghost mode". In ghost mode, the last drawn sprite will overlay as transparent on current draw sprite for sprite comparison