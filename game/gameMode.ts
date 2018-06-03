import { Level } from "./level";
import { game } from "./game";

export class GameMode {

  level: Level;
  isOver: boolean = false;
  overTime: number = 0;
  
  constructor(level: Level) {
    this.level = level;
  }

  drawHUD() {
  }

  checkIfWin() {
  }

}

export class Brawl extends GameMode {

  constructor(level: Level) {
    super(level);
  }

  
  drawHUD() {
    if(this.isOver) {
      this.level.drawBrawlWinScreen();
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
  
  constructor(level: Level, killsToWin: number) {
    super(level);
    this.killsToWin = killsToWin;
  }

  
  drawHUD() {
    
    if(this.isOver) {
      this.level.drawArenaWinScreen();
    }

    this.level.drawKillFeed();
    
    this.level.drawTopHUD();
    this.level.drawWeaponSwitchHUD();

    if(this.level.mainPlayer && this.level.mainPlayer.isHeld("scoreboard", false)) {
      this.level.drawScoreboard();
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