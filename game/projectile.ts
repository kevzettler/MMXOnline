import { Actor, Anim } from "./actor";
import { Damager } from "./damager";
import { Player } from "./player";
import { Point } from "./point";
import { Sprite } from "./sprite";
import { Collider, CollideData } from "./collider";
import { Character } from "./character";
import { Wall } from "./wall";
import { game } from "./game";
import * as Helpers from "./helpers";
import { LoDashImplicitNumberArrayWrapper } from "../node_modules/@types/lodash/index";
import { GameObject } from "./gameObject";
import { Rect } from "./rect";

export class Projectile extends Actor {

  damager: Damager;
  flinch: boolean;
  fadeSprite: Sprite;
  fadeSound: string;
  speed: number;
  time: number = 0;
  hitCooldown: number = 0;

  constructor(pos: Point, vel: Point, damage: number, player: Player, sprite: Sprite) {
    super(sprite);
    this.vel = vel;
    this.speed = this.vel.magnitude;
    this.pos = pos;
    this.useGravity = false;
    this.flinch = false;
    this.damager = new Damager(player, damage);
    this.xDir = Math.sign(vel.x);
  }

  update() {
    super.update();

    this.time += game.deltaTime;
    let leeway = 500;
    if(this.pos.x > game.level.width + leeway || this.pos.x < -leeway || this.pos.y > game.level.height + leeway || this.pos.y < -leeway) {
      this.destroySelf();
    }
  }

  onCollision(other: CollideData) {
    let character = other.collider.gameObject;
    if(character instanceof Character && character.player.alliance !== this.damager.owner.alliance) {
      let pos = other.collider.shape.getIntersectPoint(this.pos, this.vel);
      //if(pos) this.pos = pos.clone();
      let character = other.collider.gameObject;
      if(character instanceof Character) {

        let key: string = this.constructor.toString() + this.damager.owner.id.toString();
        if(!character.projectileCooldown[key]) {
          character.projectileCooldown[key] = this.hitCooldown;

          character.renderEffect = "hit";
          character.renderEffectTime = 0.1;
          character.applyDamage(this.damager.damage);
          if(!this.flinch) {
            game.playSound("hit");
          }
          else {
            game.playSound("hurt");
            character.setHurt(this.pos.x > character.pos.x ? -1 : 1);
          }
        }
        this.onHitChar(character);
      }
    }
    let wall = other.collider.gameObject;
    if(wall instanceof Wall) {
      this.onHitWall(wall);
    }
  }

  onHitChar(character: Character) {
    this.destroySelf(this.fadeSprite, this.fadeSound);
  }

  onHitWall(wall: Wall) {

  }

}

export class BusterProj extends Projectile {

  constructor(pos: Point, vel: Point, player: Player) {
    super(pos, vel, 0.5, player, game.sprites["buster1"]);
    this.fadeSprite = game.sprites["buster1_fade"];
  }

}

export class Buster2Proj extends Projectile {

  constructor(pos: Point, vel: Point, player: Player) {
    super(pos, vel, 2, player, game.sprites["buster2"]);
    this.fadeSprite = game.sprites["buster2_fade"];
    this.flinch = true;
  }

}

export class Buster3Proj extends Projectile {

  constructor(pos: Point, vel: Point, player: Player) {
    super(pos, vel, 3, player, game.sprites["buster3"]);
    this.fadeSprite = game.sprites["buster3_fade"];
    this.flinch = true;
  }

}

export class Buster4Proj extends Projectile {

  type: number = 0;
  num: number = 0;
  offsetTime: number = 0;
  initY: number = 0;
  
  constructor(pos: Point, vel: Point, player: Player, type: number, num: number, offsetTime: number) {
    super(pos, vel, 4, player, game.sprites["buster4"]);
    this.fadeSprite = game.sprites["buster4_fade"];
    this.flinch = true;
    this.type = type;
    //this.vel.x = 0;
    this.initY = this.pos.y;
    this.offsetTime = offsetTime;
    this.num = num;
    this.hitCooldown = 1;
  }

  update() {
    super.update();
    this.frameIndex = this.type;
    this.pos.y = this.initY + Math.sin(game.time*18 - this.num * 0.5 + this.offsetTime * 2.09) * 15;
  }

}

export class TorpedoProj extends Projectile {

  target: Character;
  smokeTime: number = 0;
  constructor(pos: Point, vel: Point, player: Player) {
    super(pos, vel, 1, player, game.sprites["torpedo"]);
    this.fadeSprite = game.sprites["explosion"];
    this.fadeSound = "explosion";
    this.target = game.level.getClosestTarget(this.pos, this.damager.owner.alliance);
    this.angle = this.xDir === -1 ? 180 : 0;
  }

  update() {
    super.update();
    
    if(this.target) {
      this.vel = new Point(Helpers.cos(this.angle), Helpers.sin(this.angle)).times(this.speed);
      let dTo = this.pos.directionTo(this.target.centerPos).normalize();
      
      var destAngle = Math.atan2(dTo.y, dTo.x) * 180 / Math.PI;

      destAngle = Helpers.to360(destAngle);
      this.angle = Helpers.lerpAngle(this.angle, destAngle, game.deltaTime * 10);
    }

    this.smokeTime += game.deltaTime;
    if(this.smokeTime > 0.2) {
      this.smokeTime = 0;
      new Anim(this.pos, game.sprites["torpedo_smoke"], 1);
    }
    
  }

  renderFromAngle(x: number, y: number) {
    
    let angle = this.angle;
    let xDir = 1;
    let yDir = 1;
    let frameIndex = 0;
    let normAngle = 0;
    if(angle < 90) {
      xDir = 1;
      yDir = -1;
      normAngle = angle;
    }
    if(angle >= 90 && angle < 180) {
      xDir = -1;
      yDir = -1;
      normAngle = 180 - angle;
    }
    else if(angle >= 180 && angle < 270) {
      xDir = -1;
      yDir = 1;
      normAngle = angle - 180;
    }
    else if(angle >= 270 && angle < 360) {
      xDir = 1;
      yDir = 1;
      normAngle = 360 - angle;
    }

    if(normAngle < 18) frameIndex = 0;
    else if(normAngle >= 18 && normAngle < 36) frameIndex = 1;
    else if(normAngle >= 36 && normAngle < 54) frameIndex = 2;
    else if(normAngle >= 54 && normAngle < 72) frameIndex = 3;
    else if(normAngle >= 72 && normAngle < 90) frameIndex = 4;

    this.sprite.draw(frameIndex, this.pos.x + x, this.pos.y + y, xDir, yDir, this.renderEffect, 1, this.palette);
  }
  
}

export class StingProj extends Projectile {

  type: number = 0; //0 = initial proj, 1 = horiz, 2 = up, 3 = down
  origVel: Point;
  constructor(pos: Point, vel: Point, player: Player, type: number) {
    super(pos, vel, 1, player, undefined);
    this.origVel = vel.clone();
    if(type === 0) {
      this.sprite = game.sprites["sting_start"];
    }
    else if(type === 1) {
      this.sprite = game.sprites["sting_flat"];
    }
    else if(type === 2 || type === 3) {
      this.sprite = game.sprites["sting_up"];
      if(type === 3) {
        this.yDir = -1;
      }
    }
    this.fadeSprite = game.sprites["buster1_fade"];
    this.type = type;
  }

  update() {
    super.update();
    if(this.type === 0 && this.time > 0.05) {
      this.vel.x = 0;
    }
    if(this.type === 0) {
      if(this.isAnimOver()) {
        new StingProj(this.pos.addxy(15*this.xDir, 0), this.origVel, this.damager.owner, 1);
        new StingProj(this.pos.addxy(15*this.xDir, -8), this.origVel.addxy(0, -150), this.damager.owner, 2);
        new StingProj(this.pos.addxy(15*this.xDir, 8), this.origVel.addxy(0, 150), this.damager.owner, 3);
        this.destroySelf();
      }
    }
  }

}

export class RollingShieldProj extends Projectile {
 
  constructor(pos: Point, vel: Point, player: Player) {
    super(pos, vel, 1, player, game.sprites["rolling_shield"]);
    this.fadeSprite = game.sprites["explosion"];
    this.fadeSound = "explosion";
    this.useGravity = true;
    this.collider.wallOnly = true;
    if(game.level.checkCollisionActor(this, 0, 0)) {
      this.xDir *= -1;
      this.vel.x *= -1;
    }
  }

  update() {
    if(!game.level.checkCollisionActor(this, 0, 0)) {
      let collideData = game.level.checkCollisionActor(this, this.xDir, -1);
      if(collideData) {
        this.vel.x *= -1;
        this.xDir *= -1;
      }
    }
    super.update();
    if(this.time > 1.5) {
      this.destroySelf(this.fadeSprite, this.fadeSound);
    }
  }

}


export class FireWaveProj extends Projectile {
 
  constructor(pos: Point, vel: Point, player: Player) {
    super(pos, vel, 1, player, game.sprites["fire_wave"]);
    this.fadeSprite = game.sprites["fire_wave_fade"];
    this.hitCooldown = 0.3;
    //this.fadeSound = "explosion";
  }

  update() {
    super.update();
    if(this.time > 0.1) {
      this.destroySelf(this.fadeSprite);
    }
  }

}

export class TornadoProj extends Projectile {
 
  spriteStart: Sprite;
  spriteMid: Sprite;
  spriteEnd: Sprite;
  length: number = 1;
  constructor(pos: Point, vel: Point, player: Player) {
    super(pos, vel, 1, player, game.sprites["tornado_mid"]);
    //this.fadeSprite = game.sprites["electric_spark_fade"];
    //this.fadeSound = "explosion";
    this.spriteStart = game.sprites["tornado_start"];
    this.spriteMid = game.sprites["tornado_mid"];
    this.spriteEnd = game.sprites["tornado_end"];
    this.vel.x = 0;
    this.hitCooldown = 0.3;
    //this.globalCollider = new Collider([], true, this);
  }
  
  render(x: number, y: number) {
    
    this.spriteStart.draw(this.frameIndex, this.pos.x + x, this.pos.y + y, this.xDir, this.yDir, this.renderEffect, 1, this.palette);
    let i = 0;
    let spriteMidLen = this.spriteMid.frames[this.frameIndex].rect.w;
    for(i; i < this.length; i++) {
      this.spriteMid.draw(this.frameIndex, this.pos.x + x + (i*this.xDir*spriteMidLen), this.pos.y + y, this.xDir, this.yDir, this.renderEffect, 1, this.palette);
    }
    this.spriteEnd.draw(this.frameIndex, this.pos.x + x + (i*this.xDir*spriteMidLen), this.pos.y + y, this.xDir, this.yDir, this.renderEffect, 1, this.palette);

    this.renderEffect = "";
    if(game.showHitboxes && this.collider) {
      Helpers.drawPolygon(game.ctx, this.collider.shape.clone(x, y), true, "blue", "", 0, 0.5);
      //Helpers.drawCircle(game.ctx, this.pos.x + x, this.pos.y + y, 1, "red");
    }
  }

  update() {
    super.update();

    let topX = 0;
    let topY = 0;
    
    let spriteMidLen = this.spriteMid.frames[this.frameIndex].rect.w;
    let spriteEndLen = this.spriteEnd.frames[this.frameIndex].rect.w;

    let botX = (this.length*spriteMidLen) + spriteEndLen;
    let botY = this.spriteStart.frames[0].rect.h * 2;

    let rect = new Rect(topX, topY, botX, botY);
    this.globalCollider = new Collider(rect.getPoints(), true, this);

    if(this.time > 0.2) {
      if(this.length < 6) {
        this.length++;
      }
      else {
        this.vel.x = this.speed * this.xDir;
      }
      this.time = 0;
    }
  }

  onHitChar(character: Character) {
    character.move(new Point(this.speed * 0.9 * this.xDir, 0));
  }

}

export class ElectricSparkProj extends Projectile {
 
  type: number = 0;
  constructor(pos: Point, vel: Point, player: Player, type: number) {
    super(pos, vel, 1, player, game.sprites["electric_spark"]);
    this.fadeSprite = game.sprites["electric_spark_fade"];
    //this.fadeSound = "explosion";
    this.type = type;
  }

  onHitWall(wall: Wall) {
    if(this.type === 0) {
      this.destroySelf(this.fadeSprite);
      new ElectricSparkProj(this.pos.clone(), new Point(0, this.speed * 3), this.damager.owner, 1);
      new ElectricSparkProj(this.pos.clone(), new Point(0, -this.speed * 3), this.damager.owner, 1);
    }
  }

}

export class BoomerangProj extends Projectile {
 
  angleDist: number = 0;
  turnDir: number = 1;
  constructor(pos: Point, vel: Point, player: Player) {
    super(pos, vel, 1, player, game.sprites["boomerang"]);
    //this.fadeSprite = game.sprites["electric_spark_fade"];
    //this.fadeSound = "explosion";
    this.angle = 0;
    if(Math.sign(vel.x) === -1) this.angle = -180;
    if(!player.character.grounded) {
      this.turnDir = -1;
    }
  }

  onCollision(other: CollideData) {
    super.onCollision(other);
    let character = other.collider.gameObject;
    if(this.time > 0.22 && character instanceof Character && character.player === this.damager.owner) {
      this.destroySelf();
      character.player.weapon.ammo++;
    }
  }

  renderFromAngle(x: number, y: number) {
    this.sprite.draw(this.frameIndex, this.pos.x + x, this.pos.y + y, 1, 1, this.renderEffect, 1, this.palette);
  }

  update() {
    super.update();
    if(this.time > 0.22) {
      if(this.angleDist < 180) {
        let angInc = (-this.xDir * this.turnDir) * game.deltaTime * 300;
        this.angle += angInc;
        this.angleDist += Math.abs(angInc);
        this.vel.x = Helpers.cos(this.angle) * this.speed;
        this.vel.y = Helpers.sin(this.angle) * this.speed;
      }
      else {
        let dTo = this.pos.directionTo(this.damager.owner.character.centerPos).normalize();
        var destAngle = Math.atan2(dTo.y, dTo.x) * 180 / Math.PI;
        destAngle = Helpers.to360(destAngle);
        this.angle = Helpers.lerpAngle(this.angle, destAngle, game.deltaTime * 10);
        this.vel.x = Helpers.cos(this.angle) * this.speed;
        this.vel.y = Helpers.sin(this.angle) * this.speed;
      }
    }
  }

}

export class ShotgunIceProj extends Projectile {
 
  type: number = 0;
  sparkleTime: number = 0;
  constructor(pos: Point, vel: Point, player: Player, type: number) {
    super(pos, vel, 1, player, game.sprites["shotgun_ice"]);
    
    if(type === 1) {
      this.changeSprite(game.sprites["shotgun_ice_piece"], true);
    }

    this.fadeSprite = game.sprites["buster1_fade"];
    this.type = type;
    //this.fadeSound = "explosion";
  }

  update() {
    super.update();
    
    this.sparkleTime += game.deltaTime;
    if(this.sparkleTime > 0.05) {
      this.sparkleTime = 0;
      new Anim(this.pos, game.sprites["shotgun_ice_sparkles"], 1);
    }
    
  }

  onHit(other: GameObject) {
    if(this.type === 0) {
      this.destroySelf();
      new ShotgunIceProj(this.pos.clone(), new Point(-this.vel.x, -this.speed), this.damager.owner, 1);
      new ShotgunIceProj(this.pos.clone(), new Point(-this.vel.x, -this.speed*0.5), this.damager.owner, 1);
      new ShotgunIceProj(this.pos.clone(), new Point(-this.vel.x, 0 * 3), this.damager.owner, 1);
      new ShotgunIceProj(this.pos.clone(), new Point(-this.vel.x, this.speed*0.5), this.damager.owner, 1);
      new ShotgunIceProj(this.pos.clone(), new Point(-this.vel.x, this.speed), this.damager.owner, 1);
    }
  }

  onHitWall(wall: Wall) {
    this.onHit(wall);
  }

  onHitChar(character: Character) {
    //this.onHit(character);
    super.onHitChar(character);
  }

}