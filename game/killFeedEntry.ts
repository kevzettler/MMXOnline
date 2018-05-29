import { Player } from "./player";
import { Weapon } from "./weapon";

export class KillFeedEntry {
  killer: Player;
  victim: Player;
  weapon: Weapon;
  time: number = 0;
  constructor(killer: Player, victim: Player, weapon: Weapon) {
    this.killer = killer;
    this.victim = victim;
    this.weapon = weapon;
  }
}