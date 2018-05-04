import { Sprite } from "./sprite";
import { Point } from "./point";
import { Collider } from "./collider";
import { game } from "./game";
import * as Helpers from "./helpers";

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
  angle: number;
  useGravity: boolean;
  grounded: boolean;
  name: string;
  globalCollider: Collider; //If no collider data found in sprite, fall back to this one
  collidedInFrame: Set<Collider>;
  triggeredInFrame: Set<Collider>;
  renderEffect: string;

  constructor(sprite: Sprite) {
    this.pos = new Point(0, 0);
    this.vel = new Point(0, 0);
    this.angle = 0;
    this.useGravity = true;
    this.frameIndex = 0;
    this.frameSpeed = 1;
    this.frameTime = 0;
    this.name = "";
    this.xDir = 1;
    this.yDir = 1;
    this.grounded = false;
    game.level.addGameObject(this);
    this.collidedInFrame = new Set<Collider>();
    this.triggeredInFrame = new Set<Collider>();
    this.renderEffect = "";
    this.changeSprite(sprite, true);
  }

  changeSprite(sprite: Sprite, resetFrame: boolean) {
    if(!sprite) return;

    ///@ts-ignoretsignore
    this.sprite = _.cloneDeep(sprite);
    
    if(resetFrame) {
      this.frameIndex = 0;
      this.frameTime = 0;
    }
    else if(this.frameIndex >= this.sprite.frames.length) {
      this.frameIndex = 0;
    }
  }

  get currentFrame() {
    return this.sprite.frames[this.frameIndex];
  }

  update() {
    
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
    this.move(this.vel);

    if(this.collider && !this.collider.isTrigger) {
      if(game.level.checkCollisionActor(this, 0, 1)) {
        this.grounded = true;
        this.vel.y = 0;
      }
      else {
        this.grounded = false;
      }
    }
    else if(this.collider) {
      let trigger = game.level.checkTriggerActor(this, 0, 0);
      if(trigger) {
        this.registerTrigger(trigger);
      }
    }
  }

  preUpdate() {
    this.triggeredInFrame.clear();
    this.collidedInFrame.clear();
  }

  move(amount: Point) {
    let inc: Point = amount.clone();
    while(inc.magnitude > 0) {
      let collider = game.level.checkCollisionActor(this, inc.x * game.deltaTime, inc.y * game.deltaTime);
      if(collider) {
        this.registerCollision(collider);
        inc.multiply(0.5);
        if(inc.magnitude < 0.5) {
          inc.x = 0;
          inc.y = 0;
          break;
        } 
      }
      else {
        break;
      }
    }
    this.pos.inc(inc.multiply(game.deltaTime));
  }

  render(x: number, y: number) {
    //console.log(this.pos.x + "," + this.pos.y);
    this.sprite.draw(this.frameIndex, this.pos.x + x, this.pos.y + y, this.xDir, this.yDir, this.renderEffect);
    this.renderEffect = "";
    if(game.showHitboxes && this.collider) {
      Helpers.drawPolygon(game.ctx, this.collider.shape.clone(x, y), true, "blue", "", 0, 0.5);
      Helpers.drawCircle(game.ctx, this.pos.x + x, this.pos.y + y, 1, "red");
    }
  }

  registerCollision(other: Collider) {
    if(!this.collidedInFrame.has(other)) {
      this.collidedInFrame.add(other);
      this.onCollision(other);
    }
  }

  registerTrigger(other: Collider) {
    if(!this.triggeredInFrame.has(other)) {
      this.triggeredInFrame.add(other);
      this.onTrigger(other);
    }
  }

  onCollision(other: Collider) {
  }

  onTrigger(other: Collider) {
  }

  get collider(): Collider {
    if(this.sprite.hitboxes.length === 0) {
      if(this.globalCollider) {
        let rect = this.globalCollider.shape.getRect();
        let offset = this.sprite.getAlignOffsetHelper(rect, new Point(0,0), this.xDir, this.yDir);
        return this.globalCollider.clone(this.pos.x + offset.x, this.pos.y + offset.y, this);
      }
      return undefined;
    }
    let offset = this.sprite.getAlignOffset(0, this.xDir, this.yDir);
    return this.sprite.hitboxes[0].clone(this.pos.x + offset.x, this.pos.y + offset.y, this);
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
      let anim = new Anim(this.pos.x, this.pos.y, sprite);
    }
    if(fadeSound) {
      game.playSound(fadeSound);
    }
  }

}

class Anim extends Actor {

  constructor(x: number, y: number, sprite: Sprite) {
    super(sprite);
    this.pos.x = x;
    this.pos.y = y;
    this.useGravity = false;
    
  }

  update() {
    super.update();
    if(this.isAnimOver()) {
      this.destroySelf();
    }
  }

}