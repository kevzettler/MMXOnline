import { Actor } from "./actor";
import { Sprite } from "./sprite";
import { game } from "./game";
import { Point } from "./point";
import { Player } from "./player";
import { Collider } from "./collider";
import { Rect } from "./rect";
import { Projectile } from "./projectile";

export class Character extends Actor {

  charState: CharState;
  player: Player;
  runSpeed: number;
  isShooting: boolean;
  shootTime: number;
  health: number;
  maxHealth: number;

  constructor(player: Player, x: number, y: number) {
    super();
    this.pos.x = x;
    this.pos.y = y;
    this.player = player;
    let rect = new Rect(0, 0, 24, 34);
    this.globalCollider = new Collider(rect.getPoints(), false, this);
    this.changeState(new Idle());
    this.runSpeed = 100;
    this.health = 100;
    this.maxHealth = this.health;
  }

  update() {
    this.charState.update();
    super.update();
    if(this.isShooting) {
      this.shootTime += game.deltaTime;
      if(this.shootTime > 0.2) {
        this.stopShoot();
      }
    }
  }

  getShootPos() {
    let busterOffset = this.currentFrame.getBusterOffset().clone();
    busterOffset.x *= this.xDir;
    return this.pos.add(busterOffset);
  }

  shoot() {
    if(!this.isShooting) {
      this.isShooting = true;
      this.shootTime = 0;
      this.changeSprite(this.charState.shootSprite, false);
      let vel = new Point(350 * this.xDir, 0);
      let proj = new Projectile(this.getShootPos(), vel, 1, this.player, game.sprites["buster1"]);
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
    newState.character = this;
    if(!this.isShooting || !newState.canShoot) {
      this.changeSprite(newState.sprite, true);
    }
    else { 
      this.changeSprite(newState.shootSprite, true);
    }
    this.charState = newState;
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
    console.log("APPLYING DAMAGE");
    this.health -= damage;
  }

}

class CharState {

  sprite: Sprite;
  shootSprite: Sprite;
  busterOffset: Point;
  character: Character;

  constructor(sprite: Sprite, shootSprite?: Sprite) {
    this.sprite = sprite;
    this.shootSprite = shootSprite;
  }

  get canShoot(): boolean {
    return !!this.shootSprite;
  }

  get player() {
    return this.character.player;
  }

  update() {
    if(this.canShoot) {
      if(this.player.input["shoot"]) {
        this.character.shoot();
      }
    }
  }

  airCode() {
    if(this.character.grounded) {
      this.character.changeState(new Idle());
      return;
    }
    let move = new Point(0, 0);
    if(this.player.input["left"]) {
      move.x = -this.character.runSpeed;
      this.character.xDir = -1;
    }
    else if(this.player.input["right"]) {
      move.x = this.character.runSpeed;
      this.character.xDir = 1;
    }
    if(move.magnitude > 0) {
      this.character.move(move);
    }
  }

  groundCode() {
    if(!this.character.grounded) {
      this.character.changeState(new Fall());
    }
    else if(this.player.input["jump"]) {
      this.character.vel.y = -400;
      this.character.changeState(new Jump());
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
  }

}

class Jump extends CharState {

  constructor() {
    super(game.sprites["mmx_jump"], game.sprites["mmx_jump_shoot"]);
  }

  update() {
    super.update();
    this.airCode();
    if(this.character.vel.y > 0) {
      this.character.changeState(new Fall());
    }
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