let sprites: { [name: string]: Sprite; } = { };
let levels: { [name: string]: Level } = { };
let level: Level;

let spritesheets: { [path: string]: HTMLImageElement } = { };
let backgrounds: { [path: string]: HTMLImageElement } = { };

let isServer: boolean = false;
let isClient: boolean = !isServer;

let showHitboxes = true;

let canvas: HTMLCanvasElement = <HTMLCanvasElement>$("#canvas")[0];
let ctx = canvas.getContext("2d");

function getSpritesheet(path: string) {
  if(!spritesheets[path]) {
    spritesheets[path] = document.createElement("img");
    spritesheets[path].src = path;
  }
  return spritesheets[path];
}

function getBackground(path: string) {
  if(!backgrounds[path]) {
    backgrounds[path] = document.createElement("img");
    backgrounds[path].src = path;
  }
  return backgrounds[path];
}

function loadSprites() {
  for(var spriteJson of spriteJsons) {
    let sprite: Sprite = new Sprite(spriteJson);
    sprites[sprite.name] = sprite;
  }
}

function loadLevels() {
  for(var levelJson of levelJsons) {
    let level: Level = new Level(levelJson);
    levels[level.name] = level;
  }
}

function isLoaded() {
  for(let name in sprites) {
    if(!sprites[name].spritesheet.complete) {
      return false;
    }
  }
  for(let name in levels) {
    if(!levels[name].background.complete) {
      return false;
    }
  }
  return true;
}

//Main game loop
function gameLoop() {
  if(isLoaded()) {
    level.update();
    level.render();
  }
}

loadSprites();
loadLevels();
level = levels["new_level"];

window.setInterval(gameLoop, 1000/60);