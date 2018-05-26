import { Point } from "./point";
import { game } from "./game";
import * as Helpers from "./helpers";
import { Actor } from "./actor";

export class ChargeEffect {
  
  points: Point[];
  origPoints: Point[];
  pointTimes: number[];

  constructor() {
    this.points = [];
    let radius = 24;

    let angle = 0;
    let point1 = new Point(Helpers.sin(angle) * radius, Helpers.cos(angle) * radius); angle += 45;
    let point2 = new Point(Helpers.sin(angle) * radius, Helpers.cos(angle) * radius); angle += 45;
    let point3 = new Point(Helpers.sin(angle) * radius, Helpers.cos(angle) * radius); angle += 45;
    let point4 = new Point(Helpers.sin(angle) * radius, Helpers.cos(angle) * radius); angle += 45;
    let point5 = new Point(Helpers.sin(angle) * radius, Helpers.cos(angle) * radius); angle += 45;
    let point6 = new Point(Helpers.sin(angle) * radius, Helpers.cos(angle) * radius); angle += 45;
    let point7 = new Point(Helpers.sin(angle) * radius, Helpers.cos(angle) * radius); angle += 45;
    let point8 = new Point(Helpers.sin(angle) * radius, Helpers.cos(angle) * radius); angle += 45;

    this.origPoints = [
      point1, point2, point3, point4, point5, point6, point7, point8
    ];
    //@ts-ignore
    this.points = _.cloneDeep(this.origPoints);
    this.pointTimes = [0,3,0,1.5,-1.5,-3,-1.5,-1.5];
  }

  update(centerPos: Point, chargeLevel: number) {
    for(let i = 0; i < this.points.length; i++) {
      let point = this.points[i];
      if(this.pointTimes[i] > 0) {
        point.x = Helpers.moveTo(point.x, 0, game.deltaTime * 70);
        point.y = Helpers.moveTo(point.y, 0, game.deltaTime * 70);
      }
      let chargePart = game.sprites["charge_part_" + String(chargeLevel)];
      this.pointTimes[i]+=game.deltaTime*20;
      if(this.pointTimes[i] > 3) {
        this.pointTimes[i] = -3;
        this.points[i] = this.origPoints[i].clone();
      }
    }

  }

  render(centerPos: Point, chargeLevel: number) {

    for(let i = 0; i < this.points.length; i++) {
      let point = this.points[i];
      let chargePart = game.sprites["charge_part_" + String(chargeLevel)];
      if(this.pointTimes[i] > 0) {
        chargePart.draw(Math.round(this.pointTimes[i]), centerPos.x + point.x, centerPos.y + point.y);
      }
    }

  }

}

export class DieEffectParticles {

  centerPos: Point;
  time: number = 0;
  ang: number = 0;
  constructor(centerPos: Point) {
    this.centerPos = centerPos;
  }

  render(offsetX: number, offsetY: number) {
    this.time += game.deltaTime;
    for(let i = this.ang; i < this.ang + 360; i += 22.5) {
      let x = this.centerPos.x + Helpers.cos(i) * this.time * 150;
      let y = this.centerPos.y + Helpers.sin(i) * this.time * 150;
      let diePartSprite = game.sprites["die_particle"];
      diePartSprite.draw(Math.round(this.time * 20) % diePartSprite.frames.length, x + offsetX, y + offsetY, 1, 1, "", Helpers.clamp01(1 - this.time*0.5));
    }
    this.ang += game.deltaTime * 100;
  }

}

export class Effect {

  pos: Point;
  constructor(pos: Point) {
    this.pos = pos;
    game.level.addEffect(this);
  }

  update() {

  }

  render(offsetX: number, offsetY: number) {

  }

  destroySelf() {
    //@ts-ignore
    _.remove(game.level.effects, this);
  }

}

export class DieEffect extends Effect {

  timer: number = 100;
  spawnCount: number = 0;
  dieEffects: DieEffectParticles[] = [];
  repeatCount: number = 0;

  constructor(centerPos: Point) {
    super(centerPos);
  }

  update() {
    super.update();
    let repeat = 5;
    let repeatPeriod = 0.5;
    this.timer += game.deltaTime;
    if(this.timer > repeatPeriod) {
      this.timer = 0;
      this.repeatCount++;
      if(this.repeatCount > repeat) {
        this.destroySelf();
      }
      else {
        let dieEffect = new DieEffectParticles(this.pos);
        this.dieEffects.push(dieEffect);
      }
    }
  }

  render(offsetX: number, offsetY: number) {
    for(let dieEffect of this.dieEffects) {
      dieEffect.render(offsetX, offsetY);
    }
  }

}