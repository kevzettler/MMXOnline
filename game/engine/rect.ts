class Rect {

  topLeftPoint: Point;
  botRightPoint: Point;

  constructor(topLeftPoint: Point, botRightPoint: Point) {    
    this.topLeftPoint = topLeftPoint;
    this.botRightPoint = botRightPoint;
  }

  get x1(): number {
    return this.topLeftPoint.x;
  }
  get y1(): number {
    return this.topLeftPoint.y;
  }
  get x2(): number {
    return this.botRightPoint.x;
  }
  get y2(): number {
    return this.botRightPoint.y;
  }

  get w(): number {
    return this.botRightPoint.x - this.topLeftPoint.x;
  }

  get h(): number {
    return this.botRightPoint.y - this.topLeftPoint.y;
  }

  getPoints(): Point[] {
    return [
      new Point(this.topLeftPoint.x, this.topLeftPoint.y),
      new Point(this.botRightPoint.x, this.topLeftPoint.y),
      new Point(this.botRightPoint.x, this.botRightPoint.y),
      new Point(this.topLeftPoint.x, this.botRightPoint.y),
    ];
  }

}