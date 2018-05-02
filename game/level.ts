import { GameObject } from "./gameObject";
import { Wall } from "./wall";
import { Point } from "./point";
import { game } from "./game";
import * as Helpers from "./helpers";
import { Actor } from "./actor";
import { Player } from "./player";
import { Rect } from "./rect";
import { Collider } from "./collider";

export class Level {

  name: string;
  gameObjects: GameObject[];
  background: HTMLImageElement;
  gravity: number;
  localPlayers: Player[];
  players: Player[];
  camX: number;
  camY: number;
  fixedCam: boolean;
  zoomScale: number;
  mainPlayer: Player;

  constructor(levelJson: any) {
    this.zoomScale = 3;
    this.camX = 0;
    this.camY = 0;
    this.fixedCam = false;
    this.gravity = 900;
    this.name = levelJson.name;
    this.background = game.getBackground(levelJson.backgroundPath);

    this.gameObjects = [];
    for(var instance of levelJson.instances) {
      if(instance.className === "ShapeInstance") {
        let wall: Wall = new Wall();
        for(var point of instance.points) {
          wall.collider.shape.points.push(new Point(point.x, point.y));
        }
        this.gameObjects.push(wall);
      }
      else {
        let actor: Actor = new Actor();
        actor.sprite = game.sprites[instance.spriteName];
        actor.pos = new Point(instance.pos.x, instance.pos.y);
        actor.name = instance.name;
        this.gameObjects.push(actor);
      }
    }
    this.localPlayers = [];
    this.players = [];
  }
  
  update() {

    for(let go of this.gameObjects) {
      go.preUpdate();
      go.update();
    }
   
    this.render();

    for(let player of this.localPlayers) {
      player.clearInputPressed();
    }

  }

  render() {
    
    game.canvas.width = Math.min(game.canvas.width, this.background.width * this.zoomScale);
    game.canvas.height = Math.min(game.canvas.height, this.background.height * this.zoomScale);

    if(this.mainPlayer.character) {
      this.computeCamPos(this.mainPlayer.character);
    }
    game.ctx.setTransform(this.zoomScale, 0, 0, this.zoomScale, 0, 0);
    game.ctx.clearRect(0, 0, game.canvas.width, game.canvas.height);
    Helpers.drawRect(game.ctx, new Rect(0, 0, game.canvas.width, game.canvas.height), "gray");
    Helpers.drawImage(game.ctx, this.background, -this.camX, -this.camY);
    
    for(let go of this.gameObjects) {
      go.render(-this.camX, -this.camY);
    }

    this.drawHUD();
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
    game.sprites["hud_health_base"].draw(0, baseX, baseY);
    baseY -= 16;
    for(let i = 0; i < player.health; i++) {
      game.sprites["hud_health_full"].draw(0, baseX, baseY);
      baseY -= 2;
    }
    for(let i = 0; i < player.maxHealth - player.health; i++) {
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
      for(let i = 0; i < player.weapon.ammo; i++) {
        game.sprites["hud_weapon_full"].draw(player.weapon.index - 1, baseX, baseY);
        baseY -= 2;
      }
      for(let i = 0; i < player.weapon.maxAmmo - player.weapon.ammo; i++) {
        game.sprites["hud_health_empty"].draw(0, baseX, baseY);
        baseY -= 2;
      }
      game.sprites["hud_health_top"].draw(0, baseX, baseY);
    }
  }

  get width() { return this.background.width; }
  get height() { return this.background.height; }

  computeCamPos(actor: Actor) {
    let scaledCanvasW = game.canvas.width / this.zoomScale;
    let scaledCanvasH = game.canvas.height / this.zoomScale;
    
    this.camX = actor.pos.x - scaledCanvasW/2;
    this.camY = actor.pos.y - scaledCanvasH/2;

    if(this.camX < 0) this.camX = 0;
    if(this.camY < 0) this.camY = 0;

    let maxX = this.background.width - scaledCanvasW;
    let maxY = this.background.height - scaledCanvasH;

    if(this.camX > maxX) this.camX = maxX;
    if(this.camY > maxY) this.camY = maxY;
  }
  
  addGameObject(go: GameObject) {
    this.gameObjects.push(go);
  }

  //Checks for collisions and returns the first one collided.
  checkCollisionActor(actor: Actor, offsetX: number, offsetY: number): Collider {
    
    if(!actor.collider || actor.collider.isTrigger) return undefined;
    for(let go of this.gameObjects) {
      if(go === actor) continue;
      if(!go.collider || go.collider.isTrigger) continue;
      let actorShape = actor.collider.shape.clone(offsetX, offsetY);
      if(go.collider.shape.intersectsShape(actorShape)) {
        return go.collider;
      }
    }
    return undefined;
  }

  checkTriggerActor(actor: Actor, offsetX: number, offsetY: number): Collider {
    
    if(!actor.collider) return undefined;
    for(let go of this.gameObjects) {
      if(go === actor) continue;
      if(!go.collider) continue;
      if(!go.collider.isTrigger && !actor.collider.isTrigger) continue;
      let actorShape = actor.collider.shape.clone(offsetX, offsetY);
      if(go.collider.shape.intersectsShape(actorShape)) {
        return go.collider;
      }
    }
    return undefined;
  }

}