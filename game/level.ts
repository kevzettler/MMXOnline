import { GameObject } from "./gameObject";
import { Wall, Ladder } from "./wall";
import { Point } from "./point";
import { game } from "./game";
import * as Helpers from "./helpers";
import { Actor } from "./actor";
import { Player } from "./player";
import { Rect } from "./rect";
import { Collider, CollideData, HitData } from "./collider";
import { Effect } from "./effects";
import { RollingShieldProj } from "./projectile";
import { Character } from "./character";
import { SpawnPoint } from "./spawnPoint";
import { NoScroll, Direction } from "./noScroll";
import { NavMeshNode, NavMeshNeighbor } from "./navMesh";
import { Line, Shape } from "./shape";
import { KillFeedEntry } from "./killFeedEntry";
import { GameMode, FFADeathMatch } from "./gameMode";
import { LargeHealthPickup, PickupSpawner, SmallAmmoPickup, LargeAmmoPickup, SmallHealthPickup } from "./pickup";
import { KillZone } from "./killZone";
import { HUD } from "./hud";

export class LevelData {
  levelJson: any;
  name: string;
  fixedCam: boolean;
  musicLoopStart: number;
  musicLoopEnd: number;
  parallax: string = "";
  foreground: string = "";
  levelMusic: string = "";
  killY: number;
  maxPlayers: number = 0;

  constructor(levelJson: any) {
    this.levelJson = levelJson;
    this.name = levelJson.name;
    
    if(this.name === "sm_bossroom") {
      this.fixedCam = true;
      this.levelMusic = "BossBattle.mp3";
      this.musicLoopStart = 1500;
      this.musicLoopEnd = 29664;
      this.maxPlayers = 2;
    }
    else if(this.name === "powerplant") {
      this.fixedCam = false;
      this.levelMusic = "PowerPlant.mp3";
      this.parallax = "powerplant_parallex.png";
      this.musicLoopStart = 51040;
      this.musicLoopEnd = 101116;
      this.maxPlayers = 8;
    }
    else if(this.name === "highway") {
      this.fixedCam = false;
      this.levelMusic = "highway.mp3";
      this.parallax = "highway_parallax.png";
      this.musicLoopStart = 44440;
      this.musicLoopEnd = 87463;
      this.killY = 300;
      this.foreground = "highway_foreground.png";
      this.maxPlayers = 8;
    }
    else if(this.name === "gallery") {
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

}

export class Level {

  gameObjects: Set<GameObject>;
  effects: Effect[] = [];
  backgroundPath: string;
  parallaxPath: string;
  foregroundPath: string;
  gravity: number;
  camX: number;
  camY: number;
  zoomScale: number;
  frameCount: number;
  twoFrameCycle: number;
  spawnPoints: SpawnPoint[] = [];
  noScrolls: NoScroll[] = [];
  debugString: string = "";
  debugString2: string = "";
  lerpCamTime: number = 0;
  navMeshNodes: NavMeshNode[] = [];
  gameMode: GameMode;
  pickupSpawners: PickupSpawner[] = [];
  killZones: KillZone[] = [];
  grid: Set<GameObject>[][] = [];
  cellWidth: number;
  levelData: LevelData;
  hud: HUD;

  get localPlayers() { return this.gameMode.localPlayers; }
  get players() { return this.gameMode.players; }
  get mainPlayer() { return this.gameMode.mainPlayer; }

  constructor(levelData: LevelData) {
    this.levelData = levelData;
    this.zoomScale = 3;
    this.gravity = 550;
    this.frameCount = 0;
    this.backgroundPath = levelData.levelJson.backgroundPath;
    this.parallaxPath = "assets/backgrounds/" + levelData.parallax;
    this.foregroundPath = "assets/backgrounds/" + levelData.foreground;

    let imagesToLoad = [this.backgroundPath];
    if(this.parallaxPath) {
      imagesToLoad.push(this.parallaxPath);
    }
    if(this.foregroundPath) {
      imagesToLoad.push(this.foregroundPath);
    }
    game.loadImages(imagesToLoad);
    
  }

  startLevel(gameMode: GameMode) {
    this.renderSetup();
    this.gameObjects = new Set<GameObject>();
    this.setupGrid(50);
    for(var instance of this.levelData.levelJson.instances) {
      if(instance.objectName === "Collision Shape") {
        let points: Point[] = [];
        for(var point of instance.points) {
          points.push(new Point(point.x, point.y));
        }
        let wall = new Wall(instance.name, points);
        wall.collider.isClimbable = (instance.properties && instance.properties.climbable === "false") ? false : true;
        this.addGameObject(wall);
      }
      else if(instance.objectName === "Ladder") {
        let points: Point[] = [];
        for(var point of instance.points) {
          points.push(new Point(point.x, point.y));
        }
        this.addGameObject(new Ladder(instance.name, points));
      }
      else if(instance.objectName === "No Scroll") {
        let points: Point[] = [];
        for(var point of instance.points) {
          points.push(new Point(point.x, point.y));
        }
        let shape = new Shape(points);
        let dir: Direction;
        if(instance.properties) {
          if(instance.properties.freeDir === "up") dir = Direction.Up;
          if(instance.properties.freeDir === "down") dir = Direction.Down;
          if(instance.properties.freeDir === "left") dir = Direction.Left;
          if(instance.properties.freeDir === "right") dir = Direction.Right;
        }
        this.noScrolls.push(new NoScroll(shape, dir));
      }
      else if(instance.objectName === "Kill Zone") {
        let points: Point[] = [];
        for(var point of instance.points) {
          points.push(new Point(point.x, point.y));
        }
        let shape = new Shape(points);
        this.killZones.push(new KillZone(shape));
      }
      else if(instance.objectName === "Spawn Point") {
        let properties = instance.properties;
        this.spawnPoints.push(new SpawnPoint(instance.name, new Point(instance.pos.x, instance.pos.y), properties.xDir, properties.num));
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
        let actor: Actor = new Actor(instance.spriteName, new Point(instance.pos.x, instance.pos.y));
        actor.name = instance.name;
        this.addGameObject(actor);
      }
    }

    for(let navMeshNode of this.navMeshNodes) {
      navMeshNode.setNeighbors(this.navMeshNodes, this.getGameObjectArray());
    }
    //console.log(this.navMeshNodes);

    this.twoFrameCycle = 0;

    this.gameMode = gameMode;

    if(this.levelData.levelMusic) {
      if(game.music) {
        game.music.stop();
      }
      let music = new Howl({
        src: ["assets/music/" + this.levelData.levelMusic],
        sprite: {
          musicStart: [0, this.levelData.musicLoopStart],
          musicLoop: [this.levelData.musicLoopStart, this.levelData.musicLoopEnd - this.levelData.musicLoopStart]
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

    this.hud = new HUD(this);
    this.gameMode.createHUD();
  }
  
  getGameObjectArray() {
    return Array.from(this.gameObjects);
  }

  input() {
    
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

  }

  update() {

    if(game.music) {
      game.music.volume((game.options.playMusic ? game.getMusicVolume01() : 0));
    }

    this.gameMode.checkIfWin();

    let playerX = 0;
    let playerY = 0;
    if(this.mainPlayer.character) {
      playerX = this.mainPlayer.character.pos.x;
      playerY = this.mainPlayer.character.pos.y;
    }
    
    let gameObjects = this.getGameObjectArray();
    for(let go of gameObjects) {
      go.preUpdate();
      go.update();
    }
    
    if(this.mainPlayer.character) {
      let deltaX = this.mainPlayer.character.pos.x - playerX;
      let deltaY = this.mainPlayer.character.pos.y - playerY;
      this.updateCamPos(deltaX, deltaY);
      //console.log(deltaX + "," + deltaY);
      //console.log(this.camX + "," + this.camY)
    }

    for(let effect of this.effects) {
      effect.update();
    }
    
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

  backgroundSprite: PIXI.Sprite;
  parallaxSprite: PIXI.Sprite;
  foregroundSprite: PIXI.Sprite;
  gameContainer: PIXI.Container;
  uiContainer: PIXI.Container;
  textContainer: PIXI.Container;
  renderSetup() {

    if(this.parallaxPath) {
      this.parallaxSprite = new PIXI.Sprite(PIXI.loader.resources[this.parallaxPath].texture);
      game.pixiApp.stage.addChild(this.parallaxSprite);
    }

    this.gameContainer = new PIXI.Container();
    game.pixiApp.stage.addChild(this.gameContainer);

    if(this.backgroundPath) {
      this.backgroundSprite = new PIXI.Sprite(PIXI.loader.resources[this.backgroundPath].texture);
      this.gameContainer.addChild(this.backgroundSprite);
    }
    if(this.foregroundPath) {
      this.foregroundSprite = new PIXI.Sprite(PIXI.loader.resources[this.foregroundPath].texture);
      game.pixiApp.stage.addChild(this.foregroundSprite);
    }

    this.uiContainer = new PIXI.Container();
    game.pixiApp.stage.addChild(this.uiContainer);

    if(this.levelData.fixedCam) {
      let w = this.backgroundSprite.width * this.zoomScale;
      let h = this.backgroundSprite.height * this.zoomScale;
      game.pixiApp.renderer.resize(w, h);
      game.uiCanvas.width = w;
      game.uiCanvas.height = h;

      game.pixiApp.renderer.view.style.width = `${w}px`;
      game.pixiApp.renderer.view.style.height = `${h}px`;
      game.pixiApp.renderer.resize(w, h);
      game.pixiApp.stage.scale.set(this.zoomScale); 

    }
    else {
      let w = Math.min(game.defaultCanvasWidth * this.zoomScale, Math.round(this.backgroundSprite.width * this.zoomScale));
      let h = Math.min(game.defaultCanvasHeight * this.zoomScale, Math.round(this.backgroundSprite.height * this.zoomScale));
      game.pixiApp.renderer.resize(w, h);
      game.uiCanvas.width = w;
      game.uiCanvas.height = h;

      game.pixiApp.renderer.view.style.width = `${w}px`;
      game.pixiApp.renderer.view.style.height = `${h}px`;
      game.pixiApp.renderer.resize(w, h);
      game.pixiApp.stage.scale.set(this.zoomScale);
    }

    /*
    game.ctx.setTransform(this.zoomScale, 0, 0, this.zoomScale, -this.camX * this.zoomScale, -this.camY * this.zoomScale);
    game.ctx.clearRect(0, 0, game.canvas.width, game.canvas.height);
    Helpers.drawRect(game.ctx, new Rect(0, 0, game.canvas.width, game.canvas.height), "gray");
    if(this.parallax) Helpers.drawImage(game.ctx, this.parallax, this.camX * 0.5, this.camY * 0.5);
    Helpers.drawImage(game.ctx, this.background, 0, 0);
    */

  }

  render() {
    
    this.gameContainer.x = -this.camX;// * this.zoomScale;
    this.gameContainer.y = -this.camY;// * this.zoomScale;
    this.parallaxSprite.x = -this.camX * 0.5;
    this.parallaxSprite.y = -this.camY * 0.5;
    this.foregroundSprite.x = -this.camX;
    this.foregroundSprite.y = -this.camY;

    let gameObjectsArray = this.getGameObjectArray();
    for(let go of gameObjectsArray) {
      go.render(0, 0);
    }

    for(let effect of this.effects) {
      effect.render(0, 0);
    }

    this.hud.updateHUD();
    this.gameMode.drawHUD();
    
    Helpers.noCanvasSmoothing(game.uiCtx);
    
    //game.ctx.setTransform(this.zoomScale, 0, 0, this.zoomScale, -this.camX * this.zoomScale, -this.camY * this.zoomScale);
    game.uiCtx.setTransform(this.zoomScale, 0, 0, this.zoomScale, 0, 0);
    //console.log(this.screenWidth + "," + this.screenHeight)
    game.uiCtx.clearRect(0, 0, this.screenWidth, this.screenHeight);

    if(!game.uiData.isProd) {
      Helpers.drawText(game.uiCtx, this.debugString, 10, 50, "white", "black", 8, "left", "top", "");
      Helpers.drawText(game.uiCtx, this.debugString2, 10, 70, "white", "black", 8, "left", "top", "");
    }

    /*
    for(let i = 0; i < this.grid.length; i++) {
      Helpers.drawLine(game.uiCtx, 0, i * this.cellWidth, this.width, i * this.cellWidth, "red", 1);
    }
    for(let j = 0; j < this.grid[0].length; j++) {
      Helpers.drawLine(game.uiCtx, j * this.cellWidth, 0, j * this.cellWidth, this.height, "red", 1);
    }
    */

    //game.ctx.drawImage(game.uiCanvas, this.camX, this.camY);
  }

  get width() { return this.backgroundSprite.width; }
  get height() { return this.backgroundSprite.height; }

  get screenWidth() { return game.pixiApp.renderer.width / this.zoomScale; }
  get screenHeight() { return game.pixiApp.renderer.height / this.zoomScale; }

  get camCenterX() { return this.camX + this.screenWidth/2; }
  get camCenterY() { return this.camY + this.screenHeight/2; }

  get halfScreenWidth() {
    return (game.pixiApp.stage.width / this.zoomScale) * 0.375;
  }

  updateCamPos(deltaX: number, deltaY: number) {

    let playerX = this.mainPlayer.character.pos.x;
    let playerY = this.mainPlayer.character.getCamCenterPos().y;

    let dontMoveX = false;
    let dontMoveY = false;

    let scaledCanvasW = game.defaultCanvasWidth;
    let scaledCanvasH = game.defaultCanvasHeight;
    
    let maxX = this.width - scaledCanvasW/2;
    let maxY = this.height - scaledCanvasH/2;

    if(playerX < scaledCanvasW/2) {
      dontMoveX = true;
    }
    if(playerY < scaledCanvasH/2) {
      dontMoveY = true;
    }

    if(playerX > maxX) {
      dontMoveX = true;
    }
    if(playerY > maxY) {
      dontMoveY = true;
    }

    if(playerX > this.camX + scaledCanvasW/2 && deltaX < 0) {
      dontMoveX = true;
    }
    if(playerX < this.camX + scaledCanvasW/2 && deltaX > 0) {
      dontMoveX = true;
    }
    if(playerY > this.camY + scaledCanvasH/2 && deltaY < 0) {
      dontMoveY = true;
    }
    if(playerY < this.camY + scaledCanvasH/2 && deltaY > 0) {
      dontMoveY = true;
    }

    if(!dontMoveX) {
      this.camX += deltaX;
    }
    if(!dontMoveY) {
      this.camY += deltaY;
    }

    let camRect = new Rect(this.camX, this.camY, this.camX + scaledCanvasW, this.camY + scaledCanvasH);
    let camRectShape = camRect.getShape();
    for(let noScroll of this.noScrolls) {
      if(noScroll.shape.intersectsShape(camRectShape)) {
        if(noScroll.freeDir === Direction.Left) {
          let mtv = camRectShape.getMinTransVectorDir(noScroll.shape, new Point(-1, 0)); 
          if(mtv) this.camX += mtv.x;
        }
        else if(noScroll.freeDir === Direction.Right) {
          let mtv = camRectShape.getMinTransVectorDir(noScroll.shape, new Point(1, 0)); 
          if(mtv) this.camX += mtv.x;
        }
        else if(noScroll.freeDir === Direction.Up) {
          let mtv = camRectShape.getMinTransVectorDir(noScroll.shape, new Point(0, -1));
          if(mtv) this.camY += mtv.y;
        }
        else if(noScroll.freeDir === Direction.Down) {
          let mtv = camRectShape.getMinTransVectorDir(noScroll.shape, new Point(0, 1));
          if(mtv) this.camY += mtv.y;
        }
      }
    }
  }

  computeCamPos(character: Character) {
    let scaledCanvasW = game.defaultCanvasWidth;
    let scaledCanvasH = game.defaultCanvasHeight;
    
    let camX = character.getCamCenterPos().x - scaledCanvasW/2;
    let camY = character.getCamCenterPos().y - scaledCanvasH/2;

    if(camX < 0) camX = 0;
    if(camY < 0) camY = 0;

    let maxX = this.width - scaledCanvasW;
    let maxY = this.height - scaledCanvasH;

    if(camX > maxX) camX = maxX;
    if(camY > maxY) camY = maxY;

    this.camX = camX;
    this.camY = camY;

  }
  
  setupGrid(cellWidth: number) {
    this.cellWidth = cellWidth;
    let width = this.width;
    let height = this.height;
    let hCellCount = Math.ceil(width / cellWidth);
    let vCellCount = Math.ceil(height / cellWidth);
    console.log("Creating grid with width " + hCellCount + " and height " + vCellCount);
    for(let i = 0; i < vCellCount; i++) {
      let curRow: Set<GameObject>[] = [];
      this.grid.push(curRow);
      for(let j = 0; j < hCellCount; j++) {
        curRow.push(new Set<GameObject>());
      }
    }
  }
  
  //Optimize this function, it will be called a lot
  getGridCells(shape: Shape, offsetX: number, offsetY: number): Cell[] {

    let minI = Math.floor((shape.minY / this.height) * this.grid.length);
    let minJ = Math.floor((shape.minX / this.width) * this.grid[0].length);
    let maxI = Math.floor((shape.maxY / this.height) * this.grid.length);
    let maxJ = Math.floor((shape.maxX / this.width) * this.grid[0].length);

    let cells = [];
    for(let i = minI; i <= maxI; i++) {
      for(let j = minJ; j <= maxJ; j++) {
        if(i < 0 || j < 0 || i >= this.grid.length || j >= this.grid[0].length) continue;
        cells.push(new Cell(i, j, this.grid[i][j]));
      }
    }
    return cells;
  }

  getGameObjectsInSameCell(shape: Shape, offsetX: number, offsetY: number) {
    let cells = this.getGridCells(shape, offsetX, offsetY);
    let retGameobjects : Set<GameObject> = new Set();
    for(let cell of cells) {
      if(!cell.gameobjects) continue;
      for (var it = cell.gameobjects.values(), cell2 = undefined; cell2 = it.next().value; ) {
        if(this.gameObjects.has(cell2)) {
          retGameobjects.add(cell2);
        }
        else {
          this.gameObjects.delete(cell2);
          //console.log(cell2);
          //throw "A gameobject was found in a cell but no longer exists in the map";
        }
      }
    }
    return Array.from(retGameobjects);
  }

  addGameObject(go: GameObject) {
    this.addGameObjectToGrid(go);
    this.gameObjects.add(go);
  }

  removeGameObject(go: GameObject) {
    this.removeFromGrid(go);
    this.gameObjects.delete(go);
  }

  removeFromGrid(go: GameObject) {
    if(!go.collider) return;
    let cells = this.getGridCells(go.collider.shape, 0, 0);
    for(let cell of cells) {
      cell.gameobjects.delete(go);
    }
  }

  addGameObjectToGrid(go: GameObject) {
    if(!go.collider) return;
    let cells = this.getGridCells(go.collider.shape, 0, 0);
    for(let cell of cells) {
      this.grid[cell.i][cell.j].add(go);
    }
  }

  hasGameObject(go: GameObject) {
    return this.gameObjects.has(go);
  }

  addEffect(effect: Effect) {
    this.effects.push(effect);
  }

  isInKillZone(actor: Actor) {
    if(!actor.collider) return false;
    for(let killZone of this.killZones) {
      if(killZone.shape.intersectsShape(actor.collider.shape)) {
        return true;
      }
    }
    return false;
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

  //Get ALL colliders this is colliding with at the offset.
  getAllCollideDatas(actor: Actor, offsetX: number, offsetY: number, vel: Point): CollideData[] {
    let actorShape = actor.collider.shape.clone(offsetX, offsetY);
    let collideDatas = [];
    let gameObjects = this.getGameObjectsInSameCell(actor.collider.shape, offsetX, offsetY);
    for(let go of gameObjects) {
      if(!go.collider) continue;
      if(go === actor) continue;
      if(this.shouldTrigger(actor, go, new Point(offsetX, offsetY))) continue;
      let hitData = actorShape.intersectsShape(go.collider.shape, vel);
      if(hitData) {
        let collideData = new CollideData(go.collider, vel, false, go, hitData);
        collideDatas.push(collideData);
      }
    }
    return collideDatas;
  }

  getMtvDir(actor: Actor, offsetX: number, offsetY: number, vel: Point, pushIncline: boolean, overrideCollideDatas?: CollideData[]): Point {
    let collideDatas = overrideCollideDatas;
    if(!collideDatas) {
      collideDatas = game.level.getAllCollideDatas(actor, offsetX, offsetY, vel);
    }
    let actorShape = actor.collider.shape.clone(offsetX, offsetY);
    let pushDir: Point = vel.times(-1).normalize();

    if(collideDatas.length > 0) {
      for(let collideData of collideDatas) { 
        if(collideData.hitData && collideData.hitData.normal && collideData.hitData.normal.isAngled() && pushIncline) {
          pushDir = new Point(0, -1); //Helpers.getInclinePushDir(collideData.hitData.normal, vel);
        }
      }
    }

    if(collideDatas.length > 0) {
      let maxMag = 0;
      let maxMtv: Point;
      for(let collideData of collideDatas) {
        actor.registerCollision(collideData);
        let mtv = actorShape.getMinTransVectorDir(collideData.collider.shape, pushDir);
        if(mtv && mtv.magnitude >= maxMag) {
          maxMag = mtv.magnitude;
          maxMtv = mtv;
        }
      }
      return maxMtv;
    }
    else {
      return undefined;
    }
  }

  checkCollisionShape(shape: Shape, exclusions: GameObject[]) : CollideData {
    let gameObjects = this.getGameObjectsInSameCell(shape, 0, 0);
    for(let go of gameObjects) {
      if(!go.collider) continue;
      if(exclusions.indexOf(go) !== -1) continue;
      let hitData = shape.intersectsShape(go.collider.shape);
      if(hitData) {
        return new CollideData(go.collider, undefined, false, go, hitData);
      }
    }
    return undefined;
  }

  //Checks for collisions and returns the first one collided.
  checkCollisionActor(actor: Actor, offsetX: number, offsetY: number, vel?: Point): CollideData {
    if(!actor.collider || actor.collider.isTrigger) return undefined;
    let actorShape = actor.collider.shape.clone(offsetX, offsetY);
    let gameObjects = this.getGameObjectsInSameCell(actor.collider.shape, offsetX, offsetY);
    for(let go of gameObjects) {
      if(go === actor) continue;
      if(!go.collider) continue;
      let isTrigger = this.shouldTrigger(actor, go, new Point(offsetX, offsetY));
      if(isTrigger) continue;
      let hitData = actorShape.intersectsShape(go.collider.shape, vel);
      if(hitData) {
        return new CollideData(go.collider, vel, isTrigger, go, hitData);
      }
    }
    return undefined;
  }

  getActorsInRadius(pos: Point, radius: number, classNames?: string[]) {
    let actors: Actor[] = [];
    let gameObjects = this.getGameObjectArray();
    for(let go of gameObjects) {
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
    let actorShape = actor.collider.shape.clone(offsetX, offsetY);
    let gameObjects = this.getGameObjectsInSameCell(actor.collider.shape, offsetX, offsetY);
    for(let go of gameObjects) {
      if(go === actor) continue;
      if(!go.collider) continue;
      if(classType && !(go instanceof classType)) {
        continue;
      }
      let isTrigger = this.shouldTrigger(actor, go, new Point(offsetX, offsetY));
      if(!isTrigger) continue;
      let hitData = actorShape.intersectsShape(go.collider.shape, vel);
      if(hitData) {  
        triggers.push(new CollideData(go.collider, vel, isTrigger, go, hitData));
      }
    }
    return triggers;
  }

  isOfClass(go: GameObject, classNames?: string[]) {
    if(!classNames || classNames.length === 0) return true;
    let found = false;
    for(let className of classNames) {
      if(go.constructor.name === className) {
        found = true;
        break;
      }
    }
    return found;
  }

  raycastAll(pos1: Point, pos2: Point, classNames: string[]): CollideData[] {
    let hits: CollideData[] = [];
    let shape = new Shape([pos1, pos2]);
    let gameObjects = this.getGameObjectsInSameCell(shape, 0, 0);
    for(let go of gameObjects) {
      if(!go.collider) continue;
      if(!this.isOfClass(go, classNames)) continue;
      let collideDatas = go.collider.shape.getLineIntersectCollisions(new Line(pos1, pos2));
      //@ts-ignore
      let closestCollideData = _.minBy(collideDatas, (collideData) => {
        return collideData.hitData.hitPoint.distanceTo(pos1);
      });
      if(closestCollideData) {
        closestCollideData.collider = go.collider;
        closestCollideData.gameObject = go;
        hits.push(closestCollideData);
      }
    }
    return hits;
  }

  /*
  raycast(pos1: Point, pos2: Point, classNames: string[]): CollideData {
    let hits = this.raycastAll(pos1, pos2, classNames);
    //@ts-ignore
    return _.minBy(hits, (collideData) => {
      return collideData.hitData.hitPoint.distanceTo(pos1);
    });
  }

  shapecastAll(shape: Shape, origin: Point, dir: Point, classNames: string[]): CollideData[] {
    let hits: CollideData[] = [];
    for(let go of this.gameObjects) {
      if(!go.collider) continue;
      if(!this.isOfClass(go, classNames)) continue;
      let snapVector = shape.getSnapVector(go.collider.shape, dir);
      if(snapVector) {
        //let hitData: HitData = new HitData(dir.normalize().times(-1), origin.add(snapVector));
        let collideData: CollideData = new CollideData(go.collider, dir, false, go, undefined);
        hits.push(collideData);
      }
    }
    return hits;
  }

  shapecast(shape: Shape, origin: Point, dir: Point, classNames: string[]): CollideData {
    let hits = this.shapecastAll(shape, origin, dir, classNames);
    //@ts-ignore
    return _.minBy(hits, (collideData) => {
      return collideData.hitData.hitPoint.distanceTo(origin);
    });
  }
  */

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
    if(game.level.levelData.fixedCam) {
      //@ts-ignore
      return _.find(unoccupied, (spawnPoint) => {
        return spawnPoint.num === player.alliance;
      });
    }
    //@ts-ignore
    return _.sample(unoccupied);
  }

}

export class Cell {
  i: number = 0;
  j: number = 0;
  gameobjects: Set<GameObject>;
  constructor(i: number, j: number, gameobjects: Set<GameObject>) {
    this.i = i;
    this.j = j;
    this.gameobjects = gameobjects;
  }
}