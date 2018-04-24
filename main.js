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
var Actor = (function () {
    function Actor() {
    }
    Actor.prototype.update = function () {
    };
    Actor.prototype.render = function () {
    };
    Actor.prototype.onCollision = function (other) {
    };
    Actor.prototype.onTrigger = function (other) {
    };
    return Actor;
}());
var Collider = (function () {
    function Collider() {
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
var Game = (function () {
    function Game() {
    }
    Game.prototype.gameLoop = function () {
        this.level.update();
        this.level.render();
    };
    return Game;
}());
var Geometry = (function () {
    function Geometry() {
    }
    Geometry.prototype.update = function () {
    };
    Geometry.prototype.render = function () {
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
    var lerp = function (a, b, x) { return (a + x * (b - a)); };
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
    function Level() {
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
var Shape = (function () {
    function Shape() {
    }
    return Shape;
}());
var Sprite = (function () {
    function Sprite() {
        this.hitboxes = [];
        this.frames = [];
    }
    Sprite.prototype.draw = function (ctx, frame, cX, cY, flipX, flipY) {
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