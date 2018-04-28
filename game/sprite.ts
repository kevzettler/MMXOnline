import { Collider } from "./collider";
import { Frame } from "./frame";
import { Point } from "./point";
import { Rect } from "./rect";
import { game } from "./game";
import * as Helpers from "./helpers";

//Represents a single set of frames and their hitbox data
export class Sprite {
  name: string;
  hitboxes: Collider[];
  frames: Frame[];
  alignment: string;
  spritesheet: HTMLImageElement;

  constructor(spriteJson: any) {
    this.name = spriteJson.name;
    this.alignment = spriteJson.alignment;
    this.frames = [];
    this.hitboxes = [];
    
    this.spritesheet = game.getSpritesheet(spriteJson.spritesheetPath);

    for(let hitboxJson of spriteJson.hitboxes) {
      let hitbox: Collider = new Collider([
        new Point(hitboxJson.offset.x, hitboxJson.offset.y),
        new Point(hitboxJson.offset.x + hitboxJson.width, hitboxJson.offset.y),
        new Point(hitboxJson.offset.x + hitboxJson.width, hitboxJson.offset.y + hitboxJson.height),
        new Point(hitboxJson.offset.x, hitboxJson.offset.y + hitboxJson.height)
      ]);
      this.hitboxes.push(hitbox);
    }
    for(let frameJson of spriteJson.frames) {
      let frame: Frame = new Frame(
        new Rect(frameJson.rect.topLeftPoint.x, frameJson.rect.topLeftPoint.y,  frameJson.rect.botRightPoint.x, frameJson.rect.botRightPoint.y),
        frameJson.duration,
        new Point(frameJson.offset.x, frameJson.offset.y)
      );
      this.frames.push(frame);
    }
  }

  //Given the sprite's alignment, get the offset x and y on where to actually draw the sprite
  getAlignOffset(frameIndex: number, flipX?: number, flipY?: number): Point {
    
    flipX = flipX || 1;
    flipY = flipY || 1;

    let frame = this.frames[frameIndex];

    let rect = frame.rect;
    let offset = frame.offset;

    let w = rect.w;
    let h = rect.h;

    let halfW = w * 0.5;
    let halfH = h * 0.5;

    let x; let y;
    let cX = 0;
    let cY = 0;

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
    return new Point(x + offset.x * flipX, y + offset.y * flipY);
  }

  draw(frameIndex: number, x: number, y: number, flipX?: number, flipY?: number) {
    
    flipX = flipX || 1;
    flipY = flipY || 1;

    let frame = this.frames[frameIndex];
    let rect = frame.rect;
    let offset = this.getAlignOffset(frameIndex, flipX, flipY);

    Helpers.drawImage(game.ctx, this.spritesheet, rect.x1, rect.y1, rect.w, rect.h, x + offset.x, y + offset.y, flipX, flipY);

  }
}