import { game } from "./game";
import { Actor } from "./actor";

export class LoopingSound {

  startClip: string;
  loopClip: string;
  startSoundId: number;
  loopSoundId: number;
  actor: Actor;
  times: number = 0;
  constructor(startClip: string, loopClip: string, actor: Actor) {
    this.startClip = startClip;
    this.loopClip = loopClip;
    this.actor = actor;
  }

  play() {
    if(!this.startSoundId && !this.loopSoundId) {
      this.startSoundId = game.playSound(this.startClip, this.actor.getSoundVolume());
    }
    if(this.startSoundId && !game.soundSheet.playing(this.startSoundId)) {
      this.times = 1;
      this.startSoundId = undefined;
      this.loopSoundId = game.playSound(this.loopClip, this.actor.getSoundVolume());
    }
    if(this.times >= 1 && this.times <= 4 && !game.soundSheet.playing(this.loopSoundId)) {
      this.times++;
      this.loopSoundId = game.playSound(this.loopClip, this.actor.getSoundVolume());
    }
    if(this.times > 4) {
      this.stop(false);
    }
  }

  stop(resetTimes: boolean = true) {
    if(resetTimes) {
      this.times = 0; 
    }
    if(this.startSoundId) {
      game.soundSheet.stop(this.startSoundId);
      this.startSoundId = undefined;
    }
    if(this.loopSoundId) {
      game.soundSheet.stop(this.loopSoundId);
      this.loopSoundId = undefined;
    }
  }

}