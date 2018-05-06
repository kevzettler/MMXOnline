import { Geometry } from "./geometry";
import { Point } from "./point";

export class Wall extends Geometry {
  constructor(points: Point[]) {
    super(points);
    this.collider.isClimbable = true;
  }
}