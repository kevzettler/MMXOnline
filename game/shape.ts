import { Point } from "./point";
import { Rect } from "./rect";

export class Line {
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

    let det, gamma, lambda;
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

  //@ts-ignore
  checkLineIntersection(line1StartX, line1StartY, line1EndX, line1EndY, line2StartX, line2StartY, line2EndX, line2EndY) {
    // if the lines intersect, the result contains the x and y of the intersection (treating the lines as infinite) and booleans for whether line segment 1 or line segment 2 contain the point
    let denominator, a, b, numerator1, numerator2, result = {
        //@ts-ignore
        x: null,
        //@ts-ignore
        y: null,
        onLine1: false,
        onLine2: false
    };
    denominator = ((line2EndY - line2StartY) * (line1EndX - line1StartX)) - ((line2EndX - line2StartX) * (line1EndY - line1StartY));
    if (denominator == 0) {
        return result;
    }
    a = line1StartY - line2StartY;
    b = line1StartX - line2StartX;
    numerator1 = ((line2EndX - line2StartX) * a) - ((line2EndY - line2StartY) * b);
    numerator2 = ((line1EndX - line1StartX) * a) - ((line1EndY - line1StartY) * b);
    a = numerator1 / denominator;
    b = numerator2 / denominator;

    // if we cast these lines infinitely in both directions, they intersect here:
    result.x = line1StartX + (a * (line1EndX - line1StartX));
    result.y = line1StartY + (a * (line1EndY - line1StartY));
    /*
    // it is worth noting that this should be the same as:
    x = line2StartX + (b * (line2EndX - line2StartX));
    y = line2StartX + (b * (line2EndY - line2StartY));
    */
    // if line1 is a segment and line2 is infinite, they intersect if:
    if (a > 0 && a < 1) {
        result.onLine1 = true;
    }
    // if line2 is a segment and line1 is infinite, they intersect if:
    if (b > 0 && b < 1) {
        result.onLine2 = true;
    }
    // if line1 and line2 are segments, they intersect if both of the above are true
    return result;
  }

  getIntersectPoint(other: Line): Point {
    let intersection = this.checkLineIntersection(this.x1, this.y1, this.x2, this.y2, other.x1, other.y1, other.x2, other.y2);
    if(intersection.x !== null && intersection.y !== null)
      return new Point(intersection.x, intersection.y);
    return undefined;
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
    let slope;
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

  getNormals(): Point[] {
    let normals = [];
    for (let i = 0; i < this.points.length; i++) {
      let p1 = this.points[i];
      let p2 = (i == this.points.length - 1 ? this.points[0] : this.points[i + 1]);
      let v = new Point(p2.x - p1.x, p2.y - p1.y);
      normals.push(v.leftNormal().normalize());
    }
    return normals;
  }

  intersectsLine(line: Line) {
    let lines = this.getLines();
    for(let myLine of lines) {
      if(myLine.intersectsLine(line)) {
        return true;
      }
    }
    return false;
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
      for(let line1 of lines1) {
        for(let line2 of lines2) {
          if(line1.intersectsLine(line2)) {
            return true;
          }
        }
      }
      return false;
    }
  }

  containsPoint(point: Point): boolean {
    let x = point.x;
    let y = point.y;
    let vertices = this.points;
    // ray-casting algorithm based on
    // http://www.ecse.rpi.edu/Homepages/wrf/Research/Short_Notes/pnpoly.html
    let inside: boolean = false;
    for (let i:number = 0, j:number = vertices.length - 1; i < vertices.length; j = i++) {
        let xi:number = vertices[i].x, yi:number = vertices[i].y;
        let xj:number = vertices[j].x, yj:number = vertices[j].y;

        let intersect: boolean = ((yi > y) !== (yj > y))
            && (x < (xj - xi) * (y - yi) / (yj - yi) + xi);
        if (intersect) inside = !inside;
    }
    return inside;
  }


  getIntersectPoint(point: Point, dir: Point) {
    if(this.containsPoint(point)) {
      return point;
    }
    let intersections: Point[] = [];
    let pointLine = new Line(point, point.add(dir));
    for(let line of this.getLines()) {
      let intersectPoint = line.getIntersectPoint(pointLine);
      if(intersectPoint) {
        intersections.push(intersectPoint);
      }
    }
    if(intersections.length === 0) return undefined;
    
    //@ts-ignore
    return _.minBy(intersections, (intersectPoint) => {
      return intersectPoint.distanceTo(point);
    });

  }

  getClosestPointOnBounds(point: Point) {

  }

  // project vectors on to normal and return min/max value
  minMaxDotProd(normal: Point) {
    let min: number = null,
        max: number = null;
    for (let point of this.points) {
      let dp = point.dotProduct(normal);
      if (min === null || dp < min) min = dp;
      if (max === null || dp > max) max = dp;
    }
    return [min, max];
  }
  
  checkNormal(other: Shape, normal: Point) {
    // project points onto normal to find bounds of shadow on axis
    let aMinMax = this.minMaxDotProd(normal);
    let bMinMax = other.minMaxDotProd(normal);
    // check for overlap of shadows on axis
    if (aMinMax[0] <= bMinMax[1] && aMinMax[1] >= bMinMax[0]) {
      // correction vector is in direction of normal x amount overlapping
      let correction = normal.times(bMinMax[1] - aMinMax[0]);
      //correction.surface = normal.rightNormal();
      return correction;
    }
    return undefined;
  }

  getMinTransVector(b: Shape): Point {
    let correctionVectors = [];
    // project a&b points on a's normals and check for overlaps
    for (let normal of this.getNormals()) {
      let result = this.checkNormal(b, normal);
      if (result) correctionVectors.push(result);
      //else return undefined;
    }
    // project a&b poitns on b's normals and check for overlaps
    for (let normal of b.getNormals()) {
      let result = this.checkNormal(b, normal);
      if (result) correctionVectors.push(result);
      //else return undefined;
    }
    // if we have any overlaps, return smallest correction vector
    if (correctionVectors.length > 0) {
      //@ts-ignore
      return _.minBy(correctionVectors, (correctionVector) => {
        return correctionVector.magnitude;
      });
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