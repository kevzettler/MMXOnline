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
import { GameObject } from "./gameObject";
import { Rect } from "./rect";
import { FireWave, Tornado, Torpedo, ShotgunIce, RollingShield, ElectricSpark, Sting, Boomerang, Weapon } from "./weapon";
import { Pickup } from "./pickup";

export class Projectile extends Actor {

  damager: Damager;
  flinch: boolean;
  fadeSprite: Sprite;
  fadeSound: string;
  speed: number;
  time: number = 0;
  hitCooldown: number = 0;
  weapon: Weapon;
  destroyOnCharHit: boolean = true;

  constructor(weapon: Weapon, pos: Point, vel: Point, damage: number, player: Player, sprite: Sprite) {
    super(sprite, pos);
    this.weapon = weapon;
    this.vel = vel;
    this.speed = this.vel.magnitude;
    this.useGravity = false;
    this.flinch = false;
    this.damager = new Damager(player, damage);
    this.xDir = Math.sign(vel.x);
    if(game.level.gameMode.isTeamMode) {
      if(player.alliance === 0) {
        this.renderEffects.add("blueshadow");
      }
      else {
        this.renderEffects.add("redshadow");
      }
    }
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
    //Destroy torpedo if it hits something else
    if(this instanceof TorpedoProj && other.gameObject instanceof Projectile && this.damager.owner.alliance !== other.gameObject.damager.owner.alliance) {
      this.destroySelf(this.fadeSprite, this.fadeSound);
      if(!(other.gameObject instanceof TornadoProj) && !(other.gameObject instanceof FireWaveProj) && !(other.gameObject instanceof Buster2Proj)
        && !(other.gameObject instanceof Buster3Proj) && !(other.gameObject instanceof Buster4Proj) && !(other.gameObject instanceof RollingShieldProj)) {
        other.gameObject.destroySelf(other.gameObject.fadeSprite, other.gameObject.fadeSound);
      }
      return;
    }

    //If this is rolling shield, destroy the other projectile
    if(this instanceof RollingShieldProj && other.gameObject instanceof Projectile && this.damager.owner.alliance !== other.gameObject.damager.owner.alliance) {
      if(!(other.gameObject instanceof TornadoProj) && !(other.gameObject instanceof RollingShieldProj) && !(other.gameObject instanceof ElectricSparkProj)) {
        other.gameObject.destroySelf(other.gameObject.fadeSprite, other.gameObject.fadeSound);
      }
    }

    let character = other.gameObject;
    if(character instanceof Character && character.player.alliance !== this.damager.owner.alliance) {
      let pos = other.collider.shape.getIntersectPoint(this.pos, this.vel);
      if(pos) this.changePos(pos.clone());
      let character = other.gameObject;
      if(character instanceof Character) {

        let key: string = this.constructor.toString() + this.damager.owner.id.toString();
        
        if(!character.projectileCooldown[key] && !character.invulnFrames) {
          character.projectileCooldown[key] = this.hitCooldown;

          character.renderEffects.add("hit");
          character.renderEffectTime = 0.1;
          
          let weakness = false;
          if(this instanceof TorpedoProj && character.player.weapon instanceof Boomerang) weakness = true;
          if(this instanceof StingProj && character.player.weapon instanceof Tornado) weakness = true;
          if(this instanceof RollingShieldProj && character.player.weapon instanceof Torpedo) weakness = true;
          if(this instanceof FireWaveProj && character.player.weapon instanceof ShotgunIce) weakness = true;
          if(this instanceof TornadoProj && character.player.weapon instanceof FireWave) weakness = true;
          if(this instanceof BoomerangProj && character.player.weapon instanceof Sting) weakness = true;
          if(this instanceof ElectricSparkProj && character.player.weapon instanceof RollingShield) weakness = true;
          if(this instanceof ShotgunIceProj && character.player.weapon instanceof ElectricSpark) weakness = true;
          
          character.applyDamage(this.damager.owner, this.weapon, this.damager.damage * (weakness ? 2 : 1));

          if(this.flinch || game.options.alwaysFlinch || weakness) {
            if(game.useInvulnFrames()) {
              this.playSound("weakness");
            }
            else {
              this.playSound("hurt");
            }
            character.setHurt(this.pos.x > character.pos.x ? -1 : 1);
          }
          else {
            if(game.useInvulnFrames()) {
              this.playSound("weakness");
            }
            else {
              this.playSound("hit");
            }
          }
          if(game.useInvulnFrames()) {
            character.invulnFrames = 1;
            character.renderEffectTime = 1;
          }
        }
        else if(character.invulnFrames && !character.projectileCooldown[key] && 
          !(this instanceof TornadoProj) && !(this instanceof FireWaveProj)) {
            this.playSound("hit");
        }
        this.onHitChar(character);
      }
    }
    let wall = other.gameObject;
    if(wall instanceof Wall) {
      this.onHitWall(other);
    }
  }

  onHitChar(character: Character) {
    if(this.destroyOnCharHit) {
      this.destroySelf(this.fadeSprite, this.fadeSound);
    }
  }

  onHitWall(other: CollideData) {

  }

}

export class BusterProj extends Projectile {

  constructor(weapon: Weapon, pos: Point, vel: Point, player: Player) {
    super(weapon, pos, vel, 1, player, game.sprites["buster1"]);
    this.fadeSprite = game.sprites["buster1_fade"];
  }

}

export class Buster2Proj extends Projectile {

  constructor(weapon: Weapon, pos: Point, vel: Point, player: Player) {
    super(weapon, pos, vel, 3, player, game.sprites["buster2"]);
    this.fadeSprite = game.sprites["buster2_fade"];
    this.flinch = true;
  }

}

export class Buster3Proj extends Projectile {

  constructor(weapon: Weapon, pos: Point, vel: Point, player: Player) {
    super(weapon, pos, vel, 6, player, game.sprites["buster3"]);
    this.fadeSprite = game.sprites["buster3_fade"];
    this.flinch = true;
  }

}

export class Buster4Proj extends Projectile {

  type: number = 0;
  num: number = 0;
  offsetTime: number = 0;
  initY: number = 0;
  
  constructor(weapon: Weapon, pos: Point, vel: Point, player: Player, type: number, num: number, offsetTime: number) {
    super(weapon, pos, vel, 8, player, game.sprites["buster4"]);
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
    let y = this.initY + Math.sin(game.time*18 - this.num * 0.5 + this.offsetTime * 2.09) * 15;
    this.changePos(new Point(this.pos.x, y))
  }

}

export class TorpedoProj extends Projectile {

  target: Character;
  smokeTime: number = 0;
  constructor(weapon: Weapon, pos: Point, vel: Point, player: Player) {
    super(weapon, pos, vel, 2, player, game.sprites["torpedo"]);
    this.fadeSprite = game.sprites["explosion"];
    this.fadeSound = "explosion";
    this.angle = this.xDir === -1 ? 180 : 0;
    this.vel.x = this.vel.x * 0.25;
  }

  update() {
    super.update();
    
    if(this.target) {
      if(this.time < 7.5) {
        this.vel = this.vel.add(new Point(Helpers.cos(this.angle), Helpers.sin(this.angle)).times(this.speed * 0.25));
        if(this.vel.magnitude > this.speed) {
          this.vel = this.vel.normalize().times(this.speed);
        }
        let dTo = this.pos.directionTo(this.target.centerPos).normalize();
        
        var destAngle = Math.atan2(dTo.y, dTo.x) * 180 / Math.PI;

        destAngle = Helpers.to360(destAngle);
        this.angle = Helpers.lerpAngle(this.angle, destAngle, game.deltaTime * 3);
      }
      else {
        
      }
    }
    else if(this.time >= 0.15) {
      this.target = game.level.getClosestTarget(this.pos, this.damager.owner.alliance);
    }
    else if(this.time < 0.15) {
      this.vel.x += this.xDir * game.deltaTime * 300;
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

    this.sprite.draw(frameIndex, this.pos.x + x, this.pos.y + y, xDir, yDir, this.renderEffects, 1, this.palette);
  }
  
}

export class StingProj extends Projectile {

  type: number = 0; //0 = initial proj, 1 = horiz, 2 = up, 3 = down
  origVel: Point;
  constructor(weapon: Weapon, pos: Point, vel: Point, player: Player, type: number) {
    super(weapon, pos, vel, 2, player, game.sprites["sting_start"]);
    this.origVel = vel.clone();
    if(type === 1) {
      let sprite = game.sprites["sting_flat"];
      this.changeSprite(sprite, false);
    }
    else if(type === 2 || type === 3) {
      let sprite = game.sprites["sting_up"];
      if(type === 3) {
        this.yDir = -1;
      }
      this.changeSprite(sprite, false);
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
        new StingProj(this.weapon, this.pos.addxy(15*this.xDir, 0), this.origVel, this.damager.owner, 1);
        new StingProj(this.weapon, this.pos.addxy(15*this.xDir, -8), this.origVel.addxy(0, -150), this.damager.owner, 2);
        new StingProj(this.weapon, this.pos.addxy(15*this.xDir, 8), this.origVel.addxy(0, 150), this.damager.owner, 3);
        this.destroySelf();
      }
    }
  }

}

export class RollingShieldProj extends Projectile {
 
  constructor(weapon: Weapon, pos: Point, vel: Point, player: Player) {
    super(weapon, pos, vel, 2, player, game.sprites["rolling_shield"]);
    this.fadeSprite = game.sprites["explosion"];
    this.fadeSound = "explosion";
    this.useGravity = true;
    this.collider.wallOnly = true;
  }

  update() {
    
    if(!game.level.checkCollisionActor(this, 0, 0)) {
      let collideData = game.level.checkCollisionActor(this, this.xDir, 0, this.vel);
      if(collideData && collideData.hitData && !collideData.hitData.normal.isAngled()) {
        this.vel.x *= -1;
        this.xDir *= -1;
      }
    }
    else {
      //this.vel.x = 0;
    }
    super.update();
    if(this.time > 1.5) {
      this.destroySelf(this.fadeSprite, this.fadeSound);
    }
  }

}


export class FireWaveProj extends Projectile {
 
  constructor(weapon: Weapon, pos: Point, vel: Point, player: Player) {
    super(weapon, pos, vel, 1, player, game.sprites["fire_wave"]);
    this.fadeSprite = game.sprites["fire_wave_fade"];
    this.hitCooldown = 0.225;
    //this.fadeSound = "explosion";
  }

  update() {
    super.update();
    if(this.time > 0.1) {
      this.destroySelf(this.fadeSprite);
    }
  }

  onHitChar(character: Character) {
  }

}

export class TornadoProj extends Projectile {
 
  spriteStart: Sprite;
  spriteMids: Sprite[] = [];
  spriteEnd: Sprite;
  length: number = 1;
  constructor(weapon: Weapon, pos: Point, vel: Point, player: Player) {
    super(weapon, pos, vel, 1, player, game.sprites["tornado_mid"]);
    this.sprite.pixiSprite.visible = false;
    this.spriteStart = new Sprite(game.sprites["tornado_start"].spriteJson, true, this.container);
    for(let i = 0; i < 6; i++) {
      let midSprite = new Sprite(game.sprites["tornado_mid"].spriteJson, true, this.container);
      midSprite.pixiSprite.visible = false;
      this.spriteMids.push(midSprite);
    }
    this.spriteEnd = new Sprite(game.sprites["tornado_end"].spriteJson, true, this.container);
    this.vel.x = 0;
    this.hitCooldown = 0.3;
  }
  
  render(x: number, y: number) {
    this.spriteStart.draw(this.frameIndex, this.pos.x + x, this.pos.y + y, this.xDir, this.yDir, this.renderEffects, 1, this.palette);
    let i = 0;
    let spriteMidLen = this.spriteMids[0].frames[this.frameIndex].rect.w;
    for(i; i < this.length; i++) {
      this.spriteMids[i].pixiSprite.visible = true;
      this.spriteMids[i].draw(this.frameIndex, this.pos.x + x + (i*this.xDir*spriteMidLen), this.pos.y + y, this.xDir, this.yDir, this.renderEffects, 1, this.palette);
    }
    this.spriteEnd.draw(this.frameIndex, this.pos.x + x + (i*this.xDir*spriteMidLen), this.pos.y + y, this.xDir, this.yDir, this.renderEffects, 1, this.palette);
    if(game.options.showHitboxes && this.collider) {
      Helpers.drawPolygon(game.uiCtx, this.collider.shape.clone(x, y), true, "blue", "", 0, 0.5);
      //Helpers.drawCircle(game.ctx, this.pos.x + x, this.pos.y + y, 1, "red");
    }
  }

  update() {
    super.update();

    let topX = 0;
    let topY = 0;
    
    let spriteMidLen = this.spriteMids[0].frames[this.frameIndex].rect.w;
    let spriteEndLen = this.spriteEnd.frames[this.frameIndex].rect.w;

    let botX = (this.length*spriteMidLen) + spriteEndLen;
    let botY = this.spriteStart.frames[0].rect.h * 2;

    let rect = new Rect(topX, topY, botX, botY);
    this.globalCollider = new Collider(rect.getPoints(), true, this, false, false);

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
    if(character.isClimbingLadder()) {
      character.setFall();
    }
  }

  destroySelf(sprite?: Sprite, fadeSound?: string) {
    super.destroySelf(sprite, fadeSound);
    this.container.removeChild(this.spriteStart.pixiSprite);
    this.spriteStart.pixiSprite.destroy();
    this.container.removeChild(this.spriteEnd.pixiSprite);
    this.spriteEnd.pixiSprite.destroy();
    for(let sprite of this.spriteMids) {
      this.container.removeChild(sprite.pixiSprite);
      sprite.pixiSprite.destroy();
    }
  }
}

export class ElectricSparkProj extends Projectile {
 
  type: number = 0;
  constructor(weapon: Weapon, pos: Point, vel: Point, player: Player, type: number) {
    super(weapon, pos, vel, 2, player, game.sprites["electric_spark"]);
    this.fadeSprite = game.sprites["electric_spark_fade"];
    //this.fadeSound = "explosion";
    this.type = type;
  }

  onHitWall(other: CollideData) {
    if(this.type === 0) {
      let normal = other.hitData ? other.hitData.normal : undefined;
      if(normal) {
        normal = normal.leftNormal();
      }
      else {
        normal = new Point(0, 1)
      }
      normal.multiply(this.speed * 3);
      this.destroySelf(this.fadeSprite);
      new ElectricSparkProj(this.weapon, this.pos.clone(), normal, this.damager.owner, 1);
      new ElectricSparkProj(this.weapon, this.pos.clone(), normal.times(-1), this.damager.owner, 1);
    }
  }

}

export class ElectricSparkProjCharged extends Projectile {

  constructor(weapon: Weapon, pos: Point, player: Player, dir: number) {
    super(weapon, pos, new Point(dir * 450, 0), 4, player, game.sprites["electric_spark_charge"]);
    this.xDir = dir;
    this.destroyOnCharHit = false;
    this.hitCooldown = 0.5;
    this.flinch = true;
  }

}

export class BoomerangProj extends Projectile {
 
  angleDist: number = 0;
  turnDir: number = 1;
  pickup: Pickup;
  constructor(weapon: Weapon, pos: Point, vel: Point, player: Player) {
    super(weapon, pos, vel, 2, player, game.sprites["boomerang"]);
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

    if(other.gameObject instanceof Pickup) {
      this.pickup = other.gameObject;
      this.pickup.collider.isTrigger = true;
      this.pickup.useGravity = false;
      this.pickup.pos = this.pos;
    }

    let character = other.gameObject;
    if(this.time > 0.22 && character instanceof Character && character.player === this.damager.owner) {
      if(this.pickup) {
        this.pickup.pos = character.pos;
      }
      this.destroySelf();
      if(character.player.weapon instanceof Boomerang) {
        character.player.weapon.ammo++;
      }
    }
  }

  renderFromAngle(x: number, y: number) {
    this.sprite.draw(this.frameIndex, this.pos.x + x, this.pos.y + y, 1, 1, this.renderEffects, 1, this.palette);
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
      else if(this.damager.owner.character) {
        let dTo = this.pos.directionTo(this.damager.owner.character.centerPos).normalize();
        var destAngle = Math.atan2(dTo.y, dTo.x) * 180 / Math.PI;
        destAngle = Helpers.to360(destAngle);
        this.angle = Helpers.lerpAngle(this.angle, destAngle, game.deltaTime * 10);
        this.vel.x = Helpers.cos(this.angle) * this.speed;
        this.vel.y = Helpers.sin(this.angle) * this.speed;
      }
      else {
        this.destroySelf();
      }
    }
  }

}

export class ShotgunIceProj extends Projectile {
 
  type: number = 0;
  sparkleTime: number = 0;
  constructor(weapon: Weapon, pos: Point, vel: Point, player: Player, type: number) {
    super(weapon, pos, vel, 2, player, game.sprites["shotgun_ice"]);
    
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
      new ShotgunIceProj(this.weapon, this.pos.clone(), new Point(-this.vel.x, -this.speed), this.damager.owner, 1);
      new ShotgunIceProj(this.weapon, this.pos.clone(), new Point(-this.vel.x, -this.speed*0.5), this.damager.owner, 1);
      new ShotgunIceProj(this.weapon, this.pos.clone(), new Point(-this.vel.x, 0 * 3), this.damager.owner, 1);
      new ShotgunIceProj(this.weapon, this.pos.clone(), new Point(-this.vel.x, this.speed*0.5), this.damager.owner, 1);
      new ShotgunIceProj(this.weapon, this.pos.clone(), new Point(-this.vel.x, this.speed), this.damager.owner, 1);
    }
  }

  onHitWall(other: CollideData) {
    this.onHit(other.gameObject);
  }

  onHitChar(character: Character) {
    //this.onHit(character);
    super.onHitChar(character);
  }

}