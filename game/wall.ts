import { Geometry } from "./geometry";
import { Point } from "./point";

export class Wall extends Geometry {
  constructor(points: Point[]) {
    super(points);
    this.collider.isClimbable = true;
  }
}

export class Ladder extends Geometry {
  constructor(points: Point[]) {
    super(points);
    this.collider.isTrigger = true;
  }
}