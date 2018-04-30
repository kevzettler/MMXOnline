import { Sprite } from "./sprite";
import { Level } from "./level";
import { spriteJsons } from "./sprites";
import { levelJsons } from "./levels";
import { Player } from "./player";

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

  startTime: number = Date.now();
  deltaTime: number = 1/60;

  constructor() {
    this.sprites = {};
    this.levels = {};
  
    this.spritesheets = { };
    this.backgrounds = { };
  
    this.isServer = false;
    this.isClient = true;
  
    this.showHitboxes = false;
  
    this.canvas = <HTMLCanvasElement>$("#canvas")[0];
    this.ctx = this.canvas.getContext("2d");

    this.ctx.webkitImageSmoothingEnabled = false;
    this.ctx.mozImageSmoothingEnabled = false;
    this.ctx.imageSmoothingEnabled = false; /// future
  }

  start() {
    this.loadSprites();
    this.loadLevels();
    this.loadLevel("sm_bossroom");
  }

  startVue() {
    // @ts-ignore
    var app1 = new Vue({
      el: '#app',
      data: {
        showHitboxes: true
      },
      methods: {
        onHitboxCheckChange() {
          game.showHitboxes = this.showHitboxes;
        }
      }
    });
  }

  loadLevel(name: string) {

    this.level = this.levels[name];

    let player1: Player = new Player(60, 100, false, 0);
    let cpu1: Player = new Player(200, 100, false, 1);
    this.level.localPlayers.push(player1);
    this.level.localPlayers.push(cpu1);
    this.level.mainPlayer = player1;
   
    document.onkeydown = (e) => {
      for(let player of this.level.localPlayers) {
        player.onKeyDown(e.keyCode);
    }
    }

    document.onkeyup = (e) => {
      for(let player of this.level.localPlayers) {
        player.onKeyUp(e.keyCode);
      }
    }

    this.gameLoop();

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
      this.deltaTime = (Date.now() - this.startTime) /1000;
    
      this.level.update();

      //console.log(this.deltaTime);
      this.startTime = Date.now();
    }
    window.requestAnimationFrame(() => this.gameLoop());
  }

}

let game: Game = new Game();
export {game};