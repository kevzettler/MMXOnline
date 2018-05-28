import { Collider, CollideData } from "./collider";
import { game } from "./game";
import * as Helpers from "./helpers";
import { Point } from "./point";

//Umbrella class for walls, nav meshes, ladders, etc.
export class Geometry {

  name: string;
  collider: Collider;

  constructor(name: string, points: Point[]) {
    this.name = name;
    this.collider = new Collider(points, false);
  }

  preUpdate() {
    
  }
  
  update() {

  }

  render(x: number, y: number) {
    if(game.options.showHitboxes) {
      Helpers.drawPolygon(game.ctx, this.collider.shape.clone(x, y), true, "blue", "", 0, 0.5);
    }
  }

  onCollision(other: CollideData) {
    
  }

}