import { Projectile, BusterProj, TorpedoProj, Buster2Proj, Buster3Proj, StingProj, RollingShieldProj, ElectricSparkProj, ShotgunIceProj, BoomerangProj, TornadoProj, FireWaveProj, Buster4Proj } from "./projectile";
import { game } from "./game";
import { Player } from "./player";
import { Point } from "./point";
import * as Helpers from "./helpers";
import { Sprite } from "./sprite";
import { Anim } from "./actor";

export class Weapon {
  
  shootSounds: string[];
  ammo: number;
  maxAmmo: number;
  index: number;
  rateOfFire: number;
  speed: number = 350;
  soundTime: number = 0;

  constructor() {
    this.ammo = 32;
    this.maxAmmo = 32;
    this.rateOfFire = 0.15;
  }

  getProjectile(pos: Point, xDir: number, player: Player, chargeLevel: number): Projectile {
    return undefined;
  }

  update() {
    if(this.soundTime > 0) {
      this.soundTime = Helpers.clampMin(this.soundTime - game.deltaTime, 0);
    }
  }

  createBuster4Line(x: number, y: number, xDir: number, player: Player, offsetTime: number) {
    let buster4Speed = 350;
    new Buster4Proj(new Point(x + xDir, y), new Point(xDir * buster4Speed, 0), player, 3, 4, offsetTime);
    new Buster4Proj(new Point(x + xDir*8, y), new Point(xDir * buster4Speed, 0), player, 2, 3, offsetTime);
    new Buster4Proj(new Point(x + xDir*18, y), new Point(xDir * buster4Speed, 0), player, 2, 2, offsetTime);
    new Buster4Proj(new Point(x + xDir*32, y), new Point(xDir * buster4Speed, 0), player, 1, 1, offsetTime);
    new Buster4Proj(new Point(x + xDir*46, y), new Point(xDir * buster4Speed, 0), player, 0, 0, offsetTime);
  }

  shoot(pos: Point, xDir: number, player: Player, chargeLevel: number) {
    let proj = this.getProjectile(pos, xDir, player, chargeLevel);
    
    if(this instanceof Buster && chargeLevel === 3) {
      new Anim(pos.clone(), game.sprites["buster4_muzzle_flash"], xDir);
      //Create the buster effect
      let xOff = -50*xDir;
      this.createBuster4Line(pos.x + xOff, pos.y, xDir, player, 0);
      this.createBuster4Line(pos.x + xOff + 15*xDir, pos.y, xDir, player, 1);
      this.createBuster4Line(pos.x + xOff + 30*xDir, pos.y, xDir, player, 2);
      
    }

    if(this.soundTime === 0) {
      game.playSound(this.shootSounds[chargeLevel]);
      if(this instanceof FireWave) {
        this.soundTime = 0.25;
      }
    }
    
    if(!(this instanceof Buster)) {
      if(this instanceof FireWave) {
        this.ammo -= game.deltaTime * 10;
      }
      else {
        this.ammo--;
      }
    }
  }

}

export class Buster extends Weapon {

  constructor() {
    super();
    this.shootSounds = ["buster", "buster2", "buster3", "buster4"];
    this.index = 0;
  }

  getProjectile (pos: Point, xDir: number, player: Player, chargeLevel: number): Projectile {
    let vel = new Point(xDir * this.speed, 0);
    if(chargeLevel === 0) return new BusterProj(pos, vel, player);
    else if(chargeLevel === 1) return new Buster2Proj(pos, vel, player);
    else if(chargeLevel === 2) return new Buster3Proj(pos, vel, player);
    else if(chargeLevel === 3) return undefined;
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
    this.shootSounds = ["rollingShield", "rollingShield", "rollingShield", "rollingShield"];
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
    this.speed = 400;
    this.rateOfFire = 0.05;
  }

  getProjectile(pos: Point, xDir: number, player: Player, chargeLevel: number): Projectile {
    let vel = new Point(xDir * this.speed, 0);
    vel.inc(player.character.vel.times(-0.5));
    return new FireWaveProj(pos, vel, player);
  }

}

export class Tornado extends Weapon {

  constructor() {
    super();
    this.shootSounds = ["tornado", "tornado", "tornado", "tornado"];
    this.index = 5;
    this.speed = 400;
    this.rateOfFire = 1.5;
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
    this.rateOfFire = 0.5;
  }

  getProjectile(pos: Point, xDir: number, player: Player, chargeLevel: number): Projectile {
    let vel = new Point(xDir * this.speed, 0);
    return new ElectricSparkProj(pos, vel, player, 0);
  }

}

export class Boomerang extends Weapon {

  constructor() {
    super();
    this.shootSounds = ["boomerang", "boomerang", "boomerang", "boomerang"];
    this.index = 7;
    this.speed = 250;
    this.rateOfFire = 0.5;
  }

  getProjectile(pos: Point, xDir: number, player: Player, chargeLevel: number): Projectile {
    let vel = new Point(xDir * this.speed, 0);
    return new BoomerangProj(pos, vel, player);
  }

}

export class ShotgunIce extends Weapon {

  constructor() {
    super();
    this.shootSounds = ["buster", "buster", "buster", "buster"];
    this.index = 8;
    this.speed = 400;
    this.rateOfFire = 0.75;
  }

  getProjectile(pos: Point, xDir: number, player: Player, chargeLevel: number): Projectile {
    let vel = new Point(xDir * this.speed, 0);
    return new ShotgunIceProj(pos, vel, player, 0);
  }

}