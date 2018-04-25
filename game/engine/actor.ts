//Anything that has: a position, rotation and name. Can also have an optional collider
class Actor {

  sprite: Sprite; //Current sprite
  frameIndex: number; //Current frame index of sprite
  pos: Point; //Current location
  angle: number;
  useGravity: boolean;

  constructor() {

  }

  update() {

  }

  render() {
    this.sprite.draw(this.frameIndex, this.pos.x, this.pos.y)
  }

  onCollision(other: Collider) {
    
  }

  onTrigger(other: Collider) {

  }

}