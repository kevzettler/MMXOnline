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
                    return undefined;
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
                    var proj = this.getProjectile(pos, xDir, player, chargeLevel);
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
                        return new projectile_1.BusterProj(this, pos, vel, player);
                    else if (chargeLevel === 1)
                        return new projectile_1.Buster2Proj(this, pos, vel, player);
                    else if (chargeLevel === 2)
                        return new projectile_1.Buster3Proj(this, pos, vel, player);
                    else if (chargeLevel === 3)
                        return undefined;
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
                    return new projectile_1.TorpedoProj(this, pos, vel, player);
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
                    return new projectile_1.StingProj(this, pos, vel, player, 0);
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
                    return new projectile_1.RollingShieldProj(this, pos, vel, player);
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
                    return new projectile_1.FireWaveProj(this, pos, vel, player);
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
                    return new projectile_1.TornadoProj(this, pos, vel, player);
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
                    var vel = new point_1.Point(xDir * this.speed, 0);
                    return new projectile_1.ElectricSparkProj(this, pos, vel, player, 0);
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
                    return new projectile_1.BoomerangProj(this, pos, vel, player);
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
                    return new projectile_1.ShotgunIceProj(this, pos, vel, player, 0);
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
System.register("projectile", ["actor", "damager", "point", "collider", "character", "wall", "game", "helpers", "rect", "weapon", "pickup"], function (exports_8, context_8) {
    "use strict";
    var __moduleName = context_8 && context_8.id;
    var actor_3, damager_1, point_2, collider_2, character_2, wall_1, game_4, Helpers, rect_1, weapon_1, pickup_1, Projectile, BusterProj, Buster2Proj, Buster3Proj, Buster4Proj, TorpedoProj, StingProj, RollingShieldProj, FireWaveProj, TornadoProj, ElectricSparkProj, BoomerangProj, ShotgunIceProj;
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
                    _this.weapon = weapon;
                    _this.vel = vel;
                    _this.speed = _this.vel.magnitude;
                    _this.useGravity = false;
                    _this.flinch = false;
                    _this.damager = new damager_1.Damager(player, damage);
                    _this.xDir = Math.sign(vel.x);
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
                    if (this instanceof TorpedoProj && other.gameObject instanceof Projectile && this.damager.owner !== other.gameObject.damager.owner) {
                        this.destroySelf(this.fadeSprite, this.fadeSound);
                        if (!(other.gameObject instanceof TornadoProj) && !(other.gameObject instanceof FireWaveProj) && !(other.gameObject instanceof Buster2Proj)
                            && !(other.gameObject instanceof Buster3Proj) && !(other.gameObject instanceof Buster4Proj) && !(other.gameObject instanceof RollingShieldProj)) {
                            other.gameObject.destroySelf(other.gameObject.fadeSprite, other.gameObject.fadeSound);
                        }
                        return;
                    }
                    if (this instanceof RollingShieldProj && other.gameObject instanceof Projectile && this.damager.owner !== other.gameObject.damager.owner) {
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
                                character_3.renderEffect = "hit";
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
                    this.destroySelf(this.fadeSprite, this.fadeSound);
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
                    this.pos.y = this.initY + Math.sin(game_4.game.time * 18 - this.num * 0.5 + this.offsetTime * 2.09) * 15;
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
                    this.sprite.draw(frameIndex, this.pos.x + x, this.pos.y + y, xDir, yDir, this.renderEffect, 1, this.palette);
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
                        _this.sprite = game_4.game.sprites["sting_flat"];
                    }
                    else if (type === 2 || type === 3) {
                        _this.sprite = game_4.game.sprites["sting_up"];
                        if (type === 3) {
                            _this.yDir = -1;
                        }
                    }
                    _this.changeSprite(_this.sprite, false);
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
                    _this.length = 1;
                    _this.spriteStart = game_4.game.sprites["tornado_start"];
                    _this.spriteMid = game_4.game.sprites["tornado_mid"];
                    _this.spriteEnd = game_4.game.sprites["tornado_end"];
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
                    if (game_4.game.options.showHitboxes && this.collider) {
                        Helpers.drawPolygon(game_4.game.uiCtx, this.collider.shape.clone(x, y), true, "blue", "", 0, 0.5);
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
                    this.sprite.draw(this.frameIndex, this.pos.x + x, this.pos.y + y, 1, 1, this.renderEffect, 1, this.palette);
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
System.register("effects", ["point", "game", "helpers"], function (exports_9, context_9) {
    "use strict";
    var __moduleName = context_9 && context_9.id;
    var point_3, game_5, Helpers, ChargeEffect, DieEffectParticles, Effect, DieEffect;
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
            }
        ],
        execute: function () {
            ChargeEffect = (function () {
                function ChargeEffect() {
                    this.points = [];
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
                    this.points = _.cloneDeep(this.origPoints);
                    this.pointTimes = [0, 3, 0, 1.5, -1.5, -3, -1.5, -1.5];
                }
                ChargeEffect.prototype.update = function (centerPos, chargeLevel) {
                    for (var i = 0; i < this.points.length; i++) {
                        var point = this.points[i];
                        if (this.pointTimes[i] > 0) {
                            point.x = Helpers.moveTo(point.x, 0, game_5.game.deltaTime * 70);
                            point.y = Helpers.moveTo(point.y, 0, game_5.game.deltaTime * 70);
                        }
                        var chargePart = game_5.game.sprites["charge_part_" + String(chargeLevel)];
                        this.pointTimes[i] += game_5.game.deltaTime * 20;
                        if (this.pointTimes[i] > 3) {
                            this.pointTimes[i] = -3;
                            this.points[i] = this.origPoints[i].clone();
                        }
                    }
                };
                ChargeEffect.prototype.render = function (centerPos, chargeLevel) {
                };
                return ChargeEffect;
            }());
            exports_9("ChargeEffect", ChargeEffect);
            DieEffectParticles = (function () {
                function DieEffectParticles(centerPos) {
                    this.time = 0;
                    this.ang = 0;
                    this.centerPos = centerPos;
                }
                DieEffectParticles.prototype.render = function (offsetX, offsetY) {
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
                    var repeat = 5;
                    var repeatPeriod = 0.5;
                    this.timer += game_5.game.deltaTime;
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
                    for (var _i = 0, _a = properties.neighbors; _i < _a.length; _i++) {
                        var jsonNeighbor = _a[_i];
                        _loop_1(jsonNeighbor);
                    }
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
                        for (var _i = 0, _a = curNode.neighbors; _i < _a.length; _i++) {
                            var neighbor = _a[_i];
                            pathToNode.push(neighbor.node);
                            getNextNodeDfs(neighbor.node);
                            pathToNode.pop();
                        }
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
System.register("ai", ["game", "projectile", "point", "helpers"], function (exports_11, context_11) {
    "use strict";
    var __moduleName = context_11 && context_11.id;
    var game_6, projectile_2, point_4, Helpers, AI, AIState, MoveTowardsTarget, FindPlayer, MoveToPos, AimAtPlayer, DashToPlayer, JumpToWall, ClimbWall, SlideDownWall;
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
                        this.shootTime += game_6.game.deltaTime;
                        if (this.shootTime > 0.1) {
                            this.shootTime = 0;
                        }
                    }
                    if (this.aiState.shouldDodge) {
                        for (var _i = 0, _a = game_6.game.level.getGameObjectArray(); _i < _a.length; _i++) {
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
System.register("gameMode", ["game", "player", "helpers", "rect"], function (exports_13, context_13) {
    "use strict";
    var __moduleName = context_13 && context_13.id;
    var game_7, player_1, Helpers, rect_2, GameMode, Brawl, FFADeathMatch, TeamDeathMatch;
    return {
        setters: [
            function (game_7_1) {
                game_7 = game_7_1;
            },
            function (player_1_1) {
                player_1 = player_1_1;
            },
            function (Helpers_6) {
                Helpers = Helpers_6;
            },
            function (rect_2_1) {
                rect_2 = rect_2_1;
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
                        for (var _i = 0, _a = _this.localPlayers; _i < _a.length; _i++) {
                            var player = _a[_i];
                            player.onKeyDown(e.keyCode);
                        }
                        if (e.keyCode === 9 || (e.keyCode >= 112 && e.keyCode <= 121)) {
                            e.preventDefault();
                        }
                    };
                    document.onkeyup = function (e) {
                        for (var _i = 0, _a = _this.localPlayers; _i < _a.length; _i++) {
                            var player = _a[_i];
                            player.onKeyUp(e.keyCode);
                        }
                        if (e.keyCode === 9 || (e.keyCode >= 112 && e.keyCode <= 124)) {
                            e.preventDefault();
                        }
                    };
                    game_7.game.uiCanvas.onmousedown = function (e) {
                        for (var _i = 0, _a = _this.localPlayers; _i < _a.length; _i++) {
                            var player = _a[_i];
                            player.onKeyDown(e.button);
                        }
                        e.preventDefault();
                    };
                    game_7.game.uiCanvas.oncontextmenu = function (e) {
                        e.preventDefault();
                    };
                    game_7.game.uiCanvas.onmouseup = function (e) {
                        for (var _i = 0, _a = _this.localPlayers; _i < _a.length; _i++) {
                            var player = _a[_i];
                            player.onKeyUp(e.button);
                        }
                        e.preventDefault();
                    };
                    document.onwheel = function (e) {
                        if (e.deltaY < 0) {
                            for (var _i = 0, _a = _this.localPlayers; _i < _a.length; _i++) {
                                var player = _a[_i];
                                console.log("MOUSEHWEELUP");
                                player.onKeyDown(3);
                            }
                        }
                        else if (e.deltaY > 0) {
                            for (var _b = 0, _c = _this.localPlayers; _b < _c.length; _b++) {
                                var player = _c[_b];
                                console.log("MOUSEHWEELDOWN");
                                player.onKeyDown(4);
                            }
                        }
                    };
                };
                GameMode.prototype.update = function () {
                    for (var i = this.killFeed.length - 1; i >= 0; i--) {
                        var killFeed = this.killFeed[i];
                        killFeed.time += game_7.game.deltaTime;
                        if (killFeed.time > 8) {
                            _.remove(this.killFeed, killFeed);
                        }
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
                GameMode.prototype.drawWeaponSwitchHUD = function () {
                    if (!game_7.game.options.showWeaponHUD) {
                        return;
                    }
                    var weaponSprite = game_7.game.sprites["hud_weapon_icon"];
                    var startX = Math.round(this.screenWidth * 0.225);
                    var width = 20;
                    var iconW = 9;
                    var iconH = 9;
                    var startY = this.screenHeight - 18;
                    for (var i = 0; i < 9; i++) {
                        var x = startX + (i * width);
                        var y = startY;
                        if (this.mainPlayer.weaponIndex === i) {
                            Helpers.drawRect(game_7.game.uiCtx, new rect_2.Rect(x - iconW, y - iconH, x + iconW, y + iconH), "", "lightgreen", 1);
                        }
                        weaponSprite.drawCanvas(game_7.game.uiCtx, i, x, y);
                        Helpers.drawTextMMX(game_7.game.uiCtx, String(i + 1), x, y + 12, 6, "", "");
                    }
                };
                GameMode.prototype.addKillFeedEntry = function (killFeed) {
                    this.killFeed.unshift(killFeed);
                    if (this.killFeed.length > 4)
                        this.killFeed.pop();
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
                    Helpers.drawTextMMX(game_7.game.uiCtx, "Leader: " + String(this.currentWinner.kills), 5, 10, 8, "left", "Top");
                    Helpers.drawTextMMX(game_7.game.uiCtx, "Kills: " + String(this.mainPlayer.kills) + "(" + placeStr + ")", 5, 20, 8, "left", "Top");
                };
                Object.defineProperty(GameMode.prototype, "currentWinner", {
                    get: function () {
                        return this.players[0];
                    },
                    enumerable: true,
                    configurable: true
                });
                GameMode.prototype.drawKillFeed = function () {
                    var fromRight = this.screenWidth - 10;
                    var fromTop = 10;
                    var yDist = 12;
                    for (var i = 0; i < this.killFeed.length; i++) {
                        var killFeed = this.killFeed[i];
                        var msg = "";
                        if (killFeed.killer) {
                            msg = killFeed.killer.name + "    " + killFeed.victim.name;
                        }
                        else {
                            msg = killFeed.victim.name + " died";
                        }
                        game_7.game.uiCtx.font = "6px mmx_font";
                        if (killFeed.killer === this.mainPlayer || killFeed.victim == this.mainPlayer) {
                            var msgLen = game_7.game.uiCtx.measureText(msg).width;
                            var msgHeight = 10;
                            Helpers.drawRect(game_7.game.uiCtx, new rect_2.Rect(fromRight - msgLen - 2, fromTop - 2 + (i * yDist) - msgHeight / 2, fromRight + 2, fromTop - 2 + msgHeight / 2 + (i * yDist)), "black", "white", 1, 0.75);
                        }
                        var isKillerRed = killFeed.killer && killFeed.killer.alliance === 1 && this.isTeamMode;
                        var isVictimRed = killFeed.victim.alliance === 1 && this.isTeamMode;
                        if (killFeed.killer) {
                            var nameLen = game_7.game.uiCtx.measureText(killFeed.victim.name).width;
                            Helpers.drawTextMMX(game_7.game.uiCtx, killFeed.victim.name, fromRight, fromTop + (i * yDist), 6, "right", "Top", isVictimRed);
                            var victimNameWidth = game_7.game.uiCtx.measureText(killFeed.victim.name).width;
                            Helpers.drawTextMMX(game_7.game.uiCtx, killFeed.killer.name + "    ", fromRight - victimNameWidth, fromTop + (i * yDist), 6, "right", "Top", isKillerRed);
                            var firstPartWidth = game_7.game.uiCtx.measureText(killFeed.killer.name + "    ").width;
                            var weaponIndex = killFeed.weapon.index;
                            game_7.game.sprites["hud_killfeed_weapon"].drawCanvas(game_7.game.uiCtx, weaponIndex, fromRight - nameLen - 13, fromTop + (i * yDist) - 2, undefined, undefined, undefined, undefined, undefined);
                        }
                        else {
                            Helpers.drawTextMMX(game_7.game.uiCtx, msg, fromRight, fromTop + (i * yDist), 6, "right", "Top", isVictimRed);
                        }
                    }
                };
                return GameMode;
            }());
            exports_13("GameMode", GameMode);
            Brawl = (function (_super) {
                __extends(Brawl, _super);
                function Brawl(level, uiData) {
                    var _this = _super.call(this, level) || this;
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
                    var player2 = new player_1.Player(p2Name, uiData.isPlayer2CPU, 1, health, game_7.game.palettes["red"]);
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
                        Helpers.drawTextMMX(game_7.game.uiCtx, winner.name + " wins!", this.screenWidth / 2, this.screenHeight / 2, 12, "center", "middle");
                    }
                };
                Brawl.prototype.checkIfWin = function () {
                    if (!this.isOver) {
                        var deadPlayer = _.find(this.level.players, function (player) {
                            return !player.character;
                        });
                        if (deadPlayer) {
                            for (var _i = 0, _a = this.level.players; _i < _a.length; _i++) {
                                var player = _a[_i];
                                if (player.character) {
                                    this.isOver = true;
                                    player.won = true;
                                }
                            }
                        }
                        if (this.isOver) {
                            if (game_7.game.music) {
                                game_7.game.music.stop();
                            }
                            game_7.game.music = new Howl({
                                src: ["assets/music/win.mp3"],
                            });
                            game_7.game.music.play();
                        }
                    }
                    else {
                        this.overTime += game_7.game.deltaTime;
                        if (this.overTime > 10) {
                            game_7.game.restartLevel(this.level.levelData.name);
                        }
                    }
                };
                return Brawl;
            }(GameMode));
            exports_13("Brawl", Brawl);
            FFADeathMatch = (function (_super) {
                __extends(FFADeathMatch, _super);
                function FFADeathMatch(level, uiData) {
                    var _this = _super.call(this, level) || this;
                    _this.killsToWin = 20;
                    _this.killsToWin = uiData.playTo;
                    var health = 16;
                    var player1 = new player_1.Player(game_7.game.uiData.playerName, false, 0, health);
                    _this.players.push(player1);
                    _this.localPlayers.push(player1);
                    _this.mainPlayer = player1;
                    for (var i = 0; i < uiData.numBots; i++) {
                        var cpu = new player_1.Player("CPU" + String(i + 1), true, i + 1, health, game_7.game.palettes["red"]);
                        _this.players.push(cpu);
                        _this.localPlayers.push(cpu);
                    }
                    _this.setupPlayers();
                    return _this;
                }
                FFADeathMatch.prototype.drawHUD = function () {
                    _super.prototype.drawHUD.call(this);
                    this.drawKillFeed();
                    this.drawTopHUD();
                    this.drawWeaponSwitchHUD();
                    if (this.mainPlayer && this.mainPlayer.isHeld("scoreboard", false)) {
                        this.drawScoreboard();
                    }
                };
                FFADeathMatch.prototype.drawWinScreen = function () {
                    if (this.mainPlayer.won) {
                        Helpers.drawTextMMX(game_7.game.uiCtx, "You won!", this.screenWidth / 2, this.screenHeight / 2, 24, "center", "middle");
                    }
                    else {
                        Helpers.drawTextMMX(game_7.game.uiCtx, "You lost!", this.screenWidth / 2, this.screenHeight / 2, 24, "center", "middle");
                        var winner = _.find(this.players, function (player) {
                            return player.won;
                        });
                        Helpers.drawTextMMX(game_7.game.uiCtx, winner.name + " wins", this.screenWidth / 2, (this.screenHeight / 2) + 30, 12, "center", "top");
                    }
                };
                FFADeathMatch.prototype.drawScoreboard = function () {
                    var padding = 10;
                    var fontSize = 8;
                    var col1x = padding + 10;
                    var col2x = this.screenWidth * 0.5;
                    var col3x = this.screenWidth * 0.75;
                    var lineY = padding + 35;
                    var labelY = lineY + 5;
                    var line2Y = labelY + 10;
                    var topPlayerY = line2Y + 5;
                    Helpers.drawRect(game_7.game.uiCtx, new rect_2.Rect(padding, padding, this.screenWidth - padding, this.screenHeight - padding), "black", "", undefined, 0.75);
                    Helpers.drawText(game_7.game.uiCtx, "Game Mode: FFA Deathmatch", padding + 10, padding + 10, "white", "", fontSize, "left", "Top", "mmx_font");
                    Helpers.drawText(game_7.game.uiCtx, "Map: " + this.level.levelData.name, padding + 10, padding + 20, "white", "", fontSize, "left", "Top", "mmx_font");
                    Helpers.drawText(game_7.game.uiCtx, "Playing to: " + String(this.killsToWin), padding + 10, padding + 30, "white", "", fontSize, "left", "Top", "mmx_font"),
                        Helpers.drawLine(game_7.game.uiCtx, padding + 10, lineY, this.screenWidth - padding - 10, lineY, "white", 1);
                    Helpers.drawText(game_7.game.uiCtx, "Player", col1x, labelY, "white", "", fontSize, "left", "top", "mmx_font");
                    Helpers.drawText(game_7.game.uiCtx, "Kills", col2x, labelY, "white", "", fontSize, "left", "top", "mmx_font");
                    Helpers.drawText(game_7.game.uiCtx, "Deaths", col3x, labelY, "white", "", fontSize, "left", "top", "mmx_font");
                    Helpers.drawLine(game_7.game.uiCtx, padding + 10, line2Y, this.screenWidth - padding - 10, line2Y, "white", 1);
                    var rowH = 10;
                    for (var i = 0; i < this.players.length; i++) {
                        var player = this.players[i];
                        var color = (player === this.mainPlayer) ? "lightgreen" : "white";
                        Helpers.drawText(game_7.game.uiCtx, player.name, col1x, topPlayerY + (i) * rowH, color, "", fontSize, "left", "top", "mmx_font");
                        Helpers.drawText(game_7.game.uiCtx, String(player.kills), col2x, topPlayerY + (i) * rowH, color, "", fontSize, "left", "top", "mmx_font");
                        Helpers.drawText(game_7.game.uiCtx, String(player.deaths), col3x, topPlayerY + (i) * rowH, color, "", fontSize, "left", "top", "mmx_font");
                    }
                };
                FFADeathMatch.prototype.checkIfWin = function () {
                    if (!this.isOver) {
                        for (var _i = 0, _a = this.level.players; _i < _a.length; _i++) {
                            var player = _a[_i];
                            if (player.kills >= this.killsToWin) {
                                this.isOver = true;
                                player.won = true;
                            }
                        }
                        if (this.isOver) {
                            if (game_7.game.music) {
                                game_7.game.music.stop();
                            }
                            if (this.level.mainPlayer && this.level.mainPlayer.won) {
                                game_7.game.music = new Howl({
                                    src: ["assets/music/win.mp3"],
                                });
                                game_7.game.music.play();
                            }
                            else if (this.level.mainPlayer && !this.level.mainPlayer.won) {
                                game_7.game.music = new Howl({
                                    src: ["assets/music/lose.mp3"],
                                });
                                game_7.game.music.play();
                            }
                        }
                    }
                    else {
                        this.overTime += game_7.game.deltaTime;
                        if (this.overTime > 10) {
                            game_7.game.restartLevel(this.level.levelData.name);
                        }
                    }
                };
                return FFADeathMatch;
            }(GameMode));
            exports_13("FFADeathMatch", FFADeathMatch);
            TeamDeathMatch = (function (_super) {
                __extends(TeamDeathMatch, _super);
                function TeamDeathMatch(level, uiData) {
                    var _this = _super.call(this, level) || this;
                    _this.killsToWin = 50;
                    _this.isTeamMode = true;
                    _this.killsToWin = uiData.playTo;
                    var health = 16;
                    var player1 = new player_1.Player(game_7.game.uiData.playerName, false, 0, health);
                    _this.players.push(player1);
                    _this.localPlayers.push(player1);
                    _this.mainPlayer = player1;
                    for (var i = 0; i < uiData.numBots; i++) {
                        var alliance = (i + 1) % 2;
                        var cpu = new player_1.Player("CPU" + String(i + 1), true, alliance, health, alliance === 0 ? undefined : game_7.game.palettes["red"]);
                        _this.players.push(cpu);
                        _this.localPlayers.push(cpu);
                    }
                    _this.setupPlayers();
                    return _this;
                }
                TeamDeathMatch.prototype.drawHUD = function () {
                    _super.prototype.drawHUD.call(this);
                    this.drawKillFeed();
                    this.drawTopHUD();
                    this.drawWeaponSwitchHUD();
                    if (this.mainPlayer && this.mainPlayer.isHeld("scoreboard", false)) {
                        this.drawScoreboard();
                    }
                };
                TeamDeathMatch.prototype.drawTopHUD = function () {
                    var blueKills = 0;
                    var redKills = 0;
                    for (var _i = 0, _a = this.level.players; _i < _a.length; _i++) {
                        var player = _a[_i];
                        if (player.alliance === 0)
                            blueKills += player.kills;
                        else
                            redKills += player.kills;
                    }
                    Helpers.drawTextMMX(game_7.game.uiCtx, "Red: " + String(redKills), 5, 10, 8, "left", "Top");
                    Helpers.drawTextMMX(game_7.game.uiCtx, "Blue: " + String(blueKills), 5, 20, 8, "left", "Top");
                };
                TeamDeathMatch.prototype.drawWinScreen = function () {
                    var team;
                    if (this.mainPlayer.won) {
                        team = this.mainPlayer.alliance === 0 ? "Blue" : "Red";
                    }
                    else {
                        team = this.mainPlayer.alliance === 0 ? "Red" : "Blue";
                    }
                    Helpers.drawTextMMX(game_7.game.uiCtx, team + " team won!", this.screenWidth / 2, this.screenHeight / 2, 12, "center", "middle");
                };
                TeamDeathMatch.prototype.drawScoreboard = function () {
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
                    var blueKills = 0;
                    var redKills = 0;
                    for (var _i = 0, _a = this.level.players; _i < _a.length; _i++) {
                        var player = _a[_i];
                        if (player.alliance === 0)
                            blueKills += player.kills;
                        else
                            redKills += player.kills;
                    }
                    var redPlayers = _.filter(this.players, function (player) {
                        return player.alliance === 1;
                    });
                    var bluePlayers = _.filter(this.players, function (player) {
                        return player.alliance === 0;
                    });
                    Helpers.drawRect(game_7.game.uiCtx, new rect_2.Rect(padding, padding, this.screenWidth - padding, this.screenHeight - padding), "black", "", undefined, 0.75);
                    Helpers.drawText(game_7.game.uiCtx, "Game Mode: Team Deathmatch", hPadding, padding + 10, "white", "", fontSize, "left", "Top", "mmx_font");
                    Helpers.drawText(game_7.game.uiCtx, "Map: " + this.level.levelData.name, hPadding, padding + 20, "white", "", fontSize, "left", "Top", "mmx_font");
                    Helpers.drawText(game_7.game.uiCtx, "Playing to: " + String(this.killsToWin), hPadding, padding + 30, "white", "", fontSize, "left", "Top", "mmx_font"),
                        Helpers.drawLine(game_7.game.uiCtx, hPadding, lineY, this.screenWidth - hPadding, lineY, "white", 1);
                    Helpers.drawTextMMX(game_7.game.uiCtx, "Blue: " + blueKills, col1x, teamLabelY, fontSize, "left", "top");
                    Helpers.drawTextMMX(game_7.game.uiCtx, "Player", col1x, labelY, fontSize, "left", "top");
                    Helpers.drawTextMMX(game_7.game.uiCtx, "K", col2x, labelY, fontSize, "left", "top");
                    Helpers.drawTextMMX(game_7.game.uiCtx, "D", col3x, labelY, fontSize, "left", "top");
                    Helpers.drawTextMMX(game_7.game.uiCtx, "Red: " + redKills, this.screenWidth * 0.5 + col1x, teamLabelY, fontSize, "left", "top", true);
                    Helpers.drawTextMMX(game_7.game.uiCtx, "Player", this.screenWidth * 0.5 + col1x, labelY, fontSize, "left", "top", true);
                    Helpers.drawTextMMX(game_7.game.uiCtx, "K", this.screenWidth * 0.5 + col2x, labelY, fontSize, "left", "top", true);
                    Helpers.drawTextMMX(game_7.game.uiCtx, "D", this.screenWidth * 0.5 + col3x, labelY, fontSize, "left", "top", true);
                    Helpers.drawLine(game_7.game.uiCtx, hPadding, line2Y, this.screenWidth - hPadding, line2Y, "white", 1);
                    var rowH = 10;
                    for (var i = 0; i < bluePlayers.length; i++) {
                        var player = bluePlayers[i];
                        var color = (player === this.mainPlayer) ? "lightgreen" : "";
                        Helpers.drawTextMMX(game_7.game.uiCtx, Helpers.stringReplace(player.name, " ", ""), col1x, topPlayerY + (i) * rowH, fontSize, "left", "top", false, color);
                        Helpers.drawTextMMX(game_7.game.uiCtx, String(player.kills), col2x, topPlayerY + (i) * rowH, fontSize, "left", "top", false, color);
                        Helpers.drawTextMMX(game_7.game.uiCtx, String(player.deaths), col3x, topPlayerY + (i) * rowH, fontSize, "left", "top", false, color);
                    }
                    for (var i = 0; i < redPlayers.length; i++) {
                        var player = redPlayers[i];
                        var color = (player === this.mainPlayer) ? "lightgreen" : "";
                        Helpers.drawTextMMX(game_7.game.uiCtx, Helpers.stringReplace(player.name, " ", ""), this.screenWidth * 0.5 + col1x, topPlayerY + (i) * rowH, fontSize, "left", "top", true, color);
                        Helpers.drawTextMMX(game_7.game.uiCtx, String(player.kills), this.screenWidth * 0.5 + col2x, topPlayerY + (i) * rowH, fontSize, "left", "top", true, color);
                        Helpers.drawTextMMX(game_7.game.uiCtx, String(player.deaths), this.screenWidth * 0.5 + col3x, topPlayerY + (i) * rowH, fontSize, "left", "top", true, color);
                    }
                };
                TeamDeathMatch.prototype.checkIfWin = function () {
                    if (!this.isOver) {
                        var blueKills = 0;
                        var redKills = 0;
                        for (var _i = 0, _a = this.level.players; _i < _a.length; _i++) {
                            var player = _a[_i];
                            if (player.alliance === 0)
                                blueKills += player.kills;
                            else
                                redKills += player.kills;
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
                            if (game_7.game.music) {
                                game_7.game.music.stop();
                            }
                            if (this.level.mainPlayer && this.level.mainPlayer.won) {
                                game_7.game.music = new Howl({
                                    src: ["assets/music/win.mp3"],
                                });
                                game_7.game.music.play();
                            }
                            else if (this.level.mainPlayer && !this.level.mainPlayer.won) {
                                game_7.game.music = new Howl({
                                    src: ["assets/music/lose.mp3"],
                                });
                                game_7.game.music.play();
                            }
                        }
                    }
                    else {
                        this.overTime += game_7.game.deltaTime;
                        if (this.overTime > 10) {
                            game_7.game.restartLevel(this.level.levelData.name);
                        }
                    }
                };
                return TeamDeathMatch;
            }(GameMode));
            exports_13("TeamDeathMatch", TeamDeathMatch);
        }
    };
});
System.register("character", ["actor", "game", "point", "collider", "rect", "helpers", "weapon", "effects", "ai", "wall", "killFeedEntry", "gameMode"], function (exports_14, context_14) {
    "use strict";
    var __moduleName = context_14 && context_14.id;
    var actor_4, game_8, point_5, collider_3, rect_3, Helpers, weapon_2, effects_1, ai_1, wall_3, killFeedEntry_1, gameMode_1, Character, CharState, Idle, Run, Jump, Fall, Dash, AirDash, WallSlide, WallKick, LadderClimb, LadderEnd, Hurt, Die;
    return {
        setters: [
            function (actor_4_1) {
                actor_4 = actor_4_1;
            },
            function (game_8_1) {
                game_8 = game_8_1;
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
            function (wall_3_1) {
                wall_3 = wall_3_1;
            },
            function (killFeedEntry_1_1) {
                killFeedEntry_1 = killFeedEntry_1_1;
            },
            function (gameMode_1_1) {
                gameMode_1 = gameMode_1_1;
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
                    _this.chargeSound = game_8.game.sounds["charge_start"];
                    _this.chargeLoopSound = game_8.game.sounds["charge_loop"];
                    _this.chargeLoopSound.loop(true);
                    game_8.game.level.addGameObject(_this);
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
                Character.prototype.update = function () {
                    if (game_8.game.level.levelData.killY !== undefined && this.pos.y > game_8.game.level.levelData.killY) {
                        this.applyDamage(undefined, undefined, this.player.maxHealth * 2);
                    }
                    else if (game_8.game.level.isInKillZone(this)) {
                        this.applyDamage(undefined, undefined, this.player.maxHealth * 2);
                    }
                    if (this.player.health >= this.player.maxHealth) {
                        this.healAmount = 0;
                    }
                    if (this.healAmount > 0 && this.player.health > 0) {
                        this.healTime += game_8.game.deltaTime;
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
                        this.weaponHealTime += game_8.game.deltaTime;
                        if (this.weaponHealTime > 0.05) {
                            this.weaponHealTime = 0;
                            this.weaponHealAmount--;
                            this.player.weapon.ammo = Helpers.clampMax(this.player.weapon.ammo + 1, this.player.weapon.maxAmmo);
                            this.playSound("heal");
                        }
                    }
                    if (!(this.charState instanceof Dash) && !(this.charState instanceof AirDash) && !(this.charState instanceof Die)) {
                        var standingCollider = this.getStandingCollider();
                        if (!game_8.game.level.checkCollisionShape(standingCollider.shape, [this])) {
                            this.globalCollider = standingCollider;
                        }
                    }
                    if (this.player.alliance === 0) {
                    }
                    for (var projName in this.projectileCooldown) {
                        var cooldown = this.projectileCooldown[projName];
                        if (cooldown) {
                            this.projectileCooldown[projName] = Helpers.clampMin(cooldown - game_8.game.deltaTime, 0);
                        }
                    }
                    if (this.shootAnimTime > 0) {
                        this.shootAnimTime -= game_8.game.deltaTime;
                        if (this.shootAnimTime <= 0) {
                            this.shootAnimTime = 0;
                            this.changeSprite(this.charState.sprite, false);
                        }
                    }
                    if (this.invulnFrames > 0) {
                        this.invulnFrames = Helpers.clampMin0(this.invulnFrames - game_8.game.deltaTime);
                        if (game_8.game.level.twoFrameCycle > 0) {
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
                            this.chargeTime += game_8.game.deltaTime;
                        }
                        else {
                            if (this.isCharging()) {
                                this.shoot();
                                this.stopCharge();
                            }
                        }
                    }
                    if (this.shootTime > 0) {
                        this.shootTime -= game_8.game.deltaTime;
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
                            this.chargeSoundId = game_8.game.playClip(this.chargeSound, this.getSoundVolume());
                        }
                        if (this.chargeSoundId && !this.chargeSound.playing(this.chargeSoundId)) {
                            this.chargeSoundId = undefined;
                            this.chargeLoopSoundId = game_8.game.playClip(this.chargeLoopSound, this.getSoundVolume());
                        }
                        this.chargeFlashTime += game_8.game.deltaTime;
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
                Character.prototype.changeWeapon = function (newWeaponIndex) {
                    if (this.charState.constructor.name === "Die")
                        return;
                    this.player.weaponIndex = newWeaponIndex;
                    this.changePaletteWeapon();
                };
                Character.prototype.changePaletteWeapon = function () {
                    if (!game_8.game.level.gameMode.isTeamMode && !(game_8.game.level.gameMode instanceof gameMode_1.Brawl)) {
                        this.palette = this.player.weapon.palette;
                    }
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
                        return 3;
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
                    window.playerDebug = true;
                    _super.prototype.render.call(this, x, y);
                    window.playerDebug = false;
                    if (this.chargeEffect) {
                        this.chargeEffect.render(this.getCenterPos().add(new point_5.Point(x, y)), this.getChargeLevel());
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
                            game_8.game.level.gameMode.addKillFeedEntry(new killFeedEntry_1.KillFeedEntry(attacker, this.player, weapon));
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
                return Character;
            }(actor_4.Actor));
            exports_14("Character", Character);
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
                    this.stateTime += game_8.game.deltaTime;
                    var lastLeftWallData = game_8.game.level.checkCollisionActor(this.character, -1, 0);
                    this.lastLeftWall = lastLeftWallData ? lastLeftWallData.collider : undefined;
                    if (this.lastLeftWall && !this.lastLeftWall.isClimbable)
                        this.lastLeftWall = undefined;
                    var lastRightWallData = game_8.game.level.checkCollisionActor(this.character, 1, 0);
                    this.lastRightWall = lastRightWallData ? lastRightWallData.collider : undefined;
                    if (this.lastRightWall && !this.lastRightWall.isClimbable)
                        this.lastRightWall = undefined;
                };
                CharState.prototype.airCode = function () {
                    if (this.character.grounded) {
                        this.character.playSound("land");
                        this.character.changeState(new Idle(game_8.game.sprites["mmx_land"]));
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
                        var ladders = game_8.game.level.getTriggerList(this.character, 0, 0, undefined, wall_3.Ladder);
                        if (ladders.length > 0) {
                            var midX = ladders[0].collider.shape.getRect().midX;
                            if (Math.abs(this.character.pos.x - midX) < 12) {
                                var rect = ladders[0].collider.shape.getRect();
                                var snapX = (rect.x1 + rect.x2) / 2;
                                if (!game_8.game.level.checkCollisionActor(this.character, snapX - this.character.pos.x, 0)) {
                                    this.character.changeState(new LadderClimb(ladders[0].gameObject, snapX));
                                }
                            }
                        }
                    }
                    if (game_8.game.level.checkCollisionActor(this.character, 0, -1) && this.character.vel.y < 0) {
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
                        var ladders = game_8.game.level.getTriggerList(this.character, 0, 1, undefined, wall_3.Ladder);
                        if (ladders.length > 0) {
                            var rect = ladders[0].collider.shape.getRect();
                            var snapX = (rect.x1 + rect.x2) / 2;
                            if (!game_8.game.level.checkCollisionActor(this.character, snapX - this.character.pos.x, 30)) {
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
                    return _super.call(this, game_8.game.sprites["mmx_idle"], game_8.game.sprites["mmx_shoot"], transitionSprite) || this;
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
                    if (game_8.game.level.gameMode.isOver) {
                        if (this.player.won) {
                            if (this.character.sprite.name !== "mmx_win") {
                                this.character.changeSprite(game_8.game.sprites["mmx_win"], true);
                            }
                        }
                        else {
                            if (this.character.sprite.name !== "mmx_kneel") {
                                this.character.changeSprite(game_8.game.sprites["mmx_kneel"], true);
                            }
                        }
                    }
                };
                return Idle;
            }(CharState));
            Run = (function (_super) {
                __extends(Run, _super);
                function Run() {
                    return _super.call(this, game_8.game.sprites["mmx_run"], game_8.game.sprites["mmx_run_shoot"]) || this;
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
                    var _this = _super.call(this, game_8.game.sprites["mmx_jump"], game_8.game.sprites["mmx_jump_shoot"]) || this;
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
                    return _super.call(this, game_8.game.sprites["mmx_fall"], game_8.game.sprites["mmx_fall_shoot"]) || this;
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
                    var _this = _super.call(this, game_8.game.sprites["mmx_dash"], game_8.game.sprites["mmx_dash_shoot"]) || this;
                    _this.dashTime = 0;
                    _this.enterSound = "dash";
                    return _this;
                }
                Dash.prototype.onEnter = function (oldState) {
                    _super.prototype.onEnter.call(this, oldState);
                    this.character.isDashing = true;
                    this.character.globalCollider = this.character.getDashingCollider();
                    new actor_4.Anim(this.character.pos, game_8.game.sprites["dash_sparks"], this.character.xDir);
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
                    this.dashTime += game_8.game.deltaTime;
                    if (this.dashTime > 0.5) {
                        this.character.changeState(new Idle());
                        return;
                    }
                    var move = new point_5.Point(0, 0);
                    move.x = this.character.runSpeed * this.character.getDashSpeed() * this.character.xDir;
                    this.character.move(move);
                    if (this.stateTime > 0.1) {
                        this.stateTime = 0;
                        new actor_4.Anim(this.character.pos.addxy(0, -4), game_8.game.sprites["dust"], this.character.xDir);
                    }
                };
                return Dash;
            }(CharState));
            AirDash = (function (_super) {
                __extends(AirDash, _super);
                function AirDash() {
                    var _this = _super.call(this, game_8.game.sprites["mmx_dash"], game_8.game.sprites["mmx_dash_shoot"]) || this;
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
                    new actor_4.Anim(this.character.pos, game_8.game.sprites["dash_sparks"], this.character.xDir);
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
                    this.dashTime += game_8.game.deltaTime;
                    if (this.dashTime > 0.5) {
                        this.character.changeState(new Fall());
                        return;
                    }
                    var move = new point_5.Point(0, 0);
                    move.x = this.character.runSpeed * this.character.getDashSpeed() * this.character.xDir;
                    this.character.move(move);
                    if (this.stateTime > 0.1) {
                        this.stateTime = 0;
                        new actor_4.Anim(this.character.pos.addxy(0, -4), game_8.game.sprites["dust"], this.character.xDir);
                    }
                };
                return AirDash;
            }(CharState));
            WallSlide = (function (_super) {
                __extends(WallSlide, _super);
                function WallSlide(wallDir) {
                    var _this = _super.call(this, game_8.game.sprites["mmx_wall_slide"], game_8.game.sprites["mmx_wall_slide_shoot"]) || this;
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
                        if (!dirHeld || !game_8.game.level.checkCollisionActor(this.character, this.wallDir, 0)) {
                            this.player.character.changeState(new Fall());
                        }
                        this.character.move(new point_5.Point(0, 100));
                    }
                    this.dustTime += game_8.game.deltaTime;
                    if (this.stateTime > 0.2 && this.dustTime > 0.1) {
                        this.dustTime = 0;
                        new actor_4.Anim(this.character.pos.addxy(this.character.xDir * 12, 0), game_8.game.sprites["dust"], this.character.xDir);
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
                    var _this = _super.call(this, game_8.game.sprites["mmx_wall_kick"], game_8.game.sprites["mmx_wall_kick_shoot"]) || this;
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
                        this.kickSpeed = Helpers.toZero(this.kickSpeed, 800 * game_8.game.deltaTime, this.kickDir);
                        this.character.move(new point_5.Point(this.kickSpeed, 0));
                    }
                    this.airCode();
                    if (this.character.vel.y > 0) {
                        this.character.changeState(new Fall());
                    }
                };
                WallKick.prototype.onEnter = function (oldState) {
                    _super.prototype.onEnter.call(this, oldState);
                    new actor_4.Anim(this.character.pos.addxy(12 * this.character.xDir, 0), game_8.game.sprites["wall_sparks"], this.character.xDir);
                };
                WallKick.prototype.onExit = function (newState) {
                    _super.prototype.onExit.call(this, newState);
                };
                return WallKick;
            }(CharState));
            LadderClimb = (function (_super) {
                __extends(LadderClimb, _super);
                function LadderClimb(ladder, snapX) {
                    var _this = _super.call(this, game_8.game.sprites["mmx_ladder_climb"], game_8.game.sprites["mmx_ladder_shoot"], game_8.game.sprites["mmx_ladder_start"]) || this;
                    _this.ladder = ladder;
                    _this.snapX = snapX;
                    return _this;
                }
                LadderClimb.prototype.onEnter = function (oldState) {
                    _super.prototype.onEnter.call(this, oldState);
                    if (this.snapX !== undefined) {
                        this.character.pos.x = this.snapX;
                    }
                    if (this.character.player === game_8.game.level.mainPlayer) {
                        game_8.game.level.lerpCamTime = 0.25;
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
                            if (!game_8.game.level.checkCollisionActor(this.character, 0, targetY - this.character.pos.y)) {
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
                    var _this = _super.call(this, game_8.game.sprites["mmx_ladder_end"]) || this;
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
                        if (this.character.player === game_8.game.level.mainPlayer) {
                            game_8.game.level.lerpCamTime = 0.25;
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
                    var _this = _super.call(this, game_8.game.sprites["mmx_hurt"]) || this;
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
                        this.hurtSpeed = Helpers.toZero(this.hurtSpeed, 400 * game_8.game.deltaTime, this.hurtDir);
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
                    return _super.call(this, game_8.game.sprites["mmx_die"]) || this;
                }
                Die.prototype.onEnter = function (oldState) {
                    _super.prototype.onEnter.call(this, oldState);
                    this.character.useGravity = false;
                    this.character.vel.x = 0;
                    this.character.vel.y = 0;
                    game_8.game.level.removeFromGrid(this.character);
                    this.character.globalCollider = undefined;
                    this.character.stopCharge();
                    new actor_4.Anim(this.character.pos.addxy(0, -12), game_8.game.sprites["die_sparks"], 1);
                };
                Die.prototype.onExit = function (newState) {
                    this.character.dead = false;
                    throw "Should not have come back to life";
                };
                Die.prototype.update = function () {
                    _super.prototype.update.call(this);
                    if (this.stateTime > 0.75) {
                        if (this.character.player === game_8.game.level.mainPlayer) {
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
System.register("cheats", ["game"], function (exports_15, context_15) {
    "use strict";
    var __moduleName = context_15 && context_15.id;
    function cheat(key, keycode) {
        if (game_9.game.uiData.isProd)
            return false;
        if (keycode === 112) {
            for (var _i = 0, _a = game_9.game.level.players; _i < _a.length; _i++) {
                var player = _a[_i];
            }
            if (game_9.game.level.mainPlayer) {
                game_9.game.level.mainPlayer.character.pos.x = 200;
                game_9.game.level.mainPlayer.character.pos.y = 200;
            }
        }
        if (keycode === 113) {
            for (var _b = 0, _c = game_9.game.level.players; _b < _c.length; _b++) {
                var player = _c[_b];
                if (!player.isAI && player !== game_9.game.level.mainPlayer) {
                    player.isAI = true;
                    player.character.addAI();
                }
            }
        }
        if (keycode === 114) {
            game_9.game.level.mainPlayer.kills = 19;
        }
        if (keycode === 115) {
            var cpu = _.find(game_9.game.level.players, function (player) {
                return player.isAI;
            });
            cpu.kills = 19;
        }
        if (keycode === 75) {
            game_9.game.level.mainPlayer.character.applyDamage(undefined, undefined, 100);
        }
        if (keycode === 116) {
            for (var _d = 0, _e = game_9.game.level.players; _d < _e.length; _d++) {
                var player = _e[_d];
                if (player.isAI) {
                    player.character.changeWeapon(3);
                    player.lockWeapon = true;
                }
            }
        }
        if (key === "reset") {
            game_9.game.restartLevel("sm_bossroom");
            return;
        }
        if (keycode === 80) {
            game_9.game.paused = !game_9.game.paused;
        }
    }
    exports_15("cheat", cheat);
    var game_9;
    return {
        setters: [
            function (game_9_1) {
                game_9 = game_9_1;
            }
        ],
        execute: function () {
        }
    };
});
System.register("player", ["character", "weapon", "game", "helpers", "cheats"], function (exports_16, context_16) {
    "use strict";
    var __moduleName = context_16 && context_16.id;
    var character_4, weapon_3, game_10, Helpers, cheats_1, Player;
    return {
        setters: [
            function (character_4_1) {
                character_4 = character_4_1;
            },
            function (weapon_3_1) {
                weapon_3 = weapon_3_1;
            },
            function (game_10_1) {
                game_10 = game_10_1;
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
                        this.inputMapping = game_10.game.getPlayerControls(1);
                    }
                    else if (!isAI && alliance === 1) {
                        this.inputMapping = game_10.game.getPlayerControls(2);
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
                        this.inputMapping = game_10.game.getPlayerControls(1);
                    }
                    else if (!this.isAI && this.alliance === 1) {
                        this.inputMapping = game_10.game.getPlayerControls(2);
                    }
                };
                Player.prototype.update = function () {
                    if (this.respawnTime === 0 && !this.character) {
                        this.health = this.maxHealth;
                        for (var _i = 0, _a = this.weapons; _i < _a.length; _i++) {
                            var weapon = _a[_i];
                            weapon.ammo = weapon.maxAmmo;
                        }
                        var spawnPoint = game_10.game.level.getSpawnPoint(this);
                        this.character = new character_4.Character(this, spawnPoint.pos.x, spawnPoint.pos.y);
                        if (this.isAI) {
                            this.character.addAI();
                        }
                        this.character.palette = this.palette;
                        this.character.changePaletteWeapon();
                        this.character.xDir = spawnPoint.xDir;
                        if (this === game_10.game.level.mainPlayer) {
                            game_10.game.level.computeCamPos(this.character);
                            console.log(game_10.game.level.camX + "," + game_10.game.level.camY);
                        }
                    }
                    if (this.respawnTime > 0 && !game_10.game.level.gameMode.isOver) {
                        this.respawnTime = Helpers.clampMin0(this.respawnTime - game_10.game.deltaTime);
                    }
                };
                Object.defineProperty(Player.prototype, "canControl", {
                    get: function () {
                        if (game_10.game.level.gameMode.isOver) {
                            return false;
                        }
                        if (game_10.game.uiData.menu !== game_10.Menu.None && !this.isAI) {
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
                        game_10.game.restartLevel("sm_bossroom");
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
                    if (this === game_10.game.level.mainPlayer) {
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
            exports_16("Player", Player);
        }
    };
});
System.register("spawnPoint", ["game"], function (exports_17, context_17) {
    "use strict";
    var __moduleName = context_17 && context_17.id;
    var game_11, SpawnPoint;
    return {
        setters: [
            function (game_11_1) {
                game_11 = game_11_1;
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
                    var nearbyChars = game_11.game.level.getActorsInRadius(this.pos, 30, ["Character"]);
                    if (nearbyChars.length > 0)
                        return true;
                    return false;
                };
                return SpawnPoint;
            }());
            exports_17("SpawnPoint", SpawnPoint);
        }
    };
});
System.register("noScroll", [], function (exports_18, context_18) {
    "use strict";
    var __moduleName = context_18 && context_18.id;
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
            exports_18("Direction", Direction);
            NoScroll = (function () {
                function NoScroll(shape, dir) {
                    this.shape = shape;
                    this.freeDir = dir;
                }
                return NoScroll;
            }());
            exports_18("NoScroll", NoScroll);
        }
    };
});
System.register("killZone", [], function (exports_19, context_19) {
    "use strict";
    var __moduleName = context_19 && context_19.id;
    var KillZone;
    return {
        setters: [],
        execute: function () {
            KillZone = (function () {
                function KillZone(shape) {
                    this.shape = shape;
                }
                return KillZone;
            }());
            exports_19("KillZone", KillZone);
        }
    };
});
System.register("level", ["wall", "point", "game", "helpers", "actor", "rect", "collider", "character", "spawnPoint", "noScroll", "navMesh", "shape", "pickup", "killZone"], function (exports_20, context_20) {
    "use strict";
    var __moduleName = context_20 && context_20.id;
    var wall_4, point_6, game_12, Helpers, actor_5, rect_4, collider_4, character_5, spawnPoint_1, noScroll_1, navMesh_1, shape_1, pickup_2, killZone_1, LevelData, Level, Cell;
    return {
        setters: [
            function (wall_4_1) {
                wall_4 = wall_4_1;
            },
            function (point_6_1) {
                point_6 = point_6_1;
            },
            function (game_12_1) {
                game_12 = game_12_1;
            },
            function (Helpers_9) {
                Helpers = Helpers_9;
            },
            function (actor_5_1) {
                actor_5 = actor_5_1;
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
            function (killZone_1_1) {
                killZone_1 = killZone_1_1;
            }
        ],
        execute: function () {
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
                        this.levelMusic = "BossBattle.mp3";
                        this.musicLoopStart = 1500;
                        this.musicLoopEnd = 29664;
                        this.maxPlayers = 2;
                    }
                    else if (this.name === "powerplant") {
                        this.fixedCam = false;
                        this.levelMusic = "PowerPlant.mp3";
                        this.parallax = "powerplant_parallex.png";
                        this.musicLoopStart = 51040;
                        this.musicLoopEnd = 101116;
                        this.maxPlayers = 8;
                    }
                    else if (this.name === "highway") {
                        this.fixedCam = false;
                        this.levelMusic = "highway.mp3";
                        this.parallax = "highway_parallax.png";
                        this.musicLoopStart = 44440;
                        this.musicLoopEnd = 87463;
                        this.killY = 300;
                        this.foreground = "highway_foreground.png";
                        this.maxPlayers = 8;
                    }
                    else if (this.name === "gallery") {
                        this.fixedCam = false;
                        this.levelMusic = "gallery.mp3";
                        this.parallax = "gallery_parallax.png";
                        this.musicLoopStart = 0;
                        this.musicLoopEnd = 110687;
                        this.killY = 1034;
                        this.foreground = "gallery_foreground.png";
                        this.maxPlayers = 10;
                    }
                }
                return LevelData;
            }());
            exports_20("LevelData", LevelData);
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
                    this.killZones = [];
                    this.grid = [];
                    this.levelData = levelData;
                    this.zoomScale = 3;
                    this.gravity = 550;
                    this.frameCount = 0;
                    this.backgroundPath = levelData.levelJson.backgroundPath;
                    this.parallaxPath = "assets/backgrounds/" + levelData.parallax;
                    this.foregroundPath = "assets/backgrounds/" + levelData.foreground;
                    var imagesToLoad = [this.backgroundPath];
                    if (this.parallaxPath) {
                        imagesToLoad.push(this.parallaxPath);
                    }
                    if (this.foregroundPath) {
                        imagesToLoad.push(this.foregroundPath);
                    }
                    game_12.game.loadImages(imagesToLoad);
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
                Level.prototype.startLevel = function (gameMode) {
                    this.renderSetup();
                    this.gameObjects = new Set();
                    this.setupGrid(50);
                    for (var _i = 0, _a = this.levelData.levelJson.instances; _i < _a.length; _i++) {
                        var instance = _a[_i];
                        if (instance.objectName === "Collision Shape") {
                            var points = [];
                            for (var _b = 0, _c = instance.points; _b < _c.length; _b++) {
                                var point = _c[_b];
                                points.push(new point_6.Point(point.x, point.y));
                            }
                            var wall = new wall_4.Wall(instance.name, points);
                            wall.collider.isClimbable = (instance.properties && instance.properties.climbable === "false") ? false : true;
                            this.addGameObject(wall);
                        }
                        else if (instance.objectName === "Ladder") {
                            var points = [];
                            for (var _d = 0, _e = instance.points; _d < _e.length; _d++) {
                                var point = _e[_d];
                                points.push(new point_6.Point(point.x, point.y));
                            }
                            this.addGameObject(new wall_4.Ladder(instance.name, points));
                        }
                        else if (instance.objectName === "No Scroll") {
                            var points = [];
                            for (var _f = 0, _g = instance.points; _f < _g.length; _f++) {
                                var point = _g[_f];
                                points.push(new point_6.Point(point.x, point.y));
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
                            for (var _h = 0, _j = instance.points; _h < _j.length; _h++) {
                                var point = _j[_h];
                                points.push(new point_6.Point(point.x, point.y));
                            }
                            var shape = new shape_1.Shape(points);
                            this.killZones.push(new killZone_1.KillZone(shape));
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
                            var actor = new actor_5.Actor(instance.spriteName, new point_6.Point(instance.pos.x, instance.pos.y));
                            actor.name = instance.name;
                            this.addGameObject(actor);
                        }
                    }
                    for (var _k = 0, _l = this.navMeshNodes; _k < _l.length; _k++) {
                        var navMeshNode = _l[_k];
                        navMeshNode.setNeighbors(this.navMeshNodes, this.getGameObjectArray());
                    }
                    this.twoFrameCycle = 0;
                    this.gameMode = gameMode;
                    if (this.levelData.levelMusic) {
                        if (game_12.game.music) {
                            game_12.game.music.stop();
                        }
                        var music_1 = new Howl({
                            src: ["assets/music/" + this.levelData.levelMusic],
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
                                console.log("Loop");
                                music_1.play("musicLoop");
                            });
                        }, 1000);
                        game_12.game.music = music_1;
                    }
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
                    if (game_12.game.music) {
                        game_12.game.music.volume((game_12.game.options.playMusic ? game_12.game.getMusicVolume01() : 0));
                    }
                    this.gameMode.checkIfWin();
                    var playerX = 0;
                    var playerY = 0;
                    if (this.mainPlayer.character) {
                        playerX = this.mainPlayer.character.pos.x;
                        playerY = this.mainPlayer.character.pos.y;
                    }
                    var gameObjects = this.getGameObjectArray();
                    for (var _i = 0, gameObjects_1 = gameObjects; _i < gameObjects_1.length; _i++) {
                        var go = gameObjects_1[_i];
                        go.preUpdate();
                        go.update();
                    }
                    if (this.mainPlayer.character) {
                        var deltaX = this.mainPlayer.character.pos.x - playerX;
                        var deltaY = this.mainPlayer.character.pos.y - playerY;
                        this.updateCamPos(deltaX, deltaY);
                    }
                    for (var _a = 0, _b = this.effects; _a < _b.length; _a++) {
                        var effect = _b[_a];
                        effect.update();
                    }
                    for (var _c = 0, _d = this.localPlayers; _c < _d.length; _c++) {
                        var player = _d[_c];
                        player.clearInputPressed();
                        if (player.isAI) {
                            player.clearAiInput();
                        }
                    }
                    for (var _e = 0, _f = this.players; _e < _f.length; _e++) {
                        var player = _f[_e];
                        player.update();
                    }
                    for (var _g = 0, _h = this.pickupSpawners; _g < _h.length; _g++) {
                        var pickupSpawner = _h[_g];
                        pickupSpawner.update();
                    }
                    this.frameCount++;
                    this.twoFrameCycle++;
                    if (this.twoFrameCycle > 2)
                        this.twoFrameCycle = -2;
                    this.gameMode.update();
                };
                Level.prototype.renderSetup = function () {
                    if (this.parallaxPath) {
                        this.parallaxSprite = new PIXI.Sprite(PIXI.loader.resources[this.parallaxPath].texture);
                        game_12.game.pixiApp.stage.addChild(this.parallaxSprite);
                    }
                    this.gameContainer = new PIXI.Container();
                    game_12.game.pixiApp.stage.addChild(this.gameContainer);
                    if (this.backgroundPath) {
                        this.backgroundSprite = new PIXI.Sprite(PIXI.loader.resources[this.backgroundPath].texture);
                        this.gameContainer.addChild(this.backgroundSprite);
                    }
                    if (this.foregroundPath) {
                        this.foregroundSprite = new PIXI.Sprite(PIXI.loader.resources[this.foregroundPath].texture);
                        game_12.game.pixiApp.stage.addChild(this.foregroundSprite);
                    }
                    this.uiContainer = new PIXI.Container();
                    game_12.game.pixiApp.stage.addChild(this.uiContainer);
                    if (this.levelData.fixedCam) {
                        var w = this.backgroundSprite.width * this.zoomScale;
                        var h = this.backgroundSprite.height * this.zoomScale;
                        game_12.game.pixiApp.renderer.resize(w, h);
                        game_12.game.uiCanvas.width = w;
                        game_12.game.uiCanvas.height = h;
                        game_12.game.pixiApp.renderer.view.style.width = w + "px";
                        game_12.game.pixiApp.renderer.view.style.height = h + "px";
                        game_12.game.pixiApp.renderer.resize(w, h);
                        game_12.game.pixiApp.stage.scale.set(this.zoomScale);
                    }
                    else {
                        var w = Math.min(game_12.game.defaultCanvasWidth * this.zoomScale, Math.round(this.backgroundSprite.width * this.zoomScale));
                        var h = Math.min(game_12.game.defaultCanvasHeight * this.zoomScale, Math.round(this.backgroundSprite.height * this.zoomScale));
                        game_12.game.pixiApp.renderer.resize(w, h);
                        game_12.game.uiCanvas.width = w;
                        game_12.game.uiCanvas.height = h;
                        game_12.game.pixiApp.renderer.view.style.width = w + "px";
                        game_12.game.pixiApp.renderer.view.style.height = h + "px";
                        game_12.game.pixiApp.renderer.resize(w, h);
                        game_12.game.pixiApp.stage.scale.set(this.zoomScale);
                    }
                };
                Level.prototype.render = function () {
                    this.gameContainer.x = -this.camX;
                    this.gameContainer.y = -this.camY;
                    this.parallaxSprite.x = -this.camX * 0.5;
                    this.parallaxSprite.y = -this.camY * 0.5;
                    this.foregroundSprite.x = -this.camX;
                    this.foregroundSprite.y = -this.camY;
                    var gameObjectsArray = this.getGameObjectArray();
                    for (var _i = 0, gameObjectsArray_1 = gameObjectsArray; _i < gameObjectsArray_1.length; _i++) {
                        var go = gameObjectsArray_1[_i];
                        go.render(0, 0);
                    }
                    for (var _a = 0, _b = this.effects; _a < _b.length; _a++) {
                        var effect = _b[_a];
                        effect.render(0, 0);
                    }
                    this.drawHUD();
                };
                Level.prototype.drawHUD = function () {
                    Helpers.noCanvasSmoothing(game_12.game.uiCtx);
                    game_12.game.uiCtx.setTransform(this.zoomScale, 0, 0, this.zoomScale, 0, 0);
                    game_12.game.uiCtx.clearRect(0, 0, this.screenWidth, this.screenHeight);
                    var player1 = this.localPlayers[0];
                    this.drawPlayerHUD(player1, 1);
                    if (this.localPlayers.length > 1 && this.levelData.fixedCam) {
                        var player2 = this.localPlayers[1];
                        this.drawPlayerHUD(player2, 2);
                    }
                    this.gameMode.drawHUD();
                    if (!game_12.game.uiData.isProd) {
                        Helpers.drawText(game_12.game.uiCtx, this.debugString, 10, 50, "white", "black", 8, "left", "top", "");
                        Helpers.drawText(game_12.game.uiCtx, this.debugString2, 10, 70, "white", "black", 8, "left", "top", "");
                    }
                };
                Level.prototype.drawPlayerHUD = function (player, playerNum) {
                    var baseX = 10;
                    if (playerNum === 2)
                        baseX = this.screenWidth - 4 - baseX;
                    var baseY = this.screenHeight / 2;
                    baseY += 25;
                    game_12.game.sprites["hud_health_base"].drawCanvas(game_12.game.uiCtx, 0, baseX, baseY, 1, 1, "", 1, player.palette);
                    baseY -= 16;
                    for (var i = 0; i < Math.ceil(player.health); i++) {
                        game_12.game.sprites["hud_health_full"].drawCanvas(game_12.game.uiCtx, 0, baseX, baseY);
                        baseY -= 2;
                    }
                    for (var i = 0; i < player.maxHealth - Math.ceil(player.health); i++) {
                        game_12.game.sprites["hud_health_empty"].drawCanvas(game_12.game.uiCtx, 0, baseX, baseY);
                        baseY -= 2;
                    }
                    game_12.game.sprites["hud_health_top"].drawCanvas(game_12.game.uiCtx, 0, baseX, baseY);
                    if (player.weaponIndex !== 0) {
                        baseX = 25;
                        if (playerNum === 2)
                            baseX = this.screenWidth - 4 - baseX;
                        baseY = this.screenHeight / 2;
                        baseY += 25;
                        game_12.game.sprites["hud_weapon_base"].drawCanvas(game_12.game.uiCtx, player.weapon.index - 1, baseX, baseY);
                        baseY -= 16;
                        for (var i = 0; i < Math.ceil(player.weapon.ammo); i++) {
                            game_12.game.sprites["hud_weapon_full"].drawCanvas(game_12.game.uiCtx, player.weapon.index - 1, baseX, baseY);
                            baseY -= 2;
                        }
                        for (var i = 0; i < player.weapon.maxAmmo - Math.ceil(player.weapon.ammo); i++) {
                            game_12.game.sprites["hud_health_empty"].drawCanvas(game_12.game.uiCtx, 0, baseX, baseY);
                            baseY -= 2;
                        }
                        game_12.game.sprites["hud_health_top"].drawCanvas(game_12.game.uiCtx, 0, baseX, baseY);
                    }
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
                    get: function () { return game_12.game.pixiApp.renderer.width / this.zoomScale; },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(Level.prototype, "screenHeight", {
                    get: function () { return game_12.game.pixiApp.renderer.height / this.zoomScale; },
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
                        return (game_12.game.pixiApp.stage.width / this.zoomScale) * 0.375;
                    },
                    enumerable: true,
                    configurable: true
                });
                Level.prototype.updateCamPos = function (deltaX, deltaY) {
                    var playerX = this.mainPlayer.character.pos.x;
                    var playerY = this.mainPlayer.character.getCamCenterPos().y;
                    var dontMoveX = false;
                    var dontMoveY = false;
                    var scaledCanvasW = game_12.game.defaultCanvasWidth;
                    var scaledCanvasH = game_12.game.defaultCanvasHeight;
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
                    for (var _i = 0, _a = this.noScrolls; _i < _a.length; _i++) {
                        var noScroll = _a[_i];
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
                };
                Level.prototype.computeCamPos = function (character) {
                    var scaledCanvasW = game_12.game.defaultCanvasWidth;
                    var scaledCanvasH = game_12.game.defaultCanvasHeight;
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
                Level.prototype.setupGrid = function (cellWidth) {
                    this.cellWidth = cellWidth;
                    var width = this.width;
                    var height = this.height;
                    var hCellCount = Math.ceil(width / cellWidth);
                    var vCellCount = Math.ceil(height / cellWidth);
                    console.log("Creating grid with width " + hCellCount + " and height " + vCellCount);
                    for (var i = 0; i < vCellCount; i++) {
                        var curRow = [];
                        this.grid.push(curRow);
                        for (var j = 0; j < hCellCount; j++) {
                            curRow.push(new Set());
                        }
                    }
                };
                Level.prototype.getGridCells = function (shape, offsetX, offsetY) {
                    var minI = Math.floor((shape.minY / this.height) * this.grid.length);
                    var minJ = Math.floor((shape.minX / this.width) * this.grid[0].length);
                    var maxI = Math.floor((shape.maxY / this.height) * this.grid.length);
                    var maxJ = Math.floor((shape.maxX / this.width) * this.grid[0].length);
                    var cells = [];
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
                    for (var _i = 0, cells_1 = cells; _i < cells_1.length; _i++) {
                        var cell = cells_1[_i];
                        if (!cell.gameobjects)
                            continue;
                        for (var it = cell.gameobjects.values(), cell2 = undefined; cell2 = it.next().value;) {
                            if (this.gameObjects.has(cell2)) {
                                retGameobjects.add(cell2);
                            }
                            else {
                                this.gameObjects.delete(cell2);
                            }
                        }
                    }
                    return Array.from(retGameobjects);
                };
                Level.prototype.addGameObject = function (go) {
                    this.addGameObjectToGrid(go);
                    this.gameObjects.add(go);
                };
                Level.prototype.removeGameObject = function (go) {
                    this.removeFromGrid(go);
                    this.gameObjects.delete(go);
                };
                Level.prototype.removeFromGrid = function (go) {
                    if (!go.collider)
                        return;
                    var cells = this.getGridCells(go.collider.shape, 0, 0);
                    for (var _i = 0, cells_2 = cells; _i < cells_2.length; _i++) {
                        var cell = cells_2[_i];
                        cell.gameobjects.delete(go);
                    }
                };
                Level.prototype.addGameObjectToGrid = function (go) {
                    if (!go.collider)
                        return;
                    var cells = this.getGridCells(go.collider.shape, 0, 0);
                    for (var _i = 0, cells_3 = cells; _i < cells_3.length; _i++) {
                        var cell = cells_3[_i];
                        this.grid[cell.i][cell.j].add(go);
                    }
                };
                Level.prototype.hasGameObject = function (go) {
                    return this.gameObjects.has(go);
                };
                Level.prototype.addEffect = function (effect) {
                    this.effects.push(effect);
                };
                Level.prototype.isInKillZone = function (actor) {
                    if (!actor.collider)
                        return false;
                    for (var _i = 0, _a = this.killZones; _i < _a.length; _i++) {
                        var killZone = _a[_i];
                        if (killZone.shape.intersectsShape(actor.collider.shape)) {
                            return true;
                        }
                    }
                    return false;
                };
                Level.prototype.shouldTrigger = function (actor, gameObject, offset) {
                    if (!actor.collider.isTrigger && gameObject instanceof wall_4.Ladder) {
                        if (actor.pos.y < gameObject.collider.shape.getRect().y1 && offset.y > 0) {
                            if (actor instanceof character_5.Character && !actor.checkLadderDown) {
                                return false;
                            }
                        }
                    }
                    if (actor.collider.isTrigger || gameObject.collider.isTrigger)
                        return true;
                    if (actor.collider.wallOnly && !(gameObject instanceof wall_4.Wall))
                        return true;
                    if (gameObject instanceof actor_5.Actor) {
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
                    for (var _i = 0, gameObjects_2 = gameObjects; _i < gameObjects_2.length; _i++) {
                        var go = gameObjects_2[_i];
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
                    return collideDatas;
                };
                Level.prototype.getMtvDir = function (actor, offsetX, offsetY, vel, pushIncline, overrideCollideDatas) {
                    var collideDatas = overrideCollideDatas;
                    if (!collideDatas) {
                        collideDatas = game_12.game.level.getAllCollideDatas(actor, offsetX, offsetY, vel);
                    }
                    var actorShape = actor.collider.shape.clone(offsetX, offsetY);
                    var pushDir = vel.times(-1).normalize();
                    if (collideDatas.length > 0) {
                        for (var _i = 0, collideDatas_1 = collideDatas; _i < collideDatas_1.length; _i++) {
                            var collideData = collideDatas_1[_i];
                            if (collideData.hitData && collideData.hitData.normal && collideData.hitData.normal.isAngled() && pushIncline) {
                                pushDir = new point_6.Point(0, -1);
                            }
                        }
                    }
                    if (collideDatas.length > 0) {
                        var maxMag = 0;
                        var maxMtv = void 0;
                        for (var _a = 0, collideDatas_2 = collideDatas; _a < collideDatas_2.length; _a++) {
                            var collideData = collideDatas_2[_a];
                            actor.registerCollision(collideData);
                            var mtv = actorShape.getMinTransVectorDir(collideData.collider.shape, pushDir);
                            if (mtv && mtv.magnitude >= maxMag) {
                                maxMag = mtv.magnitude;
                                maxMtv = mtv;
                            }
                        }
                        return maxMtv;
                    }
                    else {
                        return undefined;
                    }
                };
                Level.prototype.checkCollisionShape = function (shape, exclusions) {
                    var gameObjects = this.getGameObjectsInSameCell(shape, 0, 0);
                    for (var _i = 0, gameObjects_3 = gameObjects; _i < gameObjects_3.length; _i++) {
                        var go = gameObjects_3[_i];
                        if (!go.collider)
                            continue;
                        if (exclusions.indexOf(go) !== -1)
                            continue;
                        var hitData = shape.intersectsShape(go.collider.shape);
                        if (hitData) {
                            return new collider_4.CollideData(go.collider, undefined, false, go, hitData);
                        }
                    }
                    return undefined;
                };
                Level.prototype.checkCollisionActor = function (actor, offsetX, offsetY, vel) {
                    if (!actor.collider || actor.collider.isTrigger)
                        return undefined;
                    var actorShape = actor.collider.shape.clone(offsetX, offsetY);
                    var gameObjects = this.getGameObjectsInSameCell(actor.collider.shape, offsetX, offsetY);
                    for (var _i = 0, gameObjects_4 = gameObjects; _i < gameObjects_4.length; _i++) {
                        var go = gameObjects_4[_i];
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
                    return undefined;
                };
                Level.prototype.getActorsInRadius = function (pos, radius, classNames) {
                    var actors = [];
                    var gameObjects = this.getGameObjectArray();
                    for (var _i = 0, gameObjects_5 = gameObjects; _i < gameObjects_5.length; _i++) {
                        var go = gameObjects_5[_i];
                        if (!(go instanceof actor_5.Actor))
                            continue;
                        if (!this.isOfClass(go, classNames))
                            continue;
                        if (go.pos.distanceTo(pos) < radius) {
                            actors.push(go);
                        }
                    }
                    return actors;
                };
                Level.prototype.getTriggerList = function (actor, offsetX, offsetY, vel, classType) {
                    var triggers = [];
                    if (!actor.collider)
                        return triggers;
                    var actorShape = actor.collider.shape.clone(offsetX, offsetY);
                    var gameObjects = this.getGameObjectsInSameCell(actor.collider.shape, offsetX, offsetY);
                    for (var _i = 0, gameObjects_6 = gameObjects; _i < gameObjects_6.length; _i++) {
                        var go = gameObjects_6[_i];
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
                    return triggers;
                };
                Level.prototype.isOfClass = function (go, classNames) {
                    if (!classNames || classNames.length === 0)
                        return true;
                    var found = false;
                    for (var _i = 0, classNames_1 = classNames; _i < classNames_1.length; _i++) {
                        var className = classNames_1[_i];
                        if (go.constructor.name === className) {
                            found = true;
                            break;
                        }
                    }
                    return found;
                };
                Level.prototype.raycastAll = function (pos1, pos2, classNames) {
                    var hits = [];
                    var shape = new shape_1.Shape([pos1, pos2]);
                    var gameObjects = this.getGameObjectsInSameCell(shape, 0, 0);
                    for (var _i = 0, gameObjects_7 = gameObjects; _i < gameObjects_7.length; _i++) {
                        var go = gameObjects_7[_i];
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
                    return hits;
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
                    for (var _i = 0, _a = this.navMeshNodes; _i < _a.length; _i++) {
                        var node = _a[_i];
                        if (this.noWallsInBetween(pos, node.pos)) {
                            var dist = pos.distanceTo(node.pos);
                            if (dist < minDist) {
                                minDist = dist;
                                minNode = node;
                            }
                        }
                    }
                    return minNode;
                };
                Level.prototype.getRandomNode = function () {
                    return _.sample(this.navMeshNodes);
                };
                Level.prototype.getSpawnPoint = function (player) {
                    var unoccupied = _.filter(this.spawnPoints, function (spawnPoint) {
                        return !spawnPoint.occupied();
                    });
                    if (game_12.game.level.levelData.fixedCam) {
                        return _.find(unoccupied, function (spawnPoint) {
                            return spawnPoint.num === player.alliance;
                        });
                    }
                    return _.sample(unoccupied);
                };
                return Level;
            }());
            exports_20("Level", Level);
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
            exports_20("Cell", Cell);
        }
    };
});
System.register("sprites", [], function (exports_21, context_21) {
    "use strict";
    var __moduleName = context_21 && context_21.id;
    var spriteJsons;
    return {
        setters: [],
        execute: function () {
            spriteJsons = [{ "className": "Sprite", "hitboxes": [{ "className": "Hitbox", "tags": "", "width": 15, "height": 15, "offset": { "className": "Point", "x": 0, "y": 0 }, "rect": { "className": "Rect", "topLeftPoint": { "className": "Point", "x": 342.5, "y": 292.5 }, "botRightPoint": { "className": "Point", "x": 357.5, "y": 307.5 } }, "isTrigger": true }], "frames": [{ "className": "Frame", "rect": { "className": "Rect", "topLeftPoint": { "className": "Point", "x": 9, "y": 925 }, "botRightPoint": { "className": "Point", "x": 24, "y": 939 } }, "duration": 0.03, "offset": { "className": "Point", "x": 0, "y": 0 }, "hitboxes": [], "POIs": [] }, { "className": "Frame", "rect": { "className": "Rect", "topLeftPoint": { "className": "Point", "x": 35, "y": 925 }, "botRightPoint": { "className": "Point", "x": 50, "y": 940 } }, "duration": 0.03, "offset": { "className": "Point", "x": 0, "y": 0 }, "hitboxes": [], "POIs": [] }, { "className": "Frame", "rect": { "className": "Rect", "topLeftPoint": { "className": "Point", "x": 60, "y": 925 }, "botRightPoint": { "className": "Point", "x": 74, "y": 940 } }, "duration": 0.03, "offset": { "className": "Point", "x": 0, "y": 0 }, "hitboxes": [], "POIs": [] }, { "className": "Frame", "rect": { "className": "Rect", "topLeftPoint": { "className": "Point", "x": 82, "y": 925 }, "botRightPoint": { "className": "Point", "x": 97, "y": 940 } }, "duration": 0.03, "offset": { "className": "Point", "x": 0, "y": 0 }, "hitboxes": [], "POIs": [] }, { "className": "Frame", "rect": { "className": "Rect", "topLeftPoint": { "className": "Point", "x": 107, "y": 926 }, "botRightPoint": { "className": "Point", "x": 122, "y": 940 } }, "duration": 0.03, "offset": { "className": "Point", "x": 0, "y": 0 }, "hitboxes": [], "POIs": [] }, { "className": "Frame", "rect": { "className": "Rect", "topLeftPoint": { "className": "Point", "x": 133, "y": 926 }, "botRightPoint": { "className": "Point", "x": 148, "y": 941 } }, "duration": 0.03, "offset": { "className": "Point", "x": 0, "y": 0 }, "hitboxes": [], "POIs": [] }, { "className": "Frame", "rect": { "className": "Rect", "topLeftPoint": { "className": "Point", "x": 155, "y": 926 }, "botRightPoint": { "className": "Point", "x": 169, "y": 941 } }, "duration": 0.03, "offset": { "className": "Point", "x": 0, "y": 0 }, "hitboxes": [], "POIs": [] }, { "className": "Frame", "rect": { "className": "Rect", "topLeftPoint": { "className": "Point", "x": 180, "y": 926 }, "botRightPoint": { "className": "Point", "x": 195, "y": 941 } }, "duration": 0.03, "offset": { "className": "Point", "x": 0, "y": 0 }, "hitboxes": [], "POIs": [] }], "POIs": [], "name": "boomerang", "path": "assets/sprites/boomerang.json", "alignment": "center", "wrapMode": "loop", "spritesheetPath": "assets/spritesheets/effects.png" }, { "className": "Sprite", "hitboxes": [{ "className": "Hitbox", "tags": "", "width": 8, "height": 6, "offset": { "className": "Point", "x": 0, "y": 0 }, "rect": { "className": "Rect", "topLeftPoint": { "className": "Point", "x": 346, "y": 297 }, "botRightPoint": { "className": "Point", "x": 354, "y": 303 } }, "isTrigger": true }], "frames": [{ "className": "Frame", "rect": { "className": "Rect", "topLeftPoint": { "className": "Point", "x": 123, "y": 253 }, "botRightPoint": { "className": "Point", "x": 131, "y": 259 } }, "duration": 0.066, "offset": { "className": "Point", "x": 0, "y": 0 }, "hitboxes": [], "POIs": [] }], "POIs": [], "name": "buster1", "path": "assets/sprites/buster1.json", "alignment": "center", "wrapMode": "once", "spritesheetPath": "assets/spritesheets/effects.png" }, { "className": "Sprite", "hitboxes": [], "frames": [{ "className": "Frame", "rect": { "className": "Rect", "topLeftPoint": { "className": "Point", "x": 137, "y": 250 }, "botRightPoint": { "className": "Point", "x": 149, "y": 262 } }, "duration": 0.03, "offset": { "className": "Point", "x": 0, "y": 0 }, "hitboxes": [], "POIs": [] }, { "className": "Frame", "rect": { "className": "Rect", "topLeftPoint": { "className": "Point", "x": 154, "y": 249 }, "botRightPoint": { "className": "Point", "x": 167, "y": 262 } }, "duration": 0.03, "offset": { "className": "Point", "x": 0, "y": 0 }, "hitboxes": [], "POIs": [] }, { "className": "Frame", "rect": { "className": "Rect", "topLeftPoint": { "className": "Point", "x": 172, "y": 248 }, "botRightPoint": { "className": "Point", "x": 187, "y": 263 } }, "duration": 0.03, "offset": { "className": "Point", "x": 0, "y": 0 }, "hitboxes": [], "POIs": [] }], "POIs": [], "name": "buster1_fade", "path": "assets/sprites/buster1_fade.json", "alignment": "center", "wrapMode": "once", "spritesheetPath": "assets/spritesheets/effects.png" }, { "className": "Sprite", "hitboxes": [{ "className": "Hitbox", "tags": "", "width": 22, "height": 8, "offset": { "className": "Point", "x": 5, "y": 0 }, "rect": { "className": "Rect", "topLeftPoint": { "className": "Point", "x": 344, "y": 296 }, "botRightPoint": { "className": "Point", "x": 366, "y": 304 } }, "isTrigger": true }], "frames": [{ "className": "Frame", "rect": { "className": "Rect", "topLeftPoint": { "className": "Point", "x": 138, "y": 274 }, "botRightPoint": { "className": "Point", "x": 153, "y": 288 } }, "duration": 0.03, "offset": { "className": "Point", "x": 0, "y": 0 }, "hitboxes": [], "POIs": [] }, { "className": "Frame", "rect": { "className": "Rect", "topLeftPoint": { "className": "Point", "x": 158, "y": 269 }, "botRightPoint": { "className": "Point", "x": 182, "y": 293 } }, "duration": 0.03, "offset": { "className": "Point", "x": 0, "y": 0 }, "hitboxes": [], "POIs": [] }, { "className": "Frame", "rect": { "className": "Rect", "topLeftPoint": { "className": "Point", "x": 187, "y": 275 }, "botRightPoint": { "className": "Point", "x": 215, "y": 287 } }, "duration": 0.03, "offset": { "className": "Point", "x": 0, "y": 0 }, "hitboxes": [], "POIs": [] }, { "className": "Frame", "rect": { "className": "Rect", "topLeftPoint": { "className": "Point", "x": 221, "y": 277 }, "botRightPoint": { "className": "Point", "x": 253, "y": 285 } }, "duration": 0.03, "offset": { "className": "Point", "x": 0, "y": 0 }, "hitboxes": [], "POIs": [] }, { "className": "Frame", "rect": { "className": "Rect", "topLeftPoint": { "className": "Point", "x": 260, "y": 275 }, "botRightPoint": { "className": "Point", "x": 298, "y": 287 } }, "duration": 0.03, "offset": { "className": "Point", "x": 0, "y": 0 }, "hitboxes": [], "POIs": [] }, { "className": "Frame", "rect": { "className": "Rect", "topLeftPoint": { "className": "Point", "x": 303, "y": 270 }, "botRightPoint": { "className": "Point", "x": 339, "y": 292 } }, "duration": 0.03, "offset": { "className": "Point", "x": 0, "y": 0 }, "hitboxes": [], "POIs": [] }, { "className": "Frame", "rect": { "className": "Rect", "topLeftPoint": { "className": "Point", "x": 344, "y": 275 }, "botRightPoint": { "className": "Point", "x": 382, "y": 287 } }, "duration": 0.03, "offset": { "className": "Point", "x": 0, "y": 0 }, "hitboxes": [], "POIs": [] }, { "className": "Frame", "rect": { "className": "Rect", "topLeftPoint": { "className": "Point", "x": 388, "y": 270 }, "botRightPoint": { "className": "Point", "x": 428, "y": 289 } }, "duration": 0.03, "offset": { "className": "Point", "x": 0, "y": -2 }, "hitboxes": [], "POIs": [] }], "POIs": [], "name": "buster2", "path": "assets/sprites/buster2.json", "alignment": "center", "wrapMode": "loop", "spritesheetPath": "assets/spritesheets/effects.png", "loopStartFrame": 5 }, { "className": "Sprite", "hitboxes": [], "frames": [{ "className": "Frame", "rect": { "className": "Rect", "topLeftPoint": { "className": "Point", "x": 434, "y": 274 }, "botRightPoint": { "className": "Point", "x": 449, "y": 288 } }, "duration": 0.03, "offset": { "className": "Point", "x": 0, "y": 0 }, "hitboxes": [], "POIs": [] }, { "className": "Frame", "rect": { "className": "Rect", "topLeftPoint": { "className": "Point", "x": 454, "y": 269 }, "botRightPoint": { "className": "Point", "x": 478, "y": 293 } }, "duration": 0.03, "offset": { "className": "Point", "x": 0, "y": 0 }, "hitboxes": [], "POIs": [] }, { "className": "Frame", "rect": { "className": "Rect", "topLeftPoint": { "className": "Point", "x": 487, "y": 273 }, "botRightPoint": { "className": "Point", "x": 503, "y": 289 } }, "duration": 0.03, "offset": { "className": "Point", "x": 0, "y": 0 }, "hitboxes": [], "POIs": [] }, { "className": "Frame", "rect": { "className": "Rect", "topLeftPoint": { "className": "Point", "x": 507, "y": 269 }, "botRightPoint": { "className": "Point", "x": 531, "y": 293 } }, "duration": 0.03, "offset": { "className": "Point", "x": 0, "y": 0 }, "hitboxes": [], "POIs": [] }, { "className": "Frame", "rect": { "className": "Rect", "topLeftPoint": { "className": "Point", "x": 535, "y": 273 }, "botRightPoint": { "className": "Point", "x": 551, "y": 289 } }, "duration": 0.03, "offset": { "className": "Point", "x": 0, "y": 0 }, "hitboxes": [], "POIs": [] }, { "className": "Frame", "rect": { "className": "Rect", "topLeftPoint": { "className": "Point", "x": 555, "y": 270 }, "botRightPoint": { "className": "Point", "x": 577, "y": 292 } }, "duration": 0.03, "offset": { "className": "Point", "x": 0, "y": 0 }, "hitboxes": [], "POIs": [] }, { "className": "Frame", "rect": { "className": "Rect", "topLeftPoint": { "className": "Point", "x": 581, "y": 269 }, "botRightPoint": { "className": "Point", "x": 605, "y": 293 } }, "duration": 0.03, "offset": { "className": "Point", "x": 0, "y": 0 }, "hitboxes": [], "POIs": [] }, { "className": "Frame", "rect": { "className": "Rect", "topLeftPoint": { "className": "Point", "x": 609, "y": 269 }, "botRightPoint": { "className": "Point", "x": 633, "y": 293 } }, "duration": 0.03, "offset": { "className": "Point", "x": 0, "y": 0 }, "hitboxes": [], "POIs": [] }], "POIs": [], "name": "buster2_fade", "path": "assets/sprites/buster2_fade.json", "alignment": "center", "wrapMode": "once", "spritesheetPath": "assets/spritesheets/effects.png" }, { "className": "Sprite", "hitboxes": [{ "className": "Hitbox", "tags": "", "width": 24, "height": 24, "offset": { "className": "Point", "x": 0, "y": 0 }, "rect": { "className": "Rect", "topLeftPoint": { "className": "Point", "x": 338, "y": 288 }, "botRightPoint": { "className": "Point", "x": 362, "y": 312 } }, "isTrigger": true }], "frames": [{ "className": "Frame", "rect": { "className": "Rect", "topLeftPoint": { "className": "Point", "x": 148, "y": 319 }, "botRightPoint": { "className": "Point", "x": 162, "y": 339 } }, "duration": 0.03, "offset": { "className": "Point", "x": 0, "y": 0 }, "hitboxes": [], "POIs": [] }, { "className": "Frame", "rect": { "className": "Rect", "topLeftPoint": { "className": "Point", "x": 170, "y": 321 }, "botRightPoint": { "className": "Point", "x": 193, "y": 337 } }, "duration": 0.03, "offset": { "className": "Point", "x": 0, "y": 0 }, "hitboxes": [], "POIs": [] }, { "className": "Frame", "rect": { "className": "Rect", "topLeftPoint": { "className": "Point", "x": 199, "y": 313 }, "botRightPoint": { "className": "Point", "x": 231, "y": 345 } }, "duration": 0.03, "offset": { "className": "Point", "x": 0, "y": 0 }, "hitboxes": [], "POIs": [] }, { "className": "Frame", "rect": { "className": "Rect", "topLeftPoint": { "className": "Point", "x": 239, "y": 317 }, "botRightPoint": { "className": "Point", "x": 266, "y": 341 } }, "duration": 0.03, "offset": { "className": "Point", "x": 0, "y": 0 }, "hitboxes": [], "POIs": [] }, { "className": "Frame", "rect": { "className": "Rect", "topLeftPoint": { "className": "Point", "x": 271, "y": 313 }, "botRightPoint": { "className": "Point", "x": 311, "y": 345 } }, "duration": 0.03, "offset": { "className": "Point", "x": 0, "y": 0 }, "hitboxes": [], "POIs": [] }], "POIs": [], "name": "buster3", "path": "assets/sprites/buster3.json", "alignment": "center", "wrapMode": "loop", "spritesheetPath": "assets/spritesheets/effects.png", "loopStartFrame": 2 }, { "className": "Sprite", "hitboxes": [], "frames": [{ "className": "Frame", "rect": { "className": "Rect", "topLeftPoint": { "className": "Point", "x": 320, "y": 319 }, "botRightPoint": { "className": "Point", "x": 334, "y": 339 } }, "duration": 0.03, "offset": { "className": "Point", "x": 0, "y": 0 }, "hitboxes": [], "POIs": [] }, { "className": "Frame", "rect": { "className": "Rect", "topLeftPoint": { "className": "Point", "x": 341, "y": 315 }, "botRightPoint": { "className": "Point", "x": 365, "y": 343 } }, "duration": 0.03, "offset": { "className": "Point", "x": 0, "y": 0 }, "hitboxes": [], "POIs": [] }, { "className": "Frame", "rect": { "className": "Rect", "topLeftPoint": { "className": "Point", "x": 374, "y": 315 }, "botRightPoint": { "className": "Point", "x": 402, "y": 343 } }, "duration": 0.03, "offset": { "className": "Point", "x": 0, "y": 0 }, "hitboxes": [], "POIs": [] }, { "className": "Frame", "rect": { "className": "Rect", "topLeftPoint": { "className": "Point", "x": 406, "y": 316 }, "botRightPoint": { "className": "Point", "x": 432, "y": 342 } }, "duration": 0.03, "offset": { "className": "Point", "x": 0, "y": 0 }, "hitboxes": [], "POIs": [] }, { "className": "Frame", "rect": { "className": "Rect", "topLeftPoint": { "className": "Point", "x": 436, "y": 315 }, "botRightPoint": { "className": "Point", "x": 464, "y": 343 } }, "duration": 0.03, "offset": { "className": "Point", "x": 0, "y": 0 }, "hitboxes": [], "POIs": [] }, { "className": "Frame", "rect": { "className": "Rect", "topLeftPoint": { "className": "Point", "x": 468, "y": 314 }, "botRightPoint": { "className": "Point", "x": 498, "y": 344 } }, "duration": 0.03, "offset": { "className": "Point", "x": 0, "y": 0 }, "hitboxes": [], "POIs": [] }, { "className": "Frame", "rect": { "className": "Rect", "topLeftPoint": { "className": "Point", "x": 502, "y": 313 }, "botRightPoint": { "className": "Point", "x": 534, "y": 345 } }, "duration": 0.03, "offset": { "className": "Point", "x": 0, "y": 0 }, "hitboxes": [], "POIs": [] }, { "className": "Frame", "rect": { "className": "Rect", "topLeftPoint": { "className": "Point", "x": 538, "y": 313 }, "botRightPoint": { "className": "Point", "x": 570, "y": 345 } }, "duration": 0.03, "offset": { "className": "Point", "x": 0, "y": 0 }, "hitboxes": [], "POIs": [] }], "POIs": [], "name": "buster3_fade", "path": "assets/sprites/buster3_fade.json", "alignment": "center", "wrapMode": "once", "spritesheetPath": "assets/spritesheets/effects.png" }, { "className": "Sprite", "hitboxes": [{ "className": "Hitbox", "tags": "", "width": 16, "height": 15, "offset": { "className": "Point", "x": 0, "y": 0 }, "rect": { "className": "Rect", "topLeftPoint": { "className": "Point", "x": 342, "y": 292.5 }, "botRightPoint": { "className": "Point", "x": 358, "y": 307.5 } }, "isTrigger": true }], "frames": [{ "className": "Frame", "rect": { "className": "Rect", "topLeftPoint": { "className": "Point", "x": 324, "y": 377 }, "botRightPoint": { "className": "Point", "x": 340, "y": 392 } }, "duration": 0.03, "offset": { "className": "Point", "x": 0, "y": 0 }, "hitboxes": [], "POIs": [] }, { "className": "Frame", "rect": { "className": "Rect", "topLeftPoint": { "className": "Point", "x": 344, "y": 378 }, "botRightPoint": { "className": "Point", "x": 358, "y": 391 } }, "duration": 0.03, "offset": { "className": "Point", "x": 0, "y": 0 }, "hitboxes": [], "POIs": [] }, { "className": "Frame", "rect": { "className": "Rect", "topLeftPoint": { "className": "Point", "x": 362, "y": 379 }, "botRightPoint": { "className": "Point", "x": 375, "y": 390 } }, "duration": 0.03, "offset": { "className": "Point", "x": 0, "y": 0 }, "hitboxes": [], "POIs": [] }, { "className": "Frame", "rect": { "className": "Rect", "topLeftPoint": { "className": "Point", "x": 379, "y": 381 }, "botRightPoint": { "className": "Point", "x": 387, "y": 388 } }, "duration": 0.03, "offset": { "className": "Point", "x": 0, "y": 0 }, "hitboxes": [], "POIs": [] }], "POIs": [], "name": "buster4", "path": "assets/sprites/buster4.json", "alignment": "center", "wrapMode": "once", "spritesheetPath": "assets/spritesheets/effects.png" }, { "className": "Sprite", "hitboxes": [], "frames": [{ "className": "Frame", "rect": { "className": "Rect", "topLeftPoint": { "className": "Point", "x": 402, "y": 379 }, "botRightPoint": { "className": "Point", "x": 414, "y": 391 } }, "duration": 0.03, "offset": { "className": "Point", "x": 0, "y": 0 }, "hitboxes": [], "POIs": [] }, { "className": "Frame", "rect": { "className": "Rect", "topLeftPoint": { "className": "Point", "x": 418, "y": 378 }, "botRightPoint": { "className": "Point", "x": 432, "y": 392 } }, "duration": 0.03, "offset": { "className": "Point", "x": 0, "y": 0 }, "hitboxes": [], "POIs": [] }, { "className": "Frame", "rect": { "className": "Rect", "topLeftPoint": { "className": "Point", "x": 436, "y": 377 }, "botRightPoint": { "className": "Point", "x": 452, "y": 393 } }, "duration": 0.03, "offset": { "className": "Point", "x": 0, "y": 0 }, "hitboxes": [], "POIs": [] }], "POIs": [], "name": "buster4_fade", "path": "assets/sprites/buster4_fade.json", "alignment": "center", "wrapMode": "once", "spritesheetPath": "assets/spritesheets/effects.png" }, { "className": "Sprite", "hitboxes": [], "frames": [{ "className": "Frame", "rect": { "className": "Rect", "topLeftPoint": { "className": "Point", "x": 146, "y": 362 }, "botRightPoint": { "className": "Point", "x": 159, "y": 407 } }, "duration": 0.03, "offset": { "className": "Point", "x": 0, "y": 0 }, "hitboxes": [], "POIs": [] }, { "className": "Frame", "rect": { "className": "Rect", "topLeftPoint": { "className": "Point", "x": 166, "y": 355 }, "botRightPoint": { "className": "Point", "x": 190, "y": 414 } }, "duration": 0.03, "offset": { "className": "Point", "x": -7, "y": 0 }, "hitboxes": [], "POIs": [] }, { "className": "Frame", "rect": { "className": "Rect", "topLeftPoint": { "className": "Point", "x": 199, "y": 352 }, "botRightPoint": { "className": "Point", "x": 231, "y": 415 } }, "duration": 0.03, "offset": { "className": "Point", "x": -13, "y": 0 }, "hitboxes": [], "POIs": [] }, { "className": "Frame", "rect": { "className": "Rect", "topLeftPoint": { "className": "Point", "x": 238, "y": 352 }, "botRightPoint": { "className": "Point", "x": 269, "y": 415 } }, "duration": 0.03, "offset": { "className": "Point", "x": -15, "y": 0 }, "hitboxes": [], "POIs": [] }, { "className": "Frame", "rect": { "className": "Rect", "topLeftPoint": { "className": "Point", "x": 275, "y": 357 }, "botRightPoint": { "className": "Point", "x": 296, "y": 410 } }, "duration": 0.03, "offset": { "className": "Point", "x": -19, "y": 0 }, "hitboxes": [], "POIs": [] }, { "className": "Frame", "rect": { "className": "Rect", "topLeftPoint": { "className": "Point", "x": 302, "y": 361 }, "botRightPoint": { "className": "Point", "x": 317, "y": 408 } }, "duration": 0.03, "offset": { "className": "Point", "x": -23, "y": 0 }, "hitboxes": [], "POIs": [] }], "POIs": [], "name": "buster4_muzzle_flash", "path": "assets/sprites/buster4_muzzle_flash.json", "alignment": "center", "wrapMode": "once", "spritesheetPath": "assets/spritesheets/effects.png" }, { "className": "Sprite", "hitboxes": [], "frames": [{ "className": "Frame", "rect": { "className": "Rect", "topLeftPoint": { "className": "Point", "x": 126, "y": 282 }, "botRightPoint": { "className": "Point", "x": 128, "y": 284 } }, "duration": 0.066, "offset": { "className": "Point", "x": 0, "y": 0 }, "hitboxes": [], "POIs": [] }, { "className": "Frame", "rect": { "className": "Rect", "topLeftPoint": { "className": "Point", "x": 126, "y": 282 }, "botRightPoint": { "className": "Point", "x": 128, "y": 284 } }, "duration": 0.066, "offset": { "className": "Point", "x": 0, "y": 0 }, "hitboxes": [], "POIs": [] }, { "className": "Frame", "rect": { "className": "Rect", "topLeftPoint": { "className": "Point", "x": 121, "y": 283 }, "botRightPoint": { "className": "Point", "x": 122, "y": 284 } }, "duration": 0.066, "offset": { "className": "Point", "x": 0, "y": 0 }, "hitboxes": [], "POIs": [] }, { "className": "Frame", "rect": { "className": "Rect", "topLeftPoint": { "className": "Point", "x": 121, "y": 283 }, "botRightPoint": { "className": "Point", "x": 122, "y": 284 } }, "duration": 0.066, "offset": { "className": "Point", "x": 0, "y": 0 }, "hitboxes": [], "POIs": [] }], "POIs": [], "name": "charge_part_1", "path": "assets/sprites/charge_part_1.json", "alignment": "center", "wrapMode": "once", "spritesheetPath": "assets/spritesheets/effects.png" }, { "className": "Sprite", "hitboxes": [], "frames": [{ "className": "Frame", "rect": { "className": "Rect", "topLeftPoint": { "className": "Point", "x": 134, "y": 327 }, "botRightPoint": { "className": "Point", "x": 138, "y": 331 } }, "duration": 0.066, "offset": { "className": "Point", "x": 0, "y": 0 }, "hitboxes": [], "POIs": [] }, { "className": "Frame", "rect": { "className": "Rect", "topLeftPoint": { "className": "Point", "x": 127, "y": 328 }, "botRightPoint": { "className": "Point", "x": 130, "y": 331 } }, "duration": 0.066, "offset": { "className": "Point", "x": 0, "y": 0 }, "hitboxes": [], "POIs": [] }, { "className": "Frame", "rect": { "className": "Rect", "topLeftPoint": { "className": "Point", "x": 121, "y": 329 }, "botRightPoint": { "className": "Point", "x": 123, "y": 331 } }, "duration": 0.066, "offset": { "className": "Point", "x": 0, "y": 0 }, "hitboxes": [], "POIs": [] }, { "className": "Frame", "rect": { "className": "Rect", "topLeftPoint": { "className": "Point", "x": 116, "y": 330 }, "botRightPoint": { "className": "Point", "x": 117, "y": 331 } }, "duration": 0.066, "offset": { "className": "Point", "x": 0, "y": 0 }, "hitboxes": [], "POIs": [] }], "POIs": [], "name": "charge_part_2", "path": "assets/sprites/charge_part_2.json", "alignment": "center", "wrapMode": "once", "spritesheetPath": "assets/spritesheets/effects.png" }, { "className": "Sprite", "hitboxes": [], "frames": [{ "className": "Frame", "rect": { "className": "Rect", "topLeftPoint": { "className": "Point", "x": 131, "y": 383 }, "botRightPoint": { "className": "Point", "x": 136, "y": 388 } }, "duration": 0.066, "offset": { "className": "Point", "x": 0, "y": 0 }, "hitboxes": [], "POIs": [] }, { "className": "Frame", "rect": { "className": "Rect", "topLeftPoint": { "className": "Point", "x": 123, "y": 384 }, "botRightPoint": { "className": "Point", "x": 127, "y": 388 } }, "duration": 0.066, "offset": { "className": "Point", "x": 0, "y": 0 }, "hitboxes": [], "POIs": [] }, { "className": "Frame", "rect": { "className": "Rect", "topLeftPoint": { "className": "Point", "x": 116, "y": 385 }, "botRightPoint": { "className": "Point", "x": 119, "y": 388 } }, "duration": 0.066, "offset": { "className": "Point", "x": 0, "y": 0 }, "hitboxes": [], "POIs": [] }, { "className": "Frame", "rect": { "className": "Rect", "topLeftPoint": { "className": "Point", "x": 110, "y": 386 }, "botRightPoint": { "className": "Point", "x": 112, "y": 388 } }, "duration": 0.066, "offset": { "className": "Point", "x": 0, "y": 0 }, "hitboxes": [], "POIs": [] }], "POIs": [], "name": "charge_part_3", "path": "assets/sprites/charge_part_3.json", "alignment": "center", "wrapMode": "once", "spritesheetPath": "assets/spritesheets/effects.png" }, { "className": "Sprite", "hitboxes": [], "frames": [{ "className": "Frame", "rect": { "className": "Rect", "topLeftPoint": { "className": "Point", "x": 657, "y": 275 }, "botRightPoint": { "className": "Point", "x": 676, "y": 290 } }, "duration": 0.066, "offset": { "className": "Point", "x": 0, "y": 0 }, "hitboxes": [], "POIs": [] }, { "className": "Frame", "rect": { "className": "Rect", "topLeftPoint": { "className": "Point", "x": 679, "y": 266 }, "botRightPoint": { "className": "Point", "x": 702, "y": 290 } }, "duration": 0.066, "offset": { "className": "Point", "x": 0, "y": 0 }, "hitboxes": [], "POIs": [] }, { "className": "Frame", "rect": { "className": "Rect", "topLeftPoint": { "className": "Point", "x": 706, "y": 265 }, "botRightPoint": { "className": "Point", "x": 729, "y": 290 } }, "duration": 0.066, "offset": { "className": "Point", "x": 0, "y": 0 }, "hitboxes": [], "POIs": [] }, { "className": "Frame", "rect": { "className": "Rect", "topLeftPoint": { "className": "Point", "x": 734, "y": 264 }, "botRightPoint": { "className": "Point", "x": 761, "y": 290 } }, "duration": 0.066, "offset": { "className": "Point", "x": 0, "y": 0 }, "hitboxes": [], "POIs": [] }], "POIs": [], "name": "dash_sparks", "path": "assets/sprites/dash_sparks.json", "alignment": "botmid", "wrapMode": "once", "spritesheetPath": "assets/spritesheets/effects.png" }, { "className": "Sprite", "hitboxes": [], "frames": [{ "className": "Frame", "rect": { "className": "Rect", "topLeftPoint": { "className": "Point", "x": 486, "y": 386 }, "botRightPoint": { "className": "Point", "x": 495, "y": 395 } }, "duration": 0.066, "offset": { "className": "Point", "x": 0, "y": 0 }, "hitboxes": [], "POIs": [] }, { "className": "Frame", "rect": { "className": "Rect", "topLeftPoint": { "className": "Point", "x": 486, "y": 373 }, "botRightPoint": { "className": "Point", "x": 497, "y": 384 } }, "duration": 0.066, "offset": { "className": "Point", "x": 0, "y": 0 }, "hitboxes": [], "POIs": [] }, { "className": "Frame", "rect": { "className": "Rect", "topLeftPoint": { "className": "Point", "x": 502, "y": 380 }, "botRightPoint": { "className": "Point", "x": 517, "y": 395 } }, "duration": 0.066, "offset": { "className": "Point", "x": 0, "y": 0 }, "hitboxes": [], "POIs": [] }], "POIs": [], "name": "die_particle", "path": "assets/sprites/die_particle.json", "alignment": "center", "wrapMode": "once", "spritesheetPath": "assets/spritesheets/effects.png" }, { "className": "Sprite", "hitboxes": [], "frames": [{ "className": "Frame", "rect": { "className": "Rect", "topLeftPoint": { "className": "Point", "x": 622, "y": 489 }, "botRightPoint": { "className": "Point", "x": 637, "y": 503 } }, "duration": 0.03, "offset": { "className": "Point", "x": 0, "y": 0 }, "hitboxes": [], "POIs": [] }, { "className": "Frame", "rect": { "className": "Rect", "topLeftPoint": { "className": "Point", "x": 650, "y": 483 }, "botRightPoint": { "className": "Point", "x": 677, "y": 507 } }, "duration": 0.03, "offset": { "className": "Point", "x": 0, "y": 0 }, "hitboxes": [], "POIs": [] }], "POIs": [], "name": "die_sparks", "path": "assets/sprites/die_sparks.json", "alignment": "center", "wrapMode": "once", "spritesheetPath": "assets/spritesheets/effects.png" }, { "className": "Sprite", "hitboxes": [], "frames": [{ "className": "Frame", "rect": { "className": "Rect", "topLeftPoint": { "className": "Point", "x": 798, "y": 256 }, "botRightPoint": { "className": "Point", "x": 806, "y": 263 } }, "duration": 0.066, "offset": { "className": "Point", "x": 0, "y": 0 }, "hitboxes": [], "POIs": [] }, { "className": "Frame", "rect": { "className": "Rect", "topLeftPoint": { "className": "Point", "x": 808, "y": 253 }, "botRightPoint": { "className": "Point", "x": 818, "y": 264 } }, "duration": 0.066, "offset": { "className": "Point", "x": 0, "y": 0 }, "hitboxes": [], "POIs": [] }, { "className": "Frame", "rect": { "className": "Rect", "topLeftPoint": { "className": "Point", "x": 820, "y": 251 }, "botRightPoint": { "className": "Point", "x": 833, "y": 264 } }, "duration": 0.066, "offset": { "className": "Point", "x": 0, "y": 0 }, "hitboxes": [], "POIs": [] }, { "className": "Frame", "rect": { "className": "Rect", "topLeftPoint": { "className": "Point", "x": 837, "y": 250 }, "botRightPoint": { "className": "Point", "x": 851, "y": 264 } }, "duration": 0.066, "offset": { "className": "Point", "x": 0, "y": 0 }, "hitboxes": [], "POIs": [] }, { "className": "Frame", "rect": { "className": "Rect", "topLeftPoint": { "className": "Point", "x": 854, "y": 250 }, "botRightPoint": { "className": "Point", "x": 868, "y": 264 } }, "duration": 0.066, "offset": { "className": "Point", "x": 0, "y": 0 }, "hitboxes": [], "POIs": [] }, { "className": "Frame", "rect": { "className": "Rect", "topLeftPoint": { "className": "Point", "x": 870, "y": 258 }, "botRightPoint": { "className": "Point", "x": 882, "y": 264 } }, "duration": 0.066, "offset": { "className": "Point", "x": 0, "y": 0 }, "hitboxes": [], "POIs": [] }], "POIs": [], "name": "dust", "path": "assets/sprites/dust.json", "alignment": "center", "wrapMode": "once", "spritesheetPath": "assets/spritesheets/effects.png" }, { "className": "Sprite", "hitboxes": [{ "className": "Hitbox", "tags": "", "width": 16, "height": 16, "offset": { "className": "Point", "x": 0, "y": 0 }, "rect": { "className": "Rect", "topLeftPoint": { "className": "Point", "x": 342, "y": 292 }, "botRightPoint": { "className": "Point", "x": 358, "y": 308 } }, "isTrigger": true }], "frames": [{ "className": "Frame", "rect": { "className": "Rect", "topLeftPoint": { "className": "Point", "x": 742, "y": 901 }, "botRightPoint": { "className": "Point", "x": 758, "y": 917 } }, "duration": 0.015, "offset": { "className": "Point", "x": 0, "y": 0 }, "hitboxes": [], "POIs": [] }, { "className": "Frame", "rect": { "className": "Rect", "topLeftPoint": { "className": "Point", "x": 763, "y": 900 }, "botRightPoint": { "className": "Point", "x": 781, "y": 918 } }, "duration": 0.015, "offset": { "className": "Point", "x": 0, "y": 0 }, "hitboxes": [], "POIs": [] }, { "className": "Frame", "rect": { "className": "Rect", "topLeftPoint": { "className": "Point", "x": 742, "y": 901 }, "botRightPoint": { "className": "Point", "x": 758, "y": 917 } }, "duration": 0.015, "offset": { "className": "Point", "x": 0, "y": 0 }, "hitboxes": [], "POIs": [] }, { "className": "Frame", "rect": { "className": "Rect", "topLeftPoint": { "className": "Point", "x": 788, "y": 903 }, "botRightPoint": { "className": "Point", "x": 800, "y": 915 } }, "duration": 0.015, "offset": { "className": "Point", "x": 0, "y": 0 }, "hitboxes": [], "POIs": [] }], "POIs": [], "name": "electric_spark", "path": "assets/sprites/electric_spark.json", "alignment": "center", "wrapMode": "loop", "spritesheetPath": "assets/spritesheets/effects.png" }, { "className": "Sprite", "hitboxes": [], "frames": [{ "className": "Frame", "rect": { "className": "Rect", "topLeftPoint": { "className": "Point", "x": 843, "y": 896 }, "botRightPoint": { "className": "Point", "x": 869, "y": 922 } }, "duration": 0.015, "offset": { "className": "Point", "x": 0, "y": 0 }, "hitboxes": [], "POIs": [] }, { "className": "Frame", "rect": { "className": "Rect", "topLeftPoint": { "className": "Point", "x": 874, "y": 893 }, "botRightPoint": { "className": "Point", "x": 906, "y": 925 } }, "duration": 0.015, "offset": { "className": "Point", "x": 0, "y": 0 }, "hitboxes": [], "POIs": [] }], "POIs": [], "name": "electric_spark_fade", "path": "assets/sprites/electric_spark_fade.json", "alignment": "center", "wrapMode": "once", "spritesheetPath": "assets/spritesheets/effects.png" }, { "className": "Sprite", "hitboxes": [], "frames": [{ "className": "Frame", "rect": { "className": "Rect", "topLeftPoint": { "className": "Point", "x": 591, "y": 315 }, "botRightPoint": { "className": "Point", "x": 607, "y": 331 } }, "duration": 0.03, "offset": { "className": "Point", "x": -1, "y": 0 }, "hitboxes": [], "POIs": [] }, { "className": "Frame", "rect": { "className": "Rect", "topLeftPoint": { "className": "Point", "x": 617, "y": 315 }, "botRightPoint": { "className": "Point", "x": 649, "y": 347 } }, "duration": 0.03, "offset": { "className": "Point", "x": 0, "y": 0 }, "hitboxes": [], "POIs": [] }, { "className": "Frame", "rect": { "className": "Rect", "topLeftPoint": { "className": "Point", "x": 659, "y": 315 }, "botRightPoint": { "className": "Point", "x": 687, "y": 339 } }, "duration": 0.03, "offset": { "className": "Point", "x": 0, "y": 0 }, "hitboxes": [], "POIs": [] }, { "className": "Frame", "rect": { "className": "Rect", "topLeftPoint": { "className": "Point", "x": 697, "y": 315 }, "botRightPoint": { "className": "Point", "x": 727, "y": 342 } }, "duration": 0.03, "offset": { "className": "Point", "x": 0, "y": 0 }, "hitboxes": [], "POIs": [] }, { "className": "Frame", "rect": { "className": "Rect", "topLeftPoint": { "className": "Point", "x": 737, "y": 315 }, "botRightPoint": { "className": "Point", "x": 769, "y": 342 } }, "duration": 0.03, "offset": { "className": "Point", "x": 0, "y": 0 }, "hitboxes": [], "POIs": [] }, { "className": "Frame", "rect": { "className": "Rect", "topLeftPoint": { "className": "Point", "x": 779, "y": 315 }, "botRightPoint": { "className": "Point", "x": 811, "y": 345 } }, "duration": 0.03, "offset": { "className": "Point", "x": 0, "y": 0 }, "hitboxes": [], "POIs": [] }, { "className": "Frame", "rect": { "className": "Rect", "topLeftPoint": { "className": "Point", "x": 821, "y": 315 }, "botRightPoint": { "className": "Point", "x": 852, "y": 337 } }, "duration": 0.03, "offset": { "className": "Point", "x": 0, "y": 0 }, "hitboxes": [], "POIs": [] }, { "className": "Frame", "rect": { "className": "Rect", "topLeftPoint": { "className": "Point", "x": 863, "y": 315 }, "botRightPoint": { "className": "Point", "x": 894, "y": 330 } }, "duration": 0.03, "offset": { "className": "Point", "x": 0, "y": 0 }, "hitboxes": [], "POIs": [] }], "POIs": [], "name": "explosion", "path": "assets/sprites/explosion.json", "alignment": "center", "wrapMode": "once", "spritesheetPath": "assets/spritesheets/effects.png" }, { "className": "Sprite", "hitboxes": [{ "className": "Hitbox", "tags": "", "width": 15, "height": 10, "offset": { "className": "Point", "x": 0, "y": 0 }, "rect": { "className": "Rect", "topLeftPoint": { "className": "Point", "x": 342.5, "y": 295 }, "botRightPoint": { "className": "Point", "x": 357.5, "y": 305 } }, "isTrigger": true }], "frames": [{ "className": "Frame", "rect": { "className": "Rect", "topLeftPoint": { "className": "Point", "x": 47, "y": 905 }, "botRightPoint": { "className": "Point", "x": 62, "y": 915 } }, "duration": 0.03, "offset": { "className": "Point", "x": 0, "y": 0 }, "hitboxes": [], "POIs": [] }], "POIs": [], "name": "fire_wave", "path": "assets/sprites/fire_wave.json", "alignment": "center", "wrapMode": "once", "spritesheetPath": "assets/spritesheets/effects.png" }, { "className": "Sprite", "hitboxes": [], "frames": [{ "className": "Frame", "rect": { "className": "Rect", "topLeftPoint": { "className": "Point", "x": 65, "y": 906 }, "botRightPoint": { "className": "Point", "x": 81, "y": 917 } }, "duration": 0.015, "offset": { "className": "Point", "x": 0, "y": 0 }, "hitboxes": [], "POIs": [] }, { "className": "Frame", "rect": { "className": "Rect", "topLeftPoint": { "className": "Point", "x": 85, "y": 905 }, "botRightPoint": { "className": "Point", "x": 97, "y": 917 } }, "duration": 0.015, "offset": { "className": "Point", "x": 0, "y": 0 }, "hitboxes": [], "POIs": [] }, { "className": "Frame", "rect": { "className": "Rect", "topLeftPoint": { "className": "Point", "x": 102, "y": 904 }, "botRightPoint": { "className": "Point", "x": 116, "y": 918 } }, "duration": 0.015, "offset": { "className": "Point", "x": 0, "y": 0 }, "hitboxes": [], "POIs": [] }, { "className": "Frame", "rect": { "className": "Rect", "topLeftPoint": { "className": "Point", "x": 119, "y": 903 }, "botRightPoint": { "className": "Point", "x": 135, "y": 919 } }, "duration": 0.015, "offset": { "className": "Point", "x": 0, "y": 0 }, "hitboxes": [], "POIs": [] }, { "className": "Frame", "rect": { "className": "Rect", "topLeftPoint": { "className": "Point", "x": 137, "y": 903 }, "botRightPoint": { "className": "Point", "x": 153, "y": 919 } }, "duration": 0.015, "offset": { "className": "Point", "x": 0, "y": 0 }, "hitboxes": [], "POIs": [] }], "POIs": [], "name": "fire_wave_fade", "path": "assets/sprites/fire_wave_fade.json", "alignment": "center", "wrapMode": "once", "spritesheetPath": "assets/spritesheets/effects.png" }, { "className": "Sprite", "hitboxes": [], "frames": [{ "className": "Frame", "rect": { "className": "Rect", "topLeftPoint": { "className": "Point", "x": 2, "y": 55 }, "botRightPoint": { "className": "Point", "x": 16, "y": 71 } }, "duration": 1, "offset": { "className": "Point", "x": 0, "y": 0 }, "hitboxes": [], "POIs": [] }], "POIs": [], "name": "hud_health_base", "path": "assets/sprites/hud_health_base.json", "alignment": "botmid", "wrapMode": "once", "spritesheetPath": "assets/spritesheets/effects.png" }, { "className": "Sprite", "hitboxes": [], "frames": [{ "className": "Frame", "rect": { "className": "Rect", "topLeftPoint": { "className": "Point", "x": 2, "y": 37 }, "botRightPoint": { "className": "Point", "x": 16, "y": 39 } }, "duration": 0.066, "offset": { "className": "Point", "x": 0, "y": 0 }, "hitboxes": [], "POIs": [] }], "POIs": [], "name": "hud_health_empty", "path": "assets/sprites/hud_health_empty.json", "alignment": "botmid", "wrapMode": "once", "spritesheetPath": "assets/spritesheets/effects.png" }, { "className": "Sprite", "hitboxes": [], "frames": [{ "className": "Frame", "rect": { "className": "Rect", "topLeftPoint": { "className": "Point", "x": 2, "y": 51 }, "botRightPoint": { "className": "Point", "x": 16, "y": 53 } }, "duration": 0.066, "offset": { "className": "Point", "x": 0, "y": 0 }, "hitboxes": [], "POIs": [] }], "POIs": [], "name": "hud_health_full", "path": "assets/sprites/hud_health_full.json", "alignment": "botmid", "wrapMode": "once", "spritesheetPath": "assets/spritesheets/effects.png" }, { "className": "Sprite", "hitboxes": [], "frames": [{ "className": "Frame", "rect": { "className": "Rect", "topLeftPoint": { "className": "Point", "x": 34, "y": 13 }, "botRightPoint": { "className": "Point", "x": 48, "y": 17 } }, "duration": 0.066, "offset": { "className": "Point", "x": 0, "y": 0 }, "hitboxes": [], "POIs": [] }], "POIs": [], "name": "hud_health_top", "path": "assets/sprites/hud_health_top.json", "alignment": "botmid", "wrapMode": "once", "spritesheetPath": "assets/spritesheets/effects.png" }, { "className": "Sprite", "hitboxes": [], "frames": [{ "className": "Frame", "rect": { "className": "Rect", "topLeftPoint": { "className": "Point", "x": 130, "y": 119 }, "botRightPoint": { "className": "Point", "x": 140, "y": 127 } }, "duration": 0.066, "offset": { "className": "Point", "x": 0, "y": 0 }, "hitboxes": [], "POIs": [] }, { "className": "Frame", "rect": { "className": "Rect", "topLeftPoint": { "className": "Point", "x": 144, "y": 117 }, "botRightPoint": { "className": "Point", "x": 155, "y": 129 } }, "duration": 0.066, "offset": { "className": "Point", "x": 0, "y": 0 }, "hitboxes": [], "POIs": [] }, { "className": "Frame", "rect": { "className": "Rect", "topLeftPoint": { "className": "Point", "x": 161, "y": 117 }, "botRightPoint": { "className": "Point", "x": 172, "y": 128 } }, "duration": 0.066, "offset": { "className": "Point", "x": 0, "y": 0 }, "hitboxes": [], "POIs": [] }, { "className": "Frame", "rect": { "className": "Rect", "topLeftPoint": { "className": "Point", "x": 177, "y": 118 }, "botRightPoint": { "className": "Point", "x": 187, "y": 128 } }, "duration": 0.066, "offset": { "className": "Point", "x": 0, "y": 0 }, "hitboxes": [], "POIs": [] }, { "className": "Frame", "rect": { "className": "Rect", "topLeftPoint": { "className": "Point", "x": 193, "y": 116 }, "botRightPoint": { "className": "Point", "x": 203, "y": 128 } }, "duration": 0.066, "offset": { "className": "Point", "x": 0, "y": 0 }, "hitboxes": [], "POIs": [] }, { "className": "Frame", "rect": { "className": "Rect", "topLeftPoint": { "className": "Point", "x": 208, "y": 117 }, "botRightPoint": { "className": "Point", "x": 220, "y": 128 } }, "duration": 0.066, "offset": { "className": "Point", "x": 0, "y": 0 }, "hitboxes": [], "POIs": [] }, { "className": "Frame", "rect": { "className": "Rect", "topLeftPoint": { "className": "Point", "x": 225, "y": 117 }, "botRightPoint": { "className": "Point", "x": 235, "y": 128 } }, "duration": 0.066, "offset": { "className": "Point", "x": 0, "y": 0 }, "hitboxes": [], "POIs": [] }, { "className": "Frame", "rect": { "className": "Rect", "topLeftPoint": { "className": "Point", "x": 241, "y": 117 }, "botRightPoint": { "className": "Point", "x": 251, "y": 128 } }, "duration": 0.066, "offset": { "className": "Point", "x": 0, "y": 0 }, "hitboxes": [], "POIs": [] }, { "className": "Frame", "rect": { "className": "Rect", "topLeftPoint": { "className": "Point", "x": 257, "y": 117 }, "botRightPoint": { "className": "Point", "x": 267, "y": 128 } }, "duration": 0.066, "offset": { "className": "Point", "x": 0, "y": 0 }, "hitboxes": [], "POIs": [] }], "POIs": [], "name": "hud_killfeed_weapon", "path": "assets/sprites/hud_killfeed_weapon.json", "alignment": "center", "wrapMode": "once", "spritesheetPath": "assets/spritesheets/effects.png" }, { "className": "Sprite", "hitboxes": [], "frames": [{ "className": "Frame", "rect": { "className": "Rect", "topLeftPoint": { "className": "Point", "x": 138, "y": 55 }, "botRightPoint": { "className": "Point", "x": 152, "y": 71 } }, "duration": 0.066, "offset": { "className": "Point", "x": 0, "y": 0 }, "hitboxes": [], "POIs": [] }, { "className": "Frame", "rect": { "className": "Rect", "topLeftPoint": { "className": "Point", "x": 154, "y": 55 }, "botRightPoint": { "className": "Point", "x": 168, "y": 71 } }, "duration": 0.066, "offset": { "className": "Point", "x": 0, "y": 0 }, "hitboxes": [], "POIs": [] }, { "className": "Frame", "rect": { "className": "Rect", "topLeftPoint": { "className": "Point", "x": 170, "y": 55 }, "botRightPoint": { "className": "Point", "x": 184, "y": 71 } }, "duration": 0.066, "offset": { "className": "Point", "x": 0, "y": 0 }, "hitboxes": [], "POIs": [] }, { "className": "Frame", "rect": { "className": "Rect", "topLeftPoint": { "className": "Point", "x": 186, "y": 55 }, "botRightPoint": { "className": "Point", "x": 200, "y": 71 } }, "duration": 0.066, "offset": { "className": "Point", "x": 0, "y": 0 }, "hitboxes": [], "POIs": [] }, { "className": "Frame", "rect": { "className": "Rect", "topLeftPoint": { "className": "Point", "x": 202, "y": 55 }, "botRightPoint": { "className": "Point", "x": 216, "y": 71 } }, "duration": 0.066, "offset": { "className": "Point", "x": 0, "y": 0 }, "hitboxes": [], "POIs": [] }, { "className": "Frame", "rect": { "className": "Rect", "topLeftPoint": { "className": "Point", "x": 218, "y": 55 }, "botRightPoint": { "className": "Point", "x": 232, "y": 71 } }, "duration": 0.066, "offset": { "className": "Point", "x": 0, "y": 0 }, "hitboxes": [], "POIs": [] }, { "className": "Frame", "rect": { "className": "Rect", "topLeftPoint": { "className": "Point", "x": 234, "y": 55 }, "botRightPoint": { "className": "Point", "x": 248, "y": 71 } }, "duration": 0.066, "offset": { "className": "Point", "x": 0, "y": 0 }, "hitboxes": [], "POIs": [] }, { "className": "Frame", "rect": { "className": "Rect", "topLeftPoint": { "className": "Point", "x": 250, "y": 55 }, "botRightPoint": { "className": "Point", "x": 264, "y": 71 } }, "duration": 0.066, "offset": { "className": "Point", "x": 0, "y": 0 }, "hitboxes": [], "POIs": [] }], "POIs": [], "name": "hud_weapon_base", "path": "assets/sprites/hud_weapon_base.json", "alignment": "botmid", "wrapMode": "once", "spritesheetPath": "assets/spritesheets/effects.png" }, { "className": "Sprite", "hitboxes": [], "frames": [{ "className": "Frame", "rect": { "className": "Rect", "topLeftPoint": { "className": "Point", "x": 138, "y": 51 }, "botRightPoint": { "className": "Point", "x": 152, "y": 53 } }, "duration": 0.066, "offset": { "className": "Point", "x": 0, "y": 0 }, "hitboxes": [], "POIs": [] }, { "className": "Frame", "rect": { "className": "Rect", "topLeftPoint": { "className": "Point", "x": 154, "y": 51 }, "botRightPoint": { "className": "Point", "x": 168, "y": 53 } }, "duration": 0.066, "offset": { "className": "Point", "x": 0, "y": 0 }, "hitboxes": [], "POIs": [] }, { "className": "Frame", "rect": { "className": "Rect", "topLeftPoint": { "className": "Point", "x": 170, "y": 51 }, "botRightPoint": { "className": "Point", "x": 184, "y": 53 } }, "duration": 0.066, "offset": { "className": "Point", "x": 0, "y": 0 }, "hitboxes": [], "POIs": [] }, { "className": "Frame", "rect": { "className": "Rect", "topLeftPoint": { "className": "Point", "x": 186, "y": 51 }, "botRightPoint": { "className": "Point", "x": 200, "y": 53 } }, "duration": 0.066, "offset": { "className": "Point", "x": 0, "y": 0 }, "hitboxes": [], "POIs": [] }, { "className": "Frame", "rect": { "className": "Rect", "topLeftPoint": { "className": "Point", "x": 202, "y": 51 }, "botRightPoint": { "className": "Point", "x": 216, "y": 53 } }, "duration": 0.066, "offset": { "className": "Point", "x": 0, "y": 0 }, "hitboxes": [], "POIs": [] }, { "className": "Frame", "rect": { "className": "Rect", "topLeftPoint": { "className": "Point", "x": 218, "y": 51 }, "botRightPoint": { "className": "Point", "x": 232, "y": 53 } }, "duration": 0.066, "offset": { "className": "Point", "x": 0, "y": 0 }, "hitboxes": [], "POIs": [] }, { "className": "Frame", "rect": { "className": "Rect", "topLeftPoint": { "className": "Point", "x": 234, "y": 51 }, "botRightPoint": { "className": "Point", "x": 248, "y": 53 } }, "duration": 0.066, "offset": { "className": "Point", "x": 0, "y": 0 }, "hitboxes": [], "POIs": [] }, { "className": "Frame", "rect": { "className": "Rect", "topLeftPoint": { "className": "Point", "x": 250, "y": 51 }, "botRightPoint": { "className": "Point", "x": 264, "y": 53 } }, "duration": 0.066, "offset": { "className": "Point", "x": 0, "y": 0 }, "hitboxes": [], "POIs": [] }], "POIs": [], "name": "hud_weapon_full", "path": "assets/sprites/hud_weapon_full.json", "alignment": "botmid", "wrapMode": "once", "spritesheetPath": "assets/spritesheets/effects.png" }, { "className": "Sprite", "hitboxes": [], "frames": [{ "className": "Frame", "rect": { "className": "Rect", "topLeftPoint": { "className": "Point", "x": 2, "y": 75 }, "botRightPoint": { "className": "Point", "x": 18, "y": 91 } }, "duration": 0.066, "offset": { "className": "Point", "x": 0, "y": 0 }, "hitboxes": [], "POIs": [] }, { "className": "Frame", "rect": { "className": "Rect", "topLeftPoint": { "className": "Point", "x": 20, "y": 75 }, "botRightPoint": { "className": "Point", "x": 36, "y": 91 } }, "duration": 0.066, "offset": { "className": "Point", "x": 0, "y": 0 }, "hitboxes": [], "POIs": [] }, { "className": "Frame", "rect": { "className": "Rect", "topLeftPoint": { "className": "Point", "x": 38, "y": 75 }, "botRightPoint": { "className": "Point", "x": 54, "y": 91 } }, "duration": 0.066, "offset": { "className": "Point", "x": 0, "y": 0 }, "hitboxes": [], "POIs": [] }, { "className": "Frame", "rect": { "className": "Rect", "topLeftPoint": { "className": "Point", "x": 56, "y": 75 }, "botRightPoint": { "className": "Point", "x": 72, "y": 91 } }, "duration": 0.066, "offset": { "className": "Point", "x": 0, "y": 0 }, "hitboxes": [], "POIs": [] }, { "className": "Frame", "rect": { "className": "Rect", "topLeftPoint": { "className": "Point", "x": 74, "y": 75 }, "botRightPoint": { "className": "Point", "x": 90, "y": 91 } }, "duration": 0.066, "offset": { "className": "Point", "x": 0, "y": 0 }, "hitboxes": [], "POIs": [] }, { "className": "Frame", "rect": { "className": "Rect", "topLeftPoint": { "className": "Point", "x": 92, "y": 75 }, "botRightPoint": { "className": "Point", "x": 108, "y": 91 } }, "duration": 0.066, "offset": { "className": "Point", "x": 0, "y": 0 }, "hitboxes": [], "POIs": [] }, { "className": "Frame", "rect": { "className": "Rect", "topLeftPoint": { "className": "Point", "x": 110, "y": 75 }, "botRightPoint": { "className": "Point", "x": 126, "y": 91 } }, "duration": 0.066, "offset": { "className": "Point", "x": 0, "y": 0 }, "hitboxes": [], "POIs": [] }, { "className": "Frame", "rect": { "className": "Rect", "topLeftPoint": { "className": "Point", "x": 128, "y": 75 }, "botRightPoint": { "className": "Point", "x": 144, "y": 91 } }, "duration": 0.066, "offset": { "className": "Point", "x": 0, "y": 0 }, "hitboxes": [], "POIs": [] }, { "className": "Frame", "rect": { "className": "Rect", "topLeftPoint": { "className": "Point", "x": 146, "y": 75 }, "botRightPoint": { "className": "Point", "x": 162, "y": 91 } }, "duration": 0.066, "offset": { "className": "Point", "x": 0, "y": 0 }, "hitboxes": [], "POIs": [] }], "POIs": [], "name": "hud_weapon_icon", "path": "assets/sprites/hud_weapon_icon.json", "alignment": "center", "wrapMode": "once", "spritesheetPath": "assets/spritesheets/effects.png" }, { "className": "Sprite", "hitboxes": [], "frames": [{ "className": "Frame", "rect": { "className": "Rect", "topLeftPoint": { "className": "Point", "x": 264, "y": 157 }, "botRightPoint": { "className": "Point", "x": 292, "y": 188 } }, "duration": 0.12, "offset": { "className": "Point", "x": 0, "y": 0 }, "hitboxes": [], "POIs": [] }, { "className": "Frame", "rect": { "className": "Rect", "topLeftPoint": { "className": "Point", "x": 296, "y": 162 }, "botRightPoint": { "className": "Point", "x": 334, "y": 188 } }, "duration": 0.12, "offset": { "className": "Point", "x": 0, "y": 0 }, "hitboxes": [], "POIs": [] }], "POIs": [], "name": "mmx_dash", "path": "assets/sprites/mmx_dash.json", "alignment": "botmid", "wrapMode": "once", "spritesheetPath": "assets/spritesheets/MegamanX.png" }, { "className": "Sprite", "hitboxes": [], "frames": [{ "className": "Frame", "rect": { "className": "Rect", "topLeftPoint": { "className": "Point", "x": 340, "y": 157 }, "botRightPoint": { "className": "Point", "x": 378, "y": 188 } }, "duration": 0.12, "offset": { "className": "Point", "x": 5, "y": 0 }, "hitboxes": [], "POIs": [{ "className": "POI", "x": 22.399999999999977, "y": -18.19999999999999 }] }, { "className": "Frame", "rect": { "className": "Rect", "topLeftPoint": { "className": "Point", "x": 383, "y": 162 }, "botRightPoint": { "className": "Point", "x": 432, "y": 188 } }, "duration": 0.12, "offset": { "className": "Point", "x": 5, "y": 0 }, "hitboxes": [], "POIs": [{ "className": "POI", "x": 28.399999999999977, "y": -14 }] }], "POIs": [], "name": "mmx_dash_shoot", "path": "assets/sprites/mmx_dash_shoot.json", "alignment": "botmid", "wrapMode": "once", "spritesheetPath": "assets/spritesheets/MegamanX.png" }, { "className": "Sprite", "hitboxes": [], "frames": [{ "className": "Frame", "rect": { "className": "Rect", "topLeftPoint": { "className": "Point", "x": 17, "y": 345 }, "botRightPoint": { "className": "Point", "x": 43, "y": 381 } }, "duration": 0.066, "offset": { "className": "Point", "x": 0, "y": 0 }, "hitboxes": [], "POIs": [] }, { "className": "Frame", "rect": { "className": "Rect", "topLeftPoint": { "className": "Point", "x": 348, "y": 394 }, "botRightPoint": { "className": "Point", "x": 374, "y": 430 } }, "duration": 0.066, "offset": { "className": "Point", "x": 0, "y": 0 }, "hitboxes": [], "POIs": [] }], "POIs": [], "name": "mmx_die", "path": "assets/sprites/mmx_die.json", "alignment": "botmid", "wrapMode": "once", "spritesheetPath": "assets/spritesheets/MegamanX.png" }, { "className": "Sprite", "hitboxes": [], "frames": [{ "className": "Frame", "rect": { "className": "Rect", "topLeftPoint": { "className": "Point", "x": 253, "y": 58 }, "botRightPoint": { "className": "Point", "x": 276, "y": 99 } }, "duration": 0.12, "offset": { "className": "Point", "x": 1, "y": -1 }, "hitboxes": [], "POIs": [] }, { "className": "Frame", "rect": { "className": "Rect", "topLeftPoint": { "className": "Point", "x": 278, "y": 57 }, "botRightPoint": { "className": "Point", "x": 305, "y": 99 } }, "duration": 0.12, "offset": { "className": "Point", "x": 0, "y": 1 }, "hitboxes": [], "POIs": [] }], "POIs": [], "name": "mmx_fall", "path": "assets/sprites/mmx_fall.json", "alignment": "botmid", "wrapMode": "once", "spritesheetPath": "assets/spritesheets/MegamanX.png" }, { "className": "Sprite", "hitboxes": [], "frames": [{ "className": "Frame", "rect": { "className": "Rect", "topLeftPoint": { "className": "Point", "x": 128, "y": 147 }, "botRightPoint": { "className": "Point", "x": 159, "y": 188 } }, "duration": 0.12, "offset": { "className": "Point", "x": 5, "y": -1 }, "hitboxes": [], "POIs": [{ "className": "POI", "x": 19.600000000000023, "y": -29.399999999999977, "tags": "bo" }] }, { "className": "Frame", "rect": { "className": "Rect", "topLeftPoint": { "className": "Point", "x": 160, "y": 146 }, "botRightPoint": { "className": "Point", "x": 191, "y": 188 } }, "duration": 0.12, "offset": { "className": "Point", "x": 5, "y": 0 }, "hitboxes": [], "POIs": [{ "className": "POI", "x": 19.600000000000023, "y": -29.600000000000023, "tags": "bo" }] }], "POIs": [], "name": "mmx_fall_shoot", "path": "assets/sprites/mmx_fall_shoot.json", "alignment": "botmid", "wrapMode": "once", "spritesheetPath": "assets/spritesheets/MegamanX.png" }, { "className": "Sprite", "hitboxes": [], "frames": [{ "className": "Frame", "rect": { "className": "Rect", "topLeftPoint": { "className": "Point", "x": 17, "y": 394 }, "botRightPoint": { "className": "Point", "x": 43, "y": 430 } }, "duration": 0.04, "offset": { "className": "Point", "x": 0, "y": 0 }, "hitboxes": [], "POIs": [] }, { "className": "Frame", "rect": { "className": "Rect", "topLeftPoint": { "className": "Point", "x": 46, "y": 396 }, "botRightPoint": { "className": "Point", "x": 75, "y": 430 } }, "duration": 0.04, "offset": { "className": "Point", "x": 0, "y": 0 }, "hitboxes": [], "POIs": [] }, { "className": "Frame", "rect": { "className": "Rect", "topLeftPoint": { "className": "Point", "x": 79, "y": 396 }, "botRightPoint": { "className": "Point", "x": 108, "y": 430 } }, "duration": 0.04, "offset": { "className": "Point", "x": 0, "y": 0 }, "hitboxes": [], "POIs": [] }, { "className": "Frame", "rect": { "className": "Rect", "topLeftPoint": { "className": "Point", "x": 112, "y": 386 }, "botRightPoint": { "className": "Point", "x": 144, "y": 434 } }, "duration": 0.04, "offset": { "className": "Point", "x": 0, "y": 0 }, "hitboxes": [], "POIs": [] }, { "className": "Frame", "rect": { "className": "Rect", "topLeftPoint": { "className": "Point", "x": 146, "y": 396 }, "botRightPoint": { "className": "Point", "x": 175, "y": 430 } }, "duration": 0.04, "offset": { "className": "Point", "x": 0, "y": 0 }, "hitboxes": [], "POIs": [] }, { "className": "Frame", "rect": { "className": "Rect", "topLeftPoint": { "className": "Point", "x": 179, "y": 386 }, "botRightPoint": { "className": "Point", "x": 211, "y": 434 } }, "duration": 0.04, "offset": { "className": "Point", "x": 0, "y": 0 }, "hitboxes": [], "POIs": [] }, { "className": "Frame", "rect": { "className": "Rect", "topLeftPoint": { "className": "Point", "x": 214, "y": 396 }, "botRightPoint": { "className": "Point", "x": 243, "y": 430 } }, "duration": 0.04, "offset": { "className": "Point", "x": 0, "y": 0 }, "hitboxes": [], "POIs": [] }, { "className": "Frame", "rect": { "className": "Rect", "topLeftPoint": { "className": "Point", "x": 247, "y": 386 }, "botRightPoint": { "className": "Point", "x": 279, "y": 434 } }, "duration": 0.04, "offset": { "className": "Point", "x": 0, "y": 0 }, "hitboxes": [], "POIs": [] }, { "className": "Frame", "rect": { "className": "Rect", "topLeftPoint": { "className": "Point", "x": 282, "y": 396 }, "botRightPoint": { "className": "Point", "x": 311, "y": 430 } }, "duration": 0.04, "offset": { "className": "Point", "x": 0, "y": 0 }, "hitboxes": [], "POIs": [] }, { "className": "Frame", "rect": { "className": "Rect", "topLeftPoint": { "className": "Point", "x": 316, "y": 396 }, "botRightPoint": { "className": "Point", "x": 345, "y": 430 } }, "duration": 0.04, "offset": { "className": "Point", "x": 0, "y": 0 }, "hitboxes": [], "POIs": [] }, { "className": "Frame", "rect": { "className": "Rect", "topLeftPoint": { "className": "Point", "x": 348, "y": 394 }, "botRightPoint": { "className": "Point", "x": 374, "y": 430 } }, "duration": 0.04, "offset": { "className": "Point", "x": 0, "y": 0 }, "hitboxes": [], "POIs": [] }], "POIs": [], "name": "mmx_hurt", "path": "assets/sprites/mmx_hurt.json", "alignment": "botmid", "wrapMode": "once", "spritesheetPath": "assets/spritesheets/MegamanX.png" }, { "className": "Sprite", "hitboxes": [], "frames": [{ "className": "Frame", "rect": { "className": "Rect", "topLeftPoint": { "className": "Point", "x": 302, "y": 16 }, "botRightPoint": { "className": "Point", "x": 332, "y": 50 } }, "duration": 0.066, "offset": { "className": "Point", "x": 0, "y": 0 }, "hitboxes": [], "POIs": [] }], "POIs": [], "name": "mmx_idle", "path": "assets/sprites/mmx_idle.json", "alignment": "botmid", "wrapMode": "loop", "spritesheetPath": "assets/spritesheets/MegamanX.png" }, { "className": "Sprite", "hitboxes": [], "frames": [{ "className": "Frame", "rect": { "className": "Rect", "topLeftPoint": { "className": "Point", "x": 181, "y": 62 }, "botRightPoint": { "className": "Point", "x": 205, "y": 99 } }, "duration": 0.08, "offset": { "className": "Point", "x": 4, "y": 0 }, "hitboxes": [], "POIs": [] }, { "className": "Frame", "rect": { "className": "Rect", "topLeftPoint": { "className": "Point", "x": 210, "y": 58 }, "botRightPoint": { "className": "Point", "x": 225, "y": 99 } }, "duration": 0.08, "offset": { "className": "Point", "x": 4, "y": 0 }, "hitboxes": [], "POIs": [] }, { "className": "Frame", "rect": { "className": "Rect", "topLeftPoint": { "className": "Point", "x": 231, "y": 53 }, "botRightPoint": { "className": "Point", "x": 250, "y": 99 } }, "duration": 0.08, "offset": { "className": "Point", "x": 3, "y": 0 }, "hitboxes": [], "POIs": [] }], "POIs": [], "name": "mmx_jump", "path": "assets/sprites/mmx_jump.json", "alignment": "botmid", "wrapMode": "once", "spritesheetPath": "assets/spritesheets/MegamanX.png" }, { "className": "Sprite", "hitboxes": [], "frames": [{ "className": "Frame", "rect": { "className": "Rect", "topLeftPoint": { "className": "Point", "x": 45, "y": 151 }, "botRightPoint": { "className": "Point", "x": 74, "y": 188 } }, "duration": 0.08, "offset": { "className": "Point", "x": 6, "y": 0 }, "hitboxes": [], "POIs": [{ "className": "POI", "x": 19.80000000000001, "y": -23.19999999999999 }] }, { "className": "Frame", "rect": { "className": "Rect", "topLeftPoint": { "className": "Point", "x": 76, "y": 147 }, "botRightPoint": { "className": "Point", "x": 100, "y": 188 } }, "duration": 0.08, "offset": { "className": "Point", "x": 9, "y": 0 }, "hitboxes": [], "POIs": [{ "className": "POI", "x": 19.600000000000023, "y": -28.399999999999977 }] }, { "className": "Frame", "rect": { "className": "Rect", "topLeftPoint": { "className": "Point", "x": 100, "y": 142 }, "botRightPoint": { "className": "Point", "x": 127, "y": 188 } }, "duration": 0.08, "offset": { "className": "Point", "x": 7, "y": 0 }, "hitboxes": [], "POIs": [{ "className": "POI", "x": 15.800000000000011, "y": -30.399999999999977 }] }], "POIs": [], "name": "mmx_jump_shoot", "path": "assets/sprites/mmx_jump_shoot.json", "alignment": "botmid", "wrapMode": "once", "spritesheetPath": "assets/spritesheets/MegamanX.png" }, { "className": "Sprite", "hitboxes": [], "frames": [{ "className": "Frame", "rect": { "className": "Rect", "topLeftPoint": { "className": "Point", "x": 139, "y": 242 }, "botRightPoint": { "className": "Point", "x": 164, "y": 269 } }, "duration": 0.066, "offset": { "className": "Point", "x": 0, "y": 0 }, "hitboxes": [], "POIs": [] }], "POIs": [], "name": "mmx_kneel", "path": "assets/sprites/mmx_kneel.json", "alignment": "botmid", "wrapMode": "loop", "spritesheetPath": "assets/spritesheets/MegamanX.png" }, { "className": "Sprite", "hitboxes": [], "frames": [{ "className": "Frame", "rect": { "className": "Rect", "topLeftPoint": { "className": "Point", "x": 141, "y": 331 }, "botRightPoint": { "className": "Point", "x": 159, "y": 380 } }, "duration": 0.1, "offset": { "className": "Point", "x": 0, "y": 6 }, "hitboxes": [], "POIs": [] }, { "className": "Frame", "rect": { "className": "Rect", "topLeftPoint": { "className": "Point", "x": 164, "y": 337 }, "botRightPoint": { "className": "Point", "x": 184, "y": 377 } }, "duration": 0.1, "offset": { "className": "Point", "x": 0, "y": 2 }, "hitboxes": [], "POIs": [] }, { "className": "Frame", "rect": { "className": "Rect", "topLeftPoint": { "className": "Point", "x": 188, "y": 337 }, "botRightPoint": { "className": "Point", "x": 208, "y": 377 } }, "duration": 0.1, "offset": { "className": "Point", "x": 0, "y": 2 }, "hitboxes": [], "POIs": [] }, { "className": "Frame", "rect": { "className": "Rect", "topLeftPoint": { "className": "Point", "x": 213, "y": 331 }, "botRightPoint": { "className": "Point", "x": 231, "y": 380 } }, "duration": 0.1, "offset": { "className": "Point", "x": 0, "y": 6 }, "hitboxes": [], "POIs": [] }, { "className": "Frame", "rect": { "className": "Rect", "topLeftPoint": { "className": "Point", "x": 188, "y": 337 }, "botRightPoint": { "className": "Point", "x": 208, "y": 377 } }, "duration": 0.1, "offset": { "className": "Point", "x": 0, "y": 2 }, "hitboxes": [], "POIs": [] }, { "className": "Frame", "rect": { "className": "Rect", "topLeftPoint": { "className": "Point", "x": 164, "y": 337 }, "botRightPoint": { "className": "Point", "x": 184, "y": 377 } }, "duration": 0.1, "offset": { "className": "Point", "x": 0, "y": 2 }, "hitboxes": [], "POIs": [] }], "POIs": [], "name": "mmx_ladder_climb", "path": "assets/sprites/mmx_ladder_climb.json", "alignment": "botmid", "wrapMode": "loop", "spritesheetPath": "assets/spritesheets/MegamanX.png" }, { "className": "Sprite", "hitboxes": [], "frames": [{ "className": "Frame", "rect": { "className": "Rect", "topLeftPoint": { "className": "Point", "x": 236, "y": 336 }, "botRightPoint": { "className": "Point", "x": 257, "y": 368 } }, "duration": 0.12, "offset": { "className": "Point", "x": 0, "y": 0 }, "hitboxes": [], "POIs": [] }, { "className": "Frame", "rect": { "className": "Rect", "topLeftPoint": { "className": "Point", "x": 262, "y": 329 }, "botRightPoint": { "className": "Point", "x": 280, "y": 363 } }, "duration": 0.12, "offset": { "className": "Point", "x": 0, "y": 0 }, "hitboxes": [], "POIs": [] }], "POIs": [], "name": "mmx_ladder_end", "path": "assets/sprites/mmx_ladder_end.json", "alignment": "botmid", "wrapMode": "once", "spritesheetPath": "assets/spritesheets/MegamanX.png" }, { "className": "Sprite", "hitboxes": [], "frames": [{ "className": "Frame", "rect": { "className": "Rect", "topLeftPoint": { "className": "Point", "x": 285, "y": 331 }, "botRightPoint": { "className": "Point", "x": 311, "y": 379 } }, "duration": 0.066, "offset": { "className": "Point", "x": 4, "y": 5 }, "hitboxes": [], "POIs": [{ "className": "POI", "x": 15.800000000000011, "y": -23.399999999999977 }] }], "POIs": [], "name": "mmx_ladder_shoot", "path": "assets/sprites/mmx_ladder_shoot.json", "alignment": "botmid", "wrapMode": "once", "spritesheetPath": "assets/spritesheets/MegamanX.png" }, { "className": "Sprite", "hitboxes": [], "frames": [{ "className": "Frame", "rect": { "className": "Rect", "topLeftPoint": { "className": "Point", "x": 116, "y": 344 }, "botRightPoint": { "className": "Point", "x": 137, "y": 380 } }, "duration": 0.1, "offset": { "className": "Point", "x": 0, "y": 0 }, "hitboxes": [], "POIs": [] }], "POIs": [], "name": "mmx_ladder_start", "path": "assets/sprites/mmx_ladder_start.json", "alignment": "botmid", "wrapMode": "once", "spritesheetPath": "assets/spritesheets/MegamanX.png" }, { "className": "Sprite", "hitboxes": [], "frames": [{ "className": "Frame", "rect": { "className": "Rect", "topLeftPoint": { "className": "Point", "x": 310, "y": 61 }, "botRightPoint": { "className": "Point", "x": 334, "y": 99 } }, "duration": 0.03, "offset": { "className": "Point", "x": 0, "y": 0 }, "hitboxes": [], "POIs": [] }, { "className": "Frame", "rect": { "className": "Rect", "topLeftPoint": { "className": "Point", "x": 335, "y": 67 }, "botRightPoint": { "className": "Point", "x": 365, "y": 99 } }, "duration": 0.03, "offset": { "className": "Point", "x": 0, "y": 0 }, "hitboxes": [], "POIs": [] }], "POIs": [], "name": "mmx_land", "path": "assets/sprites/mmx_land.json", "alignment": "botmid", "wrapMode": "once", "spritesheetPath": "assets/spritesheets/MegamanX.png" }, { "className": "Sprite", "hitboxes": [], "frames": [{ "className": "Frame", "rect": { "className": "Rect", "topLeftPoint": { "className": "Point", "x": 116, "y": 106 }, "botRightPoint": { "className": "Point", "x": 136, "y": 140 } }, "duration": 0.066, "offset": { "className": "Point", "x": 0, "y": 0 }, "hitboxes": [], "POIs": [] }, { "className": "Frame", "rect": { "className": "Rect", "topLeftPoint": { "className": "Point", "x": 137, "y": 105 }, "botRightPoint": { "className": "Point", "x": 160, "y": 140 } }, "duration": 0.066, "offset": { "className": "Point", "x": -2, "y": 0 }, "hitboxes": [], "POIs": [] }, { "className": "Frame", "rect": { "className": "Rect", "topLeftPoint": { "className": "Point", "x": 160, "y": 106 }, "botRightPoint": { "className": "Point", "x": 192, "y": 140 } }, "duration": 0.066, "offset": { "className": "Point", "x": -1, "y": 0 }, "hitboxes": [], "POIs": [] }, { "className": "Frame", "rect": { "className": "Rect", "topLeftPoint": { "className": "Point", "x": 192, "y": 107 }, "botRightPoint": { "className": "Point", "x": 226, "y": 140 } }, "duration": 0.066, "offset": { "className": "Point", "x": -2, "y": 0 }, "hitboxes": [], "POIs": [] }, { "className": "Frame", "rect": { "className": "Rect", "topLeftPoint": { "className": "Point", "x": 226, "y": 107 }, "botRightPoint": { "className": "Point", "x": 252, "y": 140 } }, "duration": 0.066, "offset": { "className": "Point", "x": -2, "y": 0 }, "hitboxes": [], "POIs": [] }, { "className": "Frame", "rect": { "className": "Rect", "topLeftPoint": { "className": "Point", "x": 255, "y": 106 }, "botRightPoint": { "className": "Point", "x": 277, "y": 140 } }, "duration": 0.066, "offset": { "className": "Point", "x": -1, "y": 0 }, "hitboxes": [], "POIs": [] }, { "className": "Frame", "rect": { "className": "Rect", "topLeftPoint": { "className": "Point", "x": 277, "y": 105 }, "botRightPoint": { "className": "Point", "x": 302, "y": 140 } }, "duration": 0.066, "offset": { "className": "Point", "x": -2, "y": 0 }, "hitboxes": [], "POIs": [] }, { "className": "Frame", "rect": { "className": "Rect", "topLeftPoint": { "className": "Point", "x": 305, "y": 106 }, "botRightPoint": { "className": "Point", "x": 335, "y": 140 } }, "duration": 0.066, "offset": { "className": "Point", "x": 0, "y": 0 }, "hitboxes": [], "POIs": [] }, { "className": "Frame", "rect": { "className": "Rect", "topLeftPoint": { "className": "Point", "x": 336, "y": 107 }, "botRightPoint": { "className": "Point", "x": 370, "y": 140 } }, "duration": 0.066, "offset": { "className": "Point", "x": -1, "y": 0 }, "hitboxes": [], "POIs": [] }, { "className": "Frame", "rect": { "className": "Rect", "topLeftPoint": { "className": "Point", "x": 370, "y": 107 }, "botRightPoint": { "className": "Point", "x": 399, "y": 140 } }, "duration": 0.066, "offset": { "className": "Point", "x": -2, "y": 0 }, "hitboxes": [], "POIs": [] }], "POIs": [], "name": "mmx_run", "path": "assets/sprites/mmx_run.json", "alignment": "botmid", "wrapMode": "loop", "spritesheetPath": "assets/spritesheets/MegamanX.png" }, { "className": "Sprite", "hitboxes": [], "frames": [{ "className": "Frame", "rect": { "className": "Rect", "topLeftPoint": { "className": "Point", "x": 76, "y": 192 }, "botRightPoint": { "className": "Point", "x": 105, "y": 226 } }, "duration": 0.066, "offset": { "className": "Point", "x": 4, "y": 0 }, "hitboxes": [], "POIs": [{ "className": "POI", "x": 18.80000000000001, "y": -20.600000000000023 }] }, { "className": "Frame", "rect": { "className": "Rect", "topLeftPoint": { "className": "Point", "x": 105, "y": 191 }, "botRightPoint": { "className": "Point", "x": 137, "y": 226 } }, "duration": 0.066, "offset": { "className": "Point", "x": 3, "y": 0 }, "hitboxes": [], "POIs": [{ "className": "POI", "x": 18.399999999999977, "y": -22 }] }, { "className": "Frame", "rect": { "className": "Rect", "topLeftPoint": { "className": "Point", "x": 137, "y": 192 }, "botRightPoint": { "className": "Point", "x": 172, "y": 226 } }, "duration": 0.066, "offset": { "className": "Point", "x": 1, "y": 0 }, "hitboxes": [], "POIs": [{ "className": "POI", "x": 18.399999999999977, "y": -20.399999999999977 }] }, { "className": "Frame", "rect": { "className": "Rect", "topLeftPoint": { "className": "Point", "x": 173, "y": 193 }, "botRightPoint": { "className": "Point", "x": 211, "y": 226 } }, "duration": 0.066, "offset": { "className": "Point", "x": 0, "y": 0 }, "hitboxes": [], "POIs": [{ "className": "POI", "x": 18.399999999999977, "y": -19.19999999999999 }] }, { "className": "Frame", "rect": { "className": "Rect", "topLeftPoint": { "className": "Point", "x": 212, "y": 193 }, "botRightPoint": { "className": "Point", "x": 246, "y": 226 } }, "duration": 0.066, "offset": { "className": "Point", "x": 2, "y": 0 }, "hitboxes": [], "POIs": [{ "className": "POI", "x": 18.399999999999977, "y": -19.399999999999977 }] }, { "className": "Frame", "rect": { "className": "Rect", "topLeftPoint": { "className": "Point", "x": 246, "y": 192 }, "botRightPoint": { "className": "Point", "x": 277, "y": 226 } }, "duration": 0.066, "offset": { "className": "Point", "x": 3, "y": 0 }, "hitboxes": [], "POIs": [{ "className": "POI", "x": 18.600000000000023, "y": -20.399999999999977 }] }, { "className": "Frame", "rect": { "className": "Rect", "topLeftPoint": { "className": "Point", "x": 277, "y": 191 }, "botRightPoint": { "className": "Point", "x": 310, "y": 226 } }, "duration": 0.066, "offset": { "className": "Point", "x": 2, "y": 0 }, "hitboxes": [], "POIs": [{ "className": "POI", "x": 19, "y": -21.600000000000023 }] }, { "className": "Frame", "rect": { "className": "Rect", "topLeftPoint": { "className": "Point", "x": 310, "y": 192 }, "botRightPoint": { "className": "Point", "x": 345, "y": 226 } }, "duration": 0.066, "offset": { "className": "Point", "x": 1, "y": 0 }, "hitboxes": [], "POIs": [{ "className": "POI", "x": 18.399999999999977, "y": -20.399999999999977 }] }, { "className": "Frame", "rect": { "className": "Rect", "topLeftPoint": { "className": "Point", "x": 346, "y": 193 }, "botRightPoint": { "className": "Point", "x": 383, "y": 226 } }, "duration": 0.066, "offset": { "className": "Point", "x": 0, "y": 0 }, "hitboxes": [], "POIs": [{ "className": "POI", "x": 18.80000000000001, "y": -19.80000000000001 }] }, { "className": "Frame", "rect": { "className": "Rect", "topLeftPoint": { "className": "Point", "x": 383, "y": 193 }, "botRightPoint": { "className": "Point", "x": 418, "y": 226 } }, "duration": 0.066, "offset": { "className": "Point", "x": 1, "y": 0 }, "hitboxes": [], "POIs": [{ "className": "POI", "x": 18.399999999999977, "y": -19.80000000000001 }] }], "POIs": [], "name": "mmx_run_shoot", "path": "assets/sprites/mmx_run_shoot.json", "alignment": "botmid", "wrapMode": "loop", "spritesheetPath": "assets/spritesheets/MegamanX.png" }, {
                    "className": "Sprite",
                    "hitboxes": [],
                    "frames": [
                        {
                            "className": "Frame",
                            "rect": {
                                "className": "Rect",
                                "topLeftPoint": {
                                    "className": "Point",
                                    "x": 112,
                                    "y": 65
                                },
                                "botRightPoint": {
                                    "className": "Point",
                                    "x": 142,
                                    "y": 99
                                }
                            },
                            "duration": 0.066,
                            "offset": {
                                "className": "Point",
                                "x": 0,
                                "y": 0
                            },
                            "hitboxes": [],
                            "POIs": [
                                {
                                    "className": "POI",
                                    "x": 13.600000000000023,
                                    "y": -18.80000000000001,
                                    "tags": "bo"
                                }
                            ]
                        },
                        {
                            "className": "Frame",
                            "rect": {
                                "className": "Rect",
                                "topLeftPoint": {
                                    "className": "Point",
                                    "x": 147,
                                    "y": 65
                                },
                                "botRightPoint": {
                                    "className": "Point",
                                    "x": 176,
                                    "y": 99
                                }
                            },
                            "duration": 0.5,
                            "offset": {
                                "className": "Point",
                                "x": -1,
                                "y": 0
                            },
                            "hitboxes": [],
                            "POIs": [
                                {
                                    "className": "POI",
                                    "x": 12.800000000000011,
                                    "y": -18.19999999999999,
                                    "tags": "bo"
                                }
                            ]
                        }
                    ],
                    "POIs": [],
                    "name": "mmx_shoot",
                    "path": "assets/sprites/mmx_shoot.json",
                    "alignment": "botmid",
                    "wrapMode": "once",
                    "spritesheetPath": "assets/spritesheets/MegamanX.png"
                }, { "className": "Sprite", "hitboxes": [], "frames": [{ "className": "Frame", "rect": { "className": "Rect", "topLeftPoint": { "className": "Point", "x": 140, "y": 284 }, "botRightPoint": { "className": "Point", "x": 170, "y": 323 } }, "duration": 0.1, "offset": { "className": "Point", "x": 0, "y": 0 }, "hitboxes": [], "POIs": [] }, { "className": "Frame", "rect": { "className": "Rect", "topLeftPoint": { "className": "Point", "x": 170, "y": 279 }, "botRightPoint": { "className": "Point", "x": 197, "y": 323 } }, "duration": 0.1, "offset": { "className": "Point", "x": 0, "y": 0 }, "hitboxes": [], "POIs": [] }], "POIs": [], "name": "mmx_wall_kick", "path": "assets/sprites/mmx_wall_kick.json", "alignment": "botmid", "wrapMode": "once", "spritesheetPath": "assets/spritesheets/MegamanX.png" }, { "className": "Sprite", "hitboxes": [], "frames": [{ "className": "Frame", "rect": { "className": "Rect", "topLeftPoint": { "className": "Point", "x": 309, "y": 284 }, "botRightPoint": { "className": "Point", "x": 340, "y": 323 } }, "duration": 0.1, "offset": { "className": "Point", "x": 0, "y": 1 }, "hitboxes": [], "POIs": [{ "className": "POI", "x": 14.800000000000011, "y": -26.19999999999999 }] }, { "className": "Frame", "rect": { "className": "Rect", "topLeftPoint": { "className": "Point", "x": 342, "y": 283 }, "botRightPoint": { "className": "Point", "x": 375, "y": 322 } }, "duration": 0.1, "offset": { "className": "Point", "x": -1, "y": 1 }, "hitboxes": [], "POIs": [{ "className": "POI", "x": 14.600000000000023, "y": -25.80000000000001 }] }, { "className": "Frame", "rect": { "className": "Rect", "topLeftPoint": { "className": "Point", "x": 342, "y": 283 }, "botRightPoint": { "className": "Point", "x": 375, "y": 322 } }, "duration": 0.1, "offset": { "className": "Point", "x": -1, "y": 1 }, "hitboxes": [], "POIs": [{ "className": "POI", "x": 14.800000000000011, "y": -26 }] }], "POIs": [], "name": "mmx_wall_kick_shoot", "path": "assets/sprites/mmx_wall_kick_shoot.json", "alignment": "botmid", "wrapMode": "once", "spritesheetPath": "assets/spritesheets/MegamanX.png" }, { "className": "Sprite", "hitboxes": [], "frames": [{ "className": "Frame", "rect": { "className": "Rect", "topLeftPoint": { "className": "Point", "x": 51, "y": 281 }, "botRightPoint": { "className": "Point", "x": 76, "y": 323 } }, "duration": 0.1, "offset": { "className": "Point", "x": 0, "y": 0 }, "hitboxes": [], "POIs": [] }, { "className": "Frame", "rect": { "className": "Rect", "topLeftPoint": { "className": "Point", "x": 78, "y": 280 }, "botRightPoint": { "className": "Point", "x": 105, "y": 323 } }, "duration": 0.1, "offset": { "className": "Point", "x": 0, "y": 0 }, "hitboxes": [], "POIs": [] }, { "className": "Frame", "rect": { "className": "Rect", "topLeftPoint": { "className": "Point", "x": 107, "y": 281 }, "botRightPoint": { "className": "Point", "x": 135, "y": 323 } }, "duration": 0.1, "offset": { "className": "Point", "x": 0, "y": 0 }, "hitboxes": [], "POIs": [] }], "POIs": [], "name": "mmx_wall_slide", "path": "assets/sprites/mmx_wall_slide.json", "alignment": "botmid", "wrapMode": "once", "spritesheetPath": "assets/spritesheets/MegamanX.png" }, { "className": "Sprite", "hitboxes": [], "frames": [{ "className": "Frame", "rect": { "className": "Rect", "topLeftPoint": { "className": "Point", "x": 235, "y": 281 }, "botRightPoint": { "className": "Point", "x": 267, "y": 324 } }, "duration": 0.1, "offset": { "className": "Point", "x": -4, "y": 1 }, "hitboxes": [], "POIs": [{ "className": "POI", "x": -15.600000000000023, "y": -23.399999999999977 }] }, { "className": "Frame", "rect": { "className": "Rect", "topLeftPoint": { "className": "Point", "x": 273, "y": 280 }, "botRightPoint": { "className": "Point", "x": 305, "y": 322 } }, "duration": 0.1, "offset": { "className": "Point", "x": -2, "y": 0 }, "hitboxes": [], "POIs": [{ "className": "POI", "x": -14.199999999999989, "y": -21.600000000000023 }] }], "POIs": [], "name": "mmx_wall_slide_shoot", "path": "assets/sprites/mmx_wall_slide_shoot.json", "alignment": "botmid", "wrapMode": "once", "spritesheetPath": "assets/spritesheets/MegamanX.png" }, { "className": "Sprite", "hitboxes": [], "frames": [{ "className": "Frame", "rect": { "className": "Rect", "topLeftPoint": { "className": "Point", "x": 124, "y": 449 }, "botRightPoint": { "className": "Point", "x": 152, "y": 494 } }, "duration": 0.03, "offset": { "className": "Point", "x": 0, "y": 0 }, "hitboxes": [], "POIs": [] }, { "className": "Frame", "rect": { "className": "Rect", "topLeftPoint": { "className": "Point", "x": 155, "y": 449 }, "botRightPoint": { "className": "Point", "x": 184, "y": 494 } }, "duration": 0.03, "offset": { "className": "Point", "x": 0, "y": 0 }, "hitboxes": [], "POIs": [] }, { "className": "Frame", "rect": { "className": "Rect", "topLeftPoint": { "className": "Point", "x": 186, "y": 446 }, "botRightPoint": { "className": "Point", "x": 217, "y": 494 } }, "duration": 0.03, "offset": { "className": "Point", "x": 1, "y": 0 }, "hitboxes": [], "POIs": [] }, { "className": "Frame", "rect": { "className": "Rect", "topLeftPoint": { "className": "Point", "x": 224, "y": 449 }, "botRightPoint": { "className": "Point", "x": 253, "y": 494 } }, "duration": 0.03, "offset": { "className": "Point", "x": 0, "y": 0 }, "hitboxes": [], "POIs": [] }, { "className": "Frame", "rect": { "className": "Rect", "topLeftPoint": { "className": "Point", "x": 255, "y": 449 }, "botRightPoint": { "className": "Point", "x": 286, "y": 494 } }, "duration": 0.03, "offset": { "className": "Point", "x": 1, "y": 0 }, "hitboxes": [], "POIs": [] }], "POIs": [], "name": "mmx_win", "path": "assets/sprites/mmx_win.json", "alignment": "botmid", "wrapMode": "once", "spritesheetPath": "assets/spritesheets/MegamanX.png" }, { "className": "Sprite", "hitboxes": [{ "className": "Hitbox", "tags": "", "width": 14, "height": 14, "offset": { "className": "Point", "x": 0, "y": 0 }, "rect": { "className": "Rect", "topLeftPoint": { "className": "Point", "x": 343, "y": 293 }, "botRightPoint": { "className": "Point", "x": 357, "y": 307 } }, "isTrigger": false }], "frames": [{ "className": "Frame", "rect": { "className": "Rect", "topLeftPoint": { "className": "Point", "x": 81, "y": 148 }, "botRightPoint": { "className": "Point", "x": 95, "y": 162 } }, "duration": 0.066, "offset": { "className": "Point", "x": 0, "y": 0 }, "hitboxes": [], "POIs": [] }, { "className": "Frame", "rect": { "className": "Rect", "topLeftPoint": { "className": "Point", "x": 97, "y": 148 }, "botRightPoint": { "className": "Point", "x": 111, "y": 162 } }, "duration": 0.066, "offset": { "className": "Point", "x": 0, "y": 0 }, "hitboxes": [], "POIs": [] }, { "className": "Frame", "rect": { "className": "Rect", "topLeftPoint": { "className": "Point", "x": 113, "y": 148 }, "botRightPoint": { "className": "Point", "x": 127, "y": 162 } }, "duration": 0.066, "offset": { "className": "Point", "x": 0, "y": 0 }, "hitboxes": [], "POIs": [] }], "POIs": [], "name": "pickup_ammo_large", "path": "assets/sprites/pickup_ammo_large.json", "alignment": "center", "wrapMode": "loop", "spritesheetPath": "assets/spritesheets/effects.png" }, { "className": "Sprite", "hitboxes": [{ "className": "Hitbox", "tags": "", "width": 8, "height": 8, "offset": { "className": "Point", "x": 0, "y": 0 }, "rect": { "className": "Rect", "topLeftPoint": { "className": "Point", "x": 346, "y": 296 }, "botRightPoint": { "className": "Point", "x": 354, "y": 304 } }, "isTrigger": false }], "frames": [{ "className": "Frame", "rect": { "className": "Rect", "topLeftPoint": { "className": "Point", "x": 84, "y": 138 }, "botRightPoint": { "className": "Point", "x": 92, "y": 146 } }, "duration": 0.066, "offset": { "className": "Point", "x": 0, "y": 0 }, "hitboxes": [], "POIs": [] }, { "className": "Frame", "rect": { "className": "Rect", "topLeftPoint": { "className": "Point", "x": 100, "y": 138 }, "botRightPoint": { "className": "Point", "x": 108, "y": 146 } }, "duration": 0.066, "offset": { "className": "Point", "x": 0, "y": 0 }, "hitboxes": [], "POIs": [] }, { "className": "Frame", "rect": { "className": "Rect", "topLeftPoint": { "className": "Point", "x": 116, "y": 138 }, "botRightPoint": { "className": "Point", "x": 124, "y": 146 } }, "duration": 0.066, "offset": { "className": "Point", "x": 0, "y": 0 }, "hitboxes": [], "POIs": [] }], "POIs": [], "name": "pickup_ammo_small", "path": "assets/sprites/pickup_ammo_small.json", "alignment": "center", "wrapMode": "loop", "spritesheetPath": "assets/spritesheets/effects.png" }, { "className": "Sprite", "hitboxes": [{ "className": "Hitbox", "tags": "", "width": 14, "height": 12, "offset": { "className": "Point", "x": 0, "y": 0 }, "rect": { "className": "Rect", "topLeftPoint": { "className": "Point", "x": 343, "y": 294 }, "botRightPoint": { "className": "Point", "x": 357, "y": 306 } }, "isTrigger": false }], "frames": [{ "className": "Frame", "rect": { "className": "Rect", "topLeftPoint": { "className": "Point", "x": 3, "y": 150 }, "botRightPoint": { "className": "Point", "x": 17, "y": 162 } }, "duration": 0.03, "offset": { "className": "Point", "x": 0, "y": 0 }, "hitboxes": [], "POIs": [] }, { "className": "Frame", "rect": { "className": "Rect", "topLeftPoint": { "className": "Point", "x": 19, "y": 150 }, "botRightPoint": { "className": "Point", "x": 35, "y": 162 } }, "duration": 0.03, "offset": { "className": "Point", "x": 0, "y": 0 }, "hitboxes": [], "POIs": [] }, { "className": "Frame", "rect": { "className": "Rect", "topLeftPoint": { "className": "Point", "x": 37, "y": 150 }, "botRightPoint": { "className": "Point", "x": 53, "y": 162 } }, "duration": 0.03, "offset": { "className": "Point", "x": 0, "y": 0 }, "hitboxes": [], "POIs": [] }, { "className": "Frame", "rect": { "className": "Rect", "topLeftPoint": { "className": "Point", "x": 55, "y": 150 }, "botRightPoint": { "className": "Point", "x": 71, "y": 162 } }, "duration": 0.03, "offset": { "className": "Point", "x": 0, "y": 0 }, "hitboxes": [], "POIs": [] }, { "className": "Frame", "rect": { "className": "Rect", "topLeftPoint": { "className": "Point", "x": 37, "y": 150 }, "botRightPoint": { "className": "Point", "x": 53, "y": 162 } }, "duration": 0.03, "offset": { "className": "Point", "x": 0, "y": 0 }, "hitboxes": [], "POIs": [] }, { "className": "Frame", "rect": { "className": "Rect", "topLeftPoint": { "className": "Point", "x": 19, "y": 150 }, "botRightPoint": { "className": "Point", "x": 35, "y": 162 } }, "duration": 0.03, "offset": { "className": "Point", "x": 0, "y": 0 }, "hitboxes": [], "POIs": [] }, { "className": "Frame", "rect": { "className": "Rect", "topLeftPoint": { "className": "Point", "x": 3, "y": 150 }, "botRightPoint": { "className": "Point", "x": 17, "y": 162 } }, "duration": 0.03, "offset": { "className": "Point", "x": 0, "y": 0 }, "hitboxes": [], "POIs": [] }], "POIs": [], "name": "pickup_health_large", "path": "assets/sprites/pickup_health_large.json", "alignment": "center", "wrapMode": "loop", "spritesheetPath": "assets/spritesheets/effects.png" }, { "className": "Sprite", "hitboxes": [{ "className": "Hitbox", "tags": "", "width": 8, "height": 8, "offset": { "className": "Point", "x": 0, "y": 0 }, "rect": { "className": "Rect", "topLeftPoint": { "className": "Point", "x": 346, "y": 296 }, "botRightPoint": { "className": "Point", "x": 354, "y": 304 } }, "isTrigger": false }], "frames": [{ "className": "Frame", "rect": { "className": "Rect", "topLeftPoint": { "className": "Point", "x": 6, "y": 138 }, "botRightPoint": { "className": "Point", "x": 14, "y": 146 } }, "duration": 0.03, "offset": { "className": "Point", "x": 0, "y": 0 }, "hitboxes": [], "POIs": [] }, { "className": "Frame", "rect": { "className": "Rect", "topLeftPoint": { "className": "Point", "x": 22, "y": 138 }, "botRightPoint": { "className": "Point", "x": 32, "y": 146 } }, "duration": 0.03, "offset": { "className": "Point", "x": 0, "y": 0 }, "hitboxes": [], "POIs": [] }, { "className": "Frame", "rect": { "className": "Rect", "topLeftPoint": { "className": "Point", "x": 40, "y": 138 }, "botRightPoint": { "className": "Point", "x": 50, "y": 146 } }, "duration": 0.03, "offset": { "className": "Point", "x": 0, "y": 0 }, "hitboxes": [], "POIs": [] }, { "className": "Frame", "rect": { "className": "Rect", "topLeftPoint": { "className": "Point", "x": 58, "y": 138 }, "botRightPoint": { "className": "Point", "x": 68, "y": 146 } }, "duration": 0.03, "offset": { "className": "Point", "x": 0, "y": 0 }, "hitboxes": [], "POIs": [] }, { "className": "Frame", "rect": { "className": "Rect", "topLeftPoint": { "className": "Point", "x": 40, "y": 138 }, "botRightPoint": { "className": "Point", "x": 50, "y": 146 } }, "duration": 0.03, "offset": { "className": "Point", "x": 0, "y": 0 }, "hitboxes": [], "POIs": [] }, { "className": "Frame", "rect": { "className": "Rect", "topLeftPoint": { "className": "Point", "x": 22, "y": 138 }, "botRightPoint": { "className": "Point", "x": 32, "y": 146 } }, "duration": 0.03, "offset": { "className": "Point", "x": 0, "y": 0 }, "hitboxes": [], "POIs": [] }, { "className": "Frame", "rect": { "className": "Rect", "topLeftPoint": { "className": "Point", "x": 6, "y": 138 }, "botRightPoint": { "className": "Point", "x": 14, "y": 146 } }, "duration": 0.03, "offset": { "className": "Point", "x": 0, "y": 0 }, "hitboxes": [], "POIs": [] }], "POIs": [], "name": "pickup_health_small", "path": "assets/sprites/pickup_health_small.json", "alignment": "center", "wrapMode": "loop", "spritesheetPath": "assets/spritesheets/effects.png" }, { "className": "Sprite", "hitboxes": [{ "className": "Hitbox", "tags": "", "width": 31, "height": 30, "offset": { "className": "Point", "x": 0, "y": 0 }, "rect": { "className": "Rect", "topLeftPoint": { "className": "Point", "x": 334.5, "y": 285 }, "botRightPoint": { "className": "Point", "x": 365.5, "y": 315 } } }], "frames": [{ "className": "Frame", "rect": { "className": "Rect", "topLeftPoint": { "className": "Point", "x": 159, "y": 842 }, "botRightPoint": { "className": "Point", "x": 190, "y": 872 } }, "duration": 0.03, "offset": { "className": "Point", "x": 0, "y": 0 }, "hitboxes": [], "POIs": [] }, { "className": "Frame", "rect": { "className": "Rect", "topLeftPoint": { "className": "Point", "x": 126, "y": 842 }, "botRightPoint": { "className": "Point", "x": 157, "y": 872 } }, "duration": 0.03, "offset": { "className": "Point", "x": 0, "y": 0 }, "hitboxes": [], "POIs": [] }, { "className": "Frame", "rect": { "className": "Rect", "topLeftPoint": { "className": "Point", "x": 93, "y": 842 }, "botRightPoint": { "className": "Point", "x": 124, "y": 872 } }, "duration": 0.03, "offset": { "className": "Point", "x": 0, "y": 0 }, "hitboxes": [], "POIs": [] }, { "className": "Frame", "rect": { "className": "Rect", "topLeftPoint": { "className": "Point", "x": 60, "y": 842 }, "botRightPoint": { "className": "Point", "x": 91, "y": 872 } }, "duration": 0.03, "offset": { "className": "Point", "x": 0, "y": 0 }, "hitboxes": [], "POIs": [] }], "POIs": [], "name": "rolling_shield", "path": "assets/sprites/rolling_shield.json", "alignment": "center", "wrapMode": "loop", "spritesheetPath": "assets/spritesheets/effects.png" }, { "className": "Sprite", "hitboxes": [], "frames": [{ "className": "Frame", "rect": { "className": "Rect", "topLeftPoint": { "className": "Point", "x": 194, "y": 849 }, "botRightPoint": { "className": "Point", "x": 209, "y": 865 } }, "duration": 0.03, "offset": { "className": "Point", "x": 0, "y": 0 }, "hitboxes": [], "POIs": [] }, { "className": "Frame", "rect": { "className": "Rect", "topLeftPoint": { "className": "Point", "x": 213, "y": 855 }, "botRightPoint": { "className": "Point", "x": 217, "y": 859 } }, "duration": 0.03, "offset": { "className": "Point", "x": 0, "y": 0 }, "hitboxes": [], "POIs": [] }], "POIs": [], "name": "rolling_shield_muzzle", "path": "assets/sprites/rolling_shield_muzzle.json", "alignment": "center", "wrapMode": "once", "spritesheetPath": "assets/spritesheets/effects.png" }, { "className": "Sprite", "hitboxes": [{ "className": "Hitbox", "tags": "", "width": 13, "height": 13, "offset": { "className": "Point", "x": 0, "y": 0 }, "rect": { "className": "Rect", "topLeftPoint": { "className": "Point", "x": 343.5, "y": 293.5 }, "botRightPoint": { "className": "Point", "x": 356.5, "y": 306.5 } }, "isTrigger": true }], "frames": [{ "className": "Frame", "rect": { "className": "Rect", "topLeftPoint": { "className": "Point", "x": 368, "y": 958 }, "botRightPoint": { "className": "Point", "x": 381, "y": 971 } }, "duration": 0.066, "offset": { "className": "Point", "x": 0, "y": 0 }, "hitboxes": [], "POIs": [] }], "POIs": [], "name": "shotgun_ice", "path": "assets/sprites/shotgun_ice.json", "alignment": "center", "wrapMode": "once", "spritesheetPath": "assets/spritesheets/effects.png" }, { "className": "Sprite", "hitboxes": [{ "className": "Hitbox", "tags": "", "width": 7, "height": 7, "offset": { "className": "Point", "x": 0, "y": 0 }, "rect": { "className": "Rect", "topLeftPoint": { "className": "Point", "x": 346.5, "y": 296.5 }, "botRightPoint": { "className": "Point", "x": 353.5, "y": 303.5 } }, "isTrigger": true }], "frames": [{ "className": "Frame", "rect": { "className": "Rect", "topLeftPoint": { "className": "Point", "x": 426, "y": 961 }, "botRightPoint": { "className": "Point", "x": 433, "y": 968 } }, "duration": 0.066, "offset": { "className": "Point", "x": 0, "y": 0 }, "hitboxes": [], "POIs": [] }], "POIs": [], "name": "shotgun_ice_piece", "path": "assets/sprites/shotgun_ice_piece.json", "alignment": "center", "wrapMode": "once", "spritesheetPath": "assets/spritesheets/effects.png" }, { "className": "Sprite", "hitboxes": [], "frames": [{ "className": "Frame", "rect": { "className": "Rect", "topLeftPoint": { "className": "Point", "x": 385, "y": 961 }, "botRightPoint": { "className": "Point", "x": 393, "y": 968 } }, "duration": 0.03, "offset": { "className": "Point", "x": 0, "y": 0 }, "hitboxes": [], "POIs": [] }, { "className": "Frame", "rect": { "className": "Rect", "topLeftPoint": { "className": "Point", "x": 395, "y": 962 }, "botRightPoint": { "className": "Point", "x": 403, "y": 969 } }, "duration": 0.03, "offset": { "className": "Point", "x": 0, "y": 0 }, "hitboxes": [], "POIs": [] }, { "className": "Frame", "rect": { "className": "Rect", "topLeftPoint": { "className": "Point", "x": 405, "y": 963 }, "botRightPoint": { "className": "Point", "x": 413, "y": 968 } }, "duration": 0.03, "offset": { "className": "Point", "x": 0, "y": 0 }, "hitboxes": [], "POIs": [] }, { "className": "Frame", "rect": { "className": "Rect", "topLeftPoint": { "className": "Point", "x": 415, "y": 963 }, "botRightPoint": { "className": "Point", "x": 422, "y": 968 } }, "duration": 0.03, "offset": { "className": "Point", "x": 0, "y": 0 }, "hitboxes": [], "POIs": [] }], "POIs": [], "name": "shotgun_ice_sparkles", "path": "assets/sprites/shotgun_ice_sparkles.json", "alignment": "center", "wrapMode": "once", "spritesheetPath": "assets/spritesheets/effects.png" }, { "className": "Sprite", "hitboxes": [{ "className": "Hitbox", "tags": "", "width": 32, "height": 5, "offset": { "className": "Point", "x": 0, "y": 0 }, "rect": { "className": "Rect", "topLeftPoint": { "className": "Point", "x": 334, "y": 297.5 }, "botRightPoint": { "className": "Point", "x": 366, "y": 302.5 } }, "isTrigger": true }], "frames": [{ "className": "Frame", "rect": { "className": "Rect", "topLeftPoint": { "className": "Point", "x": 415, "y": 796 }, "botRightPoint": { "className": "Point", "x": 447, "y": 801 } }, "duration": 0.066, "offset": { "className": "Point", "x": 0, "y": 0 }, "hitboxes": [], "POIs": [] }], "POIs": [], "name": "sting_flat", "path": "assets/sprites/sting_flat.json", "alignment": "center", "wrapMode": "once", "spritesheetPath": "assets/spritesheets/effects.png" }, { "className": "Sprite", "hitboxes": [{ "className": "Hitbox", "tags": "", "width": 20, "height": 5, "offset": { "className": "Point", "x": 0, "y": 0 }, "rect": { "className": "Rect", "topLeftPoint": { "className": "Point", "x": 340, "y": 297.5 }, "botRightPoint": { "className": "Point", "x": 360, "y": 302.5 } }, "isTrigger": true }], "frames": [{ "className": "Frame", "rect": { "className": "Rect", "topLeftPoint": { "className": "Point", "x": 415, "y": 796 }, "botRightPoint": { "className": "Point", "x": 447, "y": 801 } }, "duration": 0.1, "offset": { "className": "Point", "x": -1, "y": 0 }, "hitboxes": [], "POIs": [] }, { "className": "Frame", "rect": { "className": "Rect", "topLeftPoint": { "className": "Point", "x": 451, "y": 783 }, "botRightPoint": { "className": "Point", "x": 483, "y": 815 } }, "duration": 0.03, "offset": { "className": "Point", "x": 0, "y": 0 }, "hitboxes": [], "POIs": [] }, { "className": "Frame", "rect": { "className": "Rect", "topLeftPoint": { "className": "Point", "x": 487, "y": 785 }, "botRightPoint": { "className": "Point", "x": 515, "y": 813 } }, "duration": 0.03, "offset": { "className": "Point", "x": 0, "y": 0 }, "hitboxes": [], "POIs": [] }, { "className": "Frame", "rect": { "className": "Rect", "topLeftPoint": { "className": "Point", "x": 519, "y": 791 }, "botRightPoint": { "className": "Point", "x": 535, "y": 807 } }, "duration": 0.03, "offset": { "className": "Point", "x": 0, "y": 0 }, "hitboxes": [], "POIs": [] }, { "className": "Frame", "rect": { "className": "Rect", "topLeftPoint": { "className": "Point", "x": 539, "y": 792 }, "botRightPoint": { "className": "Point", "x": 553, "y": 806 } }, "duration": 0.03, "offset": { "className": "Point", "x": 0, "y": 0 }, "hitboxes": [], "POIs": [] }, { "className": "Frame", "rect": { "className": "Rect", "topLeftPoint": { "className": "Point", "x": 557, "y": 794 }, "botRightPoint": { "className": "Point", "x": 567, "y": 804 } }, "duration": 0.03, "offset": { "className": "Point", "x": 0, "y": 0 }, "hitboxes": [], "POIs": [] }], "POIs": [], "name": "sting_start", "path": "assets/sprites/sting_start.json", "alignment": "center", "wrapMode": "once", "spritesheetPath": "assets/spritesheets/effects.png" }, { "className": "Sprite", "hitboxes": [{ "className": "Hitbox", "tags": "", "width": 28, "height": 15, "offset": { "className": "Point", "x": 0, "y": 0 }, "rect": { "className": "Rect", "topLeftPoint": { "className": "Point", "x": 336, "y": 292.5 }, "botRightPoint": { "className": "Point", "x": 364, "y": 307.5 } }, "isTrigger": true }], "frames": [{ "className": "Frame", "rect": { "className": "Rect", "topLeftPoint": { "className": "Point", "x": 383, "y": 791 }, "botRightPoint": { "className": "Point", "x": 411, "y": 806 } }, "duration": 0.066, "offset": { "className": "Point", "x": 0, "y": 0 }, "hitboxes": [], "POIs": [] }], "POIs": [], "name": "sting_up", "path": "assets/sprites/sting_up.json", "alignment": "center", "wrapMode": "once", "spritesheetPath": "assets/spritesheets/effects.png" }, { "className": "Sprite", "hitboxes": [], "frames": [{ "className": "Frame", "rect": { "className": "Rect", "topLeftPoint": { "className": "Point", "x": 359, "y": 904 }, "botRightPoint": { "className": "Point", "x": 373, "y": 921 } }, "duration": 0.03, "offset": { "className": "Point", "x": 0, "y": 0 }, "hitboxes": [], "POIs": [] }, { "className": "Frame", "rect": { "className": "Rect", "topLeftPoint": { "className": "Point", "x": 435, "y": 898 }, "botRightPoint": { "className": "Point", "x": 449, "y": 927 } }, "duration": 0.03, "offset": { "className": "Point", "x": 0, "y": 0 }, "hitboxes": [], "POIs": [] }, { "className": "Frame", "rect": { "className": "Rect", "topLeftPoint": { "className": "Point", "x": 509, "y": 897 }, "botRightPoint": { "className": "Point", "x": 524, "y": 928 } }, "duration": 0.03, "offset": { "className": "Point", "x": 0, "y": 0 }, "hitboxes": [], "POIs": [] }, { "className": "Frame", "rect": { "className": "Rect", "topLeftPoint": { "className": "Point", "x": 597, "y": 903 }, "botRightPoint": { "className": "Point", "x": 621, "y": 919 } }, "duration": 0.03, "offset": { "className": "Point", "x": 0, "y": 0 }, "hitboxes": [], "POIs": [] }], "POIs": [], "name": "tornado_end", "path": "assets/sprites/tornado_end.json", "alignment": "midleft", "wrapMode": "loop", "spritesheetPath": "assets/spritesheets/effects.png" }, { "className": "Sprite", "hitboxes": [], "frames": [{ "className": "Frame", "rect": { "className": "Rect", "topLeftPoint": { "className": "Point", "x": 334, "y": 904 }, "botRightPoint": { "className": "Point", "x": 350, "y": 921 } }, "duration": 0.03, "offset": { "className": "Point", "x": 0, "y": 0 }, "hitboxes": [], "POIs": [] }, { "className": "Frame", "rect": { "className": "Rect", "topLeftPoint": { "className": "Point", "x": 409, "y": 898 }, "botRightPoint": { "className": "Point", "x": 425, "y": 926 } }, "duration": 0.03, "offset": { "className": "Point", "x": 0, "y": 0 }, "hitboxes": [], "POIs": [] }, { "className": "Frame", "rect": { "className": "Rect", "topLeftPoint": { "className": "Point", "x": 477, "y": 897 }, "botRightPoint": { "className": "Point", "x": 493, "y": 928 } }, "duration": 0.03, "offset": { "className": "Point", "x": 0, "y": 0 }, "hitboxes": [], "POIs": [] }, { "className": "Frame", "rect": { "className": "Rect", "topLeftPoint": { "className": "Point", "x": 563, "y": 903 }, "botRightPoint": { "className": "Point", "x": 579, "y": 919 } }, "duration": 0.03, "offset": { "className": "Point", "x": 0, "y": 0 }, "hitboxes": [], "POIs": [] }], "POIs": [], "name": "tornado_mid", "path": "assets/sprites/tornado_mid.json", "alignment": "midleft", "wrapMode": "loop", "spritesheetPath": "assets/spritesheets/effects.png" }, { "className": "Sprite", "hitboxes": [], "frames": [{ "className": "Frame", "rect": { "className": "Rect", "topLeftPoint": { "className": "Point", "x": 313, "y": 904 }, "botRightPoint": { "className": "Point", "x": 325, "y": 920 } }, "duration": 0.03, "offset": { "className": "Point", "x": 0, "y": 0 }, "hitboxes": [], "POIs": [] }, { "className": "Frame", "rect": { "className": "Rect", "topLeftPoint": { "className": "Point", "x": 388, "y": 899 }, "botRightPoint": { "className": "Point", "x": 396, "y": 925 } }, "duration": 0.03, "offset": { "className": "Point", "x": 0, "y": 0 }, "hitboxes": [], "POIs": [] }, { "className": "Frame", "rect": { "className": "Rect", "topLeftPoint": { "className": "Point", "x": 462, "y": 898 }, "botRightPoint": { "className": "Point", "x": 468, "y": 928 } }, "duration": 0.03, "offset": { "className": "Point", "x": 0, "y": 0 }, "hitboxes": [], "POIs": [] }, { "className": "Frame", "rect": { "className": "Rect", "topLeftPoint": { "className": "Point", "x": 544, "y": 903 }, "botRightPoint": { "className": "Point", "x": 551, "y": 919 } }, "duration": 0.03, "offset": { "className": "Point", "x": 0, "y": 0 }, "hitboxes": [], "POIs": [] }], "POIs": [], "name": "tornado_start", "path": "assets/sprites/tornado_start.json", "alignment": "midright", "wrapMode": "loop", "spritesheetPath": "assets/spritesheets/effects.png" }, { "className": "Sprite", "hitboxes": [{ "className": "Hitbox", "tags": "", "width": 12, "height": 12, "offset": { "className": "Point", "x": 0, "y": 0 }, "rect": { "className": "Rect", "topLeftPoint": { "className": "Point", "x": 344, "y": 294 }, "botRightPoint": { "className": "Point", "x": 356, "y": 306 } }, "isTrigger": true }], "frames": [{ "className": "Frame", "rect": { "className": "Rect", "topLeftPoint": { "className": "Point", "x": 217, "y": 794 }, "botRightPoint": { "className": "Point", "x": 233, "y": 804 } }, "duration": 0.066, "offset": { "className": "Point", "x": 0, "y": 0 }, "hitboxes": [], "POIs": [] }, { "className": "Frame", "rect": { "className": "Rect", "topLeftPoint": { "className": "Point", "x": 235, "y": 793 }, "botRightPoint": { "className": "Point", "x": 251, "y": 806 } }, "duration": 0.066, "offset": { "className": "Point", "x": 0, "y": 0 }, "hitboxes": [], "POIs": [] }, { "className": "Frame", "rect": { "className": "Rect", "topLeftPoint": { "className": "Point", "x": 253, "y": 792 }, "botRightPoint": { "className": "Point", "x": 268, "y": 807 } }, "duration": 0.066, "offset": { "className": "Point", "x": 0, "y": 0 }, "hitboxes": [], "POIs": [] }, { "className": "Frame", "rect": { "className": "Rect", "topLeftPoint": { "className": "Point", "x": 272, "y": 791 }, "botRightPoint": { "className": "Point", "x": 285, "y": 807 } }, "duration": 0.066, "offset": { "className": "Point", "x": 0, "y": 0 }, "hitboxes": [], "POIs": [] }, { "className": "Frame", "rect": { "className": "Rect", "topLeftPoint": { "className": "Point", "x": 292, "y": 791 }, "botRightPoint": { "className": "Point", "x": 302, "y": 807 } }, "duration": 0.066, "offset": { "className": "Point", "x": 0, "y": -1 }, "hitboxes": [], "POIs": [] }], "POIs": [], "name": "torpedo", "path": "assets/sprites/torpedo.json", "alignment": "center", "wrapMode": "once", "spritesheetPath": "assets/spritesheets/effects.png" }, { "className": "Sprite", "hitboxes": [], "frames": [{ "className": "Frame", "rect": { "className": "Rect", "topLeftPoint": { "className": "Point", "x": 317, "y": 815 }, "botRightPoint": { "className": "Point", "x": 325, "y": 823 } }, "duration": 0.03, "offset": { "className": "Point", "x": 0, "y": 0 }, "hitboxes": [], "POIs": [] }, { "className": "Frame", "rect": { "className": "Rect", "topLeftPoint": { "className": "Point", "x": 332, "y": 815 }, "botRightPoint": { "className": "Point", "x": 339, "y": 823 } }, "duration": 0.03, "offset": { "className": "Point", "x": 0, "y": 0 }, "hitboxes": [], "POIs": [] }, { "className": "Frame", "rect": { "className": "Rect", "topLeftPoint": { "className": "Point", "x": 346, "y": 815 }, "botRightPoint": { "className": "Point", "x": 352, "y": 822 } }, "duration": 0.03, "offset": { "className": "Point", "x": 0, "y": 0 }, "hitboxes": [], "POIs": [] }, { "className": "Frame", "rect": { "className": "Rect", "topLeftPoint": { "className": "Point", "x": 356, "y": 816 }, "botRightPoint": { "className": "Point", "x": 360, "y": 821 } }, "duration": 0.03, "offset": { "className": "Point", "x": 0, "y": 0 }, "hitboxes": [], "POIs": [] }], "POIs": [], "name": "torpedo_smoke", "path": "assets/sprites/torpedo_smoke.json", "alignment": "center", "wrapMode": "once", "spritesheetPath": "assets/spritesheets/effects.png" }, { "className": "Sprite", "hitboxes": [], "frames": [{ "className": "Frame", "rect": { "className": "Rect", "topLeftPoint": { "className": "Point", "x": 137, "y": 250 }, "botRightPoint": { "className": "Point", "x": 149, "y": 262 } }, "duration": 0.1, "offset": { "className": "Point", "x": 0, "y": 0 }, "hitboxes": [], "POIs": [] }], "POIs": [], "name": "wall_sparks", "path": "assets/sprites/wall_sparks.json", "alignment": "center", "wrapMode": "once", "spritesheetPath": "assets/spritesheets/effects.png" }];
            exports_21("spriteJsons", spriteJsons);
        }
    };
});
System.register("levels", [], function (exports_22, context_22) {
    "use strict";
    var __moduleName = context_22 && context_22.id;
    var levelJsons;
    return {
        setters: [],
        execute: function () {
            levelJsons = [{ "className": "Level", "instances": [{ "className": "ShapeInstance", "name": "Collision Shape", "objectName": "Collision Shape", "points": [{ "className": "Point", "x": 642, "y": 112, "perc_from_left": 0, "perc_from_right": 1, "perc_from_top": 0, "perc_from_bottom": 1 }, { "className": "Point", "x": 734, "y": 112, "perc_from_left": 1, "perc_from_right": 0, "perc_from_top": 0, "perc_from_bottom": 1 }, { "className": "Point", "x": 734, "y": 143, "perc_from_left": 1, "perc_from_right": 0, "perc_from_top": 1, "perc_from_bottom": 0 }, { "className": "Point", "x": 642, "y": 143, "perc_from_left": 0, "perc_from_right": 1, "perc_from_top": 1, "perc_from_bottom": 0 }], "properties": {} }, { "className": "ShapeInstance", "name": "Collision Shape", "objectName": "Collision Shape", "points": [{ "className": "Point", "x": 3, "y": 136, "perc_from_left": 0, "perc_from_right": 1, "perc_from_top": 0, "perc_from_bottom": 1 }, { "className": "Point", "x": 3, "y": 511, "perc_from_left": 0, "perc_from_right": 1, "perc_from_top": 1, "perc_from_bottom": 0 }, { "className": "Point", "x": 288, "y": 511, "perc_from_left": 1, "perc_from_right": 0, "perc_from_top": 1, "perc_from_bottom": 0 }, { "className": "Point", "x": 288, "y": 136, "perc_from_left": 1, "perc_from_right": 0, "perc_from_top": 0, "perc_from_bottom": 1 }], "properties": {} }, { "className": "ShapeInstance", "name": "Collision Shape", "objectName": "Collision Shape", "points": [{ "className": "Point", "x": 420, "y": 172, "perc_from_left": 0, "perc_from_right": 1, "perc_from_top": 0, "perc_from_bottom": 1 }, { "className": "Point", "x": 928, "y": 419, "perc_from_left": 1, "perc_from_right": 0, "perc_from_top": 0, "perc_from_bottom": 1 }, { "className": "Point", "x": 927, "y": 510, "perc_from_left": 1, "perc_from_right": 0, "perc_from_top": 1, "perc_from_bottom": 0 }, { "className": "Point", "x": 419, "y": 510, "perc_from_left": 0, "perc_from_right": 1, "perc_from_top": 1, "perc_from_bottom": 0 }], "properties": {} }, { "className": "ShapeInstance", "name": "Collision Shape", "objectName": "Collision Shape", "points": [{ "className": "Point", "x": 927, "y": 419, "perc_from_left": 0, "perc_from_right": 1, "perc_from_top": 0, "perc_from_bottom": 1 }, { "className": "Point", "x": 1825, "y": 419, "perc_from_left": 1, "perc_from_right": 0, "perc_from_top": 0, "perc_from_bottom": 1 }, { "className": "Point", "x": 1825, "y": 512, "perc_from_left": 1, "perc_from_right": 0, "perc_from_top": 1, "perc_from_bottom": 0 }, { "className": "Point", "x": 927, "y": 512, "perc_from_left": 0, "perc_from_right": 1, "perc_from_top": 1, "perc_from_bottom": 0 }], "properties": {} }, { "className": "ShapeInstance", "name": "Collision Shape", "objectName": "Collision Shape", "points": [{ "className": "Point", "x": 1888, "y": 449, "perc_from_left": 0, "perc_from_right": 1, "perc_from_top": 0, "perc_from_bottom": 1 }, { "className": "Point", "x": 1952, "y": 449, "perc_from_left": 1, "perc_from_right": 0, "perc_from_top": 0, "perc_from_bottom": 1 }, { "className": "Point", "x": 1952, "y": 511, "perc_from_left": 1, "perc_from_right": 0, "perc_from_top": 1, "perc_from_bottom": 0 }, { "className": "Point", "x": 1888, "y": 511, "perc_from_left": 0, "perc_from_right": 1, "perc_from_top": 1, "perc_from_bottom": 0 }], "properties": {} }, { "className": "ShapeInstance", "name": "Collision Shape", "objectName": "Collision Shape", "points": [{ "className": "Point", "x": 1985, "y": 417, "perc_from_left": 0, "perc_from_right": 1, "perc_from_top": 0, "perc_from_bottom": 1 }, { "className": "Point", "x": 2015, "y": 417, "perc_from_left": 1, "perc_from_right": 0, "perc_from_top": 0, "perc_from_bottom": 1 }, { "className": "Point", "x": 2015, "y": 512, "perc_from_left": 1, "perc_from_right": 0, "perc_from_top": 1, "perc_from_bottom": 0 }, { "className": "Point", "x": 1985, "y": 512, "perc_from_left": 0, "perc_from_right": 1, "perc_from_top": 1, "perc_from_bottom": 0 }], "properties": {} }, { "className": "ShapeInstance", "name": "Collision Shape", "objectName": "Collision Shape", "points": [{ "className": "Point", "x": 2080, "y": 449, "perc_from_left": 0, "perc_from_right": 1, "perc_from_top": 0, "perc_from_bottom": 1 }, { "className": "Point", "x": 2241, "y": 449, "perc_from_left": 1, "perc_from_right": 0, "perc_from_top": 0, "perc_from_bottom": 1 }, { "className": "Point", "x": 2241, "y": 512, "perc_from_left": 1, "perc_from_right": 0, "perc_from_top": 1, "perc_from_bottom": 0 }, { "className": "Point", "x": 2080, "y": 512, "perc_from_left": 0, "perc_from_right": 1, "perc_from_top": 1, "perc_from_bottom": 0 }], "properties": {} }, { "className": "ShapeInstance", "name": "Collision Shape", "objectName": "Collision Shape", "points": [{ "className": "Point", "x": 2240, "y": 417, "perc_from_left": 0, "perc_from_right": 1, "perc_from_top": 0, "perc_from_bottom": 1 }, { "className": "Point", "x": 2369, "y": 417, "perc_from_left": 1, "perc_from_right": 0, "perc_from_top": 0, "perc_from_bottom": 1 }, { "className": "Point", "x": 2369, "y": 515, "perc_from_left": 1, "perc_from_right": 0, "perc_from_top": 1, "perc_from_bottom": 0 }, { "className": "Point", "x": 2240, "y": 515, "perc_from_left": 0, "perc_from_right": 1, "perc_from_top": 1, "perc_from_bottom": 0 }], "properties": {} }, { "className": "ShapeInstance", "name": "Collision Shape", "objectName": "Collision Shape", "points": [{ "className": "Point", "x": 2369, "y": 369, "perc_from_left": 0, "perc_from_right": 1, "perc_from_top": 0, "perc_from_bottom": 1 }, { "className": "Point", "x": 2527, "y": 369, "perc_from_left": 1, "perc_from_right": 0, "perc_from_top": 0, "perc_from_bottom": 1 }, { "className": "Point", "x": 2527, "y": 523, "perc_from_left": 1, "perc_from_right": 0, "perc_from_top": 1, "perc_from_bottom": 0 }, { "className": "Point", "x": 2369, "y": 523, "perc_from_left": 0, "perc_from_right": 1, "perc_from_top": 1, "perc_from_bottom": 0 }], "properties": {} }, { "className": "ShapeInstance", "name": "Collision Shape", "objectName": "Collision Shape", "points": [{ "className": "Point", "x": 2528, "y": 419, "perc_from_left": 0, "perc_from_right": 1, "perc_from_top": 0, "perc_from_bottom": 1 }, { "className": "Point", "x": 2736, "y": 419, "perc_from_left": 1, "perc_from_right": 0, "perc_from_top": 0, "perc_from_bottom": 1 }, { "className": "Point", "x": 2736, "y": 640, "perc_from_left": 1, "perc_from_right": 0, "perc_from_top": 1, "perc_from_bottom": 0 }, { "className": "Point", "x": 2528, "y": 640, "perc_from_left": 0, "perc_from_right": 1, "perc_from_top": 1, "perc_from_bottom": 0 }], "properties": {} }, { "className": "ShapeInstance", "name": "Collision Shape", "objectName": "Collision Shape", "points": [{ "className": "Point", "x": 2785, "y": 255, "perc_from_left": 0, "perc_from_right": 1, "perc_from_top": 0, "perc_from_bottom": 1 }, { "className": "Point", "x": 4001, "y": 255, "perc_from_left": 1, "perc_from_right": 0, "perc_from_top": 0, "perc_from_bottom": 1 }, { "className": "Point", "x": 4001, "y": 577, "perc_from_left": 1, "perc_from_right": 0, "perc_from_top": 1, "perc_from_bottom": 0 }, { "className": "Point", "x": 2785, "y": 577, "perc_from_left": 0, "perc_from_right": 1, "perc_from_top": 1, "perc_from_bottom": 0 }], "properties": {} }, { "className": "ShapeInstance", "name": "Collision Shape", "objectName": "Collision Shape", "points": [{ "className": "Point", "x": 2944, "y": 572, "perc_from_left": 0, "perc_from_right": 1, "perc_from_top": 0, "perc_from_bottom": 1 }, { "className": "Point", "x": 3070, "y": 572, "perc_from_left": 1, "perc_from_right": 0, "perc_from_top": 0, "perc_from_bottom": 1 }, { "className": "Point", "x": 3070, "y": 610, "perc_from_left": 1, "perc_from_right": 0, "perc_from_top": 1, "perc_from_bottom": 0 }, { "className": "Point", "x": 2944, "y": 610, "perc_from_left": 0, "perc_from_right": 1, "perc_from_top": 1, "perc_from_bottom": 0 }], "properties": {} }, { "className": "ShapeInstance", "name": "Collision Shape", "objectName": "Collision Shape", "points": [{ "className": "Point", "x": 3999, "y": 510, "perc_from_left": 0, "perc_from_right": 1, "perc_from_top": 0, "perc_from_bottom": 1 }, { "className": "Point", "x": 4064, "y": 510, "perc_from_left": 1, "perc_from_right": 0, "perc_from_top": 0, "perc_from_bottom": 1 }, { "className": "Point", "x": 4064, "y": 707, "perc_from_left": 1, "perc_from_right": 0, "perc_from_top": 1, "perc_from_bottom": 0 }, { "className": "Point", "x": 3999, "y": 707, "perc_from_left": 0, "perc_from_right": 1, "perc_from_top": 1, "perc_from_bottom": 0 }], "properties": { "climbable": "false" } }, { "className": "ShapeInstance", "name": "Collision Shape", "objectName": "Collision Shape", "points": [{ "className": "Point", "x": 3905, "y": 705, "perc_from_left": 1, "perc_from_right": 0, "perc_from_top": 0, "perc_from_bottom": 1 }, { "className": "Point", "x": 3905, "y": 767, "perc_from_left": 1, "perc_from_right": 0, "perc_from_top": 1, "perc_from_bottom": 0 }, { "className": "Point", "x": 4066, "y": 767, "perc_from_left": 0, "perc_from_right": 1, "perc_from_top": 1, "perc_from_bottom": 0 }, { "className": "Point", "x": 4066, "y": 705, "perc_from_left": 0, "perc_from_right": 1, "perc_from_top": 0, "perc_from_bottom": 1 }], "properties": {} }, { "className": "ShapeInstance", "name": "Collision Shape", "objectName": "Collision Shape", "points": [{ "className": "Point", "x": 3647, "y": 706, "perc_from_left": 1, "perc_from_right": 0, "perc_from_top": 0, "perc_from_bottom": 1 }, { "className": "Point", "x": 3647, "y": 767, "perc_from_left": 1, "perc_from_right": 0, "perc_from_top": 1, "perc_from_bottom": 0 }, { "className": "Point", "x": 3839, "y": 767, "perc_from_left": 0, "perc_from_right": 1, "perc_from_top": 1, "perc_from_bottom": 0 }, { "className": "Point", "x": 3839, "y": 706, "perc_from_left": 0, "perc_from_right": 1, "perc_from_top": 0, "perc_from_bottom": 1 }], "properties": {} }, { "className": "ShapeInstance", "name": "Collision Shape", "objectName": "Collision Shape", "points": [{ "className": "Point", "x": 3489, "y": 641, "perc_from_left": 0, "perc_from_right": 1, "perc_from_top": 0, "perc_from_bottom": 1 }, { "className": "Point", "x": 3648, "y": 641, "perc_from_left": 1, "perc_from_right": 0, "perc_from_top": 0, "perc_from_bottom": 1 }, { "className": "Point", "x": 3648, "y": 768, "perc_from_left": 1, "perc_from_right": 0, "perc_from_top": 1, "perc_from_bottom": 0 }, { "className": "Point", "x": 3489, "y": 768, "perc_from_left": 0, "perc_from_right": 1, "perc_from_top": 1, "perc_from_bottom": 0 }], "properties": {} }, { "className": "ShapeInstance", "name": "Collision Shape", "objectName": "Collision Shape", "points": [{ "className": "Point", "x": 3263, "y": 571, "perc_from_left": 0, "perc_from_right": 1, "perc_from_top": 0, "perc_from_bottom": 1 }, { "className": "Point", "x": 3394, "y": 571, "perc_from_left": 1, "perc_from_right": 0, "perc_from_top": 0, "perc_from_bottom": 1 }, { "className": "Point", "x": 3394, "y": 640, "perc_from_left": 1, "perc_from_right": 0, "perc_from_top": 1, "perc_from_bottom": 0 }, { "className": "Point", "x": 3263, "y": 640, "perc_from_left": 0, "perc_from_right": 1, "perc_from_top": 1, "perc_from_bottom": 0 }], "properties": {} }, { "className": "ShapeInstance", "name": "Collision Shape", "objectName": "Collision Shape", "points": [{ "className": "Point", "x": 3200, "y": 705, "perc_from_left": 1, "perc_from_right": 0, "perc_from_top": 0, "perc_from_bottom": 1 }, { "className": "Point", "x": 3200, "y": 766, "perc_from_left": 1, "perc_from_right": 0, "perc_from_top": 1, "perc_from_bottom": 0 }, { "className": "Point", "x": 3489, "y": 766, "perc_from_left": 0, "perc_from_right": 1, "perc_from_top": 1, "perc_from_bottom": 0 }, { "className": "Point", "x": 3489, "y": 705, "perc_from_left": 0, "perc_from_right": 1, "perc_from_top": 0, "perc_from_bottom": 1 }], "properties": {} }, { "className": "ShapeInstance", "name": "Collision Shape", "objectName": "Collision Shape", "points": [{ "className": "Point", "x": 2880, "y": 673, "perc_from_left": 0, "perc_from_right": 1, "perc_from_top": 0, "perc_from_bottom": 1 }, { "className": "Point", "x": 3199, "y": 673, "perc_from_left": 1, "perc_from_right": 0, "perc_from_top": 0, "perc_from_bottom": 1 }, { "className": "Point", "x": 3199, "y": 777, "perc_from_left": 1, "perc_from_right": 0, "perc_from_top": 1, "perc_from_bottom": 0 }, { "className": "Point", "x": 2880, "y": 777, "perc_from_left": 0, "perc_from_right": 1, "perc_from_top": 1, "perc_from_bottom": 0 }], "properties": {} }, { "className": "ShapeInstance", "name": "Collision Shape", "objectName": "Collision Shape", "points": [{ "className": "Point", "x": 2557, "y": 641, "perc_from_left": 0, "perc_from_right": 1, "perc_from_top": 0, "perc_from_bottom": 1 }, { "className": "Point", "x": 2880, "y": 641, "perc_from_left": 1, "perc_from_right": 0, "perc_from_top": 0, "perc_from_bottom": 1 }, { "className": "Point", "x": 2880, "y": 765, "perc_from_left": 1, "perc_from_right": 0, "perc_from_top": 1, "perc_from_bottom": 0 }, { "className": "Point", "x": 2557, "y": 765, "perc_from_left": 0, "perc_from_right": 1, "perc_from_top": 1, "perc_from_bottom": 0 }], "properties": {} }, { "className": "ShapeInstance", "name": "Collision Shape", "objectName": "Collision Shape", "points": [{ "className": "Point", "x": 2624, "y": 254, "perc_from_left": 0, "perc_from_right": 1, "perc_from_top": 0, "perc_from_bottom": 1 }, { "className": "Point", "x": 2783, "y": 254, "perc_from_left": 1, "perc_from_right": 0, "perc_from_top": 0, "perc_from_bottom": 1 }, { "className": "Point", "x": 2783, "y": 320, "perc_from_left": 1, "perc_from_right": 0, "perc_from_top": 1, "perc_from_bottom": 0 }, { "className": "Point", "x": 2624, "y": 320, "perc_from_left": 0, "perc_from_right": 1, "perc_from_top": 1, "perc_from_bottom": 0 }], "properties": {} }, { "className": "ShapeInstance", "name": "Collision Shape", "objectName": "Collision Shape", "points": [{ "className": "Point", "x": 2301, "y": 253, "perc_from_left": 1, "perc_from_right": 0, "perc_from_top": 0, "perc_from_bottom": 1 }, { "className": "Point", "x": 2301, "y": 269, "perc_from_left": 1, "perc_from_right": 0, "perc_from_top": 1, "perc_from_bottom": 0 }, { "className": "Point", "x": 2624, "y": 269, "perc_from_left": 0, "perc_from_right": 1, "perc_from_top": 1, "perc_from_bottom": 0 }, { "className": "Point", "x": 2624, "y": 253, "perc_from_left": 0, "perc_from_right": 1, "perc_from_top": 0, "perc_from_bottom": 1 }], "properties": {} }, { "className": "ShapeInstance", "name": "Collision Shape", "objectName": "Collision Shape", "points": [{ "className": "Point", "x": 897, "y": 242, "perc_from_left": 0, "perc_from_right": 1, "perc_from_top": 0, "perc_from_bottom": 1 }, { "className": "Point", "x": 897, "y": 289, "perc_from_left": 0, "perc_from_right": 1, "perc_from_top": 1, "perc_from_bottom": 0 }, { "className": "Point", "x": 2302, "y": 289, "perc_from_left": 1, "perc_from_right": 0, "perc_from_top": 1, "perc_from_bottom": 0 }, { "className": "Point", "x": 2302, "y": 242, "perc_from_left": 1, "perc_from_right": 0, "perc_from_top": 0, "perc_from_bottom": 1 }], "properties": {} }, { "className": "ShapeInstance", "name": "Collision Shape", "objectName": "Collision Shape", "points": [{ "className": "Point", "x": 800, "y": 158, "perc_from_left": 0, "perc_from_right": 1, "perc_from_top": 0, "perc_from_bottom": 1 }, { "className": "Point", "x": 902, "y": 158, "perc_from_left": 1, "perc_from_right": 0, "perc_from_top": 0, "perc_from_bottom": 1 }, { "className": "Point", "x": 902, "y": 254, "perc_from_left": 1, "perc_from_right": 0, "perc_from_top": 1, "perc_from_bottom": 0 }, { "className": "Point", "x": 800, "y": 254, "perc_from_left": 0, "perc_from_right": 1, "perc_from_top": 1, "perc_from_bottom": 0 }], "properties": {} }, { "className": "ShapeInstance", "name": "Collision Shape", "objectName": "Collision Shape", "points": [{ "className": "Point", "x": 734, "y": 146, "perc_from_left": 0, "perc_from_right": 1, "perc_from_top": 0, "perc_from_bottom": 1 }, { "className": "Point", "x": 808, "y": 146, "perc_from_left": 1, "perc_from_right": 0, "perc_from_top": 0, "perc_from_bottom": 1 }, { "className": "Point", "x": 808, "y": 191, "perc_from_left": 1, "perc_from_right": 0, "perc_from_top": 1, "perc_from_bottom": 0 }, { "className": "Point", "x": 734, "y": 191, "perc_from_left": 0, "perc_from_right": 1, "perc_from_top": 1, "perc_from_bottom": 0 }], "properties": {} }, { "className": "ShapeInstance", "name": "Collision Shape", "objectName": "Collision Shape", "points": [{ "className": "Point", "x": 288, "y": 136, "perc_from_left": 0, "perc_from_right": 1, "perc_from_top": 0, "perc_from_bottom": 1 }, { "className": "Point", "x": 420, "y": 172, "perc_from_left": 1, "perc_from_right": 0, "perc_from_top": 0, "perc_from_bottom": 1 }, { "className": "Point", "x": 420, "y": 513, "perc_from_left": 1, "perc_from_right": 0, "perc_from_top": 1, "perc_from_bottom": 0 }, { "className": "Point", "x": 288, "y": 513, "perc_from_left": 0, "perc_from_right": 1, "perc_from_top": 1, "perc_from_bottom": 0 }], "properties": {} }, { "className": "ShapeInstance", "name": "Collision Shape", "objectName": "Collision Shape", "points": [{ "className": "Point", "x": 607, "y": 59, "perc_from_left": 0, "perc_from_right": 1, "perc_from_top": 0, "perc_from_bottom": 1 }, { "className": "Point", "x": 641, "y": 59, "perc_from_left": 1, "perc_from_right": 0, "perc_from_top": 0, "perc_from_bottom": 1 }, { "className": "Point", "x": 641, "y": 129, "perc_from_left": 1, "perc_from_right": 0, "perc_from_top": 1, "perc_from_bottom": 0 }, { "className": "Point", "x": 607, "y": 129, "perc_from_left": 0, "perc_from_right": 1, "perc_from_top": 1, "perc_from_bottom": 0 }], "properties": {} }, { "className": "ShapeInstance", "name": "Collision Shape", "objectName": "Collision Shape", "points": [{ "className": "Point", "x": 479, "y": 44, "perc_from_left": 0, "perc_from_right": 1, "perc_from_top": 0, "perc_from_bottom": 1 }, { "className": "Point", "x": 542, "y": 44, "perc_from_left": 1, "perc_from_right": 0, "perc_from_top": 0, "perc_from_bottom": 1 }, { "className": "Point", "x": 542, "y": 95, "perc_from_left": 1, "perc_from_right": 0, "perc_from_top": 1, "perc_from_bottom": 0 }, { "className": "Point", "x": 479, "y": 95, "perc_from_left": 0, "perc_from_right": 1, "perc_from_top": 1, "perc_from_bottom": 0 }], "properties": {} }, { "className": "ShapeInstance", "name": "Collision Shape", "objectName": "Collision Shape", "points": [{ "className": "Point", "x": 321, "y": 22, "perc_from_left": 0, "perc_from_right": 1, "perc_from_top": 0, "perc_from_bottom": 1 }, { "className": "Point", "x": 479, "y": 22, "perc_from_left": 1, "perc_from_right": 0, "perc_from_top": 0, "perc_from_bottom": 1 }, { "className": "Point", "x": 479, "y": 61, "perc_from_left": 1, "perc_from_right": 0, "perc_from_top": 1, "perc_from_bottom": 0 }, { "className": "Point", "x": 321, "y": 61, "perc_from_left": 0, "perc_from_right": 1, "perc_from_top": 1, "perc_from_bottom": 0 }], "properties": {} }, { "className": "ShapeInstance", "name": "Collision Shape", "objectName": "Collision Shape", "points": [{ "className": "Point", "x": 256, "y": 4, "perc_from_left": 0, "perc_from_right": 1, "perc_from_top": 1, "perc_from_bottom": 0 }, { "className": "Point", "x": 256, "y": 29, "perc_from_left": 0, "perc_from_right": 1, "perc_from_top": 0, "perc_from_bottom": 1 }, { "className": "Point", "x": 347, "y": 29, "perc_from_left": 1, "perc_from_right": 0, "perc_from_top": 0, "perc_from_bottom": 1 }, { "className": "Point", "x": 347, "y": 4, "perc_from_left": 1, "perc_from_right": 0, "perc_from_top": 1, "perc_from_bottom": 0 }], "properties": { "climbable": "false" } }, { "className": "ShapeInstance", "name": "Collision Shape", "objectName": "Collision Shape", "points": [{ "className": "Point", "x": 539, "y": 52, "perc_from_left": 0, "perc_from_right": 1, "perc_from_top": 0, "perc_from_bottom": 1 }, { "className": "Point", "x": 613, "y": 52, "perc_from_left": 1, "perc_from_right": 0, "perc_from_top": 0, "perc_from_bottom": 1 }, { "className": "Point", "x": 613, "y": 80, "perc_from_left": 1, "perc_from_right": 0, "perc_from_top": 1, "perc_from_bottom": 0 }, { "className": "Point", "x": 539, "y": 80, "perc_from_left": 0, "perc_from_right": 1, "perc_from_top": 1, "perc_from_bottom": 0 }], "properties": {} }, { "className": "ShapeInstance", "name": "Collision Shape", "objectName": "Collision Shape", "points": [{ "className": "Point", "x": 671, "y": 142, "perc_from_left": 0, "perc_from_right": 1, "perc_from_top": 0, "perc_from_bottom": 1 }, { "className": "Point", "x": 734, "y": 142, "perc_from_left": 1, "perc_from_right": 0, "perc_from_top": 0, "perc_from_bottom": 1 }, { "className": "Point", "x": 734, "y": 159, "perc_from_left": 1, "perc_from_right": 0, "perc_from_top": 1, "perc_from_bottom": 0 }, { "className": "Point", "x": 671, "y": 159, "perc_from_left": 0, "perc_from_right": 1, "perc_from_top": 1, "perc_from_bottom": 0 }], "properties": {} }, { "className": "ShapeInstance", "name": "Collision Shape", "objectName": "Collision Shape", "points": [{ "className": "Point", "x": 3837, "y": 743, "perc_from_left": 0, "perc_from_right": 1, "perc_from_top": 0, "perc_from_bottom": 1 }, { "className": "Point", "x": 3908, "y": 743, "perc_from_left": 1, "perc_from_right": 0, "perc_from_top": 0, "perc_from_bottom": 1 }, { "className": "Point", "x": 3908, "y": 767, "perc_from_left": 1, "perc_from_right": 0, "perc_from_top": 1, "perc_from_bottom": 0 }, { "className": "Point", "x": 3837, "y": 767, "perc_from_left": 0, "perc_from_right": 1, "perc_from_top": 1, "perc_from_bottom": 0 }], "properties": {} }, { "className": "ShapeInstance", "name": "Kill Zone", "objectName": "Kill Zone", "points": [{ "className": "Point", "x": 1621, "y": 572, "perc_from_left": 0, "perc_from_right": 1, "perc_from_top": 0, "perc_from_bottom": 1 }, { "className": "Point", "x": 2339, "y": 572, "perc_from_left": 1, "perc_from_right": 0, "perc_from_top": 0, "perc_from_bottom": 1 }, { "className": "Point", "x": 2339, "y": 763, "perc_from_left": 1, "perc_from_right": 0, "perc_from_top": 1, "perc_from_bottom": 0 }, { "className": "Point", "x": 1621, "y": 763, "perc_from_left": 0, "perc_from_right": 1, "perc_from_top": 1, "perc_from_bottom": 0 }], "properties": {} }, { "className": "ShapeInstance", "name": "Kill Zone", "objectName": "Kill Zone", "points": [{ "className": "Point", "x": 3840, "y": 728, "perc_from_left": 0, "perc_from_right": 1, "perc_from_top": 0, "perc_from_bottom": 1 }, { "className": "Point", "x": 3902, "y": 728, "perc_from_left": 1, "perc_from_right": 0, "perc_from_top": 0, "perc_from_bottom": 1 }, { "className": "Point", "x": 3902, "y": 750, "perc_from_left": 1, "perc_from_right": 0, "perc_from_top": 1, "perc_from_bottom": 0 }, { "className": "Point", "x": 3840, "y": 750, "perc_from_left": 0, "perc_from_right": 1, "perc_from_top": 1, "perc_from_bottom": 0 }], "properties": {} }, { "className": "ShapeInstance", "name": "No Scroll", "objectName": "No Scroll", "points": [{ "className": "Point", "x": 4001, "y": 492, "perc_from_left": 0, "perc_from_right": 1, "perc_from_top": 0, "perc_from_bottom": 1 }, { "className": "Point", "x": 4084, "y": 492, "perc_from_left": 1, "perc_from_right": 0, "perc_from_top": 0, "perc_from_bottom": 1 }, { "className": "Point", "x": 4084, "y": 711, "perc_from_left": 1, "perc_from_right": 0, "perc_from_top": 1, "perc_from_bottom": 0 }, { "className": "Point", "x": 4001, "y": 711, "perc_from_left": 0, "perc_from_right": 1, "perc_from_top": 1, "perc_from_bottom": 0 }], "properties": { "freeDir": "left" } }, { "className": "ShapeInstance", "name": "No Scroll", "objectName": "No Scroll", "points": [{ "className": "Point", "x": 2560, "y": 768, "perc_from_left": 0, "perc_from_right": 1, "perc_from_top": 0, "perc_from_bottom": 1 }, { "className": "Point", "x": 4096, "y": 768, "perc_from_left": 1, "perc_from_right": 0, "perc_from_top": 0, "perc_from_bottom": 1 }, { "className": "Point", "x": 4096, "y": 861, "perc_from_left": 1, "perc_from_right": 0, "perc_from_top": 1, "perc_from_bottom": 0 }, { "className": "Point", "x": 2560, "y": 861, "perc_from_left": 0, "perc_from_right": 1, "perc_from_top": 1, "perc_from_bottom": 0 }], "properties": { "freeDir": "up" } }, { "className": "ShapeInstance", "name": "No Scroll", "objectName": "No Scroll", "points": [{ "className": "Point", "x": 743, "y": 2, "perc_from_left": 0.0004952947003467063, "perc_from_right": 0.9995047052996533, "perc_from_top": 0, "perc_from_bottom": 1 }, { "className": "Point", "x": 1021, "y": 258, "perc_from_left": 0, "perc_from_right": 1, "perc_from_top": 1, "perc_from_bottom": 0 }, { "className": "Point", "x": 3042, "y": 258, "perc_from_left": 1, "perc_from_right": 0, "perc_from_top": 1, "perc_from_bottom": 0 }, { "className": "Point", "x": 3042, "y": 2, "perc_from_left": 1, "perc_from_right": 0, "perc_from_top": 0, "perc_from_bottom": 1 }], "properties": { "freeDir": "down" } }, { "className": "ShapeInstance", "name": "No Scroll", "objectName": "No Scroll", "points": [{ "className": "Point", "x": 2883, "y": 244, "perc_from_left": 0, "perc_from_right": 1, "perc_from_top": 0, "perc_from_bottom": 1 }, { "className": "Point", "x": 4000, "y": 244, "perc_from_left": 1, "perc_from_right": 0, "perc_from_top": 0, "perc_from_bottom": 1 }, { "className": "Point", "x": 4000, "y": 515, "perc_from_left": 1, "perc_from_right": 0, "perc_from_top": 1, "perc_from_bottom": 0 }, { "className": "Point", "x": 3072, "y": 515, "perc_from_left": 0, "perc_from_right": 1, "perc_from_top": 1, "perc_from_bottom": 0 }], "properties": { "freeDir": "down" } }, { "className": "ShapeInstance", "name": "No Scroll", "objectName": "No Scroll", "points": [{ "className": "Point", "x": 2, "y": 510, "perc_from_left": 0, "perc_from_right": 1, "perc_from_top": 0, "perc_from_bottom": 1 }, { "className": "Point", "x": 2305, "y": 510, "perc_from_left": 1, "perc_from_right": 0, "perc_from_top": 0, "perc_from_bottom": 1 }, { "className": "Point", "x": 2305, "y": 676, "perc_from_left": 1, "perc_from_right": 0, "perc_from_top": 1, "perc_from_bottom": 0 }, { "className": "Point", "x": 2, "y": 676, "perc_from_left": 0, "perc_from_right": 1, "perc_from_top": 1, "perc_from_bottom": 0 }], "properties": { "freeDir": "up" } }, { "className": "Instance", "name": "Spawn Point1", "objectName": "Spawn Point", "pos": { "className": "Point", "x": 3941, "y": 688 }, "properties": {} }, { "className": "Instance", "name": "Spawn Point2", "objectName": "Spawn Point", "pos": { "className": "Point", "x": 3568, "y": 626 }, "properties": {} }, { "className": "Instance", "name": "Spawn Point2", "objectName": "Spawn Point", "pos": { "className": "Point", "x": 52, "y": 112 }, "properties": {} }, { "className": "Instance", "name": "Spawn Point3", "objectName": "Spawn Point", "pos": { "className": "Point", "x": 3333, "y": 690 }, "properties": {} }, { "className": "Instance", "name": "Spawn Point4", "objectName": "Spawn Point", "pos": { "className": "Point", "x": 3016, "y": 659 }, "properties": {} }, { "className": "Instance", "name": "Spawn Point5", "objectName": "Spawn Point", "pos": { "className": "Point", "x": 2631, "y": 402 }, "properties": {} }, { "className": "Instance", "name": "Spawn Point6", "objectName": "Spawn Point", "pos": { "className": "Point", "x": 2442, "y": 354 }, "properties": {} }, { "className": "Instance", "name": "Spawn Point7", "objectName": "Spawn Point", "pos": { "className": "Point", "x": 2165, "y": 434 }, "properties": {} }, { "className": "Instance", "name": "Spawn Point8", "objectName": "Spawn Point", "pos": { "className": "Point", "x": 1750, "y": 402 }, "properties": {} }, { "className": "Instance", "name": "Spawn Point9", "objectName": "Spawn Point", "pos": { "className": "Point", "x": 1038, "y": 396 }, "properties": {} }, { "className": "Instance", "name": "Spawn Point10", "objectName": "Spawn Point", "pos": { "className": "Point", "x": 1411, "y": 398 }, "properties": {} }, { "className": "ShapeInstance", "name": "Collision Shape", "objectName": "Collision Shape", "points": [{ "className": "Point", "x": 3775, "y": 576, "perc_from_left": 0, "perc_from_right": 1, "perc_from_top": 0, "perc_from_bottom": 1 }, { "className": "Point", "x": 3967, "y": 576, "perc_from_left": 1, "perc_from_right": 0, "perc_from_top": 0, "perc_from_bottom": 1 }, { "className": "Point", "x": 3967, "y": 610, "perc_from_left": 1, "perc_from_right": 0, "perc_from_top": 1, "perc_from_bottom": 0 }, { "className": "Point", "x": 3775, "y": 610, "perc_from_left": 0, "perc_from_right": 1, "perc_from_top": 1, "perc_from_bottom": 0 }], "properties": {} }, { "className": "ShapeInstance", "name": "Collision Shape", "objectName": "Collision Shape", "points": [{ "className": "Point", "x": 3776, "y": 609, "perc_from_left": 0, "perc_from_right": 1, "perc_from_top": 0, "perc_from_bottom": 1 }, { "className": "Point", "x": 3807, "y": 609, "perc_from_left": 1, "perc_from_right": 0, "perc_from_top": 0, "perc_from_bottom": 1 }, { "className": "Point", "x": 3807, "y": 642, "perc_from_left": 1, "perc_from_right": 0, "perc_from_top": 1, "perc_from_bottom": 0 }, { "className": "Point", "x": 3776, "y": 642, "perc_from_left": 0, "perc_from_right": 1, "perc_from_top": 1, "perc_from_bottom": 0 }], "properties": {} }, { "className": "ShapeInstance", "name": "Collision Shape", "objectName": "Collision Shape", "points": [{ "className": "Point", "x": 2240, "y": 289, "perc_from_left": 0, "perc_from_right": 1, "perc_from_top": 0, "perc_from_bottom": 1 }, { "className": "Point", "x": 2271, "y": 289, "perc_from_left": 1, "perc_from_right": 0, "perc_from_top": 0, "perc_from_bottom": 1 }, { "className": "Point", "x": 2271, "y": 303, "perc_from_left": 1, "perc_from_right": 0, "perc_from_top": 1, "perc_from_bottom": 0 }, { "className": "Point", "x": 2240, "y": 303, "perc_from_left": 0, "perc_from_right": 1, "perc_from_top": 1, "perc_from_bottom": 0 }], "properties": {} }, { "className": "ShapeInstance", "name": "Collision Shape", "objectName": "Collision Shape", "points": [{ "className": "Point", "x": 2111, "y": 288, "perc_from_left": 0, "perc_from_right": 1, "perc_from_top": 0, "perc_from_bottom": 1 }, { "className": "Point", "x": 2144, "y": 288, "perc_from_left": 1, "perc_from_right": 0, "perc_from_top": 0, "perc_from_bottom": 1 }, { "className": "Point", "x": 2144, "y": 303, "perc_from_left": 1, "perc_from_right": 0, "perc_from_top": 1, "perc_from_bottom": 0 }, { "className": "Point", "x": 2111, "y": 303, "perc_from_left": 0, "perc_from_right": 1, "perc_from_top": 1, "perc_from_bottom": 0 }], "properties": {} }, { "className": "ShapeInstance", "name": "Collision Shape", "objectName": "Collision Shape", "points": [{ "className": "Point", "x": 1856, "y": 288, "perc_from_left": 0, "perc_from_right": 1, "perc_from_top": 0, "perc_from_bottom": 1 }, { "className": "Point", "x": 1951, "y": 288, "perc_from_left": 1, "perc_from_right": 0, "perc_from_top": 0, "perc_from_bottom": 1 }, { "className": "Point", "x": 1951, "y": 304, "perc_from_left": 1, "perc_from_right": 0, "perc_from_top": 1, "perc_from_bottom": 0 }, { "className": "Point", "x": 1856, "y": 304, "perc_from_left": 0, "perc_from_right": 1, "perc_from_top": 1, "perc_from_bottom": 0 }], "properties": {} }, { "className": "ShapeInstance", "name": "Collision Shape", "objectName": "Collision Shape", "points": [{ "className": "Point", "x": 1889, "y": 303, "perc_from_left": 0, "perc_from_right": 1, "perc_from_top": 0, "perc_from_bottom": 1 }, { "className": "Point", "x": 1920, "y": 303, "perc_from_left": 1, "perc_from_right": 0, "perc_from_top": 0, "perc_from_bottom": 1 }, { "className": "Point", "x": 1920, "y": 318, "perc_from_left": 1, "perc_from_right": 0, "perc_from_top": 1, "perc_from_bottom": 0 }, { "className": "Point", "x": 1889, "y": 318, "perc_from_left": 0, "perc_from_right": 1, "perc_from_top": 1, "perc_from_bottom": 0 }], "properties": {} }, { "className": "ShapeInstance", "name": "Collision Shape", "objectName": "Collision Shape", "points": [{ "className": "Point", "x": 959, "y": 288, "perc_from_left": 0, "perc_from_right": 1, "perc_from_top": 0, "perc_from_bottom": 1 }, { "className": "Point", "x": 1023, "y": 288, "perc_from_left": 1, "perc_from_right": 0, "perc_from_top": 0, "perc_from_bottom": 1 }, { "className": "Point", "x": 1023, "y": 302, "perc_from_left": 1, "perc_from_right": 0, "perc_from_top": 1, "perc_from_bottom": 0 }, { "className": "Point", "x": 959, "y": 302, "perc_from_left": 0, "perc_from_right": 1, "perc_from_top": 1, "perc_from_bottom": 0 }], "properties": {} }, { "className": "ShapeInstance", "name": "Collision Shape", "objectName": "Collision Shape", "points": [{ "className": "Point", "x": -63, "y": 0, "perc_from_left": 0, "perc_from_right": 1, "perc_from_top": 0, "perc_from_bottom": 1 }, { "className": "Point", "x": -63, "y": 236, "perc_from_left": 0, "perc_from_right": 1, "perc_from_top": 1, "perc_from_bottom": 0 }, { "className": "Point", "x": 5, "y": 236, "perc_from_left": 1, "perc_from_right": 0, "perc_from_top": 1, "perc_from_bottom": 0 }, { "className": "Point", "x": 5, "y": 0, "perc_from_left": 1, "perc_from_right": 0, "perc_from_top": 0, "perc_from_bottom": 1 }], "properties": { "climbable": "false" } }], "name": "gallery", "path": "assets/levels/gallery.json", "backgroundPath": "assets/backgrounds/gallery.png" }, { "className": "Level", "instances": [{ "className": "ShapeInstance", "name": "Collision Shape", "objectName": "Collision Shape", "points": [{ "className": "Point", "x": 0, "y": 1, "perc_from_left": 0, "perc_from_right": 1, "perc_from_top": 0, "perc_from_bottom": 1 }, { "className": "Point", "x": 47, "y": 1, "perc_from_left": 1, "perc_from_right": 0, "perc_from_top": 0, "perc_from_bottom": 1 }, { "className": "Point", "x": 47, "y": 225, "perc_from_left": 1, "perc_from_right": 0, "perc_from_top": 1, "perc_from_bottom": 0 }, { "className": "Point", "x": 0, "y": 225, "perc_from_left": 0, "perc_from_right": 1, "perc_from_top": 1, "perc_from_bottom": 0 }], "properties": { "climbable": "false" } }, { "className": "ShapeInstance", "name": "Collision Shape", "objectName": "Collision Shape", "points": [{ "className": "Point", "x": 41, "y": 127, "perc_from_left": 0, "perc_from_right": 1, "perc_from_top": 0, "perc_from_bottom": 1 }, { "className": "Point", "x": 804, "y": 127, "perc_from_left": 1, "perc_from_right": 0, "perc_from_top": 0, "perc_from_bottom": 1 }, { "className": "Point", "x": 804, "y": 180, "perc_from_left": 1, "perc_from_right": 0, "perc_from_top": 1, "perc_from_bottom": 0 }, { "className": "Point", "x": 41, "y": 180, "perc_from_left": 0, "perc_from_right": 1, "perc_from_top": 1, "perc_from_bottom": 0 }], "properties": {} }, { "className": "ShapeInstance", "name": "Collision Shape", "objectName": "Collision Shape", "points": [{ "className": "Point", "x": 827, "y": 95, "perc_from_left": 0, "perc_from_right": 1, "perc_from_top": 0, "perc_from_bottom": 1 }, { "className": "Point", "x": 1318, "y": 95, "perc_from_left": 1, "perc_from_right": 0, "perc_from_top": 0, "perc_from_bottom": 1 }, { "className": "Point", "x": 1318, "y": 144, "perc_from_left": 1, "perc_from_right": 0, "perc_from_top": 1, "perc_from_bottom": 0 }, { "className": "Point", "x": 827, "y": 144, "perc_from_left": 0, "perc_from_right": 1, "perc_from_top": 1, "perc_from_bottom": 0 }], "properties": {} }, { "className": "ShapeInstance", "name": "Collision Shape", "objectName": "Collision Shape", "points": [{ "className": "Point", "x": 861, "y": 141, "perc_from_left": 0, "perc_from_right": 1, "perc_from_top": 0, "perc_from_bottom": 1 }, { "className": "Point", "x": 896, "y": 141, "perc_from_left": 1, "perc_from_right": 0, "perc_from_top": 0, "perc_from_bottom": 1 }, { "className": "Point", "x": 896, "y": 227, "perc_from_left": 1, "perc_from_right": 0, "perc_from_top": 1, "perc_from_bottom": 0 }, { "className": "Point", "x": 861, "y": 227, "perc_from_left": 0, "perc_from_right": 1, "perc_from_top": 1, "perc_from_bottom": 0 }], "properties": {} }, { "className": "ShapeInstance", "name": "Collision Shape", "objectName": "Collision Shape", "points": [{ "className": "Point", "x": 733, "y": 178, "perc_from_left": 0, "perc_from_right": 1, "perc_from_top": 0, "perc_from_bottom": 1 }, { "className": "Point", "x": 767, "y": 178, "perc_from_left": 1, "perc_from_right": 0, "perc_from_top": 0, "perc_from_bottom": 1 }, { "className": "Point", "x": 767, "y": 228, "perc_from_left": 1, "perc_from_right": 0, "perc_from_top": 1, "perc_from_bottom": 0 }, { "className": "Point", "x": 733, "y": 228, "perc_from_left": 0, "perc_from_right": 1, "perc_from_top": 1, "perc_from_bottom": 0 }], "properties": {} }, { "className": "ShapeInstance", "name": "Collision Shape", "objectName": "Collision Shape", "points": [{ "className": "Point", "x": 1247, "y": 141, "perc_from_left": 0, "perc_from_right": 1, "perc_from_top": 0, "perc_from_bottom": 1 }, { "className": "Point", "x": 1279, "y": 141, "perc_from_left": 1, "perc_from_right": 0, "perc_from_top": 0, "perc_from_bottom": 1 }, { "className": "Point", "x": 1279, "y": 228, "perc_from_left": 1, "perc_from_right": 0, "perc_from_top": 1, "perc_from_bottom": 0 }, { "className": "Point", "x": 1247, "y": 228, "perc_from_left": 0, "perc_from_right": 1, "perc_from_top": 1, "perc_from_bottom": 0 }], "properties": {} }, { "className": "ShapeInstance", "name": "Collision Shape", "objectName": "Collision Shape", "points": [{ "className": "Point", "x": 1374, "y": 161, "perc_from_left": 0, "perc_from_right": 1, "perc_from_top": 0, "perc_from_bottom": 1 }, { "className": "Point", "x": 1405, "y": 161, "perc_from_left": 1, "perc_from_right": 0, "perc_from_top": 0, "perc_from_bottom": 1 }, { "className": "Point", "x": 1405, "y": 230, "perc_from_left": 1, "perc_from_right": 0, "perc_from_top": 1, "perc_from_bottom": 0 }, { "className": "Point", "x": 1374, "y": 230, "perc_from_left": 0, "perc_from_right": 1, "perc_from_top": 1, "perc_from_bottom": 0 }], "properties": {} }, { "className": "ShapeInstance", "name": "Collision Shape", "objectName": "Collision Shape", "points": [{ "className": "Point", "x": 1337, "y": 111, "perc_from_left": 0, "perc_from_right": 1, "perc_from_top": 0, "perc_from_bottom": 1 }, { "className": "Point", "x": 2338, "y": 111, "perc_from_left": 1, "perc_from_right": 0, "perc_from_top": 0, "perc_from_bottom": 1 }, { "className": "Point", "x": 2338, "y": 162, "perc_from_left": 1, "perc_from_right": 0, "perc_from_top": 1, "perc_from_bottom": 0 }, { "className": "Point", "x": 1337, "y": 162, "perc_from_left": 0, "perc_from_right": 1, "perc_from_top": 1, "perc_from_bottom": 0 }], "properties": {} }, { "className": "ShapeInstance", "name": "Collision Shape", "objectName": "Collision Shape", "points": [{ "className": "Point", "x": 2271, "y": 154, "perc_from_left": 0, "perc_from_right": 1, "perc_from_top": 0, "perc_from_bottom": 1 }, { "className": "Point", "x": 2303, "y": 154, "perc_from_left": 1, "perc_from_right": 0, "perc_from_top": 0, "perc_from_bottom": 1 }, { "className": "Point", "x": 2303, "y": 229, "perc_from_left": 1, "perc_from_right": 0, "perc_from_top": 1, "perc_from_bottom": 0 }, { "className": "Point", "x": 2271, "y": 229, "perc_from_left": 0, "perc_from_right": 1, "perc_from_top": 1, "perc_from_bottom": 0 }], "properties": {} }, { "className": "ShapeInstance", "name": "Collision Shape", "objectName": "Collision Shape", "points": [{ "className": "Point", "x": 2378, "y": 111, "perc_from_left": 0, "perc_from_right": 1, "perc_from_top": 0, "perc_from_bottom": 1 }, { "className": "Point", "x": 2560, "y": 111, "perc_from_left": 1, "perc_from_right": 0, "perc_from_top": 0, "perc_from_bottom": 1 }, { "className": "Point", "x": 2560, "y": 165, "perc_from_left": 1, "perc_from_right": 0, "perc_from_top": 1, "perc_from_bottom": 0 }, { "className": "Point", "x": 2378, "y": 165, "perc_from_left": 0, "perc_from_right": 1, "perc_from_top": 1, "perc_from_bottom": 0 }], "properties": {} }, { "className": "ShapeInstance", "name": "Collision Shape", "objectName": "Collision Shape", "points": [{ "className": "Point", "x": 2397, "y": 162, "perc_from_left": 0, "perc_from_right": 1, "perc_from_top": 0, "perc_from_bottom": 1 }, { "className": "Point", "x": 2431, "y": 162, "perc_from_left": 1, "perc_from_right": 0, "perc_from_top": 0, "perc_from_bottom": 1 }, { "className": "Point", "x": 2431, "y": 227, "perc_from_left": 1, "perc_from_right": 0, "perc_from_top": 1, "perc_from_bottom": 0 }, { "className": "Point", "x": 2397, "y": 227, "perc_from_left": 0, "perc_from_right": 1, "perc_from_top": 1, "perc_from_bottom": 0 }], "properties": {} }, { "className": "ShapeInstance", "name": "Collision Shape", "objectName": "Collision Shape", "points": [{ "className": "Point", "x": 2562, "y": 5, "perc_from_left": 0, "perc_from_right": 1, "perc_from_top": 1, "perc_from_bottom": 0 }, { "className": "Point", "x": 2562, "y": 110, "perc_from_left": 0, "perc_from_right": 1, "perc_from_top": 0, "perc_from_bottom": 1 }, { "className": "Point", "x": 2630, "y": 110, "perc_from_left": 1, "perc_from_right": 0, "perc_from_top": 0, "perc_from_bottom": 1 }, { "className": "Point", "x": 2630, "y": 5, "perc_from_left": 1, "perc_from_right": 0, "perc_from_top": 1, "perc_from_bottom": 0 }], "properties": { "climbable": "false" } }, { "className": "Instance", "name": "Spawn Point1", "objectName": "Spawn Point", "pos": { "className": "Point", "x": 150, "y": 108 }, "properties": {} }, { "className": "Instance", "name": "Spawn Point2", "objectName": "Spawn Point", "pos": { "className": "Point", "x": 572, "y": 108 }, "properties": {} }, { "className": "Instance", "name": "Spawn Point3", "objectName": "Spawn Point", "pos": { "className": "Point", "x": 886, "y": 79 }, "properties": {} }, { "className": "Instance", "name": "Spawn Point4", "objectName": "Spawn Point", "pos": { "className": "Point", "x": 2473, "y": 96 }, "properties": {} }, { "className": "Instance", "name": "Spawn Point5", "objectName": "Spawn Point", "pos": { "className": "Point", "x": 2165, "y": 90 }, "properties": {} }, { "className": "Instance", "name": "Spawn Point6", "objectName": "Spawn Point", "pos": { "className": "Point", "x": 1878, "y": 91 }, "properties": {} }, { "className": "Instance", "name": "Spawn Point7", "objectName": "Spawn Point", "pos": { "className": "Point", "x": 1436, "y": 88 }, "properties": {} }, { "className": "Instance", "name": "Spawn Point8", "objectName": "Spawn Point", "pos": { "className": "Point", "x": 1218, "y": 77 }, "properties": {} }, { "className": "ShapeInstance", "name": "No Scroll", "objectName": "No Scroll", "points": [{ "className": "Point", "x": 32, "y": 224, "perc_from_left": 0, "perc_from_right": 1, "perc_from_top": 0, "perc_from_bottom": 1 }, { "className": "Point", "x": 2587, "y": 224, "perc_from_left": 1, "perc_from_right": 0, "perc_from_top": 0, "perc_from_bottom": 1 }, { "className": "Point", "x": 2587, "y": 466, "perc_from_left": 1, "perc_from_right": 0, "perc_from_top": 1, "perc_from_bottom": 0 }, { "className": "Point", "x": 32, "y": 466, "perc_from_left": 0, "perc_from_right": 1, "perc_from_top": 1, "perc_from_bottom": 0 }], "properties": { "freeDir": "up" } }, { "className": "ShapeInstance", "name": "No Scroll", "objectName": "No Scroll", "points": [{ "className": "Point", "x": 2563, "y": 5, "perc_from_left": 1, "perc_from_right": 0, "perc_from_top": 1, "perc_from_bottom": 0 }, { "className": "Point", "x": 2728, "y": 5, "perc_from_left": 0, "perc_from_right": 1, "perc_from_top": 1, "perc_from_bottom": 0 }, { "className": "Point", "x": 2728, "y": 254, "perc_from_left": 0, "perc_from_right": 1, "perc_from_top": 0, "perc_from_bottom": 1 }, { "className": "Point", "x": 2563, "y": 254, "perc_from_left": 1, "perc_from_right": 0, "perc_from_top": 0, "perc_from_bottom": 1 }], "properties": { "freeDir": "left" } }], "name": "highway", "path": "assets/levels/highway.json", "backgroundPath": "assets/backgrounds/highway.png" }, { "className": "Level", "instances": [{ "className": "ShapeInstance", "name": "Collision Shape", "objectName": "Collision Shape", "points": [{ "className": "Point", "x": -40, "y": 56, "perc_from_left": 0, "perc_from_right": 1, "perc_from_top": 0, "perc_from_bottom": 1 }, { "className": "Point", "x": 5, "y": 56, "perc_from_left": 1, "perc_from_right": 0, "perc_from_top": 0, "perc_from_bottom": 1 }, { "className": "Point", "x": 5, "y": 445, "perc_from_left": 1, "perc_from_right": 0, "perc_from_top": 1, "perc_from_bottom": 0 }, { "className": "Point", "x": -40, "y": 445, "perc_from_left": 0, "perc_from_right": 1, "perc_from_top": 1, "perc_from_bottom": 0 }] }, { "className": "ShapeInstance", "name": "Collision Shape", "objectName": "Collision Shape", "points": [{ "className": "Point", "x": -11, "y": 417, "perc_from_left": 0, "perc_from_right": 1, "perc_from_top": 0, "perc_from_bottom": 1 }, { "className": "Point", "x": 1141, "y": 417, "perc_from_left": 1, "perc_from_right": 0, "perc_from_top": 0, "perc_from_bottom": 1 }, { "className": "Point", "x": 1141, "y": 432, "perc_from_left": 1, "perc_from_right": 0, "perc_from_top": 1, "perc_from_bottom": 0 }, { "className": "Point", "x": -11, "y": 432, "perc_from_left": 0, "perc_from_right": 1, "perc_from_top": 1, "perc_from_bottom": 0 }] }, { "className": "ShapeInstance", "name": "Collision Shape", "objectName": "Collision Shape", "points": [{ "className": "Point", "x": 256, "y": 64, "perc_from_left": 0, "perc_from_right": 1, "perc_from_top": 0, "perc_from_bottom": 1 }, { "className": "Point", "x": 288, "y": 64, "perc_from_left": 1, "perc_from_right": 0, "perc_from_top": 0, "perc_from_bottom": 1 }, { "className": "Point", "x": 288, "y": 300, "perc_from_left": 1, "perc_from_right": 0, "perc_from_top": 1, "perc_from_bottom": 0 }, { "className": "Point", "x": 256, "y": 300, "perc_from_left": 0, "perc_from_right": 1, "perc_from_top": 1, "perc_from_bottom": 0 }] }, { "className": "ShapeInstance", "name": "Collision Shape", "objectName": "Collision Shape", "points": [{ "className": "Point", "x": 448, "y": 296, "perc_from_left": 0, "perc_from_right": 1, "perc_from_top": 0, "perc_from_bottom": 1 }, { "className": "Point", "x": 480, "y": 296, "perc_from_left": 1, "perc_from_right": 0, "perc_from_top": 0, "perc_from_bottom": 1 }, { "className": "Point", "x": 480, "y": 425, "perc_from_left": 1, "perc_from_right": 0, "perc_from_top": 1, "perc_from_bottom": 0 }, { "className": "Point", "x": 448, "y": 425, "perc_from_left": 0, "perc_from_right": 1, "perc_from_top": 1, "perc_from_bottom": 0 }] }, { "className": "ShapeInstance", "name": "Collision Shape", "objectName": "Collision Shape", "points": [{ "className": "Point", "x": 678, "y": 160, "perc_from_left": 0, "perc_from_right": 1, "perc_from_top": 0, "perc_from_bottom": 1 }, { "className": "Point", "x": 763, "y": 160, "perc_from_left": 1, "perc_from_right": 0, "perc_from_top": 0, "perc_from_bottom": 1 }, { "className": "Point", "x": 763, "y": 176, "perc_from_left": 1, "perc_from_right": 0, "perc_from_top": 1, "perc_from_bottom": 0 }, { "className": "Point", "x": 678, "y": 176, "perc_from_left": 0, "perc_from_right": 1, "perc_from_top": 1, "perc_from_bottom": 0 }] }, { "className": "ShapeInstance", "name": "Collision Shape", "objectName": "Collision Shape", "points": [{ "className": "Point", "x": 1183, "y": 28, "perc_from_left": 0, "perc_from_right": 1, "perc_from_top": 0, "perc_from_bottom": 1 }, { "className": "Point", "x": 1312, "y": 28, "perc_from_left": 1, "perc_from_right": 0, "perc_from_top": 0, "perc_from_bottom": 1 }, { "className": "Point", "x": 1312, "y": 129, "perc_from_left": 1, "perc_from_right": 0, "perc_from_top": 1, "perc_from_bottom": 0 }, { "className": "Point", "x": 1183, "y": 129, "perc_from_left": 0, "perc_from_right": 1, "perc_from_top": 1, "perc_from_bottom": 0 }] }, { "className": "ShapeInstance", "name": "Collision Shape", "objectName": "Collision Shape", "points": [{ "className": "Point", "x": 832, "y": 174, "perc_from_left": 0, "perc_from_right": 1, "perc_from_top": 0, "perc_from_bottom": 1 }, { "className": "Point", "x": 864, "y": 174, "perc_from_left": 1, "perc_from_right": 0, "perc_from_top": 0, "perc_from_bottom": 1 }, { "className": "Point", "x": 864, "y": 297, "perc_from_left": 1, "perc_from_right": 0, "perc_from_top": 1, "perc_from_bottom": 0 }, { "className": "Point", "x": 832, "y": 297, "perc_from_left": 0, "perc_from_right": 1, "perc_from_top": 1, "perc_from_bottom": 0 }] }, { "className": "ShapeInstance", "name": "Collision Shape", "objectName": "Collision Shape", "points": [{ "className": "Point", "x": 704, "y": 55, "perc_from_left": 0, "perc_from_right": 1, "perc_from_top": 0, "perc_from_bottom": 1 }, { "className": "Point", "x": 736, "y": 55, "perc_from_left": 1, "perc_from_right": 0, "perc_from_top": 0, "perc_from_bottom": 1 }, { "className": "Point", "x": 736, "y": 170, "perc_from_left": 1, "perc_from_right": 0, "perc_from_top": 1, "perc_from_bottom": 0 }, { "className": "Point", "x": 704, "y": 170, "perc_from_left": 0, "perc_from_right": 1, "perc_from_top": 1, "perc_from_bottom": 0 }] }, { "className": "ShapeInstance", "name": "Collision Shape", "objectName": "Collision Shape", "points": [{ "className": "Point", "x": 960, "y": 302, "perc_from_left": 0, "perc_from_right": 1, "perc_from_top": 0, "perc_from_bottom": 1 }, { "className": "Point", "x": 992, "y": 302, "perc_from_left": 1, "perc_from_right": 0, "perc_from_top": 0, "perc_from_bottom": 1 }, { "className": "Point", "x": 992, "y": 429, "perc_from_left": 1, "perc_from_right": 0, "perc_from_top": 1, "perc_from_bottom": 0 }, { "className": "Point", "x": 960, "y": 429, "perc_from_left": 0, "perc_from_right": 1, "perc_from_top": 1, "perc_from_bottom": 0 }] }, { "className": "ShapeInstance", "name": "Collision Shape", "objectName": "Collision Shape", "points": [{ "className": "Point", "x": 1152, "y": 160, "perc_from_left": 0, "perc_from_right": 1, "perc_from_top": 0, "perc_from_bottom": 1 }, { "className": "Point", "x": 1306, "y": 160, "perc_from_left": 1, "perc_from_right": 0, "perc_from_top": 0, "perc_from_bottom": 1 }, { "className": "Point", "x": 1306, "y": 512, "perc_from_left": 1, "perc_from_right": 0, "perc_from_top": 1, "perc_from_bottom": 0 }, { "className": "Point", "x": 1152, "y": 512, "perc_from_left": 0, "perc_from_right": 1, "perc_from_top": 1, "perc_from_bottom": 0 }] }, { "className": "ShapeInstance", "name": "Collision Shape", "objectName": "Collision Shape", "points": [{ "className": "Point", "x": 608, "y": 171, "perc_from_left": 0, "perc_from_right": 1, "perc_from_top": 0, "perc_from_bottom": 1 }, { "className": "Point", "x": 640, "y": 171, "perc_from_left": 1, "perc_from_right": 0, "perc_from_top": 0, "perc_from_bottom": 1 }, { "className": "Point", "x": 640, "y": 300, "perc_from_left": 1, "perc_from_right": 0, "perc_from_top": 1, "perc_from_bottom": 0 }, { "className": "Point", "x": 608, "y": 300, "perc_from_left": 0, "perc_from_right": 1, "perc_from_top": 1, "perc_from_bottom": 0 }] }, { "className": "ShapeInstance", "name": "Collision Shape", "objectName": "Collision Shape", "points": [{ "className": "Point", "x": 1, "y": 33, "perc_from_left": 0, "perc_from_right": 1, "perc_from_top": 0, "perc_from_bottom": 1 }, { "className": "Point", "x": 1185, "y": 33, "perc_from_left": 1, "perc_from_right": 0, "perc_from_top": 0, "perc_from_bottom": 1 }, { "className": "Point", "x": 1185, "y": 64, "perc_from_left": 1, "perc_from_right": 0, "perc_from_top": 1, "perc_from_bottom": 0 }, { "className": "Point", "x": 1, "y": 64, "perc_from_left": 0, "perc_from_right": 1, "perc_from_top": 1, "perc_from_bottom": 0 }] }, { "className": "ShapeInstance", "name": "Collision Shape", "objectName": "Collision Shape", "points": [{ "className": "Point", "x": 933, "y": 288, "perc_from_left": 0, "perc_from_right": 1, "perc_from_top": 0, "perc_from_bottom": 1 }, { "className": "Point", "x": 1151, "y": 288, "perc_from_left": 1, "perc_from_right": 0, "perc_from_top": 0, "perc_from_bottom": 1 }, { "className": "Point", "x": 1151, "y": 304, "perc_from_left": 1, "perc_from_right": 0, "perc_from_top": 1, "perc_from_bottom": 0 }, { "className": "Point", "x": 933, "y": 304, "perc_from_left": 0, "perc_from_right": 1, "perc_from_top": 1, "perc_from_bottom": 0 }] }, { "className": "ShapeInstance", "name": "Collision Shape", "objectName": "Collision Shape", "points": [{ "className": "Point", "x": 791, "y": 160, "perc_from_left": 0, "perc_from_right": 1, "perc_from_top": 0, "perc_from_bottom": 1 }, { "className": "Point", "x": 1152, "y": 160, "perc_from_left": 1, "perc_from_right": 0, "perc_from_top": 0, "perc_from_bottom": 1 }, { "className": "Point", "x": 1152, "y": 177, "perc_from_left": 1, "perc_from_right": 0, "perc_from_top": 1, "perc_from_bottom": 0 }, { "className": "Point", "x": 791, "y": 177, "perc_from_left": 0, "perc_from_right": 1, "perc_from_top": 1, "perc_from_bottom": 0 }] }, { "className": "ShapeInstance", "name": "Collision Shape", "objectName": "Collision Shape", "points": [{ "className": "Point", "x": 566, "y": 288, "perc_from_left": 0, "perc_from_right": 1, "perc_from_top": 0, "perc_from_bottom": 1 }, { "className": "Point", "x": 907, "y": 288, "perc_from_left": 1, "perc_from_right": 0, "perc_from_top": 0, "perc_from_bottom": 1 }, { "className": "Point", "x": 907, "y": 304, "perc_from_left": 1, "perc_from_right": 0, "perc_from_top": 1, "perc_from_bottom": 0 }, { "className": "Point", "x": 566, "y": 304, "perc_from_left": 0, "perc_from_right": 1, "perc_from_top": 1, "perc_from_bottom": 0 }] }, { "className": "ShapeInstance", "name": "Collision Shape", "objectName": "Collision Shape", "points": [{ "className": "Point", "x": 1, "y": 288, "perc_from_left": 0, "perc_from_right": 1, "perc_from_top": 0, "perc_from_bottom": 1 }, { "className": "Point", "x": 362, "y": 288, "perc_from_left": 1, "perc_from_right": 0, "perc_from_top": 0, "perc_from_bottom": 1 }, { "className": "Point", "x": 362, "y": 304, "perc_from_left": 1, "perc_from_right": 0, "perc_from_top": 1, "perc_from_bottom": 0 }, { "className": "Point", "x": 1, "y": 304, "perc_from_left": 0, "perc_from_right": 1, "perc_from_top": 1, "perc_from_bottom": 0 }] }, { "className": "ShapeInstance", "name": "Collision Shape", "objectName": "Collision Shape", "points": [{ "className": "Point", "x": 582, "y": 160, "perc_from_left": 0, "perc_from_right": 1, "perc_from_top": 0, "perc_from_bottom": 1 }, { "className": "Point", "x": 650, "y": 160, "perc_from_left": 1, "perc_from_right": 0, "perc_from_top": 0, "perc_from_bottom": 1 }, { "className": "Point", "x": 650, "y": 176, "perc_from_left": 1, "perc_from_right": 0, "perc_from_top": 1, "perc_from_bottom": 0 }, { "className": "Point", "x": 582, "y": 176, "perc_from_left": 0, "perc_from_right": 1, "perc_from_top": 1, "perc_from_bottom": 0 }] }, { "className": "ShapeInstance", "name": "Collision Shape", "objectName": "Collision Shape", "points": [{ "className": "Point", "x": 0, "y": 160, "perc_from_left": 0, "perc_from_right": 1, "perc_from_top": 0, "perc_from_bottom": 1 }, { "className": "Point", "x": 554, "y": 160, "perc_from_left": 1, "perc_from_right": 0, "perc_from_top": 0, "perc_from_bottom": 1 }, { "className": "Point", "x": 554, "y": 177, "perc_from_left": 1, "perc_from_right": 0, "perc_from_top": 1, "perc_from_bottom": 0 }, { "className": "Point", "x": 0, "y": 177, "perc_from_left": 0, "perc_from_right": 1, "perc_from_top": 1, "perc_from_bottom": 0 }] }, { "className": "ShapeInstance", "name": "Collision Shape", "objectName": "Collision Shape", "points": [{ "className": "Point", "x": 390, "y": 288, "perc_from_left": 0, "perc_from_right": 1, "perc_from_top": 0, "perc_from_bottom": 1 }, { "className": "Point", "x": 538, "y": 288, "perc_from_left": 1, "perc_from_right": 0, "perc_from_top": 0, "perc_from_bottom": 1 }, { "className": "Point", "x": 538, "y": 304, "perc_from_left": 1, "perc_from_right": 0, "perc_from_top": 1, "perc_from_bottom": 0 }, { "className": "Point", "x": 390, "y": 304, "perc_from_left": 0, "perc_from_right": 1, "perc_from_top": 1, "perc_from_bottom": 0 }] }, { "className": "ShapeInstance", "name": "Ladder1", "objectName": "Ladder", "points": [{ "className": "Point", "x": 363, "y": 288, "perc_from_left": 0, "perc_from_right": 1, "perc_from_top": 0, "perc_from_bottom": 1 }, { "className": "Point", "x": 389, "y": 288, "perc_from_left": 1, "perc_from_right": 0, "perc_from_top": 0, "perc_from_bottom": 1 }, { "className": "Point", "x": 389, "y": 352, "perc_from_left": 1, "perc_from_right": 0, "perc_from_top": 1, "perc_from_bottom": 0 }, { "className": "Point", "x": 363, "y": 352, "perc_from_left": 0, "perc_from_right": 1, "perc_from_top": 1, "perc_from_bottom": 0 }] }, { "className": "ShapeInstance", "name": "Ladder2", "objectName": "Ladder", "points": [{ "className": "Point", "x": 554, "y": 160, "perc_from_left": 0, "perc_from_right": 1, "perc_from_top": 0, "perc_from_bottom": 1 }, { "className": "Point", "x": 581, "y": 160, "perc_from_left": 1, "perc_from_right": 0, "perc_from_top": 0, "perc_from_bottom": 1 }, { "className": "Point", "x": 581, "y": 223, "perc_from_left": 1, "perc_from_right": 0, "perc_from_top": 1, "perc_from_bottom": 0 }, { "className": "Point", "x": 554, "y": 223, "perc_from_left": 0, "perc_from_right": 1, "perc_from_top": 1, "perc_from_bottom": 0 }] }, { "className": "ShapeInstance", "name": "Ladder3", "objectName": "Ladder", "points": [{ "className": "Point", "x": 650, "y": 160, "perc_from_left": 0, "perc_from_right": 1, "perc_from_top": 0, "perc_from_bottom": 1 }, { "className": "Point", "x": 678, "y": 160, "perc_from_left": 1, "perc_from_right": 0, "perc_from_top": 0, "perc_from_bottom": 1 }, { "className": "Point", "x": 678, "y": 225, "perc_from_left": 1, "perc_from_right": 0, "perc_from_top": 1, "perc_from_bottom": 0 }, { "className": "Point", "x": 650, "y": 225, "perc_from_left": 0, "perc_from_right": 1, "perc_from_top": 1, "perc_from_bottom": 0 }] }, { "className": "ShapeInstance", "name": "Ladder4", "objectName": "Ladder", "points": [{ "className": "Point", "x": 538, "y": 288, "perc_from_left": 0, "perc_from_right": 1, "perc_from_top": 0, "perc_from_bottom": 1 }, { "className": "Point", "x": 566, "y": 288, "perc_from_left": 1, "perc_from_right": 0, "perc_from_top": 0, "perc_from_bottom": 1 }, { "className": "Point", "x": 566, "y": 352, "perc_from_left": 1, "perc_from_right": 0, "perc_from_top": 1, "perc_from_bottom": 0 }, { "className": "Point", "x": 538, "y": 352, "perc_from_left": 0, "perc_from_right": 1, "perc_from_top": 1, "perc_from_bottom": 0 }] }, { "className": "ShapeInstance", "name": "Ladder5", "objectName": "Ladder", "points": [{ "className": "Point", "x": 760, "y": 160, "perc_from_left": 0, "perc_from_right": 1, "perc_from_top": 0, "perc_from_bottom": 1 }, { "className": "Point", "x": 791, "y": 160, "perc_from_left": 1, "perc_from_right": 0, "perc_from_top": 0, "perc_from_bottom": 1 }, { "className": "Point", "x": 791, "y": 224, "perc_from_left": 1, "perc_from_right": 0, "perc_from_top": 1, "perc_from_bottom": 0 }, { "className": "Point", "x": 760, "y": 224, "perc_from_left": 0, "perc_from_right": 1, "perc_from_top": 1, "perc_from_bottom": 0 }] }, { "className": "ShapeInstance", "name": "Ladder6", "objectName": "Ladder", "points": [{ "className": "Point", "x": 906, "y": 288, "perc_from_left": 0, "perc_from_right": 1, "perc_from_top": 0, "perc_from_bottom": 1 }, { "className": "Point", "x": 934, "y": 288, "perc_from_left": 1, "perc_from_right": 0, "perc_from_top": 0, "perc_from_bottom": 1 }, { "className": "Point", "x": 934, "y": 368, "perc_from_left": 1, "perc_from_right": 0, "perc_from_top": 1, "perc_from_bottom": 0 }, { "className": "Point", "x": 906, "y": 368, "perc_from_left": 0, "perc_from_right": 1, "perc_from_top": 1, "perc_from_bottom": 0 }] }, { "className": "ShapeInstance", "name": "No Scroll", "objectName": "No Scroll", "points": [{ "className": "Point", "x": 1183, "y": 11, "perc_from_left": 0, "perc_from_right": 1, "perc_from_top": 0, "perc_from_bottom": 1 }, { "className": "Point", "x": 1394, "y": 11, "perc_from_left": 1, "perc_from_right": 0, "perc_from_top": 0, "perc_from_bottom": 1 }, { "className": "Point", "x": 1394, "y": 504, "perc_from_left": 1, "perc_from_right": 0, "perc_from_top": 1, "perc_from_bottom": 0 }, { "className": "Point", "x": 1183, "y": 504, "perc_from_left": 0, "perc_from_right": 1, "perc_from_top": 1, "perc_from_bottom": 0 }], "properties": { "freeDir": "left" } }, { "className": "ShapeInstance", "name": "No Scroll", "objectName": "No Scroll", "points": [{ "className": "Point", "x": 3, "y": 479, "perc_from_left": 0, "perc_from_right": 1, "perc_from_top": 0, "perc_from_bottom": 1 }, { "className": "Point", "x": 1154, "y": 479, "perc_from_left": 1, "perc_from_right": 0, "perc_from_top": 0, "perc_from_bottom": 1 }, { "className": "Point", "x": 1154, "y": 586, "perc_from_left": 1, "perc_from_right": 0, "perc_from_top": 1, "perc_from_bottom": 0 }, { "className": "Point", "x": 3, "y": 586, "perc_from_left": 0, "perc_from_right": 1, "perc_from_top": 1, "perc_from_bottom": 0 }], "properties": { "freeDir": "up" } }, { "className": "Instance", "name": "Node1", "objectName": "Node", "pos": { "className": "Point", "x": 377, "y": 404 }, "properties": { "neighbors": [{ "nodeName": "Node2", "ladderName": "Ladder1", "isJumpNode": true }] } }, { "className": "Instance", "name": "Node2", "objectName": "Node", "pos": { "className": "Point", "x": 376, "y": 275 }, "properties": { "neighbors": [{ "nodeName": "Node1", "ladderName": "Ladder1", "isDropNode": true }, { "nodeName": "Node3" }] } }, { "className": "Instance", "name": "Node3", "objectName": "Node", "pos": { "className": "Point", "x": 550, "y": 276 }, "properties": { "neighbors": [{ "nodeName": "Node2" }, { "nodeName": "Node6", "ladderName": "Ladder4", "isDropNode": true }, { "nodeName": "Node5" }] } }, { "className": "Instance", "name": "Node4", "objectName": "Node", "pos": { "className": "Point", "x": 568, "y": 146 }, "properties": { "neighbors": [{ "nodeName": "Node5", "ladderName": "Ladder2", "isDropNode": true }, { "nodeName": "Node9" }] } }, { "className": "Instance", "name": "Node5", "objectName": "Node", "pos": { "className": "Point", "x": 571, "y": 276 }, "properties": { "neighbors": [{ "nodeName": "Node3" }, { "nodeName": "Node4", "ladderName": "Ladder2", "isJumpNode": true }] } }, { "className": "Instance", "name": "Node6", "objectName": "Node", "pos": { "className": "Point", "x": 552, "y": 403 }, "properties": { "neighbors": [{ "nodeName": "Node3", "isJumpNode": true, "ladderName": "Ladder4" }, { "nodeName": "Node7" }] } }, { "className": "Instance", "name": "Node7", "objectName": "Node", "pos": { "className": "Point", "x": 919, "y": 402 }, "properties": { "neighbors": [{ "nodeName": "Node6" }, { "nodeName": "Node8", "ladderName": "Ladder6", "isJumpNode": true }] } }, { "className": "Instance", "name": "Node8", "objectName": "Node", "pos": { "className": "Point", "x": 921, "y": 274 }, "properties": { "neighbors": [{ "nodeName": "Node7", "isDropNode": true, "ladderName": "Ladder6" }] } }, { "className": "Instance", "name": "Node9", "objectName": "Node", "pos": { "className": "Point", "x": 666, "y": 146 }, "properties": { "neighbors": [{ "nodeName": "Node4" }, { "nodeName": "Node10", "ladderName": "Ladder3", "isDropNode": true }] } }, { "className": "Instance", "name": "Node10", "objectName": "Node", "pos": { "className": "Point", "x": 665, "y": 274 }, "properties": { "neighbors": [{ "nodeName": "Node9", "ladderName": "Ladder3", "isJumpNode": true }, { "nodeName": "Node11" }] } }, { "className": "Instance", "name": "Node11", "objectName": "Node", "pos": { "className": "Point", "x": 776, "y": 273 }, "properties": { "neighbors": [{ "nodeName": "Node10" }, { "nodeName": "Node12", "ladderName": "Ladder5", "isJumpNode": true }] } }, { "className": "Instance", "name": "Node12", "objectName": "Node", "pos": { "className": "Point", "x": 776, "y": 146 }, "properties": { "neighbors": [{ "nodeName": "Node11", "ladderName": "Ladder5", "isDropNode": true }] } }, { "className": "Instance", "name": "Spawn Point1", "objectName": "Spawn Point", "pos": { "className": "Point", "x": 465, "y": 277 }, "properties": {} }, { "className": "Instance", "name": "Spawn Point2", "objectName": "Spawn Point", "pos": { "className": "Point", "x": 409, "y": 149 }, "properties": {} }, { "className": "Instance", "name": "Spawn Point3", "objectName": "Spawn Point", "pos": { "className": "Point", "x": 723, "y": 278 }, "properties": {} }, { "className": "Instance", "name": "Spawn Point4", "objectName": "Spawn Point", "pos": { "className": "Point", "x": 998, "y": 147 }, "properties": {} }, { "className": "Instance", "name": "Spawn Point5", "objectName": "Spawn Point", "pos": { "className": "Point", "x": 611, "y": 403 }, "properties": {} }, { "className": "Instance", "name": "Spawn Point6", "objectName": "Spawn Point", "pos": { "className": "Point", "x": 1078, "y": 276 }, "properties": {} }, { "className": "Instance", "name": "Spawn Point7", "objectName": "Spawn Point", "pos": { "className": "Point", "x": 185, "y": 405 }, "properties": {} }, { "className": "Instance", "name": "Spawn Point8", "objectName": "Spawn Point", "pos": { "className": "Point", "x": 833, "y": 405 }, "properties": {} }, { "className": "Instance", "name": "Large Health1", "objectName": "Large Health", "pos": { "className": "Point", "x": 188, "y": 280 }, "properties": {}, "spriteName": "pickup_health_large" }, { "className": "Instance", "name": "Large Health2", "objectName": "Large Health", "pos": { "className": "Point", "x": 1065, "y": 407 }, "properties": {}, "spriteName": "pickup_health_large" }, { "className": "Instance", "name": "Large Health3", "objectName": "Large Health", "pos": { "className": "Point", "x": 191, "y": 152 }, "properties": {}, "spriteName": "pickup_health_large" }, { "className": "Instance", "name": "Small Health1", "objectName": "Small Health", "pos": { "className": "Point", "x": 19, "y": 403 }, "properties": {}, "spriteName": "pickup_health_small" }, { "className": "Instance", "name": "Small Health2", "objectName": "Small Health", "pos": { "className": "Point", "x": 724, "y": 410 }, "properties": {}, "spriteName": "pickup_health_small" }, { "className": "Instance", "name": "Small Ammo1", "objectName": "Small Ammo", "pos": { "className": "Point", "x": 1155, "y": 151 }, "properties": {}, "spriteName": "pickup_ammo_small" }], "name": "powerplant", "path": "assets/levels/powerplant.json", "backgroundPath": "assets/backgrounds/powerplant.png" }, { "className": "Level", "instances": [{ "className": "ShapeInstance", "name": "Collision Shape", "objectName": "Collision Shape", "points": [{ "className": "Point", "x": 22, "y": 194, "perc_from_left": 0, "perc_from_right": 1, "perc_from_top": 0, "perc_from_bottom": 1 }, { "className": "Point", "x": 271, "y": 194, "perc_from_left": 1, "perc_from_right": 0, "perc_from_top": 0, "perc_from_bottom": 1 }, { "className": "Point", "x": 271, "y": 210, "perc_from_left": 1, "perc_from_right": 0, "perc_from_top": 1, "perc_from_bottom": 0 }, { "className": "Point", "x": 22, "y": 210, "perc_from_left": 0, "perc_from_right": 1, "perc_from_top": 1, "perc_from_bottom": 0 }] }, { "className": "ShapeInstance", "name": "Collision Shape", "objectName": "Collision Shape", "points": [{ "className": "Point", "x": 22, "y": 0, "perc_from_left": 0, "perc_from_right": 1, "perc_from_top": 0, "perc_from_bottom": 1 }, { "className": "Point", "x": 37, "y": 0, "perc_from_left": 1, "perc_from_right": 0, "perc_from_top": 0, "perc_from_bottom": 1 }, { "className": "Point", "x": 37, "y": 196, "perc_from_left": 1, "perc_from_right": 0, "perc_from_top": 1, "perc_from_bottom": 0 }, { "className": "Point", "x": 22, "y": 196, "perc_from_left": 0, "perc_from_right": 1, "perc_from_top": 1, "perc_from_bottom": 0 }] }, { "className": "ShapeInstance", "name": "Collision Shape", "objectName": "Collision Shape", "points": [{ "className": "Point", "x": 263, "y": 4, "perc_from_left": 0, "perc_from_right": 1, "perc_from_top": 0, "perc_from_bottom": 1 }, { "className": "Point", "x": 279, "y": 4, "perc_from_left": 1, "perc_from_right": 0, "perc_from_top": 0, "perc_from_bottom": 1 }, { "className": "Point", "x": 279, "y": 195, "perc_from_left": 1, "perc_from_right": 0, "perc_from_top": 1, "perc_from_bottom": 0 }, { "className": "Point", "x": 263, "y": 195, "perc_from_left": 0, "perc_from_right": 1, "perc_from_top": 1, "perc_from_bottom": 0 }] }, { "className": "Instance", "name": "Spawn Point", "objectName": "Spawn Point", "pos": { "className": "Point", "x": 56, "y": 178 }, "properties": { "xDir": 1, "num": 0 } }, { "className": "Instance", "name": "Spawn Point", "objectName": "Spawn Point", "pos": { "className": "Point", "x": 240, "y": 177 }, "properties": { "xDir": -1, "num": 1 } }, { "className": "ShapeInstance", "name": "Collision Shape", "objectName": "Collision Shape", "points": [{ "className": "Point", "x": 37, "y": 4, "perc_from_left": 0, "perc_from_right": 1, "perc_from_top": 0, "perc_from_bottom": 1 }, { "className": "Point", "x": 265, "y": 4, "perc_from_left": 1, "perc_from_right": 0, "perc_from_top": 0, "perc_from_bottom": 1 }, { "className": "Point", "x": 265, "y": 28, "perc_from_left": 1, "perc_from_right": 0, "perc_from_top": 1, "perc_from_bottom": 0 }, { "className": "Point", "x": 37, "y": 28, "perc_from_left": 0, "perc_from_right": 1, "perc_from_top": 1, "perc_from_bottom": 0 }] }], "name": "sm_bossroom", "path": "assets/levels/sm_bossroom.json", "backgroundPath": "assets/backgrounds/sm_bossroom.png" }];
            exports_22("levelJsons", levelJsons);
        }
    };
});
System.register("tests", ["shape", "point"], function (exports_23, context_23) {
    "use strict";
    var __moduleName = context_23 && context_23.id;
    function runAllTests() {
        testGetIntersectPoint();
        testLinesSameY();
    }
    exports_23("runAllTests", runAllTests);
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
System.register("game", ["sprite", "level", "sprites", "levels", "color", "helpers", "gameMode"], function (exports_24, context_24) {
    "use strict";
    var __moduleName = context_24 && context_24.id;
    var sprite_1, level_1, sprites_1, levels_1, color_1, Helpers, gameMode_2, Options, Menu, UIData, Game, game;
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
            function (color_1_1) {
                color_1 = color_1_1;
            },
            function (Helpers_10) {
                Helpers = Helpers_10;
            },
            function (gameMode_2_1) {
                gameMode_2 = gameMode_2_1;
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
            exports_24("Menu", Menu);
            UIData = (function () {
                function UIData() {
                    this.isProd = false;
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
            exports_24("UIData", UIData);
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
                    this.doQuickStart = true;
                    this.timePassed = 0;
                    this.lag = 0;
                    this.MS_PER_UPDATE = 16.6666;
                    this.defaultCanvasWidth = 298;
                    this.defaultCanvasHeight = 224;
                    this.canvas = document.getElementById("canvas");
                    this.pixiApp = new PIXI.Application({ width: 298, height: 224, view: this.canvas, });
                    PIXI.settings.SCALE_MODE = PIXI.SCALE_MODES.NEAREST;
                    this.uiEl = $("#ui")[0];
                    this.uiCanvas = document.getElementById("ui-canvas");
                    this.uiCtx = this.uiCanvas.getContext("2d");
                }
                Game.prototype.quickStart = function () {
                    this.uiData.menu = Menu.None;
                    this.uiData.selectedArenaMap = "gallery";
                    this.uiData.selectedGameMode = "deathmatch";
                    this.uiData.maxPlayers = 0;
                    this.uiData.numBots = 0;
                    this.uiData.playTo = 20;
                    $("#options").show();
                    $("#dev-options").show();
                    game.loadLevel(this.uiData.selectedArenaMap);
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
                                game.loadLevel(selectedMap);
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
                                    game.level = undefined;
                                    if (game.music)
                                        game.music.stop();
                                    game.uiData.menu = Menu.MainMenu;
                                    $(game.canvasWrapper).hide();
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
                        "assets/spritesheets/effects.png",
                        "assets/spritesheets/MegamanX.png"
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
                        src: ["assets/music/menu.mp3"],
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
                    this.loadLevel(name);
                };
                Game.prototype.loadLevel = function (name) {
                    var _this = this;
                    var levelData = this.levelDatas[name];
                    if (!levelData) {
                        throw "Bad level";
                    }
                    this.level = new level_1.Level(levelData);
                    this.levelLoadInterval = window.setInterval(function () { return _this.startLevel(); }, 1);
                };
                Game.prototype.startLevel = function () {
                    if (this.isLoaded()) {
                        window.clearInterval(this.levelLoadInterval);
                        $(this.canvasWrapper).show();
                        $("#ui-canvas").show();
                        var gameMode = void 0;
                        if (this.uiData.isBrawl) {
                            gameMode = new gameMode_2.Brawl(this.level, this.uiData);
                        }
                        else if (this.uiData.selectedGameMode === "deathmatch") {
                            gameMode = new gameMode_2.FFADeathMatch(this.level, this.uiData);
                        }
                        else if (this.uiData.selectedGameMode === "team deathmatch") {
                            gameMode = new gameMode_2.TeamDeathMatch(this.level, this.uiData);
                        }
                        this.level.startLevel(gameMode);
                        this.gameLoop(0);
                    }
                };
                Game.prototype.loadImages = function (paths, callback) {
                    var _this = this;
                    for (var i = paths.length - 1; i >= 0; i--) {
                        var path = paths[i];
                        if (PIXI.utils.TextureCache[path]) {
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
                    for (var _i = 0, spriteJsons_1 = sprites_1.spriteJsons; _i < spriteJsons_1.length; _i++) {
                        var spriteJson = spriteJsons_1[_i];
                        var sprite = new sprite_1.Sprite(spriteJson, false, undefined);
                        this.sprites[sprite.name] = sprite;
                    }
                };
                Game.prototype.loadLevels = function () {
                    for (var _i = 0, levelJsons_1 = levels_1.levelJsons; _i < levelJsons_1.length; _i++) {
                        var levelJson = levelJsons_1[_i];
                        var levelData = new level_1.LevelData(levelJson);
                        this.levelDatas[levelJson.name] = levelData;
                    }
                };
                Game.prototype.loadPalettes = function () {
                    this.palettes["red"] = new color_1.Palette("assets/palettes/red.png");
                    this.palettes["boomerang"] = new color_1.Palette("assets/palettes/boomerang.png");
                    this.palettes["electric_spark"] = new color_1.Palette("assets/palettes/electric_spark.png");
                    this.palettes["fire_wave"] = new color_1.Palette("assets/palettes/fire_wave.png");
                    this.palettes["rolling_shield"] = new color_1.Palette("assets/palettes/rolling_shield.png");
                    this.palettes["shotgun_ice"] = new color_1.Palette("assets/palettes/shotgun_ice.png");
                    this.palettes["sting"] = new color_1.Palette("assets/palettes/sting.png");
                    this.palettes["tornado"] = new color_1.Palette("assets/palettes/tornado.png");
                    this.palettes["torpedo"] = new color_1.Palette("assets/palettes/torpedo.png");
                };
                Game.prototype.loadSounds = function () {
                    var _this = this;
                    for (var _i = 0, soundFiles_1 = soundFiles; _i < soundFiles_1.length; _i++) {
                        var soundFile = soundFiles_1[_i];
                        this.maxLoadCount++;
                        var sound = new Howl({
                            src: ["assets/sounds/" + soundFile],
                            onload: function () {
                                _this.loadCount++;
                            }
                        });
                        this.sounds[soundFile.split(".")[0]] = sound;
                    }
                    this.maxLoadCount++;
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
                            fireWave: [180000 + 4404, 478]
                        },
                        onload: function () {
                            _this.loadCount++;
                        }
                    });
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
                            this.level.update();
                            this.collisionCalls = 0;
                        }
                        this.level.render();
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
                    }
                    else {
                        var id = this.soundSheet.play(clip);
                        this.soundSheet.volume(volume * game.getSoundVolume01(), id);
                    }
                };
                Game.prototype.playClip = function (clip, volume) {
                    clip.volume(volume * game.getSoundVolume01());
                    return clip.play();
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
            exports_24("game", game);
            window.game = game;
        }
    };
});
System.register("shape", ["point", "rect", "collider", "game"], function (exports_25, context_25) {
    "use strict";
    var __moduleName = context_25 && context_25.id;
    var point_8, rect_5, collider_5, game_13, Line, IntersectData, Shape;
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
            function (game_13_1) {
                game_13 = game_13_1;
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
            exports_25("Line", Line);
            IntersectData = (function () {
                function IntersectData(intersectPoint, normal) {
                    this.intersectPoint = intersectPoint;
                    this.normal = normal;
                }
                return IntersectData;
            }());
            exports_25("IntersectData", IntersectData);
            Shape = (function () {
                function Shape(points) {
                    this.minX = Infinity;
                    this.minY = Infinity;
                    this.maxX = -Infinity;
                    this.maxY = -Infinity;
                    this.points = points;
                    var normals = [];
                    for (var i = 0; i < this.points.length; i++) {
                        var p1 = this.points[i];
                        var p2 = (i == this.points.length - 1 ? this.points[0] : this.points[i + 1]);
                        var v = new point_8.Point(p2.x - p1.x, p2.y - p1.y);
                        normals.push(v.leftNormal().normalize());
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
                    if (this.points[0].ix === this.points[3].ix && this.points[1].ix === this.points[2].ix && this.points[0].iy === this.points[1].iy && this.points[2].iy === this.points[3].iy) {
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
                    for (var _i = 0, lines_1 = lines; _i < lines_1.length; _i++) {
                        var myLine = lines_1[_i];
                        if (myLine.getIntersectPoint(line)) {
                            return true;
                        }
                    }
                    return false;
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
                    game_13.game.collisionCalls++;
                    var pointOutside = false;
                    for (var _i = 0, _a = this.points; _i < _a.length; _i++) {
                        var point = _a[_i];
                        if (!other.containsPoint(point)) {
                            pointOutside = true;
                            break;
                        }
                    }
                    var pointOutside2 = false;
                    for (var _b = 0, _c = other.points; _b < _c.length; _b++) {
                        var point = _c[_b];
                        if (!this.containsPoint(point)) {
                            pointOutside2 = true;
                            break;
                        }
                    }
                    if (!pointOutside || !pointOutside2) {
                        return new collider_5.HitData(undefined, undefined);
                    }
                    var lines1 = this.getLines();
                    var lines2 = other.getLines();
                    var hitNormals = [];
                    for (var _d = 0, lines1_1 = lines1; _d < lines1_1.length; _d++) {
                        var line1 = lines1_1[_d];
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
                    if (hitNormals.length === 0) {
                        return undefined;
                    }
                    for (var _e = 0, hitNormals_1 = hitNormals; _e < hitNormals_1.length; _e++) {
                        var normal = hitNormals_1[_e];
                        var ang = vel.times(-1).angleWith(normal);
                        if (ang < 90) {
                            return new collider_5.HitData(normal, undefined);
                        }
                    }
                    if (hitNormals.length > 0) {
                        return new collider_5.HitData(hitNormals[0], undefined);
                    }
                    return undefined;
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
                Shape.prototype.minMaxDotProd = function (normal) {
                    var min = null, max = null;
                    for (var _i = 0, _a = this.points; _i < _a.length; _i++) {
                        var point = _a[_i];
                        var dp = point.dotProduct(normal);
                        if (min === null || dp < min)
                            min = dp;
                        if (max === null || dp > max)
                            max = dp;
                    }
                    return [min, max];
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
                    game_13.game.collisionCalls++;
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
                    for (var _i = 0, thisNormals_1 = thisNormals; _i < thisNormals_1.length; _i++) {
                        var normal = thisNormals_1[_i];
                        var result = this.checkNormal(b, normal);
                        if (result)
                            correctionVectors.push(result);
                    }
                    for (var _a = 0, bNormals_1 = bNormals; _a < bNormals_1.length; _a++) {
                        var normal = bNormals_1[_a];
                        var result = this.checkNormal(b, normal);
                        if (result)
                            correctionVectors.push(result);
                    }
                    if (correctionVectors.length > 0) {
                        return _.minBy(correctionVectors, function (correctionVector) {
                            return correctionVector.magnitude;
                        });
                    }
                    return undefined;
                };
                Shape.prototype.getMinTransVectorDir = function (b, dir) {
                    dir = dir.normalize();
                    game_13.game.collisionCalls++;
                    var mag = 0;
                    var maxMag = 0;
                    for (var _i = 0, _a = this.points; _i < _a.length; _i++) {
                        var point = _a[_i];
                        var line = new Line(point, point.add(dir.times(10000)));
                        for (var _b = 0, _c = b.getLines(); _b < _c.length; _b++) {
                            var bLine = _c[_b];
                            var intersectPoint = bLine.getIntersectPoint(line);
                            if (intersectPoint) {
                                mag = point.distanceTo(intersectPoint);
                                if (mag > maxMag) {
                                    maxMag = mag;
                                }
                            }
                        }
                    }
                    for (var _d = 0, _e = b.points; _d < _e.length; _d++) {
                        var point = _e[_d];
                        var line = new Line(point, point.add(dir.times(-10000)));
                        for (var _f = 0, _g = this.getLines(); _f < _g.length; _f++) {
                            var myLine = _g[_f];
                            var intersectPoint = myLine.getIntersectPoint(line);
                            if (intersectPoint) {
                                mag = point.distanceTo(intersectPoint);
                                if (mag > maxMag) {
                                    maxMag = mag;
                                }
                            }
                        }
                    }
                    if (maxMag === 0) {
                        return undefined;
                    }
                    return dir.times(maxMag);
                };
                Shape.prototype.getSnapVector = function (b, dir) {
                    var mag = 0;
                    var minMag = Infinity;
                    for (var _i = 0, _a = this.points; _i < _a.length; _i++) {
                        var point = _a[_i];
                        var line = new Line(point, point.add(dir.times(10000)));
                        for (var _b = 0, _c = b.getLines(); _b < _c.length; _b++) {
                            var bLine = _c[_b];
                            var intersectPoint = bLine.getIntersectPoint(line);
                            if (intersectPoint) {
                                mag = point.distanceTo(intersectPoint);
                                if (mag < minMag) {
                                    minMag = mag;
                                }
                            }
                        }
                    }
                    if (mag === 0) {
                        return undefined;
                    }
                    return dir.times(minMag);
                };
                Shape.prototype.clone = function (x, y) {
                    var points = [];
                    for (var _i = 0, _a = this.points; _i < _a.length; _i++) {
                        var point = _a[_i];
                        points.push(new point_8.Point(point.x + x, point.y + y));
                    }
                    return new Shape(points);
                };
                return Shape;
            }());
            exports_25("Shape", Shape);
        }
    };
});
System.register("rect", ["point", "shape"], function (exports_26, context_26) {
    "use strict";
    var __moduleName = context_26 && context_26.id;
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
                return Rect;
            }());
            exports_26("Rect", Rect);
        }
    };
});
System.register("helpers", ["point", "game"], function (exports_27, context_27) {
    "use strict";
    var __moduleName = context_27 && context_27.id;
    function inRect(x, y, rect) {
        var rx = rect.x1;
        var ry = rect.y1;
        var rx2 = rect.x2;
        var ry2 = rect.y2;
        return x >= rx && x <= rx2 && y >= ry && y <= ry2;
    }
    exports_27("inRect", inRect);
    function inCircle(x, y, circleX, circleY, r) {
        if (Math.sqrt(Math.pow(x - circleX, 2) + Math.pow(y - circleY, 2)) <= r) {
            return true;
        }
        return false;
    }
    exports_27("inCircle", inCircle);
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
    exports_27("toZero", toZero);
    function incrementRange(num, min, max) {
        num++;
        if (num >= max)
            num = min;
        return num;
    }
    exports_27("incrementRange", incrementRange);
    function decrementRange(num, min, max) {
        num--;
        if (num < min)
            num = max - 1;
        return num;
    }
    exports_27("decrementRange", decrementRange);
    function clamp01(num) {
        if (num < 0)
            num = 0;
        if (num > 1)
            num = 1;
        return num;
    }
    exports_27("clamp01", clamp01);
    function randomRange(start, end) {
        return _.random(start, end);
    }
    exports_27("randomRange", randomRange);
    function clampMax(num, max) {
        return num < max ? num : max;
    }
    exports_27("clampMax", clampMax);
    function clampMin(num, min) {
        return num > min ? num : min;
    }
    exports_27("clampMin", clampMin);
    function clampMin0(num) {
        return clampMin(num, 0);
    }
    exports_27("clampMin0", clampMin0);
    function clamp(num, min, max) {
        if (num < min)
            return min;
        if (num > max)
            return max;
        return num;
    }
    exports_27("clamp", clamp);
    function sin(degrees) {
        var rads = degrees * Math.PI / 180;
        return Math.sin(rads);
    }
    exports_27("sin", sin);
    function cos(degrees) {
        var rads = degrees * Math.PI / 180;
        return Math.cos(rads);
    }
    exports_27("cos", cos);
    function atan(value) {
        return Math.atan(value) * 180 / Math.PI;
    }
    exports_27("atan", atan);
    function moveTo(num, dest, inc) {
        inc *= Math.sign(dest - num);
        num += inc;
        return num;
    }
    exports_27("moveTo", moveTo);
    function lerp(num, dest, timeScale) {
        num = num + (dest - num) * timeScale;
        return num;
    }
    exports_27("lerp", lerp);
    function lerpNoOver(num, dest, timeScale) {
        num = num + (dest - num) * timeScale;
        if (Math.abs(num - dest) < 1)
            num = dest;
        return num;
    }
    exports_27("lerpNoOver", lerpNoOver);
    function lerpAngle(angle, destAngle, timeScale) {
        var dir = 1;
        if (Math.abs(destAngle - angle) > 180) {
            dir = -1;
        }
        angle = angle + dir * (destAngle - angle) * timeScale;
        return to360(angle);
    }
    exports_27("lerpAngle", lerpAngle);
    function to360(angle) {
        if (angle < 0)
            angle += 360;
        if (angle > 360)
            angle -= 360;
        return angle;
    }
    exports_27("to360", to360);
    function getHex(r, g, b, a) {
        return "#" + r.toString(16) + g.toString(16) + b.toString(16) + a.toString(16);
    }
    exports_27("getHex", getHex);
    function roundEpsilon(num) {
        var numRound = Math.round(num);
        var diff = Math.abs(numRound - num);
        if (diff < 0.0001) {
            return numRound;
        }
        return num;
    }
    exports_27("roundEpsilon", roundEpsilon);
    function getAutoIncId() {
        autoInc++;
        return autoInc;
    }
    exports_27("getAutoIncId", getAutoIncId);
    function stringReplace(str, pattern, replacement) {
        return str.replace(new RegExp(pattern, 'g'), replacement);
    }
    exports_27("stringReplace", stringReplace);
    function noCanvasSmoothing(c) {
        c.webkitImageSmoothingEnabled = false;
        c.mozImageSmoothingEnabled = false;
        c.imageSmoothingEnabled = false;
    }
    exports_27("noCanvasSmoothing", noCanvasSmoothing);
    function drawImage(ctx, imgEl, sX, sY, sW, sH, x, y, flipX, flipY, options, alpha, palette, scaleX, scaleY) {
        if (!sW) {
            if (window.debugBackground) {
            }
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
        if (window.playerDebug)
            game_14.game.level.debugString = "y: " + y;
        ctx.drawImage(helperCanvas, x, y);
        ctx.globalAlpha = 1;
        helperCtx.restore();
    }
    exports_27("drawImage", drawImage);
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
    exports_27("drawRect", drawRect);
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
    exports_27("drawPolygon", drawPolygon);
    function isSupportedBrowser() {
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
    exports_27("isSupportedBrowser", isSupportedBrowser);
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
    exports_27("drawTextMMX", drawTextMMX);
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
    exports_27("drawText", drawText);
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
    exports_27("drawCircle", drawCircle);
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
    exports_27("drawLine", drawLine);
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
    exports_27("linepointNearestMouse", linepointNearestMouse);
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
    exports_27("inLine", inLine);
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
    exports_27("getInclinePushDir", getInclinePushDir);
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
    exports_27("keyCodeToString", keyCodeToString);
    var point_10, game_14, autoInc, helperCanvas, helperCtx, helperCanvas2, helperCtx2, helperCanvas3, helperCtx3;
    return {
        setters: [
            function (point_10_1) {
                point_10 = point_10_1;
            },
            function (game_14_1) {
                game_14 = game_14_1;
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
System.register("point", ["helpers"], function (exports_28, context_28) {
    "use strict";
    var __moduleName = context_28 && context_28.id;
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
            exports_28("Point", Point);
        }
    };
});
System.register("collider", ["point", "shape"], function (exports_29, context_29) {
    "use strict";
    var __moduleName = context_29 && context_29.id;
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
            exports_29("Collider", Collider);
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
            exports_29("CollideData", CollideData);
            HitData = (function () {
                function HitData(normal, hitPoint) {
                    this.normal = normal;
                    this.hitPoint = hitPoint;
                }
                return HitData;
            }());
            exports_29("HitData", HitData);
        }
    };
});
System.register("frame", [], function (exports_30, context_30) {
    "use strict";
    var __moduleName = context_30 && context_30.id;
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
            exports_30("Frame", Frame);
        }
    };
});
System.register("sprite", ["collider", "frame", "point", "rect", "helpers"], function (exports_31, context_31) {
    "use strict";
    var __moduleName = context_31 && context_31.id;
    var collider_6, frame_1, point_12, rect_6, Helpers, Sprite;
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
            function (Helpers_12) {
                Helpers = Helpers_12;
            }
        ],
        execute: function () {
            Sprite = (function () {
                function Sprite(spriteJson, shouldInit, container) {
                    this.spriteJson = spriteJson;
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
                    for (var _i = 0, _a = spriteJson.hitboxes; _i < _a.length; _i++) {
                        var hitboxJson = _a[_i];
                        var hitbox = new collider_6.Collider([
                            new point_12.Point(hitboxJson.offset.x, hitboxJson.offset.y),
                            new point_12.Point(hitboxJson.offset.x + hitboxJson.width, hitboxJson.offset.y),
                            new point_12.Point(hitboxJson.offset.x + hitboxJson.width, hitboxJson.offset.y + hitboxJson.height),
                            new point_12.Point(hitboxJson.offset.x, hitboxJson.offset.y + hitboxJson.height)
                        ], hitboxJson.isTrigger ? true : false, undefined, false, false);
                        this.hitboxes.push(hitbox);
                    }
                    for (var _b = 0, _c = spriteJson.frames; _b < _c.length; _b++) {
                        var frameJson = _c[_b];
                        var frame = new frame_1.Frame(new rect_6.Rect(frameJson.rect.topLeftPoint.x, frameJson.rect.topLeftPoint.y, frameJson.rect.botRightPoint.x, frameJson.rect.botRightPoint.y), frameJson.duration, new point_12.Point(frameJson.offset.x, frameJson.offset.y));
                        if (frameJson.POIs) {
                            for (var _d = 0, _e = frameJson.POIs; _d < _e.length; _d++) {
                                var poi = _e[_d];
                                frame.POIs.push(new point_12.Point(poi.x, poi.y));
                            }
                        }
                        this.frames.push(frame);
                    }
                    if (shouldInit) {
                        this.initSprite(container);
                    }
                }
                Object.defineProperty(Sprite.prototype, "spritesheet", {
                    get: function () {
                        return PIXI.loader.resources[this.spritesheetPath].texture.baseTexture.source;
                    },
                    enumerable: true,
                    configurable: true
                });
                Sprite.prototype.initSprite = function (container) {
                    var textureArray = [];
                    for (var _i = 0, _a = this.frames; _i < _a.length; _i++) {
                        var frame = _a[_i];
                        var texture = new PIXI.Texture(PIXI.loader.resources[this.spritesheetPath].texture.baseTexture);
                        texture.frame = new PIXI.Rectangle(frame.rect.x1, frame.rect.y1, frame.rect.w, frame.rect.h);
                        textureArray.push(texture);
                    }
                    this.pixiSprite = new PIXI.extras.AnimatedSprite(textureArray);
                    var anchor = this.getAnchor();
                    this.pixiSprite.anchor.x = anchor.x;
                    this.pixiSprite.anchor.y = anchor.y;
                    this.pixiSprite.animationSpeed = 0;
                    container.addChild(this.pixiSprite);
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
                    this.pixiSprite.gotoAndStop(frameIndex);
                    this.pixiSprite.x = x;
                    this.pixiSprite.y = y;
                    this.pixiSprite.scale.x = flipX;
                    this.pixiSprite.scale.y = flipY;
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
            exports_31("Sprite", Sprite);
        }
    };
});
System.register("actor", ["sprite", "point", "game", "helpers"], function (exports_32, context_32) {
    "use strict";
    var __moduleName = context_32 && context_32.id;
    var sprite_2, point_13, game_15, Helpers, Actor, Anim;
    return {
        setters: [
            function (sprite_2_1) {
                sprite_2 = sprite_2_1;
            },
            function (point_13_1) {
                point_13 = point_13_1;
            },
            function (game_15_1) {
                game_15 = game_15_1;
            },
            function (Helpers_13) {
                Helpers = Helpers_13;
            }
        ],
        execute: function () {
            Actor = (function () {
                function Actor(sprite, pos, dontAddToLevel) {
                    this.renderEffectTime = 0;
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
                    this.renderEffect = "";
                    this.changeSprite(sprite, true);
                    if (!dontAddToLevel) {
                        game_15.game.level.addGameObject(this);
                    }
                }
                Actor.prototype.changeSprite = function (sprite, resetFrame) {
                    if (!sprite)
                        return;
                    if (this.sprite && this.sprite.pixiSprite) {
                        game_15.game.level.gameContainer.removeChild(this.sprite.pixiSprite);
                    }
                    this.sprite = new sprite_2.Sprite(sprite.spriteJson, true, game_15.game.level.gameContainer);
                    for (var _i = 0, _a = this.sprite.hitboxes; _i < _a.length; _i++) {
                        var hitbox = _a[_i];
                        hitbox.actor = this;
                    }
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
                    this.renderEffectTime = Helpers.clampMin0(this.renderEffectTime - game_15.game.deltaTime);
                    if (this.renderEffectTime <= 0) {
                        this.renderEffect = "";
                    }
                    this.frameTime += game_15.game.deltaTime * this.frameSpeed;
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
                        this.vel.y += game_15.game.level.gravity * game_15.game.deltaTime;
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
                            yDist = 300 * game_15.game.deltaTime;
                        }
                        var collideData = game_15.game.level.checkCollisionActor(this, 0, yDist);
                        if (collideData && this.vel.y >= 0) {
                            this.grounded = true;
                            this.vel.y = 0;
                            var yVel = new point_13.Point(0, yDist);
                            var mtv = game_15.game.level.getMtvDir(this, 0, yDist, yVel, false, [collideData]);
                            if (mtv) {
                                this.incPos(yVel);
                                this.incPos(mtv.unitInc(0.01));
                            }
                        }
                        else {
                            this.grounded = false;
                        }
                    }
                    var triggerList = game_15.game.level.getTriggerList(this, 0, 0);
                    for (var _i = 0, triggerList_1 = triggerList; _i < triggerList_1.length; _i++) {
                        var trigger = triggerList_1[_i];
                        this.registerCollision(trigger);
                    }
                };
                Actor.prototype.incPos = function (amount) {
                    if (this.collider)
                        game_15.game.level.removeFromGrid(this);
                    this.pos.inc(amount);
                    if (this.collider)
                        game_15.game.level.addGameObjectToGrid(this);
                };
                Actor.prototype.changePos = function (newPos) {
                    if (this.collider)
                        game_15.game.level.removeFromGrid(this);
                    this.pos = newPos;
                    if (this.collider)
                        game_15.game.level.addGameObjectToGrid(this);
                };
                Actor.prototype.preUpdate = function () {
                    this.collidedInFrame.clear();
                };
                Actor.prototype.sweepTest = function (offset) {
                    var inc = offset.clone();
                    var collideData = game_15.game.level.checkCollisionActor(this, inc.x, inc.y);
                    if (collideData) {
                        return true;
                    }
                    return false;
                };
                Actor.prototype.move = function (amount, useDeltaTime, pushIncline, snapInclineGravity) {
                    if (useDeltaTime === void 0) { useDeltaTime = true; }
                    if (pushIncline === void 0) { pushIncline = true; }
                    if (snapInclineGravity === void 0) { snapInclineGravity = true; }
                    var times = useDeltaTime ? game_15.game.deltaTime : 1;
                    if (!this.collider) {
                        this.pos.inc(amount.times(times));
                    }
                    else {
                        this.freeFromCollision();
                        var inc = amount.clone();
                        var incAmount = inc.multiply(times);
                        var mtv = game_15.game.level.getMtvDir(this, incAmount.x, incAmount.y, incAmount, pushIncline);
                        this.incPos(incAmount);
                        if (mtv) {
                            this.incPos(mtv.unitInc(0.01));
                        }
                        this.freeFromCollision();
                    }
                };
                Actor.prototype.freeFromCollision = function () {
                    var currentCollideDatas = game_15.game.level.getAllCollideDatas(this, 0, 0, undefined);
                    for (var _i = 0, currentCollideDatas_1 = currentCollideDatas; _i < currentCollideDatas_1.length; _i++) {
                        var collideData = currentCollideDatas_1[_i];
                        var freeVec = this.collider.shape.getMinTransVector(collideData.collider.shape);
                        this.incPos(freeVec.unitInc(0.01));
                    }
                };
                Actor.prototype.isRollingShield = function () {
                    return this.constructor.name === "RollingShieldProj";
                };
                Actor.prototype.render = function (x, y) {
                    var offsetX = this.xDir * this.currentFrame.offset.x;
                    var offsetY = this.yDir * this.currentFrame.offset.y;
                    if (this.angle === undefined) {
                        this.sprite.draw(this.frameIndex, this.pos.x + x + offsetX, this.pos.y + y + offsetY, this.xDir, this.yDir, this.renderEffect, 1, this.palette);
                    }
                    else {
                        this.renderFromAngle(x, y);
                    }
                    if (game_15.game.options.showHitboxes && this.collider) {
                        Helpers.drawPolygon(game_15.game.uiCtx, this.collider.shape.clone(x, y), true, "blue", "", 0, 0.5);
                        Helpers.drawCircle(game_15.game.uiCtx, this.pos.x + x, this.pos.y + y, 1, "red");
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
                    game_15.game.level.removeGameObject(this);
                    if (sprite) {
                        var anim = new Anim(this.pos, sprite, this.xDir);
                    }
                    if (fadeSound) {
                        this.playSound(fadeSound);
                    }
                    game_15.game.level.gameContainer.removeChild(this.sprite.pixiSprite);
                };
                Actor.prototype.getSoundVolume = function () {
                    var dist = new point_13.Point(game_15.game.level.camCenterX, game_15.game.level.camCenterY).distanceTo(this.pos);
                    var volume = 1 - (dist / (game_15.game.level.screenWidth));
                    volume = Helpers.clampMin0(volume);
                    return volume;
                };
                Actor.prototype.playSound = function (soundName, overrideVolume) {
                    var volume = this.getSoundVolume();
                    if (overrideVolume !== undefined)
                        volume = overrideVolume;
                    volume = Helpers.clampMin0(volume);
                    game_15.game.playSound(soundName, volume);
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
            exports_32("Actor", Actor);
            Anim = (function (_super) {
                __extends(Anim, _super);
                function Anim(pos, sprite, xDir) {
                    var _this = _super.call(this, sprite, new point_13.Point(pos.x, pos.y), undefined) || this;
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
            exports_32("Anim", Anim);
        }
    };
});
var soundFiles = ["charge_loop.wav", "charge_start.wav", "csting.wav", "dash.wav", "die.wav", "explosion.wav", "heal.wav", "hit.wav", "hurt.wav", "jump.wav", "land.wav", "torpedo.wav", "weakness.wav"];
System.register("vue", [], function (exports_33, context_33) {
    "use strict";
    var __moduleName = context_33 && context_33.id;
    function startVue() {
    }
    exports_33("startVue", startVue);
    return {
        setters: [],
        execute: function () {
        }
    };
});
//# sourceMappingURL=main.js.map