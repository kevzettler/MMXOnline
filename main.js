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
                Point.prototype.add = function (other) {
                    var point = new Point(this.x + other.x, this.y + other.y);
                    return point;
                };
                Point.prototype.inc = function (other) {
                    this.x += other.x;
                    this.y += other.y;
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
                return Rect;
            }());
            exports_3("Rect", Rect);
        }
    };
});
System.register("shape", ["point", "rect"], function (exports_4, context_4) {
    "use strict";
    var __moduleName = context_4 && context_4.id;
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
System.register("helpers", ["point"], function (exports_5, context_5) {
    "use strict";
    var __moduleName = context_5 && context_5.id;
    function inRect(x, y, rect) {
        var rx = rect.x1;
        var ry = rect.y1;
        var rx2 = rect.x2;
        var ry2 = rect.y2;
        return x >= rx && x <= rx2 && y >= ry && y <= ry2;
    }
    exports_5("inRect", inRect);
    function inCircle(x, y, circleX, circleY, r) {
        if (Math.sqrt(Math.pow(x - circleX, 2) + Math.pow(y - circleY, 2)) <= r) {
            return true;
        }
        return false;
    }
    exports_5("inCircle", inCircle);
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
    exports_5("toZero", toZero);
    function incrementRange(num, min, max) {
        num++;
        if (num >= max)
            num = min;
        return num;
    }
    exports_5("incrementRange", incrementRange);
    function decrementRange(num, min, max) {
        num--;
        if (num < min)
            num = max - 1;
        return num;
    }
    exports_5("decrementRange", decrementRange);
    function clampMax(num, max) {
        return num < max ? num : max;
    }
    exports_5("clampMax", clampMax);
    function clampMin(num, min) {
        return num > min ? num : min;
    }
    exports_5("clampMin", clampMin);
    function clamp(num, min, max) {
        if (num < min)
            return min;
        if (num > max)
            return max;
        return num;
    }
    exports_5("clamp", clamp);
    function drawImage(ctx, imgEl, sX, sY, sW, sH, x, y, flipX, flipY, options) {
        if (!sW) {
            ctx.drawImage(imgEl, Math.round(sX), Math.round(sY));
            return;
        }
        helperCanvas.width = Math.round(sW);
        helperCanvas.height = Math.round(sH);
        helperCtx.save();
        flipX = flipX || 1;
        flipY = flipY || 1;
        helperCtx.scale(flipX, 1);
        helperCtx.clearRect(0, 0, helperCanvas.width, helperCanvas.height);
        helperCtx.drawImage(imgEl, Math.round(sX), Math.round(sY), Math.round(sW), Math.round(sH), 0, 0, flipX * Math.round(sW), flipY * Math.round(sH));
        if (options === "flash") {
            helperCanvas2.width = helperCanvas.width;
            helperCanvas2.height = helperCanvas.height;
            helperCtx2.drawImage(helperCanvas, 0, 0);
            helperCtx2.globalCompositeOperation = "source-atop";
            helperCtx2.fillStyle = "rgb(128,128,255)";
            helperCtx2.fillRect(0, 0, helperCanvas.width, helperCanvas.height);
            helperCtx2.globalCompositeOperation = "source-over";
            helperCanvas3.width = helperCanvas.width;
            helperCanvas3.height = helperCanvas.height;
            helperCtx3.drawImage(helperCanvas, 0, 0);
            helperCtx3.globalCompositeOperation = "lighter";
            helperCtx3.drawImage(helperCanvas2, 0, 0);
            helperCtx3.globalCompositeOperation = "source-over";
            if (flipX === 1)
                ctx.drawImage(helperCanvas3, Math.round(x), Math.round(y));
            else
                ctx.drawImage(helperCanvas3, Math.ceil(x), Math.ceil(y));
        }
        else {
            if (flipX === 1)
                ctx.drawImage(helperCanvas, Math.round(x), Math.round(y));
            else
                ctx.drawImage(helperCanvas, Math.ceil(x), Math.ceil(y));
        }
        helperCtx.restore();
    }
    exports_5("drawImage", drawImage);
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
    exports_5("drawRect", drawRect);
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
    exports_5("drawPolygon", drawPolygon);
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
    exports_5("pointInPolygon", pointInPolygon);
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
    exports_5("drawText", drawText);
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
    exports_5("drawCircle", drawCircle);
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
    exports_5("drawLine", drawLine);
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
    exports_5("linepointNearestMouse", linepointNearestMouse);
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
    exports_5("inLine", inLine);
    var point_3, helperCanvas, helperCtx, helperCanvas2, helperCtx2, helperCanvas3, helperCtx3;
    return {
        setters: [
            function (point_3_1) {
                point_3 = point_3_1;
            }
        ],
        execute: function () {
            helperCanvas = document.createElement("canvas");
            helperCtx = helperCanvas.getContext("2d");
            helperCanvas2 = document.createElement("canvas");
            helperCtx2 = helperCanvas2.getContext("2d");
            helperCanvas3 = document.createElement("canvas");
            helperCtx3 = helperCanvas3.getContext("2d");
        }
    };
});
System.register("geometry", ["collider", "game", "helpers"], function (exports_6, context_6) {
    "use strict";
    var __moduleName = context_6 && context_6.id;
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
                    this.collider = new collider_1.Collider([], false, this);
                }
                Geometry.prototype.preUpdate = function () {
                };
                Geometry.prototype.update = function () {
                };
                Geometry.prototype.render = function (x, y) {
                    if (game_1.game.showHitboxes) {
                        Helpers.drawPolygon(game_1.game.ctx, this.collider.shape.clone(x, y), true, "blue", "", 0, 0.5);
                    }
                };
                Geometry.prototype.onCollision = function (other) {
                };
                Geometry.prototype.onTrigger = function (other) {
                };
                return Geometry;
            }());
            exports_6("Geometry", Geometry);
        }
    };
});
System.register("wall", ["geometry"], function (exports_7, context_7) {
    "use strict";
    var __moduleName = context_7 && context_7.id;
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
            exports_7("Wall", Wall);
        }
    };
});
System.register("damager", [], function (exports_8, context_8) {
    "use strict";
    var __moduleName = context_8 && context_8.id;
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
            exports_8("Damager", Damager);
        }
    };
});
System.register("projectile", ["actor", "damager", "character", "game"], function (exports_9, context_9) {
    "use strict";
    var __moduleName = context_9 && context_9.id;
    var actor_1, damager_1, character_1, game_2, Projectile, BusterProj, Buster2Proj, Buster3Proj, TorpedoProj;
    return {
        setters: [
            function (actor_1_1) {
                actor_1 = actor_1_1;
            },
            function (damager_1_1) {
                damager_1 = damager_1_1;
            },
            function (character_1_1) {
                character_1 = character_1_1;
            },
            function (game_2_1) {
                game_2 = game_2_1;
            }
        ],
        execute: function () {
            Projectile = (function (_super) {
                __extends(Projectile, _super);
                function Projectile(pos, vel, damage, player, sprite) {
                    var _this = _super.call(this) || this;
                    _this.vel = vel;
                    _this.pos = pos;
                    _this.sprite = sprite;
                    _this.useGravity = false;
                    _this.flinch = false;
                    _this.damager = new damager_1.Damager(player, damage);
                    return _this;
                }
                Projectile.prototype.update = function () {
                    _super.prototype.update.call(this);
                    var leeway = 500;
                    if (this.pos.x > game_2.game.level.width + leeway || this.pos.x < -leeway || this.pos.y > game_2.game.level.height + leeway || this.pos.y < -leeway) {
                        this.destroySelf();
                    }
                };
                Projectile.prototype.onTrigger = function (other) {
                    var character = (other.gameObject instanceof character_1.Character) ? other.gameObject : undefined;
                    if (character && character.player.alliance !== this.damager.owner.alliance) {
                        this.onHit(character);
                    }
                    var wall = other.gameObject;
                    if (wall) {
                    }
                };
                Projectile.prototype.onHit = function (character) {
                    character.renderEffect = "flashonce";
                    character.applyDamage(this.damager.damage);
                    if (!this.flinch) {
                        game_2.game.playSound("hit");
                    }
                    else {
                        game_2.game.playSound("hurt");
                    }
                    this.destroySelf(this.fadeSprite, this.fadeSound);
                };
                return Projectile;
            }(actor_1.Actor));
            exports_9("Projectile", Projectile);
            BusterProj = (function (_super) {
                __extends(BusterProj, _super);
                function BusterProj(pos, vel, player) {
                    var _this = _super.call(this, pos, vel, 1, player, game_2.game.sprites["buster1"]) || this;
                    _this.fadeSprite = game_2.game.sprites["buster1_fade"];
                    return _this;
                }
                return BusterProj;
            }(Projectile));
            exports_9("BusterProj", BusterProj);
            Buster2Proj = (function (_super) {
                __extends(Buster2Proj, _super);
                function Buster2Proj(pos, vel, player) {
                    var _this = _super.call(this, pos, vel, 2, player, game_2.game.sprites["buster2"]) || this;
                    _this.fadeSprite = game_2.game.sprites["buster2_fade"];
                    _this.flinch = true;
                    return _this;
                }
                return Buster2Proj;
            }(Projectile));
            exports_9("Buster2Proj", Buster2Proj);
            Buster3Proj = (function (_super) {
                __extends(Buster3Proj, _super);
                function Buster3Proj(pos, vel, player) {
                    var _this = _super.call(this, pos, vel, 3, player, game_2.game.sprites["buster3"]) || this;
                    _this.fadeSprite = game_2.game.sprites["buster3_fade"];
                    _this.flinch = true;
                    return _this;
                }
                return Buster3Proj;
            }(Projectile));
            exports_9("Buster3Proj", Buster3Proj);
            TorpedoProj = (function (_super) {
                __extends(TorpedoProj, _super);
                function TorpedoProj(pos, vel, player) {
                    var _this = _super.call(this, pos, vel, 1, player, game_2.game.sprites["torpedo"]) || this;
                    _this.fadeSprite = game_2.game.sprites["explosion"];
                    _this.fadeSound = "explosion";
                    return _this;
                }
                return TorpedoProj;
            }(Projectile));
            exports_9("TorpedoProj", TorpedoProj);
        }
    };
});
System.register("weapon", ["projectile", "game"], function (exports_10, context_10) {
    "use strict";
    var __moduleName = context_10 && context_10.id;
    var projectile_1, game_3, Weapon, Buster, Torpedo;
    return {
        setters: [
            function (projectile_1_1) {
                projectile_1 = projectile_1_1;
            },
            function (game_3_1) {
                game_3 = game_3_1;
            }
        ],
        execute: function () {
            Weapon = (function () {
                function Weapon() {
                    this.ammo = 32;
                    this.maxAmmo = 32;
                    this.rateOfFire = 0.15;
                }
                Weapon.prototype.getProjectile = function (pos, vel, player, chargeLevel) {
                    return undefined;
                };
                Weapon.prototype.shoot = function (pos, vel, player, chargeLevel) {
                    var proj = this.getProjectile(pos, vel, player, chargeLevel);
                    game_3.game.playSound(this.shootSounds[chargeLevel]);
                    if (!(this instanceof Buster))
                        this.ammo--;
                };
                return Weapon;
            }());
            exports_10("Weapon", Weapon);
            Buster = (function (_super) {
                __extends(Buster, _super);
                function Buster() {
                    var _this = _super.call(this) || this;
                    _this.shootSounds = ["buster", "buster2", "buster3", "buster3"];
                    _this.index = 0;
                    return _this;
                }
                Buster.prototype.getProjectile = function (pos, vel, player, chargeLevel) {
                    if (chargeLevel === 1)
                        return new projectile_1.BusterProj(pos, vel, player);
                    else if (chargeLevel === 2)
                        return new projectile_1.Buster2Proj(pos, vel, player);
                    else if (chargeLevel === 3)
                        return new projectile_1.Buster3Proj(pos, vel, player);
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
                    return _this;
                }
                Torpedo.prototype.getProjectile = function (pos, vel, player, chargeLevel) {
                    return new projectile_1.TorpedoProj(pos, vel, player);
                };
                return Torpedo;
            }(Weapon));
            exports_10("Torpedo", Torpedo);
        }
    };
});
System.register("character", ["actor", "game", "point", "collider", "rect", "helpers"], function (exports_11, context_11) {
    "use strict";
    var __moduleName = context_11 && context_11.id;
    var actor_2, game_4, point_4, collider_2, rect_2, Helpers, Character, CharState, Idle, Run, Jump, Fall, Dash, WallSlide, WallKick;
    return {
        setters: [
            function (actor_2_1) {
                actor_2 = actor_2_1;
            },
            function (game_4_1) {
                game_4 = game_4_1;
            },
            function (point_4_1) {
                point_4 = point_4_1;
            },
            function (collider_2_1) {
                collider_2 = collider_2_1;
            },
            function (rect_2_1) {
                rect_2 = rect_2_1;
            },
            function (Helpers_2) {
                Helpers = Helpers_2;
            }
        ],
        execute: function () {
            Character = (function (_super) {
                __extends(Character, _super);
                function Character(player, x, y) {
                    var _this = _super.call(this) || this;
                    _this.pos.x = x;
                    _this.pos.y = y;
                    _this.player = player;
                    _this.isShooting = false;
                    _this.isDashing = false;
                    var rect = new rect_2.Rect(0, 0, 18, 34);
                    _this.globalCollider = new collider_2.Collider(rect.getPoints(), false, _this);
                    _this.changeState(new Idle());
                    _this.jumpPower = 350;
                    _this.runSpeed = 100;
                    _this.chargeTime = 0;
                    _this.charge1Time = 0.75;
                    _this.charge2Time = 1.5;
                    _this.charge3Time = 2.25;
                    return _this;
                }
                Character.prototype.preUpdate = function () {
                    _super.prototype.preUpdate.call(this);
                    this.changedStateInFrame = false;
                };
                Character.prototype.update = function () {
                    this.charState.update();
                    _super.prototype.update.call(this);
                    if (this.isShooting) {
                        this.shootTime += game_4.game.deltaTime;
                        if (this.shootTime >= this.player.weapon.rateOfFire) {
                            this.stopShoot();
                        }
                    }
                    if (this.player.inputPressed["weaponleft"]) {
                        this.player.weaponIndex = Helpers.decrementRange(this.player.weaponIndex, 0, this.player.weapons.length);
                    }
                    else if (this.player.inputPressed["weaponright"]) {
                        this.player.weaponIndex = Helpers.incrementRange(this.player.weaponIndex, 0, this.player.weapons.length);
                    }
                    if (this.isCharging()) {
                        this.renderEffect = game_4.game.level.twoFrameCycle > 0 ? "flash" : "";
                    }
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
                    this.renderEffect = "";
                };
                Character.prototype.shoot = function () {
                    if (!this.isShooting) {
                        this.isShooting = true;
                        this.shootTime = 0;
                        this.changeSprite(this.charState.shootSprite, false);
                        var vel = new point_4.Point(350 * this.xDir, 0);
                        if (this.charState instanceof WallSlide)
                            vel.x *= -1;
                        if (this.chargeTime < this.charge1Time) {
                            this.player.weapon.shoot(this.getShootPos(), vel, this.player, 1);
                        }
                        else if (this.chargeTime >= this.charge1Time && this.chargeTime < this.charge2Time) {
                            this.player.weapon.shoot(this.getShootPos(), vel, this.player, 2);
                        }
                        else if (this.chargeTime >= this.charge2Time && this.chargeTime < this.charge3Time) {
                            this.player.weapon.shoot(this.getShootPos(), vel, this.player, 3);
                        }
                        else if (this.chargeTime >= this.charge3Time) {
                            this.player.weapon.shoot(this.getShootPos(), vel, this.player, 4);
                        }
                    }
                };
                Character.prototype.stopShoot = function () {
                    if (this.isShooting) {
                        this.isShooting = false;
                        this.shootTime = 0;
                        this.changeSprite(this.charState.sprite, false);
                    }
                };
                Character.prototype.changeState = function (newState) {
                    if (this.charState && newState && this.charState.constructor === newState.constructor)
                        return;
                    if (this.changedStateInFrame)
                        return;
                    this.changedStateInFrame = true;
                    newState.character = this;
                    if (!this.isShooting || !newState.canShoot) {
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
                        this.stopShoot();
                    }
                };
                Character.prototype.applyDamage = function (damage) {
                    this.player.health -= damage;
                };
                return Character;
            }(actor_2.Actor));
            exports_11("Character", Character);
            CharState = (function () {
                function CharState(sprite, shootSprite) {
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
                        game_4.game.playSound(this.enterSound);
                };
                CharState.prototype.update = function () {
                    this.stateTime += game_4.game.deltaTime;
                    if (this.canShoot) {
                        if (this.player.inputPressed["shoot"] && this.player.weapon.ammo > 0) {
                            this.character.shoot();
                        }
                        if (this.player.input["shoot"]) {
                            this.character.chargeTime += game_4.game.deltaTime;
                        }
                        else {
                            if (this.character.isCharging()) {
                                this.character.shoot();
                            }
                            this.character.stopCharge();
                        }
                    }
                    this.lastLeftWall = game_4.game.level.checkCollisionActor(this.character, -1, 0);
                    this.lastRightWall = game_4.game.level.checkCollisionActor(this.character, 1, 0);
                };
                CharState.prototype.airCode = function () {
                    if (this.character.grounded) {
                        game_4.game.playSound("land");
                        this.character.changeState(new Idle());
                        return;
                    }
                    if (!this.player.input["jump"] && this.character.vel.y < 0) {
                        this.character.vel.y = 0;
                    }
                    if (game_4.game.level.checkCollisionActor(this.character, 0, -1)) {
                        this.character.vel.y = 0;
                    }
                    var move = new point_4.Point(0, 0);
                    var wallKick = (this instanceof WallKick) ? this : null;
                    if (this.player.input["left"]) {
                        if (!wallKick || wallKick.kickSpeed <= 0) {
                            move.x = -this.character.runSpeed * this.character.getDashSpeed();
                            this.character.xDir = -1;
                        }
                    }
                    else if (this.player.input["right"]) {
                        if (!wallKick || wallKick.kickSpeed >= 0) {
                            move.x = this.character.runSpeed * this.character.getDashSpeed();
                            this.character.xDir = 1;
                        }
                    }
                    if (move.magnitude > 0) {
                        this.character.move(move);
                    }
                    if (this.player.inputPressed["left"] || (this.player.input["left"] && (this.character.vel.y > 0 || !this.lastLeftWall))) {
                        if (this.lastLeftWall) {
                            this.player.character.changeState(new WallSlide(-1));
                            return;
                        }
                    }
                    else if (this.player.inputPressed["right"] || (this.player.input["right"] && (this.character.vel.y > 0 || !this.lastRightWall))) {
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
                    else if (this.player.inputPressed["jump"]) {
                        this.character.vel.y = -this.character.jumpPower;
                        this.character.changeState(new Jump());
                        return;
                    }
                };
                return CharState;
            }());
            Idle = (function (_super) {
                __extends(Idle, _super);
                function Idle() {
                    return _super.call(this, game_4.game.sprites["mmx_idle"], game_4.game.sprites["mmx_shoot"]) || this;
                }
                Idle.prototype.update = function () {
                    _super.prototype.update.call(this);
                    if (this.player.input["left"] || this.player.input["right"]) {
                        this.character.changeState(new Run());
                    }
                    this.groundCode();
                    if (this.player.inputPressed["dash"]) {
                        this.character.changeState(new Dash());
                    }
                };
                return Idle;
            }(CharState));
            Run = (function (_super) {
                __extends(Run, _super);
                function Run() {
                    return _super.call(this, game_4.game.sprites["mmx_run"], game_4.game.sprites["mmx_run_shoot"]) || this;
                }
                Run.prototype.update = function () {
                    _super.prototype.update.call(this);
                    var move = new point_4.Point(0, 0);
                    if (this.player.input["left"]) {
                        this.character.xDir = -1;
                        move.x = -this.character.runSpeed;
                    }
                    else if (this.player.input["right"]) {
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
                    if (this.player.inputPressed["dash"]) {
                        this.character.changeState(new Dash());
                    }
                };
                return Run;
            }(CharState));
            Jump = (function (_super) {
                __extends(Jump, _super);
                function Jump() {
                    var _this = _super.call(this, game_4.game.sprites["mmx_jump"], game_4.game.sprites["mmx_jump_shoot"]) || this;
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
                    return _super.call(this, game_4.game.sprites["mmx_fall"], game_4.game.sprites["mmx_fall_shoot"]) || this;
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
                    var _this = _super.call(this, game_4.game.sprites["mmx_dash"], game_4.game.sprites["mmx_dash_shoot"]) || this;
                    _this.dashTime = 0;
                    _this.enterSound = "dash";
                    return _this;
                }
                Dash.prototype.onEnter = function (oldState) {
                    _super.prototype.onEnter.call(this, oldState);
                    this.character.isDashing = true;
                };
                Dash.prototype.update = function () {
                    _super.prototype.update.call(this);
                    this.groundCode();
                    if (!this.player.input["dash"]) {
                        this.character.changeState(new Idle());
                        return;
                    }
                    this.dashTime += game_4.game.deltaTime;
                    if (this.dashTime > 0.5) {
                        this.character.changeState(new Idle());
                        return;
                    }
                    var move = new point_4.Point(0, 0);
                    move.x = this.character.runSpeed * this.character.getDashSpeed() * this.character.xDir;
                    this.character.move(move);
                };
                return Dash;
            }(CharState));
            WallSlide = (function (_super) {
                __extends(WallSlide, _super);
                function WallSlide(wallDir) {
                    var _this = _super.call(this, game_4.game.sprites["mmx_wall_slide"], game_4.game.sprites["mmx_wall_slide_shoot"]) || this;
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
                    if (this.player.inputPressed["jump"]) {
                        if (this.player.input["dash"]) {
                            this.character.isDashing = true;
                        }
                        this.character.vel.y = -this.character.jumpPower;
                        this.character.changeState(new WallKick(this.wallDir * -1));
                        return;
                    }
                    this.character.useGravity = false;
                    this.character.vel.y = 0;
                    if (this.stateTime > 0.15) {
                        var dirHeld = this.wallDir === -1 ? this.player.input["left"] : this.player.input["right"];
                        if (!dirHeld || !game_4.game.level.checkCollisionActor(this.character, this.wallDir, 0)) {
                            this.player.character.changeState(new Fall());
                        }
                        this.character.move(new point_4.Point(0, 100));
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
                    var _this = _super.call(this, game_4.game.sprites["mmx_wall_kick"], game_4.game.sprites["mmx_wall_kick_shoot"]) || this;
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
                        this.kickSpeed = Helpers.toZero(this.kickSpeed, 800 * game_4.game.deltaTime, this.kickDir);
                        this.character.move(new point_4.Point(this.kickSpeed, 0));
                    }
                    this.airCode();
                    if (this.character.vel.y > 0) {
                        this.character.changeState(new Fall());
                    }
                };
                WallKick.prototype.onEnter = function (oldState) {
                    _super.prototype.onEnter.call(this, oldState);
                };
                WallKick.prototype.onExit = function (newState) {
                    _super.prototype.onExit.call(this, newState);
                };
                return WallKick;
            }(CharState));
        }
    };
});
System.register("player", ["character", "weapon"], function (exports_12, context_12) {
    "use strict";
    var __moduleName = context_12 && context_12.id;
    var character_2, weapon_1, Player;
    return {
        setters: [
            function (character_2_1) {
                character_2 = character_2_1;
            },
            function (weapon_1_1) {
                weapon_1 = weapon_1_1;
            }
        ],
        execute: function () {
            Player = (function () {
                function Player(x, y, isAI, alliance) {
                    this.alliance = alliance;
                    this.isAI = isAI;
                    this.input = {};
                    this.inputPressed = {};
                    if (!isAI) {
                        this.inputMapping = {};
                        this.inputMapping[37] = "left";
                        this.inputMapping[39] = "right";
                        this.inputMapping[38] = "up";
                        this.inputMapping[40] = "down";
                        this.inputMapping[90] = "dash";
                        this.inputMapping[88] = "jump";
                        this.inputMapping[67] = "shoot";
                        this.inputMapping[65] = "weaponleft";
                        this.inputMapping[83] = "weaponright";
                    }
                    if (alliance === 1) {
                        this.inputMapping = {};
                    }
                    this.character = new character_2.Character(this, x, y);
                    this.health = 32;
                    this.maxHealth = this.health;
                    this.weapons = [
                        new weapon_1.Buster(),
                        new weapon_1.Torpedo()
                    ];
                    this.weaponIndex = 0;
                }
                Object.defineProperty(Player.prototype, "weapon", {
                    get: function () {
                        return this.weapons[this.weaponIndex];
                    },
                    enumerable: true,
                    configurable: true
                });
                Player.prototype.onKeyDown = function (keycode) {
                    if (this.isAI)
                        return;
                    var key = this.inputMapping[keycode];
                    if (!this.input[key])
                        this.inputPressed[key] = true;
                    this.input[key] = true;
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
                };
                return Player;
            }());
            exports_12("Player", Player);
        }
    };
});
System.register("level", ["wall", "point", "game", "helpers", "actor", "rect"], function (exports_13, context_13) {
    "use strict";
    var __moduleName = context_13 && context_13.id;
    var wall_1, point_5, game_5, Helpers, actor_3, rect_3, Level;
    return {
        setters: [
            function (wall_1_1) {
                wall_1 = wall_1_1;
            },
            function (point_5_1) {
                point_5 = point_5_1;
            },
            function (game_5_1) {
                game_5 = game_5_1;
            },
            function (Helpers_3) {
                Helpers = Helpers_3;
            },
            function (actor_3_1) {
                actor_3 = actor_3_1;
            },
            function (rect_3_1) {
                rect_3 = rect_3_1;
            }
        ],
        execute: function () {
            Level = (function () {
                function Level(levelJson) {
                    this.zoomScale = 3;
                    this.camX = 0;
                    this.camY = 0;
                    this.fixedCam = false;
                    this.gravity = 900;
                    this.name = levelJson.name;
                    this.background = game_5.game.getBackground(levelJson.backgroundPath);
                    this.frameCount = 0;
                    this.gameObjects = [];
                    for (var _i = 0, _a = levelJson.instances; _i < _a.length; _i++) {
                        var instance = _a[_i];
                        if (instance.className === "ShapeInstance") {
                            var wall = new wall_1.Wall();
                            for (var _b = 0, _c = instance.points; _b < _c.length; _b++) {
                                var point = _c[_b];
                                wall.collider.shape.points.push(new point_5.Point(point.x, point.y));
                            }
                            this.gameObjects.push(wall);
                        }
                        else {
                            var actor = new actor_3.Actor();
                            actor.sprite = game_5.game.sprites[instance.spriteName];
                            actor.pos = new point_5.Point(instance.pos.x, instance.pos.y);
                            actor.name = instance.name;
                            this.gameObjects.push(actor);
                        }
                    }
                    this.localPlayers = [];
                    this.players = [];
                    this.twoFrameCycle = 0;
                }
                Level.prototype.update = function () {
                    for (var _i = 0, _a = this.gameObjects; _i < _a.length; _i++) {
                        var go = _a[_i];
                        go.preUpdate();
                        go.update();
                    }
                    this.render();
                    for (var _b = 0, _c = this.localPlayers; _b < _c.length; _b++) {
                        var player = _c[_b];
                        player.clearInputPressed();
                    }
                    this.frameCount++;
                    this.twoFrameCycle++;
                    if (this.twoFrameCycle > 2)
                        this.twoFrameCycle = -2;
                };
                Level.prototype.render = function () {
                    game_5.game.canvas.width = Math.min(game_5.game.canvas.width, this.background.width * this.zoomScale);
                    game_5.game.canvas.height = Math.min(game_5.game.canvas.height, this.background.height * this.zoomScale);
                    if (this.mainPlayer.character) {
                        this.computeCamPos(this.mainPlayer.character);
                    }
                    game_5.game.ctx.setTransform(this.zoomScale, 0, 0, this.zoomScale, 0, 0);
                    game_5.game.ctx.clearRect(0, 0, game_5.game.canvas.width, game_5.game.canvas.height);
                    Helpers.drawRect(game_5.game.ctx, new rect_3.Rect(0, 0, game_5.game.canvas.width, game_5.game.canvas.height), "gray");
                    Helpers.drawImage(game_5.game.ctx, this.background, -this.camX, -this.camY);
                    for (var _i = 0, _a = this.gameObjects; _i < _a.length; _i++) {
                        var go = _a[_i];
                        go.render(-this.camX, -this.camY);
                    }
                    this.drawHUD();
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
                        baseX = game_5.game.canvas.width / this.zoomScale - 4 - baseX;
                    var baseY = game_5.game.canvas.height / this.zoomScale / 2;
                    baseY += 25;
                    game_5.game.sprites["hud_health_base"].draw(0, baseX, baseY);
                    baseY -= 16;
                    for (var i = 0; i < player.health; i++) {
                        game_5.game.sprites["hud_health_full"].draw(0, baseX, baseY);
                        baseY -= 2;
                    }
                    for (var i = 0; i < player.maxHealth - player.health; i++) {
                        game_5.game.sprites["hud_health_empty"].draw(0, baseX, baseY);
                        baseY -= 2;
                    }
                    game_5.game.sprites["hud_health_top"].draw(0, baseX, baseY);
                    if (player.weaponIndex !== 0) {
                        baseX = 25;
                        if (playerNum === 2)
                            baseX = game_5.game.canvas.width / this.zoomScale - 4 - baseX;
                        baseY = game_5.game.canvas.height / this.zoomScale / 2;
                        baseY += 25;
                        game_5.game.sprites["hud_weapon_base"].draw(player.weapon.index - 1, baseX, baseY);
                        baseY -= 16;
                        for (var i = 0; i < player.weapon.ammo; i++) {
                            game_5.game.sprites["hud_weapon_full"].draw(player.weapon.index - 1, baseX, baseY);
                            baseY -= 2;
                        }
                        for (var i = 0; i < player.weapon.maxAmmo - player.weapon.ammo; i++) {
                            game_5.game.sprites["hud_health_empty"].draw(0, baseX, baseY);
                            baseY -= 2;
                        }
                        game_5.game.sprites["hud_health_top"].draw(0, baseX, baseY);
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
                    var scaledCanvasW = game_5.game.canvas.width / this.zoomScale;
                    var scaledCanvasH = game_5.game.canvas.height / this.zoomScale;
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
                };
                Level.prototype.addGameObject = function (go) {
                    this.gameObjects.push(go);
                };
                Level.prototype.checkCollisionActor = function (actor, offsetX, offsetY) {
                    if (!actor.collider || actor.collider.isTrigger)
                        return undefined;
                    for (var _i = 0, _a = this.gameObjects; _i < _a.length; _i++) {
                        var go = _a[_i];
                        if (go === actor)
                            continue;
                        if (!go.collider || go.collider.isTrigger)
                            continue;
                        var actorShape = actor.collider.shape.clone(offsetX, offsetY);
                        if (go.collider.shape.intersectsShape(actorShape)) {
                            return go.collider;
                        }
                    }
                    return undefined;
                };
                Level.prototype.checkTriggerActor = function (actor, offsetX, offsetY) {
                    if (!actor.collider)
                        return undefined;
                    for (var _i = 0, _a = this.gameObjects; _i < _a.length; _i++) {
                        var go = _a[_i];
                        if (go === actor)
                            continue;
                        if (!go.collider)
                            continue;
                        if (!go.collider.isTrigger && !actor.collider.isTrigger)
                            continue;
                        var actorShape = actor.collider.shape.clone(offsetX, offsetY);
                        if (go.collider.shape.intersectsShape(actorShape)) {
                            return go.collider;
                        }
                    }
                    return undefined;
                };
                return Level;
            }());
            exports_13("Level", Level);
        }
    };
});
System.register("sprites", [], function (exports_14, context_14) {
    "use strict";
    var __moduleName = context_14 && context_14.id;
    var spriteJsons;
    return {
        setters: [],
        execute: function () {
            spriteJsons = [{ "className": "Sprite", "hitboxes": [{ "className": "Hitbox", "tags": "", "width": 8, "height": 6, "offset": { "className": "Point", "x": 0, "y": 0 }, "rect": { "className": "Rect", "topLeftPoint": { "className": "Point", "x": 346, "y": 297 }, "botRightPoint": { "className": "Point", "x": 354, "y": 303 } }, "isTrigger": true }], "frames": [{ "className": "Frame", "rect": { "className": "Rect", "topLeftPoint": { "className": "Point", "x": 123, "y": 253 }, "botRightPoint": { "className": "Point", "x": 131, "y": 259 } }, "duration": 0.066, "offset": { "className": "Point", "x": 0, "y": 0 }, "hitboxes": [], "POIs": [] }], "POIs": [], "name": "buster1", "path": "assets/sprites/buster1.json", "alignment": "center", "wrapMode": "once", "spritesheetPath": "assets/spritesheets/effects.png" }, { "className": "Sprite", "hitboxes": [], "frames": [{ "className": "Frame", "rect": { "className": "Rect", "topLeftPoint": { "className": "Point", "x": 137, "y": 250 }, "botRightPoint": { "className": "Point", "x": 149, "y": 262 } }, "duration": 0.03, "offset": { "className": "Point", "x": 0, "y": 0 }, "hitboxes": [], "POIs": [] }, { "className": "Frame", "rect": { "className": "Rect", "topLeftPoint": { "className": "Point", "x": 154, "y": 249 }, "botRightPoint": { "className": "Point", "x": 167, "y": 262 } }, "duration": 0.03, "offset": { "className": "Point", "x": 0, "y": 0 }, "hitboxes": [], "POIs": [] }, { "className": "Frame", "rect": { "className": "Rect", "topLeftPoint": { "className": "Point", "x": 172, "y": 248 }, "botRightPoint": { "className": "Point", "x": 187, "y": 263 } }, "duration": 0.03, "offset": { "className": "Point", "x": 0, "y": 0 }, "hitboxes": [], "POIs": [] }], "POIs": [], "name": "buster1_fade", "path": "assets/sprites/buster1_fade.json", "alignment": "center", "wrapMode": "once", "spritesheetPath": "assets/spritesheets/effects.png" }, { "className": "Sprite", "hitboxes": [{ "className": "Hitbox", "tags": "", "width": 22, "height": 8, "offset": { "className": "Point", "x": 5, "y": 0 }, "rect": { "className": "Rect", "topLeftPoint": { "className": "Point", "x": 344, "y": 296 }, "botRightPoint": { "className": "Point", "x": 366, "y": 304 } }, "isTrigger": true }], "frames": [{ "className": "Frame", "rect": { "className": "Rect", "topLeftPoint": { "className": "Point", "x": 138, "y": 274 }, "botRightPoint": { "className": "Point", "x": 153, "y": 288 } }, "duration": 0.03, "offset": { "className": "Point", "x": 0, "y": 0 }, "hitboxes": [], "POIs": [] }, { "className": "Frame", "rect": { "className": "Rect", "topLeftPoint": { "className": "Point", "x": 158, "y": 269 }, "botRightPoint": { "className": "Point", "x": 182, "y": 293 } }, "duration": 0.03, "offset": { "className": "Point", "x": 0, "y": 0 }, "hitboxes": [], "POIs": [] }, { "className": "Frame", "rect": { "className": "Rect", "topLeftPoint": { "className": "Point", "x": 187, "y": 275 }, "botRightPoint": { "className": "Point", "x": 215, "y": 287 } }, "duration": 0.03, "offset": { "className": "Point", "x": 0, "y": 0 }, "hitboxes": [], "POIs": [] }, { "className": "Frame", "rect": { "className": "Rect", "topLeftPoint": { "className": "Point", "x": 221, "y": 277 }, "botRightPoint": { "className": "Point", "x": 253, "y": 285 } }, "duration": 0.03, "offset": { "className": "Point", "x": 0, "y": 0 }, "hitboxes": [], "POIs": [] }, { "className": "Frame", "rect": { "className": "Rect", "topLeftPoint": { "className": "Point", "x": 260, "y": 275 }, "botRightPoint": { "className": "Point", "x": 298, "y": 287 } }, "duration": 0.03, "offset": { "className": "Point", "x": 0, "y": 0 }, "hitboxes": [], "POIs": [] }, { "className": "Frame", "rect": { "className": "Rect", "topLeftPoint": { "className": "Point", "x": 303, "y": 270 }, "botRightPoint": { "className": "Point", "x": 339, "y": 292 } }, "duration": 0.03, "offset": { "className": "Point", "x": 0, "y": 0 }, "hitboxes": [], "POIs": [] }, { "className": "Frame", "rect": { "className": "Rect", "topLeftPoint": { "className": "Point", "x": 344, "y": 275 }, "botRightPoint": { "className": "Point", "x": 382, "y": 287 } }, "duration": 0.03, "offset": { "className": "Point", "x": 0, "y": 0 }, "hitboxes": [], "POIs": [] }, { "className": "Frame", "rect": { "className": "Rect", "topLeftPoint": { "className": "Point", "x": 388, "y": 270 }, "botRightPoint": { "className": "Point", "x": 428, "y": 289 } }, "duration": 0.03, "offset": { "className": "Point", "x": 0, "y": 0 }, "hitboxes": [], "POIs": [] }], "POIs": [], "name": "buster2", "path": "assets/sprites/buster2.json", "alignment": "center", "wrapMode": "once", "spritesheetPath": "assets/spritesheets/effects.png" }, { "className": "Sprite", "hitboxes": [], "frames": [{ "className": "Frame", "rect": { "className": "Rect", "topLeftPoint": { "className": "Point", "x": 434, "y": 274 }, "botRightPoint": { "className": "Point", "x": 449, "y": 288 } }, "duration": 0.03, "offset": { "className": "Point", "x": 0, "y": 0 }, "hitboxes": [], "POIs": [] }, { "className": "Frame", "rect": { "className": "Rect", "topLeftPoint": { "className": "Point", "x": 454, "y": 269 }, "botRightPoint": { "className": "Point", "x": 478, "y": 293 } }, "duration": 0.03, "offset": { "className": "Point", "x": 0, "y": 0 }, "hitboxes": [], "POIs": [] }, { "className": "Frame", "rect": { "className": "Rect", "topLeftPoint": { "className": "Point", "x": 487, "y": 273 }, "botRightPoint": { "className": "Point", "x": 503, "y": 289 } }, "duration": 0.03, "offset": { "className": "Point", "x": 0, "y": 0 }, "hitboxes": [], "POIs": [] }, { "className": "Frame", "rect": { "className": "Rect", "topLeftPoint": { "className": "Point", "x": 507, "y": 269 }, "botRightPoint": { "className": "Point", "x": 531, "y": 293 } }, "duration": 0.03, "offset": { "className": "Point", "x": 0, "y": 0 }, "hitboxes": [], "POIs": [] }, { "className": "Frame", "rect": { "className": "Rect", "topLeftPoint": { "className": "Point", "x": 535, "y": 273 }, "botRightPoint": { "className": "Point", "x": 551, "y": 289 } }, "duration": 0.03, "offset": { "className": "Point", "x": 0, "y": 0 }, "hitboxes": [], "POIs": [] }, { "className": "Frame", "rect": { "className": "Rect", "topLeftPoint": { "className": "Point", "x": 555, "y": 270 }, "botRightPoint": { "className": "Point", "x": 577, "y": 292 } }, "duration": 0.03, "offset": { "className": "Point", "x": 0, "y": 0 }, "hitboxes": [], "POIs": [] }, { "className": "Frame", "rect": { "className": "Rect", "topLeftPoint": { "className": "Point", "x": 581, "y": 269 }, "botRightPoint": { "className": "Point", "x": 605, "y": 293 } }, "duration": 0.03, "offset": { "className": "Point", "x": 0, "y": 0 }, "hitboxes": [], "POIs": [] }, { "className": "Frame", "rect": { "className": "Rect", "topLeftPoint": { "className": "Point", "x": 609, "y": 269 }, "botRightPoint": { "className": "Point", "x": 633, "y": 293 } }, "duration": 0.03, "offset": { "className": "Point", "x": 0, "y": 0 }, "hitboxes": [], "POIs": [] }], "POIs": [], "name": "buster2_fade", "path": "assets/sprites/buster2_fade.json", "alignment": "center", "wrapMode": "once", "spritesheetPath": "assets/spritesheets/effects.png" }, { "className": "Sprite", "hitboxes": [{ "className": "Hitbox", "tags": "", "width": 24, "height": 24, "offset": { "className": "Point", "x": 0, "y": 0 }, "rect": { "className": "Rect", "topLeftPoint": { "className": "Point", "x": 338, "y": 288 }, "botRightPoint": { "className": "Point", "x": 362, "y": 312 } }, "isTrigger": true }], "frames": [{ "className": "Frame", "rect": { "className": "Rect", "topLeftPoint": { "className": "Point", "x": 148, "y": 319 }, "botRightPoint": { "className": "Point", "x": 162, "y": 339 } }, "duration": 0.03, "offset": { "className": "Point", "x": 0, "y": 0 }, "hitboxes": [], "POIs": [] }, { "className": "Frame", "rect": { "className": "Rect", "topLeftPoint": { "className": "Point", "x": 170, "y": 321 }, "botRightPoint": { "className": "Point", "x": 193, "y": 337 } }, "duration": 0.03, "offset": { "className": "Point", "x": 0, "y": 0 }, "hitboxes": [], "POIs": [] }, { "className": "Frame", "rect": { "className": "Rect", "topLeftPoint": { "className": "Point", "x": 199, "y": 313 }, "botRightPoint": { "className": "Point", "x": 231, "y": 345 } }, "duration": 0.03, "offset": { "className": "Point", "x": 0, "y": 0 }, "hitboxes": [], "POIs": [] }, { "className": "Frame", "rect": { "className": "Rect", "topLeftPoint": { "className": "Point", "x": 239, "y": 317 }, "botRightPoint": { "className": "Point", "x": 266, "y": 341 } }, "duration": 0.03, "offset": { "className": "Point", "x": 0, "y": 0 }, "hitboxes": [], "POIs": [] }, { "className": "Frame", "rect": { "className": "Rect", "topLeftPoint": { "className": "Point", "x": 271, "y": 313 }, "botRightPoint": { "className": "Point", "x": 311, "y": 345 } }, "duration": 0.03, "offset": { "className": "Point", "x": 0, "y": 0 }, "hitboxes": [], "POIs": [] }], "POIs": [], "name": "buster3", "path": "assets/sprites/buster3.json", "alignment": "center", "wrapMode": "once", "spritesheetPath": "assets/spritesheets/effects.png" }, { "className": "Sprite", "hitboxes": [], "frames": [{ "className": "Frame", "rect": { "className": "Rect", "topLeftPoint": { "className": "Point", "x": 320, "y": 319 }, "botRightPoint": { "className": "Point", "x": 334, "y": 339 } }, "duration": 0.03, "offset": { "className": "Point", "x": 0, "y": 0 }, "hitboxes": [], "POIs": [] }, { "className": "Frame", "rect": { "className": "Rect", "topLeftPoint": { "className": "Point", "x": 341, "y": 315 }, "botRightPoint": { "className": "Point", "x": 365, "y": 343 } }, "duration": 0.03, "offset": { "className": "Point", "x": 0, "y": 0 }, "hitboxes": [], "POIs": [] }, { "className": "Frame", "rect": { "className": "Rect", "topLeftPoint": { "className": "Point", "x": 374, "y": 315 }, "botRightPoint": { "className": "Point", "x": 402, "y": 343 } }, "duration": 0.03, "offset": { "className": "Point", "x": 0, "y": 0 }, "hitboxes": [], "POIs": [] }, { "className": "Frame", "rect": { "className": "Rect", "topLeftPoint": { "className": "Point", "x": 406, "y": 316 }, "botRightPoint": { "className": "Point", "x": 432, "y": 342 } }, "duration": 0.03, "offset": { "className": "Point", "x": 0, "y": 0 }, "hitboxes": [], "POIs": [] }, { "className": "Frame", "rect": { "className": "Rect", "topLeftPoint": { "className": "Point", "x": 436, "y": 315 }, "botRightPoint": { "className": "Point", "x": 464, "y": 343 } }, "duration": 0.03, "offset": { "className": "Point", "x": 0, "y": 0 }, "hitboxes": [], "POIs": [] }, { "className": "Frame", "rect": { "className": "Rect", "topLeftPoint": { "className": "Point", "x": 468, "y": 314 }, "botRightPoint": { "className": "Point", "x": 498, "y": 344 } }, "duration": 0.03, "offset": { "className": "Point", "x": 0, "y": 0 }, "hitboxes": [], "POIs": [] }, { "className": "Frame", "rect": { "className": "Rect", "topLeftPoint": { "className": "Point", "x": 502, "y": 313 }, "botRightPoint": { "className": "Point", "x": 534, "y": 345 } }, "duration": 0.03, "offset": { "className": "Point", "x": 0, "y": 0 }, "hitboxes": [], "POIs": [] }, { "className": "Frame", "rect": { "className": "Rect", "topLeftPoint": { "className": "Point", "x": 538, "y": 313 }, "botRightPoint": { "className": "Point", "x": 570, "y": 345 } }, "duration": 0.03, "offset": { "className": "Point", "x": 0, "y": 0 }, "hitboxes": [], "POIs": [] }], "POIs": [], "name": "buster3_fade", "path": "assets/sprites/buster3_fade.json", "alignment": "center", "wrapMode": "once", "spritesheetPath": "assets/spritesheets/effects.png" }, { "className": "Sprite", "hitboxes": [], "frames": [{ "className": "Frame", "rect": { "className": "Rect", "topLeftPoint": { "className": "Point", "x": 591, "y": 315 }, "botRightPoint": { "className": "Point", "x": 607, "y": 331 } }, "duration": 0.03, "offset": { "className": "Point", "x": -1, "y": 0 }, "hitboxes": [], "POIs": [] }, { "className": "Frame", "rect": { "className": "Rect", "topLeftPoint": { "className": "Point", "x": 617, "y": 315 }, "botRightPoint": { "className": "Point", "x": 649, "y": 347 } }, "duration": 0.03, "offset": { "className": "Point", "x": 0, "y": 0 }, "hitboxes": [], "POIs": [] }, { "className": "Frame", "rect": { "className": "Rect", "topLeftPoint": { "className": "Point", "x": 659, "y": 315 }, "botRightPoint": { "className": "Point", "x": 687, "y": 339 } }, "duration": 0.03, "offset": { "className": "Point", "x": 0, "y": 0 }, "hitboxes": [], "POIs": [] }, { "className": "Frame", "rect": { "className": "Rect", "topLeftPoint": { "className": "Point", "x": 697, "y": 315 }, "botRightPoint": { "className": "Point", "x": 727, "y": 342 } }, "duration": 0.03, "offset": { "className": "Point", "x": 0, "y": 0 }, "hitboxes": [], "POIs": [] }, { "className": "Frame", "rect": { "className": "Rect", "topLeftPoint": { "className": "Point", "x": 737, "y": 315 }, "botRightPoint": { "className": "Point", "x": 769, "y": 342 } }, "duration": 0.03, "offset": { "className": "Point", "x": 0, "y": 0 }, "hitboxes": [], "POIs": [] }, { "className": "Frame", "rect": { "className": "Rect", "topLeftPoint": { "className": "Point", "x": 779, "y": 315 }, "botRightPoint": { "className": "Point", "x": 811, "y": 345 } }, "duration": 0.03, "offset": { "className": "Point", "x": 0, "y": 0 }, "hitboxes": [], "POIs": [] }, { "className": "Frame", "rect": { "className": "Rect", "topLeftPoint": { "className": "Point", "x": 821, "y": 315 }, "botRightPoint": { "className": "Point", "x": 852, "y": 337 } }, "duration": 0.03, "offset": { "className": "Point", "x": 0, "y": 0 }, "hitboxes": [], "POIs": [] }, { "className": "Frame", "rect": { "className": "Rect", "topLeftPoint": { "className": "Point", "x": 863, "y": 315 }, "botRightPoint": { "className": "Point", "x": 894, "y": 330 } }, "duration": 0.03, "offset": { "className": "Point", "x": 0, "y": 0 }, "hitboxes": [], "POIs": [] }], "POIs": [], "name": "explosion", "path": "assets/sprites/explosion.json", "alignment": "center", "wrapMode": "once", "spritesheetPath": "assets/spritesheets/effects.png" }, { "className": "Sprite", "hitboxes": [], "frames": [{ "className": "Frame", "rect": { "className": "Rect", "topLeftPoint": { "className": "Point", "x": 2, "y": 55 }, "botRightPoint": { "className": "Point", "x": 16, "y": 71 } }, "duration": 1, "offset": { "className": "Point", "x": 0, "y": 0 }, "hitboxes": [], "POIs": [] }], "POIs": [], "name": "hud_health_base", "path": "assets/sprites/hud_health_base.json", "alignment": "botmid", "wrapMode": "once", "spritesheetPath": "assets/spritesheets/effects.png" }, { "className": "Sprite", "hitboxes": [], "frames": [{ "className": "Frame", "rect": { "className": "Rect", "topLeftPoint": { "className": "Point", "x": 2, "y": 37 }, "botRightPoint": { "className": "Point", "x": 16, "y": 39 } }, "duration": 0.066, "offset": { "className": "Point", "x": 0, "y": 0 }, "hitboxes": [], "POIs": [] }], "POIs": [], "name": "hud_health_empty", "path": "assets/sprites/hud_health_empty.json", "alignment": "botmid", "wrapMode": "once", "spritesheetPath": "assets/spritesheets/effects.png" }, { "className": "Sprite", "hitboxes": [], "frames": [{ "className": "Frame", "rect": { "className": "Rect", "topLeftPoint": { "className": "Point", "x": 2, "y": 51 }, "botRightPoint": { "className": "Point", "x": 16, "y": 53 } }, "duration": 0.066, "offset": { "className": "Point", "x": 0, "y": 0 }, "hitboxes": [], "POIs": [] }], "POIs": [], "name": "hud_health_full", "path": "assets/sprites/hud_health_full.json", "alignment": "botmid", "wrapMode": "once", "spritesheetPath": "assets/spritesheets/effects.png" }, { "className": "Sprite", "hitboxes": [], "frames": [{ "className": "Frame", "rect": { "className": "Rect", "topLeftPoint": { "className": "Point", "x": 2, "y": 13 }, "botRightPoint": { "className": "Point", "x": 16, "y": 16 } }, "duration": 0.066, "offset": { "className": "Point", "x": 0, "y": 0 }, "hitboxes": [], "POIs": [] }], "POIs": [], "name": "hud_health_top", "path": "assets/sprites/hud_health_top.json", "alignment": "botmid", "wrapMode": "once", "spritesheetPath": "assets/spritesheets/effects.png" }, { "className": "Sprite", "hitboxes": [], "frames": [{ "className": "Frame", "rect": { "className": "Rect", "topLeftPoint": { "className": "Point", "x": 138, "y": 55 }, "botRightPoint": { "className": "Point", "x": 152, "y": 71 } }, "duration": 0.066, "offset": { "className": "Point", "x": 0, "y": 0 }, "hitboxes": [], "POIs": [] }, { "className": "Frame", "rect": { "className": "Rect", "topLeftPoint": { "className": "Point", "x": 154, "y": 55 }, "botRightPoint": { "className": "Point", "x": 168, "y": 71 } }, "duration": 0.066, "offset": { "className": "Point", "x": 0, "y": 0 }, "hitboxes": [], "POIs": [] }, { "className": "Frame", "rect": { "className": "Rect", "topLeftPoint": { "className": "Point", "x": 170, "y": 55 }, "botRightPoint": { "className": "Point", "x": 184, "y": 71 } }, "duration": 0.066, "offset": { "className": "Point", "x": 0, "y": 0 }, "hitboxes": [], "POIs": [] }, { "className": "Frame", "rect": { "className": "Rect", "topLeftPoint": { "className": "Point", "x": 186, "y": 55 }, "botRightPoint": { "className": "Point", "x": 200, "y": 71 } }, "duration": 0.066, "offset": { "className": "Point", "x": 0, "y": 0 }, "hitboxes": [], "POIs": [] }, { "className": "Frame", "rect": { "className": "Rect", "topLeftPoint": { "className": "Point", "x": 202, "y": 55 }, "botRightPoint": { "className": "Point", "x": 216, "y": 71 } }, "duration": 0.066, "offset": { "className": "Point", "x": 0, "y": 0 }, "hitboxes": [], "POIs": [] }, { "className": "Frame", "rect": { "className": "Rect", "topLeftPoint": { "className": "Point", "x": 218, "y": 55 }, "botRightPoint": { "className": "Point", "x": 232, "y": 71 } }, "duration": 0.066, "offset": { "className": "Point", "x": 0, "y": 0 }, "hitboxes": [], "POIs": [] }, { "className": "Frame", "rect": { "className": "Rect", "topLeftPoint": { "className": "Point", "x": 234, "y": 55 }, "botRightPoint": { "className": "Point", "x": 248, "y": 71 } }, "duration": 0.066, "offset": { "className": "Point", "x": 0, "y": 0 }, "hitboxes": [], "POIs": [] }, { "className": "Frame", "rect": { "className": "Rect", "topLeftPoint": { "className": "Point", "x": 250, "y": 55 }, "botRightPoint": { "className": "Point", "x": 264, "y": 71 } }, "duration": 0.066, "offset": { "className": "Point", "x": 0, "y": 0 }, "hitboxes": [], "POIs": [] }], "POIs": [], "name": "hud_weapon_base", "path": "sprites/hud_weapon_base.json", "alignment": "botmid", "wrapMode": "once", "spritesheetPath": "assets/spritesheets/effects.png" }, { "className": "Sprite", "hitboxes": [], "frames": [{ "className": "Frame", "rect": { "className": "Rect", "topLeftPoint": { "className": "Point", "x": 138, "y": 51 }, "botRightPoint": { "className": "Point", "x": 152, "y": 53 } }, "duration": 0.066, "offset": { "className": "Point", "x": 0, "y": 0 }, "hitboxes": [], "POIs": [] }, { "className": "Frame", "rect": { "className": "Rect", "topLeftPoint": { "className": "Point", "x": 154, "y": 51 }, "botRightPoint": { "className": "Point", "x": 168, "y": 53 } }, "duration": 0.066, "offset": { "className": "Point", "x": 0, "y": 0 }, "hitboxes": [], "POIs": [] }, { "className": "Frame", "rect": { "className": "Rect", "topLeftPoint": { "className": "Point", "x": 170, "y": 51 }, "botRightPoint": { "className": "Point", "x": 184, "y": 53 } }, "duration": 0.066, "offset": { "className": "Point", "x": 0, "y": 0 }, "hitboxes": [], "POIs": [] }, { "className": "Frame", "rect": { "className": "Rect", "topLeftPoint": { "className": "Point", "x": 186, "y": 51 }, "botRightPoint": { "className": "Point", "x": 200, "y": 53 } }, "duration": 0.066, "offset": { "className": "Point", "x": 0, "y": 0 }, "hitboxes": [], "POIs": [] }, { "className": "Frame", "rect": { "className": "Rect", "topLeftPoint": { "className": "Point", "x": 202, "y": 51 }, "botRightPoint": { "className": "Point", "x": 216, "y": 53 } }, "duration": 0.066, "offset": { "className": "Point", "x": 0, "y": 0 }, "hitboxes": [], "POIs": [] }, { "className": "Frame", "rect": { "className": "Rect", "topLeftPoint": { "className": "Point", "x": 218, "y": 51 }, "botRightPoint": { "className": "Point", "x": 232, "y": 53 } }, "duration": 0.066, "offset": { "className": "Point", "x": 0, "y": 0 }, "hitboxes": [], "POIs": [] }, { "className": "Frame", "rect": { "className": "Rect", "topLeftPoint": { "className": "Point", "x": 234, "y": 51 }, "botRightPoint": { "className": "Point", "x": 248, "y": 53 } }, "duration": 0.066, "offset": { "className": "Point", "x": 0, "y": 0 }, "hitboxes": [], "POIs": [] }, { "className": "Frame", "rect": { "className": "Rect", "topLeftPoint": { "className": "Point", "x": 250, "y": 51 }, "botRightPoint": { "className": "Point", "x": 264, "y": 53 } }, "duration": 0.066, "offset": { "className": "Point", "x": 0, "y": 0 }, "hitboxes": [], "POIs": [] }], "POIs": [], "name": "hud_weapon_full", "path": "assets/sprites/hud_weapon_full.json", "alignment": "botmid", "wrapMode": "once", "spritesheetPath": "assets/spritesheets/effects.png" }, { "className": "Sprite", "hitboxes": [], "frames": [{ "className": "Frame", "rect": { "className": "Rect", "topLeftPoint": { "className": "Point", "x": 264, "y": 157 }, "botRightPoint": { "className": "Point", "x": 292, "y": 188 } }, "duration": 0.12, "offset": { "className": "Point", "x": 0, "y": 0 }, "hitboxes": [], "POIs": [] }, { "className": "Frame", "rect": { "className": "Rect", "topLeftPoint": { "className": "Point", "x": 296, "y": 162 }, "botRightPoint": { "className": "Point", "x": 334, "y": 188 } }, "duration": 0.12, "offset": { "className": "Point", "x": 0, "y": 0 }, "hitboxes": [], "POIs": [] }], "POIs": [], "name": "mmx_dash", "path": "assets/sprites/mmx_dash.json", "alignment": "botmid", "wrapMode": "once", "spritesheetPath": "assets/spritesheets/MegamanX.png" }, { "className": "Sprite", "hitboxes": [], "frames": [{ "className": "Frame", "rect": { "className": "Rect", "topLeftPoint": { "className": "Point", "x": 340, "y": 157 }, "botRightPoint": { "className": "Point", "x": 378, "y": 188 } }, "duration": 0.12, "offset": { "className": "Point", "x": 5, "y": 0 }, "hitboxes": [], "POIs": [{ "className": "POI", "x": 22.399999999999977, "y": -18.19999999999999 }] }, { "className": "Frame", "rect": { "className": "Rect", "topLeftPoint": { "className": "Point", "x": 383, "y": 162 }, "botRightPoint": { "className": "Point", "x": 432, "y": 188 } }, "duration": 0.12, "offset": { "className": "Point", "x": 5, "y": 0 }, "hitboxes": [], "POIs": [{ "className": "POI", "x": 28.399999999999977, "y": -14 }] }], "POIs": [], "name": "mmx_dash_shoot", "path": "assets/sprites/mmx_dash_shoot.json", "alignment": "botmid", "wrapMode": "once", "spritesheetPath": "assets/spritesheets/MegamanX.png" }, { "className": "Sprite", "hitboxes": [], "frames": [], "POIs": [], "name": "mmx_die", "path": "assets/sprites/mmx_die.json", "alignment": "botmid", "wrapMode": "once", "spritesheetPath": "assets/spritesheets/MegamanX.png" }, { "className": "Sprite", "hitboxes": [], "frames": [{ "className": "Frame", "rect": { "className": "Rect", "topLeftPoint": { "className": "Point", "x": 253, "y": 58 }, "botRightPoint": { "className": "Point", "x": 276, "y": 99 } }, "duration": 0.12, "offset": { "className": "Point", "x": 1, "y": -1 }, "hitboxes": [], "POIs": [] }, { "className": "Frame", "rect": { "className": "Rect", "topLeftPoint": { "className": "Point", "x": 278, "y": 57 }, "botRightPoint": { "className": "Point", "x": 305, "y": 99 } }, "duration": 0.12, "offset": { "className": "Point", "x": 0, "y": 1 }, "hitboxes": [], "POIs": [] }], "POIs": [], "name": "mmx_fall", "path": "assets/sprites/mmx_fall.json", "alignment": "botmid", "wrapMode": "once", "spritesheetPath": "assets/spritesheets/MegamanX.png" }, { "className": "Sprite", "hitboxes": [], "frames": [{ "className": "Frame", "rect": { "className": "Rect", "topLeftPoint": { "className": "Point", "x": 128, "y": 147 }, "botRightPoint": { "className": "Point", "x": 159, "y": 188 } }, "duration": 0.12, "offset": { "className": "Point", "x": 5, "y": -1 }, "hitboxes": [], "POIs": [{ "className": "POI", "x": 19.600000000000023, "y": -29.399999999999977, "tags": "bo" }] }, { "className": "Frame", "rect": { "className": "Rect", "topLeftPoint": { "className": "Point", "x": 160, "y": 146 }, "botRightPoint": { "className": "Point", "x": 191, "y": 188 } }, "duration": 0.12, "offset": { "className": "Point", "x": 5, "y": 0 }, "hitboxes": [], "POIs": [{ "className": "POI", "x": 19.600000000000023, "y": -29.600000000000023, "tags": "bo" }] }], "POIs": [], "name": "mmx_fall_shoot", "path": "assets/sprites/mmx_fall_shoot.json", "alignment": "botmid", "wrapMode": "once", "spritesheetPath": "assets/spritesheets/MegamanX.png" }, { "className": "Sprite", "hitboxes": [], "frames": [{ "className": "Frame", "rect": { "className": "Rect", "topLeftPoint": { "className": "Point", "x": 17, "y": 394 }, "botRightPoint": { "className": "Point", "x": 43, "y": 430 } }, "duration": 0.04, "offset": { "className": "Point", "x": 0, "y": 0 }, "hitboxes": [], "POIs": [] }, { "className": "Frame", "rect": { "className": "Rect", "topLeftPoint": { "className": "Point", "x": 46, "y": 396 }, "botRightPoint": { "className": "Point", "x": 75, "y": 430 } }, "duration": 0.04, "offset": { "className": "Point", "x": 0, "y": 0 }, "hitboxes": [], "POIs": [] }, { "className": "Frame", "rect": { "className": "Rect", "topLeftPoint": { "className": "Point", "x": 79, "y": 396 }, "botRightPoint": { "className": "Point", "x": 108, "y": 430 } }, "duration": 0.04, "offset": { "className": "Point", "x": 0, "y": 0 }, "hitboxes": [], "POIs": [] }, { "className": "Frame", "rect": { "className": "Rect", "topLeftPoint": { "className": "Point", "x": 112, "y": 386 }, "botRightPoint": { "className": "Point", "x": 144, "y": 434 } }, "duration": 0.04, "offset": { "className": "Point", "x": 0, "y": 0 }, "hitboxes": [], "POIs": [] }, { "className": "Frame", "rect": { "className": "Rect", "topLeftPoint": { "className": "Point", "x": 146, "y": 396 }, "botRightPoint": { "className": "Point", "x": 175, "y": 430 } }, "duration": 0.04, "offset": { "className": "Point", "x": 0, "y": 0 }, "hitboxes": [], "POIs": [] }, { "className": "Frame", "rect": { "className": "Rect", "topLeftPoint": { "className": "Point", "x": 179, "y": 386 }, "botRightPoint": { "className": "Point", "x": 211, "y": 434 } }, "duration": 0.04, "offset": { "className": "Point", "x": 0, "y": 0 }, "hitboxes": [], "POIs": [] }, { "className": "Frame", "rect": { "className": "Rect", "topLeftPoint": { "className": "Point", "x": 214, "y": 396 }, "botRightPoint": { "className": "Point", "x": 243, "y": 430 } }, "duration": 0.04, "offset": { "className": "Point", "x": 0, "y": 0 }, "hitboxes": [], "POIs": [] }, { "className": "Frame", "rect": { "className": "Rect", "topLeftPoint": { "className": "Point", "x": 247, "y": 386 }, "botRightPoint": { "className": "Point", "x": 279, "y": 434 } }, "duration": 0.04, "offset": { "className": "Point", "x": 0, "y": 0 }, "hitboxes": [], "POIs": [] }, { "className": "Frame", "rect": { "className": "Rect", "topLeftPoint": { "className": "Point", "x": 282, "y": 396 }, "botRightPoint": { "className": "Point", "x": 311, "y": 430 } }, "duration": 0.04, "offset": { "className": "Point", "x": 0, "y": 0 }, "hitboxes": [], "POIs": [] }, { "className": "Frame", "rect": { "className": "Rect", "topLeftPoint": { "className": "Point", "x": 316, "y": 396 }, "botRightPoint": { "className": "Point", "x": 345, "y": 430 } }, "duration": 0.04, "offset": { "className": "Point", "x": 0, "y": 0 }, "hitboxes": [], "POIs": [] }, { "className": "Frame", "rect": { "className": "Rect", "topLeftPoint": { "className": "Point", "x": 348, "y": 394 }, "botRightPoint": { "className": "Point", "x": 374, "y": 430 } }, "duration": 0.04, "offset": { "className": "Point", "x": 0, "y": 0 }, "hitboxes": [], "POIs": [] }], "POIs": [], "name": "mmx_hurt", "path": "assets/sprites/mmx_hurt.json", "alignment": "botmid", "wrapMode": "once", "spritesheetPath": "assets/spritesheets/MegamanX.png" }, { "className": "Sprite", "hitboxes": [], "frames": [{ "className": "Frame", "rect": { "className": "Rect", "topLeftPoint": { "className": "Point", "x": 302, "y": 16 }, "botRightPoint": { "className": "Point", "x": 332, "y": 50 } }, "duration": 0.066, "offset": { "className": "Point", "x": 0, "y": 0 }, "hitboxes": [], "POIs": [] }], "POIs": [], "name": "mmx_idle", "path": "assets/sprites/mmx_idle.json", "alignment": "botmid", "wrapMode": "loop", "spritesheetPath": "assets/spritesheets/MegamanX.png" }, { "className": "Sprite", "hitboxes": [], "frames": [{ "className": "Frame", "rect": { "className": "Rect", "topLeftPoint": { "className": "Point", "x": 181, "y": 62 }, "botRightPoint": { "className": "Point", "x": 205, "y": 99 } }, "duration": 0.08, "offset": { "className": "Point", "x": 4, "y": 0 }, "hitboxes": [], "POIs": [] }, { "className": "Frame", "rect": { "className": "Rect", "topLeftPoint": { "className": "Point", "x": 210, "y": 58 }, "botRightPoint": { "className": "Point", "x": 225, "y": 99 } }, "duration": 0.08, "offset": { "className": "Point", "x": 4, "y": 0 }, "hitboxes": [], "POIs": [] }, { "className": "Frame", "rect": { "className": "Rect", "topLeftPoint": { "className": "Point", "x": 231, "y": 53 }, "botRightPoint": { "className": "Point", "x": 250, "y": 99 } }, "duration": 0.08, "offset": { "className": "Point", "x": 3, "y": 0 }, "hitboxes": [], "POIs": [] }], "POIs": [], "name": "mmx_jump", "path": "assets/sprites/mmx_jump.json", "alignment": "botmid", "wrapMode": "once", "spritesheetPath": "assets/spritesheets/MegamanX.png" }, { "className": "Sprite", "hitboxes": [], "frames": [{ "className": "Frame", "rect": { "className": "Rect", "topLeftPoint": { "className": "Point", "x": 45, "y": 151 }, "botRightPoint": { "className": "Point", "x": 74, "y": 188 } }, "duration": 0.08, "offset": { "className": "Point", "x": 6, "y": 0 }, "hitboxes": [], "POIs": [{ "className": "POI", "x": 19.80000000000001, "y": -23.19999999999999 }] }, { "className": "Frame", "rect": { "className": "Rect", "topLeftPoint": { "className": "Point", "x": 76, "y": 147 }, "botRightPoint": { "className": "Point", "x": 100, "y": 188 } }, "duration": 0.08, "offset": { "className": "Point", "x": 9, "y": 0 }, "hitboxes": [], "POIs": [{ "className": "POI", "x": 19.600000000000023, "y": -28.399999999999977 }] }, { "className": "Frame", "rect": { "className": "Rect", "topLeftPoint": { "className": "Point", "x": 100, "y": 142 }, "botRightPoint": { "className": "Point", "x": 127, "y": 188 } }, "duration": 0.08, "offset": { "className": "Point", "x": 7, "y": 0 }, "hitboxes": [], "POIs": [{ "className": "POI", "x": 15.800000000000011, "y": -30.399999999999977 }] }], "POIs": [], "name": "mmx_jump_shoot", "path": "assets/sprites/mmx_jump_shoot.json", "alignment": "botmid", "wrapMode": "once", "spritesheetPath": "assets/spritesheets/MegamanX.png" }, { "className": "Sprite", "hitboxes": [], "frames": [{ "className": "Frame", "rect": { "className": "Rect", "topLeftPoint": { "className": "Point", "x": 116, "y": 106 }, "botRightPoint": { "className": "Point", "x": 136, "y": 140 } }, "duration": 0.066, "offset": { "className": "Point", "x": 1, "y": 0 }, "hitboxes": [], "POIs": [] }, { "className": "Frame", "rect": { "className": "Rect", "topLeftPoint": { "className": "Point", "x": 137, "y": 105 }, "botRightPoint": { "className": "Point", "x": 160, "y": 140 } }, "duration": 0.066, "offset": { "className": "Point", "x": -1, "y": 0 }, "hitboxes": [], "POIs": [] }, { "className": "Frame", "rect": { "className": "Rect", "topLeftPoint": { "className": "Point", "x": 160, "y": 106 }, "botRightPoint": { "className": "Point", "x": 192, "y": 140 } }, "duration": 0.066, "offset": { "className": "Point", "x": 0, "y": 0 }, "hitboxes": [], "POIs": [] }, { "className": "Frame", "rect": { "className": "Rect", "topLeftPoint": { "className": "Point", "x": 192, "y": 107 }, "botRightPoint": { "className": "Point", "x": 226, "y": 140 } }, "duration": 0.066, "offset": { "className": "Point", "x": -1, "y": 0 }, "hitboxes": [], "POIs": [] }, { "className": "Frame", "rect": { "className": "Rect", "topLeftPoint": { "className": "Point", "x": 226, "y": 107 }, "botRightPoint": { "className": "Point", "x": 252, "y": 140 } }, "duration": 0.066, "offset": { "className": "Point", "x": -1, "y": 0 }, "hitboxes": [], "POIs": [] }, { "className": "Frame", "rect": { "className": "Rect", "topLeftPoint": { "className": "Point", "x": 255, "y": 106 }, "botRightPoint": { "className": "Point", "x": 277, "y": 140 } }, "duration": 0.066, "offset": { "className": "Point", "x": 0, "y": 0 }, "hitboxes": [], "POIs": [] }, { "className": "Frame", "rect": { "className": "Rect", "topLeftPoint": { "className": "Point", "x": 277, "y": 105 }, "botRightPoint": { "className": "Point", "x": 302, "y": 140 } }, "duration": 0.066, "offset": { "className": "Point", "x": -1, "y": 0 }, "hitboxes": [], "POIs": [] }, { "className": "Frame", "rect": { "className": "Rect", "topLeftPoint": { "className": "Point", "x": 305, "y": 106 }, "botRightPoint": { "className": "Point", "x": 335, "y": 140 } }, "duration": 0.066, "offset": { "className": "Point", "x": 1, "y": 0 }, "hitboxes": [], "POIs": [] }, { "className": "Frame", "rect": { "className": "Rect", "topLeftPoint": { "className": "Point", "x": 336, "y": 107 }, "botRightPoint": { "className": "Point", "x": 370, "y": 140 } }, "duration": 0.066, "offset": { "className": "Point", "x": 0, "y": 0 }, "hitboxes": [], "POIs": [] }, { "className": "Frame", "rect": { "className": "Rect", "topLeftPoint": { "className": "Point", "x": 370, "y": 107 }, "botRightPoint": { "className": "Point", "x": 399, "y": 140 } }, "duration": 0.066, "offset": { "className": "Point", "x": -1, "y": 0 }, "hitboxes": [], "POIs": [] }], "POIs": [], "name": "mmx_run", "path": "assets/sprites/mmx_run.json", "alignment": "botmid", "wrapMode": "loop", "spritesheetPath": "assets/spritesheets/MegamanX.png" }, { "className": "Sprite", "hitboxes": [], "frames": [{ "className": "Frame", "rect": { "className": "Rect", "topLeftPoint": { "className": "Point", "x": 76, "y": 192 }, "botRightPoint": { "className": "Point", "x": 105, "y": 226 } }, "duration": 0.066, "offset": { "className": "Point", "x": 5, "y": 0 }, "hitboxes": [], "POIs": [{ "className": "POI", "x": 18.80000000000001, "y": -20.600000000000023 }] }, { "className": "Frame", "rect": { "className": "Rect", "topLeftPoint": { "className": "Point", "x": 105, "y": 191 }, "botRightPoint": { "className": "Point", "x": 137, "y": 226 } }, "duration": 0.066, "offset": { "className": "Point", "x": 4, "y": 0 }, "hitboxes": [], "POIs": [{ "className": "POI", "x": 18.399999999999977, "y": -22 }] }, { "className": "Frame", "rect": { "className": "Rect", "topLeftPoint": { "className": "Point", "x": 137, "y": 192 }, "botRightPoint": { "className": "Point", "x": 172, "y": 226 } }, "duration": 0.066, "offset": { "className": "Point", "x": 2, "y": 0 }, "hitboxes": [], "POIs": [{ "className": "POI", "x": 18.399999999999977, "y": -20.399999999999977 }] }, { "className": "Frame", "rect": { "className": "Rect", "topLeftPoint": { "className": "Point", "x": 173, "y": 193 }, "botRightPoint": { "className": "Point", "x": 211, "y": 226 } }, "duration": 0.066, "offset": { "className": "Point", "x": 1, "y": 0 }, "hitboxes": [], "POIs": [{ "className": "POI", "x": 18.399999999999977, "y": -19.19999999999999 }] }, { "className": "Frame", "rect": { "className": "Rect", "topLeftPoint": { "className": "Point", "x": 212, "y": 193 }, "botRightPoint": { "className": "Point", "x": 246, "y": 226 } }, "duration": 0.066, "offset": { "className": "Point", "x": 3, "y": 0 }, "hitboxes": [], "POIs": [{ "className": "POI", "x": 18.399999999999977, "y": -19.399999999999977 }] }, { "className": "Frame", "rect": { "className": "Rect", "topLeftPoint": { "className": "Point", "x": 246, "y": 192 }, "botRightPoint": { "className": "Point", "x": 277, "y": 226 } }, "duration": 0.066, "offset": { "className": "Point", "x": 4, "y": 0 }, "hitboxes": [], "POIs": [{ "className": "POI", "x": 18.600000000000023, "y": -20.399999999999977 }] }, { "className": "Frame", "rect": { "className": "Rect", "topLeftPoint": { "className": "Point", "x": 277, "y": 191 }, "botRightPoint": { "className": "Point", "x": 310, "y": 226 } }, "duration": 0.066, "offset": { "className": "Point", "x": 3, "y": 0 }, "hitboxes": [], "POIs": [{ "className": "POI", "x": 19, "y": -21.600000000000023 }] }, { "className": "Frame", "rect": { "className": "Rect", "topLeftPoint": { "className": "Point", "x": 310, "y": 192 }, "botRightPoint": { "className": "Point", "x": 345, "y": 226 } }, "duration": 0.066, "offset": { "className": "Point", "x": 2, "y": 0 }, "hitboxes": [], "POIs": [{ "className": "POI", "x": 18.399999999999977, "y": -20.399999999999977 }] }, { "className": "Frame", "rect": { "className": "Rect", "topLeftPoint": { "className": "Point", "x": 346, "y": 193 }, "botRightPoint": { "className": "Point", "x": 383, "y": 226 } }, "duration": 0.066, "offset": { "className": "Point", "x": 1, "y": 0 }, "hitboxes": [], "POIs": [{ "className": "POI", "x": 18.80000000000001, "y": -19.80000000000001 }] }, { "className": "Frame", "rect": { "className": "Rect", "topLeftPoint": { "className": "Point", "x": 383, "y": 193 }, "botRightPoint": { "className": "Point", "x": 418, "y": 226 } }, "duration": 0.066, "offset": { "className": "Point", "x": 2, "y": 0 }, "hitboxes": [], "POIs": [{ "className": "POI", "x": 18.399999999999977, "y": -19.80000000000001 }] }], "POIs": [], "name": "mmx_run_shoot", "path": "assets/sprites/mmx_run_shoot.json", "alignment": "botmid", "wrapMode": "loop", "spritesheetPath": "assets/spritesheets/MegamanX.png" }, { "className": "Sprite", "hitboxes": [], "frames": [{ "className": "Frame", "rect": { "className": "Rect", "topLeftPoint": { "className": "Point", "x": 112, "y": 65 }, "botRightPoint": { "className": "Point", "x": 142, "y": 99 } }, "duration": 0.066, "offset": { "className": "Point", "x": 0, "y": 0 }, "hitboxes": [], "POIs": [{ "className": "POI", "x": 13.600000000000023, "y": -18.80000000000001, "tags": "bo" }] }, { "className": "Frame", "rect": { "className": "Rect", "topLeftPoint": { "className": "Point", "x": 147, "y": 65 }, "botRightPoint": { "className": "Point", "x": 176, "y": 99 } }, "duration": 0.5, "offset": { "className": "Point", "x": -1, "y": 0 }, "hitboxes": [], "POIs": [{ "className": "POI", "x": 12.800000000000011, "y": -18.19999999999999, "tags": "bo" }] }], "POIs": [], "name": "mmx_shoot", "path": "assets/sprites/mmx_shoot.json", "alignment": "botmid", "wrapMode": "once", "spritesheetPath": "assets/spritesheets/MegamanX.png" }, { "className": "Sprite", "hitboxes": [], "frames": [{ "className": "Frame", "rect": { "className": "Rect", "topLeftPoint": { "className": "Point", "x": 140, "y": 284 }, "botRightPoint": { "className": "Point", "x": 170, "y": 323 } }, "duration": 0.1, "offset": { "className": "Point", "x": 0, "y": 0 }, "hitboxes": [], "POIs": [] }, { "className": "Frame", "rect": { "className": "Rect", "topLeftPoint": { "className": "Point", "x": 170, "y": 279 }, "botRightPoint": { "className": "Point", "x": 197, "y": 323 } }, "duration": 0.1, "offset": { "className": "Point", "x": 0, "y": 0 }, "hitboxes": [], "POIs": [] }], "POIs": [], "name": "mmx_wall_kick", "path": "assets/sprites/mmx_wall_kick.json", "alignment": "botmid", "wrapMode": "once", "spritesheetPath": "assets/spritesheets/MegamanX.png" }, { "className": "Sprite", "hitboxes": [], "frames": [{ "className": "Frame", "rect": { "className": "Rect", "topLeftPoint": { "className": "Point", "x": 309, "y": 284 }, "botRightPoint": { "className": "Point", "x": 340, "y": 323 } }, "duration": 0.1, "offset": { "className": "Point", "x": 0, "y": 1 }, "hitboxes": [], "POIs": [{ "className": "POI", "x": 14.800000000000011, "y": -26.19999999999999 }] }, { "className": "Frame", "rect": { "className": "Rect", "topLeftPoint": { "className": "Point", "x": 342, "y": 283 }, "botRightPoint": { "className": "Point", "x": 375, "y": 322 } }, "duration": 0.1, "offset": { "className": "Point", "x": 3, "y": 0 }, "hitboxes": [], "POIs": [{ "className": "POI", "x": 18.600000000000023, "y": -26.80000000000001 }] }, { "className": "Frame", "rect": { "className": "Rect", "topLeftPoint": { "className": "Point", "x": 342, "y": 283 }, "botRightPoint": { "className": "Point", "x": 375, "y": 322 } }, "duration": 0.1, "offset": { "className": "Point", "x": 3, "y": 0 }, "hitboxes": [], "POIs": [] }], "POIs": [], "name": "mmx_wall_kick_shoot", "path": "assets/sprites/mmx_wall_kick_shoot.json", "alignment": "botmid", "wrapMode": "once", "spritesheetPath": "assets/spritesheets/MegamanX.png" }, { "className": "Sprite", "hitboxes": [], "frames": [{ "className": "Frame", "rect": { "className": "Rect", "topLeftPoint": { "className": "Point", "x": 51, "y": 281 }, "botRightPoint": { "className": "Point", "x": 76, "y": 323 } }, "duration": 0.1, "offset": { "className": "Point", "x": 0, "y": 0 }, "hitboxes": [], "POIs": [] }, { "className": "Frame", "rect": { "className": "Rect", "topLeftPoint": { "className": "Point", "x": 78, "y": 280 }, "botRightPoint": { "className": "Point", "x": 105, "y": 323 } }, "duration": 0.1, "offset": { "className": "Point", "x": 0, "y": 0 }, "hitboxes": [], "POIs": [] }, { "className": "Frame", "rect": { "className": "Rect", "topLeftPoint": { "className": "Point", "x": 107, "y": 281 }, "botRightPoint": { "className": "Point", "x": 135, "y": 323 } }, "duration": 0.1, "offset": { "className": "Point", "x": 0, "y": 0 }, "hitboxes": [], "POIs": [] }], "POIs": [], "name": "mmx_wall_slide", "path": "assets/sprites/mmx_wall_slide.json", "alignment": "botmid", "wrapMode": "once", "spritesheetPath": "assets/spritesheets/MegamanX.png" }, { "className": "Sprite", "hitboxes": [], "frames": [{ "className": "Frame", "rect": { "className": "Rect", "topLeftPoint": { "className": "Point", "x": 235, "y": 281 }, "botRightPoint": { "className": "Point", "x": 267, "y": 324 } }, "duration": 0.1, "offset": { "className": "Point", "x": -1, "y": 0 }, "hitboxes": [], "POIs": [{ "className": "POI", "x": -15.600000000000023, "y": -23.399999999999977 }] }, { "className": "Frame", "rect": { "className": "Rect", "topLeftPoint": { "className": "Point", "x": 273, "y": 280 }, "botRightPoint": { "className": "Point", "x": 305, "y": 322 } }, "duration": 0.1, "offset": { "className": "Point", "x": 0, "y": 0 }, "hitboxes": [], "POIs": [{ "className": "POI", "x": -14.199999999999989, "y": -21.600000000000023 }] }], "POIs": [], "name": "mmx_wall_slide_shoot", "path": "assets/sprites/mmx_wall_slide_shoot.json", "alignment": "botmid", "wrapMode": "once", "spritesheetPath": "assets/spritesheets/MegamanX.png" }, { "className": "Sprite", "hitboxes": [{ "className": "Hitbox", "tags": "", "width": 12, "height": 12, "offset": { "className": "Point", "x": 0, "y": 0 }, "rect": { "className": "Rect", "topLeftPoint": { "className": "Point", "x": 344, "y": 294 }, "botRightPoint": { "className": "Point", "x": 356, "y": 306 } }, "isTrigger": true }], "frames": [{ "className": "Frame", "rect": { "className": "Rect", "topLeftPoint": { "className": "Point", "x": 217, "y": 794 }, "botRightPoint": { "className": "Point", "x": 233, "y": 804 } }, "duration": 0.066, "offset": { "className": "Point", "x": 0, "y": 0 }, "hitboxes": [], "POIs": [] }, { "className": "Frame", "rect": { "className": "Rect", "topLeftPoint": { "className": "Point", "x": 235, "y": 793 }, "botRightPoint": { "className": "Point", "x": 251, "y": 806 } }, "duration": 0.066, "offset": { "className": "Point", "x": 0, "y": 0 }, "hitboxes": [], "POIs": [] }, { "className": "Frame", "rect": { "className": "Rect", "topLeftPoint": { "className": "Point", "x": 253, "y": 792 }, "botRightPoint": { "className": "Point", "x": 268, "y": 807 } }, "duration": 0.066, "offset": { "className": "Point", "x": 0, "y": 0 }, "hitboxes": [], "POIs": [] }, { "className": "Frame", "rect": { "className": "Rect", "topLeftPoint": { "className": "Point", "x": 272, "y": 791 }, "botRightPoint": { "className": "Point", "x": 285, "y": 807 } }, "duration": 0.066, "offset": { "className": "Point", "x": 0, "y": 0 }, "hitboxes": [], "POIs": [] }, { "className": "Frame", "rect": { "className": "Rect", "topLeftPoint": { "className": "Point", "x": 292, "y": 791 }, "botRightPoint": { "className": "Point", "x": 302, "y": 807 } }, "duration": 0.066, "offset": { "className": "Point", "x": 0, "y": 0 }, "hitboxes": [], "POIs": [] }], "POIs": [], "name": "torpedo", "path": "assets/sprites/torpedo.json", "alignment": "center", "wrapMode": "once", "spritesheetPath": "assets/spritesheets/effects.png" }];
            exports_14("spriteJsons", spriteJsons);
        }
    };
});
System.register("levels", [], function (exports_15, context_15) {
    "use strict";
    var __moduleName = context_15 && context_15.id;
    var levelJsons;
    return {
        setters: [],
        execute: function () {
            levelJsons = [{ "className": "Level", "instances": [{ "className": "ShapeInstance", "name": "Shape Instance", "points": [{ "className": "Point", "x": 46, "y": 124, "perc_from_left": 0, "perc_from_right": 1, "perc_from_top": 0, "perc_from_bottom": 1 }, { "className": "Point", "x": 807, "y": 124, "perc_from_left": 1, "perc_from_right": 0, "perc_from_top": 0, "perc_from_bottom": 1 }, { "className": "Point", "x": 807, "y": 181, "perc_from_left": 1, "perc_from_right": 0, "perc_from_top": 1, "perc_from_bottom": 0 }, { "className": "Point", "x": 46, "y": 181, "perc_from_left": 0, "perc_from_right": 1, "perc_from_top": 1, "perc_from_bottom": 0 }] }, { "className": "ShapeInstance", "name": "Shape Instance", "points": [{ "className": "Point", "x": -3, "y": 2, "perc_from_left": 0, "perc_from_right": 1, "perc_from_top": 0, "perc_from_bottom": 1 }, { "className": "Point", "x": 47, "y": 2, "perc_from_left": 1, "perc_from_right": 0, "perc_from_top": 0, "perc_from_bottom": 1 }, { "className": "Point", "x": 47, "y": 233, "perc_from_left": 1, "perc_from_right": 0, "perc_from_top": 1, "perc_from_bottom": 0 }, { "className": "Point", "x": -3, "y": 233, "perc_from_left": 0, "perc_from_right": 1, "perc_from_top": 1, "perc_from_bottom": 0 }] }], "name": "new_level", "path": "assets/levels/new_level.json", "backgroundPath": "assets/backgrounds/highway.png" }, { "className": "Level", "instances": [{ "className": "ShapeInstance", "name": "Shape Instance", "points": [{ "className": "Point", "x": 8.208955223880588, "y": 194.02985074626852, "perc_from_left": 0, "perc_from_right": 1, "perc_from_top": 0, "perc_from_bottom": 1 }, { "className": "Point", "x": 256.61194029850725, "y": 194.02985074626852, "perc_from_left": 1, "perc_from_right": 0, "perc_from_top": 0, "perc_from_bottom": 1 }, { "className": "Point", "x": 256.61194029850725, "y": 209.597014925373, "perc_from_left": 1, "perc_from_right": 0, "perc_from_top": 1, "perc_from_bottom": 0 }, { "className": "Point", "x": 8.208955223880588, "y": 209.597014925373, "perc_from_left": 0, "perc_from_right": 1, "perc_from_top": 1, "perc_from_bottom": 0 }] }, { "className": "ShapeInstance", "name": "Shape Instance", "points": [{ "className": "Point", "x": 0.37313432835820876, "y": 1.1194029850746263, "perc_from_left": 0, "perc_from_right": 1, "perc_from_top": 0, "perc_from_bottom": 1 }, { "className": "Point", "x": 15.194029850746261, "y": 1.1194029850746263, "perc_from_left": 1, "perc_from_right": 0, "perc_from_top": 0, "perc_from_bottom": 1 }, { "className": "Point", "x": 15.194029850746261, "y": 199.8955223880596, "perc_from_left": 1, "perc_from_right": 0, "perc_from_top": 1, "perc_from_bottom": 0 }, { "className": "Point", "x": 0.37313432835820876, "y": 199.8955223880596, "perc_from_left": 0, "perc_from_right": 1, "perc_from_top": 1, "perc_from_bottom": 0 }] }, { "className": "ShapeInstance", "name": "Shape Instance", "points": [{ "className": "Point", "x": 239.17910447761182, "y": 4.850746268656714, "perc_from_left": 0, "perc_from_right": 1, "perc_from_top": 0, "perc_from_bottom": 1 }, { "className": "Point", "x": 255.11940298507446, "y": 4.850746268656714, "perc_from_left": 1, "perc_from_right": 0, "perc_from_top": 0, "perc_from_bottom": 1 }, { "className": "Point", "x": 255.11940298507446, "y": 196.1641791044775, "perc_from_left": 1, "perc_from_right": 0, "perc_from_top": 1, "perc_from_bottom": 0 }, { "className": "Point", "x": 239.17910447761182, "y": 196.1641791044775, "perc_from_left": 0, "perc_from_right": 1, "perc_from_top": 1, "perc_from_bottom": 0 }] }, { "className": "ShapeInstance", "name": "Shape Instance", "points": [{ "className": "Point", "x": 13.432835820895514, "y": 3.7313432835820874, "perc_from_left": 0, "perc_from_right": 1, "perc_from_top": 0, "perc_from_bottom": 1 }, { "className": "Point", "x": 240.94029850746256, "y": 3.7313432835820874, "perc_from_left": 1, "perc_from_right": 0, "perc_from_top": 0, "perc_from_bottom": 1 }, { "className": "Point", "x": 240.94029850746256, "y": 28.253731343283587, "perc_from_left": 1, "perc_from_right": 0, "perc_from_top": 1, "perc_from_bottom": 0 }, { "className": "Point", "x": 13.432835820895514, "y": 28.253731343283587, "perc_from_left": 0, "perc_from_right": 1, "perc_from_top": 1, "perc_from_bottom": 0 }] }], "name": "sm_bossroom", "path": "levels/sm_bossroom.json", "backgroundPath": "assets/backgrounds/sm_bossroom.png" }];
            exports_15("levelJsons", levelJsons);
        }
    };
});
System.register("game", ["sprite", "level", "sprites", "levels", "player"], function (exports_16, context_16) {
    "use strict";
    var __moduleName = context_16 && context_16.id;
    var sprite_1, level_1, sprites_1, levels_1, player_1, Game, game;
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
                    this.sounds = {};
                    this.soundLoadCount = 0;
                    this.isServer = false;
                    this.isClient = true;
                    this.showHitboxes = false;
                    this.canvas = $("#canvas")[0];
                    this.ctx = this.canvas.getContext("2d");
                    this.ctx.webkitImageSmoothingEnabled = false;
                    this.ctx.mozImageSmoothingEnabled = false;
                    this.ctx.imageSmoothingEnabled = false;
                }
                Game.prototype.start = function () {
                    var _this = this;
                    this.loadSprites();
                    this.loadLevels();
                    this.loadLevel("sm_bossroom");
                    for (var _i = 0, soundFiles_1 = soundFiles; _i < soundFiles_1.length; _i++) {
                        var soundFile = soundFiles_1[_i];
                        var sound = new Howl({
                            src: ["assets/sounds/" + soundFile],
                            onload: function () {
                                console.log("LOADED SOUND");
                                _this.soundLoadCount++;
                            }
                        });
                        this.sounds[soundFile.split(".")[0]] = sound;
                    }
                };
                Game.prototype.startVue = function () {
                    var app1 = new Vue({
                        el: '#app',
                        data: {
                            showHitboxes: true
                        },
                        methods: {
                            onHitboxCheckChange: function () {
                                game.showHitboxes = this.showHitboxes;
                            }
                        }
                    });
                };
                Game.prototype.loadLevel = function (name) {
                    var _this = this;
                    this.level = this.levels[name];
                    var player1 = new player_1.Player(60, 100, false, 0);
                    var cpu1 = new player_1.Player(200, 100, false, 1);
                    this.level.localPlayers.push(player1);
                    this.level.localPlayers.push(cpu1);
                    this.level.mainPlayer = player1;
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
                    this.gameLoop();
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
                    var keys = Object.getOwnPropertyNames(this.sounds);
                    if (keys.length !== this.soundLoadCount) {
                        return false;
                    }
                    return true;
                };
                Game.prototype.gameLoop = function () {
                    var _this = this;
                    if (this.isLoaded()) {
                        this.deltaTime = (Date.now() - this.startTime) / 1000;
                        this.level.update();
                        this.startTime = Date.now();
                    }
                    window.requestAnimationFrame(function () { return _this.gameLoop(); });
                };
                Game.prototype.playSound = function (clip) {
                    this.sounds[clip].play();
                };
                return Game;
            }());
            game = new Game();
            exports_16("game", game);
        }
    };
});
System.register("collider", ["shape"], function (exports_17, context_17) {
    "use strict";
    var __moduleName = context_17 && context_17.id;
    var shape_1, Collider;
    return {
        setters: [
            function (shape_1_1) {
                shape_1 = shape_1_1;
            }
        ],
        execute: function () {
            Collider = (function () {
                function Collider(points, isTrigger, gameObject) {
                    this.shape = new shape_1.Shape(points);
                    this.isTrigger = isTrigger;
                    this.gameObject = gameObject;
                }
                Collider.prototype.onCollision = function (other) {
                };
                Collider.prototype.onTrigger = function (other) {
                };
                Collider.prototype.clone = function (x, y, gameObject) {
                    var shape = this.shape.clone(x, y);
                    return new Collider(shape.points, this.isTrigger, gameObject);
                };
                return Collider;
            }());
            exports_17("Collider", Collider);
        }
    };
});
System.register("frame", [], function (exports_18, context_18) {
    "use strict";
    var __moduleName = context_18 && context_18.id;
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
            exports_18("Frame", Frame);
        }
    };
});
System.register("sprite", ["collider", "frame", "point", "rect", "game", "helpers"], function (exports_19, context_19) {
    "use strict";
    var __moduleName = context_19 && context_19.id;
    var collider_3, frame_1, point_6, rect_4, game_6, Helpers, Sprite;
    return {
        setters: [
            function (collider_3_1) {
                collider_3 = collider_3_1;
            },
            function (frame_1_1) {
                frame_1 = frame_1_1;
            },
            function (point_6_1) {
                point_6 = point_6_1;
            },
            function (rect_4_1) {
                rect_4 = rect_4_1;
            },
            function (game_6_1) {
                game_6 = game_6_1;
            },
            function (Helpers_4) {
                Helpers = Helpers_4;
            }
        ],
        execute: function () {
            Sprite = (function () {
                function Sprite(spriteJson) {
                    this.name = spriteJson.name;
                    this.alignment = spriteJson.alignment;
                    this.wrapMode = spriteJson.wrapMode;
                    if (!this.wrapMode) {
                        console.error("NO WRAP MODE FOR SPRITE " + this.name);
                    }
                    this.frames = [];
                    this.hitboxes = [];
                    this.spritesheet = game_6.game.getSpritesheet(spriteJson.spritesheetPath);
                    for (var _i = 0, _a = spriteJson.hitboxes; _i < _a.length; _i++) {
                        var hitboxJson = _a[_i];
                        var hitbox = new collider_3.Collider([
                            new point_6.Point(hitboxJson.offset.x, hitboxJson.offset.y),
                            new point_6.Point(hitboxJson.offset.x + hitboxJson.width, hitboxJson.offset.y),
                            new point_6.Point(hitboxJson.offset.x + hitboxJson.width, hitboxJson.offset.y + hitboxJson.height),
                            new point_6.Point(hitboxJson.offset.x, hitboxJson.offset.y + hitboxJson.height)
                        ], hitboxJson.isTrigger ? true : false, null);
                        this.hitboxes.push(hitbox);
                    }
                    for (var _b = 0, _c = spriteJson.frames; _b < _c.length; _b++) {
                        var frameJson = _c[_b];
                        var frame = new frame_1.Frame(new rect_4.Rect(frameJson.rect.topLeftPoint.x, frameJson.rect.topLeftPoint.y, frameJson.rect.botRightPoint.x, frameJson.rect.botRightPoint.y), frameJson.duration, new point_6.Point(frameJson.offset.x, frameJson.offset.y));
                        if (frameJson.POIs) {
                            for (var _d = 0, _e = frameJson.POIs; _d < _e.length; _d++) {
                                var poi = _e[_d];
                                frame.POIs.push(new point_6.Point(poi.x, poi.y));
                            }
                        }
                        this.frames.push(frame);
                    }
                }
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
                    return new point_6.Point(x + offset.x * flipX, y + offset.y * flipY);
                };
                Sprite.prototype.draw = function (frameIndex, x, y, flipX, flipY, options) {
                    flipX = flipX || 1;
                    flipY = flipY || 1;
                    var frame = this.frames[frameIndex];
                    var rect = frame.rect;
                    var offset = this.getAlignOffset(frameIndex, flipX, flipY);
                    Helpers.drawImage(game_6.game.ctx, this.spritesheet, rect.x1, rect.y1, rect.w, rect.h, x + offset.x, y + offset.y, flipX, flipY, options);
                };
                return Sprite;
            }());
            exports_19("Sprite", Sprite);
        }
    };
});
System.register("actor", ["point", "game", "helpers"], function (exports_20, context_20) {
    "use strict";
    var __moduleName = context_20 && context_20.id;
    var point_7, game_7, Helpers, Actor, Anim;
    return {
        setters: [
            function (point_7_1) {
                point_7 = point_7_1;
            },
            function (game_7_1) {
                game_7 = game_7_1;
            },
            function (Helpers_5) {
                Helpers = Helpers_5;
            }
        ],
        execute: function () {
            Actor = (function () {
                function Actor() {
                    this.pos = new point_7.Point(0, 0);
                    this.vel = new point_7.Point(0, 0);
                    this.angle = 0;
                    this.useGravity = true;
                    this.frameIndex = 0;
                    this.frameSpeed = 1;
                    this.frameTime = 0;
                    this.name = "";
                    this.xDir = 1;
                    this.yDir = 1;
                    this.grounded = false;
                    game_7.game.level.addGameObject(this);
                    this.collidedInFrame = new Set();
                    this.triggeredInFrame = new Set();
                    this.renderEffect = "";
                }
                Actor.prototype.changeSprite = function (sprite, resetFrame) {
                    this.sprite = sprite;
                    if (resetFrame) {
                        this.frameIndex = 0;
                        this.frameTime = 0;
                    }
                    else if (this.frameIndex >= this.sprite.frames.length) {
                        this.frameIndex = 0;
                    }
                };
                Object.defineProperty(Actor.prototype, "currentFrame", {
                    get: function () {
                        return this.sprite.frames[this.frameIndex];
                    },
                    enumerable: true,
                    configurable: true
                });
                Actor.prototype.update = function () {
                    this.frameTime += game_7.game.deltaTime * this.frameSpeed;
                    if (this.frameTime >= this.currentFrame.duration) {
                        var onceEnd = this.sprite.wrapMode === "once" && this.frameIndex === this.sprite.frames.length - 1;
                        if (!onceEnd) {
                            this.frameTime = 0;
                            this.frameIndex++;
                            if (this.frameIndex >= this.sprite.frames.length)
                                this.frameIndex = 0;
                        }
                    }
                    if (this.useGravity && !this.grounded) {
                        this.vel.y += game_7.game.level.gravity * game_7.game.deltaTime;
                        if (this.vel.y > 1000) {
                            this.vel.y = 1000;
                        }
                    }
                    this.move(this.vel);
                    if (this.collider && !this.collider.isTrigger) {
                        if (game_7.game.level.checkCollisionActor(this, 0, 1)) {
                            this.grounded = true;
                            this.vel.y = 0;
                        }
                        else {
                            this.grounded = false;
                        }
                    }
                    else if (this.collider) {
                        var trigger = game_7.game.level.checkTriggerActor(this, 0, 0);
                        if (trigger) {
                            this.registerTrigger(trigger);
                        }
                    }
                };
                Actor.prototype.preUpdate = function () {
                    this.triggeredInFrame.clear();
                    this.collidedInFrame.clear();
                };
                Actor.prototype.move = function (amount) {
                    var inc = amount.clone();
                    while (inc.magnitude > 0) {
                        var collider = game_7.game.level.checkCollisionActor(this, inc.x * game_7.game.deltaTime, inc.y * game_7.game.deltaTime);
                        if (collider) {
                            this.registerCollision(collider);
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
                    this.pos.inc(inc.multiply(game_7.game.deltaTime));
                };
                Actor.prototype.render = function (x, y) {
                    this.sprite.draw(this.frameIndex, this.pos.x + x, this.pos.y + y, this.xDir, this.yDir, this.renderEffect);
                    this.renderEffect = "";
                    if (game_7.game.showHitboxes && this.collider) {
                        Helpers.drawPolygon(game_7.game.ctx, this.collider.shape.clone(x, y), true, "blue", "", 0, 0.5);
                        Helpers.drawCircle(game_7.game.ctx, this.pos.x + x, this.pos.y + y, 1, "red");
                    }
                };
                Actor.prototype.registerCollision = function (other) {
                    if (!this.collidedInFrame.has(other)) {
                        this.collidedInFrame.add(other);
                        this.onCollision(other);
                    }
                };
                Actor.prototype.registerTrigger = function (other) {
                    if (!this.triggeredInFrame.has(other)) {
                        this.triggeredInFrame.add(other);
                        this.onTrigger(other);
                    }
                };
                Actor.prototype.onCollision = function (other) {
                };
                Actor.prototype.onTrigger = function (other) {
                };
                Object.defineProperty(Actor.prototype, "collider", {
                    get: function () {
                        if (this.sprite.hitboxes.length === 0) {
                            if (this.globalCollider) {
                                var rect = this.globalCollider.shape.getRect();
                                var offset_1 = this.sprite.getAlignOffsetHelper(rect, new point_7.Point(0, 0), this.xDir, this.yDir);
                                return this.globalCollider.clone(this.pos.x + offset_1.x, this.pos.y + offset_1.y, this);
                            }
                            return undefined;
                        }
                        var offset = this.sprite.getAlignOffset(0, this.xDir, this.yDir);
                        return this.sprite.hitboxes[0].clone(this.pos.x + offset.x, this.pos.y + offset.y, this);
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
                Actor.prototype.destroySelf = function (sprite, fadeSound) {
                    game_7.game.level.gameObjects.splice(game_7.game.level.gameObjects.indexOf(this), 1);
                    if (sprite) {
                        var anim = new Anim(this.pos.x, this.pos.y, sprite);
                    }
                    if (fadeSound) {
                        game_7.game.playSound(fadeSound);
                    }
                };
                return Actor;
            }());
            exports_20("Actor", Actor);
            Anim = (function (_super) {
                __extends(Anim, _super);
                function Anim(x, y, sprite) {
                    var _this = _super.call(this) || this;
                    _this.pos.x = x;
                    _this.pos.y = y;
                    _this.sprite = sprite;
                    _this.useGravity = false;
                    return _this;
                }
                Anim.prototype.update = function () {
                    _super.prototype.update.call(this);
                    if (this.frameIndex === this.sprite.frames.length - 1 && this.frameTime >= this.currentFrame.duration) {
                        this.destroySelf();
                    }
                };
                return Anim;
            }(Actor));
        }
    };
});
System.register("color", [], function (exports_21, context_21) {
    "use strict";
    var __moduleName = context_21 && context_21.id;
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
            exports_21("Color", Color);
        }
    };
});
var soundFiles = ["buster.wav", "buster2.wav", "buster3.wav", "buster4.wav", "charge_loop.wav", "charge_start.wav", "dash.wav", "die.wav", "explosion.wav", "hit.wav", "hurt.wav", "jump.wav", "land.wav", "torpedo.wav"];
System.register("vue", [], function (exports_22, context_22) {
    "use strict";
    var __moduleName = context_22 && context_22.id;
    function startVue() {
    }
    exports_22("startVue", startVue);
    return {
        setters: [],
        execute: function () {
        }
    };
});
//# sourceMappingURL=main.js.map