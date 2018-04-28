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
    this.changeState(new Idle(this));
    this.runSpeed = 100;
  }

  update() {
    this.charState.update();

    super.update();
  }

  changeState(newState: CharState) {
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

  constructor(sprite: Sprite, character: Character) {
    this.sprite = sprite;
    this.character = character;
  }

  get player() {
    return this.character.player;
  }

  update() {}

  airCode() {
    if(this.character.grounded) {
      this.character.changeState(new Idle(this.character));
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
      this.character.changeState(new Fall(this.character));
    }
    else if(this.player.input["jump"]) {
      this.character.vel.y = -400;
      this.character.changeState(new Jump(this.character));
    }
  }

}

class Idle extends CharState {

  constructor(character: Character) {
    super(game.sprites["mmx_idle"], character);
  }

  update() {
    if(this.player.input["left"] || this.player.input["right"]) {
      this.character.changeState(new Run(this.character));
    }
    this.groundCode();
  }

}

class Run extends CharState {

  constructor(character: Character) {
    super(game.sprites["mmx_run"], character);
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
      this.character.changeState(new Idle(this.character));
    }
    this.groundCode();
  }

}

class Jump extends CharState {

  constructor(character: Character) {
    super(game.sprites["mmx_jump"], character);
  }

  update() {
    this.airCode();
  }

}

class Fall extends CharState {

  constructor(character: Character) {
    super(game.sprites["mmx_fall"], character);
  }

  update() {
    this.airCode();
  }

}