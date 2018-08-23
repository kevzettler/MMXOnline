import { Character, LadderClimb } from "./character";
import { game } from "./game";
import { Projectile, BusterProj } from "./projectile";
import { Point } from "./point";
import * as Helpers from "./helpers";
import { NavMeshNode, NavMeshNeighbor } from "./navMesh";
import { JumpZone, Wall } from "./wall";
import { CTF } from "./gameMode";
import { Flag } from "./flag";
import { Buster } from "./weapon";

export class AI {

  character: Character;
  aiState: AIState;
  target: Character;
  shootTime: number = 0;
  dashTime: number = 0;
  jumpTime: number = 0;
  weaponTime: number = 0;
  maxChargeTime: number = 0;
  framesChargeHeld: number = 0;

  get player() {
    return this.character.player;
  }

  constructor(character: Character) {
    this.character = character;
    this.aiState = new AimAtPlayer(this.character);
  }

  doJump() {
    if(this.jumpTime === 0) {
      this.jumpTime = 0.75;
    }
  }

  update() {

    if(this.framesChargeHeld > 0) {
      if(this.character.chargeTime < this.maxChargeTime) {
        //console.log("HOLD");
        this.player.press("shoot");
      }
      else {
        //this.player.release("shoot");
      }
    }

    if(!game.level.gameObjects.has(this.target)) {
      this.target = undefined;
    }
    
    if(this.jumpTime > 0/* && !(this.character.charState instanceof LadderClimb)*/) {
      this.jumpTime -= game.deltaTime;
      if(this.jumpTime < 0) {
        this.jumpTime = 0;
      }
      else {
        this.player.release("jump");
        this.player.press("jump");
      }
    }

    this.target = game.level.getClosestTarget(this.character.pos, this.player.alliance, true);
    let inDrop = false;
    if(!(this.aiState instanceof InJumpZone)) {
      let jumpZones = game.level.getTriggerList(this.character, 0, 0, undefined, JumpZone);
      if(jumpZones.length > 0) {
        let jumpZone = <JumpZone>jumpZones[0].gameObject;
        let jumpZoneDir = this.character.xDir; //Helpers.randomRange(0, 1);
        if(jumpZoneDir === 0) jumpZoneDir = -1;

        if(!jumpZone.targetNode || jumpZone.targetNode === this.aiState.getNextNodeName()) {
          if(!(this.aiState instanceof FindPlayer)) {
            this.aiState = new InJumpZone(this.character, jumpZone, jumpZoneDir);
          }
          else {
            if(this.character.charState.constructor.name !== "LadderClimb") {
              this.doJump();
            }
          }
        }
        else {
          inDrop = true;
        }
      }
    }

    /*
    if(!inDrop) {
      let sweepForward = this.character.sweepTest(new Point(this.character.xDir * 30, 0));
      let raycastUp = game.level.raycast(this.character.getCenterPos(), this.character.getCenterPos().addxy(0, -75), ["Wall"]);
      if(sweepForward && !raycastUp && sweepForward.gameObject instanceof Wall) {
        this.player.press("jump");
      }
    }
    */

    if(!(this.aiState instanceof InJumpZone)) {
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
          this.doJump();
        }
        let xDist = this.target.pos.x - this.character.pos.x;
        if(Math.abs(xDist) > this.getMaxDist()) {
          this.aiState = new MoveTowardsTarget(this.character);
        }
      }
    }

    if(this.aiState.facePlayer) {
      if(this.character.pos.x > this.target.pos.x) {
        if(this.character.xDir !== -1) {
          this.player.press("left");
        }
      }
      else {
        if(this.character.xDir !== 1) {
          this.player.press("right");
        }
      }
    }
    if(this.aiState.shouldAttack) {
      if(this.shootTime === 0) {
        //if(this.character.withinY(this.target, 25)) {
        if(this.character.isFacing(this.target)) {
          if(this.framesChargeHeld > 0) {
            if(this.character.chargeTime >= this.maxChargeTime) {
              this.player.release("shoot");
              this.framesChargeHeld = 0;
            }
          }
          else {
            this.player.press("shoot");
          }
        }
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
            this.doJump();
          }
        }
      }
    }
    if(this.aiState.randomlyChargeWeapon && !this.player.isZero && this.framesChargeHeld === 0 && this.player.weaponIndex === 0 && this.player.character.canCharge()) {
      if(Helpers.randomRange(0, 300) < 5) {
        if(this.player.weapon instanceof Buster) {
          this.maxChargeTime = Helpers.randomRange(0.75, 3);
        }
        else {
          this.maxChargeTime = 3;
        }
        this.framesChargeHeld = 1;
        this.player.press("shoot");
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
    }
    if(this.aiState.randomlyChangeWeapon && !this.player.lockWeapon && !this.character.isStingCharged && !this.character.chargedRollingShieldProj) {
      this.weaponTime += game.deltaTime;
      if(this.weaponTime > 5) {
        this.weaponTime = 0;
        this.character.changeWeapon(Helpers.randomRange(0, this.player.weapons.length - 1));
      }
    }

    this.aiState.update();
  }

  changeState(newState: AIState) {
    this.aiState = newState;
  }

  getMaxDist() {
    let maxDist = game.level.halfScreenWidth;
    if(this.player.isZero) maxDist = 70;
    return maxDist;
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
  randomlyChargeWeapon: boolean;

  get player() {
    return this.character.player;
  }
  get ai() {
    return this.player.character.ai;
  }
  get target() {
    return this.ai.target;
  }
  getNextNodeName() {
    if(this instanceof FindPlayer) {
      return this.nextNode.name;
    }
    return "";
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
    this.randomlyChargeWeapon = true;
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
    this.randomlyChargeWeapon = true;
  }

  update() {
    super.update();
    if(this.character.pos.x - this.ai.target.pos.x > this.ai.getMaxDist()) {
      this.player.press("left");
    }
    else if(this.character.pos.x - this.ai.target.pos.x < -this.ai.getMaxDist()) {
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
    this.randomlyChargeWeapon = true;
    
    if(game.level.gameMode instanceof CTF) {
      if(!this.character.flag) {
        let targetFlag: Flag;
        if(this.player.alliance === 0) targetFlag = game.level.redFlag;
        else if(this.player.alliance === 1) targetFlag = game.level.blueFlag;
        this.destNode = game.level.getClosestNodeInSight(targetFlag.pos);
      }
      else {
        if(this.player.alliance === 0) this.destNode = game.level.blueFlagNode;
        else if(this.player.alliance === 1) this.destNode = game.level.redFlagNode;
      }
      
    }
    else {
      this.destNode = game.level.getRandomNode();
    }
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
        this.ai.doJump();
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
      if(Math.abs(this.character.pos.y - this.nextNode.pos.y) < 30) {
        if(this.nextNode === this.destNode) {
          this.ai.changeState(new FindPlayer(this.character));
          return;
        }
        this.prevNode = this.nextNode;
        this.nextNode = this.nextNode.getNextNode(this.destNode);
        let neighbor: NavMeshNeighbor = this.prevNode.getNeighbor(this.nextNode);
        if(neighbor.isJumpNode && !neighbor.ladder) {
          this.ai.jumpTime = 2;
        }
      }
      else {
        if(!this.prevNode) {
          return;
        }
        let neighbor: NavMeshNeighbor = this.prevNode.getNeighbor(this.nextNode);
        if(neighbor.isJumpNode) {
          this.ai.doJump();
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
    this.randomlyChargeWeapon = true;
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
        this.ai.doJump();
      }
    }
    else {
      //this.changeState(new JumpToWall());
    }
  }
}

class InJumpZone extends AIState {
  jumpZone: JumpZone;
  jumpZoneDir: number;
  time: number = 0.25;
  constructor(character: Character, jumpZone: JumpZone, jumpZoneDir: number) {
    super(character);
    this.jumpZone = jumpZone;
    this.jumpZoneDir = jumpZoneDir;
    this.facePlayer = false;
    this.shouldAttack = false;
    this.shouldDodge = false;
    this.randomlyChangeState = false;
    this.randomlyDash = true;
    this.randomlyJump = false;
    this.randomlyChangeWeapon = false;
    this.randomlyChargeWeapon = true;
  }
  update() {
    super.update();
    this.time += game.deltaTime;
    this.ai.doJump();
    if(this.jumpZoneDir === -1) {
      this.player.press("left");
    }
    else if(this.jumpZoneDir === 1) {
      this.player.press("right");
    }
    //Check if out of zone
    if(this.character && this.character.collider) {
      if(!this.character.collider.isCollidingWith(this.jumpZone.collider)) {
        this.ai.changeState(new FindPlayer(this.character));
      }
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
