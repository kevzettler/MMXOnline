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
import { Line, Shape } from "./shape";
import { KillFeedEntry } from "./killFeedEntry";
import { GameMode, FFADeathMatch } from "./gameMode";
import { LargeHealthPickup, PickupSpawner, SmallAmmoPickup, LargeAmmoPickup, SmallHealthPickup } from "./pickup";

export class Level {

  name: string;
  gameObjects: GameObject[];
  effects: Effect[] = [];
  background: HTMLImageElement;
  parallax: HTMLImageElement;
  foreground: HTMLImageElement;
  gravity: number;
  camX: number;
  camY: number;
  fixedCam: boolean;
  zoomScale: number;
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
  gameMode: GameMode;
  pickupSpawners: PickupSpawner[] = [];
  killY: number;

  get localPlayers() { return this.gameMode.localPlayers; }
  get players() { return this.gameMode.players; }
  get mainPlayer() { return this.gameMode.mainPlayer; }

  constructor(levelJson: any) {
    this.zoomScale = 3;
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
        let wall = new Wall(instance.name, points);
        wall.collider.isClimbable = (instance.properties && instance.properties.climbable === "false") ? false : true;
        this.gameObjects.push(wall);
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
        let shape = new Shape(points);
        this.noScrolls.push(new NoScroll(shape));
      }
      else if(instance.objectName === "Spawn Point") {
        let properties = instance.properties;
        this.spawnPoints.push(new SpawnPoint(new Point(instance.pos.x, instance.pos.y), properties.xDir, properties.num));
      }
      else if(instance.objectName === "Node") {
        let name = instance.name;
        let pos = new Point(instance.pos.x, instance.pos.y);
        let node: NavMeshNode = new NavMeshNode(name, pos, instance.properties);
        this.navMeshNodes.push(node);
      }
      else if(instance.objectName === "Large Health") {
        this.pickupSpawners.push(new PickupSpawner(new Point(instance.pos.x, instance.pos.y), LargeHealthPickup));
      }
      else if(instance.objectName === "Small Health") {
        this.pickupSpawners.push(new PickupSpawner(new Point(instance.pos.x, instance.pos.y), SmallHealthPickup));
      }
      else if(instance.objectName === "Large Ammo") {
        this.pickupSpawners.push(new PickupSpawner(new Point(instance.pos.x, instance.pos.y), LargeAmmoPickup));
      }
      else if(instance.objectName === "Small Ammo") {
        this.pickupSpawners.push(new PickupSpawner(new Point(instance.pos.x, instance.pos.y), SmallAmmoPickup));
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
    //console.log(this.navMeshNodes);

    this.twoFrameCycle = 0;

    let parallax = "";
    let foreground = "";

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
    else if(this.name === "highway") {
      this.fixedCam = false;
      this.levelMusic = "highway.mp3";
      parallax = "highway_parallax.png";
      this.musicLoopStart = 44440;
      this.musicLoopEnd = 87463;
      this.killY = 300;
      foreground = "highway_foreground.png";
    }
    else if(this.name === "gallery") {
      this.fixedCam = false;
      //this.levelMusic = "highway.mp3";
      parallax = "gallery_parallax.png";
      //this.musicLoopStart = 44440;
      //this.musicLoopEnd = 87463;
      //this.killY = 300;
      //foreground = "highway_foreground.png";
    }

    if(parallax) {
      this.parallax = game.getBackground("assets/backgrounds/" + parallax);
    }
    if(foreground) {
      this.foreground = game.getBackground("assets/backgrounds/" + foreground);
    }
  }

  startLevel(gameMode: GameMode) {
    
    this.gameMode = gameMode;

    if(this.levelMusic) {
      let music = new Howl({
        src: ["assets/music/" + this.levelMusic],
        sprite: {
          musicStart: [0, this.musicLoopStart],
          musicLoop: [this.musicLoopStart, this.musicLoopEnd - this.musicLoopStart]
        },
        onload: () => {
        }
      });
      
      window.setTimeout(
        () => {
          music.play("musicStart");
          music.on("end", function() {
            console.log("Loop");
            music.play("musicLoop");
          });
        },
        1000);

      game.music = music;
    }
  }
  
  update() {

    if(game.music) {
      game.music.volume((game.options.playMusic ? 1 : 0));
    }

    this.gameMode.checkIfWin();

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

    for(let player of this.players) {
      player.update();
    }

    for(let pickupSpawner of this.pickupSpawners) {
      pickupSpawner.update();
    }

    this.frameCount++;
    
    this.twoFrameCycle++;
    if(this.twoFrameCycle > 2) this.twoFrameCycle = -2;

    this.gameMode.update();
  }

  render() {
    
    if(this.fixedCam) {
      game.canvas.width = Math.round(this.background.width * this.zoomScale);
      game.canvas.height = Math.round(this.background.height * this.zoomScale);
    }
    else {
      game.canvas.width = Math.min(game.defaultCanvasWidth * this.zoomScale, Math.round(this.background.width * this.zoomScale));
      game.canvas.height = Math.min(game.defaultCanvasHeight * this.zoomScale, Math.round(this.background.height * this.zoomScale));
    }

    if(!game.options.antiAlias) {
      Helpers.noCanvasSmoothing(game.ctx);
    }

    if(this.mainPlayer.character) {
      this.computeCamPos(this.mainPlayer.character);
      //this.debugString = this.camX + "," + this.camY;
    }

    let camX = Helpers.roundEpsilon(this.camX);
    let camY = Helpers.roundEpsilon(this.camY);

    game.ctx.setTransform(this.zoomScale, 0, 0, this.zoomScale, 0, 0);
    game.ctx.clearRect(0, 0, game.canvas.width, game.canvas.height);
    Helpers.drawRect(game.ctx, new Rect(0, 0, game.canvas.width, game.canvas.height), "gray");
    if(this.parallax) Helpers.drawImage(game.ctx, this.parallax, -camX * 0.5, -camY * 0.5);
    Helpers.drawImage(game.ctx, this.background, -camX, -camY);
    
    for(let go of this.gameObjects) {
      go.render(-camX, -camY);
    }

    for(let effect of this.effects) {
      effect.render(-camX, -camY);
    }

    if(this.foreground) Helpers.drawImage(game.ctx, this.foreground, -camX, -camY);

    this.drawHUD();
    Helpers.drawText(game.ctx, this.debugString, 10, 50, "white", "black", 8, "left", "top", "");
  }

  drawHUD() {
    let player1 = this.localPlayers[0];
    this.drawPlayerHUD(player1, 1);
    if(this.localPlayers.length > 1 && this.fixedCam) {      
      let player2 = this.localPlayers[1];
      this.drawPlayerHUD(player2, 2);
    }

    this.gameMode.drawHUD();
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

  get screenWidth() { return game.canvas.width / this.zoomScale; }
  get screenHeight() { return game.canvas.height / this.zoomScale; }

  get camCenterX() { return this.camX + this.screenWidth/2; }
  get camCenterY() { return this.camY + this.screenHeight/2; }

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
    let camRectShape = camRect.getShape();
    for(let noScroll of this.noScrolls) {
      if(noScroll.shape.intersectsShape(camRectShape)) {
        let noScrollRect = noScroll.shape.getRect();
        if(noScrollRect) { 
          let upDist = camRect.y2 - noScrollRect.y1;
          let downDist = noScrollRect.y2 - camRect.y1;
          let leftDist = camRect.x2 - noScrollRect.x1;
          let rightDist = noScrollRect.x2 - camRect.x1;
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
      else {
        
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

    this.camX = Helpers.roundEpsilon(this.camX);
    this.camY = Helpers.roundEpsilon(this.camY);
    
  }
  
  addGameObject(go: GameObject) {
    this.gameObjects.push(go);
  }

  hasGameObject(go: GameObject) {
    return this.gameObjects.includes(go);
  }

  addEffect(effect: Effect) {
    this.effects.push(effect);
  }

  //Should actor collide with gameobject?
  shouldTrigger(actor: Actor, gameObject: GameObject, offset: Point) {

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
    if(actor instanceof Character && gameObject instanceof Character && actor.player.alliance === gameObject.player.alliance) {
      return true;
    }
    return false;
  }

  checkCollisionShape(shape: Shape, exclusions: GameObject[]) : CollideData {
    for(let go of this.gameObjects) {
      if(!go.collider) continue;
      if(exclusions.indexOf(go) !== -1) continue;
      if(go.collider.shape.intersectsShape(shape)) {
        return new CollideData(go.collider, undefined, false, go);
      }
    }
    return undefined;
  }

  //Checks for collisions and returns the first one collided.
  checkCollisionActor(actor: Actor, offsetX: number, offsetY: number, vel?: Point): CollideData {
  
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

  getActorsInRadius(pos: Point, radius: number, classNames?: string[]) {
    let actors: Actor[] = [];
    for(let go of this.gameObjects) {
      if(!(go instanceof Actor)) continue;
      if(!this.isOfClass(go, classNames)) continue;
      if(go.pos.distanceTo(pos) < radius) {
        actors.push(go);
      }
    }
    return actors;
  }

  getTriggerList(actor: Actor, offsetX: number, offsetY: number, vel?: Point, classType?: any): CollideData[] {
    let triggers: CollideData[] = [];
    if(!actor.collider) return triggers;
    for(let go of this.gameObjects) {
      if(go === actor) continue;
      if(!go.collider) continue;
      if(classType && !(go instanceof classType)) {
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

  isOfClass(go: GameObject, classNames?: string[]) {
    if(!classNames) return true;
    let found = false;
    for(let className of classNames) {
      if(go.constructor.name === className) {
        found = true;
        break;
      }
    }
    return found;
  }

  raycastAll(pos1: Point, pos2: Point, classNames: string[]) {
    let hits: CollideData[] = [];
    for(let go of this.gameObjects) {
      if(!go.collider) continue;
      if(!this.isOfClass(go, classNames)) continue;
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
    let hits = this.raycastAll(pos1, pos2, ["Wall"]);
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

  getSpawnPoint(player: Player) {
    //@ts-ignore
    let unoccupied = _.filter(this.spawnPoints, (spawnPoint) => {
      return !spawnPoint.occupied();
    });
    if(game.level.fixedCam) {
      //@ts-ignore
      return _.find(unoccupied, (spawnPoint) => {
        return spawnPoint.num === player.alliance;
      });
    }
    //@ts-ignore
    return _.sample(unoccupied);
  }

}