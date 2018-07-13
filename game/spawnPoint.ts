import { Point } from "./point";
import { game } from "./game";

export class SpawnPoint {

  name: string;
  pos: Point;
  xDir: number;
  num: number;
  constructor(name: string, point: Point, xDir: number, num: number) {
    this.name = name;
    this.pos = point;
    this.xDir = xDir || 1;
    this.num = num || 0;
  }

  occupied() {
    //if(this.name !== "Spawn Point5") return true;
    let nearbyChars = game.level.getActorsInRadius(this.pos, 30, ["Character"]);
    if(nearbyChars.length > 0) return true;
    return false;
  }

}