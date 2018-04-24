//Represents a single set of frames and their hitbox data
class Sprite {
  hitbox: Collider;
  frames: Frame[];

  constructor(name) {
    this.className = this.constructor.name;
    this.hitboxes = [];
    this.frames = [];
    this.name = name || "new_sprite";
    this.path = "sprites/" + name + ".json";
    this.alignment = "center";
  }

  onDeserialize() {
    this.spritesheet = _.find(data.spritesheets, (loopSheet) => {
      return loopSheet.path === this.spritesheetPath;
    });
  }

  getFrameListStr() {
    var retStr = "";
    var i = 1;
    for(var frame of this.frames) {
      retStr += String(i) + ",";
      retStr += frame.duration + "\n";
      i++;
    }
    return retStr;
  }
  setFrameListStr(str) {
    alert("CHANGED: " + str);
  }
  draw(ctx, frame, cX, cY, flipX, flipY) {
    
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
    drawImage(c1, this.spritesheet.imageEl, rect.x1, rect.y1, rect.w, rect.h, x + offset.x, y + offset.y, flipX, flipY);

  }
}