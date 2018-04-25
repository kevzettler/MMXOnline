class Level {

  name: string;
  gameObjects: GameObject[];
  background: HTMLImageElement;

  constructor(levelJson: any) {
    this.name = levelJson.name;
    this.background = getBackground(levelJson.backgroundPath);
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
    drawImage(ctx, this.background, 0, 0);
  }
}