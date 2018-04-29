import { Actor } from "./actor";
import { Sprite } from "./sprite";

export class Anim extends Actor {

  constructor(x: number, y: number, sprite: Sprite) {
    super();
    this.pos.x = x;
    this.pos.y = y;
    this.sprite = sprite;
    this.useGravity = false;
  }

  update() {
    super.update();
    if(this.frameIndex === this.sprite.frames.length - 1 && this.frameTime >= this.currentFrame.duration) {
      this.destroySelf();
    }
  }

}
