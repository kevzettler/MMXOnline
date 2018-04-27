import { Point } from "./point";
import { GameObject } from "./gameObject";
import { Shape } from "./shape";

export class Collider {

  shape: Shape;
  isTrigger: boolean;
  gameObject: GameObject;

  constructor(points: Point[]) {
    this.shape = new Shape(points);
  }

  onCollision(other: Collider) {
    
  }

  onTrigger(other: Collider) {

  }

  clone(x: number, y: number) {
    let shape = this.shape.clone(x, y);
    return new Collider(shape.points);
  }

}