import { Actor } from "./actor";
import { Sprite } from "./sprite";
import { game } from "./game";
import { Point } from "./point";
import { Player } from "./player";
import { Collider } from "./collider";
import { Rect } from "./rect";
import { Projectile } from "./projectile";
import * as Helpers from "./helpers";
import { Weapon, Buster } from "./weapon";

export class Character extends Actor {

  charState: CharState;
  player: Player;
  runSpeed: number;
  isShooting: boolean;
  isDashing: boolean;
  shootTime: number;
  jumpPower: number;
  changedStateInFrame: boolean;
  chargeTime: number;
  charge1Time: number;
  charge2Time: number;
  charge3Time: number;
  
  constructor(player: Player, x: number, y: number) {
    super();
    this.pos.x = x;
    this.pos.y = y;
    this.player = player;
    this.isShooting = false;
    this.isDashing = false;

    let rect = new Rect(0, 0, 18, 34);
    this.globalCollider = new Collider(rect.getPoints(), false, this);
    this.changeState(new Idle());
    
    this.jumpPower = 350;
    this.runSpeed = 100;

    this.chargeTime = 0;
    this.charge1Time = 0.75;
    this.charge2Time = 1.5;
    this.charge3Time = 2.25;
  }

  preUpdate() {
    super.preUpdate();
    this.changedStateInFrame = false;
  }

  update() {
    this.charState.update();
    super.update();
    if(this.isShooting) {
      this.shootTime += game.deltaTime;
      if(this.shootTime >= this.player.weapon.rateOfFire) {
        this.stopShoot();
      }
    }
    if(this.player.inputPressed["weaponleft"]) {
      this.player.weaponIndex = Helpers.decrementRange(this.player.weaponIndex, 0, this.player.weapons.length);
    }
    else if(this.player.inputPressed["weaponright"]) {
      this.player.weaponIndex = Helpers.incrementRange(this.player.weaponIndex, 0, this.player.weapons.length);
    }
    if(this.isCharging()) {
      this.renderEffect = game.level.twoFrameCycle > 0 ? "flash" : "";
    }
  }

  isCharging() {
    return this.chargeTime >= this.charge1Time;
  }

  getDashSpeed() {
    if(this.isDashing) return 2;
    return 1;
  }

  getShootPos() {
    let busterOffset = this.currentFrame.getBusterOffset().clone();
    busterOffset.x *= this.xDir;
    return this.pos.add(busterOffset);
  }

  stopCharge() {
    this.chargeTime = 0;
    this.renderEffect = "";
  }

  shoot() {
    if(!this.isShooting) {
      this.isShooting = true;
      this.shootTime = 0;
      this.changeSprite(this.charState.shootSprite, false);
      let vel = new Point(350 * this.xDir, 0);
      if(this.charState instanceof WallSlide) vel.x *= -1;

      if(this.chargeTime < this.charge1Time) {
        this.player.weapon.shoot(this.getShootPos(), vel, this.player, 1);
      }
      else if(this.chargeTime >= this.charge1Time && this.chargeTime < this.charge2Time) {
        this.player.weapon.shoot(this.getShootPos(), vel, this.player, 2);
      }
      else if(this.chargeTime >= this.charge2Time && this.chargeTime < this.charge3Time) {
        this.player.weapon.shoot(this.getShootPos(), vel, this.player, 3);
      }
      else if(this.chargeTime >= this.charge3Time) {
        this.player.weapon.shoot(this.getShootPos(), vel, this.player, 4);
      }

    }
  }

  stopShoot() {
    if(this.isShooting) {
      this.isShooting = false;
      this.shootTime = 0;
      this.changeSprite(this.charState.sprite, false);
    }
  }

  changeState(newState: CharState) {
    if(this.charState && newState && this.charState.constructor === newState.constructor) return;
    if(this.changedStateInFrame) return;
    this.changedStateInFrame = true;
    newState.character = this;
    if(!this.isShooting || !newState.canShoot) {
      this.changeSprite(newState.sprite, true);
    }
    else { 
      this.changeSprite(newState.shootSprite, true);
    }
    let oldState = this.charState;
    if(oldState) oldState.onExit(newState);
    this.charState = newState;
    newState.onEnter(oldState);
    
    if(!newState.canShoot) {
      this.stopShoot();
    }
  }
  /*
  render() {
    super.render();
  }
  */

  applyDamage(damage: number) {
    this.player.health -= damage;
  }

}

class CharState {

  sprite: Sprite;
  shootSprite: Sprite;
  busterOffset: Point;
  character: Character;
  lastLeftWall: Collider;
  lastRightWall: Collider;
  stateTime: number;
  enterSound: string;

  constructor(sprite: Sprite, shootSprite?: Sprite) {
    this.sprite = sprite;
    this.shootSprite = shootSprite;
    this.stateTime = 0;
  }

  get canShoot(): boolean {
    return !!this.shootSprite;
  }

  get player() {
    return this.character.player;
  }

  onExit(newState: CharState) {
    //Stop the dash speed on transition to any frame except jump/fall (dash lingers in air) or dash itself
    if(!(newState instanceof Jump) && !(newState instanceof Fall) && !(newState instanceof WallKick) && !(newState instanceof Dash)) {
      this.character.isDashing = false;
    }
  }

  onEnter(oldState: CharState) {
    if(this.enterSound) game.playSound(this.enterSound);
  }

  update() {
    
    this.stateTime += game.deltaTime;
    if(this.canShoot) {
      if(this.player.inputPressed["shoot"] && this.player.weapon.ammo > 0) {
        this.character.shoot();
      }
      if(this.player.input["shoot"]) {
        this.character.chargeTime += game.deltaTime;
      }
      else {
        if(this.character.isCharging()) {
          this.character.shoot();
        }
        this.character.stopCharge();
      }
    }
    
    this.lastLeftWall = game.level.checkCollisionActor(this.character, -1, 0);
    this.lastRightWall = game.level.checkCollisionActor(this.character, 1, 0);
    
  }

  airCode() {
    if(this.character.grounded) {
      game.playSound("land");
      this.character.changeState(new Idle());
      return;
    }

    if(!this.player.input["jump"] && this.character.vel.y < 0) {
      this.character.vel.y = 0;
    }

    if(game.level.checkCollisionActor(this.character, 0, -1)) {
      this.character.vel.y = 0;
    }

    let move = new Point(0, 0);

    //Cast from base to derived
    let wallKick = (this instanceof WallKick) ? <WallKick> <any> this : null;

    if(this.player.input["left"]) {
      if(!wallKick || wallKick.kickSpeed <= 0) {
        move.x = -this.character.runSpeed * this.character.getDashSpeed();
        this.character.xDir = -1;
      }
    }
    else if(this.player.input["right"]) {
      if(!wallKick || wallKick.kickSpeed >= 0) {
        move.x = this.character.runSpeed * this.character.getDashSpeed();
        this.character.xDir = 1;
      }

    }
    if(move.magnitude > 0) {
      this.character.move(move);
    }

    //This logic can be abit confusing, but we are trying to mirror the actual Mega man X wall climb physics
    //In the actual game, X will not initiate a climb if you directly hugging a wall, jump and push in its direction UNTIL you start falling OR you move away and jump into it
    if(this.player.inputPressed["left"] || (this.player.input["left"] && (this.character.vel.y > 0 || !this.lastLeftWall))) {
      if(this.lastLeftWall) {
        this.player.character.changeState(new WallSlide(-1));
        return;
      }
    }
    else if(this.player.inputPressed["right"] || (this.player.input["right"] && (this.character.vel.y > 0 || !this.lastRightWall))) {
      if(this.lastRightWall) {
        this.player.character.changeState(new WallSlide(1));
        return;
      }
    }

  }

  groundCode() {
    if(!this.character.grounded) {
      this.character.changeState(new Fall());
      return;
    }
    else if(this.player.inputPressed["jump"]) {
      this.character.vel.y = -this.character.jumpPower;
      this.character.changeState(new Jump());
      return;
    }
  }

}

class Idle extends CharState {

  constructor() {
    super(game.sprites["mmx_idle"], game.sprites["mmx_shoot"]);
  }

  update() {
    super.update();
    if(this.player.input["left"] || this.player.input["right"]) {
      this.character.changeState(new Run());
    }
    this.groundCode();
    if(this.player.inputPressed["dash"]) {
      this.character.changeState(new Dash());
    }
  }

}

class Run extends CharState {

  constructor() {
    super(game.sprites["mmx_run"], game.sprites["mmx_run_shoot"]);
  }

  update() {
    super.update();
    let move = new Point(0, 0);
    if(this.player.input["left"]) {
      this.character.xDir = -1;
      move.x = -this.character.runSpeed;
    }
    else if(this.player.input["right"]) {
      this.character.xDir = 1;
      move.x = this.character.runSpeed;
    }
    if(move.magnitude > 0) {
      this.character.move(move);
    }
    else {
      this.character.changeState(new Idle());
    }
    this.groundCode();
    if(this.player.inputPressed["dash"]) {
      this.character.changeState(new Dash());
    }
  }

}

class Jump extends CharState {

  constructor() {
    super(game.sprites["mmx_jump"], game.sprites["mmx_jump_shoot"]);
    this.enterSound = "jump";
  }

  update() {
    super.update();
    if(this.character.vel.y > 0) {
      this.character.changeState(new Fall());
      return;
    }
    this.airCode();
  }

  onEnter(oldState: CharState) {
    super.onEnter(oldState);
  }

  onExit(newState: CharState) {
    super.onExit(newState);
  }

}

class Fall extends CharState {

  constructor() {
    super(game.sprites["mmx_fall"], game.sprites["mmx_fall_shoot"]);
  }

  update() {
    super.update();
    this.airCode();
  }

}

class Dash extends CharState {

  dashTime: number = 0;

  constructor() {
    super(game.sprites["mmx_dash"], game.sprites["mmx_dash_shoot"]);
    this.enterSound = "dash";
  }

  onEnter(oldState: CharState) {
    super.onEnter(oldState);
    this.character.isDashing = true;
  }

  update() {
    super.update();
    this.groundCode();
    if(!this.player.input["dash"]) {
      this.character.changeState(new Idle());
      return;
    }
    this.dashTime += game.deltaTime;
    if(this.dashTime > 0.5) {
      this.character.changeState(new Idle());
      return;
    }
    let move = new Point(0, 0);
    move.x = this.character.runSpeed * this.character.getDashSpeed() * this.character.xDir;
    this.character.move(move);
  }

}

class WallSlide extends CharState {
  
  wallDir: number;
  constructor(wallDir: number) {
    super(game.sprites["mmx_wall_slide"], game.sprites["mmx_wall_slide_shoot"]);
    this.wallDir = wallDir;
    this.enterSound = "land";
  }

  update() {
    super.update();
    if(this.character.grounded) {
      this.character.changeState(new Idle());
      return;
    }
    if(this.player.inputPressed["jump"]) {
      if(this.player.input["dash"]) {
        this.character.isDashing = true;
      }
      this.character.vel.y = -this.character.jumpPower;
      this.character.changeState(new WallKick(this.wallDir * -1));
      return;
    }
    this.character.useGravity = false;
    this.character.vel.y = 0;

    if(this.stateTime > 0.15) {
      let dirHeld = this.wallDir === -1 ? this.player.input["left"] : this.player.input["right"];

      if(!dirHeld || !game.level.checkCollisionActor(this.character, this.wallDir, 0)) {
        this.player.character.changeState(new Fall());
      }
      this.character.move(new Point(0, 100));
    }

  }

  onExit(newState: CharState) {
    this.character.useGravity = true;
    super.onExit(newState);
  }

}

class WallKick extends CharState {

  kickDir: number;
  kickSpeed: number;
  constructor(kickDir: number) {
    super(game.sprites["mmx_wall_kick"], game.sprites["mmx_wall_kick_shoot"]);
    this.kickDir = kickDir;
    this.kickSpeed = kickDir * 150;
    this.enterSound = "jump";
  }

  update() {
    super.update();
    if(this.character.isDashing) {
      this.kickSpeed = 0;
    }
    if(this.kickSpeed !== 0) {
      this.kickSpeed = Helpers.toZero(this.kickSpeed, 800 * game.deltaTime, this.kickDir);
      this.character.move(new Point(this.kickSpeed, 0));
    }
    this.airCode();
    if(this.character.vel.y > 0) {
      this.character.changeState(new Fall());
    }
  }

  onEnter(oldState: CharState) {
    super.onEnter(oldState);
  }

  onExit(newState: CharState) {
    super.onExit(newState);
  }

}