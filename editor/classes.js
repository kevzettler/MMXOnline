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

}
classes["Rect"] = Rect;

function createFrame(topLeftPoint, botRightPoint, frames) {
  var rect = new Rect(topLeftPoint, botRightPoint);
  var frames = frames;
  return new Frame(rect, frames);
}

class Frame {

  constructor(rect, duration, offset) {
    this.className = this.constructor.name;
    this.rect = rect;
    this.duration = duration;
    this.offset = offset;
    this.hitboxes = [];
  }

}
classes["Frame"] = Frame;

class Sprite {

  constructor(name) {
    this.className = this.constructor.name;
    this.hitboxes = [];
    this.frames = [];
    this.name = name || "new_sprite";
    this.path = "sprites/" + name + ".json";
    this.alignment = "center";
  }

  convertSpritesheetToObj() {
    var spritesheetName = this.spritesheet;
    this.spritesheet = _.find(data.spritesheets, (loopSheet) => {
      return loopSheet.path === spritesheetName;
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
  
}
classes["Sprite"] = Sprite;

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