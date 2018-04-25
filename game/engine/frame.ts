import { Rect } from "./rect";
import { Point } from "./point";
import { Collider } from "./collider";

export class Frame {

  rect: Rect;
  duration: number;
  offset: Point;
  hitboxes: Collider[];

  constructor(rect: Rect, duration: number, offset: Point) {
    this.rect = rect;
    this.duration = duration;
    this.offset = offset;
    this.hitboxes = [];
  }
}