import { Sprite } from "./sprite";
import { Point } from "./point";
import { Collider } from "./collider";
import { game } from "./game";
import * as Helpers from "./helpers";

//Anything that has: a position, rotation and name. Can also have an optional collider
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

  constructor() {
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
    game.level.addGameObject(this);
  }

  changeSprite(sprite: Sprite, resetFrame: boolean) {
    this.sprite = sprite;
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
    this.grounded = false;
    this.frameTime += game.deltaTime * this.frameSpeed;
    if(this.frameTime >= this.currentFrame.duration) {
      this.frameTime = 0;
      this.frameIndex++;
      if(this.frameIndex >= this.sprite.frames.length) this.frameIndex = 0;
    }

    if(this.useGravity) {
      this.vel.y += game.level.gravity * game.deltaTime;
      if(this.vel.y > 1000) {
        this.vel.y = 0;
      }
    }
    if(game.level.checkCollisionActor(this, 0, this.vel.y * game.deltaTime)) {
      this.grounded = true;
      this.vel.y = 0;
    }
    this.move(this.vel);
  }

  move(amount: Point) {
    let inc: Point = amount.clone();
    while(inc.magnitude > 0) {
      if(game.level.checkCollisionActor(this, inc.x * game.deltaTime, inc.y * game.deltaTime)) {
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
    this.pos.add(inc.multiply(game.deltaTime));
  }

  render() {
    //console.log(this.pos.x + "," + this.pos.y);
    this.sprite.draw(this.frameIndex, this.pos.x, this.pos.y, this.xDir, this.yDir);
    if(game.showHitboxes && this.collider) {
      Helpers.drawPolygon(game.ctx, this.collider.shape.points, true, "blue", "", 0, 0.5);
    }
  }

  onCollision(other: Collider) {
    
  }

  onTrigger(other: Collider) {

  }

  get collider(): Collider {
    let offset = this.sprite.getAlignOffset(0);

    if(this.sprite.hitboxes.length === 0) {
      if(this.globalCollider) {
        return this.globalCollider.clone(this.pos.x + offset.x, this.pos.y + offset.y);
      }
      return undefined;
    }
    return this.sprite.hitboxes[0].clone(this.pos.x + offset.x, this.pos.y + offset.y);
  }

  hasCollisionBox() {
    if(this.sprite.hitboxes.length === 0) return false;
    if(this.sprite.hitboxes[0].isTrigger) return false;
    return true;
  }

}