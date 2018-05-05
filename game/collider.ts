import { Point } from "./point";
import { GameObject } from "./gameObject";
import { Shape } from "./shape";
import { game } from "./game";

export class CollideData {

  collider: Collider;
  point: Point;
  normal: Point;

  constructor(collider: Collider, point: Point, normal: Point) {
    this.collider = collider;
    this.point = point;
    this.normal = normal;
  }

}

export class Collider {

  shape: Shape;
  isTrigger: boolean;
  isClimbable: boolean;
  gameObject: GameObject;

  constructor(points: Point[], isTrigger: boolean, gameObject: GameObject) {
    this.shape = new Shape(points);
    this.isTrigger = isTrigger;
    this.gameObject = gameObject;
  }

  onCollision(other: CollideData) {
    
  }

  clone(x: number, y: number, gameObject: GameObject) {
    let shape = this.shape.clone(x, y);
    return new Collider(shape.points, this.isTrigger, gameObject);
  }

}