import { linepointNearestMouse } from "./helpers";
import { Line, Shape } from "./shape";
import { Point } from "./point";

//@ts-ignore
window.runAllTests = runAllTests;

export function runAllTests() {
  testGetIntersectPoint();
  testLinesSameY();
}

function testLinesSameY() {
  /*
  let line1 = new Line(new Point(0, 0), new Point(10, 0));
  let line2 = new Line(new Point(0, 0), new Point(10, 0));
  console.log(line1.intersectsLine(line2));
  console.log(line1.getIntersectPoint(line2));
  let line3 = new Line(new Point(0, 0), new Point(10, 0));
  let line4 = new Line(new Point(5, 0), new Point(15, 0));
  console.log(line3.intersectsLine(line4));
  console.log(line3.getIntersectPoint(line4));
  let line5 = new Line(new Point(0, 0), new Point(10, 0));
  let line6 = new Line(new Point(0, 0), new Point(15, 0));
  console.log(line5.intersectsLine(line6));
  console.log(line5.getIntersectPoint(line6));
  */
}

function testGetIntersectPoint() {
  let shape = new Shape([
    new Point(123.39407376319954, 159.66765581794917),
    new Point(141.39407376319954, 159.66765581794917),
    new Point(141.39407376319954, 193.66765581794917),
    new Point(123.39407376319954, 193.66765581794917)]);
  let pos = new Point(119.4554509905969, 175.1802743786446);
  let vel = new Point(149.92618433007218, 4.705236681105004);
  let point = shape.getIntersectPoint(pos, vel);

  assertEquals(Math.round(point.x), Math.round(123));
  assertEquals(Math.round(point.y), Math.round(175));

  //INCORRECT: 159.66765581794917, 176.44228169262527
}

//Shape line: point1: Point {x: 141.39407376319954, y: 159.66765581794917}point2: Point {x: 141.39407376319954, y: 193.66765581794917}slope: (...)x1: (...)x2: (...)xInt: (...)y1: (...)y2: (...)yInt: (...)__proto__: Object
//PointLine: point1: Point {x: 119.4554509905969, y: 175.1802743786446}ix:  Objectpoint2: Point {x: 269.3816353206691, y: 179.8855110597496}slope: (...)x1: (...)x2: (...)xInt: (...)y1: (...)y2: (...)yInt: (...)__proto__: Object

//Shape line 2: (123.39407376319954, 193.66765581794917) (123.39407376319954, 159.66765581794917)

function assertEquals(val1: any, val2: any) {
  if(val1 !== val2) {
    console.error(val1 + " is not equal to " + val2);
  }
}
