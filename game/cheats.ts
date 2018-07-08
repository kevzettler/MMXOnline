import { game } from "./game";

export function cheat(key: string, keycode: number) {

  if(game.uiData.isProd) return false;

  //F1
  if(keycode === 112) {
    for(let player of game.level.players) {
      //player.health = 1;
    }
    if(game.level.mainPlayer) {
      game.level.mainPlayer.character.pos.x = 200;
      game.level.mainPlayer.character.pos.y = 200;
    }
  }
  //F2
  if(keycode === 113) {
    for(let player of game.level.players) { 
      if(!player.isAI && player !== game.level.mainPlayer) {
        player.isAI = true;
        player.character.addAI();
      } 
    }
  }
  if(keycode === 114) {
    game.level.mainPlayer.kills = 19;
  }
  if(keycode === 115) {
    //@ts-ignore
    let cpu = _.find(game.level.players, (player) => {
      return player.isAI;
    });
    cpu.kills = 19;
  }
  if(keycode === 75) {
    game.level.mainPlayer.character.applyDamage(undefined, undefined, 100);
  }
  if(keycode === 116) {
    for(let player of game.level.players) {
      if(player.isAI) {
        player.character.changeWeapon(3);
        player.lockWeapon = true;
      }
    }
  }
  if(key === "reset") {
    game.restartLevel("sm_bossroom");
    return;
  }
  if(keycode === 80) {
    game.paused = !game.paused;
  }
}
