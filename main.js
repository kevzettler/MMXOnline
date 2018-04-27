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
System.register("levels", [], function (exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var levelJsons;
    return {
        setters: [],
        execute: function () {
            levelJsons = [{ "className": "Level", "instances": [{ "className": "ShapeInstance", "name": "Shape Instance", "points": [{ "className": "Point", "x": 180, "y": 248, "perc_from_left": 0, "perc_from_right": 1, "perc_from_top": 0, "perc_from_bottom": 1 }, { "className": "Point", "x": 551, "y": 248, "perc_from_left": 1, "perc_from_right": 0, "perc_from_top": 0, "perc_from_bottom": 1 }, { "className": "Point", "x": 551, "y": 363, "perc_from_left": 1, "perc_from_right": 0, "perc_from_top": 1, "perc_from_bottom": 0 }, { "className": "Point", "x": 180, "y": 363, "perc_from_left": 0, "perc_from_right": 1, "perc_from_top": 1, "perc_from_bottom": 0 }] }, { "className": "Instance", "name": "Test", "pos": { "className": "Point", "x": 227, "y": 151 }, "spriteName": "megaman_idle" }], "name": "new_level", "path": "assets/levels/new_level.json", "backgroundPath": "assets/backgrounds/highway.png" }];
            exports_1("levelJsons", levelJsons);
        }
    };
});
System.register("sprites", [], function (exports_2, context_2) {
    "use strict";
    var __moduleName = context_2 && context_2.id;
    var spriteJsons;
    return {
        setters: [],
        execute: function () {
            spriteJsons = [{ "className": "Sprite", "hitboxes": [{ "className": "Hitbox", "tags": "", "width": 20, "height": 40, "offset": { "className": "Point", "x": 0, "y": 0 }, "rect": { "className": "Rect", "topLeftPoint": { "className": "Point", "x": 340, "y": 280 }, "botRightPoint": { "className": "Point", "x": 360, "y": 320 } } }], "frames": [{ "className": "Frame", "rect": { "className": "Rect", "topLeftPoint": { "className": "Point", "x": 164, "y": 253 }, "botRightPoint": { "className": "Point", "x": 188, "y": 290 } }, "duration": 5, "offset": { "className": "Point", "x": 0, "y": 0 }, "hitboxes": [] }, { "className": "Frame", "rect": { "className": "Rect", "topLeftPoint": { "className": "Point", "x": 189, "y": 249 }, "botRightPoint": { "className": "Point", "x": 204, "y": 290 } }, "duration": 5, "offset": { "className": "Point", "x": 0, "y": 0 }, "hitboxes": [] }, { "className": "Frame", "rect": { "className": "Rect", "topLeftPoint": { "className": "Point", "x": 204, "y": 244 }, "botRightPoint": { "className": "Point", "x": 223, "y": 290 } }, "duration": 5, "offset": { "className": "Point", "x": 0, "y": 0 }, "hitboxes": [] }, { "className": "Frame", "rect": { "className": "Rect", "topLeftPoint": { "className": "Point", "x": 223, "y": 250 }, "botRightPoint": { "className": "Point", "x": 246, "y": 291 } }, "duration": 5, "offset": { "className": "Point", "x": 0, "y": 0 }, "hitboxes": [] }, { "className": "Frame", "rect": { "className": "Rect", "topLeftPoint": { "className": "Point", "x": 247, "y": 249 }, "botRightPoint": { "className": "Point", "x": 274, "y": 291 } }, "duration": 5, "offset": { "className": "Point", "x": 0, "y": 0 }, "hitboxes": [] }, { "className": "Frame", "rect": { "className": "Rect", "topLeftPoint": { "className": "Point", "x": 275, "y": 253 }, "botRightPoint": { "className": "Point", "x": 299, "y": 291 } }, "duration": 5, "offset": { "className": "Point", "x": 0, "y": 0 }, "hitboxes": [] }, { "className": "Frame", "rect": { "className": "Rect", "topLeftPoint": { "className": "Point", "x": 300, "y": 259 }, "botRightPoint": { "className": "Point", "x": 330, "y": 291 } }, "duration": 5, "offset": { "className": "Point", "x": 0, "y": 0 }, "hitboxes": [] }], "name": "megaman_idle", "path": "assets/sprites/megaman_idle.json", "alignment": "center", "spritesheetPath": "assets/spritesheets/MMXNormal.png" }];
            exports_2("spriteJsons", spriteJsons);
        }
    };
});
System.register("engine/point", [], function (exports_3, context_3) {
    "use strict";
    var __moduleName = context_3 && context_3.id;
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
                Point.prototype.add = function (other) {
                    this.x += other.x;
                    this.y += other.y;
                    return this;
                };
                Point.prototype.multiply = function (num) {
                    this.x *= num;
                    this.y *= num;
                    return this;
                };
                Object.defineProperty(Point.prototype, "magnitude", {
                    get: function () {
                        return Math.sqrt(this.x * this.x + this.y * this.y);
                    },
                    enumerable: true,
                    configurable: true
                });
                Point.prototype.clone = function () {
                    return new Point(this.x, this.y);
                };
                return Point;
            }());
            exports_3("Point", Point);
        }
    };
});
System.register("engine/gameObject", [], function (exports_4, context_4) {
    "use strict";
    var __moduleName = context_4 && context_4.id;
    return {
        setters: [],
        execute: function () {
        }
    };
});
System.register("engine/rect", ["engine/point"], function (exports_5, context_5) {
    "use strict";
    var __moduleName = context_5 && context_5.id;
    var point_1, Rect;
    return {
        setters: [
            function (point_1_1) {
                point_1 = point_1_1;
            }
        ],
        execute: function () {
            Rect = (function () {
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
                        new point_1.Point(this.topLeftPoint.x, this.topLeftPoint.y),
                        new point_1.Point(this.botRightPoint.x, this.topLeftPoint.y),
                        new point_1.Point(this.botRightPoint.x, this.botRightPoint.y),
                        new point_1.Point(this.topLeftPoint.x, this.botRightPoint.y),
                    ];
                };
                return Rect;
            }());
            exports_5("Rect", Rect);
        }
    };
});
System.register("engine/shape", ["engine/point", "engine/rect"], function (exports_6, context_6) {
    "use strict";
    var __moduleName = context_6 && context_6.id;
    var point_2, rect_1, Line, Shape;
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
                return Line;
            }());
            Shape = (function () {
                function Shape(points) {
                    this.points = points;
                }
                Shape.prototype.getRect = function () {
                    if (this.points.length !== 4)
                        return undefined;
                    if (this.points[0].ix === this.points[3].ix && this.points[1].ix === this.points[2].ix && this.points[0].iy === this.points[1].iy && this.points[2].iy === this.points[3].iy) {
                        return new rect_1.Rect(this.points[0], this.points[2]);
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
            exports_6("Shape", Shape);
        }
    };
});
System.register("engine/collider", ["engine/shape"], function (exports_7, context_7) {
    "use strict";
    var __moduleName = context_7 && context_7.id;
    var shape_1, Collider;
    return {
        setters: [
            function (shape_1_1) {
                shape_1 = shape_1_1;
            }
        ],
        execute: function () {
            Collider = (function () {
                function Collider(points) {
                    this.shape = new shape_1.Shape(points);
                }
                Collider.prototype.onCollision = function (other) {
                };
                Collider.prototype.onTrigger = function (other) {
                };
                Collider.prototype.clone = function (x, y) {
                    var shape = this.shape.clone(x, y);
                    return new Collider(shape.points);
                };
                return Collider;
            }());
            exports_7("Collider", Collider);
        }
    };
});
System.register("engine/frame", [], function (exports_8, context_8) {
    "use strict";
    var __moduleName = context_8 && context_8.id;
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
                }
                return Frame;
            }());
            exports_8("Frame", Frame);
        }
    };
});
System.register("engine/helpers", ["engine/point"], function (exports_9, context_9) {
    "use strict";
    var __moduleName = context_9 && context_9.id;
    function inRect(x, y, rect) {
        var rx = rect.x1;
        var ry = rect.y1;
        var rx2 = rect.x2;
        var ry2 = rect.y2;
        return x >= rx && x <= rx2 && y >= ry && y <= ry2;
    }
    exports_9("inRect", inRect);
    function inCircle(x, y, circleX, circleY, r) {
        if (Math.sqrt(Math.pow(x - circleX, 2) + Math.pow(y - circleY, 2)) <= r) {
            return true;
        }
        return false;
    }
    exports_9("inCircle", inCircle);
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
    exports_9("drawImage", drawImage);
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
    exports_9("drawRect", drawRect);
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
    exports_9("drawPolygon", drawPolygon);
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
    exports_9("pointInPolygon", pointInPolygon);
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
    exports_9("drawText", drawText);
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
    exports_9("drawCircle", drawCircle);
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
    exports_9("drawLine", drawLine);
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
    exports_9("linepointNearestMouse", linepointNearestMouse);
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
    exports_9("inLine", inLine);
    var point_3;
    return {
        setters: [
            function (point_3_1) {
                point_3 = point_3_1;
            }
        ],
        execute: function () {
        }
    };
});
System.register("engine/geometry", ["engine/collider", "engine/game", "engine/helpers"], function (exports_10, context_10) {
    "use strict";
    var __moduleName = context_10 && context_10.id;
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
                function Geometry() {
                    this.collider = new collider_1.Collider([]);
                }
                Geometry.prototype.update = function () {
                };
                Geometry.prototype.render = function () {
                    if (game_1.game.showHitboxes) {
                        Helpers.drawPolygon(game_1.game.ctx, this.collider.shape.points, true, "blue", "", 0, 0.5);
                    }
                };
                Geometry.prototype.onCollision = function (other) {
                };
                Geometry.prototype.onTrigger = function (other) {
                };
                return Geometry;
            }());
            exports_10("Geometry", Geometry);
        }
    };
});
System.register("engine/wall", ["engine/geometry"], function (exports_11, context_11) {
    "use strict";
    var __moduleName = context_11 && context_11.id;
    var geometry_1, Wall;
    return {
        setters: [
            function (geometry_1_1) {
                geometry_1 = geometry_1_1;
            }
        ],
        execute: function () {
            Wall = (function (_super) {
                __extends(Wall, _super);
                function Wall() {
                    return _super.call(this) || this;
                }
                return Wall;
            }(geometry_1.Geometry));
            exports_11("Wall", Wall);
        }
    };
});
System.register("engine/level", ["engine/wall", "engine/point", "engine/game", "engine/helpers", "engine/actor"], function (exports_12, context_12) {
    "use strict";
    var __moduleName = context_12 && context_12.id;
    var wall_1, point_4, game_2, Helpers, actor_1, Level;
    return {
        setters: [
            function (wall_1_1) {
                wall_1 = wall_1_1;
            },
            function (point_4_1) {
                point_4 = point_4_1;
            },
            function (game_2_1) {
                game_2 = game_2_1;
            },
            function (Helpers_2) {
                Helpers = Helpers_2;
            },
            function (actor_1_1) {
                actor_1 = actor_1_1;
            }
        ],
        execute: function () {
            Level = (function () {
                function Level(levelJson) {
                    this.gravity = 1000;
                    this.name = levelJson.name;
                    this.background = game_2.game.getBackground(levelJson.backgroundPath);
                    this.gameObjects = [];
                    for (var _i = 0, _a = levelJson.instances; _i < _a.length; _i++) {
                        var instance = _a[_i];
                        if (instance.className === "ShapeInstance") {
                            var wall = new wall_1.Wall();
                            for (var _b = 0, _c = instance.points; _b < _c.length; _b++) {
                                var point = _c[_b];
                                wall.collider.shape.points.push(new point_4.Point(point.x, point.y));
                            }
                            this.gameObjects.push(wall);
                        }
                        else {
                            var actor = new actor_1.Actor();
                            actor.sprite = game_2.game.sprites[instance.spriteName];
                            actor.pos = new point_4.Point(instance.pos.x, instance.pos.y);
                            actor.name = instance.name;
                            this.gameObjects.push(actor);
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
                    game_2.game.ctx.clearRect(0, 0, game_2.game.canvas.width, game_2.game.canvas.height);
                    Helpers.drawImage(game_2.game.ctx, this.background, 0, 0);
                    for (var _i = 0, _a = this.gameObjects; _i < _a.length; _i++) {
                        var go = _a[_i];
                        go.render();
                    }
                };
                Level.prototype.checkCollisionActor = function (actor, offsetX, offsetY) {
                    if (!actor.collider || actor.collider.isTrigger)
                        return false;
                    for (var _i = 0, _a = this.gameObjects; _i < _a.length; _i++) {
                        var go = _a[_i];
                        if (go === actor)
                            continue;
                        if (!go.collider || go.collider.isTrigger)
                            continue;
                        var actorShape = actor.collider.shape.clone(offsetX, offsetY);
                        if (go.collider.shape.intersectsShape(actorShape)) {
                            return true;
                        }
                    }
                    return false;
                };
                return Level;
            }());
            exports_12("Level", Level);
        }
    };
});
System.register("engine/game", ["engine/sprite", "engine/level", "sprites", "levels"], function (exports_13, context_13) {
    "use strict";
    var __moduleName = context_13 && context_13.id;
    var sprite_1, level_1, sprites_1, levels_1, Game, game;
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
            }
        ],
        execute: function () {
            Game = (function () {
                function Game() {
                    this.startTime = Date.now();
                    this.deltaTime = 1 / 60;
                    this.sprites = {};
                    this.levels = {};
                    this.spritesheets = {};
                    this.backgrounds = {};
                    this.isServer = false;
                    this.isClient = true;
                    this.showHitboxes = true;
                    this.canvas = $("#canvas")[0];
                    this.ctx = this.canvas.getContext("2d");
                }
                Game.prototype.start = function () {
                    var _this = this;
                    this.loadSprites();
                    this.loadLevels();
                    this.level = this.levels["new_level"];
                    window.setInterval(function () { return _this.gameLoop(); }, 1000 / 60);
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
                    return true;
                };
                Game.prototype.gameLoop = function () {
                    if (this.isLoaded()) {
                        this.deltaTime = (Date.now() - this.startTime) / 1000;
                        this.level.update();
                        this.level.render();
                        this.startTime = Date.now();
                    }
                };
                return Game;
            }());
            game = new Game();
            exports_13("game", game);
        }
    };
});
System.register("engine/sprite", ["engine/collider", "engine/frame", "engine/point", "engine/rect", "engine/game", "engine/helpers"], function (exports_14, context_14) {
    "use strict";
    var __moduleName = context_14 && context_14.id;
    var collider_2, frame_1, point_5, rect_2, game_3, Helpers, Sprite;
    return {
        setters: [
            function (collider_2_1) {
                collider_2 = collider_2_1;
            },
            function (frame_1_1) {
                frame_1 = frame_1_1;
            },
            function (point_5_1) {
                point_5 = point_5_1;
            },
            function (rect_2_1) {
                rect_2 = rect_2_1;
            },
            function (game_3_1) {
                game_3 = game_3_1;
            },
            function (Helpers_3) {
                Helpers = Helpers_3;
            }
        ],
        execute: function () {
            Sprite = (function () {
                function Sprite(spriteJson) {
                    this.name = spriteJson.name;
                    this.alignment = spriteJson.alignment;
                    this.frames = [];
                    this.hitboxes = [];
                    this.spritesheet = game_3.game.getSpritesheet(spriteJson.spritesheetPath);
                    for (var _i = 0, _a = spriteJson.hitboxes; _i < _a.length; _i++) {
                        var hitboxJson = _a[_i];
                        var hitbox = new collider_2.Collider([
                            new point_5.Point(hitboxJson.offset.x, hitboxJson.offset.y),
                            new point_5.Point(hitboxJson.offset.x + hitboxJson.width, hitboxJson.offset.y),
                            new point_5.Point(hitboxJson.offset.x + hitboxJson.width, hitboxJson.offset.y + hitboxJson.height),
                            new point_5.Point(hitboxJson.offset.x, hitboxJson.offset.y + hitboxJson.height)
                        ]);
                        this.hitboxes.push(hitbox);
                    }
                    for (var _b = 0, _c = spriteJson.frames; _b < _c.length; _b++) {
                        var frameJson = _c[_b];
                        var frame = new frame_1.Frame(new rect_2.Rect(new point_5.Point(frameJson.rect.topLeftPoint.x, frameJson.rect.topLeftPoint.y), new point_5.Point(frameJson.rect.botRightPoint.x, frameJson.rect.botRightPoint.y)), frameJson.duration, new point_5.Point(frameJson.offset.x, frameJson.offset.y));
                        this.frames.push(frame);
                    }
                }
                Sprite.prototype.getAlignOffset = function (frameIndex) {
                    var frame = this.frames[frameIndex];
                    var rect = frame.rect;
                    var offset = frame.offset;
                    var w = rect.w;
                    var h = rect.h;
                    var halfW = w * 0.5;
                    var halfH = h * 0.5;
                    var x;
                    var y;
                    var cX = 0;
                    var cY = 0;
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
                    return new point_5.Point(x + offset.x, y + offset.y);
                };
                Sprite.prototype.draw = function (frameIndex, x, y, flipX, flipY) {
                    var frame = this.frames[frameIndex];
                    var rect = frame.rect;
                    var offset = this.getAlignOffset(frameIndex);
                    Helpers.drawImage(game_3.game.ctx, this.spritesheet, rect.x1, rect.y1, rect.w, rect.h, x + offset.x, y + offset.y, flipX, flipY);
                };
                return Sprite;
            }());
            exports_14("Sprite", Sprite);
        }
    };
});
System.register("engine/actor", ["engine/point", "engine/game", "engine/helpers"], function (exports_15, context_15) {
    "use strict";
    var __moduleName = context_15 && context_15.id;
    var point_6, game_4, Helpers, Actor;
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
            Actor = (function () {
                function Actor() {
                    this.pos = new point_6.Point(0, 0);
                    this.vel = new point_6.Point(0, 0);
                    this.angle = 0;
                    this.useGravity = true;
                    this.frameIndex = 0;
                    this.name = "";
                }
                Actor.prototype.update = function () {
                    if (this.useGravity) {
                        this.vel.y += game_4.game.level.gravity * game_4.game.deltaTime;
                        if (this.vel.y > 1000) {
                            this.vel.y = 0;
                        }
                    }
                    var inc = this.vel.clone();
                    while (inc.magnitude > 0) {
                        if (game_4.game.level.checkCollisionActor(this, inc.x * game_4.game.deltaTime, inc.y * game_4.game.deltaTime)) {
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
                    this.pos.add(inc.multiply(game_4.game.deltaTime));
                };
                Actor.prototype.render = function () {
                    this.sprite.draw(this.frameIndex, this.pos.x, this.pos.y);
                    if (game_4.game.showHitboxes && this.collider) {
                        Helpers.drawPolygon(game_4.game.ctx, this.collider.shape.points, true, "blue", "", 0, 0.5);
                    }
                };
                Actor.prototype.onCollision = function (other) {
                };
                Actor.prototype.onTrigger = function (other) {
                };
                Object.defineProperty(Actor.prototype, "collider", {
                    get: function () {
                        if (this.sprite.hitboxes.length === 0)
                            return undefined;
                        var offset = this.sprite.getAlignOffset(this.frameIndex);
                        return this.sprite.hitboxes[0].clone(this.pos.x + offset.x, this.pos.y + offset.y);
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
                return Actor;
            }());
            exports_15("Actor", Actor);
        }
    };
});
System.register("engine/color", [], function (exports_16, context_16) {
    "use strict";
    var __moduleName = context_16 && context_16.id;
    var Color;
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
                return Color;
            }());
            exports_16("Color", Color);
        }
    };
});
//# sourceMappingURL=main.js.map