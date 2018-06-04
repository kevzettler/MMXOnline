import { Level } from "./level";
import { game, UIData } from "./game";
import { Player } from "./player";
import * as Helpers from "./helpers";
import { KillFeedEntry } from "./killFeedEntry";
import { Rect } from "./rect";

export class GameMode {

  level: Level;
  isOver: boolean = false;
  overTime: number = 0;

  localPlayers: Player[] = [];
  players: Player[] = [];
  mainPlayer: Player;
  killFeed: KillFeedEntry[] = [];
  
  get screenWidth() { return this.level.screenWidth }
  get screenHeight() { return this.level.screenHeight; }
  get zoomScale() { return this.level.zoomScale; }

  constructor(level: Level) {
    this.level = level;
  }

  setupPlayers() {
    document.onkeydown = (e) => {
      for(let player of this.localPlayers) {
        player.onKeyDown(e.keyCode);
      }
      if(e.keyCode === 9 || (e.keyCode >= 112 && e.keyCode <= 121)) {
        e.preventDefault();
      }
    }

    document.onkeyup = (e) => {
      for(let player of this.localPlayers) {
        player.onKeyUp(e.keyCode);
      }
      if(e.keyCode === 9 || (e.keyCode >= 112 && e.keyCode <= 124)) {
        e.preventDefault();
      }
    }

    document.onmousedown = (e) => {
      for(let player of this.localPlayers) {
        player.onKeyDown(e.button);
      }
      //Right click
      if(e.button === 2) {
        e.preventDefault();
      }
    }

    document.onmouseup = (e) => {
      for(let player of this.localPlayers) {
        player.onKeyUp(e.button);
      }
      if(e.button === 2) {
        e.preventDefault();
      }
    }

    document.onwheel = (e) => {
      if(e.deltaY < 0) {
        for(let player of this.localPlayers) {
          console.log("MOUSEHWEELUP")
          player.onKeyDown(3);
        }
      }
      else if(e.deltaY > 0) {
        for(let player of this.localPlayers) {
          console.log("MOUSEHWEELDOWN")
          player.onKeyDown(4);
        }
      }
    }

  }

  update() {
    
    for(let i = this.killFeed.length - 1; i >= 0; i--) {
      let killFeed = this.killFeed[i];
      killFeed.time += game.deltaTime;
      if(killFeed.time > 8) {
        //@ts-ignore
        _.remove(this.killFeed, killFeed);
      }
    }

    //Sort players by score
    this.players.sort(function(a, b) {
      if(a.kills > b.kills) return -1;
      else if(a.kills === b.kills) {
        if(a.deaths < b.deaths) return -1;
        if(a.deaths === b.deaths) return 0;
        if(a.deaths > b.deaths) return 1;
      }
      else {
        return 1;
      }
    });

  }

  drawHUD() {
  }

  checkIfWin() {
  }
  
  getWinner(): Player {
    //@ts-ignore
    return _.find(this.players, (player) => {
      return player.won;
    });
  }

  drawArenaWinScreen() {
    if(this.mainPlayer.won) {
      Helpers.drawTextMMX(game.ctx, "You won!", this.screenWidth/2, this.screenHeight/2, 24, "center", "middle");
    }
    else {
      Helpers.drawTextMMX(game.ctx, "You lost!", this.screenWidth/2, this.screenHeight/2, 24, "center", "middle");
      //@ts-ignore
      let winner = _.find(this.players, (player) => {
        return player.won;
      });
      Helpers.drawTextMMX(game.ctx, winner.name + " wins", this.screenWidth/2, (this.screenHeight/2) + 30, 12, "center", "top");
    }
  }

  drawBrawlWinScreen() {
    let winner = this.getWinner();
    if(winner) {
      Helpers.drawTextMMX(game.ctx, winner.name + " wins!", this.screenWidth/2, this.screenHeight/2, 12, "center", "middle");
    }
  }

  drawWeaponSwitchHUD() {
    let weaponSprite = game.sprites["hud_weapon_icon"];
    let startX = 50;
    let width = 20;
    let iconW = 9;
    let iconH = 9;
    let startY = this.screenHeight - 15;
    for(let i = 0; i < 9; i++) {
      let x = startX + (i * width);
      let y = startY;
      if(this.mainPlayer.weaponIndex === i) {
        Helpers.drawRect(game.ctx, new Rect(x - iconW, y - iconH, x + iconW, y + iconH), "", "lightgreen", 1);
      }
      weaponSprite.draw(i, x, y);
      Helpers.drawTextMMX(game.ctx, String(i+1), x, y + 12, 6, "", "");
    }
  }

  addKillFeedEntry(killFeed: KillFeedEntry) {
    this.killFeed.unshift(killFeed);
    if(this.killFeed.length > 4) this.killFeed.pop();
  }

  drawTopHUD() {
    let placeStr = "";
    let place = this.players.indexOf(this.mainPlayer) + 1;
    if(place === 1) placeStr = "1st";  
    else if(place === 2) placeStr = "2nd";
    else if(place === 3) placeStr = "3rd";
    else placeStr = String(place) + "th";
    Helpers.drawTextMMX(game.ctx, "Leader: " + String(this.currentWinner.kills), 5, 10, 8, "left", "Top");
    Helpers.drawTextMMX(game.ctx, "Kills: " + String(this.mainPlayer.kills) + "(" + placeStr + ")", 5, 20, 8, "left", "Top");
  }

  get currentWinner() {
    return this.players[0];
  }

  drawKillFeed() {
    let fromRight = this.screenWidth - 10;
    let fromTop = 10;
    let yDist = 12;
    for(let i = 0; i < this.killFeed.length; i++) {
      let killFeed = this.killFeed[i];
      let msg = killFeed.killer.name + "    " + killFeed.victim.name;
      game.ctx.font = "6px mmx_font";
      if(killFeed.killer === this.mainPlayer || killFeed.victim == this.mainPlayer) {
        let msgLen = game.ctx.measureText(msg).width;
        let msgHeight = 10;
        Helpers.drawRect(game.ctx, new Rect(fromRight - msgLen - 2, fromTop - 2 + (i*yDist) - msgHeight/2, fromRight + 2, fromTop - 2 + msgHeight/2 + (i*yDist)), "black", "white", 1, 0.75);
      }
      let nameLen = game.ctx.measureText(killFeed.victim.name).width;
      Helpers.drawTextMMX(game.ctx, msg, fromRight, fromTop + (i*yDist), 6, "right", "Top");
      let weaponIndex = killFeed.weapon.index;
      game.sprites["hud_killfeed_weapon"].draw(weaponIndex, fromRight - nameLen - 13, fromTop + (i*yDist) - 2, undefined, undefined, undefined, undefined, undefined);
    }
  }

}

export class Brawl extends GameMode {

  constructor(level: Level, uiData: UIData) {
    super(level);
    
    let health = 32;

    let p1Name = uiData.isPlayer1CPU ? "CPU 1" : "Player 1";
    let p2Name = uiData.isPlayer2CPU ? "CPU" : "Player";

    if(p1Name.includes(p2Name)) {
      p2Name += " 2";
    }
    else {
      p2Name += " 1";
    }

    let player1 = new Player(p1Name, uiData.isPlayer1CPU, 0, health);
    let player2 = new Player(p2Name, uiData.isPlayer2CPU, 1, health, game.palettes["red"]);
    
    this.players.push(player1);
    this.localPlayers.push(player1);
    this.mainPlayer = player1;
    
    this.players.push(player2);
    this.localPlayers.push(player2);

    this.setupPlayers();
  }

  drawHUD() {
    if(this.isOver) {
      this.drawBrawlWinScreen();
    }
  }

  checkIfWin() {
    if(!this.isOver) {
      //@ts-ignore
      let deadPlayer = _.find(this.level.players, (player) => {
        return !player.character;
      });
      if(deadPlayer) {
        for(let player of this.level.players) {
          if(player.character) {
            this.isOver = true;
            player.won = true;
          }
        }
      }
      if(this.isOver) {
        game.music.stop();
        game.music = new Howl({
          src: ["assets/music/win.mp3"],
        });
        game.music.play();
      }
    }
    else {
      this.overTime += game.deltaTime;
      if(this.overTime > 10) {
        game.restartLevel(this.level.name);
      }
    }

  }

}

export class FFADeathMatch extends GameMode {

  killsToWin: number = 20;
  
  constructor(level: Level, uiData: UIData) {
    super(level);
    this.killsToWin = uiData.playTo;
    let health = 16;
    let player1 = new Player(game.uiData.playerName, false, 0, health);
    this.players.push(player1);
    this.localPlayers.push(player1);
    this.mainPlayer = player1;
    
    for(var i = 0; i < uiData.numBots; i++) {
      let cpu: Player = new Player("CPU" + String(i+1), true, i + 1, health, game.palettes["red"]);
      this.players.push(cpu);
      this.localPlayers.push(cpu);
    }

    this.setupPlayers();
  }

  drawHUD() {
    
    if(this.isOver) {
      this.drawArenaWinScreen();
    }

    this.drawKillFeed();
    
    this.drawTopHUD();
    this.drawWeaponSwitchHUD();

    if(this.mainPlayer && this.mainPlayer.isHeld("scoreboard", false)) {
      this.drawScoreboard();
    }
  }

  drawScoreboard() {
    let padding = 10;
    let fontSize = 8;
    let col1x = padding + 10;
    let col2x = this.screenWidth * 0.5;
    let col3x = this.screenWidth * 0.75;
    let lineY = padding + 35;
    let labelY = lineY + 5;
    let line2Y = labelY + 10;
    let topPlayerY = line2Y + 5;
    Helpers.drawRect(game.ctx, new Rect(padding, padding, this.screenWidth - padding, this.screenHeight - padding), "black", "", undefined, 0.75);
    Helpers.drawText(game.ctx, "Game Mode: FFA Deathmatch", padding + 10, padding + 10, "white", "", fontSize, "left", "Top", "mmx_font");
    Helpers.drawText(game.ctx, "Map: " + this.level.name, padding + 10, padding + 20, "white", "", fontSize, "left", "Top", "mmx_font");
    Helpers.drawText(game.ctx, "Playing to: " + String(this.killsToWin), padding + 10, padding + 30, "white", "", fontSize, "left", "Top", "mmx_font"), 
    Helpers.drawLine(game.ctx, padding + 10, lineY, this.screenWidth - padding - 10, lineY, "white", 1);
    Helpers.drawText(game.ctx, "Player", col1x, labelY, "white", "", fontSize, "left", "top", "mmx_font");
    Helpers.drawText(game.ctx, "Kills", col2x, labelY, "white", "", fontSize, "left", "top", "mmx_font");
    Helpers.drawText(game.ctx, "Deaths", col3x, labelY, "white", "", fontSize, "left", "top", "mmx_font");
    Helpers.drawLine(game.ctx, padding + 10, line2Y, this.screenWidth - padding - 10, line2Y, "white", 1);
    let rowH = 10;
    for(let i = 0; i < this.players.length; i++) {
      let player = this.players[i];
      let color = (player === this.mainPlayer) ? "lightgreen" : "white";
      Helpers.drawText(game.ctx, player.name, col1x, topPlayerY + (i)*rowH, color, "", fontSize, "left", "top", "mmx_font");
      Helpers.drawText(game.ctx, String(player.kills), col2x, topPlayerY + (i)*rowH, color, "", fontSize, "left", "top", "mmx_font");
      Helpers.drawText(game.ctx, String(player.deaths), col3x, topPlayerY + (i)*rowH, color, "", fontSize, "left", "top", "mmx_font");
    }
  }

  checkIfWin() {
    if(!this.isOver) {
      for(let player of this.level.players) {
        if(player.kills >= this.killsToWin) {
          this.isOver = true;
          player.won = true;
        }
      }
      if(this.isOver) {
        game.music.stop();
        if(this.level.mainPlayer && this.level.mainPlayer.won) {
          game.music = new Howl({
            src: ["assets/music/win.mp3"],
          });
          game.music.play();
        }
        else if(this.level.mainPlayer && !this.level.mainPlayer.won) {
          game.music = new Howl({
            src: ["assets/music/lose.mp3"],
          });
          game.music.play();
        }
      }
    }
    else {
      this.overTime += game.deltaTime;
      if(this.overTime > 10) {
        game.restartLevel(this.level.name);
      }
    }

  }

}