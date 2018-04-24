//Represents a single set of frames and their hitbox data
class Sprite {
  hitboxes: Collider[];
  frames: Frame[];
  alignment: string;
  spritesheet: HTMLImageElement;

  constructor() {
    this.hitboxes = [];
    this.frames = [];
  }

  draw(ctx: CanvasRenderingContext2D, frame: Frame, cX: number, cY: number, flipX: number, flipY: number) {
    
    var rect = frame.rect;
    var offset = frame.offset;

    var w = rect.w;
    var h = rect.h;

    var halfW = w * 0.5;
    var halfH = h * 0.5;

    var x; var y;

    if(this.alignment === "topleft") {
      x = cX; y = cY;
    }
    else if(this.alignment === "topmid") {
      x = cX - halfW; y = cY;
    }
    else if(this.alignment === "topright") {
      x = cX - w; y = cY;
    }
    else if(this.alignment === "midleft") {
      x = cX; y = cY - halfH;
    }
    else if(this.alignment === "center") {
      x = cX - halfW; y = cY - halfH;
    }
    else if(this.alignment === "midright") {
      x = cX - w; y = cY - halfH;
    }
    else if(this.alignment === "botleft") {
      x = cX; y = cY - h;
    }
    else if(this.alignment === "botmid") {
      x = cX - halfW; y = cY - h;
    }
    else if(this.alignment === "botright") {
      x = cX - w; y = cY - h;
    }
    drawImage(ctx, this.spritesheet, rect.x1, rect.y1, rect.w, rect.h, x + offset.x, y + offset.y, flipX, flipY);

  }
}