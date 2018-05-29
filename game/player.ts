import { Character } from "./character";
import { Weapon, Buster, Torpedo, Sting, RollingShield, ShotgunIce, FireWave, Tornado, Boomerang, ElectricSpark } from "./weapon";
import { game } from "./game";
import { Palette } from "./color";
import { ElectricSparkProj } from "./projectile";
import * as Helpers from "./helpers";
import { cheat } from "./cheats";

export class Player {
  
  input: { [name: string]: boolean; } = {};
  inputPressed: { [name: string]: boolean } = {};

  controllerInput: { [name: string]: boolean; } = {};
  controllerInputPressed: { [name: string]: boolean } = {};

  inputMapping: { [code: number]: string } = {}; //Map game keycodes (i.e. "jump", "shoot" to js keycodes)
  buttonMapping: { [code: number]: string } = {};
  axesMapping: { [code: number]: string } = {};
  name: string;
  character: Character;
  alliance: number;
  health: number;
  maxHealth: number;
  weapons: Weapon[];
  weaponIndex: number;
  palette: Palette;
  id: number;
  isAI: boolean;
  respawnTime: number = 0;
  kills: number = 0;
  deaths: number = 0;
  won: boolean = false;

  constructor(name: string, isAI: boolean, alliance: number, maxHealth: number, palette?: Palette) {
    this.name = name;
    this.alliance = alliance;
    this.id = Helpers.getAutoIncId();
    this.isAI = isAI;
    this.palette = palette;

    if(!isAI && alliance === 0) {
      this.inputMapping[37] = "left";
      this.inputMapping[39] = "right";
      this.inputMapping[38] = "up";
      this.inputMapping[40] = "down";
      this.inputMapping[90] = "dash";
      this.inputMapping[88] = "jump";
      this.inputMapping[67] = "shoot";
      this.inputMapping[65] = "weaponleft";
      this.inputMapping[83] = "weaponright";
      this.inputMapping[27] = "reset";
      this.inputMapping[9] = "scoreboard";
      this.inputMapping[49] = "weapon1";  
      this.inputMapping[50] = "weapon2";
      this.inputMapping[51] = "weapon3";
      this.inputMapping[52] = "weapon4";
      this.inputMapping[53] = "weapon5";
      this.inputMapping[54] = "weapon6";
      this.inputMapping[55] = "weapon7";
      this.inputMapping[56] = "weapon8";
      this.inputMapping[57] = "weapon9";
    }

    if(!isAI && alliance === 1) {
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

    this.health = maxHealth;
    this.maxHealth = maxHealth;
    this.weapons = [
      new Buster(),
      new Torpedo(),
      new Sting(),
      new RollingShield(),
      new FireWave(),
      new Tornado(),
      new ElectricSpark(),
      new Boomerang(),
      new ShotgunIce()
    ];
    this.weaponIndex = 0;
  }

  update() {
    if(this.respawnTime === 0 && !this.character) {
      this.health = this.maxHealth;
      for(let weapon of this.weapons) {
        weapon.ammo = weapon.maxAmmo;
      }
      let spawnPoint = game.level.getSpawnPoint();
      this.character = new Character(this, spawnPoint.pos.x, spawnPoint.pos.y);
      if(this.isAI) {
        this.character.addAI();
      }
      this.character.palette = this.palette;
      this.character.changePaletteWeapon();
      this.character.xDir = -1;
    }
    if(this.respawnTime > 0) {
      this.respawnTime = Helpers.clampMin0(this.respawnTime - game.deltaTime);
    }
  }

  get canControl() {
    if(game.level.isOver) {
      return false;
    }
    return true;
  }

  isPressed(keyName: string, checkIfCanControl: boolean = true) {
    if(checkIfCanControl && !this.canControl) return false;
    return this.inputPressed[keyName] || this.controllerInputPressed[keyName];
  }

  isHeld(keyName: string, checkIfCanControl: boolean = true) {
    if(checkIfCanControl && !this.canControl) return false;
    return this.input[keyName] || this.controllerInput[keyName];
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
      this.buttonMapping[4] = "weaponleft";
      this.buttonMapping[5] = "weaponright";

      this.axesMapping[0] = "left|right";
      this.axesMapping[1] = "up|down";

      this.buttonMapping[8] = "scoreboard";
    }
    else if(controllerName === "USB GamePad (Vendor: 0e8f Product: 3013)") {
      this.buttonMapping[1] = "dash";
      this.buttonMapping[2] = "jump";
      this.buttonMapping[3] = "shoot";
      this.buttonMapping[6] = "weaponleft";
      this.buttonMapping[7] = "weaponright";
      this.buttonMapping[8] = "reset";
      
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
      if(!this.controllerInput[key1]) this.controllerInputPressed[key1] = true;
      this.controllerInput[key1] = true;
      this.controllerInputPressed[key2] = false;
      this.controllerInput[key2] = false;
    }
    else if(value < -0.2) {
      if(!this.controllerInput[key2]) this.controllerInputPressed[key2] = true;
      this.controllerInput[key2] = true;
      this.controllerInputPressed[key1] = false;
      this.controllerInput[key1] = false;
    }
    else {
      this.controllerInputPressed[key1] = false;
      this.controllerInput[key1] = false;
      this.controllerInputPressed[key2] = false;
      this.controllerInput[key2] = false;
    }

  }

  onButtonDown(button: number) {
    if(this.isAI) return;
    let key = this.buttonMapping[button];
    if(!this.controllerInput[key]) this.controllerInputPressed[key] = true;
    this.controllerInput[key] = true;
    if(key === "reset") {
      game.restartLevel("sm_bossroom");
      return;
    }
  }

  onButtonUp(button: number) {
    if(this.isAI) return;
    let key = this.buttonMapping[button];
    this.controllerInput[key] = false;
    this.controllerInputPressed[key] = false;
  }

  press(key: string) {
    if(!this.input[key]) this.inputPressed[key] = true;
    this.input[key] = true;
  }

  release(key: string) {
    this.input[key] = false;
    this.inputPressed[key] = false;
  }

  onKeyDown(keycode: number) {
    if(this.isAI) return;
    let key = this.inputMapping[keycode];
    if(!this.input[key]) this.inputPressed[key] = true;
    this.input[key] = true;

    cheat(key, keycode);

  }

  onKeyUp(keycode: number) {
    if(this.isAI) return;
    let key = this.inputMapping[keycode];
    this.input[key] = false;
    this.inputPressed[key] = false;
  }

  clearInputPressed() {
    this.inputPressed = {};
    this.controllerInputPressed = {};
  }

  clearAiInput() {
    this.input = {};
    this.controllerInputPressed = {};
  }

  destroyCharacter() {
    this.respawnTime = 5;
    this.character.destroySelf();
    this.character = undefined;
  }

}