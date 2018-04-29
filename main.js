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
    function drawImage(ctx, imgEl, sX, sY, sW, sH, x, y, flipX, flipY) {
        ctx.save();
        flipX = flipX || 1;
        flipY = flipY || 1;
        ctx.scale(flipX, 1);
        if (!sW) {
            ctx.drawImage(imgEl, Math.round(sX), Math.round(sY));
        }
        else {
            ctx.drawImage(imgEl, Math.round(sX), Math.round(sY), Math.round(sW), Math.round(sH), flipX * Math.round(x), Math.round(y), flipX * Math.round(sW), Math.round(sH));
        }
        ctx.restore();
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
System.register("projectile", ["actor", "damager"], function (exports_9, context_9) {
    "use strict";
    var __moduleName = context_9 && context_9.id;
    var actor_1, damager_1, Projectile;
    return {
        setters: [
            function (actor_1_1) {
                actor_1 = actor_1_1;
            },
            function (damager_1_1) {
                damager_1 = damager_1_1;
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
                    _this.damager = new damager_1.Damager(player, damage);
                    return _this;
                }
                return Projectile;
            }(actor_1.Actor));
            exports_9("Projectile", Projectile);
        }
    };
});
System.register("character", ["actor", "game", "point", "collider", "rect", "projectile"], function (exports_10, context_10) {
    "use strict";
    var __moduleName = context_10 && context_10.id;
    var actor_2, game_2, point_4, collider_2, rect_2, projectile_1, Character, CharState, Idle, Run, Jump, Fall;
    return {
        setters: [
            function (actor_2_1) {
                actor_2 = actor_2_1;
            },
            function (game_2_1) {
                game_2 = game_2_1;
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
            function (projectile_1_1) {
                projectile_1 = projectile_1_1;
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
                    var rect = new rect_2.Rect(0, 0, 24, 34);
                    _this.globalCollider = new collider_2.Collider(rect.getPoints(), false, _this);
                    _this.changeState(new Idle());
                    _this.runSpeed = 100;
                    return _this;
                }
                Character.prototype.update = function () {
                    this.charState.update();
                    _super.prototype.update.call(this);
                    if (this.isShooting) {
                        this.shootTime += game_2.game.deltaTime;
                        if (this.shootTime > 0.2) {
                            this.stopShoot();
                        }
                    }
                };
                Character.prototype.getShootPos = function () {
                    var busterOffset = this.currentFrame.getBusterOffset().clone();
                    busterOffset.x *= this.xDir;
                    return this.pos.add(busterOffset);
                };
                Character.prototype.shoot = function () {
                    if (!this.isShooting) {
                        this.isShooting = true;
                        this.shootTime = 0;
                        this.changeSprite(this.charState.shootSprite, false);
                        var vel = new point_4.Point(350 * this.xDir, 0);
                        var proj = new projectile_1.Projectile(this.getShootPos(), vel, 1, this.player, game_2.game.sprites["buster1"]);
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
                    newState.character = this;
                    if (!this.isShooting || !newState.canShoot) {
                        this.changeSprite(newState.sprite, true);
                    }
                    else {
                        this.changeSprite(newState.shootSprite, true);
                    }
                    this.charState = newState;
                    if (!newState.canShoot) {
                        this.stopShoot();
                    }
                };
                return Character;
            }(actor_2.Actor));
            exports_10("Character", Character);
            CharState = (function () {
                function CharState(sprite, shootSprite) {
                    this.sprite = sprite;
                    this.shootSprite = shootSprite;
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
                CharState.prototype.update = function () {
                    if (this.canShoot) {
                        if (this.player.input["shoot"]) {
                            this.character.shoot();
                        }
                    }
                };
                CharState.prototype.airCode = function () {
                    if (this.character.grounded) {
                        this.character.changeState(new Idle());
                        return;
                    }
                    var move = new point_4.Point(0, 0);
                    if (this.player.input["left"]) {
                        move.x = -this.character.runSpeed;
                        this.character.xDir = -1;
                    }
                    else if (this.player.input["right"]) {
                        move.x = this.character.runSpeed;
                        this.character.xDir = 1;
                    }
                    if (move.magnitude > 0) {
                        this.character.move(move);
                    }
                };
                CharState.prototype.groundCode = function () {
                    if (!this.character.grounded) {
                        this.character.changeState(new Fall());
                    }
                    else if (this.player.input["jump"]) {
                        this.character.vel.y = -400;
                        this.character.changeState(new Jump());
                    }
                };
                return CharState;
            }());
            Idle = (function (_super) {
                __extends(Idle, _super);
                function Idle() {
                    return _super.call(this, game_2.game.sprites["mmx_idle"], game_2.game.sprites["mmx_shoot"]) || this;
                }
                Idle.prototype.update = function () {
                    _super.prototype.update.call(this);
                    if (this.player.input["left"] || this.player.input["right"]) {
                        this.character.changeState(new Run());
                    }
                    this.groundCode();
                };
                return Idle;
            }(CharState));
            Run = (function (_super) {
                __extends(Run, _super);
                function Run() {
                    return _super.call(this, game_2.game.sprites["mmx_run"], game_2.game.sprites["mmx_run_shoot"]) || this;
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
                };
                return Run;
            }(CharState));
            Jump = (function (_super) {
                __extends(Jump, _super);
                function Jump() {
                    return _super.call(this, game_2.game.sprites["mmx_jump"], game_2.game.sprites["mmx_jump_shoot"]) || this;
                }
                Jump.prototype.update = function () {
                    _super.prototype.update.call(this);
                    this.airCode();
                    if (this.character.vel.y > 0) {
                        this.character.changeState(new Fall());
                    }
                };
                return Jump;
            }(CharState));
            Fall = (function (_super) {
                __extends(Fall, _super);
                function Fall() {
                    return _super.call(this, game_2.game.sprites["mmx_fall"], game_2.game.sprites["mmx_fall_shoot"]) || this;
                }
                Fall.prototype.update = function () {
                    _super.prototype.update.call(this);
                    this.airCode();
                };
                return Fall;
            }(CharState));
        }
    };
});
System.register("player", ["character"], function (exports_11, context_11) {
    "use strict";
    var __moduleName = context_11 && context_11.id;
    var character_1, Player;
    return {
        setters: [
            function (character_1_1) {
                character_1 = character_1_1;
            }
        ],
        execute: function () {
            Player = (function () {
                function Player(x, y, isAI, alliance) {
                    this.alliance = alliance;
                    this.isAI = isAI;
                    this.input = {};
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
                    this.character = new character_1.Character(this, x, y);
                }
                Player.prototype.onKeyDown = function (keycode) {
                    if (this.isAI)
                        return;
                    var key = this.inputMapping[keycode];
                    this.input[key] = true;
                };
                Player.prototype.onKeyUp = function (keycode) {
                    if (this.isAI)
                        return;
                    var key = this.inputMapping[keycode];
                    this.input[key] = false;
                };
                return Player;
            }());
            exports_11("Player", Player);
        }
    };
});
System.register("level", ["wall", "point", "game", "helpers", "actor", "rect"], function (exports_12, context_12) {
    "use strict";
    var __moduleName = context_12 && context_12.id;
    var wall_1, point_5, game_3, Helpers, actor_3, rect_3, Level;
    return {
        setters: [
            function (wall_1_1) {
                wall_1 = wall_1_1;
            },
            function (point_5_1) {
                point_5 = point_5_1;
            },
            function (game_3_1) {
                game_3 = game_3_1;
            },
            function (Helpers_2) {
                Helpers = Helpers_2;
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
                    this.gravity = 1000;
                    this.name = levelJson.name;
                    this.background = game_3.game.getBackground(levelJson.backgroundPath);
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
                            actor.sprite = game_3.game.sprites[instance.spriteName];
                            actor.pos = new point_5.Point(instance.pos.x, instance.pos.y);
                            actor.name = instance.name;
                            this.gameObjects.push(actor);
                        }
                    }
                    this.localPlayers = [];
                    this.players = [];
                }
                Level.prototype.update = function () {
                    for (var _i = 0, _a = this.gameObjects; _i < _a.length; _i++) {
                        var go = _a[_i];
                        go.update();
                    }
                };
                Level.prototype.render = function () {
                    if (this.mainPlayer.character) {
                        this.computeCamPos(this.mainPlayer.character);
                    }
                    game_3.game.ctx.setTransform(this.zoomScale, 0, 0, this.zoomScale, 0, 0);
                    game_3.game.ctx.clearRect(0, 0, game_3.game.canvas.width, game_3.game.canvas.height);
                    Helpers.drawRect(game_3.game.ctx, new rect_3.Rect(0, 0, game_3.game.canvas.width, game_3.game.canvas.height), "gray");
                    Helpers.drawImage(game_3.game.ctx, this.background, -this.camX, -this.camY);
                    for (var _i = 0, _a = this.gameObjects; _i < _a.length; _i++) {
                        var go = _a[_i];
                        go.render(-this.camX, -this.camY);
                    }
                };
                Level.prototype.computeCamPos = function (actor) {
                    var scaledCanvasW = game_3.game.canvas.width / this.zoomScale;
                    var scaledCanvasH = game_3.game.canvas.height / this.zoomScale;
                    this.camX = actor.pos.x - scaledCanvasW / 2;
                    this.camY = actor.pos.y - scaledCanvasH / 2;
                    if (this.camX < 0)
                        this.camX = 0;
                    if (this.camY < 0)
                        this.camY = 0;
                    if (this.camX > this.background.width - scaledCanvasW / 2)
                        this.camX = this.background.width - scaledCanvasW / 2;
                    if (this.camY > this.background.height - scaledCanvasH / 2)
                        this.camY = this.background.height - scaledCanvasH / 2;
                };
                Level.prototype.addGameObject = function (go) {
                    this.gameObjects.push(go);
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
System.register("sprites", [], function (exports_13, context_13) {
    "use strict";
    var __moduleName = context_13 && context_13.id;
    var spriteJsons;
    return {
        setters: [],
        execute: function () {
            spriteJsons = [{ "className": "Sprite", "hitboxes": [{ "className": "Hitbox", "tags": "", "width": 8, "height": 6, "offset": { "className": "Point", "x": 0, "y": 0 }, "rect": { "className": "Rect", "topLeftPoint": { "className": "Point", "x": 346, "y": 297 }, "botRightPoint": { "className": "Point", "x": 354, "y": 303 } }, "isTrigger": true }], "frames": [{ "className": "Frame", "rect": { "className": "Rect", "topLeftPoint": { "className": "Point", "x": 123, "y": 253 }, "botRightPoint": { "className": "Point", "x": 131, "y": 259 } }, "duration": 0.066, "offset": { "className": "Point", "x": 0, "y": 0 }, "hitboxes": [], "POIs": [] }], "POIs": [], "name": "buster1", "path": "assets/sprites/buster1.json", "alignment": "center", "wrapMode": "once", "spritesheetPath": "assets/spritesheets/effects.png" }, { "className": "Sprite", "hitboxes": [], "frames": [{ "className": "Frame", "rect": { "className": "Rect", "topLeftPoint": { "className": "Point", "x": 137, "y": 250 }, "botRightPoint": { "className": "Point", "x": 149, "y": 262 } }, "duration": 0.066, "offset": { "className": "Point", "x": 0, "y": 0 }, "hitboxes": [], "POIs": [] }, { "className": "Frame", "rect": { "className": "Rect", "topLeftPoint": { "className": "Point", "x": 154, "y": 249 }, "botRightPoint": { "className": "Point", "x": 167, "y": 262 } }, "duration": 0.066, "offset": { "className": "Point", "x": 0, "y": 0 }, "hitboxes": [], "POIs": [] }, { "className": "Frame", "rect": { "className": "Rect", "topLeftPoint": { "className": "Point", "x": 172, "y": 248 }, "botRightPoint": { "className": "Point", "x": 187, "y": 263 } }, "duration": 0.066, "offset": { "className": "Point", "x": 0, "y": 0 }, "hitboxes": [], "POIs": [] }], "POIs": [], "name": "buster1_fade", "path": "assets/sprites/buster1_fade.json", "alignment": "center", "wrapMode": "once", "spritesheetPath": "assets/spritesheets/effects.png" }, { "className": "Sprite", "hitboxes": [], "frames": [{ "className": "Frame", "rect": { "className": "Rect", "topLeftPoint": { "className": "Point", "x": 253, "y": 58 }, "botRightPoint": { "className": "Point", "x": 276, "y": 99 } }, "duration": 0.12, "offset": { "className": "Point", "x": -2, "y": -1 }, "hitboxes": [], "POIs": [] }, { "className": "Frame", "rect": { "className": "Rect", "topLeftPoint": { "className": "Point", "x": 278, "y": 57 }, "botRightPoint": { "className": "Point", "x": 305, "y": 99 } }, "duration": 0.12, "offset": { "className": "Point", "x": -3, "y": 1 }, "hitboxes": [], "POIs": [] }], "POIs": [], "name": "mmx_fall", "path": "assets/sprites/mmx_fall.json", "alignment": "botmid", "wrapMode": "once", "spritesheetPath": "assets/spritesheets/MegamanX.png" }, { "className": "Sprite", "hitboxes": [], "frames": [{ "className": "Frame", "rect": { "className": "Rect", "topLeftPoint": { "className": "Point", "x": 128, "y": 147 }, "botRightPoint": { "className": "Point", "x": 159, "y": 188 } }, "duration": 0.12, "offset": { "className": "Point", "x": 2, "y": 0 }, "hitboxes": [], "POIs": [{ "className": "POI", "x": 16.600000000000023, "y": -28.399999999999977, "tags": "bo" }] }, { "className": "Frame", "rect": { "className": "Rect", "topLeftPoint": { "className": "Point", "x": 160, "y": 146 }, "botRightPoint": { "className": "Point", "x": 191, "y": 188 } }, "duration": 0.12, "offset": { "className": "Point", "x": 2, "y": 1 }, "hitboxes": [], "POIs": [{ "className": "POI", "x": 16.600000000000023, "y": -28.600000000000023, "tags": "bo" }] }], "POIs": [], "name": "mmx_fall_shoot", "path": "assets/sprites/mmx_fall_shoot.json", "alignment": "botmid", "wrapMode": "once", "spritesheetPath": "assets/spritesheets/MegamanX.png" }, { "className": "Sprite", "hitboxes": [], "frames": [{ "className": "Frame", "rect": { "className": "Rect", "topLeftPoint": { "className": "Point", "x": 302, "y": 16 }, "botRightPoint": { "className": "Point", "x": 332, "y": 50 } }, "duration": 0.066, "offset": { "className": "Point", "x": 0, "y": 0 }, "hitboxes": [], "POIs": [] }], "POIs": [], "name": "mmx_idle", "path": "assets/sprites/mmx_idle.json", "alignment": "botmid", "wrapMode": "loop", "spritesheetPath": "assets/spritesheets/MegamanX.png" }, { "className": "Sprite", "hitboxes": [], "frames": [{ "className": "Frame", "rect": { "className": "Rect", "topLeftPoint": { "className": "Point", "x": 181, "y": 62 }, "botRightPoint": { "className": "Point", "x": 205, "y": 99 } }, "duration": 0.08, "offset": { "className": "Point", "x": 0, "y": 0 }, "hitboxes": [], "POIs": [] }, { "className": "Frame", "rect": { "className": "Rect", "topLeftPoint": { "className": "Point", "x": 210, "y": 58 }, "botRightPoint": { "className": "Point", "x": 225, "y": 99 } }, "duration": 0.08, "offset": { "className": "Point", "x": 0, "y": 0 }, "hitboxes": [], "POIs": [] }, { "className": "Frame", "rect": { "className": "Rect", "topLeftPoint": { "className": "Point", "x": 231, "y": 53 }, "botRightPoint": { "className": "Point", "x": 250, "y": 99 } }, "duration": 0.08, "offset": { "className": "Point", "x": 0, "y": 0 }, "hitboxes": [], "POIs": [] }], "POIs": [], "name": "mmx_jump", "path": "assets/sprites/mmx_jump.json", "alignment": "botmid", "wrapMode": "once", "spritesheetPath": "assets/spritesheets/MegamanX.png" }, { "className": "Sprite", "hitboxes": [], "frames": [{ "className": "Frame", "rect": { "className": "Rect", "topLeftPoint": { "className": "Point", "x": 45, "y": 151 }, "botRightPoint": { "className": "Point", "x": 74, "y": 188 } }, "duration": 0.08, "offset": { "className": "Point", "x": 2, "y": 0 }, "hitboxes": [], "POIs": [{ "className": "POI", "x": 15.800000000000011, "y": -23.19999999999999 }] }, { "className": "Frame", "rect": { "className": "Rect", "topLeftPoint": { "className": "Point", "x": 76, "y": 147 }, "botRightPoint": { "className": "Point", "x": 100, "y": 188 } }, "duration": 0.08, "offset": { "className": "Point", "x": 5, "y": 0 }, "hitboxes": [], "POIs": [{ "className": "POI", "x": 15.600000000000023, "y": -28.399999999999977 }] }, { "className": "Frame", "rect": { "className": "Rect", "topLeftPoint": { "className": "Point", "x": 100, "y": 142 }, "botRightPoint": { "className": "Point", "x": 127, "y": 188 } }, "duration": 0.08, "offset": { "className": "Point", "x": 3, "y": 0 }, "hitboxes": [], "POIs": [{ "className": "POI", "x": 15.800000000000011, "y": -30.399999999999977 }] }], "POIs": [], "name": "mmx_jump_shoot", "path": "assets/sprites/mmx_jump_shoot.json", "alignment": "botmid", "wrapMode": "once", "spritesheetPath": "assets/spritesheets/MegamanX.png" }, { "className": "Sprite", "hitboxes": [], "frames": [{ "className": "Frame", "rect": { "className": "Rect", "topLeftPoint": { "className": "Point", "x": 116, "y": 106 }, "botRightPoint": { "className": "Point", "x": 136, "y": 140 } }, "duration": 0.066, "offset": { "className": "Point", "x": 1, "y": 0 }, "hitboxes": [], "POIs": [] }, { "className": "Frame", "rect": { "className": "Rect", "topLeftPoint": { "className": "Point", "x": 137, "y": 105 }, "botRightPoint": { "className": "Point", "x": 160, "y": 140 } }, "duration": 0.066, "offset": { "className": "Point", "x": -1, "y": 0 }, "hitboxes": [], "POIs": [] }, { "className": "Frame", "rect": { "className": "Rect", "topLeftPoint": { "className": "Point", "x": 160, "y": 106 }, "botRightPoint": { "className": "Point", "x": 192, "y": 140 } }, "duration": 0.066, "offset": { "className": "Point", "x": 0, "y": 0 }, "hitboxes": [], "POIs": [] }, { "className": "Frame", "rect": { "className": "Rect", "topLeftPoint": { "className": "Point", "x": 192, "y": 107 }, "botRightPoint": { "className": "Point", "x": 226, "y": 140 } }, "duration": 0.066, "offset": { "className": "Point", "x": -1, "y": 0 }, "hitboxes": [], "POIs": [] }, { "className": "Frame", "rect": { "className": "Rect", "topLeftPoint": { "className": "Point", "x": 226, "y": 107 }, "botRightPoint": { "className": "Point", "x": 252, "y": 140 } }, "duration": 0.066, "offset": { "className": "Point", "x": -1, "y": 0 }, "hitboxes": [], "POIs": [] }, { "className": "Frame", "rect": { "className": "Rect", "topLeftPoint": { "className": "Point", "x": 255, "y": 106 }, "botRightPoint": { "className": "Point", "x": 277, "y": 140 } }, "duration": 0.066, "offset": { "className": "Point", "x": 0, "y": 0 }, "hitboxes": [], "POIs": [] }, { "className": "Frame", "rect": { "className": "Rect", "topLeftPoint": { "className": "Point", "x": 277, "y": 105 }, "botRightPoint": { "className": "Point", "x": 302, "y": 140 } }, "duration": 0.066, "offset": { "className": "Point", "x": -1, "y": 0 }, "hitboxes": [], "POIs": [] }, { "className": "Frame", "rect": { "className": "Rect", "topLeftPoint": { "className": "Point", "x": 305, "y": 106 }, "botRightPoint": { "className": "Point", "x": 335, "y": 140 } }, "duration": 0.066, "offset": { "className": "Point", "x": 1, "y": 0 }, "hitboxes": [], "POIs": [] }, { "className": "Frame", "rect": { "className": "Rect", "topLeftPoint": { "className": "Point", "x": 336, "y": 107 }, "botRightPoint": { "className": "Point", "x": 370, "y": 140 } }, "duration": 0.066, "offset": { "className": "Point", "x": 0, "y": 0 }, "hitboxes": [], "POIs": [] }, { "className": "Frame", "rect": { "className": "Rect", "topLeftPoint": { "className": "Point", "x": 370, "y": 107 }, "botRightPoint": { "className": "Point", "x": 399, "y": 140 } }, "duration": 0.066, "offset": { "className": "Point", "x": -1, "y": 0 }, "hitboxes": [], "POIs": [] }], "POIs": [], "name": "mmx_run", "path": "assets/sprites/mmx_run.json", "alignment": "botmid", "wrapMode": "loop", "spritesheetPath": "assets/spritesheets/MegamanX.png" }, { "className": "Sprite", "hitboxes": [], "frames": [{ "className": "Frame", "rect": { "className": "Rect", "topLeftPoint": { "className": "Point", "x": 76, "y": 192 }, "botRightPoint": { "className": "Point", "x": 105, "y": 226 } }, "duration": 0.066, "offset": { "className": "Point", "x": 5, "y": 0 }, "hitboxes": [], "POIs": [{ "className": "POI", "x": 18.80000000000001, "y": -20.600000000000023 }] }, { "className": "Frame", "rect": { "className": "Rect", "topLeftPoint": { "className": "Point", "x": 105, "y": 191 }, "botRightPoint": { "className": "Point", "x": 137, "y": 226 } }, "duration": 0.066, "offset": { "className": "Point", "x": 4, "y": 0 }, "hitboxes": [], "POIs": [{ "className": "POI", "x": 18.399999999999977, "y": -22 }] }, { "className": "Frame", "rect": { "className": "Rect", "topLeftPoint": { "className": "Point", "x": 137, "y": 192 }, "botRightPoint": { "className": "Point", "x": 172, "y": 226 } }, "duration": 0.066, "offset": { "className": "Point", "x": 2, "y": 0 }, "hitboxes": [], "POIs": [{ "className": "POI", "x": 18.399999999999977, "y": -20.399999999999977 }] }, { "className": "Frame", "rect": { "className": "Rect", "topLeftPoint": { "className": "Point", "x": 173, "y": 193 }, "botRightPoint": { "className": "Point", "x": 211, "y": 226 } }, "duration": 0.066, "offset": { "className": "Point", "x": 1, "y": 0 }, "hitboxes": [], "POIs": [{ "className": "POI", "x": 18.399999999999977, "y": -19.19999999999999 }] }, { "className": "Frame", "rect": { "className": "Rect", "topLeftPoint": { "className": "Point", "x": 212, "y": 193 }, "botRightPoint": { "className": "Point", "x": 246, "y": 226 } }, "duration": 0.066, "offset": { "className": "Point", "x": 3, "y": 0 }, "hitboxes": [], "POIs": [{ "className": "POI", "x": 18.399999999999977, "y": -19.399999999999977 }] }, { "className": "Frame", "rect": { "className": "Rect", "topLeftPoint": { "className": "Point", "x": 246, "y": 192 }, "botRightPoint": { "className": "Point", "x": 277, "y": 226 } }, "duration": 0.066, "offset": { "className": "Point", "x": 4, "y": 0 }, "hitboxes": [], "POIs": [{ "className": "POI", "x": 18.600000000000023, "y": -20.399999999999977 }] }, { "className": "Frame", "rect": { "className": "Rect", "topLeftPoint": { "className": "Point", "x": 277, "y": 191 }, "botRightPoint": { "className": "Point", "x": 310, "y": 226 } }, "duration": 0.066, "offset": { "className": "Point", "x": 3, "y": 0 }, "hitboxes": [], "POIs": [{ "className": "POI", "x": 19, "y": -21.600000000000023 }] }, { "className": "Frame", "rect": { "className": "Rect", "topLeftPoint": { "className": "Point", "x": 310, "y": 192 }, "botRightPoint": { "className": "Point", "x": 345, "y": 226 } }, "duration": 0.066, "offset": { "className": "Point", "x": 2, "y": 0 }, "hitboxes": [], "POIs": [{ "className": "POI", "x": 18.399999999999977, "y": -20.399999999999977 }] }, { "className": "Frame", "rect": { "className": "Rect", "topLeftPoint": { "className": "Point", "x": 346, "y": 193 }, "botRightPoint": { "className": "Point", "x": 383, "y": 226 } }, "duration": 0.066, "offset": { "className": "Point", "x": 1, "y": 0 }, "hitboxes": [], "POIs": [{ "className": "POI", "x": 18.80000000000001, "y": -19.80000000000001 }] }, { "className": "Frame", "rect": { "className": "Rect", "topLeftPoint": { "className": "Point", "x": 383, "y": 193 }, "botRightPoint": { "className": "Point", "x": 418, "y": 226 } }, "duration": 0.066, "offset": { "className": "Point", "x": 2, "y": 0 }, "hitboxes": [], "POIs": [{ "className": "POI", "x": 18.399999999999977, "y": -19.80000000000001 }] }], "POIs": [], "name": "mmx_run_shoot", "path": "assets/sprites/mmx_run_shoot.json", "alignment": "botmid", "wrapMode": "loop", "spritesheetPath": "assets/spritesheets/MegamanX.png" }, { "className": "Sprite", "hitboxes": [], "frames": [{ "className": "Frame", "rect": { "className": "Rect", "topLeftPoint": { "className": "Point", "x": 112, "y": 65 }, "botRightPoint": { "className": "Point", "x": 142, "y": 99 } }, "duration": 0.066, "offset": { "className": "Point", "x": 0, "y": 0 }, "hitboxes": [], "POIs": [{ "className": "POI", "x": 13.600000000000023, "y": -18.80000000000001, "tags": "bo" }] }, { "className": "Frame", "rect": { "className": "Rect", "topLeftPoint": { "className": "Point", "x": 147, "y": 65 }, "botRightPoint": { "className": "Point", "x": 176, "y": 99 } }, "duration": 0.5, "offset": { "className": "Point", "x": -1, "y": 0 }, "hitboxes": [], "POIs": [{ "className": "POI", "x": 12.800000000000011, "y": -18.19999999999999, "tags": "bo" }] }], "POIs": [], "name": "mmx_shoot", "path": "assets/sprites/mmx_shoot.json", "alignment": "botmid", "wrapMode": "once", "spritesheetPath": "assets/spritesheets/MegamanX.png" }];
            exports_13("spriteJsons", spriteJsons);
        }
    };
});
System.register("levels", [], function (exports_14, context_14) {
    "use strict";
    var __moduleName = context_14 && context_14.id;
    var levelJsons;
    return {
        setters: [],
        execute: function () {
            levelJsons = [{ "className": "Level", "instances": [{ "className": "ShapeInstance", "name": "Shape Instance", "points": [{ "className": "Point", "x": 46, "y": 124, "perc_from_left": 0, "perc_from_right": 1, "perc_from_top": 0, "perc_from_bottom": 1 }, { "className": "Point", "x": 807, "y": 124, "perc_from_left": 1, "perc_from_right": 0, "perc_from_top": 0, "perc_from_bottom": 1 }, { "className": "Point", "x": 807, "y": 181, "perc_from_left": 1, "perc_from_right": 0, "perc_from_top": 1, "perc_from_bottom": 0 }, { "className": "Point", "x": 46, "y": 181, "perc_from_left": 0, "perc_from_right": 1, "perc_from_top": 1, "perc_from_bottom": 0 }] }], "name": "new_level", "path": "assets/levels/new_level.json", "backgroundPath": "assets/backgrounds/highway.png" }];
            exports_14("levelJsons", levelJsons);
        }
    };
});
System.register("game", ["sprite", "level", "sprites", "levels", "player"], function (exports_15, context_15) {
    "use strict";
    var __moduleName = context_15 && context_15.id;
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
                    this.loadSprites();
                    this.loadLevels();
                    this.loadLevel("new_level");
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
                    var player1 = new player_1.Player(200, 100, false, 0);
                    var cpu1 = new player_1.Player(400, 100, true, 1);
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
                    return true;
                };
                Game.prototype.gameLoop = function () {
                    var _this = this;
                    if (this.isLoaded()) {
                        this.deltaTime = (Date.now() - this.startTime) / 1000;
                        for (var _i = 0, _a = this.level.players; _i < _a.length; _i++) {
                            var player = _a[_i];
                        }
                        this.level.update();
                        this.level.render();
                        for (var _b = 0, _c = this.level.players; _b < _c.length; _b++) {
                            var player = _c[_b];
                        }
                        this.startTime = Date.now();
                    }
                    window.requestAnimationFrame(function () { return _this.gameLoop(); });
                };
                return Game;
            }());
            game = new Game();
            exports_15("game", game);
        }
    };
});
System.register("collider", ["shape"], function (exports_16, context_16) {
    "use strict";
    var __moduleName = context_16 && context_16.id;
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
                Collider.prototype.clone = function (x, y) {
                    var shape = this.shape.clone(x, y);
                    return new Collider(shape.points, this.isTrigger, this.gameObject);
                };
                return Collider;
            }());
            exports_16("Collider", Collider);
        }
    };
});
System.register("frame", [], function (exports_17, context_17) {
    "use strict";
    var __moduleName = context_17 && context_17.id;
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
            exports_17("Frame", Frame);
        }
    };
});
System.register("sprite", ["collider", "frame", "point", "rect", "game", "helpers"], function (exports_18, context_18) {
    "use strict";
    var __moduleName = context_18 && context_18.id;
    var collider_3, frame_1, point_6, rect_4, game_4, Helpers, Sprite;
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
            function (game_4_1) {
                game_4 = game_4_1;
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
                    this.wrapMode = spriteJson.wrapMode;
                    if (!this.wrapMode) {
                        console.error("NO WRAP MODE FOR SPRITE " + this.name);
                    }
                    this.frames = [];
                    this.hitboxes = [];
                    this.spritesheet = game_4.game.getSpritesheet(spriteJson.spritesheetPath);
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
                Sprite.prototype.draw = function (frameIndex, x, y, flipX, flipY) {
                    flipX = flipX || 1;
                    flipY = flipY || 1;
                    var frame = this.frames[frameIndex];
                    var rect = frame.rect;
                    var offset = this.getAlignOffset(frameIndex, flipX, flipY);
                    Helpers.drawImage(game_4.game.ctx, this.spritesheet, rect.x1, rect.y1, rect.w, rect.h, x + offset.x, y + offset.y, flipX, flipY);
                };
                return Sprite;
            }());
            exports_18("Sprite", Sprite);
        }
    };
});
System.register("actor", ["point", "game", "helpers"], function (exports_19, context_19) {
    "use strict";
    var __moduleName = context_19 && context_19.id;
    var point_7, game_5, Helpers, Actor;
    return {
        setters: [
            function (point_7_1) {
                point_7 = point_7_1;
            },
            function (game_5_1) {
                game_5 = game_5_1;
            },
            function (Helpers_4) {
                Helpers = Helpers_4;
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
                    game_5.game.level.addGameObject(this);
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
                    var onceEnd = this.sprite.wrapMode === "once" && this.frameIndex === this.sprite.frames.length - 1;
                    if (!onceEnd) {
                        this.frameTime += game_5.game.deltaTime * this.frameSpeed;
                        if (this.frameTime >= this.currentFrame.duration) {
                            this.frameTime = 0;
                            this.frameIndex++;
                            if (this.frameIndex >= this.sprite.frames.length)
                                this.frameIndex = 0;
                        }
                    }
                    if (this.useGravity && !this.grounded) {
                        this.vel.y += game_5.game.level.gravity * game_5.game.deltaTime;
                        if (this.vel.y > 1000) {
                            this.vel.y = 1000;
                        }
                    }
                    this.move(this.vel);
                    if (game_5.game.level.checkCollisionActor(this, 0, 1)) {
                        this.grounded = true;
                        this.vel.y = 0;
                    }
                    else {
                        this.grounded = false;
                    }
                };
                Actor.prototype.move = function (amount) {
                    var inc = amount.clone();
                    while (inc.magnitude > 0) {
                        if (game_5.game.level.checkCollisionActor(this, inc.x * game_5.game.deltaTime, inc.y * game_5.game.deltaTime)) {
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
                    this.pos.inc(inc.multiply(game_5.game.deltaTime));
                };
                Actor.prototype.render = function (x, y) {
                    this.sprite.draw(this.frameIndex, this.pos.x + x, this.pos.y + y, this.xDir, this.yDir);
                    if (game_5.game.showHitboxes && this.collider) {
                        Helpers.drawPolygon(game_5.game.ctx, this.collider.shape.clone(x, y), true, "blue", "", 0, 0.5);
                        Helpers.drawCircle(game_5.game.ctx, this.pos.x + x, this.pos.y + y, 1, "red");
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
                                return this.globalCollider.clone(this.pos.x + offset_1.x, this.pos.y + offset_1.y);
                            }
                            return undefined;
                        }
                        var offset = this.sprite.getAlignOffset(0, this.xDir, this.yDir);
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
            exports_19("Actor", Actor);
        }
    };
});
System.register("color", [], function (exports_20, context_20) {
    "use strict";
    var __moduleName = context_20 && context_20.id;
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
            exports_20("Color", Color);
        }
    };
});
System.register("vue", [], function (exports_21, context_21) {
    "use strict";
    var __moduleName = context_21 && context_21.id;
    function startVue() {
    }
    exports_21("startVue", startVue);
    return {
        setters: [],
        execute: function () {
        }
    };
});
//# sourceMappingURL=main.js.map