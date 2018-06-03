import { Sprite } from "./sprite";
import { Level } from "./level";
import { spriteJsons } from "./sprites";
import { levelJsons } from "./levels";
import { Player } from "./player";
import { Palette } from "./color";
import * as Helpers from "./helpers";
import * as Tests from "./tests";
import { Point } from "./point";
import { GameMode, Brawl, FFADeathMatch } from "./gameMode";

class Options {
  showHitboxes: boolean = false;
  alwaysFlinch: boolean = false;
  invulnFrames: boolean = false;
  antiAlias: boolean = false;
  playMusic: boolean = false;
  constructor() { }
}

enum Menu {
  None,
  Loading,
  NameSelect,
  MainMenu,
  BrawlMenu,
  ArenaMenu
}

class UIData {
  playerName: string = "Player 1";
  menu: Menu;
  isBrawl: boolean = false;
  brawlMaps: string[] = ["sm_bossroom"];
  arenaMaps: string[] = ["powerplant"];
  selectedBrawlMap: string = this.brawlMaps[0];
  selectedArenaMap: string = this.arenaMaps[0];
  gameModes: string[] = ["deathmatch"];
  selectedGameMode: string = this.gameModes[0];
  maxPlayers: number = 7;
  numBots: number = 7;
  playTo: number = 20;
  isPlayer1CPU: boolean = false;
  isPlayer2CPU: boolean = false;
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

  music: Howl;

  isServer: boolean = false;
  isClient: boolean = true;

  options: Options;
  uiData: UIData;

  canvas: HTMLCanvasElement;
  ctx: CanvasRenderingContext2D;

  startTime: number = 0;
  deltaTime: number = 0;
  time: number = 0;
  interval: number = 0;

  requestId: number = 0;

  soundSheet: Howl;
  soundSheetLoaded: boolean = false;

  defaultCanvasWidth: number;
  defaultCanvasHeight: number;

  uiEl: HTMLDivElement;
  ui: any;

  constructor() {
    this.canvas = <HTMLCanvasElement>$("#canvas")[0];
    this.ctx = this.canvas.getContext("2d");

    this.uiEl = <HTMLDivElement>$("#ui")[0];

    this.defaultCanvasWidth = this.canvas.width;
    this.defaultCanvasHeight = this.canvas.height;

    Helpers.noCanvasSmoothing(this.ctx);
  }

  start() {

    //window.onerror = function(error) {
    //  console.error(error);
    //}

    let optionString = localStorage.getItem("options");
    if(optionString) {
      this.options = JSON.parse(optionString);
    }
    else {
      this.options = new Options();
    }
    
    let options = this.options;

    // @ts-ignore
    var devOptions = new Vue({
      el: '#dev-options',
      data: {
        options: options
      },
      methods: {
        onChange() {
          localStorage.setItem("options", JSON.stringify(this.options));
        }
      }
    });

    this.uiData = new UIData();
    this.uiData.menu = Menu.Loading;
    let game = this;

    //@ts-ignore
    this.ui = new Vue({
      el: '#ui',
      data: {
        uiData: this.uiData
      },
      methods: {
        submitName: function() {
          this.uiData.menu = Menu.MainMenu;
        },
        goTo1v1: function() {
          this.uiData.isBrawl = true;
          this.uiData.menu = Menu.BrawlMenu;
        },
        goToArena: function() {
          this.uiData.isBrawl = false;
          this.uiData.menu = Menu.ArenaMenu;
        },
        goToBattle: function(selectedMap: any) {
          this.uiData.menu = Menu.None;
          $("#dev-options").show();
          game.loadLevel(selectedMap);
        },
        goToMainMenu: function() {
          this.uiData.menu = Menu.MainMenu;
        },
        isBrawlReady: function() {
          return this.uiData.selectedBrawlMap !== "";
        },
        isArenaReady: function() {
          return this.uiData.selectedArenaMap !== "";
        }
      }
    });

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
      
      //this.loadLevel("powerplant");
      
      let name = localStorage.getItem("playerName");
      if(!name) {
        this.uiData.menu = Menu.NameSelect;
      }
      else {
        this.uiData.playerName = name;
        this.uiData.menu = Menu.MainMenu;
      }
      this.refreshUI();
    }
    else {
      //console.log("LOADING...");
    }
  }

  refreshUI() {
    this.ui.$forceUpdate();
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

    if(!level) {
      throw "Bad level";
    }

    ///@ts-ignore
    this.level = _.cloneDeep(level);
    this.level.background = level.background;

    let player1 = undefined;
    let player2 = undefined;
    if(!(this.uiData.isBrawl && this.uiData.isPlayer1CPU)) {
      player1 = new Player(game.uiData.playerName, false, 0, 32);
    }
    if(this.uiData.isBrawl && !this.uiData.isPlayer2CPU) {
      player2 = new Player(game.uiData.playerName, false, 1, 32, this.palettes["red"]);
    }

    let numBots = this.uiData.numBots;
    if(this.uiData.isBrawl) {
      numBots = 0;
      numBots += (player1 === undefined ? 1 : 0);
      numBots += (player2 === undefined ? 1 : 0);
    }

    let gameMode;
    if(this.uiData.isBrawl) {
      gameMode = new Brawl(this.level);
    }
    else {
      gameMode = new FFADeathMatch(this.level, game.uiData.playTo);
    }

    $(this.canvas).show();
    this.level.startLevel(numBots, numBots, gameMode, player1, player2);

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
    this.palettes["boomerang"] = new Palette("assets/palettes/boomerang.png");
    this.palettes["electric_spark"] = new Palette("assets/palettes/electric_spark.png");
    this.palettes["fire_wave"] = new Palette("assets/palettes/fire_wave.png");
    this.palettes["rolling_shield"] = new Palette("assets/palettes/rolling_shield.png");
    this.palettes["shotgun_ice"] = new Palette("assets/palettes/shotgun_ice.png");
    this.palettes["sting"] = new Palette("assets/palettes/sting.png");
    this.palettes["tornado"] = new Palette("assets/palettes/tornado.png");
    this.palettes["torpedo"] = new Palette("assets/palettes/torpedo.png");
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

  playSound(clip: string, volume: number) {
    if(this.sounds[clip]) {
      let id = this.sounds[clip].play();
      this.sounds[clip].volume(volume, id);
    }
    else {
      let id = this.soundSheet.play(clip);
      this.soundSheet.volume(volume, id);
    }
  }
  
}

let game: Game = new Game();
export {game};