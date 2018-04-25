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
System.register("engine/collider", [], function (exports_5, context_5) {
    "use strict";
    var __moduleName = context_5 && context_5.id;
    var Collider;
    return {
        setters: [],
        execute: function () {
            Collider = (function () {
                function Collider(points) {
                    this.points = points;
                }
                Collider.prototype.onCollision = function (other) {
                };
                Collider.prototype.onTrigger = function (other) {
                };
                return Collider;
            }());
            exports_5("Collider", Collider);
        }
    };
});
System.register("engine/rect", ["engine/point"], function (exports_6, context_6) {
    "use strict";
    var __moduleName = context_6 && context_6.id;
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
            exports_6("Rect", Rect);
        }
    };
});
System.register("engine/frame", [], function (exports_7, context_7) {
    "use strict";
    var __moduleName = context_7 && context_7.id;
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
            exports_7("Frame", Frame);
        }
    };
});
System.register("engine/helpers", ["engine/point"], function (exports_8, context_8) {
    "use strict";
    var __moduleName = context_8 && context_8.id;
    function inRect(x, y, rect) {
        var rx = rect.x1;
        var ry = rect.y1;
        var rx2 = rect.x2;
        var ry2 = rect.y2;
        return x >= rx && x <= rx2 && y >= ry && y <= ry2;
    }
    exports_8("inRect", inRect);
    function inCircle(x, y, circleX, circleY, r) {
        if (Math.sqrt(Math.pow(x - circleX, 2) + Math.pow(y - circleY, 2)) <= r) {
            return true;
        }
        return false;
    }
    exports_8("inCircle", inCircle);
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
    exports_8("drawImage", drawImage);
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
    exports_8("drawRect", drawRect);
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
    exports_8("drawPolygon", drawPolygon);
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
    exports_8("pointInPolygon", pointInPolygon);
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
    exports_8("drawText", drawText);
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
    exports_8("drawCircle", drawCircle);
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
    exports_8("drawLine", drawLine);
    function linepointNearestMouse(x0, y0, x1, y1, x, y) {
        function lerp(a, b, x) { return (a + x * (b - a)); }
        ;
        var dx = x1 - x0;
        var dy = y1 - y0;
        var t = ((x - x0) * dx + (y - y0) * dy) / (dx * dx + dy * dy);
        var lineX = lerp(x0, x1, t);
        var lineY = lerp(y0, y1, t);
        return new point_2.Point(lineX, lineY);
    }
    exports_8("linepointNearestMouse", linepointNearestMouse);
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
    exports_8("inLine", inLine);
    var point_2;
    return {
        setters: [
            function (point_2_1) {
                point_2 = point_2_1;
            }
        ],
        execute: function () {
        }
    };
});
System.register("engine/geometry", ["engine/collider", "engine/game", "engine/helpers"], function (exports_9, context_9) {
    "use strict";
    var __moduleName = context_9 && context_9.id;
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
                        Helpers.drawPolygon(game_1.game.ctx, this.collider.points, true, "blue");
                    }
                };
                Geometry.prototype.onCollision = function (other) {
                };
                Geometry.prototype.onTrigger = function (other) {
                };
                return Geometry;
            }());
            exports_9("Geometry", Geometry);
        }
    };
});
System.register("engine/wall", ["engine/geometry"], function (exports_10, context_10) {
    "use strict";
    var __moduleName = context_10 && context_10.id;
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
            exports_10("Wall", Wall);
        }
    };
});
System.register("engine/level", ["engine/wall", "engine/point", "engine/game", "engine/helpers"], function (exports_11, context_11) {
    "use strict";
    var __moduleName = context_11 && context_11.id;
    var wall_1, point_3, game_2, Helpers, Level;
    return {
        setters: [
            function (wall_1_1) {
                wall_1 = wall_1_1;
            },
            function (point_3_1) {
                point_3 = point_3_1;
            },
            function (game_2_1) {
                game_2 = game_2_1;
            },
            function (Helpers_2) {
                Helpers = Helpers_2;
            }
        ],
        execute: function () {
            Level = (function () {
                function Level(levelJson) {
                    this.name = levelJson.name;
                    this.background = game_2.game.getBackground(levelJson.backgroundPath);
                    this.gameObjects = [];
                    for (var _i = 0, _a = levelJson.instances; _i < _a.length; _i++) {
                        var instance = _a[_i];
                        if (instance.className === "ShapeInstance") {
                            var wall = new wall_1.Wall();
                            for (var _b = 0, _c = instance.points; _b < _c.length; _b++) {
                                var point = _c[_b];
                                wall.collider.points.push(new point_3.Point(point.x, point.y));
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
                    Helpers.drawImage(game_2.game.ctx, this.background, 0, 0);
                };
                return Level;
            }());
            exports_11("Level", Level);
        }
    };
});
System.register("engine/game", ["engine/sprite", "engine/level", "sprites", "levels"], function (exports_12, context_12) {
    "use strict";
    var __moduleName = context_12 && context_12.id;
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
                        this.level.update();
                        this.level.render();
                    }
                };
                return Game;
            }());
            game = new Game();
            exports_12("game", game);
        }
    };
});
System.register("engine/sprite", ["engine/collider", "engine/frame", "engine/point", "engine/rect", "engine/game", "engine/helpers"], function (exports_13, context_13) {
    "use strict";
    var __moduleName = context_13 && context_13.id;
    var collider_2, frame_1, point_4, rect_1, game_3, Helpers, Sprite;
    return {
        setters: [
            function (collider_2_1) {
                collider_2 = collider_2_1;
            },
            function (frame_1_1) {
                frame_1 = frame_1_1;
            },
            function (point_4_1) {
                point_4 = point_4_1;
            },
            function (rect_1_1) {
                rect_1 = rect_1_1;
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
                            new point_4.Point(hitboxJson.rect.topLeftPoint.x, hitboxJson.rect.topLeftPoint.y),
                            new point_4.Point(hitboxJson.rect.botRightPoint.x, hitboxJson.rect.topLeftPoint.y),
                            new point_4.Point(hitboxJson.rect.botRightPoint.x, hitboxJson.rect.botRightPoint.y),
                            new point_4.Point(hitboxJson.rect.topLeftPoint.x, hitboxJson.rect.botRightPoint.y)
                        ]);
                        this.hitboxes.push(hitbox);
                    }
                    for (var _b = 0, _c = spriteJson.frames; _b < _c.length; _b++) {
                        var frameJson = _c[_b];
                        var frame = new frame_1.Frame(new rect_1.Rect(new point_4.Point(frameJson.rect.topLeftPoint.x, frameJson.rect.topLeftPoint.y), new point_4.Point(frameJson.rect.botRightPoint.x, frameJson.rect.botRightPoint.y)), frameJson.duration, new point_4.Point(frameJson.offset.x, frameJson.offset.y));
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
                    Helpers.drawImage(game_3.game.ctx, this.spritesheet, rect.x1, rect.y1, rect.w, rect.h, x + offset.x, y + offset.y, flipX, flipY);
                };
                return Sprite;
            }());
            exports_13("Sprite", Sprite);
        }
    };
});
System.register("engine/actor", [], function (exports_14, context_14) {
    "use strict";
    var __moduleName = context_14 && context_14.id;
    var Actor;
    return {
        setters: [],
        execute: function () {
            Actor = (function () {
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
            exports_14("Actor", Actor);
        }
    };
});
System.register("engine/color", [], function (exports_15, context_15) {
    "use strict";
    var __moduleName = context_15 && context_15.id;
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
            exports_15("Color", Color);
        }
    };
});
//# sourceMappingURL=main.js.map