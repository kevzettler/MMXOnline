import { Sprite } from "./sprite";
import { Level } from "./level";
import { spriteJsons } from "./sprites";
import { levelJsons } from "./levels";
import { Player } from "./player";
import { Palette } from "./color";

class Game {

  sprites: { [name: string]: Sprite; } = {};
  levels: { [name: string]: Level } = {};
  level: Level;

  spritesheets: { [path: string]: HTMLImageElement } = {};
  backgrounds: { [path: string]: HTMLImageElement } = {};
  sounds: { [path: string]: Howl } = {};
  soundLoadCount: number = 0;
  palettes: { [path: string]: Palette } = {};

  isServer: boolean = false;
  isClient: boolean = true;

  showHitboxes: boolean = false;

  canvas: HTMLCanvasElement;
  ctx: CanvasRenderingContext2D;

  startTime: number = 0;
  deltaTime: number = 0;
  interval: number = 0;

  constructor() {
    this.canvas = <HTMLCanvasElement>$("#canvas")[0];
    this.ctx = this.canvas.getContext("2d");

    this.ctx.webkitImageSmoothingEnabled = false;
    this.ctx.mozImageSmoothingEnabled = false;
    this.ctx.imageSmoothingEnabled = false; /// future
  }

  start() {
    this.loadSprites();
    this.loadLevels();
    this.loadPalettes();
    
    for(let soundFile of soundFiles) {
      let sound = new Howl({
        src: ["assets/sounds/" + soundFile],
        onload: () => {
          //console.log("LOADED SOUND");
          this.soundLoadCount++;
        }
      });
      this.sounds[soundFile.split(".")[0]] = sound;
    }

    let music = new Howl({
      src: ["assets/music/BossBattle.mp3"],
      sprite: {
        musicStart: [0, 1.5 * 1000],
        musicLoop: [1.5 * 1000, 29.664 * 1000 - 1.5 * 1000]
      },
      onload: () => {
      }
    });
    music.play("musicStart")
    music.on("end", function() {
      console.log("Loop");
      music.play("musicLoop");
    })

    this.interval = window.setInterval(() => this.onLoad(), 1);
  }

  onLoad() {
    if(this.isLoaded()) {
      //console.log("LOADED");
      window.clearInterval(this.interval);
      
      this.loadLevel("sm_bossroom");
      this.gameLoop(0);
    }
    else {
      //console.log("LOADING...");
    }
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
    let cpu1: Player = new Player(200, 100, true, 1);
    cpu1.character.palette = this.palettes["red"];
    this.level.players.push(player1);
    this.level.players.push(cpu1);
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

  loadPalettes() {
    this.palettes["red"] = new Palette("assets/palettes/red.png");
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
    for(let name in this.palettes) {
      if(!this.palettes[name].imageEl.complete) {
        return false;
      }
    }
    var keys = Object.getOwnPropertyNames(this.sounds);
    if(keys.length !== this.soundLoadCount) {
      return false;
    }
    return true;
  }

  //Main game loop
  gameLoop(currentTime: number) {
    this.deltaTime = (currentTime - this.startTime) /1000;
    if(this.deltaTime > 1/30) this.deltaTime = 1/30;
    this.level.update();
    this.startTime = currentTime;
    window.requestAnimationFrame((currentTime) => this.gameLoop(currentTime));
  }

  get fps() {
    return Math.round(1 / this.deltaTime);
  }

  playSound(clip: string) {
    return this.sounds[clip].play();
  }

}

let game: Game = new Game();
export {game};