import { Collider } from "./collider";
import { Frame } from "./frame";
import { Point } from "./point";
import { Rect } from "./rect";
import { game } from "./game";
import * as Helpers from "./helpers";
import { Palette } from "./color";

//Represents a single set of frames and their hitbox data
export class Sprite {
  name: string;
  hitboxes: Collider[];
  loopStartFrame: number;
  frames: Frame[];
  alignment: string;
  spritesheetPath: string;
  wrapMode: string; //Can be "once", "loop" or "pingpong"

  constructor(spriteJson: any) {
    this.name = spriteJson.name;
    this.alignment = spriteJson.alignment;
    this.wrapMode = spriteJson.wrapMode;
    this.loopStartFrame = spriteJson.loopStartFrame || 0;
    this.spritesheetPath = spriteJson.spritesheetPath;
    if(!this.wrapMode) { 
      console.error("NO WRAP MODE FOR SPRITE " + this.name);
    }
    this.frames = [];
    this.hitboxes = [];
    
    game.getSpritesheet(spriteJson.spritesheetPath);

    for(let hitboxJson of spriteJson.hitboxes) {
      let hitbox: Collider = new Collider([
        new Point(hitboxJson.offset.x, hitboxJson.offset.y),
        new Point(hitboxJson.offset.x + hitboxJson.width, hitboxJson.offset.y),
        new Point(hitboxJson.offset.x + hitboxJson.width, hitboxJson.offset.y + hitboxJson.height),
        new Point(hitboxJson.offset.x, hitboxJson.offset.y + hitboxJson.height)
      ], hitboxJson.isTrigger ? true : false);
      //if(Helpers.hasTag(hitboxJson.tags, "t")) {
      //  hitbox.isTrigger = true;
      //}
      this.hitboxes.push(hitbox);
    }
    for(let frameJson of spriteJson.frames) {
      let frame: Frame = new Frame(
        new Rect(frameJson.rect.topLeftPoint.x, frameJson.rect.topLeftPoint.y,  frameJson.rect.botRightPoint.x, frameJson.rect.botRightPoint.y),
        frameJson.duration,
        new Point(frameJson.offset.x, frameJson.offset.y)
      );
      if(frameJson.POIs) {
        for(let poi of frameJson.POIs) {
          frame.POIs.push(new Point(poi.x, poi.y));
        }
      }
      this.frames.push(frame);
    }
  }

  get spritesheet() {
    return game.getSpritesheet(this.spritesheetPath);
  }

  getAlignOffset(frameIndex: number, flipX?: number, flipY?: number): Point {
    let frame = this.frames[frameIndex];

    let rect = frame.rect;
    let offset = frame.offset;

    return this.getAlignOffsetHelper(rect, offset, flipX, flipY);
  }

  //Given the sprite's alignment, get the offset x and y on where to actually draw the sprite
  getAlignOffsetHelper(rect: Rect, offset: Point, flipX?: number, flipY?: number): Point {
    
    flipX = flipX || 1;
    flipY = flipY || 1;

    let w = rect.w;
    let h = rect.h;

    let halfW = w * 0.5;
    let halfH = h * 0.5;

    let x; let y;

    if(this.alignment === "topleft") {
      x = 0; y = 0;
    }
    else if(this.alignment === "topmid") {
      x = -halfW; y = 0;
    }
    else if(this.alignment === "topright") {
      x = -w; y = 0;
    }
    else if(this.alignment === "midleft") {
      x = flipX === -1 ? -w : 0; y = -halfH;
    }
    else if(this.alignment === "center") {
      x = -halfW; y = -halfH;
    }
    else if(this.alignment === "midright") {
      x = flipX === -1 ? 0 : -w; y = -halfH;
    }
    else if(this.alignment === "botleft") {
      x = 0; y = -h;
    }
    else if(this.alignment === "botmid") {
      x = -halfW; y = -h;
    }
    else if(this.alignment === "botright") {
      x = -w; y = -h;
    }
    return new Point(x + offset.x * flipX, y + offset.y * flipY);
  }

  draw(frameIndex: number, x: number, y: number, flipX?: number, flipY?: number, options?: string, alpha?: number, palette?: Palette, scaleX?: number, scaleY?: number) {
    
    flipX = flipX || 1;
    flipY = flipY || 1;

    let frame = this.frames[frameIndex];
    let rect = frame.rect;
    let offset = this.getAlignOffset(frameIndex, flipX, flipY);

    Helpers.drawImage(game.ctx, this.spritesheet, rect.x1, rect.y1, rect.w, rect.h, x + offset.x, y + offset.y, flipX, flipY, options, alpha, palette, scaleX, scaleY);

  }
}