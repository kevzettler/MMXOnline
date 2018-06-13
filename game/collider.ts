import { Point } from "./point";
import { GameObject } from "./gameObject";
import { Shape } from "./shape";
import { game } from "./game";
import { Actor } from "./actor";

export class Collider {

  _shape: Shape;
  isTrigger: boolean;
  wallOnly: boolean = false;
  isClimbable: boolean = true;
  //gameObject: GameObject;
  actor: Actor;

  constructor(points: Point[], isTrigger: boolean, actor: Actor, isClimbable: boolean) {
    this._shape = new Shape(points);
    this.isTrigger = isTrigger;
    //this.gameObject = gameObject;
    this.actor = actor;
    this.isClimbable = isClimbable;
  }

  getWorldCollider(actor: Actor) {
    
  }

  get shape() {
    let offset = new Point(0, 0);
    if(this.actor) {
      let rect = this._shape.getRect();
      offset = this.actor.sprite.getAlignOffsetHelper(rect, new Point(0,0), this.actor.xDir, this.actor.yDir);
      offset.x += this.actor.pos.x;
      offset.y += this.actor.pos.y
    }
    return this._shape.clone(offset.x, offset.y);
  }

  onCollision(other: CollideData) {
    
  }

  isCollidingWith(other: Collider) {
    return this.shape.intersectsShape(other.shape);
  }

  /*
  clone(x: number, y: number, gameObject: GameObject) {
    let shape = this.shape.clone(x, y);
    //@ts-ignore
    return _.cloneDeep(this);
  }
  */

}

export class CollideData {

  collider: Collider; //The other thing that was collided with
  vel: Point; //The velocity at which we collided with the other thing above
  isTrigger: boolean;
  gameObject: GameObject; //Gameobject of collider
  normal: Point;
  hitPoint: Point;

  constructor(collider: Collider, vel: Point, isTrigger: boolean, gameObject: GameObject, normal: Point, hitPoint: Point) {
    this.collider = collider;
    this.vel = vel;
    this.isTrigger = isTrigger;
    this.gameObject = gameObject;
    this.normal = normal;
    this.hitPoint = hitPoint;
  }

}