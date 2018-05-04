import { Projectile, BusterProj, TorpedoProj, Buster2Proj, Buster3Proj } from "./projectile";
import { game } from "./game";
import { Player } from "./player";
import { Point } from "./point";

export class Weapon {
  
  shootSounds: string[];
  ammo: number;
  maxAmmo: number;
  index: number;
  rateOfFire: number;

  constructor() {
    this.ammo = 32;
    this.maxAmmo = 32;
    this.rateOfFire = 0.15;
  }

  getProjectile(pos: Point, vel: Point, player: Player, chargeLevel: number): Projectile {
    return undefined;
  }

  shoot(pos: Point, vel: Point, player: Player, chargeLevel: number) {
    let proj = this.getProjectile(pos, vel, player, chargeLevel);
    proj.xDir = Math.sign(vel.x);
    game.playSound(this.shootSounds[chargeLevel]);
    if(!(this instanceof Buster)) this.ammo--;
  }

}

export class Buster extends Weapon {

  constructor() {
    super();
    this.shootSounds = ["buster", "buster2", "buster3", "buster3"];
    this.index = 0;
  }

  getProjectile (pos: Point, vel: Point, player: Player, chargeLevel: number): Projectile {
    if(chargeLevel === 0) return new BusterProj(pos, vel, player);
    else if(chargeLevel === 1) return new Buster2Proj(pos, vel, player);
    else if(chargeLevel === 2) return new Buster3Proj(pos, vel, player);
    else if(chargeLevel === 3) return new Buster3Proj(pos, vel, player);
    //else if(chargeLevel === 4) return new Buster4Proj(pos, vel, player);
  }
  
}

export class Torpedo extends Weapon {

  constructor() {
    super();
    this.shootSounds = ["torpedo", "torpedo", "torpedo", "torpedo"];
    this.index = 1;
  }

  getProjectile (pos: Point, vel: Point, player: Player, chargeLevel: number): Projectile {
    return new TorpedoProj(pos, vel, player);
  }
  
}