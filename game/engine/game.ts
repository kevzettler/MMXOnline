class Game {

  level: Level;

  constructor() {

  }

  //Main game loop
  gameLoop() {
    this.level.update();
    this.level.render();
  }

}