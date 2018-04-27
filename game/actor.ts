import { Sprite } from "./sprite";
import { Point } from "./point";
import { Collider } from "./collider";
import { game } from "./game";
import * as Helpers from "./helpers";

//Anything that has: a position, rotation and name. Can also have an optional collider
export class Actor {

  sprite: Sprite; //Current sprite
  frameIndex: number; //Current frame index of sprite
  pos: Point; //Current location
  vel: Point;
  angle: number;
  useGravity: boolean;
  name: string;

  constructor() {
    this.pos = new Point(0, 0);
    this.vel = new Point(0, 0);
    this.angle = 0;
    this.useGravity = true;
    this.frameIndex = 0;
    this.name = "";
  }

  update() {
    if(this.useGravity) {
      this.vel.y += game.level.gravity * game.deltaTime;
      if(this.vel.y > 1000) {
        this.vel.y = 0;
      }
    }
    let inc: Point = this.vel.clone();
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
    this.sprite.draw(this.frameIndex, this.pos.x, this.pos.y);
    if(game.showHitboxes && this.collider) {
      Helpers.drawPolygon(game.ctx, this.collider.shape.points, true, "blue", "", 0, 0.5);
    }
  }

  onCollision(other: Collider) {
    
  }

  onTrigger(other: Collider) {

  }

  get collider(): Collider {
    if(this.sprite.hitboxes.length === 0) return undefined;
    let offset = this.sprite.getAlignOffset(this.frameIndex);
    return this.sprite.hitboxes[0].clone(this.pos.x + offset.x, this.pos.y + offset.y);
  }

  hasCollisionBox() {
    if(this.sprite.hitboxes.length === 0) return false;
    if(this.sprite.hitboxes[0].isTrigger) return false;
    return true;
  }

}