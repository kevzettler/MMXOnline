import { GameObject } from "./gameObject";
import { Wall } from "./wall";
import { Point } from "./point";
import { game } from "./game";
import * as Helpers from "./helpers";

export class Level {

  name: string;
  gameObjects: GameObject[];
  background: HTMLImageElement;

  constructor(levelJson: any) {
    this.name = levelJson.name;
    this.background = game.getBackground(levelJson.backgroundPath);
    this.gameObjects = [];
    for(var instance of levelJson.instances) {
      if(instance.className === "ShapeInstance") {
        let wall: Wall = new Wall();
        for(var point of instance.points) {
          wall.collider.points.push(new Point(point.x, point.y));
          this.gameObjects.push(wall);
        }
      }
      else {

      }
    }
  }
  
  update() {
    for(let go of this.gameObjects) {
      go.update();
    }
  }

  render() {
    for(let go of this.gameObjects) {
      go.render();
    }
    Helpers.drawImage(game.ctx, this.background, 0, 0);
  }
}