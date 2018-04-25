import { Collider } from "./collider";
import { game } from "./game";
import * as Helpers from "./helpers";

//Umbrella class for walls, nav meshes, ladders, etc.
export class Geometry {

  collider: Collider;

  constructor() {
    this.collider = new Collider([]);
  }
  
  update() {

  }

  render() {
    if(game.showHitboxes) {
      Helpers.drawPolygon(game.ctx, this.collider.points, true, "blue");
    }
  }

  onCollision(other: Collider) {
    
  }

  onTrigger(other: Collider) {

  }


}