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
System.register("point", [], function (exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var Point;
    return {
        setters: [],
        execute: function () {
            Point = (function () {
                function Point(x, y) {
                    this.x = x;
                    this.y = y;
                }
                Object.defineProperty(Point.prototype, "ix", {
                    get: function () {
                        return Math.round(this.x);
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(Point.prototype, "iy", {
                    get: function () {
                        return Math.round(this.y);
                    },
                    enumerable: true,
                    configurable: true
                });
                Point.prototype.addxy = function (x, y) {
                    var point = new Point(this.x + x, this.y + y);
                    return point;
                };
                Point.prototype.normalize = function () {
                    if (this.x === 0 && this.y === 0)
                        return new Point(0, 0);
                    var mag = this.magnitude;
                    var point = new Point(this.x / this.magnitude, this.y / this.magnitude);
                    if (isNaN(point.x) || isNaN(point.y)) {
                        throw "NAN!";
                    }
                    return point;
                };
                Point.prototype.add = function (other) {
                    var point = new Point(this.x + other.x, this.y + other.y);
                    return point;
                };
                Point.prototype.inc = function (other) {
                    this.x += other.x;
                    this.y += other.y;
                };
                Point.prototype.times = function (num) {
                    var point = new Point(this.x * num, this.y * num);
                    return point;
                };
                Point.prototype.multiply = function (num) {
                    this.x *= num;
                    this.y *= num;
                    return this;
                };
                Object.defineProperty(Point.prototype, "magnitude", {
                    get: function () {
                        var root = this.x * this.x + this.y * this.y;
                        if (root < 0)
                            root = 0;
                        var result = Math.sqrt(root);
                        if (isNaN(result))
                            throw "NAN!";
                        return result;
                    },
                    enumerable: true,
                    configurable: true
                });
                Point.prototype.clone = function () {
                    return new Point(this.x, this.y);
                };
                Point.prototype.distanceTo = function (other) {
                    return Math.sqrt(Math.pow(other.x - this.x, 2) + Math.pow(other.y - this.y, 2));
                };
                Point.prototype.subtract = function (other) {
                    return new Point(this.x - other.x, this.y - other.y);
                };
                Point.prototype.directionTo = function (other) {
                    return new Point(other.x - this.x, other.y - this.y);
                };
                return Point;
            }());
            exports_1("Point", Point);
        }
    };
});
System.register("gameObject", [], function (exports_2, context_2) {
    "use strict";
    var __moduleName = context_2 && context_2.id;
    return {
        setters: [],
        execute: function () {
        }
    };
});
System.register("rect", ["point"], function (exports_3, context_3) {
    "use strict";
    var __moduleName = context_3 && context_3.id;
    var point_1, Rect;
    return {
        setters: [
            function (point_1_1) {
                point_1 = point_1_1;
            }
        ],
        execute: function () {
            Rect = (function () {
                function Rect(x1, y1, x2, y2) {
                    this.topLeftPoint = new point_1.Point(x1, y1);
                    this.botRightPoint = new point_1.Point(x2, y2);
                }
                Rect.Create = function (topLeftPoint, botRightPoint) {
                    return new Rect(topLeftPoint.x, topLeftPoint.y, botRightPoint.x, botRightPoint.y);
                };
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
                        new point_1.Point(this.topLeftPoint.x, this.topLeftPoint.y),
                        new point_1.Point(this.botRightPoint.x, this.topLeftPoint.y),
                        new point_1.Point(this.botRightPoint.x, this.botRightPoint.y),
                        new point_1.Point(this.topLeftPoint.x, this.botRightPoint.y),
                    ];
                };
                Rect.prototype.overlaps = function (other) {
                    if (this.x1 > other.x2 || other.x1 > this.x2)
                        return false;
                    if (this.y1 > other.y2 || other.y1 > this.y2)
                        return false;
                    return true;
                };
                return Rect;
            }());
            exports_3("Rect", Rect);
        }
    };
});
System.register("shape", ["point", "rect"], function (exports_4, context_4) {
    "use strict";
    var __moduleName = context_4 && context_4.id;
    var point_2, rect_1, Line, IntersectData, Shape;
    return {
        setters: [
            function (point_2_1) {
                point_2 = point_2_1;
            },
            function (rect_1_1) {
                rect_1 = rect_1_1;
            }
        ],
        execute: function () {
            Line = (function () {
                function Line(point1, point2) {
                    this.point1 = point1;
                    this.point2 = point2;
                }
                Line.prototype.intersectsLine = function (other) {
                    var a = this.point1.x;
                    var b = this.point1.y;
                    var c = this.point2.x;
                    var d = this.point2.y;
                    var p = other.point1.x;
                    var q = other.point1.y;
                    var r = other.point2.x;
                    var s = other.point2.y;
                    var det, gamma, lambda;
                    det = (c - a) * (s - q) - (r - p) * (d - b);
                    if (det === 0) {
                        return false;
                    }
                    else {
                        lambda = ((s - q) * (r - a) + (p - r) * (s - b)) / det;
                        gamma = ((b - d) * (r - a) + (c - a) * (s - b)) / det;
                        return (0 < lambda && lambda < 1) && (0 < gamma && gamma < 1);
                    }
                };
                Object.defineProperty(Line.prototype, "x1", {
                    get: function () { return this.point1.x; },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(Line.prototype, "y1", {
                    get: function () { return this.point1.y; },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(Line.prototype, "x2", {
                    get: function () { return this.point2.x; },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(Line.prototype, "y2", {
                    get: function () { return this.point2.y; },
                    enumerable: true,
                    configurable: true
                });
                Line.prototype.checkLineIntersection = function (line1StartX, line1StartY, line1EndX, line1EndY, line2StartX, line2StartY, line2EndX, line2EndY) {
                    var denominator, a, b, numerator1, numerator2, result = {
                        x: null,
                        y: null,
                        onLine1: false,
                        onLine2: false
                    };
                    denominator = ((line2EndY - line2StartY) * (line1EndX - line1StartX)) - ((line2EndX - line2StartX) * (line1EndY - line1StartY));
                    if (denominator == 0) {
                        return result;
                    }
                    a = line1StartY - line2StartY;
                    b = line1StartX - line2StartX;
                    numerator1 = ((line2EndX - line2StartX) * a) - ((line2EndY - line2StartY) * b);
                    numerator2 = ((line1EndX - line1StartX) * a) - ((line1EndY - line1StartY) * b);
                    a = numerator1 / denominator;
                    b = numerator2 / denominator;
                    result.x = line1StartX + (a * (line1EndX - line1StartX));
                    result.y = line1StartY + (a * (line1EndY - line1StartY));
                    if (a > 0 && a < 1) {
                        result.onLine1 = true;
                    }
                    if (b > 0 && b < 1) {
                        result.onLine2 = true;
                    }
                    return result;
                };
                Line.prototype.getIntersectPoint = function (other) {
                    var intersection = this.checkLineIntersection(this.x1, this.y1, this.x2, this.y2, other.x1, other.y1, other.x2, other.y2);
                    if (intersection.x !== null && intersection.y !== null)
                        return new point_2.Point(intersection.x, intersection.y);
                    return undefined;
                };
                Object.defineProperty(Line.prototype, "slope", {
                    get: function () {
                        if (this.x1 == this.x2)
                            return NaN;
                        return (this.y1 - this.y2) / (this.x1 - this.x2);
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(Line.prototype, "yInt", {
                    get: function () {
                        if (this.x1 === this.x2)
                            return this.y1 === 0 ? 0 : NaN;
                        if (this.y1 === this.y2)
                            return this.y1;
                        return this.y1 - this.slope * this.x1;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(Line.prototype, "xInt", {
                    get: function () {
                        var slope;
                        if (this.y1 === this.y2)
                            return this.x1 == 0 ? 0 : NaN;
                        if (this.x1 === this.x2)
                            return this.x1;
                        return (-1 * ((slope = this.slope * this.x1 - this.y1)) / this.slope);
                    },
                    enumerable: true,
                    configurable: true
                });
                return Line;
            }());
            exports_4("Line", Line);
            IntersectData = (function () {
                function IntersectData(intersectPoint, normal) {
                    this.intersectPoint = intersectPoint;
                    this.normal = normal;
                }
                return IntersectData;
            }());
            exports_4("IntersectData", IntersectData);
            Shape = (function () {
                function Shape(points) {
                    this.points = points;
                }
                Shape.prototype.getRect = function () {
                    if (this.points.length !== 4)
                        return undefined;
                    if (this.points[0].ix === this.points[3].ix && this.points[1].ix === this.points[2].ix && this.points[0].iy === this.points[1].iy && this.points[2].iy === this.points[3].iy) {
                        return rect_1.Rect.Create(this.points[0], this.points[2]);
                    }
                    return undefined;
                };
                Shape.prototype.getLines = function () {
                    var lines = [];
                    for (var i = 0; i < this.points.length; i++) {
                        var next = i + 1;
                        if (next >= this.points.length)
                            next = 0;
                        lines.push(new Line(this.points[i], this.points[next]));
                    }
                    return lines;
                };
                Shape.prototype.intersectsShape = function (other) {
                    var rect1 = this.getRect();
                    var rect2 = other.getRect();
                    if (rect1 && rect2) {
                        if (rect1.x1 > rect2.x2 || rect2.x1 > rect1.x2)
                            return false;
                        if (rect1.y1 > rect2.y2 || rect2.y1 > rect1.y2)
                            return false;
                        return true;
                    }
                    else {
                        var lines1 = this.getLines();
                        var lines2 = other.getLines();
                        for (var _i = 0, lines1_1 = lines1; _i < lines1_1.length; _i++) {
                            var line1 = lines1_1[_i];
                            for (var _a = 0, lines2_1 = lines2; _a < lines2_1.length; _a++) {
                                var line2 = lines2_1[_a];
                                if (line1.intersectsLine(line2)) {
                                    return true;
                                }
                            }
                        }
                        return false;
                    }
                };
                Shape.prototype.containsPoint = function (point) {
                    var x = point.x;
                    var y = point.y;
                    var vertices = this.points;
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
                };
                Shape.prototype.getIntersectPoint = function (point, dir) {
                    if (this.containsPoint(point)) {
                        return point;
                    }
                    var intersections = [];
                    var pointLine = new Line(point, point.add(dir));
                    for (var _i = 0, _a = this.getLines(); _i < _a.length; _i++) {
                        var line = _a[_i];
                        var intersectPoint = line.getIntersectPoint(pointLine);
                        if (intersectPoint) {
                            intersections.push(intersectPoint);
                        }
                    }
                    if (intersections.length === 0)
                        return undefined;
                    return _.minBy(intersections, function (intersectPoint) {
                        return intersectPoint.distanceTo(point);
                    });
                };
                Shape.prototype.getClosestPointOnBounds = function (point) {
                };
                Shape.prototype.clone = function (x, y) {
                    var points = [];
                    for (var _i = 0, _a = this.points; _i < _a.length; _i++) {
                        var point = _a[_i];
                        points.push(new point_2.Point(point.x + x, point.y + y));
                    }
                    return new Shape(points);
                };
                return Shape;
            }());
            exports_4("Shape", Shape);
        }
    };
});
System.register("color", [], function (exports_5, context_5) {
    "use strict";
    var __moduleName = context_5 && context_5.id;
    var Color, paletteCanvas, paletteCtx, Palette;
    return {
        setters: [],
        execute: function () {
            Color = (function () {
                function Color(r, g, b, a) {
                    this.r = r;
                    this.g = g;
                    this.b = b;
                    this.a = a;
                }
                Object.defineProperty(Color.prototype, "hex", {
                    get: function () {
                        return "#" + this.r.toString(16) + this.g.toString(16) + this.b.toString(16) + this.a.toString(16);
                    },
                    enumerable: true,
                    configurable: true
                });
                return Color;
            }());
            exports_5("Color", Color);
            paletteCanvas = document.createElement("canvas");
            paletteCtx = paletteCanvas.getContext("2d");
            Palette = (function () {
                function Palette(path) {
                    var _this = this;
                    this.imagePath = "";
                    this.colorMap = {};
                    this.imagePath = path;
                    this.imageEl = document.createElement("img");
                    this.imageEl.src = path;
                    this.imageEl.onload = function () { return _this.onLoad(); };
                }
                Palette.prototype.onLoad = function () {
                    paletteCanvas.width = this.imageEl.width;
                    paletteCanvas.height = this.imageEl.height;
                    paletteCtx.clearRect(0, 0, this.imageEl.width, this.imageEl.height);
                    paletteCtx.drawImage(this.imageEl, 0, 0);
                    var imageData = paletteCtx.getImageData(0, 0, paletteCanvas.width, paletteCanvas.height);
                    var data = imageData.data;
                    for (var i = 0, j = 0; i < data.length / 2; i += 4, j++) {
                        var r = data[i];
                        var g = data[i + 1];
                        var b = data[i + 2];
                        var a = data[i + 3];
                        var topColor = new Color(r, g, b, a);
                        var r2 = data[i + data.length / 2];
                        var g2 = data[i + 1 + data.length / 2];
                        var b2 = data[i + 2 + data.length / 2];
                        var a2 = data[i + 3 + data.length / 2];
                        var botColor = new Color(r2, g2, b2, a2);
                        this.colorMap[topColor.hex] = botColor;
                    }
                };
                return Palette;
            }());
            exports_5("Palette", Palette);
        }
    };
});
System.register("helpers", ["point"], function (exports_6, context_6) {
    "use strict";
    var __moduleName = context_6 && context_6.id;
    function inRect(x, y, rect) {
        var rx = rect.x1;
        var ry = rect.y1;
        var rx2 = rect.x2;
        var ry2 = rect.y2;
        return x >= rx && x <= rx2 && y >= ry && y <= ry2;
    }
    exports_6("inRect", inRect);
    function inCircle(x, y, circleX, circleY, r) {
        if (Math.sqrt(Math.pow(x - circleX, 2) + Math.pow(y - circleY, 2)) <= r) {
            return true;
        }
        return false;
    }
    exports_6("inCircle", inCircle);
    function toZero(num, inc, dir) {
        if (dir === 1) {
            num -= inc;
            if (num < 0)
                num = 0;
            return num;
        }
        else if (dir === -1) {
            num += inc;
            if (num > 0)
                num = 0;
            return num;
        }
        else {
            throw "Must pass in -1 or 1 for dir";
        }
    }
    exports_6("toZero", toZero);
    function incrementRange(num, min, max) {
        num++;
        if (num >= max)
            num = min;
        return num;
    }
    exports_6("incrementRange", incrementRange);
    function decrementRange(num, min, max) {
        num--;
        if (num < min)
            num = max - 1;
        return num;
    }
    exports_6("decrementRange", decrementRange);
    function clamp01(num) {
        if (num < 0)
            num = 0;
        if (num > 1)
            num = 1;
        return num;
    }
    exports_6("clamp01", clamp01);
    function randomRange(start, end) {
        end++;
        var dist = end - start;
        return Math.floor(Math.random() * dist) + start;
    }
    exports_6("randomRange", randomRange);
    function clampMax(num, max) {
        return num < max ? num : max;
    }
    exports_6("clampMax", clampMax);
    function clampMin(num, min) {
        return num > min ? num : min;
    }
    exports_6("clampMin", clampMin);
    function clampMin0(num) {
        return clampMin(num, 0);
    }
    exports_6("clampMin0", clampMin0);
    function clamp(num, min, max) {
        if (num < min)
            return min;
        if (num > max)
            return max;
        return num;
    }
    exports_6("clamp", clamp);
    function sin(degrees) {
        var rads = degrees * Math.PI / 180;
        return Math.sin(rads);
    }
    exports_6("sin", sin);
    function cos(degrees) {
        var rads = degrees * Math.PI / 180;
        return Math.cos(rads);
    }
    exports_6("cos", cos);
    function atan(value) {
        return Math.atan(value) * 180 / Math.PI;
    }
    exports_6("atan", atan);
    function moveTo(num, dest, inc) {
        inc *= Math.sign(dest - num);
        num += inc;
        return num;
    }
    exports_6("moveTo", moveTo);
    function lerp(num, dest, timeScale) {
        num = num + (dest - num) * timeScale;
        return num;
    }
    exports_6("lerp", lerp);
    function lerpAngle(angle, destAngle, timeScale) {
        var dir = 1;
        if (Math.abs(destAngle - angle) > 180) {
            dir = -1;
        }
        angle = angle + dir * (destAngle - angle) * timeScale;
        return to360(angle);
    }
    exports_6("lerpAngle", lerpAngle);
    function to360(angle) {
        if (angle < 0)
            angle += 360;
        if (angle > 360)
            angle -= 360;
        return angle;
    }
    exports_6("to360", to360);
    function getHex(r, g, b, a) {
        return "#" + r.toString(16) + g.toString(16) + b.toString(16) + a.toString(16);
    }
    exports_6("getHex", getHex);
    function getAutoIncId() {
        autoInc++;
        return autoInc;
    }
    exports_6("getAutoIncId", getAutoIncId);
    function noCanvasSmoothing(c) {
        c.webkitImageSmoothingEnabled = false;
        c.mozImageSmoothingEnabled = false;
        c.imageSmoothingEnabled = false;
    }
    exports_6("noCanvasSmoothing", noCanvasSmoothing);
    function drawImage(ctx, imgEl, sX, sY, sW, sH, x, y, flipX, flipY, options, alpha, palette) {
        if (!sW) {
            ctx.drawImage(imgEl, Math.round(sX), Math.round(sY));
            return;
        }
        ctx.globalAlpha = (alpha === null || alpha === undefined) ? 1 : alpha;
        helperCanvas.width = Math.round(sW);
        helperCanvas.height = Math.round(sH);
        helperCtx.save();
        flipX = flipX || 1;
        flipY = flipY || 1;
        helperCtx.scale(flipX, flipY);
        helperCtx.clearRect(0, 0, helperCanvas.width, helperCanvas.height);
        helperCtx.drawImage(imgEl, Math.round(sX), Math.round(sY), Math.round(sW), Math.round(sH), 0, 0, flipX * Math.round(sW), flipY * Math.round(sH));
        if (palette) {
            var imageData = helperCtx.getImageData(0, 0, helperCanvas.width, helperCanvas.height);
            var data = imageData.data;
            for (var i = 0; i < data.length; i += 4) {
                var r = data[i];
                var g = data[i + 1];
                var b = data[i + 2];
                var a = data[i + 3];
                var color = palette.colorMap[getHex(r, g, b, a)];
                if (color !== null && color !== undefined) {
                    data[i] = color.r;
                    data[i + 1] = color.g;
                    data[i + 2] = color.b;
                }
            }
            helperCtx.putImageData(imageData, 0, 0);
        }
        if (options === "flash") {
            var imageData = helperCtx.getImageData(0, 0, helperCanvas.width, helperCanvas.height);
            var data = imageData.data;
            for (var i = 0; i < data.length; i += 4) {
                var r = data[i];
                var g = data[i + 1];
                var b = data[i + 2];
                var a = data[i + 3];
                data[i] = clampMax(r + 64, 255);
                data[i + 1] = clampMax(g + 64, 255);
                data[i + 2] = clampMax(b + 128, 255);
            }
            helperCtx.putImageData(imageData, 0, 0);
        }
        else if (options === "hit") {
            var imageData = helperCtx.getImageData(0, 0, helperCanvas.width, helperCanvas.height);
            var data = imageData.data;
            for (var i = 0; i < data.length; i += 4) {
                var r = data[i];
                var g = data[i + 1];
                var b = data[i + 2];
                var a = data[i + 3];
                data[i] = clampMax(r + 128, 255);
                data[i + 1] = clampMax(g + 128, 255);
                data[i + 2] = clampMax(b + 128, 255);
            }
            helperCtx.putImageData(imageData, 0, 0);
        }
        if (flipX === 1)
            ctx.drawImage(helperCanvas, Math.round(x), Math.round(y));
        else
            ctx.drawImage(helperCanvas, Math.ceil(x), Math.ceil(y));
        ctx.globalAlpha = 1;
        helperCtx.restore();
    }
    exports_6("drawImage", drawImage);
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
    exports_6("drawRect", drawRect);
    function drawPolygon(ctx, shape, closed, fillColor, lineColor, lineThickness, fillAlpha) {
        var vertices = shape.points;
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
    exports_6("drawPolygon", drawPolygon);
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
    exports_6("drawText", drawText);
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
    exports_6("drawCircle", drawCircle);
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
    exports_6("drawLine", drawLine);
    function linepointNearestMouse(x0, y0, x1, y1, x, y) {
        function lerp(a, b, x) { return (a + x * (b - a)); }
        ;
        var dx = x1 - x0;
        var dy = y1 - y0;
        var t = ((x - x0) * dx + (y - y0) * dy) / (dx * dx + dy * dy);
        var lineX = lerp(x0, x1, t);
        var lineY = lerp(y0, y1, t);
        return new point_3.Point(lineX, lineY);
    }
    exports_6("linepointNearestMouse", linepointNearestMouse);
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
    exports_6("inLine", inLine);
    var point_3, autoInc, helperCanvas, helperCtx, helperCanvas2, helperCtx2, helperCanvas3, helperCtx3;
    return {
        setters: [
            function (point_3_1) {
                point_3 = point_3_1;
            }
        ],
        execute: function () {
            autoInc = 0;
            helperCanvas = document.createElement("canvas");
            helperCtx = helperCanvas.getContext("2d");
            noCanvasSmoothing(helperCtx);
            helperCanvas2 = document.createElement("canvas");
            helperCtx2 = helperCanvas2.getContext("2d");
            noCanvasSmoothing(helperCtx2);
            helperCanvas3 = document.createElement("canvas");
            helperCtx3 = helperCanvas3.getContext("2d");
            noCanvasSmoothing(helperCtx3);
        }
    };
});
System.register("geometry", ["collider", "game", "helpers"], function (exports_7, context_7) {
    "use strict";
    var __moduleName = context_7 && context_7.id;
    var collider_1, game_1, Helpers, Geometry;
    return {
        setters: [
            function (collider_1_1) {
                collider_1 = collider_1_1;
            },
            function (game_1_1) {
                game_1 = game_1_1;
            },
            function (Helpers_1) {
                Helpers = Helpers_1;
            }
        ],
        execute: function () {
            Geometry = (function () {
                function Geometry(points) {
                    this.collider = new collider_1.Collider(points, false);
                }
                Geometry.prototype.preUpdate = function () {
                };
                Geometry.prototype.update = function () {
                };
                Geometry.prototype.render = function (x, y) {
                    if (game_1.game.options.showHitboxes) {
                        Helpers.drawPolygon(game_1.game.ctx, this.collider.shape.clone(x, y), true, "blue", "", 0, 0.5);
                    }
                };
                Geometry.prototype.onCollision = function (other) {
                };
                return Geometry;
            }());
            exports_7("Geometry", Geometry);
        }
    };
});
System.register("wall", ["geometry"], function (exports_8, context_8) {
    "use strict";
    var __moduleName = context_8 && context_8.id;
    var geometry_1, Wall, Ladder;
    return {
        setters: [
            function (geometry_1_1) {
                geometry_1 = geometry_1_1;
            }
        ],
        execute: function () {
            Wall = (function (_super) {
                __extends(Wall, _super);
                function Wall(points) {
                    var _this = _super.call(this, points) || this;
                    _this.collider.isClimbable = true;
                    return _this;
                }
                return Wall;
            }(geometry_1.Geometry));
            exports_8("Wall", Wall);
            Ladder = (function (_super) {
                __extends(Ladder, _super);
                function Ladder(points) {
                    var _this = _super.call(this, points) || this;
                    _this.collider.isTrigger = true;
                    return _this;
                }
                return Ladder;
            }(geometry_1.Geometry));
            exports_8("Ladder", Ladder);
        }
    };
});
System.register("damager", [], function (exports_9, context_9) {
    "use strict";
    var __moduleName = context_9 && context_9.id;
    var Damager;
    return {
        setters: [],
        execute: function () {
            Damager = (function () {
                function Damager(owner, damage) {
                    this.owner = owner;
                    this.damage = damage;
                }
                return Damager;
            }());
            exports_9("Damager", Damager);
        }
    };
});
System.register("weapon", ["projectile", "game", "point", "helpers", "actor"], function (exports_10, context_10) {
    "use strict";
    var __moduleName = context_10 && context_10.id;
    var projectile_1, game_2, point_4, Helpers, actor_1, Weapon, Buster, Torpedo, Sting, RollingShield, FireWave, Tornado, ElectricSpark, Boomerang, ShotgunIce;
    return {
        setters: [
            function (projectile_1_1) {
                projectile_1 = projectile_1_1;
            },
            function (game_2_1) {
                game_2 = game_2_1;
            },
            function (point_4_1) {
                point_4 = point_4_1;
            },
            function (Helpers_2) {
                Helpers = Helpers_2;
            },
            function (actor_1_1) {
                actor_1 = actor_1_1;
            }
        ],
        execute: function () {
            Weapon = (function () {
                function Weapon() {
                    this.speed = 350;
                    this.soundTime = 0;
                    this.ammo = 32;
                    this.maxAmmo = 32;
                    this.rateOfFire = 0.15;
                }
                Weapon.prototype.getProjectile = function (pos, xDir, player, chargeLevel) {
                    return undefined;
                };
                Weapon.prototype.update = function () {
                    if (this.soundTime > 0) {
                        this.soundTime = Helpers.clampMin(this.soundTime - game_2.game.deltaTime, 0);
                    }
                };
                Weapon.prototype.createBuster4Line = function (x, y, xDir, player, offsetTime) {
                    var buster4Speed = 350;
                    new projectile_1.Buster4Proj(new point_4.Point(x + xDir, y), new point_4.Point(xDir * buster4Speed, 0), player, 3, 4, offsetTime);
                    new projectile_1.Buster4Proj(new point_4.Point(x + xDir * 8, y), new point_4.Point(xDir * buster4Speed, 0), player, 2, 3, offsetTime);
                    new projectile_1.Buster4Proj(new point_4.Point(x + xDir * 18, y), new point_4.Point(xDir * buster4Speed, 0), player, 2, 2, offsetTime);
                    new projectile_1.Buster4Proj(new point_4.Point(x + xDir * 32, y), new point_4.Point(xDir * buster4Speed, 0), player, 1, 1, offsetTime);
                    new projectile_1.Buster4Proj(new point_4.Point(x + xDir * 46, y), new point_4.Point(xDir * buster4Speed, 0), player, 0, 0, offsetTime);
                };
                Weapon.prototype.canShoot = function (player) {
                    return true;
                };
                Weapon.prototype.shoot = function (pos, xDir, player, chargeLevel) {
                    var proj = this.getProjectile(pos, xDir, player, chargeLevel);
                    if (this instanceof Buster && chargeLevel === 3) {
                        new actor_1.Anim(pos.clone(), game_2.game.sprites["buster4_muzzle_flash"], xDir);
                        var xOff = -50 * xDir;
                        this.createBuster4Line(pos.x + xOff, pos.y, xDir, player, 0);
                        this.createBuster4Line(pos.x + xOff + 15 * xDir, pos.y, xDir, player, 1);
                        this.createBuster4Line(pos.x + xOff + 30 * xDir, pos.y, xDir, player, 2);
                    }
                    if (this.soundTime === 0) {
                        game_2.game.playSound(this.shootSounds[chargeLevel]);
                        if (this instanceof FireWave) {
                            this.soundTime = 0.25;
                        }
                    }
                    if (!(this instanceof Buster)) {
                        if (this instanceof FireWave) {
                            this.ammo -= game_2.game.deltaTime * 10;
                        }
                        else {
                            this.ammo--;
                        }
                    }
                };
                return Weapon;
            }());
            exports_10("Weapon", Weapon);
            Buster = (function (_super) {
                __extends(Buster, _super);
                function Buster() {
                    var _this = _super.call(this) || this;
                    _this.shootSounds = ["buster", "buster2", "buster3", "buster4"];
                    _this.index = 0;
                    return _this;
                }
                Buster.prototype.getProjectile = function (pos, xDir, player, chargeLevel) {
                    var vel = new point_4.Point(xDir * this.speed, 0);
                    if (chargeLevel === 0)
                        return new projectile_1.BusterProj(pos, vel, player);
                    else if (chargeLevel === 1)
                        return new projectile_1.Buster2Proj(pos, vel, player);
                    else if (chargeLevel === 2)
                        return new projectile_1.Buster3Proj(pos, vel, player);
                    else if (chargeLevel === 3)
                        return undefined;
                };
                return Buster;
            }(Weapon));
            exports_10("Buster", Buster);
            Torpedo = (function (_super) {
                __extends(Torpedo, _super);
                function Torpedo() {
                    var _this = _super.call(this) || this;
                    _this.shootSounds = ["torpedo", "torpedo", "torpedo", "torpedo"];
                    _this.index = 1;
                    _this.speed = 150;
                    _this.rateOfFire = 0.5;
                    return _this;
                }
                Torpedo.prototype.getProjectile = function (pos, xDir, player, chargeLevel) {
                    var vel = new point_4.Point(xDir * this.speed, 0);
                    return new projectile_1.TorpedoProj(pos, vel, player);
                };
                return Torpedo;
            }(Weapon));
            exports_10("Torpedo", Torpedo);
            Sting = (function (_super) {
                __extends(Sting, _super);
                function Sting() {
                    var _this = _super.call(this) || this;
                    _this.shootSounds = ["csting", "csting", "csting", "csting"];
                    _this.index = 2;
                    _this.speed = 300;
                    _this.rateOfFire = 0.75;
                    return _this;
                }
                Sting.prototype.getProjectile = function (pos, xDir, player, chargeLevel) {
                    var vel = new point_4.Point(xDir * this.speed, 0);
                    return new projectile_1.StingProj(pos, vel, player, 0);
                };
                return Sting;
            }(Weapon));
            exports_10("Sting", Sting);
            RollingShield = (function (_super) {
                __extends(RollingShield, _super);
                function RollingShield() {
                    var _this = _super.call(this) || this;
                    _this.shootSounds = ["rollingShield", "rollingShield", "rollingShield", "rollingShield"];
                    _this.index = 3;
                    _this.speed = 200;
                    _this.rateOfFire = 0.75;
                    return _this;
                }
                RollingShield.prototype.getProjectile = function (pos, xDir, player, chargeLevel) {
                    var vel = new point_4.Point(xDir * this.speed, 0);
                    return new projectile_1.RollingShieldProj(pos, vel, player);
                };
                return RollingShield;
            }(Weapon));
            exports_10("RollingShield", RollingShield);
            FireWave = (function (_super) {
                __extends(FireWave, _super);
                function FireWave() {
                    var _this = _super.call(this) || this;
                    _this.shootSounds = ["fireWave", "fireWave", "fireWave", "fireWave"];
                    _this.index = 4;
                    _this.speed = 400;
                    _this.rateOfFire = 0.05;
                    return _this;
                }
                FireWave.prototype.getProjectile = function (pos, xDir, player, chargeLevel) {
                    var vel = new point_4.Point(xDir * this.speed, 0);
                    vel.inc(player.character.vel.times(-0.5));
                    return new projectile_1.FireWaveProj(pos, vel, player);
                };
                return FireWave;
            }(Weapon));
            exports_10("FireWave", FireWave);
            Tornado = (function (_super) {
                __extends(Tornado, _super);
                function Tornado() {
                    var _this = _super.call(this) || this;
                    _this.shootSounds = ["tornado", "tornado", "tornado", "tornado"];
                    _this.index = 5;
                    _this.speed = 400;
                    _this.rateOfFire = 1.5;
                    return _this;
                }
                Tornado.prototype.getProjectile = function (pos, xDir, player, chargeLevel) {
                    var vel = new point_4.Point(xDir * this.speed, 0);
                    return new projectile_1.TornadoProj(pos, vel, player);
                };
                return Tornado;
            }(Weapon));
            exports_10("Tornado", Tornado);
            ElectricSpark = (function (_super) {
                __extends(ElectricSpark, _super);
                function ElectricSpark() {
                    var _this = _super.call(this) || this;
                    _this.shootSounds = ["electricSpark", "electricSpark", "electricSpark", "electricSpark"];
                    _this.index = 6;
                    _this.speed = 150;
                    _this.rateOfFire = 0.5;
                    return _this;
                }
                ElectricSpark.prototype.getProjectile = function (pos, xDir, player, chargeLevel) {
                    var vel = new point_4.Point(xDir * this.speed, 0);
                    return new projectile_1.ElectricSparkProj(pos, vel, player, 0);
                };
                return ElectricSpark;
            }(Weapon));
            exports_10("ElectricSpark", ElectricSpark);
            Boomerang = (function (_super) {
                __extends(Boomerang, _super);
                function Boomerang() {
                    var _this = _super.call(this) || this;
                    _this.shootSounds = ["boomerang", "boomerang", "boomerang", "boomerang"];
                    _this.index = 7;
                    _this.speed = 250;
                    _this.rateOfFire = 0.5;
                    return _this;
                }
                Boomerang.prototype.getProjectile = function (pos, xDir, player, chargeLevel) {
                    var vel = new point_4.Point(xDir * this.speed, 0);
                    return new projectile_1.BoomerangProj(pos, vel, player);
                };
                return Boomerang;
            }(Weapon));
            exports_10("Boomerang", Boomerang);
            ShotgunIce = (function (_super) {
                __extends(ShotgunIce, _super);
                function ShotgunIce() {
                    var _this = _super.call(this) || this;
                    _this.shootSounds = ["buster", "buster", "buster", "buster"];
                    _this.index = 8;
                    _this.speed = 400;
                    _this.rateOfFire = 0.75;
                    return _this;
                }
                ShotgunIce.prototype.getProjectile = function (pos, xDir, player, chargeLevel) {
                    var vel = new point_4.Point(xDir * this.speed, 0);
                    return new projectile_1.ShotgunIceProj(pos, vel, player, 0);
                };
                return ShotgunIce;
            }(Weapon));
            exports_10("ShotgunIce", ShotgunIce);
        }
    };
});
System.register("projectile", ["actor", "damager", "point", "collider", "character", "wall", "game", "helpers", "rect", "weapon"], function (exports_11, context_11) {
    "use strict";
    var __moduleName = context_11 && context_11.id;
    var actor_2, damager_1, point_5, collider_2, character_1, wall_1, game_3, Helpers, rect_2, weapon_1, Projectile, BusterProj, Buster2Proj, Buster3Proj, Buster4Proj, TorpedoProj, StingProj, RollingShieldProj, FireWaveProj, TornadoProj, ElectricSparkProj, BoomerangProj, ShotgunIceProj;
    return {
        setters: [
            function (actor_2_1) {
                actor_2 = actor_2_1;
            },
            function (damager_1_1) {
                damager_1 = damager_1_1;
            },
            function (point_5_1) {
                point_5 = point_5_1;
            },
            function (collider_2_1) {
                collider_2 = collider_2_1;
            },
            function (character_1_1) {
                character_1 = character_1_1;
            },
            function (wall_1_1) {
                wall_1 = wall_1_1;
            },
            function (game_3_1) {
                game_3 = game_3_1;
            },
            function (Helpers_3) {
                Helpers = Helpers_3;
            },
            function (rect_2_1) {
                rect_2 = rect_2_1;
            },
            function (weapon_1_1) {
                weapon_1 = weapon_1_1;
            }
        ],
        execute: function () {
            Projectile = (function (_super) {
                __extends(Projectile, _super);
                function Projectile(pos, vel, damage, player, sprite) {
                    var _this = _super.call(this, sprite) || this;
                    _this.time = 0;
                    _this.hitCooldown = 0;
                    _this.vel = vel;
                    _this.speed = _this.vel.magnitude;
                    _this.pos = pos;
                    _this.useGravity = false;
                    _this.flinch = false;
                    _this.damager = new damager_1.Damager(player, damage);
                    _this.xDir = Math.sign(vel.x);
                    return _this;
                }
                Projectile.prototype.update = function () {
                    _super.prototype.update.call(this);
                    this.time += game_3.game.deltaTime;
                    var leeway = 500;
                    if (this.pos.x > game_3.game.level.width + leeway || this.pos.x < -leeway || this.pos.y > game_3.game.level.height + leeway || this.pos.y < -leeway) {
                        this.destroySelf();
                    }
                };
                Projectile.prototype.onCollision = function (other) {
                    if (this instanceof TorpedoProj && other.gameObject instanceof Projectile && this.damager.owner !== other.gameObject.damager.owner) {
                        this.destroySelf(this.fadeSprite, this.fadeSound);
                        if (!(other.gameObject instanceof TornadoProj) && !(other.gameObject instanceof FireWaveProj)) {
                            other.gameObject.destroySelf(other.gameObject.fadeSprite, other.gameObject.fadeSound);
                        }
                        return;
                    }
                    var character = other.gameObject;
                    if (character instanceof character_1.Character && character.player.alliance !== this.damager.owner.alliance) {
                        var pos = other.collider.shape.getIntersectPoint(this.pos, this.vel);
                        if (pos)
                            this.pos = pos.clone();
                        var character_2 = other.gameObject;
                        if (character_2 instanceof character_1.Character) {
                            var key = this.constructor.toString() + this.damager.owner.id.toString();
                            if (!character_2.projectileCooldown[key] && !character_2.invulnFrames) {
                                character_2.projectileCooldown[key] = this.hitCooldown;
                                character_2.renderEffect = "hit";
                                character_2.renderEffectTime = 0.1;
                                var weakness = false;
                                if (this instanceof TorpedoProj && character_2.player.weapon instanceof weapon_1.Boomerang)
                                    weakness = true;
                                if (this instanceof StingProj && character_2.player.weapon instanceof weapon_1.Tornado)
                                    weakness = true;
                                if (this instanceof RollingShieldProj && character_2.player.weapon instanceof weapon_1.Torpedo)
                                    weakness = true;
                                if (this instanceof FireWaveProj && character_2.player.weapon instanceof weapon_1.ShotgunIce)
                                    weakness = true;
                                if (this instanceof TornadoProj && character_2.player.weapon instanceof weapon_1.FireWave)
                                    weakness = true;
                                if (this instanceof BoomerangProj && character_2.player.weapon instanceof weapon_1.Sting)
                                    weakness = true;
                                if (this instanceof ElectricSparkProj && character_2.player.weapon instanceof weapon_1.RollingShield)
                                    weakness = true;
                                if (this instanceof ShotgunIceProj && character_2.player.weapon instanceof weapon_1.ElectricSpark)
                                    weakness = true;
                                character_2.applyDamage(this.damager.damage * (weakness ? 2 : 1));
                                if (this.flinch || game_3.game.options.alwaysFlinch || weakness) {
                                    if (game_3.game.options.invulnFrames) {
                                        game_3.game.playSound("weakness");
                                    }
                                    else {
                                        game_3.game.playSound("hurt");
                                    }
                                    character_2.setHurt(this.pos.x > character_2.pos.x ? -1 : 1);
                                }
                                else {
                                    if (game_3.game.options.invulnFrames) {
                                        game_3.game.playSound("weakness");
                                    }
                                    else {
                                        game_3.game.playSound("hit");
                                    }
                                }
                                if (game_3.game.options.invulnFrames) {
                                    character_2.invulnFrames = 1;
                                    character_2.renderEffectTime = 1;
                                }
                            }
                            else if (character_2.invulnFrames && !character_2.projectileCooldown[key] &&
                                !(this instanceof TornadoProj) && !(this instanceof FireWaveProj)) {
                                game_3.game.playSound("hit");
                            }
                            this.onHitChar(character_2);
                        }
                    }
                    var wall = other.gameObject;
                    if (wall instanceof wall_1.Wall) {
                        this.onHitWall(wall);
                    }
                };
                Projectile.prototype.onHitChar = function (character) {
                    this.destroySelf(this.fadeSprite, this.fadeSound);
                };
                Projectile.prototype.onHitWall = function (wall) {
                };
                return Projectile;
            }(actor_2.Actor));
            exports_11("Projectile", Projectile);
            BusterProj = (function (_super) {
                __extends(BusterProj, _super);
                function BusterProj(pos, vel, player) {
                    var _this = _super.call(this, pos, vel, 0.5, player, game_3.game.sprites["buster1"]) || this;
                    _this.fadeSprite = game_3.game.sprites["buster1_fade"];
                    return _this;
                }
                return BusterProj;
            }(Projectile));
            exports_11("BusterProj", BusterProj);
            Buster2Proj = (function (_super) {
                __extends(Buster2Proj, _super);
                function Buster2Proj(pos, vel, player) {
                    var _this = _super.call(this, pos, vel, 2, player, game_3.game.sprites["buster2"]) || this;
                    _this.fadeSprite = game_3.game.sprites["buster2_fade"];
                    _this.flinch = true;
                    return _this;
                }
                return Buster2Proj;
            }(Projectile));
            exports_11("Buster2Proj", Buster2Proj);
            Buster3Proj = (function (_super) {
                __extends(Buster3Proj, _super);
                function Buster3Proj(pos, vel, player) {
                    var _this = _super.call(this, pos, vel, 3, player, game_3.game.sprites["buster3"]) || this;
                    _this.fadeSprite = game_3.game.sprites["buster3_fade"];
                    _this.flinch = true;
                    return _this;
                }
                return Buster3Proj;
            }(Projectile));
            exports_11("Buster3Proj", Buster3Proj);
            Buster4Proj = (function (_super) {
                __extends(Buster4Proj, _super);
                function Buster4Proj(pos, vel, player, type, num, offsetTime) {
                    var _this = _super.call(this, pos, vel, 4, player, game_3.game.sprites["buster4"]) || this;
                    _this.type = 0;
                    _this.num = 0;
                    _this.offsetTime = 0;
                    _this.initY = 0;
                    _this.fadeSprite = game_3.game.sprites["buster4_fade"];
                    _this.flinch = true;
                    _this.type = type;
                    _this.initY = _this.pos.y;
                    _this.offsetTime = offsetTime;
                    _this.num = num;
                    _this.hitCooldown = 1;
                    return _this;
                }
                Buster4Proj.prototype.update = function () {
                    _super.prototype.update.call(this);
                    this.frameIndex = this.type;
                    this.pos.y = this.initY + Math.sin(game_3.game.time * 18 - this.num * 0.5 + this.offsetTime * 2.09) * 15;
                };
                return Buster4Proj;
            }(Projectile));
            exports_11("Buster4Proj", Buster4Proj);
            TorpedoProj = (function (_super) {
                __extends(TorpedoProj, _super);
                function TorpedoProj(pos, vel, player) {
                    var _this = _super.call(this, pos, vel, 1, player, game_3.game.sprites["torpedo"]) || this;
                    _this.smokeTime = 0;
                    _this.fadeSprite = game_3.game.sprites["explosion"];
                    _this.fadeSound = "explosion";
                    _this.angle = _this.xDir === -1 ? 180 : 0;
                    _this.vel.x = _this.vel.x * 0.25;
                    return _this;
                }
                TorpedoProj.prototype.update = function () {
                    _super.prototype.update.call(this);
                    if (this.target) {
                        if (this.time < 7.5) {
                            this.vel = this.vel.add(new point_5.Point(Helpers.cos(this.angle), Helpers.sin(this.angle)).times(this.speed * 0.25));
                            if (this.vel.magnitude > this.speed) {
                                this.vel = this.vel.normalize().times(this.speed);
                            }
                            var dTo = this.pos.directionTo(this.target.centerPos).normalize();
                            var destAngle = Math.atan2(dTo.y, dTo.x) * 180 / Math.PI;
                            destAngle = Helpers.to360(destAngle);
                            this.angle = Helpers.lerpAngle(this.angle, destAngle, game_3.game.deltaTime * 3);
                        }
                        else {
                        }
                    }
                    else if (this.time >= 0.15) {
                        this.target = game_3.game.level.getClosestTarget(this.pos, this.damager.owner.alliance);
                    }
                    else if (this.time < 0.15) {
                        this.vel.x += this.xDir * game_3.game.deltaTime * 300;
                    }
                    this.smokeTime += game_3.game.deltaTime;
                    if (this.smokeTime > 0.2) {
                        this.smokeTime = 0;
                        new actor_2.Anim(this.pos, game_3.game.sprites["torpedo_smoke"], 1);
                    }
                };
                TorpedoProj.prototype.renderFromAngle = function (x, y) {
                    var angle = this.angle;
                    var xDir = 1;
                    var yDir = 1;
                    var frameIndex = 0;
                    var normAngle = 0;
                    if (angle < 90) {
                        xDir = 1;
                        yDir = -1;
                        normAngle = angle;
                    }
                    if (angle >= 90 && angle < 180) {
                        xDir = -1;
                        yDir = -1;
                        normAngle = 180 - angle;
                    }
                    else if (angle >= 180 && angle < 270) {
                        xDir = -1;
                        yDir = 1;
                        normAngle = angle - 180;
                    }
                    else if (angle >= 270 && angle < 360) {
                        xDir = 1;
                        yDir = 1;
                        normAngle = 360 - angle;
                    }
                    if (normAngle < 18)
                        frameIndex = 0;
                    else if (normAngle >= 18 && normAngle < 36)
                        frameIndex = 1;
                    else if (normAngle >= 36 && normAngle < 54)
                        frameIndex = 2;
                    else if (normAngle >= 54 && normAngle < 72)
                        frameIndex = 3;
                    else if (normAngle >= 72 && normAngle < 90)
                        frameIndex = 4;
                    this.sprite.draw(frameIndex, this.pos.x + x, this.pos.y + y, xDir, yDir, this.renderEffect, 1, this.palette);
                };
                return TorpedoProj;
            }(Projectile));
            exports_11("TorpedoProj", TorpedoProj);
            StingProj = (function (_super) {
                __extends(StingProj, _super);
                function StingProj(pos, vel, player, type) {
                    var _this = _super.call(this, pos, vel, 1, player, undefined) || this;
                    _this.type = 0;
                    _this.origVel = vel.clone();
                    if (type === 0) {
                        _this.sprite = game_3.game.sprites["sting_start"];
                    }
                    else if (type === 1) {
                        _this.sprite = game_3.game.sprites["sting_flat"];
                    }
                    else if (type === 2 || type === 3) {
                        _this.sprite = game_3.game.sprites["sting_up"];
                        if (type === 3) {
                            _this.yDir = -1;
                        }
                    }
                    _this.fadeSprite = game_3.game.sprites["buster1_fade"];
                    _this.type = type;
                    return _this;
                }
                StingProj.prototype.update = function () {
                    _super.prototype.update.call(this);
                    if (this.type === 0 && this.time > 0.05) {
                        this.vel.x = 0;
                    }
                    if (this.type === 0) {
                        if (this.isAnimOver()) {
                            new StingProj(this.pos.addxy(15 * this.xDir, 0), this.origVel, this.damager.owner, 1);
                            new StingProj(this.pos.addxy(15 * this.xDir, -8), this.origVel.addxy(0, -150), this.damager.owner, 2);
                            new StingProj(this.pos.addxy(15 * this.xDir, 8), this.origVel.addxy(0, 150), this.damager.owner, 3);
                            this.destroySelf();
                        }
                    }
                };
                return StingProj;
            }(Projectile));
            exports_11("StingProj", StingProj);
            RollingShieldProj = (function (_super) {
                __extends(RollingShieldProj, _super);
                function RollingShieldProj(pos, vel, player) {
                    var _this = _super.call(this, pos, vel, 1, player, game_3.game.sprites["rolling_shield"]) || this;
                    _this.fadeSprite = game_3.game.sprites["explosion"];
                    _this.fadeSound = "explosion";
                    _this.useGravity = true;
                    _this.collider.wallOnly = true;
                    if (game_3.game.level.checkCollisionActor(_this, 0, 0)) {
                        _this.xDir *= -1;
                        _this.vel.x *= -1;
                    }
                    return _this;
                }
                RollingShieldProj.prototype.update = function () {
                    if (!game_3.game.level.checkCollisionActor(this, 0, 0)) {
                        var collideData = game_3.game.level.checkCollisionActor(this, this.xDir, -1);
                        if (collideData) {
                            this.vel.x *= -1;
                            this.xDir *= -1;
                        }
                    }
                    _super.prototype.update.call(this);
                    if (this.time > 1.5) {
                        this.destroySelf(this.fadeSprite, this.fadeSound);
                    }
                };
                return RollingShieldProj;
            }(Projectile));
            exports_11("RollingShieldProj", RollingShieldProj);
            FireWaveProj = (function (_super) {
                __extends(FireWaveProj, _super);
                function FireWaveProj(pos, vel, player) {
                    var _this = _super.call(this, pos, vel, 1, player, game_3.game.sprites["fire_wave"]) || this;
                    _this.fadeSprite = game_3.game.sprites["fire_wave_fade"];
                    _this.hitCooldown = 0.3;
                    return _this;
                }
                FireWaveProj.prototype.update = function () {
                    _super.prototype.update.call(this);
                    if (this.time > 0.1) {
                        this.destroySelf(this.fadeSprite);
                    }
                };
                FireWaveProj.prototype.onHitChar = function (character) {
                };
                return FireWaveProj;
            }(Projectile));
            exports_11("FireWaveProj", FireWaveProj);
            TornadoProj = (function (_super) {
                __extends(TornadoProj, _super);
                function TornadoProj(pos, vel, player) {
                    var _this = _super.call(this, pos, vel, 1, player, game_3.game.sprites["tornado_mid"]) || this;
                    _this.length = 1;
                    _this.spriteStart = game_3.game.sprites["tornado_start"];
                    _this.spriteMid = game_3.game.sprites["tornado_mid"];
                    _this.spriteEnd = game_3.game.sprites["tornado_end"];
                    _this.vel.x = 0;
                    _this.hitCooldown = 0.3;
                    return _this;
                }
                TornadoProj.prototype.render = function (x, y) {
                    this.spriteStart.draw(this.frameIndex, this.pos.x + x, this.pos.y + y, this.xDir, this.yDir, this.renderEffect, 1, this.palette);
                    var i = 0;
                    var spriteMidLen = this.spriteMid.frames[this.frameIndex].rect.w;
                    for (i; i < this.length; i++) {
                        this.spriteMid.draw(this.frameIndex, this.pos.x + x + (i * this.xDir * spriteMidLen), this.pos.y + y, this.xDir, this.yDir, this.renderEffect, 1, this.palette);
                    }
                    this.spriteEnd.draw(this.frameIndex, this.pos.x + x + (i * this.xDir * spriteMidLen), this.pos.y + y, this.xDir, this.yDir, this.renderEffect, 1, this.palette);
                    this.renderEffect = "";
                    if (game_3.game.options.showHitboxes && this.collider) {
                        Helpers.drawPolygon(game_3.game.ctx, this.collider.shape.clone(x, y), true, "blue", "", 0, 0.5);
                    }
                };
                TornadoProj.prototype.update = function () {
                    _super.prototype.update.call(this);
                    var topX = 0;
                    var topY = 0;
                    var spriteMidLen = this.spriteMid.frames[this.frameIndex].rect.w;
                    var spriteEndLen = this.spriteEnd.frames[this.frameIndex].rect.w;
                    var botX = (this.length * spriteMidLen) + spriteEndLen;
                    var botY = this.spriteStart.frames[0].rect.h * 2;
                    var rect = new rect_2.Rect(topX, topY, botX, botY);
                    this.globalCollider = new collider_2.Collider(rect.getPoints(), true);
                    if (this.time > 0.2) {
                        if (this.length < 6) {
                            this.length++;
                        }
                        else {
                            this.vel.x = this.speed * this.xDir;
                        }
                        this.time = 0;
                    }
                };
                TornadoProj.prototype.onHitChar = function (character) {
                    character.move(new point_5.Point(this.speed * 0.9 * this.xDir, 0));
                };
                return TornadoProj;
            }(Projectile));
            exports_11("TornadoProj", TornadoProj);
            ElectricSparkProj = (function (_super) {
                __extends(ElectricSparkProj, _super);
                function ElectricSparkProj(pos, vel, player, type) {
                    var _this = _super.call(this, pos, vel, 1, player, game_3.game.sprites["electric_spark"]) || this;
                    _this.type = 0;
                    _this.fadeSprite = game_3.game.sprites["electric_spark_fade"];
                    _this.type = type;
                    return _this;
                }
                ElectricSparkProj.prototype.onHitWall = function (wall) {
                    if (this.type === 0) {
                        this.destroySelf(this.fadeSprite);
                        new ElectricSparkProj(this.pos.clone(), new point_5.Point(0, this.speed * 3), this.damager.owner, 1);
                        new ElectricSparkProj(this.pos.clone(), new point_5.Point(0, -this.speed * 3), this.damager.owner, 1);
                    }
                };
                return ElectricSparkProj;
            }(Projectile));
            exports_11("ElectricSparkProj", ElectricSparkProj);
            BoomerangProj = (function (_super) {
                __extends(BoomerangProj, _super);
                function BoomerangProj(pos, vel, player) {
                    var _this = _super.call(this, pos, vel, 1, player, game_3.game.sprites["boomerang"]) || this;
                    _this.angleDist = 0;
                    _this.turnDir = 1;
                    _this.angle = 0;
                    if (Math.sign(vel.x) === -1)
                        _this.angle = -180;
                    if (!player.character.grounded) {
                        _this.turnDir = -1;
                    }
                    return _this;
                }
                BoomerangProj.prototype.onCollision = function (other) {
                    _super.prototype.onCollision.call(this, other);
                    var character = other.gameObject;
                    if (this.time > 0.22 && character instanceof character_1.Character && character.player === this.damager.owner) {
                        this.destroySelf();
                        if (character.player.weapon instanceof weapon_1.Boomerang) {
                            character.player.weapon.ammo++;
                        }
                    }
                };
                BoomerangProj.prototype.renderFromAngle = function (x, y) {
                    this.sprite.draw(this.frameIndex, this.pos.x + x, this.pos.y + y, 1, 1, this.renderEffect, 1, this.palette);
                };
                BoomerangProj.prototype.update = function () {
                    _super.prototype.update.call(this);
                    if (this.time > 0.22) {
                        if (this.angleDist < 180) {
                            var angInc = (-this.xDir * this.turnDir) * game_3.game.deltaTime * 300;
                            this.angle += angInc;
                            this.angleDist += Math.abs(angInc);
                            this.vel.x = Helpers.cos(this.angle) * this.speed;
                            this.vel.y = Helpers.sin(this.angle) * this.speed;
                        }
                        else if (this.damager.owner.character) {
                            var dTo = this.pos.directionTo(this.damager.owner.character.centerPos).normalize();
                            var destAngle = Math.atan2(dTo.y, dTo.x) * 180 / Math.PI;
                            destAngle = Helpers.to360(destAngle);
                            this.angle = Helpers.lerpAngle(this.angle, destAngle, game_3.game.deltaTime * 10);
                            this.vel.x = Helpers.cos(this.angle) * this.speed;
                            this.vel.y = Helpers.sin(this.angle) * this.speed;
                        }
                        else {
                            this.destroySelf();
                        }
                    }
                };
                return BoomerangProj;
            }(Projectile));
            exports_11("BoomerangProj", BoomerangProj);
            ShotgunIceProj = (function (_super) {
                __extends(ShotgunIceProj, _super);
                function ShotgunIceProj(pos, vel, player, type) {
                    var _this = _super.call(this, pos, vel, 1, player, game_3.game.sprites["shotgun_ice"]) || this;
                    _this.type = 0;
                    _this.sparkleTime = 0;
                    if (type === 1) {
                        _this.changeSprite(game_3.game.sprites["shotgun_ice_piece"], true);
                    }
                    _this.fadeSprite = game_3.game.sprites["buster1_fade"];
                    _this.type = type;
                    return _this;
                }
                ShotgunIceProj.prototype.update = function () {
                    _super.prototype.update.call(this);
                    this.sparkleTime += game_3.game.deltaTime;
                    if (this.sparkleTime > 0.05) {
                        this.sparkleTime = 0;
                        new actor_2.Anim(this.pos, game_3.game.sprites["shotgun_ice_sparkles"], 1);
                    }
                };
                ShotgunIceProj.prototype.onHit = function (other) {
                    if (this.type === 0) {
                        this.destroySelf();
                        new ShotgunIceProj(this.pos.clone(), new point_5.Point(-this.vel.x, -this.speed), this.damager.owner, 1);
                        new ShotgunIceProj(this.pos.clone(), new point_5.Point(-this.vel.x, -this.speed * 0.5), this.damager.owner, 1);
                        new ShotgunIceProj(this.pos.clone(), new point_5.Point(-this.vel.x, 0 * 3), this.damager.owner, 1);
                        new ShotgunIceProj(this.pos.clone(), new point_5.Point(-this.vel.x, this.speed * 0.5), this.damager.owner, 1);
                        new ShotgunIceProj(this.pos.clone(), new point_5.Point(-this.vel.x, this.speed), this.damager.owner, 1);
                    }
                };
                ShotgunIceProj.prototype.onHitWall = function (wall) {
                    this.onHit(wall);
                };
                ShotgunIceProj.prototype.onHitChar = function (character) {
                    _super.prototype.onHitChar.call(this, character);
                };
                return ShotgunIceProj;
            }(Projectile));
            exports_11("ShotgunIceProj", ShotgunIceProj);
        }
    };
});
System.register("effects", ["point", "game", "helpers"], function (exports_12, context_12) {
    "use strict";
    var __moduleName = context_12 && context_12.id;
    var point_6, game_4, Helpers, ChargeEffect, DieEffectParticles, Effect, DieEffect;
    return {
        setters: [
            function (point_6_1) {
                point_6 = point_6_1;
            },
            function (game_4_1) {
                game_4 = game_4_1;
            },
            function (Helpers_4) {
                Helpers = Helpers_4;
            }
        ],
        execute: function () {
            ChargeEffect = (function () {
                function ChargeEffect() {
                    this.points = [];
                    var radius = 24;
                    var angle = 0;
                    var point1 = new point_6.Point(Helpers.sin(angle) * radius, Helpers.cos(angle) * radius);
                    angle += 45;
                    var point2 = new point_6.Point(Helpers.sin(angle) * radius, Helpers.cos(angle) * radius);
                    angle += 45;
                    var point3 = new point_6.Point(Helpers.sin(angle) * radius, Helpers.cos(angle) * radius);
                    angle += 45;
                    var point4 = new point_6.Point(Helpers.sin(angle) * radius, Helpers.cos(angle) * radius);
                    angle += 45;
                    var point5 = new point_6.Point(Helpers.sin(angle) * radius, Helpers.cos(angle) * radius);
                    angle += 45;
                    var point6 = new point_6.Point(Helpers.sin(angle) * radius, Helpers.cos(angle) * radius);
                    angle += 45;
                    var point7 = new point_6.Point(Helpers.sin(angle) * radius, Helpers.cos(angle) * radius);
                    angle += 45;
                    var point8 = new point_6.Point(Helpers.sin(angle) * radius, Helpers.cos(angle) * radius);
                    angle += 45;
                    this.origPoints = [
                        point1, point2, point3, point4, point5, point6, point7, point8
                    ];
                    this.points = _.cloneDeep(this.origPoints);
                    this.pointTimes = [0, 3, 0, 1.5, -1.5, -3, -1.5, -1.5];
                }
                ChargeEffect.prototype.update = function (centerPos, chargeLevel) {
                    for (var i = 0; i < this.points.length; i++) {
                        var point = this.points[i];
                        if (this.pointTimes[i] > 0) {
                            point.x = Helpers.moveTo(point.x, 0, game_4.game.deltaTime * 70);
                            point.y = Helpers.moveTo(point.y, 0, game_4.game.deltaTime * 70);
                        }
                        var chargePart = game_4.game.sprites["charge_part_" + String(chargeLevel)];
                        this.pointTimes[i] += game_4.game.deltaTime * 20;
                        if (this.pointTimes[i] > 3) {
                            this.pointTimes[i] = -3;
                            this.points[i] = this.origPoints[i].clone();
                        }
                    }
                };
                ChargeEffect.prototype.render = function (centerPos, chargeLevel) {
                    for (var i = 0; i < this.points.length; i++) {
                        var point = this.points[i];
                        var chargePart = game_4.game.sprites["charge_part_" + String(chargeLevel)];
                        if (this.pointTimes[i] > 0) {
                            chargePart.draw(Math.round(this.pointTimes[i]), centerPos.x + point.x, centerPos.y + point.y);
                        }
                    }
                };
                return ChargeEffect;
            }());
            exports_12("ChargeEffect", ChargeEffect);
            DieEffectParticles = (function () {
                function DieEffectParticles(centerPos) {
                    this.time = 0;
                    this.ang = 0;
                    this.centerPos = centerPos;
                }
                DieEffectParticles.prototype.render = function (offsetX, offsetY) {
                    this.time += game_4.game.deltaTime;
                    for (var i = this.ang; i < this.ang + 360; i += 22.5) {
                        var x = this.centerPos.x + Helpers.cos(i) * this.time * 150;
                        var y = this.centerPos.y + Helpers.sin(i) * this.time * 150;
                        var diePartSprite = game_4.game.sprites["die_particle"];
                        diePartSprite.draw(Math.round(this.time * 20) % diePartSprite.frames.length, x + offsetX, y + offsetY, 1, 1, "", Helpers.clamp01(1 - this.time * 0.5));
                    }
                    this.ang += game_4.game.deltaTime * 100;
                };
                return DieEffectParticles;
            }());
            exports_12("DieEffectParticles", DieEffectParticles);
            Effect = (function () {
                function Effect(pos) {
                    this.pos = pos;
                    game_4.game.level.addEffect(this);
                }
                Effect.prototype.update = function () {
                };
                Effect.prototype.render = function (offsetX, offsetY) {
                };
                Effect.prototype.destroySelf = function () {
                    _.remove(game_4.game.level.effects, this);
                };
                return Effect;
            }());
            exports_12("Effect", Effect);
            DieEffect = (function (_super) {
                __extends(DieEffect, _super);
                function DieEffect(centerPos) {
                    var _this = _super.call(this, centerPos) || this;
                    _this.timer = 100;
                    _this.spawnCount = 0;
                    _this.dieEffects = [];
                    _this.repeatCount = 0;
                    return _this;
                }
                DieEffect.prototype.update = function () {
                    _super.prototype.update.call(this);
                    var repeat = 5;
                    var repeatPeriod = 0.5;
                    this.timer += game_4.game.deltaTime;
                    if (this.timer > repeatPeriod) {
                        this.timer = 0;
                        this.repeatCount++;
                        if (this.repeatCount > repeat) {
                            this.destroySelf();
                        }
                        else {
                            var dieEffect = new DieEffectParticles(this.pos);
                            this.dieEffects.push(dieEffect);
                        }
                    }
                };
                DieEffect.prototype.render = function (offsetX, offsetY) {
                    for (var _i = 0, _a = this.dieEffects; _i < _a.length; _i++) {
                        var dieEffect = _a[_i];
                        dieEffect.render(offsetX, offsetY);
                    }
                };
                return DieEffect;
            }(Effect));
            exports_12("DieEffect", DieEffect);
        }
    };
});
System.register("ai", ["game", "projectile", "point", "helpers"], function (exports_13, context_13) {
    "use strict";
    var __moduleName = context_13 && context_13.id;
    var game_5, projectile_2, point_7, Helpers, AI, AIState, MoveToPos, AimAtPlayer, DashToPlayer, JumpToWall, ClimbWall, SlideDownWall;
    return {
        setters: [
            function (game_5_1) {
                game_5 = game_5_1;
            },
            function (projectile_2_1) {
                projectile_2 = projectile_2_1;
            },
            function (point_7_1) {
                point_7 = point_7_1;
            },
            function (Helpers_5) {
                Helpers = Helpers_5;
            }
        ],
        execute: function () {
            AI = (function () {
                function AI(character) {
                    this.shootTime = 0;
                    this.dashTime = 0;
                    this.jumpTime = 0;
                    this.weaponTime = 0;
                    this.character = character;
                    this.aiState = new AimAtPlayer(this.character);
                }
                Object.defineProperty(AI.prototype, "player", {
                    get: function () {
                        return this.character.player;
                    },
                    enumerable: true,
                    configurable: true
                });
                AI.prototype.update = function () {
                    if (game_5.game.level.gameObjects.indexOf(this.target) === -1) {
                        this.target = undefined;
                    }
                    if (!this.target) {
                        this.target = game_5.game.level.players[0].character;
                    }
                    if (!this.target) {
                        return;
                    }
                    if (this.aiState.facePlayer) {
                        if (this.character.pos.x > this.target.pos.x) {
                            this.character.xDir = -1;
                        }
                        else {
                            this.character.xDir = 1;
                        }
                    }
                    if (this.aiState.shouldAttack) {
                        if (this.shootTime === 0) {
                            if (this.character.isFacing(this.target))
                                this.player.press("shoot");
                        }
                        this.shootTime += game_5.game.deltaTime;
                        if (this.shootTime > 0.1) {
                            this.shootTime = 0;
                        }
                    }
                    if (this.aiState.shouldDodge) {
                        for (var _i = 0, _a = game_5.game.level.gameObjects; _i < _a.length; _i++) {
                            var proj = _a[_i];
                            if (proj instanceof projectile_2.Projectile && !(proj instanceof projectile_2.BusterProj)) {
                                if (proj.isFacing(this.character) && this.character.withinX(proj, 100) && this.character.withinY(proj, 30) && proj.damager.owner.alliance !== this.player.alliance) {
                                    this.player.press("jump");
                                }
                            }
                        }
                    }
                    if (this.aiState.randomlyChangeState) {
                        if (Helpers.randomRange(0, 60) < 5) {
                            var randAmount = Helpers.randomRange(-100, 100);
                            this.changeState(new MoveToPos(this.character, this.character.pos.addxy(randAmount, 0)));
                            return;
                        }
                    }
                    if (this.aiState.randomlyDash) {
                        if (Helpers.randomRange(0, 90) < 5) {
                            this.dashTime = Helpers.randomRange(0.2, 0.5);
                        }
                        if (this.dashTime > 0) {
                            this.player.press("dash");
                            this.dashTime -= game_5.game.deltaTime;
                            if (this.dashTime < 0)
                                this.dashTime = 0;
                        }
                    }
                    if (this.aiState.randomlyJump) {
                        if (Helpers.randomRange(0, 120) < 5) {
                            this.jumpTime = Helpers.randomRange(0.25, 0.75);
                        }
                        if (this.jumpTime > 0) {
                            this.player.press("jump");
                            this.jumpTime -= game_5.game.deltaTime;
                            if (this.jumpTime < 0)
                                this.jumpTime = 0;
                        }
                    }
                    if (this.aiState.randomlyChangeWeapon) {
                        this.weaponTime += game_5.game.deltaTime;
                        if (this.weaponTime > 5) {
                            this.weaponTime = 0;
                            this.player.weaponIndex = this.player.weaponIndex - 1;
                            if (this.player.weaponIndex < 0)
                                this.player.weaponIndex = 8;
                        }
                    }
                    this.aiState.update();
                };
                AI.prototype.changeState = function (newState) {
                    this.aiState = newState;
                };
                return AI;
            }());
            exports_13("AI", AI);
            AIState = (function () {
                function AIState(character) {
                    this.facePlayer = true;
                    this.shouldAttack = true;
                    this.shouldDodge = true;
                    this.randomlyChangeState = true;
                    this.randomlyDash = true;
                    this.randomlyJump = true;
                    this.randomlyChangeWeapon = true;
                    this.character = character;
                    this.shouldAttack = true;
                    this.facePlayer = true;
                }
                Object.defineProperty(AIState.prototype, "player", {
                    get: function () {
                        return this.character.player;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(AIState.prototype, "ai", {
                    get: function () {
                        return this.player.character.ai;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(AIState.prototype, "target", {
                    get: function () {
                        return this.ai.target;
                    },
                    enumerable: true,
                    configurable: true
                });
                AIState.prototype.update = function () {
                };
                return AIState;
            }());
            MoveToPos = (function (_super) {
                __extends(MoveToPos, _super);
                function MoveToPos(character, dest) {
                    var _this = _super.call(this, character) || this;
                    _this.dest = dest;
                    _this.facePlayer = false;
                    _this.randomlyChangeState = false;
                    return _this;
                }
                MoveToPos.prototype.update = function () {
                    _super.prototype.update.call(this);
                    if (this.character.pos.x - this.dest.x > 5) {
                        this.player.press("left");
                    }
                    else if (this.character.pos.x - this.dest.x < -5) {
                        this.player.press("right");
                    }
                    else {
                        this.ai.changeState(new AimAtPlayer(this.character));
                    }
                    if (this.character.sweepTest(new point_7.Point(this.character.xDir * 50, 0))) {
                        this.ai.changeState(new AimAtPlayer(this.character));
                    }
                };
                return MoveToPos;
            }(AIState));
            AimAtPlayer = (function (_super) {
                __extends(AimAtPlayer, _super);
                function AimAtPlayer(character) {
                    var _this = _super.call(this, character) || this;
                    _this.jumpDelay = 0;
                    return _this;
                }
                AimAtPlayer.prototype.update = function () {
                    _super.prototype.update.call(this);
                    if (this.character.grounded && this.jumpDelay > 0.3) {
                        this.jumpDelay = 0;
                    }
                    if (this.character.pos.y > this.target.pos.y && this.character.pos.y < this.target.pos.y + 80) {
                        this.jumpDelay += game_5.game.deltaTime;
                        if (this.jumpDelay > 0.3) {
                            this.player.press("jump");
                        }
                    }
                    else {
                    }
                };
                return AimAtPlayer;
            }(AIState));
            DashToPlayer = (function (_super) {
                __extends(DashToPlayer, _super);
                function DashToPlayer() {
                    return _super !== null && _super.apply(this, arguments) || this;
                }
                return DashToPlayer;
            }(AIState));
            JumpToWall = (function (_super) {
                __extends(JumpToWall, _super);
                function JumpToWall() {
                    return _super !== null && _super.apply(this, arguments) || this;
                }
                return JumpToWall;
            }(AIState));
            ClimbWall = (function (_super) {
                __extends(ClimbWall, _super);
                function ClimbWall() {
                    return _super !== null && _super.apply(this, arguments) || this;
                }
                return ClimbWall;
            }(AIState));
            SlideDownWall = (function (_super) {
                __extends(SlideDownWall, _super);
                function SlideDownWall() {
                    return _super !== null && _super.apply(this, arguments) || this;
                }
                return SlideDownWall;
            }(AIState));
        }
    };
});
System.register("character", ["actor", "game", "point", "collider", "rect", "helpers", "weapon", "effects", "ai"], function (exports_14, context_14) {
    "use strict";
    var __moduleName = context_14 && context_14.id;
    var actor_3, game_6, point_8, collider_3, rect_3, Helpers, weapon_2, effects_1, ai_1, Character, CharState, Idle, Run, Jump, Fall, Dash, WallSlide, WallKick, LadderClimb, Hurt, Die;
    return {
        setters: [
            function (actor_3_1) {
                actor_3 = actor_3_1;
            },
            function (game_6_1) {
                game_6 = game_6_1;
            },
            function (point_8_1) {
                point_8 = point_8_1;
            },
            function (collider_3_1) {
                collider_3 = collider_3_1;
            },
            function (rect_3_1) {
                rect_3 = rect_3_1;
            },
            function (Helpers_6) {
                Helpers = Helpers_6;
            },
            function (weapon_2_1) {
                weapon_2 = weapon_2_1;
            },
            function (effects_1_1) {
                effects_1 = effects_1_1;
            },
            function (ai_1_1) {
                ai_1 = ai_1_1;
            }
        ],
        execute: function () {
            Character = (function (_super) {
                __extends(Character, _super);
                function Character(player, x, y) {
                    var _this = _super.call(this, undefined) || this;
                    _this.shootTime = 0;
                    _this.shootAnimTime = 0;
                    _this.projectileCooldown = {};
                    _this.invulnFrames = 0;
                    _this.checkLadderDown = false;
                    _this.pos.x = x;
                    _this.pos.y = y;
                    _this.player = player;
                    _this.isDashing = false;
                    var rect = new rect_3.Rect(0, 0, 18, 34);
                    _this.globalCollider = new collider_3.Collider(rect.getPoints(), false);
                    _this.globalCollider.isClimbable = false;
                    _this.changeState(new Idle());
                    _this.jumpPower = 350;
                    _this.runSpeed = 100;
                    _this.chargeTime = 0;
                    _this.charge1Time = 0.75;
                    _this.charge2Time = 1.75;
                    _this.charge3Time = 3;
                    _this.chargeFlashTime = 0;
                    _this.chargeSound = game_6.game.sounds["charge_start"];
                    _this.chargeLoopSound = game_6.game.sounds["charge_loop"];
                    _this.chargeLoopSound.loop(true);
                    return _this;
                }
                Character.prototype.preUpdate = function () {
                    _super.prototype.preUpdate.call(this);
                    this.changedStateInFrame = false;
                };
                Character.prototype.update = function () {
                    for (var projName in this.projectileCooldown) {
                        var cooldown = this.projectileCooldown[projName];
                        if (cooldown) {
                            this.projectileCooldown[projName] = Helpers.clampMin(cooldown - game_6.game.deltaTime, 0);
                        }
                    }
                    if (this.shootAnimTime > 0) {
                        this.shootAnimTime -= game_6.game.deltaTime;
                        if (this.shootAnimTime <= 0) {
                            this.shootAnimTime = 0;
                            this.changeSprite(this.charState.sprite, false);
                        }
                    }
                    if (this.invulnFrames > 0) {
                        this.invulnFrames = Helpers.clampMin0(this.invulnFrames - game_6.game.deltaTime);
                        if (game_6.game.level.twoFrameCycle > 0) {
                            this.renderEffect = "hit";
                        }
                        else {
                            this.renderEffect = "";
                        }
                        if (this.invulnFrames <= 0) {
                            this.renderEffect = "";
                        }
                    }
                    if (this.ai) {
                        this.ai.update();
                    }
                    this.charState.update();
                    _super.prototype.update.call(this);
                    this.player.weapon.update();
                    if (this.charState.canShoot) {
                        if (this.player.weapon.canShoot(this.player) && this.shootTime === 0 &&
                            (this.player.isPressed("shoot") ||
                                (this.player.isHeld("shoot") && this.player.weapon instanceof weapon_2.FireWave))) {
                            this.shoot();
                        }
                        if (this.player.isHeld("shoot") && this.player.weapon.ammo > 0) {
                            this.chargeTime += game_6.game.deltaTime;
                        }
                        else {
                            if (this.isCharging()) {
                                this.shoot();
                                this.stopCharge();
                            }
                        }
                    }
                    if (this.shootTime > 0) {
                        this.shootTime -= game_6.game.deltaTime;
                        if (this.shootTime <= 0) {
                            if (this.player.isHeld("shoot") && this.player.weapon instanceof weapon_2.FireWave) {
                                this.shootTime = 0;
                            }
                            else {
                                this.shootTime = 0;
                            }
                        }
                    }
                    if (this.player.isPressed("weaponleft")) {
                        this.player.weaponIndex = Helpers.decrementRange(this.player.weaponIndex, 0, this.player.weapons.length);
                    }
                    else if (this.player.isPressed("weaponright")) {
                        this.player.weaponIndex = Helpers.incrementRange(this.player.weaponIndex, 0, this.player.weapons.length);
                    }
                    if (this.isCharging()) {
                        var maxFlashTime = 0.1;
                        if (!this.chargeSoundId && !this.chargeLoopSoundId) {
                            this.chargeSoundId = this.chargeSound.play();
                        }
                        if (this.chargeSoundId && !this.chargeSound.playing(this.chargeSoundId)) {
                            this.chargeSoundId = undefined;
                            this.chargeLoopSoundId = this.chargeLoopSound.play();
                        }
                        this.chargeFlashTime += game_6.game.deltaTime;
                        if (this.chargeFlashTime > maxFlashTime) {
                            this.chargeFlashTime = 0;
                        }
                        if (this.chargeFlashTime > maxFlashTime * 0.5) {
                            this.renderEffect = "flash";
                        }
                        else {
                            this.renderEffect = "";
                        }
                        if (!this.chargeEffect) {
                            this.chargeEffect = new effects_1.ChargeEffect();
                        }
                        this.chargeEffect.update(this.pos, this.getChargeLevel());
                    }
                };
                Character.prototype.addAI = function () {
                    this.ai = new ai_1.AI(this);
                };
                Character.prototype.drawCharge = function () {
                };
                Character.prototype.isCharging = function () {
                    return this.chargeTime >= this.charge1Time;
                };
                Character.prototype.getDashSpeed = function () {
                    if (this.isDashing)
                        return 2;
                    return 1;
                };
                Character.prototype.getShootPos = function () {
                    var busterOffset = this.currentFrame.getBusterOffset().clone();
                    busterOffset.x *= this.xDir;
                    return this.pos.add(busterOffset);
                };
                Character.prototype.stopCharge = function () {
                    this.chargeTime = 0;
                    this.chargeFlashTime = 0;
                    if (this.chargeSoundId) {
                        this.chargeSound.stop(this.chargeSoundId);
                        this.chargeSoundId = undefined;
                    }
                    if (this.chargeLoopSoundId) {
                        this.chargeLoopSound.stop(this.chargeLoopSoundId);
                        this.chargeLoopSoundId = undefined;
                    }
                    this.chargeEffect = undefined;
                };
                Character.prototype.shoot = function () {
                    if (this.shootTime > 0)
                        return;
                    if (this.player.weapon.ammo <= 0)
                        return;
                    this.shootTime = this.player.weapon.rateOfFire;
                    if (this.shootAnimTime === 0) {
                        this.changeSprite(this.charState.shootSprite, false);
                    }
                    else if (this.charState instanceof Idle) {
                        this.frameIndex = 0;
                        this.frameTime = 0;
                    }
                    if (this.charState instanceof LadderClimb) {
                        if (this.player.isHeld("left")) {
                            this.xDir = -1;
                        }
                        else if (this.player.isHeld("right")) {
                            this.xDir = 1;
                        }
                    }
                    this.shootAnimTime = 0.3;
                    var xDir = this.xDir;
                    if (this.charState instanceof WallSlide)
                        xDir *= -1;
                    this.player.weapon.shoot(this.getShootPos(), xDir, this.player, this.getChargeLevel());
                    this.chargeTime = 0;
                };
                Character.prototype.getChargeLevel = function () {
                    if (this.chargeTime < this.charge1Time) {
                        return 0;
                    }
                    else if (this.chargeTime >= this.charge1Time && this.chargeTime < this.charge2Time) {
                        return 1;
                    }
                    else if (this.chargeTime >= this.charge2Time && this.chargeTime < this.charge3Time) {
                        return 2;
                    }
                    else if (this.chargeTime >= this.charge3Time) {
                        return 3;
                    }
                };
                Character.prototype.changeState = function (newState) {
                    if (this.charState && newState && this.charState.constructor === newState.constructor)
                        return;
                    if (this.changedStateInFrame)
                        return;
                    this.changedStateInFrame = true;
                    newState.character = this;
                    if (this.shootAnimTime === 0 || !newState.canShoot) {
                        this.changeSprite(newState.sprite, true);
                    }
                    else {
                        this.changeSprite(newState.shootSprite, true);
                    }
                    var oldState = this.charState;
                    if (oldState)
                        oldState.onExit(newState);
                    this.charState = newState;
                    newState.onEnter(oldState);
                    if (!newState.canShoot) {
                        this.shootTime = 0;
                        this.shootAnimTime = 0;
                    }
                };
                Character.prototype.render = function (x, y) {
                    _super.prototype.render.call(this, x, y);
                    if (this.chargeEffect) {
                        this.chargeEffect.render(this.pos.add(new point_8.Point(x, y - 18)), this.getChargeLevel());
                    }
                };
                Character.prototype.applyDamage = function (damage) {
                    this.player.health -= damage;
                    if (this.player.health <= 0) {
                        this.player.health = 0;
                        this.changeState(new Die());
                    }
                };
                Character.prototype.setHurt = function (dir) {
                    this.changeState(new Hurt(dir));
                };
                return Character;
            }(actor_3.Actor));
            exports_14("Character", Character);
            CharState = (function () {
                function CharState(sprite, shootSprite) {
                    this.framesJumpNotHeld = 0;
                    this.sprite = sprite;
                    this.shootSprite = shootSprite;
                    this.stateTime = 0;
                }
                Object.defineProperty(CharState.prototype, "canShoot", {
                    get: function () {
                        return !!this.shootSprite;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(CharState.prototype, "player", {
                    get: function () {
                        return this.character.player;
                    },
                    enumerable: true,
                    configurable: true
                });
                CharState.prototype.onExit = function (newState) {
                    if (!(newState instanceof Jump) && !(newState instanceof Fall) && !(newState instanceof WallKick) && !(newState instanceof Dash)) {
                        this.character.isDashing = false;
                    }
                };
                CharState.prototype.onEnter = function (oldState) {
                    if (this.enterSound)
                        game_6.game.playSound(this.enterSound);
                };
                CharState.prototype.update = function () {
                    this.stateTime += game_6.game.deltaTime;
                    var lastLeftWallData = game_6.game.level.checkCollisionActor(this.character, -1, 0);
                    this.lastLeftWall = lastLeftWallData ? lastLeftWallData.collider : undefined;
                    if (this.lastLeftWall && !this.lastLeftWall.isClimbable)
                        this.lastLeftWall = undefined;
                    var lastRightWallData = game_6.game.level.checkCollisionActor(this.character, 1, 0);
                    this.lastRightWall = lastRightWallData ? lastRightWallData.collider : undefined;
                    if (this.lastRightWall && !this.lastRightWall.isClimbable)
                        this.lastRightWall = undefined;
                };
                CharState.prototype.airCode = function () {
                    if (this.character.grounded) {
                        game_6.game.playSound("land");
                        this.character.changeState(new Idle());
                        return;
                    }
                    if (!this.player.isHeld("jump") && this.character.vel.y < 0) {
                        this.framesJumpNotHeld++;
                        if (this.framesJumpNotHeld > 3) {
                            this.framesJumpNotHeld = 0;
                            this.character.vel.y = 0;
                        }
                    }
                    if (this.player.isHeld("jump")) {
                        this.framesJumpNotHeld = 0;
                    }
                    if (this.player.isHeld("up")) {
                        var ladders = game_6.game.level.getTriggerList(this.character, 0, 0, undefined, "Ladder");
                        if (ladders.length > 0) {
                            this.character.changeState(new LadderClimb(ladders[0].gameObject));
                        }
                    }
                    if (game_6.game.level.checkCollisionActor(this.character, 0, -1)) {
                        this.character.vel.y = 0;
                    }
                    var move = new point_8.Point(0, 0);
                    var wallKick = (this instanceof WallKick) ? this : null;
                    if (this.player.isHeld("left")) {
                        if (!wallKick || wallKick.kickSpeed <= 0) {
                            move.x = -this.character.runSpeed * this.character.getDashSpeed();
                            this.character.xDir = -1;
                        }
                    }
                    else if (this.player.isHeld("right")) {
                        if (!wallKick || wallKick.kickSpeed >= 0) {
                            move.x = this.character.runSpeed * this.character.getDashSpeed();
                            this.character.xDir = 1;
                        }
                    }
                    if (move.magnitude > 0) {
                        this.character.move(move);
                    }
                    if (this.player.isPressed("left") || (this.player.isHeld("left") && (this.character.vel.y > 0 || !this.lastLeftWall))) {
                        if (this.lastLeftWall) {
                            this.player.character.changeState(new WallSlide(-1));
                            return;
                        }
                    }
                    else if (this.player.isPressed("right") || (this.player.isHeld("right") && (this.character.vel.y > 0 || !this.lastRightWall))) {
                        if (this.lastRightWall) {
                            this.player.character.changeState(new WallSlide(1));
                            return;
                        }
                    }
                };
                CharState.prototype.groundCode = function () {
                    if (!this.character.grounded) {
                        this.character.changeState(new Fall());
                        return;
                    }
                    else if (this.player.isPressed("jump")) {
                        this.character.vel.y = -this.character.jumpPower;
                        this.character.changeState(new Jump());
                        return;
                    }
                    else if (this.player.isPressed("down")) {
                        this.character.checkLadderDown = true;
                        var ladders = game_6.game.level.getTriggerList(this.character, 0, 1, undefined, "Ladder");
                        if (ladders.length > 0) {
                            this.character.changeState(new LadderClimb(ladders[0].gameObject));
                            this.character.move(new point_8.Point(0, 500));
                        }
                        this.character.checkLadderDown = false;
                    }
                };
                return CharState;
            }());
            Idle = (function (_super) {
                __extends(Idle, _super);
                function Idle() {
                    return _super.call(this, game_6.game.sprites["mmx_idle"], game_6.game.sprites["mmx_shoot"]) || this;
                }
                Idle.prototype.update = function () {
                    _super.prototype.update.call(this);
                    if (this.player.isHeld("left") || this.player.isHeld("right")) {
                        this.character.changeState(new Run());
                    }
                    this.groundCode();
                    if (this.player.isPressed("dash")) {
                        this.character.changeState(new Dash());
                    }
                };
                return Idle;
            }(CharState));
            Run = (function (_super) {
                __extends(Run, _super);
                function Run() {
                    return _super.call(this, game_6.game.sprites["mmx_run"], game_6.game.sprites["mmx_run_shoot"]) || this;
                }
                Run.prototype.update = function () {
                    _super.prototype.update.call(this);
                    var move = new point_8.Point(0, 0);
                    if (this.player.isHeld("left")) {
                        this.character.xDir = -1;
                        move.x = -this.character.runSpeed;
                    }
                    else if (this.player.isHeld("right")) {
                        this.character.xDir = 1;
                        move.x = this.character.runSpeed;
                    }
                    if (move.magnitude > 0) {
                        this.character.move(move);
                    }
                    else {
                        this.character.changeState(new Idle());
                    }
                    this.groundCode();
                    if (this.player.isPressed("dash")) {
                        this.character.changeState(new Dash());
                    }
                };
                return Run;
            }(CharState));
            Jump = (function (_super) {
                __extends(Jump, _super);
                function Jump() {
                    var _this = _super.call(this, game_6.game.sprites["mmx_jump"], game_6.game.sprites["mmx_jump_shoot"]) || this;
                    _this.enterSound = "jump";
                    return _this;
                }
                Jump.prototype.update = function () {
                    _super.prototype.update.call(this);
                    if (this.character.vel.y > 0) {
                        this.character.changeState(new Fall());
                        return;
                    }
                    this.airCode();
                };
                Jump.prototype.onEnter = function (oldState) {
                    _super.prototype.onEnter.call(this, oldState);
                };
                Jump.prototype.onExit = function (newState) {
                    _super.prototype.onExit.call(this, newState);
                };
                return Jump;
            }(CharState));
            Fall = (function (_super) {
                __extends(Fall, _super);
                function Fall() {
                    return _super.call(this, game_6.game.sprites["mmx_fall"], game_6.game.sprites["mmx_fall_shoot"]) || this;
                }
                Fall.prototype.update = function () {
                    _super.prototype.update.call(this);
                    this.airCode();
                };
                return Fall;
            }(CharState));
            Dash = (function (_super) {
                __extends(Dash, _super);
                function Dash() {
                    var _this = _super.call(this, game_6.game.sprites["mmx_dash"], game_6.game.sprites["mmx_dash_shoot"]) || this;
                    _this.dashTime = 0;
                    _this.enterSound = "dash";
                    return _this;
                }
                Dash.prototype.onEnter = function (oldState) {
                    _super.prototype.onEnter.call(this, oldState);
                    this.character.isDashing = true;
                    new actor_3.Anim(this.character.pos, game_6.game.sprites["dash_sparks"], this.character.xDir);
                };
                Dash.prototype.update = function () {
                    _super.prototype.update.call(this);
                    this.groundCode();
                    if (!this.player.isHeld("dash")) {
                        this.character.changeState(new Idle());
                        return;
                    }
                    this.dashTime += game_6.game.deltaTime;
                    if (this.dashTime > 0.5) {
                        this.character.changeState(new Idle());
                        return;
                    }
                    var move = new point_8.Point(0, 0);
                    move.x = this.character.runSpeed * this.character.getDashSpeed() * this.character.xDir;
                    this.character.move(move);
                    if (this.stateTime > 0.1) {
                        this.stateTime = 0;
                        new actor_3.Anim(this.character.pos.addxy(0, -4), game_6.game.sprites["dust"], this.character.xDir);
                    }
                };
                return Dash;
            }(CharState));
            WallSlide = (function (_super) {
                __extends(WallSlide, _super);
                function WallSlide(wallDir) {
                    var _this = _super.call(this, game_6.game.sprites["mmx_wall_slide"], game_6.game.sprites["mmx_wall_slide_shoot"]) || this;
                    _this.dustTime = 0;
                    _this.wallDir = wallDir;
                    _this.enterSound = "land";
                    return _this;
                }
                WallSlide.prototype.update = function () {
                    _super.prototype.update.call(this);
                    if (this.character.grounded) {
                        this.character.changeState(new Idle());
                        return;
                    }
                    if (this.player.isPressed("jump")) {
                        if (this.player.isHeld("dash")) {
                            this.character.isDashing = true;
                        }
                        this.character.vel.y = -this.character.jumpPower;
                        this.character.changeState(new WallKick(this.wallDir * -1));
                        return;
                    }
                    this.character.useGravity = false;
                    this.character.vel.y = 0;
                    if (this.stateTime > 0.15) {
                        var dirHeld = this.wallDir === -1 ? this.player.isHeld("left") : this.player.isHeld("right");
                        if (!dirHeld || !game_6.game.level.checkCollisionActor(this.character, this.wallDir, 0)) {
                            this.player.character.changeState(new Fall());
                        }
                        this.character.move(new point_8.Point(0, 100));
                    }
                    this.dustTime += game_6.game.deltaTime;
                    if (this.stateTime > 0.2 && this.dustTime > 0.1) {
                        this.dustTime = 0;
                        new actor_3.Anim(this.character.pos.addxy(this.character.xDir * 12, 0), game_6.game.sprites["dust"], this.character.xDir);
                    }
                };
                WallSlide.prototype.onExit = function (newState) {
                    this.character.useGravity = true;
                    _super.prototype.onExit.call(this, newState);
                };
                return WallSlide;
            }(CharState));
            WallKick = (function (_super) {
                __extends(WallKick, _super);
                function WallKick(kickDir) {
                    var _this = _super.call(this, game_6.game.sprites["mmx_wall_kick"], game_6.game.sprites["mmx_wall_kick_shoot"]) || this;
                    _this.kickDir = kickDir;
                    _this.kickSpeed = kickDir * 150;
                    _this.enterSound = "jump";
                    return _this;
                }
                WallKick.prototype.update = function () {
                    _super.prototype.update.call(this);
                    if (this.character.isDashing) {
                        this.kickSpeed = 0;
                    }
                    if (this.kickSpeed !== 0) {
                        this.kickSpeed = Helpers.toZero(this.kickSpeed, 800 * game_6.game.deltaTime, this.kickDir);
                        this.character.move(new point_8.Point(this.kickSpeed, 0));
                    }
                    this.airCode();
                    if (this.character.vel.y > 0) {
                        this.character.changeState(new Fall());
                    }
                };
                WallKick.prototype.onEnter = function (oldState) {
                    _super.prototype.onEnter.call(this, oldState);
                    new actor_3.Anim(this.character.pos.addxy(12 * this.character.xDir, 0), game_6.game.sprites["wall_sparks"], this.character.xDir);
                };
                WallKick.prototype.onExit = function (newState) {
                    _super.prototype.onExit.call(this, newState);
                };
                return WallKick;
            }(CharState));
            LadderClimb = (function (_super) {
                __extends(LadderClimb, _super);
                function LadderClimb(ladder) {
                    var _this = _super.call(this, game_6.game.sprites["mmx_ladder_climb"], game_6.game.sprites["mmx_ladder_shoot"]) || this;
                    _this.ladder = ladder;
                    return _this;
                }
                LadderClimb.prototype.onEnter = function (oldState) {
                    _super.prototype.onEnter.call(this, oldState);
                    var rect = this.ladder.collider.shape.getRect();
                    this.character.pos.x = (rect.x1 + rect.x2) / 2;
                    this.character.vel = new point_8.Point(0, 0);
                    this.character.useGravity = false;
                };
                LadderClimb.prototype.onExit = function (newState) {
                    _super.prototype.onExit.call(this, newState);
                    this.character.useGravity = true;
                };
                LadderClimb.prototype.update = function () {
                    _super.prototype.update.call(this);
                    if (this.player.isHeld("up")) {
                        this.character.move(new point_8.Point(0, -100));
                        this.character.frameSpeed = 1;
                    }
                    else if (this.player.isHeld("down")) {
                        this.character.move(new point_8.Point(0, 100));
                        this.character.frameSpeed = 1;
                    }
                    else {
                        this.character.frameSpeed = 0;
                    }
                    if (!this.ladder.collider.isCollidingWith(this.character.collider)) {
                        this.character.changeState(new Fall());
                    }
                };
                return LadderClimb;
            }(CharState));
            Hurt = (function (_super) {
                __extends(Hurt, _super);
                function Hurt(dir) {
                    var _this = _super.call(this, game_6.game.sprites["mmx_hurt"]) || this;
                    _this.hurtDir = dir;
                    _this.hurtSpeed = dir * 100;
                    return _this;
                }
                Hurt.prototype.onEnter = function (oldState) {
                    _super.prototype.onEnter.call(this, oldState);
                    this.character.vel.y = -100;
                    this.character.stopCharge();
                };
                Hurt.prototype.update = function () {
                    _super.prototype.update.call(this);
                    if (this.hurtSpeed !== 0) {
                        this.hurtSpeed = Helpers.toZero(this.hurtSpeed, 400 * game_6.game.deltaTime, this.hurtDir);
                        this.character.move(new point_8.Point(this.hurtSpeed, 0));
                    }
                    if (this.character.isAnimOver()) {
                        this.character.changeState(new Idle());
                    }
                };
                return Hurt;
            }(CharState));
            Die = (function (_super) {
                __extends(Die, _super);
                function Die() {
                    return _super.call(this, game_6.game.sprites["mmx_die"]) || this;
                }
                Die.prototype.onEnter = function (oldState) {
                    _super.prototype.onEnter.call(this, oldState);
                    this.character.useGravity = false;
                    this.character.vel.x = 0;
                    this.character.vel.y = 0;
                    this.character.globalCollider = undefined;
                    this.character.stopCharge();
                    new actor_3.Anim(this.character.pos.addxy(0, -12), game_6.game.sprites["die_sparks"], 1);
                };
                Die.prototype.update = function () {
                    _super.prototype.update.call(this);
                    if (this.stateTime > 0.75) {
                        game_6.game.playSound("die");
                        new effects_1.DieEffect(this.character.pos);
                        this.player.destroyCharacter();
                    }
                };
                return Die;
            }(CharState));
        }
    };
});
System.register("player", ["character", "weapon", "game", "helpers"], function (exports_15, context_15) {
    "use strict";
    var __moduleName = context_15 && context_15.id;
    var character_3, weapon_3, game_7, Helpers, Player;
    return {
        setters: [
            function (character_3_1) {
                character_3 = character_3_1;
            },
            function (weapon_3_1) {
                weapon_3 = weapon_3_1;
            },
            function (game_7_1) {
                game_7 = game_7_1;
            },
            function (Helpers_7) {
                Helpers = Helpers_7;
            }
        ],
        execute: function () {
            Player = (function () {
                function Player(x, y, isAI, alliance) {
                    this.input = {};
                    this.inputPressed = {};
                    this.controllerInput = {};
                    this.controllerInputPressed = {};
                    this.inputMapping = {};
                    this.buttonMapping = {};
                    this.axesMapping = {};
                    this.alliance = alliance;
                    this.id = Helpers.getAutoIncId();
                    if (!isAI && alliance === 0) {
                        this.inputMapping[37] = "left";
                        this.inputMapping[39] = "right";
                        this.inputMapping[38] = "up";
                        this.inputMapping[40] = "down";
                        this.inputMapping[90] = "dash";
                        this.inputMapping[88] = "jump";
                        this.inputMapping[67] = "shoot";
                        this.inputMapping[65] = "weaponleft";
                        this.inputMapping[83] = "weaponright";
                        this.inputMapping[27] = "reset";
                    }
                    if (!isAI && alliance === 1) {
                        this.inputMapping[100] = "left";
                        this.inputMapping[102] = "right";
                        this.inputMapping[104] = "up";
                        this.inputMapping[101] = "down";
                        this.inputMapping[13] = "dash";
                        this.inputMapping[96] = "jump";
                        this.inputMapping[97] = "shoot";
                        this.inputMapping[103] = "weaponleft";
                        this.inputMapping[105] = "weaponright";
                    }
                    this.character = new character_3.Character(this, x, y);
                    if (isAI) {
                        this.character.addAI();
                    }
                    this.health = 32;
                    this.maxHealth = this.health;
                    this.weapons = [
                        new weapon_3.Buster(),
                        new weapon_3.Torpedo(),
                        new weapon_3.Sting(),
                        new weapon_3.RollingShield(),
                        new weapon_3.FireWave(),
                        new weapon_3.Tornado(),
                        new weapon_3.ElectricSpark(),
                        new weapon_3.Boomerang(),
                        new weapon_3.ShotgunIce()
                    ];
                    this.weaponIndex = 0;
                }
                Player.prototype.isPressed = function (keyName) {
                    return this.inputPressed[keyName] || this.controllerInputPressed[keyName];
                };
                Player.prototype.isHeld = function (keyName) {
                    return this.input[keyName] || this.controllerInput[keyName];
                };
                Player.prototype.setButtonMapping = function (controllerName) {
                    if (controllerName === "Xbox 360 Controller (XInput STANDARD GAMEPAD)") {
                        this.buttonMapping[100] = "left";
                        this.buttonMapping[102] = "right";
                        this.buttonMapping[104] = "up";
                        this.buttonMapping[101] = "down";
                        this.buttonMapping[1] = "dash";
                        this.buttonMapping[0] = "jump";
                        this.buttonMapping[2] = "shoot";
                        this.buttonMapping[4] = "weaponleft";
                        this.buttonMapping[5] = "weaponright";
                        this.axesMapping[0] = "left|right";
                        this.axesMapping[1] = "up|down";
                    }
                    else if (controllerName === "USB GamePad (Vendor: 0e8f Product: 3013)") {
                        this.buttonMapping[1] = "dash";
                        this.buttonMapping[2] = "jump";
                        this.buttonMapping[3] = "shoot";
                        this.buttonMapping[6] = "weaponleft";
                        this.buttonMapping[7] = "weaponright";
                        this.buttonMapping[8] = "reset";
                        this.axesMapping[0] = "left|right";
                        this.axesMapping[1] = "up|down";
                    }
                };
                Object.defineProperty(Player.prototype, "isAI", {
                    get: function () {
                        return this.character && !!this.character.ai;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(Player.prototype, "weapon", {
                    get: function () {
                        return this.weapons[this.weaponIndex];
                    },
                    enumerable: true,
                    configurable: true
                });
                Player.prototype.setAxes = function (axes, value) {
                    if (this.isAI)
                        return;
                    var key = this.axesMapping[axes];
                    if (!key)
                        return;
                    var key1 = key.split("|")[1];
                    var key2 = key.split("|")[0];
                    if (value > 0.2) {
                        if (!this.controllerInput[key1])
                            this.controllerInputPressed[key1] = true;
                        this.controllerInput[key1] = true;
                        this.controllerInputPressed[key2] = false;
                        this.controllerInput[key2] = false;
                    }
                    else if (value < -0.2) {
                        if (!this.controllerInput[key2])
                            this.controllerInputPressed[key2] = true;
                        this.controllerInput[key2] = true;
                        this.controllerInputPressed[key1] = false;
                        this.controllerInput[key1] = false;
                    }
                    else {
                        this.controllerInputPressed[key1] = false;
                        this.controllerInput[key1] = false;
                        this.controllerInputPressed[key2] = false;
                        this.controllerInput[key2] = false;
                    }
                };
                Player.prototype.onButtonDown = function (button) {
                    if (this.isAI)
                        return;
                    var key = this.buttonMapping[button];
                    if (!this.controllerInput[key])
                        this.controllerInputPressed[key] = true;
                    this.controllerInput[key] = true;
                    if (key === "reset") {
                        game_7.game.restartLevel("sm_bossroom");
                        return;
                    }
                };
                Player.prototype.onButtonUp = function (button) {
                    if (this.isAI)
                        return;
                    var key = this.buttonMapping[button];
                    this.controllerInput[key] = false;
                    this.controllerInputPressed[key] = false;
                };
                Player.prototype.press = function (key) {
                    if (!this.input[key])
                        this.inputPressed[key] = true;
                    this.input[key] = true;
                };
                Player.prototype.release = function (key) {
                    this.input[key] = false;
                    this.inputPressed[key] = false;
                };
                Player.prototype.onKeyDown = function (keycode) {
                    if (this.isAI)
                        return;
                    var key = this.inputMapping[keycode];
                    if (!this.input[key])
                        this.inputPressed[key] = true;
                    this.input[key] = true;
                    if (keycode === 49) {
                        for (var _i = 0, _a = game_7.game.level.localPlayers; _i < _a.length; _i++) {
                            var player = _a[_i];
                            player.health = 1;
                        }
                    }
                    if (keycode === 50) {
                        if (!game_7.game.level.localPlayers[1].isAI) {
                            game_7.game.level.localPlayers[1].character.addAI();
                        }
                    }
                    if (key === "reset") {
                        game_7.game.restartLevel("sm_bossroom");
                        return;
                    }
                };
                Player.prototype.onKeyUp = function (keycode) {
                    if (this.isAI)
                        return;
                    var key = this.inputMapping[keycode];
                    this.input[key] = false;
                    this.inputPressed[key] = false;
                };
                Player.prototype.clearInputPressed = function () {
                    this.inputPressed = {};
                    this.controllerInputPressed = {};
                };
                Player.prototype.clearAiInput = function () {
                    this.input = {};
                    this.controllerInputPressed = {};
                };
                Player.prototype.destroyCharacter = function () {
                    this.character.destroySelf();
                    this.character = undefined;
                };
                return Player;
            }());
            exports_15("Player", Player);
        }
    };
});
System.register("spawnPoint", [], function (exports_16, context_16) {
    "use strict";
    var __moduleName = context_16 && context_16.id;
    var SpawnPoint;
    return {
        setters: [],
        execute: function () {
            SpawnPoint = (function () {
                function SpawnPoint(point) {
                    this.point = point;
                }
                return SpawnPoint;
            }());
            exports_16("SpawnPoint", SpawnPoint);
        }
    };
});
System.register("noScroll", [], function (exports_17, context_17) {
    "use strict";
    var __moduleName = context_17 && context_17.id;
    var NoScroll;
    return {
        setters: [],
        execute: function () {
            NoScroll = (function () {
                function NoScroll(rect) {
                    this.rect = rect;
                }
                return NoScroll;
            }());
            exports_17("NoScroll", NoScroll);
        }
    };
});
System.register("level", ["wall", "point", "game", "helpers", "actor", "rect", "collider", "projectile", "character", "spawnPoint", "noScroll"], function (exports_18, context_18) {
    "use strict";
    var __moduleName = context_18 && context_18.id;
    var wall_2, point_9, game_8, Helpers, actor_4, rect_4, collider_4, projectile_3, character_4, spawnPoint_1, noScroll_1, Level;
    return {
        setters: [
            function (wall_2_1) {
                wall_2 = wall_2_1;
            },
            function (point_9_1) {
                point_9 = point_9_1;
            },
            function (game_8_1) {
                game_8 = game_8_1;
            },
            function (Helpers_8) {
                Helpers = Helpers_8;
            },
            function (actor_4_1) {
                actor_4 = actor_4_1;
            },
            function (rect_4_1) {
                rect_4 = rect_4_1;
            },
            function (collider_4_1) {
                collider_4 = collider_4_1;
            },
            function (projectile_3_1) {
                projectile_3 = projectile_3_1;
            },
            function (character_4_1) {
                character_4 = character_4_1;
            },
            function (spawnPoint_1_1) {
                spawnPoint_1 = spawnPoint_1_1;
            },
            function (noScroll_1_1) {
                noScroll_1 = noScroll_1_1;
            }
        ],
        execute: function () {
            Level = (function () {
                function Level(levelJson) {
                    this.effects = [];
                    this.spawnPoints = [];
                    this.noScrolls = [];
                    this.zoomScale = 4;
                    this.gravity = 900;
                    this.camX = 0;
                    this.camY = 0;
                    this.name = levelJson.name;
                    this.background = game_8.game.getBackground(levelJson.backgroundPath);
                    this.frameCount = 0;
                    this.gameObjects = [];
                    for (var _i = 0, _a = levelJson.instances; _i < _a.length; _i++) {
                        var instance = _a[_i];
                        if (instance.objectName === "Collision Shape") {
                            var points = [];
                            for (var _b = 0, _c = instance.points; _b < _c.length; _b++) {
                                var point = _c[_b];
                                points.push(new point_9.Point(point.x, point.y));
                            }
                            this.gameObjects.push(new wall_2.Wall(points));
                        }
                        else if (instance.objectName === "Ladder") {
                            var points = [];
                            for (var _d = 0, _e = instance.points; _d < _e.length; _d++) {
                                var point = _e[_d];
                                points.push(new point_9.Point(point.x, point.y));
                            }
                            this.gameObjects.push(new wall_2.Ladder(points));
                        }
                        else if (instance.objectName === "No Scroll") {
                            var points = [];
                            for (var _f = 0, _g = instance.points; _f < _g.length; _f++) {
                                var point = _g[_f];
                                points.push(new point_9.Point(point.x, point.y));
                            }
                            var rect = new rect_4.Rect(points[0].x, points[0].y, points[2].x, points[2].y);
                            this.noScrolls.push(new noScroll_1.NoScroll(rect));
                        }
                        else if (instance.objectName === "Spawn Point") {
                            this.spawnPoints.push(new spawnPoint_1.SpawnPoint(new point_9.Point(instance.pos.x, instance.pos.y)));
                        }
                        else {
                            var actor = new actor_4.Actor(game_8.game.sprites[instance.spriteName], true);
                            actor.pos = new point_9.Point(instance.pos.x, instance.pos.y);
                            actor.name = instance.name;
                            this.gameObjects.push(actor);
                        }
                    }
                    this.localPlayers = [];
                    this.players = [];
                    this.twoFrameCycle = 0;
                    var parallax = "";
                    if (this.name === "sm_bossroom") {
                        this.fixedCam = true;
                        this.levelMusic = "BossBattle.mp3";
                        this.musicLoopStart = 1500;
                        this.musicLoopEnd = 29664;
                    }
                    else if (this.name === "powerplant") {
                        this.fixedCam = false;
                        this.levelMusic = "PowerPlant.mp3";
                        parallax = "powerplant_parallex.png";
                        this.musicLoopStart = 51040;
                        this.musicLoopEnd = 101116;
                    }
                    if (parallax) {
                        this.parallax = game_8.game.getBackground("assets/backgrounds/" + parallax);
                    }
                }
                Level.prototype.update = function () {
                    var gamepads = navigator.getGamepads();
                    for (var i = 0; i < gamepads.length; i++) {
                        if (i >= this.localPlayers.length)
                            break;
                        var player = this.localPlayers[i];
                        var gamepad = gamepads[i];
                        if (!gamepad)
                            continue;
                        player.setButtonMapping(gamepad.id);
                        for (var j = 0; j < gamepad.buttons.length; j++) {
                            if (gamepad.buttons[j].pressed) {
                                player.onButtonDown(j);
                            }
                            else {
                                player.onButtonUp(j);
                            }
                        }
                        for (var j = 0; j < gamepad.axes.length; j++) {
                            player.setAxes(j, gamepad.axes[j]);
                        }
                    }
                    for (var _i = 0, _a = this.gameObjects; _i < _a.length; _i++) {
                        var go = _a[_i];
                        go.preUpdate();
                        go.update();
                    }
                    for (var _b = 0, _c = this.effects; _b < _c.length; _b++) {
                        var effect = _c[_b];
                        effect.update();
                    }
                    this.render();
                    for (var _d = 0, _e = this.localPlayers; _d < _e.length; _d++) {
                        var player = _e[_d];
                        player.clearInputPressed();
                        if (player.isAI) {
                            player.clearAiInput();
                        }
                    }
                    this.frameCount++;
                    this.twoFrameCycle++;
                    if (this.twoFrameCycle > 2)
                        this.twoFrameCycle = -2;
                };
                Level.prototype.render = function () {
                    if (this.fixedCam) {
                        game_8.game.canvas.width = Math.round(this.background.width * this.zoomScale);
                        game_8.game.canvas.height = Math.round(this.background.height * this.zoomScale);
                    }
                    else {
                        game_8.game.canvas.width = Math.min(game_8.game.canvas.width, Math.round(this.background.width * this.zoomScale));
                        game_8.game.canvas.height = Math.min(game_8.game.canvas.height, Math.round(this.background.height * this.zoomScale));
                    }
                    if (!game_8.game.options.antiAlias) {
                        Helpers.noCanvasSmoothing(game_8.game.ctx);
                    }
                    if (this.mainPlayer.character) {
                        this.computeCamPos(this.mainPlayer.character);
                    }
                    game_8.game.ctx.setTransform(this.zoomScale, 0, 0, this.zoomScale, 0, 0);
                    game_8.game.ctx.clearRect(0, 0, game_8.game.canvas.width, game_8.game.canvas.height);
                    Helpers.drawRect(game_8.game.ctx, new rect_4.Rect(0, 0, game_8.game.canvas.width, game_8.game.canvas.height), "gray");
                    if (this.parallax)
                        Helpers.drawImage(game_8.game.ctx, this.parallax, -this.camX * 0.5, -this.camY * 0.5);
                    Helpers.drawImage(game_8.game.ctx, this.background, -this.camX, -this.camY);
                    for (var _i = 0, _a = this.gameObjects; _i < _a.length; _i++) {
                        var go = _a[_i];
                        go.render(-this.camX, -this.camY);
                    }
                    for (var _b = 0, _c = this.effects; _b < _c.length; _b++) {
                        var effect = _c[_b];
                        effect.render(-this.camX, -this.camY);
                    }
                    this.drawHUD();
                    Helpers.drawText(game_8.game.ctx, "FPS: " + game_8.game.fps, 10, 10, "white", 8, "left", "top", "");
                };
                Level.prototype.drawHUD = function () {
                    var player1 = this.localPlayers[0];
                    this.drawPlayerHUD(player1, 1);
                    if (this.localPlayers.length > 1) {
                        var player2 = this.localPlayers[1];
                        this.drawPlayerHUD(player2, 2);
                    }
                };
                Level.prototype.drawPlayerHUD = function (player, playerNum) {
                    var baseX = 10;
                    if (playerNum === 2)
                        baseX = game_8.game.canvas.width / this.zoomScale - 4 - baseX;
                    var baseY = game_8.game.canvas.height / this.zoomScale / 2;
                    baseY += 25;
                    game_8.game.sprites["hud_health_base"].draw(0, baseX, baseY, 1, 1, "", 1, player.palette);
                    baseY -= 16;
                    for (var i = 0; i < Math.ceil(player.health); i++) {
                        game_8.game.sprites["hud_health_full"].draw(0, baseX, baseY);
                        baseY -= 2;
                    }
                    for (var i = 0; i < player.maxHealth - Math.ceil(player.health); i++) {
                        game_8.game.sprites["hud_health_empty"].draw(0, baseX, baseY);
                        baseY -= 2;
                    }
                    game_8.game.sprites["hud_health_top"].draw(0, baseX, baseY);
                    if (player.weaponIndex !== 0) {
                        baseX = 25;
                        if (playerNum === 2)
                            baseX = game_8.game.canvas.width / this.zoomScale - 4 - baseX;
                        baseY = game_8.game.canvas.height / this.zoomScale / 2;
                        baseY += 25;
                        game_8.game.sprites["hud_weapon_base"].draw(player.weapon.index - 1, baseX, baseY);
                        baseY -= 16;
                        for (var i = 0; i < Math.ceil(player.weapon.ammo); i++) {
                            game_8.game.sprites["hud_weapon_full"].draw(player.weapon.index - 1, baseX, baseY);
                            baseY -= 2;
                        }
                        for (var i = 0; i < player.weapon.maxAmmo - Math.ceil(player.weapon.ammo); i++) {
                            game_8.game.sprites["hud_health_empty"].draw(0, baseX, baseY);
                            baseY -= 2;
                        }
                        game_8.game.sprites["hud_health_top"].draw(0, baseX, baseY);
                    }
                };
                Object.defineProperty(Level.prototype, "width", {
                    get: function () { return this.background.width; },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(Level.prototype, "height", {
                    get: function () { return this.background.height; },
                    enumerable: true,
                    configurable: true
                });
                Level.prototype.computeCamPos = function (actor) {
                    var scaledCanvasW = game_8.game.canvas.width / this.zoomScale;
                    var scaledCanvasH = game_8.game.canvas.height / this.zoomScale;
                    this.camX = actor.pos.x - scaledCanvasW / 2;
                    this.camY = actor.pos.y - scaledCanvasH / 2;
                    if (this.camX < 0)
                        this.camX = 0;
                    if (this.camY < 0)
                        this.camY = 0;
                    var maxX = this.background.width - scaledCanvasW;
                    var maxY = this.background.height - scaledCanvasH;
                    if (this.camX > maxX)
                        this.camX = maxX;
                    if (this.camY > maxY)
                        this.camY = maxY;
                    var camRect = new rect_4.Rect(this.camX, this.camY, this.camX + scaledCanvasW, this.camY + scaledCanvasH);
                    for (var _i = 0, _a = this.noScrolls; _i < _a.length; _i++) {
                        var noScroll = _a[_i];
                        if (noScroll.rect.overlaps(camRect)) {
                            var upDist = camRect.y2 - noScroll.rect.y1;
                            var downDist = noScroll.rect.y2 - camRect.y1;
                            var leftDist = camRect.x2 - noScroll.rect.x1;
                            var rightDist = noScroll.rect.x2 - camRect.x1;
                            if (Math.min(upDist, downDist, leftDist, rightDist) === upDist) {
                                this.camY -= upDist;
                            }
                            else if (Math.min(upDist, downDist, leftDist, rightDist) === downDist) {
                                this.camY += downDist;
                            }
                            else if (Math.min(upDist, downDist, leftDist, rightDist) === leftDist) {
                                this.camX -= leftDist;
                            }
                            else if (Math.min(upDist, downDist, leftDist, rightDist) === rightDist) {
                                this.camY += rightDist;
                            }
                        }
                    }
                };
                Level.prototype.addGameObject = function (go) {
                    this.gameObjects.push(go);
                };
                Level.prototype.addEffect = function (effect) {
                    this.effects.push(effect);
                };
                Level.prototype.shouldTrigger = function (actor, gameObject, offset) {
                    if (actor instanceof projectile_3.RollingShieldProj || gameObject instanceof projectile_3.RollingShieldProj) {
                        var a = 0;
                    }
                    if (!actor.collider.isTrigger && gameObject instanceof wall_2.Ladder) {
                        if (actor.pos.y < gameObject.collider.shape.getRect().y1 && offset.y > 0) {
                            if (actor instanceof character_4.Character && !actor.checkLadderDown) {
                                return false;
                            }
                        }
                    }
                    if (actor.collider.isTrigger || gameObject.collider.isTrigger)
                        return true;
                    if (actor.collider.wallOnly && !(gameObject instanceof wall_2.Wall))
                        return true;
                    if (gameObject instanceof actor_4.Actor) {
                        if (gameObject.collider.wallOnly)
                            return true;
                    }
                    return false;
                };
                Level.prototype.checkCollisionActor = function (actor, offsetX, offsetY, vel) {
                    if (actor instanceof projectile_3.RollingShieldProj) {
                        var a = 0;
                    }
                    if (!actor.collider || actor.collider.isTrigger)
                        return undefined;
                    for (var _i = 0, _a = this.gameObjects; _i < _a.length; _i++) {
                        var go = _a[_i];
                        if (go === actor)
                            continue;
                        if (!go.collider)
                            continue;
                        var actorShape = actor.collider.shape.clone(offsetX, offsetY);
                        if (go.collider.shape.intersectsShape(actorShape)) {
                            var isTrigger = this.shouldTrigger(actor, go, new point_9.Point(offsetX, offsetY));
                            if (isTrigger)
                                continue;
                            return new collider_4.CollideData(go.collider, vel, isTrigger, go);
                        }
                    }
                    return undefined;
                };
                Level.prototype.getTriggerList = function (actor, offsetX, offsetY, vel, className) {
                    var triggers = [];
                    if (!actor.collider)
                        return triggers;
                    for (var _i = 0, _a = this.gameObjects; _i < _a.length; _i++) {
                        var go = _a[_i];
                        if (go === actor)
                            continue;
                        if (!go.collider)
                            continue;
                        if (className && go.constructor.name !== className) {
                            continue;
                        }
                        var actorShape = actor.collider.shape.clone(offsetX, offsetY);
                        if (go.collider.shape.intersectsShape(actorShape)) {
                            var isTrigger = this.shouldTrigger(actor, go, new point_9.Point(offsetX, offsetY));
                            if (!isTrigger)
                                continue;
                            triggers.push(new collider_4.CollideData(go.collider, vel, isTrigger, go));
                        }
                    }
                    return triggers;
                };
                Level.prototype.getClosestTarget = function (pos, alliance) {
                    var players = _.filter(this.players, function (player) {
                        return player.character && player.alliance !== alliance;
                    });
                    var closestPlayer = _.minBy(players, function (player) {
                        return player.character.pos.distanceTo(pos);
                    });
                    return closestPlayer ? closestPlayer.character : undefined;
                };
                return Level;
            }());
            exports_18("Level", Level);
        }
    };
});
System.register("sprites", [], function (exports_19, context_19) {
    "use strict";
    var __moduleName = context_19 && context_19.id;
    var spriteJsons;
    return {
        setters: [],
        execute: function () {
            spriteJsons = [{ "className": "Sprite", "hitboxes": [{ "className": "Hitbox", "tags": "", "width": 15, "height": 15, "offset": { "className": "Point", "x": 0, "y": 0 }, "rect": { "className": "Rect", "topLeftPoint": { "className": "Point", "x": 342.5, "y": 292.5 }, "botRightPoint": { "className": "Point", "x": 357.5, "y": 307.5 } }, "isTrigger": true }], "frames": [{ "className": "Frame", "rect": { "className": "Rect", "topLeftPoint": { "className": "Point", "x": 9, "y": 925 }, "botRightPoint": { "className": "Point", "x": 24, "y": 939 } }, "duration": 0.03, "offset": { "className": "Point", "x": 0, "y": 0 }, "hitboxes": [], "POIs": [] }, { "className": "Frame", "rect": { "className": "Rect", "topLeftPoint": { "className": "Point", "x": 35, "y": 925 }, "botRightPoint": { "className": "Point", "x": 50, "y": 940 } }, "duration": 0.03, "offset": { "className": "Point", "x": 0, "y": 0 }, "hitboxes": [], "POIs": [] }, { "className": "Frame", "rect": { "className": "Rect", "topLeftPoint": { "className": "Point", "x": 60, "y": 925 }, "botRightPoint": { "className": "Point", "x": 74, "y": 940 } }, "duration": 0.03, "offset": { "className": "Point", "x": 0, "y": 0 }, "hitboxes": [], "POIs": [] }, { "className": "Frame", "rect": { "className": "Rect", "topLeftPoint": { "className": "Point", "x": 82, "y": 925 }, "botRightPoint": { "className": "Point", "x": 97, "y": 940 } }, "duration": 0.03, "offset": { "className": "Point", "x": 0, "y": 0 }, "hitboxes": [], "POIs": [] }, { "className": "Frame", "rect": { "className": "Rect", "topLeftPoint": { "className": "Point", "x": 107, "y": 926 }, "botRightPoint": { "className": "Point", "x": 122, "y": 940 } }, "duration": 0.03, "offset": { "className": "Point", "x": 0, "y": 0 }, "hitboxes": [], "POIs": [] }, { "className": "Frame", "rect": { "className": "Rect", "topLeftPoint": { "className": "Point", "x": 133, "y": 926 }, "botRightPoint": { "className": "Point", "x": 148, "y": 941 } }, "duration": 0.03, "offset": { "className": "Point", "x": 0, "y": 0 }, "hitboxes": [], "POIs": [] }, { "className": "Frame", "rect": { "className": "Rect", "topLeftPoint": { "className": "Point", "x": 155, "y": 926 }, "botRightPoint": { "className": "Point", "x": 169, "y": 941 } }, "duration": 0.03, "offset": { "className": "Point", "x": 0, "y": 0 }, "hitboxes": [], "POIs": [] }, { "className": "Frame", "rect": { "className": "Rect", "topLeftPoint": { "className": "Point", "x": 180, "y": 926 }, "botRightPoint": { "className": "Point", "x": 195, "y": 941 } }, "duration": 0.03, "offset": { "className": "Point", "x": 0, "y": 0 }, "hitboxes": [], "POIs": [] }], "POIs": [], "name": "boomerang", "path": "assets/sprites/boomerang.json", "alignment": "center", "wrapMode": "loop", "spritesheetPath": "assets/spritesheets/effects.png" }, { "className": "Sprite", "hitboxes": [{ "className": "Hitbox", "tags": "", "width": 8, "height": 6, "offset": { "className": "Point", "x": 0, "y": 0 }, "rect": { "className": "Rect", "topLeftPoint": { "className": "Point", "x": 346, "y": 297 }, "botRightPoint": { "className": "Point", "x": 354, "y": 303 } }, "isTrigger": true }], "frames": [{ "className": "Frame", "rect": { "className": "Rect", "topLeftPoint": { "className": "Point", "x": 123, "y": 253 }, "botRightPoint": { "className": "Point", "x": 131, "y": 259 } }, "duration": 0.066, "offset": { "className": "Point", "x": 0, "y": 0 }, "hitboxes": [], "POIs": [] }], "POIs": [], "name": "buster1", "path": "assets/sprites/buster1.json", "alignment": "center", "wrapMode": "once", "spritesheetPath": "assets/spritesheets/effects.png" }, { "className": "Sprite", "hitboxes": [], "frames": [{ "className": "Frame", "rect": { "className": "Rect", "topLeftPoint": { "className": "Point", "x": 137, "y": 250 }, "botRightPoint": { "className": "Point", "x": 149, "y": 262 } }, "duration": 0.03, "offset": { "className": "Point", "x": 0, "y": 0 }, "hitboxes": [], "POIs": [] }, { "className": "Frame", "rect": { "className": "Rect", "topLeftPoint": { "className": "Point", "x": 154, "y": 249 }, "botRightPoint": { "className": "Point", "x": 167, "y": 262 } }, "duration": 0.03, "offset": { "className": "Point", "x": 0, "y": 0 }, "hitboxes": [], "POIs": [] }, { "className": "Frame", "rect": { "className": "Rect", "topLeftPoint": { "className": "Point", "x": 172, "y": 248 }, "botRightPoint": { "className": "Point", "x": 187, "y": 263 } }, "duration": 0.03, "offset": { "className": "Point", "x": 0, "y": 0 }, "hitboxes": [], "POIs": [] }], "POIs": [], "name": "buster1_fade", "path": "assets/sprites/buster1_fade.json", "alignment": "center", "wrapMode": "once", "spritesheetPath": "assets/spritesheets/effects.png" }, { "className": "Sprite", "hitboxes": [{ "className": "Hitbox", "tags": "", "width": 22, "height": 8, "offset": { "className": "Point", "x": 5, "y": 0 }, "rect": { "className": "Rect", "topLeftPoint": { "className": "Point", "x": 344, "y": 296 }, "botRightPoint": { "className": "Point", "x": 366, "y": 304 } }, "isTrigger": true }], "frames": [{ "className": "Frame", "rect": { "className": "Rect", "topLeftPoint": { "className": "Point", "x": 138, "y": 274 }, "botRightPoint": { "className": "Point", "x": 153, "y": 288 } }, "duration": 0.03, "offset": { "className": "Point", "x": 0, "y": 0 }, "hitboxes": [], "POIs": [] }, { "className": "Frame", "rect": { "className": "Rect", "topLeftPoint": { "className": "Point", "x": 158, "y": 269 }, "botRightPoint": { "className": "Point", "x": 182, "y": 293 } }, "duration": 0.03, "offset": { "className": "Point", "x": 0, "y": 0 }, "hitboxes": [], "POIs": [] }, { "className": "Frame", "rect": { "className": "Rect", "topLeftPoint": { "className": "Point", "x": 187, "y": 275 }, "botRightPoint": { "className": "Point", "x": 215, "y": 287 } }, "duration": 0.03, "offset": { "className": "Point", "x": 0, "y": 0 }, "hitboxes": [], "POIs": [] }, { "className": "Frame", "rect": { "className": "Rect", "topLeftPoint": { "className": "Point", "x": 221, "y": 277 }, "botRightPoint": { "className": "Point", "x": 253, "y": 285 } }, "duration": 0.03, "offset": { "className": "Point", "x": 0, "y": 0 }, "hitboxes": [], "POIs": [] }, { "className": "Frame", "rect": { "className": "Rect", "topLeftPoint": { "className": "Point", "x": 260, "y": 275 }, "botRightPoint": { "className": "Point", "x": 298, "y": 287 } }, "duration": 0.03, "offset": { "className": "Point", "x": 0, "y": 0 }, "hitboxes": [], "POIs": [] }, { "className": "Frame", "rect": { "className": "Rect", "topLeftPoint": { "className": "Point", "x": 303, "y": 270 }, "botRightPoint": { "className": "Point", "x": 339, "y": 292 } }, "duration": 0.03, "offset": { "className": "Point", "x": 0, "y": 0 }, "hitboxes": [], "POIs": [] }, { "className": "Frame", "rect": { "className": "Rect", "topLeftPoint": { "className": "Point", "x": 344, "y": 275 }, "botRightPoint": { "className": "Point", "x": 382, "y": 287 } }, "duration": 0.03, "offset": { "className": "Point", "x": 0, "y": 0 }, "hitboxes": [], "POIs": [] }, { "className": "Frame", "rect": { "className": "Rect", "topLeftPoint": { "className": "Point", "x": 388, "y": 270 }, "botRightPoint": { "className": "Point", "x": 428, "y": 289 } }, "duration": 0.03, "offset": { "className": "Point", "x": 0, "y": -2 }, "hitboxes": [], "POIs": [] }], "POIs": [], "name": "buster2", "path": "assets/sprites/buster2.json", "alignment": "center", "wrapMode": "loop", "spritesheetPath": "assets/spritesheets/effects.png", "loopStartFrame": 5 }, { "className": "Sprite", "hitboxes": [], "frames": [{ "className": "Frame", "rect": { "className": "Rect", "topLeftPoint": { "className": "Point", "x": 434, "y": 274 }, "botRightPoint": { "className": "Point", "x": 449, "y": 288 } }, "duration": 0.03, "offset": { "className": "Point", "x": 0, "y": 0 }, "hitboxes": [], "POIs": [] }, { "className": "Frame", "rect": { "className": "Rect", "topLeftPoint": { "className": "Point", "x": 454, "y": 269 }, "botRightPoint": { "className": "Point", "x": 478, "y": 293 } }, "duration": 0.03, "offset": { "className": "Point", "x": 0, "y": 0 }, "hitboxes": [], "POIs": [] }, { "className": "Frame", "rect": { "className": "Rect", "topLeftPoint": { "className": "Point", "x": 487, "y": 273 }, "botRightPoint": { "className": "Point", "x": 503, "y": 289 } }, "duration": 0.03, "offset": { "className": "Point", "x": 0, "y": 0 }, "hitboxes": [], "POIs": [] }, { "className": "Frame", "rect": { "className": "Rect", "topLeftPoint": { "className": "Point", "x": 507, "y": 269 }, "botRightPoint": { "className": "Point", "x": 531, "y": 293 } }, "duration": 0.03, "offset": { "className": "Point", "x": 0, "y": 0 }, "hitboxes": [], "POIs": [] }, { "className": "Frame", "rect": { "className": "Rect", "topLeftPoint": { "className": "Point", "x": 535, "y": 273 }, "botRightPoint": { "className": "Point", "x": 551, "y": 289 } }, "duration": 0.03, "offset": { "className": "Point", "x": 0, "y": 0 }, "hitboxes": [], "POIs": [] }, { "className": "Frame", "rect": { "className": "Rect", "topLeftPoint": { "className": "Point", "x": 555, "y": 270 }, "botRightPoint": { "className": "Point", "x": 577, "y": 292 } }, "duration": 0.03, "offset": { "className": "Point", "x": 0, "y": 0 }, "hitboxes": [], "POIs": [] }, { "className": "Frame", "rect": { "className": "Rect", "topLeftPoint": { "className": "Point", "x": 581, "y": 269 }, "botRightPoint": { "className": "Point", "x": 605, "y": 293 } }, "duration": 0.03, "offset": { "className": "Point", "x": 0, "y": 0 }, "hitboxes": [], "POIs": [] }, { "className": "Frame", "rect": { "className": "Rect", "topLeftPoint": { "className": "Point", "x": 609, "y": 269 }, "botRightPoint": { "className": "Point", "x": 633, "y": 293 } }, "duration": 0.03, "offset": { "className": "Point", "x": 0, "y": 0 }, "hitboxes": [], "POIs": [] }], "POIs": [], "name": "buster2_fade", "path": "assets/sprites/buster2_fade.json", "alignment": "center", "wrapMode": "once", "spritesheetPath": "assets/spritesheets/effects.png" }, { "className": "Sprite", "hitboxes": [{ "className": "Hitbox", "tags": "", "width": 24, "height": 24, "offset": { "className": "Point", "x": 0, "y": 0 }, "rect": { "className": "Rect", "topLeftPoint": { "className": "Point", "x": 338, "y": 288 }, "botRightPoint": { "className": "Point", "x": 362, "y": 312 } }, "isTrigger": true }], "frames": [{ "className": "Frame", "rect": { "className": "Rect", "topLeftPoint": { "className": "Point", "x": 148, "y": 319 }, "botRightPoint": { "className": "Point", "x": 162, "y": 339 } }, "duration": 0.03, "offset": { "className": "Point", "x": 0, "y": 0 }, "hitboxes": [], "POIs": [] }, { "className": "Frame", "rect": { "className": "Rect", "topLeftPoint": { "className": "Point", "x": 170, "y": 321 }, "botRightPoint": { "className": "Point", "x": 193, "y": 337 } }, "duration": 0.03, "offset": { "className": "Point", "x": 0, "y": 0 }, "hitboxes": [], "POIs": [] }, { "className": "Frame", "rect": { "className": "Rect", "topLeftPoint": { "className": "Point", "x": 199, "y": 313 }, "botRightPoint": { "className": "Point", "x": 231, "y": 345 } }, "duration": 0.03, "offset": { "className": "Point", "x": 0, "y": 0 }, "hitboxes": [], "POIs": [] }, { "className": "Frame", "rect": { "className": "Rect", "topLeftPoint": { "className": "Point", "x": 239, "y": 317 }, "botRightPoint": { "className": "Point", "x": 266, "y": 341 } }, "duration": 0.03, "offset": { "className": "Point", "x": 0, "y": 0 }, "hitboxes": [], "POIs": [] }, { "className": "Frame", "rect": { "className": "Rect", "topLeftPoint": { "className": "Point", "x": 271, "y": 313 }, "botRightPoint": { "className": "Point", "x": 311, "y": 345 } }, "duration": 0.03, "offset": { "className": "Point", "x": 0, "y": 0 }, "hitboxes": [], "POIs": [] }], "POIs": [], "name": "buster3", "path": "assets/sprites/buster3.json", "alignment": "center", "wrapMode": "loop", "spritesheetPath": "assets/spritesheets/effects.png", "loopStartFrame": 2 }, { "className": "Sprite", "hitboxes": [], "frames": [{ "className": "Frame", "rect": { "className": "Rect", "topLeftPoint": { "className": "Point", "x": 320, "y": 319 }, "botRightPoint": { "className": "Point", "x": 334, "y": 339 } }, "duration": 0.03, "offset": { "className": "Point", "x": 0, "y": 0 }, "hitboxes": [], "POIs": [] }, { "className": "Frame", "rect": { "className": "Rect", "topLeftPoint": { "className": "Point", "x": 341, "y": 315 }, "botRightPoint": { "className": "Point", "x": 365, "y": 343 } }, "duration": 0.03, "offset": { "className": "Point", "x": 0, "y": 0 }, "hitboxes": [], "POIs": [] }, { "className": "Frame", "rect": { "className": "Rect", "topLeftPoint": { "className": "Point", "x": 374, "y": 315 }, "botRightPoint": { "className": "Point", "x": 402, "y": 343 } }, "duration": 0.03, "offset": { "className": "Point", "x": 0, "y": 0 }, "hitboxes": [], "POIs": [] }, { "className": "Frame", "rect": { "className": "Rect", "topLeftPoint": { "className": "Point", "x": 406, "y": 316 }, "botRightPoint": { "className": "Point", "x": 432, "y": 342 } }, "duration": 0.03, "offset": { "className": "Point", "x": 0, "y": 0 }, "hitboxes": [], "POIs": [] }, { "className": "Frame", "rect": { "className": "Rect", "topLeftPoint": { "className": "Point", "x": 436, "y": 315 }, "botRightPoint": { "className": "Point", "x": 464, "y": 343 } }, "duration": 0.03, "offset": { "className": "Point", "x": 0, "y": 0 }, "hitboxes": [], "POIs": [] }, { "className": "Frame", "rect": { "className": "Rect", "topLeftPoint": { "className": "Point", "x": 468, "y": 314 }, "botRightPoint": { "className": "Point", "x": 498, "y": 344 } }, "duration": 0.03, "offset": { "className": "Point", "x": 0, "y": 0 }, "hitboxes": [], "POIs": [] }, { "className": "Frame", "rect": { "className": "Rect", "topLeftPoint": { "className": "Point", "x": 502, "y": 313 }, "botRightPoint": { "className": "Point", "x": 534, "y": 345 } }, "duration": 0.03, "offset": { "className": "Point", "x": 0, "y": 0 }, "hitboxes": [], "POIs": [] }, { "className": "Frame", "rect": { "className": "Rect", "topLeftPoint": { "className": "Point", "x": 538, "y": 313 }, "botRightPoint": { "className": "Point", "x": 570, "y": 345 } }, "duration": 0.03, "offset": { "className": "Point", "x": 0, "y": 0 }, "hitboxes": [], "POIs": [] }], "POIs": [], "name": "buster3_fade", "path": "assets/sprites/buster3_fade.json", "alignment": "center", "wrapMode": "once", "spritesheetPath": "assets/spritesheets/effects.png" }, { "className": "Sprite", "hitboxes": [{ "className": "Hitbox", "tags": "", "width": 16, "height": 15, "offset": { "className": "Point", "x": 0, "y": 0 }, "rect": { "className": "Rect", "topLeftPoint": { "className": "Point", "x": 342, "y": 292.5 }, "botRightPoint": { "className": "Point", "x": 358, "y": 307.5 } }, "isTrigger": true }], "frames": [{ "className": "Frame", "rect": { "className": "Rect", "topLeftPoint": { "className": "Point", "x": 324, "y": 377 }, "botRightPoint": { "className": "Point", "x": 340, "y": 392 } }, "duration": 0.03, "offset": { "className": "Point", "x": 0, "y": 0 }, "hitboxes": [], "POIs": [] }, { "className": "Frame", "rect": { "className": "Rect", "topLeftPoint": { "className": "Point", "x": 344, "y": 378 }, "botRightPoint": { "className": "Point", "x": 358, "y": 391 } }, "duration": 0.03, "offset": { "className": "Point", "x": 0, "y": 0 }, "hitboxes": [], "POIs": [] }, { "className": "Frame", "rect": { "className": "Rect", "topLeftPoint": { "className": "Point", "x": 362, "y": 379 }, "botRightPoint": { "className": "Point", "x": 375, "y": 390 } }, "duration": 0.03, "offset": { "className": "Point", "x": 0, "y": 0 }, "hitboxes": [], "POIs": [] }, { "className": "Frame", "rect": { "className": "Rect", "topLeftPoint": { "className": "Point", "x": 379, "y": 381 }, "botRightPoint": { "className": "Point", "x": 387, "y": 388 } }, "duration": 0.03, "offset": { "className": "Point", "x": 0, "y": 0 }, "hitboxes": [], "POIs": [] }], "POIs": [], "name": "buster4", "path": "assets/sprites/buster4.json", "alignment": "center", "wrapMode": "once", "spritesheetPath": "assets/spritesheets/effects.png" }, { "className": "Sprite", "hitboxes": [], "frames": [{ "className": "Frame", "rect": { "className": "Rect", "topLeftPoint": { "className": "Point", "x": 402, "y": 379 }, "botRightPoint": { "className": "Point", "x": 414, "y": 391 } }, "duration": 0.03, "offset": { "className": "Point", "x": 0, "y": 0 }, "hitboxes": [], "POIs": [] }, { "className": "Frame", "rect": { "className": "Rect", "topLeftPoint": { "className": "Point", "x": 418, "y": 378 }, "botRightPoint": { "className": "Point", "x": 432, "y": 392 } }, "duration": 0.03, "offset": { "className": "Point", "x": 0, "y": 0 }, "hitboxes": [], "POIs": [] }, { "className": "Frame", "rect": { "className": "Rect", "topLeftPoint": { "className": "Point", "x": 436, "y": 377 }, "botRightPoint": { "className": "Point", "x": 452, "y": 393 } }, "duration": 0.03, "offset": { "className": "Point", "x": 0, "y": 0 }, "hitboxes": [], "POIs": [] }], "POIs": [], "name": "buster4_fade", "path": "assets/sprites/buster4_fade.json", "alignment": "center", "wrapMode": "once", "spritesheetPath": "assets/spritesheets/effects.png" }, { "className": "Sprite", "hitboxes": [], "frames": [{ "className": "Frame", "rect": { "className": "Rect", "topLeftPoint": { "className": "Point", "x": 146, "y": 362 }, "botRightPoint": { "className": "Point", "x": 159, "y": 407 } }, "duration": 0.03, "offset": { "className": "Point", "x": 0, "y": 0 }, "hitboxes": [], "POIs": [] }, { "className": "Frame", "rect": { "className": "Rect", "topLeftPoint": { "className": "Point", "x": 166, "y": 355 }, "botRightPoint": { "className": "Point", "x": 190, "y": 414 } }, "duration": 0.03, "offset": { "className": "Point", "x": -7, "y": 0 }, "hitboxes": [], "POIs": [] }, { "className": "Frame", "rect": { "className": "Rect", "topLeftPoint": { "className": "Point", "x": 199, "y": 352 }, "botRightPoint": { "className": "Point", "x": 231, "y": 415 } }, "duration": 0.03, "offset": { "className": "Point", "x": -13, "y": 0 }, "hitboxes": [], "POIs": [] }, { "className": "Frame", "rect": { "className": "Rect", "topLeftPoint": { "className": "Point", "x": 238, "y": 352 }, "botRightPoint": { "className": "Point", "x": 269, "y": 415 } }, "duration": 0.03, "offset": { "className": "Point", "x": -15, "y": 0 }, "hitboxes": [], "POIs": [] }, { "className": "Frame", "rect": { "className": "Rect", "topLeftPoint": { "className": "Point", "x": 275, "y": 357 }, "botRightPoint": { "className": "Point", "x": 296, "y": 410 } }, "duration": 0.03, "offset": { "className": "Point", "x": -19, "y": 0 }, "hitboxes": [], "POIs": [] }, { "className": "Frame", "rect": { "className": "Rect", "topLeftPoint": { "className": "Point", "x": 302, "y": 361 }, "botRightPoint": { "className": "Point", "x": 317, "y": 408 } }, "duration": 0.03, "offset": { "className": "Point", "x": -23, "y": 0 }, "hitboxes": [], "POIs": [] }], "POIs": [], "name": "buster4_muzzle_flash", "path": "assets/sprites/buster4_muzzle_flash.json", "alignment": "center", "wrapMode": "once", "spritesheetPath": "assets/spritesheets/effects.png" }, { "className": "Sprite", "hitboxes": [], "frames": [{ "className": "Frame", "rect": { "className": "Rect", "topLeftPoint": { "className": "Point", "x": 126, "y": 282 }, "botRightPoint": { "className": "Point", "x": 128, "y": 284 } }, "duration": 0.066, "offset": { "className": "Point", "x": 0, "y": 0 }, "hitboxes": [], "POIs": [] }, { "className": "Frame", "rect": { "className": "Rect", "topLeftPoint": { "className": "Point", "x": 126, "y": 282 }, "botRightPoint": { "className": "Point", "x": 128, "y": 284 } }, "duration": 0.066, "offset": { "className": "Point", "x": 0, "y": 0 }, "hitboxes": [], "POIs": [] }, { "className": "Frame", "rect": { "className": "Rect", "topLeftPoint": { "className": "Point", "x": 121, "y": 283 }, "botRightPoint": { "className": "Point", "x": 122, "y": 284 } }, "duration": 0.066, "offset": { "className": "Point", "x": 0, "y": 0 }, "hitboxes": [], "POIs": [] }, { "className": "Frame", "rect": { "className": "Rect", "topLeftPoint": { "className": "Point", "x": 121, "y": 283 }, "botRightPoint": { "className": "Point", "x": 122, "y": 284 } }, "duration": 0.066, "offset": { "className": "Point", "x": 0, "y": 0 }, "hitboxes": [], "POIs": [] }], "POIs": [], "name": "charge_part_1", "path": "assets/sprites/charge_part_1.json", "alignment": "center", "wrapMode": "once", "spritesheetPath": "assets/spritesheets/effects.png" }, { "className": "Sprite", "hitboxes": [], "frames": [{ "className": "Frame", "rect": { "className": "Rect", "topLeftPoint": { "className": "Point", "x": 134, "y": 327 }, "botRightPoint": { "className": "Point", "x": 138, "y": 331 } }, "duration": 0.066, "offset": { "className": "Point", "x": 0, "y": 0 }, "hitboxes": [], "POIs": [] }, { "className": "Frame", "rect": { "className": "Rect", "topLeftPoint": { "className": "Point", "x": 127, "y": 328 }, "botRightPoint": { "className": "Point", "x": 130, "y": 331 } }, "duration": 0.066, "offset": { "className": "Point", "x": 0, "y": 0 }, "hitboxes": [], "POIs": [] }, { "className": "Frame", "rect": { "className": "Rect", "topLeftPoint": { "className": "Point", "x": 121, "y": 329 }, "botRightPoint": { "className": "Point", "x": 123, "y": 331 } }, "duration": 0.066, "offset": { "className": "Point", "x": 0, "y": 0 }, "hitboxes": [], "POIs": [] }, { "className": "Frame", "rect": { "className": "Rect", "topLeftPoint": { "className": "Point", "x": 116, "y": 330 }, "botRightPoint": { "className": "Point", "x": 117, "y": 331 } }, "duration": 0.066, "offset": { "className": "Point", "x": 0, "y": 0 }, "hitboxes": [], "POIs": [] }], "POIs": [], "name": "charge_part_2", "path": "assets/sprites/charge_part_2.json", "alignment": "center", "wrapMode": "once", "spritesheetPath": "assets/spritesheets/effects.png" }, { "className": "Sprite", "hitboxes": [], "frames": [{ "className": "Frame", "rect": { "className": "Rect", "topLeftPoint": { "className": "Point", "x": 131, "y": 383 }, "botRightPoint": { "className": "Point", "x": 136, "y": 388 } }, "duration": 0.066, "offset": { "className": "Point", "x": 0, "y": 0 }, "hitboxes": [], "POIs": [] }, { "className": "Frame", "rect": { "className": "Rect", "topLeftPoint": { "className": "Point", "x": 123, "y": 384 }, "botRightPoint": { "className": "Point", "x": 127, "y": 388 } }, "duration": 0.066, "offset": { "className": "Point", "x": 0, "y": 0 }, "hitboxes": [], "POIs": [] }, { "className": "Frame", "rect": { "className": "Rect", "topLeftPoint": { "className": "Point", "x": 116, "y": 385 }, "botRightPoint": { "className": "Point", "x": 119, "y": 388 } }, "duration": 0.066, "offset": { "className": "Point", "x": 0, "y": 0 }, "hitboxes": [], "POIs": [] }, { "className": "Frame", "rect": { "className": "Rect", "topLeftPoint": { "className": "Point", "x": 110, "y": 386 }, "botRightPoint": { "className": "Point", "x": 112, "y": 388 } }, "duration": 0.066, "offset": { "className": "Point", "x": 0, "y": 0 }, "hitboxes": [], "POIs": [] }], "POIs": [], "name": "charge_part_3", "path": "assets/sprites/charge_part_3.json", "alignment": "center", "wrapMode": "once", "spritesheetPath": "assets/spritesheets/effects.png" }, { "className": "Sprite", "hitboxes": [], "frames": [{ "className": "Frame", "rect": { "className": "Rect", "topLeftPoint": { "className": "Point", "x": 657, "y": 275 }, "botRightPoint": { "className": "Point", "x": 676, "y": 290 } }, "duration": 0.066, "offset": { "className": "Point", "x": 0, "y": 0 }, "hitboxes": [], "POIs": [] }, { "className": "Frame", "rect": { "className": "Rect", "topLeftPoint": { "className": "Point", "x": 679, "y": 266 }, "botRightPoint": { "className": "Point", "x": 702, "y": 290 } }, "duration": 0.066, "offset": { "className": "Point", "x": 0, "y": 0 }, "hitboxes": [], "POIs": [] }, { "className": "Frame", "rect": { "className": "Rect", "topLeftPoint": { "className": "Point", "x": 706, "y": 265 }, "botRightPoint": { "className": "Point", "x": 729, "y": 290 } }, "duration": 0.066, "offset": { "className": "Point", "x": 0, "y": 0 }, "hitboxes": [], "POIs": [] }, { "className": "Frame", "rect": { "className": "Rect", "topLeftPoint": { "className": "Point", "x": 734, "y": 264 }, "botRightPoint": { "className": "Point", "x": 761, "y": 290 } }, "duration": 0.066, "offset": { "className": "Point", "x": 0, "y": 0 }, "hitboxes": [], "POIs": [] }], "POIs": [], "name": "dash_sparks", "path": "assets/sprites/dash_sparks.json", "alignment": "botmid", "wrapMode": "once", "spritesheetPath": "assets/spritesheets/effects.png" }, { "className": "Sprite", "hitboxes": [], "frames": [{ "className": "Frame", "rect": { "className": "Rect", "topLeftPoint": { "className": "Point", "x": 486, "y": 386 }, "botRightPoint": { "className": "Point", "x": 495, "y": 395 } }, "duration": 0.066, "offset": { "className": "Point", "x": 0, "y": 0 }, "hitboxes": [], "POIs": [] }, { "className": "Frame", "rect": { "className": "Rect", "topLeftPoint": { "className": "Point", "x": 486, "y": 373 }, "botRightPoint": { "className": "Point", "x": 497, "y": 384 } }, "duration": 0.066, "offset": { "className": "Point", "x": 0, "y": 0 }, "hitboxes": [], "POIs": [] }, { "className": "Frame", "rect": { "className": "Rect", "topLeftPoint": { "className": "Point", "x": 502, "y": 380 }, "botRightPoint": { "className": "Point", "x": 517, "y": 395 } }, "duration": 0.066, "offset": { "className": "Point", "x": 0, "y": 0 }, "hitboxes": [], "POIs": [] }], "POIs": [], "name": "die_particle", "path": "assets/sprites/die_particle.json", "alignment": "center", "wrapMode": "once", "spritesheetPath": "assets/spritesheets/effects.png" }, { "className": "Sprite", "hitboxes": [], "frames": [{ "className": "Frame", "rect": { "className": "Rect", "topLeftPoint": { "className": "Point", "x": 622, "y": 489 }, "botRightPoint": { "className": "Point", "x": 637, "y": 503 } }, "duration": 0.03, "offset": { "className": "Point", "x": 0, "y": 0 }, "hitboxes": [], "POIs": [] }, { "className": "Frame", "rect": { "className": "Rect", "topLeftPoint": { "className": "Point", "x": 650, "y": 483 }, "botRightPoint": { "className": "Point", "x": 677, "y": 507 } }, "duration": 0.03, "offset": { "className": "Point", "x": 0, "y": 0 }, "hitboxes": [], "POIs": [] }], "POIs": [], "name": "die_sparks", "path": "assets/sprites/die_sparks.json", "alignment": "center", "wrapMode": "once", "spritesheetPath": "assets/spritesheets/effects.png" }, { "className": "Sprite", "hitboxes": [], "frames": [{ "className": "Frame", "rect": { "className": "Rect", "topLeftPoint": { "className": "Point", "x": 798, "y": 256 }, "botRightPoint": { "className": "Point", "x": 806, "y": 263 } }, "duration": 0.066, "offset": { "className": "Point", "x": 0, "y": 0 }, "hitboxes": [], "POIs": [] }, { "className": "Frame", "rect": { "className": "Rect", "topLeftPoint": { "className": "Point", "x": 808, "y": 253 }, "botRightPoint": { "className": "Point", "x": 818, "y": 264 } }, "duration": 0.066, "offset": { "className": "Point", "x": 0, "y": 0 }, "hitboxes": [], "POIs": [] }, { "className": "Frame", "rect": { "className": "Rect", "topLeftPoint": { "className": "Point", "x": 820, "y": 251 }, "botRightPoint": { "className": "Point", "x": 833, "y": 264 } }, "duration": 0.066, "offset": { "className": "Point", "x": 0, "y": 0 }, "hitboxes": [], "POIs": [] }, { "className": "Frame", "rect": { "className": "Rect", "topLeftPoint": { "className": "Point", "x": 837, "y": 250 }, "botRightPoint": { "className": "Point", "x": 851, "y": 264 } }, "duration": 0.066, "offset": { "className": "Point", "x": 0, "y": 0 }, "hitboxes": [], "POIs": [] }, { "className": "Frame", "rect": { "className": "Rect", "topLeftPoint": { "className": "Point", "x": 854, "y": 250 }, "botRightPoint": { "className": "Point", "x": 868, "y": 264 } }, "duration": 0.066, "offset": { "className": "Point", "x": 0, "y": 0 }, "hitboxes": [], "POIs": [] }, { "className": "Frame", "rect": { "className": "Rect", "topLeftPoint": { "className": "Point", "x": 870, "y": 258 }, "botRightPoint": { "className": "Point", "x": 882, "y": 264 } }, "duration": 0.066, "offset": { "className": "Point", "x": 0, "y": 0 }, "hitboxes": [], "POIs": [] }], "POIs": [], "name": "dust", "path": "assets/sprites/dust.json", "alignment": "center", "wrapMode": "once", "spritesheetPath": "assets/spritesheets/effects.png" }, { "className": "Sprite", "hitboxes": [{ "className": "Hitbox", "tags": "", "width": 16, "height": 16, "offset": { "className": "Point", "x": 0, "y": 0 }, "rect": { "className": "Rect", "topLeftPoint": { "className": "Point", "x": 342, "y": 292 }, "botRightPoint": { "className": "Point", "x": 358, "y": 308 } }, "isTrigger": true }], "frames": [{ "className": "Frame", "rect": { "className": "Rect", "topLeftPoint": { "className": "Point", "x": 742, "y": 901 }, "botRightPoint": { "className": "Point", "x": 758, "y": 917 } }, "duration": 0.015, "offset": { "className": "Point", "x": 0, "y": 0 }, "hitboxes": [], "POIs": [] }, { "className": "Frame", "rect": { "className": "Rect", "topLeftPoint": { "className": "Point", "x": 763, "y": 900 }, "botRightPoint": { "className": "Point", "x": 781, "y": 918 } }, "duration": 0.015, "offset": { "className": "Point", "x": 0, "y": 0 }, "hitboxes": [], "POIs": [] }, { "className": "Frame", "rect": { "className": "Rect", "topLeftPoint": { "className": "Point", "x": 742, "y": 901 }, "botRightPoint": { "className": "Point", "x": 758, "y": 917 } }, "duration": 0.015, "offset": { "className": "Point", "x": 0, "y": 0 }, "hitboxes": [], "POIs": [] }, { "className": "Frame", "rect": { "className": "Rect", "topLeftPoint": { "className": "Point", "x": 788, "y": 903 }, "botRightPoint": { "className": "Point", "x": 800, "y": 915 } }, "duration": 0.015, "offset": { "className": "Point", "x": 0, "y": 0 }, "hitboxes": [], "POIs": [] }], "POIs": [], "name": "electric_spark", "path": "assets/sprites/electric_spark.json", "alignment": "center", "wrapMode": "loop", "spritesheetPath": "assets/spritesheets/effects.png" }, { "className": "Sprite", "hitboxes": [], "frames": [{ "className": "Frame", "rect": { "className": "Rect", "topLeftPoint": { "className": "Point", "x": 843, "y": 896 }, "botRightPoint": { "className": "Point", "x": 869, "y": 922 } }, "duration": 0.015, "offset": { "className": "Point", "x": 0, "y": 0 }, "hitboxes": [], "POIs": [] }, { "className": "Frame", "rect": { "className": "Rect", "topLeftPoint": { "className": "Point", "x": 874, "y": 893 }, "botRightPoint": { "className": "Point", "x": 906, "y": 925 } }, "duration": 0.015, "offset": { "className": "Point", "x": 0, "y": 0 }, "hitboxes": [], "POIs": [] }], "POIs": [], "name": "electric_spark_fade", "path": "assets/sprites/electric_spark_fade.json", "alignment": "center", "wrapMode": "once", "spritesheetPath": "assets/spritesheets/effects.png" }, { "className": "Sprite", "hitboxes": [], "frames": [{ "className": "Frame", "rect": { "className": "Rect", "topLeftPoint": { "className": "Point", "x": 591, "y": 315 }, "botRightPoint": { "className": "Point", "x": 607, "y": 331 } }, "duration": 0.03, "offset": { "className": "Point", "x": -1, "y": 0 }, "hitboxes": [], "POIs": [] }, { "className": "Frame", "rect": { "className": "Rect", "topLeftPoint": { "className": "Point", "x": 617, "y": 315 }, "botRightPoint": { "className": "Point", "x": 649, "y": 347 } }, "duration": 0.03, "offset": { "className": "Point", "x": 0, "y": 0 }, "hitboxes": [], "POIs": [] }, { "className": "Frame", "rect": { "className": "Rect", "topLeftPoint": { "className": "Point", "x": 659, "y": 315 }, "botRightPoint": { "className": "Point", "x": 687, "y": 339 } }, "duration": 0.03, "offset": { "className": "Point", "x": 0, "y": 0 }, "hitboxes": [], "POIs": [] }, { "className": "Frame", "rect": { "className": "Rect", "topLeftPoint": { "className": "Point", "x": 697, "y": 315 }, "botRightPoint": { "className": "Point", "x": 727, "y": 342 } }, "duration": 0.03, "offset": { "className": "Point", "x": 0, "y": 0 }, "hitboxes": [], "POIs": [] }, { "className": "Frame", "rect": { "className": "Rect", "topLeftPoint": { "className": "Point", "x": 737, "y": 315 }, "botRightPoint": { "className": "Point", "x": 769, "y": 342 } }, "duration": 0.03, "offset": { "className": "Point", "x": 0, "y": 0 }, "hitboxes": [], "POIs": [] }, { "className": "Frame", "rect": { "className": "Rect", "topLeftPoint": { "className": "Point", "x": 779, "y": 315 }, "botRightPoint": { "className": "Point", "x": 811, "y": 345 } }, "duration": 0.03, "offset": { "className": "Point", "x": 0, "y": 0 }, "hitboxes": [], "POIs": [] }, { "className": "Frame", "rect": { "className": "Rect", "topLeftPoint": { "className": "Point", "x": 821, "y": 315 }, "botRightPoint": { "className": "Point", "x": 852, "y": 337 } }, "duration": 0.03, "offset": { "className": "Point", "x": 0, "y": 0 }, "hitboxes": [], "POIs": [] }, { "className": "Frame", "rect": { "className": "Rect", "topLeftPoint": { "className": "Point", "x": 863, "y": 315 }, "botRightPoint": { "className": "Point", "x": 894, "y": 330 } }, "duration": 0.03, "offset": { "className": "Point", "x": 0, "y": 0 }, "hitboxes": [], "POIs": [] }], "POIs": [], "name": "explosion", "path": "assets/sprites/explosion.json", "alignment": "center", "wrapMode": "once", "spritesheetPath": "assets/spritesheets/effects.png" }, { "className": "Sprite", "hitboxes": [{ "className": "Hitbox", "tags": "", "width": 15, "height": 10, "offset": { "className": "Point", "x": 0, "y": 0 }, "rect": { "className": "Rect", "topLeftPoint": { "className": "Point", "x": 342.5, "y": 295 }, "botRightPoint": { "className": "Point", "x": 357.5, "y": 305 } }, "isTrigger": true }], "frames": [{ "className": "Frame", "rect": { "className": "Rect", "topLeftPoint": { "className": "Point", "x": 47, "y": 905 }, "botRightPoint": { "className": "Point", "x": 62, "y": 915 } }, "duration": 0.03, "offset": { "className": "Point", "x": 0, "y": 0 }, "hitboxes": [], "POIs": [] }], "POIs": [], "name": "fire_wave", "path": "assets/sprites/fire_wave.json", "alignment": "center", "wrapMode": "once", "spritesheetPath": "assets/spritesheets/effects.png" }, { "className": "Sprite", "hitboxes": [], "frames": [{ "className": "Frame", "rect": { "className": "Rect", "topLeftPoint": { "className": "Point", "x": 65, "y": 906 }, "botRightPoint": { "className": "Point", "x": 81, "y": 917 } }, "duration": 0.015, "offset": { "className": "Point", "x": 0, "y": 0 }, "hitboxes": [], "POIs": [] }, { "className": "Frame", "rect": { "className": "Rect", "topLeftPoint": { "className": "Point", "x": 85, "y": 905 }, "botRightPoint": { "className": "Point", "x": 97, "y": 917 } }, "duration": 0.015, "offset": { "className": "Point", "x": 0, "y": 0 }, "hitboxes": [], "POIs": [] }, { "className": "Frame", "rect": { "className": "Rect", "topLeftPoint": { "className": "Point", "x": 102, "y": 904 }, "botRightPoint": { "className": "Point", "x": 116, "y": 918 } }, "duration": 0.015, "offset": { "className": "Point", "x": 0, "y": 0 }, "hitboxes": [], "POIs": [] }, { "className": "Frame", "rect": { "className": "Rect", "topLeftPoint": { "className": "Point", "x": 119, "y": 903 }, "botRightPoint": { "className": "Point", "x": 135, "y": 919 } }, "duration": 0.015, "offset": { "className": "Point", "x": 0, "y": 0 }, "hitboxes": [], "POIs": [] }, { "className": "Frame", "rect": { "className": "Rect", "topLeftPoint": { "className": "Point", "x": 137, "y": 903 }, "botRightPoint": { "className": "Point", "x": 153, "y": 919 } }, "duration": 0.015, "offset": { "className": "Point", "x": 0, "y": 0 }, "hitboxes": [], "POIs": [] }], "POIs": [], "name": "fire_wave_fade", "path": "sprites/fire_wave_fade.json", "alignment": "center", "wrapMode": "once", "spritesheetPath": "assets/spritesheets/effects.png" }, { "className": "Sprite", "hitboxes": [], "frames": [{ "className": "Frame", "rect": { "className": "Rect", "topLeftPoint": { "className": "Point", "x": 2, "y": 55 }, "botRightPoint": { "className": "Point", "x": 16, "y": 71 } }, "duration": 1, "offset": { "className": "Point", "x": 0, "y": 0 }, "hitboxes": [], "POIs": [] }], "POIs": [], "name": "hud_health_base", "path": "assets/sprites/hud_health_base.json", "alignment": "botmid", "wrapMode": "once", "spritesheetPath": "assets/spritesheets/effects.png" }, { "className": "Sprite", "hitboxes": [], "frames": [{ "className": "Frame", "rect": { "className": "Rect", "topLeftPoint": { "className": "Point", "x": 2, "y": 37 }, "botRightPoint": { "className": "Point", "x": 16, "y": 39 } }, "duration": 0.066, "offset": { "className": "Point", "x": 0, "y": 0 }, "hitboxes": [], "POIs": [] }], "POIs": [], "name": "hud_health_empty", "path": "assets/sprites/hud_health_empty.json", "alignment": "botmid", "wrapMode": "once", "spritesheetPath": "assets/spritesheets/effects.png" }, { "className": "Sprite", "hitboxes": [], "frames": [{ "className": "Frame", "rect": { "className": "Rect", "topLeftPoint": { "className": "Point", "x": 2, "y": 51 }, "botRightPoint": { "className": "Point", "x": 16, "y": 53 } }, "duration": 0.066, "offset": { "className": "Point", "x": 0, "y": 0 }, "hitboxes": [], "POIs": [] }], "POIs": [], "name": "hud_health_full", "path": "assets/sprites/hud_health_full.json", "alignment": "botmid", "wrapMode": "once", "spritesheetPath": "assets/spritesheets/effects.png" }, { "className": "Sprite", "hitboxes": [], "frames": [{ "className": "Frame", "rect": { "className": "Rect", "topLeftPoint": { "className": "Point", "x": 34, "y": 13 }, "botRightPoint": { "className": "Point", "x": 48, "y": 17 } }, "duration": 0.066, "offset": { "className": "Point", "x": 0, "y": 0 }, "hitboxes": [], "POIs": [] }], "POIs": [], "name": "hud_health_top", "path": "assets/sprites/hud_health_top.json", "alignment": "botmid", "wrapMode": "once", "spritesheetPath": "assets/spritesheets/effects.png" }, { "className": "Sprite", "hitboxes": [], "frames": [{ "className": "Frame", "rect": { "className": "Rect", "topLeftPoint": { "className": "Point", "x": 138, "y": 55 }, "botRightPoint": { "className": "Point", "x": 152, "y": 71 } }, "duration": 0.066, "offset": { "className": "Point", "x": 0, "y": 0 }, "hitboxes": [], "POIs": [] }, { "className": "Frame", "rect": { "className": "Rect", "topLeftPoint": { "className": "Point", "x": 154, "y": 55 }, "botRightPoint": { "className": "Point", "x": 168, "y": 71 } }, "duration": 0.066, "offset": { "className": "Point", "x": 0, "y": 0 }, "hitboxes": [], "POIs": [] }, { "className": "Frame", "rect": { "className": "Rect", "topLeftPoint": { "className": "Point", "x": 170, "y": 55 }, "botRightPoint": { "className": "Point", "x": 184, "y": 71 } }, "duration": 0.066, "offset": { "className": "Point", "x": 0, "y": 0 }, "hitboxes": [], "POIs": [] }, { "className": "Frame", "rect": { "className": "Rect", "topLeftPoint": { "className": "Point", "x": 186, "y": 55 }, "botRightPoint": { "className": "Point", "x": 200, "y": 71 } }, "duration": 0.066, "offset": { "className": "Point", "x": 0, "y": 0 }, "hitboxes": [], "POIs": [] }, { "className": "Frame", "rect": { "className": "Rect", "topLeftPoint": { "className": "Point", "x": 202, "y": 55 }, "botRightPoint": { "className": "Point", "x": 216, "y": 71 } }, "duration": 0.066, "offset": { "className": "Point", "x": 0, "y": 0 }, "hitboxes": [], "POIs": [] }, { "className": "Frame", "rect": { "className": "Rect", "topLeftPoint": { "className": "Point", "x": 218, "y": 55 }, "botRightPoint": { "className": "Point", "x": 232, "y": 71 } }, "duration": 0.066, "offset": { "className": "Point", "x": 0, "y": 0 }, "hitboxes": [], "POIs": [] }, { "className": "Frame", "rect": { "className": "Rect", "topLeftPoint": { "className": "Point", "x": 234, "y": 55 }, "botRightPoint": { "className": "Point", "x": 248, "y": 71 } }, "duration": 0.066, "offset": { "className": "Point", "x": 0, "y": 0 }, "hitboxes": [], "POIs": [] }, { "className": "Frame", "rect": { "className": "Rect", "topLeftPoint": { "className": "Point", "x": 250, "y": 55 }, "botRightPoint": { "className": "Point", "x": 264, "y": 71 } }, "duration": 0.066, "offset": { "className": "Point", "x": 0, "y": 0 }, "hitboxes": [], "POIs": [] }], "POIs": [], "name": "hud_weapon_base", "path": "assets/sprites/hud_weapon_base.json", "alignment": "botmid", "wrapMode": "once", "spritesheetPath": "assets/spritesheets/effects.png" }, { "className": "Sprite", "hitboxes": [], "frames": [{ "className": "Frame", "rect": { "className": "Rect", "topLeftPoint": { "className": "Point", "x": 138, "y": 51 }, "botRightPoint": { "className": "Point", "x": 152, "y": 53 } }, "duration": 0.066, "offset": { "className": "Point", "x": 0, "y": 0 }, "hitboxes": [], "POIs": [] }, { "className": "Frame", "rect": { "className": "Rect", "topLeftPoint": { "className": "Point", "x": 154, "y": 51 }, "botRightPoint": { "className": "Point", "x": 168, "y": 53 } }, "duration": 0.066, "offset": { "className": "Point", "x": 0, "y": 0 }, "hitboxes": [], "POIs": [] }, { "className": "Frame", "rect": { "className": "Rect", "topLeftPoint": { "className": "Point", "x": 170, "y": 51 }, "botRightPoint": { "className": "Point", "x": 184, "y": 53 } }, "duration": 0.066, "offset": { "className": "Point", "x": 0, "y": 0 }, "hitboxes": [], "POIs": [] }, { "className": "Frame", "rect": { "className": "Rect", "topLeftPoint": { "className": "Point", "x": 186, "y": 51 }, "botRightPoint": { "className": "Point", "x": 200, "y": 53 } }, "duration": 0.066, "offset": { "className": "Point", "x": 0, "y": 0 }, "hitboxes": [], "POIs": [] }, { "className": "Frame", "rect": { "className": "Rect", "topLeftPoint": { "className": "Point", "x": 202, "y": 51 }, "botRightPoint": { "className": "Point", "x": 216, "y": 53 } }, "duration": 0.066, "offset": { "className": "Point", "x": 0, "y": 0 }, "hitboxes": [], "POIs": [] }, { "className": "Frame", "rect": { "className": "Rect", "topLeftPoint": { "className": "Point", "x": 218, "y": 51 }, "botRightPoint": { "className": "Point", "x": 232, "y": 53 } }, "duration": 0.066, "offset": { "className": "Point", "x": 0, "y": 0 }, "hitboxes": [], "POIs": [] }, { "className": "Frame", "rect": { "className": "Rect", "topLeftPoint": { "className": "Point", "x": 234, "y": 51 }, "botRightPoint": { "className": "Point", "x": 248, "y": 53 } }, "duration": 0.066, "offset": { "className": "Point", "x": 0, "y": 0 }, "hitboxes": [], "POIs": [] }, { "className": "Frame", "rect": { "className": "Rect", "topLeftPoint": { "className": "Point", "x": 250, "y": 51 }, "botRightPoint": { "className": "Point", "x": 264, "y": 53 } }, "duration": 0.066, "offset": { "className": "Point", "x": 0, "y": 0 }, "hitboxes": [], "POIs": [] }], "POIs": [], "name": "hud_weapon_full", "path": "assets/sprites/hud_weapon_full.json", "alignment": "botmid", "wrapMode": "once", "spritesheetPath": "assets/spritesheets/effects.png" }, { "className": "Sprite", "hitboxes": [], "frames": [{ "className": "Frame", "rect": { "className": "Rect", "topLeftPoint": { "className": "Point", "x": 264, "y": 157 }, "botRightPoint": { "className": "Point", "x": 292, "y": 188 } }, "duration": 0.12, "offset": { "className": "Point", "x": 0, "y": 0 }, "hitboxes": [], "POIs": [] }, { "className": "Frame", "rect": { "className": "Rect", "topLeftPoint": { "className": "Point", "x": 296, "y": 162 }, "botRightPoint": { "className": "Point", "x": 334, "y": 188 } }, "duration": 0.12, "offset": { "className": "Point", "x": 0, "y": 0 }, "hitboxes": [], "POIs": [] }], "POIs": [], "name": "mmx_dash", "path": "assets/sprites/mmx_dash.json", "alignment": "botmid", "wrapMode": "once", "spritesheetPath": "assets/spritesheets/MegamanX.png" }, { "className": "Sprite", "hitboxes": [], "frames": [{ "className": "Frame", "rect": { "className": "Rect", "topLeftPoint": { "className": "Point", "x": 340, "y": 157 }, "botRightPoint": { "className": "Point", "x": 378, "y": 188 } }, "duration": 0.12, "offset": { "className": "Point", "x": 5, "y": 0 }, "hitboxes": [], "POIs": [{ "className": "POI", "x": 22.399999999999977, "y": -18.19999999999999 }] }, { "className": "Frame", "rect": { "className": "Rect", "topLeftPoint": { "className": "Point", "x": 383, "y": 162 }, "botRightPoint": { "className": "Point", "x": 432, "y": 188 } }, "duration": 0.12, "offset": { "className": "Point", "x": 5, "y": 0 }, "hitboxes": [], "POIs": [{ "className": "POI", "x": 28.399999999999977, "y": -14 }] }], "POIs": [], "name": "mmx_dash_shoot", "path": "assets/sprites/mmx_dash_shoot.json", "alignment": "botmid", "wrapMode": "once", "spritesheetPath": "assets/spritesheets/MegamanX.png" }, { "className": "Sprite", "hitboxes": [], "frames": [{ "className": "Frame", "rect": { "className": "Rect", "topLeftPoint": { "className": "Point", "x": 17, "y": 345 }, "botRightPoint": { "className": "Point", "x": 43, "y": 381 } }, "duration": 0.066, "offset": { "className": "Point", "x": 0, "y": 0 }, "hitboxes": [], "POIs": [] }, { "className": "Frame", "rect": { "className": "Rect", "topLeftPoint": { "className": "Point", "x": 348, "y": 394 }, "botRightPoint": { "className": "Point", "x": 374, "y": 430 } }, "duration": 0.066, "offset": { "className": "Point", "x": 0, "y": 0 }, "hitboxes": [], "POIs": [] }], "POIs": [], "name": "mmx_die", "path": "assets/sprites/mmx_die.json", "alignment": "botmid", "wrapMode": "once", "spritesheetPath": "assets/spritesheets/MegamanX.png" }, { "className": "Sprite", "hitboxes": [], "frames": [{ "className": "Frame", "rect": { "className": "Rect", "topLeftPoint": { "className": "Point", "x": 253, "y": 58 }, "botRightPoint": { "className": "Point", "x": 276, "y": 99 } }, "duration": 0.12, "offset": { "className": "Point", "x": 1, "y": -1 }, "hitboxes": [], "POIs": [] }, { "className": "Frame", "rect": { "className": "Rect", "topLeftPoint": { "className": "Point", "x": 278, "y": 57 }, "botRightPoint": { "className": "Point", "x": 305, "y": 99 } }, "duration": 0.12, "offset": { "className": "Point", "x": 0, "y": 1 }, "hitboxes": [], "POIs": [] }], "POIs": [], "name": "mmx_fall", "path": "assets/sprites/mmx_fall.json", "alignment": "botmid", "wrapMode": "once", "spritesheetPath": "assets/spritesheets/MegamanX.png" }, { "className": "Sprite", "hitboxes": [], "frames": [{ "className": "Frame", "rect": { "className": "Rect", "topLeftPoint": { "className": "Point", "x": 128, "y": 147 }, "botRightPoint": { "className": "Point", "x": 159, "y": 188 } }, "duration": 0.12, "offset": { "className": "Point", "x": 5, "y": -1 }, "hitboxes": [], "POIs": [{ "className": "POI", "x": 19.600000000000023, "y": -29.399999999999977, "tags": "bo" }] }, { "className": "Frame", "rect": { "className": "Rect", "topLeftPoint": { "className": "Point", "x": 160, "y": 146 }, "botRightPoint": { "className": "Point", "x": 191, "y": 188 } }, "duration": 0.12, "offset": { "className": "Point", "x": 5, "y": 0 }, "hitboxes": [], "POIs": [{ "className": "POI", "x": 19.600000000000023, "y": -29.600000000000023, "tags": "bo" }] }], "POIs": [], "name": "mmx_fall_shoot", "path": "assets/sprites/mmx_fall_shoot.json", "alignment": "botmid", "wrapMode": "once", "spritesheetPath": "assets/spritesheets/MegamanX.png" }, { "className": "Sprite", "hitboxes": [], "frames": [{ "className": "Frame", "rect": { "className": "Rect", "topLeftPoint": { "className": "Point", "x": 17, "y": 394 }, "botRightPoint": { "className": "Point", "x": 43, "y": 430 } }, "duration": 0.04, "offset": { "className": "Point", "x": 0, "y": 0 }, "hitboxes": [], "POIs": [] }, { "className": "Frame", "rect": { "className": "Rect", "topLeftPoint": { "className": "Point", "x": 46, "y": 396 }, "botRightPoint": { "className": "Point", "x": 75, "y": 430 } }, "duration": 0.04, "offset": { "className": "Point", "x": 0, "y": 0 }, "hitboxes": [], "POIs": [] }, { "className": "Frame", "rect": { "className": "Rect", "topLeftPoint": { "className": "Point", "x": 79, "y": 396 }, "botRightPoint": { "className": "Point", "x": 108, "y": 430 } }, "duration": 0.04, "offset": { "className": "Point", "x": 0, "y": 0 }, "hitboxes": [], "POIs": [] }, { "className": "Frame", "rect": { "className": "Rect", "topLeftPoint": { "className": "Point", "x": 112, "y": 386 }, "botRightPoint": { "className": "Point", "x": 144, "y": 434 } }, "duration": 0.04, "offset": { "className": "Point", "x": 0, "y": 0 }, "hitboxes": [], "POIs": [] }, { "className": "Frame", "rect": { "className": "Rect", "topLeftPoint": { "className": "Point", "x": 146, "y": 396 }, "botRightPoint": { "className": "Point", "x": 175, "y": 430 } }, "duration": 0.04, "offset": { "className": "Point", "x": 0, "y": 0 }, "hitboxes": [], "POIs": [] }, { "className": "Frame", "rect": { "className": "Rect", "topLeftPoint": { "className": "Point", "x": 179, "y": 386 }, "botRightPoint": { "className": "Point", "x": 211, "y": 434 } }, "duration": 0.04, "offset": { "className": "Point", "x": 0, "y": 0 }, "hitboxes": [], "POIs": [] }, { "className": "Frame", "rect": { "className": "Rect", "topLeftPoint": { "className": "Point", "x": 214, "y": 396 }, "botRightPoint": { "className": "Point", "x": 243, "y": 430 } }, "duration": 0.04, "offset": { "className": "Point", "x": 0, "y": 0 }, "hitboxes": [], "POIs": [] }, { "className": "Frame", "rect": { "className": "Rect", "topLeftPoint": { "className": "Point", "x": 247, "y": 386 }, "botRightPoint": { "className": "Point", "x": 279, "y": 434 } }, "duration": 0.04, "offset": { "className": "Point", "x": 0, "y": 0 }, "hitboxes": [], "POIs": [] }, { "className": "Frame", "rect": { "className": "Rect", "topLeftPoint": { "className": "Point", "x": 282, "y": 396 }, "botRightPoint": { "className": "Point", "x": 311, "y": 430 } }, "duration": 0.04, "offset": { "className": "Point", "x": 0, "y": 0 }, "hitboxes": [], "POIs": [] }, { "className": "Frame", "rect": { "className": "Rect", "topLeftPoint": { "className": "Point", "x": 316, "y": 396 }, "botRightPoint": { "className": "Point", "x": 345, "y": 430 } }, "duration": 0.04, "offset": { "className": "Point", "x": 0, "y": 0 }, "hitboxes": [], "POIs": [] }, { "className": "Frame", "rect": { "className": "Rect", "topLeftPoint": { "className": "Point", "x": 348, "y": 394 }, "botRightPoint": { "className": "Point", "x": 374, "y": 430 } }, "duration": 0.04, "offset": { "className": "Point", "x": 0, "y": 0 }, "hitboxes": [], "POIs": [] }], "POIs": [], "name": "mmx_hurt", "path": "assets/sprites/mmx_hurt.json", "alignment": "botmid", "wrapMode": "once", "spritesheetPath": "assets/spritesheets/MegamanX.png" }, { "className": "Sprite", "hitboxes": [], "frames": [{ "className": "Frame", "rect": { "className": "Rect", "topLeftPoint": { "className": "Point", "x": 302, "y": 16 }, "botRightPoint": { "className": "Point", "x": 332, "y": 50 } }, "duration": 0.066, "offset": { "className": "Point", "x": 0, "y": 0 }, "hitboxes": [], "POIs": [] }], "POIs": [], "name": "mmx_idle", "path": "assets/sprites/mmx_idle.json", "alignment": "botmid", "wrapMode": "loop", "spritesheetPath": "assets/spritesheets/MegamanX.png" }, { "className": "Sprite", "hitboxes": [], "frames": [{ "className": "Frame", "rect": { "className": "Rect", "topLeftPoint": { "className": "Point", "x": 181, "y": 62 }, "botRightPoint": { "className": "Point", "x": 205, "y": 99 } }, "duration": 0.08, "offset": { "className": "Point", "x": 4, "y": 0 }, "hitboxes": [], "POIs": [] }, { "className": "Frame", "rect": { "className": "Rect", "topLeftPoint": { "className": "Point", "x": 210, "y": 58 }, "botRightPoint": { "className": "Point", "x": 225, "y": 99 } }, "duration": 0.08, "offset": { "className": "Point", "x": 4, "y": 0 }, "hitboxes": [], "POIs": [] }, { "className": "Frame", "rect": { "className": "Rect", "topLeftPoint": { "className": "Point", "x": 231, "y": 53 }, "botRightPoint": { "className": "Point", "x": 250, "y": 99 } }, "duration": 0.08, "offset": { "className": "Point", "x": 3, "y": 0 }, "hitboxes": [], "POIs": [] }], "POIs": [], "name": "mmx_jump", "path": "assets/sprites/mmx_jump.json", "alignment": "botmid", "wrapMode": "once", "spritesheetPath": "assets/spritesheets/MegamanX.png" }, { "className": "Sprite", "hitboxes": [], "frames": [{ "className": "Frame", "rect": { "className": "Rect", "topLeftPoint": { "className": "Point", "x": 45, "y": 151 }, "botRightPoint": { "className": "Point", "x": 74, "y": 188 } }, "duration": 0.08, "offset": { "className": "Point", "x": 6, "y": 0 }, "hitboxes": [], "POIs": [{ "className": "POI", "x": 19.80000000000001, "y": -23.19999999999999 }] }, { "className": "Frame", "rect": { "className": "Rect", "topLeftPoint": { "className": "Point", "x": 76, "y": 147 }, "botRightPoint": { "className": "Point", "x": 100, "y": 188 } }, "duration": 0.08, "offset": { "className": "Point", "x": 9, "y": 0 }, "hitboxes": [], "POIs": [{ "className": "POI", "x": 19.600000000000023, "y": -28.399999999999977 }] }, { "className": "Frame", "rect": { "className": "Rect", "topLeftPoint": { "className": "Point", "x": 100, "y": 142 }, "botRightPoint": { "className": "Point", "x": 127, "y": 188 } }, "duration": 0.08, "offset": { "className": "Point", "x": 7, "y": 0 }, "hitboxes": [], "POIs": [{ "className": "POI", "x": 15.800000000000011, "y": -30.399999999999977 }] }], "POIs": [], "name": "mmx_jump_shoot", "path": "assets/sprites/mmx_jump_shoot.json", "alignment": "botmid", "wrapMode": "once", "spritesheetPath": "assets/spritesheets/MegamanX.png" }, { "className": "Sprite", "hitboxes": [], "frames": [{ "className": "Frame", "rect": { "className": "Rect", "topLeftPoint": { "className": "Point", "x": 141, "y": 331 }, "botRightPoint": { "className": "Point", "x": 159, "y": 380 } }, "duration": 0.1, "offset": { "className": "Point", "x": 0, "y": 0 }, "hitboxes": [], "POIs": [] }, { "className": "Frame", "rect": { "className": "Rect", "topLeftPoint": { "className": "Point", "x": 164, "y": 337 }, "botRightPoint": { "className": "Point", "x": 184, "y": 377 } }, "duration": 0.1, "offset": { "className": "Point", "x": 0, "y": 0 }, "hitboxes": [], "POIs": [] }, { "className": "Frame", "rect": { "className": "Rect", "topLeftPoint": { "className": "Point", "x": 188, "y": 337 }, "botRightPoint": { "className": "Point", "x": 208, "y": 377 } }, "duration": 0.1, "offset": { "className": "Point", "x": 0, "y": 0 }, "hitboxes": [], "POIs": [] }, { "className": "Frame", "rect": { "className": "Rect", "topLeftPoint": { "className": "Point", "x": 213, "y": 331 }, "botRightPoint": { "className": "Point", "x": 231, "y": 380 } }, "duration": 0.1, "offset": { "className": "Point", "x": 0, "y": 0 }, "hitboxes": [], "POIs": [] }, { "className": "Frame", "rect": { "className": "Rect", "topLeftPoint": { "className": "Point", "x": 188, "y": 337 }, "botRightPoint": { "className": "Point", "x": 208, "y": 377 } }, "duration": 0.1, "offset": { "className": "Point", "x": 0, "y": 0 }, "hitboxes": [], "POIs": [] }, { "className": "Frame", "rect": { "className": "Rect", "topLeftPoint": { "className": "Point", "x": 164, "y": 337 }, "botRightPoint": { "className": "Point", "x": 184, "y": 377 } }, "duration": 0.1, "offset": { "className": "Point", "x": 0, "y": 0 }, "hitboxes": [], "POIs": [] }], "POIs": [], "name": "mmx_ladder_climb", "path": "sprites/mmx_ladder_climb.json", "alignment": "botmid", "wrapMode": "loop", "spritesheetPath": "assets/spritesheets/MegamanX.png" }, { "className": "Sprite", "hitboxes": [], "frames": [{ "className": "Frame", "rect": { "className": "Rect", "topLeftPoint": { "className": "Point", "x": 285, "y": 331 }, "botRightPoint": { "className": "Point", "x": 311, "y": 379 } }, "duration": 0.066, "offset": { "className": "Point", "x": 4, "y": -1 }, "hitboxes": [], "POIs": [{ "className": "POI", "x": 15.800000000000011, "y": -29.399999999999977 }] }], "POIs": [], "name": "mmx_ladder_shoot", "path": "sprites/mmx_ladder_shoot.json", "alignment": "botmid", "wrapMode": "once", "spritesheetPath": "assets/spritesheets/MegamanX.png" }, { "className": "Sprite", "hitboxes": [], "frames": [{ "className": "Frame", "rect": { "className": "Rect", "topLeftPoint": { "className": "Point", "x": 116, "y": 106 }, "botRightPoint": { "className": "Point", "x": 136, "y": 140 } }, "duration": 0.066, "offset": { "className": "Point", "x": 1, "y": 0 }, "hitboxes": [], "POIs": [] }, { "className": "Frame", "rect": { "className": "Rect", "topLeftPoint": { "className": "Point", "x": 137, "y": 105 }, "botRightPoint": { "className": "Point", "x": 160, "y": 140 } }, "duration": 0.066, "offset": { "className": "Point", "x": -1, "y": 0 }, "hitboxes": [], "POIs": [] }, { "className": "Frame", "rect": { "className": "Rect", "topLeftPoint": { "className": "Point", "x": 160, "y": 106 }, "botRightPoint": { "className": "Point", "x": 192, "y": 140 } }, "duration": 0.066, "offset": { "className": "Point", "x": 0, "y": 0 }, "hitboxes": [], "POIs": [] }, { "className": "Frame", "rect": { "className": "Rect", "topLeftPoint": { "className": "Point", "x": 192, "y": 107 }, "botRightPoint": { "className": "Point", "x": 226, "y": 140 } }, "duration": 0.066, "offset": { "className": "Point", "x": -1, "y": 0 }, "hitboxes": [], "POIs": [] }, { "className": "Frame", "rect": { "className": "Rect", "topLeftPoint": { "className": "Point", "x": 226, "y": 107 }, "botRightPoint": { "className": "Point", "x": 252, "y": 140 } }, "duration": 0.066, "offset": { "className": "Point", "x": -1, "y": 0 }, "hitboxes": [], "POIs": [] }, { "className": "Frame", "rect": { "className": "Rect", "topLeftPoint": { "className": "Point", "x": 255, "y": 106 }, "botRightPoint": { "className": "Point", "x": 277, "y": 140 } }, "duration": 0.066, "offset": { "className": "Point", "x": 0, "y": 0 }, "hitboxes": [], "POIs": [] }, { "className": "Frame", "rect": { "className": "Rect", "topLeftPoint": { "className": "Point", "x": 277, "y": 105 }, "botRightPoint": { "className": "Point", "x": 302, "y": 140 } }, "duration": 0.066, "offset": { "className": "Point", "x": -1, "y": 0 }, "hitboxes": [], "POIs": [] }, { "className": "Frame", "rect": { "className": "Rect", "topLeftPoint": { "className": "Point", "x": 305, "y": 106 }, "botRightPoint": { "className": "Point", "x": 335, "y": 140 } }, "duration": 0.066, "offset": { "className": "Point", "x": 1, "y": 0 }, "hitboxes": [], "POIs": [] }, { "className": "Frame", "rect": { "className": "Rect", "topLeftPoint": { "className": "Point", "x": 336, "y": 107 }, "botRightPoint": { "className": "Point", "x": 370, "y": 140 } }, "duration": 0.066, "offset": { "className": "Point", "x": 0, "y": 0 }, "hitboxes": [], "POIs": [] }, { "className": "Frame", "rect": { "className": "Rect", "topLeftPoint": { "className": "Point", "x": 370, "y": 107 }, "botRightPoint": { "className": "Point", "x": 399, "y": 140 } }, "duration": 0.066, "offset": { "className": "Point", "x": -1, "y": 0 }, "hitboxes": [], "POIs": [] }], "POIs": [], "name": "mmx_run", "path": "assets/sprites/mmx_run.json", "alignment": "botmid", "wrapMode": "loop", "spritesheetPath": "assets/spritesheets/MegamanX.png" }, { "className": "Sprite", "hitboxes": [], "frames": [{ "className": "Frame", "rect": { "className": "Rect", "topLeftPoint": { "className": "Point", "x": 76, "y": 192 }, "botRightPoint": { "className": "Point", "x": 105, "y": 226 } }, "duration": 0.066, "offset": { "className": "Point", "x": 5, "y": 0 }, "hitboxes": [], "POIs": [{ "className": "POI", "x": 18.80000000000001, "y": -20.600000000000023 }] }, { "className": "Frame", "rect": { "className": "Rect", "topLeftPoint": { "className": "Point", "x": 105, "y": 191 }, "botRightPoint": { "className": "Point", "x": 137, "y": 226 } }, "duration": 0.066, "offset": { "className": "Point", "x": 4, "y": 0 }, "hitboxes": [], "POIs": [{ "className": "POI", "x": 18.399999999999977, "y": -22 }] }, { "className": "Frame", "rect": { "className": "Rect", "topLeftPoint": { "className": "Point", "x": 137, "y": 192 }, "botRightPoint": { "className": "Point", "x": 172, "y": 226 } }, "duration": 0.066, "offset": { "className": "Point", "x": 2, "y": 0 }, "hitboxes": [], "POIs": [{ "className": "POI", "x": 18.399999999999977, "y": -20.399999999999977 }] }, { "className": "Frame", "rect": { "className": "Rect", "topLeftPoint": { "className": "Point", "x": 173, "y": 193 }, "botRightPoint": { "className": "Point", "x": 211, "y": 226 } }, "duration": 0.066, "offset": { "className": "Point", "x": 1, "y": 0 }, "hitboxes": [], "POIs": [{ "className": "POI", "x": 18.399999999999977, "y": -19.19999999999999 }] }, { "className": "Frame", "rect": { "className": "Rect", "topLeftPoint": { "className": "Point", "x": 212, "y": 193 }, "botRightPoint": { "className": "Point", "x": 246, "y": 226 } }, "duration": 0.066, "offset": { "className": "Point", "x": 3, "y": 0 }, "hitboxes": [], "POIs": [{ "className": "POI", "x": 18.399999999999977, "y": -19.399999999999977 }] }, { "className": "Frame", "rect": { "className": "Rect", "topLeftPoint": { "className": "Point", "x": 246, "y": 192 }, "botRightPoint": { "className": "Point", "x": 277, "y": 226 } }, "duration": 0.066, "offset": { "className": "Point", "x": 4, "y": 0 }, "hitboxes": [], "POIs": [{ "className": "POI", "x": 18.600000000000023, "y": -20.399999999999977 }] }, { "className": "Frame", "rect": { "className": "Rect", "topLeftPoint": { "className": "Point", "x": 277, "y": 191 }, "botRightPoint": { "className": "Point", "x": 310, "y": 226 } }, "duration": 0.066, "offset": { "className": "Point", "x": 3, "y": 0 }, "hitboxes": [], "POIs": [{ "className": "POI", "x": 19, "y": -21.600000000000023 }] }, { "className": "Frame", "rect": { "className": "Rect", "topLeftPoint": { "className": "Point", "x": 310, "y": 192 }, "botRightPoint": { "className": "Point", "x": 345, "y": 226 } }, "duration": 0.066, "offset": { "className": "Point", "x": 2, "y": 0 }, "hitboxes": [], "POIs": [{ "className": "POI", "x": 18.399999999999977, "y": -20.399999999999977 }] }, { "className": "Frame", "rect": { "className": "Rect", "topLeftPoint": { "className": "Point", "x": 346, "y": 193 }, "botRightPoint": { "className": "Point", "x": 383, "y": 226 } }, "duration": 0.066, "offset": { "className": "Point", "x": 1, "y": 0 }, "hitboxes": [], "POIs": [{ "className": "POI", "x": 18.80000000000001, "y": -19.80000000000001 }] }, { "className": "Frame", "rect": { "className": "Rect", "topLeftPoint": { "className": "Point", "x": 383, "y": 193 }, "botRightPoint": { "className": "Point", "x": 418, "y": 226 } }, "duration": 0.066, "offset": { "className": "Point", "x": 2, "y": 0 }, "hitboxes": [], "POIs": [{ "className": "POI", "x": 18.399999999999977, "y": -19.80000000000001 }] }], "POIs": [], "name": "mmx_run_shoot", "path": "assets/sprites/mmx_run_shoot.json", "alignment": "botmid", "wrapMode": "loop", "spritesheetPath": "assets/spritesheets/MegamanX.png" }, { "className": "Sprite", "hitboxes": [], "frames": [{ "className": "Frame", "rect": { "className": "Rect", "topLeftPoint": { "className": "Point", "x": 112, "y": 65 }, "botRightPoint": { "className": "Point", "x": 142, "y": 99 } }, "duration": 0.066, "offset": { "className": "Point", "x": 0, "y": 0 }, "hitboxes": [], "POIs": [{ "className": "POI", "x": 13.600000000000023, "y": -18.80000000000001, "tags": "bo" }] }, { "className": "Frame", "rect": { "className": "Rect", "topLeftPoint": { "className": "Point", "x": 147, "y": 65 }, "botRightPoint": { "className": "Point", "x": 176, "y": 99 } }, "duration": 0.5, "offset": { "className": "Point", "x": -1, "y": 0 }, "hitboxes": [], "POIs": [{ "className": "POI", "x": 12.800000000000011, "y": -18.19999999999999, "tags": "bo" }] }], "POIs": [], "name": "mmx_shoot", "path": "assets/sprites/mmx_shoot.json", "alignment": "botmid", "wrapMode": "once", "spritesheetPath": "assets/spritesheets/MegamanX.png" }, { "className": "Sprite", "hitboxes": [], "frames": [{ "className": "Frame", "rect": { "className": "Rect", "topLeftPoint": { "className": "Point", "x": 140, "y": 284 }, "botRightPoint": { "className": "Point", "x": 170, "y": 323 } }, "duration": 0.1, "offset": { "className": "Point", "x": 0, "y": 0 }, "hitboxes": [], "POIs": [] }, { "className": "Frame", "rect": { "className": "Rect", "topLeftPoint": { "className": "Point", "x": 170, "y": 279 }, "botRightPoint": { "className": "Point", "x": 197, "y": 323 } }, "duration": 0.1, "offset": { "className": "Point", "x": 0, "y": 0 }, "hitboxes": [], "POIs": [] }], "POIs": [], "name": "mmx_wall_kick", "path": "assets/sprites/mmx_wall_kick.json", "alignment": "botmid", "wrapMode": "once", "spritesheetPath": "assets/spritesheets/MegamanX.png" }, { "className": "Sprite", "hitboxes": [], "frames": [{ "className": "Frame", "rect": { "className": "Rect", "topLeftPoint": { "className": "Point", "x": 309, "y": 284 }, "botRightPoint": { "className": "Point", "x": 340, "y": 323 } }, "duration": 0.1, "offset": { "className": "Point", "x": 0, "y": 1 }, "hitboxes": [], "POIs": [{ "className": "POI", "x": 14.800000000000011, "y": -26.19999999999999 }] }, { "className": "Frame", "rect": { "className": "Rect", "topLeftPoint": { "className": "Point", "x": 342, "y": 283 }, "botRightPoint": { "className": "Point", "x": 375, "y": 322 } }, "duration": 0.1, "offset": { "className": "Point", "x": -1, "y": 1 }, "hitboxes": [], "POIs": [{ "className": "POI", "x": 14.600000000000023, "y": -25.80000000000001 }] }, { "className": "Frame", "rect": { "className": "Rect", "topLeftPoint": { "className": "Point", "x": 342, "y": 283 }, "botRightPoint": { "className": "Point", "x": 375, "y": 322 } }, "duration": 0.1, "offset": { "className": "Point", "x": -1, "y": 1 }, "hitboxes": [], "POIs": [{ "className": "POI", "x": 14.800000000000011, "y": -26 }] }], "POIs": [], "name": "mmx_wall_kick_shoot", "path": "assets/sprites/mmx_wall_kick_shoot.json", "alignment": "botmid", "wrapMode": "once", "spritesheetPath": "assets/spritesheets/MegamanX.png" }, { "className": "Sprite", "hitboxes": [], "frames": [{ "className": "Frame", "rect": { "className": "Rect", "topLeftPoint": { "className": "Point", "x": 51, "y": 281 }, "botRightPoint": { "className": "Point", "x": 76, "y": 323 } }, "duration": 0.1, "offset": { "className": "Point", "x": 0, "y": 0 }, "hitboxes": [], "POIs": [] }, { "className": "Frame", "rect": { "className": "Rect", "topLeftPoint": { "className": "Point", "x": 78, "y": 280 }, "botRightPoint": { "className": "Point", "x": 105, "y": 323 } }, "duration": 0.1, "offset": { "className": "Point", "x": 0, "y": 0 }, "hitboxes": [], "POIs": [] }, { "className": "Frame", "rect": { "className": "Rect", "topLeftPoint": { "className": "Point", "x": 107, "y": 281 }, "botRightPoint": { "className": "Point", "x": 135, "y": 323 } }, "duration": 0.1, "offset": { "className": "Point", "x": 0, "y": 0 }, "hitboxes": [], "POIs": [] }], "POIs": [], "name": "mmx_wall_slide", "path": "assets/sprites/mmx_wall_slide.json", "alignment": "botmid", "wrapMode": "once", "spritesheetPath": "assets/spritesheets/MegamanX.png" }, { "className": "Sprite", "hitboxes": [], "frames": [{ "className": "Frame", "rect": { "className": "Rect", "topLeftPoint": { "className": "Point", "x": 235, "y": 281 }, "botRightPoint": { "className": "Point", "x": 267, "y": 324 } }, "duration": 0.1, "offset": { "className": "Point", "x": -4, "y": 1 }, "hitboxes": [], "POIs": [{ "className": "POI", "x": -15.600000000000023, "y": -23.399999999999977 }] }, { "className": "Frame", "rect": { "className": "Rect", "topLeftPoint": { "className": "Point", "x": 273, "y": 280 }, "botRightPoint": { "className": "Point", "x": 305, "y": 322 } }, "duration": 0.1, "offset": { "className": "Point", "x": -2, "y": 0 }, "hitboxes": [], "POIs": [{ "className": "POI", "x": -14.199999999999989, "y": -21.600000000000023 }] }], "POIs": [], "name": "mmx_wall_slide_shoot", "path": "assets/sprites/mmx_wall_slide_shoot.json", "alignment": "botmid", "wrapMode": "once", "spritesheetPath": "assets/spritesheets/MegamanX.png" }, { "className": "Sprite", "hitboxes": [{ "className": "Hitbox", "tags": "", "width": 31, "height": 30, "offset": { "className": "Point", "x": 0, "y": 0 }, "rect": { "className": "Rect", "topLeftPoint": { "className": "Point", "x": 334.5, "y": 285 }, "botRightPoint": { "className": "Point", "x": 365.5, "y": 315 } } }], "frames": [{ "className": "Frame", "rect": { "className": "Rect", "topLeftPoint": { "className": "Point", "x": 159, "y": 842 }, "botRightPoint": { "className": "Point", "x": 190, "y": 872 } }, "duration": 0.03, "offset": { "className": "Point", "x": 0, "y": 0 }, "hitboxes": [], "POIs": [] }, { "className": "Frame", "rect": { "className": "Rect", "topLeftPoint": { "className": "Point", "x": 126, "y": 842 }, "botRightPoint": { "className": "Point", "x": 157, "y": 872 } }, "duration": 0.03, "offset": { "className": "Point", "x": 0, "y": 0 }, "hitboxes": [], "POIs": [] }, { "className": "Frame", "rect": { "className": "Rect", "topLeftPoint": { "className": "Point", "x": 93, "y": 842 }, "botRightPoint": { "className": "Point", "x": 124, "y": 872 } }, "duration": 0.03, "offset": { "className": "Point", "x": 0, "y": 0 }, "hitboxes": [], "POIs": [] }, { "className": "Frame", "rect": { "className": "Rect", "topLeftPoint": { "className": "Point", "x": 60, "y": 842 }, "botRightPoint": { "className": "Point", "x": 91, "y": 872 } }, "duration": 0.03, "offset": { "className": "Point", "x": 0, "y": 0 }, "hitboxes": [], "POIs": [] }], "POIs": [], "name": "rolling_shield", "path": "assets/sprites/rolling_shield.json", "alignment": "center", "wrapMode": "loop", "spritesheetPath": "assets/spritesheets/effects.png" }, { "className": "Sprite", "hitboxes": [], "frames": [{ "className": "Frame", "rect": { "className": "Rect", "topLeftPoint": { "className": "Point", "x": 194, "y": 849 }, "botRightPoint": { "className": "Point", "x": 209, "y": 865 } }, "duration": 0.03, "offset": { "className": "Point", "x": 0, "y": 0 }, "hitboxes": [], "POIs": [] }, { "className": "Frame", "rect": { "className": "Rect", "topLeftPoint": { "className": "Point", "x": 213, "y": 855 }, "botRightPoint": { "className": "Point", "x": 217, "y": 859 } }, "duration": 0.03, "offset": { "className": "Point", "x": 0, "y": 0 }, "hitboxes": [], "POIs": [] }], "POIs": [], "name": "rolling_shield_muzzle", "path": "assets/sprites/rolling_shield_muzzle.json", "alignment": "center", "wrapMode": "once", "spritesheetPath": "assets/spritesheets/effects.png" }, { "className": "Sprite", "hitboxes": [{ "className": "Hitbox", "tags": "", "width": 13, "height": 13, "offset": { "className": "Point", "x": 0, "y": 0 }, "rect": { "className": "Rect", "topLeftPoint": { "className": "Point", "x": 343.5, "y": 293.5 }, "botRightPoint": { "className": "Point", "x": 356.5, "y": 306.5 } }, "isTrigger": true }], "frames": [{ "className": "Frame", "rect": { "className": "Rect", "topLeftPoint": { "className": "Point", "x": 368, "y": 958 }, "botRightPoint": { "className": "Point", "x": 381, "y": 971 } }, "duration": 0.066, "offset": { "className": "Point", "x": 0, "y": 0 }, "hitboxes": [], "POIs": [] }], "POIs": [], "name": "shotgun_ice", "path": "assets/sprites/shotgun_ice.json", "alignment": "center", "wrapMode": "once", "spritesheetPath": "assets/spritesheets/effects.png" }, { "className": "Sprite", "hitboxes": [{ "className": "Hitbox", "tags": "", "width": 7, "height": 7, "offset": { "className": "Point", "x": 0, "y": 0 }, "rect": { "className": "Rect", "topLeftPoint": { "className": "Point", "x": 346.5, "y": 296.5 }, "botRightPoint": { "className": "Point", "x": 353.5, "y": 303.5 } }, "isTrigger": true }], "frames": [{ "className": "Frame", "rect": { "className": "Rect", "topLeftPoint": { "className": "Point", "x": 426, "y": 961 }, "botRightPoint": { "className": "Point", "x": 433, "y": 968 } }, "duration": 0.066, "offset": { "className": "Point", "x": 0, "y": 0 }, "hitboxes": [], "POIs": [] }], "POIs": [], "name": "shotgun_ice_piece", "path": "assets/sprites/shotgun_ice_piece.json", "alignment": "center", "wrapMode": "once", "spritesheetPath": "assets/spritesheets/effects.png" }, { "className": "Sprite", "hitboxes": [], "frames": [{ "className": "Frame", "rect": { "className": "Rect", "topLeftPoint": { "className": "Point", "x": 385, "y": 961 }, "botRightPoint": { "className": "Point", "x": 393, "y": 968 } }, "duration": 0.03, "offset": { "className": "Point", "x": 0, "y": 0 }, "hitboxes": [], "POIs": [] }, { "className": "Frame", "rect": { "className": "Rect", "topLeftPoint": { "className": "Point", "x": 395, "y": 962 }, "botRightPoint": { "className": "Point", "x": 403, "y": 969 } }, "duration": 0.03, "offset": { "className": "Point", "x": 0, "y": 0 }, "hitboxes": [], "POIs": [] }, { "className": "Frame", "rect": { "className": "Rect", "topLeftPoint": { "className": "Point", "x": 405, "y": 963 }, "botRightPoint": { "className": "Point", "x": 413, "y": 968 } }, "duration": 0.03, "offset": { "className": "Point", "x": 0, "y": 0 }, "hitboxes": [], "POIs": [] }, { "className": "Frame", "rect": { "className": "Rect", "topLeftPoint": { "className": "Point", "x": 415, "y": 963 }, "botRightPoint": { "className": "Point", "x": 422, "y": 968 } }, "duration": 0.03, "offset": { "className": "Point", "x": 0, "y": 0 }, "hitboxes": [], "POIs": [] }], "POIs": [], "name": "shotgun_ice_sparkles", "path": "assets/sprites/shotgun_ice_sparkles.json", "alignment": "center", "wrapMode": "once", "spritesheetPath": "assets/spritesheets/effects.png" }, { "className": "Sprite", "hitboxes": [{ "className": "Hitbox", "tags": "", "width": 32, "height": 5, "offset": { "className": "Point", "x": 0, "y": 0 }, "rect": { "className": "Rect", "topLeftPoint": { "className": "Point", "x": 334, "y": 297.5 }, "botRightPoint": { "className": "Point", "x": 366, "y": 302.5 } }, "isTrigger": true }], "frames": [{ "className": "Frame", "rect": { "className": "Rect", "topLeftPoint": { "className": "Point", "x": 415, "y": 796 }, "botRightPoint": { "className": "Point", "x": 447, "y": 801 } }, "duration": 0.066, "offset": { "className": "Point", "x": 0, "y": 0 }, "hitboxes": [], "POIs": [] }], "POIs": [], "name": "sting_flat", "path": "assets/sprites/sting_flat.json", "alignment": "center", "wrapMode": "once", "spritesheetPath": "assets/spritesheets/effects.png" }, { "className": "Sprite", "hitboxes": [{ "className": "Hitbox", "tags": "", "width": 20, "height": 5, "offset": { "className": "Point", "x": 0, "y": 0 }, "rect": { "className": "Rect", "topLeftPoint": { "className": "Point", "x": 340, "y": 297.5 }, "botRightPoint": { "className": "Point", "x": 360, "y": 302.5 } }, "isTrigger": true }], "frames": [{ "className": "Frame", "rect": { "className": "Rect", "topLeftPoint": { "className": "Point", "x": 415, "y": 796 }, "botRightPoint": { "className": "Point", "x": 447, "y": 801 } }, "duration": 0.1, "offset": { "className": "Point", "x": -1, "y": 0 }, "hitboxes": [], "POIs": [] }, { "className": "Frame", "rect": { "className": "Rect", "topLeftPoint": { "className": "Point", "x": 451, "y": 783 }, "botRightPoint": { "className": "Point", "x": 483, "y": 815 } }, "duration": 0.03, "offset": { "className": "Point", "x": 0, "y": 0 }, "hitboxes": [], "POIs": [] }, { "className": "Frame", "rect": { "className": "Rect", "topLeftPoint": { "className": "Point", "x": 487, "y": 785 }, "botRightPoint": { "className": "Point", "x": 515, "y": 813 } }, "duration": 0.03, "offset": { "className": "Point", "x": 0, "y": 0 }, "hitboxes": [], "POIs": [] }, { "className": "Frame", "rect": { "className": "Rect", "topLeftPoint": { "className": "Point", "x": 519, "y": 791 }, "botRightPoint": { "className": "Point", "x": 535, "y": 807 } }, "duration": 0.03, "offset": { "className": "Point", "x": 0, "y": 0 }, "hitboxes": [], "POIs": [] }, { "className": "Frame", "rect": { "className": "Rect", "topLeftPoint": { "className": "Point", "x": 539, "y": 792 }, "botRightPoint": { "className": "Point", "x": 553, "y": 806 } }, "duration": 0.03, "offset": { "className": "Point", "x": 0, "y": 0 }, "hitboxes": [], "POIs": [] }, { "className": "Frame", "rect": { "className": "Rect", "topLeftPoint": { "className": "Point", "x": 557, "y": 794 }, "botRightPoint": { "className": "Point", "x": 567, "y": 804 } }, "duration": 0.03, "offset": { "className": "Point", "x": 0, "y": 0 }, "hitboxes": [], "POIs": [] }], "POIs": [], "name": "sting_start", "path": "assets/sprites/sting_start.json", "alignment": "center", "wrapMode": "once", "spritesheetPath": "assets/spritesheets/effects.png" }, { "className": "Sprite", "hitboxes": [{ "className": "Hitbox", "tags": "", "width": 28, "height": 15, "offset": { "className": "Point", "x": 0, "y": 0 }, "rect": { "className": "Rect", "topLeftPoint": { "className": "Point", "x": 336, "y": 292.5 }, "botRightPoint": { "className": "Point", "x": 364, "y": 307.5 } }, "isTrigger": true }], "frames": [{ "className": "Frame", "rect": { "className": "Rect", "topLeftPoint": { "className": "Point", "x": 383, "y": 791 }, "botRightPoint": { "className": "Point", "x": 411, "y": 806 } }, "duration": 0.066, "offset": { "className": "Point", "x": 0, "y": 0 }, "hitboxes": [], "POIs": [] }], "POIs": [], "name": "sting_up", "path": "assets/sprites/sting_up.json", "alignment": "center", "wrapMode": "once", "spritesheetPath": "assets/spritesheets/effects.png" }, { "className": "Sprite", "hitboxes": [], "frames": [{ "className": "Frame", "rect": { "className": "Rect", "topLeftPoint": { "className": "Point", "x": 359, "y": 904 }, "botRightPoint": { "className": "Point", "x": 373, "y": 921 } }, "duration": 0.03, "offset": { "className": "Point", "x": 0, "y": 0 }, "hitboxes": [], "POIs": [] }, { "className": "Frame", "rect": { "className": "Rect", "topLeftPoint": { "className": "Point", "x": 435, "y": 898 }, "botRightPoint": { "className": "Point", "x": 449, "y": 927 } }, "duration": 0.03, "offset": { "className": "Point", "x": 0, "y": 0 }, "hitboxes": [], "POIs": [] }, { "className": "Frame", "rect": { "className": "Rect", "topLeftPoint": { "className": "Point", "x": 509, "y": 897 }, "botRightPoint": { "className": "Point", "x": 524, "y": 928 } }, "duration": 0.03, "offset": { "className": "Point", "x": 0, "y": 0 }, "hitboxes": [], "POIs": [] }, { "className": "Frame", "rect": { "className": "Rect", "topLeftPoint": { "className": "Point", "x": 597, "y": 903 }, "botRightPoint": { "className": "Point", "x": 621, "y": 919 } }, "duration": 0.03, "offset": { "className": "Point", "x": 0, "y": 0 }, "hitboxes": [], "POIs": [] }], "POIs": [], "name": "tornado_end", "path": "assets/sprites/tornado_end.json", "alignment": "midleft", "wrapMode": "loop", "spritesheetPath": "assets/spritesheets/effects.png" }, { "className": "Sprite", "hitboxes": [], "frames": [{ "className": "Frame", "rect": { "className": "Rect", "topLeftPoint": { "className": "Point", "x": 334, "y": 904 }, "botRightPoint": { "className": "Point", "x": 350, "y": 921 } }, "duration": 0.03, "offset": { "className": "Point", "x": 0, "y": 0 }, "hitboxes": [], "POIs": [] }, { "className": "Frame", "rect": { "className": "Rect", "topLeftPoint": { "className": "Point", "x": 409, "y": 898 }, "botRightPoint": { "className": "Point", "x": 425, "y": 926 } }, "duration": 0.03, "offset": { "className": "Point", "x": 0, "y": 0 }, "hitboxes": [], "POIs": [] }, { "className": "Frame", "rect": { "className": "Rect", "topLeftPoint": { "className": "Point", "x": 477, "y": 897 }, "botRightPoint": { "className": "Point", "x": 493, "y": 928 } }, "duration": 0.03, "offset": { "className": "Point", "x": 0, "y": 0 }, "hitboxes": [], "POIs": [] }, { "className": "Frame", "rect": { "className": "Rect", "topLeftPoint": { "className": "Point", "x": 563, "y": 903 }, "botRightPoint": { "className": "Point", "x": 579, "y": 919 } }, "duration": 0.03, "offset": { "className": "Point", "x": 0, "y": 0 }, "hitboxes": [], "POIs": [] }], "POIs": [], "name": "tornado_mid", "path": "assets/sprites/tornado_mid.json", "alignment": "midleft", "wrapMode": "loop", "spritesheetPath": "assets/spritesheets/effects.png" }, { "className": "Sprite", "hitboxes": [], "frames": [{ "className": "Frame", "rect": { "className": "Rect", "topLeftPoint": { "className": "Point", "x": 313, "y": 904 }, "botRightPoint": { "className": "Point", "x": 325, "y": 920 } }, "duration": 0.03, "offset": { "className": "Point", "x": 0, "y": 0 }, "hitboxes": [], "POIs": [] }, { "className": "Frame", "rect": { "className": "Rect", "topLeftPoint": { "className": "Point", "x": 388, "y": 899 }, "botRightPoint": { "className": "Point", "x": 396, "y": 925 } }, "duration": 0.03, "offset": { "className": "Point", "x": 0, "y": 0 }, "hitboxes": [], "POIs": [] }, { "className": "Frame", "rect": { "className": "Rect", "topLeftPoint": { "className": "Point", "x": 462, "y": 898 }, "botRightPoint": { "className": "Point", "x": 468, "y": 928 } }, "duration": 0.03, "offset": { "className": "Point", "x": 0, "y": 0 }, "hitboxes": [], "POIs": [] }, { "className": "Frame", "rect": { "className": "Rect", "topLeftPoint": { "className": "Point", "x": 544, "y": 903 }, "botRightPoint": { "className": "Point", "x": 551, "y": 919 } }, "duration": 0.03, "offset": { "className": "Point", "x": 0, "y": 0 }, "hitboxes": [], "POIs": [] }], "POIs": [], "name": "tornado_start", "path": "assets/sprites/tornado_start.json", "alignment": "midright", "wrapMode": "loop", "spritesheetPath": "assets/spritesheets/effects.png" }, { "className": "Sprite", "hitboxes": [{ "className": "Hitbox", "tags": "", "width": 12, "height": 12, "offset": { "className": "Point", "x": 0, "y": 0 }, "rect": { "className": "Rect", "topLeftPoint": { "className": "Point", "x": 344, "y": 294 }, "botRightPoint": { "className": "Point", "x": 356, "y": 306 } }, "isTrigger": true }], "frames": [{ "className": "Frame", "rect": { "className": "Rect", "topLeftPoint": { "className": "Point", "x": 217, "y": 794 }, "botRightPoint": { "className": "Point", "x": 233, "y": 804 } }, "duration": 0.066, "offset": { "className": "Point", "x": 0, "y": 0 }, "hitboxes": [], "POIs": [] }, { "className": "Frame", "rect": { "className": "Rect", "topLeftPoint": { "className": "Point", "x": 235, "y": 793 }, "botRightPoint": { "className": "Point", "x": 251, "y": 806 } }, "duration": 0.066, "offset": { "className": "Point", "x": 0, "y": 0 }, "hitboxes": [], "POIs": [] }, { "className": "Frame", "rect": { "className": "Rect", "topLeftPoint": { "className": "Point", "x": 253, "y": 792 }, "botRightPoint": { "className": "Point", "x": 268, "y": 807 } }, "duration": 0.066, "offset": { "className": "Point", "x": 0, "y": 0 }, "hitboxes": [], "POIs": [] }, { "className": "Frame", "rect": { "className": "Rect", "topLeftPoint": { "className": "Point", "x": 272, "y": 791 }, "botRightPoint": { "className": "Point", "x": 285, "y": 807 } }, "duration": 0.066, "offset": { "className": "Point", "x": 0, "y": 0 }, "hitboxes": [], "POIs": [] }, { "className": "Frame", "rect": { "className": "Rect", "topLeftPoint": { "className": "Point", "x": 292, "y": 791 }, "botRightPoint": { "className": "Point", "x": 302, "y": 807 } }, "duration": 0.066, "offset": { "className": "Point", "x": 0, "y": -1 }, "hitboxes": [], "POIs": [] }], "POIs": [], "name": "torpedo", "path": "assets/sprites/torpedo.json", "alignment": "center", "wrapMode": "once", "spritesheetPath": "assets/spritesheets/effects.png" }, { "className": "Sprite", "hitboxes": [], "frames": [{ "className": "Frame", "rect": { "className": "Rect", "topLeftPoint": { "className": "Point", "x": 317, "y": 815 }, "botRightPoint": { "className": "Point", "x": 325, "y": 823 } }, "duration": 0.03, "offset": { "className": "Point", "x": 0, "y": 0 }, "hitboxes": [], "POIs": [] }, { "className": "Frame", "rect": { "className": "Rect", "topLeftPoint": { "className": "Point", "x": 332, "y": 815 }, "botRightPoint": { "className": "Point", "x": 339, "y": 823 } }, "duration": 0.03, "offset": { "className": "Point", "x": 0, "y": 0 }, "hitboxes": [], "POIs": [] }, { "className": "Frame", "rect": { "className": "Rect", "topLeftPoint": { "className": "Point", "x": 346, "y": 815 }, "botRightPoint": { "className": "Point", "x": 352, "y": 822 } }, "duration": 0.03, "offset": { "className": "Point", "x": 0, "y": 0 }, "hitboxes": [], "POIs": [] }, { "className": "Frame", "rect": { "className": "Rect", "topLeftPoint": { "className": "Point", "x": 356, "y": 816 }, "botRightPoint": { "className": "Point", "x": 360, "y": 821 } }, "duration": 0.03, "offset": { "className": "Point", "x": 0, "y": 0 }, "hitboxes": [], "POIs": [] }], "POIs": [], "name": "torpedo_smoke", "path": "assets/sprites/torpedo_smoke.json", "alignment": "center", "wrapMode": "once", "spritesheetPath": "assets/spritesheets/effects.png" }, { "className": "Sprite", "hitboxes": [], "frames": [{ "className": "Frame", "rect": { "className": "Rect", "topLeftPoint": { "className": "Point", "x": 137, "y": 250 }, "botRightPoint": { "className": "Point", "x": 149, "y": 262 } }, "duration": 0.1, "offset": { "className": "Point", "x": 0, "y": 0 }, "hitboxes": [], "POIs": [] }], "POIs": [], "name": "wall_sparks", "path": "assets/sprites/wall_sparks.json", "alignment": "center", "wrapMode": "once", "spritesheetPath": "assets/spritesheets/effects.png" }];
            exports_19("spriteJsons", spriteJsons);
        }
    };
});
System.register("levels", [], function (exports_20, context_20) {
    "use strict";
    var __moduleName = context_20 && context_20.id;
    var levelJsons;
    return {
        setters: [],
        execute: function () {
            levelJsons = [{ "className": "Level", "instances": [{ "className": "ShapeInstance", "name": "Collision Shape", "objectName": "Collision Shape", "points": [{ "className": "Point", "x": -10.769230769230774, "y": 416.36538461538464, "perc_from_left": 0, "perc_from_right": 1, "perc_from_top": 0, "perc_from_bottom": 1 }, { "className": "Point", "x": 1141.2307692307693, "y": 416.36538461538464, "perc_from_left": 1, "perc_from_right": 0, "perc_from_top": 0, "perc_from_bottom": 1 }, { "className": "Point", "x": 1141.2307692307693, "y": 432.36538461538464, "perc_from_left": 1, "perc_from_right": 0, "perc_from_top": 1, "perc_from_bottom": 0 }, { "className": "Point", "x": -10.769230769230774, "y": 432.36538461538464, "perc_from_left": 0, "perc_from_right": 1, "perc_from_top": 1, "perc_from_bottom": 0 }] }, { "className": "ShapeInstance", "name": "Collision Shape", "objectName": "Collision Shape", "points": [{ "className": "Point", "x": 569, "y": 287, "perc_from_left": 0, "perc_from_right": 1, "perc_from_top": 0, "perc_from_bottom": 1 }, { "className": "Point", "x": 907, "y": 287, "perc_from_left": 1, "perc_from_right": 0, "perc_from_top": 0, "perc_from_bottom": 1 }, { "className": "Point", "x": 907, "y": 302, "perc_from_left": 1, "perc_from_right": 0, "perc_from_top": 1, "perc_from_bottom": 0 }, { "className": "Point", "x": 569, "y": 302, "perc_from_left": 0, "perc_from_right": 1, "perc_from_top": 1, "perc_from_bottom": 0 }] }, { "className": "ShapeInstance", "name": "Collision Shape", "objectName": "Collision Shape", "points": [{ "className": "Point", "x": 1, "y": 33, "perc_from_left": 0, "perc_from_right": 1, "perc_from_top": 0, "perc_from_bottom": 1 }, { "className": "Point", "x": 1185, "y": 33, "perc_from_left": 1, "perc_from_right": 0, "perc_from_top": 0, "perc_from_bottom": 1 }, { "className": "Point", "x": 1185, "y": 67, "perc_from_left": 1, "perc_from_right": 0, "perc_from_top": 1, "perc_from_bottom": 0 }, { "className": "Point", "x": 1, "y": 67, "perc_from_left": 0, "perc_from_right": 1, "perc_from_top": 1, "perc_from_bottom": 0 }] }, { "className": "ShapeInstance", "name": "Collision Shape", "objectName": "Collision Shape", "points": [{ "className": "Point", "x": 255, "y": 66, "perc_from_left": 0, "perc_from_right": 1, "perc_from_top": 0, "perc_from_bottom": 1 }, { "className": "Point", "x": 289, "y": 66, "perc_from_left": 1, "perc_from_right": 0, "perc_from_top": 0, "perc_from_bottom": 1 }, { "className": "Point", "x": 289, "y": 300, "perc_from_left": 1, "perc_from_right": 0, "perc_from_top": 1, "perc_from_bottom": 0 }, { "className": "Point", "x": 255, "y": 300, "perc_from_left": 0, "perc_from_right": 1, "perc_from_top": 1, "perc_from_bottom": 0 }] }, { "className": "ShapeInstance", "name": "Collision Shape", "objectName": "Collision Shape", "points": [{ "className": "Point", "x": 448, "y": 296, "perc_from_left": 0, "perc_from_right": 1, "perc_from_top": 0, "perc_from_bottom": 1 }, { "className": "Point", "x": 481, "y": 296, "perc_from_left": 1, "perc_from_right": 0, "perc_from_top": 0, "perc_from_bottom": 1 }, { "className": "Point", "x": 481, "y": 425, "perc_from_left": 1, "perc_from_right": 0, "perc_from_top": 1, "perc_from_bottom": 0 }, { "className": "Point", "x": 448, "y": 425, "perc_from_left": 0, "perc_from_right": 1, "perc_from_top": 1, "perc_from_bottom": 0 }] }, { "className": "ShapeInstance", "name": "Collision Shape", "objectName": "Collision Shape", "points": [{ "className": "Point", "x": 677, "y": 160, "perc_from_left": 0, "perc_from_right": 1, "perc_from_top": 0, "perc_from_bottom": 1 }, { "className": "Point", "x": 763, "y": 160, "perc_from_left": 1, "perc_from_right": 0, "perc_from_top": 0, "perc_from_bottom": 1 }, { "className": "Point", "x": 763, "y": 177, "perc_from_left": 1, "perc_from_right": 0, "perc_from_top": 1, "perc_from_bottom": 0 }, { "className": "Point", "x": 677, "y": 177, "perc_from_left": 0, "perc_from_right": 1, "perc_from_top": 1, "perc_from_bottom": 0 }] }, { "className": "ShapeInstance", "name": "Collision Shape", "objectName": "Collision Shape", "points": [{ "className": "Point", "x": 1183, "y": 28, "perc_from_left": 0, "perc_from_right": 1, "perc_from_top": 0, "perc_from_bottom": 1 }, { "className": "Point", "x": 1312, "y": 28, "perc_from_left": 1, "perc_from_right": 0, "perc_from_top": 0, "perc_from_bottom": 1 }, { "className": "Point", "x": 1312, "y": 129, "perc_from_left": 1, "perc_from_right": 0, "perc_from_top": 1, "perc_from_bottom": 0 }, { "className": "Point", "x": 1183, "y": 129, "perc_from_left": 0, "perc_from_right": 1, "perc_from_top": 1, "perc_from_bottom": 0 }] }, { "className": "ShapeInstance", "name": "Collision Shape", "objectName": "Collision Shape", "points": [{ "className": "Point", "x": 833, "y": 174, "perc_from_left": 0, "perc_from_right": 1, "perc_from_top": 0, "perc_from_bottom": 1 }, { "className": "Point", "x": 863, "y": 174, "perc_from_left": 1, "perc_from_right": 0, "perc_from_top": 0, "perc_from_bottom": 1 }, { "className": "Point", "x": 863, "y": 297, "perc_from_left": 1, "perc_from_right": 0, "perc_from_top": 1, "perc_from_bottom": 0 }, { "className": "Point", "x": 833, "y": 297, "perc_from_left": 0, "perc_from_right": 1, "perc_from_top": 1, "perc_from_bottom": 0 }] }, { "className": "ShapeInstance", "name": "Collision Shape", "objectName": "Collision Shape", "points": [{ "className": "Point", "x": 704, "y": 55, "perc_from_left": 0, "perc_from_right": 1, "perc_from_top": 0, "perc_from_bottom": 1 }, { "className": "Point", "x": 736, "y": 55, "perc_from_left": 1, "perc_from_right": 0, "perc_from_top": 0, "perc_from_bottom": 1 }, { "className": "Point", "x": 736, "y": 170, "perc_from_left": 1, "perc_from_right": 0, "perc_from_top": 1, "perc_from_bottom": 0 }, { "className": "Point", "x": 704, "y": 170, "perc_from_left": 0, "perc_from_right": 1, "perc_from_top": 1, "perc_from_bottom": 0 }] }, { "className": "ShapeInstance", "name": "Collision Shape", "objectName": "Collision Shape", "points": [{ "className": "Point", "x": 960, "y": 303, "perc_from_left": 0, "perc_from_right": 1, "perc_from_top": 0, "perc_from_bottom": 1 }, { "className": "Point", "x": 990, "y": 303, "perc_from_left": 1, "perc_from_right": 0, "perc_from_top": 0, "perc_from_bottom": 1 }, { "className": "Point", "x": 990, "y": 429, "perc_from_left": 1, "perc_from_right": 0, "perc_from_top": 1, "perc_from_bottom": 0 }, { "className": "Point", "x": 960, "y": 429, "perc_from_left": 0, "perc_from_right": 1, "perc_from_top": 1, "perc_from_bottom": 0 }] }, { "className": "ShapeInstance", "name": "Collision Shape", "objectName": "Collision Shape", "points": [{ "className": "Point", "x": 1152, "y": 161, "perc_from_left": 0, "perc_from_right": 1, "perc_from_top": 0, "perc_from_bottom": 1 }, { "className": "Point", "x": 1306, "y": 161, "perc_from_left": 1, "perc_from_right": 0, "perc_from_top": 0, "perc_from_bottom": 1 }, { "className": "Point", "x": 1306, "y": 513, "perc_from_left": 1, "perc_from_right": 0, "perc_from_top": 1, "perc_from_bottom": 0 }, { "className": "Point", "x": 1152, "y": 513, "perc_from_left": 0, "perc_from_right": 1, "perc_from_top": 1, "perc_from_bottom": 0 }] }, { "className": "ShapeInstance", "name": "Collision Shape", "objectName": "Collision Shape", "points": [{ "className": "Point", "x": 607, "y": 171, "perc_from_left": 0, "perc_from_right": 1, "perc_from_top": 0, "perc_from_bottom": 1 }, { "className": "Point", "x": 639, "y": 171, "perc_from_left": 1, "perc_from_right": 0, "perc_from_top": 0, "perc_from_bottom": 1 }, { "className": "Point", "x": 639, "y": 300, "perc_from_left": 1, "perc_from_right": 0, "perc_from_top": 1, "perc_from_bottom": 0 }, { "className": "Point", "x": 607, "y": 300, "perc_from_left": 0, "perc_from_right": 1, "perc_from_top": 1, "perc_from_bottom": 0 }] }, { "className": "Instance", "name": "Spawn Point", "objectName": "Spawn Point", "pos": { "className": "Point", "x": 151, "y": 394 } }, { "className": "Instance", "name": "Spawn Point", "objectName": "Spawn Point", "pos": { "className": "Point", "x": 358, "y": 392 } }, { "className": "ShapeInstance", "name": "No Scroll", "objectName": "No Scroll", "points": [{ "className": "Point", "x": 3, "y": 479, "perc_from_left": 0, "perc_from_right": 1, "perc_from_top": 0, "perc_from_bottom": 1 }, { "className": "Point", "x": 1154, "y": 479, "perc_from_left": 1, "perc_from_right": 0, "perc_from_top": 0, "perc_from_bottom": 1 }, { "className": "Point", "x": 1154, "y": 586, "perc_from_left": 1, "perc_from_right": 0, "perc_from_top": 1, "perc_from_bottom": 0 }, { "className": "Point", "x": 3, "y": 586, "perc_from_left": 0, "perc_from_right": 1, "perc_from_top": 1, "perc_from_bottom": 0 }] }, { "className": "ShapeInstance", "name": "No Scroll", "objectName": "No Scroll", "points": [{ "className": "Point", "x": 1183, "y": 11, "perc_from_left": 0, "perc_from_right": 1, "perc_from_top": 0, "perc_from_bottom": 1 }, { "className": "Point", "x": 1394, "y": 11, "perc_from_left": 1, "perc_from_right": 0, "perc_from_top": 0, "perc_from_bottom": 1 }, { "className": "Point", "x": 1394, "y": 225, "perc_from_left": 1, "perc_from_right": 0, "perc_from_top": 1, "perc_from_bottom": 0 }, { "className": "Point", "x": 1183, "y": 225, "perc_from_left": 0, "perc_from_right": 1, "perc_from_top": 1, "perc_from_bottom": 0 }] }, { "className": "ShapeInstance", "name": "Collision Shape", "objectName": "Collision Shape", "points": [{ "className": "Point", "x": 2, "y": 289, "perc_from_left": 0, "perc_from_right": 1, "perc_from_top": 0, "perc_from_bottom": 1 }, { "className": "Point", "x": 360, "y": 289, "perc_from_left": 1, "perc_from_right": 0, "perc_from_top": 0, "perc_from_bottom": 1 }, { "className": "Point", "x": 360, "y": 302, "perc_from_left": 1, "perc_from_right": 0, "perc_from_top": 1, "perc_from_bottom": 0 }, { "className": "Point", "x": 2, "y": 302, "perc_from_left": 0, "perc_from_right": 1, "perc_from_top": 1, "perc_from_bottom": 0 }] }, { "className": "ShapeInstance", "name": "Ladder", "objectName": "Ladder", "points": [{ "className": "Point", "x": 363, "y": 285, "perc_from_left": 0, "perc_from_right": 1, "perc_from_top": 0, "perc_from_bottom": 1 }, { "className": "Point", "x": 388, "y": 285, "perc_from_left": 1, "perc_from_right": 0, "perc_from_top": 0, "perc_from_bottom": 1 }, { "className": "Point", "x": 388, "y": 354, "perc_from_left": 1, "perc_from_right": 0, "perc_from_top": 1, "perc_from_bottom": 0 }, { "className": "Point", "x": 363, "y": 354, "perc_from_left": 0, "perc_from_right": 1, "perc_from_top": 1, "perc_from_bottom": 0 }] }, { "className": "ShapeInstance", "name": "Collision Shape", "objectName": "Collision Shape", "points": [{ "className": "Point", "x": 0, "y": 160, "perc_from_left": 0, "perc_from_right": 1, "perc_from_top": 0, "perc_from_bottom": 1 }, { "className": "Point", "x": 553, "y": 160, "perc_from_left": 1, "perc_from_right": 0, "perc_from_top": 0, "perc_from_bottom": 1 }, { "className": "Point", "x": 553, "y": 177, "perc_from_left": 1, "perc_from_right": 0, "perc_from_top": 1, "perc_from_bottom": 0 }, { "className": "Point", "x": 0, "y": 177, "perc_from_left": 0, "perc_from_right": 1, "perc_from_top": 1, "perc_from_bottom": 0 }] }, { "className": "ShapeInstance", "name": "Collision Shape", "objectName": "Collision Shape", "points": [{ "className": "Point", "x": 581, "y": 159, "perc_from_left": 0, "perc_from_right": 1, "perc_from_top": 0, "perc_from_bottom": 1 }, { "className": "Point", "x": 650, "y": 159, "perc_from_left": 1, "perc_from_right": 0, "perc_from_top": 0, "perc_from_bottom": 1 }, { "className": "Point", "x": 650, "y": 176, "perc_from_left": 1, "perc_from_right": 0, "perc_from_top": 1, "perc_from_bottom": 0 }, { "className": "Point", "x": 581, "y": 176, "perc_from_left": 0, "perc_from_right": 1, "perc_from_top": 1, "perc_from_bottom": 0 }] }, { "className": "ShapeInstance", "name": "Ladder", "objectName": "Ladder", "points": [{ "className": "Point", "x": 552, "y": 159, "perc_from_left": 0, "perc_from_right": 1, "perc_from_top": 0, "perc_from_bottom": 1 }, { "className": "Point", "x": 581, "y": 159, "perc_from_left": 1, "perc_from_right": 0, "perc_from_top": 0, "perc_from_bottom": 1 }, { "className": "Point", "x": 581, "y": 223, "perc_from_left": 1, "perc_from_right": 0, "perc_from_top": 1, "perc_from_bottom": 0 }, { "className": "Point", "x": 552, "y": 223, "perc_from_left": 0, "perc_from_right": 1, "perc_from_top": 1, "perc_from_bottom": 0 }] }, { "className": "ShapeInstance", "name": "Ladder", "objectName": "Ladder", "points": [{ "className": "Point", "x": 649, "y": 161, "perc_from_left": 0, "perc_from_right": 1, "perc_from_top": 0, "perc_from_bottom": 1 }, { "className": "Point", "x": 678, "y": 161, "perc_from_left": 1, "perc_from_right": 0, "perc_from_top": 0, "perc_from_bottom": 1 }, { "className": "Point", "x": 678, "y": 225, "perc_from_left": 1, "perc_from_right": 0, "perc_from_top": 1, "perc_from_bottom": 0 }, { "className": "Point", "x": 649, "y": 225, "perc_from_left": 0, "perc_from_right": 1, "perc_from_top": 1, "perc_from_bottom": 0 }] }, { "className": "ShapeInstance", "name": "Collision Shape", "objectName": "Collision Shape", "points": [{ "className": "Point", "x": 389, "y": 287, "perc_from_left": 0, "perc_from_right": 1, "perc_from_top": 0, "perc_from_bottom": 1 }, { "className": "Point", "x": 536, "y": 287, "perc_from_left": 1, "perc_from_right": 0, "perc_from_top": 0, "perc_from_bottom": 1 }, { "className": "Point", "x": 536, "y": 304, "perc_from_left": 1, "perc_from_right": 0, "perc_from_top": 1, "perc_from_bottom": 0 }, { "className": "Point", "x": 389, "y": 304, "perc_from_left": 0, "perc_from_right": 1, "perc_from_top": 1, "perc_from_bottom": 0 }] }, { "className": "ShapeInstance", "name": "Ladder", "objectName": "Ladder", "points": [{ "className": "Point", "x": 537, "y": 289, "perc_from_left": 0, "perc_from_right": 1, "perc_from_top": 0, "perc_from_bottom": 1 }, { "className": "Point", "x": 567, "y": 289, "perc_from_left": 1, "perc_from_right": 0, "perc_from_top": 0, "perc_from_bottom": 1 }, { "className": "Point", "x": 567, "y": 353, "perc_from_left": 1, "perc_from_right": 0, "perc_from_top": 1, "perc_from_bottom": 0 }, { "className": "Point", "x": 537, "y": 353, "perc_from_left": 0, "perc_from_right": 1, "perc_from_top": 1, "perc_from_bottom": 0 }] }, { "className": "ShapeInstance", "name": "Collision Shape", "objectName": "Collision Shape", "points": [{ "className": "Point", "x": 790, "y": 160, "perc_from_left": 0, "perc_from_right": 1, "perc_from_top": 0, "perc_from_bottom": 1 }, { "className": "Point", "x": 1152, "y": 160, "perc_from_left": 1, "perc_from_right": 0, "perc_from_top": 0, "perc_from_bottom": 1 }, { "className": "Point", "x": 1152, "y": 177, "perc_from_left": 1, "perc_from_right": 0, "perc_from_top": 1, "perc_from_bottom": 0 }, { "className": "Point", "x": 790, "y": 177, "perc_from_left": 0, "perc_from_right": 1, "perc_from_top": 1, "perc_from_bottom": 0 }] }, { "className": "ShapeInstance", "name": "Ladder", "objectName": "Ladder", "points": [{ "className": "Point", "x": 760, "y": 160, "perc_from_left": 0, "perc_from_right": 1, "perc_from_top": 0, "perc_from_bottom": 1 }, { "className": "Point", "x": 791, "y": 160, "perc_from_left": 1, "perc_from_right": 0, "perc_from_top": 0, "perc_from_bottom": 1 }, { "className": "Point", "x": 791, "y": 224, "perc_from_left": 1, "perc_from_right": 0, "perc_from_top": 1, "perc_from_bottom": 0 }, { "className": "Point", "x": 760, "y": 224, "perc_from_left": 0, "perc_from_right": 1, "perc_from_top": 1, "perc_from_bottom": 0 }] }, { "className": "ShapeInstance", "name": "Ladder", "objectName": "Ladder", "points": [{ "className": "Point", "x": 905, "y": 288, "perc_from_left": 0, "perc_from_right": 1, "perc_from_top": 0, "perc_from_bottom": 1 }, { "className": "Point", "x": 934, "y": 288, "perc_from_left": 1, "perc_from_right": 0, "perc_from_top": 0, "perc_from_bottom": 1 }, { "className": "Point", "x": 934, "y": 368, "perc_from_left": 1, "perc_from_right": 0, "perc_from_top": 1, "perc_from_bottom": 0 }, { "className": "Point", "x": 905, "y": 368, "perc_from_left": 0, "perc_from_right": 1, "perc_from_top": 1, "perc_from_bottom": 0 }] }, { "className": "ShapeInstance", "name": "Collision Shape", "objectName": "Collision Shape", "points": [{ "className": "Point", "x": 933, "y": 287, "perc_from_left": 0, "perc_from_right": 1, "perc_from_top": 0, "perc_from_bottom": 1 }, { "className": "Point", "x": 1151, "y": 287, "perc_from_left": 1, "perc_from_right": 0, "perc_from_top": 0, "perc_from_bottom": 1 }, { "className": "Point", "x": 1151, "y": 302, "perc_from_left": 1, "perc_from_right": 0, "perc_from_top": 1, "perc_from_bottom": 0 }, { "className": "Point", "x": 933, "y": 302, "perc_from_left": 0, "perc_from_right": 1, "perc_from_top": 1, "perc_from_bottom": 0 }] }], "name": "powerplant", "path": "assets/levels/powerplant.json", "backgroundPath": "assets/backgrounds/powerplant.png" }, { "className": "Level", "instances": [{ "className": "ShapeInstance", "name": "Collision Shape", "objectName": "Collision Shape", "points": [{ "className": "Point", "x": 8.208955223880588, "y": 194.02985074626852, "perc_from_left": 0, "perc_from_right": 1, "perc_from_top": 0, "perc_from_bottom": 1 }, { "className": "Point", "x": 256.61194029850725, "y": 194.02985074626852, "perc_from_left": 1, "perc_from_right": 0, "perc_from_top": 0, "perc_from_bottom": 1 }, { "className": "Point", "x": 256.61194029850725, "y": 209.597014925373, "perc_from_left": 1, "perc_from_right": 0, "perc_from_top": 1, "perc_from_bottom": 0 }, { "className": "Point", "x": 8.208955223880588, "y": 209.597014925373, "perc_from_left": 0, "perc_from_right": 1, "perc_from_top": 1, "perc_from_bottom": 0 }] }, { "className": "ShapeInstance", "name": "Collision Shape", "objectName": "Collision Shape", "points": [{ "className": "Point", "x": 0.37313432835820876, "y": 1.1194029850746263, "perc_from_left": 0, "perc_from_right": 1, "perc_from_top": 0, "perc_from_bottom": 1 }, { "className": "Point", "x": 15.194029850746261, "y": 1.1194029850746263, "perc_from_left": 1, "perc_from_right": 0, "perc_from_top": 0, "perc_from_bottom": 1 }, { "className": "Point", "x": 15.194029850746261, "y": 199.8955223880596, "perc_from_left": 1, "perc_from_right": 0, "perc_from_top": 1, "perc_from_bottom": 0 }, { "className": "Point", "x": 0.37313432835820876, "y": 199.8955223880596, "perc_from_left": 0, "perc_from_right": 1, "perc_from_top": 1, "perc_from_bottom": 0 }] }, { "className": "ShapeInstance", "name": "Collision Shape", "objectName": "Collision Shape", "points": [{ "className": "Point", "x": 239.17910447761182, "y": 4.850746268656714, "perc_from_left": 0, "perc_from_right": 1, "perc_from_top": 0, "perc_from_bottom": 1 }, { "className": "Point", "x": 255.11940298507446, "y": 4.850746268656714, "perc_from_left": 1, "perc_from_right": 0, "perc_from_top": 0, "perc_from_bottom": 1 }, { "className": "Point", "x": 255.11940298507446, "y": 196.1641791044775, "perc_from_left": 1, "perc_from_right": 0, "perc_from_top": 1, "perc_from_bottom": 0 }, { "className": "Point", "x": 239.17910447761182, "y": 196.1641791044775, "perc_from_left": 0, "perc_from_right": 1, "perc_from_top": 1, "perc_from_bottom": 0 }] }, { "className": "Instance", "name": "Spawn Point", "objectName": "Spawn Point", "pos": { "className": "Point", "x": 50, "y": 193 } }, { "className": "Instance", "name": "Spawn Point", "objectName": "Spawn Point", "pos": { "className": "Point", "x": 210, "y": 193 } }, { "className": "ShapeInstance", "name": "Collision Shape", "objectName": "Collision Shape", "points": [{ "className": "Point", "x": 13.432835820895514, "y": 3.7313432835820874, "perc_from_left": 0, "perc_from_right": 1, "perc_from_top": 0, "perc_from_bottom": 1 }, { "className": "Point", "x": 240.94029850746256, "y": 3.7313432835820874, "perc_from_left": 1, "perc_from_right": 0, "perc_from_top": 0, "perc_from_bottom": 1 }, { "className": "Point", "x": 240.94029850746256, "y": 28.253731343283587, "perc_from_left": 1, "perc_from_right": 0, "perc_from_top": 1, "perc_from_bottom": 0 }, { "className": "Point", "x": 13.432835820895514, "y": 28.253731343283587, "perc_from_left": 0, "perc_from_right": 1, "perc_from_top": 1, "perc_from_bottom": 0 }] }], "name": "sm_bossroom", "path": "assets/levels/sm_bossroom.json", "backgroundPath": "assets/backgrounds/sm_bossroom.png" }];
            exports_20("levelJsons", levelJsons);
        }
    };
});
System.register("tests", ["shape", "point"], function (exports_21, context_21) {
    "use strict";
    var __moduleName = context_21 && context_21.id;
    function runAllTests() {
        testGetIntersectPoint();
    }
    exports_21("runAllTests", runAllTests);
    function testGetIntersectPoint() {
        var shape = new shape_1.Shape([
            new point_10.Point(123.39407376319954, 159.66765581794917),
            new point_10.Point(141.39407376319954, 159.66765581794917),
            new point_10.Point(141.39407376319954, 193.66765581794917),
            new point_10.Point(123.39407376319954, 193.66765581794917)
        ]);
        var pos = new point_10.Point(119.4554509905969, 175.1802743786446);
        var vel = new point_10.Point(149.92618433007218, 4.705236681105004);
        var point = shape.getIntersectPoint(pos, vel);
        assertEquals(Math.round(point.x), Math.round(123));
        assertEquals(Math.round(point.y), Math.round(175));
    }
    function assertEquals(val1, val2) {
        if (val1 !== val2) {
            console.error(val1 + " is not equal to " + val2);
        }
    }
    var shape_1, point_10;
    return {
        setters: [
            function (shape_1_1) {
                shape_1 = shape_1_1;
            },
            function (point_10_1) {
                point_10 = point_10_1;
            }
        ],
        execute: function () {
        }
    };
});
System.register("game", ["sprite", "level", "sprites", "levels", "player", "color", "helpers", "tests"], function (exports_22, context_22) {
    "use strict";
    var __moduleName = context_22 && context_22.id;
    var sprite_1, level_1, sprites_1, levels_1, player_1, color_1, Helpers, Tests, Options, Game, game;
    return {
        setters: [
            function (sprite_1_1) {
                sprite_1 = sprite_1_1;
            },
            function (level_1_1) {
                level_1 = level_1_1;
            },
            function (sprites_1_1) {
                sprites_1 = sprites_1_1;
            },
            function (levels_1_1) {
                levels_1 = levels_1_1;
            },
            function (player_1_1) {
                player_1 = player_1_1;
            },
            function (color_1_1) {
                color_1 = color_1_1;
            },
            function (Helpers_9) {
                Helpers = Helpers_9;
            },
            function (Tests_1) {
                Tests = Tests_1;
            }
        ],
        execute: function () {
            Options = (function () {
                function Options() {
                    this.showHitboxes = false;
                    this.alwaysFlinch = false;
                    this.invulnFrames = false;
                    this.antiAlias = false;
                    this.playMusic = false;
                }
                return Options;
            }());
            Game = (function () {
                function Game() {
                    this.sprites = {};
                    this.levels = {};
                    this.spritesheets = {};
                    this.backgrounds = {};
                    this.sounds = {};
                    this.soundLoadCount = 0;
                    this.palettes = {};
                    this.isServer = false;
                    this.isClient = true;
                    this.startTime = 0;
                    this.deltaTime = 0;
                    this.time = 0;
                    this.interval = 0;
                    this.requestId = 0;
                    this.soundSheetLoaded = false;
                    this.restartLevelName = "";
                    this.canvas = $("#canvas")[0];
                    this.ctx = this.canvas.getContext("2d");
                    Helpers.noCanvasSmoothing(this.ctx);
                }
                Game.prototype.start = function () {
                    var _this = this;
                    window.onerror = function (error) {
                        console.error(error);
                    };
                    var optionString = localStorage.getItem("options");
                    if (optionString) {
                        this.options = JSON.parse(optionString);
                    }
                    else {
                        this.options = new Options();
                    }
                    this.loadSprites();
                    this.loadLevels();
                    this.loadPalettes();
                    for (var _i = 0, soundFiles_1 = soundFiles; _i < soundFiles_1.length; _i++) {
                        var soundFile = soundFiles_1[_i];
                        var sound = new Howl({
                            src: ["assets/sounds/" + soundFile],
                            onload: function () {
                                _this.soundLoadCount++;
                            }
                        });
                        this.sounds[soundFile.split(".")[0]] = sound;
                    }
                    this.soundSheet = new Howl({
                        src: ["assets/soundsheets/mmx_sfx.mp3"],
                        sprite: {
                            buster: [900, 1425 - 900],
                            buster2: [17461, 18220 - 17461],
                            buster3: [4761, 5950 - 4761],
                            buster4: [19429, 20423 - 19429],
                            rollingShield: [180000 + 12411, 394],
                            electricSpark: [180000 + 16554, 919],
                            tornado: [180000 + 7359, 2962],
                            boomerang: [180000 + 5766, 1190],
                            fireWave: [180000 + 4404, 478],
                        },
                        onload: function () {
                            _this.soundSheetLoaded = true;
                        }
                    });
                    this.interval = window.setInterval(function () { return _this.onLoad(); }, 1);
                };
                Game.prototype.onLoad = function () {
                    if (this.isLoaded()) {
                        window.clearInterval(this.interval);
                        this.loadLevel("powerplant");
                        var music_1 = new Howl({
                            src: ["assets/music/" + this.level.levelMusic],
                            sprite: {
                                musicStart: [0, this.level.musicLoopStart],
                                musicLoop: [this.level.musicLoopStart, this.level.musicLoopEnd - this.level.musicLoopStart]
                            },
                            onload: function () {
                            }
                        });
                        if (this.options.playMusic) {
                            window.setTimeout(function () {
                                music_1.play("musicStart");
                                music_1.on("end", function () {
                                    console.log("Loop");
                                    music_1.play("musicLoop");
                                });
                            }, 1000);
                        }
                    }
                    else {
                    }
                };
                Game.prototype.startVue = function () {
                    var options = this.options;
                    var app1 = new Vue({
                        el: '#app',
                        data: {
                            options: options
                        },
                        methods: {
                            onChange: function () {
                                localStorage.setItem("options", JSON.stringify(this.options));
                            }
                        }
                    });
                };
                Game.prototype.test = function () {
                    Tests.runAllTests();
                };
                Game.prototype.restartLevel = function (name) {
                    console.log("RESET");
                    this.restartLevelName = name;
                };
                Game.prototype.doRestart = function () {
                    var name = this.restartLevelName;
                    this.restartLevelName = "";
                    this.loadLevel(name);
                };
                Game.prototype.loadLevel = function (name) {
                    var _this = this;
                    var level = this.levels[name];
                    this.level = _.cloneDeep(level);
                    this.level.background = level.background;
                    var player1 = new player_1.Player(this.level.spawnPoints[0].point.x, this.level.spawnPoints[0].point.y, false, 0);
                    this.level.players.push(player1);
                    this.level.localPlayers.push(player1);
                    this.level.mainPlayer = player1;
                    var cpu1 = new player_1.Player(this.level.spawnPoints[1].point.x, this.level.spawnPoints[1].point.y, false, 1);
                    cpu1.character.palette = this.palettes["red"];
                    cpu1.character.xDir = -1;
                    cpu1.palette = cpu1.character.palette;
                    this.level.players.push(cpu1);
                    this.level.localPlayers.push(cpu1);
                    document.onkeydown = function (e) {
                        for (var _i = 0, _a = _this.level.localPlayers; _i < _a.length; _i++) {
                            var player = _a[_i];
                            player.onKeyDown(e.keyCode);
                        }
                    };
                    document.onkeyup = function (e) {
                        for (var _i = 0, _a = _this.level.localPlayers; _i < _a.length; _i++) {
                            var player = _a[_i];
                            player.onKeyUp(e.keyCode);
                        }
                    };
                    this.gameLoop(0);
                };
                Game.prototype.getSpritesheet = function (path) {
                    if (!this.spritesheets[path]) {
                        this.spritesheets[path] = document.createElement("img");
                        this.spritesheets[path].src = path;
                    }
                    return this.spritesheets[path];
                };
                Game.prototype.getBackground = function (path) {
                    if (!this.backgrounds[path]) {
                        this.backgrounds[path] = document.createElement("img");
                        this.backgrounds[path].src = path;
                    }
                    return this.backgrounds[path];
                };
                Game.prototype.loadSprites = function () {
                    for (var _i = 0, spriteJsons_1 = sprites_1.spriteJsons; _i < spriteJsons_1.length; _i++) {
                        var spriteJson = spriteJsons_1[_i];
                        var sprite = new sprite_1.Sprite(spriteJson);
                        this.sprites[sprite.name] = sprite;
                    }
                };
                Game.prototype.loadLevels = function () {
                    for (var _i = 0, levelJsons_1 = levels_1.levelJsons; _i < levelJsons_1.length; _i++) {
                        var levelJson = levelJsons_1[_i];
                        var level = new level_1.Level(levelJson);
                        this.levels[level.name] = level;
                    }
                };
                Game.prototype.loadPalettes = function () {
                    this.palettes["red"] = new color_1.Palette("assets/palettes/red.png");
                };
                Game.prototype.isLoaded = function () {
                    for (var name_1 in this.sprites) {
                        if (!this.sprites[name_1].spritesheet.complete) {
                            return false;
                        }
                    }
                    for (var name_2 in this.levels) {
                        if (!this.levels[name_2].background.complete) {
                            return false;
                        }
                    }
                    for (var name_3 in this.palettes) {
                        if (!this.palettes[name_3].imageEl.complete) {
                            return false;
                        }
                    }
                    var keys = Object.getOwnPropertyNames(this.sounds);
                    if (keys.length !== this.soundLoadCount) {
                        return false;
                    }
                    if (!this.soundSheetLoaded)
                        return false;
                    return true;
                };
                Game.prototype.gameLoop = function (currentTime) {
                    var _this = this;
                    this.deltaTime = (currentTime - this.startTime) / 1000;
                    this.time += this.deltaTime;
                    if (Math.abs(this.deltaTime) > 1 / 30)
                        this.deltaTime = 1 / 30;
                    this.level.update();
                    this.startTime = currentTime;
                    if (this.restartLevelName !== "") {
                        this.doRestart();
                    }
                    else {
                        this.requestId = window.requestAnimationFrame(function (currentTime) { return _this.gameLoop(currentTime); });
                    }
                };
                Object.defineProperty(Game.prototype, "fps", {
                    get: function () {
                        return Math.round(1 / this.deltaTime);
                    },
                    enumerable: true,
                    configurable: true
                });
                Game.prototype.playSound = function (clip) {
                    if (this.sounds[clip]) {
                        return this.sounds[clip].play();
                    }
                    else {
                        return this.soundSheet.play(clip);
                    }
                };
                return Game;
            }());
            game = new Game();
            exports_22("game", game);
        }
    };
});
System.register("collider", ["point", "shape"], function (exports_23, context_23) {
    "use strict";
    var __moduleName = context_23 && context_23.id;
    var point_11, shape_2, Collider, CollideData;
    return {
        setters: [
            function (point_11_1) {
                point_11 = point_11_1;
            },
            function (shape_2_1) {
                shape_2 = shape_2_1;
            }
        ],
        execute: function () {
            Collider = (function () {
                function Collider(points, isTrigger) {
                    this.wallOnly = false;
                    this.isClimbable = true;
                    this.offset = new point_11.Point(0, 0);
                    this._shape = new shape_2.Shape(points);
                    this.isTrigger = isTrigger;
                }
                Object.defineProperty(Collider.prototype, "shape", {
                    get: function () {
                        return this._shape.clone(this.offset.x, this.offset.y);
                    },
                    enumerable: true,
                    configurable: true
                });
                Collider.prototype.onCollision = function (other) {
                };
                Collider.prototype.changePos = function (x, y) {
                    this.offset.x = x;
                    this.offset.y = y;
                };
                Collider.prototype.isCollidingWith = function (other) {
                    return this.shape.intersectsShape(other.shape);
                };
                return Collider;
            }());
            exports_23("Collider", Collider);
            CollideData = (function () {
                function CollideData(collider, vel, isTrigger, gameObject) {
                    this.collider = collider;
                    this.vel = vel;
                    this.isTrigger = isTrigger;
                    this.gameObject = gameObject;
                }
                return CollideData;
            }());
            exports_23("CollideData", CollideData);
        }
    };
});
System.register("frame", [], function (exports_24, context_24) {
    "use strict";
    var __moduleName = context_24 && context_24.id;
    var Frame;
    return {
        setters: [],
        execute: function () {
            Frame = (function () {
                function Frame(rect, duration, offset) {
                    this.rect = rect;
                    this.duration = duration;
                    this.offset = offset;
                    this.hitboxes = [];
                    this.POIs = [];
                }
                Frame.prototype.getBusterOffset = function () {
                    if (this.POIs.length > 0)
                        return this.POIs[0];
                    return undefined;
                };
                return Frame;
            }());
            exports_24("Frame", Frame);
        }
    };
});
System.register("sprite", ["collider", "frame", "point", "rect", "game", "helpers"], function (exports_25, context_25) {
    "use strict";
    var __moduleName = context_25 && context_25.id;
    var collider_5, frame_1, point_12, rect_5, game_9, Helpers, Sprite;
    return {
        setters: [
            function (collider_5_1) {
                collider_5 = collider_5_1;
            },
            function (frame_1_1) {
                frame_1 = frame_1_1;
            },
            function (point_12_1) {
                point_12 = point_12_1;
            },
            function (rect_5_1) {
                rect_5 = rect_5_1;
            },
            function (game_9_1) {
                game_9 = game_9_1;
            },
            function (Helpers_10) {
                Helpers = Helpers_10;
            }
        ],
        execute: function () {
            Sprite = (function () {
                function Sprite(spriteJson) {
                    this.name = spriteJson.name;
                    this.alignment = spriteJson.alignment;
                    this.wrapMode = spriteJson.wrapMode;
                    this.loopStartFrame = spriteJson.loopStartFrame || 0;
                    this.spritesheetPath = spriteJson.spritesheetPath;
                    if (!this.wrapMode) {
                        console.error("NO WRAP MODE FOR SPRITE " + this.name);
                    }
                    this.frames = [];
                    this.hitboxes = [];
                    game_9.game.getSpritesheet(spriteJson.spritesheetPath);
                    for (var _i = 0, _a = spriteJson.hitboxes; _i < _a.length; _i++) {
                        var hitboxJson = _a[_i];
                        var hitbox = new collider_5.Collider([
                            new point_12.Point(hitboxJson.offset.x, hitboxJson.offset.y),
                            new point_12.Point(hitboxJson.offset.x + hitboxJson.width, hitboxJson.offset.y),
                            new point_12.Point(hitboxJson.offset.x + hitboxJson.width, hitboxJson.offset.y + hitboxJson.height),
                            new point_12.Point(hitboxJson.offset.x, hitboxJson.offset.y + hitboxJson.height)
                        ], hitboxJson.isTrigger ? true : false);
                        this.hitboxes.push(hitbox);
                    }
                    for (var _b = 0, _c = spriteJson.frames; _b < _c.length; _b++) {
                        var frameJson = _c[_b];
                        var frame = new frame_1.Frame(new rect_5.Rect(frameJson.rect.topLeftPoint.x, frameJson.rect.topLeftPoint.y, frameJson.rect.botRightPoint.x, frameJson.rect.botRightPoint.y), frameJson.duration, new point_12.Point(frameJson.offset.x, frameJson.offset.y));
                        if (frameJson.POIs) {
                            for (var _d = 0, _e = frameJson.POIs; _d < _e.length; _d++) {
                                var poi = _e[_d];
                                frame.POIs.push(new point_12.Point(poi.x, poi.y));
                            }
                        }
                        this.frames.push(frame);
                    }
                }
                Object.defineProperty(Sprite.prototype, "spritesheet", {
                    get: function () {
                        return game_9.game.getSpritesheet(this.spritesheetPath);
                    },
                    enumerable: true,
                    configurable: true
                });
                Sprite.prototype.getAlignOffset = function (frameIndex, flipX, flipY) {
                    var frame = this.frames[frameIndex];
                    var rect = frame.rect;
                    var offset = frame.offset;
                    return this.getAlignOffsetHelper(rect, offset, flipX, flipY);
                };
                Sprite.prototype.getAlignOffsetHelper = function (rect, offset, flipX, flipY) {
                    flipX = flipX || 1;
                    flipY = flipY || 1;
                    var w = rect.w;
                    var h = rect.h;
                    var halfW = w * 0.5;
                    var halfH = h * 0.5;
                    var x;
                    var y;
                    if (this.alignment === "topleft") {
                        x = 0;
                        y = 0;
                    }
                    else if (this.alignment === "topmid") {
                        x = -halfW;
                        y = 0;
                    }
                    else if (this.alignment === "topright") {
                        x = -w;
                        y = 0;
                    }
                    else if (this.alignment === "midleft") {
                        x = flipX === -1 ? -w : 0;
                        y = -halfH;
                    }
                    else if (this.alignment === "center") {
                        x = -halfW;
                        y = -halfH;
                    }
                    else if (this.alignment === "midright") {
                        x = flipX === -1 ? 0 : -w;
                        y = -halfH;
                    }
                    else if (this.alignment === "botleft") {
                        x = 0;
                        y = -h;
                    }
                    else if (this.alignment === "botmid") {
                        x = -halfW;
                        y = -h;
                    }
                    else if (this.alignment === "botright") {
                        x = -w;
                        y = -h;
                    }
                    return new point_12.Point(x + offset.x * flipX, y + offset.y * flipY);
                };
                Sprite.prototype.draw = function (frameIndex, x, y, flipX, flipY, options, alpha, palette) {
                    flipX = flipX || 1;
                    flipY = flipY || 1;
                    var frame = this.frames[frameIndex];
                    var rect = frame.rect;
                    var offset = this.getAlignOffset(frameIndex, flipX, flipY);
                    Helpers.drawImage(game_9.game.ctx, this.spritesheet, rect.x1, rect.y1, rect.w, rect.h, x + offset.x, y + offset.y, flipX, flipY, options, alpha, palette);
                };
                return Sprite;
            }());
            exports_25("Sprite", Sprite);
        }
    };
});
System.register("actor", ["point", "game", "helpers"], function (exports_26, context_26) {
    "use strict";
    var __moduleName = context_26 && context_26.id;
    var point_13, game_10, Helpers, Actor, Anim;
    return {
        setters: [
            function (point_13_1) {
                point_13 = point_13_1;
            },
            function (game_10_1) {
                game_10 = game_10_1;
            },
            function (Helpers_11) {
                Helpers = Helpers_11;
            }
        ],
        execute: function () {
            Actor = (function () {
                function Actor(sprite, dontAddToLevel) {
                    this.renderEffectTime = 0;
                    this.pos = new point_13.Point(0, 0);
                    this.vel = new point_13.Point(0, 0);
                    this.useGravity = true;
                    this.frameIndex = 0;
                    this.frameSpeed = 1;
                    this.frameTime = 0;
                    this.name = "";
                    this.xDir = 1;
                    this.yDir = 1;
                    this.grounded = false;
                    if (!dontAddToLevel) {
                        game_10.game.level.addGameObject(this);
                    }
                    this.collidedInFrame = new Set();
                    this.renderEffect = "";
                    this.changeSprite(sprite, true);
                }
                Actor.prototype.changeSprite = function (sprite, resetFrame) {
                    if (!sprite)
                        return;
                    this.sprite = _.cloneDeep(sprite);
                    if (resetFrame) {
                        this.frameIndex = 0;
                        this.frameTime = 0;
                    }
                    else if (this.frameIndex >= this.sprite.frames.length) {
                        this.frameIndex = 0;
                    }
                };
                Object.defineProperty(Actor.prototype, "angle", {
                    get: function () {
                        return this._angle;
                    },
                    set: function (value) {
                        this._angle = value;
                        if (this._angle < 0)
                            this._angle += 360;
                        if (this._angle > 360)
                            this._angle -= 360;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(Actor.prototype, "currentFrame", {
                    get: function () {
                        return this.sprite.frames[this.frameIndex];
                    },
                    enumerable: true,
                    configurable: true
                });
                Actor.prototype.update = function () {
                    this.renderEffectTime = Helpers.clampMin0(this.renderEffectTime - game_10.game.deltaTime);
                    if (this.renderEffectTime <= 0) {
                        this.renderEffect = "";
                    }
                    this.frameTime += game_10.game.deltaTime * this.frameSpeed;
                    if (this.frameTime >= this.currentFrame.duration) {
                        var onceEnd = this.sprite.wrapMode === "once" && this.frameIndex === this.sprite.frames.length - 1;
                        if (!onceEnd) {
                            this.frameTime = this.sprite.loopStartFrame;
                            this.frameIndex++;
                            if (this.frameIndex >= this.sprite.frames.length)
                                this.frameIndex = 0;
                        }
                    }
                    if (this.useGravity && !this.grounded) {
                        this.vel.y += game_10.game.level.gravity * game_10.game.deltaTime;
                        if (this.vel.y > 1000) {
                            this.vel.y = 1000;
                        }
                    }
                    this.move(this.vel);
                    if (this.collider && !this.collider.isTrigger) {
                        var collideData = game_10.game.level.checkCollisionActor(this, 0, 1);
                        if (collideData) {
                            this.grounded = true;
                            this.vel.y = 0;
                        }
                        else {
                            this.grounded = false;
                        }
                    }
                    var triggerList = game_10.game.level.getTriggerList(this, 0, 0);
                    for (var _i = 0, triggerList_1 = triggerList; _i < triggerList_1.length; _i++) {
                        var trigger = triggerList_1[_i];
                        this.registerCollision(trigger);
                    }
                };
                Actor.prototype.preUpdate = function () {
                    this.collidedInFrame.clear();
                };
                Actor.prototype.sweepTest = function (offset) {
                    var inc = offset.clone();
                    var collideData = game_10.game.level.checkCollisionActor(this, inc.x * game_10.game.deltaTime, inc.y * game_10.game.deltaTime);
                    if (collideData) {
                        return true;
                    }
                    return false;
                };
                Actor.prototype.move = function (amount) {
                    if (!this.collider) {
                        this.pos.inc(amount.times(game_10.game.deltaTime));
                    }
                    else {
                        if (game_10.game.level.checkCollisionActor(this, 0, 0)) {
                            this.pos.inc(amount.times(game_10.game.deltaTime));
                            return;
                        }
                        var inc = amount.clone();
                        while (inc.magnitude > 0) {
                            var collideData = game_10.game.level.checkCollisionActor(this, inc.x * game_10.game.deltaTime, inc.y * game_10.game.deltaTime);
                            if (collideData && !collideData.isTrigger) {
                                this.registerCollision(collideData);
                                inc.multiply(0.5);
                                if (inc.magnitude < 0.5) {
                                    inc.x = 0;
                                    inc.y = 0;
                                    break;
                                }
                            }
                            else {
                                break;
                            }
                        }
                        this.pos.inc(inc.multiply(game_10.game.deltaTime));
                    }
                };
                Actor.prototype.render = function (x, y) {
                    if (this.angle === undefined) {
                        this.sprite.draw(this.frameIndex, this.pos.x + x, this.pos.y + y, this.xDir, this.yDir, this.renderEffect, 1, this.palette);
                    }
                    else {
                        this.renderFromAngle(x, y);
                    }
                    if (game_10.game.options.showHitboxes && this.collider) {
                        Helpers.drawPolygon(game_10.game.ctx, this.collider.shape.clone(x, y), true, "blue", "", 0, 0.5);
                        Helpers.drawCircle(game_10.game.ctx, this.pos.x + x, this.pos.y + y, 1, "red");
                    }
                };
                Actor.prototype.renderFromAngle = function (x, y) {
                    this.sprite.draw(0, this.pos.x + x, this.pos.y + y, 1, 1, this.renderEffect, 1, this.palette);
                };
                Actor.prototype.registerCollision = function (other) {
                    if (!this.collidedInFrame.has(other.collider)) {
                        this.collidedInFrame.add(other.collider);
                        this.onCollision(other);
                    }
                };
                Actor.prototype.onCollision = function (other) {
                };
                Object.defineProperty(Actor.prototype, "collider", {
                    get: function () {
                        if (this.sprite.hitboxes.length === 0) {
                            if (this.globalCollider) {
                                var rect = this.globalCollider.shape.getRect();
                                var offset_1 = this.sprite.getAlignOffsetHelper(rect, new point_13.Point(0, 0), this.xDir, this.yDir);
                                this.globalCollider.changePos(this.pos.x + offset_1.x, this.pos.y + offset_1.y);
                                return this.globalCollider;
                            }
                            return undefined;
                        }
                        var offset = this.sprite.getAlignOffset(0, this.xDir, this.yDir);
                        this.sprite.hitboxes[0].changePos(this.pos.x + offset.x, this.pos.y + offset.y);
                        return this.sprite.hitboxes[0];
                    },
                    enumerable: true,
                    configurable: true
                });
                Actor.prototype.hasCollisionBox = function () {
                    if (this.sprite.hitboxes.length === 0)
                        return false;
                    if (this.sprite.hitboxes[0].isTrigger)
                        return false;
                    return true;
                };
                Actor.prototype.isAnimOver = function () {
                    return this.frameIndex === this.sprite.frames.length - 1 && this.frameTime >= this.currentFrame.duration;
                };
                Actor.prototype.destroySelf = function (sprite, fadeSound) {
                    game_10.game.level.gameObjects.splice(game_10.game.level.gameObjects.indexOf(this), 1);
                    if (sprite) {
                        var anim = new Anim(this.pos, sprite, this.xDir);
                    }
                    if (fadeSound) {
                        game_10.game.playSound(fadeSound);
                    }
                };
                Actor.prototype.withinX = function (other, amount) {
                    return Math.abs(this.pos.x - other.pos.x) <= amount;
                };
                Actor.prototype.withinY = function (other, amount) {
                    return Math.abs(this.pos.y - other.pos.y) <= amount;
                };
                Actor.prototype.isFacing = function (other) {
                    return ((this.pos.x < other.pos.x && this.xDir === 1) || (this.pos.x >= other.pos.x && this.xDir === -1));
                };
                Object.defineProperty(Actor.prototype, "centerPos", {
                    get: function () {
                        if (!this.globalCollider)
                            return this.pos;
                        var rect = this.globalCollider.shape.getRect();
                        if (!rect)
                            return this.pos;
                        if (this.sprite.alignment.includes("bot")) {
                            var pos = this.pos.addxy(0, -rect.h / 2);
                            return pos;
                        }
                        return this.pos;
                    },
                    enumerable: true,
                    configurable: true
                });
                return Actor;
            }());
            exports_26("Actor", Actor);
            Anim = (function (_super) {
                __extends(Anim, _super);
                function Anim(pos, sprite, xDir) {
                    var _this = _super.call(this, sprite) || this;
                    _this.pos.x = pos.x;
                    _this.pos.y = pos.y;
                    _this.useGravity = false;
                    _this.xDir = xDir;
                    return _this;
                }
                Anim.prototype.update = function () {
                    _super.prototype.update.call(this);
                    if (this.isAnimOver()) {
                        this.destroySelf();
                    }
                };
                return Anim;
            }(Actor));
            exports_26("Anim", Anim);
        }
    };
});
var soundFiles = ["charge_loop.wav", "charge_start.wav", "csting.wav", "dash.wav", "die.wav", "explosion.wav", "hit.wav", "hurt.wav", "jump.wav", "land.wav", "torpedo.wav", "weakness.wav"];
System.register("vue", [], function (exports_27, context_27) {
    "use strict";
    var __moduleName = context_27 && context_27.id;
    function startVue() {
    }
    exports_27("startVue", startVue);
    return {
        setters: [],
        execute: function () {
        }
    };
});
//# sourceMappingURL=main.js.map