import { game } from "./game";

export function cheat(key: string, keycode: number) {
  //F1
  if(keycode === 112) {
    for(let player of game.level.players) {
      player.health = 1;
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
  if(key === "reset") {
    game.restartLevel("sm_bossroom");
    return;
  }
}
