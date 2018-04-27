import { GameObject } from "./gameObject";
import { Wall } from "./wall";
import { Point } from "./point";
import { game } from "./game";
import * as Helpers from "./helpers";
import { Actor } from "./actor";

export class Level {

  name: string;
  gameObjects: GameObject[];
  background: HTMLImageElement;
  gravity: number;

  constructor(levelJson: any) {
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
  }
  
  update() {
    for(let go of this.gameObjects) {
      go.update();
    }
  }

  render() {
    game.ctx.clearRect(0, 0, game.canvas.width, game.canvas.height);
    Helpers.drawImage(game.ctx, this.background, 0, 0);
    for(let go of this.gameObjects) {
      go.render();
    }
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