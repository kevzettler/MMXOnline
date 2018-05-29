import { Point } from "./point";
import { game } from "./game";

export class SpawnPoint {

  pos: Point;
  constructor(point: Point) {
    this.pos = point;
  }

  occupied() {
    let nearbyChars = game.level.getActorsInRadius(this.pos, 10, ["Character"]);
    if(nearbyChars.length > 0) return true;
    return false;
  }

}