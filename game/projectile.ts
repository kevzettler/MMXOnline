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

  constructor(pos: Point, vel: Point, damage: number, player: Player, sprite: Sprite) {
    super();
    this.vel = vel;
    this.pos = pos;
    this.sprite = sprite;
    this.useGravity = false;
    this.damager = new Damager(player, damage);
  }

  onTrigger(other: Collider) {
    let character = <Character> other.gameObject;
    if(character && character.player.alliance !== this.damager.owner.alliance) {
      character.applyDamage(this.damager.damage);
      this.destroySelf(game.sprites["buster1_fade"]);
    }
    let wall = <Wall> other.gameObject;
    if(wall) {
      //Destroy projectile
    }
  }

}