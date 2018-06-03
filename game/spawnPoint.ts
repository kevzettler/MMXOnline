import { Point } from "./point";
import { game } from "./game";

export class SpawnPoint {

  pos: Point;
  xDir: number;
  num: number;
  constructor(point: Point, xDir: number, num: number) {
    this.pos = point;
    this.xDir = xDir || 1;
    this.num = num || 0;
  }

  occupied() {
    let nearbyChars = game.level.getActorsInRadius(this.pos, 30, ["Character"]);
    if(nearbyChars.length > 0) return true;
    return false;
  }

}