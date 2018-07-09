import { Point } from "./point";
import { Rect } from "./rect";
import { CollideData, HitData } from "./collider";
import { GameObject } from "./gameObject";
import { game } from "./game";

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
    if(!this.intersectsLine(other)) return undefined;
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
  normals: Point[];

  constructor(points: Point[]) {
    this.points = points;
    let normals = [];
    for (let i = 0; i < this.points.length; i++) {
      let p1 = this.points[i];
      let p2 = (i == this.points.length - 1 ? this.points[0] : this.points[i + 1]);
      let v = new Point(p2.x - p1.x, p2.y - p1.y);
      normals.push(v.leftNormal().normalize());
    }
    this.normals = normals;
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
    return this.normals;
  }

  intersectsLine(line: Line) {
    let lines = this.getLines();
    for(let myLine of lines) {
      if(myLine.getIntersectPoint(line)) {
        return true;
      }
    }
    return false;
  }

  getLineIntersectCollisions(line: Line): CollideData[] {
    let collideDatas = [];
    let lines = this.getLines();
    let normals = this.getNormals();
    for(let i = 0; i < lines.length; i++) {
      let myLine = lines[i];
      let point = myLine.getIntersectPoint(line);
      if(point) {
        let normal = normals[i];
        let collideData = new CollideData(undefined, undefined, false, undefined, new HitData(normal, point));
        collideDatas.push(collideData);
      }
    }
    return collideDatas;
  }

  //IMPORTANT NOTE: When determining normals, it is always off "other".
  intersectsShape(other: Shape, vel?: Point): HitData {
    game.collisionCalls++;
    let pointOutside = false;
    for(let point of this.points) {
      if(!other.containsPoint(point)) {
        pointOutside = true;
        break;
      }
    }
    let pointOutside2 = false;
    for(let point of other.points) {
      if(!this.containsPoint(point)) {
        pointOutside2 = true;
        break;
      }
    }
    if(!pointOutside || !pointOutside2) {
      //console.log("INSIDE");
      return new HitData(undefined, undefined);
    }
      
    let lines1 = this.getLines();
    let lines2 = other.getLines();
    let hitNormals = [];
    for(let line1 of lines1) {
      let normals = other.getNormals();
      for(let i = 0; i < lines2.length; i++) {
        let line2 = lines2[i];
        if(line1.getIntersectPoint(line2)) {
          if(!vel) {
            return new HitData(normals[i], undefined);
          }
          else {
            hitNormals.push(normals[i]);
          }
        }
      }
    }
    if(hitNormals.length === 0) {
      return undefined;
    }
    for(let normal of hitNormals) {
      let ang = vel.times(-1).angleWith(normal);
      if(ang < 90) {
        return new HitData(normal, undefined);
      }
    }
    if(hitNormals.length > 0) {
      return new HitData(hitNormals[0], undefined);
    }

    return undefined;
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
    let aMinMax = this.minMaxDotProd(normal);
    let bMinMax = other.minMaxDotProd(normal);

    //Containment
    let overlap = 0;
    if(aMinMax[0] > bMinMax[0] && aMinMax[1] < bMinMax[1]) {
      overlap = aMinMax[1] - aMinMax[0];
    }
    if(bMinMax[0] > aMinMax[0] && bMinMax[1] < aMinMax[1]) {
      overlap = bMinMax[1] - bMinMax[0];
    }
    if(overlap > 0) {
      let mins = Math.abs(aMinMax[0] - bMinMax[0]);
      let maxs = Math.abs(aMinMax[1] - bMinMax[1]);
      // NOTE: depending on which is smaller you may need to
      // negate the separating axis!!
      if (mins < maxs) {
        overlap += mins;
      } else {
        overlap += maxs;
      }
      let correction = normal.times(overlap);
      return correction;
    }

    if (aMinMax[0] <= bMinMax[1] && aMinMax[1] >= bMinMax[0]) {
      let correction = normal.times(bMinMax[1] - aMinMax[0]);
      return correction;
    }
    return undefined;
  }

  //Get the min trans vector to get this shape out of shape b.
  getMinTransVector(b: Shape/*, dir?: Point*/): Point {
    game.collisionCalls++;
    let correctionVectors = [];
    let thisNormals: Point[];
    let bNormals: Point[];
    let dir = undefined;
    if(dir) {
      thisNormals = [dir];
      bNormals = [dir];
    }
    else {
      thisNormals = this.getNormals();
      bNormals = b.getNormals();
    }
    for (let normal of thisNormals) {
      let result = this.checkNormal(b, normal);
      if (result) correctionVectors.push(result);
      //else return undefined;
    }
    for (let normal of bNormals) {
      let result = this.checkNormal(b, normal);
      if (result) correctionVectors.push(result);
      //else return undefined;
    }
    if (correctionVectors.length > 0) {
      //@ts-ignore
      return _.minBy(correctionVectors, (correctionVector) => {
        return correctionVector.magnitude;
      });
    }
    return undefined;
  }

  getMinTransVectorDir(b: Shape, dir: Point) {
    game.collisionCalls++;
    let mag = 0;
    let maxMag = 0;
    for(let point of this.points) {
      let line = new Line(point, point.add(dir.times(10000)));
      for(let bLine of b.getLines()) {
        let intersectPoint = bLine.getIntersectPoint(line);
        if(intersectPoint) {
          mag = point.distanceTo(intersectPoint);
          if(mag > maxMag) {
            maxMag = mag;
          }
        }
      }
    }
    for(let point of b.points) {
      let line = new Line(point, point.add(dir.times(-10000)));
      for(let myLine of this.getLines()) {
        let intersectPoint = myLine.getIntersectPoint(line);
        if(intersectPoint) {
          mag = point.distanceTo(intersectPoint);
          if(mag > maxMag) {
            maxMag = mag;
          }
        }
      }
    }
    if(maxMag === 0) {
      return undefined;
    }
    return dir.times(maxMag);
  }

  //Get the min trans vector to get this shape into shape b.
  getSnapVector(b: Shape, dir: Point) {
    let mag = 0;
    let minMag = Infinity;
    for(let point of this.points) {
      let line = new Line(point, point.add(dir.times(10000)));
      for(let bLine of b.getLines()) {
        let intersectPoint = bLine.getIntersectPoint(line);
        if(intersectPoint) {
          mag = point.distanceTo(intersectPoint);
          if(mag < minMag) {
            minMag = mag;
          }
        }
      }
    }
    if(mag === 0) {
      return undefined;
    }
    return dir.times(minMag);
  }

  clone(x: number, y: number) {
    let points: Point[] = [];
    for(let point of this.points) {
      points.push(new Point(point.x + x, point.y + y));
    }
    return new Shape(points);
  }

}