import { Sprite } from "./sprite";
import { Point } from "./point";
import { Collider, CollideData } from "./collider";
import { game } from "./game";
import * as Helpers from "./helpers";
import { Palette } from "./color";

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
  renderEffect: string;
  palette: Palette;

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

    if(this.collider && !this.collider.isTrigger && this.useGravity) {
      if(game.level.checkCollisionActor(this, 0, 1, false)) {
        this.grounded = true;
        this.vel.y = 0;
      }
      else {
        this.grounded = false;
      }
    }
  }

  preUpdate() {
    this.collidedInFrame.clear();
  }

  move(amount: Point) {

    //No collider: just move
    if(!this.collider) {
      this.pos.inc(amount.times(game.deltaTime));
    }
    //Trigger collider: check collision on the spot and move
    else if(this.collider && this.collider.isTrigger) {
      let collideData = game.level.checkCollisionActor(this, amount.x * game.deltaTime, amount.y * game.deltaTime, true, amount);
      if(collideData) {
        this.registerCollision(collideData);
      }
      this.pos.inc(amount.times(game.deltaTime));
    }
    //Regular collider: need to detect collision incrementally and stop moving past a collider if that's the case
    else {
      let inc: Point = amount.clone();

      while(inc.magnitude > 0) {
        let collideData = game.level.checkCollisionActor(this, inc.x * game.deltaTime, inc.y * game.deltaTime, false);
        if(collideData) {
          this.registerCollision(collideData);
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
  }

  render(x: number, y: number) {
    //console.log(this.pos.x + "," + this.pos.y);
    this.sprite.draw(this.frameIndex, this.pos.x + x, this.pos.y + y, this.xDir, this.yDir, this.renderEffect, 1, this.palette);
    this.renderEffect = "";
    if(game.showHitboxes && this.collider) {
      Helpers.drawPolygon(game.ctx, this.collider.shape.clone(x, y), true, "blue", "", 0, 0.5);
      Helpers.drawCircle(game.ctx, this.pos.x + x, this.pos.y + y, 1, "red");
    }
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
      let anim = new Anim(this.pos, sprite, this.xDir);
    }
    if(fadeSound) {
      game.playSound(fadeSound);
    }
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