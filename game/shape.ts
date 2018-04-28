import { Point } from "./point";
import { Rect } from "./rect";

class Line {
  point1: Point;
  point2: Point;
  constructor(point1: Point, point2: Point) {
    this.point1 = point1;
    this.point2 = point2;
  }
  intersectsLine(other: Line): boolean {
    let a = this.point1.x;
    let b = this.point1.y;
    let c = this.point2.x;
    let d = this.point2.y;

    let p = other.point1.x;
    let q = other.point1.y;
    let r = other.point2.x;
    let s = other.point2.y;

    var det, gamma, lambda;
    det = (c - a) * (s - q) - (r - p) * (d - b);
    if (det === 0) {
      return false;
    } else {
      lambda = ((s - q) * (r - a) + (p - r) * (s - b)) / det;
      gamma = ((b - d) * (r - a) + (c - a) * (s - b)) / det;
      return (0 < lambda && lambda < 1) && (0 < gamma && gamma < 1);
    }
  }
}

export class Shape {

  points: Point[];

  constructor(points: Point[]) {
    this.points = points;
  }

  getRect(): Rect {
    if(this.points.length !== 4) return undefined;
    if(this.points[0].ix === this.points[3].ix && this.points[1].ix === this.points[2].ix && this.points[0].iy === this.points[1].iy && this.points[2].iy === this.points[3].iy) {
      return Rect.Create(this.points[0], this.points[2]);
    }
    return undefined;
  }

  getLines(): Line[] {
    let lines: Line[] = [];
    for(let i = 0; i < this.points.length; i++) {
      let next = i+1;
      if(next >= this.points.length) next = 0;
      lines.push(new Line(this.points[i], this.points[next]));
    }
    return lines;
  }

  intersectsShape(other: Shape): boolean {
    let rect1 = this.getRect();
    let rect2 = other.getRect();
    if(rect1 && rect2) {
      // If one rectangle is on left side of other
      if (rect1.x1 > rect2.x2 || rect2.x1 > rect1.x2)
        return false;
      // If one rectangle is above other
      if (rect1.y1 > rect2.y2 || rect2.y1 > rect1.y2)
        return false;
      return true;
    }
    else {
      let lines1 = this.getLines();
      let lines2 = other.getLines();
      for(var line1 of lines1) {
        for(var line2 of lines2) {
          if(line1.intersectsLine(line2)) {
            return true;
          }
        }
      }
      return false;
    }
  }

  clone(x: number, y: number) {
    let points: Point[] = [];
    for(let point of this.points) {
      points.push(new Point(point.x + x, point.y + y));
    }
    return new Shape(points);
  }

}