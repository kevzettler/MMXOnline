import { GameObject } from "./gameObject";
import { Wall, Ladder } from "./wall";
import { Point } from "./point";
import { game } from "./game";
import * as Helpers from "./helpers";
import { Actor } from "./actor";
import { Player } from "./player";
import { Rect } from "./rect";
import { Collider, CollideData } from "./collider";
import { Effect } from "./effects";
import { RollingShieldProj } from "./projectile";
import { Character } from "./character";
import { SpawnPoint } from "./spawnPoint";
import { NoScroll } from "./noScroll";
import { NavMeshNode, NavMeshNeighbor } from "./navMesh";
import { Line } from "./shape";

export class Level {

  name: string;
  gameObjects: GameObject[];
  effects: Effect[] = [];
  background: HTMLImageElement;
  parallax: HTMLImageElement;
  gravity: number;
  localPlayers: Player[];
  players: Player[];
  camX: number;
  camY: number;
  fixedCam: boolean;
  zoomScale: number;
  mainPlayer: Player;
  frameCount: number;
  twoFrameCycle: number;
  levelMusic: string;
  spawnPoints: SpawnPoint[] = [];
  noScrolls: NoScroll[] = [];
  musicLoopStart: number;
  musicLoopEnd: number;
  debugString: string = "";
  lerpCamTime: number = 0;
  navMeshNodes: NavMeshNode[] = [];

  constructor(levelJson: any) {
    this.zoomScale = 4;
    this.gravity = 900;
    this.camX = 0;
    this.camY = 0;
    this.name = levelJson.name;
    this.background = game.getBackground(levelJson.backgroundPath);
    this.frameCount = 0;

    this.gameObjects = [];
    for(var instance of levelJson.instances) {
      if(instance.objectName === "Collision Shape") {
        let points: Point[] = [];
        for(var point of instance.points) {
          points.push(new Point(point.x, point.y));
        }
        this.gameObjects.push(new Wall(instance.name, points));
      }
      else if(instance.objectName === "Ladder") {
        let points: Point[] = [];
        for(var point of instance.points) {
          points.push(new Point(point.x, point.y));
        }
        this.gameObjects.push(new Ladder(instance.name, points));
      }
      else if(instance.objectName === "No Scroll") {
        let points: Point[] = [];
        for(var point of instance.points) {
          points.push(new Point(point.x, point.y));
        }
        let rect = new Rect(points[0].x, points[0].y, points[2].x, points[2].y);
        this.noScrolls.push(new NoScroll(rect));
      }
      else if(instance.objectName === "Spawn Point") {
        this.spawnPoints.push(new SpawnPoint(new Point(instance.pos.x, instance.pos.y)));
      }
      else if(instance.objectName === "Node") {
        let name = instance.name;
        let pos = new Point(instance.pos.x, instance.pos.y);
        let node: NavMeshNode = new NavMeshNode(name, pos, instance.properties);
        this.navMeshNodes.push(node);
      }
      else {
        let actor: Actor = new Actor(game.sprites[instance.spriteName], true);
        actor.pos = new Point(instance.pos.x, instance.pos.y);
        actor.name = instance.name;
        this.gameObjects.push(actor);
      }
    }

    for(let navMeshNode of this.navMeshNodes) {
      navMeshNode.setNeighbors(this.navMeshNodes, this.gameObjects);
    }
    console.log(this.navMeshNodes);

    this.localPlayers = [];
    this.players = [];
    this.twoFrameCycle = 0;

    let parallax = "";

    if(this.name === "sm_bossroom") {
      this.fixedCam = true;
      this.levelMusic = "BossBattle.mp3";
      this.musicLoopStart = 1500;
      this.musicLoopEnd = 29664;
    }
    else if(this.name === "powerplant") {
      this.fixedCam = false;
      this.levelMusic = "PowerPlant.mp3";
      parallax = "powerplant_parallex.png";
      this.musicLoopStart = 51040;
      this.musicLoopEnd = 101116;
    }

    if(parallax) {
      this.parallax = game.getBackground("assets/backgrounds/" + parallax);
    }
  }
  
  update() {

    let gamepads = navigator.getGamepads();
    for(let i = 0; i < gamepads.length; i++) {
      if(i >= this.localPlayers.length) break;
      let player = this.localPlayers[i];
      let gamepad = gamepads[i];
      if(!gamepad) continue;
      player.setButtonMapping(gamepad.id);
      for(let j = 0; j < gamepad.buttons.length; j++) {
        if(gamepad.buttons[j].pressed) {
          player.onButtonDown(j);
        }
        else {
          player.onButtonUp(j);
        }
      }
      for(let j = 0; j < gamepad.axes.length; j++) {
        player.setAxes(j, gamepad.axes[j]);
        //html+= "Stick "+(Math.ceil(i/2)+1)+": "+gp.axes[i]+","+gp.axes[i+1]+"<br/>";
      }
    }

    for(let go of this.gameObjects) {
      go.preUpdate();
      go.update();
    }
    for(let effect of this.effects) {
      effect.update();
    }
    this.render();

    for(let player of this.localPlayers) {
      player.clearInputPressed();
      if(player.isAI) {
        player.clearAiInput();
      }
    }

    this.frameCount++;
    
    this.twoFrameCycle++;
    if(this.twoFrameCycle > 2) this.twoFrameCycle = -2;

  }

  render() {
    
    //game.canvas.width = Math.min(game.canvas.width, Math.round(this.background.width * this.zoomScale));
    //game.canvas.height = Math.min(game.canvas.height, Math.round(this.background.height * this.zoomScale));
    
    if(this.fixedCam) {
      game.canvas.width = Math.round(this.background.width * this.zoomScale);
      game.canvas.height = Math.round(this.background.height * this.zoomScale);
    }
    else {
      game.canvas.width = Math.min(game.canvas.width, Math.round(this.background.width * this.zoomScale));
      game.canvas.height = Math.min(game.canvas.height, Math.round(this.background.height * this.zoomScale));
    }

    if(!game.options.antiAlias) {
      Helpers.noCanvasSmoothing(game.ctx);
    }

    if(this.mainPlayer.character) {
      this.computeCamPos(this.mainPlayer.character);
    }
    game.ctx.setTransform(this.zoomScale, 0, 0, this.zoomScale, 0, 0);
    game.ctx.clearRect(0, 0, game.canvas.width, game.canvas.height);
    Helpers.drawRect(game.ctx, new Rect(0, 0, game.canvas.width, game.canvas.height), "gray");
    if(this.parallax) Helpers.drawImage(game.ctx, this.parallax, -this.camX * 0.5, -this.camY * 0.5);
    Helpers.drawImage(game.ctx, this.background, -this.camX, -this.camY);
    
    for(let go of this.gameObjects) {
      go.render(-this.camX, -this.camY);
    }

    for(let effect of this.effects) {
      effect.render(-this.camX, -this.camY);
    }

    this.drawHUD();
    Helpers.drawText(game.ctx, this.debugString, 10, 10, "white", 8, "left", "top", "");
  }

  drawHUD() {
    let player1 = this.localPlayers[0];
    this.drawPlayerHUD(player1, 1);
    if(this.localPlayers.length > 1) {      
      let player2 = this.localPlayers[1];
      this.drawPlayerHUD(player2, 2);
    }
  }

  drawPlayerHUD(player: Player, playerNum: number) {
    
    //Health
    let baseX = 10;
    if(playerNum === 2) baseX = game.canvas.width/this.zoomScale - 4 - baseX;
    
    let baseY = game.canvas.height/this.zoomScale/2;
    baseY += 25;
    game.sprites["hud_health_base"].draw(0, baseX, baseY, 1, 1, "", 1, player.palette);
    baseY -= 16;
    for(let i = 0; i < Math.ceil(player.health); i++) {
      game.sprites["hud_health_full"].draw(0, baseX, baseY);
      baseY -= 2;
    }
    for(let i = 0; i < player.maxHealth - Math.ceil(player.health); i++) {
      game.sprites["hud_health_empty"].draw(0, baseX, baseY);
      baseY -= 2;
    }
    game.sprites["hud_health_top"].draw(0, baseX, baseY);

    //Weapon
    if(player.weaponIndex !== 0) {
      baseX = 25;
      if(playerNum === 2) baseX = game.canvas.width/this.zoomScale - 4 - baseX;
      
      baseY = game.canvas.height/this.zoomScale/2;
      baseY += 25;
      game.sprites["hud_weapon_base"].draw(player.weapon.index - 1, baseX, baseY);
      baseY -= 16;
      for(let i = 0; i < Math.ceil(player.weapon.ammo); i++) {
        game.sprites["hud_weapon_full"].draw(player.weapon.index - 1, baseX, baseY);
        baseY -= 2;
      }
      for(let i = 0; i < player.weapon.maxAmmo - Math.ceil(player.weapon.ammo); i++) {
        game.sprites["hud_health_empty"].draw(0, baseX, baseY);
        baseY -= 2;
      }
      game.sprites["hud_health_top"].draw(0, baseX, baseY);
    }
  }

  get width() { return this.background.width; }
  get height() { return this.background.height; }

  get halfScreenWidth() {
    return (game.canvas.width / this.zoomScale) * 0.375;
  }

  computeCamPos(character: Character) {
    let scaledCanvasW = game.canvas.width / this.zoomScale;
    let scaledCanvasH = game.canvas.height / this.zoomScale;
    
    let camX = character.getCamCenterPos().x - scaledCanvasW/2;
    let camY = character.getCamCenterPos().y - scaledCanvasH/2;

    if(camX < 0) camX = 0;
    if(camY < 0) camY = 0;

    let maxX = this.background.width - scaledCanvasW;
    let maxY = this.background.height - scaledCanvasH;

    if(camX > maxX) camX = maxX;
    if(camY > maxY) camY = maxY;

    let camRect = new Rect(camX, camY, camX + scaledCanvasW, camY + scaledCanvasH);
    for(let noScroll of this.noScrolls) {
      if(noScroll.rect.overlaps(camRect)) {
        let upDist = camRect.y2 - noScroll.rect.y1;
        let downDist = noScroll.rect.y2 - camRect.y1;
        let leftDist = camRect.x2 - noScroll.rect.x1;
        let rightDist = noScroll.rect.x2 - camRect.x1;
        if(Math.min(upDist, downDist, leftDist, rightDist) === upDist) {
          camY -= upDist;
        }
        else if(Math.min(upDist, downDist, leftDist, rightDist) === downDist) {
          camY += downDist;
        }
        else if(Math.min(upDist, downDist, leftDist, rightDist) === leftDist) {
          camX -= leftDist;
        }
        else if(Math.min(upDist, downDist, leftDist, rightDist) === rightDist) {
          camX += rightDist;
        }
      }
    }

    if(this.lerpCamTime > 0) {
      this.camX = Helpers.lerpNoOver(this.camX, camX, game.deltaTime * 30);
      this.camY = Helpers.lerpNoOver(this.camY, camY, game.deltaTime * 30);
      this.lerpCamTime = Helpers.clampMin0(this.lerpCamTime - game.deltaTime);
    }
    else {
      this.camX = camX;
      this.camY = camY;
    }
    
  }
  
  addGameObject(go: GameObject) {
    this.gameObjects.push(go);
  }

  addEffect(effect: Effect) {
    this.effects.push(effect);
  }

  //Should actor collide with gameobject?
  shouldTrigger(actor: Actor, gameObject: GameObject, offset: Point) {

    if(actor instanceof RollingShieldProj || gameObject instanceof RollingShieldProj) {
      var a = 0;
    }

    if(!actor.collider.isTrigger && gameObject instanceof Ladder) {
      if(actor.pos.y < gameObject.collider.shape.getRect().y1 && offset.y > 0) {
        if(actor instanceof Character && !actor.checkLadderDown) {
          return false;
        }
      }
    }

    if(actor.collider.isTrigger || gameObject.collider.isTrigger) return true;

    if(actor.collider.wallOnly && !(gameObject instanceof Wall)) return true;
    if(gameObject instanceof Actor) {
      if(gameObject.collider.wallOnly) return true;
    }
    return false;
  }

  //Checks for collisions and returns the first one collided.
  checkCollisionActor(actor: Actor, offsetX: number, offsetY: number, vel?: Point): CollideData {
    
    if(actor instanceof RollingShieldProj) {
      var a = 0;
    }

    if(!actor.collider || actor.collider.isTrigger) return undefined;
    for(let go of this.gameObjects) {
      if(go === actor) continue;
      if(!go.collider) continue;
      let actorShape = actor.collider.shape.clone(offsetX, offsetY);
      if(go.collider.shape.intersectsShape(actorShape)) {
        let isTrigger = this.shouldTrigger(actor, go, new Point(offsetX, offsetY));
        if(isTrigger) continue;
        return new CollideData(go.collider, vel, isTrigger, go);
      }
    }
    return undefined;
  }

  getTriggerList(actor: Actor, offsetX: number, offsetY: number, vel?: Point, className?: string): CollideData[] {
    let triggers: CollideData[] = [];
    if(!actor.collider) return triggers;
    for(let go of this.gameObjects) {
      if(go === actor) continue;
      if(!go.collider) continue;
      if(className && go.constructor.name !== className) {
        continue;
      }
      let actorShape = actor.collider.shape.clone(offsetX, offsetY);
      if(go.collider.shape.intersectsShape(actorShape)) {
        let isTrigger = this.shouldTrigger(actor, go, new Point(offsetX, offsetY));
        if(!isTrigger) continue;
        triggers.push(new CollideData(go.collider, vel, isTrigger, go));
      }
    }
    return triggers;
  }

  raycastAll(pos1: Point, pos2: Point, classNames: string[]) {
    let hits: CollideData[] = [];
    for(let go of this.gameObjects) {
      if(!go.collider) continue;
      let found = false;
      for(let className of classNames) {
        if(go.constructor.name === className) {
          found = true;
          break;
        }
      }
      if(!found) continue;
      if(go.collider.shape.intersectsLine(new Line(pos1, pos2))) {
        hits.push(new CollideData(go.collider, undefined, true, go));
      }
    }
    return hits;
  }

  getClosestTarget(pos: Point, alliance: number) {
    //@ts-ignore
    let players = _.filter(this.players, (player) => { 
      if(!player.character) return false;
      if(player.alliance === alliance) return false;
      if(!this.noWallsInBetween(pos, player.character.pos)) return false;
      return true;
    });
    //@ts-ignore
    let closestPlayer = _.minBy(players, (player) => {
      return player.character.pos.distanceTo(pos);
    });
    return closestPlayer ? closestPlayer.character : undefined;
  }

  noWallsInBetween(pos1: Point, pos2: Point) {
    let hits = this.raycastAll(pos1, pos2, ["Wall", "Ladder"]);
    if(hits.length === 0) {
      return true;
    }
    return false;
  }

  getClosestNodeInSight(pos: Point) {
    let minNode: NavMeshNode;
    let minDist = Infinity;
    for(let node of this.navMeshNodes) {
      if(this.noWallsInBetween(pos, node.pos)) {
        let dist = pos.distanceTo(node.pos);
        if(dist < minDist) {
          minDist = dist;
          minNode = node;
        }
      }
    }
    return minNode;
  }

  getRandomNode() {
    //@ts-ignore
    return _.sample(this.navMeshNodes);
  }

}