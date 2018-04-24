class Level {

  gameObjects: GameObject[];
  
  constructor() {

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
  }
}