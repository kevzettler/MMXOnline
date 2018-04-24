//Anything that has: a position, rotation and name. Can also have an optional collider
class Actor {

  sprite: Sprite; //Current sprite
  pos: Point; //Current location
  angle: number;
  useGravity: boolean;

  constructor() {

  }

  update() {

  }

  render() {

  }

  onCollision(other: Collider) {
    
  }

  onTrigger(other: Collider) {

  }

}