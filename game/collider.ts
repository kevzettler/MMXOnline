import { Point } from "./point";
import { GameObject } from "./gameObject";
import { Shape } from "./shape";
import { game } from "./game";

export class Collider {

  shape: Shape;
  isTrigger: boolean;
  gameObject: GameObject;

  constructor(points: Point[], isTrigger: boolean, gameObject: GameObject) {
    this.shape = new Shape(points);
    this.isTrigger = isTrigger;
    this.gameObject = gameObject;
  }

  onCollision(other: Collider) {
    
  }

  onTrigger(other: Collider) {

  }

  clone(x: number, y: number) {
    let shape = this.shape.clone(x, y);
    return new Collider(shape.points, this.isTrigger, this.gameObject);
  }

}