import { Sprite } from "./sprite";
import { Point } from "./point";
import { Collider, CollideData } from "./collider";
import { game } from "./game";
import * as Helpers from "./helpers";
import { Palette } from "./color";
import { Shape } from "./shape";
import { Character } from "./character";
import { RollingShield } from "./weapon";
import { RollingShieldProj } from "./projectile";

//Anything that has: a position, rotation, name and sprite. Can also have an optional collider
//This MUST have a sprite. There is too much maintenance effort to support a sprite-less actor class
export class Actor {

  sprite: Sprite; //Current sprite
  frameIndex: number; //Current frame index of sprite
  frameSpeed: number; //Multiplier for how fast frameIndex gets incremented. defaults to 1
  frameTime: number;  //The current time of the frame
  xDir: number; //-1 or 1
  yDir: number;
  pos: Point; //Current location
  vel: Point;
  _angle: number;
  useGravity: boolean;
  grounded: boolean;
  name: string;
  globalCollider: Collider; //If no collider data found in sprite, fall back to this one
  collidedInFrame: Set<Collider>;
  renderEffect: string;
  palette: Palette;
  renderEffectTime: number = 0;

  constructor(sprite: Sprite, dontAddToLevel?: boolean) {
    this.pos = new Point(0, 0);
    this.vel = new Point(0, 0);
    this.useGravity = true;
    this.frameIndex = 0;
    this.frameSpeed = 1;
    this.frameTime = 0;
    this.name = "";
    this.xDir = 1;
    this.yDir = 1;
    this.grounded = false;
    if(!dontAddToLevel) {
      game.level.addGameObject(this);
    }
    this.collidedInFrame = new Set<Collider>();
    this.renderEffect = "";
    this.changeSprite(sprite, true);
  }

  changeSprite(sprite: Sprite, resetFrame: boolean) {
    if(!sprite) return;

    ///@ts-ignoretsignore
    this.sprite = _.cloneDeep(sprite);

    for(let hitbox of this.sprite.hitboxes) {
      hitbox.actor = this;
    }
    
    if(resetFrame) {
      this.frameIndex = 0;
      this.frameTime = 0;
    }
    else if(this.frameIndex >= this.sprite.frames.length) {
      this.frameIndex = 0;
    }
  }

  get angle() {
    return this._angle;
  }

  set angle(value: number) {
    this._angle = value;
    if(this._angle < 0) this._angle += 360;
    if(this._angle > 360) this._angle -= 360;
  }

  get currentFrame() {
    return this.sprite.frames[this.frameIndex];
  }

  update() {
    
    this.renderEffectTime = Helpers.clampMin0(this.renderEffectTime - game.deltaTime);
    if(this.renderEffectTime <= 0) {
      this.renderEffect = "";
    }

    this.frameTime += game.deltaTime * this.frameSpeed;
    if(this.frameTime >= this.currentFrame.duration) {
      let onceEnd = this.sprite.wrapMode === "once" && this.frameIndex === this.sprite.frames.length - 1;
      if(!onceEnd) {
        this.frameTime = this.sprite.loopStartFrame;
        this.frameIndex++;
        if(this.frameIndex >= this.sprite.frames.length) this.frameIndex = 0;
      }
    }

    if(this.useGravity && !this.grounded) {
      this.vel.y += game.level.gravity * game.deltaTime;
      if(this.vel.y > 1000) {
        this.vel.y = 1000;
      }
    }

    if(this.constructor.name === "Character")
      this.move(this.vel, true, false, true);
    else
      this.move(this.vel, true, true, true);
      
    if(this.collider && !this.collider.isTrigger) {

      let yDist = 1;
      //If already grounded, snap to ground further
      if(this.grounded) {
        yDist = 300 * game.deltaTime;
      }

      let collideData = game.level.checkCollisionActor(this, 0, yDist);
      if(collideData && this.vel.y >= 0) {
        //Determine if grounded, and
        //snap to ground if close. Use x-vel to determine amount to snap. If it's 0, use default value
        this.grounded = true;
        this.vel.y = 0;
        let yVel = new Point(0, yDist);
        let mtv = game.level.getMtvDir(this, 0, yDist, yVel, false);
        if(mtv) {
          this.pos.inc(yVel);
          this.pos.inc(mtv.unitInc(0.01));
        }
      }
      else {
        this.grounded = false;
      }
    }

    //Process trigger events. Must loop thru all collisions in this case.
    let triggerList = game.level.getTriggerList(this, 0, 0);
    for(let trigger of triggerList) {
      this.registerCollision(trigger);
    }

  }

  preUpdate() {
    this.collidedInFrame.clear();
  }

  sweepTest(offset: Point) {
    let inc: Point = offset.clone();
    let collideData = game.level.checkCollisionActor(this, inc.x, inc.y);
    if(collideData) {
      return true; 
    }
    return false;
  }


  move(amount: Point, useDeltaTime: boolean = true, pushIncline: boolean = true, snapInclineGravity: boolean = true) {

    let times = useDeltaTime ? game.deltaTime : 1;
    let collideData: CollideData;

    //No collider: just move
    if(!this.collider) {
      this.pos.inc(amount.times(times));
    }
    //Regular collider: need to detect collision incrementally and stop moving past a collider if that's the case
    else {

      //Already were colliding in first place: free with path of least resistance
      let currentCollideDatas = game.level.getAllCollideDatas(this, 0, 0, undefined);
      for(let collideData of currentCollideDatas) {
        //console.log("ALREADY COLLIDING")
        let freeVec = this.collider.shape.getMinTransVector(collideData.collider.shape);
        this.pos.inc(freeVec.unitInc(0.01));
      }

      let inc: Point = amount.clone();
      let incAmount = inc.multiply(times);

      let mtv = game.level.getMtvDir(this, incAmount.x, incAmount.y, inc, pushIncline);
      this.pos.inc(incAmount);
      if(mtv) {
        //if(mtv.magnitude > 50) {
        //  mtv = game.level.getMtvDir(this, incAmount.x, incAmount.y, inc, pushIncline);
        //}
        this.pos.inc(mtv.unitInc(0.01));
      }

    }
  }

  isRollingShield() {
    return this.constructor.name === "RollingShieldProj";
  }

  render(x: number, y: number) {
    //console.log(this.pos.x + "," + this.pos.y);
    
    if(this.angle === undefined) {
      this.sprite.draw(game.ctx, this.frameIndex, this.pos.x + x, this.pos.y + y, this.xDir, this.yDir, this.renderEffect, 1, this.palette);
    }
    else {
      this.renderFromAngle(x, y);
    }
    
    if(game.options.showHitboxes && this.collider) {
      Helpers.drawPolygon(game.ctx, this.collider.shape.clone(x, y), true, "blue", "", 0, 0.5);
      Helpers.drawCircle(game.ctx, this.pos.x + x, this.pos.y + y, 1, "red");
    }
  }

  renderFromAngle(x: number, y: number) {
    this.sprite.draw(game.ctx, 0, this.pos.x + x, this.pos.y + y, 1, 1, this.renderEffect, 1, this.palette);
  }

  registerCollision(other: CollideData) {
    if(!this.collidedInFrame.has(other.collider)) {
      this.collidedInFrame.add(other.collider);
      this.onCollision(other);
    }
  }

  onCollision(other: CollideData) {
  }

  get collider(): Collider {
    if(this.sprite.hitboxes.length === 0) {
      if(this.globalCollider) {
        return this.globalCollider;
      }
      return undefined;
    }
    //let offset = this.sprite.getAlignOffset(this.frameIndex, this.xDir, this.yDir);
    //this.sprite.hitboxes[0].changePos(this.pos.x + offset.x, this.pos.y + offset.y);
    return this.sprite.hitboxes[0];
  }

  hasCollisionBox() {
    if(this.sprite.hitboxes.length === 0) return false;
    if(this.sprite.hitboxes[0].isTrigger) return false;
    return true;
  }

  isAnimOver() {
    return this.frameIndex === this.sprite.frames.length - 1 && this.frameTime >= this.currentFrame.duration;
  }

  //Optionally take in a sprite to draw when destroyed
  destroySelf(sprite?: Sprite, fadeSound?: string) {
    game.level.gameObjects.splice(game.level.gameObjects.indexOf(this), 1);
    if(sprite) {
      let anim = new Anim(this.pos, sprite, this.xDir);
    }
    if(fadeSound) {
      this.playSound(fadeSound);
    }
  }

  getSoundVolume() {
    let dist = new Point(game.level.camCenterX, game.level.camCenterY).distanceTo(this.pos);
    let volume = 1 - (dist / (game.level.screenWidth));
    volume = Helpers.clampMin0(volume);
    return volume;
  }

  playSound(soundName: string, overrideVolume?: number) {
    let volume = this.getSoundVolume();
    if(overrideVolume !== undefined) volume = overrideVolume;
    volume = Helpers.clampMin0(volume);
    game.playSound(soundName, volume);
  }

  withinX(other: Actor, amount: number) {
    return Math.abs(this.pos.x - other.pos.x) <= amount;
  }
  
  withinY(other: Actor, amount: number) {
    return Math.abs(this.pos.y - other.pos.y) <= amount;
  }

  isFacing(other: Actor) {
    return ((this.pos.x < other.pos.x && this.xDir === 1) || (this.pos.x >= other.pos.x && this.xDir === -1));
  }

  get centerPos() {
    if(!this.globalCollider) return this.pos;
    let rect = this.globalCollider.shape.getRect();
    if(!rect) return this.pos;

    if(this.sprite.alignment.includes("bot")) {
      let pos = this.pos.addxy(0, -rect.h / 2);
      return pos;
    }

    return this.pos;
  }

}

export class Anim extends Actor {

  constructor(pos: Point, sprite: Sprite, xDir: number) {
    super(sprite);
    this.pos.x = pos.x;
    this.pos.y = pos.y;
    this.useGravity = false;
    this.xDir = xDir;
    
  }

  update() {
    super.update();
    if(this.isAnimOver()) {
      this.destroySelf();
    }
  }

}