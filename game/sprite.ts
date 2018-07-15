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
  spriteJson: string;
  pixiSprite: PIXI.extras.AnimatedSprite;

  constructor(spriteJson: any, shouldInit: boolean, container: PIXI.Container) {
    this.spriteJson = spriteJson;
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
    
    for(let hitboxJson of spriteJson.hitboxes) {
      let hitbox: Collider = new Collider([
        new Point(hitboxJson.offset.x, hitboxJson.offset.y),
        new Point(hitboxJson.offset.x + hitboxJson.width, hitboxJson.offset.y),
        new Point(hitboxJson.offset.x + hitboxJson.width, hitboxJson.offset.y + hitboxJson.height),
        new Point(hitboxJson.offset.x, hitboxJson.offset.y + hitboxJson.height)
      ], hitboxJson.isTrigger ? true : false, undefined, false, false);
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

    if(shouldInit) {
      this.initSprite(container);
    }

  }

  get spritesheet() {
    return PIXI.loader.resources[this.spritesheetPath].texture.baseTexture.source;
  }

  initSprite(container: PIXI.Container) {
    let textureArray = [];
    for(let frame of this.frames) {
      let texture = new PIXI.Texture(PIXI.loader.resources[this.spritesheetPath].texture.baseTexture);
      texture.frame = new PIXI.Rectangle(frame.rect.x1, frame.rect.y1, frame.rect.w, frame.rect.h);
      textureArray.push(texture);
    }
    this.pixiSprite = new PIXI.extras.AnimatedSprite(textureArray);
    let anchor = this.getAnchor();
    this.pixiSprite.anchor.x = anchor.x;
    this.pixiSprite.anchor.y = anchor.y;
    this.pixiSprite.animationSpeed = 0;
    container.addChild(this.pixiSprite);
  }

  //Given the sprite's alignment, get the offset x and y on where to actually draw the sprite
  getAnchor(): Point {
    let x, y;
    if(this.alignment === "topleft") {
      x = 0; y = 0;
    }
    else if(this.alignment === "topmid") {
      x = 0.5; y = 0;
    }
    else if(this.alignment === "topright") {
      x = 1; y = 0;
    }
    else if(this.alignment === "midleft") {
      x = 0; y = 0.5;
    }
    else if(this.alignment === "center") {
      x = 0.5; y = 0.5;
    }
    else if(this.alignment === "midright") {
      x = 1; y = 0.5;
    }
    else if(this.alignment === "botleft") {
      x = 0; y = 1;
    }
    else if(this.alignment === "botmid") {
      x = 0.5; y = 1;
    }
    else if(this.alignment === "botright") {
      x = 1; y = 1;
    }
    return new Point(x, y);
  }

  draw(frameIndex: number, x: number, y: number, flipX?: number, flipY?: number, options?: string, alpha?: number, palette?: Palette, scaleX?: number, scaleY?: number) {
    this.pixiSprite.gotoAndStop(frameIndex);
    this.pixiSprite.x = x;
    this.pixiSprite.y = y;
    this.pixiSprite.scale.x = flipX;
    this.pixiSprite.scale.y = flipY;
  }

  createAndDraw(container: PIXI.Container, frameIndex: number, x: number, y: number, flipX?: number, flipY?: number, options?: string, alpha?: number, palette?: Palette, scaleX?: number, scaleY?: number) {
    let sprite = new Sprite(this.spriteJson, true, container);
    sprite.draw(frameIndex, x, y, flipX, flipY, options, alpha, palette, scaleX, scaleY);
    return sprite;
  }

  drawCanvas(ctx: CanvasRenderingContext2D, frameIndex: number, x: number, y: number, flipX?: number, flipY?: number, options?: string, alpha?: number, palette?: Palette, scaleX?: number, scaleY?: number) {
    flipX = flipX || 1;
    flipY = flipY || 1;
    let frame = this.frames[frameIndex];
    let rect = frame.rect;
    let offset = this.getAlignOffset(frameIndex, flipX, flipY);
    Helpers.drawImage(ctx, <HTMLImageElement>this.spritesheet, rect.x1, rect.y1, rect.w, rect.h, x + offset.x, y + offset.y, flipX, flipY, options, alpha, palette, scaleX, scaleY);
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

    if(flipX > 0) halfW = Math.floor(halfW);
    else halfW = Math.ceil(halfW);
    if(flipY > 0) halfH = Math.floor(halfH);
    else halfH = Math.ceil(halfH);

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

}