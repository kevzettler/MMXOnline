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
    if(this.x === 0 && this.y === 0) return new Point(0, 0);
    let mag = this.magnitude;
    let point = new Point(this.x / this.magnitude, this.y / this.magnitude);
    if(isNaN(point.x) || isNaN(point.y)) 
    {
      throw "NAN!";
    }
    return point;
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
}