import { Character } from "./character";
import { game } from "./game";
import { Projectile, BusterProj } from "./projectile";
import { Point } from "./point";
import * as Helpers from "./helpers";

export class AI {

  character: Character;
  aiState: AIState;
  target: Character;
  shootTime: number = 0;
  dashTime: number = 0;
  jumpTime: number = 0;
  weaponTime: number = 0;

  get player() {
    return this.character.player;
  }

  constructor(character: Character) {
    this.character = character;
    this.aiState = new AimAtPlayer(this.character);
  }

  update() {

    if(game.level.gameObjects.indexOf(this.target) === -1) {
      this.target = undefined;
    }

    if(!this.target) {
      this.target = game.level.players[0].character;
    }

    if(!this.target) {
      return;
    }

    if(this.aiState.facePlayer) {
      if(this.character.pos.x > this.target.pos.x) {
        this.character.xDir = -1;
      }
      else {
        this.character.xDir = 1;
      }
    }
    if(this.aiState.shouldAttack) {
      if(this.shootTime === 0) {
        //if(this.character.withinY(this.target, 25)) {
        if(this.character.isFacing(this.target))
            this.player.press("shoot");
        //}
      }
      this.shootTime += game.deltaTime;
      if(this.shootTime > 0.1) {
        this.shootTime = 0;
      }
    }
    if(this.aiState.shouldDodge) {
      for(let proj of game.level.gameObjects) {
        if(proj instanceof Projectile && !(proj instanceof BusterProj)) {
          if(proj.isFacing(this.character) && this.character.withinX(proj, 100) && this.character.withinY(proj, 30) && proj.damager.owner.alliance !== this.player.alliance) {
            this.player.press("jump");
          }
        }
      }
    }
    if(this.aiState.randomlyChangeState) {
      if(Helpers.randomRange(0, 60) < 5) {
        let randAmount = Helpers.randomRange(-100, 100);
        this.changeState(new MoveToPos(this.character, this.character.pos.addxy(randAmount, 0)));
        return;
      }
    }
    if(this.aiState.randomlyDash) {
      if(Helpers.randomRange(0, 90) < 5) {
        this.dashTime = Helpers.randomRange(0.2, 0.5);
      }
      if(this.dashTime > 0) {
        this.player.press("dash");
        this.dashTime -= game.deltaTime;
        if(this.dashTime < 0) this.dashTime = 0;
      }
    }
    if(this.aiState.randomlyJump) {
      if(Helpers.randomRange(0, 120) < 5) {
        this.jumpTime = Helpers.randomRange(0.25, 0.75);
      }
      if(this.jumpTime > 0) {
        this.player.press("jump");
        this.jumpTime -= game.deltaTime;
        if(this.jumpTime < 0) this.jumpTime = 0;
      }
    }
    if(this.aiState.randomlyChangeWeapon) {
      this.weaponTime += game.deltaTime;
      if(this.weaponTime > 5) {
        this.weaponTime = 0;
        //this.player.weaponIndex = Helpers.randomRange(0, 8);
        this.player.weaponIndex = this.player.weaponIndex - 1;
        if(this.player.weaponIndex < 0) this.player.weaponIndex = 8;
      }
    }

    this.aiState.update();
  }

  changeState(newState: AIState) {
    this.aiState = newState;
  }

}

class AIState {

  facePlayer: boolean = true;
  character: Character;
  shouldAttack: boolean = true;
  shouldDodge: boolean = true;
  randomlyChangeState: boolean = true;
  randomlyDash: boolean = true;
  randomlyJump: boolean = true;
  randomlyChangeWeapon: boolean = true;

  get player() {
    return this.character.player;
  }
  get ai() {
    return this.player.character.ai;
  }
  get target() {
    return this.ai.target;
  }

  constructor(character: Character) {
    this.character = character;
    this.shouldAttack = true;
    this.facePlayer = true;
  }

  update() {

  }

}

class MoveToPos extends AIState {

  dest: Point;
  constructor(character: Character, dest: Point) {
    super(character);
    this.dest = dest;
    this.facePlayer = false;
    this.randomlyChangeState = false;
  }

  update() {
    super.update();
    if(this.character.pos.x - this.dest.x > 5) {
      this.player.press("left");
    }
    else if(this.character.pos.x - this.dest.x < -5) {
      this.player.press("right");
    }
    else {
      this.ai.changeState(new AimAtPlayer(this.character));
    }

    if(this.character.sweepTest(new Point(this.character.xDir * 50, 0))) {
      this.ai.changeState(new AimAtPlayer(this.character));
    }

  }

}

class AimAtPlayer extends AIState {
  jumpDelay: number = 0;
  constructor(character: Character) {
    super(character);    
  }
  update() {
    super.update();
    if(this.character.grounded && this.jumpDelay > 0.3) {
      this.jumpDelay = 0;
    }
    
    if(this.character.pos.y > this.target.pos.y && this.character.pos.y < this.target.pos.y + 80) {
      this.jumpDelay += game.deltaTime;
      if(this.jumpDelay > 0.3) {
        this.player.press("jump");
      }
    }
    else {
      //this.changeState(new JumpToWall());
    }
  }
}

class DashToPlayer extends AIState {

}

class JumpToWall extends AIState {

}

class ClimbWall extends AIState {

}

class SlideDownWall extends AIState {

}
