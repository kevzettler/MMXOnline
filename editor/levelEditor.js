

var data = {
  levels: [],
  selectedLevel: null,
  backgrounds: [],
  selectedBackground: null,
  objs: [],
  selectedObj: null,
  instances: [],
  selectedInstances: [],
  isPlaying: false,
  zoom: 5,
  hideGizmos: false,
  newLevelName: ""
};

var canvas1DefaultWidth = 700;
var canvas1DefaultHeight = 600;

var canvas1 = $("#canvas1")[0];
var canvas1Wrapper = $("#canvas1").parent()[0];
var c1 = $("#canvas1")[0].getContext("2d");

c1.webkitImageSmoothingEnabled = false;
c1.mozImageSmoothingEnabled = false;
c1.imageSmoothingEnabled = false; /// future

var methods = {
  onBackgroundChange(newBackground) {
    this.selectedBackground = newBackground;

    if(this.selectedLevel)
      this.selectedLevel.background = newBackground;

    //this.selectedSprite = null;
    //this.selectedHitbox = null;
    if(!this.selectedBackground) {
      redrawCanvas1();
      return;
    }
    var backgroundImg = document.createElement("img");
    backgroundImg.onload = function() { 
      canvas1.width = backgroundImg.width;
      canvas1.height = backgroundImg.height;
      c1.drawImage(backgroundImg, 0, 0);      
      var imageData = c2.getImageData(0,0,canvas2.width,canvas2.height);
      newBackground.imageEl = backgroundImg;
      redrawCanvas1();
    };
    backgroundImg.src = newBackground.path;
  },
  addLevel() {
    var newLevel = new Level(this.newLevelName);
    this.changeLevel(newLevel);
    this.levels.push(newLevel);
    this.selectedObj = null;
    this.selectedInstances = [];
    resetVue();
  },
  changeLevel(newLevel) {
    this.selectedSprite = newLevel;
    this.onSpritesheetChange(newLevel.spritesheet);
    this.selectedObj = null;
    this.selectedInstances = [];
    redrawCanvas1();
  },
  saveLevel() {

    var savedBackground = this.selectedLevel.background;
    this.selectedLevel.background = savedBackground.path;

    Vue.http.post("save-sprite", this.selectedLevel).then(response => {
      console.log("Successfully saved level");
      this.selectedLevel.background = savedBackground;
    }, error => {
      console.log("Failed to save level");
      this.selectedLevel.background = savedBackground;
    });
  },
  play() {
    this.isPlaying = !this.isPlaying;
  },
  redraw() {
    redrawCanvas1();
  },
};

var computed = {
  displayZoom: {
    get () {
      return this.zoom * 100;
    },
    set (value) {
      this.zoom = value;
    }
  }
}

var app1 = new Vue({
  el: '#app1',
  data: data,
  computed: computed,
  methods: methods,
  created: function() {
    Vue.http.get("get-spritesheets").then(response => {
      //console.log(response);
      this.spritesheets = _.map(response.data, (spritesheet) => {
        return {
          path: spritesheet
        };
      });
    }, error => {
      console.log("Error getting spritesheets");      
    }).then(response => {
      Vue.http.get("get-sprites").then(response => {
        //console.log(response);
        this.sprites = deserializeES6(response.data);
        for(var sprite of this.sprites) {
          sprite.convertSpritesheetToObj();
        }
      }, error => {
        console.log("Error getting sprites");
      });
    }).then(response => {
      Vue.http.get("get-backgrounds").then(response => {
        //console.log(response);
        this.backgrounds = _.map(response.data, (background) => {
          return {
            path: background
          };
        });
      }, error => {
        console.log("Error getting backgrounds");
      });
    }).then(response => {
      Vue.http.get("get-levels").then(response => {
        //console.log(response);
        this.levels = deserializeES6(response.data);
        for(var level of this.levels) {
          level.convertBackgroundToObj();
        }
      }, error => {
        console.log("Error getting levels");
      });
    });
    
  }
});

var app2 = new Vue({
  el: '#app2',
  data: data,
  methods: methods,
  computed: computed
});

var app3 = new Vue({
  el: '#app3',
  data: data,
  methods: methods,
  computed: computed
});

function resetVue() {
  app1.$forceUpdate();
  app2.$forceUpdate();
  app3.$forceUpdate();
}

var animFrameIndex = 0;
var animTime = 0;

setInterval(mainLoop, 1000 / 60);

function mainLoop() {
  if(data.isPlaying) {
    animTime++;
    var frames = data.selectedSprite.frames;
    if(animTime >= frames[animFrameIndex].duration) {
      animFrameIndex++;
      if(animFrameIndex >= frames.length) {
        animFrameIndex = 0;
      }
      animTime = 0;
    }
    redrawCanvas1();
  }
}

function getRealMouseX(rawMouseX) {
  var zoomProportion = data.zoom - 1;
  var w = canvas1.width / data.zoom;
  var w2 = (canvas1.width - w)/2;
  return w2 + (rawMouseX * (1/data.zoom));
}

function getRealMouseY(rawMouseY) {
  var zoomProportion = data.zoom - 1;
  var h = canvas1.height / data.zoom;
  var h2 = (canvas1.height - h)/2;
  return h2 + (rawMouseY * (1/data.zoom));
}

function redrawCanvas1() {

  var zoomScale = data.zoom;
  
  c1.setTransform(zoomScale, 0, 0, zoomScale, -(zoomScale - 1) * canvas1.width/2, -(zoomScale - 1) * canvas1.height/2);

  c1.clearRect(0, 0, canvas1.width, canvas1.height);
  drawImage(data.selectedLevel.background.imageEl, 0, 0);

  for(var instance of data.instances) {
    //Draw the instance here...
  }

}

canvas1.onclick = function(event) {

  //console.log("CLICK");

  var x = event.pageX - canvas1.offsetLeft + canvas1Wrapper.scrollLeft;
  var y = event.pageY - canvas1.offsetTop + canvas1Wrapper.scrollTop;

  console.log("Clicked coords " + x + "," + y);

  for(var instance of data.selectedLevel.instances) {
    if(inRect(x,y,instance.rect)) {
      data.selectedInstances = [ instance ];
      redrawCanvas1();
      return;
    }
  }

};

var mouseX = 0;
var mouseY = 0;
var mousedown = false;
var middlemousedown = false;
var rightmousedown = false;

canvas1.onmousemove = function(e) {

  let oldMouseX = mouseX;
  let oldMouseY = mouseY;

  var rawMouseX = event.pageX - canvas1.offsetLeft;
  var rawMouseY = event.pageY - canvas1.offsetTop;

  mouseX = getRealMouseX(rawMouseX);
  mouseY = getRealMouseY(rawMouseY);

  let deltaX = mouseX - oldMouseX;
  let deltaY = mouseY - oldMouseY;

  var hb = data.selectedHitbox;

  onMouseMove(deltaX, deltaY);
  redrawCanvas1();

}

canvas1.onmousedown = function(e) {
  //console.log(mouseX + "," + mouseY)
  if(e.which === 1) {
    mousedown = true;
    //onMouseDown();
    e.preventDefault();
  }
  else if(e.which === 2) {
    middlemousedown = true;
    e.preventDefault();
  }
  else if(e.which === 3) {
    rightmousedown = true;
    e.preventDefault();
  }
  
}

canvas1.onmouseup = function(e) {
  if(e.which === 1) {
    mousedown = false;
    //onMouseUp();
    e.preventDefault();
  }
  else if(e.which === 2) {
    middlemousedown = false;
    e.preventDefault();
  }
  else if(e.which === 3) {
    rightmousedown = false;
    e.preventDefault();
  }
}

canvas1.onmouseleave = function(e) {
  //onMouseLeaveCanvas();  
}

canvas1.onmousewheel = function(e) {
  var delta = (e.wheelDelta/180);
  data.zoom += delta;
  if(data.zoom < 1) data.zoom = 1;
  if(data.zoom > 5) data.zoom = 5;
  redrawCanvas1();
  resetVue();
  /*
  if(key_down('ctrl')) {
      set_zoom(zoom + (e.wheelDelta/180)*0.1);
      e.preventDefault();
  }
  */
}

document.onkeydown = function(e) {
  onKeyDown(inputMap[e.keyCode], !keysHeld[e.keyCode]);
  keysHeld[e.keyCode] = true;
  //Prevent SPACEBAR default scroll behavior
  if(e.keyCode === inputMap['space']) {
    e.preventDefault();
  }
}

document.onkeyup = function(e) {
  keysHeld[e.keyCode] = false;
  //onKeyUp(e.keyCode);
}

function onMouseMove(deltaX, deltaY) {
  if(data.selectedInstances.length > 0 && mousedown) {
    for(var instance of data.selectedInstances) {
      instance.move(deltaX, deltaY);
    }
  }
}

function onKeyDown(key, firstFrame) {

  if(key === "escape") {
    data.selectedInstances = [];
  }
  /*
  if(data.selectedInstances.length > 0 && firstFrame) {
    if(key === "a") {
      if(!ctrlHeld) data.selectedHitbox.move(-1, 0);
      else data.selectedHitbox.resizeCenter(-1, 0);
    }
    else if(key === "d") {
      if(!ctrlHeld) data.selectedHitbox.move(1, 0);
      else data.selectedHitbox.resizeCenter(1, 0);
    }
    else if(key === "w") {
      if(!ctrlHeld) data.selectedHitbox.move(0, -1);
      else data.selectedHitbox.resizeCenter(0, -1);
    }
    else if(key === "s") {
      if(!ctrlHeld) data.selectedHitbox.move(0, 1);
      else data.selectedHitbox.resizeCenter(0, 1);
    }
    else if(key === "leftarrow") {
      if(!ctrlHeld) data.selectedHitbox.move(-1, 0);
      else data.selectedHitbox.resizeCenter(-1, 0);
    }
    else if(key === "rightarrow") {
      if(!ctrlHeld) data.selectedHitbox.move(1, 0);
      else data.selectedHitbox.resizeCenter(1, 0);
    }
    else if(key === "uparrow") {
      if(!ctrlHeld) data.selectedHitbox.move(0, -1);
      else data.selectedHitbox.resizeCenter(0, -1);
    }
    else if(key === "downarrow") {
      if(!ctrlHeld) data.selectedHitbox.move(0, 1);
      else data.selectedHitbox.resizeCenter(0, 1);
    }
  }
  else if(data.selectedFrame && firstFrame) {
    if(key === "a") {
      data.selectedFrame.offset.x -= 1;
    }
    else if(key === "d") {
      data.selectedFrame.offset.x += 1;
    }
    else if(key === "w") {
      data.selectedFrame.offset.y -= 1;
    }
    else if(key === "s") {
      data.selectedFrame.offset.y += 1;
    }
  }
  if(firstFrame) {
    if(key === "e") {
      app1.selectNextFrame();
    } 
    else if(key === "q") {
      app1.selectPrevFrame();
    } 
  }

  redrawCanvas1();
  */
}