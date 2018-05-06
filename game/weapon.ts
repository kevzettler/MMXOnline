import { Projectile, BusterProj, TorpedoProj, Buster2Proj, Buster3Proj, StingProj, RollingShieldProj, ElectricSparkProj, ShotgunIceProj, BoomerangProj, TornadoProj, FireWaveProj } from "./projectile";
import { game } from "./game";
import { Player } from "./player";
import { Point } from "./point";

export class Weapon {
  
  shootSounds: string[];
  ammo: number;
  maxAmmo: number;
  index: number;
  rateOfFire: number;
  speed: number = 350;

  constructor() {
    this.ammo = 32;
    this.maxAmmo = 32;
    this.rateOfFire = 0.15;
  }

  getProjectile(pos: Point, xDir: number, player: Player, chargeLevel: number): Projectile {
    return undefined;
  }

  shoot(pos: Point, xDir: number, player: Player, chargeLevel: number) {
    let proj = this.getProjectile(pos, xDir, player, chargeLevel);
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

  getProjectile (pos: Point, xDir: number, player: Player, chargeLevel: number): Projectile {
    let vel = new Point(xDir * this.speed, 0);
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
    this.speed = 150;
    this.rateOfFire = 0.5;
  }

  getProjectile(pos: Point, xDir: number, player: Player, chargeLevel: number): Projectile {
    let vel = new Point(xDir * this.speed, 0);
    return new TorpedoProj(pos, vel, player);
  }
  
}

export class Sting extends Weapon {

  constructor() {
    super();
    this.shootSounds = ["csting", "csting", "csting", "csting"];
    this.index = 2;
    this.speed = 300;
    this.rateOfFire = 0.75;
  }

  getProjectile(pos: Point, xDir: number, player: Player, chargeLevel: number): Projectile {
    let vel = new Point(xDir * this.speed, 0);
    return new StingProj(pos, vel, player, 0);
  }

}

export class RollingShield extends Weapon {

  constructor() {
    super();
    this.shootSounds = ["rollingshield", "rollingshield", "rollingshield", "rollingshield"];
    this.index = 3;
    this.speed = 150;
    this.rateOfFire = 0.75;
  }

  getProjectile(pos: Point, xDir: number, player: Player, chargeLevel: number): Projectile {
    let vel = new Point(xDir * this.speed, 0);
    return new RollingShieldProj(pos, vel, player);
  }

}

export class FireWave extends Weapon {

  constructor() {
    super();
    this.shootSounds = ["fireWave", "fireWave", "fireWave", "fireWave"];
    this.index = 4;
    this.speed = 150;
    this.rateOfFire = 0.75;
  }

  getProjectile(pos: Point, xDir: number, player: Player, chargeLevel: number): Projectile {
    let vel = new Point(xDir * this.speed, 0);
    return new FireWaveProj(pos, vel, player);
  }

}

export class Tornado extends Weapon {

  constructor() {
    super();
    this.shootSounds = ["tornado", "tornado", "tornado", "tornado"];
    this.index = 5;
    this.speed = 150;
    this.rateOfFire = 0.75;
  }

  getProjectile(pos: Point, xDir: number, player: Player, chargeLevel: number): Projectile {
    let vel = new Point(xDir * this.speed, 0);
    return new TornadoProj(pos, vel, player);
  }

}

export class ElectricSpark extends Weapon {

  constructor() {
    super();
    this.shootSounds = ["electricSpark", "electricSpark", "electricSpark", "electricSpark"];
    this.index = 6;
    this.speed = 150;
    this.rateOfFire = 0.75;
  }

  getProjectile(pos: Point, xDir: number, player: Player, chargeLevel: number): Projectile {
    let vel = new Point(xDir * this.speed, 0);
    return new ElectricSparkProj(pos, vel, player);
  }

}

export class Boomerang extends Weapon {

  constructor() {
    super();
    this.shootSounds = ["boomerang", "boomerang", "boomerang", "boomerang"];
    this.index = 7;
    this.speed = 150;
    this.rateOfFire = 0.75;
  }

  getProjectile(pos: Point, xDir: number, player: Player, chargeLevel: number): Projectile {
    let vel = new Point(xDir * this.speed, 0);
    return new BoomerangProj(pos, vel, player);
  }

}

export class ShotgunIce extends Weapon {

  constructor() {
    super();
    this.shootSounds = ["shotgunIce", "shotgunIce", "shotgunIce", "shotgunIce"];
    this.index = 8;
    this.speed = 250;
    this.rateOfFire = 0.75;
  }

  getProjectile(pos: Point, xDir: number, player: Player, chargeLevel: number): Projectile {
    let vel = new Point(xDir * this.speed, 0);
    return new ShotgunIceProj(pos, vel, player);
  }

}