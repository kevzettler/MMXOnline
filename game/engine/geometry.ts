//Umbrella class for walls, nav meshes, ladders, etc.
class Geometry {

  collider: Collider;

  constructor() {
  }
  
  update() {

  }

  render() {
    if(showHitboxes) {
      drawPolygon(ctx, this.collider.points, true, "blue");
    }
  }

  onCollision(other: Collider) {
    
  }

  onTrigger(other: Collider) {

  }


}