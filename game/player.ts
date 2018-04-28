import { Character } from "./character";

export class Player {
  
  input: { [name: string]: boolean; };
  inputMapping: { [code: number]: string }; //Map game keycodes (i.e. "jump", "shoot" to js keycodes)
  character: Character;

  constructor() {
    this.input = {};
    this.inputMapping = {};
    this.inputMapping[37] = "left";
    this.inputMapping[39] = "right";
    this.inputMapping[38] = "up";
    this.inputMapping[40] = "down";
    this.inputMapping[90] = "dash";
    this.inputMapping[88] = "jump";
    this.inputMapping[67] = "shoot";
    this.inputMapping[65] = "weaponleft";
    this.inputMapping[83] = "weaponright";
    this.character = new Character(this, 200, 100);
  }

  onKeyDown(keycode: number) {
    let key = this.inputMapping[keycode];
    this.input[key] = true;
  }

  onKeyUp(keycode: number) {
    let key = this.inputMapping[keycode];
    this.input[key] = false;
  }

}