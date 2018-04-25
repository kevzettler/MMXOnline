import { Point } from "./point";
import { GameObject } from "./gameObject";

export class Collider {

  points: Point[];
  collide: boolean;
  trigger: boolean;
  gameObject: GameObject;

  constructor(points: Point[]) {
    this.points = points;
  }

  onCollision(other: Collider) {
    
  }

  onTrigger(other: Collider) {

  }

}