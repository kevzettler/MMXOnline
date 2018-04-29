var classes = {};

class Spritesheet {

  constructor(imgEl, path, imgArr) {
    this.className = this.constructor.name;
    this.imgEl = imgEl;
    this.path = path;
    this.imgArr = imgArr;
  }

}
classes["Spritesheet"] = Spritesheet;

class Point {

  constructor(x, y) {
    this.className = this.constructor.name;
    this.x = x;
    this.y = y;
  }

}
classes["Point"] = Point;

function createRect(x1, y1, x2, y2) {
  return new Rect(new Point(x1, y1), new Point(x2, y2));
}

class Rect {

  constructor(topLeftPoint, botRightPoint) {    
    this.className = this.constructor.name;
    this.topLeftPoint = topLeftPoint;
    this.botRightPoint = botRightPoint;
  }

  get x1() {
    return this.topLeftPoint.x;
  }
  get y1() {
    return this.topLeftPoint.y;
  }
  get x2() {
    return this.botRightPoint.x;
  }
  get y2() {
    return this.botRightPoint.y;
  }

  get w() {
    return this.botRightPoint.x - this.topLeftPoint.x;
  }

  get h() {
    return this.botRightPoint.y - this.topLeftPoint.y;
  }

  getPoints() {
    return [
      new Point(this.topLeftPoint.x, this.topLeftPoint.y),
      new Point(this.botRightPoint.x, this.topLeftPoint.y),
      new Point(this.botRightPoint.x, this.botRightPoint.y),
      new Point(this.topLeftPoint.x, this.botRightPoint.y),
    ];
  }

}
classes["Rect"] = Rect;

function createFrame(topLeftPoint, botRightPoint, frames) {
  var rect = new Rect(topLeftPoint, botRightPoint);
  var frames = frames;
  return new Frame(rect, frames);
}

class POI {
  constructor(x, y) {
    this.className = this.constructor.name;
    this.x = x;
    this.y = y;
  }
}
classes["POI"] = POI;

class Frame {

  constructor(rect, duration, offset) {
    this.className = this.constructor.name;
    this.rect = rect;
    this.duration = duration;
    this.offset = offset;
    this.hitboxes = [];
    this.POIs = [];
  }

}
classes["Frame"] = Frame;

class Sprite {

  constructor(name) {
    this.className = this.constructor.name;
    this.hitboxes = [];
    this.frames = [];
    this.POIs = [];
    this.name = name || "new_sprite";
    this.path = "sprites/" + name + ".json";
    this.alignment = "center";
    this.wrapMode = "once";
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
classes["Sprite"] = Sprite;

class Level {

  constructor(name) {
    this.className = this.constructor.name;
    this.instances = [];
    this.name = name || "new_level";
    this.path = "levels/" + this.name + ".json";
  }

  onDeserialize() {
    this.background = _.find(data.backgrounds, (loopSheet) => {
      return loopSheet.path === this.backgroundPath;
    });
  }

}
classes["Level"] = Level;

class Hitbox {

  constructor() {
    this.className = this.constructor.name;
    this.tags = "";
    this.width = 20;
    this.height = 40;
    this.offset = new Point(0,0);
  }

  /*
  setString() {
    var pieces = this.str.split(",");
    if(pieces.length !== 4) return;
    this.rect.topLeftPoint.x = Number(pieces[0]);
    this.rect.topLeftPoint.y = Number(pieces[1]);
    this.rect.botRightPoint.x = Number(pieces[2]);
    this.rect.botRightPoint.x = Number(pieces[3]);
    redrawCanvas1();
  }
  */

  move(dx, dy) {
    this.offset.x += dx;
    this.offset.y += dy;
  }

  getRect() {
    return this.rect;
  }

  resizeCenter(x, y) {
    this.width += x;
    this.height += y;
  }

}
classes["Hitbox"] = Hitbox;

class Color {
  constructor(r,g,b,a) {
    this.className = this.constructor.name;
    this.r = r;
    this.g = g;
    this.b = b;
    this.a = a;
  }
}
classes["Color"] = Color;

class Instance {
  constructor(name, x, y, sprite) {
    this.className = this.constructor.name;
    this.name = name || "Instance";
    this.pos = new Point(x, y);
    if(sprite) {
      this.sprite = sprite;
      this.spriteName = sprite.name;
    }
  }
  onDeserialize() {
    this.sprite = _.find(data.sprites, (sprite) => {
      return sprite.name === this.spriteName;
    });
    if(this.sprite === null) {
      throw "Sprite not found";
    }
  }
  draw(ctx) {
    if(this.sprite && this.sprite.spritesheet && this.sprite.spritesheet.imageEl) {
      this.sprite.draw(c1, this.sprite.frames[0], this.pos.x, this.pos.y);
    }
  }
  getRect() {
    var w = this.sprite.frames[0].rect.w;
    var h = this.sprite.frames[0].rect.h;

    var x; var y;

    if(this.sprite.alignment === "topleft") {
      x = this.pos.x; y = this.pos.y;
    }
    else if(this.sprite.alignment === "topmid") {
      x = this.pos.x - w/2; y = this.pos.y;
    }
    else if(this.sprite.alignment === "topright") {
      x = this.pos.x - w; y = this.pos.y;
    }
    else if(this.sprite.alignment === "midleft") {
      x = this.pos.x; y = this.pos.y - h/2;
    }
    else if(this.sprite.alignment === "center") {
      x = this.pos.x - w/2; y = this.pos.y - h/2;
    }
    else if(this.sprite.alignment === "midright") {
      x = this.pos.x - w; y = this.pos.y - h/2;
    }
    else if(this.sprite.alignment === "botleft") {
      x = this.pos.x; y = this.pos.y - h;
    }
    else if(this.sprite.alignment === "botmid") {
      x = this.pos.x - w/2; y = this.pos.y - h;
    }
    else if(this.sprite.alignment === "botright") {
      x = this.pos.x - w; y = this.pos.y - h;
    }
    return createRect(x, y, x + w, y + h);
  }
  //resize(deltaX, deltaY, dir) { }
  move(deltaX, deltaY) {
    this.pos.x += deltaX;
    this.pos.y += deltaY;
  }
  clearPointPercents() { }
}
classes["Instance"] = Instance;

class ShapeInstance {
  constructor(name, points) {
    this.className = this.constructor.name;
    this.name = name || "Collision Shape Instance";
    this.className = this.constructor.name;
    this.points = points;
  }

  clearPointPercents() {
    var rect = this.getRect();
    var selectionLeft = rect.x1;
    var selectionRight = rect.x2;
    var selectionTop = rect.y1;
    var selectionBottom = rect.y2;
    var selectionWidth = rect.w;
    var selectionHeight = rect.h;
    for(var point of this.points) {
      point.perc_from_left = Math.abs(point.x - selectionLeft) / selectionWidth;
      point.perc_from_right = Math.abs(point.x - selectionRight) / selectionWidth;
      point.perc_from_top = Math.abs(point.y - selectionTop) / selectionHeight;
      point.perc_from_bottom = Math.abs(point.y - selectionBottom) / selectionHeight;
    }
  }

  draw(ctx) {
    drawPolygon(ctx, this.points, true, "blue", "", "", 0.5);
  }
  getRect() {
    var minX = _.minBy(this.points, (point) => { return point.x; }).x;
    var minY = _.minBy(this.points, (point) => { return point.y; }).y;
    var maxX = _.maxBy(this.points, (point) => { return point.x; }).x;
    var maxY = _.maxBy(this.points, (point) => { return point.y; }).y;
    return createRect(minX, minY, maxX, maxY);
  }

  //resizeDir can be: ["nw-resize", "n-resize", "ne-resize", "e-resize", "se-resize", "s-resize", "sw-resize", "w-resize"];
  resize(deltaX, deltaY, resizeDir) {

		for(let i = 0; i < this.points.length; i++) {

      var point = this.points[i];
			var perc_from_ox = 0;
			var perc_from_oy = 0;	

			if(resizeDir === "nw-resize") {
				perc_from_ox = this.points[i].perc_from_right;
				perc_from_oy = this.points[i].perc_from_bottom;
			}
			else if(resizeDir === "n-resize") {
				perc_from_oy = this.points[i].perc_from_bottom;
			}
			else if(resizeDir === "ne-resize") {
				perc_from_ox = this.points[i].perc_from_left;
				perc_from_oy = this.points[i].perc_from_bottom;
			}
			else if(resizeDir === "e-resize") {
				perc_from_ox = this.points[i].perc_from_left;
			}
			else if(resizeDir === "se-resize") {
				perc_from_ox = this.points[i].perc_from_left;
				perc_from_oy = this.points[i].perc_from_top;
			}
			else if(resizeDir === "s-resize") {
				perc_from_oy = this.points[i].perc_from_top;
			}
			else if(resizeDir === "sw-resize") {
				perc_from_ox = this.points[i].perc_from_right;
				perc_from_oy = this.points[i].perc_from_top;
			}
			else if(resizeDir === "w-resize") {
				perc_from_ox = this.points[i].perc_from_right;
			}

			this.points[i].x += (deltaX * perc_from_ox);
			this.points[i].y += (deltaY * perc_from_oy);
		}

  }
  move(deltaX, deltaY) {
    for(var point of this.points) {
      point.x += deltaX;
      point.y += deltaY;
    }
  }
}
classes["ShapeInstance"] = ShapeInstance;

