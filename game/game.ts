import { Sprite } from "./sprite";
import { Level, LevelData } from "./level";
import { spriteJsons } from "./sprites";
import { levelJsons } from "./levels";
import { Player } from "./player";
import { Palette } from "./color";
import * as Helpers from "./helpers";
import * as Tests from "./tests";
import { Point } from "./point";
import { GameMode, Brawl, FFADeathMatch, TeamDeathMatch } from "./gameMode";
import AddColorFilter from "./AddColorFilter";
import { Path } from "./paths";

class Options {
  showHitboxes: boolean = false;
  alwaysFlinch: boolean = false;
  invulnFrames: boolean = false;
  antiAlias: boolean = false;
  playMusic: boolean = false;
  showFPS: boolean = false;
  capTo30FPS: boolean = false;
  musicVolume: number = 100;
  soundVolume: number = 100;
  showWeaponHUD: boolean = true;
  constructor() { }
}

export enum Menu {
  None,
  Loading,
  NameSelect,
  MainMenu,
  BrawlMenu,
  ArenaMenu,
  Controls,
  ExitMenu,
  OptionsMenu,
  BadBrowserMenu = 9
}

export class UIData {
  isProd: boolean = false;
  playerName: string = "Player 1";
  menu: Menu;
  isBrawl: boolean = false;
  brawlMaps: string[] = ["sm_bossroom"];
  arenaMaps: string[] = ["powerplant", "highway", "gallery"];
  selectedBrawlMap: string = this.brawlMaps[0];
  selectedArenaMap: string = this.arenaMaps[0];
  gameModes: string[] = ["deathmatch", "team deathmatch"];
  selectedGameMode: string = this.gameModes[0];
  maxPlayers: number = 4;
  numBots: number = 4;
  playTo: number = 20;
  isPlayer1CPU: boolean = false;
  isPlayer2CPU: boolean = true;
  whoseControls: number = 1;
  currentControls: { [code: number]: string } = {};
  optionsCopy: Options;
  constructor() { }

  getSelectedMapMaxPlayers() {
    if(this.isBrawl) {
      return game.levelDatas[this.selectedBrawlMap].maxPlayers;
    }
    else {
      return game.levelDatas[this.selectedArenaMap].maxPlayers;
    }
  }
}

class Game {

  sprites: { [name: string]: Sprite; } = {};
  levelDatas: { [name: string]: LevelData } = {};
  level: Level;

  sounds: { [path: string]: Howl } = {};
  palettes: { [path: string]: Palette } = {};

  music: Howl;

  isServer: boolean = false;
  isClient: boolean = true;

  options: Options;
  uiData: UIData;

  previousTime: number = 0;
  deltaTime: number = 0;
  time: number = 0;
  appLoadInterval: number = 0;
  levelLoadInterval: number = 0;

  requestId: number = 0;

  soundSheet: Howl;

  defaultCanvasWidth: number;
  defaultCanvasHeight: number;

  uiEl: HTMLDivElement;
  ui: any;
  canvas: HTMLCanvasElement;
  uiCanvas: HTMLCanvasElement;
  uiCtx: CanvasRenderingContext2D;

  paused: boolean = false;
  collisionCalls: number = 0;

  pixiApp: PIXI.Application;
  canvasWrapper: HTMLElement;

  loadCount: number = 0;
  maxLoadCount: number = 0;

  restartLevelName: string = "";

  flashFilter: AddColorFilter;
  hitFilter: AddColorFilter;
  blueShadowFilter: PIXI.filters.DropShadowFilter;
  redShadowFilter: PIXI.filters.DropShadowFilter;

  path: Path = new Path();

  constructor() {

    this.defaultCanvasWidth = 298;
    this.defaultCanvasHeight = 224;
    this.canvas = <HTMLCanvasElement>document.getElementById("canvas");    
    this.pixiApp = new PIXI.Application({ width: 298, height: 224, view: this.canvas  });
    //this.pixiApp.view.id = "canvas";
    //this.canvas = this.pixiApp.view;
    PIXI.settings.SCALE_MODE = PIXI.SCALE_MODES.NEAREST;

    this.uiEl = <HTMLDivElement>$("#ui")[0];

    this.uiCanvas = <HTMLCanvasElement>document.getElementById("ui-canvas");
    this.uiCtx = this.uiCanvas.getContext("2d");

    this.flashFilter = new AddColorFilter({red: 64/255, green: 64/255, blue: 64/255});
    this.hitFilter = new AddColorFilter({red: 128/255, green: 128/255, blue: 128/255});
    this.blueShadowFilter = new PIXI.filters.DropShadowFilter();
    this.setShadowSettings(this.blueShadowFilter, 0x0000FF);
    this.redShadowFilter = new PIXI.filters.DropShadowFilter();
    this.setShadowSettings(this.redShadowFilter, 0xFF0000);
  }

  setShadowSettings(filter: PIXI.filters.DropShadowFilter, color: number) {
    filter.color = color;
    filter.distance = 0;
    filter.alpha = 1;
    filter.quality = 6;
    filter.blur = 2;
  }
  
  doQuickStart: boolean = true;
  quickStart() {
    /*
    this.uiData.menu = Menu.None;
    this.uiData.selectedArenaMap = "gallery";
    this.uiData.selectedGameMode = "team deathmatch";
    this.uiData.maxPlayers = 9;
    this.uiData.numBots = 9;
    this.uiData.playTo = 20;
    $("#options").show();
    $("#dev-options").show();
    game.loadLevel(this.uiData.selectedArenaMap);
    */
    this.uiData.menu = Menu.None;
    this.uiData.isBrawl = true;
    this.uiData.maxPlayers = 1;
    this.uiData.isPlayer2CPU = false;
    this.uiData.maxPlayers = 0;
    this.uiData.numBots = 0;
    $("#options").show();
    $("#dev-options").show();
    game.loadLevel("sm_bossroom");
  }

  getMusicVolume01() {
    return Number(this.options.musicVolume) / 100;
  }
  getSoundVolume01() {
    return Number(this.options.soundVolume) / 100;
  }
  useInvulnFrames() {
    //return this.options.invulnFrames;
    return this.uiData.isBrawl;
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
    let game = this;
    this.uiData = new UIData();

    if(Helpers.isSupportedBrowser()) {
      this.uiData.menu = Menu.Loading;
    }
    else {
      this.uiData.menu = Menu.BadBrowserMenu;
    }

    //@ts-ignore
    this.ui = new Vue({
      el: '#ui',
      data: {
        uiData: this.uiData
      },
      methods: {
        numBotsChange: function() {
          if(this.uiData.numBots > this.uiData.getSelectedMapMaxPlayers() - 1) {
            this.uiData.numBots = this.uiData.getSelectedMapMaxPlayers() - 1;
          }
          else if(this.uiData.numBots < 0) {
            this.uiData.numBots = 0;
          }
        },
        playToChange: function() {
          if(this.uiData.playTo > 100) {
            this.uiData.playTo = 100;
          }
          else if(this.uiData.playTo < 1) {
            this.uiData.playTo = 1;
          }
        },
        onArenaMapChange: function() {
          this.uiData.numBots = game.levelDatas[this.uiData.selectedArenaMap].maxPlayers - 1;
        },
        mapImage: function(selectedMap: any) {
          if(selectedMap === "sm_bossroom") return "sm_bossroom.png";
          else if(selectedMap === "highway") return "highway.png";
          else if(selectedMap === "powerplant") return "powerplant.png";
          else if(selectedMap === "gallery") return "gallery.png";
          else return "";
        },
        goToControls: function(whoseControls: number) {
          this.uiData.currentControls = game.getPlayerControls(whoseControls);
          this.uiData.whoseControls = whoseControls;
          this.uiData.menu = Menu.Controls;
        },
        goToOptions: function() {
          this.uiData.menu = Menu.OptionsMenu;
          //@ts-ignore
          this.uiData.optionsCopy = _.clone(game.options);
        },
        saveOptions: function() {
          game.options = this.uiData.optionsCopy;
          localStorage.setItem("options", JSON.stringify(game.options));
          this.goToMainMenu();
        },
        getBind(key: string, whoseControls: number) {
          let playerControls = this.uiData.currentControls;
          //@ts-ignore
          let keyCode = _.findKey(playerControls, (value) => {
            return String(value) === String(key);
          });
          if(!keyCode) {
            return "";
          }
          return Helpers.keyCodeToString(Number(keyCode));
        },
        setBind(e: any, key: string, whoseControls: number, nextId: string) {
          if(document.activeElement !== e.target && e.button !== undefined) {
            //console.log("Only detect click when focused");
            return;
          }
          let playerControls = this.uiData.currentControls;
          //@ts-ignore
          let keyCode = _.findKey(playerControls, (value) => {
            return String(value) === String(key);
          });
          delete playerControls[keyCode];

          if(e.keyCode !== undefined) {
            playerControls[e.keyCode] = key;
          }
          else if(e.deltaY !== undefined) {
            if(e.deltaY < 0) {
              playerControls[3] = key;
            }
            else if(e.deltaY > 0) {
              playerControls[4] = key;
            }
          }
          else if(e.button !== undefined) {
            playerControls[e.button] = key;
          }
          
          e.preventDefault();

          $("#" + nextId).focus();

          game.refreshUI();
        },
        saveControls(whoseControls: number) {
          game.setPlayerControls(whoseControls, this.uiData.currentControls);
          if(!game.level) {
            this.goToMainMenu();
          }
          else {
            //@ts-ignore
            _.each(game.level.players, (player) => {
              player.updateControls();
            });
            game.uiData.menu = Menu.None;
            $("#ingame-pause").hide();
          }
        },
        canSaveControls() {
          let playerControls = this.uiData.currentControls;
          let upFound = false, downFound = false, leftFound = false, rightFound = false, shootFound = false, jumpFound = false, 
              dashFound = false, scoreboardFound = false, weaponleftFound = false, weaponrightFound = false;
          for(let key in playerControls) {
            if(playerControls[key] === "up") upFound = true;
            if(playerControls[key] === "down") downFound = true;
            if(playerControls[key] === "left") leftFound = true;
            if(playerControls[key] === "right") rightFound = true;
            if(playerControls[key] === "shoot") shootFound = true;
            if(playerControls[key] === "jump") jumpFound = true;
            if(playerControls[key] === "dash") dashFound = true;
            if(playerControls[key] === "scoreboard") scoreboardFound = true;
            if(playerControls[key] === "weaponleft") weaponleftFound = true;
            if(playerControls[key] === "weaponright") weaponrightFound = true;
          }
          return upFound && downFound && leftFound && rightFound && shootFound && jumpFound && dashFound && scoreboardFound && weaponleftFound && weaponrightFound;
        },
        submitName: function() {
          localStorage.setItem("playerName", game.uiData.playerName);
          this.uiData.menu = Menu.MainMenu;
        },
        goTo1v1: function() {
          this.uiData.isBrawl = true;
          this.uiData.menu = Menu.BrawlMenu;
        },
        goToArena: function() {
          this.uiData.isBrawl = false;
          this.uiData.menu = Menu.ArenaMenu;
          this.onArenaMapChange();
        },
        goToBattle: function(selectedMap: any) {
          this.uiData.menu = Menu.None;
          $("#options").show();
          $("#dev-options").show();
          game.loadLevel(selectedMap);
        },
        goToMainMenu: function() {
          if(!game.level) {
            this.uiData.menu = Menu.MainMenu;
          }
          else {
            game.uiData.menu = Menu.None;
            $("#ingame-pause").hide();
          }
        },
        isBrawlReady: function() {
          return this.uiData.selectedBrawlMap !== "";
        },
        isArenaReady: function() {
          return this.uiData.selectedArenaMap !== "";
        },
        goToExitMenu: function() {
          $("#ingame-pause").show();
          this.uiData.menu = Menu.ExitMenu;
        },
        confirmExit: function(exit: boolean) {
          if(exit) {
            cancelAnimationFrame(game.requestId);
            game.level.destroy();
            game.level = undefined;
            if(game.music) game.music.stop();
            game.uiData.menu = Menu.MainMenu;
            $("#canvas-wrapper").hide();
            $("#ui-canvas").hide();
            $("#options").hide();
          }
          else {
            game.uiData.menu = Menu.None;
          }
          $("#ingame-pause").hide();
        }
      }
    });

    // @ts-ignore
    var devOptions = new Vue({
      el: '#options',
      data: {
        options: options,
        hideDevOptions: false,
        uiData: this.uiData
      },
      methods: {
        onChange() {
          localStorage.setItem("options", JSON.stringify(this.options));
        },
        exitGame() {
          game.ui.goToExitMenu();
        },
        switchClick() {

        },
        goToControls: function(whoseControls: any) {
          $("#ingame-pause").show();
          game.ui.goToControls(whoseControls);
        },
        optionsClick() {
          $("#ingame-pause").show();
          game.ui.goToOptions();
        }
      }
    });

    this.loadImages([
      game.path.effectsSpritesheetPath,
      game.path.megaManXSpritesheetPath
    ], () => {
      this.loadSprites();
      this.loadLevels();
      this.loadPalettes();
      this.loadSounds();
      if(this.uiData.menu !== Menu.BadBrowserMenu) {
        this.appLoadInterval = window.setInterval(() => this.onLoad(), 1);
      }
    });

  }

  onLoad() {
    if(this.isLoaded()) {
      //console.log("LOADED");
      window.clearInterval(this.appLoadInterval);
      this.startMenuMusic();
      let name = "Player 1";// localStorage.getItem("playerName");
      if(!name) {
        this.uiData.menu = Menu.NameSelect;
      }
      else {
        if(this.doQuickStart) {
          this.quickStart();
        }
        else {
          this.uiData.playerName = name;
          this.uiData.menu = Menu.MainMenu;
        }
      }
      this.refreshUI();
    }
    else {
      //console.log("LOADING...");
    }
  }

  startMenuMusic() {

    if(this.doQuickStart) return;

    let music = new Howl({
      src: [game.path.menuMusic],
      sprite: {
        musicStart: [0, 2006],
        musicLoop: [2006, 25083 - 2006]
      },
      onload: () => {
      }
    });
    
    window.setTimeout(
      () => {
        music.play("musicStart");
        music.on("end", function() {
          console.log("Loop");
          
          music.play("musicLoop");
        });
      },
      1000);

    music.volume(game.options.playMusic ? game.getMusicVolume01() : 0);
    this.music = music;
  }

  refreshUI() {
    this.ui.$forceUpdate();
  }

  restartLevel(name: string) {
    if(this.music) {
      this.music.stop();
    }
    this.restartLevelName = name;
  }

  doRestart() {
    //cancelAnimationFrame(this.requestId);
    let name = this.restartLevelName;
    this.restartLevelName = "";
    this.level.destroy();
    this.loadLevel(name);
  }

  loadLevel(name: string) {
    let levelData = this.levelDatas[name];
    if(!levelData) {
      throw "Bad level";
    }
    this.level = new Level(levelData);
    this.levelLoadInterval = window.setInterval(() => this.startLevel(), 1);
  }

  startLevel() {
    if(this.isLoaded()) {
      window.clearInterval(this.levelLoadInterval);
      
      $("#canvas-wrapper").show();
      $("#ui-canvas").show();
      
      let gameMode : GameMode;
      if(this.uiData.isBrawl) {
        gameMode = new Brawl(this.level, this.uiData);
      }
      else if(this.uiData.selectedGameMode === "deathmatch") {
        gameMode = new FFADeathMatch(this.level, this.uiData);
      }
      else if(this.uiData.selectedGameMode === "team deathmatch") {
        gameMode = new TeamDeathMatch(this.level, this.uiData);
      }
      this.level.startLevel(gameMode);
      this.gameLoop(0);
    }
  }

  /*
  getSpritesheet(path: string) {
    if(!this.spritesheets[path]) {
      this.spritesheets[path] = document.createElement("img");
      this.spritesheets[path].src = path;
    }
    return this.spritesheets[path];
  }
  */

  loadImages(paths: string[], callback?: Function) {
    for(let i = paths.length - 1; i >= 0; i--) {
      if(PIXI.utils.TextureCache[paths[i]]) {
        paths.splice(i, 1);
      }
    }
    //console.log(paths);
    this.maxLoadCount++;
    PIXI.loader.add(paths).load(() => {
      this.loadCount++;
      if(callback) callback();
    });
  }

  loadSprites() {
    for(var spriteJson of spriteJsons) {
      let sprite: Sprite = new Sprite(spriteJson, false, undefined);
      this.sprites[sprite.name] = sprite;
    }
  }

  loadLevels() {
    for(var levelJson of levelJsons) {
      let levelData = new LevelData(levelJson);
      this.levelDatas[levelJson.name] = levelData;
    }
  }

  loadPalettes() {
    this.palettes["red"] = new Palette(game.path.redPalette);
    this.palettes["boomerang"] = new Palette(game.path.boomerangPalette);
    this.palettes["electric_spark"] = new Palette(game.path.electric_sparkPalette);
    this.palettes["fire_wave"] = new Palette(game.path.fire_wavePalette);
    this.palettes["rolling_shield"] = new Palette(game.path.rolling_shieldPalette);
    this.palettes["shotgun_ice"] = new Palette(game.path.shotgun_icePalette);
    this.palettes["sting"] = new Palette(game.path.stingPalette);
    this.palettes["tornado"] = new Palette(game.path.tornadoPalette);
    this.palettes["torpedo"] = new Palette(game.path.torpedoPalette);
  }

  loadSounds() {
    for(let soundFile of soundFiles) {
      this.maxLoadCount++;
      let sound = new Howl({
        src: [game.path.getSoundPathFromFile(soundFile)],
        mute: true,
        onload: () => {
          //console.log("LOADED SOUND");
          this.loadCount++;
        }
      });
      this.sounds[soundFile.split(".")[0]] = sound;
    }

    this.maxLoadCount++;
    this.soundSheet = new Howl({
      src: [game.path.soundsheetPath],
      mute: true,
      sprite: {
        buster: [900,1425-900],
        buster2: [17461,18220-17461],
        buster3: [4761,5950-4761],
        buster4: [19429,20423-19429],
        rollingShield: [180000 + 12411, 394],
        electricSpark: [180000 + 16554, 919],
        tornado: [180000 + 7359, 2962],
        boomerang: [180000 + 5766, 1190],
        fireWave: [180000 + 4404, 478]
      },
      onload: () => {
        this.loadCount++;
      }
    });

  }

  isLoaded() {
    return this.loadCount >= this.maxLoadCount;
  }

  timePassed: number = 0;
  lag: number = 0;
  
  MS_PER_UPDATE: number = 16.6666;

  //Main game loop
  gameLoop(currentTime: number) {

    let elapsed = currentTime - this.previousTime;

    //Cover for extreme lag cases (i.e. paused browser, etc.)
    if(elapsed >= this.MS_PER_UPDATE * 3) {
      elapsed = this.MS_PER_UPDATE * 3;
    }

    this.previousTime = currentTime;
    this.lag += elapsed;

    //Translate to deltaTime
    //this.deltaTime = 1/60;
    this.deltaTime = elapsed / 1000;
    if(this.deltaTime < 0 || this.deltaTime > 1/15) this.deltaTime = 1/15;
    this.time += this.deltaTime;
    this.timePassed += this.deltaTime;
    
    if(this.options.showFPS) {
      let fps = (1 / this.deltaTime);
      this.level.debugString = "FPS: " + fps;
      //console.log(fps);
    }
    
    this.level.input();
    /*
    while(this.lag >= this.MS_PER_UPDATE) {
      this.level.update();
      this.lag -= this.MS_PER_UPDATE;
    }
    this.level.render();
    */
    if(!this.options.capTo30FPS || this.timePassed >= 1/60) {
      this.deltaTime = this.timePassed;
      this.timePassed = 0;
      if(!this.paused) {
        this.level.update();
        //console.log(this.collisionCalls);
        this.collisionCalls = 0;
        this.level.render();
      }
    }
    
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
      this.sounds[clip].volume(volume * game.getSoundVolume01(), id);
      this.sounds[clip].mute(false, id);
    }
    else {
      let id = this.soundSheet.play(clip);
      this.soundSheet.volume(volume * game.getSoundVolume01(), id);
      this.soundSheet.mute(false, id);
    }
  }

  playClip(clip: Howl, volume: number) {
    let id = clip.play();
    clip.volume(volume * game.getSoundVolume01(), id);
    clip.mute(false, id);
    return id;
  }

  getPlayerControls(playerNum: number) {
    let controlJson = localStorage.getItem("player" + String(playerNum) + "-controls");
    let inputMapping: { [code: number]: string } = {};
    if(!controlJson) {
      if(playerNum === 1) {
        inputMapping[37] = "left";
        inputMapping[39] = "right";
        inputMapping[38] = "up";
        inputMapping[40] = "down";
        inputMapping[90] = "dash";
        inputMapping[88] = "jump";
        inputMapping[67] = "shoot";
        inputMapping[65] = "weaponleft";
        inputMapping[83] = "weaponright";
        inputMapping[9] = "scoreboard";

        inputMapping[27] = "reset";
        inputMapping[49] = "weapon1";
        inputMapping[50] = "weapon2";
        inputMapping[51] = "weapon3";
        inputMapping[52] = "weapon4";
        inputMapping[53] = "weapon5";
        inputMapping[54] = "weapon6";
        inputMapping[55] = "weapon7";
        inputMapping[56] = "weapon8";
        inputMapping[57] = "weapon9";
      }
      else if(playerNum === 2) {
        inputMapping[100] = "left";
        inputMapping[102] = "right";
        inputMapping[104] = "up";
        inputMapping[101] = "down";
        inputMapping[13] = "dash";
        inputMapping[96] = "jump";
        inputMapping[97] = "shoot";
        inputMapping[103] = "weaponleft";
        inputMapping[105] = "weaponright";
        inputMapping[9] = "scoreboard";
      }
    }
    else {
      inputMapping = JSON.parse(controlJson);
    }
    return inputMapping;
  }

  setPlayerControls(playerNum: number, inputMapping: { [code: number]: string }) {
    if(playerNum === 1 && !inputMapping[49]) throw "Bad input mapping";
    let json = JSON.stringify(inputMapping);
    localStorage.setItem("player" + String(playerNum) + "-controls", json);
  }
  
}

let game: Game = new Game();
//@ts-ignore
window.game = game;
export {game};