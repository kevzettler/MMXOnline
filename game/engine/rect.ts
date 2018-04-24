class Rect {

  constructor(topLeftPoint, botRightPoint) {    
    this.className = this.constructor.name;
    this.topLeftPoint = topLeftPoint;
    this.botRightPoint = botRightPoint;
  }

  get x1() {
    return this.topLeftPoint.x;
  }
  get y1() {
    return this.topLeftPoint.y;
  }
  get x2() {
    return this.botRightPoint.x;
  }
  get y2() {
    return this.botRightPoint.y;
  }

  get w() {
    return this.botRightPoint.x - this.topLeftPoint.x;
  }

  get h() {
    return this.botRightPoint.y - this.topLeftPoint.y;
  }

  getPoints() {
    return [
      new Point(this.topLeftPoint.x, this.topLeftPoint.y),
      new Point(this.botRightPoint.x, this.topLeftPoint.y),
      new Point(this.botRightPoint.x, this.botRightPoint.y),
      new Point(this.topLeftPoint.x, this.botRightPoint.y),
    ];
  }

}