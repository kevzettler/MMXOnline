import { Collider, CollideData } from "./collider";
import { game } from "./game";
import * as Helpers from "./helpers";

//Umbrella class for walls, nav meshes, ladders, etc.
export class Geometry {

  collider: Collider;

  constructor() {
    this.collider = new Collider([], false, this);
  }

  preUpdate() {
    
  }
  
  update() {

  }

  render(x: number, y: number) {
    if(game.showHitboxes) {
      Helpers.drawPolygon(game.ctx, this.collider.shape.clone(x, y), true, "blue", "", 0, 0.5);
    }
  }

  onCollision(other: CollideData) {
    
  }

}