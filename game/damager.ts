import { Player } from "./player";

export class Damager {

  owner: Player;
  damage: number;

  constructor(owner: Player, damage: number) {
    this.owner = owner;
    this.damage = damage;
  }

}