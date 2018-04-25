import { Sprite } from "./sprite";
import { Level } from "./level";
import { spriteJsons } from "../sprites";
import { levelJsons } from "../levels";

class Game {

  sprites: { [name: string]: Sprite; };
  levels: { [name: string]: Level };
  level: Level;

  spritesheets: { [path: string]: HTMLImageElement };
  backgrounds: { [path: string]: HTMLImageElement };

  isServer: boolean;
  isClient: boolean;

  showHitboxes: boolean;

  canvas: HTMLCanvasElement;
  ctx: CanvasRenderingContext2D;

  constructor() {
    this.sprites = {};
    this.levels = {};
  
    this.spritesheets = { };
    this.backgrounds = { };
  
    this.isServer = false;
    this.isClient = true;
  
    this.showHitboxes = true;
  
    this.canvas = <HTMLCanvasElement>$("#canvas")[0];
    this.ctx = this.canvas.getContext("2d");
  }

  start() {
    this.loadSprites();
    this.loadLevels();
    this.level = this.levels["new_level"];
    window.setInterval(() => this.gameLoop(), 1000/60);
  }

  getSpritesheet(path: string) {
    if(!this.spritesheets[path]) {
      this.spritesheets[path] = document.createElement("img");
      this.spritesheets[path].src = path;
    }
    return this.spritesheets[path];
  }

  getBackground(path: string) {
    if(!this.backgrounds[path]) {
      this.backgrounds[path] = document.createElement("img");
      this.backgrounds[path].src = path;
    }
    return this.backgrounds[path];
  }

  loadSprites() {
    for(var spriteJson of spriteJsons) {
      let sprite: Sprite = new Sprite(spriteJson);
      this.sprites[sprite.name] = sprite;
    }
  }

  loadLevels() {
    for(var levelJson of levelJsons) {
      let level: Level = new Level(levelJson);
      this.levels[level.name] = level;
    }
  }

  isLoaded() {
    for(let name in this.sprites) {
      if(!this.sprites[name].spritesheet.complete) {
        return false;
      }
    }
    for(let name in this.levels) {
      if(!this.levels[name].background.complete) {
        return false;
      }
    }
    return true;
  }

  //Main game loop
  gameLoop() {
    if(this.isLoaded()) {
      this.level.update();
      this.level.render();
    }
  }

}

let game: Game = new Game();
export {game};