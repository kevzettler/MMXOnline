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
var __values = (this && this.__values) || function (o) {
    var m = typeof Symbol === "function" && o[Symbol.iterator], i = 0;
    if (m) return m.call(o);
    return {
        next: function () {
            if (o && i >= o.length) o = void 0;
            return { value: o && o[i++], done: !o };
        }
    };
};
System.register("gameObject", [], function (exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    return {
        setters: [],
        execute: function () {
        }
    };
});
System.register("geometry", ["collider", "game", "helpers"], function (exports_2, context_2) {
    "use strict";
    var __moduleName = context_2 && context_2.id;
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
                function Geometry(name, points) {
                    this.name = name;
                    this.collider = new collider_1.Collider(points, false, undefined, true, true);
                }
                Geometry.prototype.preUpdate = function () {
                };
                Geometry.prototype.update = function () {
                };
                Geometry.prototype.render = function (x, y) {
                    if (game_1.game.options.showHitboxes) {
                        Helpers.drawPolygon(game_1.game.uiCtx, this.collider.shape.clone(x, y), true, "blue", "", 0, 0.5);
                    }
                };
                Geometry.prototype.onCollision = function (other) {
                };
                return Geometry;
            }());
            exports_2("Geometry", Geometry);
        }
    };
});
System.register("wall", ["geometry"], function (exports_3, context_3) {
    "use strict";
    var __moduleName = context_3 && context_3.id;
    var geometry_1, Wall, Ladder, KillZone, JumpZone;
    return {
        setters: [
            function (geometry_1_1) {
                geometry_1 = geometry_1_1;
            }
        ],
        execute: function () {
            Wall = (function (_super) {
                __extends(Wall, _super);
                function Wall(name, points) {
                    var _this = _super.call(this, name, points) || this;
                    _this.collider.isClimbable = true;
                    return _this;
                }
                return Wall;
            }(geometry_1.Geometry));
            exports_3("Wall", Wall);
            Ladder = (function (_super) {
                __extends(Ladder, _super);
                function Ladder(name, points) {
                    var _this = _super.call(this, name, points) || this;
                    _this.collider.isTrigger = true;
                    return _this;
                }
                return Ladder;
            }(geometry_1.Geometry));
            exports_3("Ladder", Ladder);
            KillZone = (function (_super) {
                __extends(KillZone, _super);
                function KillZone(name, points) {
                    var _this = _super.call(this, name, points) || this;
                    _this.collider.isTrigger = true;
                    return _this;
                }
                return KillZone;
            }(geometry_1.Geometry));
            exports_3("KillZone", KillZone);
            JumpZone = (function (_super) {
                __extends(JumpZone, _super);
                function JumpZone(name, points) {
                    var _this = _super.call(this, name, points) || this;
                    _this.collider.isTrigger = true;
                    return _this;
                }
                return JumpZone;
            }(geometry_1.Geometry));
            exports_3("JumpZone", JumpZone);
        }
    };
});
System.register("damager", [], function (exports_4, context_4) {
    "use strict";
    var __moduleName = context_4 && context_4.id;
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
            exports_4("Damager", Damager);
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
                    if (r === undefined || g === undefined || b === undefined || a === undefined)
                        throw "Bad color";
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
                Object.defineProperty(Color.prototype, "number", {
                    get: function () {
                        var rString = this.r.toString(16);
                        var gString = this.g.toString(16);
                        var bString = this.b.toString(16);
                        if (rString.length === 1)
                            rString = "0" + rString;
                        if (gString.length === 1)
                            gString = "0" + gString;
                        if (bString.length === 1)
                            bString = "0" + bString;
                        var hex = "0x" + rString + gString + bString;
                        return parseInt(hex, 16);
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
                    var numberArray = [];
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
                        numberArray.push([topColor.number, botColor.number]);
                    }
                    this.filter = new PIXI.filters.MultiColorReplaceFilter(numberArray);
                };
                return Palette;
            }());
            exports_5("Palette", Palette);
        }
    };
});
System.register("weapon", ["projectile", "game", "point", "helpers", "actor"], function (exports_6, context_6) {
    "use strict";
    var __moduleName = context_6 && context_6.id;
    var projectile_1, game_2, point_1, Helpers, actor_1, Weapon, Buster, Torpedo, Sting, RollingShield, FireWave, Tornado, ElectricSpark, Boomerang, ShotgunIce;
    return {
        setters: [
            function (projectile_1_1) {
                projectile_1 = projectile_1_1;
            },
            function (game_2_1) {
                game_2 = game_2_1;
            },
            function (point_1_1) {
                point_1 = point_1_1;
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
                };
                Weapon.prototype.update = function () {
                    if (this.soundTime > 0) {
                        this.soundTime = Helpers.clampMin(this.soundTime - game_2.game.deltaTime, 0);
                    }
                };
                Weapon.prototype.createBuster4Line = function (x, y, xDir, player, offsetTime) {
                    var buster4Speed = 350;
                    new projectile_1.Buster4Proj(this, new point_1.Point(x + xDir, y), new point_1.Point(xDir * buster4Speed, 0), player, 3, 4, offsetTime);
                    new projectile_1.Buster4Proj(this, new point_1.Point(x + xDir * 8, y), new point_1.Point(xDir * buster4Speed, 0), player, 2, 3, offsetTime);
                    new projectile_1.Buster4Proj(this, new point_1.Point(x + xDir * 18, y), new point_1.Point(xDir * buster4Speed, 0), player, 2, 2, offsetTime);
                    new projectile_1.Buster4Proj(this, new point_1.Point(x + xDir * 32, y), new point_1.Point(xDir * buster4Speed, 0), player, 1, 1, offsetTime);
                    new projectile_1.Buster4Proj(this, new point_1.Point(x + xDir * 46, y), new point_1.Point(xDir * buster4Speed, 0), player, 0, 0, offsetTime);
                };
                Weapon.prototype.canShoot = function (player) {
                    return true;
                };
                Weapon.prototype.shoot = function (pos, xDir, player, chargeLevel) {
                    this.getProjectile(pos, xDir, player, chargeLevel);
                    if (this instanceof Buster && chargeLevel === 3) {
                        new actor_1.Anim(pos.clone(), game_2.game.sprites["buster4_muzzle_flash"], xDir);
                        var xOff = -50 * xDir;
                        this.createBuster4Line(pos.x + xOff, pos.y, xDir, player, 0);
                        this.createBuster4Line(pos.x + xOff + 15 * xDir, pos.y, xDir, player, 1);
                        this.createBuster4Line(pos.x + xOff + 30 * xDir, pos.y, xDir, player, 2);
                    }
                    if (this.soundTime === 0) {
                        player.character.playSound(this.shootSounds[chargeLevel]);
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
            exports_6("Weapon", Weapon);
            Buster = (function (_super) {
                __extends(Buster, _super);
                function Buster() {
                    var _this = _super.call(this) || this;
                    _this.shootSounds = ["buster", "buster2", "buster3", "buster4"];
                    _this.index = 0;
                    return _this;
                }
                Buster.prototype.getProjectile = function (pos, xDir, player, chargeLevel) {
                    var vel = new point_1.Point(xDir * this.speed, 0);
                    if (chargeLevel === 0)
                        new projectile_1.BusterProj(this, pos, vel, player);
                    else if (chargeLevel === 1)
                        new projectile_1.Buster2Proj(this, pos, vel, player);
                    else if (chargeLevel === 2)
                        new projectile_1.Buster3Proj(this, pos, vel, player);
                    else if (chargeLevel === 3)
                        undefined;
                };
                return Buster;
            }(Weapon));
            exports_6("Buster", Buster);
            Torpedo = (function (_super) {
                __extends(Torpedo, _super);
                function Torpedo() {
                    var _this = _super.call(this) || this;
                    _this.shootSounds = ["torpedo", "torpedo", "torpedo", "torpedo"];
                    _this.index = 1;
                    _this.speed = 150;
                    _this.rateOfFire = 0.5;
                    _this.palette = game_2.game.palettes["torpedo"];
                    return _this;
                }
                Torpedo.prototype.getProjectile = function (pos, xDir, player, chargeLevel) {
                    var vel = new point_1.Point(xDir * this.speed, 0);
                    new projectile_1.TorpedoProj(this, pos, vel, player);
                };
                return Torpedo;
            }(Weapon));
            exports_6("Torpedo", Torpedo);
            Sting = (function (_super) {
                __extends(Sting, _super);
                function Sting() {
                    var _this = _super.call(this) || this;
                    _this.shootSounds = ["csting", "csting", "csting", "csting"];
                    _this.index = 2;
                    _this.speed = 300;
                    _this.rateOfFire = 0.75;
                    _this.palette = game_2.game.palettes["sting"];
                    return _this;
                }
                Sting.prototype.getProjectile = function (pos, xDir, player, chargeLevel) {
                    var vel = new point_1.Point(xDir * this.speed, 0);
                    new projectile_1.StingProj(this, pos, vel, player, 0);
                };
                return Sting;
            }(Weapon));
            exports_6("Sting", Sting);
            RollingShield = (function (_super) {
                __extends(RollingShield, _super);
                function RollingShield() {
                    var _this = _super.call(this) || this;
                    _this.shootSounds = ["rollingShield", "rollingShield", "rollingShield", "rollingShield"];
                    _this.index = 3;
                    _this.speed = 200;
                    _this.rateOfFire = 0.75;
                    _this.palette = game_2.game.palettes["rolling_shield"];
                    return _this;
                }
                RollingShield.prototype.getProjectile = function (pos, xDir, player, chargeLevel) {
                    var vel = new point_1.Point(xDir * this.speed, 0);
                    new projectile_1.RollingShieldProj(this, pos, vel, player);
                };
                return RollingShield;
            }(Weapon));
            exports_6("RollingShield", RollingShield);
            FireWave = (function (_super) {
                __extends(FireWave, _super);
                function FireWave() {
                    var _this = _super.call(this) || this;
                    _this.shootSounds = ["fireWave", "fireWave", "fireWave", "fireWave"];
                    _this.index = 4;
                    _this.speed = 400;
                    _this.rateOfFire = 0.05;
                    _this.palette = game_2.game.palettes["fire_wave"];
                    return _this;
                }
                FireWave.prototype.getProjectile = function (pos, xDir, player, chargeLevel) {
                    var vel = new point_1.Point(xDir * this.speed, 0);
                    vel.inc(player.character.vel.times(-0.5));
                    new projectile_1.FireWaveProj(this, pos, vel, player);
                };
                return FireWave;
            }(Weapon));
            exports_6("FireWave", FireWave);
            Tornado = (function (_super) {
                __extends(Tornado, _super);
                function Tornado() {
                    var _this = _super.call(this) || this;
                    _this.shootSounds = ["tornado", "tornado", "tornado", "tornado"];
                    _this.index = 5;
                    _this.speed = 400;
                    _this.rateOfFire = 1.5;
                    _this.palette = game_2.game.palettes["tornado"];
                    return _this;
                }
                Tornado.prototype.getProjectile = function (pos, xDir, player, chargeLevel) {
                    var vel = new point_1.Point(xDir * this.speed, 0);
                    new projectile_1.TornadoProj(this, pos, vel, player);
                };
                return Tornado;
            }(Weapon));
            exports_6("Tornado", Tornado);
            ElectricSpark = (function (_super) {
                __extends(ElectricSpark, _super);
                function ElectricSpark() {
                    var _this = _super.call(this) || this;
                    _this.shootSounds = ["electricSpark", "electricSpark", "electricSpark", "electricSpark"];
                    _this.index = 6;
                    _this.speed = 150;
                    _this.rateOfFire = 0.5;
                    _this.palette = game_2.game.palettes["electric_spark"];
                    return _this;
                }
                ElectricSpark.prototype.getProjectile = function (pos, xDir, player, chargeLevel) {
                    if (chargeLevel === 0) {
                        var vel = new point_1.Point(xDir * this.speed, 0);
                        new projectile_1.ElectricSparkProj(this, pos, vel, player, 0);
                    }
                    else {
                        new projectile_1.ElectricSparkProjCharged(this, pos.addxy(-1, 0), player, -1);
                        new projectile_1.ElectricSparkProjCharged(this, pos.addxy(1, 0), player, 1);
                    }
                };
                return ElectricSpark;
            }(Weapon));
            exports_6("ElectricSpark", ElectricSpark);
            Boomerang = (function (_super) {
                __extends(Boomerang, _super);
                function Boomerang() {
                    var _this = _super.call(this) || this;
                    _this.shootSounds = ["boomerang", "boomerang", "boomerang", "boomerang"];
                    _this.index = 7;
                    _this.speed = 250;
                    _this.rateOfFire = 0.5;
                    _this.palette = game_2.game.palettes["boomerang"];
                    return _this;
                }
                Boomerang.prototype.getProjectile = function (pos, xDir, player, chargeLevel) {
                    var vel = new point_1.Point(xDir * this.speed, 0);
                    new projectile_1.BoomerangProj(this, pos, vel, player);
                };
                return Boomerang;
            }(Weapon));
            exports_6("Boomerang", Boomerang);
            ShotgunIce = (function (_super) {
                __extends(ShotgunIce, _super);
                function ShotgunIce() {
                    var _this = _super.call(this) || this;
                    _this.shootSounds = ["buster", "buster", "buster", "buster"];
                    _this.index = 8;
                    _this.speed = 400;
                    _this.rateOfFire = 0.75;
                    _this.palette = game_2.game.palettes["shotgun_ice"];
                    return _this;
                }
                ShotgunIce.prototype.getProjectile = function (pos, xDir, player, chargeLevel) {
                    var vel = new point_1.Point(xDir * this.speed, 0);
                    new projectile_1.ShotgunIceProj(this, pos, vel, player, 0);
                };
                return ShotgunIce;
            }(Weapon));
            exports_6("ShotgunIce", ShotgunIce);
        }
    };
});
System.register("pickup", ["actor", "game", "character"], function (exports_7, context_7) {
    "use strict";
    var __moduleName = context_7 && context_7.id;
    var actor_2, game_3, character_1, PickupType, Pickup, LargeHealthPickup, SmallHealthPickup, LargeAmmoPickup, SmallAmmoPickup, PickupSpawner;
    return {
        setters: [
            function (actor_2_1) {
                actor_2 = actor_2_1;
            },
            function (game_3_1) {
                game_3 = game_3_1;
            },
            function (character_1_1) {
                character_1 = character_1_1;
            }
        ],
        execute: function () {
            (function (PickupType) {
                PickupType[PickupType["Health"] = 0] = "Health";
                PickupType[PickupType["Ammo"] = 1] = "Ammo";
            })(PickupType || (PickupType = {}));
            exports_7("PickupType", PickupType);
            Pickup = (function (_super) {
                __extends(Pickup, _super);
                function Pickup(pos, sprite) {
                    var _this = _super.call(this, sprite, pos) || this;
                    _this.healAmount = 0;
                    _this.collider.wallOnly = true;
                    return _this;
                }
                Pickup.prototype.onCollision = function (other) {
                    _super.prototype.onCollision.call(this, other);
                    if (other.gameObject instanceof character_1.Character) {
                        if (this.pickupType == PickupType.Health) {
                            other.gameObject.addHealth(this.healAmount);
                        }
                        else if (this.pickupType === PickupType.Ammo) {
                            other.gameObject.addAmmo(this.healAmount);
                        }
                        this.destroySelf();
                    }
                };
                return Pickup;
            }(actor_2.Actor));
            exports_7("Pickup", Pickup);
            LargeHealthPickup = (function (_super) {
                __extends(LargeHealthPickup, _super);
                function LargeHealthPickup(pos) {
                    var _this = _super.call(this, pos, game_3.game.sprites["pickup_health_large"]) || this;
                    _this.healAmount = 10;
                    _this.pickupType = PickupType.Health;
                    return _this;
                }
                return LargeHealthPickup;
            }(Pickup));
            exports_7("LargeHealthPickup", LargeHealthPickup);
            SmallHealthPickup = (function (_super) {
                __extends(SmallHealthPickup, _super);
                function SmallHealthPickup(pos) {
                    var _this = _super.call(this, pos, game_3.game.sprites["pickup_health_small"]) || this;
                    _this.healAmount = 4;
                    _this.pickupType = PickupType.Health;
                    return _this;
                }
                return SmallHealthPickup;
            }(Pickup));
            exports_7("SmallHealthPickup", SmallHealthPickup);
            LargeAmmoPickup = (function (_super) {
                __extends(LargeAmmoPickup, _super);
                function LargeAmmoPickup(pos) {
                    var _this = _super.call(this, pos, game_3.game.sprites["pickup_ammo_large"]) || this;
                    _this.healAmount = 10;
                    _this.pickupType = PickupType.Ammo;
                    return _this;
                }
                return LargeAmmoPickup;
            }(Pickup));
            exports_7("LargeAmmoPickup", LargeAmmoPickup);
            SmallAmmoPickup = (function (_super) {
                __extends(SmallAmmoPickup, _super);
                function SmallAmmoPickup(pos) {
                    var _this = _super.call(this, pos, game_3.game.sprites["pickup_ammo_small"]) || this;
                    _this.healAmount = 4;
                    _this.pickupType = PickupType.Ammo;
                    return _this;
                }
                return SmallAmmoPickup;
            }(Pickup));
            exports_7("SmallAmmoPickup", SmallAmmoPickup);
            PickupSpawner = (function () {
                function PickupSpawner(pos, pickupClass) {
                    this.time = 0;
                    this.pos = pos;
                    this.pickupClass = pickupClass;
                    this.time = 15.1;
                }
                PickupSpawner.prototype.update = function () {
                    if (game_3.game.level.hasGameObject(this.currentPickup)) {
                        this.time = 0;
                        return;
                    }
                    this.time += game_3.game.deltaTime;
                    if (this.time > 15) {
                        this.time = 0;
                        this.currentPickup = new this.pickupClass(this.pos);
                    }
                };
                return PickupSpawner;
            }());
            exports_7("PickupSpawner", PickupSpawner);
        }
    };
});
System.register("projectile", ["actor", "damager", "point", "sprite", "collider", "character", "wall", "game", "helpers", "rect", "weapon", "pickup"], function (exports_8, context_8) {
    "use strict";
    var __moduleName = context_8 && context_8.id;
    var actor_3, damager_1, point_2, sprite_1, collider_2, character_2, wall_1, game_4, Helpers, rect_1, weapon_1, pickup_1, Projectile, BusterProj, Buster2Proj, Buster3Proj, Buster4Proj, TorpedoProj, StingProj, RollingShieldProj, FireWaveProj, TornadoProj, ElectricSparkProj, ElectricSparkProjCharged, BoomerangProj, ShotgunIceProj;
    return {
        setters: [
            function (actor_3_1) {
                actor_3 = actor_3_1;
            },
            function (damager_1_1) {
                damager_1 = damager_1_1;
            },
            function (point_2_1) {
                point_2 = point_2_1;
            },
            function (sprite_1_1) {
                sprite_1 = sprite_1_1;
            },
            function (collider_2_1) {
                collider_2 = collider_2_1;
            },
            function (character_2_1) {
                character_2 = character_2_1;
            },
            function (wall_1_1) {
                wall_1 = wall_1_1;
            },
            function (game_4_1) {
                game_4 = game_4_1;
            },
            function (Helpers_3) {
                Helpers = Helpers_3;
            },
            function (rect_1_1) {
                rect_1 = rect_1_1;
            },
            function (weapon_1_1) {
                weapon_1 = weapon_1_1;
            },
            function (pickup_1_1) {
                pickup_1 = pickup_1_1;
            }
        ],
        execute: function () {
            Projectile = (function (_super) {
                __extends(Projectile, _super);
                function Projectile(weapon, pos, vel, damage, player, sprite) {
                    var _this = _super.call(this, sprite, pos) || this;
                    _this.time = 0;
                    _this.hitCooldown = 0;
                    _this.destroyOnCharHit = true;
                    _this.weapon = weapon;
                    _this.vel = vel;
                    _this.speed = _this.vel.magnitude;
                    _this.useGravity = false;
                    _this.flinch = false;
                    _this.damager = new damager_1.Damager(player, damage);
                    _this.xDir = Math.sign(vel.x);
                    if (game_4.game.level.gameMode.isTeamMode) {
                        if (player.alliance === 0) {
                            _this.renderEffects.add("blueshadow");
                        }
                        else {
                            _this.renderEffects.add("redshadow");
                        }
                    }
                    return _this;
                }
                Projectile.prototype.update = function () {
                    _super.prototype.update.call(this);
                    this.time += game_4.game.deltaTime;
                    var leeway = 500;
                    if (this.pos.x > game_4.game.level.width + leeway || this.pos.x < -leeway || this.pos.y > game_4.game.level.height + leeway || this.pos.y < -leeway) {
                        this.destroySelf();
                    }
                };
                Projectile.prototype.onCollision = function (other) {
                    if (this instanceof TorpedoProj && other.gameObject instanceof Projectile && this.damager.owner.alliance !== other.gameObject.damager.owner.alliance) {
                        this.destroySelf(this.fadeSprite, this.fadeSound);
                        if (!(other.gameObject instanceof TornadoProj) && !(other.gameObject instanceof FireWaveProj) && !(other.gameObject instanceof Buster2Proj)
                            && !(other.gameObject instanceof Buster3Proj) && !(other.gameObject instanceof Buster4Proj) && !(other.gameObject instanceof RollingShieldProj)) {
                            other.gameObject.destroySelf(other.gameObject.fadeSprite, other.gameObject.fadeSound);
                        }
                        return;
                    }
                    if (this instanceof RollingShieldProj && other.gameObject instanceof Projectile && this.damager.owner.alliance !== other.gameObject.damager.owner.alliance) {
                        if (!(other.gameObject instanceof TornadoProj) && !(other.gameObject instanceof RollingShieldProj) && !(other.gameObject instanceof ElectricSparkProj)) {
                            other.gameObject.destroySelf(other.gameObject.fadeSprite, other.gameObject.fadeSound);
                        }
                    }
                    var character = other.gameObject;
                    if (character instanceof character_2.Character && character.player.alliance !== this.damager.owner.alliance) {
                        var pos = other.collider.shape.getIntersectPoint(this.pos, this.vel);
                        if (pos)
                            this.changePos(pos.clone());
                        var character_3 = other.gameObject;
                        if (character_3 instanceof character_2.Character) {
                            var key = this.constructor.toString() + this.damager.owner.id.toString();
                            if (!character_3.projectileCooldown[key] && !character_3.invulnFrames) {
                                character_3.projectileCooldown[key] = this.hitCooldown;
                                character_3.renderEffects.add("hit");
                                character_3.renderEffectTime = 0.1;
                                var weakness = false;
                                if (this instanceof TorpedoProj && character_3.player.weapon instanceof weapon_1.Boomerang)
                                    weakness = true;
                                if (this instanceof StingProj && character_3.player.weapon instanceof weapon_1.Tornado)
                                    weakness = true;
                                if (this instanceof RollingShieldProj && character_3.player.weapon instanceof weapon_1.Torpedo)
                                    weakness = true;
                                if (this instanceof FireWaveProj && character_3.player.weapon instanceof weapon_1.ShotgunIce)
                                    weakness = true;
                                if (this instanceof TornadoProj && character_3.player.weapon instanceof weapon_1.FireWave)
                                    weakness = true;
                                if (this instanceof BoomerangProj && character_3.player.weapon instanceof weapon_1.Sting)
                                    weakness = true;
                                if (this instanceof ElectricSparkProj && character_3.player.weapon instanceof weapon_1.RollingShield)
                                    weakness = true;
                                if (this instanceof ShotgunIceProj && character_3.player.weapon instanceof weapon_1.ElectricSpark)
                                    weakness = true;
                                character_3.applyDamage(this.damager.owner, this.weapon, this.damager.damage * (weakness ? 2 : 1));
                                if (this.flinch || game_4.game.options.alwaysFlinch || weakness) {
                                    if (game_4.game.useInvulnFrames()) {
                                        this.playSound("weakness");
                                    }
                                    else {
                                        this.playSound("hurt");
                                    }
                                    character_3.setHurt(this.pos.x > character_3.pos.x ? -1 : 1);
                                }
                                else {
                                    if (game_4.game.useInvulnFrames()) {
                                        this.playSound("weakness");
                                    }
                                    else {
                                        this.playSound("hit");
                                    }
                                }
                                if (game_4.game.useInvulnFrames()) {
                                    character_3.invulnFrames = 1;
                                    character_3.renderEffectTime = 1;
                                }
                            }
                            else if (character_3.invulnFrames && !character_3.projectileCooldown[key] &&
                                !(this instanceof TornadoProj) && !(this instanceof FireWaveProj)) {
                                this.playSound("hit");
                            }
                            this.onHitChar(character_3);
                        }
                    }
                    var wall = other.gameObject;
                    if (wall instanceof wall_1.Wall) {
                        this.onHitWall(other);
                    }
                };
                Projectile.prototype.onHitChar = function (character) {
                    if (this.destroyOnCharHit) {
                        this.destroySelf(this.fadeSprite, this.fadeSound);
                    }
                };
                Projectile.prototype.onHitWall = function (other) {
                };
                return Projectile;
            }(actor_3.Actor));
            exports_8("Projectile", Projectile);
            BusterProj = (function (_super) {
                __extends(BusterProj, _super);
                function BusterProj(weapon, pos, vel, player) {
                    var _this = _super.call(this, weapon, pos, vel, 1, player, game_4.game.sprites["buster1"]) || this;
                    _this.fadeSprite = game_4.game.sprites["buster1_fade"];
                    return _this;
                }
                return BusterProj;
            }(Projectile));
            exports_8("BusterProj", BusterProj);
            Buster2Proj = (function (_super) {
                __extends(Buster2Proj, _super);
                function Buster2Proj(weapon, pos, vel, player) {
                    var _this = _super.call(this, weapon, pos, vel, 3, player, game_4.game.sprites["buster2"]) || this;
                    _this.fadeSprite = game_4.game.sprites["buster2_fade"];
                    _this.flinch = true;
                    return _this;
                }
                return Buster2Proj;
            }(Projectile));
            exports_8("Buster2Proj", Buster2Proj);
            Buster3Proj = (function (_super) {
                __extends(Buster3Proj, _super);
                function Buster3Proj(weapon, pos, vel, player) {
                    var _this = _super.call(this, weapon, pos, vel, 6, player, game_4.game.sprites["buster3"]) || this;
                    _this.fadeSprite = game_4.game.sprites["buster3_fade"];
                    _this.flinch = true;
                    return _this;
                }
                return Buster3Proj;
            }(Projectile));
            exports_8("Buster3Proj", Buster3Proj);
            Buster4Proj = (function (_super) {
                __extends(Buster4Proj, _super);
                function Buster4Proj(weapon, pos, vel, player, type, num, offsetTime) {
                    var _this = _super.call(this, weapon, pos, vel, 8, player, game_4.game.sprites["buster4"]) || this;
                    _this.type = 0;
                    _this.num = 0;
                    _this.offsetTime = 0;
                    _this.initY = 0;
                    _this.fadeSprite = game_4.game.sprites["buster4_fade"];
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
                    var y = this.initY + Math.sin(game_4.game.time * 18 - this.num * 0.5 + this.offsetTime * 2.09) * 15;
                    this.changePos(new point_2.Point(this.pos.x, y));
                };
                return Buster4Proj;
            }(Projectile));
            exports_8("Buster4Proj", Buster4Proj);
            TorpedoProj = (function (_super) {
                __extends(TorpedoProj, _super);
                function TorpedoProj(weapon, pos, vel, player) {
                    var _this = _super.call(this, weapon, pos, vel, 2, player, game_4.game.sprites["torpedo"]) || this;
                    _this.smokeTime = 0;
                    _this.fadeSprite = game_4.game.sprites["explosion"];
                    _this.fadeSound = "explosion";
                    _this.angle = _this.xDir === -1 ? 180 : 0;
                    _this.vel.x = _this.vel.x * 0.25;
                    return _this;
                }
                TorpedoProj.prototype.update = function () {
                    _super.prototype.update.call(this);
                    if (this.target) {
                        if (this.time < 7.5) {
                            this.vel = this.vel.add(new point_2.Point(Helpers.cos(this.angle), Helpers.sin(this.angle)).times(this.speed * 0.25));
                            if (this.vel.magnitude > this.speed) {
                                this.vel = this.vel.normalize().times(this.speed);
                            }
                            var dTo = this.pos.directionTo(this.target.centerPos).normalize();
                            var destAngle = Math.atan2(dTo.y, dTo.x) * 180 / Math.PI;
                            destAngle = Helpers.to360(destAngle);
                            this.angle = Helpers.lerpAngle(this.angle, destAngle, game_4.game.deltaTime * 3);
                        }
                        else {
                        }
                    }
                    else if (this.time >= 0.15) {
                        this.target = game_4.game.level.getClosestTarget(this.pos, this.damager.owner.alliance);
                    }
                    else if (this.time < 0.15) {
                        this.vel.x += this.xDir * game_4.game.deltaTime * 300;
                    }
                    this.smokeTime += game_4.game.deltaTime;
                    if (this.smokeTime > 0.2) {
                        this.smokeTime = 0;
                        new actor_3.Anim(this.pos, game_4.game.sprites["torpedo_smoke"], 1);
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
                    this.sprite.draw(frameIndex, this.pos.x + x, this.pos.y + y, xDir, yDir, this.renderEffects, 1, this.palette);
                };
                return TorpedoProj;
            }(Projectile));
            exports_8("TorpedoProj", TorpedoProj);
            StingProj = (function (_super) {
                __extends(StingProj, _super);
                function StingProj(weapon, pos, vel, player, type) {
                    var _this = _super.call(this, weapon, pos, vel, 2, player, game_4.game.sprites["sting_start"]) || this;
                    _this.type = 0;
                    _this.origVel = vel.clone();
                    if (type === 1) {
                        var sprite = game_4.game.sprites["sting_flat"];
                        _this.changeSprite(sprite, false);
                    }
                    else if (type === 2 || type === 3) {
                        var sprite = game_4.game.sprites["sting_up"];
                        if (type === 3) {
                            _this.yDir = -1;
                        }
                        _this.changeSprite(sprite, false);
                    }
                    _this.fadeSprite = game_4.game.sprites["buster1_fade"];
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
                            new StingProj(this.weapon, this.pos.addxy(15 * this.xDir, 0), this.origVel, this.damager.owner, 1);
                            new StingProj(this.weapon, this.pos.addxy(15 * this.xDir, -8), this.origVel.addxy(0, -150), this.damager.owner, 2);
                            new StingProj(this.weapon, this.pos.addxy(15 * this.xDir, 8), this.origVel.addxy(0, 150), this.damager.owner, 3);
                            this.destroySelf();
                        }
                    }
                };
                return StingProj;
            }(Projectile));
            exports_8("StingProj", StingProj);
            RollingShieldProj = (function (_super) {
                __extends(RollingShieldProj, _super);
                function RollingShieldProj(weapon, pos, vel, player) {
                    var _this = _super.call(this, weapon, pos, vel, 2, player, game_4.game.sprites["rolling_shield"]) || this;
                    _this.fadeSprite = game_4.game.sprites["explosion"];
                    _this.fadeSound = "explosion";
                    _this.useGravity = true;
                    _this.collider.wallOnly = true;
                    return _this;
                }
                RollingShieldProj.prototype.update = function () {
                    if (!game_4.game.level.checkCollisionActor(this, 0, 0)) {
                        var collideData = game_4.game.level.checkCollisionActor(this, this.xDir, 0, this.vel);
                        if (collideData && collideData.hitData && !collideData.hitData.normal.isAngled()) {
                            this.vel.x *= -1;
                            this.xDir *= -1;
                        }
                    }
                    else {
                    }
                    _super.prototype.update.call(this);
                    if (this.time > 1.5) {
                        this.destroySelf(this.fadeSprite, this.fadeSound);
                    }
                };
                return RollingShieldProj;
            }(Projectile));
            exports_8("RollingShieldProj", RollingShieldProj);
            FireWaveProj = (function (_super) {
                __extends(FireWaveProj, _super);
                function FireWaveProj(weapon, pos, vel, player) {
                    var _this = _super.call(this, weapon, pos, vel, 1, player, game_4.game.sprites["fire_wave"]) || this;
                    _this.fadeSprite = game_4.game.sprites["fire_wave_fade"];
                    _this.hitCooldown = 0.225;
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
            exports_8("FireWaveProj", FireWaveProj);
            TornadoProj = (function (_super) {
                __extends(TornadoProj, _super);
                function TornadoProj(weapon, pos, vel, player) {
                    var _this = _super.call(this, weapon, pos, vel, 1, player, game_4.game.sprites["tornado_mid"]) || this;
                    _this.spriteMids = [];
                    _this.length = 1;
                    _this.sprite.pixiSprite.visible = false;
                    _this.spriteStart = new sprite_1.Sprite(game_4.game.sprites["tornado_start"].spriteJson, true, _this.container);
                    for (var i = 0; i < 6; i++) {
                        var midSprite = new sprite_1.Sprite(game_4.game.sprites["tornado_mid"].spriteJson, true, _this.container);
                        midSprite.pixiSprite.visible = false;
                        _this.spriteMids.push(midSprite);
                    }
                    _this.spriteEnd = new sprite_1.Sprite(game_4.game.sprites["tornado_end"].spriteJson, true, _this.container);
                    _this.vel.x = 0;
                    _this.hitCooldown = 0.3;
                    return _this;
                }
                TornadoProj.prototype.render = function (x, y) {
                    this.spriteStart.draw(this.frameIndex, this.pos.x + x, this.pos.y + y, this.xDir, this.yDir, this.renderEffects, 1, this.palette);
                    var i = 0;
                    var spriteMidLen = this.spriteMids[0].frames[this.frameIndex].rect.w;
                    for (i; i < this.length; i++) {
                        this.spriteMids[i].pixiSprite.visible = true;
                        this.spriteMids[i].draw(this.frameIndex, this.pos.x + x + (i * this.xDir * spriteMidLen), this.pos.y + y, this.xDir, this.yDir, this.renderEffects, 1, this.palette);
                    }
                    this.spriteEnd.draw(this.frameIndex, this.pos.x + x + (i * this.xDir * spriteMidLen), this.pos.y + y, this.xDir, this.yDir, this.renderEffects, 1, this.palette);
                    if (game_4.game.options.showHitboxes && this.collider) {
                        Helpers.drawPolygon(game_4.game.uiCtx, this.collider.shape.clone(x, y), true, "blue", "", 0, 0.5);
                    }
                };
                TornadoProj.prototype.update = function () {
                    _super.prototype.update.call(this);
                    var topX = 0;
                    var topY = 0;
                    var spriteMidLen = this.spriteMids[0].frames[this.frameIndex].rect.w;
                    var spriteEndLen = this.spriteEnd.frames[this.frameIndex].rect.w;
                    var botX = (this.length * spriteMidLen) + spriteEndLen;
                    var botY = this.spriteStart.frames[0].rect.h * 2;
                    var rect = new rect_1.Rect(topX, topY, botX, botY);
                    this.globalCollider = new collider_2.Collider(rect.getPoints(), true, this, false, false);
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
                    character.move(new point_2.Point(this.speed * 0.9 * this.xDir, 0));
                    if (character.isClimbingLadder()) {
                        character.setFall();
                    }
                };
                TornadoProj.prototype.destroySelf = function (sprite, fadeSound) {
                    _super.prototype.destroySelf.call(this, sprite, fadeSound);
                    this.container.removeChild(this.spriteStart.pixiSprite);
                    this.spriteStart.pixiSprite.destroy();
                    this.container.removeChild(this.spriteEnd.pixiSprite);
                    this.spriteEnd.pixiSprite.destroy();
                    try {
                        for (var _a = __values(this.spriteMids), _b = _a.next(); !_b.done; _b = _a.next()) {
                            var sprite_2 = _b.value;
                            this.container.removeChild(sprite_2.pixiSprite);
                            sprite_2.pixiSprite.destroy();
                        }
                    }
                    catch (e_1_1) { e_1 = { error: e_1_1 }; }
                    finally {
                        try {
                            if (_b && !_b.done && (_c = _a.return)) _c.call(_a);
                        }
                        finally { if (e_1) throw e_1.error; }
                    }
                    var e_1, _c;
                };
                return TornadoProj;
            }(Projectile));
            exports_8("TornadoProj", TornadoProj);
            ElectricSparkProj = (function (_super) {
                __extends(ElectricSparkProj, _super);
                function ElectricSparkProj(weapon, pos, vel, player, type) {
                    var _this = _super.call(this, weapon, pos, vel, 2, player, game_4.game.sprites["electric_spark"]) || this;
                    _this.type = 0;
                    _this.fadeSprite = game_4.game.sprites["electric_spark_fade"];
                    _this.type = type;
                    return _this;
                }
                ElectricSparkProj.prototype.onHitWall = function (other) {
                    if (this.type === 0) {
                        var normal = other.hitData ? other.hitData.normal : undefined;
                        if (normal) {
                            normal = normal.leftNormal();
                        }
                        else {
                            normal = new point_2.Point(0, 1);
                        }
                        normal.multiply(this.speed * 3);
                        this.destroySelf(this.fadeSprite);
                        new ElectricSparkProj(this.weapon, this.pos.clone(), normal, this.damager.owner, 1);
                        new ElectricSparkProj(this.weapon, this.pos.clone(), normal.times(-1), this.damager.owner, 1);
                    }
                };
                return ElectricSparkProj;
            }(Projectile));
            exports_8("ElectricSparkProj", ElectricSparkProj);
            ElectricSparkProjCharged = (function (_super) {
                __extends(ElectricSparkProjCharged, _super);
                function ElectricSparkProjCharged(weapon, pos, player, dir) {
                    var _this = _super.call(this, weapon, pos, new point_2.Point(dir * 450, 0), 4, player, game_4.game.sprites["electric_spark_charge"]) || this;
                    _this.xDir = dir;
                    _this.destroyOnCharHit = false;
                    _this.hitCooldown = 0.5;
                    _this.flinch = true;
                    return _this;
                }
                return ElectricSparkProjCharged;
            }(Projectile));
            exports_8("ElectricSparkProjCharged", ElectricSparkProjCharged);
            BoomerangProj = (function (_super) {
                __extends(BoomerangProj, _super);
                function BoomerangProj(weapon, pos, vel, player) {
                    var _this = _super.call(this, weapon, pos, vel, 2, player, game_4.game.sprites["boomerang"]) || this;
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
                    if (other.gameObject instanceof pickup_1.Pickup) {
                        this.pickup = other.gameObject;
                        this.pickup.collider.isTrigger = true;
                        this.pickup.useGravity = false;
                        this.pickup.pos = this.pos;
                    }
                    var character = other.gameObject;
                    if (this.time > 0.22 && character instanceof character_2.Character && character.player === this.damager.owner) {
                        if (this.pickup) {
                            this.pickup.pos = character.pos;
                        }
                        this.destroySelf();
                        if (character.player.weapon instanceof weapon_1.Boomerang) {
                            character.player.weapon.ammo++;
                        }
                    }
                };
                BoomerangProj.prototype.renderFromAngle = function (x, y) {
                    this.sprite.draw(this.frameIndex, this.pos.x + x, this.pos.y + y, 1, 1, this.renderEffects, 1, this.palette);
                };
                BoomerangProj.prototype.update = function () {
                    _super.prototype.update.call(this);
                    if (this.time > 0.22) {
                        if (this.angleDist < 180) {
                            var angInc = (-this.xDir * this.turnDir) * game_4.game.deltaTime * 300;
                            this.angle += angInc;
                            this.angleDist += Math.abs(angInc);
                            this.vel.x = Helpers.cos(this.angle) * this.speed;
                            this.vel.y = Helpers.sin(this.angle) * this.speed;
                        }
                        else if (this.damager.owner.character) {
                            var dTo = this.pos.directionTo(this.damager.owner.character.centerPos).normalize();
                            var destAngle = Math.atan2(dTo.y, dTo.x) * 180 / Math.PI;
                            destAngle = Helpers.to360(destAngle);
                            this.angle = Helpers.lerpAngle(this.angle, destAngle, game_4.game.deltaTime * 10);
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
            exports_8("BoomerangProj", BoomerangProj);
            ShotgunIceProj = (function (_super) {
                __extends(ShotgunIceProj, _super);
                function ShotgunIceProj(weapon, pos, vel, player, type) {
                    var _this = _super.call(this, weapon, pos, vel, 2, player, game_4.game.sprites["shotgun_ice"]) || this;
                    _this.type = 0;
                    _this.sparkleTime = 0;
                    if (type === 1) {
                        _this.changeSprite(game_4.game.sprites["shotgun_ice_piece"], true);
                    }
                    _this.fadeSprite = game_4.game.sprites["buster1_fade"];
                    _this.type = type;
                    return _this;
                }
                ShotgunIceProj.prototype.update = function () {
                    _super.prototype.update.call(this);
                    this.sparkleTime += game_4.game.deltaTime;
                    if (this.sparkleTime > 0.05) {
                        this.sparkleTime = 0;
                        new actor_3.Anim(this.pos, game_4.game.sprites["shotgun_ice_sparkles"], 1);
                    }
                };
                ShotgunIceProj.prototype.onHit = function (other) {
                    if (this.type === 0) {
                        this.destroySelf();
                        new ShotgunIceProj(this.weapon, this.pos.clone(), new point_2.Point(-this.vel.x, -this.speed), this.damager.owner, 1);
                        new ShotgunIceProj(this.weapon, this.pos.clone(), new point_2.Point(-this.vel.x, -this.speed * 0.5), this.damager.owner, 1);
                        new ShotgunIceProj(this.weapon, this.pos.clone(), new point_2.Point(-this.vel.x, 0 * 3), this.damager.owner, 1);
                        new ShotgunIceProj(this.weapon, this.pos.clone(), new point_2.Point(-this.vel.x, this.speed * 0.5), this.damager.owner, 1);
                        new ShotgunIceProj(this.weapon, this.pos.clone(), new point_2.Point(-this.vel.x, this.speed), this.damager.owner, 1);
                    }
                };
                ShotgunIceProj.prototype.onHitWall = function (other) {
                    this.onHit(other.gameObject);
                };
                ShotgunIceProj.prototype.onHitChar = function (character) {
                    _super.prototype.onHitChar.call(this, character);
                };
                return ShotgunIceProj;
            }(Projectile));
            exports_8("ShotgunIceProj", ShotgunIceProj);
        }
    };
});
System.register("effects", ["point", "game", "helpers", "actor"], function (exports_9, context_9) {
    "use strict";
    var __moduleName = context_9 && context_9.id;
    var point_3, game_5, Helpers, actor_4, ChargeParticle, ChargeEffect, DieEffectParticles, Effect, DieEffect;
    return {
        setters: [
            function (point_3_1) {
                point_3 = point_3_1;
            },
            function (game_5_1) {
                game_5 = game_5_1;
            },
            function (Helpers_4) {
                Helpers = Helpers_4;
            },
            function (actor_4_1) {
                actor_4 = actor_4_1;
            }
        ],
        execute: function () {
            ChargeParticle = (function (_super) {
                __extends(ChargeParticle, _super);
                function ChargeParticle(pos, time) {
                    var _this = _super.call(this, game_5.game.sprites["charge_part_1"], new point_3.Point(pos.x, pos.y), true) || this;
                    _this.time = time;
                    return _this;
                }
                ChargeParticle.prototype.update = function () {
                    _super.prototype.update.call(this);
                };
                return ChargeParticle;
            }(actor_4.Actor));
            ChargeEffect = (function () {
                function ChargeEffect() {
                    this.active = false;
                    this.chargeParts = [];
                    var radius = 24;
                    var angle = 0;
                    var point1 = new point_3.Point(Helpers.sin(angle) * radius, Helpers.cos(angle) * radius);
                    angle += 45;
                    var point2 = new point_3.Point(Helpers.sin(angle) * radius, Helpers.cos(angle) * radius);
                    angle += 45;
                    var point3 = new point_3.Point(Helpers.sin(angle) * radius, Helpers.cos(angle) * radius);
                    angle += 45;
                    var point4 = new point_3.Point(Helpers.sin(angle) * radius, Helpers.cos(angle) * radius);
                    angle += 45;
                    var point5 = new point_3.Point(Helpers.sin(angle) * radius, Helpers.cos(angle) * radius);
                    angle += 45;
                    var point6 = new point_3.Point(Helpers.sin(angle) * radius, Helpers.cos(angle) * radius);
                    angle += 45;
                    var point7 = new point_3.Point(Helpers.sin(angle) * radius, Helpers.cos(angle) * radius);
                    angle += 45;
                    var point8 = new point_3.Point(Helpers.sin(angle) * radius, Helpers.cos(angle) * radius);
                    angle += 45;
                    this.origPoints = [
                        point1, point2, point3, point4, point5, point6, point7, point8
                    ];
                    this.chargeParts = [
                        new ChargeParticle(point1.clone(), 0),
                        new ChargeParticle(point2.clone(), 3),
                        new ChargeParticle(point3.clone(), 0),
                        new ChargeParticle(point4.clone(), 1.5),
                        new ChargeParticle(point5.clone(), -1.5),
                        new ChargeParticle(point6.clone(), -3),
                        new ChargeParticle(point7.clone(), -1.5),
                        new ChargeParticle(point8.clone(), -1.5)
                    ];
                }
                ChargeEffect.prototype.stop = function () {
                    this.active = false;
                };
                ChargeEffect.prototype.update = function (centerPos, chargeLevel) {
                    this.active = true;
                    for (var i = 0; i < this.chargeParts.length; i++) {
                        var part = this.chargeParts[i];
                        if (part.time > 0) {
                            part.pos.x = Helpers.moveTo(part.pos.x, 0, game_5.game.deltaTime * 70);
                            part.pos.y = Helpers.moveTo(part.pos.y, 0, game_5.game.deltaTime * 70);
                        }
                        var chargePart = game_5.game.sprites["charge_part_" + String(chargeLevel)];
                        part.changeSprite(chargePart, true);
                        part.time += game_5.game.deltaTime * 20;
                        if (part.time > 3) {
                            part.time = -3;
                            part.pos.x = this.origPoints[i].x;
                            part.pos.y = this.origPoints[i].y;
                        }
                    }
                };
                ChargeEffect.prototype.render = function (centerPos, chargeLevel) {
                    for (var i = 0; i < this.chargeParts.length; i++) {
                        var part = this.chargeParts[i];
                        if (!this.active) {
                            part.sprite.pixiSprite.visible = false;
                        }
                        else if (part.time > 0) {
                            part.sprite.pixiSprite.visible = true;
                            part.sprite.draw(Math.round(part.time), centerPos.x + part.pos.x, centerPos.y + part.pos.y);
                        }
                        else {
                            part.sprite.pixiSprite.visible = false;
                        }
                    }
                };
                ChargeEffect.prototype.destroy = function () {
                    try {
                        for (var _a = __values(this.chargeParts), _b = _a.next(); !_b.done; _b = _a.next()) {
                            var chargePart = _b.value;
                            chargePart.destroySelf(undefined, undefined);
                        }
                    }
                    catch (e_2_1) { e_2 = { error: e_2_1 }; }
                    finally {
                        try {
                            if (_b && !_b.done && (_c = _a.return)) _c.call(_a);
                        }
                        finally { if (e_2) throw e_2.error; }
                    }
                    var e_2, _c;
                };
                return ChargeEffect;
            }());
            exports_9("ChargeEffect", ChargeEffect);
            DieEffectParticles = (function () {
                function DieEffectParticles(centerPos) {
                    this.time = 0;
                    this.ang = 0;
                    this.alpha = 1;
                    this.dieParts = [];
                    this.destroyed = false;
                    this.centerPos = centerPos;
                    for (var i = this.ang; i < this.ang + 360; i += 22.5) {
                        var x = this.centerPos.x + Helpers.cos(i) * this.time * 150;
                        var y = this.centerPos.y + Helpers.sin(i) * this.time * 150;
                        var diePart = new actor_4.Actor(game_5.game.sprites["die_particle"], new point_3.Point(centerPos.x, centerPos.y), true, game_5.game.level.foregroundContainer);
                        this.dieParts.push(diePart);
                    }
                }
                DieEffectParticles.prototype.render = function (offsetX, offsetY) {
                    var counter = 0;
                    for (var i = this.ang; i < this.ang + 360; i += 22.5) {
                        var diePart = this.dieParts[counter];
                        if (!diePart)
                            continue;
                        var x = this.centerPos.x + Helpers.cos(i) * this.time * 150;
                        var y = this.centerPos.y + Helpers.sin(i) * this.time * 150;
                        diePart.sprite.draw(Math.round(this.time * 20) % diePart.sprite.frames.length, x + offsetX, y + offsetY, 1, 1, undefined, this.alpha);
                        counter++;
                    }
                };
                DieEffectParticles.prototype.update = function () {
                    this.time += game_5.game.deltaTime;
                    this.alpha = Helpers.clamp01(1 - this.time * 0.5);
                    this.ang += game_5.game.deltaTime * 100;
                    if (this.alpha <= 0) {
                        this.destroy();
                    }
                };
                DieEffectParticles.prototype.destroy = function () {
                    try {
                        for (var _a = __values(this.dieParts), _b = _a.next(); !_b.done; _b = _a.next()) {
                            var diePart = _b.value;
                            diePart.destroySelf();
                        }
                    }
                    catch (e_3_1) { e_3 = { error: e_3_1 }; }
                    finally {
                        try {
                            if (_b && !_b.done && (_c = _a.return)) _c.call(_a);
                        }
                        finally { if (e_3) throw e_3.error; }
                    }
                    this.destroyed = true;
                    var e_3, _c;
                };
                return DieEffectParticles;
            }());
            exports_9("DieEffectParticles", DieEffectParticles);
            Effect = (function () {
                function Effect(pos) {
                    this.pos = pos;
                    game_5.game.level.addEffect(this);
                }
                Effect.prototype.update = function () {
                };
                Effect.prototype.render = function (offsetX, offsetY) {
                };
                Effect.prototype.destroySelf = function () {
                    _.remove(game_5.game.level.effects, this);
                };
                return Effect;
            }());
            exports_9("Effect", Effect);
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
                    var repeat = 1;
                    var repeatPeriod = 0.5;
                    this.timer += game_5.game.deltaTime;
                    if (this.timer > repeatPeriod) {
                        this.timer = 0;
                        this.repeatCount++;
                        if (this.repeatCount > repeat) {
                        }
                        else {
                            var dieEffect = new DieEffectParticles(this.pos);
                            this.dieEffects.push(dieEffect);
                        }
                    }
                    try {
                        for (var _a = __values(this.dieEffects), _b = _a.next(); !_b.done; _b = _a.next()) {
                            var dieEffect = _b.value;
                            if (!dieEffect.destroyed)
                                dieEffect.update();
                        }
                    }
                    catch (e_4_1) { e_4 = { error: e_4_1 }; }
                    finally {
                        try {
                            if (_b && !_b.done && (_c = _a.return)) _c.call(_a);
                        }
                        finally { if (e_4) throw e_4.error; }
                    }
                    if (this.dieEffects[0].destroyed)
                        this.destroySelf();
                    var e_4, _c;
                };
                DieEffect.prototype.render = function (offsetX, offsetY) {
                    try {
                        for (var _a = __values(this.dieEffects), _b = _a.next(); !_b.done; _b = _a.next()) {
                            var dieEffect = _b.value;
                            if (!dieEffect.destroyed)
                                dieEffect.render(offsetX, offsetY);
                        }
                    }
                    catch (e_5_1) { e_5 = { error: e_5_1 }; }
                    finally {
                        try {
                            if (_b && !_b.done && (_c = _a.return)) _c.call(_a);
                        }
                        finally { if (e_5) throw e_5.error; }
                    }
                    var e_5, _c;
                };
                return DieEffect;
            }(Effect));
            exports_9("DieEffect", DieEffect);
        }
    };
});
System.register("navMesh", ["wall"], function (exports_10, context_10) {
    "use strict";
    var __moduleName = context_10 && context_10.id;
    var wall_2, NavMeshNode, NavMeshNeighbor;
    return {
        setters: [
            function (wall_2_1) {
                wall_2 = wall_2_1;
            }
        ],
        execute: function () {
            NavMeshNode = (function () {
                function NavMeshNode(name, pos, neighborJson) {
                    this.neighbors = [];
                    this.name = name;
                    this.pos = pos;
                    this.neighborJson = neighborJson;
                }
                NavMeshNode.prototype.setNeighbors = function (nodeList, gameObjects) {
                    var properties = this.neighborJson;
                    var _loop_1 = function (jsonNeighbor) {
                        var node = _.find(nodeList, function (iterNode) {
                            return iterNode.name === jsonNeighbor.nodeName;
                        });
                        var ladder = _.find(gameObjects, function (gameobject) {
                            return (gameobject instanceof wall_2.Ladder) && gameobject.name === jsonNeighbor.ladderName;
                        });
                        var navMeshNeighbor = new NavMeshNeighbor(node, jsonNeighbor.isJumpNode ? true : false, jsonNeighbor.isDropNode ? true : false, ladder);
                        this_1.neighbors.push(navMeshNeighbor);
                    };
                    var this_1 = this;
                    try {
                        for (var _a = __values(properties.neighbors), _b = _a.next(); !_b.done; _b = _a.next()) {
                            var jsonNeighbor = _b.value;
                            _loop_1(jsonNeighbor);
                        }
                    }
                    catch (e_6_1) { e_6 = { error: e_6_1 }; }
                    finally {
                        try {
                            if (_b && !_b.done && (_c = _a.return)) _c.call(_a);
                        }
                        finally { if (e_6) throw e_6.error; }
                    }
                    var e_6, _c;
                };
                NavMeshNode.prototype.getNeighbor = function (neighborNode) {
                    var node = _.find(this.neighbors, function (neighbor) {
                        return neighbor.node === neighborNode;
                    });
                    return node;
                };
                NavMeshNode.prototype.getNextNode = function (destNode) {
                    if (this === destNode) {
                        return destNode;
                    }
                    var found = false;
                    var pathToNode = [];
                    var foundPath = [];
                    var visited = new Set();
                    function getNextNodeDfs(curNode) {
                        if (found)
                            return;
                        if (visited.has(curNode))
                            return;
                        visited.add(curNode);
                        if (!found && curNode === destNode) {
                            found = true;
                            foundPath = _.clone(pathToNode);
                            return;
                        }
                        try {
                            for (var _a = __values(curNode.neighbors), _b = _a.next(); !_b.done; _b = _a.next()) {
                                var neighbor = _b.value;
                                pathToNode.push(neighbor.node);
                                getNextNodeDfs(neighbor.node);
                                pathToNode.pop();
                            }
                        }
                        catch (e_7_1) { e_7 = { error: e_7_1 }; }
                        finally {
                            try {
                                if (_b && !_b.done && (_c = _a.return)) _c.call(_a);
                            }
                            finally { if (e_7) throw e_7.error; }
                        }
                        var e_7, _c;
                    }
                    getNextNodeDfs(this);
                    if (foundPath.length > 0)
                        return foundPath[0];
                    console.log("Dest node is " + destNode.name);
                    console.log("This node: " + this.name);
                    throw "Next node not found!";
                };
                return NavMeshNode;
            }());
            exports_10("NavMeshNode", NavMeshNode);
            NavMeshNeighbor = (function () {
                function NavMeshNeighbor(node, isJumpNode, isDropNode, ladder) {
                    this.node = node;
                    this.isJumpNode = isJumpNode;
                    this.isDropNode = isDropNode;
                    this.ladder = ladder;
                }
                return NavMeshNeighbor;
            }());
            exports_10("NavMeshNeighbor", NavMeshNeighbor);
        }
    };
});
System.register("ai", ["game", "projectile", "point", "helpers", "wall"], function (exports_11, context_11) {
    "use strict";
    var __moduleName = context_11 && context_11.id;
    var game_6, projectile_2, point_4, Helpers, wall_3, AI, AIState, MoveTowardsTarget, FindPlayer, MoveToPos, AimAtPlayer, InJumpZone, DashToPlayer, JumpToWall, ClimbWall, SlideDownWall;
    return {
        setters: [
            function (game_6_1) {
                game_6 = game_6_1;
            },
            function (projectile_2_1) {
                projectile_2 = projectile_2_1;
            },
            function (point_4_1) {
                point_4 = point_4_1;
            },
            function (Helpers_5) {
                Helpers = Helpers_5;
            },
            function (wall_3_1) {
                wall_3 = wall_3_1;
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
                    if (!game_6.game.level.gameObjects.has(this.target)) {
                        this.target = undefined;
                    }
                    this.target = game_6.game.level.getClosestTarget(this.character.pos, this.player.alliance);
                    if (!(this.aiState instanceof InJumpZone)) {
                        var jumpZones = game_6.game.level.getTriggerList(this.character, 0, 0, undefined, wall_3.JumpZone);
                        if (jumpZones.length > 0) {
                            var jumpZone = jumpZones[0].gameObject;
                            var jumpZoneDir = Helpers.randomRange(0, 1);
                            if (jumpZoneDir === 0)
                                jumpZoneDir = -1;
                            this.aiState = new InJumpZone(this.character, jumpZone, jumpZoneDir);
                        }
                    }
                    if (!(this.aiState instanceof InJumpZone)) {
                        if (!this.target) {
                            if (this.aiState.constructor.name !== "FindPlayer") {
                                this.aiState = new FindPlayer(this.character);
                            }
                        }
                        else {
                            if (this.aiState.constructor.name === "FindPlayer") {
                                this.aiState = new AimAtPlayer(this.character);
                            }
                        }
                        if (this.target) {
                            if (this.character.charState.constructor.name === "LadderClimb") {
                                this.player.press("jump");
                            }
                            var xDist = this.target.pos.x - this.character.pos.x;
                            if (Math.abs(xDist) > game_6.game.level.halfScreenWidth) {
                                this.aiState = new MoveTowardsTarget(this.character);
                            }
                        }
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
                            if (this.character.isFacing(this.target)) {
                                this.player.press("shoot");
                            }
                        }
                        this.shootTime += game_6.game.deltaTime;
                        if (this.shootTime > 0.1) {
                            this.shootTime = 0;
                        }
                    }
                    if (this.aiState.shouldDodge) {
                        try {
                            for (var _a = __values(game_6.game.level.gameObjects), _b = _a.next(); !_b.done; _b = _a.next()) {
                                var proj = _b.value;
                                if (proj instanceof projectile_2.Projectile && !(proj instanceof projectile_2.BusterProj)) {
                                    if (proj.isFacing(this.character) && this.character.withinX(proj, 100) && this.character.withinY(proj, 30) && proj.damager.owner.alliance !== this.player.alliance) {
                                        this.player.press("jump");
                                    }
                                }
                            }
                        }
                        catch (e_8_1) { e_8 = { error: e_8_1 }; }
                        finally {
                            try {
                                if (_b && !_b.done && (_c = _a.return)) _c.call(_a);
                            }
                            finally { if (e_8) throw e_8.error; }
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
                        if (Helpers.randomRange(0, 150) < 5) {
                            this.dashTime = Helpers.randomRange(0.2, 0.5);
                        }
                        if (this.dashTime > 0) {
                            this.player.press("dash");
                            this.dashTime -= game_6.game.deltaTime;
                            if (this.dashTime < 0)
                                this.dashTime = 0;
                        }
                    }
                    if (this.aiState.randomlyJump) {
                        if (Helpers.randomRange(0, 150) < 5) {
                            this.jumpTime = Helpers.randomRange(0.25, 0.75);
                        }
                        if (this.jumpTime > 0) {
                            this.player.press("jump");
                            this.jumpTime -= game_6.game.deltaTime;
                            if (this.jumpTime < 0)
                                this.jumpTime = 0;
                        }
                    }
                    if (this.aiState.randomlyChangeWeapon && !this.player.lockWeapon) {
                        this.weaponTime += game_6.game.deltaTime;
                        if (this.weaponTime > 5) {
                            this.weaponTime = 0;
                            this.character.changeWeapon(Helpers.randomRange(0, 8));
                        }
                    }
                    this.aiState.update();
                    var e_8, _c;
                };
                AI.prototype.changeState = function (newState) {
                    this.aiState = newState;
                };
                return AI;
            }());
            exports_11("AI", AI);
            AIState = (function () {
                function AIState(character) {
                    this.character = character;
                    this.shouldAttack = true;
                    this.facePlayer = true;
                    this.shouldDodge = true;
                    this.randomlyChangeState = true;
                    this.randomlyDash = true;
                    this.randomlyJump = true;
                    this.randomlyChangeWeapon = true;
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
            MoveTowardsTarget = (function (_super) {
                __extends(MoveTowardsTarget, _super);
                function MoveTowardsTarget(character) {
                    var _this = _super.call(this, character) || this;
                    _this.facePlayer = false;
                    _this.shouldAttack = false;
                    _this.shouldDodge = false;
                    _this.randomlyChangeState = false;
                    _this.randomlyDash = true;
                    _this.randomlyJump = false;
                    _this.randomlyChangeWeapon = false;
                    return _this;
                }
                MoveTowardsTarget.prototype.update = function () {
                    _super.prototype.update.call(this);
                    if (this.character.pos.x - this.ai.target.pos.x > game_6.game.level.halfScreenWidth) {
                        this.player.press("left");
                    }
                    else if (this.character.pos.x - this.ai.target.pos.x < -game_6.game.level.halfScreenWidth) {
                        this.player.press("right");
                    }
                    else {
                        this.ai.changeState(new AimAtPlayer(this.character));
                    }
                };
                return MoveTowardsTarget;
            }(AIState));
            FindPlayer = (function (_super) {
                __extends(FindPlayer, _super);
                function FindPlayer(character) {
                    var _this = _super.call(this, character) || this;
                    _this.facePlayer = false;
                    _this.shouldAttack = false;
                    _this.shouldDodge = false;
                    _this.randomlyChangeState = false;
                    _this.randomlyDash = true;
                    _this.randomlyJump = false;
                    _this.randomlyChangeWeapon = false;
                    _this.destNode = game_6.game.level.getRandomNode();
                    _this.nextNode = game_6.game.level.getClosestNodeInSight(_this.character.centerPos);
                    _this.prevNode = undefined;
                    return _this;
                }
                FindPlayer.prototype.update = function () {
                    _super.prototype.update.call(this);
                    if (!this.nextNode) {
                        this.ai.changeState(new FindPlayer(this.character));
                        return;
                    }
                    if (this.character.charState.constructor.name === "LadderClimb") {
                        this.player.press(this.ladderDir);
                        var dir = 1;
                        if (this.ladderDir === "up")
                            dir = -1;
                        if (this.character.sweepTest(new point_4.Point(0, dir * 5))) {
                            this.player.press("jump");
                            this.ai.changeState(new FindPlayer(this.character));
                        }
                        return;
                    }
                    if (this.character.pos.x - this.nextNode.pos.x > 5) {
                        this.player.press("left");
                    }
                    else if (this.character.pos.x - this.nextNode.pos.x < -5) {
                        this.player.press("right");
                    }
                    else {
                        if (Math.abs(this.character.pos.y - this.nextNode.pos.y) < 15) {
                            if (this.nextNode === this.destNode) {
                                this.ai.changeState(new FindPlayer(this.character));
                                return;
                            }
                            this.prevNode = this.nextNode;
                            this.nextNode = this.nextNode.getNextNode(this.destNode);
                        }
                        else {
                            if (!this.prevNode) {
                                return;
                            }
                            var neighbor = this.prevNode.getNeighbor(this.nextNode);
                            if (neighbor.isJumpNode) {
                                this.player.press("jump");
                                if (neighbor.ladder) {
                                    this.ladderDir = "up";
                                    this.player.press("up");
                                }
                            }
                            else if (neighbor.isDropNode) {
                                if (neighbor.ladder) {
                                    this.ladderDir = "down";
                                    this.player.press("down");
                                }
                            }
                            else if (neighbor.ladder) {
                                this.ladderDir = "up";
                                this.player.press("up");
                            }
                        }
                    }
                };
                return FindPlayer;
            }(AIState));
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
                    var dir = 0;
                    if (this.character.pos.x - this.dest.x > 5) {
                        dir = -1;
                        this.player.press("left");
                    }
                    else if (this.character.pos.x - this.dest.x < -5) {
                        dir = 1;
                        this.player.press("right");
                    }
                    else {
                        this.ai.changeState(new AimAtPlayer(this.character));
                    }
                    if (this.character.sweepTest(new point_4.Point(dir * 5, 0))) {
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
                        this.jumpDelay += game_6.game.deltaTime;
                        if (this.jumpDelay > 0.3) {
                            this.player.press("jump");
                        }
                    }
                    else {
                    }
                };
                return AimAtPlayer;
            }(AIState));
            InJumpZone = (function (_super) {
                __extends(InJumpZone, _super);
                function InJumpZone(character, jumpZone, jumpZoneDir) {
                    var _this = _super.call(this, character) || this;
                    _this.jumpZone = jumpZone;
                    _this.jumpZoneDir = jumpZoneDir;
                    _this.facePlayer = false;
                    _this.shouldAttack = false;
                    _this.shouldDodge = false;
                    _this.randomlyChangeState = false;
                    _this.randomlyDash = true;
                    _this.randomlyJump = false;
                    _this.randomlyChangeWeapon = false;
                    return _this;
                }
                InJumpZone.prototype.update = function () {
                    _super.prototype.update.call(this);
                    this.player.press("jump");
                    if (this.jumpZoneDir === -1) {
                        this.player.press("left");
                    }
                    else if (this.jumpZoneDir === 1) {
                        this.player.press("right");
                    }
                    if (this.character && this.character.collider) {
                        if (!this.character.collider.isCollidingWith(this.jumpZone.collider)) {
                            this.ai.changeState(new FindPlayer(this.character));
                        }
                    }
                };
                return InJumpZone;
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
System.register("killFeedEntry", [], function (exports_12, context_12) {
    "use strict";
    var __moduleName = context_12 && context_12.id;
    var KillFeedEntry;
    return {
        setters: [],
        execute: function () {
            KillFeedEntry = (function () {
                function KillFeedEntry(killer, victim, weapon) {
                    this.time = 0;
                    this.killer = killer;
                    this.victim = victim;
                    this.weapon = weapon;
                }
                return KillFeedEntry;
            }());
            exports_12("KillFeedEntry", KillFeedEntry);
        }
    };
});
System.register("api", ["game"], function (exports_13, context_13) {
    "use strict";
    var __moduleName = context_13 && context_13.id;
    function getUrl() {
        if (game_7.game.uiData.isProd)
            return game_7.game.prodApiUrl;
        return game_7.game.devApiUrl;
    }
    function logEvent(label, content) {
        try {
            if (localStorage.getItem("noLog") === "true") {
                console.log("NOT LOGGING");
                return;
            }
            if (!game_7.game.uiData.logInDev && !game_7.game.uiData.isProd) {
                return;
            }
            var userAgent = navigator.userAgent;
            var event_1 = {
                UserAgent: userAgent,
                Label: label,
                Content: content
            };
            $.ajax({
                url: getUrl() + "/create",
                type: 'post',
                dataType: 'json',
                contentType: 'application/json',
                success: function (data) {
                    if (!game_7.game.uiData.isProd)
                        console.log(data);
                },
                data: JSON.stringify(event_1)
            });
        }
        catch (_a) { }
    }
    exports_13("logEvent", logEvent);
    var game_7;
    return {
        setters: [
            function (game_7_1) {
                game_7 = game_7_1;
            }
        ],
        execute: function () {
        }
    };
});
System.register("gameMode", ["game", "player", "helpers", "rect", "api"], function (exports_14, context_14) {
    "use strict";
    var __moduleName = context_14 && context_14.id;
    var game_8, player_1, Helpers, rect_2, API, GameMode, Brawl, FFADeathMatch, TeamDeathMatch;
    return {
        setters: [
            function (game_8_1) {
                game_8 = game_8_1;
            },
            function (player_1_1) {
                player_1 = player_1_1;
            },
            function (Helpers_6) {
                Helpers = Helpers_6;
            },
            function (rect_2_1) {
                rect_2 = rect_2_1;
            },
            function (API_1) {
                API = API_1;
            }
        ],
        execute: function () {
            GameMode = (function () {
                function GameMode(level) {
                    this.isOver = false;
                    this.isTeamMode = false;
                    this.overTime = 0;
                    this.localPlayers = [];
                    this.players = [];
                    this.killFeed = [];
                    this.isBrawl = false;
                    this.weaponHUDSprites = [];
                    this.weaponHUDLabels = [];
                    this.level = level;
                }
                Object.defineProperty(GameMode.prototype, "screenWidth", {
                    get: function () { return this.level.screenWidth; },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(GameMode.prototype, "screenHeight", {
                    get: function () { return this.level.screenHeight; },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(GameMode.prototype, "zoomScale", {
                    get: function () { return this.level.zoomScale; },
                    enumerable: true,
                    configurable: true
                });
                GameMode.prototype.setupPlayers = function () {
                    var _this = this;
                    document.onkeydown = function (e) {
                        try {
                            for (var _a = __values(_this.localPlayers), _b = _a.next(); !_b.done; _b = _a.next()) {
                                var player = _b.value;
                                player.onKeyDown(e.keyCode);
                            }
                        }
                        catch (e_9_1) { e_9 = { error: e_9_1 }; }
                        finally {
                            try {
                                if (_b && !_b.done && (_c = _a.return)) _c.call(_a);
                            }
                            finally { if (e_9) throw e_9.error; }
                        }
                        if (e.keyCode === 9 || (e.keyCode >= 112 && e.keyCode <= 121)) {
                            e.preventDefault();
                        }
                        var e_9, _c;
                    };
                    document.onkeyup = function (e) {
                        try {
                            for (var _a = __values(_this.localPlayers), _b = _a.next(); !_b.done; _b = _a.next()) {
                                var player = _b.value;
                                player.onKeyUp(e.keyCode);
                            }
                        }
                        catch (e_10_1) { e_10 = { error: e_10_1 }; }
                        finally {
                            try {
                                if (_b && !_b.done && (_c = _a.return)) _c.call(_a);
                            }
                            finally { if (e_10) throw e_10.error; }
                        }
                        if (e.keyCode === 9 || (e.keyCode >= 112 && e.keyCode <= 124)) {
                            e.preventDefault();
                        }
                        var e_10, _c;
                    };
                    game_8.game.uiCanvas.onmousedown = function (e) {
                        try {
                            for (var _a = __values(_this.localPlayers), _b = _a.next(); !_b.done; _b = _a.next()) {
                                var player = _b.value;
                                player.onKeyDown(e.button);
                            }
                        }
                        catch (e_11_1) { e_11 = { error: e_11_1 }; }
                        finally {
                            try {
                                if (_b && !_b.done && (_c = _a.return)) _c.call(_a);
                            }
                            finally { if (e_11) throw e_11.error; }
                        }
                        e.preventDefault();
                        var e_11, _c;
                    };
                    game_8.game.uiCanvas.oncontextmenu = function (e) {
                        e.preventDefault();
                    };
                    game_8.game.uiCanvas.onmouseup = function (e) {
                        try {
                            for (var _a = __values(_this.localPlayers), _b = _a.next(); !_b.done; _b = _a.next()) {
                                var player = _b.value;
                                player.onKeyUp(e.button);
                            }
                        }
                        catch (e_12_1) { e_12 = { error: e_12_1 }; }
                        finally {
                            try {
                                if (_b && !_b.done && (_c = _a.return)) _c.call(_a);
                            }
                            finally { if (e_12) throw e_12.error; }
                        }
                        e.preventDefault();
                        var e_12, _c;
                    };
                    document.onwheel = function (e) {
                        if (e.deltaY < 0) {
                            try {
                                for (var _a = __values(_this.localPlayers), _b = _a.next(); !_b.done; _b = _a.next()) {
                                    var player = _b.value;
                                    console.log("MOUSEHWEELUP");
                                    player.onKeyDown(3);
                                }
                            }
                            catch (e_13_1) { e_13 = { error: e_13_1 }; }
                            finally {
                                try {
                                    if (_b && !_b.done && (_c = _a.return)) _c.call(_a);
                                }
                                finally { if (e_13) throw e_13.error; }
                            }
                        }
                        else if (e.deltaY > 0) {
                            try {
                                for (var _d = __values(_this.localPlayers), _e = _d.next(); !_e.done; _e = _d.next()) {
                                    var player = _e.value;
                                    console.log("MOUSEHWEELDOWN");
                                    player.onKeyDown(4);
                                }
                            }
                            catch (e_14_1) { e_14 = { error: e_14_1 }; }
                            finally {
                                try {
                                    if (_e && !_e.done && (_f = _d.return)) _f.call(_d);
                                }
                                finally { if (e_14) throw e_14.error; }
                            }
                        }
                        var e_13, _c, e_14, _f;
                    };
                };
                GameMode.prototype.destroy = function () {
                    document.onkeydown = undefined;
                    document.onkeyup = undefined;
                    game_8.game.uiCanvas.onmousedown = undefined;
                    game_8.game.uiCanvas.onmouseup = undefined;
                    document.onwheel = undefined;
                };
                GameMode.prototype.update = function () {
                    var removed = false;
                    for (var i = this.killFeed.length - 1; i >= 0; i--) {
                        var killFeed = this.killFeed[i];
                        killFeed.time += game_8.game.deltaTime;
                        if (killFeed.time > 8) {
                            _.remove(this.killFeed, killFeed);
                            removed = true;
                        }
                    }
                    if (removed) {
                        this.drawKillFeed();
                    }
                    this.players.sort(function (a, b) {
                        if (a.kills > b.kills)
                            return -1;
                        else if (a.kills === b.kills) {
                            if (a.deaths < b.deaths)
                                return -1;
                            if (a.deaths === b.deaths)
                                return 0;
                            if (a.deaths > b.deaths)
                                return 1;
                        }
                        else {
                            return 1;
                        }
                    });
                };
                GameMode.prototype.createHUD = function () {
                    if (!this.isBrawl) {
                        this.createWeaponSwitchHUD();
                    }
                    this.createTopHUD();
                    this.killFeedContainer = new PIXI.Container();
                    game_8.game.level.uiContainer.addChild(this.killFeedContainer);
                    this.createWinScreenHUD();
                    this.createScoreboardHUD();
                };
                GameMode.prototype.createScoreboardHUD = function () {
                };
                GameMode.prototype.createWinScreenHUD = function () {
                    this.winScreenContainer = new PIXI.Container();
                    this.winScreenTitle = Helpers.createAndDrawText(this.winScreenContainer, "", this.screenWidth / 2, this.screenHeight / 2, 24, "center", "middle");
                    this.winScreenSubtitle = Helpers.createAndDrawText(this.winScreenContainer, "", this.screenWidth / 2, (this.screenHeight / 2) + 30, 12, "center", "top");
                    game_8.game.level.uiContainer.addChild(this.winScreenContainer);
                    this.winScreenContainer.visible = false;
                };
                GameMode.prototype.drawHUD = function () {
                    if (this.isOver) {
                        this.drawWinScreen();
                    }
                };
                GameMode.prototype.checkIfWin = function () {
                };
                GameMode.prototype.getWinner = function () {
                    return _.find(this.players, function (player) {
                        return player.won;
                    });
                };
                GameMode.prototype.drawWinScreen = function () {
                };
                GameMode.prototype.createWeaponSwitchHUD = function () {
                    this.weaponHUDContainer = new PIXI.Container();
                    game_8.game.level.uiContainer.addChild(this.weaponHUDContainer);
                    var startX = Math.round(this.screenWidth * 0.225);
                    var width = 20;
                    var iconW = 9;
                    var iconH = 9;
                    var startY = this.screenHeight - 18;
                    for (var i = 0; i < 9; i++) {
                        var x = startX + (i * width);
                        var y = startY;
                        var sprite = game_8.game.sprites["hud_weapon_icon"].createAndDraw(this.weaponHUDContainer, i, x, y);
                        this.weaponHUDSprites.push(sprite);
                        var text = Helpers.createAndDrawText(this.weaponHUDContainer, String(i + 1), x, y + 8, 6, "", "top");
                    }
                    this.selectedWeaponRect = Helpers.createAndDrawRect(this.weaponHUDContainer, new rect_2.Rect(0, 0, iconW * 2, iconH * 2), undefined, 0x90EE90, 1);
                };
                GameMode.prototype.drawWeaponSwitchHUD = function () {
                    this.weaponHUDContainer.visible = game_8.game.options.showWeaponHUD;
                    var startX = Math.round(this.screenWidth * 0.225);
                    var width = 20;
                    var iconW = 9;
                    var iconH = 9;
                    var startY = this.screenHeight - 18;
                    for (var i = 0; i < 9; i++) {
                        var x = startX + (i * width);
                        var y = startY;
                        if (this.mainPlayer.weaponIndex === i) {
                            this.selectedWeaponRect.x = x - iconW;
                            this.selectedWeaponRect.y = y - iconH;
                        }
                    }
                };
                GameMode.prototype.addKillFeedEntry = function (killFeed) {
                    this.killFeed.unshift(killFeed);
                    if (this.killFeed.length > 4)
                        this.killFeed.pop();
                    this.drawKillFeed();
                };
                GameMode.prototype.createTopHUD = function () {
                    this.topText = Helpers.createAndDrawText(game_8.game.level.uiContainer, "", 5, 5, 8, "left", "top");
                    this.botText = Helpers.createAndDrawText(game_8.game.level.uiContainer, "", 5, 15, 8, "left", "top");
                };
                GameMode.prototype.drawTopHUD = function () {
                    var placeStr = "";
                    var place = this.players.indexOf(this.mainPlayer) + 1;
                    if (place === 1)
                        placeStr = "1st";
                    else if (place === 2)
                        placeStr = "2nd";
                    else if (place === 3)
                        placeStr = "3rd";
                    else
                        placeStr = String(place) + "th";
                    this.topText.text = "Leader: " + String(this.currentWinner.kills);
                    this.botText.text = "Kills: " + String(this.mainPlayer.kills) + "(" + placeStr + ")";
                };
                Object.defineProperty(GameMode.prototype, "currentWinner", {
                    get: function () {
                        return this.players[0];
                    },
                    enumerable: true,
                    configurable: true
                });
                GameMode.prototype.drawKillFeed = function () {
                    for (var i = this.killFeedContainer.children.length - 1; i >= 0; i--) {
                        var child = this.killFeedContainer.children[i];
                        this.killFeedContainer.removeChild(child);
                        child.destroy();
                    }
                    ;
                    var fromRight = this.screenWidth - 10;
                    var fromTop = 10;
                    var yDist = 12;
                    for (var i_1 = 0; i_1 < this.killFeed.length; i_1++) {
                        var killFeed = this.killFeed[i_1];
                        var msg = "";
                        if (killFeed.killer) {
                            msg = killFeed.killer.name + "    " + killFeed.victim.name;
                        }
                        else {
                            msg = killFeed.victim.name + " died";
                        }
                        game_8.game.uiCtx.font = "6px mmx_font";
                        if (killFeed.killer === this.mainPlayer || killFeed.victim == this.mainPlayer) {
                            var msgLen = game_8.game.uiCtx.measureText(msg).width;
                            var msgHeight = 10;
                            Helpers.createAndDrawRect(this.killFeedContainer, new rect_2.Rect(fromRight - msgLen - 2, fromTop - 2 + (i_1 * yDist) - msgHeight / 2, fromRight + 2, fromTop - 2 + msgHeight / 2 + (i_1 * yDist)), 0x000000, 0xFFFFFF, 1, 0.75);
                        }
                        var isKillerRed = killFeed.killer && killFeed.killer.alliance === 1 && this.isTeamMode;
                        var isVictimRed = killFeed.victim.alliance === 1 && this.isTeamMode;
                        if (killFeed.killer) {
                            var nameLen = game_8.game.uiCtx.measureText(killFeed.victim.name).width;
                            Helpers.createAndDrawText(this.killFeedContainer, killFeed.victim.name, fromRight, fromTop + (i_1 * yDist) - 5, 6, "right", "top", isVictimRed);
                            var victimNameWidth = game_8.game.uiCtx.measureText(killFeed.victim.name).width;
                            Helpers.createAndDrawText(this.killFeedContainer, killFeed.killer.name + "    ", fromRight - victimNameWidth, fromTop + (i_1 * yDist) - 5, 6, "right", "top", isKillerRed);
                            var weaponIndex = killFeed.weapon.index;
                            game_8.game.sprites["hud_killfeed_weapon"].createAndDraw(this.killFeedContainer, weaponIndex, fromRight - nameLen - 13, fromTop + (i_1 * yDist) - 2, undefined, undefined, undefined, undefined, undefined);
                        }
                        else {
                            Helpers.createAndDrawText(this.killFeedContainer, msg, fromRight, fromTop + (i_1 * yDist) - 5, 6, "right", "top", isVictimRed);
                        }
                    }
                };
                GameMode.prototype.restart = function () {
                    API.logEvent("endGame", this.level.mainPlayer.won ? "win" : "lose");
                    game_8.game.restartLevel(this.level.levelData.name);
                };
                return GameMode;
            }());
            exports_14("GameMode", GameMode);
            Brawl = (function (_super) {
                __extends(Brawl, _super);
                function Brawl(level, uiData) {
                    var _this = _super.call(this, level) || this;
                    _this.isBrawl = true;
                    var health = 32;
                    var p1Name = uiData.isPlayer1CPU ? "CPU 1" : "Player 1";
                    var p2Name = uiData.isPlayer2CPU ? "CPU" : "Player";
                    if (p1Name.includes(p2Name)) {
                        p2Name += " 2";
                    }
                    else {
                        p2Name += " 1";
                    }
                    var player1 = new player_1.Player(p1Name, uiData.isPlayer1CPU, 0, health);
                    var player2 = new player_1.Player(p2Name, uiData.isPlayer2CPU, 1, health, game_8.game.palettes["red"]);
                    _this.players.push(player1);
                    _this.localPlayers.push(player1);
                    _this.mainPlayer = player1;
                    _this.players.push(player2);
                    _this.localPlayers.push(player2);
                    _this.setupPlayers();
                    return _this;
                }
                Brawl.prototype.drawHUD = function () {
                    _super.prototype.drawHUD.call(this);
                };
                Brawl.prototype.drawWinScreen = function () {
                    var winner = this.getWinner();
                    if (winner) {
                        this.winScreenTitle.style.fontSize = 42;
                        this.winScreenContainer.visible = true;
                        this.winScreenTitle.text = winner.name + " wins!";
                    }
                };
                Brawl.prototype.checkIfWin = function () {
                    if (!this.isOver) {
                        var deadPlayer = _.find(this.level.players, function (player) {
                            return !player.character;
                        });
                        if (deadPlayer) {
                            try {
                                for (var _a = __values(this.level.players), _b = _a.next(); !_b.done; _b = _a.next()) {
                                    var player = _b.value;
                                    if (player.character) {
                                        this.isOver = true;
                                        player.won = true;
                                    }
                                }
                            }
                            catch (e_15_1) { e_15 = { error: e_15_1 }; }
                            finally {
                                try {
                                    if (_b && !_b.done && (_c = _a.return)) _c.call(_a);
                                }
                                finally { if (e_15) throw e_15.error; }
                            }
                        }
                        if (this.isOver) {
                            if (game_8.game.music) {
                                game_8.game.music.stop();
                            }
                            game_8.game.music = new Howl({
                                src: [game_8.game.path.winMusic],
                            });
                            game_8.game.music.play();
                        }
                    }
                    else {
                        this.overTime += game_8.game.deltaTime;
                        if (this.overTime > 10) {
                            this.restart();
                        }
                    }
                    var e_15, _c;
                };
                return Brawl;
            }(GameMode));
            exports_14("Brawl", Brawl);
            FFADeathMatch = (function (_super) {
                __extends(FFADeathMatch, _super);
                function FFADeathMatch(level, uiData) {
                    var _this = _super.call(this, level) || this;
                    _this.killsToWin = 20;
                    _this.scoreboardTexts = [];
                    _this.scoreboardRowCount = 12;
                    _this.killsToWin = uiData.playTo;
                    var health = 16;
                    var player1 = new player_1.Player(game_8.game.uiData.playerName, false, 0, health);
                    _this.players.push(player1);
                    _this.localPlayers.push(player1);
                    _this.mainPlayer = player1;
                    for (var i = 0; i < uiData.numBots; i++) {
                        var cpu = new player_1.Player("CPU" + String(i + 1), true, i + 1, health, game_8.game.palettes["red"]);
                        _this.players.push(cpu);
                        _this.localPlayers.push(cpu);
                    }
                    _this.setupPlayers();
                    return _this;
                }
                FFADeathMatch.prototype.drawHUD = function () {
                    _super.prototype.drawHUD.call(this);
                    this.drawTopHUD();
                    this.drawWeaponSwitchHUD();
                    this.drawScoreboard();
                };
                FFADeathMatch.prototype.drawWinScreen = function () {
                    this.winScreenContainer.visible = true;
                    if (this.mainPlayer.won) {
                        this.winScreenTitle.text = "You won!";
                    }
                    else {
                        this.winScreenTitle.text = "You lost!";
                        var winner = _.find(this.players, function (player) {
                            return player.won;
                        });
                        this.winScreenSubtitle.text = winner.name + " wins";
                    }
                };
                FFADeathMatch.prototype.createScoreboardHUD = function () {
                    this.scoreboardContainer = new PIXI.Container();
                    game_8.game.level.uiContainer.addChild(this.scoreboardContainer);
                    var padding = 10;
                    var top = padding + 2;
                    var fontSize = 8;
                    var col1x = padding + 10;
                    var col2x = this.screenWidth * 0.5;
                    var col3x = this.screenWidth * 0.75;
                    var lineY = padding + 35;
                    var labelY = lineY - 1;
                    var labelTextY = labelY + 3;
                    var line2Y = labelY + 12;
                    var topPlayerY = line2Y + 2;
                    Helpers.createAndDrawRect(this.scoreboardContainer, new rect_2.Rect(padding, padding, this.screenWidth - padding, this.screenHeight - padding), 0x000000, undefined, undefined, 0.75);
                    Helpers.createAndDrawText(this.scoreboardContainer, "Game Mode: FFA Deathmatch", padding + 10, top, fontSize, "left", "top", undefined, "white");
                    Helpers.createAndDrawText(this.scoreboardContainer, "Map: " + this.level.levelData.name, padding + 10, top + 10, fontSize, "left", "top", undefined, "white");
                    Helpers.createAndDrawText(this.scoreboardContainer, "Playing to: " + String(this.killsToWin), padding + 10, top + 20, fontSize, "left", "top", undefined, "white");
                    Helpers.createAndDrawLine(this.scoreboardContainer, padding + 10, lineY, this.screenWidth - padding - 10, lineY, 0xFFFFFF, 1);
                    Helpers.createAndDrawText(this.scoreboardContainer, "Player", col1x, labelTextY, fontSize, "left", "top", undefined, "white");
                    Helpers.createAndDrawText(this.scoreboardContainer, "Kills", col2x, labelTextY, fontSize, "left", "top", undefined, "white");
                    Helpers.createAndDrawText(this.scoreboardContainer, "Deaths", col3x, labelTextY, fontSize, "left", "top", undefined, "white");
                    Helpers.createAndDrawLine(this.scoreboardContainer, padding + 10, line2Y, this.screenWidth - padding - 10, line2Y, 0xFFFFFF, 1);
                    var rowH = 10;
                    for (var i = 0; i < this.scoreboardRowCount; i++) {
                        var text1 = Helpers.createAndDrawText(this.scoreboardContainer, "", col1x, topPlayerY + (i) * rowH, fontSize, "left", "top", undefined, "white");
                        var text2 = Helpers.createAndDrawText(this.scoreboardContainer, "", col2x, topPlayerY + (i) * rowH, fontSize, "left", "top", undefined, "white");
                        var text3 = Helpers.createAndDrawText(this.scoreboardContainer, "", col3x, topPlayerY + (i) * rowH, fontSize, "left", "top", undefined, "white");
                        this.scoreboardTexts.push([text1, text2, text3]);
                    }
                    this.scoreboardContainer.visible = false;
                };
                FFADeathMatch.prototype.drawScoreboard = function () {
                    if (!this.mainPlayer) {
                        this.scoreboardContainer.visible = false;
                        return;
                    }
                    if (!this.mainPlayer.isHeld("scoreboard", false)) {
                        this.scoreboardContainer.visible = false;
                        return;
                    }
                    this.scoreboardContainer.visible = true;
                    for (var i = 0; i < this.scoreboardRowCount; i++) {
                        var row = this.scoreboardTexts[i];
                        if (i < this.players.length) {
                            var player = this.players[i];
                            var color = (player === this.mainPlayer) ? "lightgreen" : "white";
                            try {
                                for (var row_1 = __values(row), row_1_1 = row_1.next(); !row_1_1.done; row_1_1 = row_1.next()) {
                                    var text = row_1_1.value;
                                    text.visible = true;
                                    text.style.fill = color;
                                }
                            }
                            catch (e_16_1) { e_16 = { error: e_16_1 }; }
                            finally {
                                try {
                                    if (row_1_1 && !row_1_1.done && (_a = row_1.return)) _a.call(row_1);
                                }
                                finally { if (e_16) throw e_16.error; }
                            }
                            row[0].text = player.name;
                            row[1].text = String(player.kills);
                            row[2].text = String(player.deaths);
                        }
                        else {
                            row[0].visible = false;
                            row[1].visible = false;
                            row[2].visible = false;
                        }
                    }
                    var e_16, _a;
                };
                FFADeathMatch.prototype.checkIfWin = function () {
                    if (!this.isOver) {
                        try {
                            for (var _a = __values(this.level.players), _b = _a.next(); !_b.done; _b = _a.next()) {
                                var player = _b.value;
                                if (player.kills >= this.killsToWin) {
                                    this.isOver = true;
                                    player.won = true;
                                }
                            }
                        }
                        catch (e_17_1) { e_17 = { error: e_17_1 }; }
                        finally {
                            try {
                                if (_b && !_b.done && (_c = _a.return)) _c.call(_a);
                            }
                            finally { if (e_17) throw e_17.error; }
                        }
                        if (this.isOver) {
                            if (game_8.game.music) {
                                game_8.game.music.stop();
                            }
                            if (this.level.mainPlayer && this.level.mainPlayer.won) {
                                game_8.game.music = new Howl({
                                    src: [game_8.game.path.winMusic],
                                });
                                game_8.game.music.play();
                            }
                            else if (this.level.mainPlayer && !this.level.mainPlayer.won) {
                                game_8.game.music = new Howl({
                                    src: [game_8.game.path.loseMusic],
                                });
                                game_8.game.music.play();
                            }
                        }
                    }
                    else {
                        this.overTime += game_8.game.deltaTime;
                        if (this.overTime > 10) {
                            this.restart();
                        }
                    }
                    var e_17, _c;
                };
                return FFADeathMatch;
            }(GameMode));
            exports_14("FFADeathMatch", FFADeathMatch);
            TeamDeathMatch = (function (_super) {
                __extends(TeamDeathMatch, _super);
                function TeamDeathMatch(level, uiData) {
                    var _this = _super.call(this, level) || this;
                    _this.killsToWin = 50;
                    _this.blueScoreboardTexts = [];
                    _this.redScoreboardTexts = [];
                    _this.scoreboardRowCount = 12;
                    _this.isTeamMode = true;
                    _this.killsToWin = uiData.playTo;
                    var health = 16;
                    var player1 = new player_1.Player(game_8.game.uiData.playerName, false, 0, health);
                    _this.players.push(player1);
                    _this.localPlayers.push(player1);
                    _this.mainPlayer = player1;
                    for (var i = 0; i < uiData.numBots; i++) {
                        var alliance = (i + 1) % 2;
                        var cpu = new player_1.Player("CPU" + String(i + 1), true, alliance, health, alliance === 0 ? undefined : game_8.game.palettes["red"]);
                        _this.players.push(cpu);
                        _this.localPlayers.push(cpu);
                    }
                    _this.setupPlayers();
                    return _this;
                }
                TeamDeathMatch.prototype.drawHUD = function () {
                    _super.prototype.drawHUD.call(this);
                    this.drawTopHUD();
                    this.drawWeaponSwitchHUD();
                    this.drawScoreboard();
                };
                TeamDeathMatch.prototype.drawTopHUD = function () {
                    var blueKills = 0;
                    var redKills = 0;
                    try {
                        for (var _a = __values(this.level.players), _b = _a.next(); !_b.done; _b = _a.next()) {
                            var player = _b.value;
                            if (player.alliance === 0)
                                blueKills += player.kills;
                            else
                                redKills += player.kills;
                        }
                    }
                    catch (e_18_1) { e_18 = { error: e_18_1 }; }
                    finally {
                        try {
                            if (_b && !_b.done && (_c = _a.return)) _c.call(_a);
                        }
                        finally { if (e_18) throw e_18.error; }
                    }
                    if (redKills > blueKills) {
                        this.topText.text = "Red: " + String(redKills);
                        this.botText.text = "Blue: " + String(blueKills);
                        Helpers.setTextGradient(this.topText, true);
                        Helpers.setTextGradient(this.botText, false);
                    }
                    else {
                        this.botText.text = "Red: " + String(redKills);
                        this.topText.text = "Blue: " + String(blueKills);
                        Helpers.setTextGradient(this.botText, true);
                        Helpers.setTextGradient(this.topText, false);
                    }
                    var e_18, _c;
                };
                TeamDeathMatch.prototype.drawWinScreen = function () {
                    var team;
                    if (this.mainPlayer.won) {
                        team = this.mainPlayer.alliance === 0 ? "Blue" : "Red";
                    }
                    else {
                        team = this.mainPlayer.alliance === 0 ? "Red" : "Blue";
                    }
                    this.winScreenTitle.text = team + " team won!";
                    this.winScreenTitle.style.fontSize = 48;
                    this.winScreenContainer.visible = true;
                };
                TeamDeathMatch.prototype.createScoreboardHUD = function () {
                    this.scoreboardContainer = new PIXI.Container();
                    game_8.game.level.uiContainer.addChild(this.scoreboardContainer);
                    var padding = 10;
                    var hPadding = padding + 5;
                    var fontSize = 8;
                    var col1x = padding + 5;
                    var col2x = this.screenWidth * 0.3;
                    var col3x = this.screenWidth * 0.4;
                    var teamLabelY = padding + 40;
                    var lineY = teamLabelY + 10;
                    var labelY = lineY + 5;
                    var line2Y = labelY + 10;
                    var topPlayerY = line2Y + 5;
                    Helpers.createAndDrawRect(this.scoreboardContainer, new rect_2.Rect(padding, padding, this.screenWidth - padding, this.screenHeight - padding), 0x000000, undefined, undefined, 0.75);
                    Helpers.createAndDrawText(this.scoreboardContainer, "Game Mode: Team Deathmatch", hPadding, padding + 10 - 5, fontSize, "left", "top", false, "white");
                    Helpers.createAndDrawText(this.scoreboardContainer, "Map: " + this.level.levelData.name, hPadding, padding + 20 - 5, fontSize, "left", "top", false, "white");
                    Helpers.createAndDrawText(this.scoreboardContainer, "Playing to: " + String(this.killsToWin), hPadding, padding + 30 - 5, fontSize, "left", "top", false, "white");
                    Helpers.createAndDrawLine(this.scoreboardContainer, hPadding, lineY, this.screenWidth - hPadding, lineY, 0xFFFFFF, 1);
                    this.blueScoreText = Helpers.createAndDrawText(this.scoreboardContainer, "Blue: ", col1x, teamLabelY, fontSize, "left", "top");
                    Helpers.createAndDrawText(this.scoreboardContainer, "Player", col1x, labelY, fontSize, "left", "top", false, "white");
                    Helpers.createAndDrawText(this.scoreboardContainer, "K", col2x, labelY, fontSize, "left", "top", false, "white");
                    Helpers.createAndDrawText(this.scoreboardContainer, "D", col3x, labelY, fontSize, "left", "top", false, "white");
                    this.redScoreText = Helpers.createAndDrawText(this.scoreboardContainer, "Red: ", this.screenWidth * 0.5 + col1x, teamLabelY, fontSize, "left", "top", true);
                    Helpers.createAndDrawText(this.scoreboardContainer, "Player", this.screenWidth * 0.5 + col1x, labelY, fontSize, "left", "top", false, "white");
                    Helpers.createAndDrawText(this.scoreboardContainer, "K", this.screenWidth * 0.5 + col2x, labelY, fontSize, "left", "top", false, "white");
                    Helpers.createAndDrawText(this.scoreboardContainer, "D", this.screenWidth * 0.5 + col3x, labelY, fontSize, "left", "top", false, "white");
                    Helpers.createAndDrawLine(this.scoreboardContainer, hPadding, line2Y, this.screenWidth - hPadding, line2Y, 0xFFFFFF, 1);
                    var rowH = 10;
                    for (var i = 0; i < this.scoreboardRowCount; i++) {
                        var text1 = Helpers.createAndDrawText(this.scoreboardContainer, "", col1x, topPlayerY + (i) * rowH, fontSize, "left", "top", false, "blue");
                        var text2 = Helpers.createAndDrawText(this.scoreboardContainer, "", col2x, topPlayerY + (i) * rowH, fontSize, "left", "top", false, "blue");
                        var text3 = Helpers.createAndDrawText(this.scoreboardContainer, "", col3x, topPlayerY + (i) * rowH, fontSize, "left", "top", false, "blue");
                        this.blueScoreboardTexts.push([text1, text2, text3]);
                    }
                    for (var i = 0; i < this.scoreboardRowCount; i++) {
                        var text1 = Helpers.createAndDrawText(this.scoreboardContainer, "", this.screenWidth * 0.5 + col1x, topPlayerY + (i) * rowH, fontSize, "left", "top", true, "red");
                        var text2 = Helpers.createAndDrawText(this.scoreboardContainer, "", this.screenWidth * 0.5 + col2x, topPlayerY + (i) * rowH, fontSize, "left", "top", true, "red");
                        var text3 = Helpers.createAndDrawText(this.scoreboardContainer, "", this.screenWidth * 0.5 + col3x, topPlayerY + (i) * rowH, fontSize, "left", "top", true, "red");
                        this.redScoreboardTexts.push([text1, text2, text3]);
                    }
                    this.scoreboardContainer.visible = false;
                };
                TeamDeathMatch.prototype.drawScoreboard = function () {
                    if (!this.mainPlayer) {
                        this.scoreboardContainer.visible = false;
                        return;
                    }
                    if (!this.mainPlayer.isHeld("scoreboard", false)) {
                        this.scoreboardContainer.visible = false;
                        return;
                    }
                    this.scoreboardContainer.visible = true;
                    var blueKills = 0;
                    var redKills = 0;
                    try {
                        for (var _a = __values(this.level.players), _b = _a.next(); !_b.done; _b = _a.next()) {
                            var player = _b.value;
                            if (player.alliance === 0)
                                blueKills += player.kills;
                            else
                                redKills += player.kills;
                        }
                    }
                    catch (e_19_1) { e_19 = { error: e_19_1 }; }
                    finally {
                        try {
                            if (_b && !_b.done && (_c = _a.return)) _c.call(_a);
                        }
                        finally { if (e_19) throw e_19.error; }
                    }
                    var redPlayers = _.filter(this.players, function (player) {
                        return player.alliance === 1;
                    });
                    var bluePlayers = _.filter(this.players, function (player) {
                        return player.alliance === 0;
                    });
                    this.blueScoreText.text = "Blue: " + String(blueKills);
                    this.redScoreText.text = "Red: " + String(redKills);
                    for (var i = 0; i < this.scoreboardRowCount; i++) {
                        var rowBlue = this.blueScoreboardTexts[i];
                        if (i < bluePlayers.length) {
                            var player = bluePlayers[i];
                            var color = (player === this.mainPlayer) ? "lightgreen" : "lightblue";
                            try {
                                for (var rowBlue_1 = __values(rowBlue), rowBlue_1_1 = rowBlue_1.next(); !rowBlue_1_1.done; rowBlue_1_1 = rowBlue_1.next()) {
                                    var text = rowBlue_1_1.value;
                                    text.visible = true;
                                    text.style.fill = color;
                                }
                            }
                            catch (e_20_1) { e_20 = { error: e_20_1 }; }
                            finally {
                                try {
                                    if (rowBlue_1_1 && !rowBlue_1_1.done && (_d = rowBlue_1.return)) _d.call(rowBlue_1);
                                }
                                finally { if (e_20) throw e_20.error; }
                            }
                            rowBlue[0].text = player.name;
                            rowBlue[1].text = String(player.kills);
                            rowBlue[2].text = String(player.deaths);
                        }
                        else {
                            rowBlue[0].visible = false;
                            rowBlue[1].visible = false;
                            rowBlue[2].visible = false;
                        }
                        var rowRed = this.redScoreboardTexts[i];
                        if (i < redPlayers.length) {
                            var player = redPlayers[i];
                            var color = (player === this.mainPlayer) ? "lightgreen" : "pink";
                            try {
                                for (var rowRed_1 = __values(rowRed), rowRed_1_1 = rowRed_1.next(); !rowRed_1_1.done; rowRed_1_1 = rowRed_1.next()) {
                                    var text = rowRed_1_1.value;
                                    text.visible = true;
                                    text.style.fill = color;
                                }
                            }
                            catch (e_21_1) { e_21 = { error: e_21_1 }; }
                            finally {
                                try {
                                    if (rowRed_1_1 && !rowRed_1_1.done && (_e = rowRed_1.return)) _e.call(rowRed_1);
                                }
                                finally { if (e_21) throw e_21.error; }
                            }
                            rowRed[0].text = player.name;
                            rowRed[1].text = String(player.kills);
                            rowRed[2].text = String(player.deaths);
                        }
                        else {
                            rowRed[0].visible = false;
                            rowRed[1].visible = false;
                            rowRed[2].visible = false;
                        }
                    }
                    var e_19, _c, e_20, _d, e_21, _e;
                };
                TeamDeathMatch.prototype.checkIfWin = function () {
                    if (!this.isOver) {
                        var blueKills = 0;
                        var redKills = 0;
                        try {
                            for (var _a = __values(this.level.players), _b = _a.next(); !_b.done; _b = _a.next()) {
                                var player = _b.value;
                                if (player.alliance === 0)
                                    blueKills += player.kills;
                                else
                                    redKills += player.kills;
                            }
                        }
                        catch (e_22_1) { e_22 = { error: e_22_1 }; }
                        finally {
                            try {
                                if (_b && !_b.done && (_c = _a.return)) _c.call(_a);
                            }
                            finally { if (e_22) throw e_22.error; }
                        }
                        if (blueKills >= this.killsToWin) {
                            this.isOver = true;
                            _.each(this.players, function (player) {
                                if (player.alliance === 0) {
                                    player.won = true;
                                }
                            });
                        }
                        else if (redKills >= this.killsToWin) {
                            this.isOver = true;
                            _.each(this.players, function (player) {
                                if (player.alliance === 1) {
                                    player.won = true;
                                }
                            });
                        }
                        if (this.isOver) {
                            if (game_8.game.music) {
                                game_8.game.music.stop();
                            }
                            if (this.level.mainPlayer && this.level.mainPlayer.won) {
                                game_8.game.music = new Howl({
                                    src: [game_8.game.path.winMusic],
                                });
                                game_8.game.music.play();
                            }
                            else if (this.level.mainPlayer && !this.level.mainPlayer.won) {
                                game_8.game.music = new Howl({
                                    src: [game_8.game.path.loseMusic],
                                });
                                game_8.game.music.play();
                            }
                        }
                    }
                    else {
                        this.overTime += game_8.game.deltaTime;
                        if (this.overTime > 10) {
                            this.restart();
                        }
                    }
                    var e_22, _c;
                };
                return TeamDeathMatch;
            }(GameMode));
            exports_14("TeamDeathMatch", TeamDeathMatch);
        }
    };
});
System.register("character", ["actor", "game", "point", "collider", "rect", "helpers", "weapon", "effects", "ai", "wall", "killFeedEntry"], function (exports_15, context_15) {
    "use strict";
    var __moduleName = context_15 && context_15.id;
    var actor_5, game_9, point_5, collider_3, rect_3, Helpers, weapon_2, effects_1, ai_1, wall_4, killFeedEntry_1, Character, CharState, Idle, Run, Jump, Fall, Dash, AirDash, WallSlide, WallKick, LadderClimb, LadderEnd, Hurt, Die;
    return {
        setters: [
            function (actor_5_1) {
                actor_5 = actor_5_1;
            },
            function (game_9_1) {
                game_9 = game_9_1;
            },
            function (point_5_1) {
                point_5 = point_5_1;
            },
            function (collider_3_1) {
                collider_3 = collider_3_1;
            },
            function (rect_3_1) {
                rect_3 = rect_3_1;
            },
            function (Helpers_7) {
                Helpers = Helpers_7;
            },
            function (weapon_2_1) {
                weapon_2 = weapon_2_1;
            },
            function (effects_1_1) {
                effects_1 = effects_1_1;
            },
            function (ai_1_1) {
                ai_1 = ai_1_1;
            },
            function (wall_4_1) {
                wall_4 = wall_4_1;
            },
            function (killFeedEntry_1_1) {
                killFeedEntry_1 = killFeedEntry_1_1;
            }
        ],
        execute: function () {
            Character = (function (_super) {
                __extends(Character, _super);
                function Character(player, x, y) {
                    var _this = _super.call(this, undefined, new point_5.Point(x, y), true) || this;
                    _this.shootTime = 0;
                    _this.shootAnimTime = 0;
                    _this.projectileCooldown = {};
                    _this.invulnFrames = 0;
                    _this.checkLadderDown = false;
                    _this.dashedInAir = false;
                    _this.dead = false;
                    _this.healAmount = 0;
                    _this.healTime = 0;
                    _this.weaponHealAmount = 0;
                    _this.weaponHealTime = 0;
                    _this.player = player;
                    _this.isDashing = false;
                    _this.globalCollider = _this.getStandingCollider();
                    _this.changeState(new Idle());
                    _this.jumpPower = 230;
                    _this.runSpeed = 80;
                    _this.chargeTime = 0;
                    _this.charge1Time = 0.75;
                    _this.charge2Time = 1.75;
                    _this.charge3Time = 3;
                    _this.chargeFlashTime = 0;
                    _this.chargeSound = game_9.game.sounds["charge_start"];
                    _this.chargeLoopSound = game_9.game.sounds["charge_loop"];
                    _this.chargeLoopSound.loop(true);
                    if (_this.player !== game_9.game.level.mainPlayer) {
                        _this.zIndex = ++game_9.game.level.zChar;
                    }
                    else {
                        _this.zIndex = game_9.game.level.zMainPlayer;
                    }
                    game_9.game.level.addGameObject(_this);
                    _this.chargeEffect = new effects_1.ChargeEffect();
                    if (game_9.game.level.gameMode.isTeamMode || game_9.game.level.gameMode.isBrawl) {
                        if (game_9.game.level.gameMode.isTeamMode) {
                            _this.characterTag = new PIXI.Container();
                            game_9.game.level.gameUIContainer.addChild(_this.characterTag);
                            _this.nameTag = Helpers.createAndDrawText(_this.characterTag, _this.player.name, 0, 0, 6, "", "", _this.player.alliance === 1);
                            _this.healthBarBorder = Helpers.createAndDrawRect(_this.characterTag, new rect_3.Rect(0, 0, 30, 6), 0xFFFFFF);
                            _this.healthBarBorder.x = -15;
                            _this.healthBarBorder.y = 5;
                            _this.healthBarOuter = Helpers.createAndDrawRect(_this.characterTag, new rect_3.Rect(0, 1, 28, 5), 0x000000);
                            _this.healthBarOuter.x = -15 + 1;
                            _this.healthBarOuter.y = 5;
                            _this.healthBarInner = Helpers.createAndDrawRect(_this.characterTag, new rect_3.Rect(0, 2, 26, 4), 0xFFFFFF);
                            _this.healthBarInner.x = -15 + 2;
                            _this.healthBarInner.y = 5;
                            _this.healthBarInnerWidth = _this.healthBarInner.width;
                            _this.characterTag.visible = false;
                        }
                        if (_this.player.alliance === 0) {
                            _this.renderEffects.add("blueshadow");
                        }
                        else {
                            _this.renderEffects.add("redshadow");
                        }
                    }
                    return _this;
                }
                Character.prototype.getStandingCollider = function () {
                    var rect = new rect_3.Rect(0, 0, 18, 34);
                    return new collider_3.Collider(rect.getPoints(), false, this, false, false);
                };
                Character.prototype.getDashingCollider = function () {
                    var rect = new rect_3.Rect(0, 0, 18, 22);
                    return new collider_3.Collider(rect.getPoints(), false, this, false, false);
                };
                Character.prototype.preUpdate = function () {
                    _super.prototype.preUpdate.call(this);
                    this.changedStateInFrame = false;
                };
                Character.prototype.onCollision = function (other) {
                    _super.prototype.onCollision.call(this, other);
                    if (other.gameObject instanceof wall_4.KillZone) {
                        this.applyDamage(undefined, undefined, this.player.maxHealth * 2);
                    }
                };
                Character.prototype.update = function () {
                    if (game_9.game.level.levelData.killY !== undefined && this.pos.y > game_9.game.level.levelData.killY) {
                        this.applyDamage(undefined, undefined, this.player.maxHealth * 2);
                    }
                    if (this.player.health >= this.player.maxHealth) {
                        this.healAmount = 0;
                    }
                    if (this.healAmount > 0 && this.player.health > 0) {
                        this.healTime += game_9.game.deltaTime;
                        if (this.healTime > 0.05) {
                            this.healTime = 0;
                            this.healAmount--;
                            this.player.health = Helpers.clampMax(this.player.health + 1, this.player.maxHealth);
                            this.playSound("heal");
                        }
                    }
                    if (this.player.weapon.ammo >= this.player.weapon.maxAmmo) {
                        this.weaponHealAmount = 0;
                    }
                    if (this.weaponHealAmount > 0 && this.player.health > 0) {
                        this.weaponHealTime += game_9.game.deltaTime;
                        if (this.weaponHealTime > 0.05) {
                            this.weaponHealTime = 0;
                            this.weaponHealAmount--;
                            this.player.weapon.ammo = Helpers.clampMax(this.player.weapon.ammo + 1, this.player.weapon.maxAmmo);
                            this.playSound("heal");
                        }
                    }
                    if (!(this.charState instanceof Dash) && !(this.charState instanceof AirDash) && !(this.charState instanceof Die)) {
                        var standingCollider = this.getStandingCollider();
                        if (!game_9.game.level.checkCollisionShape(standingCollider.shape, [this])) {
                            this.globalCollider = standingCollider;
                        }
                    }
                    if (this.player.alliance === 0) {
                    }
                    for (var projName in this.projectileCooldown) {
                        var cooldown = this.projectileCooldown[projName];
                        if (cooldown) {
                            this.projectileCooldown[projName] = Helpers.clampMin(cooldown - game_9.game.deltaTime, 0);
                        }
                    }
                    if (this.shootAnimTime > 0) {
                        this.shootAnimTime -= game_9.game.deltaTime;
                        if (this.shootAnimTime <= 0) {
                            this.shootAnimTime = 0;
                            this.changeSprite(this.charState.sprite, false);
                        }
                    }
                    if (this.invulnFrames > 0) {
                        this.invulnFrames = Helpers.clampMin0(this.invulnFrames - game_9.game.deltaTime);
                        if (game_9.game.level.twoFrameCycle > 0) {
                            this.renderEffects.add("hit");
                        }
                        else {
                            this.renderEffects.delete("hit");
                            this.renderEffects.delete("flash");
                        }
                        if (this.invulnFrames <= 0) {
                            this.renderEffects.delete("hit");
                            this.renderEffects.delete("flash");
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
                        if (this.player.isHeld("shoot") && this.player.weapon.ammo > 0 && this.player.weaponIndex === 0) {
                            this.chargeTime += game_9.game.deltaTime;
                        }
                        else {
                            if (this.isCharging()) {
                                this.shoot();
                                this.stopCharge();
                            }
                        }
                    }
                    if (this.shootTime > 0) {
                        this.shootTime -= game_9.game.deltaTime;
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
                        this.changeWeapon(Helpers.decrementRange(this.player.weaponIndex, 0, this.player.weapons.length));
                    }
                    else if (this.player.isPressed("weaponright")) {
                        this.changeWeapon(Helpers.incrementRange(this.player.weaponIndex, 0, this.player.weapons.length));
                    }
                    else if (this.player.isPressed("weapon1"))
                        this.changeWeapon(0);
                    else if (this.player.isPressed("weapon2"))
                        this.changeWeapon(1);
                    else if (this.player.isPressed("weapon3"))
                        this.changeWeapon(2);
                    else if (this.player.isPressed("weapon4"))
                        this.changeWeapon(3);
                    else if (this.player.isPressed("weapon5"))
                        this.changeWeapon(4);
                    else if (this.player.isPressed("weapon6"))
                        this.changeWeapon(5);
                    else if (this.player.isPressed("weapon7"))
                        this.changeWeapon(6);
                    else if (this.player.isPressed("weapon8"))
                        this.changeWeapon(7);
                    else if (this.player.isPressed("weapon9"))
                        this.changeWeapon(8);
                    if (this.isCharging()) {
                        var maxFlashTime = 0.1;
                        if (!this.chargeSoundId && !this.chargeLoopSoundId) {
                            this.chargeSoundId = game_9.game.playClip(this.chargeSound, this.getSoundVolume());
                        }
                        if (this.chargeSoundId && !this.chargeSound.playing(this.chargeSoundId)) {
                            this.chargeSoundId = undefined;
                            this.chargeLoopSoundId = game_9.game.playClip(this.chargeLoopSound, this.getSoundVolume());
                        }
                        this.chargeFlashTime += game_9.game.deltaTime;
                        if (this.chargeFlashTime > maxFlashTime) {
                            this.chargeFlashTime = 0;
                        }
                        if (this.chargeFlashTime > maxFlashTime * 0.5) {
                            this.renderEffects.add("flash");
                        }
                        else {
                            this.renderEffects.delete("hit");
                            this.renderEffects.delete("flash");
                        }
                        this.chargeEffect.update(this.pos, this.getChargeLevel());
                    }
                };
                Character.prototype.changeWeapon = function (newWeaponIndex) {
                    if (this.charState.constructor.name === "Die")
                        return;
                    this.player.weaponIndex = newWeaponIndex;
                    this.changePaletteWeapon();
                };
                Character.prototype.changePaletteWeapon = function () {
                    this.palette = this.player.weapon.palette;
                };
                Character.prototype.getCenterPos = function () {
                    return this.pos.addxy(0, -18);
                };
                Character.prototype.getCamCenterPos = function () {
                    return this.pos.addxy(0, -24);
                };
                Character.prototype.setFall = function () {
                    this.changeState(new Fall());
                };
                Character.prototype.isClimbingLadder = function () {
                    return this.charState.constructor.name === "LadderClimb";
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
                    var busterOffsetPos = this.currentFrame.getBusterOffset();
                    if (!busterOffsetPos) {
                        console.log(this.frameIndex);
                        console.log(this.sprite.name);
                        throw "No buster offset!";
                    }
                    var busterOffset = busterOffsetPos.clone();
                    busterOffset.x *= this.xDir;
                    if (this.player.weapon instanceof weapon_2.RollingShield && this.charState.constructor.name === "Dash") {
                        busterOffset.y -= 2;
                    }
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
                    this.chargeEffect.stop();
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
                    if (!this.currentFrame.getBusterOffset()) {
                        this.changeSprite(this.charState.shootSprite, false);
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
                        return 2;
                    }
                };
                Character.prototype.changeState = function (newState, forceChange) {
                    if (this.charState && newState && this.charState.constructor === newState.constructor)
                        return;
                    if (this.changedStateInFrame && !forceChange)
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
                        this.chargeEffect.render(this.getCenterPos().add(new point_5.Point(x, y)), this.getChargeLevel());
                    }
                    if (game_9.game.level.gameMode.isTeamMode && this.charState instanceof Die) {
                        this.characterTag.visible = false;
                    }
                    else if (game_9.game.level.gameMode.isTeamMode
                        && this.player !== game_9.game.level.mainPlayer
                        && this.player.alliance === game_9.game.level.mainPlayer.alliance) {
                        this.characterTag.visible = true;
                        this.characterTag.x = this.pos.x + x;
                        this.characterTag.y = this.pos.y + y - 47;
                        var healthPct = this.player.health / this.player.maxHealth;
                        this.healthBarInner.width = Helpers.clampMax(Math.ceil(this.healthBarInnerWidth * healthPct), this.healthBarInnerWidth);
                        if (healthPct > 0.66)
                            this.healthBarInner.tint = 0x00FF00;
                        else if (healthPct <= 0.66 && healthPct >= 0.33)
                            this.healthBarInner.tint = 0xFFFF00;
                        else if (healthPct < 0.33)
                            this.healthBarInner.tint = 0xFF0000;
                    }
                };
                Character.prototype.applyDamage = function (attacker, weapon, damage) {
                    this.player.health -= damage;
                    if (this.player.health <= 0) {
                        this.player.health = 0;
                        if (!this.dead) {
                            this.dead = true;
                            this.changeState(new Die(), true);
                            if (attacker)
                                attacker.kills++;
                            this.player.deaths++;
                            game_9.game.level.gameMode.addKillFeedEntry(new killFeedEntry_1.KillFeedEntry(attacker, this.player, weapon));
                        }
                    }
                };
                Character.prototype.addHealth = function (amount) {
                    this.healAmount += amount;
                };
                Character.prototype.addAmmo = function (amount) {
                    this.player.weapon.ammo += amount;
                    if (this.player.weapon.ammo > this.player.weapon.maxAmmo) {
                        this.player.weapon.ammo = this.player.weapon.maxAmmo;
                    }
                };
                Character.prototype.setHurt = function (dir) {
                    this.changeState(new Hurt(dir));
                };
                Character.prototype.destroySelf = function (sprite, fadeSound) {
                    _super.prototype.destroySelf.call(this, sprite, fadeSound);
                    this.chargeEffect.destroy();
                    if (this.characterTag) {
                        game_9.game.level.gameUIContainer.removeChild(this.characterTag);
                        this.characterTag.destroy({ children: true, texture: true });
                    }
                };
                return Character;
            }(actor_5.Actor));
            exports_15("Character", Character);
            CharState = (function () {
                function CharState(sprite, shootSprite, transitionSprite) {
                    this.framesJumpNotHeld = 0;
                    this.sprite = transitionSprite || sprite;
                    this.transitionSprite = transitionSprite;
                    this.defaultSprite = sprite;
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
                        this.character.playSound(this.enterSound);
                };
                CharState.prototype.inTransition = function () {
                    return this.transitionSprite && this.sprite.name === this.transitionSprite.name;
                };
                CharState.prototype.update = function () {
                    if (this.inTransition() && this.character.isAnimOver()) {
                        this.sprite = this.defaultSprite;
                        this.character.changeSprite(this.sprite, true);
                    }
                    this.stateTime += game_9.game.deltaTime;
                    var lastLeftWallData = game_9.game.level.checkCollisionActor(this.character, -1, 0);
                    this.lastLeftWall = lastLeftWallData ? lastLeftWallData.collider : undefined;
                    if (this.lastLeftWall && !this.lastLeftWall.isClimbable)
                        this.lastLeftWall = undefined;
                    var lastRightWallData = game_9.game.level.checkCollisionActor(this.character, 1, 0);
                    this.lastRightWall = lastRightWallData ? lastRightWallData.collider : undefined;
                    if (this.lastRightWall && !this.lastRightWall.isClimbable)
                        this.lastRightWall = undefined;
                };
                CharState.prototype.airCode = function () {
                    if (this.character.grounded) {
                        this.character.playSound("land");
                        this.character.changeState(new Idle(game_9.game.sprites["mmx_land"]));
                        this.character.dashedInAir = false;
                        return;
                    }
                    if (this.player.isHeld("dash") && !this.character.isDashing && !this.character.dashedInAir) {
                        this.character.changeState(new AirDash());
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
                        var ladders = game_9.game.level.getTriggerList(this.character, 0, 0, undefined, wall_4.Ladder);
                        if (ladders.length > 0) {
                            var midX = ladders[0].collider.shape.getRect().midX;
                            if (Math.abs(this.character.pos.x - midX) < 12) {
                                var rect = ladders[0].collider.shape.getRect();
                                var snapX = (rect.x1 + rect.x2) / 2;
                                if (!game_9.game.level.checkCollisionActor(this.character, snapX - this.character.pos.x, 0)) {
                                    this.character.changeState(new LadderClimb(ladders[0].gameObject, snapX));
                                }
                            }
                        }
                    }
                    if (game_9.game.level.checkCollisionActor(this.character, 0, -1) && this.character.vel.y < 0) {
                        this.character.vel.y = 0;
                    }
                    var move = new point_5.Point(0, 0);
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
                        var ladders = game_9.game.level.getTriggerList(this.character, 0, 1, undefined, wall_4.Ladder);
                        if (ladders.length > 0) {
                            var rect = ladders[0].collider.shape.getRect();
                            var snapX = (rect.x1 + rect.x2) / 2;
                            if (!game_9.game.level.checkCollisionActor(this.character, snapX - this.character.pos.x, 30)) {
                                this.character.changeState(new LadderClimb(ladders[0].gameObject, snapX));
                                this.character.move(new point_5.Point(0, 30), false);
                            }
                        }
                        this.character.checkLadderDown = false;
                    }
                };
                return CharState;
            }());
            Idle = (function (_super) {
                __extends(Idle, _super);
                function Idle(transitionSprite) {
                    return _super.call(this, game_9.game.sprites["mmx_idle"], game_9.game.sprites["mmx_shoot"], transitionSprite) || this;
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
                    if (game_9.game.level.gameMode.isOver) {
                        if (this.player.won) {
                            if (this.character.sprite.name !== "mmx_win") {
                                this.character.changeSprite(game_9.game.sprites["mmx_win"], true);
                            }
                        }
                        else {
                            if (this.character.sprite.name !== "mmx_kneel") {
                                this.character.changeSprite(game_9.game.sprites["mmx_kneel"], true);
                            }
                        }
                    }
                };
                return Idle;
            }(CharState));
            Run = (function (_super) {
                __extends(Run, _super);
                function Run() {
                    return _super.call(this, game_9.game.sprites["mmx_run"], game_9.game.sprites["mmx_run_shoot"]) || this;
                }
                Run.prototype.update = function () {
                    _super.prototype.update.call(this);
                    var move = new point_5.Point(0, 0);
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
                    var _this = _super.call(this, game_9.game.sprites["mmx_jump"], game_9.game.sprites["mmx_jump_shoot"]) || this;
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
                    return _super.call(this, game_9.game.sprites["mmx_fall"], game_9.game.sprites["mmx_fall_shoot"]) || this;
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
                    var _this = _super.call(this, game_9.game.sprites["mmx_dash"], game_9.game.sprites["mmx_dash_shoot"]) || this;
                    _this.dashTime = 0;
                    _this.enterSound = "dash";
                    return _this;
                }
                Dash.prototype.onEnter = function (oldState) {
                    _super.prototype.onEnter.call(this, oldState);
                    this.character.isDashing = true;
                    this.character.globalCollider = this.character.getDashingCollider();
                    new actor_5.Anim(this.character.pos, game_9.game.sprites["dash_sparks"], this.character.xDir);
                };
                Dash.prototype.onExit = function (newState) {
                    _super.prototype.onExit.call(this, newState);
                };
                Dash.prototype.update = function () {
                    _super.prototype.update.call(this);
                    this.groundCode();
                    if (!this.player.isHeld("dash")) {
                        this.character.changeState(new Idle());
                        return;
                    }
                    this.dashTime += game_9.game.deltaTime;
                    if (this.dashTime > 0.5) {
                        this.character.changeState(new Idle());
                        return;
                    }
                    var move = new point_5.Point(0, 0);
                    move.x = this.character.runSpeed * this.character.getDashSpeed() * this.character.xDir;
                    this.character.move(move);
                    if (this.stateTime > 0.1) {
                        this.stateTime = 0;
                        new actor_5.Anim(this.character.pos.addxy(0, -4), game_9.game.sprites["dust"], this.character.xDir);
                    }
                };
                return Dash;
            }(CharState));
            AirDash = (function (_super) {
                __extends(AirDash, _super);
                function AirDash() {
                    var _this = _super.call(this, game_9.game.sprites["mmx_dash"], game_9.game.sprites["mmx_dash_shoot"]) || this;
                    _this.dashTime = 0;
                    _this.enterSound = "dash";
                    return _this;
                }
                AirDash.prototype.onEnter = function (oldState) {
                    _super.prototype.onEnter.call(this, oldState);
                    this.character.isDashing = true;
                    this.character.useGravity = false;
                    this.character.vel = new point_5.Point(0, 0);
                    this.character.dashedInAir = true;
                    this.character.globalCollider = this.character.getDashingCollider();
                    new actor_5.Anim(this.character.pos, game_9.game.sprites["dash_sparks"], this.character.xDir);
                };
                AirDash.prototype.onExit = function (newState) {
                    this.character.useGravity = true;
                    _super.prototype.onExit.call(this, newState);
                };
                AirDash.prototype.update = function () {
                    _super.prototype.update.call(this);
                    if (!this.player.isHeld("dash")) {
                        this.character.changeState(new Fall());
                        return;
                    }
                    this.dashTime += game_9.game.deltaTime;
                    if (this.dashTime > 0.5) {
                        this.character.changeState(new Fall());
                        return;
                    }
                    var move = new point_5.Point(0, 0);
                    move.x = this.character.runSpeed * this.character.getDashSpeed() * this.character.xDir;
                    this.character.move(move);
                    if (this.stateTime > 0.1) {
                        this.stateTime = 0;
                        new actor_5.Anim(this.character.pos.addxy(0, -4), game_9.game.sprites["dust"], this.character.xDir);
                    }
                };
                return AirDash;
            }(CharState));
            WallSlide = (function (_super) {
                __extends(WallSlide, _super);
                function WallSlide(wallDir) {
                    var _this = _super.call(this, game_9.game.sprites["mmx_wall_slide"], game_9.game.sprites["mmx_wall_slide_shoot"]) || this;
                    _this.dustTime = 0;
                    _this.wallDir = wallDir;
                    _this.enterSound = "land";
                    return _this;
                }
                WallSlide.prototype.onEnter = function (oldState) {
                    _super.prototype.onEnter.call(this, oldState);
                    this.character.dashedInAir = false;
                };
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
                        if (!dirHeld || !game_9.game.level.checkCollisionActor(this.character, this.wallDir, 0)) {
                            this.player.character.changeState(new Fall());
                        }
                        this.character.move(new point_5.Point(0, 100));
                    }
                    this.dustTime += game_9.game.deltaTime;
                    if (this.stateTime > 0.2 && this.dustTime > 0.1) {
                        this.dustTime = 0;
                        new actor_5.Anim(this.character.pos.addxy(this.character.xDir * 12, 0), game_9.game.sprites["dust"], this.character.xDir);
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
                    var _this = _super.call(this, game_9.game.sprites["mmx_wall_kick"], game_9.game.sprites["mmx_wall_kick_shoot"]) || this;
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
                        this.kickSpeed = Helpers.toZero(this.kickSpeed, 800 * game_9.game.deltaTime, this.kickDir);
                        this.character.move(new point_5.Point(this.kickSpeed, 0));
                    }
                    this.airCode();
                    if (this.character.vel.y > 0) {
                        this.character.changeState(new Fall());
                    }
                };
                WallKick.prototype.onEnter = function (oldState) {
                    _super.prototype.onEnter.call(this, oldState);
                    new actor_5.Anim(this.character.pos.addxy(12 * this.character.xDir, 0), game_9.game.sprites["wall_sparks"], this.character.xDir);
                };
                WallKick.prototype.onExit = function (newState) {
                    _super.prototype.onExit.call(this, newState);
                };
                return WallKick;
            }(CharState));
            LadderClimb = (function (_super) {
                __extends(LadderClimb, _super);
                function LadderClimb(ladder, snapX) {
                    var _this = _super.call(this, game_9.game.sprites["mmx_ladder_climb"], game_9.game.sprites["mmx_ladder_shoot"], game_9.game.sprites["mmx_ladder_start"]) || this;
                    _this.ladder = ladder;
                    _this.snapX = snapX;
                    return _this;
                }
                LadderClimb.prototype.onEnter = function (oldState) {
                    _super.prototype.onEnter.call(this, oldState);
                    if (this.snapX !== undefined) {
                        this.character.pos.x = this.snapX;
                    }
                    if (this.character.player === game_9.game.level.mainPlayer) {
                        game_9.game.level.lerpCamTime = 0.25;
                    }
                    this.character.vel = new point_5.Point(0, 0);
                    this.character.useGravity = false;
                    this.character.dashedInAir = false;
                };
                LadderClimb.prototype.onExit = function (newState) {
                    _super.prototype.onExit.call(this, newState);
                    this.character.frameSpeed = 1;
                    this.character.useGravity = true;
                };
                LadderClimb.prototype.update = function () {
                    _super.prototype.update.call(this);
                    if (this.inTransition()) {
                        return;
                    }
                    this.character.frameSpeed = 0;
                    if (this.character.shootAnimTime === 0) {
                        if (this.player.isHeld("up")) {
                            this.character.move(new point_5.Point(0, -100));
                            this.character.frameSpeed = 1;
                        }
                        else if (this.player.isHeld("down")) {
                            this.character.move(new point_5.Point(0, 100));
                            this.character.frameSpeed = 1;
                        }
                    }
                    var ladderTop = this.ladder.collider.shape.getRect().y1;
                    var yDist = this.character.collider.shape.getRect().y2 - ladderTop;
                    if (!this.ladder.collider.isCollidingWith(this.character.collider) || Math.abs(yDist) < 12) {
                        if (this.player.isHeld("up")) {
                            var targetY = ladderTop - 1;
                            if (!game_9.game.level.checkCollisionActor(this.character, 0, targetY - this.character.pos.y)) {
                                this.character.changeState(new LadderEnd(targetY));
                            }
                        }
                        else {
                            this.character.changeState(new Fall());
                        }
                    }
                    else if (this.player.isPressed("jump")) {
                        this.character.changeState(new Fall());
                    }
                };
                return LadderClimb;
            }(CharState));
            LadderEnd = (function (_super) {
                __extends(LadderEnd, _super);
                function LadderEnd(targetY) {
                    var _this = _super.call(this, game_9.game.sprites["mmx_ladder_end"]) || this;
                    _this.targetY = targetY;
                    return _this;
                }
                LadderEnd.prototype.onEnter = function (oldState) {
                    _super.prototype.onEnter.call(this, oldState);
                    this.character.useGravity = false;
                };
                LadderEnd.prototype.onExit = function (newState) {
                    _super.prototype.onExit.call(this, newState);
                    this.character.useGravity = true;
                };
                LadderEnd.prototype.update = function () {
                    _super.prototype.update.call(this);
                    if (this.character.isAnimOver()) {
                        if (this.character.player === game_9.game.level.mainPlayer) {
                            game_9.game.level.lerpCamTime = 0.25;
                        }
                        this.character.pos.y = this.targetY;
                        this.character.changeState(new Idle());
                    }
                };
                return LadderEnd;
            }(CharState));
            Hurt = (function (_super) {
                __extends(Hurt, _super);
                function Hurt(dir) {
                    var _this = _super.call(this, game_9.game.sprites["mmx_hurt"]) || this;
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
                        this.hurtSpeed = Helpers.toZero(this.hurtSpeed, 400 * game_9.game.deltaTime, this.hurtDir);
                        this.character.move(new point_5.Point(this.hurtSpeed, 0));
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
                    return _super.call(this, game_9.game.sprites["mmx_die"]) || this;
                }
                Die.prototype.onEnter = function (oldState) {
                    _super.prototype.onEnter.call(this, oldState);
                    this.character.useGravity = false;
                    this.character.vel.x = 0;
                    this.character.vel.y = 0;
                    game_9.game.level.removeFromGrid(this.character);
                    this.character.globalCollider = undefined;
                    this.character.stopCharge();
                    new actor_5.Anim(this.character.pos.addxy(0, -12), game_9.game.sprites["die_sparks"], 1);
                };
                Die.prototype.onExit = function (newState) {
                    this.character.dead = false;
                    throw "Should not have come back to life";
                };
                Die.prototype.update = function () {
                    _super.prototype.update.call(this);
                    if (this.stateTime > 0.75) {
                        if (this.character.player === game_9.game.level.mainPlayer) {
                            this.character.playSound("die", 1);
                        }
                        else {
                            this.character.playSound("die");
                        }
                        new effects_1.DieEffect(this.character.pos);
                        this.player.destroyCharacter();
                    }
                };
                return Die;
            }(CharState));
        }
    };
});
System.register("cheats", ["game", "killFeedEntry"], function (exports_16, context_16) {
    "use strict";
    var __moduleName = context_16 && context_16.id;
    function cheat(key, keycode) {
        if (game_10.game.uiData.isProd)
            return false;
        if (keycode === 112) {
            try {
                for (var _a = __values(game_10.game.level.players), _b = _a.next(); !_b.done; _b = _a.next()) {
                    var player = _b.value;
                    player.health = 1;
                }
            }
            catch (e_23_1) { e_23 = { error: e_23_1 }; }
            finally {
                try {
                    if (_b && !_b.done && (_c = _a.return)) _c.call(_a);
                }
                finally { if (e_23) throw e_23.error; }
            }
            if (game_10.game.level.mainPlayer) {
            }
        }
        if (keycode === 113) {
            try {
                for (var _d = __values(game_10.game.level.players), _e = _d.next(); !_e.done; _e = _d.next()) {
                    var player = _e.value;
                    if (!player.isAI && player !== game_10.game.level.mainPlayer) {
                        player.isAI = true;
                        player.character.addAI();
                    }
                }
            }
            catch (e_24_1) { e_24 = { error: e_24_1 }; }
            finally {
                try {
                    if (_e && !_e.done && (_f = _d.return)) _f.call(_d);
                }
                finally { if (e_24) throw e_24.error; }
            }
        }
        if (keycode === 114) {
            game_10.game.level.mainPlayer.kills = 20;
        }
        if (keycode === 115) {
            var cpu = _.find(game_10.game.level.players, function (player) {
                return player.isAI;
            });
            cpu.kills = 20;
        }
        if (keycode === 116) {
            game_10.game.level.gameMode.addKillFeedEntry(new killFeedEntry_2.KillFeedEntry(undefined, game_10.game.level.mainPlayer, undefined));
        }
        if (keycode === 75) {
            game_10.game.level.mainPlayer.character.applyDamage(undefined, undefined, 100);
        }
        if (keycode === 116) {
            try {
                for (var _g = __values(game_10.game.level.players), _h = _g.next(); !_h.done; _h = _g.next()) {
                    var player = _h.value;
                    if (player.isAI) {
                        player.character.changeWeapon(3);
                        player.lockWeapon = true;
                    }
                }
            }
            catch (e_25_1) { e_25 = { error: e_25_1 }; }
            finally {
                try {
                    if (_h && !_h.done && (_j = _g.return)) _j.call(_g);
                }
                finally { if (e_25) throw e_25.error; }
            }
        }
        if (key === "reset") {
            game_10.game.restartLevel("sm_bossroom");
            return;
        }
        if (keycode === 80) {
            game_10.game.paused = !game_10.game.paused;
        }
        var e_23, _c, e_24, _f, e_25, _j;
    }
    exports_16("cheat", cheat);
    var game_10, killFeedEntry_2;
    return {
        setters: [
            function (game_10_1) {
                game_10 = game_10_1;
            },
            function (killFeedEntry_2_1) {
                killFeedEntry_2 = killFeedEntry_2_1;
            }
        ],
        execute: function () {
        }
    };
});
System.register("player", ["character", "weapon", "game", "helpers", "cheats"], function (exports_17, context_17) {
    "use strict";
    var __moduleName = context_17 && context_17.id;
    var character_4, weapon_3, game_11, Helpers, cheats_1, Player;
    return {
        setters: [
            function (character_4_1) {
                character_4 = character_4_1;
            },
            function (weapon_3_1) {
                weapon_3 = weapon_3_1;
            },
            function (game_11_1) {
                game_11 = game_11_1;
            },
            function (Helpers_8) {
                Helpers = Helpers_8;
            },
            function (cheats_1_1) {
                cheats_1 = cheats_1_1;
            }
        ],
        execute: function () {
            Player = (function () {
                function Player(name, isAI, alliance, maxHealth, palette) {
                    this.input = {};
                    this.inputPressed = {};
                    this.controllerInput = {};
                    this.controllerInputPressed = {};
                    this.inputMapping = {};
                    this.buttonMapping = {};
                    this.axesMapping = {};
                    this.respawnTime = 0;
                    this.kills = 0;
                    this.deaths = 0;
                    this.won = false;
                    this.lockWeapon = false;
                    this.name = name;
                    this.alliance = alliance;
                    this.id = Helpers.getAutoIncId();
                    this.isAI = isAI;
                    this.palette = palette;
                    if (!isAI && alliance === 0) {
                        this.inputMapping = game_11.game.getPlayerControls(1);
                    }
                    else if (!isAI && alliance === 1) {
                        this.inputMapping = game_11.game.getPlayerControls(2);
                    }
                    this.health = maxHealth;
                    this.maxHealth = maxHealth;
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
                Player.prototype.updateControls = function () {
                    if (!this.isAI && this.alliance === 0) {
                        this.inputMapping = game_11.game.getPlayerControls(1);
                    }
                    else if (!this.isAI && this.alliance === 1) {
                        this.inputMapping = game_11.game.getPlayerControls(2);
                    }
                };
                Player.prototype.update = function () {
                    if (this.respawnTime === 0 && !this.character) {
                        this.health = this.maxHealth;
                        try {
                            for (var _a = __values(this.weapons), _b = _a.next(); !_b.done; _b = _a.next()) {
                                var weapon = _b.value;
                                weapon.ammo = weapon.maxAmmo;
                            }
                        }
                        catch (e_26_1) { e_26 = { error: e_26_1 }; }
                        finally {
                            try {
                                if (_b && !_b.done && (_c = _a.return)) _c.call(_a);
                            }
                            finally { if (e_26) throw e_26.error; }
                        }
                        var spawnPoint = game_11.game.level.getSpawnPoint(this);
                        this.character = new character_4.Character(this, spawnPoint.pos.x, spawnPoint.pos.y);
                        if (this.isAI) {
                            this.character.addAI();
                        }
                        this.character.palette = this.palette;
                        this.character.changePaletteWeapon();
                        this.character.xDir = spawnPoint.xDir;
                        if (this === game_11.game.level.mainPlayer) {
                            game_11.game.level.computeCamPos(this.character);
                        }
                    }
                    if (this.respawnTime > 0 && !game_11.game.level.gameMode.isOver) {
                        this.respawnTime = Helpers.clampMin0(this.respawnTime - game_11.game.deltaTime);
                    }
                    var e_26, _c;
                };
                Object.defineProperty(Player.prototype, "canControl", {
                    get: function () {
                        if (game_11.game.level.gameMode.isOver) {
                            return false;
                        }
                        if (game_11.game.uiData.menu !== game_11.Menu.None && !this.isAI) {
                            return false;
                        }
                        return true;
                    },
                    enumerable: true,
                    configurable: true
                });
                Player.prototype.isPressed = function (keyName, checkIfCanControl) {
                    if (checkIfCanControl === void 0) { checkIfCanControl = true; }
                    if (checkIfCanControl && !this.canControl)
                        return false;
                    return this.inputPressed[keyName] || this.controllerInputPressed[keyName];
                };
                Player.prototype.isHeld = function (keyName, checkIfCanControl) {
                    if (checkIfCanControl === void 0) { checkIfCanControl = true; }
                    if (checkIfCanControl && !this.canControl)
                        return false;
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
                        this.buttonMapping[8] = "scoreboard";
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
                        game_11.game.restartLevel("sm_bossroom");
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
                    if (this === game_11.game.level.mainPlayer) {
                        cheats_1.cheat(key, keycode);
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
                    var mouseUpMap = this.inputMapping[3];
                    if (mouseUpMap)
                        this.input[mouseUpMap] = false;
                    var mouseDownMap = this.inputMapping[4];
                    if (mouseDownMap)
                        this.input[mouseDownMap] = false;
                    this.controllerInputPressed = {};
                };
                Player.prototype.clearAiInput = function () {
                    this.input = {};
                    this.controllerInputPressed = {};
                };
                Player.prototype.destroyCharacter = function () {
                    this.respawnTime = 5;
                    this.character.destroySelf();
                    this.character = undefined;
                };
                return Player;
            }());
            exports_17("Player", Player);
        }
    };
});
System.register("spawnPoint", ["game"], function (exports_18, context_18) {
    "use strict";
    var __moduleName = context_18 && context_18.id;
    var game_12, SpawnPoint;
    return {
        setters: [
            function (game_12_1) {
                game_12 = game_12_1;
            }
        ],
        execute: function () {
            SpawnPoint = (function () {
                function SpawnPoint(name, point, xDir, num) {
                    this.name = name;
                    this.pos = point;
                    this.xDir = xDir || 1;
                    this.num = num || 0;
                }
                SpawnPoint.prototype.occupied = function () {
                    var nearbyChars = game_12.game.level.getActorsInRadius(this.pos, 30, ["Character"]);
                    if (nearbyChars.length > 0)
                        return true;
                    return false;
                };
                return SpawnPoint;
            }());
            exports_18("SpawnPoint", SpawnPoint);
        }
    };
});
System.register("noScroll", [], function (exports_19, context_19) {
    "use strict";
    var __moduleName = context_19 && context_19.id;
    var Direction, NoScroll;
    return {
        setters: [],
        execute: function () {
            (function (Direction) {
                Direction[Direction["Up"] = 0] = "Up";
                Direction[Direction["Down"] = 1] = "Down";
                Direction[Direction["Left"] = 2] = "Left";
                Direction[Direction["Right"] = 3] = "Right";
            })(Direction || (Direction = {}));
            exports_19("Direction", Direction);
            NoScroll = (function () {
                function NoScroll(shape, dir) {
                    this.shape = shape;
                    this.freeDir = dir;
                }
                return NoScroll;
            }());
            exports_19("NoScroll", NoScroll);
        }
    };
});
System.register("hud", ["game"], function (exports_20, context_20) {
    "use strict";
    var __moduleName = context_20 && context_20.id;
    var game_13, PlayerHUD, HUD;
    return {
        setters: [
            function (game_13_1) {
                game_13 = game_13_1;
            }
        ],
        execute: function () {
            PlayerHUD = (function () {
                function PlayerHUD(player, playerNum, container) {
                    this.fullHealthBars = [];
                    this.emptyHealthBars = [];
                    this.fullAmmoBars = [];
                    this.emptyAmmoBars = [];
                    this.player = player;
                    this.playerNum = playerNum;
                    this.container = container;
                    var baseX = 10;
                    if (this.playerNum === 2)
                        baseX = game_13.game.level.screenWidth - 4 - baseX;
                    var baseY = game_13.game.level.screenHeight / 2;
                    baseY += 25;
                    this.healthBase = game_13.game.sprites["hud_health_base"].createAndDraw(container, 0, baseX, baseY, 1, 1, undefined, 1, this.player.palette);
                    baseY -= 16;
                    for (var i = 0; i < Math.ceil(this.player.maxHealth); i++) {
                        this.emptyHealthBars.push(game_13.game.sprites["hud_health_empty"].createAndDraw(container, 0, baseX, baseY));
                        this.fullHealthBars.push(game_13.game.sprites["hud_health_full"].createAndDraw(container, 0, baseX, baseY));
                        baseY -= 2;
                    }
                    this.healthTop = game_13.game.sprites["hud_health_top"].createAndDraw(container, 0, baseX, baseY);
                    this.ammoContainer = new PIXI.Container();
                    this.container.addChild(this.ammoContainer);
                    baseX = 25;
                    if (this.playerNum === 2)
                        baseX = game_13.game.level.screenWidth - 4 - baseX;
                    baseY = game_13.game.level.screenHeight / 2;
                    baseY += 25;
                    this.ammoBase = game_13.game.sprites["hud_weapon_base"].createAndDraw(this.ammoContainer, this.player.weapon.index - 1, baseX, baseY);
                    baseY -= 16;
                    for (var i = 0; i < Math.ceil(this.player.weapon.ammo); i++) {
                        this.emptyAmmoBars.push(game_13.game.sprites["hud_health_empty"].createAndDraw(this.ammoContainer, 0, baseX, baseY));
                        this.fullAmmoBars.push(game_13.game.sprites["hud_weapon_full"].createAndDraw(this.ammoContainer, this.player.weapon.index - 1, baseX, baseY));
                        baseY -= 2;
                    }
                    this.ammoTop = game_13.game.sprites["hud_health_top"].createAndDraw(this.ammoContainer, 0, baseX, baseY);
                    this.ammoContainer.visible = false;
                    this.update();
                }
                PlayerHUD.prototype.update = function () {
                    for (var i = 0; i < Math.ceil(this.player.maxHealth); i++) {
                        if (i < Math.ceil(this.player.health)) {
                            this.fullHealthBars[i].pixiSprite.visible = true;
                            this.emptyHealthBars[i].pixiSprite.visible = false;
                        }
                        else {
                            this.fullHealthBars[i].pixiSprite.visible = false;
                            this.emptyHealthBars[i].pixiSprite.visible = true;
                        }
                    }
                    if (this.player.weaponIndex !== 0) {
                        this.ammoContainer.visible = true;
                        this.ammoBase.draw(this.player.weapon.index - 1);
                        for (var i = 0; i < Math.ceil(this.player.weapon.maxAmmo); i++) {
                            this.fullAmmoBars[i].draw(this.player.weapon.index - 1);
                            if (i < Math.ceil(this.player.weapon.ammo)) {
                                this.fullAmmoBars[i].pixiSprite.visible = true;
                                this.emptyAmmoBars[i].pixiSprite.visible = false;
                            }
                            else {
                                this.fullAmmoBars[i].pixiSprite.visible = false;
                                this.emptyAmmoBars[i].pixiSprite.visible = true;
                            }
                        }
                    }
                    else {
                        this.ammoContainer.visible = false;
                    }
                };
                return PlayerHUD;
            }());
            exports_20("PlayerHUD", PlayerHUD);
            HUD = (function () {
                function HUD(level) {
                    this.level = level;
                    this.player1HUD = new PlayerHUD(this.level.localPlayers[0], 1, this.level.uiContainer);
                    if (this.level.localPlayers.length > 1 && this.level.levelData.fixedCam) {
                        this.player2HUD = new PlayerHUD(this.level.localPlayers[1], 2, this.level.uiContainer);
                    }
                    this.updateHUD();
                }
                HUD.prototype.updateHUD = function () {
                    this.player1HUD.update();
                    if (this.player2HUD) {
                        this.player2HUD.update();
                    }
                };
                return HUD;
            }());
            exports_20("HUD", HUD);
        }
    };
});
System.register("objectPool", [], function (exports_21, context_21) {
    "use strict";
    var __moduleName = context_21 && context_21.id;
    var ObjectPool;
    return {
        setters: [],
        execute: function () {
            ObjectPool = (function () {
                function ObjectPool() {
                    this.pool = {};
                    this.maxSize = 24;
                }
                ObjectPool.prototype.get = function (key) {
                    var pool = this.pool[key];
                    if (!pool) {
                        return undefined;
                    }
                    try {
                        for (var pool_1 = __values(pool), pool_1_1 = pool_1.next(); !pool_1_1.done; pool_1_1 = pool_1.next()) {
                            var poolItem = pool_1_1.value;
                            if (poolItem.isFree()) {
                                poolItem.reserve();
                                return poolItem;
                            }
                        }
                    }
                    catch (e_27_1) { e_27 = { error: e_27_1 }; }
                    finally {
                        try {
                            if (pool_1_1 && !pool_1_1.done && (_a = pool_1.return)) _a.call(pool_1);
                        }
                        finally { if (e_27) throw e_27.error; }
                    }
                    return undefined;
                    var e_27, _a;
                };
                ObjectPool.prototype.add = function (key, poolItem) {
                    var pool = this.pool[key];
                    if (!pool) {
                        pool = [];
                        this.pool[key] = pool;
                    }
                    else {
                        if (pool.length > this.maxSize) {
                        }
                    }
                    pool.push(poolItem);
                };
                return ObjectPool;
            }());
            exports_21("ObjectPool", ObjectPool);
        }
    };
});
System.register("level", ["wall", "point", "game", "helpers", "actor", "rect", "collider", "character", "spawnPoint", "noScroll", "navMesh", "shape", "pickup", "hud", "objectPool"], function (exports_22, context_22) {
    "use strict";
    var __moduleName = context_22 && context_22.id;
    var wall_5, point_6, game_14, Helpers, actor_6, rect_4, collider_4, character_5, spawnPoint_1, noScroll_1, navMesh_1, shape_1, pickup_2, hud_1, objectPool_1, Level, Cell, LevelData;
    return {
        setters: [
            function (wall_5_1) {
                wall_5 = wall_5_1;
            },
            function (point_6_1) {
                point_6 = point_6_1;
            },
            function (game_14_1) {
                game_14 = game_14_1;
            },
            function (Helpers_9) {
                Helpers = Helpers_9;
            },
            function (actor_6_1) {
                actor_6 = actor_6_1;
            },
            function (rect_4_1) {
                rect_4 = rect_4_1;
            },
            function (collider_4_1) {
                collider_4 = collider_4_1;
            },
            function (character_5_1) {
                character_5 = character_5_1;
            },
            function (spawnPoint_1_1) {
                spawnPoint_1 = spawnPoint_1_1;
            },
            function (noScroll_1_1) {
                noScroll_1 = noScroll_1_1;
            },
            function (navMesh_1_1) {
                navMesh_1 = navMesh_1_1;
            },
            function (shape_1_1) {
                shape_1 = shape_1_1;
            },
            function (pickup_2_1) {
                pickup_2 = pickup_2_1;
            },
            function (hud_1_1) {
                hud_1 = hud_1_1;
            },
            function (objectPool_1_1) {
                objectPool_1 = objectPool_1_1;
            }
        ],
        execute: function () {
            Level = (function () {
                function Level(levelData) {
                    this.effects = [];
                    this.spawnPoints = [];
                    this.noScrolls = [];
                    this.debugString = "";
                    this.debugString2 = "";
                    this.lerpCamTime = 0;
                    this.navMeshNodes = [];
                    this.pickupSpawners = [];
                    this.grid = [];
                    this.occupiedGridSets = new Set();
                    this.zDefault = 0;
                    this.zMainPlayer = -1000000000;
                    this.zChar = -2000000000;
                    this.zBackground = -3000000000;
                    this.levelData = levelData;
                    this.zoomScale = 3;
                    this.gravity = 550;
                    this.frameCount = 0;
                    this.backgroundPath = levelData.levelJson.backgroundPath + game_14.game.path.version;
                    this.parallaxPath = levelData.parallax ? levelData.parallax : "";
                    this.foregroundPath = levelData.foreground ? levelData.foreground : "";
                    var imagesToLoad = [this.backgroundPath];
                    if (this.parallaxPath) {
                        imagesToLoad.push(this.parallaxPath);
                    }
                    if (this.foregroundPath) {
                        imagesToLoad.push(this.foregroundPath);
                    }
                    game_14.game.loadImages(imagesToLoad);
                    this.spritePool = new objectPool_1.ObjectPool();
                    this.projectilePool = new objectPool_1.ObjectPool();
                }
                Object.defineProperty(Level.prototype, "localPlayers", {
                    get: function () { return this.gameMode.localPlayers; },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(Level.prototype, "players", {
                    get: function () { return this.gameMode.players; },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(Level.prototype, "mainPlayer", {
                    get: function () { return this.gameMode.mainPlayer; },
                    enumerable: true,
                    configurable: true
                });
                Level.prototype.destroy = function () {
                    var stage = game_14.game.pixiApp.stage;
                    for (var i = stage.children.length - 1; i >= 0; i--) {
                        var child = stage.children[i];
                        stage.removeChild(child);
                        child.destroy();
                    }
                    this.gameMode.destroy();
                };
                Level.prototype.startLevel = function (gameMode) {
                    this.renderSetup();
                    this.gameObjects = new Set();
                    this.anims = new Set();
                    this.setupGrid(50);
                    try {
                        for (var _a = __values(this.levelData.levelJson.instances), _b = _a.next(); !_b.done; _b = _a.next()) {
                            var instance = _b.value;
                            if (instance.objectName === "Collision Shape") {
                                var points = [];
                                try {
                                    for (var _c = __values(instance.points), _d = _c.next(); !_d.done; _d = _c.next()) {
                                        var point = _d.value;
                                        points.push(new point_6.Point(point.x, point.y));
                                    }
                                }
                                catch (e_28_1) { e_28 = { error: e_28_1 }; }
                                finally {
                                    try {
                                        if (_d && !_d.done && (_e = _c.return)) _e.call(_c);
                                    }
                                    finally { if (e_28) throw e_28.error; }
                                }
                                var wall = new wall_5.Wall(instance.name, points);
                                wall.collider.isClimbable = (instance.properties && instance.properties.climbable === "false") ? false : true;
                                this.addGameObject(wall);
                            }
                            else if (instance.objectName === "Ladder") {
                                var points = [];
                                try {
                                    for (var _f = __values(instance.points), _g = _f.next(); !_g.done; _g = _f.next()) {
                                        var point = _g.value;
                                        points.push(new point_6.Point(point.x, point.y));
                                    }
                                }
                                catch (e_29_1) { e_29 = { error: e_29_1 }; }
                                finally {
                                    try {
                                        if (_g && !_g.done && (_h = _f.return)) _h.call(_f);
                                    }
                                    finally { if (e_29) throw e_29.error; }
                                }
                                this.addGameObject(new wall_5.Ladder(instance.name, points));
                            }
                            else if (instance.objectName === "No Scroll") {
                                var points = [];
                                try {
                                    for (var _j = __values(instance.points), _k = _j.next(); !_k.done; _k = _j.next()) {
                                        var point = _k.value;
                                        points.push(new point_6.Point(point.x, point.y));
                                    }
                                }
                                catch (e_30_1) { e_30 = { error: e_30_1 }; }
                                finally {
                                    try {
                                        if (_k && !_k.done && (_l = _j.return)) _l.call(_j);
                                    }
                                    finally { if (e_30) throw e_30.error; }
                                }
                                var shape = new shape_1.Shape(points);
                                var dir = void 0;
                                if (instance.properties) {
                                    if (instance.properties.freeDir === "up")
                                        dir = noScroll_1.Direction.Up;
                                    if (instance.properties.freeDir === "down")
                                        dir = noScroll_1.Direction.Down;
                                    if (instance.properties.freeDir === "left")
                                        dir = noScroll_1.Direction.Left;
                                    if (instance.properties.freeDir === "right")
                                        dir = noScroll_1.Direction.Right;
                                }
                                this.noScrolls.push(new noScroll_1.NoScroll(shape, dir));
                            }
                            else if (instance.objectName === "Kill Zone") {
                                var points = [];
                                try {
                                    for (var _m = __values(instance.points), _o = _m.next(); !_o.done; _o = _m.next()) {
                                        var point = _o.value;
                                        points.push(new point_6.Point(point.x, point.y));
                                    }
                                }
                                catch (e_31_1) { e_31 = { error: e_31_1 }; }
                                finally {
                                    try {
                                        if (_o && !_o.done && (_p = _m.return)) _p.call(_m);
                                    }
                                    finally { if (e_31) throw e_31.error; }
                                }
                                var killZone = new wall_5.KillZone(instance.name, points);
                                this.addGameObject(killZone);
                            }
                            else if (instance.objectName === "Jump Zone") {
                                var points = [];
                                try {
                                    for (var _q = __values(instance.points), _r = _q.next(); !_r.done; _r = _q.next()) {
                                        var point = _r.value;
                                        points.push(new point_6.Point(point.x, point.y));
                                    }
                                }
                                catch (e_32_1) { e_32 = { error: e_32_1 }; }
                                finally {
                                    try {
                                        if (_r && !_r.done && (_s = _q.return)) _s.call(_q);
                                    }
                                    finally { if (e_32) throw e_32.error; }
                                }
                                var jumpZone = new wall_5.JumpZone(instance.name, points);
                                this.addGameObject(jumpZone);
                            }
                            else if (instance.objectName === "Spawn Point") {
                                var properties = instance.properties;
                                this.spawnPoints.push(new spawnPoint_1.SpawnPoint(instance.name, new point_6.Point(instance.pos.x, instance.pos.y), properties.xDir, properties.num));
                            }
                            else if (instance.objectName === "Node") {
                                var name_1 = instance.name;
                                var pos = new point_6.Point(instance.pos.x, instance.pos.y);
                                var node = new navMesh_1.NavMeshNode(name_1, pos, instance.properties);
                                this.navMeshNodes.push(node);
                            }
                            else if (instance.objectName === "Large Health") {
                                this.pickupSpawners.push(new pickup_2.PickupSpawner(new point_6.Point(instance.pos.x, instance.pos.y), pickup_2.LargeHealthPickup));
                            }
                            else if (instance.objectName === "Small Health") {
                                this.pickupSpawners.push(new pickup_2.PickupSpawner(new point_6.Point(instance.pos.x, instance.pos.y), pickup_2.SmallHealthPickup));
                            }
                            else if (instance.objectName === "Large Ammo") {
                                this.pickupSpawners.push(new pickup_2.PickupSpawner(new point_6.Point(instance.pos.x, instance.pos.y), pickup_2.LargeAmmoPickup));
                            }
                            else if (instance.objectName === "Small Ammo") {
                                this.pickupSpawners.push(new pickup_2.PickupSpawner(new point_6.Point(instance.pos.x, instance.pos.y), pickup_2.SmallAmmoPickup));
                            }
                            else {
                                var actor = new actor_6.Actor(instance.spriteName, new point_6.Point(instance.pos.x, instance.pos.y));
                                actor.name = instance.name;
                                this.addGameObject(actor);
                            }
                        }
                    }
                    catch (e_33_1) { e_33 = { error: e_33_1 }; }
                    finally {
                        try {
                            if (_b && !_b.done && (_t = _a.return)) _t.call(_a);
                        }
                        finally { if (e_33) throw e_33.error; }
                    }
                    try {
                        for (var _u = __values(this.navMeshNodes), _v = _u.next(); !_v.done; _v = _u.next()) {
                            var navMeshNode = _v.value;
                            navMeshNode.setNeighbors(this.navMeshNodes, this.getGameObjectArray());
                        }
                    }
                    catch (e_34_1) { e_34 = { error: e_34_1 }; }
                    finally {
                        try {
                            if (_v && !_v.done && (_w = _u.return)) _w.call(_u);
                        }
                        finally { if (e_34) throw e_34.error; }
                    }
                    this.twoFrameCycle = 0;
                    this.gameMode = gameMode;
                    if (this.levelData.levelMusic) {
                        if (game_14.game.music) {
                            game_14.game.music.stop();
                        }
                        var music_1 = new Howl({
                            src: [this.levelData.levelMusic],
                            sprite: {
                                musicStart: [0, this.levelData.musicLoopStart],
                                musicLoop: [this.levelData.musicLoopStart, this.levelData.musicLoopEnd - this.levelData.musicLoopStart]
                            },
                            onload: function () {
                            }
                        });
                        window.setTimeout(function () {
                            music_1.play("musicStart");
                            music_1.on("end", function () {
                                music_1.play("musicLoop");
                            });
                        }, 1000);
                        game_14.game.music = music_1;
                    }
                    this.hud = new hud_1.HUD(this);
                    this.gameMode.createHUD();
                    var e_33, _t, e_28, _e, e_29, _h, e_30, _l, e_31, _p, e_32, _s, e_34, _w;
                };
                Level.prototype.getGameObjectArray = function () {
                    return Array.from(this.gameObjects);
                };
                Level.prototype.input = function () {
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
                };
                Level.prototype.update = function () {
                    if (game_14.game.music) {
                        game_14.game.music.volume((game_14.game.options.playMusic ? game_14.game.getMusicVolume01() : 0));
                    }
                    this.gameMode.checkIfWin();
                    var playerX = 0;
                    var playerY = 0;
                    if (this.mainPlayer.character) {
                        playerX = this.mainPlayer.character.pos.x;
                        playerY = this.mainPlayer.character.pos.y;
                    }
                    try {
                        for (var _a = __values(this.gameObjects), _b = _a.next(); !_b.done; _b = _a.next()) {
                            var go = _b.value;
                            go.preUpdate();
                            go.update();
                        }
                    }
                    catch (e_35_1) { e_35 = { error: e_35_1 }; }
                    finally {
                        try {
                            if (_b && !_b.done && (_c = _a.return)) _c.call(_a);
                        }
                        finally { if (e_35) throw e_35.error; }
                    }
                    try {
                        for (var _d = __values(this.anims), _e = _d.next(); !_e.done; _e = _d.next()) {
                            var anim = _e.value;
                            anim.preUpdate();
                            anim.update();
                        }
                    }
                    catch (e_36_1) { e_36 = { error: e_36_1 }; }
                    finally {
                        try {
                            if (_e && !_e.done && (_f = _d.return)) _f.call(_d);
                        }
                        finally { if (e_36) throw e_36.error; }
                    }
                    if (this.mainPlayer.character) {
                        var deltaX = this.mainPlayer.character.pos.x - playerX;
                        var deltaY = this.mainPlayer.character.pos.y - playerY;
                        this.updateCamPos(deltaX, deltaY);
                    }
                    try {
                        for (var _g = __values(this.effects), _h = _g.next(); !_h.done; _h = _g.next()) {
                            var effect = _h.value;
                            effect.update();
                        }
                    }
                    catch (e_37_1) { e_37 = { error: e_37_1 }; }
                    finally {
                        try {
                            if (_h && !_h.done && (_j = _g.return)) _j.call(_g);
                        }
                        finally { if (e_37) throw e_37.error; }
                    }
                    try {
                        for (var _k = __values(this.localPlayers), _l = _k.next(); !_l.done; _l = _k.next()) {
                            var player = _l.value;
                            player.clearInputPressed();
                            if (player.isAI) {
                                player.clearAiInput();
                            }
                        }
                    }
                    catch (e_38_1) { e_38 = { error: e_38_1 }; }
                    finally {
                        try {
                            if (_l && !_l.done && (_m = _k.return)) _m.call(_k);
                        }
                        finally { if (e_38) throw e_38.error; }
                    }
                    try {
                        for (var _o = __values(this.players), _p = _o.next(); !_p.done; _p = _o.next()) {
                            var player = _p.value;
                            player.update();
                        }
                    }
                    catch (e_39_1) { e_39 = { error: e_39_1 }; }
                    finally {
                        try {
                            if (_p && !_p.done && (_q = _o.return)) _q.call(_o);
                        }
                        finally { if (e_39) throw e_39.error; }
                    }
                    try {
                        for (var _r = __values(this.pickupSpawners), _s = _r.next(); !_s.done; _s = _r.next()) {
                            var pickupSpawner = _s.value;
                            pickupSpawner.update();
                        }
                    }
                    catch (e_40_1) { e_40 = { error: e_40_1 }; }
                    finally {
                        try {
                            if (_s && !_s.done && (_t = _r.return)) _t.call(_r);
                        }
                        finally { if (e_40) throw e_40.error; }
                    }
                    this.frameCount++;
                    this.twoFrameCycle++;
                    if (this.twoFrameCycle > 2)
                        this.twoFrameCycle = -2;
                    this.gameMode.update();
                    var e_35, _c, e_36, _f, e_37, _j, e_38, _m, e_39, _q, e_40, _t;
                };
                Level.prototype.renderSetup = function () {
                    if (this.parallaxPath) {
                        this.parallaxSprite = new PIXI.Sprite(PIXI.loader.resources[this.parallaxPath].texture);
                        game_14.game.pixiApp.stage.addChild(this.parallaxSprite);
                    }
                    this.gameContainer = new PIXI.Container();
                    game_14.game.pixiApp.stage.addChild(this.gameContainer);
                    if (this.backgroundPath) {
                        this.backgroundSprite = new PIXI.Sprite(PIXI.loader.resources[this.backgroundPath].texture);
                        this.backgroundSprite.zIndex = this.zBackground;
                        this.gameContainer.addChild(this.backgroundSprite);
                    }
                    this.foregroundContainer = new PIXI.Container();
                    game_14.game.pixiApp.stage.addChild(this.foregroundContainer);
                    if (this.foregroundPath) {
                        this.foregroundSprite = new PIXI.Sprite(PIXI.loader.resources[this.foregroundPath].texture);
                        this.foregroundContainer.addChild(this.foregroundSprite);
                    }
                    this.gameUIContainer = new PIXI.Container();
                    game_14.game.pixiApp.stage.addChild(this.gameUIContainer);
                    this.uiContainer = new PIXI.Container();
                    game_14.game.pixiApp.stage.addChild(this.uiContainer);
                    if (this.levelData.fixedCam) {
                        var w = this.backgroundSprite.width * this.zoomScale;
                        var h = this.backgroundSprite.height * this.zoomScale;
                        game_14.game.pixiApp.renderer.resize(w, h);
                        game_14.game.uiCanvas.width = w;
                        game_14.game.uiCanvas.height = h;
                        game_14.game.pixiApp.renderer.view.style.width = w + "px";
                        game_14.game.pixiApp.renderer.view.style.height = h + "px";
                        game_14.game.pixiApp.renderer.resize(w, h);
                        game_14.game.pixiApp.stage.scale.set(this.zoomScale);
                    }
                    else {
                        var w = Math.min(game_14.game.defaultCanvasWidth * this.zoomScale, Math.round(this.backgroundSprite.width * this.zoomScale));
                        var h = Math.min(game_14.game.defaultCanvasHeight * this.zoomScale, Math.round(this.backgroundSprite.height * this.zoomScale));
                        game_14.game.pixiApp.renderer.resize(w, h);
                        game_14.game.uiCanvas.width = w;
                        game_14.game.uiCanvas.height = h;
                        game_14.game.pixiApp.renderer.view.style.width = w + "px";
                        game_14.game.pixiApp.renderer.view.style.height = h + "px";
                        game_14.game.pixiApp.renderer.resize(w, h);
                        game_14.game.pixiApp.stage.scale.set(this.zoomScale);
                    }
                };
                Level.prototype.render = function () {
                    this.gameContainer.x = 0;
                    this.gameContainer.y = 0;
                    this.backgroundSprite.x = -this.camX;
                    this.backgroundSprite.y = -this.camY;
                    this.foregroundContainer.x = -this.camX;
                    this.foregroundContainer.y = -this.camY;
                    this.gameUIContainer.x = -this.camX;
                    this.gameUIContainer.y = -this.camY;
                    if (this.parallaxSprite) {
                        this.parallaxSprite.x = -this.camX * 0.5;
                        this.parallaxSprite.y = -this.camY * 0.5;
                    }
                    this.gameContainer.children.sort(function (a, b) {
                        var bIndex = b.zIndex || 0;
                        var aIndex = a.zIndex || 0;
                        return aIndex - bIndex;
                    });
                    try {
                        for (var _a = __values(this.gameObjects), _b = _a.next(); !_b.done; _b = _a.next()) {
                            var go = _b.value;
                            go.render(-this.camX, -this.camY);
                        }
                    }
                    catch (e_41_1) { e_41 = { error: e_41_1 }; }
                    finally {
                        try {
                            if (_b && !_b.done && (_c = _a.return)) _c.call(_a);
                        }
                        finally { if (e_41) throw e_41.error; }
                    }
                    try {
                        for (var _d = __values(this.anims), _e = _d.next(); !_e.done; _e = _d.next()) {
                            var anim = _e.value;
                            anim.render(-this.camX, -this.camY);
                        }
                    }
                    catch (e_42_1) { e_42 = { error: e_42_1 }; }
                    finally {
                        try {
                            if (_e && !_e.done && (_f = _d.return)) _f.call(_d);
                        }
                        finally { if (e_42) throw e_42.error; }
                    }
                    try {
                        for (var _g = __values(this.effects), _h = _g.next(); !_h.done; _h = _g.next()) {
                            var effect = _h.value;
                            effect.render(0, 0);
                        }
                    }
                    catch (e_43_1) { e_43 = { error: e_43_1 }; }
                    finally {
                        try {
                            if (_h && !_h.done && (_j = _g.return)) _j.call(_g);
                        }
                        finally { if (e_43) throw e_43.error; }
                    }
                    this.hud.updateHUD();
                    this.gameMode.drawHUD();
                    Helpers.noCanvasSmoothing(game_14.game.uiCtx);
                    game_14.game.uiCtx.setTransform(this.zoomScale, 0, 0, this.zoomScale, 0, 0);
                    game_14.game.uiCtx.clearRect(0, 0, this.screenWidth, this.screenHeight);
                    if (!game_14.game.uiData.isProd) {
                        Helpers.drawText(game_14.game.uiCtx, this.debugString, 10, 50, "white", "black", 8, "left", "top", "");
                        Helpers.drawText(game_14.game.uiCtx, this.debugString2, 10, 70, "white", "black", 8, "left", "top", "");
                    }
                    var e_41, _c, e_42, _f, e_43, _j;
                };
                Object.defineProperty(Level.prototype, "width", {
                    get: function () { return this.backgroundSprite.width; },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(Level.prototype, "height", {
                    get: function () { return this.backgroundSprite.height; },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(Level.prototype, "screenWidth", {
                    get: function () { return game_14.game.pixiApp.renderer.width / this.zoomScale; },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(Level.prototype, "screenHeight", {
                    get: function () { return game_14.game.pixiApp.renderer.height / this.zoomScale; },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(Level.prototype, "camCenterX", {
                    get: function () { return this.camX + this.screenWidth / 2; },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(Level.prototype, "camCenterY", {
                    get: function () { return this.camY + this.screenHeight / 2; },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(Level.prototype, "halfScreenWidth", {
                    get: function () {
                        return this.screenWidth / 2;
                    },
                    enumerable: true,
                    configurable: true
                });
                Level.prototype.updateCamPos = function (deltaX, deltaY) {
                    var playerX = this.mainPlayer.character.pos.x;
                    var playerY = this.mainPlayer.character.getCamCenterPos().y;
                    var dontMoveX = false;
                    var dontMoveY = false;
                    var scaledCanvasW = game_14.game.defaultCanvasWidth;
                    var scaledCanvasH = game_14.game.defaultCanvasHeight;
                    var maxX = this.width - scaledCanvasW / 2;
                    var maxY = this.height - scaledCanvasH / 2;
                    if (playerX < scaledCanvasW / 2) {
                        dontMoveX = true;
                    }
                    if (playerY < scaledCanvasH / 2) {
                        dontMoveY = true;
                    }
                    if (playerX > maxX) {
                        dontMoveX = true;
                    }
                    if (playerY > maxY) {
                        dontMoveY = true;
                    }
                    if (playerX > this.camX + scaledCanvasW / 2 && deltaX < 0) {
                        dontMoveX = true;
                    }
                    if (playerX < this.camX + scaledCanvasW / 2 && deltaX > 0) {
                        dontMoveX = true;
                    }
                    if (playerY > this.camY + scaledCanvasH / 2 && deltaY < 0) {
                        dontMoveY = true;
                    }
                    if (playerY < this.camY + scaledCanvasH / 2 && deltaY > 0) {
                        dontMoveY = true;
                    }
                    if (!dontMoveX) {
                        this.camX += deltaX;
                    }
                    if (!dontMoveY) {
                        this.camY += deltaY;
                    }
                    var camRect = new rect_4.Rect(this.camX, this.camY, this.camX + scaledCanvasW, this.camY + scaledCanvasH);
                    var camRectShape = camRect.getShape();
                    try {
                        for (var _a = __values(this.noScrolls), _b = _a.next(); !_b.done; _b = _a.next()) {
                            var noScroll = _b.value;
                            if (noScroll.shape.intersectsShape(camRectShape)) {
                                if (noScroll.freeDir === noScroll_1.Direction.Left) {
                                    var mtv = camRectShape.getMinTransVectorDir(noScroll.shape, new point_6.Point(-1, 0));
                                    if (mtv)
                                        this.camX += mtv.x;
                                }
                                else if (noScroll.freeDir === noScroll_1.Direction.Right) {
                                    var mtv = camRectShape.getMinTransVectorDir(noScroll.shape, new point_6.Point(1, 0));
                                    if (mtv)
                                        this.camX += mtv.x;
                                }
                                else if (noScroll.freeDir === noScroll_1.Direction.Up) {
                                    var mtv = camRectShape.getMinTransVectorDir(noScroll.shape, new point_6.Point(0, -1));
                                    if (mtv)
                                        this.camY += mtv.y;
                                }
                                else if (noScroll.freeDir === noScroll_1.Direction.Down) {
                                    var mtv = camRectShape.getMinTransVectorDir(noScroll.shape, new point_6.Point(0, 1));
                                    if (mtv)
                                        this.camY += mtv.y;
                                }
                            }
                        }
                    }
                    catch (e_44_1) { e_44 = { error: e_44_1 }; }
                    finally {
                        try {
                            if (_b && !_b.done && (_c = _a.return)) _c.call(_a);
                        }
                        finally { if (e_44) throw e_44.error; }
                    }
                    var e_44, _c;
                };
                Level.prototype.computeCamPos = function (character) {
                    var scaledCanvasW = game_14.game.defaultCanvasWidth;
                    var scaledCanvasH = game_14.game.defaultCanvasHeight;
                    var camX = character.getCamCenterPos().x - scaledCanvasW / 2;
                    var camY = character.getCamCenterPos().y - scaledCanvasH / 2;
                    if (camX < 0)
                        camX = 0;
                    if (camY < 0)
                        camY = 0;
                    var maxX = this.width - scaledCanvasW;
                    var maxY = this.height - scaledCanvasH;
                    if (camX > maxX)
                        camX = maxX;
                    if (camY > maxY)
                        camY = maxY;
                    this.camX = camX;
                    this.camY = camY;
                };
                Level.prototype.getTotalCountInGrid = function () {
                    var count = 0;
                    var orphanedCount = 0;
                    var width = this.width;
                    var height = this.height;
                    var hCellCount = Math.ceil(width / this.cellWidth);
                    var vCellCount = Math.ceil(height / this.cellWidth);
                    for (var i = 0; i < vCellCount; i++) {
                        for (var j = 0; j < hCellCount; j++) {
                            count += this.grid[i][j].size;
                            var arr = Array.from(this.grid[i][j]);
                            try {
                                for (var arr_1 = __values(arr), arr_1_1 = arr_1.next(); !arr_1_1.done; arr_1_1 = arr_1.next()) {
                                    var go = arr_1_1.value;
                                    if (!this.gameObjects.has(go)) {
                                        orphanedCount++;
                                    }
                                }
                            }
                            catch (e_45_1) { e_45 = { error: e_45_1 }; }
                            finally {
                                try {
                                    if (arr_1_1 && !arr_1_1.done && (_a = arr_1.return)) _a.call(arr_1);
                                }
                                finally { if (e_45) throw e_45.error; }
                            }
                        }
                    }
                    this.debugString = String(count);
                    this.debugString2 = String(orphanedCount);
                    var e_45, _a;
                };
                Level.prototype.setupGrid = function (cellWidth) {
                    this.cellWidth = cellWidth;
                    var width = this.width;
                    var height = this.height;
                    var hCellCount = Math.ceil(width / cellWidth);
                    var vCellCount = Math.ceil(height / cellWidth);
                    for (var i = 0; i < vCellCount; i++) {
                        var curRow = [];
                        this.grid.push(curRow);
                        for (var j = 0; j < hCellCount; j++) {
                            curRow.push(new Set());
                        }
                    }
                };
                Level.prototype.getGridCells = function (shape, offsetX, offsetY) {
                    var cells = [];
                    if (shape.points.length === 2) {
                        var point1 = shape.points[0];
                        var point2 = shape.points[1];
                        var dir = point1.directionTo(point2);
                        var curX = point1.x;
                        var curY = point1.y;
                        var dist = 0;
                        var maxDist = point1.distanceTo(point2);
                        var mag = maxDist / (this.cellWidth / 2);
                        var usedCoords = new Set();
                        while (dist < maxDist) {
                            curX += dir.x * mag;
                            curY += dir.y * mag;
                            var i = Math.floor((curY / this.height) * this.grid.length);
                            var j = Math.floor((curX / this.width) * this.grid[0].length);
                            dist += mag;
                            if (i < 0 || j < 0 || i >= this.grid.length || j >= this.grid[0].length)
                                continue;
                            if (usedCoords.has(String(i) + String(j)))
                                continue;
                            usedCoords.add(String(i) + String(j));
                            cells.push(new Cell(i, j, this.grid[i][j]));
                        }
                        return cells;
                    }
                    var minI = Math.floor((shape.minY / this.height) * this.grid.length);
                    var minJ = Math.floor((shape.minX / this.width) * this.grid[0].length);
                    var maxI = Math.floor((shape.maxY / this.height) * this.grid.length);
                    var maxJ = Math.floor((shape.maxX / this.width) * this.grid[0].length);
                    for (var i = minI; i <= maxI; i++) {
                        for (var j = minJ; j <= maxJ; j++) {
                            if (i < 0 || j < 0 || i >= this.grid.length || j >= this.grid[0].length)
                                continue;
                            cells.push(new Cell(i, j, this.grid[i][j]));
                        }
                    }
                    return cells;
                };
                Level.prototype.getGameObjectsInSameCell = function (shape, offsetX, offsetY) {
                    var cells = this.getGridCells(shape, offsetX, offsetY);
                    var retGameobjects = new Set();
                    try {
                        for (var cells_1 = __values(cells), cells_1_1 = cells_1.next(); !cells_1_1.done; cells_1_1 = cells_1.next()) {
                            var cell = cells_1_1.value;
                            if (!cell.gameobjects)
                                continue;
                            try {
                                for (var _a = __values(cell.gameobjects), _b = _a.next(); !_b.done; _b = _a.next()) {
                                    var cell2 = _b.value;
                                    if (this.gameObjects.has(cell2)) {
                                        retGameobjects.add(cell2);
                                    }
                                    else {
                                        this.gameObjects.delete(cell2);
                                    }
                                }
                            }
                            catch (e_46_1) { e_46 = { error: e_46_1 }; }
                            finally {
                                try {
                                    if (_b && !_b.done && (_c = _a.return)) _c.call(_a);
                                }
                                finally { if (e_46) throw e_46.error; }
                            }
                        }
                    }
                    catch (e_47_1) { e_47 = { error: e_47_1 }; }
                    finally {
                        try {
                            if (cells_1_1 && !cells_1_1.done && (_d = cells_1.return)) _d.call(cells_1);
                        }
                        finally { if (e_47) throw e_47.error; }
                    }
                    var arr = [];
                    try {
                        for (var retGameobjects_1 = __values(retGameobjects), retGameobjects_1_1 = retGameobjects_1.next(); !retGameobjects_1_1.done; retGameobjects_1_1 = retGameobjects_1.next()) {
                            var go = retGameobjects_1_1.value;
                            arr.push(go);
                        }
                    }
                    catch (e_48_1) { e_48 = { error: e_48_1 }; }
                    finally {
                        try {
                            if (retGameobjects_1_1 && !retGameobjects_1_1.done && (_e = retGameobjects_1.return)) _e.call(retGameobjects_1);
                        }
                        finally { if (e_48) throw e_48.error; }
                    }
                    return arr;
                    var e_47, _d, e_46, _c, e_48, _e;
                };
                Level.prototype.addGameObject = function (go) {
                    this.gameObjects.add(go);
                    this.addGameObjectToGrid(go);
                };
                Level.prototype.removeGameObject = function (go) {
                    this.removeFromGrid(go);
                    this.gameObjects.delete(go);
                };
                Level.prototype.removeFromGrid = function (go) {
                    try {
                        for (var _a = __values(this.occupiedGridSets), _b = _a.next(); !_b.done; _b = _a.next()) {
                            var gridSet = _b.value;
                            if (gridSet.has(go)) {
                                gridSet.delete(go);
                            }
                            if (gridSet.size === 0) {
                                this.occupiedGridSets.delete(gridSet);
                            }
                        }
                    }
                    catch (e_49_1) { e_49 = { error: e_49_1 }; }
                    finally {
                        try {
                            if (_b && !_b.done && (_c = _a.return)) _c.call(_a);
                        }
                        finally { if (e_49) throw e_49.error; }
                    }
                    var e_49, _c;
                };
                Level.prototype.removeFromGridFast = function (go) {
                    if (!go.collider)
                        return;
                    var cells = this.getGridCells(go.collider.shape, 0, 0);
                    try {
                        for (var cells_2 = __values(cells), cells_2_1 = cells_2.next(); !cells_2_1.done; cells_2_1 = cells_2.next()) {
                            var cell = cells_2_1.value;
                            if (cell.gameobjects.has(go)) {
                                cell.gameobjects.delete(go);
                            }
                        }
                    }
                    catch (e_50_1) { e_50 = { error: e_50_1 }; }
                    finally {
                        try {
                            if (cells_2_1 && !cells_2_1.done && (_a = cells_2.return)) _a.call(cells_2);
                        }
                        finally { if (e_50) throw e_50.error; }
                    }
                    var e_50, _a;
                };
                Level.prototype.addGameObjectToGrid = function (go) {
                    if (!go.collider)
                        return;
                    if (!this.gameObjects.has(go))
                        return;
                    var cells = this.getGridCells(go.collider.shape, 0, 0);
                    try {
                        for (var cells_3 = __values(cells), cells_3_1 = cells_3.next(); !cells_3_1.done; cells_3_1 = cells_3.next()) {
                            var cell = cells_3_1.value;
                            if (!this.grid[cell.i][cell.j].has(go)) {
                                this.grid[cell.i][cell.j].add(go);
                                this.occupiedGridSets.add(this.grid[cell.i][cell.j]);
                            }
                        }
                    }
                    catch (e_51_1) { e_51 = { error: e_51_1 }; }
                    finally {
                        try {
                            if (cells_3_1 && !cells_3_1.done && (_a = cells_3.return)) _a.call(cells_3);
                        }
                        finally { if (e_51) throw e_51.error; }
                    }
                    var e_51, _a;
                };
                Level.prototype.hasGameObject = function (go) {
                    return this.gameObjects.has(go);
                };
                Level.prototype.addEffect = function (effect) {
                    this.effects.push(effect);
                };
                Level.prototype.shouldTrigger = function (actor, gameObject, offset) {
                    if (!actor.collider.isTrigger && gameObject instanceof wall_5.Ladder) {
                        if (actor.pos.y < gameObject.collider.shape.getRect().y1 && offset.y > 0) {
                            if (actor instanceof character_5.Character && !actor.checkLadderDown) {
                                return false;
                            }
                        }
                    }
                    if (actor.collider.isTrigger || gameObject.collider.isTrigger)
                        return true;
                    if (actor.collider.wallOnly && !(gameObject instanceof wall_5.Wall))
                        return true;
                    if (gameObject instanceof actor_6.Actor) {
                        if (gameObject.collider.wallOnly)
                            return true;
                    }
                    if (actor instanceof character_5.Character && gameObject instanceof character_5.Character && actor.player.alliance === gameObject.player.alliance) {
                        return true;
                    }
                    return false;
                };
                Level.prototype.getAllCollideDatas = function (actor, offsetX, offsetY, vel) {
                    var actorShape = actor.collider.shape.clone(offsetX, offsetY);
                    var collideDatas = [];
                    var gameObjects = this.getGameObjectsInSameCell(actor.collider.shape, offsetX, offsetY);
                    try {
                        for (var gameObjects_1 = __values(gameObjects), gameObjects_1_1 = gameObjects_1.next(); !gameObjects_1_1.done; gameObjects_1_1 = gameObjects_1.next()) {
                            var go = gameObjects_1_1.value;
                            if (!go.collider)
                                continue;
                            if (go === actor)
                                continue;
                            if (this.shouldTrigger(actor, go, new point_6.Point(offsetX, offsetY)))
                                continue;
                            var hitData = actorShape.intersectsShape(go.collider.shape, vel);
                            if (hitData) {
                                var collideData = new collider_4.CollideData(go.collider, vel, false, go, hitData);
                                collideDatas.push(collideData);
                            }
                        }
                    }
                    catch (e_52_1) { e_52 = { error: e_52_1 }; }
                    finally {
                        try {
                            if (gameObjects_1_1 && !gameObjects_1_1.done && (_a = gameObjects_1.return)) _a.call(gameObjects_1);
                        }
                        finally { if (e_52) throw e_52.error; }
                    }
                    return collideDatas;
                    var e_52, _a;
                };
                Level.prototype.getMtvDir = function (actor, offsetX, offsetY, vel, pushIncline, overrideCollideDatas) {
                    var collideDatas = overrideCollideDatas;
                    if (!collideDatas) {
                        collideDatas = game_14.game.level.getAllCollideDatas(actor, offsetX, offsetY, vel);
                    }
                    var actorShape = actor.collider.shape.clone(offsetX, offsetY);
                    var pushDir = vel.times(-1).normalize();
                    if (collideDatas.length > 0) {
                        try {
                            for (var collideDatas_1 = __values(collideDatas), collideDatas_1_1 = collideDatas_1.next(); !collideDatas_1_1.done; collideDatas_1_1 = collideDatas_1.next()) {
                                var collideData = collideDatas_1_1.value;
                                if (collideData.hitData && collideData.hitData.normal && collideData.hitData.normal.isAngled() && pushIncline) {
                                    pushDir = new point_6.Point(0, -1);
                                }
                            }
                        }
                        catch (e_53_1) { e_53 = { error: e_53_1 }; }
                        finally {
                            try {
                                if (collideDatas_1_1 && !collideDatas_1_1.done && (_a = collideDatas_1.return)) _a.call(collideDatas_1);
                            }
                            finally { if (e_53) throw e_53.error; }
                        }
                    }
                    if (collideDatas.length > 0) {
                        var maxMag = 0;
                        var maxMtv = void 0;
                        try {
                            for (var collideDatas_2 = __values(collideDatas), collideDatas_2_1 = collideDatas_2.next(); !collideDatas_2_1.done; collideDatas_2_1 = collideDatas_2.next()) {
                                var collideData = collideDatas_2_1.value;
                                actor.registerCollision(collideData);
                                var mtv = actorShape.getMinTransVectorDir(collideData.collider.shape, pushDir);
                                if (mtv && mtv.magnitude >= maxMag) {
                                    maxMag = mtv.magnitude;
                                    maxMtv = mtv;
                                }
                            }
                        }
                        catch (e_54_1) { e_54 = { error: e_54_1 }; }
                        finally {
                            try {
                                if (collideDatas_2_1 && !collideDatas_2_1.done && (_b = collideDatas_2.return)) _b.call(collideDatas_2);
                            }
                            finally { if (e_54) throw e_54.error; }
                        }
                        return maxMtv;
                    }
                    else {
                        return undefined;
                    }
                    var e_53, _a, e_54, _b;
                };
                Level.prototype.checkCollisionShape = function (shape, exclusions) {
                    var gameObjects = this.getGameObjectsInSameCell(shape, 0, 0);
                    try {
                        for (var gameObjects_2 = __values(gameObjects), gameObjects_2_1 = gameObjects_2.next(); !gameObjects_2_1.done; gameObjects_2_1 = gameObjects_2.next()) {
                            var go = gameObjects_2_1.value;
                            if (!go.collider)
                                continue;
                            if (exclusions.indexOf(go) !== -1)
                                continue;
                            var hitData = shape.intersectsShape(go.collider.shape);
                            if (hitData) {
                                return new collider_4.CollideData(go.collider, undefined, false, go, hitData);
                            }
                        }
                    }
                    catch (e_55_1) { e_55 = { error: e_55_1 }; }
                    finally {
                        try {
                            if (gameObjects_2_1 && !gameObjects_2_1.done && (_a = gameObjects_2.return)) _a.call(gameObjects_2);
                        }
                        finally { if (e_55) throw e_55.error; }
                    }
                    return undefined;
                    var e_55, _a;
                };
                Level.prototype.checkCollisionActor = function (actor, offsetX, offsetY, vel) {
                    if (!actor.collider || actor.collider.isTrigger)
                        return undefined;
                    var actorShape = actor.collider.shape.clone(offsetX, offsetY);
                    var gameObjects = this.getGameObjectsInSameCell(actor.collider.shape, offsetX, offsetY);
                    try {
                        for (var gameObjects_3 = __values(gameObjects), gameObjects_3_1 = gameObjects_3.next(); !gameObjects_3_1.done; gameObjects_3_1 = gameObjects_3.next()) {
                            var go = gameObjects_3_1.value;
                            if (go === actor)
                                continue;
                            if (!go.collider)
                                continue;
                            var isTrigger = this.shouldTrigger(actor, go, new point_6.Point(offsetX, offsetY));
                            if (isTrigger)
                                continue;
                            var hitData = actorShape.intersectsShape(go.collider.shape, vel);
                            if (hitData) {
                                return new collider_4.CollideData(go.collider, vel, isTrigger, go, hitData);
                            }
                        }
                    }
                    catch (e_56_1) { e_56 = { error: e_56_1 }; }
                    finally {
                        try {
                            if (gameObjects_3_1 && !gameObjects_3_1.done && (_a = gameObjects_3.return)) _a.call(gameObjects_3);
                        }
                        finally { if (e_56) throw e_56.error; }
                    }
                    return undefined;
                    var e_56, _a;
                };
                Level.prototype.getActorsInRadius = function (pos, radius, classNames) {
                    var actors = [];
                    try {
                        for (var _a = __values(this.gameObjects), _b = _a.next(); !_b.done; _b = _a.next()) {
                            var go = _b.value;
                            if (!(go instanceof actor_6.Actor))
                                continue;
                            if (!this.isOfClass(go, classNames))
                                continue;
                            if (go.pos.distanceTo(pos) < radius) {
                                actors.push(go);
                            }
                        }
                    }
                    catch (e_57_1) { e_57 = { error: e_57_1 }; }
                    finally {
                        try {
                            if (_b && !_b.done && (_c = _a.return)) _c.call(_a);
                        }
                        finally { if (e_57) throw e_57.error; }
                    }
                    return actors;
                    var e_57, _c;
                };
                Level.prototype.getTriggerList = function (actor, offsetX, offsetY, vel, classType) {
                    var triggers = [];
                    if (!actor.collider)
                        return triggers;
                    var actorShape = actor.collider.shape.clone(offsetX, offsetY);
                    var gameObjects = this.getGameObjectsInSameCell(actor.collider.shape, offsetX, offsetY);
                    try {
                        for (var gameObjects_4 = __values(gameObjects), gameObjects_4_1 = gameObjects_4.next(); !gameObjects_4_1.done; gameObjects_4_1 = gameObjects_4.next()) {
                            var go = gameObjects_4_1.value;
                            if (go === actor)
                                continue;
                            if (!go.collider)
                                continue;
                            if (classType && !(go instanceof classType)) {
                                continue;
                            }
                            var isTrigger = this.shouldTrigger(actor, go, new point_6.Point(offsetX, offsetY));
                            if (!isTrigger)
                                continue;
                            var hitData = actorShape.intersectsShape(go.collider.shape, vel);
                            if (hitData) {
                                triggers.push(new collider_4.CollideData(go.collider, vel, isTrigger, go, hitData));
                            }
                        }
                    }
                    catch (e_58_1) { e_58 = { error: e_58_1 }; }
                    finally {
                        try {
                            if (gameObjects_4_1 && !gameObjects_4_1.done && (_a = gameObjects_4.return)) _a.call(gameObjects_4);
                        }
                        finally { if (e_58) throw e_58.error; }
                    }
                    return triggers;
                    var e_58, _a;
                };
                Level.prototype.isOfClass = function (go, classNames) {
                    if (!classNames || classNames.length === 0)
                        return true;
                    var found = false;
                    try {
                        for (var classNames_1 = __values(classNames), classNames_1_1 = classNames_1.next(); !classNames_1_1.done; classNames_1_1 = classNames_1.next()) {
                            var className = classNames_1_1.value;
                            if (go.constructor.name === className) {
                                found = true;
                                break;
                            }
                        }
                    }
                    catch (e_59_1) { e_59 = { error: e_59_1 }; }
                    finally {
                        try {
                            if (classNames_1_1 && !classNames_1_1.done && (_a = classNames_1.return)) _a.call(classNames_1);
                        }
                        finally { if (e_59) throw e_59.error; }
                    }
                    return found;
                    var e_59, _a;
                };
                Level.prototype.raycastAll = function (pos1, pos2, classNames) {
                    var hits = [];
                    var shape = new shape_1.Shape([pos1, pos2]);
                    var gameObjects = this.getGameObjectsInSameCell(shape, 0, 0);
                    try {
                        for (var gameObjects_5 = __values(gameObjects), gameObjects_5_1 = gameObjects_5.next(); !gameObjects_5_1.done; gameObjects_5_1 = gameObjects_5.next()) {
                            var go = gameObjects_5_1.value;
                            if (!go.collider)
                                continue;
                            if (!this.isOfClass(go, classNames))
                                continue;
                            var collideDatas = go.collider.shape.getLineIntersectCollisions(new shape_1.Line(pos1, pos2));
                            var closestCollideData = _.minBy(collideDatas, function (collideData) {
                                return collideData.hitData.hitPoint.distanceTo(pos1);
                            });
                            if (closestCollideData) {
                                closestCollideData.collider = go.collider;
                                closestCollideData.gameObject = go;
                                hits.push(closestCollideData);
                            }
                        }
                    }
                    catch (e_60_1) { e_60 = { error: e_60_1 }; }
                    finally {
                        try {
                            if (gameObjects_5_1 && !gameObjects_5_1.done && (_a = gameObjects_5.return)) _a.call(gameObjects_5);
                        }
                        finally { if (e_60) throw e_60.error; }
                    }
                    return hits;
                    var e_60, _a;
                };
                Level.prototype.getClosestTarget = function (pos, alliance) {
                    var _this = this;
                    var players = _.filter(this.players, function (player) {
                        if (!player.character)
                            return false;
                        if (player.alliance === alliance)
                            return false;
                        if (!_this.noWallsInBetween(pos, player.character.pos))
                            return false;
                        return true;
                    });
                    var closestPlayer = _.minBy(players, function (player) {
                        return player.character.pos.distanceTo(pos);
                    });
                    return closestPlayer ? closestPlayer.character : undefined;
                };
                Level.prototype.noWallsInBetween = function (pos1, pos2) {
                    var hits = this.raycastAll(pos1, pos2, ["Wall"]);
                    if (hits.length === 0) {
                        return true;
                    }
                    return false;
                };
                Level.prototype.getClosestNodeInSight = function (pos) {
                    var minNode;
                    var minDist = Infinity;
                    try {
                        for (var _a = __values(this.navMeshNodes), _b = _a.next(); !_b.done; _b = _a.next()) {
                            var node = _b.value;
                            if (this.noWallsInBetween(pos, node.pos)) {
                                var dist = pos.distanceTo(node.pos);
                                if (dist < minDist) {
                                    minDist = dist;
                                    minNode = node;
                                }
                            }
                        }
                    }
                    catch (e_61_1) { e_61 = { error: e_61_1 }; }
                    finally {
                        try {
                            if (_b && !_b.done && (_c = _a.return)) _c.call(_a);
                        }
                        finally { if (e_61) throw e_61.error; }
                    }
                    return minNode;
                    var e_61, _c;
                };
                Level.prototype.getRandomNode = function () {
                    return _.sample(this.navMeshNodes);
                };
                Level.prototype.getSpawnPoint = function (player) {
                    var unoccupied = _.filter(this.spawnPoints, function (spawnPoint) {
                        return !spawnPoint.occupied();
                    });
                    if (game_14.game.level.levelData.fixedCam) {
                        return _.find(unoccupied, function (spawnPoint) {
                            return spawnPoint.num === player.alliance;
                        });
                    }
                    return _.sample(unoccupied);
                };
                return Level;
            }());
            exports_22("Level", Level);
            Cell = (function () {
                function Cell(i, j, gameobjects) {
                    this.i = 0;
                    this.j = 0;
                    this.i = i;
                    this.j = j;
                    this.gameobjects = gameobjects;
                }
                return Cell;
            }());
            exports_22("Cell", Cell);
            LevelData = (function () {
                function LevelData(levelJson) {
                    this.parallax = "";
                    this.foreground = "";
                    this.levelMusic = "";
                    this.maxPlayers = 0;
                    this.levelJson = levelJson;
                    this.name = levelJson.name;
                    if (this.name === "sm_bossroom") {
                        this.fixedCam = true;
                        this.levelMusic = game_14.game.path.bossMusic;
                        this.musicLoopStart = 1500;
                        this.musicLoopEnd = 29664;
                        this.maxPlayers = 2;
                    }
                    else if (this.name === "powerplant") {
                        this.fixedCam = false;
                        this.levelMusic = game_14.game.path.powerPlantMusic;
                        this.parallax = game_14.game.path.powerPlantParallax;
                        this.musicLoopStart = 51040;
                        this.musicLoopEnd = 101116;
                        this.maxPlayers = 8;
                    }
                    else if (this.name === "highway") {
                        this.fixedCam = false;
                        this.levelMusic = game_14.game.path.highwayMusic;
                        this.parallax = game_14.game.path.highwayParallax;
                        this.musicLoopStart = 44440;
                        this.musicLoopEnd = 87463;
                        this.killY = 300;
                        this.foreground = game_14.game.path.highwayForeground;
                        this.maxPlayers = 8;
                    }
                    else if (this.name === "gallery") {
                        this.fixedCam = false;
                        this.levelMusic = game_14.game.path.galleryMusic;
                        this.parallax = game_14.game.path.galleryParallax;
                        this.musicLoopStart = 0;
                        this.musicLoopEnd = 110687;
                        this.killY = 1034;
                        this.foreground = game_14.game.path.galleryForeground;
                        this.maxPlayers = 10;
                    }
                }
                return LevelData;
            }());
            exports_22("LevelData", LevelData);
        }
    };
});
System.register("sprites", [], function (exports_23, context_23) {
    "use strict";
    var __moduleName = context_23 && context_23.id;
    var spriteJsons;
    return {
        setters: [],
        execute: function () {
            spriteJsons = [{ "className": "Sprite", "hitboxes": [{ "className": "Hitbox", "tags": "", "width": 15, "height": 15, "offset": { "className": "Point", "x": 0, "y": 0 }, "rect": { "className": "Rect", "topLeftPoint": { "className": "Point", "x": 342.5, "y": 292.5 }, "botRightPoint": { "className": "Point", "x": 357.5, "y": 307.5 } }, "isTrigger": true }], "frames": [{ "className": "Frame", "rect": { "className": "Rect", "topLeftPoint": { "className": "Point", "x": 9, "y": 925 }, "botRightPoint": { "className": "Point", "x": 24, "y": 939 } }, "duration": 0.03, "offset": { "className": "Point", "x": 0, "y": 0 }, "hitboxes": [], "POIs": [] }, { "className": "Frame", "rect": { "className": "Rect", "topLeftPoint": { "className": "Point", "x": 35, "y": 925 }, "botRightPoint": { "className": "Point", "x": 50, "y": 940 } }, "duration": 0.03, "offset": { "className": "Point", "x": 0, "y": 0 }, "hitboxes": [], "POIs": [] }, { "className": "Frame", "rect": { "className": "Rect", "topLeftPoint": { "className": "Point", "x": 60, "y": 925 }, "botRightPoint": { "className": "Point", "x": 74, "y": 940 } }, "duration": 0.03, "offset": { "className": "Point", "x": 0, "y": 0 }, "hitboxes": [], "POIs": [] }, { "className": "Frame", "rect": { "className": "Rect", "topLeftPoint": { "className": "Point", "x": 82, "y": 925 }, "botRightPoint": { "className": "Point", "x": 97, "y": 940 } }, "duration": 0.03, "offset": { "className": "Point", "x": 0, "y": 0 }, "hitboxes": [], "POIs": [] }, { "className": "Frame", "rect": { "className": "Rect", "topLeftPoint": { "className": "Point", "x": 107, "y": 926 }, "botRightPoint": { "className": "Point", "x": 122, "y": 940 } }, "duration": 0.03, "offset": { "className": "Point", "x": 0, "y": 0 }, "hitboxes": [], "POIs": [] }, { "className": "Frame", "rect": { "className": "Rect", "topLeftPoint": { "className": "Point", "x": 133, "y": 926 }, "botRightPoint": { "className": "Point", "x": 148, "y": 941 } }, "duration": 0.03, "offset": { "className": "Point", "x": 0, "y": 0 }, "hitboxes": [], "POIs": [] }, { "className": "Frame", "rect": { "className": "Rect", "topLeftPoint": { "className": "Point", "x": 155, "y": 926 }, "botRightPoint": { "className": "Point", "x": 169, "y": 941 } }, "duration": 0.03, "offset": { "className": "Point", "x": 0, "y": 0 }, "hitboxes": [], "POIs": [] }, { "className": "Frame", "rect": { "className": "Rect", "topLeftPoint": { "className": "Point", "x": 180, "y": 926 }, "botRightPoint": { "className": "Point", "x": 195, "y": 941 } }, "duration": 0.03, "offset": { "className": "Point", "x": 0, "y": 0 }, "hitboxes": [], "POIs": [] }], "POIs": [], "name": "boomerang", "path": "assets/sprites/boomerang.json", "alignment": "center", "wrapMode": "loop", "spritesheetPath": "assets/spritesheets/effects.png" }, { "className": "Sprite", "hitboxes": [{ "className": "Hitbox", "tags": "", "width": 24, "height": 24, "offset": { "className": "Point", "x": 0, "y": 0 }, "rect": { "className": "Rect", "topLeftPoint": { "className": "Point", "x": 338, "y": 288 }, "botRightPoint": { "className": "Point", "x": 362, "y": 312 } }, "isTrigger": true }], "frames": [{ "className": "Frame", "rect": { "className": "Rect", "topLeftPoint": { "className": "Point", "x": 11, "y": 977 }, "botRightPoint": { "className": "Point", "x": 35, "y": 999 } }, "duration": 0.06, "offset": { "className": "Point", "x": 0, "y": 0 }, "hitboxes": [], "POIs": [] }, { "className": "Frame", "rect": { "className": "Rect", "topLeftPoint": { "className": "Point", "x": 42, "y": 976 }, "botRightPoint": { "className": "Point", "x": 66, "y": 1000 } }, "duration": 0.06, "offset": { "className": "Point", "x": 0, "y": 0 }, "hitboxes": [], "POIs": [] }, { "className": "Frame", "rect": { "className": "Rect", "topLeftPoint": { "className": "Point", "x": 73, "y": 977 }, "botRightPoint": { "className": "Point", "x": 96, "y": 1001 } }, "duration": 0.06, "offset": { "className": "Point", "x": 0, "y": 0 }, "hitboxes": [], "POIs": [] }, { "className": "Frame", "rect": { "className": "Rect", "topLeftPoint": { "className": "Point", "x": 107, "y": 975 }, "botRightPoint": { "className": "Point", "x": 131, "y": 999 } }, "duration": 0.06, "offset": { "className": "Point", "x": 0, "y": 0 }, "hitboxes": [], "POIs": [] }, { "className": "Frame", "rect": { "className": "Rect", "topLeftPoint": { "className": "Point", "x": 139, "y": 977 }, "botRightPoint": { "className": "Point", "x": 163, "y": 999 } }, "duration": 0.06, "offset": { "className": "Point", "x": 0, "y": 0 }, "hitboxes": [], "POIs": [] }, { "className": "Frame", "rect": { "className": "Rect", "topLeftPoint": { "className": "Point", "x": 173, "y": 977 }, "botRightPoint": { "className": "Point", "x": 197, "y": 1001 } }, "duration": 0.06, "offset": { "className": "Point", "x": 0, "y": 0 }, "hitboxes": [], "POIs": [] }, { "className": "Frame", "rect": { "className": "Rect", "topLeftPoint": { "className": "Point", "x": 204, "y": 978 }, "botRightPoint": { "className": "Point", "x": 227, "y": 1002 } }, "duration": 0.06, "offset": { "className": "Point", "x": 0, "y": 0 }, "hitboxes": [], "POIs": [] }, { "className": "Frame", "rect": { "className": "Rect", "topLeftPoint": { "className": "Point", "x": 234, "y": 978 }, "botRightPoint": { "className": "Point", "x": 258, "y": 1002 } }, "duration": 0.06, "offset": { "className": "Point", "x": 0, "y": 0 }, "hitboxes": [], "POIs": [] }], "POIs": [], "name": "boomerang_charge", "path": "assets/sprites/boomerang_charge.json", "alignment": "center", "wrapMode": "loop", "spritesheetPath": "assets/spritesheets/effects.png" }, { "className": "Sprite", "hitboxes": [{ "className": "Hitbox", "tags": "", "width": 24, "height": 24, "offset": { "className": "Point", "x": 0, "y": 0 }, "rect": { "className": "Rect", "topLeftPoint": { "className": "Point", "x": 338, "y": 288 }, "botRightPoint": { "className": "Point", "x": 362, "y": 312 } }, "isTrigger": true }], "frames": [{ "className": "Frame", "rect": { "className": "Rect", "topLeftPoint": { "className": "Point", "x": 11, "y": 947 }, "botRightPoint": { "className": "Point", "x": 35, "y": 969 } }, "duration": 0.066, "offset": { "className": "Point", "x": 0, "y": 0 }, "hitboxes": [], "POIs": [] }, { "className": "Frame", "rect": { "className": "Rect", "topLeftPoint": { "className": "Point", "x": 45, "y": 947 }, "botRightPoint": { "className": "Point", "x": 69, "y": 971 } }, "duration": 0.066, "offset": { "className": "Point", "x": 0, "y": 0 }, "hitboxes": [], "POIs": [] }, { "className": "Frame", "rect": { "className": "Rect", "topLeftPoint": { "className": "Point", "x": 77, "y": 947 }, "botRightPoint": { "className": "Point", "x": 100, "y": 971 } }, "duration": 0.066, "offset": { "className": "Point", "x": 0, "y": 0 }, "hitboxes": [], "POIs": [] }, { "className": "Frame", "rect": { "className": "Rect", "topLeftPoint": { "className": "Point", "x": 109, "y": 946 }, "botRightPoint": { "className": "Point", "x": 133, "y": 970 } }, "duration": 0.066, "offset": { "className": "Point", "x": 0, "y": 0 }, "hitboxes": [], "POIs": [] }, { "className": "Frame", "rect": { "className": "Rect", "topLeftPoint": { "className": "Point", "x": 143, "y": 946 }, "botRightPoint": { "className": "Point", "x": 167, "y": 968 } }, "duration": 0.066, "offset": { "className": "Point", "x": 0, "y": 0 }, "hitboxes": [], "POIs": [] }, { "className": "Frame", "rect": { "className": "Rect", "topLeftPoint": { "className": "Point", "x": 178, "y": 946 }, "botRightPoint": { "className": "Point", "x": 202, "y": 970 } }, "duration": 0.066, "offset": { "className": "Point", "x": 0, "y": 0 }, "hitboxes": [], "POIs": [] }, { "className": "Frame", "rect": { "className": "Rect", "topLeftPoint": { "className": "Point", "x": 210, "y": 945 }, "botRightPoint": { "className": "Point", "x": 233, "y": 969 } }, "duration": 0.066, "offset": { "className": "Point", "x": 0, "y": 0 }, "hitboxes": [], "POIs": [] }, { "className": "Frame", "rect": { "className": "Rect", "topLeftPoint": { "className": "Point", "x": 242, "y": 945 }, "botRightPoint": { "className": "Point", "x": 266, "y": 969 } }, "duration": 0.066, "offset": { "className": "Point", "x": 0, "y": 0 }, "hitboxes": [], "POIs": [] }], "POIs": [], "name": "boomerang_charge2", "path": "assets/sprites/boomerang_charge2.json", "alignment": "center", "wrapMode": "loop", "spritesheetPath": "assets/spritesheets/effects.png" }, { "className": "Sprite", "hitboxes": [{ "className": "Hitbox", "tags": "", "width": 8, "height": 6, "offset": { "className": "Point", "x": 0, "y": 0 }, "rect": { "className": "Rect", "topLeftPoint": { "className": "Point", "x": 346, "y": 297 }, "botRightPoint": { "className": "Point", "x": 354, "y": 303 } }, "isTrigger": true }], "frames": [{ "className": "Frame", "rect": { "className": "Rect", "topLeftPoint": { "className": "Point", "x": 123, "y": 253 }, "botRightPoint": { "className": "Point", "x": 131, "y": 259 } }, "duration": 0.066, "offset": { "className": "Point", "x": 0, "y": 0 }, "hitboxes": [], "POIs": [] }], "POIs": [], "name": "buster1", "path": "assets/sprites/buster1.json", "alignment": "center", "wrapMode": "once", "spritesheetPath": "assets/spritesheets/effects.png" }, { "className": "Sprite", "hitboxes": [], "frames": [{ "className": "Frame", "rect": { "className": "Rect", "topLeftPoint": { "className": "Point", "x": 137, "y": 250 }, "botRightPoint": { "className": "Point", "x": 149, "y": 262 } }, "duration": 0.03, "offset": { "className": "Point", "x": 0, "y": 0 }, "hitboxes": [], "POIs": [] }, { "className": "Frame", "rect": { "className": "Rect", "topLeftPoint": { "className": "Point", "x": 154, "y": 249 }, "botRightPoint": { "className": "Point", "x": 167, "y": 262 } }, "duration": 0.03, "offset": { "className": "Point", "x": 0, "y": 0 }, "hitboxes": [], "POIs": [] }, { "className": "Frame", "rect": { "className": "Rect", "topLeftPoint": { "className": "Point", "x": 172, "y": 248 }, "botRightPoint": { "className": "Point", "x": 187, "y": 263 } }, "duration": 0.03, "offset": { "className": "Point", "x": 0, "y": 0 }, "hitboxes": [], "POIs": [] }], "POIs": [], "name": "buster1_fade", "path": "assets/sprites/buster1_fade.json", "alignment": "center", "wrapMode": "once", "spritesheetPath": "assets/spritesheets/effects.png" }, { "className": "Sprite", "hitboxes": [{ "className": "Hitbox", "tags": "", "width": 22, "height": 8, "offset": { "className": "Point", "x": 5, "y": 0 }, "rect": { "className": "Rect", "topLeftPoint": { "className": "Point", "x": 344, "y": 296 }, "botRightPoint": { "className": "Point", "x": 366, "y": 304 } }, "isTrigger": true }], "frames": [{ "className": "Frame", "rect": { "className": "Rect", "topLeftPoint": { "className": "Point", "x": 138, "y": 274 }, "botRightPoint": { "className": "Point", "x": 153, "y": 288 } }, "duration": 0.03, "offset": { "className": "Point", "x": 0, "y": 0 }, "hitboxes": [], "POIs": [] }, { "className": "Frame", "rect": { "className": "Rect", "topLeftPoint": { "className": "Point", "x": 158, "y": 269 }, "botRightPoint": { "className": "Point", "x": 182, "y": 293 } }, "duration": 0.03, "offset": { "className": "Point", "x": 0, "y": 0 }, "hitboxes": [], "POIs": [] }, { "className": "Frame", "rect": { "className": "Rect", "topLeftPoint": { "className": "Point", "x": 187, "y": 275 }, "botRightPoint": { "className": "Point", "x": 215, "y": 287 } }, "duration": 0.03, "offset": { "className": "Point", "x": 0, "y": 0 }, "hitboxes": [], "POIs": [] }, { "className": "Frame", "rect": { "className": "Rect", "topLeftPoint": { "className": "Point", "x": 221, "y": 277 }, "botRightPoint": { "className": "Point", "x": 253, "y": 285 } }, "duration": 0.03, "offset": { "className": "Point", "x": 0, "y": 0 }, "hitboxes": [], "POIs": [] }, { "className": "Frame", "rect": { "className": "Rect", "topLeftPoint": { "className": "Point", "x": 260, "y": 275 }, "botRightPoint": { "className": "Point", "x": 298, "y": 287 } }, "duration": 0.03, "offset": { "className": "Point", "x": 0, "y": 0 }, "hitboxes": [], "POIs": [] }, { "className": "Frame", "rect": { "className": "Rect", "topLeftPoint": { "className": "Point", "x": 303, "y": 270 }, "botRightPoint": { "className": "Point", "x": 339, "y": 292 } }, "duration": 0.03, "offset": { "className": "Point", "x": 0, "y": 0 }, "hitboxes": [], "POIs": [] }, { "className": "Frame", "rect": { "className": "Rect", "topLeftPoint": { "className": "Point", "x": 344, "y": 275 }, "botRightPoint": { "className": "Point", "x": 382, "y": 287 } }, "duration": 0.03, "offset": { "className": "Point", "x": 0, "y": 0 }, "hitboxes": [], "POIs": [] }, { "className": "Frame", "rect": { "className": "Rect", "topLeftPoint": { "className": "Point", "x": 388, "y": 270 }, "botRightPoint": { "className": "Point", "x": 428, "y": 289 } }, "duration": 0.03, "offset": { "className": "Point", "x": 0, "y": -2 }, "hitboxes": [], "POIs": [] }], "POIs": [], "name": "buster2", "path": "assets/sprites/buster2.json", "alignment": "center", "wrapMode": "loop", "spritesheetPath": "assets/spritesheets/effects.png", "loopStartFrame": 5 }, { "className": "Sprite", "hitboxes": [], "frames": [{ "className": "Frame", "rect": { "className": "Rect", "topLeftPoint": { "className": "Point", "x": 434, "y": 274 }, "botRightPoint": { "className": "Point", "x": 449, "y": 288 } }, "duration": 0.03, "offset": { "className": "Point", "x": 0, "y": 0 }, "hitboxes": [], "POIs": [] }, { "className": "Frame", "rect": { "className": "Rect", "topLeftPoint": { "className": "Point", "x": 454, "y": 269 }, "botRightPoint": { "className": "Point", "x": 478, "y": 293 } }, "duration": 0.03, "offset": { "className": "Point", "x": 0, "y": 0 }, "hitboxes": [], "POIs": [] }, { "className": "Frame", "rect": { "className": "Rect", "topLeftPoint": { "className": "Point", "x": 487, "y": 273 }, "botRightPoint": { "className": "Point", "x": 503, "y": 289 } }, "duration": 0.03, "offset": { "className": "Point", "x": 0, "y": 0 }, "hitboxes": [], "POIs": [] }, { "className": "Frame", "rect": { "className": "Rect", "topLeftPoint": { "className": "Point", "x": 507, "y": 269 }, "botRightPoint": { "className": "Point", "x": 531, "y": 293 } }, "duration": 0.03, "offset": { "className": "Point", "x": 0, "y": 0 }, "hitboxes": [], "POIs": [] }, { "className": "Frame", "rect": { "className": "Rect", "topLeftPoint": { "className": "Point", "x": 535, "y": 273 }, "botRightPoint": { "className": "Point", "x": 551, "y": 289 } }, "duration": 0.03, "offset": { "className": "Point", "x": 0, "y": 0 }, "hitboxes": [], "POIs": [] }, { "className": "Frame", "rect": { "className": "Rect", "topLeftPoint": { "className": "Point", "x": 555, "y": 270 }, "botRightPoint": { "className": "Point", "x": 577, "y": 292 } }, "duration": 0.03, "offset": { "className": "Point", "x": 0, "y": 0 }, "hitboxes": [], "POIs": [] }, { "className": "Frame", "rect": { "className": "Rect", "topLeftPoint": { "className": "Point", "x": 581, "y": 269 }, "botRightPoint": { "className": "Point", "x": 605, "y": 293 } }, "duration": 0.03, "offset": { "className": "Point", "x": 0, "y": 0 }, "hitboxes": [], "POIs": [] }, { "className": "Frame", "rect": { "className": "Rect", "topLeftPoint": { "className": "Point", "x": 609, "y": 269 }, "botRightPoint": { "className": "Point", "x": 633, "y": 293 } }, "duration": 0.03, "offset": { "className": "Point", "x": 0, "y": 0 }, "hitboxes": [], "POIs": [] }], "POIs": [], "name": "buster2_fade", "path": "assets/sprites/buster2_fade.json", "alignment": "center", "wrapMode": "once", "spritesheetPath": "assets/spritesheets/effects.png" }, { "className": "Sprite", "hitboxes": [{ "className": "Hitbox", "tags": "", "width": 24, "height": 24, "offset": { "className": "Point", "x": 0, "y": 0 }, "rect": { "className": "Rect", "topLeftPoint": { "className": "Point", "x": 338, "y": 288 }, "botRightPoint": { "className": "Point", "x": 362, "y": 312 } }, "isTrigger": true }], "frames": [{ "className": "Frame", "rect": { "className": "Rect", "topLeftPoint": { "className": "Point", "x": 148, "y": 319 }, "botRightPoint": { "className": "Point", "x": 162, "y": 339 } }, "duration": 0.03, "offset": { "className": "Point", "x": 0, "y": 0 }, "hitboxes": [], "POIs": [] }, { "className": "Frame", "rect": { "className": "Rect", "topLeftPoint": { "className": "Point", "x": 170, "y": 321 }, "botRightPoint": { "className": "Point", "x": 193, "y": 337 } }, "duration": 0.03, "offset": { "className": "Point", "x": 0, "y": 0 }, "hitboxes": [], "POIs": [] }, { "className": "Frame", "rect": { "className": "Rect", "topLeftPoint": { "className": "Point", "x": 199, "y": 313 }, "botRightPoint": { "className": "Point", "x": 231, "y": 345 } }, "duration": 0.03, "offset": { "className": "Point", "x": 0, "y": 0 }, "hitboxes": [], "POIs": [] }, { "className": "Frame", "rect": { "className": "Rect", "topLeftPoint": { "className": "Point", "x": 239, "y": 317 }, "botRightPoint": { "className": "Point", "x": 266, "y": 341 } }, "duration": 0.03, "offset": { "className": "Point", "x": 0, "y": 0 }, "hitboxes": [], "POIs": [] }, { "className": "Frame", "rect": { "className": "Rect", "topLeftPoint": { "className": "Point", "x": 271, "y": 313 }, "botRightPoint": { "className": "Point", "x": 311, "y": 345 } }, "duration": 0.03, "offset": { "className": "Point", "x": 0, "y": 0 }, "hitboxes": [], "POIs": [] }], "POIs": [], "name": "buster3", "path": "assets/sprites/buster3.json", "alignment": "center", "wrapMode": "loop", "spritesheetPath": "assets/spritesheets/effects.png", "loopStartFrame": 2 }, { "className": "Sprite", "hitboxes": [], "frames": [{ "className": "Frame", "rect": { "className": "Rect", "topLeftPoint": { "className": "Point", "x": 320, "y": 319 }, "botRightPoint": { "className": "Point", "x": 334, "y": 339 } }, "duration": 0.03, "offset": { "className": "Point", "x": 0, "y": 0 }, "hitboxes": [], "POIs": [] }, { "className": "Frame", "rect": { "className": "Rect", "topLeftPoint": { "className": "Point", "x": 341, "y": 315 }, "botRightPoint": { "className": "Point", "x": 365, "y": 343 } }, "duration": 0.03, "offset": { "className": "Point", "x": 0, "y": 0 }, "hitboxes": [], "POIs": [] }, { "className": "Frame", "rect": { "className": "Rect", "topLeftPoint": { "className": "Point", "x": 374, "y": 315 }, "botRightPoint": { "className": "Point", "x": 402, "y": 343 } }, "duration": 0.03, "offset": { "className": "Point", "x": 0, "y": 0 }, "hitboxes": [], "POIs": [] }, { "className": "Frame", "rect": { "className": "Rect", "topLeftPoint": { "className": "Point", "x": 406, "y": 316 }, "botRightPoint": { "className": "Point", "x": 432, "y": 342 } }, "duration": 0.03, "offset": { "className": "Point", "x": 0, "y": 0 }, "hitboxes": [], "POIs": [] }, { "className": "Frame", "rect": { "className": "Rect", "topLeftPoint": { "className": "Point", "x": 436, "y": 315 }, "botRightPoint": { "className": "Point", "x": 464, "y": 343 } }, "duration": 0.03, "offset": { "className": "Point", "x": 0, "y": 0 }, "hitboxes": [], "POIs": [] }, { "className": "Frame", "rect": { "className": "Rect", "topLeftPoint": { "className": "Point", "x": 468, "y": 314 }, "botRightPoint": { "className": "Point", "x": 498, "y": 344 } }, "duration": 0.03, "offset": { "className": "Point", "x": 0, "y": 0 }, "hitboxes": [], "POIs": [] }, { "className": "Frame", "rect": { "className": "Rect", "topLeftPoint": { "className": "Point", "x": 502, "y": 313 }, "botRightPoint": { "className": "Point", "x": 534, "y": 345 } }, "duration": 0.03, "offset": { "className": "Point", "x": 0, "y": 0 }, "hitboxes": [], "POIs": [] }, { "className": "Frame", "rect": { "className": "Rect", "topLeftPoint": { "className": "Point", "x": 538, "y": 313 }, "botRightPoint": { "className": "Point", "x": 570, "y": 345 } }, "duration": 0.03, "offset": { "className": "Point", "x": 0, "y": 0 }, "hitboxes": [], "POIs": [] }], "POIs": [], "name": "buster3_fade", "path": "assets/sprites/buster3_fade.json", "alignment": "center", "wrapMode": "once", "spritesheetPath": "assets/spritesheets/effects.png" }, { "className": "Sprite", "hitboxes": [{ "className": "Hitbox", "tags": "", "width": 16, "height": 15, "offset": { "className": "Point", "x": 0, "y": 0 }, "rect": { "className": "Rect", "topLeftPoint": { "className": "Point", "x": 342, "y": 292.5 }, "botRightPoint": { "className": "Point", "x": 358, "y": 307.5 } }, "isTrigger": true }], "frames": [{ "className": "Frame", "rect": { "className": "Rect", "topLeftPoint": { "className": "Point", "x": 324, "y": 377 }, "botRightPoint": { "className": "Point", "x": 340, "y": 392 } }, "duration": 0.03, "offset": { "className": "Point", "x": 0, "y": 0 }, "hitboxes": [], "POIs": [] }, { "className": "Frame", "rect": { "className": "Rect", "topLeftPoint": { "className": "Point", "x": 344, "y": 378 }, "botRightPoint": { "className": "Point", "x": 358, "y": 391 } }, "duration": 0.03, "offset": { "className": "Point", "x": 0, "y": 0 }, "hitboxes": [], "POIs": [] }, { "className": "Frame", "rect": { "className": "Rect", "topLeftPoint": { "className": "Point", "x": 362, "y": 379 }, "botRightPoint": { "className": "Point", "x": 375, "y": 390 } }, "duration": 0.03, "offset": { "className": "Point", "x": 0, "y": 0 }, "hitboxes": [], "POIs": [] }, { "className": "Frame", "rect": { "className": "Rect", "topLeftPoint": { "className": "Point", "x": 379, "y": 381 }, "botRightPoint": { "className": "Point", "x": 387, "y": 388 } }, "duration": 0.03, "offset": { "className": "Point", "x": 0, "y": 0 }, "hitboxes": [], "POIs": [] }], "POIs": [], "name": "buster4", "path": "assets/sprites/buster4.json", "alignment": "center", "wrapMode": "once", "spritesheetPath": "assets/spritesheets/effects.png" }, { "className": "Sprite", "hitboxes": [], "frames": [{ "className": "Frame", "rect": { "className": "Rect", "topLeftPoint": { "className": "Point", "x": 402, "y": 379 }, "botRightPoint": { "className": "Point", "x": 414, "y": 391 } }, "duration": 0.03, "offset": { "className": "Point", "x": 0, "y": 0 }, "hitboxes": [], "POIs": [] }, { "className": "Frame", "rect": { "className": "Rect", "topLeftPoint": { "className": "Point", "x": 418, "y": 378 }, "botRightPoint": { "className": "Point", "x": 432, "y": 392 } }, "duration": 0.03, "offset": { "className": "Point", "x": 0, "y": 0 }, "hitboxes": [], "POIs": [] }, { "className": "Frame", "rect": { "className": "Rect", "topLeftPoint": { "className": "Point", "x": 436, "y": 377 }, "botRightPoint": { "className": "Point", "x": 452, "y": 393 } }, "duration": 0.03, "offset": { "className": "Point", "x": 0, "y": 0 }, "hitboxes": [], "POIs": [] }], "POIs": [], "name": "buster4_fade", "path": "assets/sprites/buster4_fade.json", "alignment": "center", "wrapMode": "once", "spritesheetPath": "assets/spritesheets/effects.png" }, { "className": "Sprite", "hitboxes": [], "frames": [{ "className": "Frame", "rect": { "className": "Rect", "topLeftPoint": { "className": "Point", "x": 146, "y": 362 }, "botRightPoint": { "className": "Point", "x": 159, "y": 407 } }, "duration": 0.03, "offset": { "className": "Point", "x": 0, "y": 0 }, "hitboxes": [], "POIs": [] }, { "className": "Frame", "rect": { "className": "Rect", "topLeftPoint": { "className": "Point", "x": 166, "y": 355 }, "botRightPoint": { "className": "Point", "x": 190, "y": 414 } }, "duration": 0.03, "offset": { "className": "Point", "x": -7, "y": 0 }, "hitboxes": [], "POIs": [] }, { "className": "Frame", "rect": { "className": "Rect", "topLeftPoint": { "className": "Point", "x": 199, "y": 352 }, "botRightPoint": { "className": "Point", "x": 231, "y": 415 } }, "duration": 0.03, "offset": { "className": "Point", "x": -13, "y": 0 }, "hitboxes": [], "POIs": [] }, { "className": "Frame", "rect": { "className": "Rect", "topLeftPoint": { "className": "Point", "x": 238, "y": 352 }, "botRightPoint": { "className": "Point", "x": 269, "y": 415 } }, "duration": 0.03, "offset": { "className": "Point", "x": -15, "y": 0 }, "hitboxes": [], "POIs": [] }, { "className": "Frame", "rect": { "className": "Rect", "topLeftPoint": { "className": "Point", "x": 275, "y": 357 }, "botRightPoint": { "className": "Point", "x": 296, "y": 410 } }, "duration": 0.03, "offset": { "className": "Point", "x": -19, "y": 0 }, "hitboxes": [], "POIs": [] }, { "className": "Frame", "rect": { "className": "Rect", "topLeftPoint": { "className": "Point", "x": 302, "y": 361 }, "botRightPoint": { "className": "Point", "x": 317, "y": 408 } }, "duration": 0.03, "offset": { "className": "Point", "x": -23, "y": 0 }, "hitboxes": [], "POIs": [] }], "POIs": [], "name": "buster4_muzzle_flash", "path": "assets/sprites/buster4_muzzle_flash.json", "alignment": "center", "wrapMode": "once", "spritesheetPath": "assets/spritesheets/effects.png" }, { "className": "Sprite", "hitboxes": [], "frames": [{ "className": "Frame", "rect": { "className": "Rect", "topLeftPoint": { "className": "Point", "x": 126, "y": 282 }, "botRightPoint": { "className": "Point", "x": 128, "y": 284 } }, "duration": 0.066, "offset": { "className": "Point", "x": 0, "y": 0 }, "hitboxes": [], "POIs": [] }, { "className": "Frame", "rect": { "className": "Rect", "topLeftPoint": { "className": "Point", "x": 126, "y": 282 }, "botRightPoint": { "className": "Point", "x": 128, "y": 284 } }, "duration": 0.066, "offset": { "className": "Point", "x": 0, "y": 0 }, "hitboxes": [], "POIs": [] }, { "className": "Frame", "rect": { "className": "Rect", "topLeftPoint": { "className": "Point", "x": 121, "y": 283 }, "botRightPoint": { "className": "Point", "x": 122, "y": 284 } }, "duration": 0.066, "offset": { "className": "Point", "x": 0, "y": 0 }, "hitboxes": [], "POIs": [] }, { "className": "Frame", "rect": { "className": "Rect", "topLeftPoint": { "className": "Point", "x": 121, "y": 283 }, "botRightPoint": { "className": "Point", "x": 122, "y": 284 } }, "duration": 0.066, "offset": { "className": "Point", "x": 0, "y": 0 }, "hitboxes": [], "POIs": [] }], "POIs": [], "name": "charge_part_1", "path": "assets/sprites/charge_part_1.json", "alignment": "center", "wrapMode": "once", "spritesheetPath": "assets/spritesheets/effects.png" }, { "className": "Sprite", "hitboxes": [], "frames": [{ "className": "Frame", "rect": { "className": "Rect", "topLeftPoint": { "className": "Point", "x": 134, "y": 327 }, "botRightPoint": { "className": "Point", "x": 138, "y": 331 } }, "duration": 0.066, "offset": { "className": "Point", "x": 0, "y": 0 }, "hitboxes": [], "POIs": [] }, { "className": "Frame", "rect": { "className": "Rect", "topLeftPoint": { "className": "Point", "x": 127, "y": 328 }, "botRightPoint": { "className": "Point", "x": 130, "y": 331 } }, "duration": 0.066, "offset": { "className": "Point", "x": 0, "y": 0 }, "hitboxes": [], "POIs": [] }, { "className": "Frame", "rect": { "className": "Rect", "topLeftPoint": { "className": "Point", "x": 121, "y": 329 }, "botRightPoint": { "className": "Point", "x": 123, "y": 331 } }, "duration": 0.066, "offset": { "className": "Point", "x": 0, "y": 0 }, "hitboxes": [], "POIs": [] }, { "className": "Frame", "rect": { "className": "Rect", "topLeftPoint": { "className": "Point", "x": 116, "y": 330 }, "botRightPoint": { "className": "Point", "x": 117, "y": 331 } }, "duration": 0.066, "offset": { "className": "Point", "x": 0, "y": 0 }, "hitboxes": [], "POIs": [] }], "POIs": [], "name": "charge_part_2", "path": "assets/sprites/charge_part_2.json", "alignment": "center", "wrapMode": "once", "spritesheetPath": "assets/spritesheets/effects.png" }, { "className": "Sprite", "hitboxes": [], "frames": [{ "className": "Frame", "rect": { "className": "Rect", "topLeftPoint": { "className": "Point", "x": 131, "y": 383 }, "botRightPoint": { "className": "Point", "x": 136, "y": 388 } }, "duration": 0.066, "offset": { "className": "Point", "x": 0, "y": 0 }, "hitboxes": [], "POIs": [] }, { "className": "Frame", "rect": { "className": "Rect", "topLeftPoint": { "className": "Point", "x": 123, "y": 384 }, "botRightPoint": { "className": "Point", "x": 127, "y": 388 } }, "duration": 0.066, "offset": { "className": "Point", "x": 0, "y": 0 }, "hitboxes": [], "POIs": [] }, { "className": "Frame", "rect": { "className": "Rect", "topLeftPoint": { "className": "Point", "x": 116, "y": 385 }, "botRightPoint": { "className": "Point", "x": 119, "y": 388 } }, "duration": 0.066, "offset": { "className": "Point", "x": 0, "y": 0 }, "hitboxes": [], "POIs": [] }, { "className": "Frame", "rect": { "className": "Rect", "topLeftPoint": { "className": "Point", "x": 110, "y": 386 }, "botRightPoint": { "className": "Point", "x": 112, "y": 388 } }, "duration": 0.066, "offset": { "className": "Point", "x": 0, "y": 0 }, "hitboxes": [], "POIs": [] }], "POIs": [], "name": "charge_part_3", "path": "assets/sprites/charge_part_3.json", "alignment": "center", "wrapMode": "once", "spritesheetPath": "assets/spritesheets/effects.png" }, { "className": "Sprite", "hitboxes": [], "frames": [{ "className": "Frame", "rect": { "className": "Rect", "topLeftPoint": { "className": "Point", "x": 657, "y": 275 }, "botRightPoint": { "className": "Point", "x": 676, "y": 290 } }, "duration": 0.066, "offset": { "className": "Point", "x": 0, "y": 0 }, "hitboxes": [], "POIs": [] }, { "className": "Frame", "rect": { "className": "Rect", "topLeftPoint": { "className": "Point", "x": 679, "y": 266 }, "botRightPoint": { "className": "Point", "x": 702, "y": 290 } }, "duration": 0.066, "offset": { "className": "Point", "x": 0, "y": 0 }, "hitboxes": [], "POIs": [] }, { "className": "Frame", "rect": { "className": "Rect", "topLeftPoint": { "className": "Point", "x": 706, "y": 265 }, "botRightPoint": { "className": "Point", "x": 729, "y": 290 } }, "duration": 0.066, "offset": { "className": "Point", "x": 0, "y": 0 }, "hitboxes": [], "POIs": [] }, { "className": "Frame", "rect": { "className": "Rect", "topLeftPoint": { "className": "Point", "x": 734, "y": 264 }, "botRightPoint": { "className": "Point", "x": 761, "y": 290 } }, "duration": 0.066, "offset": { "className": "Point", "x": 0, "y": 0 }, "hitboxes": [], "POIs": [] }], "POIs": [], "name": "dash_sparks", "path": "assets/sprites/dash_sparks.json", "alignment": "botmid", "wrapMode": "once", "spritesheetPath": "assets/spritesheets/effects.png" }, { "className": "Sprite", "hitboxes": [], "frames": [{ "className": "Frame", "rect": { "className": "Rect", "topLeftPoint": { "className": "Point", "x": 486, "y": 386 }, "botRightPoint": { "className": "Point", "x": 495, "y": 395 } }, "duration": 0.066, "offset": { "className": "Point", "x": 0, "y": 0 }, "hitboxes": [], "POIs": [] }, { "className": "Frame", "rect": { "className": "Rect", "topLeftPoint": { "className": "Point", "x": 486, "y": 373 }, "botRightPoint": { "className": "Point", "x": 497, "y": 384 } }, "duration": 0.066, "offset": { "className": "Point", "x": 0, "y": 0 }, "hitboxes": [], "POIs": [] }, { "className": "Frame", "rect": { "className": "Rect", "topLeftPoint": { "className": "Point", "x": 502, "y": 380 }, "botRightPoint": { "className": "Point", "x": 517, "y": 395 } }, "duration": 0.066, "offset": { "className": "Point", "x": 0, "y": 0 }, "hitboxes": [], "POIs": [] }], "POIs": [], "name": "die_particle", "path": "assets/sprites/die_particle.json", "alignment": "center", "wrapMode": "once", "spritesheetPath": "assets/spritesheets/effects.png" }, { "className": "Sprite", "hitboxes": [], "frames": [{ "className": "Frame", "rect": { "className": "Rect", "topLeftPoint": { "className": "Point", "x": 622, "y": 489 }, "botRightPoint": { "className": "Point", "x": 637, "y": 503 } }, "duration": 0.03, "offset": { "className": "Point", "x": 0, "y": 0 }, "hitboxes": [], "POIs": [] }, { "className": "Frame", "rect": { "className": "Rect", "topLeftPoint": { "className": "Point", "x": 650, "y": 483 }, "botRightPoint": { "className": "Point", "x": 677, "y": 507 } }, "duration": 0.03, "offset": { "className": "Point", "x": 0, "y": 0 }, "hitboxes": [], "POIs": [] }], "POIs": [], "name": "die_sparks", "path": "assets/sprites/die_sparks.json", "alignment": "center", "wrapMode": "once", "spritesheetPath": "assets/spritesheets/effects.png" }, { "className": "Sprite", "hitboxes": [], "frames": [{ "className": "Frame", "rect": { "className": "Rect", "topLeftPoint": { "className": "Point", "x": 798, "y": 256 }, "botRightPoint": { "className": "Point", "x": 806, "y": 263 } }, "duration": 0.066, "offset": { "className": "Point", "x": 0, "y": 0 }, "hitboxes": [], "POIs": [] }, { "className": "Frame", "rect": { "className": "Rect", "topLeftPoint": { "className": "Point", "x": 808, "y": 253 }, "botRightPoint": { "className": "Point", "x": 818, "y": 264 } }, "duration": 0.066, "offset": { "className": "Point", "x": 0, "y": 0 }, "hitboxes": [], "POIs": [] }, { "className": "Frame", "rect": { "className": "Rect", "topLeftPoint": { "className": "Point", "x": 820, "y": 251 }, "botRightPoint": { "className": "Point", "x": 833, "y": 264 } }, "duration": 0.066, "offset": { "className": "Point", "x": 0, "y": 0 }, "hitboxes": [], "POIs": [] }, { "className": "Frame", "rect": { "className": "Rect", "topLeftPoint": { "className": "Point", "x": 837, "y": 250 }, "botRightPoint": { "className": "Point", "x": 851, "y": 264 } }, "duration": 0.066, "offset": { "className": "Point", "x": 0, "y": 0 }, "hitboxes": [], "POIs": [] }, { "className": "Frame", "rect": { "className": "Rect", "topLeftPoint": { "className": "Point", "x": 854, "y": 250 }, "botRightPoint": { "className": "Point", "x": 868, "y": 264 } }, "duration": 0.066, "offset": { "className": "Point", "x": 0, "y": 0 }, "hitboxes": [], "POIs": [] }, { "className": "Frame", "rect": { "className": "Rect", "topLeftPoint": { "className": "Point", "x": 870, "y": 258 }, "botRightPoint": { "className": "Point", "x": 882, "y": 264 } }, "duration": 0.066, "offset": { "className": "Point", "x": 0, "y": 0 }, "hitboxes": [], "POIs": [] }], "POIs": [], "name": "dust", "path": "assets/sprites/dust.json", "alignment": "center", "wrapMode": "once", "spritesheetPath": "assets/spritesheets/effects.png" }, { "className": "Sprite", "hitboxes": [{ "className": "Hitbox", "tags": "", "width": 16, "height": 16, "offset": { "className": "Point", "x": 0, "y": 0 }, "rect": { "className": "Rect", "topLeftPoint": { "className": "Point", "x": 342, "y": 292 }, "botRightPoint": { "className": "Point", "x": 358, "y": 308 } }, "isTrigger": true }], "frames": [{ "className": "Frame", "rect": { "className": "Rect", "topLeftPoint": { "className": "Point", "x": 742, "y": 901 }, "botRightPoint": { "className": "Point", "x": 758, "y": 917 } }, "duration": 0.015, "offset": { "className": "Point", "x": 0, "y": 0 }, "hitboxes": [], "POIs": [] }, { "className": "Frame", "rect": { "className": "Rect", "topLeftPoint": { "className": "Point", "x": 763, "y": 900 }, "botRightPoint": { "className": "Point", "x": 781, "y": 918 } }, "duration": 0.015, "offset": { "className": "Point", "x": 0, "y": 0 }, "hitboxes": [], "POIs": [] }, { "className": "Frame", "rect": { "className": "Rect", "topLeftPoint": { "className": "Point", "x": 742, "y": 901 }, "botRightPoint": { "className": "Point", "x": 758, "y": 917 } }, "duration": 0.015, "offset": { "className": "Point", "x": 0, "y": 0 }, "hitboxes": [], "POIs": [] }, { "className": "Frame", "rect": { "className": "Rect", "topLeftPoint": { "className": "Point", "x": 788, "y": 903 }, "botRightPoint": { "className": "Point", "x": 800, "y": 915 } }, "duration": 0.015, "offset": { "className": "Point", "x": 0, "y": 0 }, "hitboxes": [], "POIs": [] }], "POIs": [], "name": "electric_spark", "path": "assets/sprites/electric_spark.json", "alignment": "center", "wrapMode": "loop", "spritesheetPath": "assets/spritesheets/effects.png" }, { "className": "Sprite", "hitboxes": [{ "className": "Hitbox", "tags": "", "width": 17, "height": 95, "offset": { "className": "Point", "x": 0, "y": 0 }, "rect": { "className": "Rect", "topLeftPoint": { "className": "Point", "x": 341.5, "y": 252.5 }, "botRightPoint": { "className": "Point", "x": 358.5, "y": 347.5 } }, "isTrigger": true }], "frames": [{ "className": "Frame", "rect": { "className": "Rect", "topLeftPoint": { "className": "Point", "x": 663, "y": 534 }, "botRightPoint": { "className": "Point", "x": 682, "y": 631 } }, "duration": 0.03, "offset": { "className": "Point", "x": 0, "y": 0 }, "hitboxes": [], "POIs": [] }, { "className": "Frame", "rect": { "className": "Rect", "topLeftPoint": { "className": "Point", "x": 686, "y": 536 }, "botRightPoint": { "className": "Point", "x": 703, "y": 631 } }, "duration": 0.03, "offset": { "className": "Point", "x": 0, "y": 0 }, "hitboxes": [], "POIs": [] }], "POIs": [], "name": "electric_spark_charge", "path": "assets/sprites/electric_spark_charge.json", "alignment": "center", "wrapMode": "loop", "spritesheetPath": "assets/spritesheets/effects.png" }, { "className": "Sprite", "hitboxes": [], "frames": [{ "className": "Frame", "rect": { "className": "Rect", "topLeftPoint": { "className": "Point", "x": 843, "y": 896 }, "botRightPoint": { "className": "Point", "x": 869, "y": 922 } }, "duration": 0.015, "offset": { "className": "Point", "x": 0, "y": 0 }, "hitboxes": [], "POIs": [] }, { "className": "Frame", "rect": { "className": "Rect", "topLeftPoint": { "className": "Point", "x": 874, "y": 893 }, "botRightPoint": { "className": "Point", "x": 906, "y": 925 } }, "duration": 0.015, "offset": { "className": "Point", "x": 0, "y": 0 }, "hitboxes": [], "POIs": [] }], "POIs": [], "name": "electric_spark_fade", "path": "assets/sprites/electric_spark_fade.json", "alignment": "center", "wrapMode": "once", "spritesheetPath": "assets/spritesheets/effects.png" }, { "className": "Sprite", "hitboxes": [], "frames": [{ "className": "Frame", "rect": { "className": "Rect", "topLeftPoint": { "className": "Point", "x": 591, "y": 315 }, "botRightPoint": { "className": "Point", "x": 607, "y": 331 } }, "duration": 0.03, "offset": { "className": "Point", "x": -1, "y": 0 }, "hitboxes": [], "POIs": [] }, { "className": "Frame", "rect": { "className": "Rect", "topLeftPoint": { "className": "Point", "x": 617, "y": 315 }, "botRightPoint": { "className": "Point", "x": 649, "y": 347 } }, "duration": 0.03, "offset": { "className": "Point", "x": 0, "y": 0 }, "hitboxes": [], "POIs": [] }, { "className": "Frame", "rect": { "className": "Rect", "topLeftPoint": { "className": "Point", "x": 659, "y": 315 }, "botRightPoint": { "className": "Point", "x": 687, "y": 339 } }, "duration": 0.03, "offset": { "className": "Point", "x": 0, "y": 0 }, "hitboxes": [], "POIs": [] }, { "className": "Frame", "rect": { "className": "Rect", "topLeftPoint": { "className": "Point", "x": 697, "y": 315 }, "botRightPoint": { "className": "Point", "x": 727, "y": 342 } }, "duration": 0.03, "offset": { "className": "Point", "x": 0, "y": 0 }, "hitboxes": [], "POIs": [] }, { "className": "Frame", "rect": { "className": "Rect", "topLeftPoint": { "className": "Point", "x": 737, "y": 315 }, "botRightPoint": { "className": "Point", "x": 769, "y": 342 } }, "duration": 0.03, "offset": { "className": "Point", "x": 0, "y": 0 }, "hitboxes": [], "POIs": [] }, { "className": "Frame", "rect": { "className": "Rect", "topLeftPoint": { "className": "Point", "x": 779, "y": 315 }, "botRightPoint": { "className": "Point", "x": 811, "y": 345 } }, "duration": 0.03, "offset": { "className": "Point", "x": 0, "y": 0 }, "hitboxes": [], "POIs": [] }, { "className": "Frame", "rect": { "className": "Rect", "topLeftPoint": { "className": "Point", "x": 821, "y": 315 }, "botRightPoint": { "className": "Point", "x": 852, "y": 337 } }, "duration": 0.03, "offset": { "className": "Point", "x": 0, "y": 0 }, "hitboxes": [], "POIs": [] }, { "className": "Frame", "rect": { "className": "Rect", "topLeftPoint": { "className": "Point", "x": 863, "y": 315 }, "botRightPoint": { "className": "Point", "x": 894, "y": 330 } }, "duration": 0.03, "offset": { "className": "Point", "x": 0, "y": 0 }, "hitboxes": [], "POIs": [] }], "POIs": [], "name": "explosion", "path": "assets/sprites/explosion.json", "alignment": "center", "wrapMode": "once", "spritesheetPath": "assets/spritesheets/effects.png" }, { "className": "Sprite", "hitboxes": [{ "className": "Hitbox", "tags": "", "width": 15, "height": 10, "offset": { "className": "Point", "x": 0, "y": 0 }, "rect": { "className": "Rect", "topLeftPoint": { "className": "Point", "x": 342.5, "y": 295 }, "botRightPoint": { "className": "Point", "x": 357.5, "y": 305 } }, "isTrigger": true }], "frames": [{ "className": "Frame", "rect": { "className": "Rect", "topLeftPoint": { "className": "Point", "x": 47, "y": 905 }, "botRightPoint": { "className": "Point", "x": 62, "y": 915 } }, "duration": 0.03, "offset": { "className": "Point", "x": 0, "y": 0 }, "hitboxes": [], "POIs": [] }], "POIs": [], "name": "fire_wave", "path": "assets/sprites/fire_wave.json", "alignment": "center", "wrapMode": "once", "spritesheetPath": "assets/spritesheets/effects.png" }, { "className": "Sprite", "hitboxes": [{ "className": "Hitbox", "tags": "", "width": 16, "height": 23, "offset": { "className": "Point", "x": 0, "y": 0 }, "rect": { "className": "Rect", "topLeftPoint": { "className": "Point", "x": 342, "y": 277 }, "botRightPoint": { "className": "Point", "x": 358, "y": 300 } }, "isTrigger": true }], "frames": [{ "className": "Frame", "rect": { "className": "Rect", "topLeftPoint": { "className": "Point", "x": 173, "y": 911 }, "botRightPoint": { "className": "Point", "x": 189, "y": 919 } }, "duration": 0.066, "offset": { "className": "Point", "x": 0, "y": 0 }, "hitboxes": [], "POIs": [] }, { "className": "Frame", "rect": { "className": "Rect", "topLeftPoint": { "className": "Point", "x": 191, "y": 903 }, "botRightPoint": { "className": "Point", "x": 207, "y": 919 } }, "duration": 0.066, "offset": { "className": "Point", "x": 0, "y": 0 }, "hitboxes": [], "POIs": [] }, { "className": "Frame", "rect": { "className": "Rect", "topLeftPoint": { "className": "Point", "x": 209, "y": 903 }, "botRightPoint": { "className": "Point", "x": 225, "y": 919 } }, "duration": 0.066, "offset": { "className": "Point", "x": 0, "y": 0 }, "hitboxes": [], "POIs": [] }, { "className": "Frame", "rect": { "className": "Rect", "topLeftPoint": { "className": "Point", "x": 227, "y": 896 }, "botRightPoint": { "className": "Point", "x": 243, "y": 919 } }, "duration": 0.066, "offset": { "className": "Point", "x": 0, "y": 0 }, "hitboxes": [], "POIs": [] }, { "className": "Frame", "rect": { "className": "Rect", "topLeftPoint": { "className": "Point", "x": 246, "y": 895 }, "botRightPoint": { "className": "Point", "x": 268, "y": 908 } }, "duration": 0.066, "offset": { "className": "Point", "x": 0, "y": -10 }, "hitboxes": [], "POIs": [] }, { "className": "Frame", "rect": { "className": "Rect", "topLeftPoint": { "className": "Point", "x": 272, "y": 895 }, "botRightPoint": { "className": "Point", "x": 294, "y": 903 } }, "duration": 0.066, "offset": { "className": "Point", "x": 0, "y": -12 }, "hitboxes": [], "POIs": [] }], "POIs": [], "name": "fire_wave_charge", "path": "sprites/fire_wave_charge.json", "alignment": "botmid", "wrapMode": "once", "spritesheetPath": "assets/spritesheets/effects.png" }, { "className": "Sprite", "hitboxes": [], "frames": [{ "className": "Frame", "rect": { "className": "Rect", "topLeftPoint": { "className": "Point", "x": 65, "y": 906 }, "botRightPoint": { "className": "Point", "x": 81, "y": 917 } }, "duration": 0.015, "offset": { "className": "Point", "x": 0, "y": 0 }, "hitboxes": [], "POIs": [] }, { "className": "Frame", "rect": { "className": "Rect", "topLeftPoint": { "className": "Point", "x": 85, "y": 905 }, "botRightPoint": { "className": "Point", "x": 97, "y": 917 } }, "duration": 0.015, "offset": { "className": "Point", "x": 0, "y": 0 }, "hitboxes": [], "POIs": [] }, { "className": "Frame", "rect": { "className": "Rect", "topLeftPoint": { "className": "Point", "x": 102, "y": 904 }, "botRightPoint": { "className": "Point", "x": 116, "y": 918 } }, "duration": 0.015, "offset": { "className": "Point", "x": 0, "y": 0 }, "hitboxes": [], "POIs": [] }, { "className": "Frame", "rect": { "className": "Rect", "topLeftPoint": { "className": "Point", "x": 119, "y": 903 }, "botRightPoint": { "className": "Point", "x": 135, "y": 919 } }, "duration": 0.015, "offset": { "className": "Point", "x": 0, "y": 0 }, "hitboxes": [], "POIs": [] }, { "className": "Frame", "rect": { "className": "Rect", "topLeftPoint": { "className": "Point", "x": 137, "y": 903 }, "botRightPoint": { "className": "Point", "x": 153, "y": 919 } }, "duration": 0.015, "offset": { "className": "Point", "x": 0, "y": 0 }, "hitboxes": [], "POIs": [] }], "POIs": [], "name": "fire_wave_fade", "path": "assets/sprites/fire_wave_fade.json", "alignment": "center", "wrapMode": "once", "spritesheetPath": "assets/spritesheets/effects.png" }, { "className": "Sprite", "hitboxes": [], "frames": [{ "className": "Frame", "rect": { "className": "Rect", "topLeftPoint": { "className": "Point", "x": 2, "y": 55 }, "botRightPoint": { "className": "Point", "x": 16, "y": 71 } }, "duration": 1, "offset": { "className": "Point", "x": 0, "y": 0 }, "hitboxes": [], "POIs": [] }], "POIs": [], "name": "hud_health_base", "path": "assets/sprites/hud_health_base.json", "alignment": "botmid", "wrapMode": "once", "spritesheetPath": "assets/spritesheets/effects.png" }, { "className": "Sprite", "hitboxes": [], "frames": [{ "className": "Frame", "rect": { "className": "Rect", "topLeftPoint": { "className": "Point", "x": 2, "y": 37 }, "botRightPoint": { "className": "Point", "x": 16, "y": 39 } }, "duration": 0.066, "offset": { "className": "Point", "x": 0, "y": 0 }, "hitboxes": [], "POIs": [] }], "POIs": [], "name": "hud_health_empty", "path": "assets/sprites/hud_health_empty.json", "alignment": "botmid", "wrapMode": "once", "spritesheetPath": "assets/spritesheets/effects.png" }, { "className": "Sprite", "hitboxes": [], "frames": [{ "className": "Frame", "rect": { "className": "Rect", "topLeftPoint": { "className": "Point", "x": 2, "y": 51 }, "botRightPoint": { "className": "Point", "x": 16, "y": 53 } }, "duration": 0.066, "offset": { "className": "Point", "x": 0, "y": 0 }, "hitboxes": [], "POIs": [] }], "POIs": [], "name": "hud_health_full", "path": "assets/sprites/hud_health_full.json", "alignment": "botmid", "wrapMode": "once", "spritesheetPath": "assets/spritesheets/effects.png" }, { "className": "Sprite", "hitboxes": [], "frames": [{ "className": "Frame", "rect": { "className": "Rect", "topLeftPoint": { "className": "Point", "x": 34, "y": 13 }, "botRightPoint": { "className": "Point", "x": 48, "y": 17 } }, "duration": 0.066, "offset": { "className": "Point", "x": 0, "y": 0 }, "hitboxes": [], "POIs": [] }], "POIs": [], "name": "hud_health_top", "path": "assets/sprites/hud_health_top.json", "alignment": "botmid", "wrapMode": "once", "spritesheetPath": "assets/spritesheets/effects.png" }, { "className": "Sprite", "hitboxes": [], "frames": [{ "className": "Frame", "rect": { "className": "Rect", "topLeftPoint": { "className": "Point", "x": 130, "y": 119 }, "botRightPoint": { "className": "Point", "x": 140, "y": 127 } }, "duration": 0.066, "offset": { "className": "Point", "x": 0, "y": 0 }, "hitboxes": [], "POIs": [] }, { "className": "Frame", "rect": { "className": "Rect", "topLeftPoint": { "className": "Point", "x": 144, "y": 117 }, "botRightPoint": { "className": "Point", "x": 155, "y": 129 } }, "duration": 0.066, "offset": { "className": "Point", "x": 0, "y": 0 }, "hitboxes": [], "POIs": [] }, { "className": "Frame", "rect": { "className": "Rect", "topLeftPoint": { "className": "Point", "x": 161, "y": 117 }, "botRightPoint": { "className": "Point", "x": 172, "y": 128 } }, "duration": 0.066, "offset": { "className": "Point", "x": 0, "y": 0 }, "hitboxes": [], "POIs": [] }, { "className": "Frame", "rect": { "className": "Rect", "topLeftPoint": { "className": "Point", "x": 177, "y": 118 }, "botRightPoint": { "className": "Point", "x": 187, "y": 128 } }, "duration": 0.066, "offset": { "className": "Point", "x": 0, "y": 0 }, "hitboxes": [], "POIs": [] }, { "className": "Frame", "rect": { "className": "Rect", "topLeftPoint": { "className": "Point", "x": 193, "y": 116 }, "botRightPoint": { "className": "Point", "x": 203, "y": 128 } }, "duration": 0.066, "offset": { "className": "Point", "x": 0, "y": 0 }, "hitboxes": [], "POIs": [] }, { "className": "Frame", "rect": { "className": "Rect", "topLeftPoint": { "className": "Point", "x": 208, "y": 117 }, "botRightPoint": { "className": "Point", "x": 220, "y": 128 } }, "duration": 0.066, "offset": { "className": "Point", "x": 0, "y": 0 }, "hitboxes": [], "POIs": [] }, { "className": "Frame", "rect": { "className": "Rect", "topLeftPoint": { "className": "Point", "x": 225, "y": 117 }, "botRightPoint": { "className": "Point", "x": 235, "y": 128 } }, "duration": 0.066, "offset": { "className": "Point", "x": 0, "y": 0 }, "hitboxes": [], "POIs": [] }, { "className": "Frame", "rect": { "className": "Rect", "topLeftPoint": { "className": "Point", "x": 241, "y": 117 }, "botRightPoint": { "className": "Point", "x": 251, "y": 128 } }, "duration": 0.066, "offset": { "className": "Point", "x": 0, "y": 0 }, "hitboxes": [], "POIs": [] }, { "className": "Frame", "rect": { "className": "Rect", "topLeftPoint": { "className": "Point", "x": 257, "y": 117 }, "botRightPoint": { "className": "Point", "x": 267, "y": 128 } }, "duration": 0.066, "offset": { "className": "Point", "x": 0, "y": 0 }, "hitboxes": [], "POIs": [] }], "POIs": [], "name": "hud_killfeed_weapon", "path": "assets/sprites/hud_killfeed_weapon.json", "alignment": "center", "wrapMode": "once", "spritesheetPath": "assets/spritesheets/effects.png" }, { "className": "Sprite", "hitboxes": [], "frames": [{ "className": "Frame", "rect": { "className": "Rect", "topLeftPoint": { "className": "Point", "x": 138, "y": 55 }, "botRightPoint": { "className": "Point", "x": 152, "y": 71 } }, "duration": 0.066, "offset": { "className": "Point", "x": 0, "y": 0 }, "hitboxes": [], "POIs": [] }, { "className": "Frame", "rect": { "className": "Rect", "topLeftPoint": { "className": "Point", "x": 154, "y": 55 }, "botRightPoint": { "className": "Point", "x": 168, "y": 71 } }, "duration": 0.066, "offset": { "className": "Point", "x": 0, "y": 0 }, "hitboxes": [], "POIs": [] }, { "className": "Frame", "rect": { "className": "Rect", "topLeftPoint": { "className": "Point", "x": 170, "y": 55 }, "botRightPoint": { "className": "Point", "x": 184, "y": 71 } }, "duration": 0.066, "offset": { "className": "Point", "x": 0, "y": 0 }, "hitboxes": [], "POIs": [] }, { "className": "Frame", "rect": { "className": "Rect", "topLeftPoint": { "className": "Point", "x": 186, "y": 55 }, "botRightPoint": { "className": "Point", "x": 200, "y": 71 } }, "duration": 0.066, "offset": { "className": "Point", "x": 0, "y": 0 }, "hitboxes": [], "POIs": [] }, { "className": "Frame", "rect": { "className": "Rect", "topLeftPoint": { "className": "Point", "x": 202, "y": 55 }, "botRightPoint": { "className": "Point", "x": 216, "y": 71 } }, "duration": 0.066, "offset": { "className": "Point", "x": 0, "y": 0 }, "hitboxes": [], "POIs": [] }, { "className": "Frame", "rect": { "className": "Rect", "topLeftPoint": { "className": "Point", "x": 218, "y": 55 }, "botRightPoint": { "className": "Point", "x": 232, "y": 71 } }, "duration": 0.066, "offset": { "className": "Point", "x": 0, "y": 0 }, "hitboxes": [], "POIs": [] }, { "className": "Frame", "rect": { "className": "Rect", "topLeftPoint": { "className": "Point", "x": 234, "y": 55 }, "botRightPoint": { "className": "Point", "x": 248, "y": 71 } }, "duration": 0.066, "offset": { "className": "Point", "x": 0, "y": 0 }, "hitboxes": [], "POIs": [] }, { "className": "Frame", "rect": { "className": "Rect", "topLeftPoint": { "className": "Point", "x": 250, "y": 55 }, "botRightPoint": { "className": "Point", "x": 264, "y": 71 } }, "duration": 0.066, "offset": { "className": "Point", "x": 0, "y": 0 }, "hitboxes": [], "POIs": [] }], "POIs": [], "name": "hud_weapon_base", "path": "assets/sprites/hud_weapon_base.json", "alignment": "botmid", "wrapMode": "once", "spritesheetPath": "assets/spritesheets/effects.png" }, { "className": "Sprite", "hitboxes": [], "frames": [{ "className": "Frame", "rect": { "className": "Rect", "topLeftPoint": { "className": "Point", "x": 138, "y": 51 }, "botRightPoint": { "className": "Point", "x": 152, "y": 53 } }, "duration": 0.066, "offset": { "className": "Point", "x": 0, "y": 0 }, "hitboxes": [], "POIs": [] }, { "className": "Frame", "rect": { "className": "Rect", "topLeftPoint": { "className": "Point", "x": 154, "y": 51 }, "botRightPoint": { "className": "Point", "x": 168, "y": 53 } }, "duration": 0.066, "offset": { "className": "Point", "x": 0, "y": 0 }, "hitboxes": [], "POIs": [] }, { "className": "Frame", "rect": { "className": "Rect", "topLeftPoint": { "className": "Point", "x": 170, "y": 51 }, "botRightPoint": { "className": "Point", "x": 184, "y": 53 } }, "duration": 0.066, "offset": { "className": "Point", "x": 0, "y": 0 }, "hitboxes": [], "POIs": [] }, { "className": "Frame", "rect": { "className": "Rect", "topLeftPoint": { "className": "Point", "x": 186, "y": 51 }, "botRightPoint": { "className": "Point", "x": 200, "y": 53 } }, "duration": 0.066, "offset": { "className": "Point", "x": 0, "y": 0 }, "hitboxes": [], "POIs": [] }, { "className": "Frame", "rect": { "className": "Rect", "topLeftPoint": { "className": "Point", "x": 202, "y": 51 }, "botRightPoint": { "className": "Point", "x": 216, "y": 53 } }, "duration": 0.066, "offset": { "className": "Point", "x": 0, "y": 0 }, "hitboxes": [], "POIs": [] }, { "className": "Frame", "rect": { "className": "Rect", "topLeftPoint": { "className": "Point", "x": 218, "y": 51 }, "botRightPoint": { "className": "Point", "x": 232, "y": 53 } }, "duration": 0.066, "offset": { "className": "Point", "x": 0, "y": 0 }, "hitboxes": [], "POIs": [] }, { "className": "Frame", "rect": { "className": "Rect", "topLeftPoint": { "className": "Point", "x": 234, "y": 51 }, "botRightPoint": { "className": "Point", "x": 248, "y": 53 } }, "duration": 0.066, "offset": { "className": "Point", "x": 0, "y": 0 }, "hitboxes": [], "POIs": [] }, { "className": "Frame", "rect": { "className": "Rect", "topLeftPoint": { "className": "Point", "x": 250, "y": 51 }, "botRightPoint": { "className": "Point", "x": 264, "y": 53 } }, "duration": 0.066, "offset": { "className": "Point", "x": 0, "y": 0 }, "hitboxes": [], "POIs": [] }], "POIs": [], "name": "hud_weapon_full", "path": "assets/sprites/hud_weapon_full.json", "alignment": "botmid", "wrapMode": "once", "spritesheetPath": "assets/spritesheets/effects.png" }, { "className": "Sprite", "hitboxes": [], "frames": [{ "className": "Frame", "rect": { "className": "Rect", "topLeftPoint": { "className": "Point", "x": 2, "y": 75 }, "botRightPoint": { "className": "Point", "x": 18, "y": 91 } }, "duration": 0.066, "offset": { "className": "Point", "x": 0, "y": 0 }, "hitboxes": [], "POIs": [] }, { "className": "Frame", "rect": { "className": "Rect", "topLeftPoint": { "className": "Point", "x": 20, "y": 75 }, "botRightPoint": { "className": "Point", "x": 36, "y": 91 } }, "duration": 0.066, "offset": { "className": "Point", "x": 0, "y": 0 }, "hitboxes": [], "POIs": [] }, { "className": "Frame", "rect": { "className": "Rect", "topLeftPoint": { "className": "Point", "x": 38, "y": 75 }, "botRightPoint": { "className": "Point", "x": 54, "y": 91 } }, "duration": 0.066, "offset": { "className": "Point", "x": 0, "y": 0 }, "hitboxes": [], "POIs": [] }, { "className": "Frame", "rect": { "className": "Rect", "topLeftPoint": { "className": "Point", "x": 56, "y": 75 }, "botRightPoint": { "className": "Point", "x": 72, "y": 91 } }, "duration": 0.066, "offset": { "className": "Point", "x": 0, "y": 0 }, "hitboxes": [], "POIs": [] }, { "className": "Frame", "rect": { "className": "Rect", "topLeftPoint": { "className": "Point", "x": 74, "y": 75 }, "botRightPoint": { "className": "Point", "x": 90, "y": 91 } }, "duration": 0.066, "offset": { "className": "Point", "x": 0, "y": 0 }, "hitboxes": [], "POIs": [] }, { "className": "Frame", "rect": { "className": "Rect", "topLeftPoint": { "className": "Point", "x": 92, "y": 75 }, "botRightPoint": { "className": "Point", "x": 108, "y": 91 } }, "duration": 0.066, "offset": { "className": "Point", "x": 0, "y": 0 }, "hitboxes": [], "POIs": [] }, { "className": "Frame", "rect": { "className": "Rect", "topLeftPoint": { "className": "Point", "x": 110, "y": 75 }, "botRightPoint": { "className": "Point", "x": 126, "y": 91 } }, "duration": 0.066, "offset": { "className": "Point", "x": 0, "y": 0 }, "hitboxes": [], "POIs": [] }, { "className": "Frame", "rect": { "className": "Rect", "topLeftPoint": { "className": "Point", "x": 128, "y": 75 }, "botRightPoint": { "className": "Point", "x": 144, "y": 91 } }, "duration": 0.066, "offset": { "className": "Point", "x": 0, "y": 0 }, "hitboxes": [], "POIs": [] }, { "className": "Frame", "rect": { "className": "Rect", "topLeftPoint": { "className": "Point", "x": 146, "y": 75 }, "botRightPoint": { "className": "Point", "x": 162, "y": 91 } }, "duration": 0.066, "offset": { "className": "Point", "x": 0, "y": 0 }, "hitboxes": [], "POIs": [] }], "POIs": [], "name": "hud_weapon_icon", "path": "assets/sprites/hud_weapon_icon.json", "alignment": "center", "wrapMode": "once", "spritesheetPath": "assets/spritesheets/effects.png" }, { "className": "Sprite", "hitboxes": [], "frames": [{ "className": "Frame", "rect": { "className": "Rect", "topLeftPoint": { "className": "Point", "x": 264, "y": 157 }, "botRightPoint": { "className": "Point", "x": 292, "y": 188 } }, "duration": 0.12, "offset": { "className": "Point", "x": 0, "y": 0 }, "hitboxes": [], "POIs": [] }, { "className": "Frame", "rect": { "className": "Rect", "topLeftPoint": { "className": "Point", "x": 296, "y": 162 }, "botRightPoint": { "className": "Point", "x": 334, "y": 188 } }, "duration": 0.12, "offset": { "className": "Point", "x": 0, "y": 0 }, "hitboxes": [], "POIs": [] }], "POIs": [], "name": "mmx_dash", "path": "assets/sprites/mmx_dash.json", "alignment": "botmid", "wrapMode": "once", "spritesheetPath": "assets/spritesheets/MegamanX.png" }, { "className": "Sprite", "hitboxes": [], "frames": [{ "className": "Frame", "rect": { "className": "Rect", "topLeftPoint": { "className": "Point", "x": 340, "y": 157 }, "botRightPoint": { "className": "Point", "x": 378, "y": 188 } }, "duration": 0.12, "offset": { "className": "Point", "x": 5, "y": 0 }, "hitboxes": [], "POIs": [{ "className": "POI", "x": 22.399999999999977, "y": -18.19999999999999 }] }, { "className": "Frame", "rect": { "className": "Rect", "topLeftPoint": { "className": "Point", "x": 383, "y": 162 }, "botRightPoint": { "className": "Point", "x": 432, "y": 188 } }, "duration": 0.12, "offset": { "className": "Point", "x": 5, "y": 0 }, "hitboxes": [], "POIs": [{ "className": "POI", "x": 28.399999999999977, "y": -14 }] }], "POIs": [], "name": "mmx_dash_shoot", "path": "assets/sprites/mmx_dash_shoot.json", "alignment": "botmid", "wrapMode": "once", "spritesheetPath": "assets/spritesheets/MegamanX.png" }, { "className": "Sprite", "hitboxes": [], "frames": [{ "className": "Frame", "rect": { "className": "Rect", "topLeftPoint": { "className": "Point", "x": 17, "y": 345 }, "botRightPoint": { "className": "Point", "x": 43, "y": 381 } }, "duration": 0.066, "offset": { "className": "Point", "x": 0, "y": 0 }, "hitboxes": [], "POIs": [] }, { "className": "Frame", "rect": { "className": "Rect", "topLeftPoint": { "className": "Point", "x": 348, "y": 394 }, "botRightPoint": { "className": "Point", "x": 374, "y": 430 } }, "duration": 0.066, "offset": { "className": "Point", "x": 0, "y": 0 }, "hitboxes": [], "POIs": [] }], "POIs": [], "name": "mmx_die", "path": "assets/sprites/mmx_die.json", "alignment": "botmid", "wrapMode": "once", "spritesheetPath": "assets/spritesheets/MegamanX.png" }, { "className": "Sprite", "hitboxes": [], "frames": [{ "className": "Frame", "rect": { "className": "Rect", "topLeftPoint": { "className": "Point", "x": 253, "y": 58 }, "botRightPoint": { "className": "Point", "x": 276, "y": 99 } }, "duration": 0.12, "offset": { "className": "Point", "x": 1, "y": -1 }, "hitboxes": [], "POIs": [] }, { "className": "Frame", "rect": { "className": "Rect", "topLeftPoint": { "className": "Point", "x": 278, "y": 57 }, "botRightPoint": { "className": "Point", "x": 305, "y": 99 } }, "duration": 0.12, "offset": { "className": "Point", "x": 0, "y": 1 }, "hitboxes": [], "POIs": [] }], "POIs": [], "name": "mmx_fall", "path": "assets/sprites/mmx_fall.json", "alignment": "botmid", "wrapMode": "once", "spritesheetPath": "assets/spritesheets/MegamanX.png" }, { "className": "Sprite", "hitboxes": [], "frames": [{ "className": "Frame", "rect": { "className": "Rect", "topLeftPoint": { "className": "Point", "x": 115, "y": 147 }, "botRightPoint": { "className": "Point", "x": 146, "y": 188 } }, "duration": 0.12, "offset": { "className": "Point", "x": 5, "y": -1 }, "hitboxes": [], "POIs": [{ "className": "POI", "x": 19.600000000000023, "y": -29.399999999999977, "tags": "bo" }] }, { "className": "Frame", "rect": { "className": "Rect", "topLeftPoint": { "className": "Point", "x": 149, "y": 146 }, "botRightPoint": { "className": "Point", "x": 180, "y": 188 } }, "duration": 0.12, "offset": { "className": "Point", "x": 5, "y": 0 }, "hitboxes": [], "POIs": [{ "className": "POI", "x": 19.600000000000023, "y": -29.600000000000023, "tags": "bo" }] }], "POIs": [], "name": "mmx_fall_shoot", "path": "assets/sprites/mmx_fall_shoot.json", "alignment": "botmid", "wrapMode": "once", "spritesheetPath": "assets/spritesheets/MegamanX.png" }, { "className": "Sprite", "hitboxes": [], "frames": [{ "className": "Frame", "rect": { "className": "Rect", "topLeftPoint": { "className": "Point", "x": 17, "y": 394 }, "botRightPoint": { "className": "Point", "x": 43, "y": 430 } }, "duration": 0.04, "offset": { "className": "Point", "x": 0, "y": 0 }, "hitboxes": [], "POIs": [] }, { "className": "Frame", "rect": { "className": "Rect", "topLeftPoint": { "className": "Point", "x": 46, "y": 396 }, "botRightPoint": { "className": "Point", "x": 75, "y": 430 } }, "duration": 0.04, "offset": { "className": "Point", "x": 0, "y": 0 }, "hitboxes": [], "POIs": [] }, { "className": "Frame", "rect": { "className": "Rect", "topLeftPoint": { "className": "Point", "x": 79, "y": 396 }, "botRightPoint": { "className": "Point", "x": 108, "y": 430 } }, "duration": 0.04, "offset": { "className": "Point", "x": 0, "y": 0 }, "hitboxes": [], "POIs": [] }, { "className": "Frame", "rect": { "className": "Rect", "topLeftPoint": { "className": "Point", "x": 112, "y": 386 }, "botRightPoint": { "className": "Point", "x": 144, "y": 434 } }, "duration": 0.04, "offset": { "className": "Point", "x": 0, "y": 0 }, "hitboxes": [], "POIs": [] }, { "className": "Frame", "rect": { "className": "Rect", "topLeftPoint": { "className": "Point", "x": 146, "y": 396 }, "botRightPoint": { "className": "Point", "x": 175, "y": 430 } }, "duration": 0.04, "offset": { "className": "Point", "x": 0, "y": 0 }, "hitboxes": [], "POIs": [] }, { "className": "Frame", "rect": { "className": "Rect", "topLeftPoint": { "className": "Point", "x": 179, "y": 386 }, "botRightPoint": { "className": "Point", "x": 211, "y": 434 } }, "duration": 0.04, "offset": { "className": "Point", "x": 0, "y": 0 }, "hitboxes": [], "POIs": [] }, { "className": "Frame", "rect": { "className": "Rect", "topLeftPoint": { "className": "Point", "x": 214, "y": 396 }, "botRightPoint": { "className": "Point", "x": 243, "y": 430 } }, "duration": 0.04, "offset": { "className": "Point", "x": 0, "y": 0 }, "hitboxes": [], "POIs": [] }, { "className": "Frame", "rect": { "className": "Rect", "topLeftPoint": { "className": "Point", "x": 247, "y": 386 }, "botRightPoint": { "className": "Point", "x": 279, "y": 434 } }, "duration": 0.04, "offset": { "className": "Point", "x": 0, "y": 0 }, "hitboxes": [], "POIs": [] }, { "className": "Frame", "rect": { "className": "Rect", "topLeftPoint": { "className": "Point", "x": 282, "y": 396 }, "botRightPoint": { "className": "Point", "x": 311, "y": 430 } }, "duration": 0.04, "offset": { "className": "Point", "x": 0, "y": 0 }, "hitboxes": [], "POIs": [] }, { "className": "Frame", "rect": { "className": "Rect", "topLeftPoint": { "className": "Point", "x": 316, "y": 396 }, "botRightPoint": { "className": "Point", "x": 345, "y": 430 } }, "duration": 0.04, "offset": { "className": "Point", "x": 0, "y": 0 }, "hitboxes": [], "POIs": [] }, { "className": "Frame", "rect": { "className": "Rect", "topLeftPoint": { "className": "Point", "x": 348, "y": 394 }, "botRightPoint": { "className": "Point", "x": 374, "y": 430 } }, "duration": 0.04, "offset": { "className": "Point", "x": 0, "y": 0 }, "hitboxes": [], "POIs": [] }], "POIs": [], "name": "mmx_hurt", "path": "assets/sprites/mmx_hurt.json", "alignment": "botmid", "wrapMode": "once", "spritesheetPath": "assets/spritesheets/MegamanX.png" }, { "className": "Sprite", "hitboxes": [], "frames": [{ "className": "Frame", "rect": { "className": "Rect", "topLeftPoint": { "className": "Point", "x": 302, "y": 16 }, "botRightPoint": { "className": "Point", "x": 332, "y": 50 } }, "duration": 0.066, "offset": { "className": "Point", "x": 0, "y": 0 }, "hitboxes": [], "POIs": [] }], "POIs": [], "name": "mmx_idle", "path": "assets/sprites/mmx_idle.json", "alignment": "botmid", "wrapMode": "loop", "spritesheetPath": "assets/spritesheets/MegamanX.png" }, { "className": "Sprite", "hitboxes": [], "frames": [{ "className": "Frame", "rect": { "className": "Rect", "topLeftPoint": { "className": "Point", "x": 181, "y": 62 }, "botRightPoint": { "className": "Point", "x": 205, "y": 99 } }, "duration": 0.08, "offset": { "className": "Point", "x": 4, "y": 0 }, "hitboxes": [], "POIs": [] }, { "className": "Frame", "rect": { "className": "Rect", "topLeftPoint": { "className": "Point", "x": 210, "y": 58 }, "botRightPoint": { "className": "Point", "x": 225, "y": 99 } }, "duration": 0.08, "offset": { "className": "Point", "x": 4, "y": 0 }, "hitboxes": [], "POIs": [] }, { "className": "Frame", "rect": { "className": "Rect", "topLeftPoint": { "className": "Point", "x": 231, "y": 53 }, "botRightPoint": { "className": "Point", "x": 250, "y": 99 } }, "duration": 0.08, "offset": { "className": "Point", "x": 3, "y": 0 }, "hitboxes": [], "POIs": [] }], "POIs": [], "name": "mmx_jump", "path": "assets/sprites/mmx_jump.json", "alignment": "botmid", "wrapMode": "once", "spritesheetPath": "assets/spritesheets/MegamanX.png" }, { "className": "Sprite", "hitboxes": [], "frames": [{ "className": "Frame", "rect": { "className": "Rect", "topLeftPoint": { "className": "Point", "x": 25, "y": 151 }, "botRightPoint": { "className": "Point", "x": 54, "y": 188 } }, "duration": 0.08, "offset": { "className": "Point", "x": 6, "y": 0 }, "hitboxes": [], "POIs": [{ "className": "POI", "x": 19.80000000000001, "y": -23.19999999999999 }] }, { "className": "Frame", "rect": { "className": "Rect", "topLeftPoint": { "className": "Point", "x": 58, "y": 147 }, "botRightPoint": { "className": "Point", "x": 82, "y": 188 } }, "duration": 0.08, "offset": { "className": "Point", "x": 9, "y": 0 }, "hitboxes": [], "POIs": [{ "className": "POI", "x": 19.600000000000023, "y": -28.399999999999977 }] }, { "className": "Frame", "rect": { "className": "Rect", "topLeftPoint": { "className": "Point", "x": 85, "y": 142 }, "botRightPoint": { "className": "Point", "x": 112, "y": 188 } }, "duration": 0.08, "offset": { "className": "Point", "x": 7, "y": 0 }, "hitboxes": [], "POIs": [{ "className": "POI", "x": 15.800000000000011, "y": -30.399999999999977 }] }], "POIs": [], "name": "mmx_jump_shoot", "path": "assets/sprites/mmx_jump_shoot.json", "alignment": "botmid", "wrapMode": "once", "spritesheetPath": "assets/spritesheets/MegamanX.png" }, { "className": "Sprite", "hitboxes": [], "frames": [{ "className": "Frame", "rect": { "className": "Rect", "topLeftPoint": { "className": "Point", "x": 139, "y": 242 }, "botRightPoint": { "className": "Point", "x": 164, "y": 269 } }, "duration": 0.066, "offset": { "className": "Point", "x": 0, "y": 0 }, "hitboxes": [], "POIs": [] }], "POIs": [], "name": "mmx_kneel", "path": "assets/sprites/mmx_kneel.json", "alignment": "botmid", "wrapMode": "loop", "spritesheetPath": "assets/spritesheets/MegamanX.png" }, { "className": "Sprite", "hitboxes": [], "frames": [{ "className": "Frame", "rect": { "className": "Rect", "topLeftPoint": { "className": "Point", "x": 141, "y": 331 }, "botRightPoint": { "className": "Point", "x": 159, "y": 380 } }, "duration": 0.1, "offset": { "className": "Point", "x": 0, "y": 6 }, "hitboxes": [], "POIs": [] }, { "className": "Frame", "rect": { "className": "Rect", "topLeftPoint": { "className": "Point", "x": 164, "y": 337 }, "botRightPoint": { "className": "Point", "x": 184, "y": 377 } }, "duration": 0.1, "offset": { "className": "Point", "x": 0, "y": 2 }, "hitboxes": [], "POIs": [] }, { "className": "Frame", "rect": { "className": "Rect", "topLeftPoint": { "className": "Point", "x": 188, "y": 337 }, "botRightPoint": { "className": "Point", "x": 208, "y": 377 } }, "duration": 0.1, "offset": { "className": "Point", "x": 0, "y": 2 }, "hitboxes": [], "POIs": [] }, { "className": "Frame", "rect": { "className": "Rect", "topLeftPoint": { "className": "Point", "x": 213, "y": 331 }, "botRightPoint": { "className": "Point", "x": 231, "y": 380 } }, "duration": 0.1, "offset": { "className": "Point", "x": 0, "y": 6 }, "hitboxes": [], "POIs": [] }, { "className": "Frame", "rect": { "className": "Rect", "topLeftPoint": { "className": "Point", "x": 188, "y": 337 }, "botRightPoint": { "className": "Point", "x": 208, "y": 377 } }, "duration": 0.1, "offset": { "className": "Point", "x": 0, "y": 2 }, "hitboxes": [], "POIs": [] }, { "className": "Frame", "rect": { "className": "Rect", "topLeftPoint": { "className": "Point", "x": 164, "y": 337 }, "botRightPoint": { "className": "Point", "x": 184, "y": 377 } }, "duration": 0.1, "offset": { "className": "Point", "x": 0, "y": 2 }, "hitboxes": [], "POIs": [] }], "POIs": [], "name": "mmx_ladder_climb", "path": "assets/sprites/mmx_ladder_climb.json", "alignment": "botmid", "wrapMode": "loop", "spritesheetPath": "assets/spritesheets/MegamanX.png" }, { "className": "Sprite", "hitboxes": [], "frames": [{ "className": "Frame", "rect": { "className": "Rect", "topLeftPoint": { "className": "Point", "x": 236, "y": 336 }, "botRightPoint": { "className": "Point", "x": 257, "y": 368 } }, "duration": 0.12, "offset": { "className": "Point", "x": 0, "y": 0 }, "hitboxes": [], "POIs": [] }, { "className": "Frame", "rect": { "className": "Rect", "topLeftPoint": { "className": "Point", "x": 262, "y": 329 }, "botRightPoint": { "className": "Point", "x": 280, "y": 363 } }, "duration": 0.12, "offset": { "className": "Point", "x": 0, "y": 0 }, "hitboxes": [], "POIs": [] }], "POIs": [], "name": "mmx_ladder_end", "path": "assets/sprites/mmx_ladder_end.json", "alignment": "botmid", "wrapMode": "once", "spritesheetPath": "assets/spritesheets/MegamanX.png" }, { "className": "Sprite", "hitboxes": [], "frames": [{ "className": "Frame", "rect": { "className": "Rect", "topLeftPoint": { "className": "Point", "x": 285, "y": 331 }, "botRightPoint": { "className": "Point", "x": 311, "y": 379 } }, "duration": 0.066, "offset": { "className": "Point", "x": 4, "y": 5 }, "hitboxes": [], "POIs": [{ "className": "POI", "x": 15.800000000000011, "y": -23.399999999999977 }] }], "POIs": [], "name": "mmx_ladder_shoot", "path": "assets/sprites/mmx_ladder_shoot.json", "alignment": "botmid", "wrapMode": "once", "spritesheetPath": "assets/spritesheets/MegamanX.png" }, { "className": "Sprite", "hitboxes": [], "frames": [{ "className": "Frame", "rect": { "className": "Rect", "topLeftPoint": { "className": "Point", "x": 116, "y": 344 }, "botRightPoint": { "className": "Point", "x": 137, "y": 380 } }, "duration": 0.1, "offset": { "className": "Point", "x": 0, "y": 0 }, "hitboxes": [], "POIs": [] }], "POIs": [], "name": "mmx_ladder_start", "path": "assets/sprites/mmx_ladder_start.json", "alignment": "botmid", "wrapMode": "once", "spritesheetPath": "assets/spritesheets/MegamanX.png" }, { "className": "Sprite", "hitboxes": [], "frames": [{ "className": "Frame", "rect": { "className": "Rect", "topLeftPoint": { "className": "Point", "x": 310, "y": 61 }, "botRightPoint": { "className": "Point", "x": 334, "y": 99 } }, "duration": 0.03, "offset": { "className": "Point", "x": 0, "y": 0 }, "hitboxes": [], "POIs": [] }, { "className": "Frame", "rect": { "className": "Rect", "topLeftPoint": { "className": "Point", "x": 335, "y": 67 }, "botRightPoint": { "className": "Point", "x": 365, "y": 99 } }, "duration": 0.03, "offset": { "className": "Point", "x": 0, "y": 0 }, "hitboxes": [], "POIs": [] }], "POIs": [], "name": "mmx_land", "path": "assets/sprites/mmx_land.json", "alignment": "botmid", "wrapMode": "once", "spritesheetPath": "assets/spritesheets/MegamanX.png" }, { "className": "Sprite", "hitboxes": [], "frames": [{ "className": "Frame", "rect": { "className": "Rect", "topLeftPoint": { "className": "Point", "x": 90, "y": 106 }, "botRightPoint": { "className": "Point", "x": 110, "y": 140 } }, "duration": 0.066, "offset": { "className": "Point", "x": 0, "y": 0 }, "hitboxes": [], "POIs": [] }, { "className": "Frame", "rect": { "className": "Rect", "topLeftPoint": { "className": "Point", "x": 115, "y": 105 }, "botRightPoint": { "className": "Point", "x": 138, "y": 140 } }, "duration": 0.066, "offset": { "className": "Point", "x": -2, "y": 0 }, "hitboxes": [], "POIs": [] }, { "className": "Frame", "rect": { "className": "Rect", "topLeftPoint": { "className": "Point", "x": 142, "y": 106 }, "botRightPoint": { "className": "Point", "x": 174, "y": 140 } }, "duration": 0.066, "offset": { "className": "Point", "x": -1, "y": 0 }, "hitboxes": [], "POIs": [] }, { "className": "Frame", "rect": { "className": "Rect", "topLeftPoint": { "className": "Point", "x": 178, "y": 107 }, "botRightPoint": { "className": "Point", "x": 212, "y": 140 } }, "duration": 0.066, "offset": { "className": "Point", "x": -2, "y": 0 }, "hitboxes": [], "POIs": [] }, { "className": "Frame", "rect": { "className": "Rect", "topLeftPoint": { "className": "Point", "x": 216, "y": 107 }, "botRightPoint": { "className": "Point", "x": 242, "y": 140 } }, "duration": 0.066, "offset": { "className": "Point", "x": -2, "y": 0 }, "hitboxes": [], "POIs": [] }, { "className": "Frame", "rect": { "className": "Rect", "topLeftPoint": { "className": "Point", "x": 247, "y": 106 }, "botRightPoint": { "className": "Point", "x": 269, "y": 140 } }, "duration": 0.066, "offset": { "className": "Point", "x": -1, "y": 0 }, "hitboxes": [], "POIs": [] }, { "className": "Frame", "rect": { "className": "Rect", "topLeftPoint": { "className": "Point", "x": 272, "y": 105 }, "botRightPoint": { "className": "Point", "x": 297, "y": 140 } }, "duration": 0.066, "offset": { "className": "Point", "x": -2, "y": 0 }, "hitboxes": [], "POIs": [] }, { "className": "Frame", "rect": { "className": "Rect", "topLeftPoint": { "className": "Point", "x": 301, "y": 106 }, "botRightPoint": { "className": "Point", "x": 331, "y": 140 } }, "duration": 0.066, "offset": { "className": "Point", "x": 0, "y": 0 }, "hitboxes": [], "POIs": [] }, { "className": "Frame", "rect": { "className": "Rect", "topLeftPoint": { "className": "Point", "x": 334, "y": 107 }, "botRightPoint": { "className": "Point", "x": 368, "y": 140 } }, "duration": 0.066, "offset": { "className": "Point", "x": -1, "y": 0 }, "hitboxes": [], "POIs": [] }, { "className": "Frame", "rect": { "className": "Rect", "topLeftPoint": { "className": "Point", "x": 370, "y": 107 }, "botRightPoint": { "className": "Point", "x": 399, "y": 140 } }, "duration": 0.066, "offset": { "className": "Point", "x": -2, "y": 0 }, "hitboxes": [], "POIs": [] }], "POIs": [], "name": "mmx_run", "path": "assets/sprites/mmx_run.json", "alignment": "botmid", "wrapMode": "loop", "spritesheetPath": "assets/spritesheets/MegamanX.png" }, { "className": "Sprite", "hitboxes": [], "frames": [{ "className": "Frame", "rect": { "className": "Rect", "topLeftPoint": { "className": "Point", "x": 49, "y": 192 }, "botRightPoint": { "className": "Point", "x": 78, "y": 226 } }, "duration": 0.066, "offset": { "className": "Point", "x": 4, "y": 0 }, "hitboxes": [], "POIs": [{ "className": "POI", "x": 18.80000000000001, "y": -20.600000000000023 }] }, { "className": "Frame", "rect": { "className": "Rect", "topLeftPoint": { "className": "Point", "x": 81, "y": 191 }, "botRightPoint": { "className": "Point", "x": 113, "y": 226 } }, "duration": 0.066, "offset": { "className": "Point", "x": 3, "y": 0 }, "hitboxes": [], "POIs": [{ "className": "POI", "x": 18.399999999999977, "y": -22 }] }, { "className": "Frame", "rect": { "className": "Rect", "topLeftPoint": { "className": "Point", "x": 116, "y": 192 }, "botRightPoint": { "className": "Point", "x": 151, "y": 226 } }, "duration": 0.066, "offset": { "className": "Point", "x": 1, "y": 0 }, "hitboxes": [], "POIs": [{ "className": "POI", "x": 18.399999999999977, "y": -20.399999999999977 }] }, { "className": "Frame", "rect": { "className": "Rect", "topLeftPoint": { "className": "Point", "x": 155, "y": 193 }, "botRightPoint": { "className": "Point", "x": 193, "y": 226 } }, "duration": 0.066, "offset": { "className": "Point", "x": 0, "y": 0 }, "hitboxes": [], "POIs": [{ "className": "POI", "x": 18.399999999999977, "y": -19.19999999999999 }] }, { "className": "Frame", "rect": { "className": "Rect", "topLeftPoint": { "className": "Point", "x": 197, "y": 193 }, "botRightPoint": { "className": "Point", "x": 231, "y": 226 } }, "duration": 0.066, "offset": { "className": "Point", "x": 2, "y": 0 }, "hitboxes": [], "POIs": [{ "className": "POI", "x": 17.80000000000001, "y": -19.600000000000023 }] }, { "className": "Frame", "rect": { "className": "Rect", "topLeftPoint": { "className": "Point", "x": 234, "y": 192 }, "botRightPoint": { "className": "Point", "x": 265, "y": 226 } }, "duration": 0.066, "offset": { "className": "Point", "x": 3, "y": 0 }, "hitboxes": [], "POIs": [{ "className": "POI", "x": 17.600000000000023, "y": -21 }] }, { "className": "Frame", "rect": { "className": "Rect", "topLeftPoint": { "className": "Point", "x": 268, "y": 191 }, "botRightPoint": { "className": "Point", "x": 301, "y": 226 } }, "duration": 0.066, "offset": { "className": "Point", "x": 2, "y": 0 }, "hitboxes": [], "POIs": [{ "className": "POI", "x": 17, "y": -21.600000000000023 }] }, { "className": "Frame", "rect": { "className": "Rect", "topLeftPoint": { "className": "Point", "x": 304, "y": 192 }, "botRightPoint": { "className": "Point", "x": 339, "y": 226 } }, "duration": 0.066, "offset": { "className": "Point", "x": 1, "y": 0 }, "hitboxes": [], "POIs": [{ "className": "POI", "x": 17.399999999999977, "y": -20.80000000000001 }] }, { "className": "Frame", "rect": { "className": "Rect", "topLeftPoint": { "className": "Point", "x": 343, "y": 193 }, "botRightPoint": { "className": "Point", "x": 380, "y": 226 } }, "duration": 0.066, "offset": { "className": "Point", "x": 0, "y": 0 }, "hitboxes": [], "POIs": [{ "className": "POI", "x": 17.600000000000023, "y": -19.600000000000023 }] }, { "className": "Frame", "rect": { "className": "Rect", "topLeftPoint": { "className": "Point", "x": 383, "y": 193 }, "botRightPoint": { "className": "Point", "x": 418, "y": 226 } }, "duration": 0.066, "offset": { "className": "Point", "x": 1, "y": 0 }, "hitboxes": [], "POIs": [{ "className": "POI", "x": 17.399999999999977, "y": -19.399999999999977 }] }], "POIs": [], "name": "mmx_run_shoot", "path": "assets/sprites/mmx_run_shoot.json", "alignment": "botmid", "wrapMode": "loop", "spritesheetPath": "assets/spritesheets/MegamanX.png" }, { "className": "Sprite", "hitboxes": [], "frames": [{ "className": "Frame", "rect": { "className": "Rect", "topLeftPoint": { "className": "Point", "x": 112, "y": 65 }, "botRightPoint": { "className": "Point", "x": 142, "y": 99 } }, "duration": 0.066, "offset": { "className": "Point", "x": 0, "y": 0 }, "hitboxes": [], "POIs": [{ "className": "POI", "x": 13.600000000000023, "y": -18.80000000000001, "tags": "bo" }] }, { "className": "Frame", "rect": { "className": "Rect", "topLeftPoint": { "className": "Point", "x": 147, "y": 65 }, "botRightPoint": { "className": "Point", "x": 176, "y": 99 } }, "duration": 0.5, "offset": { "className": "Point", "x": -1, "y": 0 }, "hitboxes": [], "POIs": [{ "className": "POI", "x": 12.800000000000011, "y": -18.19999999999999, "tags": "bo" }] }], "POIs": [], "name": "mmx_shoot", "path": "assets/sprites/mmx_shoot.json", "alignment": "botmid", "wrapMode": "once", "spritesheetPath": "assets/spritesheets/MegamanX.png" }, { "className": "Sprite", "hitboxes": [], "frames": [{ "className": "Frame", "rect": { "className": "Rect", "topLeftPoint": { "className": "Point", "x": 130, "y": 284 }, "botRightPoint": { "className": "Point", "x": 160, "y": 323 } }, "duration": 0.1, "offset": { "className": "Point", "x": 0, "y": 0 }, "hitboxes": [], "POIs": [] }, { "className": "Frame", "rect": { "className": "Rect", "topLeftPoint": { "className": "Point", "x": 170, "y": 279 }, "botRightPoint": { "className": "Point", "x": 197, "y": 323 } }, "duration": 0.1, "offset": { "className": "Point", "x": 0, "y": 0 }, "hitboxes": [], "POIs": [] }], "POIs": [], "name": "mmx_wall_kick", "path": "assets/sprites/mmx_wall_kick.json", "alignment": "botmid", "wrapMode": "once", "spritesheetPath": "assets/spritesheets/MegamanX.png" }, { "className": "Sprite", "hitboxes": [], "frames": [{ "className": "Frame", "rect": { "className": "Rect", "topLeftPoint": { "className": "Point", "x": 309, "y": 284 }, "botRightPoint": { "className": "Point", "x": 340, "y": 323 } }, "duration": 0.1, "offset": { "className": "Point", "x": 0, "y": 1 }, "hitboxes": [], "POIs": [{ "className": "POI", "x": 14.800000000000011, "y": -26.19999999999999 }] }, { "className": "Frame", "rect": { "className": "Rect", "topLeftPoint": { "className": "Point", "x": 342, "y": 283 }, "botRightPoint": { "className": "Point", "x": 375, "y": 322 } }, "duration": 0.1, "offset": { "className": "Point", "x": -1, "y": 1 }, "hitboxes": [], "POIs": [{ "className": "POI", "x": 14.600000000000023, "y": -25.80000000000001 }] }, { "className": "Frame", "rect": { "className": "Rect", "topLeftPoint": { "className": "Point", "x": 342, "y": 283 }, "botRightPoint": { "className": "Point", "x": 375, "y": 322 } }, "duration": 0.1, "offset": { "className": "Point", "x": -1, "y": 1 }, "hitboxes": [], "POIs": [{ "className": "POI", "x": 14.800000000000011, "y": -26 }] }], "POIs": [], "name": "mmx_wall_kick_shoot", "path": "assets/sprites/mmx_wall_kick_shoot.json", "alignment": "botmid", "wrapMode": "once", "spritesheetPath": "assets/spritesheets/MegamanX.png" }, { "className": "Sprite", "hitboxes": [], "frames": [{ "className": "Frame", "rect": { "className": "Rect", "topLeftPoint": { "className": "Point", "x": 36, "y": 281 }, "botRightPoint": { "className": "Point", "x": 61, "y": 323 } }, "duration": 0.1, "offset": { "className": "Point", "x": 0, "y": 0 }, "hitboxes": [], "POIs": [] }, { "className": "Frame", "rect": { "className": "Rect", "topLeftPoint": { "className": "Point", "x": 66, "y": 280 }, "botRightPoint": { "className": "Point", "x": 93, "y": 323 } }, "duration": 0.1, "offset": { "className": "Point", "x": 0, "y": 0 }, "hitboxes": [], "POIs": [] }, { "className": "Frame", "rect": { "className": "Rect", "topLeftPoint": { "className": "Point", "x": 97, "y": 281 }, "botRightPoint": { "className": "Point", "x": 125, "y": 323 } }, "duration": 0.1, "offset": { "className": "Point", "x": 0, "y": 0 }, "hitboxes": [], "POIs": [] }], "POIs": [], "name": "mmx_wall_slide", "path": "assets/sprites/mmx_wall_slide.json", "alignment": "botmid", "wrapMode": "once", "spritesheetPath": "assets/spritesheets/MegamanX.png" }, { "className": "Sprite", "hitboxes": [], "frames": [{ "className": "Frame", "rect": { "className": "Rect", "topLeftPoint": { "className": "Point", "x": 235, "y": 281 }, "botRightPoint": { "className": "Point", "x": 267, "y": 324 } }, "duration": 0.1, "offset": { "className": "Point", "x": -4, "y": 1 }, "hitboxes": [], "POIs": [{ "className": "POI", "x": -18.600000000000023, "y": -22.399999999999977 }] }, { "className": "Frame", "rect": { "className": "Rect", "topLeftPoint": { "className": "Point", "x": 273, "y": 280 }, "botRightPoint": { "className": "Point", "x": 305, "y": 322 } }, "duration": 0.1, "offset": { "className": "Point", "x": -2, "y": 0 }, "hitboxes": [], "POIs": [{ "className": "POI", "x": -16.19999999999999, "y": -21.600000000000023 }] }], "POIs": [], "name": "mmx_wall_slide_shoot", "path": "assets/sprites/mmx_wall_slide_shoot.json", "alignment": "botmid", "wrapMode": "once", "spritesheetPath": "assets/spritesheets/MegamanX.png" }, { "className": "Sprite", "hitboxes": [], "frames": [{ "className": "Frame", "rect": { "className": "Rect", "topLeftPoint": { "className": "Point", "x": 124, "y": 449 }, "botRightPoint": { "className": "Point", "x": 152, "y": 494 } }, "duration": 0.03, "offset": { "className": "Point", "x": 0, "y": 0 }, "hitboxes": [], "POIs": [] }, { "className": "Frame", "rect": { "className": "Rect", "topLeftPoint": { "className": "Point", "x": 155, "y": 449 }, "botRightPoint": { "className": "Point", "x": 184, "y": 494 } }, "duration": 0.03, "offset": { "className": "Point", "x": 0, "y": 0 }, "hitboxes": [], "POIs": [] }, { "className": "Frame", "rect": { "className": "Rect", "topLeftPoint": { "className": "Point", "x": 186, "y": 446 }, "botRightPoint": { "className": "Point", "x": 217, "y": 494 } }, "duration": 0.03, "offset": { "className": "Point", "x": 1, "y": 0 }, "hitboxes": [], "POIs": [] }, { "className": "Frame", "rect": { "className": "Rect", "topLeftPoint": { "className": "Point", "x": 224, "y": 449 }, "botRightPoint": { "className": "Point", "x": 253, "y": 494 } }, "duration": 0.03, "offset": { "className": "Point", "x": 0, "y": 0 }, "hitboxes": [], "POIs": [] }, { "className": "Frame", "rect": { "className": "Rect", "topLeftPoint": { "className": "Point", "x": 255, "y": 449 }, "botRightPoint": { "className": "Point", "x": 286, "y": 494 } }, "duration": 0.03, "offset": { "className": "Point", "x": 1, "y": 0 }, "hitboxes": [], "POIs": [] }], "POIs": [], "name": "mmx_win", "path": "assets/sprites/mmx_win.json", "alignment": "botmid", "wrapMode": "once", "spritesheetPath": "assets/spritesheets/MegamanX.png" }, { "className": "Sprite", "hitboxes": [{ "className": "Hitbox", "tags": "", "width": 14, "height": 14, "offset": { "className": "Point", "x": 0, "y": 0 }, "rect": { "className": "Rect", "topLeftPoint": { "className": "Point", "x": 343, "y": 293 }, "botRightPoint": { "className": "Point", "x": 357, "y": 307 } }, "isTrigger": false }], "frames": [{ "className": "Frame", "rect": { "className": "Rect", "topLeftPoint": { "className": "Point", "x": 81, "y": 148 }, "botRightPoint": { "className": "Point", "x": 95, "y": 162 } }, "duration": 0.066, "offset": { "className": "Point", "x": 0, "y": 0 }, "hitboxes": [], "POIs": [] }, { "className": "Frame", "rect": { "className": "Rect", "topLeftPoint": { "className": "Point", "x": 97, "y": 148 }, "botRightPoint": { "className": "Point", "x": 111, "y": 162 } }, "duration": 0.066, "offset": { "className": "Point", "x": 0, "y": 0 }, "hitboxes": [], "POIs": [] }, { "className": "Frame", "rect": { "className": "Rect", "topLeftPoint": { "className": "Point", "x": 113, "y": 148 }, "botRightPoint": { "className": "Point", "x": 127, "y": 162 } }, "duration": 0.066, "offset": { "className": "Point", "x": 0, "y": 0 }, "hitboxes": [], "POIs": [] }], "POIs": [], "name": "pickup_ammo_large", "path": "assets/sprites/pickup_ammo_large.json", "alignment": "center", "wrapMode": "loop", "spritesheetPath": "assets/spritesheets/effects.png" }, { "className": "Sprite", "hitboxes": [{ "className": "Hitbox", "tags": "", "width": 8, "height": 8, "offset": { "className": "Point", "x": 0, "y": 0 }, "rect": { "className": "Rect", "topLeftPoint": { "className": "Point", "x": 346, "y": 296 }, "botRightPoint": { "className": "Point", "x": 354, "y": 304 } }, "isTrigger": false }], "frames": [{ "className": "Frame", "rect": { "className": "Rect", "topLeftPoint": { "className": "Point", "x": 84, "y": 138 }, "botRightPoint": { "className": "Point", "x": 92, "y": 146 } }, "duration": 0.066, "offset": { "className": "Point", "x": 0, "y": 0 }, "hitboxes": [], "POIs": [] }, { "className": "Frame", "rect": { "className": "Rect", "topLeftPoint": { "className": "Point", "x": 100, "y": 138 }, "botRightPoint": { "className": "Point", "x": 108, "y": 146 } }, "duration": 0.066, "offset": { "className": "Point", "x": 0, "y": 0 }, "hitboxes": [], "POIs": [] }, { "className": "Frame", "rect": { "className": "Rect", "topLeftPoint": { "className": "Point", "x": 116, "y": 138 }, "botRightPoint": { "className": "Point", "x": 124, "y": 146 } }, "duration": 0.066, "offset": { "className": "Point", "x": 0, "y": 0 }, "hitboxes": [], "POIs": [] }], "POIs": [], "name": "pickup_ammo_small", "path": "assets/sprites/pickup_ammo_small.json", "alignment": "center", "wrapMode": "loop", "spritesheetPath": "assets/spritesheets/effects.png" }, { "className": "Sprite", "hitboxes": [{ "className": "Hitbox", "tags": "", "width": 14, "height": 12, "offset": { "className": "Point", "x": 0, "y": 0 }, "rect": { "className": "Rect", "topLeftPoint": { "className": "Point", "x": 343, "y": 294 }, "botRightPoint": { "className": "Point", "x": 357, "y": 306 } }, "isTrigger": false }], "frames": [{ "className": "Frame", "rect": { "className": "Rect", "topLeftPoint": { "className": "Point", "x": 3, "y": 150 }, "botRightPoint": { "className": "Point", "x": 17, "y": 162 } }, "duration": 0.03, "offset": { "className": "Point", "x": 0, "y": 0 }, "hitboxes": [], "POIs": [] }, { "className": "Frame", "rect": { "className": "Rect", "topLeftPoint": { "className": "Point", "x": 19, "y": 150 }, "botRightPoint": { "className": "Point", "x": 35, "y": 162 } }, "duration": 0.03, "offset": { "className": "Point", "x": 0, "y": 0 }, "hitboxes": [], "POIs": [] }, { "className": "Frame", "rect": { "className": "Rect", "topLeftPoint": { "className": "Point", "x": 37, "y": 150 }, "botRightPoint": { "className": "Point", "x": 53, "y": 162 } }, "duration": 0.03, "offset": { "className": "Point", "x": 0, "y": 0 }, "hitboxes": [], "POIs": [] }, { "className": "Frame", "rect": { "className": "Rect", "topLeftPoint": { "className": "Point", "x": 55, "y": 150 }, "botRightPoint": { "className": "Point", "x": 71, "y": 162 } }, "duration": 0.03, "offset": { "className": "Point", "x": 0, "y": 0 }, "hitboxes": [], "POIs": [] }, { "className": "Frame", "rect": { "className": "Rect", "topLeftPoint": { "className": "Point", "x": 37, "y": 150 }, "botRightPoint": { "className": "Point", "x": 53, "y": 162 } }, "duration": 0.03, "offset": { "className": "Point", "x": 0, "y": 0 }, "hitboxes": [], "POIs": [] }, { "className": "Frame", "rect": { "className": "Rect", "topLeftPoint": { "className": "Point", "x": 19, "y": 150 }, "botRightPoint": { "className": "Point", "x": 35, "y": 162 } }, "duration": 0.03, "offset": { "className": "Point", "x": 0, "y": 0 }, "hitboxes": [], "POIs": [] }, { "className": "Frame", "rect": { "className": "Rect", "topLeftPoint": { "className": "Point", "x": 3, "y": 150 }, "botRightPoint": { "className": "Point", "x": 17, "y": 162 } }, "duration": 0.03, "offset": { "className": "Point", "x": 0, "y": 0 }, "hitboxes": [], "POIs": [] }], "POIs": [], "name": "pickup_health_large", "path": "assets/sprites/pickup_health_large.json", "alignment": "center", "wrapMode": "loop", "spritesheetPath": "assets/spritesheets/effects.png" }, { "className": "Sprite", "hitboxes": [{ "className": "Hitbox", "tags": "", "width": 8, "height": 8, "offset": { "className": "Point", "x": 0, "y": 0 }, "rect": { "className": "Rect", "topLeftPoint": { "className": "Point", "x": 346, "y": 296 }, "botRightPoint": { "className": "Point", "x": 354, "y": 304 } }, "isTrigger": false }], "frames": [{ "className": "Frame", "rect": { "className": "Rect", "topLeftPoint": { "className": "Point", "x": 6, "y": 138 }, "botRightPoint": { "className": "Point", "x": 14, "y": 146 } }, "duration": 0.03, "offset": { "className": "Point", "x": 0, "y": 0 }, "hitboxes": [], "POIs": [] }, { "className": "Frame", "rect": { "className": "Rect", "topLeftPoint": { "className": "Point", "x": 22, "y": 138 }, "botRightPoint": { "className": "Point", "x": 32, "y": 146 } }, "duration": 0.03, "offset": { "className": "Point", "x": 0, "y": 0 }, "hitboxes": [], "POIs": [] }, { "className": "Frame", "rect": { "className": "Rect", "topLeftPoint": { "className": "Point", "x": 40, "y": 138 }, "botRightPoint": { "className": "Point", "x": 50, "y": 146 } }, "duration": 0.03, "offset": { "className": "Point", "x": 0, "y": 0 }, "hitboxes": [], "POIs": [] }, { "className": "Frame", "rect": { "className": "Rect", "topLeftPoint": { "className": "Point", "x": 58, "y": 138 }, "botRightPoint": { "className": "Point", "x": 68, "y": 146 } }, "duration": 0.03, "offset": { "className": "Point", "x": 0, "y": 0 }, "hitboxes": [], "POIs": [] }, { "className": "Frame", "rect": { "className": "Rect", "topLeftPoint": { "className": "Point", "x": 40, "y": 138 }, "botRightPoint": { "className": "Point", "x": 50, "y": 146 } }, "duration": 0.03, "offset": { "className": "Point", "x": 0, "y": 0 }, "hitboxes": [], "POIs": [] }, { "className": "Frame", "rect": { "className": "Rect", "topLeftPoint": { "className": "Point", "x": 22, "y": 138 }, "botRightPoint": { "className": "Point", "x": 32, "y": 146 } }, "duration": 0.03, "offset": { "className": "Point", "x": 0, "y": 0 }, "hitboxes": [], "POIs": [] }, { "className": "Frame", "rect": { "className": "Rect", "topLeftPoint": { "className": "Point", "x": 6, "y": 138 }, "botRightPoint": { "className": "Point", "x": 14, "y": 146 } }, "duration": 0.03, "offset": { "className": "Point", "x": 0, "y": 0 }, "hitboxes": [], "POIs": [] }], "POIs": [], "name": "pickup_health_small", "path": "assets/sprites/pickup_health_small.json", "alignment": "center", "wrapMode": "loop", "spritesheetPath": "assets/spritesheets/effects.png" }, { "className": "Sprite", "hitboxes": [{ "className": "Hitbox", "tags": "", "width": 31, "height": 30, "offset": { "className": "Point", "x": 0, "y": 0 }, "rect": { "className": "Rect", "topLeftPoint": { "className": "Point", "x": 334.5, "y": 285 }, "botRightPoint": { "className": "Point", "x": 365.5, "y": 315 } } }], "frames": [{ "className": "Frame", "rect": { "className": "Rect", "topLeftPoint": { "className": "Point", "x": 159, "y": 842 }, "botRightPoint": { "className": "Point", "x": 190, "y": 872 } }, "duration": 0.03, "offset": { "className": "Point", "x": 0, "y": 0 }, "hitboxes": [], "POIs": [] }, { "className": "Frame", "rect": { "className": "Rect", "topLeftPoint": { "className": "Point", "x": 126, "y": 842 }, "botRightPoint": { "className": "Point", "x": 157, "y": 872 } }, "duration": 0.03, "offset": { "className": "Point", "x": 0, "y": 0 }, "hitboxes": [], "POIs": [] }, { "className": "Frame", "rect": { "className": "Rect", "topLeftPoint": { "className": "Point", "x": 93, "y": 842 }, "botRightPoint": { "className": "Point", "x": 124, "y": 872 } }, "duration": 0.03, "offset": { "className": "Point", "x": 0, "y": 0 }, "hitboxes": [], "POIs": [] }, { "className": "Frame", "rect": { "className": "Rect", "topLeftPoint": { "className": "Point", "x": 60, "y": 842 }, "botRightPoint": { "className": "Point", "x": 91, "y": 872 } }, "duration": 0.03, "offset": { "className": "Point", "x": 0, "y": 0 }, "hitboxes": [], "POIs": [] }], "POIs": [], "name": "rolling_shield", "path": "assets/sprites/rolling_shield.json", "alignment": "center", "wrapMode": "loop", "spritesheetPath": "assets/spritesheets/effects.png" }, { "className": "Sprite", "hitboxes": [{ "className": "Hitbox", "tags": "", "width": 46, "height": 46, "offset": { "className": "Point", "x": 0, "y": 0 }, "rect": { "className": "Rect", "topLeftPoint": { "className": "Point", "x": 327, "y": 277 }, "botRightPoint": { "className": "Point", "x": 373, "y": 323 } } }], "frames": [{ "className": "Frame", "rect": { "className": "Rect", "topLeftPoint": { "className": "Point", "x": 627, "y": 833 }, "botRightPoint": { "className": "Point", "x": 673, "y": 879 } }, "duration": 0.01, "offset": { "className": "Point", "x": 0, "y": 0 }, "hitboxes": [], "POIs": [] }, { "className": "Frame", "rect": { "className": "Rect", "topLeftPoint": { "className": "Point", "x": 677, "y": 833 }, "botRightPoint": { "className": "Point", "x": 723, "y": 879 } }, "duration": 0.01, "offset": { "className": "Point", "x": 0, "y": 0 }, "hitboxes": [], "POIs": [] }, { "className": "Frame", "rect": { "className": "Rect", "topLeftPoint": { "className": "Point", "x": 727, "y": 833 }, "botRightPoint": { "className": "Point", "x": 773, "y": 879 } }, "duration": 0.01, "offset": { "className": "Point", "x": 0, "y": 0 }, "hitboxes": [], "POIs": [] }, { "className": "Frame", "rect": { "className": "Rect", "topLeftPoint": { "className": "Point", "x": 777, "y": 833 }, "botRightPoint": { "className": "Point", "x": 823, "y": 879 } }, "duration": 0.01, "offset": { "className": "Point", "x": 0, "y": 0 }, "hitboxes": [], "POIs": [] }, { "className": "Frame", "rect": { "className": "Rect", "topLeftPoint": { "className": "Point", "x": 827, "y": 833 }, "botRightPoint": { "className": "Point", "x": 873, "y": 879 } }, "duration": 0.01, "offset": { "className": "Point", "x": 0, "y": 0 }, "hitboxes": [], "POIs": [] }], "POIs": [], "name": "rolling_shield_charge", "path": "sprites/rolling_shield_charge.json", "alignment": "center", "wrapMode": "once", "spritesheetPath": "assets/spritesheets/effects.png" }, { "className": "Sprite", "hitboxes": [], "frames": [{ "className": "Frame", "rect": { "className": "Rect", "topLeftPoint": { "className": "Point", "x": 414, "y": 837 }, "botRightPoint": { "className": "Point", "x": 454, "y": 875 } }, "duration": 0.03, "offset": { "className": "Point", "x": 0, "y": 0 }, "hitboxes": [], "POIs": [] }, { "className": "Frame", "rect": { "className": "Rect", "topLeftPoint": { "className": "Point", "x": 380, "y": 845 }, "botRightPoint": { "className": "Point", "x": 404, "y": 867 } }, "duration": 0.03, "offset": { "className": "Point", "x": 0, "y": 0 }, "hitboxes": [], "POIs": [] }, { "className": "Frame", "rect": { "className": "Rect", "topLeftPoint": { "className": "Point", "x": 361, "y": 851 }, "botRightPoint": { "className": "Point", "x": 371, "y": 861 } }, "duration": 0.03, "offset": { "className": "Point", "x": 0, "y": 0 }, "hitboxes": [], "POIs": [] }], "POIs": [], "name": "rolling_shield_charge_break", "path": "sprites/rolling_shield_charge_break.json", "alignment": "center", "wrapMode": "once", "spritesheetPath": "assets/spritesheets/effects.png" }, { "className": "Sprite", "hitboxes": [], "frames": [{ "className": "Frame", "rect": { "className": "Rect", "topLeftPoint": { "className": "Point", "x": 222, "y": 829 }, "botRightPoint": { "className": "Point", "x": 272, "y": 883 } }, "duration": 0.03, "offset": { "className": "Point", "x": 0, "y": 0 }, "hitboxes": [], "POIs": [] }, { "className": "Frame", "rect": { "className": "Rect", "topLeftPoint": { "className": "Point", "x": 279, "y": 837 }, "botRightPoint": { "className": "Point", "x": 317, "y": 875 } }, "duration": 0.03, "offset": { "className": "Point", "x": 0, "y": 0 }, "hitboxes": [], "POIs": [] }, { "className": "Frame", "rect": { "className": "Rect", "topLeftPoint": { "className": "Point", "x": 327, "y": 843 }, "botRightPoint": { "className": "Point", "x": 353, "y": 869 } }, "duration": 0.03, "offset": { "className": "Point", "x": 0, "y": 0 }, "hitboxes": [], "POIs": [] }, { "className": "Frame", "rect": { "className": "Rect", "topLeftPoint": { "className": "Point", "x": 361, "y": 851 }, "botRightPoint": { "className": "Point", "x": 371, "y": 861 } }, "duration": 0.03, "offset": { "className": "Point", "x": 0, "y": 0 }, "hitboxes": [], "POIs": [] }, { "className": "Frame", "rect": { "className": "Rect", "topLeftPoint": { "className": "Point", "x": 380, "y": 845 }, "botRightPoint": { "className": "Point", "x": 404, "y": 867 } }, "duration": 0.03, "offset": { "className": "Point", "x": 0, "y": 0 }, "hitboxes": [], "POIs": [] }, { "className": "Frame", "rect": { "className": "Rect", "topLeftPoint": { "className": "Point", "x": 414, "y": 837 }, "botRightPoint": { "className": "Point", "x": 454, "y": 875 } }, "duration": 0.03, "offset": { "className": "Point", "x": 0, "y": 0 }, "hitboxes": [], "POIs": [] }, { "className": "Frame", "rect": { "className": "Rect", "topLeftPoint": { "className": "Point", "x": 460, "y": 824 }, "botRightPoint": { "className": "Point", "x": 524, "y": 888 } }, "duration": 0.03, "offset": { "className": "Point", "x": 0, "y": 0 }, "hitboxes": [], "POIs": [] }, { "className": "Frame", "rect": { "className": "Rect", "topLeftPoint": { "className": "Point", "x": 527, "y": 833 }, "botRightPoint": { "className": "Point", "x": 573, "y": 879 } }, "duration": 0.03, "offset": { "className": "Point", "x": 0, "y": 0 }, "hitboxes": [], "POIs": [] }, { "className": "Frame", "rect": { "className": "Rect", "topLeftPoint": { "className": "Point", "x": 577, "y": 833 }, "botRightPoint": { "className": "Point", "x": 623, "y": 879 } }, "duration": 0.03, "offset": { "className": "Point", "x": 0, "y": 0 }, "hitboxes": [], "POIs": [] }], "POIs": [], "name": "rolling_shield_charge_flash", "path": "sprites/rolling_shield_charge_flash.json", "alignment": "center", "wrapMode": "once", "spritesheetPath": "assets/spritesheets/effects.png" }, { "className": "Sprite", "hitboxes": [], "frames": [{ "className": "Frame", "rect": { "className": "Rect", "topLeftPoint": { "className": "Point", "x": 194, "y": 849 }, "botRightPoint": { "className": "Point", "x": 209, "y": 865 } }, "duration": 0.03, "offset": { "className": "Point", "x": 0, "y": 0 }, "hitboxes": [], "POIs": [] }, { "className": "Frame", "rect": { "className": "Rect", "topLeftPoint": { "className": "Point", "x": 213, "y": 855 }, "botRightPoint": { "className": "Point", "x": 217, "y": 859 } }, "duration": 0.03, "offset": { "className": "Point", "x": 0, "y": 0 }, "hitboxes": [], "POIs": [] }], "POIs": [], "name": "rolling_shield_muzzle", "path": "assets/sprites/rolling_shield_muzzle.json", "alignment": "center", "wrapMode": "once", "spritesheetPath": "assets/spritesheets/effects.png" }, { "className": "Sprite", "hitboxes": [{ "className": "Hitbox", "tags": "", "width": 13, "height": 13, "offset": { "className": "Point", "x": 0, "y": 0 }, "rect": { "className": "Rect", "topLeftPoint": { "className": "Point", "x": 343.5, "y": 293.5 }, "botRightPoint": { "className": "Point", "x": 356.5, "y": 306.5 } }, "isTrigger": true }], "frames": [{ "className": "Frame", "rect": { "className": "Rect", "topLeftPoint": { "className": "Point", "x": 368, "y": 958 }, "botRightPoint": { "className": "Point", "x": 381, "y": 971 } }, "duration": 0.066, "offset": { "className": "Point", "x": 0, "y": 0 }, "hitboxes": [], "POIs": [] }], "POIs": [], "name": "shotgun_ice", "path": "assets/sprites/shotgun_ice.json", "alignment": "center", "wrapMode": "once", "spritesheetPath": "assets/spritesheets/effects.png" }, { "className": "Sprite", "hitboxes": [{ "className": "Hitbox", "tags": "", "width": 40, "height": 16, "offset": { "className": "Point", "x": 0, "y": 0 }, "rect": { "className": "Rect", "topLeftPoint": { "className": "Point", "x": 330, "y": 292 }, "botRightPoint": { "className": "Point", "x": 370, "y": 308 } } }], "frames": [{ "className": "Frame", "rect": { "className": "Rect", "topLeftPoint": { "className": "Point", "x": 710, "y": 976 }, "botRightPoint": { "className": "Point", "x": 723, "y": 990 } }, "duration": 0.3, "offset": { "className": "Point", "x": 0, "y": 0 }, "hitboxes": [], "POIs": [] }, { "className": "Frame", "rect": { "className": "Rect", "topLeftPoint": { "className": "Point", "x": 684, "y": 975 }, "botRightPoint": { "className": "Point", "x": 703, "y": 990 } }, "duration": 0.3, "offset": { "className": "Point", "x": 0, "y": 0 }, "hitboxes": [], "POIs": [] }, { "className": "Frame", "rect": { "className": "Rect", "topLeftPoint": { "className": "Point", "x": 648, "y": 975 }, "botRightPoint": { "className": "Point", "x": 677, "y": 990 } }, "duration": 0.3, "offset": { "className": "Point", "x": 0, "y": 0 }, "hitboxes": [], "POIs": [] }, { "className": "Frame", "rect": { "className": "Rect", "topLeftPoint": { "className": "Point", "x": 610, "y": 976 }, "botRightPoint": { "className": "Point", "x": 641, "y": 990 } }, "duration": 0.3, "offset": { "className": "Point", "x": 0, "y": 0 }, "hitboxes": [], "POIs": [] }, { "className": "Frame", "rect": { "className": "Rect", "topLeftPoint": { "className": "Point", "x": 560, "y": 976 }, "botRightPoint": { "className": "Point", "x": 603, "y": 990 } }, "duration": 0.3, "offset": { "className": "Point", "x": 0, "y": 0 }, "hitboxes": [], "POIs": [] }, { "className": "Frame", "rect": { "className": "Rect", "topLeftPoint": { "className": "Point", "x": 514, "y": 976 }, "botRightPoint": { "className": "Point", "x": 554, "y": 992 } }, "duration": 0.3, "offset": { "className": "Point", "x": 0, "y": 0 }, "hitboxes": [], "POIs": [] }], "POIs": [], "name": "shotgun_ice_charge", "path": "sprites/shotgun_ice_charge.json", "alignment": "center", "wrapMode": "once", "spritesheetPath": "assets/spritesheets/effects.png" }, { "className": "Sprite", "hitboxes": [{ "className": "Hitbox", "tags": "", "width": 7, "height": 7, "offset": { "className": "Point", "x": 0, "y": 0 }, "rect": { "className": "Rect", "topLeftPoint": { "className": "Point", "x": 346.5, "y": 296.5 }, "botRightPoint": { "className": "Point", "x": 353.5, "y": 303.5 } }, "isTrigger": true }], "frames": [{ "className": "Frame", "rect": { "className": "Rect", "topLeftPoint": { "className": "Point", "x": 426, "y": 961 }, "botRightPoint": { "className": "Point", "x": 433, "y": 968 } }, "duration": 0.066, "offset": { "className": "Point", "x": 0, "y": 0 }, "hitboxes": [], "POIs": [] }], "POIs": [], "name": "shotgun_ice_piece", "path": "assets/sprites/shotgun_ice_piece.json", "alignment": "center", "wrapMode": "once", "spritesheetPath": "assets/spritesheets/effects.png" }, { "className": "Sprite", "hitboxes": [], "frames": [{ "className": "Frame", "rect": { "className": "Rect", "topLeftPoint": { "className": "Point", "x": 385, "y": 961 }, "botRightPoint": { "className": "Point", "x": 393, "y": 968 } }, "duration": 0.03, "offset": { "className": "Point", "x": 0, "y": 0 }, "hitboxes": [], "POIs": [] }, { "className": "Frame", "rect": { "className": "Rect", "topLeftPoint": { "className": "Point", "x": 395, "y": 962 }, "botRightPoint": { "className": "Point", "x": 403, "y": 969 } }, "duration": 0.03, "offset": { "className": "Point", "x": 0, "y": 0 }, "hitboxes": [], "POIs": [] }, { "className": "Frame", "rect": { "className": "Rect", "topLeftPoint": { "className": "Point", "x": 405, "y": 963 }, "botRightPoint": { "className": "Point", "x": 413, "y": 968 } }, "duration": 0.03, "offset": { "className": "Point", "x": 0, "y": 0 }, "hitboxes": [], "POIs": [] }, { "className": "Frame", "rect": { "className": "Rect", "topLeftPoint": { "className": "Point", "x": 415, "y": 963 }, "botRightPoint": { "className": "Point", "x": 422, "y": 968 } }, "duration": 0.03, "offset": { "className": "Point", "x": 0, "y": 0 }, "hitboxes": [], "POIs": [] }], "POIs": [], "name": "shotgun_ice_sparkles", "path": "assets/sprites/shotgun_ice_sparkles.json", "alignment": "center", "wrapMode": "once", "spritesheetPath": "assets/spritesheets/effects.png" }, { "className": "Sprite", "hitboxes": [{ "className": "Hitbox", "tags": "", "width": 32, "height": 5, "offset": { "className": "Point", "x": 0, "y": 0 }, "rect": { "className": "Rect", "topLeftPoint": { "className": "Point", "x": 334, "y": 297.5 }, "botRightPoint": { "className": "Point", "x": 366, "y": 302.5 } }, "isTrigger": true }], "frames": [{ "className": "Frame", "rect": { "className": "Rect", "topLeftPoint": { "className": "Point", "x": 415, "y": 796 }, "botRightPoint": { "className": "Point", "x": 447, "y": 801 } }, "duration": 0.066, "offset": { "className": "Point", "x": 0, "y": 0 }, "hitboxes": [], "POIs": [] }], "POIs": [], "name": "sting_flat", "path": "assets/sprites/sting_flat.json", "alignment": "center", "wrapMode": "once", "spritesheetPath": "assets/spritesheets/effects.png" }, { "className": "Sprite", "hitboxes": [{ "className": "Hitbox", "tags": "", "width": 20, "height": 5, "offset": { "className": "Point", "x": 0, "y": 0 }, "rect": { "className": "Rect", "topLeftPoint": { "className": "Point", "x": 340, "y": 297.5 }, "botRightPoint": { "className": "Point", "x": 360, "y": 302.5 } }, "isTrigger": true }], "frames": [{ "className": "Frame", "rect": { "className": "Rect", "topLeftPoint": { "className": "Point", "x": 415, "y": 796 }, "botRightPoint": { "className": "Point", "x": 447, "y": 801 } }, "duration": 0.1, "offset": { "className": "Point", "x": -1, "y": 0 }, "hitboxes": [], "POIs": [] }, { "className": "Frame", "rect": { "className": "Rect", "topLeftPoint": { "className": "Point", "x": 451, "y": 783 }, "botRightPoint": { "className": "Point", "x": 483, "y": 815 } }, "duration": 0.03, "offset": { "className": "Point", "x": 0, "y": 0 }, "hitboxes": [], "POIs": [] }, { "className": "Frame", "rect": { "className": "Rect", "topLeftPoint": { "className": "Point", "x": 487, "y": 785 }, "botRightPoint": { "className": "Point", "x": 515, "y": 813 } }, "duration": 0.03, "offset": { "className": "Point", "x": 0, "y": 0 }, "hitboxes": [], "POIs": [] }, { "className": "Frame", "rect": { "className": "Rect", "topLeftPoint": { "className": "Point", "x": 519, "y": 791 }, "botRightPoint": { "className": "Point", "x": 535, "y": 807 } }, "duration": 0.03, "offset": { "className": "Point", "x": 0, "y": 0 }, "hitboxes": [], "POIs": [] }, { "className": "Frame", "rect": { "className": "Rect", "topLeftPoint": { "className": "Point", "x": 539, "y": 792 }, "botRightPoint": { "className": "Point", "x": 553, "y": 806 } }, "duration": 0.03, "offset": { "className": "Point", "x": 0, "y": 0 }, "hitboxes": [], "POIs": [] }, { "className": "Frame", "rect": { "className": "Rect", "topLeftPoint": { "className": "Point", "x": 557, "y": 794 }, "botRightPoint": { "className": "Point", "x": 567, "y": 804 } }, "duration": 0.03, "offset": { "className": "Point", "x": 0, "y": 0 }, "hitboxes": [], "POIs": [] }], "POIs": [], "name": "sting_start", "path": "assets/sprites/sting_start.json", "alignment": "center", "wrapMode": "once", "spritesheetPath": "assets/spritesheets/effects.png" }, { "className": "Sprite", "hitboxes": [{ "className": "Hitbox", "tags": "", "width": 28, "height": 15, "offset": { "className": "Point", "x": 0, "y": 0 }, "rect": { "className": "Rect", "topLeftPoint": { "className": "Point", "x": 336, "y": 292.5 }, "botRightPoint": { "className": "Point", "x": 364, "y": 307.5 } }, "isTrigger": true }], "frames": [{ "className": "Frame", "rect": { "className": "Rect", "topLeftPoint": { "className": "Point", "x": 383, "y": 791 }, "botRightPoint": { "className": "Point", "x": 411, "y": 806 } }, "duration": 0.066, "offset": { "className": "Point", "x": 0, "y": 0 }, "hitboxes": [], "POIs": [] }], "POIs": [], "name": "sting_up", "path": "assets/sprites/sting_up.json", "alignment": "center", "wrapMode": "once", "spritesheetPath": "assets/spritesheets/effects.png" }, { "className": "Sprite", "hitboxes": [{ "className": "Hitbox", "tags": "", "width": 64, "height": 32, "offset": { "className": "Point", "x": 0, "y": 0 }, "rect": { "className": "Rect", "topLeftPoint": { "className": "Point", "x": 318, "y": 284 }, "botRightPoint": { "className": "Point", "x": 382, "y": 316 } }, "isTrigger": true }], "frames": [{ "className": "Frame", "rect": { "className": "Rect", "topLeftPoint": { "className": "Point", "x": 686, "y": 734 }, "botRightPoint": { "className": "Point", "x": 750, "y": 766 } }, "duration": 0.03, "offset": { "className": "Point", "x": 0, "y": 0 }, "hitboxes": [], "POIs": [] }, { "className": "Frame", "rect": { "className": "Rect", "topLeftPoint": { "className": "Point", "x": 769, "y": 735 }, "botRightPoint": { "className": "Point", "x": 812, "y": 767 } }, "duration": 0.03, "offset": { "className": "Point", "x": 0, "y": 0 }, "hitboxes": [], "POIs": [] }, { "className": "Frame", "rect": { "className": "Rect", "topLeftPoint": { "className": "Point", "x": 826, "y": 735 }, "botRightPoint": { "className": "Point", "x": 890, "y": 767 } }, "duration": 0.03, "offset": { "className": "Point", "x": 0, "y": 0 }, "hitboxes": [], "POIs": [] }], "POIs": [], "name": "tornado_charge", "path": "assets/sprites/tornado_charge.json", "alignment": "center", "wrapMode": "loop", "spritesheetPath": "assets/spritesheets/effects.png" }, { "className": "Sprite", "hitboxes": [], "frames": [{ "className": "Frame", "rect": { "className": "Rect", "topLeftPoint": { "className": "Point", "x": 359, "y": 904 }, "botRightPoint": { "className": "Point", "x": 373, "y": 921 } }, "duration": 0.03, "offset": { "className": "Point", "x": 0, "y": 0 }, "hitboxes": [], "POIs": [] }, { "className": "Frame", "rect": { "className": "Rect", "topLeftPoint": { "className": "Point", "x": 435, "y": 898 }, "botRightPoint": { "className": "Point", "x": 449, "y": 927 } }, "duration": 0.03, "offset": { "className": "Point", "x": 0, "y": 0 }, "hitboxes": [], "POIs": [] }, { "className": "Frame", "rect": { "className": "Rect", "topLeftPoint": { "className": "Point", "x": 509, "y": 897 }, "botRightPoint": { "className": "Point", "x": 524, "y": 928 } }, "duration": 0.03, "offset": { "className": "Point", "x": 0, "y": 0 }, "hitboxes": [], "POIs": [] }, { "className": "Frame", "rect": { "className": "Rect", "topLeftPoint": { "className": "Point", "x": 597, "y": 903 }, "botRightPoint": { "className": "Point", "x": 621, "y": 919 } }, "duration": 0.03, "offset": { "className": "Point", "x": 0, "y": 0 }, "hitboxes": [], "POIs": [] }], "POIs": [], "name": "tornado_end", "path": "assets/sprites/tornado_end.json", "alignment": "midleft", "wrapMode": "loop", "spritesheetPath": "assets/spritesheets/effects.png" }, { "className": "Sprite", "hitboxes": [], "frames": [{ "className": "Frame", "rect": { "className": "Rect", "topLeftPoint": { "className": "Point", "x": 334, "y": 904 }, "botRightPoint": { "className": "Point", "x": 350, "y": 921 } }, "duration": 0.03, "offset": { "className": "Point", "x": 0, "y": 0 }, "hitboxes": [], "POIs": [] }, { "className": "Frame", "rect": { "className": "Rect", "topLeftPoint": { "className": "Point", "x": 409, "y": 898 }, "botRightPoint": { "className": "Point", "x": 425, "y": 926 } }, "duration": 0.03, "offset": { "className": "Point", "x": 0, "y": 0 }, "hitboxes": [], "POIs": [] }, { "className": "Frame", "rect": { "className": "Rect", "topLeftPoint": { "className": "Point", "x": 477, "y": 897 }, "botRightPoint": { "className": "Point", "x": 493, "y": 928 } }, "duration": 0.03, "offset": { "className": "Point", "x": 0, "y": 0 }, "hitboxes": [], "POIs": [] }, { "className": "Frame", "rect": { "className": "Rect", "topLeftPoint": { "className": "Point", "x": 563, "y": 903 }, "botRightPoint": { "className": "Point", "x": 579, "y": 919 } }, "duration": 0.03, "offset": { "className": "Point", "x": 0, "y": 0 }, "hitboxes": [], "POIs": [] }], "POIs": [], "name": "tornado_mid", "path": "assets/sprites/tornado_mid.json", "alignment": "midleft", "wrapMode": "loop", "spritesheetPath": "assets/spritesheets/effects.png" }, { "className": "Sprite", "hitboxes": [], "frames": [{ "className": "Frame", "rect": { "className": "Rect", "topLeftPoint": { "className": "Point", "x": 313, "y": 904 }, "botRightPoint": { "className": "Point", "x": 325, "y": 920 } }, "duration": 0.03, "offset": { "className": "Point", "x": 0, "y": 0 }, "hitboxes": [], "POIs": [] }, { "className": "Frame", "rect": { "className": "Rect", "topLeftPoint": { "className": "Point", "x": 388, "y": 899 }, "botRightPoint": { "className": "Point", "x": 396, "y": 925 } }, "duration": 0.03, "offset": { "className": "Point", "x": 0, "y": 0 }, "hitboxes": [], "POIs": [] }, { "className": "Frame", "rect": { "className": "Rect", "topLeftPoint": { "className": "Point", "x": 462, "y": 898 }, "botRightPoint": { "className": "Point", "x": 468, "y": 928 } }, "duration": 0.03, "offset": { "className": "Point", "x": 0, "y": 0 }, "hitboxes": [], "POIs": [] }, { "className": "Frame", "rect": { "className": "Rect", "topLeftPoint": { "className": "Point", "x": 544, "y": 903 }, "botRightPoint": { "className": "Point", "x": 551, "y": 919 } }, "duration": 0.03, "offset": { "className": "Point", "x": 0, "y": 0 }, "hitboxes": [], "POIs": [] }], "POIs": [], "name": "tornado_start", "path": "assets/sprites/tornado_start.json", "alignment": "midright", "wrapMode": "loop", "spritesheetPath": "assets/spritesheets/effects.png" }, { "className": "Sprite", "hitboxes": [{ "className": "Hitbox", "tags": "", "width": 12, "height": 12, "offset": { "className": "Point", "x": 0, "y": 0 }, "rect": { "className": "Rect", "topLeftPoint": { "className": "Point", "x": 344, "y": 294 }, "botRightPoint": { "className": "Point", "x": 356, "y": 306 } }, "isTrigger": true }], "frames": [{ "className": "Frame", "rect": { "className": "Rect", "topLeftPoint": { "className": "Point", "x": 217, "y": 794 }, "botRightPoint": { "className": "Point", "x": 233, "y": 804 } }, "duration": 0.066, "offset": { "className": "Point", "x": 0, "y": 0 }, "hitboxes": [], "POIs": [] }, { "className": "Frame", "rect": { "className": "Rect", "topLeftPoint": { "className": "Point", "x": 235, "y": 793 }, "botRightPoint": { "className": "Point", "x": 251, "y": 806 } }, "duration": 0.066, "offset": { "className": "Point", "x": 0, "y": 0 }, "hitboxes": [], "POIs": [] }, { "className": "Frame", "rect": { "className": "Rect", "topLeftPoint": { "className": "Point", "x": 253, "y": 792 }, "botRightPoint": { "className": "Point", "x": 268, "y": 807 } }, "duration": 0.066, "offset": { "className": "Point", "x": 0, "y": 0 }, "hitboxes": [], "POIs": [] }, { "className": "Frame", "rect": { "className": "Rect", "topLeftPoint": { "className": "Point", "x": 272, "y": 791 }, "botRightPoint": { "className": "Point", "x": 285, "y": 807 } }, "duration": 0.066, "offset": { "className": "Point", "x": 0, "y": 0 }, "hitboxes": [], "POIs": [] }, { "className": "Frame", "rect": { "className": "Rect", "topLeftPoint": { "className": "Point", "x": 292, "y": 791 }, "botRightPoint": { "className": "Point", "x": 302, "y": 807 } }, "duration": 0.066, "offset": { "className": "Point", "x": 0, "y": -1 }, "hitboxes": [], "POIs": [] }], "POIs": [], "name": "torpedo", "path": "assets/sprites/torpedo.json", "alignment": "center", "wrapMode": "once", "spritesheetPath": "assets/spritesheets/effects.png" }, { "className": "Sprite", "hitboxes": [{ "className": "Hitbox", "tags": "", "width": 15, "height": 16, "offset": { "className": "Point", "x": 0, "y": 0 }, "rect": { "className": "Rect", "topLeftPoint": { "className": "Point", "x": 342.5, "y": 292 }, "botRightPoint": { "className": "Point", "x": 357.5, "y": 308 } }, "isTrigger": true }], "frames": [{ "className": "Frame", "rect": { "className": "Rect", "topLeftPoint": { "className": "Point", "x": 127, "y": 791 }, "botRightPoint": { "className": "Point", "x": 142, "y": 807 } }, "duration": 0.066, "offset": { "className": "Point", "x": 0, "y": 0 }, "hitboxes": [], "POIs": [] }, { "className": "Frame", "rect": { "className": "Rect", "topLeftPoint": { "className": "Point", "x": 145, "y": 791 }, "botRightPoint": { "className": "Point", "x": 161, "y": 807 } }, "duration": 0.066, "offset": { "className": "Point", "x": 0, "y": 0 }, "hitboxes": [], "POIs": [] }, { "className": "Frame", "rect": { "className": "Rect", "topLeftPoint": { "className": "Point", "x": 163, "y": 792 }, "botRightPoint": { "className": "Point", "x": 179, "y": 807 } }, "duration": 0.066, "offset": { "className": "Point", "x": 0, "y": 0 }, "hitboxes": [], "POIs": [] }, { "className": "Frame", "rect": { "className": "Rect", "topLeftPoint": { "className": "Point", "x": 181, "y": 791 }, "botRightPoint": { "className": "Point", "x": 197, "y": 807 } }, "duration": 0.066, "offset": { "className": "Point", "x": 0, "y": 0 }, "hitboxes": [], "POIs": [] }, { "className": "Frame", "rect": { "className": "Rect", "topLeftPoint": { "className": "Point", "x": 199, "y": 791 }, "botRightPoint": { "className": "Point", "x": 214, "y": 807 } }, "duration": 0.066, "offset": { "className": "Point", "x": 0, "y": 0 }, "hitboxes": [], "POIs": [] }], "POIs": [], "name": "torpedo_charge", "path": "assets/sprites/torpedo_charge.json", "alignment": "center", "wrapMode": "once", "spritesheetPath": "assets/spritesheets/effects.png" }, { "className": "Sprite", "hitboxes": [], "frames": [{ "className": "Frame", "rect": { "className": "Rect", "topLeftPoint": { "className": "Point", "x": 317, "y": 815 }, "botRightPoint": { "className": "Point", "x": 325, "y": 823 } }, "duration": 0.03, "offset": { "className": "Point", "x": 0, "y": 0 }, "hitboxes": [], "POIs": [] }, { "className": "Frame", "rect": { "className": "Rect", "topLeftPoint": { "className": "Point", "x": 332, "y": 815 }, "botRightPoint": { "className": "Point", "x": 339, "y": 823 } }, "duration": 0.03, "offset": { "className": "Point", "x": 0, "y": 0 }, "hitboxes": [], "POIs": [] }, { "className": "Frame", "rect": { "className": "Rect", "topLeftPoint": { "className": "Point", "x": 346, "y": 815 }, "botRightPoint": { "className": "Point", "x": 352, "y": 822 } }, "duration": 0.03, "offset": { "className": "Point", "x": 0, "y": 0 }, "hitboxes": [], "POIs": [] }, { "className": "Frame", "rect": { "className": "Rect", "topLeftPoint": { "className": "Point", "x": 356, "y": 816 }, "botRightPoint": { "className": "Point", "x": 360, "y": 821 } }, "duration": 0.03, "offset": { "className": "Point", "x": 0, "y": 0 }, "hitboxes": [], "POIs": [] }], "POIs": [], "name": "torpedo_smoke", "path": "assets/sprites/torpedo_smoke.json", "alignment": "center", "wrapMode": "once", "spritesheetPath": "assets/spritesheets/effects.png" }, { "className": "Sprite", "hitboxes": [], "frames": [{ "className": "Frame", "rect": { "className": "Rect", "topLeftPoint": { "className": "Point", "x": 137, "y": 250 }, "botRightPoint": { "className": "Point", "x": 149, "y": 262 } }, "duration": 0.1, "offset": { "className": "Point", "x": 0, "y": 0 }, "hitboxes": [], "POIs": [] }], "POIs": [], "name": "wall_sparks", "path": "assets/sprites/wall_sparks.json", "alignment": "center", "wrapMode": "once", "spritesheetPath": "assets/spritesheets/effects.png" }];
            exports_23("spriteJsons", spriteJsons);
        }
    };
});
System.register("levels", [], function (exports_24, context_24) {
    "use strict";
    var __moduleName = context_24 && context_24.id;
    var levelJsons;
    return {
        setters: [],
        execute: function () {
            levelJsons = [{ "className": "Level", "instances": [{ "className": "ShapeInstance", "name": "Collision Shape", "objectName": "Collision Shape", "points": [{ "className": "Point", "x": 642, "y": 112, "perc_from_left": 0, "perc_from_right": 1, "perc_from_top": 0, "perc_from_bottom": 1 }, { "className": "Point", "x": 734, "y": 112, "perc_from_left": 1, "perc_from_right": 0, "perc_from_top": 0, "perc_from_bottom": 1 }, { "className": "Point", "x": 734, "y": 143, "perc_from_left": 1, "perc_from_right": 0, "perc_from_top": 1, "perc_from_bottom": 0 }, { "className": "Point", "x": 642, "y": 143, "perc_from_left": 0, "perc_from_right": 1, "perc_from_top": 1, "perc_from_bottom": 0 }], "properties": {} }, { "className": "ShapeInstance", "name": "Collision Shape", "objectName": "Collision Shape", "points": [{ "className": "Point", "x": 3, "y": 136, "perc_from_left": 0, "perc_from_right": 1, "perc_from_top": 0, "perc_from_bottom": 1 }, { "className": "Point", "x": 3, "y": 511, "perc_from_left": 0, "perc_from_right": 1, "perc_from_top": 1, "perc_from_bottom": 0 }, { "className": "Point", "x": 288, "y": 511, "perc_from_left": 1, "perc_from_right": 0, "perc_from_top": 1, "perc_from_bottom": 0 }, { "className": "Point", "x": 288, "y": 136, "perc_from_left": 1, "perc_from_right": 0, "perc_from_top": 0, "perc_from_bottom": 1 }], "properties": {} }, { "className": "ShapeInstance", "name": "Collision Shape", "objectName": "Collision Shape", "points": [{ "className": "Point", "x": 420, "y": 172, "perc_from_left": 0, "perc_from_right": 1, "perc_from_top": 0, "perc_from_bottom": 1 }, { "className": "Point", "x": 928, "y": 419, "perc_from_left": 1, "perc_from_right": 0, "perc_from_top": 0, "perc_from_bottom": 1 }, { "className": "Point", "x": 927, "y": 510, "perc_from_left": 1, "perc_from_right": 0, "perc_from_top": 1, "perc_from_bottom": 0 }, { "className": "Point", "x": 419, "y": 510, "perc_from_left": 0, "perc_from_right": 1, "perc_from_top": 1, "perc_from_bottom": 0 }], "properties": {} }, { "className": "ShapeInstance", "name": "Collision Shape", "objectName": "Collision Shape", "points": [{ "className": "Point", "x": 927, "y": 419, "perc_from_left": 0, "perc_from_right": 1, "perc_from_top": 0, "perc_from_bottom": 1 }, { "className": "Point", "x": 1825, "y": 419, "perc_from_left": 1, "perc_from_right": 0, "perc_from_top": 0, "perc_from_bottom": 1 }, { "className": "Point", "x": 1825, "y": 512, "perc_from_left": 1, "perc_from_right": 0, "perc_from_top": 1, "perc_from_bottom": 0 }, { "className": "Point", "x": 927, "y": 512, "perc_from_left": 0, "perc_from_right": 1, "perc_from_top": 1, "perc_from_bottom": 0 }], "properties": {} }, { "className": "ShapeInstance", "name": "Collision Shape", "objectName": "Collision Shape", "points": [{ "className": "Point", "x": 1888, "y": 449, "perc_from_left": 0, "perc_from_right": 1, "perc_from_top": 0, "perc_from_bottom": 1 }, { "className": "Point", "x": 1952, "y": 449, "perc_from_left": 1, "perc_from_right": 0, "perc_from_top": 0, "perc_from_bottom": 1 }, { "className": "Point", "x": 1952, "y": 511, "perc_from_left": 1, "perc_from_right": 0, "perc_from_top": 1, "perc_from_bottom": 0 }, { "className": "Point", "x": 1888, "y": 511, "perc_from_left": 0, "perc_from_right": 1, "perc_from_top": 1, "perc_from_bottom": 0 }], "properties": {} }, { "className": "ShapeInstance", "name": "Collision Shape", "objectName": "Collision Shape", "points": [{ "className": "Point", "x": 1985, "y": 417, "perc_from_left": 0, "perc_from_right": 1, "perc_from_top": 0, "perc_from_bottom": 1 }, { "className": "Point", "x": 2015, "y": 417, "perc_from_left": 1, "perc_from_right": 0, "perc_from_top": 0, "perc_from_bottom": 1 }, { "className": "Point", "x": 2015, "y": 512, "perc_from_left": 1, "perc_from_right": 0, "perc_from_top": 1, "perc_from_bottom": 0 }, { "className": "Point", "x": 1985, "y": 512, "perc_from_left": 0, "perc_from_right": 1, "perc_from_top": 1, "perc_from_bottom": 0 }], "properties": {} }, { "className": "ShapeInstance", "name": "Collision Shape", "objectName": "Collision Shape", "points": [{ "className": "Point", "x": 2080, "y": 449, "perc_from_left": 0, "perc_from_right": 1, "perc_from_top": 0, "perc_from_bottom": 1 }, { "className": "Point", "x": 2241, "y": 449, "perc_from_left": 1, "perc_from_right": 0, "perc_from_top": 0, "perc_from_bottom": 1 }, { "className": "Point", "x": 2241, "y": 512, "perc_from_left": 1, "perc_from_right": 0, "perc_from_top": 1, "perc_from_bottom": 0 }, { "className": "Point", "x": 2080, "y": 512, "perc_from_left": 0, "perc_from_right": 1, "perc_from_top": 1, "perc_from_bottom": 0 }], "properties": {} }, { "className": "ShapeInstance", "name": "Collision Shape", "objectName": "Collision Shape", "points": [{ "className": "Point", "x": 2240, "y": 417, "perc_from_left": 0, "perc_from_right": 1, "perc_from_top": 0, "perc_from_bottom": 1 }, { "className": "Point", "x": 2369, "y": 417, "perc_from_left": 1, "perc_from_right": 0, "perc_from_top": 0, "perc_from_bottom": 1 }, { "className": "Point", "x": 2369, "y": 515, "perc_from_left": 1, "perc_from_right": 0, "perc_from_top": 1, "perc_from_bottom": 0 }, { "className": "Point", "x": 2240, "y": 515, "perc_from_left": 0, "perc_from_right": 1, "perc_from_top": 1, "perc_from_bottom": 0 }], "properties": {} }, { "className": "ShapeInstance", "name": "Collision Shape", "objectName": "Collision Shape", "points": [{ "className": "Point", "x": 2369, "y": 369, "perc_from_left": 0, "perc_from_right": 1, "perc_from_top": 0, "perc_from_bottom": 1 }, { "className": "Point", "x": 2527, "y": 369, "perc_from_left": 1, "perc_from_right": 0, "perc_from_top": 0, "perc_from_bottom": 1 }, { "className": "Point", "x": 2527, "y": 523, "perc_from_left": 1, "perc_from_right": 0, "perc_from_top": 1, "perc_from_bottom": 0 }, { "className": "Point", "x": 2369, "y": 523, "perc_from_left": 0, "perc_from_right": 1, "perc_from_top": 1, "perc_from_bottom": 0 }], "properties": {} }, { "className": "ShapeInstance", "name": "Collision Shape", "objectName": "Collision Shape", "points": [{ "className": "Point", "x": 2528, "y": 419, "perc_from_left": 0, "perc_from_right": 1, "perc_from_top": 0, "perc_from_bottom": 1 }, { "className": "Point", "x": 2736, "y": 419, "perc_from_left": 1, "perc_from_right": 0, "perc_from_top": 0, "perc_from_bottom": 1 }, { "className": "Point", "x": 2736, "y": 640, "perc_from_left": 1, "perc_from_right": 0, "perc_from_top": 1, "perc_from_bottom": 0 }, { "className": "Point", "x": 2528, "y": 640, "perc_from_left": 0, "perc_from_right": 1, "perc_from_top": 1, "perc_from_bottom": 0 }], "properties": {} }, { "className": "ShapeInstance", "name": "Collision Shape", "objectName": "Collision Shape", "points": [{ "className": "Point", "x": 2785, "y": 255, "perc_from_left": 0, "perc_from_right": 1, "perc_from_top": 0, "perc_from_bottom": 1 }, { "className": "Point", "x": 4001, "y": 255, "perc_from_left": 1, "perc_from_right": 0, "perc_from_top": 0, "perc_from_bottom": 1 }, { "className": "Point", "x": 4001, "y": 577, "perc_from_left": 1, "perc_from_right": 0, "perc_from_top": 1, "perc_from_bottom": 0 }, { "className": "Point", "x": 2785, "y": 577, "perc_from_left": 0, "perc_from_right": 1, "perc_from_top": 1, "perc_from_bottom": 0 }], "properties": {} }, { "className": "ShapeInstance", "name": "Collision Shape", "objectName": "Collision Shape", "points": [{ "className": "Point", "x": 2944, "y": 572, "perc_from_left": 0, "perc_from_right": 1, "perc_from_top": 0, "perc_from_bottom": 1 }, { "className": "Point", "x": 3070, "y": 572, "perc_from_left": 1, "perc_from_right": 0, "perc_from_top": 0, "perc_from_bottom": 1 }, { "className": "Point", "x": 3070, "y": 610, "perc_from_left": 1, "perc_from_right": 0, "perc_from_top": 1, "perc_from_bottom": 0 }, { "className": "Point", "x": 2944, "y": 610, "perc_from_left": 0, "perc_from_right": 1, "perc_from_top": 1, "perc_from_bottom": 0 }], "properties": {} }, { "className": "ShapeInstance", "name": "Collision Shape", "objectName": "Collision Shape", "points": [{ "className": "Point", "x": 3999, "y": 510, "perc_from_left": 0, "perc_from_right": 1, "perc_from_top": 0, "perc_from_bottom": 1 }, { "className": "Point", "x": 4064, "y": 510, "perc_from_left": 1, "perc_from_right": 0, "perc_from_top": 0, "perc_from_bottom": 1 }, { "className": "Point", "x": 4064, "y": 707, "perc_from_left": 1, "perc_from_right": 0, "perc_from_top": 1, "perc_from_bottom": 0 }, { "className": "Point", "x": 3999, "y": 707, "perc_from_left": 0, "perc_from_right": 1, "perc_from_top": 1, "perc_from_bottom": 0 }], "properties": { "climbable": "false" } }, { "className": "ShapeInstance", "name": "Collision Shape", "objectName": "Collision Shape", "points": [{ "className": "Point", "x": 3905, "y": 705, "perc_from_left": 1, "perc_from_right": 0, "perc_from_top": 0, "perc_from_bottom": 1 }, { "className": "Point", "x": 3905, "y": 767, "perc_from_left": 1, "perc_from_right": 0, "perc_from_top": 1, "perc_from_bottom": 0 }, { "className": "Point", "x": 4066, "y": 767, "perc_from_left": 0, "perc_from_right": 1, "perc_from_top": 1, "perc_from_bottom": 0 }, { "className": "Point", "x": 4066, "y": 705, "perc_from_left": 0, "perc_from_right": 1, "perc_from_top": 0, "perc_from_bottom": 1 }], "properties": {} }, { "className": "ShapeInstance", "name": "Collision Shape", "objectName": "Collision Shape", "points": [{ "className": "Point", "x": 3647, "y": 706, "perc_from_left": 1, "perc_from_right": 0, "perc_from_top": 0, "perc_from_bottom": 1 }, { "className": "Point", "x": 3647, "y": 767, "perc_from_left": 1, "perc_from_right": 0, "perc_from_top": 1, "perc_from_bottom": 0 }, { "className": "Point", "x": 3839, "y": 767, "perc_from_left": 0, "perc_from_right": 1, "perc_from_top": 1, "perc_from_bottom": 0 }, { "className": "Point", "x": 3839, "y": 706, "perc_from_left": 0, "perc_from_right": 1, "perc_from_top": 0, "perc_from_bottom": 1 }], "properties": {} }, { "className": "ShapeInstance", "name": "Collision Shape", "objectName": "Collision Shape", "points": [{ "className": "Point", "x": 3489, "y": 641, "perc_from_left": 0, "perc_from_right": 1, "perc_from_top": 0, "perc_from_bottom": 1 }, { "className": "Point", "x": 3648, "y": 641, "perc_from_left": 1, "perc_from_right": 0, "perc_from_top": 0, "perc_from_bottom": 1 }, { "className": "Point", "x": 3648, "y": 768, "perc_from_left": 1, "perc_from_right": 0, "perc_from_top": 1, "perc_from_bottom": 0 }, { "className": "Point", "x": 3489, "y": 768, "perc_from_left": 0, "perc_from_right": 1, "perc_from_top": 1, "perc_from_bottom": 0 }], "properties": {} }, { "className": "ShapeInstance", "name": "Collision Shape", "objectName": "Collision Shape", "points": [{ "className": "Point", "x": 3263, "y": 571, "perc_from_left": 0, "perc_from_right": 1, "perc_from_top": 0, "perc_from_bottom": 1 }, { "className": "Point", "x": 3394, "y": 571, "perc_from_left": 1, "perc_from_right": 0, "perc_from_top": 0, "perc_from_bottom": 1 }, { "className": "Point", "x": 3394, "y": 640, "perc_from_left": 1, "perc_from_right": 0, "perc_from_top": 1, "perc_from_bottom": 0 }, { "className": "Point", "x": 3263, "y": 640, "perc_from_left": 0, "perc_from_right": 1, "perc_from_top": 1, "perc_from_bottom": 0 }], "properties": {} }, { "className": "ShapeInstance", "name": "Collision Shape", "objectName": "Collision Shape", "points": [{ "className": "Point", "x": 3200, "y": 705, "perc_from_left": 1, "perc_from_right": 0, "perc_from_top": 0, "perc_from_bottom": 1 }, { "className": "Point", "x": 3200, "y": 766, "perc_from_left": 1, "perc_from_right": 0, "perc_from_top": 1, "perc_from_bottom": 0 }, { "className": "Point", "x": 3489, "y": 766, "perc_from_left": 0, "perc_from_right": 1, "perc_from_top": 1, "perc_from_bottom": 0 }, { "className": "Point", "x": 3489, "y": 705, "perc_from_left": 0, "perc_from_right": 1, "perc_from_top": 0, "perc_from_bottom": 1 }], "properties": {} }, { "className": "ShapeInstance", "name": "Collision Shape", "objectName": "Collision Shape", "points": [{ "className": "Point", "x": 2880, "y": 673, "perc_from_left": 0, "perc_from_right": 1, "perc_from_top": 0, "perc_from_bottom": 1 }, { "className": "Point", "x": 3199, "y": 673, "perc_from_left": 1, "perc_from_right": 0, "perc_from_top": 0, "perc_from_bottom": 1 }, { "className": "Point", "x": 3199, "y": 777, "perc_from_left": 1, "perc_from_right": 0, "perc_from_top": 1, "perc_from_bottom": 0 }, { "className": "Point", "x": 2880, "y": 777, "perc_from_left": 0, "perc_from_right": 1, "perc_from_top": 1, "perc_from_bottom": 0 }], "properties": {} }, { "className": "ShapeInstance", "name": "Collision Shape", "objectName": "Collision Shape", "points": [{ "className": "Point", "x": 2557, "y": 641, "perc_from_left": 0, "perc_from_right": 1, "perc_from_top": 0, "perc_from_bottom": 1 }, { "className": "Point", "x": 2880, "y": 641, "perc_from_left": 1, "perc_from_right": 0, "perc_from_top": 0, "perc_from_bottom": 1 }, { "className": "Point", "x": 2880, "y": 765, "perc_from_left": 1, "perc_from_right": 0, "perc_from_top": 1, "perc_from_bottom": 0 }, { "className": "Point", "x": 2557, "y": 765, "perc_from_left": 0, "perc_from_right": 1, "perc_from_top": 1, "perc_from_bottom": 0 }], "properties": {} }, { "className": "ShapeInstance", "name": "Collision Shape", "objectName": "Collision Shape", "points": [{ "className": "Point", "x": 2624, "y": 254, "perc_from_left": 0, "perc_from_right": 1, "perc_from_top": 0, "perc_from_bottom": 1 }, { "className": "Point", "x": 2783, "y": 254, "perc_from_left": 1, "perc_from_right": 0, "perc_from_top": 0, "perc_from_bottom": 1 }, { "className": "Point", "x": 2783, "y": 320, "perc_from_left": 1, "perc_from_right": 0, "perc_from_top": 1, "perc_from_bottom": 0 }, { "className": "Point", "x": 2624, "y": 320, "perc_from_left": 0, "perc_from_right": 1, "perc_from_top": 1, "perc_from_bottom": 0 }], "properties": {} }, { "className": "ShapeInstance", "name": "Collision Shape", "objectName": "Collision Shape", "points": [{ "className": "Point", "x": 2301, "y": 253, "perc_from_left": 1, "perc_from_right": 0, "perc_from_top": 0, "perc_from_bottom": 1 }, { "className": "Point", "x": 2301, "y": 269, "perc_from_left": 1, "perc_from_right": 0, "perc_from_top": 1, "perc_from_bottom": 0 }, { "className": "Point", "x": 2624, "y": 269, "perc_from_left": 0, "perc_from_right": 1, "perc_from_top": 1, "perc_from_bottom": 0 }, { "className": "Point", "x": 2624, "y": 253, "perc_from_left": 0, "perc_from_right": 1, "perc_from_top": 0, "perc_from_bottom": 1 }], "properties": {} }, { "className": "ShapeInstance", "name": "Collision Shape", "objectName": "Collision Shape", "points": [{ "className": "Point", "x": 897, "y": 242, "perc_from_left": 0, "perc_from_right": 1, "perc_from_top": 0, "perc_from_bottom": 1 }, { "className": "Point", "x": 897, "y": 289, "perc_from_left": 0, "perc_from_right": 1, "perc_from_top": 1, "perc_from_bottom": 0 }, { "className": "Point", "x": 2302, "y": 289, "perc_from_left": 1, "perc_from_right": 0, "perc_from_top": 1, "perc_from_bottom": 0 }, { "className": "Point", "x": 2302, "y": 242, "perc_from_left": 1, "perc_from_right": 0, "perc_from_top": 0, "perc_from_bottom": 1 }], "properties": {} }, { "className": "ShapeInstance", "name": "Collision Shape", "objectName": "Collision Shape", "points": [{ "className": "Point", "x": 800, "y": 158, "perc_from_left": 0, "perc_from_right": 1, "perc_from_top": 0, "perc_from_bottom": 1 }, { "className": "Point", "x": 902, "y": 158, "perc_from_left": 1, "perc_from_right": 0, "perc_from_top": 0, "perc_from_bottom": 1 }, { "className": "Point", "x": 902, "y": 254, "perc_from_left": 1, "perc_from_right": 0, "perc_from_top": 1, "perc_from_bottom": 0 }, { "className": "Point", "x": 800, "y": 254, "perc_from_left": 0, "perc_from_right": 1, "perc_from_top": 1, "perc_from_bottom": 0 }], "properties": {} }, { "className": "ShapeInstance", "name": "Collision Shape", "objectName": "Collision Shape", "points": [{ "className": "Point", "x": 734, "y": 146, "perc_from_left": 0, "perc_from_right": 1, "perc_from_top": 0, "perc_from_bottom": 1 }, { "className": "Point", "x": 808, "y": 146, "perc_from_left": 1, "perc_from_right": 0, "perc_from_top": 0, "perc_from_bottom": 1 }, { "className": "Point", "x": 808, "y": 191, "perc_from_left": 1, "perc_from_right": 0, "perc_from_top": 1, "perc_from_bottom": 0 }, { "className": "Point", "x": 734, "y": 191, "perc_from_left": 0, "perc_from_right": 1, "perc_from_top": 1, "perc_from_bottom": 0 }], "properties": {} }, { "className": "ShapeInstance", "name": "Collision Shape", "objectName": "Collision Shape", "points": [{ "className": "Point", "x": 288, "y": 136, "perc_from_left": 0, "perc_from_right": 1, "perc_from_top": 0, "perc_from_bottom": 1 }, { "className": "Point", "x": 420, "y": 172, "perc_from_left": 1, "perc_from_right": 0, "perc_from_top": 0, "perc_from_bottom": 1 }, { "className": "Point", "x": 420, "y": 513, "perc_from_left": 1, "perc_from_right": 0, "perc_from_top": 1, "perc_from_bottom": 0 }, { "className": "Point", "x": 288, "y": 513, "perc_from_left": 0, "perc_from_right": 1, "perc_from_top": 1, "perc_from_bottom": 0 }], "properties": {} }, { "className": "ShapeInstance", "name": "Collision Shape", "objectName": "Collision Shape", "points": [{ "className": "Point", "x": 607, "y": 59, "perc_from_left": 0, "perc_from_right": 1, "perc_from_top": 0, "perc_from_bottom": 1 }, { "className": "Point", "x": 641, "y": 59, "perc_from_left": 1, "perc_from_right": 0, "perc_from_top": 0, "perc_from_bottom": 1 }, { "className": "Point", "x": 641, "y": 129, "perc_from_left": 1, "perc_from_right": 0, "perc_from_top": 1, "perc_from_bottom": 0 }, { "className": "Point", "x": 607, "y": 129, "perc_from_left": 0, "perc_from_right": 1, "perc_from_top": 1, "perc_from_bottom": 0 }], "properties": {} }, { "className": "ShapeInstance", "name": "Collision Shape", "objectName": "Collision Shape", "points": [{ "className": "Point", "x": 479, "y": 44, "perc_from_left": 0, "perc_from_right": 1, "perc_from_top": 0, "perc_from_bottom": 1 }, { "className": "Point", "x": 542, "y": 44, "perc_from_left": 1, "perc_from_right": 0, "perc_from_top": 0, "perc_from_bottom": 1 }, { "className": "Point", "x": 542, "y": 95, "perc_from_left": 1, "perc_from_right": 0, "perc_from_top": 1, "perc_from_bottom": 0 }, { "className": "Point", "x": 479, "y": 95, "perc_from_left": 0, "perc_from_right": 1, "perc_from_top": 1, "perc_from_bottom": 0 }], "properties": {} }, { "className": "ShapeInstance", "name": "Collision Shape", "objectName": "Collision Shape", "points": [{ "className": "Point", "x": 321, "y": 22, "perc_from_left": 0, "perc_from_right": 1, "perc_from_top": 0, "perc_from_bottom": 1 }, { "className": "Point", "x": 479, "y": 22, "perc_from_left": 1, "perc_from_right": 0, "perc_from_top": 0, "perc_from_bottom": 1 }, { "className": "Point", "x": 479, "y": 61, "perc_from_left": 1, "perc_from_right": 0, "perc_from_top": 1, "perc_from_bottom": 0 }, { "className": "Point", "x": 321, "y": 61, "perc_from_left": 0, "perc_from_right": 1, "perc_from_top": 1, "perc_from_bottom": 0 }], "properties": {} }, { "className": "ShapeInstance", "name": "Collision Shape", "objectName": "Collision Shape", "points": [{ "className": "Point", "x": 256, "y": 4, "perc_from_left": 0, "perc_from_right": 1, "perc_from_top": 1, "perc_from_bottom": 0 }, { "className": "Point", "x": 256, "y": 29, "perc_from_left": 0, "perc_from_right": 1, "perc_from_top": 0, "perc_from_bottom": 1 }, { "className": "Point", "x": 347, "y": 29, "perc_from_left": 1, "perc_from_right": 0, "perc_from_top": 0, "perc_from_bottom": 1 }, { "className": "Point", "x": 347, "y": 4, "perc_from_left": 1, "perc_from_right": 0, "perc_from_top": 1, "perc_from_bottom": 0 }], "properties": { "climbable": "false" } }, { "className": "ShapeInstance", "name": "Collision Shape", "objectName": "Collision Shape", "points": [{ "className": "Point", "x": 539, "y": 52, "perc_from_left": 0, "perc_from_right": 1, "perc_from_top": 0, "perc_from_bottom": 1 }, { "className": "Point", "x": 613, "y": 52, "perc_from_left": 1, "perc_from_right": 0, "perc_from_top": 0, "perc_from_bottom": 1 }, { "className": "Point", "x": 613, "y": 80, "perc_from_left": 1, "perc_from_right": 0, "perc_from_top": 1, "perc_from_bottom": 0 }, { "className": "Point", "x": 539, "y": 80, "perc_from_left": 0, "perc_from_right": 1, "perc_from_top": 1, "perc_from_bottom": 0 }], "properties": {} }, { "className": "ShapeInstance", "name": "Collision Shape", "objectName": "Collision Shape", "points": [{ "className": "Point", "x": 671, "y": 142, "perc_from_left": 0, "perc_from_right": 1, "perc_from_top": 0, "perc_from_bottom": 1 }, { "className": "Point", "x": 734, "y": 142, "perc_from_left": 1, "perc_from_right": 0, "perc_from_top": 0, "perc_from_bottom": 1 }, { "className": "Point", "x": 734, "y": 159, "perc_from_left": 1, "perc_from_right": 0, "perc_from_top": 1, "perc_from_bottom": 0 }, { "className": "Point", "x": 671, "y": 159, "perc_from_left": 0, "perc_from_right": 1, "perc_from_top": 1, "perc_from_bottom": 0 }], "properties": {} }, { "className": "ShapeInstance", "name": "Collision Shape", "objectName": "Collision Shape", "points": [{ "className": "Point", "x": 3837, "y": 743, "perc_from_left": 0, "perc_from_right": 1, "perc_from_top": 0, "perc_from_bottom": 1 }, { "className": "Point", "x": 3908, "y": 743, "perc_from_left": 1, "perc_from_right": 0, "perc_from_top": 0, "perc_from_bottom": 1 }, { "className": "Point", "x": 3908, "y": 767, "perc_from_left": 1, "perc_from_right": 0, "perc_from_top": 1, "perc_from_bottom": 0 }, { "className": "Point", "x": 3837, "y": 767, "perc_from_left": 0, "perc_from_right": 1, "perc_from_top": 1, "perc_from_bottom": 0 }], "properties": {} }, { "className": "ShapeInstance", "name": "Kill Zone", "objectName": "Kill Zone", "points": [{ "className": "Point", "x": 1621, "y": 572, "perc_from_left": 0, "perc_from_right": 1, "perc_from_top": 0, "perc_from_bottom": 1 }, { "className": "Point", "x": 2339, "y": 572, "perc_from_left": 1, "perc_from_right": 0, "perc_from_top": 0, "perc_from_bottom": 1 }, { "className": "Point", "x": 2339, "y": 763, "perc_from_left": 1, "perc_from_right": 0, "perc_from_top": 1, "perc_from_bottom": 0 }, { "className": "Point", "x": 1621, "y": 763, "perc_from_left": 0, "perc_from_right": 1, "perc_from_top": 1, "perc_from_bottom": 0 }], "properties": {} }, { "className": "ShapeInstance", "name": "Kill Zone", "objectName": "Kill Zone", "points": [{ "className": "Point", "x": 3840, "y": 728, "perc_from_left": 0, "perc_from_right": 1, "perc_from_top": 0, "perc_from_bottom": 1 }, { "className": "Point", "x": 3902, "y": 728, "perc_from_left": 1, "perc_from_right": 0, "perc_from_top": 0, "perc_from_bottom": 1 }, { "className": "Point", "x": 3902, "y": 750, "perc_from_left": 1, "perc_from_right": 0, "perc_from_top": 1, "perc_from_bottom": 0 }, { "className": "Point", "x": 3840, "y": 750, "perc_from_left": 0, "perc_from_right": 1, "perc_from_top": 1, "perc_from_bottom": 0 }], "properties": {} }, { "className": "ShapeInstance", "name": "No Scroll", "objectName": "No Scroll", "points": [{ "className": "Point", "x": 4001, "y": 492, "perc_from_left": 0, "perc_from_right": 1, "perc_from_top": 0, "perc_from_bottom": 1 }, { "className": "Point", "x": 4084, "y": 492, "perc_from_left": 1, "perc_from_right": 0, "perc_from_top": 0, "perc_from_bottom": 1 }, { "className": "Point", "x": 4084, "y": 711, "perc_from_left": 1, "perc_from_right": 0, "perc_from_top": 1, "perc_from_bottom": 0 }, { "className": "Point", "x": 4001, "y": 711, "perc_from_left": 0, "perc_from_right": 1, "perc_from_top": 1, "perc_from_bottom": 0 }], "properties": { "freeDir": "left" } }, { "className": "ShapeInstance", "name": "No Scroll", "objectName": "No Scroll", "points": [{ "className": "Point", "x": 2560, "y": 768, "perc_from_left": 0, "perc_from_right": 1, "perc_from_top": 0, "perc_from_bottom": 1 }, { "className": "Point", "x": 4096, "y": 768, "perc_from_left": 1, "perc_from_right": 0, "perc_from_top": 0, "perc_from_bottom": 1 }, { "className": "Point", "x": 4096, "y": 861, "perc_from_left": 1, "perc_from_right": 0, "perc_from_top": 1, "perc_from_bottom": 0 }, { "className": "Point", "x": 2560, "y": 861, "perc_from_left": 0, "perc_from_right": 1, "perc_from_top": 1, "perc_from_bottom": 0 }], "properties": { "freeDir": "up" } }, { "className": "ShapeInstance", "name": "No Scroll", "objectName": "No Scroll", "points": [{ "className": "Point", "x": 743, "y": 2, "perc_from_left": 0.0004952947003467063, "perc_from_right": 0.9995047052996533, "perc_from_top": 0, "perc_from_bottom": 1 }, { "className": "Point", "x": 1021, "y": 258, "perc_from_left": 0, "perc_from_right": 1, "perc_from_top": 1, "perc_from_bottom": 0 }, { "className": "Point", "x": 3042, "y": 258, "perc_from_left": 1, "perc_from_right": 0, "perc_from_top": 1, "perc_from_bottom": 0 }, { "className": "Point", "x": 3042, "y": 2, "perc_from_left": 1, "perc_from_right": 0, "perc_from_top": 0, "perc_from_bottom": 1 }], "properties": { "freeDir": "down" } }, { "className": "ShapeInstance", "name": "No Scroll", "objectName": "No Scroll", "points": [{ "className": "Point", "x": 2883, "y": 244, "perc_from_left": 0, "perc_from_right": 1, "perc_from_top": 0, "perc_from_bottom": 1 }, { "className": "Point", "x": 4000, "y": 244, "perc_from_left": 1, "perc_from_right": 0, "perc_from_top": 0, "perc_from_bottom": 1 }, { "className": "Point", "x": 4000, "y": 515, "perc_from_left": 1, "perc_from_right": 0, "perc_from_top": 1, "perc_from_bottom": 0 }, { "className": "Point", "x": 3072, "y": 515, "perc_from_left": 0, "perc_from_right": 1, "perc_from_top": 1, "perc_from_bottom": 0 }], "properties": { "freeDir": "down" } }, { "className": "ShapeInstance", "name": "No Scroll", "objectName": "No Scroll", "points": [{ "className": "Point", "x": 2, "y": 510, "perc_from_left": 0, "perc_from_right": 1, "perc_from_top": 0, "perc_from_bottom": 1 }, { "className": "Point", "x": 2305, "y": 510, "perc_from_left": 1, "perc_from_right": 0, "perc_from_top": 0, "perc_from_bottom": 1 }, { "className": "Point", "x": 2305, "y": 676, "perc_from_left": 1, "perc_from_right": 0, "perc_from_top": 1, "perc_from_bottom": 0 }, { "className": "Point", "x": 2, "y": 676, "perc_from_left": 0, "perc_from_right": 1, "perc_from_top": 1, "perc_from_bottom": 0 }], "properties": { "freeDir": "up" } }, { "className": "Instance", "name": "Spawn Point1", "objectName": "Spawn Point", "pos": { "className": "Point", "x": 3941, "y": 688 }, "properties": {} }, { "className": "Instance", "name": "Spawn Point11", "objectName": "Spawn Point", "pos": { "className": "Point", "x": 3568, "y": 626 }, "properties": {} }, { "className": "Instance", "name": "Spawn Point2", "objectName": "Spawn Point", "pos": { "className": "Point", "x": 52, "y": 112 }, "properties": {} }, { "className": "Instance", "name": "Spawn Point3", "objectName": "Spawn Point", "pos": { "className": "Point", "x": 3333, "y": 690 }, "properties": {} }, { "className": "Instance", "name": "Spawn Point4", "objectName": "Spawn Point", "pos": { "className": "Point", "x": 3016, "y": 659 }, "properties": {} }, { "className": "Instance", "name": "Spawn Point5", "objectName": "Spawn Point", "pos": { "className": "Point", "x": 2631, "y": 402 }, "properties": {} }, { "className": "Instance", "name": "Spawn Point6", "objectName": "Spawn Point", "pos": { "className": "Point", "x": 2442, "y": 354 }, "properties": {} }, { "className": "Instance", "name": "Spawn Point7", "objectName": "Spawn Point", "pos": { "className": "Point", "x": 2165, "y": 434 }, "properties": {} }, { "className": "Instance", "name": "Spawn Point8", "objectName": "Spawn Point", "pos": { "className": "Point", "x": 1750, "y": 402 }, "properties": {} }, { "className": "Instance", "name": "Spawn Point9", "objectName": "Spawn Point", "pos": { "className": "Point", "x": 1038, "y": 396 }, "properties": {} }, { "className": "Instance", "name": "Spawn Point10", "objectName": "Spawn Point", "pos": { "className": "Point", "x": 1411, "y": 398 }, "properties": {} }, { "className": "ShapeInstance", "name": "Collision Shape", "objectName": "Collision Shape", "points": [{ "className": "Point", "x": 3775, "y": 576, "perc_from_left": 0, "perc_from_right": 1, "perc_from_top": 0, "perc_from_bottom": 1 }, { "className": "Point", "x": 3967, "y": 576, "perc_from_left": 1, "perc_from_right": 0, "perc_from_top": 0, "perc_from_bottom": 1 }, { "className": "Point", "x": 3967, "y": 610, "perc_from_left": 1, "perc_from_right": 0, "perc_from_top": 1, "perc_from_bottom": 0 }, { "className": "Point", "x": 3775, "y": 610, "perc_from_left": 0, "perc_from_right": 1, "perc_from_top": 1, "perc_from_bottom": 0 }], "properties": {} }, { "className": "ShapeInstance", "name": "Collision Shape", "objectName": "Collision Shape", "points": [{ "className": "Point", "x": 3776, "y": 609, "perc_from_left": 0, "perc_from_right": 1, "perc_from_top": 0, "perc_from_bottom": 1 }, { "className": "Point", "x": 3807, "y": 609, "perc_from_left": 1, "perc_from_right": 0, "perc_from_top": 0, "perc_from_bottom": 1 }, { "className": "Point", "x": 3807, "y": 642, "perc_from_left": 1, "perc_from_right": 0, "perc_from_top": 1, "perc_from_bottom": 0 }, { "className": "Point", "x": 3776, "y": 642, "perc_from_left": 0, "perc_from_right": 1, "perc_from_top": 1, "perc_from_bottom": 0 }], "properties": {} }, { "className": "ShapeInstance", "name": "Collision Shape", "objectName": "Collision Shape", "points": [{ "className": "Point", "x": 2240, "y": 289, "perc_from_left": 0, "perc_from_right": 1, "perc_from_top": 0, "perc_from_bottom": 1 }, { "className": "Point", "x": 2271, "y": 289, "perc_from_left": 1, "perc_from_right": 0, "perc_from_top": 0, "perc_from_bottom": 1 }, { "className": "Point", "x": 2271, "y": 303, "perc_from_left": 1, "perc_from_right": 0, "perc_from_top": 1, "perc_from_bottom": 0 }, { "className": "Point", "x": 2240, "y": 303, "perc_from_left": 0, "perc_from_right": 1, "perc_from_top": 1, "perc_from_bottom": 0 }], "properties": {} }, { "className": "ShapeInstance", "name": "Collision Shape", "objectName": "Collision Shape", "points": [{ "className": "Point", "x": 2111, "y": 288, "perc_from_left": 0, "perc_from_right": 1, "perc_from_top": 0, "perc_from_bottom": 1 }, { "className": "Point", "x": 2144, "y": 288, "perc_from_left": 1, "perc_from_right": 0, "perc_from_top": 0, "perc_from_bottom": 1 }, { "className": "Point", "x": 2144, "y": 303, "perc_from_left": 1, "perc_from_right": 0, "perc_from_top": 1, "perc_from_bottom": 0 }, { "className": "Point", "x": 2111, "y": 303, "perc_from_left": 0, "perc_from_right": 1, "perc_from_top": 1, "perc_from_bottom": 0 }], "properties": {} }, { "className": "ShapeInstance", "name": "Collision Shape", "objectName": "Collision Shape", "points": [{ "className": "Point", "x": 1856, "y": 288, "perc_from_left": 0, "perc_from_right": 1, "perc_from_top": 0, "perc_from_bottom": 1 }, { "className": "Point", "x": 1951, "y": 288, "perc_from_left": 1, "perc_from_right": 0, "perc_from_top": 0, "perc_from_bottom": 1 }, { "className": "Point", "x": 1951, "y": 304, "perc_from_left": 1, "perc_from_right": 0, "perc_from_top": 1, "perc_from_bottom": 0 }, { "className": "Point", "x": 1856, "y": 304, "perc_from_left": 0, "perc_from_right": 1, "perc_from_top": 1, "perc_from_bottom": 0 }], "properties": {} }, { "className": "ShapeInstance", "name": "Collision Shape", "objectName": "Collision Shape", "points": [{ "className": "Point", "x": 1889, "y": 303, "perc_from_left": 0, "perc_from_right": 1, "perc_from_top": 0, "perc_from_bottom": 1 }, { "className": "Point", "x": 1920, "y": 303, "perc_from_left": 1, "perc_from_right": 0, "perc_from_top": 0, "perc_from_bottom": 1 }, { "className": "Point", "x": 1920, "y": 318, "perc_from_left": 1, "perc_from_right": 0, "perc_from_top": 1, "perc_from_bottom": 0 }, { "className": "Point", "x": 1889, "y": 318, "perc_from_left": 0, "perc_from_right": 1, "perc_from_top": 1, "perc_from_bottom": 0 }], "properties": {} }, { "className": "ShapeInstance", "name": "Collision Shape", "objectName": "Collision Shape", "points": [{ "className": "Point", "x": 959, "y": 288, "perc_from_left": 0, "perc_from_right": 1, "perc_from_top": 0, "perc_from_bottom": 1 }, { "className": "Point", "x": 1023, "y": 288, "perc_from_left": 1, "perc_from_right": 0, "perc_from_top": 0, "perc_from_bottom": 1 }, { "className": "Point", "x": 1023, "y": 302, "perc_from_left": 1, "perc_from_right": 0, "perc_from_top": 1, "perc_from_bottom": 0 }, { "className": "Point", "x": 959, "y": 302, "perc_from_left": 0, "perc_from_right": 1, "perc_from_top": 1, "perc_from_bottom": 0 }], "properties": {} }, { "className": "ShapeInstance", "name": "Collision Shape", "objectName": "Collision Shape", "points": [{ "className": "Point", "x": -63, "y": 0, "perc_from_left": 0, "perc_from_right": 1, "perc_from_top": 0, "perc_from_bottom": 1 }, { "className": "Point", "x": -63, "y": 236, "perc_from_left": 0, "perc_from_right": 1, "perc_from_top": 1, "perc_from_bottom": 0 }, { "className": "Point", "x": 5, "y": 236, "perc_from_left": 1, "perc_from_right": 0, "perc_from_top": 1, "perc_from_bottom": 0 }, { "className": "Point", "x": 5, "y": 0, "perc_from_left": 1, "perc_from_right": 0, "perc_from_top": 0, "perc_from_bottom": 1 }], "properties": { "climbable": "false" } }], "name": "gallery", "path": "assets/levels/gallery.json", "backgroundPath": "assets/backgrounds/gallery.png" }, { "className": "Level", "instances": [{ "className": "ShapeInstance", "name": "Collision Shape", "objectName": "Collision Shape", "points": [{ "className": "Point", "x": 0, "y": 1, "perc_from_left": 0, "perc_from_right": 1, "perc_from_top": 0, "perc_from_bottom": 1 }, { "className": "Point", "x": 47, "y": 1, "perc_from_left": 1, "perc_from_right": 0, "perc_from_top": 0, "perc_from_bottom": 1 }, { "className": "Point", "x": 47, "y": 225, "perc_from_left": 1, "perc_from_right": 0, "perc_from_top": 1, "perc_from_bottom": 0 }, { "className": "Point", "x": 0, "y": 225, "perc_from_left": 0, "perc_from_right": 1, "perc_from_top": 1, "perc_from_bottom": 0 }], "properties": { "climbable": "false" } }, { "className": "ShapeInstance", "name": "Collision Shape", "objectName": "Collision Shape", "points": [{ "className": "Point", "x": 41, "y": 127, "perc_from_left": 0, "perc_from_right": 1, "perc_from_top": 0, "perc_from_bottom": 1 }, { "className": "Point", "x": 804, "y": 127, "perc_from_left": 1, "perc_from_right": 0, "perc_from_top": 0, "perc_from_bottom": 1 }, { "className": "Point", "x": 804, "y": 180, "perc_from_left": 1, "perc_from_right": 0, "perc_from_top": 1, "perc_from_bottom": 0 }, { "className": "Point", "x": 41, "y": 180, "perc_from_left": 0, "perc_from_right": 1, "perc_from_top": 1, "perc_from_bottom": 0 }], "properties": {} }, { "className": "ShapeInstance", "name": "Collision Shape", "objectName": "Collision Shape", "points": [{ "className": "Point", "x": 827, "y": 95, "perc_from_left": 0, "perc_from_right": 1, "perc_from_top": 0, "perc_from_bottom": 1 }, { "className": "Point", "x": 1318, "y": 95, "perc_from_left": 1, "perc_from_right": 0, "perc_from_top": 0, "perc_from_bottom": 1 }, { "className": "Point", "x": 1318, "y": 144, "perc_from_left": 1, "perc_from_right": 0, "perc_from_top": 1, "perc_from_bottom": 0 }, { "className": "Point", "x": 827, "y": 144, "perc_from_left": 0, "perc_from_right": 1, "perc_from_top": 1, "perc_from_bottom": 0 }], "properties": {} }, { "className": "ShapeInstance", "name": "Collision Shape", "objectName": "Collision Shape", "points": [{ "className": "Point", "x": 861, "y": 141, "perc_from_left": 0, "perc_from_right": 1, "perc_from_top": 0, "perc_from_bottom": 1 }, { "className": "Point", "x": 896, "y": 141, "perc_from_left": 1, "perc_from_right": 0, "perc_from_top": 0, "perc_from_bottom": 1 }, { "className": "Point", "x": 896, "y": 227, "perc_from_left": 1, "perc_from_right": 0, "perc_from_top": 1, "perc_from_bottom": 0 }, { "className": "Point", "x": 861, "y": 227, "perc_from_left": 0, "perc_from_right": 1, "perc_from_top": 1, "perc_from_bottom": 0 }], "properties": {} }, { "className": "ShapeInstance", "name": "Collision Shape", "objectName": "Collision Shape", "points": [{ "className": "Point", "x": 733, "y": 178, "perc_from_left": 0, "perc_from_right": 1, "perc_from_top": 0, "perc_from_bottom": 1 }, { "className": "Point", "x": 767, "y": 178, "perc_from_left": 1, "perc_from_right": 0, "perc_from_top": 0, "perc_from_bottom": 1 }, { "className": "Point", "x": 767, "y": 228, "perc_from_left": 1, "perc_from_right": 0, "perc_from_top": 1, "perc_from_bottom": 0 }, { "className": "Point", "x": 733, "y": 228, "perc_from_left": 0, "perc_from_right": 1, "perc_from_top": 1, "perc_from_bottom": 0 }], "properties": {} }, { "className": "ShapeInstance", "name": "Collision Shape", "objectName": "Collision Shape", "points": [{ "className": "Point", "x": 1247, "y": 141, "perc_from_left": 0, "perc_from_right": 1, "perc_from_top": 0, "perc_from_bottom": 1 }, { "className": "Point", "x": 1279, "y": 141, "perc_from_left": 1, "perc_from_right": 0, "perc_from_top": 0, "perc_from_bottom": 1 }, { "className": "Point", "x": 1279, "y": 228, "perc_from_left": 1, "perc_from_right": 0, "perc_from_top": 1, "perc_from_bottom": 0 }, { "className": "Point", "x": 1247, "y": 228, "perc_from_left": 0, "perc_from_right": 1, "perc_from_top": 1, "perc_from_bottom": 0 }], "properties": {} }, { "className": "ShapeInstance", "name": "Collision Shape", "objectName": "Collision Shape", "points": [{ "className": "Point", "x": 1374, "y": 161, "perc_from_left": 0, "perc_from_right": 1, "perc_from_top": 0, "perc_from_bottom": 1 }, { "className": "Point", "x": 1405, "y": 161, "perc_from_left": 1, "perc_from_right": 0, "perc_from_top": 0, "perc_from_bottom": 1 }, { "className": "Point", "x": 1405, "y": 230, "perc_from_left": 1, "perc_from_right": 0, "perc_from_top": 1, "perc_from_bottom": 0 }, { "className": "Point", "x": 1374, "y": 230, "perc_from_left": 0, "perc_from_right": 1, "perc_from_top": 1, "perc_from_bottom": 0 }], "properties": {} }, { "className": "ShapeInstance", "name": "Collision Shape", "objectName": "Collision Shape", "points": [{ "className": "Point", "x": 1337, "y": 111, "perc_from_left": 0, "perc_from_right": 1, "perc_from_top": 0, "perc_from_bottom": 1 }, { "className": "Point", "x": 2338, "y": 111, "perc_from_left": 1, "perc_from_right": 0, "perc_from_top": 0, "perc_from_bottom": 1 }, { "className": "Point", "x": 2338, "y": 162, "perc_from_left": 1, "perc_from_right": 0, "perc_from_top": 1, "perc_from_bottom": 0 }, { "className": "Point", "x": 1337, "y": 162, "perc_from_left": 0, "perc_from_right": 1, "perc_from_top": 1, "perc_from_bottom": 0 }], "properties": {} }, { "className": "ShapeInstance", "name": "Collision Shape", "objectName": "Collision Shape", "points": [{ "className": "Point", "x": 2271, "y": 154, "perc_from_left": 0, "perc_from_right": 1, "perc_from_top": 0, "perc_from_bottom": 1 }, { "className": "Point", "x": 2303, "y": 154, "perc_from_left": 1, "perc_from_right": 0, "perc_from_top": 0, "perc_from_bottom": 1 }, { "className": "Point", "x": 2303, "y": 229, "perc_from_left": 1, "perc_from_right": 0, "perc_from_top": 1, "perc_from_bottom": 0 }, { "className": "Point", "x": 2271, "y": 229, "perc_from_left": 0, "perc_from_right": 1, "perc_from_top": 1, "perc_from_bottom": 0 }], "properties": {} }, { "className": "ShapeInstance", "name": "Collision Shape", "objectName": "Collision Shape", "points": [{ "className": "Point", "x": 2378, "y": 111, "perc_from_left": 0, "perc_from_right": 1, "perc_from_top": 0, "perc_from_bottom": 1 }, { "className": "Point", "x": 2560, "y": 111, "perc_from_left": 1, "perc_from_right": 0, "perc_from_top": 0, "perc_from_bottom": 1 }, { "className": "Point", "x": 2560, "y": 165, "perc_from_left": 1, "perc_from_right": 0, "perc_from_top": 1, "perc_from_bottom": 0 }, { "className": "Point", "x": 2378, "y": 165, "perc_from_left": 0, "perc_from_right": 1, "perc_from_top": 1, "perc_from_bottom": 0 }], "properties": {} }, { "className": "ShapeInstance", "name": "Collision Shape", "objectName": "Collision Shape", "points": [{ "className": "Point", "x": 2397, "y": 162, "perc_from_left": 0, "perc_from_right": 1, "perc_from_top": 0, "perc_from_bottom": 1 }, { "className": "Point", "x": 2431, "y": 162, "perc_from_left": 1, "perc_from_right": 0, "perc_from_top": 0, "perc_from_bottom": 1 }, { "className": "Point", "x": 2431, "y": 227, "perc_from_left": 1, "perc_from_right": 0, "perc_from_top": 1, "perc_from_bottom": 0 }, { "className": "Point", "x": 2397, "y": 227, "perc_from_left": 0, "perc_from_right": 1, "perc_from_top": 1, "perc_from_bottom": 0 }], "properties": {} }, { "className": "ShapeInstance", "name": "Collision Shape", "objectName": "Collision Shape", "points": [{ "className": "Point", "x": 2562, "y": 5, "perc_from_left": 0, "perc_from_right": 1, "perc_from_top": 1, "perc_from_bottom": 0 }, { "className": "Point", "x": 2562, "y": 110, "perc_from_left": 0, "perc_from_right": 1, "perc_from_top": 0, "perc_from_bottom": 1 }, { "className": "Point", "x": 2630, "y": 110, "perc_from_left": 1, "perc_from_right": 0, "perc_from_top": 0, "perc_from_bottom": 1 }, { "className": "Point", "x": 2630, "y": 5, "perc_from_left": 1, "perc_from_right": 0, "perc_from_top": 1, "perc_from_bottom": 0 }], "properties": { "climbable": "false" } }, { "className": "Instance", "name": "Spawn Point1", "objectName": "Spawn Point", "pos": { "className": "Point", "x": 150, "y": 108 }, "properties": {} }, { "className": "Instance", "name": "Spawn Point2", "objectName": "Spawn Point", "pos": { "className": "Point", "x": 572, "y": 108 }, "properties": {} }, { "className": "Instance", "name": "Spawn Point3", "objectName": "Spawn Point", "pos": { "className": "Point", "x": 886, "y": 79 }, "properties": {} }, { "className": "Instance", "name": "Spawn Point4", "objectName": "Spawn Point", "pos": { "className": "Point", "x": 2473, "y": 96 }, "properties": {} }, { "className": "Instance", "name": "Spawn Point5", "objectName": "Spawn Point", "pos": { "className": "Point", "x": 2165, "y": 90 }, "properties": {} }, { "className": "Instance", "name": "Spawn Point6", "objectName": "Spawn Point", "pos": { "className": "Point", "x": 1878, "y": 91 }, "properties": {} }, { "className": "Instance", "name": "Spawn Point7", "objectName": "Spawn Point", "pos": { "className": "Point", "x": 1436, "y": 88 }, "properties": {} }, { "className": "Instance", "name": "Spawn Point8", "objectName": "Spawn Point", "pos": { "className": "Point", "x": 1218, "y": 77 }, "properties": {} }, { "className": "ShapeInstance", "name": "No Scroll", "objectName": "No Scroll", "points": [{ "className": "Point", "x": 32, "y": 224, "perc_from_left": 0, "perc_from_right": 1, "perc_from_top": 0, "perc_from_bottom": 1 }, { "className": "Point", "x": 2587, "y": 224, "perc_from_left": 1, "perc_from_right": 0, "perc_from_top": 0, "perc_from_bottom": 1 }, { "className": "Point", "x": 2587, "y": 466, "perc_from_left": 1, "perc_from_right": 0, "perc_from_top": 1, "perc_from_bottom": 0 }, { "className": "Point", "x": 32, "y": 466, "perc_from_left": 0, "perc_from_right": 1, "perc_from_top": 1, "perc_from_bottom": 0 }], "properties": { "freeDir": "up" } }, { "className": "ShapeInstance", "name": "No Scroll", "objectName": "No Scroll", "points": [{ "className": "Point", "x": 2563, "y": 5, "perc_from_left": 1, "perc_from_right": 0, "perc_from_top": 1, "perc_from_bottom": 0 }, { "className": "Point", "x": 2728, "y": 5, "perc_from_left": 0, "perc_from_right": 1, "perc_from_top": 1, "perc_from_bottom": 0 }, { "className": "Point", "x": 2728, "y": 254, "perc_from_left": 0, "perc_from_right": 1, "perc_from_top": 0, "perc_from_bottom": 1 }, { "className": "Point", "x": 2563, "y": 254, "perc_from_left": 1, "perc_from_right": 0, "perc_from_top": 0, "perc_from_bottom": 1 }], "properties": { "freeDir": "left" } }, { "className": "ShapeInstance", "name": "Jump Zone", "objectName": "Jump Zone", "points": [{ "className": "Point", "x": 801, "y": 11, "perc_from_left": 0, "perc_from_right": 1, "perc_from_top": 0, "perc_from_bottom": 1 }, { "className": "Point", "x": 828, "y": 11, "perc_from_left": 1, "perc_from_right": 0, "perc_from_top": 0, "perc_from_bottom": 1 }, { "className": "Point", "x": 828, "y": 152, "perc_from_left": 1, "perc_from_right": 0, "perc_from_top": 1, "perc_from_bottom": 0 }, { "className": "Point", "x": 801, "y": 152, "perc_from_left": 0, "perc_from_right": 1, "perc_from_top": 1, "perc_from_bottom": 0 }], "properties": {} }, { "className": "ShapeInstance", "name": "Jump Zone", "objectName": "Jump Zone", "points": [{ "className": "Point", "x": 1311, "y": 2, "perc_from_left": 0, "perc_from_right": 1, "perc_from_top": 0, "perc_from_bottom": 1 }, { "className": "Point", "x": 1342, "y": 2, "perc_from_left": 1, "perc_from_right": 0, "perc_from_top": 0, "perc_from_bottom": 1 }, { "className": "Point", "x": 1342, "y": 173, "perc_from_left": 1, "perc_from_right": 0, "perc_from_top": 1, "perc_from_bottom": 0 }, { "className": "Point", "x": 1311, "y": 173, "perc_from_left": 0, "perc_from_right": 1, "perc_from_top": 1, "perc_from_bottom": 0 }], "properties": {} }, { "className": "ShapeInstance", "name": "Jump Zone", "objectName": "Jump Zone", "points": [{ "className": "Point", "x": 2336, "y": 19, "perc_from_left": 0, "perc_from_right": 1, "perc_from_top": 0, "perc_from_bottom": 1 }, { "className": "Point", "x": 2381, "y": 19, "perc_from_left": 1, "perc_from_right": 0, "perc_from_top": 0, "perc_from_bottom": 1 }, { "className": "Point", "x": 2381, "y": 221, "perc_from_left": 1, "perc_from_right": 0, "perc_from_top": 1, "perc_from_bottom": 0 }, { "className": "Point", "x": 2336, "y": 221, "perc_from_left": 0, "perc_from_right": 1, "perc_from_top": 1, "perc_from_bottom": 0 }], "properties": {} }], "name": "highway", "path": "assets/levels/highway.json", "backgroundPath": "assets/backgrounds/highway.png" }, { "className": "Level", "instances": [{ "className": "ShapeInstance", "name": "Collision Shape", "objectName": "Collision Shape", "points": [{ "className": "Point", "x": -40, "y": 56, "perc_from_left": 0, "perc_from_right": 1, "perc_from_top": 0, "perc_from_bottom": 1 }, { "className": "Point", "x": 5, "y": 56, "perc_from_left": 1, "perc_from_right": 0, "perc_from_top": 0, "perc_from_bottom": 1 }, { "className": "Point", "x": 5, "y": 445, "perc_from_left": 1, "perc_from_right": 0, "perc_from_top": 1, "perc_from_bottom": 0 }, { "className": "Point", "x": -40, "y": 445, "perc_from_left": 0, "perc_from_right": 1, "perc_from_top": 1, "perc_from_bottom": 0 }] }, { "className": "ShapeInstance", "name": "Collision Shape", "objectName": "Collision Shape", "points": [{ "className": "Point", "x": -11, "y": 417, "perc_from_left": 0, "perc_from_right": 1, "perc_from_top": 0, "perc_from_bottom": 1 }, { "className": "Point", "x": 1141, "y": 417, "perc_from_left": 1, "perc_from_right": 0, "perc_from_top": 0, "perc_from_bottom": 1 }, { "className": "Point", "x": 1141, "y": 432, "perc_from_left": 1, "perc_from_right": 0, "perc_from_top": 1, "perc_from_bottom": 0 }, { "className": "Point", "x": -11, "y": 432, "perc_from_left": 0, "perc_from_right": 1, "perc_from_top": 1, "perc_from_bottom": 0 }] }, { "className": "ShapeInstance", "name": "Collision Shape", "objectName": "Collision Shape", "points": [{ "className": "Point", "x": 256, "y": 64, "perc_from_left": 0, "perc_from_right": 1, "perc_from_top": 0, "perc_from_bottom": 1 }, { "className": "Point", "x": 288, "y": 64, "perc_from_left": 1, "perc_from_right": 0, "perc_from_top": 0, "perc_from_bottom": 1 }, { "className": "Point", "x": 288, "y": 300, "perc_from_left": 1, "perc_from_right": 0, "perc_from_top": 1, "perc_from_bottom": 0 }, { "className": "Point", "x": 256, "y": 300, "perc_from_left": 0, "perc_from_right": 1, "perc_from_top": 1, "perc_from_bottom": 0 }] }, { "className": "ShapeInstance", "name": "Collision Shape", "objectName": "Collision Shape", "points": [{ "className": "Point", "x": 448, "y": 296, "perc_from_left": 0, "perc_from_right": 1, "perc_from_top": 0, "perc_from_bottom": 1 }, { "className": "Point", "x": 480, "y": 296, "perc_from_left": 1, "perc_from_right": 0, "perc_from_top": 0, "perc_from_bottom": 1 }, { "className": "Point", "x": 480, "y": 425, "perc_from_left": 1, "perc_from_right": 0, "perc_from_top": 1, "perc_from_bottom": 0 }, { "className": "Point", "x": 448, "y": 425, "perc_from_left": 0, "perc_from_right": 1, "perc_from_top": 1, "perc_from_bottom": 0 }] }, { "className": "ShapeInstance", "name": "Collision Shape", "objectName": "Collision Shape", "points": [{ "className": "Point", "x": 678, "y": 160, "perc_from_left": 0, "perc_from_right": 1, "perc_from_top": 0, "perc_from_bottom": 1 }, { "className": "Point", "x": 763, "y": 160, "perc_from_left": 1, "perc_from_right": 0, "perc_from_top": 0, "perc_from_bottom": 1 }, { "className": "Point", "x": 763, "y": 176, "perc_from_left": 1, "perc_from_right": 0, "perc_from_top": 1, "perc_from_bottom": 0 }, { "className": "Point", "x": 678, "y": 176, "perc_from_left": 0, "perc_from_right": 1, "perc_from_top": 1, "perc_from_bottom": 0 }] }, { "className": "ShapeInstance", "name": "Collision Shape", "objectName": "Collision Shape", "points": [{ "className": "Point", "x": 1183, "y": 28, "perc_from_left": 0, "perc_from_right": 1, "perc_from_top": 0, "perc_from_bottom": 1 }, { "className": "Point", "x": 1312, "y": 28, "perc_from_left": 1, "perc_from_right": 0, "perc_from_top": 0, "perc_from_bottom": 1 }, { "className": "Point", "x": 1312, "y": 129, "perc_from_left": 1, "perc_from_right": 0, "perc_from_top": 1, "perc_from_bottom": 0 }, { "className": "Point", "x": 1183, "y": 129, "perc_from_left": 0, "perc_from_right": 1, "perc_from_top": 1, "perc_from_bottom": 0 }] }, { "className": "ShapeInstance", "name": "Collision Shape", "objectName": "Collision Shape", "points": [{ "className": "Point", "x": 832, "y": 174, "perc_from_left": 0, "perc_from_right": 1, "perc_from_top": 0, "perc_from_bottom": 1 }, { "className": "Point", "x": 864, "y": 174, "perc_from_left": 1, "perc_from_right": 0, "perc_from_top": 0, "perc_from_bottom": 1 }, { "className": "Point", "x": 864, "y": 297, "perc_from_left": 1, "perc_from_right": 0, "perc_from_top": 1, "perc_from_bottom": 0 }, { "className": "Point", "x": 832, "y": 297, "perc_from_left": 0, "perc_from_right": 1, "perc_from_top": 1, "perc_from_bottom": 0 }] }, { "className": "ShapeInstance", "name": "Collision Shape", "objectName": "Collision Shape", "points": [{ "className": "Point", "x": 704, "y": 55, "perc_from_left": 0, "perc_from_right": 1, "perc_from_top": 0, "perc_from_bottom": 1 }, { "className": "Point", "x": 736, "y": 55, "perc_from_left": 1, "perc_from_right": 0, "perc_from_top": 0, "perc_from_bottom": 1 }, { "className": "Point", "x": 736, "y": 170, "perc_from_left": 1, "perc_from_right": 0, "perc_from_top": 1, "perc_from_bottom": 0 }, { "className": "Point", "x": 704, "y": 170, "perc_from_left": 0, "perc_from_right": 1, "perc_from_top": 1, "perc_from_bottom": 0 }] }, { "className": "ShapeInstance", "name": "Collision Shape", "objectName": "Collision Shape", "points": [{ "className": "Point", "x": 960, "y": 302, "perc_from_left": 0, "perc_from_right": 1, "perc_from_top": 0, "perc_from_bottom": 1 }, { "className": "Point", "x": 992, "y": 302, "perc_from_left": 1, "perc_from_right": 0, "perc_from_top": 0, "perc_from_bottom": 1 }, { "className": "Point", "x": 992, "y": 429, "perc_from_left": 1, "perc_from_right": 0, "perc_from_top": 1, "perc_from_bottom": 0 }, { "className": "Point", "x": 960, "y": 429, "perc_from_left": 0, "perc_from_right": 1, "perc_from_top": 1, "perc_from_bottom": 0 }] }, { "className": "ShapeInstance", "name": "Collision Shape", "objectName": "Collision Shape", "points": [{ "className": "Point", "x": 1152, "y": 160, "perc_from_left": 0, "perc_from_right": 1, "perc_from_top": 0, "perc_from_bottom": 1 }, { "className": "Point", "x": 1306, "y": 160, "perc_from_left": 1, "perc_from_right": 0, "perc_from_top": 0, "perc_from_bottom": 1 }, { "className": "Point", "x": 1306, "y": 512, "perc_from_left": 1, "perc_from_right": 0, "perc_from_top": 1, "perc_from_bottom": 0 }, { "className": "Point", "x": 1152, "y": 512, "perc_from_left": 0, "perc_from_right": 1, "perc_from_top": 1, "perc_from_bottom": 0 }] }, { "className": "ShapeInstance", "name": "Collision Shape", "objectName": "Collision Shape", "points": [{ "className": "Point", "x": 608, "y": 171, "perc_from_left": 0, "perc_from_right": 1, "perc_from_top": 0, "perc_from_bottom": 1 }, { "className": "Point", "x": 640, "y": 171, "perc_from_left": 1, "perc_from_right": 0, "perc_from_top": 0, "perc_from_bottom": 1 }, { "className": "Point", "x": 640, "y": 300, "perc_from_left": 1, "perc_from_right": 0, "perc_from_top": 1, "perc_from_bottom": 0 }, { "className": "Point", "x": 608, "y": 300, "perc_from_left": 0, "perc_from_right": 1, "perc_from_top": 1, "perc_from_bottom": 0 }] }, { "className": "ShapeInstance", "name": "Collision Shape", "objectName": "Collision Shape", "points": [{ "className": "Point", "x": 1, "y": 33, "perc_from_left": 0, "perc_from_right": 1, "perc_from_top": 0, "perc_from_bottom": 1 }, { "className": "Point", "x": 1185, "y": 33, "perc_from_left": 1, "perc_from_right": 0, "perc_from_top": 0, "perc_from_bottom": 1 }, { "className": "Point", "x": 1185, "y": 64, "perc_from_left": 1, "perc_from_right": 0, "perc_from_top": 1, "perc_from_bottom": 0 }, { "className": "Point", "x": 1, "y": 64, "perc_from_left": 0, "perc_from_right": 1, "perc_from_top": 1, "perc_from_bottom": 0 }] }, { "className": "ShapeInstance", "name": "Collision Shape", "objectName": "Collision Shape", "points": [{ "className": "Point", "x": 933, "y": 288, "perc_from_left": 0, "perc_from_right": 1, "perc_from_top": 0, "perc_from_bottom": 1 }, { "className": "Point", "x": 1151, "y": 288, "perc_from_left": 1, "perc_from_right": 0, "perc_from_top": 0, "perc_from_bottom": 1 }, { "className": "Point", "x": 1151, "y": 304, "perc_from_left": 1, "perc_from_right": 0, "perc_from_top": 1, "perc_from_bottom": 0 }, { "className": "Point", "x": 933, "y": 304, "perc_from_left": 0, "perc_from_right": 1, "perc_from_top": 1, "perc_from_bottom": 0 }] }, { "className": "ShapeInstance", "name": "Collision Shape", "objectName": "Collision Shape", "points": [{ "className": "Point", "x": 791, "y": 160, "perc_from_left": 0, "perc_from_right": 1, "perc_from_top": 0, "perc_from_bottom": 1 }, { "className": "Point", "x": 1152, "y": 160, "perc_from_left": 1, "perc_from_right": 0, "perc_from_top": 0, "perc_from_bottom": 1 }, { "className": "Point", "x": 1152, "y": 177, "perc_from_left": 1, "perc_from_right": 0, "perc_from_top": 1, "perc_from_bottom": 0 }, { "className": "Point", "x": 791, "y": 177, "perc_from_left": 0, "perc_from_right": 1, "perc_from_top": 1, "perc_from_bottom": 0 }] }, { "className": "ShapeInstance", "name": "Collision Shape", "objectName": "Collision Shape", "points": [{ "className": "Point", "x": 566, "y": 288, "perc_from_left": 0, "perc_from_right": 1, "perc_from_top": 0, "perc_from_bottom": 1 }, { "className": "Point", "x": 907, "y": 288, "perc_from_left": 1, "perc_from_right": 0, "perc_from_top": 0, "perc_from_bottom": 1 }, { "className": "Point", "x": 907, "y": 304, "perc_from_left": 1, "perc_from_right": 0, "perc_from_top": 1, "perc_from_bottom": 0 }, { "className": "Point", "x": 566, "y": 304, "perc_from_left": 0, "perc_from_right": 1, "perc_from_top": 1, "perc_from_bottom": 0 }] }, { "className": "ShapeInstance", "name": "Collision Shape", "objectName": "Collision Shape", "points": [{ "className": "Point", "x": 1, "y": 288, "perc_from_left": 0, "perc_from_right": 1, "perc_from_top": 0, "perc_from_bottom": 1 }, { "className": "Point", "x": 362, "y": 288, "perc_from_left": 1, "perc_from_right": 0, "perc_from_top": 0, "perc_from_bottom": 1 }, { "className": "Point", "x": 362, "y": 304, "perc_from_left": 1, "perc_from_right": 0, "perc_from_top": 1, "perc_from_bottom": 0 }, { "className": "Point", "x": 1, "y": 304, "perc_from_left": 0, "perc_from_right": 1, "perc_from_top": 1, "perc_from_bottom": 0 }] }, { "className": "ShapeInstance", "name": "Collision Shape", "objectName": "Collision Shape", "points": [{ "className": "Point", "x": 582, "y": 160, "perc_from_left": 0, "perc_from_right": 1, "perc_from_top": 0, "perc_from_bottom": 1 }, { "className": "Point", "x": 650, "y": 160, "perc_from_left": 1, "perc_from_right": 0, "perc_from_top": 0, "perc_from_bottom": 1 }, { "className": "Point", "x": 650, "y": 176, "perc_from_left": 1, "perc_from_right": 0, "perc_from_top": 1, "perc_from_bottom": 0 }, { "className": "Point", "x": 582, "y": 176, "perc_from_left": 0, "perc_from_right": 1, "perc_from_top": 1, "perc_from_bottom": 0 }] }, { "className": "ShapeInstance", "name": "Collision Shape", "objectName": "Collision Shape", "points": [{ "className": "Point", "x": 0, "y": 160, "perc_from_left": 0, "perc_from_right": 1, "perc_from_top": 0, "perc_from_bottom": 1 }, { "className": "Point", "x": 554, "y": 160, "perc_from_left": 1, "perc_from_right": 0, "perc_from_top": 0, "perc_from_bottom": 1 }, { "className": "Point", "x": 554, "y": 177, "perc_from_left": 1, "perc_from_right": 0, "perc_from_top": 1, "perc_from_bottom": 0 }, { "className": "Point", "x": 0, "y": 177, "perc_from_left": 0, "perc_from_right": 1, "perc_from_top": 1, "perc_from_bottom": 0 }] }, { "className": "ShapeInstance", "name": "Collision Shape", "objectName": "Collision Shape", "points": [{ "className": "Point", "x": 390, "y": 288, "perc_from_left": 0, "perc_from_right": 1, "perc_from_top": 0, "perc_from_bottom": 1 }, { "className": "Point", "x": 538, "y": 288, "perc_from_left": 1, "perc_from_right": 0, "perc_from_top": 0, "perc_from_bottom": 1 }, { "className": "Point", "x": 538, "y": 304, "perc_from_left": 1, "perc_from_right": 0, "perc_from_top": 1, "perc_from_bottom": 0 }, { "className": "Point", "x": 390, "y": 304, "perc_from_left": 0, "perc_from_right": 1, "perc_from_top": 1, "perc_from_bottom": 0 }] }, { "className": "ShapeInstance", "name": "Ladder1", "objectName": "Ladder", "points": [{ "className": "Point", "x": 363, "y": 288, "perc_from_left": 0, "perc_from_right": 1, "perc_from_top": 0, "perc_from_bottom": 1 }, { "className": "Point", "x": 389, "y": 288, "perc_from_left": 1, "perc_from_right": 0, "perc_from_top": 0, "perc_from_bottom": 1 }, { "className": "Point", "x": 389, "y": 352, "perc_from_left": 1, "perc_from_right": 0, "perc_from_top": 1, "perc_from_bottom": 0 }, { "className": "Point", "x": 363, "y": 352, "perc_from_left": 0, "perc_from_right": 1, "perc_from_top": 1, "perc_from_bottom": 0 }] }, { "className": "ShapeInstance", "name": "Ladder2", "objectName": "Ladder", "points": [{ "className": "Point", "x": 554, "y": 160, "perc_from_left": 0, "perc_from_right": 1, "perc_from_top": 0, "perc_from_bottom": 1 }, { "className": "Point", "x": 581, "y": 160, "perc_from_left": 1, "perc_from_right": 0, "perc_from_top": 0, "perc_from_bottom": 1 }, { "className": "Point", "x": 581, "y": 223, "perc_from_left": 1, "perc_from_right": 0, "perc_from_top": 1, "perc_from_bottom": 0 }, { "className": "Point", "x": 554, "y": 223, "perc_from_left": 0, "perc_from_right": 1, "perc_from_top": 1, "perc_from_bottom": 0 }] }, { "className": "ShapeInstance", "name": "Ladder3", "objectName": "Ladder", "points": [{ "className": "Point", "x": 650, "y": 160, "perc_from_left": 0, "perc_from_right": 1, "perc_from_top": 0, "perc_from_bottom": 1 }, { "className": "Point", "x": 678, "y": 160, "perc_from_left": 1, "perc_from_right": 0, "perc_from_top": 0, "perc_from_bottom": 1 }, { "className": "Point", "x": 678, "y": 225, "perc_from_left": 1, "perc_from_right": 0, "perc_from_top": 1, "perc_from_bottom": 0 }, { "className": "Point", "x": 650, "y": 225, "perc_from_left": 0, "perc_from_right": 1, "perc_from_top": 1, "perc_from_bottom": 0 }] }, { "className": "ShapeInstance", "name": "Ladder4", "objectName": "Ladder", "points": [{ "className": "Point", "x": 538, "y": 288, "perc_from_left": 0, "perc_from_right": 1, "perc_from_top": 0, "perc_from_bottom": 1 }, { "className": "Point", "x": 566, "y": 288, "perc_from_left": 1, "perc_from_right": 0, "perc_from_top": 0, "perc_from_bottom": 1 }, { "className": "Point", "x": 566, "y": 352, "perc_from_left": 1, "perc_from_right": 0, "perc_from_top": 1, "perc_from_bottom": 0 }, { "className": "Point", "x": 538, "y": 352, "perc_from_left": 0, "perc_from_right": 1, "perc_from_top": 1, "perc_from_bottom": 0 }] }, { "className": "ShapeInstance", "name": "Ladder5", "objectName": "Ladder", "points": [{ "className": "Point", "x": 760, "y": 160, "perc_from_left": 0, "perc_from_right": 1, "perc_from_top": 0, "perc_from_bottom": 1 }, { "className": "Point", "x": 791, "y": 160, "perc_from_left": 1, "perc_from_right": 0, "perc_from_top": 0, "perc_from_bottom": 1 }, { "className": "Point", "x": 791, "y": 224, "perc_from_left": 1, "perc_from_right": 0, "perc_from_top": 1, "perc_from_bottom": 0 }, { "className": "Point", "x": 760, "y": 224, "perc_from_left": 0, "perc_from_right": 1, "perc_from_top": 1, "perc_from_bottom": 0 }] }, { "className": "ShapeInstance", "name": "Ladder6", "objectName": "Ladder", "points": [{ "className": "Point", "x": 906, "y": 288, "perc_from_left": 0, "perc_from_right": 1, "perc_from_top": 0, "perc_from_bottom": 1 }, { "className": "Point", "x": 934, "y": 288, "perc_from_left": 1, "perc_from_right": 0, "perc_from_top": 0, "perc_from_bottom": 1 }, { "className": "Point", "x": 934, "y": 368, "perc_from_left": 1, "perc_from_right": 0, "perc_from_top": 1, "perc_from_bottom": 0 }, { "className": "Point", "x": 906, "y": 368, "perc_from_left": 0, "perc_from_right": 1, "perc_from_top": 1, "perc_from_bottom": 0 }] }, { "className": "ShapeInstance", "name": "No Scroll", "objectName": "No Scroll", "points": [{ "className": "Point", "x": 1183, "y": 11, "perc_from_left": 0, "perc_from_right": 1, "perc_from_top": 0, "perc_from_bottom": 1 }, { "className": "Point", "x": 1394, "y": 11, "perc_from_left": 1, "perc_from_right": 0, "perc_from_top": 0, "perc_from_bottom": 1 }, { "className": "Point", "x": 1394, "y": 504, "perc_from_left": 1, "perc_from_right": 0, "perc_from_top": 1, "perc_from_bottom": 0 }, { "className": "Point", "x": 1183, "y": 504, "perc_from_left": 0, "perc_from_right": 1, "perc_from_top": 1, "perc_from_bottom": 0 }], "properties": { "freeDir": "left" } }, { "className": "ShapeInstance", "name": "No Scroll", "objectName": "No Scroll", "points": [{ "className": "Point", "x": 3, "y": 479, "perc_from_left": 0, "perc_from_right": 1, "perc_from_top": 0, "perc_from_bottom": 1 }, { "className": "Point", "x": 1154, "y": 479, "perc_from_left": 1, "perc_from_right": 0, "perc_from_top": 0, "perc_from_bottom": 1 }, { "className": "Point", "x": 1154, "y": 586, "perc_from_left": 1, "perc_from_right": 0, "perc_from_top": 1, "perc_from_bottom": 0 }, { "className": "Point", "x": 3, "y": 586, "perc_from_left": 0, "perc_from_right": 1, "perc_from_top": 1, "perc_from_bottom": 0 }], "properties": { "freeDir": "up" } }, { "className": "Instance", "name": "Node1", "objectName": "Node", "pos": { "className": "Point", "x": 377, "y": 404 }, "properties": { "neighbors": [{ "nodeName": "Node2", "ladderName": "Ladder1", "isJumpNode": true }] } }, { "className": "Instance", "name": "Node2", "objectName": "Node", "pos": { "className": "Point", "x": 376, "y": 275 }, "properties": { "neighbors": [{ "nodeName": "Node1", "ladderName": "Ladder1", "isDropNode": true }, { "nodeName": "Node3" }] } }, { "className": "Instance", "name": "Node3", "objectName": "Node", "pos": { "className": "Point", "x": 550, "y": 276 }, "properties": { "neighbors": [{ "nodeName": "Node2" }, { "nodeName": "Node6", "ladderName": "Ladder4", "isDropNode": true }, { "nodeName": "Node5" }] } }, { "className": "Instance", "name": "Node4", "objectName": "Node", "pos": { "className": "Point", "x": 568, "y": 146 }, "properties": { "neighbors": [{ "nodeName": "Node5", "ladderName": "Ladder2", "isDropNode": true }, { "nodeName": "Node9" }] } }, { "className": "Instance", "name": "Node5", "objectName": "Node", "pos": { "className": "Point", "x": 571, "y": 276 }, "properties": { "neighbors": [{ "nodeName": "Node3" }, { "nodeName": "Node4", "ladderName": "Ladder2", "isJumpNode": true }] } }, { "className": "Instance", "name": "Node6", "objectName": "Node", "pos": { "className": "Point", "x": 552, "y": 403 }, "properties": { "neighbors": [{ "nodeName": "Node3", "isJumpNode": true, "ladderName": "Ladder4" }, { "nodeName": "Node7" }] } }, { "className": "Instance", "name": "Node7", "objectName": "Node", "pos": { "className": "Point", "x": 919, "y": 402 }, "properties": { "neighbors": [{ "nodeName": "Node6" }, { "nodeName": "Node8", "ladderName": "Ladder6", "isJumpNode": true }] } }, { "className": "Instance", "name": "Node8", "objectName": "Node", "pos": { "className": "Point", "x": 921, "y": 274 }, "properties": { "neighbors": [{ "nodeName": "Node7", "isDropNode": true, "ladderName": "Ladder6" }] } }, { "className": "Instance", "name": "Node9", "objectName": "Node", "pos": { "className": "Point", "x": 666, "y": 146 }, "properties": { "neighbors": [{ "nodeName": "Node4" }, { "nodeName": "Node10", "ladderName": "Ladder3", "isDropNode": true }] } }, { "className": "Instance", "name": "Node10", "objectName": "Node", "pos": { "className": "Point", "x": 665, "y": 274 }, "properties": { "neighbors": [{ "nodeName": "Node9", "ladderName": "Ladder3", "isJumpNode": true }, { "nodeName": "Node11" }] } }, { "className": "Instance", "name": "Node11", "objectName": "Node", "pos": { "className": "Point", "x": 776, "y": 273 }, "properties": { "neighbors": [{ "nodeName": "Node10" }, { "nodeName": "Node12", "ladderName": "Ladder5", "isJumpNode": true }] } }, { "className": "Instance", "name": "Node12", "objectName": "Node", "pos": { "className": "Point", "x": 776, "y": 146 }, "properties": { "neighbors": [{ "nodeName": "Node11", "ladderName": "Ladder5", "isDropNode": true }] } }, { "className": "Instance", "name": "Spawn Point1", "objectName": "Spawn Point", "pos": { "className": "Point", "x": 465, "y": 277 }, "properties": {} }, { "className": "Instance", "name": "Spawn Point2", "objectName": "Spawn Point", "pos": { "className": "Point", "x": 409, "y": 149 }, "properties": {} }, { "className": "Instance", "name": "Spawn Point3", "objectName": "Spawn Point", "pos": { "className": "Point", "x": 723, "y": 278 }, "properties": {} }, { "className": "Instance", "name": "Spawn Point4", "objectName": "Spawn Point", "pos": { "className": "Point", "x": 998, "y": 147 }, "properties": {} }, { "className": "Instance", "name": "Spawn Point5", "objectName": "Spawn Point", "pos": { "className": "Point", "x": 611, "y": 403 }, "properties": {} }, { "className": "Instance", "name": "Spawn Point6", "objectName": "Spawn Point", "pos": { "className": "Point", "x": 1078, "y": 276 }, "properties": {} }, { "className": "Instance", "name": "Spawn Point7", "objectName": "Spawn Point", "pos": { "className": "Point", "x": 185, "y": 405 }, "properties": {} }, { "className": "Instance", "name": "Spawn Point8", "objectName": "Spawn Point", "pos": { "className": "Point", "x": 833, "y": 405 }, "properties": {} }, { "className": "Instance", "name": "Large Health1", "objectName": "Large Health", "pos": { "className": "Point", "x": 188, "y": 280 }, "properties": {}, "spriteName": "pickup_health_large" }, { "className": "Instance", "name": "Large Health2", "objectName": "Large Health", "pos": { "className": "Point", "x": 1065, "y": 407 }, "properties": {}, "spriteName": "pickup_health_large" }, { "className": "Instance", "name": "Large Health3", "objectName": "Large Health", "pos": { "className": "Point", "x": 191, "y": 152 }, "properties": {}, "spriteName": "pickup_health_large" }, { "className": "Instance", "name": "Small Health1", "objectName": "Small Health", "pos": { "className": "Point", "x": 19, "y": 403 }, "properties": {}, "spriteName": "pickup_health_small" }, { "className": "Instance", "name": "Small Health2", "objectName": "Small Health", "pos": { "className": "Point", "x": 724, "y": 410 }, "properties": {}, "spriteName": "pickup_health_small" }, { "className": "Instance", "name": "Small Ammo1", "objectName": "Small Ammo", "pos": { "className": "Point", "x": 1155, "y": 151 }, "properties": {}, "spriteName": "pickup_ammo_small" }], "name": "powerplant", "path": "assets/levels/powerplant.json", "backgroundPath": "assets/backgrounds/powerplant.png" }, { "className": "Level", "instances": [{ "className": "ShapeInstance", "name": "Collision Shape", "objectName": "Collision Shape", "points": [{ "className": "Point", "x": 22, "y": 194, "perc_from_left": 0, "perc_from_right": 1, "perc_from_top": 0, "perc_from_bottom": 1 }, { "className": "Point", "x": 271, "y": 194, "perc_from_left": 1, "perc_from_right": 0, "perc_from_top": 0, "perc_from_bottom": 1 }, { "className": "Point", "x": 271, "y": 210, "perc_from_left": 1, "perc_from_right": 0, "perc_from_top": 1, "perc_from_bottom": 0 }, { "className": "Point", "x": 22, "y": 210, "perc_from_left": 0, "perc_from_right": 1, "perc_from_top": 1, "perc_from_bottom": 0 }] }, { "className": "ShapeInstance", "name": "Collision Shape", "objectName": "Collision Shape", "points": [{ "className": "Point", "x": 22, "y": 0, "perc_from_left": 0, "perc_from_right": 1, "perc_from_top": 0, "perc_from_bottom": 1 }, { "className": "Point", "x": 37, "y": 0, "perc_from_left": 1, "perc_from_right": 0, "perc_from_top": 0, "perc_from_bottom": 1 }, { "className": "Point", "x": 37, "y": 196, "perc_from_left": 1, "perc_from_right": 0, "perc_from_top": 1, "perc_from_bottom": 0 }, { "className": "Point", "x": 22, "y": 196, "perc_from_left": 0, "perc_from_right": 1, "perc_from_top": 1, "perc_from_bottom": 0 }] }, { "className": "ShapeInstance", "name": "Collision Shape", "objectName": "Collision Shape", "points": [{ "className": "Point", "x": 263, "y": 4, "perc_from_left": 0, "perc_from_right": 1, "perc_from_top": 0, "perc_from_bottom": 1 }, { "className": "Point", "x": 279, "y": 4, "perc_from_left": 1, "perc_from_right": 0, "perc_from_top": 0, "perc_from_bottom": 1 }, { "className": "Point", "x": 279, "y": 195, "perc_from_left": 1, "perc_from_right": 0, "perc_from_top": 1, "perc_from_bottom": 0 }, { "className": "Point", "x": 263, "y": 195, "perc_from_left": 0, "perc_from_right": 1, "perc_from_top": 1, "perc_from_bottom": 0 }] }, { "className": "Instance", "name": "Spawn Point", "objectName": "Spawn Point", "pos": { "className": "Point", "x": 56, "y": 178 }, "properties": { "xDir": 1, "num": 0 } }, { "className": "Instance", "name": "Spawn Point", "objectName": "Spawn Point", "pos": { "className": "Point", "x": 240, "y": 177 }, "properties": { "xDir": -1, "num": 1 } }, { "className": "ShapeInstance", "name": "Collision Shape", "objectName": "Collision Shape", "points": [{ "className": "Point", "x": 37, "y": 4, "perc_from_left": 0, "perc_from_right": 1, "perc_from_top": 0, "perc_from_bottom": 1 }, { "className": "Point", "x": 265, "y": 4, "perc_from_left": 1, "perc_from_right": 0, "perc_from_top": 0, "perc_from_bottom": 1 }, { "className": "Point", "x": 265, "y": 28, "perc_from_left": 1, "perc_from_right": 0, "perc_from_top": 1, "perc_from_bottom": 0 }, { "className": "Point", "x": 37, "y": 28, "perc_from_left": 0, "perc_from_right": 1, "perc_from_top": 1, "perc_from_bottom": 0 }] }], "name": "sm_bossroom", "path": "assets/levels/sm_bossroom.json", "backgroundPath": "assets/backgrounds/sm_bossroom.png" }];
            exports_24("levelJsons", levelJsons);
        }
    };
});
System.register("tests", ["shape", "point"], function (exports_25, context_25) {
    "use strict";
    var __moduleName = context_25 && context_25.id;
    function runAllTests() {
        testGetIntersectPoint();
        testLinesSameY();
    }
    exports_25("runAllTests", runAllTests);
    function testLinesSameY() {
        var shape1 = new shape_2.Shape([new point_7.Point(2748.9925035070223, 613.8087362355162), new point_7.Point(2779.9925035070223, 613.8087362355162), new point_7.Point(2779.9925035070223, 643.8087362355162), new point_7.Point(2748.9925035070223, 643.8087362355162)]);
        var shape2 = new shape_2.Shape([new point_7.Point(2557, 641), new point_7.Point(2880, 641), new point_7.Point(2880, 765), new point_7.Point(2557, 765)]);
        console.log(shape1.getMinTransVectorDir(shape2, (new point_7.Point(200, 495.09845000000007))).normalize());
    }
    function testGetIntersectPoint() {
        var shape = new shape_2.Shape([
            new point_7.Point(123.39407376319954, 159.66765581794917),
            new point_7.Point(141.39407376319954, 159.66765581794917),
            new point_7.Point(141.39407376319954, 193.66765581794917),
            new point_7.Point(123.39407376319954, 193.66765581794917)
        ]);
        var pos = new point_7.Point(119.4554509905969, 175.1802743786446);
        var vel = new point_7.Point(149.92618433007218, 4.705236681105004);
        var point = shape.getIntersectPoint(pos, vel);
        assertEquals(Math.round(point.x), Math.round(123));
        assertEquals(Math.round(point.y), Math.round(175));
    }
    function assertEquals(val1, val2) {
        if (val1 !== val2) {
            console.error(val1 + " is not equal to " + val2);
        }
    }
    var shape_2, point_7;
    return {
        setters: [
            function (shape_2_1) {
                shape_2 = shape_2_1;
            },
            function (point_7_1) {
                point_7 = point_7_1;
            }
        ],
        execute: function () {
            window.runAllTests = runAllTests;
        }
    };
});
System.register("AddColorFilter", [], function (exports_26, context_26) {
    "use strict";
    var __moduleName = context_26 && context_26.id;
    var fragment, vertex, AddColorFilter;
    return {
        setters: [],
        execute: function () {
            fragment = "\nvarying vec2 vTextureCoord;\nuniform sampler2D uSampler;\n\nuniform float red;\nuniform float green;\nuniform float blue;\n\nvoid main(void)\n{\n    vec4 c = texture2D(uSampler, vTextureCoord);\n\n    vec3 rgb = c.rgb;\n    rgb.r = rgb.r + red;\n    rgb.g = rgb.g + green;\n    rgb.b = rgb.b + blue;\n    c.rgb = rgb;\n    c.rgb *= c.a;\n\n    gl_FragColor = c;\n}\n";
            vertex = "\nattribute vec2 aVertexPosition;\nattribute vec2 aTextureCoord;\n\nuniform mat3 projectionMatrix;\n\nvarying vec2 vTextureCoord;\n\nvoid main(void)\n{\n    gl_Position = vec4((projectionMatrix * vec3(aVertexPosition, 1.0)).xy, 0.0, 1.0);\n    vTextureCoord = aTextureCoord;\n}\n";
            AddColorFilter = (function (_super) {
                __extends(AddColorFilter, _super);
                function AddColorFilter(options) {
                    var _this = _super.call(this, vertex, fragment) || this;
                    Object.assign(_this, {
                        red: 1,
                        green: 1,
                        blue: 1
                    }, options);
                    return _this;
                }
                AddColorFilter.prototype.apply = function (filterManager, input, output, clear) {
                    this.uniforms.red = this.red;
                    this.uniforms.green = this.green;
                    this.uniforms.blue = this.blue;
                    filterManager.applyFilter(this, input, output, clear);
                };
                return AddColorFilter;
            }(PIXI.Filter));
            exports_26("default", AddColorFilter);
        }
    };
});
System.register("paths", [], function (exports_27, context_27) {
    "use strict";
    var __moduleName = context_27 && context_27.id;
    var Path;
    return {
        setters: [],
        execute: function () {
            Path = (function () {
                function Path() {
                    this.winMusic = "assets/music/win.mp3?v=1.0.0";
                    this.loseMusic = "assets/music/lose.mp3?v=1.0.0";
                    this.menuMusic = "assets/music/menu.mp3?v=1.0.0";
                    this.bossMusic = "assets/music/BossBattle.mp3?v=1.0.0";
                    this.powerPlantMusic = "assets/music/PowerPlant.mp3?v=1.0.0";
                    this.highwayMusic = "assets/music/highway.mp3?v=1.0.0";
                    this.galleryMusic = "assets/music/gallery.mp3?v=1.0.0";
                    this.powerPlantParallax = "assets/backgrounds/powerplant_parallex.png?v=1.0.0";
                    this.highwayParallax = "assets/backgrounds/highway_parallax.png?v=1.0.0";
                    this.galleryParallax = "assets/backgrounds/gallery_parallax.png?v=1.0.0";
                    this.highwayForeground = "assets/backgrounds/highway_foreground.png?v=1.0.0";
                    this.galleryForeground = "assets/backgrounds/gallery_foreground.png?v=1.0.0";
                    this.effectsSpritesheetPath = "assets/spritesheets/effects.png?v=1.0.0";
                    this.megaManXSpritesheetPath = "assets/spritesheets/MegamanX.png?v=1.0.0";
                    this.redPalette = "assets/palettes/red.png?v=1.0.0";
                    this.boomerangPalette = "assets/palettes/boomerang.png?v=1.0.0";
                    this.electric_sparkPalette = "assets/palettes/electric_spark.png?v=1.0.0";
                    this.fire_wavePalette = "assets/palettes/fire_wave.png?v=1.0.0";
                    this.rolling_shieldPalette = "assets/palettes/rolling_shield.png?v=1.0.0";
                    this.shotgun_icePalette = "assets/palettes/shotgun_ice.png?v=1.0.0";
                    this.stingPalette = "assets/palettes/sting.png?v=1.0.0";
                    this.tornadoPalette = "assets/palettes/tornado.png?v=1.0.0";
                    this.torpedoPalette = "assets/palettes/torpedo.png?v=1.0.0";
                    this.soundsheetPath = "assets/soundsheets/mmx_sfx.mp3?v=1.0.0";
                }
                Path.prototype.getSoundPathFromFile = function (fileName) {
                    return "assets/sounds/" + fileName + "?v=1.0.0";
                };
                Object.defineProperty(Path.prototype, "version", {
                    get: function () {
                        return "?v=1.0.0";
                    },
                    enumerable: true,
                    configurable: true
                });
                return Path;
            }());
            exports_27("Path", Path);
        }
    };
});
System.register("game", ["sprite", "level", "sprites", "levels", "color", "helpers", "api", "gameMode", "AddColorFilter", "paths"], function (exports_28, context_28) {
    "use strict";
    var __moduleName = context_28 && context_28.id;
    var sprite_3, level_1, sprites_1, levels_1, color_1, Helpers, API, gameMode_1, AddColorFilter_1, paths_1, Options, Menu, UIData, Game, game;
    return {
        setters: [
            function (sprite_3_1) {
                sprite_3 = sprite_3_1;
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
            function (color_1_1) {
                color_1 = color_1_1;
            },
            function (Helpers_10) {
                Helpers = Helpers_10;
            },
            function (API_2) {
                API = API_2;
            },
            function (gameMode_1_1) {
                gameMode_1 = gameMode_1_1;
            },
            function (AddColorFilter_1_1) {
                AddColorFilter_1 = AddColorFilter_1_1;
            },
            function (paths_1_1) {
                paths_1 = paths_1_1;
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
                    this.showFPS = false;
                    this.capTo30FPS = false;
                    this.musicVolume = 100;
                    this.soundVolume = 100;
                    this.showWeaponHUD = true;
                }
                return Options;
            }());
            (function (Menu) {
                Menu[Menu["None"] = 0] = "None";
                Menu[Menu["Loading"] = 1] = "Loading";
                Menu[Menu["NameSelect"] = 2] = "NameSelect";
                Menu[Menu["MainMenu"] = 3] = "MainMenu";
                Menu[Menu["BrawlMenu"] = 4] = "BrawlMenu";
                Menu[Menu["ArenaMenu"] = 5] = "ArenaMenu";
                Menu[Menu["Controls"] = 6] = "Controls";
                Menu[Menu["ExitMenu"] = 7] = "ExitMenu";
                Menu[Menu["OptionsMenu"] = 8] = "OptionsMenu";
                Menu[Menu["BadBrowserMenu"] = 9] = "BadBrowserMenu";
            })(Menu || (Menu = {}));
            exports_28("Menu", Menu);
            UIData = (function () {
                function UIData() {
                    this.isProd = false;
                    this.logInDev = true;
                    this.playerName = "Player 1";
                    this.isBrawl = false;
                    this.brawlMaps = ["sm_bossroom"];
                    this.arenaMaps = ["powerplant", "highway", "gallery"];
                    this.selectedBrawlMap = this.brawlMaps[0];
                    this.selectedArenaMap = this.arenaMaps[0];
                    this.gameModes = ["deathmatch", "team deathmatch"];
                    this.selectedGameMode = this.gameModes[0];
                    this.maxPlayers = 4;
                    this.numBots = 4;
                    this.playTo = 20;
                    this.isPlayer1CPU = false;
                    this.isPlayer2CPU = true;
                    this.whoseControls = 1;
                    this.currentControls = {};
                }
                UIData.prototype.getSelectedMapMaxPlayers = function () {
                    if (this.isBrawl) {
                        return game.levelDatas[this.selectedBrawlMap].maxPlayers;
                    }
                    else {
                        return game.levelDatas[this.selectedArenaMap].maxPlayers;
                    }
                };
                return UIData;
            }());
            exports_28("UIData", UIData);
            Game = (function () {
                function Game() {
                    this.sprites = {};
                    this.levelDatas = {};
                    this.sounds = {};
                    this.palettes = {};
                    this.isServer = false;
                    this.isClient = true;
                    this.previousTime = 0;
                    this.deltaTime = 0;
                    this.time = 0;
                    this.appLoadInterval = 0;
                    this.levelLoadInterval = 0;
                    this.requestId = 0;
                    this.paused = false;
                    this.collisionCalls = 0;
                    this.loadCount = 0;
                    this.maxLoadCount = 0;
                    this.restartLevelName = "";
                    this.devApiUrl = "http://localhost:60691/api";
                    this.prodApiUrl = "http://localhost:60691/api";
                    this.errorLogged = false;
                    this.path = new paths_1.Path();
                    this.doQuickStart = true;
                    this.timePassed = 0;
                    this.lag = 0;
                    this.MS_PER_UPDATE = 16.6666;
                    this.defaultCanvasWidth = 298;
                    this.defaultCanvasHeight = 224;
                    this.canvas = document.getElementById("canvas");
                    this.pixiApp = new PIXI.Application({ width: 298, height: 224, view: this.canvas });
                    PIXI.settings.SCALE_MODE = PIXI.SCALE_MODES.NEAREST;
                    this.uiEl = $("#ui")[0];
                    this.uiCanvas = document.getElementById("ui-canvas");
                    this.uiCtx = this.uiCanvas.getContext("2d");
                    this.flashFilter = new AddColorFilter_1.default({ red: 64 / 255, green: 64 / 255, blue: 64 / 255 });
                    this.hitFilter = new AddColorFilter_1.default({ red: 128 / 255, green: 128 / 255, blue: 128 / 255 });
                    this.blueShadowFilter = new PIXI.filters.DropShadowFilter();
                    this.setShadowSettings(this.blueShadowFilter, 0x0000FF);
                    this.redShadowFilter = new PIXI.filters.DropShadowFilter();
                    this.setShadowSettings(this.redShadowFilter, 0xFF0000);
                }
                Game.prototype.setShadowSettings = function (filter, color) {
                    filter.color = color;
                    filter.distance = 0;
                    filter.alpha = 1;
                    filter.quality = 6;
                    filter.blur = 2;
                };
                Game.prototype.quickStart = function () {
                    this.uiData.menu = Menu.None;
                    this.uiData.selectedArenaMap = "gallery";
                    this.uiData.selectedGameMode = "team deathmatch";
                    this.uiData.maxPlayers = 9;
                    this.uiData.numBots = 0;
                    this.uiData.playTo = 20;
                    $("#options").show();
                    $("#dev-options").show();
                    game.loadLevel(this.uiData.selectedArenaMap, false);
                };
                Game.prototype.getMusicVolume01 = function () {
                    return Number(this.options.musicVolume) / 100;
                };
                Game.prototype.getSoundVolume01 = function () {
                    return Number(this.options.soundVolume) / 100;
                };
                Game.prototype.useInvulnFrames = function () {
                    return this.uiData.isBrawl;
                };
                Game.prototype.start = function () {
                    var _this = this;
                    var optionString = localStorage.getItem("options");
                    if (optionString) {
                        this.options = JSON.parse(optionString);
                    }
                    else {
                        this.options = new Options();
                    }
                    var options = this.options;
                    var game = this;
                    this.uiData = new UIData();
                    if (Helpers.isSupportedBrowser()) {
                        this.uiData.menu = Menu.Loading;
                    }
                    else {
                        this.uiData.menu = Menu.BadBrowserMenu;
                    }
                    this.ui = new Vue({
                        el: '#ui',
                        data: {
                            uiData: this.uiData
                        },
                        methods: {
                            numBotsChange: function () {
                                if (this.uiData.numBots > this.uiData.getSelectedMapMaxPlayers() - 1) {
                                    this.uiData.numBots = this.uiData.getSelectedMapMaxPlayers() - 1;
                                }
                                else if (this.uiData.numBots < 0) {
                                    this.uiData.numBots = 0;
                                }
                            },
                            playToChange: function () {
                                if (this.uiData.playTo > 100) {
                                    this.uiData.playTo = 100;
                                }
                                else if (this.uiData.playTo < 1) {
                                    this.uiData.playTo = 1;
                                }
                            },
                            onArenaMapChange: function () {
                                this.uiData.numBots = game.levelDatas[this.uiData.selectedArenaMap].maxPlayers - 1;
                            },
                            mapImage: function (selectedMap) {
                                if (selectedMap === "sm_bossroom")
                                    return "sm_bossroom.png";
                                else if (selectedMap === "highway")
                                    return "highway.png";
                                else if (selectedMap === "powerplant")
                                    return "powerplant.png";
                                else if (selectedMap === "gallery")
                                    return "gallery.png";
                                else
                                    return "";
                            },
                            goToControls: function (whoseControls) {
                                this.uiData.currentControls = game.getPlayerControls(whoseControls);
                                this.uiData.whoseControls = whoseControls;
                                this.uiData.menu = Menu.Controls;
                            },
                            goToOptions: function () {
                                this.uiData.menu = Menu.OptionsMenu;
                                this.uiData.optionsCopy = _.clone(game.options);
                            },
                            saveOptions: function () {
                                game.options = this.uiData.optionsCopy;
                                localStorage.setItem("options", JSON.stringify(game.options));
                                this.goToMainMenu();
                            },
                            getBind: function (key, whoseControls) {
                                var playerControls = this.uiData.currentControls;
                                var keyCode = _.findKey(playerControls, function (value) {
                                    return String(value) === String(key);
                                });
                                if (!keyCode) {
                                    return "";
                                }
                                return Helpers.keyCodeToString(Number(keyCode));
                            },
                            setBind: function (e, key, whoseControls, nextId) {
                                if (document.activeElement !== e.target && e.button !== undefined) {
                                    return;
                                }
                                var playerControls = this.uiData.currentControls;
                                var keyCode = _.findKey(playerControls, function (value) {
                                    return String(value) === String(key);
                                });
                                delete playerControls[keyCode];
                                if (e.keyCode !== undefined) {
                                    playerControls[e.keyCode] = key;
                                }
                                else if (e.deltaY !== undefined) {
                                    if (e.deltaY < 0) {
                                        playerControls[3] = key;
                                    }
                                    else if (e.deltaY > 0) {
                                        playerControls[4] = key;
                                    }
                                }
                                else if (e.button !== undefined) {
                                    playerControls[e.button] = key;
                                }
                                e.preventDefault();
                                $("#" + nextId).focus();
                                game.refreshUI();
                            },
                            saveControls: function (whoseControls) {
                                game.setPlayerControls(whoseControls, this.uiData.currentControls);
                                if (!game.level) {
                                    this.goToMainMenu();
                                }
                                else {
                                    _.each(game.level.players, function (player) {
                                        player.updateControls();
                                    });
                                    game.uiData.menu = Menu.None;
                                    $("#ingame-pause").hide();
                                }
                            },
                            canSaveControls: function () {
                                var playerControls = this.uiData.currentControls;
                                var upFound = false, downFound = false, leftFound = false, rightFound = false, shootFound = false, jumpFound = false, dashFound = false, scoreboardFound = false, weaponleftFound = false, weaponrightFound = false;
                                for (var key in playerControls) {
                                    if (playerControls[key] === "up")
                                        upFound = true;
                                    if (playerControls[key] === "down")
                                        downFound = true;
                                    if (playerControls[key] === "left")
                                        leftFound = true;
                                    if (playerControls[key] === "right")
                                        rightFound = true;
                                    if (playerControls[key] === "shoot")
                                        shootFound = true;
                                    if (playerControls[key] === "jump")
                                        jumpFound = true;
                                    if (playerControls[key] === "dash")
                                        dashFound = true;
                                    if (playerControls[key] === "scoreboard")
                                        scoreboardFound = true;
                                    if (playerControls[key] === "weaponleft")
                                        weaponleftFound = true;
                                    if (playerControls[key] === "weaponright")
                                        weaponrightFound = true;
                                }
                                return upFound && downFound && leftFound && rightFound && shootFound && jumpFound && dashFound && scoreboardFound && weaponleftFound && weaponrightFound;
                            },
                            submitName: function () {
                                localStorage.setItem("playerName", game.uiData.playerName);
                                this.uiData.menu = Menu.MainMenu;
                            },
                            goTo1v1: function () {
                                this.uiData.isBrawl = true;
                                this.uiData.menu = Menu.BrawlMenu;
                            },
                            goToArena: function () {
                                this.uiData.isBrawl = false;
                                this.uiData.menu = Menu.ArenaMenu;
                                this.onArenaMapChange();
                            },
                            goToBattle: function (selectedMap) {
                                this.uiData.menu = Menu.None;
                                $("#options").show();
                                $("#dev-options").show();
                                game.loadLevel(selectedMap, false);
                            },
                            goToMainMenu: function () {
                                if (!game.level) {
                                    this.uiData.menu = Menu.MainMenu;
                                }
                                else {
                                    game.uiData.menu = Menu.None;
                                    $("#ingame-pause").hide();
                                }
                            },
                            isBrawlReady: function () {
                                return this.uiData.selectedBrawlMap !== "";
                            },
                            isArenaReady: function () {
                                return this.uiData.selectedArenaMap !== "";
                            },
                            goToExitMenu: function () {
                                $("#ingame-pause").show();
                                this.uiData.menu = Menu.ExitMenu;
                            },
                            confirmExit: function (exit) {
                                if (exit) {
                                    cancelAnimationFrame(game.requestId);
                                    game.level.destroy();
                                    game.level = undefined;
                                    if (game.music)
                                        game.music.stop();
                                    game.uiData.menu = Menu.MainMenu;
                                    $("#canvas-wrapper").hide();
                                    $("#ui-canvas").hide();
                                    $("#options").hide();
                                }
                                else {
                                    game.uiData.menu = Menu.None;
                                }
                                $("#ingame-pause").hide();
                            }
                        }
                    });
                    var devOptions = new Vue({
                        el: '#options',
                        data: {
                            options: options,
                            hideDevOptions: false,
                            uiData: this.uiData
                        },
                        methods: {
                            onChange: function () {
                                localStorage.setItem("options", JSON.stringify(this.options));
                            },
                            exitGame: function () {
                                game.ui.goToExitMenu();
                            },
                            switchClick: function () {
                            },
                            goToControls: function (whoseControls) {
                                $("#ingame-pause").show();
                                game.ui.goToControls(whoseControls);
                            },
                            optionsClick: function () {
                                $("#ingame-pause").show();
                                game.ui.goToOptions();
                            }
                        }
                    });
                    this.loadImages([
                        game.path.effectsSpritesheetPath,
                        game.path.megaManXSpritesheetPath
                    ], function () {
                        _this.loadSprites();
                        _this.loadLevels();
                        _this.loadPalettes();
                        _this.loadSounds();
                        if (_this.uiData.menu !== Menu.BadBrowserMenu) {
                            _this.appLoadInterval = window.setInterval(function () { return _this.onLoad(); }, 1);
                        }
                    });
                };
                Game.prototype.onLoad = function () {
                    if (this.isLoaded()) {
                        window.clearInterval(this.appLoadInterval);
                        this.startMenuMusic();
                        var name_2 = "Player 1";
                        if (!name_2) {
                            this.uiData.menu = Menu.NameSelect;
                        }
                        else {
                            if (this.doQuickStart) {
                                this.quickStart();
                            }
                            else {
                                this.uiData.playerName = name_2;
                                this.uiData.menu = Menu.MainMenu;
                            }
                        }
                        this.refreshUI();
                    }
                    else {
                    }
                };
                Game.prototype.startMenuMusic = function () {
                    if (this.doQuickStart)
                        return;
                    var music = new Howl({
                        src: [game.path.menuMusic],
                        sprite: {
                            musicStart: [0, 2006],
                            musicLoop: [2006, 25083 - 2006]
                        },
                        onload: function () {
                        }
                    });
                    window.setTimeout(function () {
                        music.play("musicStart");
                        music.on("end", function () {
                            console.log("Loop");
                            music.play("musicLoop");
                        });
                    }, 1000);
                    music.volume(game.options.playMusic ? game.getMusicVolume01() : 0);
                    this.music = music;
                };
                Game.prototype.refreshUI = function () {
                    this.ui.$forceUpdate();
                };
                Game.prototype.restartLevel = function (name) {
                    if (this.music) {
                        this.music.stop();
                    }
                    this.restartLevelName = name;
                };
                Game.prototype.doRestart = function () {
                    var name = this.restartLevelName;
                    this.restartLevelName = "";
                    this.level.destroy();
                    this.loadLevel(name, true);
                };
                Game.prototype.loadLevel = function (name, restart) {
                    var _this = this;
                    var levelData = this.levelDatas[name];
                    if (!levelData) {
                        throw "Bad level";
                    }
                    this.level = new level_1.Level(levelData);
                    this.levelLoadInterval = window.setInterval(function () { return _this.startLevel(restart); }, 1);
                };
                Game.prototype.startLevel = function (restart) {
                    if (this.isLoaded()) {
                        window.clearInterval(this.levelLoadInterval);
                        $("#canvas-wrapper").show();
                        $("#ui-canvas").show();
                        var gameMode = void 0;
                        if (this.uiData.isBrawl) {
                            gameMode = new gameMode_1.Brawl(this.level, this.uiData);
                        }
                        else if (this.uiData.selectedGameMode === "deathmatch") {
                            gameMode = new gameMode_1.FFADeathMatch(this.level, this.uiData);
                        }
                        else if (this.uiData.selectedGameMode === "team deathmatch") {
                            gameMode = new gameMode_1.TeamDeathMatch(this.level, this.uiData);
                        }
                        if (!restart) {
                            var playerInfo = this.uiData.isBrawl ? (this.uiData.isPlayer2CPU ? "1" : "0") : String(this.uiData.numBots);
                            API.logEvent("startGame", gameMode.constructor.name + "," + this.level.levelData.name + "," + playerInfo);
                        }
                        this.level.startLevel(gameMode);
                        this.gameLoop(0);
                    }
                };
                Game.prototype.loadImages = function (paths, callback) {
                    var _this = this;
                    for (var i = paths.length - 1; i >= 0; i--) {
                        if (PIXI.utils.TextureCache[paths[i]]) {
                            paths.splice(i, 1);
                        }
                    }
                    this.maxLoadCount++;
                    PIXI.loader.add(paths).load(function () {
                        _this.loadCount++;
                        if (callback)
                            callback();
                    });
                };
                Game.prototype.loadSprites = function () {
                    try {
                        for (var spriteJsons_1 = __values(sprites_1.spriteJsons), spriteJsons_1_1 = spriteJsons_1.next(); !spriteJsons_1_1.done; spriteJsons_1_1 = spriteJsons_1.next()) {
                            var spriteJson = spriteJsons_1_1.value;
                            var sprite = new sprite_3.Sprite(spriteJson, false, undefined);
                            this.sprites[sprite.name] = sprite;
                        }
                    }
                    catch (e_62_1) { e_62 = { error: e_62_1 }; }
                    finally {
                        try {
                            if (spriteJsons_1_1 && !spriteJsons_1_1.done && (_a = spriteJsons_1.return)) _a.call(spriteJsons_1);
                        }
                        finally { if (e_62) throw e_62.error; }
                    }
                    var e_62, _a;
                };
                Game.prototype.loadLevels = function () {
                    try {
                        for (var levelJsons_1 = __values(levels_1.levelJsons), levelJsons_1_1 = levelJsons_1.next(); !levelJsons_1_1.done; levelJsons_1_1 = levelJsons_1.next()) {
                            var levelJson = levelJsons_1_1.value;
                            var levelData = new level_1.LevelData(levelJson);
                            this.levelDatas[levelJson.name] = levelData;
                        }
                    }
                    catch (e_63_1) { e_63 = { error: e_63_1 }; }
                    finally {
                        try {
                            if (levelJsons_1_1 && !levelJsons_1_1.done && (_a = levelJsons_1.return)) _a.call(levelJsons_1);
                        }
                        finally { if (e_63) throw e_63.error; }
                    }
                    var e_63, _a;
                };
                Game.prototype.loadPalettes = function () {
                    this.palettes["red"] = new color_1.Palette(game.path.redPalette);
                    this.palettes["boomerang"] = new color_1.Palette(game.path.boomerangPalette);
                    this.palettes["electric_spark"] = new color_1.Palette(game.path.electric_sparkPalette);
                    this.palettes["fire_wave"] = new color_1.Palette(game.path.fire_wavePalette);
                    this.palettes["rolling_shield"] = new color_1.Palette(game.path.rolling_shieldPalette);
                    this.palettes["shotgun_ice"] = new color_1.Palette(game.path.shotgun_icePalette);
                    this.palettes["sting"] = new color_1.Palette(game.path.stingPalette);
                    this.palettes["tornado"] = new color_1.Palette(game.path.tornadoPalette);
                    this.palettes["torpedo"] = new color_1.Palette(game.path.torpedoPalette);
                };
                Game.prototype.loadSounds = function () {
                    var _this = this;
                    try {
                        for (var soundFiles_1 = __values(soundFiles), soundFiles_1_1 = soundFiles_1.next(); !soundFiles_1_1.done; soundFiles_1_1 = soundFiles_1.next()) {
                            var soundFile = soundFiles_1_1.value;
                            this.maxLoadCount++;
                            var sound = new Howl({
                                src: [game.path.getSoundPathFromFile(soundFile)],
                                mute: true,
                                onload: function () {
                                    _this.loadCount++;
                                }
                            });
                            this.sounds[soundFile.split(".")[0]] = sound;
                        }
                    }
                    catch (e_64_1) { e_64 = { error: e_64_1 }; }
                    finally {
                        try {
                            if (soundFiles_1_1 && !soundFiles_1_1.done && (_a = soundFiles_1.return)) _a.call(soundFiles_1);
                        }
                        finally { if (e_64) throw e_64.error; }
                    }
                    this.maxLoadCount++;
                    this.soundSheet = new Howl({
                        src: [game.path.soundsheetPath],
                        mute: true,
                        sprite: {
                            buster: [900, 1425 - 900],
                            buster2: [17461, 18220 - 17461],
                            buster3: [4761, 5950 - 4761],
                            buster4: [19429, 20423 - 19429],
                            rollingShield: [180000 + 12411, 394],
                            electricSpark: [180000 + 16554, 919],
                            tornado: [180000 + 7359, 2962],
                            boomerang: [180000 + 5766, 1190],
                            fireWave: [180000 + 4404, 478]
                        },
                        onload: function () {
                            _this.loadCount++;
                        }
                    });
                    var e_64, _a;
                };
                Game.prototype.isLoaded = function () {
                    return this.loadCount >= this.maxLoadCount;
                };
                Game.prototype.gameLoop = function (currentTime) {
                    var _this = this;
                    var elapsed = currentTime - this.previousTime;
                    if (elapsed >= this.MS_PER_UPDATE * 3) {
                        elapsed = this.MS_PER_UPDATE * 3;
                    }
                    this.previousTime = currentTime;
                    this.lag += elapsed;
                    this.deltaTime = elapsed / 1000;
                    if (this.deltaTime < 0 || this.deltaTime > 1 / 15)
                        this.deltaTime = 1 / 15;
                    this.time += this.deltaTime;
                    this.timePassed += this.deltaTime;
                    if (this.options.showFPS) {
                        var fps = (1 / this.deltaTime);
                        this.level.debugString = "FPS: " + fps;
                    }
                    this.level.input();
                    if (!this.options.capTo30FPS || this.timePassed >= 1 / 60) {
                        this.deltaTime = this.timePassed;
                        this.timePassed = 0;
                        if (!this.paused) {
                            try {
                                this.level.update();
                                this.collisionCalls = 0;
                                this.level.render();
                            }
                            catch (err) {
                                if (!game.errorLogged) {
                                    game.errorLogged = true;
                                    API.logEvent("error", err.stack);
                                }
                            }
                        }
                    }
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
                Game.prototype.playSound = function (clip, volume) {
                    if (this.sounds[clip]) {
                        var id = this.sounds[clip].play();
                        this.sounds[clip].volume(volume * game.getSoundVolume01(), id);
                        this.sounds[clip].mute(false, id);
                    }
                    else {
                        var id = this.soundSheet.play(clip);
                        this.soundSheet.volume(volume * game.getSoundVolume01(), id);
                        this.soundSheet.mute(false, id);
                    }
                };
                Game.prototype.playClip = function (clip, volume) {
                    var id = clip.play();
                    clip.volume(volume * game.getSoundVolume01(), id);
                    clip.mute(false, id);
                    return id;
                };
                Game.prototype.getPlayerControls = function (playerNum) {
                    var controlJson = localStorage.getItem("player" + String(playerNum) + "-controls");
                    var inputMapping = {};
                    if (!controlJson) {
                        if (playerNum === 1) {
                            inputMapping[37] = "left";
                            inputMapping[39] = "right";
                            inputMapping[38] = "up";
                            inputMapping[40] = "down";
                            inputMapping[90] = "dash";
                            inputMapping[88] = "jump";
                            inputMapping[67] = "shoot";
                            inputMapping[65] = "weaponleft";
                            inputMapping[83] = "weaponright";
                            inputMapping[9] = "scoreboard";
                            inputMapping[27] = "reset";
                            inputMapping[49] = "weapon1";
                            inputMapping[50] = "weapon2";
                            inputMapping[51] = "weapon3";
                            inputMapping[52] = "weapon4";
                            inputMapping[53] = "weapon5";
                            inputMapping[54] = "weapon6";
                            inputMapping[55] = "weapon7";
                            inputMapping[56] = "weapon8";
                            inputMapping[57] = "weapon9";
                        }
                        else if (playerNum === 2) {
                            inputMapping[100] = "left";
                            inputMapping[102] = "right";
                            inputMapping[104] = "up";
                            inputMapping[101] = "down";
                            inputMapping[13] = "dash";
                            inputMapping[96] = "jump";
                            inputMapping[97] = "shoot";
                            inputMapping[103] = "weaponleft";
                            inputMapping[105] = "weaponright";
                            inputMapping[9] = "scoreboard";
                        }
                    }
                    else {
                        inputMapping = JSON.parse(controlJson);
                    }
                    return inputMapping;
                };
                Game.prototype.setPlayerControls = function (playerNum, inputMapping) {
                    if (playerNum === 1 && !inputMapping[49])
                        throw "Bad input mapping";
                    var json = JSON.stringify(inputMapping);
                    localStorage.setItem("player" + String(playerNum) + "-controls", json);
                };
                return Game;
            }());
            game = new Game();
            exports_28("game", game);
            window.game = game;
        }
    };
});
System.register("shape", ["point", "rect", "collider", "game"], function (exports_29, context_29) {
    "use strict";
    var __moduleName = context_29 && context_29.id;
    var point_8, rect_5, collider_5, game_15, Line, IntersectData, Shape;
    return {
        setters: [
            function (point_8_1) {
                point_8 = point_8_1;
            },
            function (rect_5_1) {
                rect_5 = rect_5_1;
            },
            function (collider_5_1) {
                collider_5 = collider_5_1;
            },
            function (game_15_1) {
                game_15 = game_15_1;
            }
        ],
        execute: function () {
            Line = (function () {
                function Line(point1, point2) {
                    this.point1 = point1;
                    this.point2 = point2;
                }
                Line.prototype.onSegment = function (p, q, r) {
                    if (q.x <= Math.max(p.x, r.x) && q.x >= Math.min(p.x, r.x) &&
                        q.y <= Math.max(p.y, r.y) && q.y >= Math.min(p.y, r.y))
                        return true;
                    return false;
                };
                Line.prototype.orientation = function (p, q, r) {
                    var val = (q.y - p.y) * (r.x - q.x) -
                        (q.x - p.x) * (r.y - q.y);
                    if (val == 0)
                        return 0;
                    return (val > 0) ? 1 : 2;
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
                    var doesIntersect = false;
                    var coincidePoint;
                    var p1 = this.point1;
                    var q1 = this.point2;
                    var p2 = other.point1;
                    var q2 = other.point2;
                    var o1 = this.orientation(p1, q1, p2);
                    var o2 = this.orientation(p1, q1, q2);
                    var o3 = this.orientation(p2, q2, p1);
                    var o4 = this.orientation(p2, q2, q1);
                    if (o1 != o2 && o3 != o4) {
                        doesIntersect = true;
                    }
                    if (o1 == 0 && this.onSegment(p1, p2, q1)) {
                        coincidePoint = p2;
                    }
                    else if (o2 == 0 && this.onSegment(p1, q2, q1)) {
                        coincidePoint = q2;
                    }
                    else if (o3 == 0 && this.onSegment(p2, p1, q2)) {
                        coincidePoint = p1;
                    }
                    else if (o4 == 0 && this.onSegment(p2, q1, q2)) {
                        coincidePoint = q1;
                    }
                    if (coincidePoint)
                        doesIntersect = true;
                    if (!doesIntersect)
                        return undefined;
                    if (coincidePoint)
                        return coincidePoint;
                    var intersection = this.checkLineIntersection(this.x1, this.y1, this.x2, this.y2, other.x1, other.y1, other.x2, other.y2);
                    if (intersection.x !== null && intersection.y !== null)
                        return new point_8.Point(intersection.x, intersection.y);
                    return new point_8.Point((this.x1 + this.x2) / 2, (this.y1 + this.y2) / 2);
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
            exports_29("Line", Line);
            IntersectData = (function () {
                function IntersectData(intersectPoint, normal) {
                    this.intersectPoint = intersectPoint;
                    this.normal = normal;
                }
                return IntersectData;
            }());
            exports_29("IntersectData", IntersectData);
            Shape = (function () {
                function Shape(points, normals) {
                    this.minX = Infinity;
                    this.minY = Infinity;
                    this.maxX = -Infinity;
                    this.maxY = -Infinity;
                    this.points = points;
                    var isNormalsSet = true;
                    if (!normals) {
                        normals = [];
                        isNormalsSet = false;
                    }
                    for (var i = 0; i < this.points.length; i++) {
                        var p1 = this.points[i];
                        var p2 = (i == this.points.length - 1 ? this.points[0] : this.points[i + 1]);
                        if (!isNormalsSet) {
                            var v = new point_8.Point(p2.x - p1.x, p2.y - p1.y);
                            normals.push(v.leftNormal().normalize());
                        }
                        if (p1.x < this.minX)
                            this.minX = p1.x;
                        if (p1.y < this.minY)
                            this.minY = p1.y;
                        if (p1.x > this.maxX)
                            this.maxX = p1.x;
                        if (p1.y > this.maxY)
                            this.maxY = p1.y;
                    }
                    this.normals = normals;
                }
                Shape.prototype.getRect = function () {
                    if (this.points.length !== 4)
                        return undefined;
                    if (this.points[0].x === this.points[3].x && this.points[1].x === this.points[2].x && this.points[0].y === this.points[1].y && this.points[2].y === this.points[3].y) {
                        return rect_5.Rect.Create(this.points[0], this.points[2]);
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
                Shape.prototype.getNormals = function () {
                    return this.normals;
                };
                Shape.prototype.intersectsLine = function (line) {
                    var lines = this.getLines();
                    try {
                        for (var lines_1 = __values(lines), lines_1_1 = lines_1.next(); !lines_1_1.done; lines_1_1 = lines_1.next()) {
                            var myLine = lines_1_1.value;
                            if (myLine.getIntersectPoint(line)) {
                                return true;
                            }
                        }
                    }
                    catch (e_65_1) { e_65 = { error: e_65_1 }; }
                    finally {
                        try {
                            if (lines_1_1 && !lines_1_1.done && (_a = lines_1.return)) _a.call(lines_1);
                        }
                        finally { if (e_65) throw e_65.error; }
                    }
                    return false;
                    var e_65, _a;
                };
                Shape.prototype.getLineIntersectCollisions = function (line) {
                    var collideDatas = [];
                    var lines = this.getLines();
                    var normals = this.getNormals();
                    for (var i = 0; i < lines.length; i++) {
                        var myLine = lines[i];
                        var point = myLine.getIntersectPoint(line);
                        if (point) {
                            var normal = normals[i];
                            var collideData = new collider_5.CollideData(undefined, undefined, false, undefined, new collider_5.HitData(normal, point));
                            collideDatas.push(collideData);
                        }
                    }
                    return collideDatas;
                };
                Shape.prototype.intersectsShape = function (other, vel) {
                    game_15.game.collisionCalls++;
                    var pointOutside = false;
                    try {
                        for (var _a = __values(this.points), _b = _a.next(); !_b.done; _b = _a.next()) {
                            var point = _b.value;
                            if (!other.containsPoint(point)) {
                                pointOutside = true;
                                break;
                            }
                        }
                    }
                    catch (e_66_1) { e_66 = { error: e_66_1 }; }
                    finally {
                        try {
                            if (_b && !_b.done && (_c = _a.return)) _c.call(_a);
                        }
                        finally { if (e_66) throw e_66.error; }
                    }
                    var pointOutside2 = false;
                    try {
                        for (var _d = __values(other.points), _e = _d.next(); !_e.done; _e = _d.next()) {
                            var point = _e.value;
                            if (!this.containsPoint(point)) {
                                pointOutside2 = true;
                                break;
                            }
                        }
                    }
                    catch (e_67_1) { e_67 = { error: e_67_1 }; }
                    finally {
                        try {
                            if (_e && !_e.done && (_f = _d.return)) _f.call(_d);
                        }
                        finally { if (e_67) throw e_67.error; }
                    }
                    if (!pointOutside || !pointOutside2) {
                        return new collider_5.HitData(undefined, undefined);
                    }
                    var lines1 = this.getLines();
                    var lines2 = other.getLines();
                    var hitNormals = [];
                    try {
                        for (var lines1_1 = __values(lines1), lines1_1_1 = lines1_1.next(); !lines1_1_1.done; lines1_1_1 = lines1_1.next()) {
                            var line1 = lines1_1_1.value;
                            var normals = other.getNormals();
                            for (var i = 0; i < lines2.length; i++) {
                                var line2 = lines2[i];
                                if (line1.getIntersectPoint(line2)) {
                                    if (!vel) {
                                        return new collider_5.HitData(normals[i], undefined);
                                    }
                                    else {
                                        hitNormals.push(normals[i]);
                                    }
                                }
                            }
                        }
                    }
                    catch (e_68_1) { e_68 = { error: e_68_1 }; }
                    finally {
                        try {
                            if (lines1_1_1 && !lines1_1_1.done && (_g = lines1_1.return)) _g.call(lines1_1);
                        }
                        finally { if (e_68) throw e_68.error; }
                    }
                    if (hitNormals.length === 0) {
                        return undefined;
                    }
                    try {
                        for (var hitNormals_1 = __values(hitNormals), hitNormals_1_1 = hitNormals_1.next(); !hitNormals_1_1.done; hitNormals_1_1 = hitNormals_1.next()) {
                            var normal = hitNormals_1_1.value;
                            var ang = vel.times(-1).angleWith(normal);
                            if (ang < 90) {
                                return new collider_5.HitData(normal, undefined);
                            }
                        }
                    }
                    catch (e_69_1) { e_69 = { error: e_69_1 }; }
                    finally {
                        try {
                            if (hitNormals_1_1 && !hitNormals_1_1.done && (_h = hitNormals_1.return)) _h.call(hitNormals_1);
                        }
                        finally { if (e_69) throw e_69.error; }
                    }
                    if (hitNormals.length > 0) {
                        return new collider_5.HitData(hitNormals[0], undefined);
                    }
                    return undefined;
                    var e_66, _c, e_67, _f, e_68, _g, e_69, _h;
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
                    try {
                        for (var _a = __values(this.getLines()), _b = _a.next(); !_b.done; _b = _a.next()) {
                            var line = _b.value;
                            var intersectPoint = line.getIntersectPoint(pointLine);
                            if (intersectPoint) {
                                intersections.push(intersectPoint);
                            }
                        }
                    }
                    catch (e_70_1) { e_70 = { error: e_70_1 }; }
                    finally {
                        try {
                            if (_b && !_b.done && (_c = _a.return)) _c.call(_a);
                        }
                        finally { if (e_70) throw e_70.error; }
                    }
                    if (intersections.length === 0)
                        return undefined;
                    return _.minBy(intersections, function (intersectPoint) {
                        return intersectPoint.distanceTo(point);
                    });
                    var e_70, _c;
                };
                Shape.prototype.getClosestPointOnBounds = function (point) {
                };
                Shape.prototype.minMaxDotProd = function (normal) {
                    var min = null, max = null;
                    try {
                        for (var _a = __values(this.points), _b = _a.next(); !_b.done; _b = _a.next()) {
                            var point = _b.value;
                            var dp = point.dotProduct(normal);
                            if (min === null || dp < min)
                                min = dp;
                            if (max === null || dp > max)
                                max = dp;
                        }
                    }
                    catch (e_71_1) { e_71 = { error: e_71_1 }; }
                    finally {
                        try {
                            if (_b && !_b.done && (_c = _a.return)) _c.call(_a);
                        }
                        finally { if (e_71) throw e_71.error; }
                    }
                    return [min, max];
                    var e_71, _c;
                };
                Shape.prototype.checkNormal = function (other, normal) {
                    var aMinMax = this.minMaxDotProd(normal);
                    var bMinMax = other.minMaxDotProd(normal);
                    var overlap = 0;
                    if (aMinMax[0] > bMinMax[0] && aMinMax[1] < bMinMax[1]) {
                        overlap = aMinMax[1] - aMinMax[0];
                    }
                    if (bMinMax[0] > aMinMax[0] && bMinMax[1] < aMinMax[1]) {
                        overlap = bMinMax[1] - bMinMax[0];
                    }
                    if (overlap > 0) {
                        var mins = Math.abs(aMinMax[0] - bMinMax[0]);
                        var maxs = Math.abs(aMinMax[1] - bMinMax[1]);
                        if (mins < maxs) {
                            overlap += mins;
                        }
                        else {
                            overlap += maxs;
                        }
                        var correction = normal.times(overlap);
                        return correction;
                    }
                    if (aMinMax[0] <= bMinMax[1] && aMinMax[1] >= bMinMax[0]) {
                        var correction = normal.times(bMinMax[1] - aMinMax[0]);
                        return correction;
                    }
                    return undefined;
                };
                Shape.prototype.getMinTransVector = function (b) {
                    game_15.game.collisionCalls++;
                    var correctionVectors = [];
                    var thisNormals;
                    var bNormals;
                    var dir = undefined;
                    if (dir) {
                        thisNormals = [dir];
                        bNormals = [dir];
                    }
                    else {
                        thisNormals = this.getNormals();
                        bNormals = b.getNormals();
                    }
                    try {
                        for (var thisNormals_1 = __values(thisNormals), thisNormals_1_1 = thisNormals_1.next(); !thisNormals_1_1.done; thisNormals_1_1 = thisNormals_1.next()) {
                            var normal = thisNormals_1_1.value;
                            var result = this.checkNormal(b, normal);
                            if (result)
                                correctionVectors.push(result);
                        }
                    }
                    catch (e_72_1) { e_72 = { error: e_72_1 }; }
                    finally {
                        try {
                            if (thisNormals_1_1 && !thisNormals_1_1.done && (_a = thisNormals_1.return)) _a.call(thisNormals_1);
                        }
                        finally { if (e_72) throw e_72.error; }
                    }
                    try {
                        for (var bNormals_1 = __values(bNormals), bNormals_1_1 = bNormals_1.next(); !bNormals_1_1.done; bNormals_1_1 = bNormals_1.next()) {
                            var normal = bNormals_1_1.value;
                            var result = this.checkNormal(b, normal);
                            if (result)
                                correctionVectors.push(result);
                        }
                    }
                    catch (e_73_1) { e_73 = { error: e_73_1 }; }
                    finally {
                        try {
                            if (bNormals_1_1 && !bNormals_1_1.done && (_b = bNormals_1.return)) _b.call(bNormals_1);
                        }
                        finally { if (e_73) throw e_73.error; }
                    }
                    if (correctionVectors.length > 0) {
                        return _.minBy(correctionVectors, function (correctionVector) {
                            return correctionVector.magnitude;
                        });
                    }
                    return undefined;
                    var e_72, _a, e_73, _b;
                };
                Shape.prototype.getMinTransVectorDir = function (b, dir) {
                    dir = dir.normalize();
                    game_15.game.collisionCalls++;
                    var mag = 0;
                    var maxMag = 0;
                    try {
                        for (var _a = __values(this.points), _b = _a.next(); !_b.done; _b = _a.next()) {
                            var point = _b.value;
                            var line = new Line(point, point.add(dir.times(10000)));
                            try {
                                for (var _c = __values(b.getLines()), _d = _c.next(); !_d.done; _d = _c.next()) {
                                    var bLine = _d.value;
                                    var intersectPoint = bLine.getIntersectPoint(line);
                                    if (intersectPoint) {
                                        mag = point.distanceTo(intersectPoint);
                                        if (mag > maxMag) {
                                            maxMag = mag;
                                        }
                                    }
                                }
                            }
                            catch (e_74_1) { e_74 = { error: e_74_1 }; }
                            finally {
                                try {
                                    if (_d && !_d.done && (_e = _c.return)) _e.call(_c);
                                }
                                finally { if (e_74) throw e_74.error; }
                            }
                        }
                    }
                    catch (e_75_1) { e_75 = { error: e_75_1 }; }
                    finally {
                        try {
                            if (_b && !_b.done && (_f = _a.return)) _f.call(_a);
                        }
                        finally { if (e_75) throw e_75.error; }
                    }
                    try {
                        for (var _g = __values(b.points), _h = _g.next(); !_h.done; _h = _g.next()) {
                            var point = _h.value;
                            var line = new Line(point, point.add(dir.times(-10000)));
                            try {
                                for (var _j = __values(this.getLines()), _k = _j.next(); !_k.done; _k = _j.next()) {
                                    var myLine = _k.value;
                                    var intersectPoint = myLine.getIntersectPoint(line);
                                    if (intersectPoint) {
                                        mag = point.distanceTo(intersectPoint);
                                        if (mag > maxMag) {
                                            maxMag = mag;
                                        }
                                    }
                                }
                            }
                            catch (e_76_1) { e_76 = { error: e_76_1 }; }
                            finally {
                                try {
                                    if (_k && !_k.done && (_l = _j.return)) _l.call(_j);
                                }
                                finally { if (e_76) throw e_76.error; }
                            }
                        }
                    }
                    catch (e_77_1) { e_77 = { error: e_77_1 }; }
                    finally {
                        try {
                            if (_h && !_h.done && (_m = _g.return)) _m.call(_g);
                        }
                        finally { if (e_77) throw e_77.error; }
                    }
                    if (maxMag === 0) {
                        return undefined;
                    }
                    return dir.times(maxMag);
                    var e_75, _f, e_74, _e, e_77, _m, e_76, _l;
                };
                Shape.prototype.getSnapVector = function (b, dir) {
                    var mag = 0;
                    var minMag = Infinity;
                    try {
                        for (var _a = __values(this.points), _b = _a.next(); !_b.done; _b = _a.next()) {
                            var point = _b.value;
                            var line = new Line(point, point.add(dir.times(10000)));
                            try {
                                for (var _c = __values(b.getLines()), _d = _c.next(); !_d.done; _d = _c.next()) {
                                    var bLine = _d.value;
                                    var intersectPoint = bLine.getIntersectPoint(line);
                                    if (intersectPoint) {
                                        mag = point.distanceTo(intersectPoint);
                                        if (mag < minMag) {
                                            minMag = mag;
                                        }
                                    }
                                }
                            }
                            catch (e_78_1) { e_78 = { error: e_78_1 }; }
                            finally {
                                try {
                                    if (_d && !_d.done && (_e = _c.return)) _e.call(_c);
                                }
                                finally { if (e_78) throw e_78.error; }
                            }
                        }
                    }
                    catch (e_79_1) { e_79 = { error: e_79_1 }; }
                    finally {
                        try {
                            if (_b && !_b.done && (_f = _a.return)) _f.call(_a);
                        }
                        finally { if (e_79) throw e_79.error; }
                    }
                    if (mag === 0) {
                        return undefined;
                    }
                    return dir.times(minMag);
                    var e_79, _f, e_78, _e;
                };
                Shape.prototype.clone = function (x, y) {
                    var points = [];
                    for (var i = 0; i < this.points.length; i++) {
                        var point = this.points[i];
                        points.push(new point_8.Point(point.x + x, point.y + y));
                    }
                    return new Shape(points, this.normals);
                };
                return Shape;
            }());
            exports_29("Shape", Shape);
        }
    };
});
System.register("rect", ["point", "shape"], function (exports_30, context_30) {
    "use strict";
    var __moduleName = context_30 && context_30.id;
    var point_9, shape_3, Rect;
    return {
        setters: [
            function (point_9_1) {
                point_9 = point_9_1;
            },
            function (shape_3_1) {
                shape_3 = shape_3_1;
            }
        ],
        execute: function () {
            Rect = (function () {
                function Rect(x1, y1, x2, y2) {
                    this.topLeftPoint = new point_9.Point(x1, y1);
                    this.botRightPoint = new point_9.Point(x2, y2);
                }
                Rect.Create = function (topLeftPoint, botRightPoint) {
                    return new Rect(topLeftPoint.x, topLeftPoint.y, botRightPoint.x, botRightPoint.y);
                };
                Rect.prototype.getShape = function () {
                    return new shape_3.Shape([this.topLeftPoint, new point_9.Point(this.x2, this.y1), this.botRightPoint, new point_9.Point(this.x1, this.y2)]);
                };
                Object.defineProperty(Rect.prototype, "midX", {
                    get: function () {
                        return (this.topLeftPoint.x + this.botRightPoint.x) * 0.5;
                    },
                    enumerable: true,
                    configurable: true
                });
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
                        new point_9.Point(this.topLeftPoint.x, this.topLeftPoint.y),
                        new point_9.Point(this.botRightPoint.x, this.topLeftPoint.y),
                        new point_9.Point(this.botRightPoint.x, this.botRightPoint.y),
                        new point_9.Point(this.topLeftPoint.x, this.botRightPoint.y),
                    ];
                };
                Rect.prototype.overlaps = function (other) {
                    if (this.x1 > other.x2 || other.x1 > this.x2)
                        return false;
                    if (this.y1 > other.y2 || other.y1 > this.y2)
                        return false;
                    return true;
                };
                Rect.prototype.clone = function (x, y) {
                    return new Rect(this.x1 + x, this.y1 + y, this.x2 + x, this.y2 + y);
                };
                return Rect;
            }());
            exports_30("Rect", Rect);
        }
    };
});
System.register("helpers", ["point"], function (exports_31, context_31) {
    "use strict";
    var __moduleName = context_31 && context_31.id;
    function inRect(x, y, rect) {
        var rx = rect.x1;
        var ry = rect.y1;
        var rx2 = rect.x2;
        var ry2 = rect.y2;
        return x >= rx && x <= rx2 && y >= ry && y <= ry2;
    }
    exports_31("inRect", inRect);
    function inCircle(x, y, circleX, circleY, r) {
        if (Math.sqrt(Math.pow(x - circleX, 2) + Math.pow(y - circleY, 2)) <= r) {
            return true;
        }
        return false;
    }
    exports_31("inCircle", inCircle);
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
    exports_31("toZero", toZero);
    function incrementRange(num, min, max) {
        num++;
        if (num >= max)
            num = min;
        return num;
    }
    exports_31("incrementRange", incrementRange);
    function decrementRange(num, min, max) {
        num--;
        if (num < min)
            num = max - 1;
        return num;
    }
    exports_31("decrementRange", decrementRange);
    function clamp01(num) {
        if (num < 0)
            num = 0;
        if (num > 1)
            num = 1;
        return num;
    }
    exports_31("clamp01", clamp01);
    function randomRange(start, end) {
        return _.random(start, end);
    }
    exports_31("randomRange", randomRange);
    function clampMax(num, max) {
        return num < max ? num : max;
    }
    exports_31("clampMax", clampMax);
    function clampMin(num, min) {
        return num > min ? num : min;
    }
    exports_31("clampMin", clampMin);
    function clampMin0(num) {
        return clampMin(num, 0);
    }
    exports_31("clampMin0", clampMin0);
    function clamp(num, min, max) {
        if (num < min)
            return min;
        if (num > max)
            return max;
        return num;
    }
    exports_31("clamp", clamp);
    function sin(degrees) {
        var rads = degrees * Math.PI / 180;
        return Math.sin(rads);
    }
    exports_31("sin", sin);
    function cos(degrees) {
        var rads = degrees * Math.PI / 180;
        return Math.cos(rads);
    }
    exports_31("cos", cos);
    function atan(value) {
        return Math.atan(value) * 180 / Math.PI;
    }
    exports_31("atan", atan);
    function moveTo(num, dest, inc) {
        inc *= Math.sign(dest - num);
        num += inc;
        return num;
    }
    exports_31("moveTo", moveTo);
    function lerp(num, dest, timeScale) {
        num = num + (dest - num) * timeScale;
        return num;
    }
    exports_31("lerp", lerp);
    function lerpNoOver(num, dest, timeScale) {
        num = num + (dest - num) * timeScale;
        if (Math.abs(num - dest) < 1)
            num = dest;
        return num;
    }
    exports_31("lerpNoOver", lerpNoOver);
    function lerpAngle(angle, destAngle, timeScale) {
        var dir = 1;
        if (Math.abs(destAngle - angle) > 180) {
            dir = -1;
        }
        angle = angle + dir * (destAngle - angle) * timeScale;
        return to360(angle);
    }
    exports_31("lerpAngle", lerpAngle);
    function to360(angle) {
        if (angle < 0)
            angle += 360;
        if (angle > 360)
            angle -= 360;
        return angle;
    }
    exports_31("to360", to360);
    function getHex(r, g, b, a) {
        return "#" + r.toString(16) + g.toString(16) + b.toString(16) + a.toString(16);
    }
    exports_31("getHex", getHex);
    function roundEpsilon(num) {
        var numRound = Math.round(num);
        var diff = Math.abs(numRound - num);
        if (diff < 0.0001) {
            return numRound;
        }
        return num;
    }
    exports_31("roundEpsilon", roundEpsilon);
    function getAutoIncId() {
        autoInc++;
        return autoInc;
    }
    exports_31("getAutoIncId", getAutoIncId);
    function stringReplace(str, pattern, replacement) {
        return str.replace(new RegExp(pattern, 'g'), replacement);
    }
    exports_31("stringReplace", stringReplace);
    function noCanvasSmoothing(c) {
        c.webkitImageSmoothingEnabled = false;
        c.mozImageSmoothingEnabled = false;
        c.imageSmoothingEnabled = false;
    }
    exports_31("noCanvasSmoothing", noCanvasSmoothing);
    function drawImage(ctx, imgEl, sX, sY, sW, sH, x, y, flipX, flipY, options, alpha, palette, scaleX, scaleY) {
        if (!sW) {
            ctx.drawImage(imgEl, (sX), sY);
            return;
        }
        ctx.globalAlpha = (alpha === null || alpha === undefined) ? 1 : alpha;
        helperCanvas.width = sW;
        helperCanvas.height = sH;
        helperCtx.save();
        scaleX = scaleX || 1;
        scaleY = scaleY || 1;
        flipX = (flipX || 1);
        flipY = (flipY || 1);
        helperCtx.scale(flipX * scaleX, flipY * scaleY);
        helperCtx.clearRect(0, 0, helperCanvas.width, helperCanvas.height);
        helperCtx.drawImage(imgEl, sX, sY, sW, sH, 0, 0, flipX * sW, flipY * sH);
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
        ctx.drawImage(helperCanvas, x, y);
        ctx.globalAlpha = 1;
        helperCtx.restore();
    }
    exports_31("drawImage", drawImage);
    function createAndDrawRect(container, rect, fillColor, strokeColor, strokeWidth, fillAlpha) {
        var rectangle = new PIXI.Graphics();
        if (fillAlpha === undefined)
            fillAlpha = 1;
        if (strokeColor) {
            rectangle.lineStyle(strokeWidth, strokeColor, fillAlpha);
        }
        if (fillColor !== undefined)
            rectangle.beginFill(fillColor, fillAlpha);
        rectangle.drawRect(rect.x1, rect.y1, rect.w, rect.h);
        if (fillColor !== undefined)
            rectangle.endFill();
        container.addChild(rectangle);
        return rectangle;
    }
    exports_31("createAndDrawRect", createAndDrawRect);
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
    exports_31("drawRect", drawRect);
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
    exports_31("drawPolygon", drawPolygon);
    function isMobile() {
        var check = false;
        (function (a) { if (/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i.test(a) || /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0, 4)))
            check = true; })(navigator.userAgent || navigator.vendor || window.opera);
        return check;
    }
    function isSupportedBrowser() {
        if (isMobile()) {
            return false;
        }
        if (navigator.userAgent.search("MSIE") >= 0) {
            return false;
        }
        else if (navigator.userAgent.search("Chrome") >= 0) {
            return true;
        }
        else if (navigator.userAgent.search("Firefox") >= 0) {
            return false;
        }
        else if (navigator.userAgent.search("Safari") >= 0 && navigator.userAgent.search("Chrome") < 0) {
            return false;
        }
        else if (navigator.userAgent.search("Opera") >= 0) {
            return false;
        }
        return false;
    }
    exports_31("isSupportedBrowser", isSupportedBrowser);
    function setTextGradient(text, isRed) {
        var col = "#6090D0";
        if (isRed)
            col = "#f44256";
        text.style.fill = [col, "#C8D8E8", col];
        text.style.fillGradientType = PIXI.TEXT_GRADIENT.LINEAR_VERTICAL;
        text.style.fillGradientStops = [0, 0.5, 1];
    }
    exports_31("setTextGradient", setTextGradient);
    function createAndDrawText(container, text, x, y, size, hAlign, vAlign, isRed, overrideColor) {
        var message = new PIXI.Text(text);
        size = size || 14;
        hAlign = hAlign || "center";
        vAlign = vAlign || "middle";
        var alignX = 1;
        var alignY = 1;
        if (hAlign === "left")
            alignX = 0;
        if (hAlign === "center")
            alignX = 0.5;
        if (hAlign === "right")
            alignX = 1;
        if (vAlign === "top")
            alignY = 0;
        if (vAlign === "middle")
            alignY = 0.5;
        if (vAlign === "bottom")
            alignY = 1;
        message.anchor.set(alignX, alignY);
        var style = new PIXI.TextStyle({
            fontFamily: "mmx_font",
            dropShadow: true,
            dropShadowColor: "#000000",
            dropShadowBlur: 0,
            dropShadowDistance: size / 2,
        });
        message.style = style;
        if (!overrideColor) {
            setTextGradient(message, isRed);
        }
        else {
            style.fill = overrideColor;
        }
        style.fontSize = size * 3;
        message.position.set(x, y);
        message.scale.set(1 / 3, 1 / 3);
        container.addChild(message);
        return message;
    }
    exports_31("createAndDrawText", createAndDrawText);
    function drawTextMMX(ctx, text, x, y, size, hAlign, vAlign, isRed, overrideColor) {
        ctx.save();
        ctx.shadowColor = "black";
        ctx.shadowOffsetX = size / 2;
        ctx.shadowOffsetY = size / 2;
        ctx.shadowBlur = 0;
        if (!overrideColor) {
            var gradient = ctx.createLinearGradient(x, y - size / 2, x, y);
            var col = "#6090D0";
            if (isRed)
                col = "#f44256";
            gradient.addColorStop(0, col);
            gradient.addColorStop(0.5, "#C8D8E8");
            gradient.addColorStop(1.0, col);
            ctx.fillStyle = gradient;
        }
        else {
            ctx.fillStyle = overrideColor;
        }
        size = size || 14;
        hAlign = hAlign || "center";
        vAlign = vAlign || "middle";
        ctx.font = size + "px mmx_font";
        ctx.textAlign = hAlign;
        ctx.textBaseline = vAlign;
        ctx.fillText(text, x, y);
        ctx.restore();
    }
    exports_31("drawTextMMX", drawTextMMX);
    function drawText(ctx, text, x, y, fillColor, outlineColor, size, hAlign, vAlign, font) {
        ctx.save();
        fillColor = fillColor || "black";
        size = size || 14;
        hAlign = hAlign || "center";
        vAlign = vAlign || "middle";
        font = font || "Arial";
        ctx.font = size + "px " + font;
        ctx.fillStyle = fillColor;
        ctx.textAlign = hAlign;
        ctx.textBaseline = vAlign;
        ctx.fillText(text, x, y);
        if (outlineColor) {
            ctx.lineWidth = 1;
            ctx.strokeStyle = outlineColor;
            ctx.strokeText(text, x, y);
        }
        ctx.restore();
    }
    exports_31("drawText", drawText);
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
    exports_31("drawCircle", drawCircle);
    function createAndDrawLine(container, x, y, x2, y2, color, thickness) {
        var line = new PIXI.Graphics();
        if (!thickness)
            thickness = 1;
        if (!color)
            color = 0x000000;
        line.lineStyle(thickness, color, 1);
        line.moveTo(x, y);
        line.lineTo(x2, y2);
        line.x = 0;
        line.y = 0;
        container.addChild(line);
        return line;
    }
    exports_31("createAndDrawLine", createAndDrawLine);
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
    exports_31("drawLine", drawLine);
    function linepointNearestMouse(x0, y0, x1, y1, x, y) {
        function lerp(a, b, x) { return (a + x * (b - a)); }
        ;
        var dx = x1 - x0;
        var dy = y1 - y0;
        var t = ((x - x0) * dx + (y - y0) * dy) / (dx * dx + dy * dy);
        var lineX = lerp(x0, x1, t);
        var lineY = lerp(y0, y1, t);
        return new point_10.Point(lineX, lineY);
    }
    exports_31("linepointNearestMouse", linepointNearestMouse);
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
    exports_31("inLine", inLine);
    function getInclinePushDir(inclineNormal, pushDir) {
        var bisectingPoint = inclineNormal.normalize().add(pushDir.normalize());
        bisectingPoint = bisectingPoint.normalize();
        if (Math.abs(bisectingPoint.x) >= Math.abs(bisectingPoint.y)) {
            bisectingPoint.y = 0;
        }
        else {
            bisectingPoint.x = 0;
        }
        return bisectingPoint.normalize();
    }
    exports_31("getInclinePushDir", getInclinePushDir);
    function keyCodeToString(charCode) {
        if (charCode === 0)
            return "left mouse";
        if (charCode === 1)
            return "middle mouse";
        if (charCode === 2)
            return "right mouse";
        if (charCode === 3)
            return "wheel up";
        if (charCode === 4)
            return "wheel down";
        if (charCode == 8)
            return "backspace";
        if (charCode == 9)
            return "tab";
        if (charCode == 13)
            return "enter";
        if (charCode == 16)
            return "shift";
        if (charCode == 17)
            return "ctrl";
        if (charCode == 18)
            return "alt";
        if (charCode == 19)
            return "pause/break";
        if (charCode == 20)
            return "caps lock";
        if (charCode == 27)
            return "escape";
        if (charCode == 33)
            return "page up";
        if (charCode == 34)
            return "page down";
        if (charCode == 35)
            return "end";
        if (charCode == 36)
            return "home";
        if (charCode == 37)
            return "left arrow";
        if (charCode == 38)
            return "up arrow";
        if (charCode == 39)
            return "right arrow";
        if (charCode == 40)
            return "down arrow";
        if (charCode == 45)
            return "insert";
        if (charCode == 46)
            return "delete";
        if (charCode == 91)
            return "left window";
        if (charCode == 92)
            return "right window";
        if (charCode == 93)
            return "select key";
        if (charCode == 96)
            return "numpad 0";
        if (charCode == 97)
            return "numpad 1";
        if (charCode == 98)
            return "numpad 2";
        if (charCode == 99)
            return "numpad 3";
        if (charCode == 100)
            return "numpad 4";
        if (charCode == 101)
            return "numpad 5";
        if (charCode == 102)
            return "numpad 6";
        if (charCode == 103)
            return "numpad 7";
        if (charCode == 104)
            return "numpad 8";
        if (charCode == 105)
            return "numpad 9";
        if (charCode == 106)
            return "multiply";
        if (charCode == 107)
            return "add";
        if (charCode == 109)
            return "subtract";
        if (charCode == 110)
            return "decimal point";
        if (charCode == 111)
            return "divide";
        if (charCode == 112)
            return "F1";
        if (charCode == 113)
            return "F2";
        if (charCode == 114)
            return "F3";
        if (charCode == 115)
            return "F4";
        if (charCode == 116)
            return "F5";
        if (charCode == 117)
            return "F6";
        if (charCode == 118)
            return "F7";
        if (charCode == 119)
            return "F8";
        if (charCode == 120)
            return "F9";
        if (charCode == 121)
            return "F10";
        if (charCode == 122)
            return "F11";
        if (charCode == 123)
            return "F12";
        if (charCode == 144)
            return "num lock";
        if (charCode == 145)
            return "scroll lock";
        if (charCode == 186)
            return ";";
        if (charCode == 187)
            return "=";
        if (charCode == 188)
            return ",";
        if (charCode == 189)
            return "-";
        if (charCode == 190)
            return ".";
        if (charCode == 191)
            return "/";
        if (charCode == 192)
            return "`";
        if (charCode == 219)
            return "[";
        if (charCode == 220)
            return "\\";
        if (charCode == 221)
            return "]";
        if (charCode == 222)
            return "'";
        if (charCode == 32)
            return "space";
        return String.fromCharCode(charCode);
    }
    exports_31("keyCodeToString", keyCodeToString);
    var point_10, autoInc, helperCanvas, helperCtx, helperCanvas2, helperCtx2, helperCanvas3, helperCtx3;
    return {
        setters: [
            function (point_10_1) {
                point_10 = point_10_1;
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
System.register("point", ["helpers"], function (exports_32, context_32) {
    "use strict";
    var __moduleName = context_32 && context_32.id;
    var Helpers, Point;
    return {
        setters: [
            function (Helpers_11) {
                Helpers = Helpers_11;
            }
        ],
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
                    this.x = Helpers.roundEpsilon(this.x);
                    this.y = Helpers.roundEpsilon(this.y);
                    if (this.x === 0 && this.y === 0)
                        return new Point(0, 0);
                    var mag = this.magnitude;
                    var point = new Point(this.x / mag, this.y / mag);
                    if (isNaN(point.x) || isNaN(point.y)) {
                        throw "NAN!";
                    }
                    point.x = Helpers.roundEpsilon(point.x);
                    point.y = Helpers.roundEpsilon(point.y);
                    return point;
                };
                Point.prototype.dotProduct = function (other) {
                    return (this.x * other.x) + (this.y * other.y);
                };
                Point.prototype.project = function (other) {
                    var dp = this.dotProduct(other);
                    return new Point((dp / (other.x * other.x + other.y * other.y)) * other.x, (dp / (other.x * other.x + other.y * other.y)) * other.y);
                };
                Point.prototype.rightNormal = function () {
                    return new Point(-this.y, this.x);
                };
                Point.prototype.leftNormal = function () {
                    return new Point(this.y, -this.x);
                };
                Point.prototype.perProduct = function (other) {
                    return this.dotProduct(other.rightNormal());
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
                Point.prototype.unitInc = function (num) {
                    return this.add(this.normalize().times(num));
                };
                Object.defineProperty(Point.prototype, "angle", {
                    get: function () {
                        var ang = Math.atan2(this.y, this.x);
                        ang *= 180 / Math.PI;
                        if (ang < 0)
                            ang += 360;
                        return ang;
                    },
                    enumerable: true,
                    configurable: true
                });
                Point.prototype.angleWith = function (other) {
                    var ang = Math.atan2(other.y, other.x) - Math.atan2(this.y, this.x);
                    ang *= 180 / Math.PI;
                    if (ang < 0)
                        ang += 360;
                    if (ang > 180)
                        ang = 360 - ang;
                    return ang;
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
                Point.prototype.isAngled = function () {
                    return this.x !== 0 && this.y !== 0;
                };
                return Point;
            }());
            exports_32("Point", Point);
        }
    };
});
System.register("collider", ["point", "shape"], function (exports_33, context_33) {
    "use strict";
    var __moduleName = context_33 && context_33.id;
    var point_11, shape_4, Collider, CollideData, HitData;
    return {
        setters: [
            function (point_11_1) {
                point_11 = point_11_1;
            },
            function (shape_4_1) {
                shape_4 = shape_4_1;
            }
        ],
        execute: function () {
            Collider = (function () {
                function Collider(points, isTrigger, actor, isClimbable, isStatic) {
                    this.wallOnly = false;
                    this.isClimbable = true;
                    this.isStatic = false;
                    this._shape = new shape_4.Shape(points);
                    this.isTrigger = isTrigger;
                    this.actor = actor;
                    this.isClimbable = isClimbable;
                    this.isStatic = isStatic;
                }
                Collider.prototype.getWorldCollider = function (actor) {
                };
                Object.defineProperty(Collider.prototype, "shape", {
                    get: function () {
                        var offset = new point_11.Point(0, 0);
                        if (this.actor) {
                            var rect = this._shape.getRect();
                            offset = this.actor.sprite.getAlignOffsetHelper(rect, new point_11.Point(0, 0), this.actor.xDir, this.actor.yDir);
                            offset.x += this.actor.pos.x;
                            offset.y += this.actor.pos.y;
                        }
                        return this._shape.clone(offset.x, offset.y);
                    },
                    enumerable: true,
                    configurable: true
                });
                Collider.prototype.onCollision = function (other) {
                };
                Collider.prototype.isCollidingWith = function (other) {
                    return this.shape.intersectsShape(other.shape);
                };
                return Collider;
            }());
            exports_33("Collider", Collider);
            CollideData = (function () {
                function CollideData(collider, vel, isTrigger, gameObject, hitData) {
                    this.collider = collider;
                    this.vel = vel;
                    this.isTrigger = isTrigger;
                    this.gameObject = gameObject;
                    this.hitData = hitData;
                }
                return CollideData;
            }());
            exports_33("CollideData", CollideData);
            HitData = (function () {
                function HitData(normal, hitPoint) {
                    this.normal = normal;
                    this.hitPoint = hitPoint;
                }
                return HitData;
            }());
            exports_33("HitData", HitData);
        }
    };
});
System.register("frame", [], function (exports_34, context_34) {
    "use strict";
    var __moduleName = context_34 && context_34.id;
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
            exports_34("Frame", Frame);
        }
    };
});
System.register("sprite", ["collider", "frame", "point", "rect", "game", "helpers"], function (exports_35, context_35) {
    "use strict";
    var __moduleName = context_35 && context_35.id;
    var collider_6, frame_1, point_12, rect_6, game_16, Helpers, Sprite;
    return {
        setters: [
            function (collider_6_1) {
                collider_6 = collider_6_1;
            },
            function (frame_1_1) {
                frame_1 = frame_1_1;
            },
            function (point_12_1) {
                point_12 = point_12_1;
            },
            function (rect_6_1) {
                rect_6 = rect_6_1;
            },
            function (game_16_1) {
                game_16 = game_16_1;
            },
            function (Helpers_12) {
                Helpers = Helpers_12;
            }
        ],
        execute: function () {
            Sprite = (function () {
                function Sprite(spriteJson, shouldInit, container) {
                    this.freeForPool = false;
                    this.spriteJson = spriteJson;
                    this.name = spriteJson.name;
                    this.alignment = spriteJson.alignment;
                    this.wrapMode = spriteJson.wrapMode;
                    this.loopStartFrame = spriteJson.loopStartFrame || 0;
                    this.spritesheetPath = spriteJson.spritesheetPath + game_16.game.path.version;
                    if (!this.wrapMode) {
                        console.error("NO WRAP MODE FOR SPRITE " + this.name);
                    }
                    this.frames = [];
                    this.hitboxes = [];
                    try {
                        for (var _a = __values(spriteJson.hitboxes), _b = _a.next(); !_b.done; _b = _a.next()) {
                            var hitboxJson = _b.value;
                            var hitbox = new collider_6.Collider([
                                new point_12.Point(hitboxJson.offset.x, hitboxJson.offset.y),
                                new point_12.Point(hitboxJson.offset.x + hitboxJson.width, hitboxJson.offset.y),
                                new point_12.Point(hitboxJson.offset.x + hitboxJson.width, hitboxJson.offset.y + hitboxJson.height),
                                new point_12.Point(hitboxJson.offset.x, hitboxJson.offset.y + hitboxJson.height)
                            ], hitboxJson.isTrigger ? true : false, undefined, false, false);
                            this.hitboxes.push(hitbox);
                        }
                    }
                    catch (e_80_1) { e_80 = { error: e_80_1 }; }
                    finally {
                        try {
                            if (_b && !_b.done && (_c = _a.return)) _c.call(_a);
                        }
                        finally { if (e_80) throw e_80.error; }
                    }
                    try {
                        for (var _d = __values(spriteJson.frames), _e = _d.next(); !_e.done; _e = _d.next()) {
                            var frameJson = _e.value;
                            var frame = new frame_1.Frame(new rect_6.Rect(frameJson.rect.topLeftPoint.x, frameJson.rect.topLeftPoint.y, frameJson.rect.botRightPoint.x, frameJson.rect.botRightPoint.y), frameJson.duration, new point_12.Point(frameJson.offset.x, frameJson.offset.y));
                            if (frameJson.POIs) {
                                try {
                                    for (var _f = __values(frameJson.POIs), _g = _f.next(); !_g.done; _g = _f.next()) {
                                        var poi = _g.value;
                                        frame.POIs.push(new point_12.Point(poi.x, poi.y));
                                    }
                                }
                                catch (e_81_1) { e_81 = { error: e_81_1 }; }
                                finally {
                                    try {
                                        if (_g && !_g.done && (_h = _f.return)) _h.call(_f);
                                    }
                                    finally { if (e_81) throw e_81.error; }
                                }
                            }
                            this.frames.push(frame);
                        }
                    }
                    catch (e_82_1) { e_82 = { error: e_82_1 }; }
                    finally {
                        try {
                            if (_e && !_e.done && (_j = _d.return)) _j.call(_d);
                        }
                        finally { if (e_82) throw e_82.error; }
                    }
                    if (shouldInit) {
                        this.initSprite(container);
                    }
                    var e_80, _c, e_82, _j, e_81, _h;
                }
                Object.defineProperty(Sprite.prototype, "spritesheet", {
                    get: function () {
                        return PIXI.loader.resources[this.spritesheetPath].texture.baseTexture.source;
                    },
                    enumerable: true,
                    configurable: true
                });
                Sprite.prototype.free = function () {
                    this.freeForPool = true;
                    this.pixiSprite.visible = false;
                };
                Sprite.prototype.reserve = function () {
                    this.freeForPool = false;
                    this.pixiSprite.visible = true;
                };
                Sprite.prototype.isFree = function () {
                    return this.freeForPool;
                };
                Sprite.prototype.initSprite = function (container) {
                    var textureArray = [];
                    try {
                        for (var _a = __values(this.frames), _b = _a.next(); !_b.done; _b = _a.next()) {
                            var frame = _b.value;
                            var texture = PIXI.loader.resources[this.spritesheetPath].texture.clone();
                            texture.frame = new PIXI.Rectangle(frame.rect.x1, frame.rect.y1, frame.rect.w, frame.rect.h);
                            textureArray.push(texture);
                        }
                    }
                    catch (e_83_1) { e_83 = { error: e_83_1 }; }
                    finally {
                        try {
                            if (_b && !_b.done && (_c = _a.return)) _c.call(_a);
                        }
                        finally { if (e_83) throw e_83.error; }
                    }
                    this.pixiSprite = new PIXI.extras.AnimatedSprite(textureArray);
                    var anchor = this.getAnchor();
                    this.pixiSprite.anchor.x = anchor.x;
                    this.pixiSprite.anchor.y = anchor.y;
                    this.pixiSprite.animationSpeed = 0;
                    container.addChild(this.pixiSprite);
                    var e_83, _c;
                };
                Sprite.prototype.getAnchor = function () {
                    var x, y;
                    if (this.alignment === "topleft") {
                        x = 0;
                        y = 0;
                    }
                    else if (this.alignment === "topmid") {
                        x = 0.5;
                        y = 0;
                    }
                    else if (this.alignment === "topright") {
                        x = 1;
                        y = 0;
                    }
                    else if (this.alignment === "midleft") {
                        x = 0;
                        y = 0.5;
                    }
                    else if (this.alignment === "center") {
                        x = 0.5;
                        y = 0.5;
                    }
                    else if (this.alignment === "midright") {
                        x = 1;
                        y = 0.5;
                    }
                    else if (this.alignment === "botleft") {
                        x = 0;
                        y = 1;
                    }
                    else if (this.alignment === "botmid") {
                        x = 0.5;
                        y = 1;
                    }
                    else if (this.alignment === "botright") {
                        x = 1;
                        y = 1;
                    }
                    return new point_12.Point(x, y);
                };
                Sprite.prototype.draw = function (frameIndex, x, y, flipX, flipY, options, alpha, palette, scaleX, scaleY) {
                    flipX = flipX || 1;
                    flipY = flipY || 1;
                    this.pixiSprite.gotoAndStop(frameIndex);
                    if (x !== undefined)
                        this.pixiSprite.x = x;
                    if (y !== undefined)
                        this.pixiSprite.y = y;
                    this.pixiSprite.scale.x = flipX;
                    this.pixiSprite.scale.y = flipY;
                    var filterArray = [];
                    if (palette) {
                        filterArray.push(palette.filter);
                    }
                    if (options) {
                        try {
                            for (var options_1 = __values(options), options_1_1 = options_1.next(); !options_1_1.done; options_1_1 = options_1.next()) {
                                var option = options_1_1.value;
                                if (option === "flash") {
                                    filterArray.push(game_16.game.flashFilter);
                                }
                                else if (option === "hit") {
                                    filterArray.push(game_16.game.hitFilter);
                                }
                                else if (option === "blueshadow") {
                                    filterArray.push(game_16.game.blueShadowFilter);
                                }
                                else if (option === "redshadow") {
                                    filterArray.push(game_16.game.redShadowFilter);
                                }
                            }
                        }
                        catch (e_84_1) { e_84 = { error: e_84_1 }; }
                        finally {
                            try {
                                if (options_1_1 && !options_1_1.done && (_a = options_1.return)) _a.call(options_1);
                            }
                            finally { if (e_84) throw e_84.error; }
                        }
                    }
                    this.pixiSprite.filters = filterArray;
                    var e_84, _a;
                };
                Sprite.prototype.createAndDraw = function (container, frameIndex, x, y, flipX, flipY, options, alpha, palette, scaleX, scaleY) {
                    var sprite = new Sprite(this.spriteJson, true, container);
                    sprite.draw(frameIndex, x, y, flipX, flipY, options, alpha, palette, scaleX, scaleY);
                    return sprite;
                };
                Sprite.prototype.drawCanvas = function (ctx, frameIndex, x, y, flipX, flipY, options, alpha, palette, scaleX, scaleY) {
                    flipX = flipX || 1;
                    flipY = flipY || 1;
                    var frame = this.frames[frameIndex];
                    var rect = frame.rect;
                    var offset = this.getAlignOffset(frameIndex, flipX, flipY);
                    Helpers.drawImage(ctx, this.spritesheet, rect.x1, rect.y1, rect.w, rect.h, x + offset.x, y + offset.y, flipX, flipY, options, alpha, palette, scaleX, scaleY);
                };
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
                    if (flipX > 0)
                        halfW = Math.floor(halfW);
                    else
                        halfW = Math.ceil(halfW);
                    if (flipY > 0)
                        halfH = Math.floor(halfH);
                    else
                        halfH = Math.ceil(halfH);
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
                return Sprite;
            }());
            exports_35("Sprite", Sprite);
        }
    };
});
System.register("actor", ["sprite", "point", "game", "helpers", "rect"], function (exports_36, context_36) {
    "use strict";
    var __moduleName = context_36 && context_36.id;
    var sprite_4, point_13, game_17, Helpers, rect_7, Actor, Anim;
    return {
        setters: [
            function (sprite_4_1) {
                sprite_4 = sprite_4_1;
            },
            function (point_13_1) {
                point_13 = point_13_1;
            },
            function (game_17_1) {
                game_17 = game_17_1;
            },
            function (Helpers_13) {
                Helpers = Helpers_13;
            },
            function (rect_7_1) {
                rect_7 = rect_7_1;
            }
        ],
        execute: function () {
            Actor = (function () {
                function Actor(sprite, pos, dontAddToLevel, container) {
                    this.renderEffectTime = 0;
                    this.renderEffects = new Set();
                    this.zIndex = 0;
                    if (container) {
                        this.container = container;
                    }
                    else {
                        this.container = game_17.game.level.gameContainer;
                    }
                    this.pos = pos;
                    this.vel = new point_13.Point(0, 0);
                    this.useGravity = true;
                    this.frameIndex = 0;
                    this.frameSpeed = 1;
                    this.frameTime = 0;
                    this.name = "";
                    this.xDir = 1;
                    this.yDir = 1;
                    this.grounded = false;
                    this.collidedInFrame = new Set();
                    this.zIndex = ++game_17.game.level.zDefault;
                    this.changeSprite(sprite, true);
                    if (!dontAddToLevel) {
                        game_17.game.level.addGameObject(this);
                    }
                }
                Actor.prototype.changeSprite = function (sprite, resetFrame) {
                    if (!sprite)
                        return;
                    if (this.sprite) {
                        this.sprite.free();
                    }
                    this.sprite = game_17.game.level.spritePool.get(sprite.name);
                    if (!this.sprite) {
                        var newSprite = new sprite_4.Sprite(sprite.spriteJson, true, this.container);
                        game_17.game.level.spritePool.add(sprite.name, newSprite);
                        this.sprite = newSprite;
                    }
                    this.sprite.pixiSprite.zIndex = this.zIndex;
                    try {
                        for (var _a = __values(this.sprite.hitboxes), _b = _a.next(); !_b.done; _b = _a.next()) {
                            var hitbox = _b.value;
                            hitbox.actor = this;
                        }
                    }
                    catch (e_85_1) { e_85 = { error: e_85_1 }; }
                    finally {
                        try {
                            if (_b && !_b.done && (_c = _a.return)) _c.call(_a);
                        }
                        finally { if (e_85) throw e_85.error; }
                    }
                    if (resetFrame) {
                        this.frameIndex = 0;
                        this.frameTime = 0;
                    }
                    else if (this.frameIndex >= this.sprite.frames.length) {
                        this.frameIndex = 0;
                    }
                    var e_85, _c;
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
                    this.renderEffectTime = Helpers.clampMin0(this.renderEffectTime - game_17.game.deltaTime);
                    if (this.renderEffectTime <= 0) {
                        this.renderEffects.delete("hit");
                        this.renderEffects.delete("flash");
                    }
                    this.frameTime += game_17.game.deltaTime * this.frameSpeed;
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
                        this.vel.y += game_17.game.level.gravity * game_17.game.deltaTime;
                        if (this.vel.y > 1000) {
                            this.vel.y = 1000;
                        }
                    }
                    if (this.constructor.name === "Character")
                        this.move(this.vel, true, false, true);
                    else
                        this.move(this.vel, true, true, true);
                    if (this.collider && !this.collider.isTrigger) {
                        var yDist = 1;
                        if (this.grounded) {
                            yDist = 300 * game_17.game.deltaTime;
                        }
                        var collideData = game_17.game.level.checkCollisionActor(this, 0, yDist);
                        if (collideData && this.vel.y >= 0) {
                            this.grounded = true;
                            this.vel.y = 0;
                            var yVel = new point_13.Point(0, yDist);
                            var mtv = game_17.game.level.getMtvDir(this, 0, yDist, yVel, false, [collideData]);
                            if (mtv) {
                                this.incPos(yVel);
                                this.incPos(mtv.unitInc(0.01));
                            }
                        }
                        else {
                            this.grounded = false;
                        }
                    }
                    var triggerList = game_17.game.level.getTriggerList(this, 0, 0);
                    try {
                        for (var triggerList_1 = __values(triggerList), triggerList_1_1 = triggerList_1.next(); !triggerList_1_1.done; triggerList_1_1 = triggerList_1.next()) {
                            var trigger = triggerList_1_1.value;
                            this.registerCollision(trigger);
                        }
                    }
                    catch (e_86_1) { e_86 = { error: e_86_1 }; }
                    finally {
                        try {
                            if (triggerList_1_1 && !triggerList_1_1.done && (_a = triggerList_1.return)) _a.call(triggerList_1);
                        }
                        finally { if (e_86) throw e_86.error; }
                    }
                    var e_86, _a;
                };
                Actor.prototype.incPos = function (amount) {
                    if (this.collider)
                        game_17.game.level.removeFromGridFast(this);
                    this.pos.inc(amount);
                    if (this.collider)
                        game_17.game.level.addGameObjectToGrid(this);
                };
                Actor.prototype.changePos = function (newPos) {
                    if (this.collider)
                        game_17.game.level.removeFromGridFast(this);
                    this.pos = newPos;
                    if (this.collider)
                        game_17.game.level.addGameObjectToGrid(this);
                };
                Actor.prototype.preUpdate = function () {
                    this.collidedInFrame.clear();
                };
                Actor.prototype.sweepTest = function (offset) {
                    var inc = offset.clone();
                    var collideData = game_17.game.level.checkCollisionActor(this, inc.x, inc.y);
                    if (collideData) {
                        return true;
                    }
                    return false;
                };
                Actor.prototype.move = function (amount, useDeltaTime, pushIncline, snapInclineGravity) {
                    if (useDeltaTime === void 0) { useDeltaTime = true; }
                    if (pushIncline === void 0) { pushIncline = true; }
                    if (snapInclineGravity === void 0) { snapInclineGravity = true; }
                    var times = useDeltaTime ? game_17.game.deltaTime : 1;
                    if (!this.collider) {
                        this.pos.inc(amount.times(times));
                    }
                    else {
                        this.freeFromCollision();
                        var inc = amount.clone();
                        var incAmount = inc.multiply(times);
                        var mtv = game_17.game.level.getMtvDir(this, incAmount.x, incAmount.y, incAmount, pushIncline);
                        this.incPos(incAmount);
                        if (mtv) {
                            this.incPos(mtv.unitInc(0.01));
                        }
                        this.freeFromCollision();
                    }
                };
                Actor.prototype.freeFromCollision = function () {
                    var currentCollideDatas = game_17.game.level.getAllCollideDatas(this, 0, 0, undefined);
                    try {
                        for (var currentCollideDatas_1 = __values(currentCollideDatas), currentCollideDatas_1_1 = currentCollideDatas_1.next(); !currentCollideDatas_1_1.done; currentCollideDatas_1_1 = currentCollideDatas_1.next()) {
                            var collideData = currentCollideDatas_1_1.value;
                            var freeVec = this.collider.shape.getMinTransVector(collideData.collider.shape);
                            this.incPos(freeVec.unitInc(0.01));
                        }
                    }
                    catch (e_87_1) { e_87 = { error: e_87_1 }; }
                    finally {
                        try {
                            if (currentCollideDatas_1_1 && !currentCollideDatas_1_1.done && (_a = currentCollideDatas_1.return)) _a.call(currentCollideDatas_1);
                        }
                        finally { if (e_87) throw e_87.error; }
                    }
                    var e_87, _a;
                };
                Actor.prototype.isRollingShield = function () {
                    return this.constructor.name === "RollingShieldProj";
                };
                Actor.prototype.render = function (x, y) {
                    var offsetX = this.xDir * this.currentFrame.offset.x;
                    var offsetY = this.yDir * this.currentFrame.offset.y;
                    var drawX = this.pos.x + x + offsetX;
                    var drawY = this.pos.y + y + offsetY;
                    if (this.angle === undefined) {
                        this.sprite.draw(this.frameIndex, drawX, drawY, this.xDir, this.yDir, this.renderEffects, 1, this.palette);
                    }
                    else {
                        this.renderFromAngle(x, y);
                    }
                    if (game_17.game.options.showHitboxes && this.collider) {
                        Helpers.drawPolygon(game_17.game.uiCtx, this.collider.shape.clone(x, y), true, "blue", "", 0, 0.5);
                        Helpers.drawCircle(game_17.game.uiCtx, this.pos.x + x, this.pos.y + y, 1, "red");
                    }
                    this.sprite.pixiSprite.visible = true;
                    var alignOffset = this.sprite.getAlignOffset(this.frameIndex, this.xDir, this.yDir);
                    var rx = this.pos.x + offsetX + alignOffset.x;
                    var ry = this.pos.y + offsetY + alignOffset.y;
                    var rect = new rect_7.Rect(rx, ry, rx + this.currentFrame.rect.w, ry + this.currentFrame.rect.h);
                    var camRect = new rect_7.Rect(game_17.game.level.camX, game_17.game.level.camY, game_17.game.level.camX + game_17.game.defaultCanvasWidth, game_17.game.level.camY + game_17.game.defaultCanvasHeight);
                    if (!rect.overlaps(camRect)) {
                        this.sprite.pixiSprite.renderable = false;
                    }
                    else {
                        this.sprite.pixiSprite.renderable = true;
                    }
                };
                Actor.prototype.renderFromAngle = function (x, y) {
                    this.sprite.draw(0, this.pos.x + x, this.pos.y + y, 1, 1, this.renderEffects, 1, this.palette);
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
                                return this.globalCollider;
                            }
                            return undefined;
                        }
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
                    var self = this;
                    if (self instanceof Anim) {
                        game_17.game.level.anims.delete(self);
                    }
                    else {
                        game_17.game.level.removeGameObject(this);
                    }
                    if (sprite) {
                        var anim = new Anim(this.pos, sprite, this.xDir);
                    }
                    if (fadeSound) {
                        this.playSound(fadeSound);
                    }
                    this.sprite.free();
                };
                Actor.prototype.getSoundVolume = function () {
                    var dist = new point_13.Point(game_17.game.level.camCenterX, game_17.game.level.camCenterY).distanceTo(this.pos);
                    var volume = 1 - (dist / (game_17.game.level.screenWidth));
                    volume = Helpers.clampMin0(volume);
                    return volume;
                };
                Actor.prototype.playSound = function (soundName, overrideVolume) {
                    var volume = this.getSoundVolume();
                    if (overrideVolume !== undefined)
                        volume = overrideVolume;
                    volume = Helpers.clampMin0(volume);
                    game_17.game.playSound(soundName, volume);
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
            exports_36("Actor", Actor);
            Anim = (function (_super) {
                __extends(Anim, _super);
                function Anim(pos, sprite, xDir, destroyOnEnd) {
                    if (destroyOnEnd === void 0) { destroyOnEnd = true; }
                    var _this = _super.call(this, sprite, new point_13.Point(pos.x, pos.y), true) || this;
                    _this.useGravity = false;
                    _this.xDir = xDir;
                    _this.destroyOnEnd = destroyOnEnd;
                    game_17.game.level.anims.add(_this);
                    return _this;
                }
                Anim.prototype.update = function () {
                    _super.prototype.update.call(this);
                    if (this.destroyOnEnd && this.isAnimOver()) {
                        this.destroySelf();
                    }
                };
                return Anim;
            }(Actor));
            exports_36("Anim", Anim);
        }
    };
});
var soundFiles = ["charge_loop.wav", "charge_start.wav", "csting.wav", "dash.wav", "die.wav", "explosion.wav", "heal.wav", "hit.wav", "hurt.wav", "jump.wav", "land.wav", "torpedo.wav", "weakness.wav"];
System.register("vue", [], function (exports_37, context_37) {
    "use strict";
    var __moduleName = context_37 && context_37.id;
    function startVue() {
    }
    exports_37("startVue", startVue);
    return {
        setters: [],
        execute: function () {
        }
    };
});
//# sourceMappingURL=main.js.map