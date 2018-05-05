import { Character } from "./character";
import { Weapon, Buster, Torpedo } from "./weapon";
import { game } from "./game";

export class Player {
  
  input: { [name: string]: boolean; };
  inputPressed: { [name: string]: boolean };
  inputMapping: { [code: number]: string }; //Map game keycodes (i.e. "jump", "shoot" to js keycodes)
  buttonMapping: { [code: number]: string } = {};
  axesMapping: { [code: number]: string } = {};
  character: Character;
  isAI: boolean;
  alliance: number;
  health: number;
  maxHealth: number;
  weapons: Weapon[];
  weaponIndex: number;

  constructor(x: number, y: number, isAI: boolean, alliance: number) {
    this.alliance = alliance;
    this.isAI = isAI;
    this.input = {};
    this.inputPressed = {};
    if(!isAI) {
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
    }

    if(alliance === 1) {
      this.inputMapping = {};
      this.inputMapping[100] = "left";
      this.inputMapping[102] = "right";
      this.inputMapping[104] = "up";
      this.inputMapping[101] = "down";
      this.inputMapping[13] = "dash";
      this.inputMapping[96] = "jump";
      this.inputMapping[97] = "shoot";
      this.inputMapping[103] = "weaponleft";
      this.inputMapping[105] = "weaponright";
    }

    this.character = new Character(this, x, y);
    this.health = 32;
    this.maxHealth = this.health;
    this.weapons = [
      new Buster(),
      new Torpedo()
    ];
    this.weaponIndex = 0;
  }

  setButtonMapping(controllerName: string) {
    if(controllerName === "Xbox 360 Controller (XInput STANDARD GAMEPAD)") {
      this.buttonMapping[100] = "left";
      this.buttonMapping[102] = "right";
      this.buttonMapping[104] = "up";
      this.buttonMapping[101] = "down";
      this.buttonMapping[1] = "dash";
      this.buttonMapping[0] = "jump";
      this.buttonMapping[2] = "shoot";
      this.buttonMapping[7] = "weaponleft";
      this.buttonMapping[8] = "weaponright";

      this.axesMapping[0] = "left|right";
      this.axesMapping[1] = "up|down";
    }
  }

  get weapon() {
    return this.weapons[this.weaponIndex];
  }

  setAxes(axes: number, value: number) {
    if(this.isAI) return;
    let key = this.axesMapping[axes];
    if(!key) return;
    let key1 = key.split("|")[1];
    let key2 = key.split("|")[0];

    if(value > 0.2) {
      if(!this.input[key1]) this.inputPressed[key1] = true;
      this.input[key1] = true;
      this.inputPressed[key2] = false;
      this.input[key2] = false;
    }
    else if(value < -0.2) {
      if(!this.input[key2]) this.inputPressed[key2] = true;
      this.input[key2] = true;
      this.inputPressed[key1] = false;
      this.input[key1] = false;
    }
    else {
      this.inputPressed[key1] = false;
      this.input[key1] = false;
      this.inputPressed[key2] = false;
      this.input[key2] = false;
    }

  }

  onButtonDown(button: number) {
    if(this.isAI) return;
    let key = this.buttonMapping[button];
    if(!this.input[key]) this.inputPressed[key] = true;
    this.input[key] = true;
  }

  onButtonUp(button: number) {
    if(this.isAI) return;
    let key = this.buttonMapping[button];
    this.input[key] = false;
    this.inputPressed[key] = false;
  }

  onKeyDown(keycode: number) {
    if(this.isAI) return;
    let key = this.inputMapping[keycode];
    if(!this.input[key]) this.inputPressed[key] = true;
    this.input[key] = true;

    if(keycode === 49) {
      for(let player of game.level.localPlayers) {
        player.health = 1;
      }
    }

  }

  onKeyUp(keycode: number) {
    if(this.isAI) return;
    let key = this.inputMapping[keycode];
    this.input[key] = false;
    this.inputPressed[key] = false;
  }

  clearInputPressed() {
    this.inputPressed = {};
  }

  destroyCharacter() {
    this.character.destroySelf();
    this.character = undefined;
  }

}