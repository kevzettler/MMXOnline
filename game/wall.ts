import { Geometry } from "./geometry";

export class Wall extends Geometry {
  constructor() {
    super();
    this.collider.isClimbable = true;
  }
}