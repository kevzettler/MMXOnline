import { Actor } from "./actor";
import { Damager } from "./damager";
import { Player } from "./player";
import { Point } from "./point";
import { Sprite } from "./sprite";
import { Collider } from "./collider";
import { Character } from "./character";
import { Wall } from "./wall";
import { game } from "./game";

export class Projectile extends Actor {

  damager: Damager;
  flinch: boolean;
  fadeSprite: Sprite;
  fadeSound: string;

  constructor(pos: Point, vel: Point, damage: number, player: Player, sprite: Sprite) {
    super();
    this.vel = vel;
    this.pos = pos;
    this.sprite = sprite;
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

  onTrigger(other: Collider) {
    let character = (other.gameObject instanceof Character) ? <Character> other.gameObject : undefined;
    if(character && character.player.alliance !== this.damager.owner.alliance) {
      this.onHit(character);
    }
    let wall = <Wall> other.gameObject;
    if(wall) {
      //Destroy projectile
    }
  }

  onHit(character: Character) {
    character.isFlashing = true;
    character.applyDamage(this.damager.damage);
    if(!this.flinch) {
      game.playSound("hit");
    }
    else {
      game.playSound("hurt");
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

export class TorpedoProj extends Projectile {

  constructor(pos: Point, vel: Point, player: Player) {
    super(pos, vel, 1, player, game.sprites["torpedo"]);
    this.fadeSprite = game.sprites["explosion"];
    this.fadeSound = "explosion";
  }

}