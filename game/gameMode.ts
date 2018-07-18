import { Level } from "./level";
import { game, UIData } from "./game";
import { Player } from "./player";
import * as Helpers from "./helpers";
import { KillFeedEntry } from "./killFeedEntry";
import { Rect } from "./rect";
import { Sprite } from "./sprite";
import { Graphics } from "pixi.js";

export class GameMode {

  level: Level;
  isOver: boolean = false;
  isTeamMode: boolean = false;
  overTime: number = 0;

  localPlayers: Player[] = [];
  players: Player[] = [];
  mainPlayer: Player;
  killFeed: KillFeedEntry[] = [];

  isBrawl: boolean = false;

  weaponHUDContainer: PIXI.Container;
  weaponHUDSprites: Sprite[] = [];
  weaponHUDLabels: PIXI.Text[] = [];
  selectedWeaponRect: PIXI.Graphics;
  topText: PIXI.Text;
  botText: PIXI.Text;
  killFeedContainer: PIXI.Container;
  
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

    game.uiCanvas.onmousedown = (e) => {
      for(let player of this.localPlayers) {
        player.onKeyDown(e.button);
      }
      e.preventDefault();
    }

    game.uiCanvas.oncontextmenu = (e) => {
      e.preventDefault();
    }

    game.uiCanvas.onmouseup = (e) => {
      for(let player of this.localPlayers) {
        player.onKeyUp(e.button);
      }
      e.preventDefault();
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
    
    let removed = false;
    for(let i = this.killFeed.length - 1; i >= 0; i--) {
      let killFeed = this.killFeed[i];
      killFeed.time += game.deltaTime;
      if(killFeed.time > 8) {
        //@ts-ignore
        _.remove(this.killFeed, killFeed);
        removed = true;
      }
    }
    if(removed) {
      this.drawKillFeed();
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

  createHUD() {
    if(!this.isBrawl) {
      this.createWeaponSwitchHUD();
    }
    this.createTopHUD();
    this.killFeedContainer = new PIXI.Container();
    game.level.uiContainer.addChild(this.killFeedContainer);
    this.createScoreboardHUD();
  }

  createScoreboardHUD() {

  }

  drawHUD() {
    if(this.isOver) {
      this.drawWinScreen();
    }
  }

  checkIfWin() {
  }
  
  getWinner(): Player {
    //@ts-ignore
    return _.find(this.players, (player) => {
      return player.won;
    });
  }

  drawWinScreen() {

  }

  createWeaponSwitchHUD() {
    this.weaponHUDContainer = new PIXI.Container();
    game.level.uiContainer.addChild(this.weaponHUDContainer);
    let startX = Math.round(this.screenWidth * 0.225);
    let width = 20;
    let iconW = 9;
    let iconH = 9;
    let startY = this.screenHeight - 18;
    for(let i = 0; i < 9; i++) {
      let x = startX + (i * width);
      let y = startY;
      let sprite = game.sprites["hud_weapon_icon"].createAndDraw(this.weaponHUDContainer, i, x, y);
      this.weaponHUDSprites.push(sprite);
      let text = Helpers.createAndDrawText(this.weaponHUDContainer, String(i+1), x, y + 8, 6, "", "top");
    }
    this.selectedWeaponRect = Helpers.createAndDrawRect(this.weaponHUDContainer, new Rect(0, 0, iconW*2, iconH*2), undefined, 0x90EE90, 1);
  }

  drawWeaponSwitchHUD() {
    this.weaponHUDContainer.visible = game.options.showWeaponHUD;
    let startX = Math.round(this.screenWidth * 0.225);
    let width = 20;
    let iconW = 9;
    let iconH = 9;
    let startY = this.screenHeight - 18;
    for(let i = 0; i < 9; i++) {
      let x = startX + (i * width);
      let y = startY;
      if(this.mainPlayer.weaponIndex === i) {
        this.selectedWeaponRect.x = x - iconW;
        this.selectedWeaponRect.y = y - iconH;
      }
    }
  }

  addKillFeedEntry(killFeed: KillFeedEntry) {
    this.killFeed.unshift(killFeed);
    if(this.killFeed.length > 4) this.killFeed.pop();
    this.drawKillFeed();
  }

  createTopHUD() {
    this.topText = Helpers.createAndDrawText(game.level.uiContainer, "", 5, 5, 8, "left", "top");
    this.botText = Helpers.createAndDrawText(game.level.uiContainer, "", 5, 15, 8, "left", "top");
  }

  drawTopHUD() {
    let placeStr = "";
    let place = this.players.indexOf(this.mainPlayer) + 1;
    if(place === 1) placeStr = "1st";  
    else if(place === 2) placeStr = "2nd";
    else if(place === 3) placeStr = "3rd";
    else placeStr = String(place) + "th";
    this.topText.text = "Leader: " + String(this.currentWinner.kills);
    this.botText.text = "Kills: " + String(this.mainPlayer.kills) + "(" + placeStr + ")";
  }

  get currentWinner() {
    return this.players[0];
  }

  drawKillFeed() {
    for (var i = this.killFeedContainer.children.length - 1; i >= 0; i--) {	
      let child = this.killFeedContainer.children[i];
      this.killFeedContainer.removeChild(child);
      child.destroy();  //KZTODO there may be a memory leak here, should I destroy textures too?
    };
    let fromRight = this.screenWidth - 10;
    let fromTop = 10;
    let yDist = 12;
    for(let i = 0; i < this.killFeed.length; i++) {
      let killFeed = this.killFeed[i];

      let msg = "";
      if(killFeed.killer) {
        msg = killFeed.killer.name + "    " + killFeed.victim.name;
      }
      else {
        msg = killFeed.victim.name + " died";
      }
      game.uiCtx.font = "6px mmx_font";
      if(killFeed.killer === this.mainPlayer || killFeed.victim == this.mainPlayer) {
        let msgLen = game.uiCtx.measureText(msg).width;
        let msgHeight = 10;
        Helpers.createAndDrawRect(this.killFeedContainer, new Rect(fromRight - msgLen - 2, fromTop - 2 + (i*yDist) - msgHeight/2, fromRight + 2, fromTop - 2 + msgHeight/2 + (i*yDist)), 0x000000, 0xFFFFFF, 1, 0.75);
      }

      let isKillerRed = killFeed.killer && killFeed.killer.alliance === 1 && this.isTeamMode;
      let isVictimRed = killFeed.victim.alliance === 1 && this.isTeamMode;

      if(killFeed.killer) {
        let nameLen = game.uiCtx.measureText(killFeed.victim.name).width;
        Helpers.createAndDrawText(this.killFeedContainer, killFeed.victim.name, fromRight, fromTop + (i*yDist) - 5, 6, "right", "top", isVictimRed);
        let victimNameWidth = game.uiCtx.measureText(killFeed.victim.name).width;
        Helpers.createAndDrawText(this.killFeedContainer, killFeed.killer.name + "    ", fromRight - victimNameWidth, fromTop + (i*yDist) - 5, 6, "right", "top", isKillerRed);
        let weaponIndex = killFeed.weapon.index;
        game.sprites["hud_killfeed_weapon"].createAndDraw(this.killFeedContainer, weaponIndex, fromRight - nameLen - 13, fromTop + (i*yDist) - 2, undefined, undefined, undefined, undefined, undefined);
      }
      else {
        Helpers.createAndDrawText(this.killFeedContainer, msg, fromRight, fromTop + (i*yDist) - 5, 6, "right", "top", isVictimRed);
      }
      
    }
  }

}

export class Brawl extends GameMode {

  constructor(level: Level, uiData: UIData) {
    super(level);

    this.isBrawl = true;
    
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
    super.drawHUD();
  }

  drawWinScreen() {
    let winner = this.getWinner();
    if(winner) {
      Helpers.drawTextMMX(game.uiCtx, winner.name + " wins!", this.screenWidth/2, this.screenHeight/2, 12, "center", "middle");
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
        if(game.music) {
          game.music.stop();
        }
        game.music = new Howl({
          src: ["assets/music/win.mp3"],
        });
        game.music.play();
      }
    }
    else {
      this.overTime += game.deltaTime;
      if(this.overTime > 10) {
        game.restartLevel(this.level.levelData.name);
      }
    }

  }

}

export class FFADeathMatch extends GameMode {

  killsToWin: number = 20;
  scoreboardTexts: PIXI.Text[][] = [];
  scoreboardRowCount: number = 12;
  scoreboardContainer: PIXI.Container;
  
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
    
    super.drawHUD();

    this.drawTopHUD();
    this.drawWeaponSwitchHUD();

    this.drawScoreboard();
    
  }

  drawWinScreen() {
    if(this.mainPlayer.won) {
      Helpers.drawTextMMX(game.uiCtx, "You won!", this.screenWidth/2, this.screenHeight/2, 24, "center", "middle");
    }
    else {
      Helpers.drawTextMMX(game.uiCtx, "You lost!", this.screenWidth/2, this.screenHeight/2, 24, "center", "middle");
      //@ts-ignore
      let winner = _.find(this.players, (player) => {
        return player.won;
      });
      Helpers.drawTextMMX(game.uiCtx, winner.name + " wins", this.screenWidth/2, (this.screenHeight/2) + 30, 12, "center", "top");
    }
  }

  createScoreboardHUD() {
    this.scoreboardContainer = new PIXI.Container();
    game.level.uiContainer.addChild(this.scoreboardContainer);
    let padding = 10;
    let top = padding + 2;
    let fontSize = 8;
    let col1x = padding + 10;
    let col2x = this.screenWidth * 0.5;
    let col3x = this.screenWidth * 0.75;
    let lineY = padding + 35;
    let labelY = lineY - 1;
    let labelTextY = labelY + 3;
    let line2Y = labelY + 12;
    let topPlayerY = line2Y + 2;
    Helpers.createAndDrawRect(this.scoreboardContainer, new Rect(padding, padding, this.screenWidth - padding, this.screenHeight - padding), 0x000000, undefined, undefined, 0.75);
    Helpers.createAndDrawText(this.scoreboardContainer, "Game Mode: FFA Deathmatch", padding + 10, top, fontSize, "left", "top", undefined, "white");
    Helpers.createAndDrawText(this.scoreboardContainer, "Map: " + this.level.levelData.name, padding + 10, top + 10, fontSize, "left", "top", undefined, "white");
    Helpers.createAndDrawText(this.scoreboardContainer, "Playing to: " + String(this.killsToWin), padding + 10, top + 20, fontSize, "left", "top", undefined, "white");
    Helpers.createAndDrawLine(this.scoreboardContainer, padding + 10, lineY, this.screenWidth - padding - 10, lineY, 0xFFFFFF, 1);
    Helpers.createAndDrawText(this.scoreboardContainer, "Player", col1x, labelTextY, fontSize, "left", "top", undefined, "white");
    Helpers.createAndDrawText(this.scoreboardContainer, "Kills", col2x, labelTextY, fontSize, "left", "top", undefined, "white");
    Helpers.createAndDrawText(this.scoreboardContainer, "Deaths", col3x, labelTextY, fontSize, "left", "top", undefined, "white");
    Helpers.createAndDrawLine(this.scoreboardContainer, padding + 10, line2Y, this.screenWidth - padding - 10, line2Y, 0xFFFFFF, 1);
    let rowH = 10;
    for(let i = 0; i < this.scoreboardRowCount; i++) {
      let text1 = Helpers.createAndDrawText(this.scoreboardContainer, "", col1x, topPlayerY + (i)*rowH, fontSize, "left", "top", undefined, "white");
      let text2 = Helpers.createAndDrawText(this.scoreboardContainer, "", col2x, topPlayerY + (i)*rowH, fontSize, "left", "top", undefined, "white");
      let text3 = Helpers.createAndDrawText(this.scoreboardContainer, "", col3x, topPlayerY + (i)*rowH, fontSize, "left", "top", undefined, "white");
      this.scoreboardTexts.push([text1, text2, text3]);
    }
    this.scoreboardContainer.visible = false;
  }

  drawScoreboard() {
    if(!this.mainPlayer) {
      this.scoreboardContainer.visible = false;
      return;
    }
    if(!this.mainPlayer.isHeld("scoreboard", false)) {
      this.scoreboardContainer.visible = false;
      return;  
    }
    this.scoreboardContainer.visible = true;
    for(let i = 0; i < this.scoreboardRowCount; i++) {
      let row = this.scoreboardTexts[i];
      if(i < this.players.length) {
        let player = this.players[i];
        let color = (player === this.mainPlayer) ? "lightgreen" : "white";
        for(let text of row) {
          text.visible = true;
          text.style.fill = color;
        }
        row[0].text = player.name;
        row[1].text = String(player.kills);
        row[2].text = String(player.deaths);
      }
      else {
        row[0].visible = false;
        row[1].visible = false;
        row[2].visible = false;
      }
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
        if(game.music) {
          game.music.stop();
        }
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
        game.restartLevel(this.level.levelData.name);
      }
    }

  }

}

export class TeamDeathMatch extends GameMode {

  killsToWin: number = 50;
  
  constructor(level: Level, uiData: UIData) {
    super(level);
    this.isTeamMode = true;
    this.killsToWin = uiData.playTo;
    let health = 16;
    let player1 = new Player(game.uiData.playerName, false, 0, health);
    this.players.push(player1);
    this.localPlayers.push(player1);
    this.mainPlayer = player1;
    
    for(var i = 0; i < uiData.numBots; i++) {
      let alliance = (i+1) % 2;
      let cpu: Player = new Player("CPU" + String(i+1), true, alliance, health, alliance === 0 ? undefined : game.palettes["red"]);
      this.players.push(cpu);
      this.localPlayers.push(cpu);
    }

    this.setupPlayers();
  }

  drawHUD() {
    
    super.drawHUD();

    this.drawKillFeed();
    
    this.drawTopHUD();
    this.drawWeaponSwitchHUD();

    this.drawScoreboard();
  }

  drawTopHUD() {
    let blueKills = 0;
    let redKills = 0;
    for(let player of this.level.players) {
      if(player.alliance === 0) blueKills+=player.kills;
      else redKills+=player.kills;
    }
    Helpers.drawTextMMX(game.uiCtx, "Red: " + String(redKills), 5, 10, 8, "left", "Top");
    Helpers.drawTextMMX(game.uiCtx, "Blue: " + String(blueKills), 5, 20, 8, "left", "Top");
  }

  drawWinScreen() {
    let team: string;
    if(this.mainPlayer.won) {
      team = this.mainPlayer.alliance === 0 ? "Blue" : "Red";
    }
    else {
      team = this.mainPlayer.alliance === 0 ? "Red" : "Blue";
    }
    Helpers.drawTextMMX(game.uiCtx, team + " team won!", this.screenWidth/2, this.screenHeight/2, 12, "center", "middle");
  }
  
  drawScoreboard() {
    let padding = 10;
    let hPadding = padding + 5;
    let fontSize = 8;
    let col1x = padding + 5;
    let col2x = this.screenWidth * 0.3;
    let col3x = this.screenWidth * 0.4;
    let teamLabelY = padding + 40;
    let lineY = teamLabelY + 10;
    let labelY = lineY + 5;
    let line2Y = labelY + 10;
    let topPlayerY = line2Y + 5;

    let blueKills = 0;
    let redKills = 0;
    for(let player of this.level.players) {
      if(player.alliance === 0) blueKills+=player.kills;
      else redKills+=player.kills;
    }

    //@ts-ignore
    let redPlayers = _.filter(this.players, (player) => {
      return player.alliance === 1;
    });
    //@ts-ignore
    let bluePlayers = _.filter(this.players, (player) => {
      return player.alliance === 0;
    });

    Helpers.drawRect(game.uiCtx, new Rect(padding, padding, this.screenWidth - padding, this.screenHeight - padding), "black", "", undefined, 0.75);
    Helpers.drawText(game.uiCtx, "Game Mode: Team Deathmatch", hPadding, padding + 10, "white", "", fontSize, "left", "Top", "mmx_font");
    Helpers.drawText(game.uiCtx, "Map: " + this.level.levelData.name, hPadding, padding + 20, "white", "", fontSize, "left", "Top", "mmx_font");
    Helpers.drawText(game.uiCtx, "Playing to: " + String(this.killsToWin), hPadding, padding + 30, "white", "", fontSize, "left", "Top", "mmx_font"), 
    Helpers.drawLine(game.uiCtx, hPadding, lineY, this.screenWidth - hPadding, lineY, "white", 1);

    //Blue
    Helpers.drawTextMMX(game.uiCtx, "Blue: " + blueKills, col1x, teamLabelY, fontSize, "left", "top");
    Helpers.drawTextMMX(game.uiCtx, "Player", col1x, labelY, fontSize, "left", "top");
    Helpers.drawTextMMX(game.uiCtx, "K", col2x, labelY, fontSize, "left", "top");
    Helpers.drawTextMMX(game.uiCtx, "D", col3x, labelY, fontSize, "left", "top");

    //Red
    Helpers.drawTextMMX(game.uiCtx, "Red: " + redKills, this.screenWidth*0.5 + col1x, teamLabelY, fontSize, "left", "top", true);
    Helpers.drawTextMMX(game.uiCtx, "Player", this.screenWidth*0.5 + col1x, labelY, fontSize, "left", "top", true);
    Helpers.drawTextMMX(game.uiCtx, "K", this.screenWidth*0.5 + col2x, labelY, fontSize, "left", "top", true);
    Helpers.drawTextMMX(game.uiCtx, "D", this.screenWidth*0.5 + col3x, labelY, fontSize, "left", "top", true);
    
    /*
    Helpers.drawLine(game.uiCtx, col2x - 5, lineY, col2x - 5, lineY + this.screenHeight * 0.5, "white", 1);
    Helpers.drawLine(game.uiCtx, col3x - 5, lineY, col3x - 5, lineY + this.screenHeight * 0.5, "white", 1);
    Helpers.drawLine(game.uiCtx, this.screenWidth*0.5 + col2x - 5, lineY, this.screenWidth*0.5 + col2x - 5, lineY + this.screenHeight * 0.5, "white", 1);
    Helpers.drawLine(game.uiCtx, this.screenWidth*0.5 + col3x - 5, lineY, this.screenWidth*0.5 + col3x - 5, lineY + this.screenHeight * 0.5, "white", 1);
    */

    Helpers.drawLine(game.uiCtx, hPadding, line2Y, this.screenWidth - hPadding, line2Y, "white", 1);
    let rowH = 10;
    for(let i = 0; i < bluePlayers.length; i++) {
      let player = bluePlayers[i];
      let color = (player === this.mainPlayer) ? "lightgreen" : "";
      Helpers.drawTextMMX(game.uiCtx, Helpers.stringReplace(player.name, " ", ""), col1x, topPlayerY + (i)*rowH, fontSize, "left", "top", false, color);
      Helpers.drawTextMMX(game.uiCtx, String(player.kills), col2x, topPlayerY + (i)*rowH, fontSize, "left", "top", false, color);
      Helpers.drawTextMMX(game.uiCtx, String(player.deaths), col3x, topPlayerY + (i)*rowH, fontSize, "left", "top", false, color);
    }
    for(let i = 0; i < redPlayers.length; i++) {
      let player = redPlayers[i];
      let color = (player === this.mainPlayer) ? "lightgreen" : "";
      Helpers.drawTextMMX(game.uiCtx, Helpers.stringReplace(player.name, " ", ""), this.screenWidth*0.5 + col1x, topPlayerY + (i)*rowH, fontSize, "left", "top", true, color);
      Helpers.drawTextMMX(game.uiCtx, String(player.kills), this.screenWidth*0.5 + col2x, topPlayerY + (i)*rowH, fontSize, "left", "top", true, color);
      Helpers.drawTextMMX(game.uiCtx, String(player.deaths), this.screenWidth*0.5 + col3x, topPlayerY + (i)*rowH, fontSize, "left", "top", true, color);
    }
  }

  checkIfWin() {
    if(!this.isOver) {
      let blueKills = 0;
      let redKills = 0;
      for(let player of this.level.players) {
        if(player.alliance === 0) blueKills+=player.kills;
        else redKills+=player.kills;
      }

      if(blueKills >= this.killsToWin) {
        this.isOver = true;
        //@ts-ignore
        _.each(this.players, (player) => {
          if(player.alliance === 0) {
            player.won = true;
          }
        });
      }
      else if(redKills >= this.killsToWin) {
        this.isOver = true;
        //@ts-ignore
        _.each(this.players, (player) => {
          if(player.alliance === 1) {
            player.won = true;
          }
        });
      }

      if(this.isOver) {
        if(game.music) {
          game.music.stop();
        }
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
        game.restartLevel(this.level.levelData.name);
      }
    }

  }

}