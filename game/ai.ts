import { Character } from "./character";
import { game } from "./game";
import { Projectile, BusterProj } from "./projectile";
import { Point } from "./point";
import * as Helpers from "./helpers";
import { NavMeshNode, NavMeshNeighbor } from "./navMesh";

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

    if(!game.level.gameObjects.has(this.target)) {
      this.target = undefined;
    }

    this.target = game.level.getClosestTarget(this.character.pos, this.player.alliance);

    if(!this.target) {
      if(this.aiState.constructor.name !== "FindPlayer") {
        this.aiState = new FindPlayer(this.character);
      }
    }
    else {
      if(this.aiState.constructor.name === "FindPlayer") {
        this.aiState = new AimAtPlayer(this.character);
      }
    }

    if(this.target) {
      if(this.character.charState.constructor.name === "LadderClimb") {
        this.player.press("jump");
      }
      let xDist = this.target.pos.x - this.character.pos.x;
      if(Math.abs(xDist) > game.level.halfScreenWidth) {
        this.aiState = new MoveTowardsTarget(this.character);
      }
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
        if(this.character.isFacing(this.target)) {
          //this.player.press("shoot");
        }
        //}
      }
      this.shootTime += game.deltaTime;
      if(this.shootTime > 0.1) {
        this.shootTime = 0;
      }
    }
    if(this.aiState.shouldDodge) {
      for(let proj of game.level.getGameObjectArray()) {
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
      if(Helpers.randomRange(0, 150) < 5) {
        this.dashTime = Helpers.randomRange(0.2, 0.5);
      }
      if(this.dashTime > 0) {
        this.player.press("dash");
        this.dashTime -= game.deltaTime;
        if(this.dashTime < 0) this.dashTime = 0;
      }
    }
    if(this.aiState.randomlyJump) {
      if(Helpers.randomRange(0, 150) < 5) {
        this.jumpTime = Helpers.randomRange(0.25, 0.75);
      }
      if(this.jumpTime > 0) {
        this.player.press("jump");
        this.jumpTime -= game.deltaTime;
        if(this.jumpTime < 0) this.jumpTime = 0;
      }
    }
    if(this.aiState.randomlyChangeWeapon && !this.player.lockWeapon) {
      this.weaponTime += game.deltaTime;
      if(this.weaponTime > 5) {
        this.weaponTime = 0;
        this.character.changeWeapon(Helpers.randomRange(0, 8));
      }
    }

    this.aiState.update();
  }

  changeState(newState: AIState) {
    this.aiState = newState;
  }

}

class AIState {

  facePlayer: boolean;
  character: Character;
  shouldAttack: boolean;
  shouldDodge: boolean;
  randomlyChangeState: boolean;
  randomlyDash: boolean;
  randomlyJump: boolean;
  randomlyChangeWeapon: boolean;

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
    this.shouldDodge = true;
    this.randomlyChangeState = true;
    this.randomlyDash = true;
    this.randomlyJump = true;
    this.randomlyChangeWeapon = true;
  }

  update() {

  }

}

class MoveTowardsTarget extends AIState {
  constructor(character: Character) {
    super(character);
    this.facePlayer = false;
    this.shouldAttack = false;
    this.shouldDodge = false;
    this.randomlyChangeState = false;
    this.randomlyDash = true;
    this.randomlyJump = false;
    this.randomlyChangeWeapon = false;
  }

  update() {
    super.update();
    if(this.character.pos.x - this.ai.target.pos.x > game.level.halfScreenWidth) {
      this.player.press("left");
    }
    else if(this.character.pos.x - this.ai.target.pos.x < -game.level.halfScreenWidth) {
      this.player.press("right");
    }
    else {
      this.ai.changeState(new AimAtPlayer(this.character));
    }
  }

}

class FindPlayer extends AIState {
  
  destNode: NavMeshNode;
  nextNode: NavMeshNode;
  prevNode: NavMeshNode;
  ladderDir: string;
  constructor(character: Character) {
    super(character);
    this.facePlayer = false;
    this.shouldAttack = false;
    this.shouldDodge = false;
    this.randomlyChangeState = false;
    this.randomlyDash = true;
    this.randomlyJump = false;
    this.randomlyChangeWeapon = false;
    
    this.destNode = game.level.getRandomNode();
    this.nextNode = game.level.getClosestNodeInSight(this.character.centerPos);
    this.prevNode = undefined;

  }

  update() {
    super.update();

    if(!this.nextNode) {
      this.ai.changeState(new FindPlayer(this.character));
      return;
    }

    if(this.character.charState.constructor.name === "LadderClimb") {
      this.player.press(this.ladderDir);
      let dir = 1;
      if(this.ladderDir === "up") dir = -1;
      if(this.character.sweepTest(new Point(0, dir * 5))) {
        this.player.press("jump");
        this.ai.changeState(new FindPlayer(this.character));
      }
      return;
    }

    if(this.character.pos.x - this.nextNode.pos.x > 5) {
      this.player.press("left");
    }
    else if(this.character.pos.x - this.nextNode.pos.x < -5) {
      this.player.press("right");
    }
    else {
      if(Math.abs(this.character.pos.y - this.nextNode.pos.y) < 15) {
        if(this.nextNode === this.destNode) {
          this.ai.changeState(new FindPlayer(this.character));
          return;
        }
        this.prevNode = this.nextNode;
        this.nextNode = this.nextNode.getNextNode(this.destNode);
      }
      else {
        if(!this.prevNode) {
          return;
        }
        let neighbor: NavMeshNeighbor = this.prevNode.getNeighbor(this.nextNode);
        if(neighbor.isJumpNode) {
          this.player.press("jump");  
          if(neighbor.ladder) {
            this.ladderDir = "up";
            this.player.press("up");
          }
        }
        else if(neighbor.isDropNode) {
          if(neighbor.ladder) {
            this.ladderDir = "down";
            this.player.press("down");
          }
        }
        else if(neighbor.ladder) {
          this.ladderDir = "up";
          this.player.press("up");
        }
      }
    }

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
    let dir = 0;
    if(this.character.pos.x - this.dest.x > 5) {
      dir = -1;
      this.player.press("left");
    }
    else if(this.character.pos.x - this.dest.x < -5) {
      dir = 1;
      this.player.press("right");
    }
    else {
      this.ai.changeState(new AimAtPlayer(this.character));
    }

    if(this.character.sweepTest(new Point(dir * 5, 0))) {
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
