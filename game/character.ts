import { Actor } from "./actor";
import { Sprite } from "./sprite";
import { game } from "./game";
import { Point } from "./point";
import { Player } from "./player";
import { Collider } from "./collider";
import { Rect } from "./rect";

export class Character extends Actor {

  charState: CharState;
  player: Player;
  runSpeed: number;

  constructor(player: Player, x: number, y: number) {
    super();
    this.pos.x = x;
    this.pos.y = y;
    this.player = player;
    let rect = new Rect(0, 0, 24, 34);
    this.globalCollider = new Collider(rect.getPoints());
    this.changeState(new Idle());
    this.runSpeed = 100;
  }

  update() {
    this.charState.update();
    super.update();
  }

  changeState(newState: CharState) {
    newState.character = this;
    this.changeSprite(newState.sprite, false);
    this.charState = newState;
  }

  render() {
    super.render();
  }

}

class CharState {

  sprite: Sprite;
  busterOffset: Point;
  character: Character;

  constructor(sprite: Sprite) {
    this.sprite = sprite;
  }

  get player() {
    return this.character.player;
  }

  update() {}

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
    super(game.sprites["mmx_idle"]);
  }

  update() {
    if(this.player.input["left"] || this.player.input["right"]) {
      this.character.changeState(new Run());
    }
    this.groundCode();
  }

}

class Run extends CharState {

  constructor() {
    super(game.sprites["mmx_run"]);
  }

  update() {
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
    super(game.sprites["mmx_jump"]);
  }

  update() {
    this.airCode();
    if(this.character.vel.y > 0) {
      this.character.changeState(new Fall());
    }
  }

}

class Fall extends CharState {

  constructor() {
    super(game.sprites["mmx_fall"]);
  }

  update() {
    this.airCode();
  }

}