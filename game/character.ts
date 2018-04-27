import { Actor } from "./actor";
import { Sprite } from "./sprite";
import { game } from "./game";
import { Point } from "./point";

class Character extends Actor {

  charState: CharState;
  player: Player;

  constructor() {
    super();
    this.charState = new Idle();
  }

  update() {
    this.changeSprite(this.charState.sprite);
    this.charState.update();
    super.update();
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
    let move = new Point(0, 0);
    if(this.player.input["left"]) {
      move.x = -this.character.runSpeed;
    }
    else if(this.player.input["right"]) {
      move.x = this.character.runSpeed;
    }
    if(move.magnitude > 0) {
      this.character.move(move);
    }
  }

}

class Idle extends CharState {

  constructor() {
    super(game.sprites["megaman_idle"]);
  }

  update() {
    if(this.player.input["left"] || this.player.input["right"]) {
      this.character.changeState(new Run());
    }
  }

}

class Run extends CharState {

  constructor() {
    super(game.sprites["megaman_idle"]);
  }

  update() {
    let move = new Point(0, 0);
    if(this.player.input["left"]) {
      move.x = -this.character.runSpeed;
    }
    else if(this.player.input["right"]) {
      move.x = this.character.runSpeed;
    }
    if(move.magnitude > 0) {
      this.character.move(move);
    }
    else {
      this.character.changeState(new Idle());
    }
  }

}

class Jump extends CharState {

  constructor() {
    super(game.sprites["megaman_jump"]);
  }

  update() {
    this.airCode();
  }

}

class Fall extends CharState {

  constructor() {
    super(game.sprites["megaman_fall"]);
  }

  update() {
    this.airCode();
  }

}