var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var levelJsons = [{ "className": "Level", "instances": [{ "className": "ShapeInstance", "name": "Shape Instance", "points": [{ "className": "Point", "x": 180, "y": 248, "perc_from_left": 0, "perc_from_right": 1, "perc_from_top": 0, "perc_from_bottom": 1 }, { "className": "Point", "x": 551, "y": 248, "perc_from_left": 1, "perc_from_right": 0, "perc_from_top": 0, "perc_from_bottom": 1 }, { "className": "Point", "x": 551, "y": 363, "perc_from_left": 1, "perc_from_right": 0, "perc_from_top": 1, "perc_from_bottom": 0 }, { "className": "Point", "x": 180, "y": 363, "perc_from_left": 0, "perc_from_right": 1, "perc_from_top": 1, "perc_from_bottom": 0 }] }, { "className": "Instance", "name": "Test", "pos": { "className": "Point", "x": 227, "y": 151 }, "spriteName": "megaman_idle" }], "name": "new_level", "path": "assets/levels/new_level.json", "backgroundPath": "assets/backgrounds/highway.png" }];
var spriteJsons = [{ "className": "Sprite", "hitboxes": [{ "className": "Hitbox", "tags": "", "width": 20, "height": 40, "offset": { "className": "Point", "x": 0, "y": 0 }, "rect": { "className": "Rect", "topLeftPoint": { "className": "Point", "x": 340, "y": 280 }, "botRightPoint": { "className": "Point", "x": 360, "y": 320 } } }], "frames": [{ "className": "Frame", "rect": { "className": "Rect", "topLeftPoint": { "className": "Point", "x": 164, "y": 253 }, "botRightPoint": { "className": "Point", "x": 188, "y": 290 } }, "duration": 5, "offset": { "className": "Point", "x": 0, "y": 0 }, "hitboxes": [] }, { "className": "Frame", "rect": { "className": "Rect", "topLeftPoint": { "className": "Point", "x": 189, "y": 249 }, "botRightPoint": { "className": "Point", "x": 204, "y": 290 } }, "duration": 5, "offset": { "className": "Point", "x": 0, "y": 0 }, "hitboxes": [] }, { "className": "Frame", "rect": { "className": "Rect", "topLeftPoint": { "className": "Point", "x": 204, "y": 244 }, "botRightPoint": { "className": "Point", "x": 223, "y": 290 } }, "duration": 5, "offset": { "className": "Point", "x": 0, "y": 0 }, "hitboxes": [] }, { "className": "Frame", "rect": { "className": "Rect", "topLeftPoint": { "className": "Point", "x": 223, "y": 250 }, "botRightPoint": { "className": "Point", "x": 246, "y": 291 } }, "duration": 5, "offset": { "className": "Point", "x": 0, "y": 0 }, "hitboxes": [] }, { "className": "Frame", "rect": { "className": "Rect", "topLeftPoint": { "className": "Point", "x": 247, "y": 249 }, "botRightPoint": { "className": "Point", "x": 274, "y": 291 } }, "duration": 5, "offset": { "className": "Point", "x": 0, "y": 0 }, "hitboxes": [] }, { "className": "Frame", "rect": { "className": "Rect", "topLeftPoint": { "className": "Point", "x": 275, "y": 253 }, "botRightPoint": { "className": "Point", "x": 299, "y": 291 } }, "duration": 5, "offset": { "className": "Point", "x": 0, "y": 0 }, "hitboxes": [] }, { "className": "Frame", "rect": { "className": "Rect", "topLeftPoint": { "className": "Point", "x": 300, "y": 259 }, "botRightPoint": { "className": "Point", "x": 330, "y": 291 } }, "duration": 5, "offset": { "className": "Point", "x": 0, "y": 0 }, "hitboxes": [] }], "name": "megaman_idle", "path": "assets/sprites/megaman_idle.json", "alignment": "center", "spritesheetPath": "assets/spritesheets/MMXNormal.png" }];
var Actor = (function () {
    function Actor() {
    }
    Actor.prototype.update = function () {
    };
    Actor.prototype.render = function () {
        this.sprite.draw(this.frameIndex, this.pos.x, this.pos.y);
    };
    Actor.prototype.onCollision = function (other) {
    };
    Actor.prototype.onTrigger = function (other) {
    };
    return Actor;
}());
var Collider = (function () {
    function Collider(points) {
        this.points = points;
    }
    Collider.prototype.onCollision = function (other) {
    };
    Collider.prototype.onTrigger = function (other) {
    };
    return Collider;
}());
var Color = (function () {
    function Color(r, g, b, a) {
        this.r = r;
        this.g = g;
        this.b = b;
        this.a = a;
    }
    return Color;
}());
var Frame = (function () {
    function Frame(rect, duration, offset) {
        this.rect = rect;
        this.duration = duration;
        this.offset = offset;
        this.hitboxes = [];
    }
    return Frame;
}());
var sprites = {};
var levels = {};
var level;
var spritesheets = {};
var backgrounds = {};
var isServer = false;
var isClient = !isServer;
var showHitboxes = true;
var canvas = $("#canvas")[0];
var ctx = canvas.getContext("2d");
function getSpritesheet(path) {
    if (!spritesheets[path]) {
        spritesheets[path] = document.createElement("img");
        spritesheets[path].src = path;
    }
    return spritesheets[path];
}
function getBackground(path) {
    if (!backgrounds[path]) {
        backgrounds[path] = document.createElement("img");
        backgrounds[path].src = path;
    }
    return backgrounds[path];
}
function loadSprites() {
    for (var _i = 0, spriteJsons_1 = spriteJsons; _i < spriteJsons_1.length; _i++) {
        var spriteJson = spriteJsons_1[_i];
        var sprite = new Sprite(spriteJson);
        sprites[sprite.name] = sprite;
    }
}
function loadLevels() {
    for (var _i = 0, levelJsons_1 = levelJsons; _i < levelJsons_1.length; _i++) {
        var levelJson = levelJsons_1[_i];
        var level_1 = new Level(levelJson);
        levels[level_1.name] = level_1;
    }
}
function isLoaded() {
    for (var name_1 in sprites) {
        if (!sprites[name_1].spritesheet.complete) {
            return false;
        }
    }
    for (var name_2 in levels) {
        if (!levels[name_2].background.complete) {
            return false;
        }
    }
    return true;
}
function gameLoop() {
    if (isLoaded()) {
        level.update();
        level.render();
    }
}
loadSprites();
loadLevels();
level = levels["new_level"];
window.setInterval(gameLoop, 1000 / 60);
var Geometry = (function () {
    function Geometry() {
    }
    Geometry.prototype.update = function () {
    };
    Geometry.prototype.render = function () {
        if (showHitboxes) {
            drawPolygon(ctx, this.collider.points, true, "blue");
        }
    };
    Geometry.prototype.onCollision = function (other) {
    };
    Geometry.prototype.onTrigger = function (other) {
    };
    return Geometry;
}());
function inRect(x, y, rect) {
    var rx = rect.x1;
    var ry = rect.y1;
    var rx2 = rect.x2;
    var ry2 = rect.y2;
    return x >= rx && x <= rx2 && y >= ry && y <= ry2;
}
function inCircle(x, y, circleX, circleY, r) {
    if (Math.sqrt(Math.pow(x - circleX, 2) + Math.pow(y - circleY, 2)) <= r) {
        return true;
    }
    return false;
}
function drawImage(ctx, imgEl, sX, sY, sW, sH, x, y, flipX, flipY) {
    ctx.save();
    flipX = flipX ? -1 : 1;
    flipY = flipY ? -1 : 1;
    ctx.scale(flipX, 1);
    if (!sW) {
        ctx.drawImage(imgEl, Math.round(sX), Math.round(sY));
    }
    else {
        ctx.drawImage(imgEl, Math.round(sX), Math.round(sY), Math.round(sW), Math.round(sH), flipX * Math.round(x), Math.round(y), flipX * Math.round(sW), Math.round(sH));
    }
    ctx.restore();
}
function drawRect(ctx, rect, fillColor, strokeColor, strokeWidth, fillAlpha) {
    var rx = Math.round(rect.x1);
    var ry = Math.round(rect.y1);
    var rx2 = Math.round(rect.x2);
    var ry2 = Math.round(rect.y2);
    ctx.beginPath();
    ctx.rect(rx, ry, rx2 - rx, ry2 - ry);
    if (fillAlpha) {
        ctx.globalAlpha = fillAlpha;
    }
    if (strokeColor) {
        strokeWidth = strokeWidth ? strokeWidth : 1;
        ctx.lineWidth = strokeWidth;
        ctx.strokeStyle = strokeColor;
        ctx.stroke();
    }
    if (fillColor) {
        ctx.fillStyle = fillColor;
        ctx.fill();
    }
    ctx.globalAlpha = 1;
}
function drawPolygon(ctx, vertices, closed, fillColor, lineColor, lineThickness, fillAlpha) {
    if (fillAlpha) {
        ctx.globalAlpha = fillAlpha;
    }
    ctx.beginPath();
    ctx.moveTo(vertices[0].x, vertices[0].y);
    for (var i = 1; i < vertices.length; i++) {
        ctx.lineTo(vertices[i].x, vertices[i].y);
    }
    if (closed) {
        ctx.closePath();
        if (fillColor) {
            ctx.fillStyle = fillColor;
            ctx.fill();
        }
    }
    if (lineColor) {
        ctx.lineWidth = lineThickness;
        ctx.strokeStyle = lineColor;
        ctx.stroke();
    }
    ctx.globalAlpha = 1;
}
function pointInPolygon(x, y, vertices) {
    var inside = false;
    for (var i = 0, j = vertices.length - 1; i < vertices.length; j = i++) {
        var xi = vertices[i].x, yi = vertices[i].y;
        var xj = vertices[j].x, yj = vertices[j].y;
        var intersect = ((yi > y) !== (yj > y))
            && (x < (xj - xi) * (y - yi) / (yj - yi) + xi);
        if (intersect)
            inside = !inside;
    }
    return inside;
}
function drawText(ctx, text, x, y, color, size, hAlign, vAlign, font) {
    color = color || "black";
    size = size || 14;
    hAlign = hAlign || "center";
    vAlign = vAlign || "middle";
    font = font || "Arial";
    ctx.font = size + "px " + font;
    ctx.fillStyle = color;
    ctx.textAlign = hAlign;
    ctx.textBaseline = vAlign;
    ctx.strokeText(text, x, y);
}
function drawCircle(ctx, x, y, r, fillColor, lineColor, lineThickness) {
    ctx.beginPath();
    ctx.arc(x, y, r, 0, 2 * Math.PI, false);
    if (fillColor) {
        ctx.fillStyle = fillColor;
        ctx.fill();
    }
    if (lineColor) {
        ctx.lineWidth = lineThickness;
        ctx.strokeStyle = lineColor;
        ctx.stroke();
    }
}
function drawLine(ctx, x, y, x2, y2, color, thickness) {
    if (!thickness)
        thickness = 1;
    if (!color)
        color = 'black';
    ctx.beginPath();
    ctx.moveTo(x, y);
    ctx.lineTo(x2, y2);
    ctx.lineWidth = thickness;
    ctx.strokeStyle = color;
    ctx.stroke();
}
function linepointNearestMouse(x0, y0, x1, y1, x, y) {
    function lerp(a, b, x) { return (a + x * (b - a)); }
    ;
    var dx = x1 - x0;
    var dy = y1 - y0;
    var t = ((x - x0) * dx + (y - y0) * dy) / (dx * dx + dy * dy);
    var lineX = lerp(x0, x1, t);
    var lineY = lerp(y0, y1, t);
    return new Point(lineX, lineY);
}
function inLine(mouseX, mouseY, x0, y0, x1, y1) {
    var threshold = 4;
    var small_x = Math.min(x0, x1);
    var big_x = Math.max(x0, x1);
    if (mouseX < small_x - (threshold * 0.5) || mouseX > big_x + (threshold * 0.5)) {
        return false;
    }
    var linepoint = linepointNearestMouse(x0, y0, x1, y1, mouseX, mouseY);
    var dx = mouseX - linepoint.x;
    var dy = mouseY - linepoint.y;
    var distance = Math.abs(Math.sqrt(dx * dx + dy * dy));
    if (distance < threshold) {
        return true;
    }
    else {
        return false;
    }
}
var Level = (function () {
    function Level(levelJson) {
        this.name = levelJson.name;
        this.background = getBackground(levelJson.backgroundPath);
        for (var _i = 0, _a = levelJson.instances; _i < _a.length; _i++) {
            var instance = _a[_i];
            if (instance.className === "ShapeInstance") {
                var wall = new Wall();
                for (var _b = 0, _c = instance.points; _b < _c.length; _b++) {
                    var point = _c[_b];
                    wall.collider.points.push(new Point(point.x, point.y));
                    this.gameObjects.push(wall);
                }
            }
            else {
            }
        }
    }
    Level.prototype.update = function () {
        for (var _i = 0, _a = this.gameObjects; _i < _a.length; _i++) {
            var go = _a[_i];
            go.update();
        }
    };
    Level.prototype.render = function () {
        for (var _i = 0, _a = this.gameObjects; _i < _a.length; _i++) {
            var go = _a[_i];
            go.render();
        }
        drawImage(ctx, this.background, 0, 0);
    };
    return Level;
}());
var Point = (function () {
    function Point(x, y) {
        this.x = x;
        this.y = y;
    }
    return Point;
}());
var Rect = (function () {
    function Rect(topLeftPoint, botRightPoint) {
        this.topLeftPoint = topLeftPoint;
        this.botRightPoint = botRightPoint;
    }
    Object.defineProperty(Rect.prototype, "x1", {
        get: function () {
            return this.topLeftPoint.x;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Rect.prototype, "y1", {
        get: function () {
            return this.topLeftPoint.y;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Rect.prototype, "x2", {
        get: function () {
            return this.botRightPoint.x;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Rect.prototype, "y2", {
        get: function () {
            return this.botRightPoint.y;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Rect.prototype, "w", {
        get: function () {
            return this.botRightPoint.x - this.topLeftPoint.x;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Rect.prototype, "h", {
        get: function () {
            return this.botRightPoint.y - this.topLeftPoint.y;
        },
        enumerable: true,
        configurable: true
    });
    Rect.prototype.getPoints = function () {
        return [
            new Point(this.topLeftPoint.x, this.topLeftPoint.y),
            new Point(this.botRightPoint.x, this.topLeftPoint.y),
            new Point(this.botRightPoint.x, this.botRightPoint.y),
            new Point(this.topLeftPoint.x, this.botRightPoint.y),
        ];
    };
    return Rect;
}());
var Sprite = (function () {
    function Sprite(spriteJson) {
        this.name = spriteJson.name;
        this.alignment = spriteJson.alignment;
        this.spritesheet = getSpritesheet(spriteJson.spritesheetPath);
        for (var _i = 0, _a = spriteJson.hitboxes; _i < _a.length; _i++) {
            var hitboxJson = _a[_i];
            var hitbox = new Collider([
                new Point(hitboxJson.rect.topLeftPoint.x, hitboxJson.rect.topLeftPoint.y),
                new Point(hitboxJson.rect.botRightPoint.x, hitboxJson.rect.topLeftPoint.y),
                new Point(hitboxJson.rect.botRightPoint.x, hitboxJson.rect.botRightPoint.y),
                new Point(hitboxJson.rect.topLeftPoint.x, hitboxJson.rect.botRightPoint.y)
            ]);
            this.hitboxes.push(hitbox);
        }
        for (var _b = 0, _c = spriteJson.frames; _b < _c.length; _b++) {
            var frameJson = _c[_b];
            var frame = new Frame(new Rect(new Point(frameJson.rect.topLeftPoint.x, frameJson.rect.topLeftPoint.y), new Point(frameJson.rect.botRightPoint.x, frameJson.rect.botRightPoint.y)), frameJson.duration, new Point(frameJson.offset.x, frameJson.offset.y));
            this.frames.push(frame);
        }
    }
    Sprite.prototype.draw = function (frameIndex, cX, cY, flipX, flipY) {
        var frame = this.frames[frameIndex];
        var rect = frame.rect;
        var offset = frame.offset;
        var w = rect.w;
        var h = rect.h;
        var halfW = w * 0.5;
        var halfH = h * 0.5;
        var x;
        var y;
        if (this.alignment === "topleft") {
            x = cX;
            y = cY;
        }
        else if (this.alignment === "topmid") {
            x = cX - halfW;
            y = cY;
        }
        else if (this.alignment === "topright") {
            x = cX - w;
            y = cY;
        }
        else if (this.alignment === "midleft") {
            x = cX;
            y = cY - halfH;
        }
        else if (this.alignment === "center") {
            x = cX - halfW;
            y = cY - halfH;
        }
        else if (this.alignment === "midright") {
            x = cX - w;
            y = cY - halfH;
        }
        else if (this.alignment === "botleft") {
            x = cX;
            y = cY - h;
        }
        else if (this.alignment === "botmid") {
            x = cX - halfW;
            y = cY - h;
        }
        else if (this.alignment === "botright") {
            x = cX - w;
            y = cY - h;
        }
        drawImage(ctx, this.spritesheet, rect.x1, rect.y1, rect.w, rect.h, x + offset.x, y + offset.y, flipX, flipY);
    };
    return Sprite;
}());
var Wall = (function (_super) {
    __extends(Wall, _super);
    function Wall() {
        return _super.call(this) || this;
    }
    return Wall;
}(Geometry));
//# sourceMappingURL=main.js.map