import { Player } from "./player";
import { Character } from "./character";
import { game } from "./game";
import { Point } from "./point";
import { GameObject } from "./gameObject";
import { Actor } from "./actor";
import { Weapon } from "./weapon";
import { TornadoProj, FireWaveProj } from "./projectile";

export class Damager {

  owner: Player;
  damage: number;
  hitCooldown: number;
  flinch: boolean;

  constructor(owner: Player, damage: number, flinch: boolean, hitCooldown: number) {
    this.owner = owner;
    this.damage = damage;
    this.flinch = flinch;
    this.hitCooldown = hitCooldown;
  }

  applyDamage(victim: Character, weakness: boolean, weapon: Weapon, actor: Actor, idString: string) {

    let key: string = idString + this.owner.id.toString();
      
    if(!victim.projectileCooldown[key] && !victim.invulnFrames) {
      victim.projectileCooldown[key] = this.hitCooldown;

      victim.renderEffects.add("hit");
      victim.renderEffectTime = 0.1;
      victim.applyDamage(this.owner, weapon, this.damage * (weakness ? 2 : 1));

      if(this.flinch || game.options.alwaysFlinch || weakness) {
        if(game.useInvulnFrames()) {
          actor.playSound("weakness");
        }
        else {
          actor.playSound("hurt");
        }
        victim.setHurt(actor.pos.x > victim.pos.x ? -1 : 1);
      }
      else {
        if(game.useInvulnFrames()) {
          actor.playSound("weakness");
        }
        else {
          actor.playSound("hit");
        }
      }
      if(game.useInvulnFrames()) {
        victim.invulnFrames = 1;
        victim.renderEffectTime = 1;
      }
    }
    else if(victim.invulnFrames && !victim.projectileCooldown[key] && 
      !(actor instanceof TornadoProj) && !(actor instanceof FireWaveProj)) {
        actor.playSound("hit");
    }
    
  }

}