import { Point } from "./point";
import { GameObject } from "./gameObject";
import { Shape } from "./shape";
import { game } from "./game";

export class Collider {

  _shape: Shape;
  isTrigger: boolean;
  wallOnly: boolean = false;
  isClimbable: boolean = true;
  //gameObject: GameObject;
  offset: Point = new Point(0, 0);

  constructor(points: Point[], isTrigger: boolean) {
    this._shape = new Shape(points);
    this.isTrigger = isTrigger;
    //this.gameObject = gameObject;
  }

  get shape() {
    return this._shape.clone(this.offset.x, this.offset.y);
  }

  onCollision(other: CollideData) {
    
  }

  changePos(x: number, y: number) {
    this.offset.x = x;
    this.offset.y = y;
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

  constructor(collider: Collider, vel: Point, isTrigger: boolean, gameObject: GameObject) {
    this.collider = collider;
    this.vel = vel;
    this.isTrigger = isTrigger;
    this.gameObject = gameObject;
  }

}