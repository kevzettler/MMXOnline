import * as Helpers from "./helpers";

export class Point {
  x: number;
  y: number;
  constructor(x: number, y: number) {
    this.x = x;
    this.y = y;
  }
  get ix() {
    return Math.round(this.x);
  }
  get iy() {
    return Math.round(this.y);
  }

  addxy(x: number, y: number) {
    let point = new Point(this.x + x, this.y + y);
    return point;
  }

  normalize() {
    this.x = Helpers.roundEpsilon(this.x);
    this.y = Helpers.roundEpsilon(this.y);
    if(this.x === 0 && this.y === 0) return new Point(0, 0);
    let mag = this.magnitude;
    let point = new Point(this.x / this.magnitude, this.y / this.magnitude);
    if(isNaN(point.x) || isNaN(point.y)) 
    {
      throw "NAN!";
    }
    point.x = Helpers.roundEpsilon(point.x);
    point.y = Helpers.roundEpsilon(point.y);
    return point;
  }

  dotProduct(other: Point) {
    return (this.x * other.x) + (this.y * other.y);
  }

  project(other: Point) {
    let dp = this.dotProduct(other);
    return new Point((dp / (other.x * other.x + other.y * other.y)) * other.x, (dp / (other.x * other.x + other.y * other.y)) * other.y);
  }

  rightNormal() {
    return new Point(-this.y, this.x);
  }

  leftNormal() {
    return new Point(this.y, -this.x);
  }

  perProduct(other: Point) {
    return this.dotProduct(other.rightNormal());
  }

  //Returns new point
  add(other: Point) {
    let point = new Point(this.x + other.x, this.y + other.y);
    return point;
  }
  
  //Mutates this point
  inc(other: Point): void {
    this.x += other.x;
    this.y += other.y;
  }
  
  //Returns new point
  times(num: number) {
    let point = new Point(this.x * num, this.y * num);
    return point;
  }

  //Mutates this point
  multiply(num: number) {
    this.x *= num;
    this.y *= num;
    return this;
  }
  get magnitude() {
    let root = this.x * this.x + this.y * this.y;
    if(root < 0) root = 0;
    let result = Math.sqrt(root);
    if(isNaN(result)) throw "NAN!";
    return result;
  }
  clone() {
    return new Point(this.x, this.y);
  }
  distanceTo(other: Point) {
    return Math.sqrt(Math.pow(other.x - this.x, 2) + Math.pow(other.y - this.y, 2));
  }
  subtract(other: Point) {
    return new Point(this.x - other.x, this.y - other.y);
  }
  directionTo(other: Point) {
    return new Point(other.x - this.x, other.y - this.y);
  }
  isAngled() {
    return this.x !== 0 && this.y !== 0;
  }
}