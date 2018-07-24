import { Actor, Anim } from "./actor";
import { Sprite } from "./sprite";
import { game } from "./game";
import { Point } from "./point";
import { Player } from "./player";
import { Collider } from "./collider";
import { Rect } from "./rect";
import { Projectile } from "./projectile";
import * as Helpers from "./helpers";
import { Weapon, Buster, FireWave, Torpedo, Sting, RollingShield } from "./weapon";
import { ChargeEffect, DieEffect } from "./effects";
import { AI } from "./ai";
import { Ladder } from "./wall";
import { KillFeedEntry } from "./killFeedEntry";
import { FFADeathMatch, Brawl } from "./gameMode";

export class Character extends Actor {

  charState: CharState;
  player: Player;
  runSpeed: number;
  isDashing: boolean;
  shootTime: number = 0;
  jumpPower: number;
  changedStateInFrame: boolean;
  chargeTime: number;
  charge1Time: number;
  charge2Time: number;
  charge3Time: number;
  chargeFlashTime: number;
  chargeSound: Howl;
  chargeSoundId: number;
  chargeLoopSound: Howl;
  chargeLoopSoundId: number;
  chargeEffect: ChargeEffect;
  shootAnimTime: number = 0;
  ai: AI;
  projectileCooldown: { [name: string]: number } = {};  //Player id + projectile name
  invulnFrames: number = 0;
  checkLadderDown: boolean = false;
  dashedInAir: boolean = false;
  dead: boolean = false;
  healAmount: number = 0;
  healTime: number = 0;
  weaponHealAmount: number = 0;
  weaponHealTime: number = 0;
  characterTag: PIXI.Container;
  nameTag: PIXI.Text;
  healthBarBorder: PIXI.Graphics;
  healthBarOuter: PIXI.Graphics;
  healthBarInner: PIXI.Graphics;
  healthBarInnerWidth: number;

  constructor(player: Player, x: number, y: number) {
    super(undefined, new Point(x, y), true);
    this.player = player;
    this.isDashing = false;

    this.globalCollider = this.getStandingCollider();
    
    this.changeState(new Idle());
    
    this.jumpPower = 230;
    this.runSpeed = 80;

    this.chargeTime = 0;
    this.charge1Time = 0.75;
    this.charge2Time = 1.75;
    this.charge3Time = 3;

    this.chargeFlashTime = 0;
    this.chargeSound = game.sounds["charge_start"];
    this.chargeLoopSound = game.sounds["charge_loop"];
    this.chargeLoopSound.loop(true);

    if(this.player !== game.level.mainPlayer) {
      this.zIndex = ++game.level.zChar;
    }
    else {
      this.zIndex = game.level.zMainPlayer;
    }

    game.level.addGameObject(this);

    this.chargeEffect = new ChargeEffect();

    if(game.level.gameMode.isTeamMode || game.level.gameMode.isBrawl) {

      if(game.level.gameMode.isTeamMode) {
        this.characterTag = new PIXI.Container();
        game.level.gameUIContainer.addChild(this.characterTag);

        this.nameTag = Helpers.createAndDrawText(this.characterTag, this.player.name, 0, 0, 6, "", "", this.player.alliance === 1);
        this.healthBarBorder = Helpers.createAndDrawRect(this.characterTag, new Rect(0, 0, 30, 6), 0xFFFFFF);
        this.healthBarBorder.x = -15;
        this.healthBarBorder.y = 5;
        this.healthBarOuter = Helpers.createAndDrawRect(this.characterTag, new Rect(0, 1, 28, 5), 0x000000);
        this.healthBarOuter.x = -15 + 1;
        this.healthBarOuter.y = 5;
        this.healthBarInner = Helpers.createAndDrawRect(this.characterTag, new Rect(0, 2, 26, 4), 0xFFFFFF);
        this.healthBarInner.x = -15 + 2;
        this.healthBarInner.y = 5;

        this.healthBarInnerWidth = this.healthBarInner.width;
        this.characterTag.visible = false;
      }

      if(this.player.alliance === 0) {
        this.renderEffects.add("blueshadow");
      }
      else {
        this.renderEffects.add("redshadow");
      }
    }
  }

  getStandingCollider() {
    let rect = new Rect(0, 0, 18, 34);
    return new Collider(rect.getPoints(), false, this, false, false);
  }

  getDashingCollider() {
    let rect = new Rect(0, 0, 18, 22);
    return new Collider(rect.getPoints(), false, this, false, false);
  }

  preUpdate() {
    super.preUpdate();
    this.changedStateInFrame = false;
  }

  update() {

    if(game.level.levelData.killY !== undefined && this.pos.y > game.level.levelData.killY) {
      this.applyDamage(undefined, undefined, this.player.maxHealth * 2);
    }
    else if(game.level.isInKillZone(this)) {
      this.applyDamage(undefined, undefined, this.player.maxHealth * 2);
    }

    if(this.player.health >= this.player.maxHealth) {
      this.healAmount = 0;
    }
    if(this.healAmount > 0 && this.player.health > 0) {
      this.healTime += game.deltaTime;
      if(this.healTime > 0.05) {
        this.healTime = 0;
        this.healAmount--;
        this.player.health = Helpers.clampMax(this.player.health + 1, this.player.maxHealth);
        this.playSound("heal");
      }
    }
    if(this.player.weapon.ammo >= this.player.weapon.maxAmmo) {
      this.weaponHealAmount = 0;
    }
    if(this.weaponHealAmount > 0 && this.player.health > 0) {
      this.weaponHealTime += game.deltaTime;
      if(this.weaponHealTime > 0.05) {
        this.weaponHealTime = 0;
        this.weaponHealAmount--;
        this.player.weapon.ammo = Helpers.clampMax(this.player.weapon.ammo + 1, this.player.weapon.maxAmmo);
        this.playSound("heal");
      }
    }

    if(!(this.charState instanceof Dash) && !(this.charState instanceof AirDash) && !(this.charState instanceof Die)) {
      let standingCollider = this.getStandingCollider();
      if(!game.level.checkCollisionShape(standingCollider.shape, [this])) {
        this.globalCollider = standingCollider;
      }
    }

    if(this.player.alliance === 0) {
      //game.level.debugString = "y: " + this.pos.y;
    }

    for(let projName in this.projectileCooldown) {
      let cooldown = this.projectileCooldown[projName];
      if(cooldown) {
        this.projectileCooldown[projName] = Helpers.clampMin(cooldown - game.deltaTime, 0);
      }
    }
    if(this.shootAnimTime > 0) {
      this.shootAnimTime -= game.deltaTime;
      if(this.shootAnimTime <= 0) {
        this.shootAnimTime = 0;
        this.changeSprite(this.charState.sprite, false);
      }
    }
    if(this.invulnFrames > 0) {
      this.invulnFrames = Helpers.clampMin0(this.invulnFrames - game.deltaTime);
      if(game.level.twoFrameCycle > 0) {
        this.renderEffects.add("hit");
      }
      else {
        this.renderEffects.delete("hit");
        this.renderEffects.delete("flash");
      }
      
      if(this.invulnFrames <= 0) {
        //@ts-ignore
        this.renderEffects.delete("hit");
        this.renderEffects.delete("flash");
      } 
    }
    
    if(this.ai) {
      this.ai.update();
    }
    this.charState.update();
    super.update();

    this.player.weapon.update();
    if(this.charState.canShoot) {
      if(this.player.weapon.canShoot(this.player) && this.shootTime === 0 &&
        (
          this.player.isPressed("shoot") ||  
          (this.player.isHeld("shoot") && this.player.weapon instanceof FireWave)
        )
      ) {
        this.shoot();
      }
      if(this.player.isHeld("shoot") && this.player.weapon.ammo > 0) {
        this.chargeTime += game.deltaTime;
      }
      else {
        if(this.isCharging()) {
          this.shoot();
          this.stopCharge();
        }
      }
    }
    if(this.shootTime > 0) {
      this.shootTime -= game.deltaTime;
      if(this.shootTime <= 0) {
        if(this.player.isHeld("shoot") && this.player.weapon instanceof FireWave) {
          this.shootTime = 0;
        }
        else {
          this.shootTime = 0;
        }
      }
    }
    if(this.player.isPressed("weaponleft")) {
      this.changeWeapon(Helpers.decrementRange(this.player.weaponIndex, 0, this.player.weapons.length));
    }
    else if(this.player.isPressed("weaponright")) {
      this.changeWeapon(Helpers.incrementRange(this.player.weaponIndex, 0, this.player.weapons.length));
    }
    else if(this.player.isPressed("weapon1")) this.changeWeapon(0);
    else if(this.player.isPressed("weapon2")) this.changeWeapon(1);
    else if(this.player.isPressed("weapon3")) this.changeWeapon(2);
    else if(this.player.isPressed("weapon4")) this.changeWeapon(3);
    else if(this.player.isPressed("weapon5")) this.changeWeapon(4);
    else if(this.player.isPressed("weapon6")) this.changeWeapon(5);
    else if(this.player.isPressed("weapon7")) this.changeWeapon(6);
    else if(this.player.isPressed("weapon8")) this.changeWeapon(7);
    else if(this.player.isPressed("weapon9")) this.changeWeapon(8);
    
    if(this.isCharging()) {
      let maxFlashTime = 0.1;
      if(!this.chargeSoundId && !this.chargeLoopSoundId) {
        this.chargeSoundId = game.playClip(this.chargeSound, this.getSoundVolume());
      }
      if(this.chargeSoundId && !this.chargeSound.playing(this.chargeSoundId)) {
        this.chargeSoundId = undefined;
        this.chargeLoopSoundId = game.playClip(this.chargeLoopSound, this.getSoundVolume());
      }
      this.chargeFlashTime += game.deltaTime;
      if(this.chargeFlashTime > maxFlashTime) {
        this.chargeFlashTime = 0;
      }
      if(this.chargeFlashTime > maxFlashTime * 0.5) {        
        this.renderEffects.add("flash");
      }
      else {
        this.renderEffects.delete("hit");
        this.renderEffects.delete("flash");
      }
      this.chargeEffect.update(this.pos, this.getChargeLevel());
    }
  }

  changeWeapon(newWeaponIndex: number) {
    if(this.charState.constructor.name === "Die") return;
    this.player.weaponIndex = newWeaponIndex;
    this.changePaletteWeapon(); 
  }

  changePaletteWeapon() {
    this.palette = this.player.weapon.palette;
  }

  getCenterPos() {
    return this.pos.addxy(0, -18);
  }

  getCamCenterPos() {
    return this.pos.addxy(0, -24);
  }

  setFall() {
    this.changeState(new Fall());
  }

  isClimbingLadder() {
    return this.charState.constructor.name === "LadderClimb";
  }

  addAI() {
    this.ai = new AI(this);
  }

  drawCharge() {
  }

  isCharging() {
    return this.chargeTime >= this.charge1Time;
  }

  getDashSpeed() {
    if(this.isDashing) return 2;
    return 1;
  }

  getShootPos() {
    let busterOffsetPos = this.currentFrame.getBusterOffset();
    if(!busterOffsetPos) {
      console.log(this.frameIndex);
      console.log(this.sprite.name);
      throw "No buster offset!";
    }
    let busterOffset = busterOffsetPos.clone();
    busterOffset.x *= this.xDir;
    if(this.player.weapon instanceof RollingShield && this.charState.constructor.name === "Dash") {
      busterOffset.y -= 2;
    }
    return this.pos.add(busterOffset);
  }

  stopCharge() {
    this.chargeTime = 0;
    //this.renderEffect = "";
    this.chargeFlashTime = 0;
    if(this.chargeSoundId) {
      this.chargeSound.stop(this.chargeSoundId);
      this.chargeSoundId = undefined;
    }
    if(this.chargeLoopSoundId) {
      this.chargeLoopSound.stop(this.chargeLoopSoundId);
      this.chargeLoopSoundId = undefined;
    }
    this.chargeEffect.stop();
  }

  shoot() {
    if(this.shootTime > 0) return;
    if(this.player.weapon.ammo <= 0) return;
    this.shootTime = this.player.weapon.rateOfFire;
    if(this.shootAnimTime === 0) {
      this.changeSprite(this.charState.shootSprite, false);
    }
    else if(this.charState instanceof Idle) {
      this.frameIndex = 0;
      this.frameTime = 0;
    }
    if(this.charState instanceof LadderClimb) {
      if(this.player.isHeld("left")) {
        this.xDir = -1;
      }
      else if(this.player.isHeld("right")) {
        this.xDir = 1;
      }
    }

    //Sometimes transitions cause the shoot sprite not to be played immediately, so force it here
    if(!this.currentFrame.getBusterOffset()) { 
      this.changeSprite(this.charState.shootSprite, false);
    }
    
    this.shootAnimTime = 0.3;
    let xDir = this.xDir;
    if(this.charState instanceof WallSlide) xDir *= -1;
    this.player.weapon.shoot(this.getShootPos(), xDir, this.player, this.getChargeLevel());
    this.chargeTime = 0;
    
  }

  getChargeLevel() {
    if(this.chargeTime < this.charge1Time) {
      return 0;
    }
    else if(this.chargeTime >= this.charge1Time && this.chargeTime < this.charge2Time) {
      return 1;
    }
    else if(this.chargeTime >= this.charge2Time && this.chargeTime < this.charge3Time) {
      return 2;
    }
    else if(this.chargeTime >= this.charge3Time) {
      return 3;
    }
  }

  changeState(newState: CharState, forceChange?: boolean) {
    if(this.charState && newState && this.charState.constructor === newState.constructor) return;
    if(this.changedStateInFrame && !forceChange) return;
    this.changedStateInFrame = true;
    newState.character = this;
    if(this.shootAnimTime === 0 || !newState.canShoot) {
      this.changeSprite(newState.sprite, true);
    }
    else { 
      this.changeSprite(newState.shootSprite, true);
    }
    let oldState = this.charState;
    if(oldState) oldState.onExit(newState);
    this.charState = newState;
    newState.onEnter(oldState);
    
    if(!newState.canShoot) {
      this.shootTime = 0;
      this.shootAnimTime = 0;
    }
  }
  
  render(x: number, y: number) {
    super.render(x, y);
    if(this.chargeEffect) {
      this.chargeEffect.render(this.getCenterPos().add(new Point(x, y)), this.getChargeLevel())
    }
    if(game.level.gameMode.isTeamMode && this.charState instanceof Die) {
      this.characterTag.visible = false;
    }
    else if(game.level.gameMode.isTeamMode
      && this.player !== game.level.mainPlayer
      && this.player.alliance === game.level.mainPlayer.alliance
    ) {
      this.characterTag.visible = true;
      this.characterTag.x = this.pos.x + x;
      this.characterTag.y = this.pos.y + y - 47;

      let healthPct = this.player.health / this.player.maxHealth;
      this.healthBarInner.width = Helpers.clampMax(Math.ceil(this.healthBarInnerWidth * healthPct), this.healthBarInnerWidth);
      if(healthPct > 0.66) this.healthBarInner.tint = 0x00FF00;
      else if(healthPct <= 0.66 && healthPct >= 0.33) this.healthBarInner.tint = 0xFFFF00;
      else if(healthPct < 0.33) this.healthBarInner.tint = 0xFF0000;
    }
  }
  
  applyDamage(attacker: Player, weapon: Weapon, damage: number) {
    this.player.health -= damage;
    if(this.player.health <= 0) {
      this.player.health = 0;
      if(!this.dead) {
        this.dead = true;
        this.changeState(new Die(), true);
        if(attacker) attacker.kills++;
        this.player.deaths++;
        game.level.gameMode.addKillFeedEntry(new KillFeedEntry(attacker, this.player, weapon));
      }
    }
  }

  addHealth(amount: number) {
    this.healAmount += amount;
  }

  addAmmo(amount: number) {
    this.player.weapon.ammo += amount;
    if(this.player.weapon.ammo > this.player.weapon.maxAmmo) {
      this.player.weapon.ammo = this.player.weapon.maxAmmo;
    }
  }

  setHurt(dir: number) {
    this.changeState(new Hurt(dir));
  }

  destroySelf(sprite?: Sprite, fadeSound?: string) {
    super.destroySelf(sprite, fadeSound);
    this.chargeEffect.destroy();
    if(this.characterTag) {
      game.level.gameUIContainer.removeChild(this.characterTag);
      this.characterTag.destroy({ children: true, texture: true });
    }
  }

}

class CharState {

  sprite: Sprite;
  defaultSprite: Sprite;
  shootSprite: Sprite;
  transitionSprite: Sprite;
  busterOffset: Point;
  character: Character;
  lastLeftWall: Collider;
  lastRightWall: Collider;
  stateTime: number;
  enterSound: string;
  framesJumpNotHeld: number = 0;

  constructor(sprite: Sprite, shootSprite?: Sprite, transitionSprite?: Sprite) {
    this.sprite = transitionSprite || sprite;
    this.transitionSprite = transitionSprite;
    this.defaultSprite = sprite;
    this.shootSprite = shootSprite;
    this.stateTime = 0;
  }

  get canShoot(): boolean {
    return !!this.shootSprite;
  }

  get player() {
    return this.character.player;
  }

  onExit(newState: CharState) {
    //Stop the dash speed on transition to any frame except jump/fall (dash lingers in air) or dash itself
    if(!(newState instanceof Jump) && !(newState instanceof Fall) && !(newState instanceof WallKick) && !(newState instanceof Dash)) {
      this.character.isDashing = false;
    }
  }

  onEnter(oldState: CharState) {
    if(this.enterSound) this.character.playSound(this.enterSound);
  }

  inTransition() {
    return this.transitionSprite && this.sprite.name === this.transitionSprite.name;
  }

  update() {
    
    if(this.inTransition() && this.character.isAnimOver()) {
      this.sprite = this.defaultSprite;
      this.character.changeSprite(this.sprite, true);
    }

    this.stateTime += game.deltaTime;
    
    let lastLeftWallData = game.level.checkCollisionActor(this.character, -1, 0);
    this.lastLeftWall = lastLeftWallData ? lastLeftWallData.collider : undefined;
    if(this.lastLeftWall && !this.lastLeftWall.isClimbable) this.lastLeftWall = undefined;

    let lastRightWallData = game.level.checkCollisionActor(this.character, 1, 0);
    this.lastRightWall = lastRightWallData ? lastRightWallData.collider : undefined;
    if(this.lastRightWall && !this.lastRightWall.isClimbable) this.lastRightWall = undefined;
  }

  airCode() {
    if(this.character.grounded) {
      this.character.playSound("land");
      this.character.changeState(new Idle(game.sprites["mmx_land"]));
      this.character.dashedInAir = false;
      return;
    }

    if(this.player.isHeld("dash") && !this.character.isDashing && !this.character.dashedInAir) {
      this.character.changeState(new AirDash());
    }

    if(!this.player.isHeld("jump") && this.character.vel.y < 0) {
      this.framesJumpNotHeld++;
      if(this.framesJumpNotHeld > 3) {
        this.framesJumpNotHeld = 0;
        this.character.vel.y = 0;
      }
    }
    if(this.player.isHeld("jump")) {
      this.framesJumpNotHeld = 0;
    }
    if(this.player.isHeld("up")) {
      let ladders = game.level.getTriggerList(this.character, 0, 0, undefined, Ladder);
      if(ladders.length > 0) {
        let midX = ladders[0].collider.shape.getRect().midX;
        if(Math.abs(this.character.pos.x - midX) < 12) {
          let rect = ladders[0].collider.shape.getRect();
          let snapX = (rect.x1 + rect.x2)/2;
          if(!game.level.checkCollisionActor(this.character, snapX - this.character.pos.x, 0)) {
            this.character.changeState(new LadderClimb(ladders[0].gameObject, snapX));
          }
        }
      }
    }

    if(game.level.checkCollisionActor(this.character, 0, -1) && this.character.vel.y < 0) {
      this.character.vel.y = 0;
    }

    let move = new Point(0, 0);

    //Cast from base to derived
    let wallKick = (this instanceof WallKick) ? <WallKick> <any> this : null;

    if(this.player.isHeld("left")) {
      if(!wallKick || wallKick.kickSpeed <= 0) {
        move.x = -this.character.runSpeed * this.character.getDashSpeed();
        this.character.xDir = -1;
      }
    }
    else if(this.player.isHeld("right")) {
      if(!wallKick || wallKick.kickSpeed >= 0) {
        move.x = this.character.runSpeed * this.character.getDashSpeed();
        this.character.xDir = 1;
      }

    }
    if(move.magnitude > 0) {
      this.character.move(move);
    }

    //This logic can be abit confusing, but we are trying to mirror the actual Mega man X wall climb physics
    //In the actual game, X will not initiate a climb if you directly hugging a wall, jump and push in its direction UNTIL you start falling OR you move away and jump into it
    if(this.player.isPressed("left") || (this.player.isHeld("left") && (this.character.vel.y > 0 || !this.lastLeftWall))) {
      if(this.lastLeftWall) {
        this.player.character.changeState(new WallSlide(-1));
        return;
      }
    }
    else if(this.player.isPressed("right") || (this.player.isHeld("right") && (this.character.vel.y > 0 || !this.lastRightWall))) {
      if(this.lastRightWall) {
        this.player.character.changeState(new WallSlide(1));
        return;
      }
    }

  }

  groundCode() {
    if(!this.character.grounded) {
      this.character.changeState(new Fall());
      return;
    }
    else if(this.player.isPressed("jump")) {
      this.character.vel.y = -this.character.jumpPower;
      this.character.changeState(new Jump());
      return;
    }
    else if(this.player.isPressed("down")) {
      this.character.checkLadderDown = true;
      let ladders = game.level.getTriggerList(this.character, 0, 1, undefined, Ladder);
      if(ladders.length > 0) {
        let rect = ladders[0].collider.shape.getRect();
        let snapX = (rect.x1 + rect.x2)/2;
        if(!game.level.checkCollisionActor(this.character, snapX - this.character.pos.x, 30)) {
          this.character.changeState(new LadderClimb(ladders[0].gameObject, snapX)); 
          this.character.move(new Point(0, 30), false);
        }
      }
      this.character.checkLadderDown = false;
    }
  }

}

class Idle extends CharState {

  constructor(transitionSprite?: Sprite) {
    super(game.sprites["mmx_idle"], game.sprites["mmx_shoot"], transitionSprite);
  }

  update() {
    super.update();
    if(this.player.isHeld("left") || this.player.isHeld("right")) {
      this.character.changeState(new Run());
    }
    this.groundCode();
    if(this.player.isPressed("dash")) {
      this.character.changeState(new Dash());
    }
    if(game.level.gameMode.isOver) {
      if(this.player.won) {
        if(this.character.sprite.name !== "mmx_win") {
          this.character.changeSprite(game.sprites["mmx_win"], true);
        }
      }
      else {
        if(this.character.sprite.name !== "mmx_kneel") {
          this.character.changeSprite(game.sprites["mmx_kneel"], true);
        }
      }
    }
  }

}

class Run extends CharState {

  constructor() {
    super(game.sprites["mmx_run"], game.sprites["mmx_run_shoot"]);
  }

  update() {
    super.update();
    let move = new Point(0, 0);
    if(this.player.isHeld("left")) {
      this.character.xDir = -1;
      move.x = -this.character.runSpeed;
    }
    else if(this.player.isHeld("right")) {
      this.character.xDir = 1;
      move.x = this.character.runSpeed;
    }
    if(move.magnitude > 0) {
      this.character.move(move);
    }
    else {
      this.character.changeState(new Idle());
    }
    this.groundCode();
    if(this.player.isPressed("dash")) {
      this.character.changeState(new Dash());
    }
  }

}

class Jump extends CharState {

  constructor() {
    super(game.sprites["mmx_jump"], game.sprites["mmx_jump_shoot"]);
    this.enterSound = "jump";
  }

  update() {
    super.update();
    if(this.character.vel.y > 0) {
      this.character.changeState(new Fall());
      return;
    }
    this.airCode();
  }

  onEnter(oldState: CharState) {
    super.onEnter(oldState);
  }

  onExit(newState: CharState) {
    super.onExit(newState);
  }

}

class Fall extends CharState {

  constructor() {
    super(game.sprites["mmx_fall"], game.sprites["mmx_fall_shoot"]);
  }

  update() {
    super.update();
    this.airCode();
  }

}

class Dash extends CharState {

  dashTime: number = 0;

  constructor() {
    super(game.sprites["mmx_dash"], game.sprites["mmx_dash_shoot"]);
    this.enterSound = "dash";
  }

  onEnter(oldState: CharState) {
    super.onEnter(oldState);
    this.character.isDashing = true;
    this.character.globalCollider = this.character.getDashingCollider();
    new Anim(this.character.pos, game.sprites["dash_sparks"], this.character.xDir);
  }

  onExit(newState: CharState) {
    super.onExit(newState);
  }

  update() {
    super.update();
    this.groundCode();
    if(!this.player.isHeld("dash")) {
      this.character.changeState(new Idle());
      return;
    }
    this.dashTime += game.deltaTime;
    if(this.dashTime > 0.5) {
      this.character.changeState(new Idle());
      return;
    }
    let move = new Point(0, 0);
    move.x = this.character.runSpeed * this.character.getDashSpeed() * this.character.xDir;
    this.character.move(move);
    if(this.stateTime > 0.1) {
      this.stateTime = 0;
      new Anim(this.character.pos.addxy(0, -4), game.sprites["dust"], this.character.xDir);
    }
  }

}

class AirDash extends CharState {

  dashTime: number = 0;

  constructor() {
    super(game.sprites["mmx_dash"], game.sprites["mmx_dash_shoot"]);
    this.enterSound = "dash";
  }

  onEnter(oldState: CharState) {
    super.onEnter(oldState);
    this.character.isDashing = true;
    this.character.useGravity = false;
    this.character.vel = new Point(0, 0);
    this.character.dashedInAir = true;
    this.character.globalCollider = this.character.getDashingCollider();
    new Anim(this.character.pos, game.sprites["dash_sparks"], this.character.xDir);
  }

  onExit(newState: CharState) { 
    this.character.useGravity = true;
    super.onExit(newState);
  }

  update() {
    super.update();
    if(!this.player.isHeld("dash")) {
      this.character.changeState(new Fall());
      return;
    }
    this.dashTime += game.deltaTime;
    if(this.dashTime > 0.5) {
      this.character.changeState(new Fall());
      return;
    }
    let move = new Point(0, 0);
    move.x = this.character.runSpeed * this.character.getDashSpeed() * this.character.xDir;
    this.character.move(move);
    if(this.stateTime > 0.1) {
      this.stateTime = 0;
      new Anim(this.character.pos.addxy(0, -4), game.sprites["dust"], this.character.xDir);
    }
  }

}

class WallSlide extends CharState {
  
  wallDir: number;
  dustTime: number = 0;
  constructor(wallDir: number) {
    super(game.sprites["mmx_wall_slide"], game.sprites["mmx_wall_slide_shoot"]);
    this.wallDir = wallDir;
    this.enterSound = "land";
  }

  onEnter(oldState: CharState) {
    super.onEnter(oldState);
    this.character.dashedInAir = false;
  }

  update() {
    super.update();
    if(this.character.grounded) {
      this.character.changeState(new Idle());
      return;
    }
    if(this.player.isPressed("jump")) {
      if(this.player.isHeld("dash")) {
        this.character.isDashing = true;
      }
      this.character.vel.y = -this.character.jumpPower;
      this.character.changeState(new WallKick(this.wallDir * -1));
      return;
    }
    this.character.useGravity = false;
    this.character.vel.y = 0;

    if(this.stateTime > 0.15) {
      let dirHeld = this.wallDir === -1 ? this.player.isHeld("left") : this.player.isHeld("right");

      if(!dirHeld || !game.level.checkCollisionActor(this.character, this.wallDir, 0)) {
        this.player.character.changeState(new Fall());
      }
      this.character.move(new Point(0, 100));
    }

    this.dustTime += game.deltaTime;
    if(this.stateTime > 0.2 && this.dustTime > 0.1) {
      this.dustTime = 0;
      new Anim(this.character.pos.addxy(this.character.xDir * 12, 0), game.sprites["dust"], this.character.xDir);
    }

  }

  onExit(newState: CharState) {
    this.character.useGravity = true;
    super.onExit(newState);
  }

}

class WallKick extends CharState {

  kickDir: number;
  kickSpeed: number;
  constructor(kickDir: number) {
    super(game.sprites["mmx_wall_kick"], game.sprites["mmx_wall_kick_shoot"]);
    this.kickDir = kickDir;
    this.kickSpeed = kickDir * 150;
    this.enterSound = "jump";
  }

  update() {
    super.update();
    if(this.character.isDashing) {
      this.kickSpeed = 0;
    }
    if(this.kickSpeed !== 0) {
      this.kickSpeed = Helpers.toZero(this.kickSpeed, 800 * game.deltaTime, this.kickDir);
      this.character.move(new Point(this.kickSpeed, 0));
    }
    this.airCode();
    if(this.character.vel.y > 0) {
      this.character.changeState(new Fall());
    }
  }

  onEnter(oldState: CharState) {
    super.onEnter(oldState);
    new Anim(this.character.pos.addxy(12*this.character.xDir,0), game.sprites["wall_sparks"], this.character.xDir);
  }

  onExit(newState: CharState) {
    super.onExit(newState);
  }

}

class LadderClimb extends CharState {

  ladder: Ladder;
  snapX: number;
  constructor(ladder: Ladder, snapX?: number) {
    super(game.sprites["mmx_ladder_climb"], game.sprites["mmx_ladder_shoot"], game.sprites["mmx_ladder_start"]);
    this.ladder = ladder;
    this.snapX = snapX;
  }

  onEnter(oldState: CharState) {
    super.onEnter(oldState);
    if(this.snapX !== undefined) {
      this.character.pos.x = this.snapX;
    }
    if(this.character.player === game.level.mainPlayer) {
      game.level.lerpCamTime = 0.25;
    }
    this.character.vel = new Point(0, 0);
    this.character.useGravity = false;
    this.character.dashedInAir = false;
  }

  onExit(newState: CharState) {
    super.onExit(newState);
    this.character.frameSpeed = 1;
    this.character.useGravity = true;
  }

  update() {
    super.update();

    if(this.inTransition()) {
      return;
    }

    this.character.frameSpeed = 0;
    if(this.character.shootAnimTime === 0) {
      if(this.player.isHeld("up")) {
        this.character.move(new Point(0, -100));
        this.character.frameSpeed = 1;
      }
      else if(this.player.isHeld("down")) {
        this.character.move(new Point(0, 100));
        this.character.frameSpeed = 1;
      }
    }

    let ladderTop =  this.ladder.collider.shape.getRect().y1;
    let yDist = this.character.collider.shape.getRect().y2 - ladderTop;
    if(!this.ladder.collider.isCollidingWith(this.character.collider) || Math.abs(yDist) < 12) {
      if(this.player.isHeld("up")) {
        let targetY = ladderTop - 1;
        if(!game.level.checkCollisionActor(this.character, 0, targetY - this.character.pos.y)) {
          this.character.changeState(new LadderEnd(targetY));
        }
      }
      else {
        this.character.changeState(new Fall());
      }
    }
    else if(this.player.isPressed("jump")) {
      this.character.changeState(new Fall());
    }
  }

}

class LadderEnd extends CharState {
  targetY: number;
  constructor(targetY: number) {
    super(game.sprites["mmx_ladder_end"]);
    this.targetY = targetY;
  }

  onEnter(oldState: CharState) {
    super.onEnter(oldState);
    this.character.useGravity = false;
  }

  onExit(newState: CharState) {
    super.onExit(newState);
    this.character.useGravity = true;
  }

  update() {
    super.update();
    if(this.character.isAnimOver()) {
      if(this.character.player === game.level.mainPlayer) {
        game.level.lerpCamTime = 0.25;
      }
      this.character.pos.y = this.targetY;
      this.character.changeState(new Idle());
    }
  }
}

class Hurt extends CharState {

  hurtDir: number;
  hurtSpeed: number;
  constructor(dir: number) {
    super(game.sprites["mmx_hurt"]);
    this.hurtDir = dir;
    this.hurtSpeed = dir * 100;
  }

  onEnter(oldState: CharState) {
    super.onEnter(oldState);
    this.character.vel.y = -100;
    this.character.stopCharge();
  }

  update() {
    super.update();
    if(this.hurtSpeed !== 0) {
      this.hurtSpeed = Helpers.toZero(this.hurtSpeed, 400 * game.deltaTime, this.hurtDir);
      this.character.move(new Point(this.hurtSpeed, 0));
    }
    if(this.character.isAnimOver()) {
      this.character.changeState(new Idle());
    }
  }

}

class Die extends CharState {

  constructor() {
    super(game.sprites["mmx_die"]);
  }

  onEnter(oldState: CharState) {
    super.onEnter(oldState);
    this.character.useGravity = false;
    this.character.vel.x = 0;
    this.character.vel.y = 0;
    game.level.removeFromGrid(this.character);
    this.character.globalCollider = undefined;
    this.character.stopCharge();
    new Anim(this.character.pos.addxy(0, -12), game.sprites["die_sparks"], 1);
  }

  onExit(newState: CharState) {
    this.character.dead = false;
    throw "Should not have come back to life";
  }

  update() {
    super.update();
    if(this.stateTime > 0.75) {
      if(this.character.player === game.level.mainPlayer) {
        this.character.playSound("die", 1);
      }
      else {
        this.character.playSound("die");
      }
      
      new DieEffect(this.character.pos);
      this.player.destroyCharacter();
    }
  }

}