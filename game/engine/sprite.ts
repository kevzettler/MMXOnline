//Represents a single set of frames and their hitbox data
class Sprite {
  name: string;
  hitboxes: Collider[];
  frames: Frame[];
  alignment: string;
  spritesheet: HTMLImageElement;

  constructor(spriteJson: any) {
    this.name = spriteJson.name;
    this.alignment = spriteJson.alignment;
    
    this.spritesheet = getSpritesheet(spriteJson.spritesheetPath);

    for(let hitboxJson of spriteJson.hitboxes) {
      let hitbox: Collider = new Collider([
        new Point(hitboxJson.rect.topLeftPoint.x, hitboxJson.rect.topLeftPoint.y),
        new Point(hitboxJson.rect.botRightPoint.x, hitboxJson.rect.topLeftPoint.y),
        new Point(hitboxJson.rect.botRightPoint.x, hitboxJson.rect.botRightPoint.y),
        new Point(hitboxJson.rect.topLeftPoint.x, hitboxJson.rect.botRightPoint.y)
      ]);
      this.hitboxes.push(hitbox);
    }
    for(let frameJson of spriteJson.frames) {
      let frame: Frame = new Frame(
        new Rect(new Point(frameJson.rect.topLeftPoint.x, frameJson.rect.topLeftPoint.y), 
          new Point(frameJson.rect.botRightPoint.x, frameJson.rect.botRightPoint.y)),
        frameJson.duration,
        new Point(frameJson.offset.x, frameJson.offset.y)
      );
      this.frames.push(frame);
    }
  }

  draw(frameIndex: number, cX: number, cY: number, flipX?: number, flipY?: number) {
    
    let frame = this.frames[frameIndex];

    let rect = frame.rect;
    let offset = frame.offset;

    let w = rect.w;
    let h = rect.h;

    let halfW = w * 0.5;
    let halfH = h * 0.5;

    let x; let y;

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