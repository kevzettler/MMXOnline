import { Projectile, BusterProj, TorpedoProj } from "./projectile";
import { game } from "./game";
import { Player } from "./player";
import { Point } from "./point";

export class Weapon {
  
  projectile: Projectile;
  shootSound: string;
  ammo: number;
  maxAmmo: number;
  index: number;

  constructor() {
    this.ammo = 32;
    this.maxAmmo = 32;
  }

  getProjectile(pos: Point, vel: Point, player: Player): Projectile {
    return undefined;
  }

  shoot(pos: Point, vel: Point, player: Player) {
    let proj = this.getProjectile(pos, vel, player);
    game.playSound(this.shootSound);
    if(!(this instanceof Buster)) this.ammo--;
  }

}

export class Buster extends Weapon {

  constructor() {
    super();
    this.shootSound = "buster";
    this.index = 0;
  }

  getProjectile (pos: Point, vel: Point, player: Player): Projectile {
    return new BusterProj(pos, vel, player);
  }
  
}

export class Torpedo extends Weapon {

  constructor() {
    super();
    this.shootSound = "torpedo";
    this.index = 1;
  }

  getProjectile (pos: Point, vel: Point, player: Player): Projectile {
    return new TorpedoProj(pos, vel, player);
  }
  
}