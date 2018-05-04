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
  
  multiply(num: number) {
    this.x *= num;
    this.y *= num;
    return this;
  }
  get magnitude() {
    return Math.sqrt(this.x * this.x + this.y * this.y);
  }
  clone() {
    return new Point(this.x, this.y);
  }
}