import { Actor } from "./actor";
import { Damager } from "./damager";
import { Player } from "./player";
import { Point } from "./point";
import { Sprite } from "./sprite";
import { Collider, CollideData } from "./collider";
import { Character } from "./character";
import { Wall } from "./wall";
import { game } from "./game";

export class Projectile extends Actor {

  damager: Damager;
  flinch: boolean;
  fadeSprite: Sprite;
  fadeSound: string;

  constructor(pos: Point, vel: Point, damage: number, player: Player, sprite: Sprite) {
    super(sprite);
    this.vel = vel;
    this.pos = pos;
    this.useGravity = false;
    this.flinch = false;
    this.damager = new Damager(player, damage);
  }

  update() {
    super.update();
    let leeway = 500;
    if(this.pos.x > game.level.width + leeway || this.pos.x < -leeway || this.pos.y > game.level.height + leeway || this.pos.y < -leeway) {
      this.destroySelf();
    }
  }

  onCollision(other: CollideData) {
    let character = (other.collider.gameObject instanceof Character) ? <Character> other.collider.gameObject : undefined;
    if(character && character.player.alliance !== this.damager.owner.alliance) {
      this.onHit(character, other.point);
    }
    let wall = <Wall> other.collider.gameObject;
    if(wall) {
      //Destroy projectile
    }
  }

  onHit(character: Character, hitPoint: Point) {
    character.renderEffect = "flash";
    character.applyDamage(this.damager.damage);
    if(!this.flinch) {
      game.playSound("hit");
    }
    else {
      game.playSound("hurt");
      character.setHurt(this.pos.x > character.pos.x ? -1 : 1);
    }
    this.pos = hitPoint.clone();
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

  constructor(pos: Point, vel: Point, player: Player) {
    super(pos, vel, 1, player, game.sprites["torpedo"]);
    this.fadeSprite = game.sprites["explosion"];
    this.fadeSound = "explosion";
  }

}