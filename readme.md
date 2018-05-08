-getIntersectPoint is not working sometimes
  -See onCollision in projectile.ts
-

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
-Homing torpedo better behavior
-Shotgun ice meatshot when hit
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