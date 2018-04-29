import { Actor } from "./actor";
import { Damager } from "./damager";
import { Player } from "./player";
import { Point } from "./point";
import { Sprite } from "./sprite";

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

}