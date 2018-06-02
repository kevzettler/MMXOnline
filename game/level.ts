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
  killFeed: KillFeedEntry[] = [];
  isOver: boolean = false;
  killsToWin: number = 20;
  overTime: number = 0;

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

  startLevel() {
    
    let numCPUs = 4;

    let health = 32;
    if(!this.fixedCam) {
      health = 16;
    }

    let player1: Player = new Player("Player 1", false, 0, health);
    this.players.push(player1);
    this.localPlayers.push(player1);
    this.mainPlayer = player1;

    for(var i = 0; i < numCPUs; i++) {
      let cpu: Player = new Player("CPU" + String(i+1), false, i + 1, health, game.palettes["red"]);
      this.players.push(cpu);
      this.localPlayers.push(cpu);
    }

    document.onkeydown = (e) => {
      for(let player of this.localPlayers) {
        player.onKeyDown(e.keyCode);
      }
      if(e.keyCode === 9 || (e.keyCode >= 112 && e.keyCode <= 121)) {
        e.preventDefault();
      }
    }

    document.onkeyup = (e) => {
      for(let player of this.localPlayers) {
        player.onKeyUp(e.keyCode);
      }
      if(e.keyCode === 9 || (e.keyCode >= 112 && e.keyCode <= 124)) {
        e.preventDefault();
      }
    }


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
  
  update() {

    game.music.volume((game.options.playMusic ? 1 : 0));

    if(!this.isOver) {
      for(let player of this.players) {
        if(player.kills >= this.killsToWin) {
          this.isOver = true;
          player.won = true;
        }
      }
      if(this.isOver) {
        game.music.stop();
        if(this.mainPlayer && this.mainPlayer.won) {
          game.music = new Howl({
            src: ["assets/music/win.mp3"],
          });
          game.music.play();
        }
        else if(this.mainPlayer && !this.mainPlayer.won) {
          game.music = new Howl({
            src: ["assets/music/lose.mp3"],
          });
          game.music.play();
        }
      }
    }
    else {
      this.overTime += game.deltaTime;
      if(this.overTime > 10) {
        game.restartLevel(this.name);
      }
    }

    for(let i = this.killFeed.length - 1; i >= 0; i--) {
      let killFeed = this.killFeed[i];
      killFeed.time += game.deltaTime;
      if(killFeed.time > 8) {
        //@ts-ignore
        _.remove(this.killFeed, killFeed);
      }
    }

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

    this.frameCount++;
    
    this.twoFrameCycle++;
    if(this.twoFrameCycle > 2) this.twoFrameCycle = -2;

    //Sort players by score
    this.players.sort(function(a, b) {
      if(a.kills > b.kills) return -1;
      else if(a.kills === b.kills) {
        if(a.deaths < b.deaths) return -1;
        if(a.deaths === b.deaths) return 0;
        if(a.deaths > b.deaths) return 1;
      }
      else {
        return 1;
      }
    });

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
      this.debugString = this.camX + "," + this.camY;
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
    this.drawKillFeed();
    
    if(this.isOver) {
      if(this.mainPlayer.won) {
        Helpers.drawTextMMX(game.ctx, "You won!", this.screenWidth/2, this.screenHeight/2, 24, "center", "middle");
      }
      else {
        Helpers.drawTextMMX(game.ctx, "You lost!", this.screenWidth/2, this.screenHeight/2, 24, "center", "middle");
        //@ts-ignore
        let winner = _.find(this.players, (player) => {
          return player.won;
        });
        Helpers.drawTextMMX(game.ctx, winner.name + " wins", this.screenWidth/2, (this.screenHeight/2) + 30, 12, "center", "top");
      }
    }

    this.drawTopHUD();

    this.drawWeaponSwitchHUD();

    if(this.mainPlayer && this.mainPlayer.isHeld("scoreboard", false)) {
      this.drawScoreboard();
    }

  }

  drawWeaponSwitchHUD() {
    let weaponSprite = game.sprites["hud_weapon_icon"];
    let startX = 50;
    let width = 20;
    let iconW = 9;
    let iconH = 9;
    let startY = this.screenHeight - 15;
    for(let i = 0; i < 9; i++) {
      let x = startX + (i * width);
      let y = startY;
      if(this.mainPlayer.weaponIndex === i) {
        Helpers.drawRect(game.ctx, new Rect(x - iconW, y - iconH, x + iconW, y + iconH), "", "lightgreen", 1);
      }
      weaponSprite.draw(i, x, y);
      Helpers.drawTextMMX(game.ctx, String(i+1), x, y + 12, 6, "", "");
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

  addKillFeedEntry(killFeed: KillFeedEntry) {
    this.killFeed.unshift(killFeed);
    if(this.killFeed.length > 4) this.killFeed.pop();
  }

  drawTopHUD() {
    let placeStr = "";
    let place = this.players.indexOf(this.mainPlayer) + 1;
    if(place === 1) placeStr = "1st";  
    else if(place === 2) placeStr = "2nd";
    else if(place === 3) placeStr = "3rd";
    else placeStr = String(place) + "th";
    Helpers.drawTextMMX(game.ctx, "Leader: " + String(this.currentWinner.kills), 5, 10, 8, "left", "Top");
    Helpers.drawTextMMX(game.ctx, "Kills: " + String(this.mainPlayer.kills) + "(" + placeStr + ")", 5, 20, 8, "left", "Top");
  }

  get currentWinner() {
    return this.players[0];
  }

  drawScoreboard() {
    let padding = 10;
    let fontSize = 8;
    let col1x = padding + 10;
    let col2x = this.screenWidth * 0.5;
    let col3x = this.screenWidth * 0.75;
    let lineY = padding + 35;
    let labelY = lineY + 5;
    let line2Y = labelY + 10;
    let topPlayerY = line2Y + 5;
    Helpers.drawRect(game.ctx, new Rect(padding, padding, this.screenWidth - padding, this.screenHeight - padding), "black", "", undefined, 0.75);
    Helpers.drawText(game.ctx, "Game Mode: FFA Deathmatch", padding + 10, padding + 10, "white", "", fontSize, "left", "Top", "mmx_font");
    Helpers.drawText(game.ctx, "Map: " + this.name, padding + 10, padding + 20, "white", "", fontSize, "left", "Top", "mmx_font");
    Helpers.drawText(game.ctx, "Playing to: " + String(this.killsToWin), padding + 10, padding + 30, "white", "", fontSize, "left", "Top", "mmx_font"), 
    Helpers.drawLine(game.ctx, padding + 10, lineY, this.screenWidth - padding - 10, lineY, "white", 1);
    Helpers.drawText(game.ctx, "Player", col1x, labelY, "white", "", fontSize, "left", "top", "mmx_font");
    Helpers.drawText(game.ctx, "Kills", col2x, labelY, "white", "", fontSize, "left", "top", "mmx_font");
    Helpers.drawText(game.ctx, "Deaths", col3x, labelY, "white", "", fontSize, "left", "top", "mmx_font");
    Helpers.drawLine(game.ctx, padding + 10, line2Y, this.screenWidth - padding - 10, line2Y, "white", 1);
    let rowH = 10;
    for(let i = 0; i < this.players.length; i++) {
      let player = this.players[i];
      let color = (player === this.mainPlayer) ? "lightgreen" : "white";
      Helpers.drawText(game.ctx, player.name, col1x, topPlayerY + (i)*rowH, color, "", fontSize, "left", "top", "mmx_font");
      Helpers.drawText(game.ctx, String(player.kills), col2x, topPlayerY + (i)*rowH, color, "", fontSize, "left", "top", "mmx_font");
      Helpers.drawText(game.ctx, String(player.deaths), col3x, topPlayerY + (i)*rowH, color, "", fontSize, "left", "top", "mmx_font");
    }


  }

  drawKillFeed() {
    let fromRight = this.screenWidth - 10;
    let fromTop = 10;
    let yDist = 12;
    for(let i = 0; i < this.killFeed.length; i++) {
      let killFeed = this.killFeed[i];
      let msg = killFeed.killer.name + "    " + killFeed.victim.name;
      game.ctx.font = "6px mmx_font";
      if(killFeed.killer === this.mainPlayer || killFeed.victim == this.mainPlayer) {
        let msgLen = game.ctx.measureText(msg).width;
        let msgHeight = 10;
        Helpers.drawRect(game.ctx, new Rect(fromRight - msgLen - 2, fromTop - 2 + (i*yDist) - msgHeight/2, fromRight + 2, fromTop - 2 + msgHeight/2 + (i*yDist)), "black", "white", 1, 0.75);
      }
      let nameLen = game.ctx.measureText(killFeed.victim.name).width;
      Helpers.drawTextMMX(game.ctx, msg, fromRight, fromTop + (i*yDist), 6, "right", "Top");
      let weaponIndex = killFeed.weapon.index;
      game.sprites["hud_killfeed_weapon"].draw(weaponIndex, fromRight - nameLen - 13, fromTop + (i*yDist) - 2, undefined, undefined, undefined, undefined, undefined);
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

    this.camX = Helpers.roundEpsilon(this.camX);
    this.camY = Helpers.roundEpsilon(this.camY);
    
  }
  
  addGameObject(go: GameObject) {
    this.gameObjects.push(go);
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

  getSpawnPoint() {
    //@ts-ignore
    let unoccupied = _.filter(this.spawnPoints, (spawnPoint) => {
      return !spawnPoint.occupied();
    });
    //@ts-ignore
    return _.sample(unoccupied);
  }

}