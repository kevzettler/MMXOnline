import { GameObject } from "./gameObject";
import { Wall } from "./wall";
import { Point } from "./point";
import { game } from "./game";
import * as Helpers from "./helpers";
import { Actor } from "./actor";
import { Player } from "./player";
import { Rect } from "./rect";

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
    this.gravity = 1000;
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
      go.update();
    }
  }

  render() {
    
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
  }

  computeCamPos(actor: Actor) {
    let scaledCanvasW = game.canvas.width / this.zoomScale;
    let scaledCanvasH = game.canvas.height / this.zoomScale;
    
    this.camX = actor.pos.x - scaledCanvasW/2;
    this.camY = actor.pos.y - scaledCanvasH/2;

    if(this.camX < 0) this.camX = 0;
    if(this.camY < 0) this.camY = 0;

    if(this.camX > this.background.width - scaledCanvasW/2) this.camX = this.background.width - scaledCanvasW/2;
    if(this.camY > this.background.height - scaledCanvasH/2) this.camY = this.background.height - scaledCanvasH/2;
  }
  
  addGameObject(go: GameObject) {
    this.gameObjects.push(go);
  }

  checkCollisionActor(actor: Actor, offsetX: number, offsetY: number): boolean {
    
    if(!actor.collider || actor.collider.isTrigger) return false;
    for(let go of this.gameObjects) {
      if(go === actor) continue;
      if(!go.collider || go.collider.isTrigger) continue;
      let actorShape = actor.collider.shape.clone(offsetX, offsetY);
      if(go.collider.shape.intersectsShape(actorShape)) {
        return true;
      }
    }
    return false;
  }

}