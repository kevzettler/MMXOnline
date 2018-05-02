import { Character } from "./character";
import { Weapon, Buster, Torpedo } from "./weapon";

export class Player {
  
  input: { [name: string]: boolean; };
  inputPressed: { [name: string]: boolean };
  inputMapping: { [code: number]: string }; //Map game keycodes (i.e. "jump", "shoot" to js keycodes)
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
      //this.inputMapping[65] = "shoot";
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

  get weapon() {
    return this.weapons[this.weaponIndex];
  }

  onKeyDown(keycode: number) {
    if(this.isAI) return;
    let key = this.inputMapping[keycode];
    if(!this.input[key]) this.inputPressed[key] = true;
    this.input[key] = true;
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

}