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

export class Projectile extends Actor {

  damager: Damager;
  flinch: boolean;
  fadeSprite: Sprite;
  fadeSound: string;
  speed: number;
  time: number = 0;

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
    let character = (other.collider.gameObject instanceof Character) ? <Character> other.collider.gameObject : undefined;
    if(character && character.player.alliance !== this.damager.owner.alliance) {
      
      let pos = other.collider.shape.getIntersectPoint(this.pos, this.vel);
      if(pos) this.pos = pos.clone();

      this.onHit(character);
    }
    let wall = <Wall> other.collider.gameObject;
    if(wall) {
      //Destroy projectile
      this.onHitWall(wall);
    }
  }

  onHitWall(wall: Wall) { }

  onHit(character: Character) {
    character.renderEffect = "flash";
    character.applyDamage(this.damager.damage);
    if(!this.flinch) {
      game.playSound("hit");
    }
    else {
      game.playSound("hurt");
      character.setHurt(this.pos.x > character.pos.x ? -1 : 1);
    }
    this.destroySelf(this.fadeSprite, this.fadeSound);
  }

}

export class BusterProj extends Projectile {

  constructor(pos: Point, vel: Point, player: Player) {
    super(pos, vel, 1, player, game.sprites["buster1"]);
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
      this.angle = Helpers.lerp(this.angle, destAngle, game.deltaTime * 10);
    }

    this.smokeTime += game.deltaTime;
    if(this.smokeTime > 0.2) {
      this.smokeTime = 0;
      new Anim(this.pos, game.sprites["torpedo_smoke"], 1);
    }
    
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
        new StingProj(this.pos.addxy(15, 0), this.origVel, this.damager.owner, 1);
        new StingProj(this.pos.addxy(15, -8), this.origVel.addxy(0, -150), this.damager.owner, 2);
        new StingProj(this.pos.addxy(15, 8), this.origVel.addxy(0, 150), this.damager.owner, 3);
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
  }

  update() {
    let collideData = game.level.checkCollisionActor(this, this.xDir, -1, false);
    if(collideData) {
      this.vel.x *= -1;
      this.xDir *= -1;
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
    //this.fadeSprite = game.sprites["electric_spark_fade"];
    //this.fadeSound = "explosion";
  }

  onCollision(other: CollideData) {
    
  }

}

export class TornadoProj extends Projectile {
 
  constructor(pos: Point, vel: Point, player: Player) {
    super(pos, vel, 1, player, game.sprites["storm_tornado"]);
    //this.fadeSprite = game.sprites["electric_spark_fade"];
    //this.fadeSound = "explosion";
  }

  onCollision(other: CollideData) {
    
  }

}

export class ElectricSparkProj extends Projectile {
 
  constructor(pos: Point, vel: Point, player: Player) {
    super(pos, vel, 1, player, game.sprites["electric_spark"]);
    this.fadeSprite = game.sprites["electric_spark_fade"];
    //this.fadeSound = "explosion";
  }

  onCollision(other: CollideData) {
    
  }

}

export class BoomerangProj extends Projectile {
 
  constructor(pos: Point, vel: Point, player: Player) {
    super(pos, vel, 1, player, game.sprites["boomerang"]);
    //this.fadeSprite = game.sprites["electric_spark_fade"];
    //this.fadeSound = "explosion";
  }

  onCollision(other: CollideData) {

  }

}

export class ShotgunIceProj extends Projectile {
 
  constructor(pos: Point, vel: Point, player: Player) {
    super(pos, vel, 1, player, game.sprites["shotgun_ice"]);
    this.fadeSprite = game.sprites["buster1_fade"];
    //this.fadeSound = "explosion";
  }


}