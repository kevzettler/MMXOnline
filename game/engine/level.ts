class Level {

  gameObjects: GameObject[];
  
  constructor(name) {
    this.className = this.constructor.name;
    this.instances = [];
    this.name = name || "new_level";
    this.path = "levels/" + this.name + ".json";
  }

  onDeserialize() {
    this.background = _.find(data.backgrounds, (loopSheet) => {
      return loopSheet.path === this.backgroundPath;
    });
  }

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