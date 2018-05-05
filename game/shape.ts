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

  get x1() { return this.point1.x; }
  get y1() { return this.point1.y; }
  get x2() { return this.point2.x; }
  get y2() { return this.point2.y; }

  getIntersectPoint(other: Line): Point {

    if(!this.intersectsLine(other)) return undefined;

    let x11 = this.x1;
    let x21 = this.x2;
    let y11 = this.y1;
    let y21 = this.y2;
    
    let x12 = other.x1;
    let x22 = other.x2;
    let y12 = other.y1;
    let y22 = other.y2;

    var slope1, slope2, yint1, yint2, intx, inty;
    if (x11 == x21 && y11 == y21) {
      return new Point(x11, y11);
    }
    if (x12 == x22 && y12 == y22) {
      return new Point(x12, y22);
    }
    
    if (x11 == x21 && y12 == y22) {
      return new Point(x11, y12);
    }
    if (x12 == x22 && y11 == y21) {
      return new Point(x12, y11);
    }

    slope1 = this.slope;
    slope2 = other.slope;
    if (slope1 === slope2) return undefined;

    yint1 = this.yInt;
    yint2 = other.yInt;
    if (yint1 === yint2) return isNaN(yint1) ? undefined : new Point(0, yint1);

    if (isNaN(slope1)) {
      if(isNaN(slope2) || isNaN(yint2)) throw "NaN!";
      return new Point(y21, slope2 * y21 + yint2);
    }
    if (isNaN(slope2)) {
      if(isNaN(slope1) || isNaN(yint1)) throw "NaN!";
      return new Point(y11, slope1 * y11 + yint1);
    }
    intx = (slope1 * x11 + yint1 - yint2)/ slope2;
    if(isNaN(intx) || isNaN(yint1)) throw "NaN!";
    return new Point(intx, slope1 * intx + yint1);
  }

  get slope() {
    if (this.x1 == this.x2) return NaN;
    return (this.y1 - this.y2) / (this.x1 - this.x2);
  }
  
  get yInt() {
    if (this.x1 === this.x2) return this.y1 === 0 ? 0 : NaN;
    if (this.y1 === this.y2) return this.y1;
    return this.y1 - this.slope * this.x1;
  }

  get xInt() {
    var slope;
    if (this.y1 === this.y2) return this.x1 == 0 ? 0 : NaN;
    if (this.x1 === this.x2) return this.x1;
    return (-1 * ((slope = this.slope * this.x1 - this.y1)) / this.slope);
  }

}

export class IntersectData {

  intersectPoint: Point;
  normal: Point;

  constructor(intersectPoint: Point, normal: Point) {
    this.intersectPoint = intersectPoint;
    this.normal = normal;
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

  //Given 2 shapes that intersect, and that this (the first shape) is going in dir vel, find the exact point of intersection on shape 2
  //and also get the normal
  getIntersectData(point: Point, dir: Point) {
    let pointLine = new Line(point, point.add(dir.times(-1.5)));
    for(let line of this.getLines()) {
      let intersectPoint = line.getIntersectPoint(pointLine);
      if(intersectPoint) {
        let normal = undefined;
        return new IntersectData(intersectPoint, normal);
      }
    }
    return undefined;
  }

  clone(x: number, y: number) {
    let points: Point[] = [];
    for(let point of this.points) {
      points.push(new Point(point.x + x, point.y + y));
    }
    return new Shape(points);
  }

}