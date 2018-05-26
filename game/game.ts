import { Sprite } from "./sprite";
import { Level } from "./level";
import { spriteJsons } from "./sprites";
import { levelJsons } from "./levels";
import { Player } from "./player";
import { Palette } from "./color";
import * as Helpers from "./helpers";
import * as Tests from "./tests";

class Options {
  showHitboxes: boolean = false;
  alwaysFlinch: boolean = false;
  invulnFrames: boolean = false;
  antiAlias: boolean = false;
  playMusic: boolean = false;
  constructor() { }
}

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

  options: Options;

  canvas: HTMLCanvasElement;
  ctx: CanvasRenderingContext2D;

  startTime: number = 0;
  deltaTime: number = 0;
  time: number = 0;
  interval: number = 0;

  requestId: number = 0;

  soundSheet: Howl;
  soundSheetLoaded: boolean = false;

  constructor() {
    this.canvas = <HTMLCanvasElement>$("#canvas")[0];
    this.ctx = this.canvas.getContext("2d");

    Helpers.noCanvasSmoothing(this.ctx);
  }

  start() {

    window.onerror = function(error) {
      console.error(error);
    }

    let optionString = localStorage.getItem("options");
    if(optionString) {
      this.options = JSON.parse(optionString);
    }
    else {
      this.options = new Options();
    }
    
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

    this.soundSheet = new Howl({
      src: ["assets/soundsheets/mmx_sfx.mp3"],
      sprite: {
        buster: [900,1425-900],
        buster2: [17461,18220-17461],
        buster3: [4761,5950-4761],
        buster4: [19429,20423-19429],
        rollingShield: [180000 + 12411, 394],
        electricSpark: [180000 + 16554, 919],
        tornado: [180000 + 7359, 2962],
        boomerang: [180000 + 5766, 1190],
        fireWave: [180000 + 4404, 478],
      },
      onload: () => {
        this.soundSheetLoaded = true;
      }
    });

    this.interval = window.setInterval(() => this.onLoad(), 1);
  }

  onLoad() {
    if(this.isLoaded()) {
      //console.log("LOADED");
      window.clearInterval(this.interval);
      
      this.loadLevel("powerplant");

      let music = new Howl({
        src: ["assets/music/" + this.level.levelMusic],
        sprite: {
          musicStart: [0, this.level.musicLoopStart],
          musicLoop: [this.level.musicLoopStart, this.level.musicLoopEnd - this.level.musicLoopStart]
        },
        onload: () => {
        }
      });
      if(this.options.playMusic) {
        window.setTimeout(
          () => {
            music.play("musicStart");
            music.on("end", function() {
              console.log("Loop");
              music.play("musicLoop");
            });
          },
          1000);
      }
    }
    else {
      //console.log("LOADING...");
    }
  }

  startVue() {

    let options = this.options;

    // @ts-ignore
    var app1 = new Vue({
      el: '#app',
      data: {
        options: options
      },
      methods: {
        onChange() {
          localStorage.setItem("options", JSON.stringify(this.options));
        }
      }
    });
  }

  test() {
    Tests.runAllTests();
  }

  restartLevelName: string = "";
  restartLevel(name: string) {
    console.log("RESET");
    this.restartLevelName = name;
  }

  doRestart() {
    //cancelAnimationFrame(this.requestId);
    let name = this.restartLevelName;
    this.restartLevelName = "";
    this.loadLevel(name);
  }

  loadLevel(name: string) {

    let level = this.levels[name];
    ///@ts-ignore
    this.level = _.cloneDeep(level);
    this.level.background = level.background;

    //50,193
    //210,193
    let player1: Player = new Player(this.level.spawnPoints[0].point.x, this.level.spawnPoints[0].point.y, false, 0);
    this.level.players.push(player1);
    this.level.localPlayers.push(player1);
    this.level.mainPlayer = player1;

    let cpu1: Player = new Player(this.level.spawnPoints[1].point.x, this.level.spawnPoints[1].point.y, false, 1);
    cpu1.character.palette = this.palettes["red"];
    cpu1.character.xDir = -1;
    cpu1.palette = cpu1.character.palette;
    this.level.players.push(cpu1);
    this.level.localPlayers.push(cpu1);
    
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

    this.gameLoop(0);
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
    if(!this.soundSheetLoaded) return false;
    return true;
  }

  //Main game loop
  gameLoop(currentTime: number) {
    this.deltaTime = (currentTime - this.startTime) /1000;
    this.time += this.deltaTime;
    if(Math.abs(this.deltaTime) > 1/30) this.deltaTime = 1/30;
    this.level.update();
    this.startTime = currentTime;
    if(this.restartLevelName !== "") {
      this.doRestart();
    }
    else {
      this.requestId = window.requestAnimationFrame((currentTime) => this.gameLoop(currentTime));
    }
  }

  get fps() {
    return Math.round(1 / this.deltaTime);
  }

  playSound(clip: string) {
    if(this.sounds[clip]) {
      return this.sounds[clip].play();
    }
    else {
      return this.soundSheet.play(clip);
    }
  }

}

let game: Game = new Game();
export {game};