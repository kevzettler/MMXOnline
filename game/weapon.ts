import { Projectile, BusterProj, TorpedoProj, Buster2Proj, Buster3Proj, StingProj, RollingShieldProj, ElectricSparkProj, ShotgunIceProj, BoomerangProj, TornadoProj, FireWaveProj, Buster4Proj, ElectricSparkProjCharged } from "./projectile";
import { game } from "./game";
import { Player } from "./player";
import { Point } from "./point";
import * as Helpers from "./helpers";
import { Sprite } from "./sprite";
import { Anim } from "./actor";
import { Palette } from "./color";
import { Damager } from "./damager";

export class Weapon {
  
  shootSounds: string[];
  ammo: number;
  maxAmmo: number;
  index: number;
  rateOfFire: number;
  speed: number = 350;
  soundTime: number = 0;
  palette: Palette;

  constructor() {
    this.ammo = 32;
    this.maxAmmo = 32;
    this.rateOfFire = 0.15;
  }

  getProjectile(pos: Point, xDir: number, player: Player, chargeLevel: number): void {
  }

  update() {
    if(this.soundTime > 0) {
      this.soundTime = Helpers.clampMin(this.soundTime - game.deltaTime, 0);
    }
  }

  createBuster4Line(x: number, y: number, xDir: number, player: Player, offsetTime: number) {
    let buster4Speed = 350;
    new Buster4Proj(this, new Point(x + xDir, y), new Point(xDir * buster4Speed, 0), player, 3, 4, offsetTime);
    new Buster4Proj(this, new Point(x + xDir*8, y), new Point(xDir * buster4Speed, 0), player, 2, 3, offsetTime);
    new Buster4Proj(this, new Point(x + xDir*18, y), new Point(xDir * buster4Speed, 0), player, 2, 2, offsetTime);
    new Buster4Proj(this, new Point(x + xDir*32, y), new Point(xDir * buster4Speed, 0), player, 1, 1, offsetTime);
    new Buster4Proj(this, new Point(x + xDir*46, y), new Point(xDir * buster4Speed, 0), player, 0, 0, offsetTime);
  }

  canShoot(player: Player) {
    /*
    let projCount = 0;
    for(let go of game.level.gameObjects) {
      if(go instanceof Projectile && go.damager.owner === player) {
        projCount++;
      }
    }
    if(projCount >= 3) return false;
    */
    return true;
  }

  shoot(pos: Point, xDir: number, player: Player, chargeLevel: number) {
    
    this.getProjectile(pos, xDir, player, chargeLevel);
    
    if(this instanceof Buster && chargeLevel === 3) {
      new Anim(pos.clone(), game.sprites["buster4_muzzle_flash"], xDir);
      //Create the buster effect
      let xOff = -50*xDir;
      this.createBuster4Line(pos.x + xOff, pos.y, xDir, player, 0);
      this.createBuster4Line(pos.x + xOff + 15*xDir, pos.y, xDir, player, 1);
      this.createBuster4Line(pos.x + xOff + 30*xDir, pos.y, xDir, player, 2);
      
    }

    if(this.soundTime === 0) {
      player.character.playSound(this.shootSounds[chargeLevel]);
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

export class ZSaber extends Weapon {
  damager: Damager;
  constructor(player: Player) {
    super();
    this.index = 9;
    this.damager = new Damager(player, 3, true, 0.5);
  }
}

export class ZSaber2 extends Weapon {
  damager: Damager;
  constructor(player: Player) {
    super();
    this.index = 9;
    this.damager = new Damager(player, 2, true, 0.5);
  }
}

export class ZSaber3 extends Weapon {
  damager: Damager;
  constructor(player: Player) {
    super();
    this.index = 9;
    this.damager = new Damager(player, 4, true, 0.5);
  }
}

export class ZSaberAir extends Weapon {
  damager: Damager;
  constructor(player: Player) {
    super();
    this.index = 9;
    this.damager = new Damager(player, 2, true, 0.5);
  }
}

export class ZSaberDash extends Weapon {
  damager: Damager;
  constructor(player: Player) {
    super();
    this.index = 9;
    this.damager = new Damager(player, 2, true, 0.5);
  }
}

export class Buster extends Weapon {

  constructor() {
    super();
    this.shootSounds = ["buster", "buster2", "buster3", "buster4"];
    this.index = 0;
  }

  getProjectile (pos: Point, xDir: number, player: Player, chargeLevel: number) {
    let vel = new Point(xDir * this.speed, 0);
    if(chargeLevel === 0) new BusterProj(this, pos, vel, player);
    else if(chargeLevel === 1) new Buster2Proj(this, pos, vel, player);
    else if(chargeLevel === 2) new Buster3Proj(this, pos, vel, player);
    else if(chargeLevel === 3) undefined;
  }
  
}

export class Torpedo extends Weapon {

  constructor() {
    super();
    this.shootSounds = ["torpedo", "torpedo", "torpedo", "torpedo"];
    this.index = 1;
    this.speed = 150;
    this.rateOfFire = 0.5;
    this.palette = game.palettes["torpedo"];
  }

  getProjectile(pos: Point, xDir: number, player: Player, chargeLevel: number) {
    let vel = new Point(xDir * this.speed, 0);
    new TorpedoProj(this, pos, vel, player);
  }
  
}

export class Sting extends Weapon {

  constructor() {
    super();
    this.shootSounds = ["csting", "csting", "csting", "csting"];
    this.index = 2;
    this.speed = 300;
    this.rateOfFire = 0.75;
    this.palette = game.palettes["sting"];
  }

  getProjectile(pos: Point, xDir: number, player: Player, chargeLevel: number) {
    let vel = new Point(xDir * this.speed, 0);
    new StingProj(this, pos, vel, player, 0);
  }

}

export class RollingShield extends Weapon {

  constructor() {
    super();
    this.shootSounds = ["rollingShield", "rollingShield", "rollingShield", "rollingShield"];
    this.index = 3;
    this.speed = 200;
    this.rateOfFire = 0.75;
    this.palette = game.palettes["rolling_shield"];
  }

  getProjectile(pos: Point, xDir: number, player: Player, chargeLevel: number) {
    let vel = new Point(xDir * this.speed, 0);
    new RollingShieldProj(this, pos, vel, player);
  }

}

export class FireWave extends Weapon {

  constructor() {
    super();
    this.shootSounds = ["fireWave", "fireWave", "fireWave", "fireWave"];
    this.index = 4;
    this.speed = 400;
    this.rateOfFire = 0.05;
    this.palette = game.palettes["fire_wave"];
  }

  getProjectile(pos: Point, xDir: number, player: Player, chargeLevel: number) {
    let vel = new Point(xDir * this.speed, 0);
    vel.inc(player.character.vel.times(-0.5));
    new FireWaveProj(this, pos, vel, player);
  }

}

export class Tornado extends Weapon {

  constructor() {
    super();
    this.shootSounds = ["tornado", "tornado", "tornado", "tornado"];
    this.index = 5;
    this.speed = 400;
    this.rateOfFire = 1.5;
    this.palette = game.palettes["tornado"];
  }

  getProjectile(pos: Point, xDir: number, player: Player, chargeLevel: number) {
    let vel = new Point(xDir * this.speed, 0);
    new TornadoProj(this, pos, vel, player);
  }
 
}

export class ElectricSpark extends Weapon {

  constructor() {
    super();
    this.shootSounds = ["electricSpark", "electricSpark", "electricSpark", "electricSpark"];
    this.index = 6;
    this.speed = 150;
    this.rateOfFire = 0.5;
    this.palette = game.palettes["electric_spark"];
  }

  getProjectile(pos: Point, xDir: number, player: Player, chargeLevel: number) {
    if(chargeLevel === 0) {
      let vel = new Point(xDir * this.speed, 0);
      new ElectricSparkProj(this, pos, vel, player, 0);
    }
    else {
      new ElectricSparkProjCharged(this, pos.addxy(-1, 0), player, -1);
      new ElectricSparkProjCharged(this, pos.addxy(1, 0), player, 1);
    }
  }

}

export class Boomerang extends Weapon {

  constructor() {
    super();
    this.shootSounds = ["boomerang", "boomerang", "boomerang", "boomerang"];
    this.index = 7;
    this.speed = 250;
    this.rateOfFire = 0.5;
    this.palette = game.palettes["boomerang"];
  }

  getProjectile(pos: Point, xDir: number, player: Player, chargeLevel: number) {
    let vel = new Point(xDir * this.speed, 0);
    new BoomerangProj(this, pos, vel, player);
  }

}

export class ShotgunIce extends Weapon {

  constructor() {
    super();
    this.shootSounds = ["buster", "buster", "buster", "buster"];
    this.index = 8;
    this.speed = 400;
    this.rateOfFire = 0.75;
    this.palette = game.palettes["shotgun_ice"];
  }

  getProjectile(pos: Point, xDir: number, player: Player, chargeLevel: number) {
    let vel = new Point(xDir * this.speed, 0);
    new ShotgunIceProj(this, pos, vel, player, 0);
  }

}