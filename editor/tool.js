class Tool {
  constructor() {
  }

  onMouseMove(deltaX, deltaY) {

  }
  onMouseDown() {

  }
  onKeyDown(keyCode, firstFrame) {
  }
  onKeyUp(keyCode) {

  }
}

class SelectTool extends Tool {
  constructor() {
    super();
  }

  onMouseMove(deltaX, deltaY) {
    if(this.selection && mousedown) {
      this.selection.move(deltaX, deltaY);
    }
  }

  onMouseDown(selectables) {
    if(this.selection) return;
    for(var selectable of selectables) {
      if(inRect(mouseX, mouseY, selectable.getRect())) {
        this.selection = selectable;
      }
    }
  }

  onKeyDown(keyCode, firstFrame) {
    if(!this.selection) return;
    if(!firstFrame) return;
    var ctrlHeld = isKeyDown("ctrl");

    if(keyCode === inputMap["leftarrow"]) {
      if(!ctrlHeld) this.selection.move(-1, 0);
      else this.selection.resizeCenter(-1, 0);
    }
    if(keyCode === inputMap["rightarrow"]) {
      if(!ctrlHeld) this.selection.move(1, 0);
      else this.selection.resizeCenter(1, 0);
    }
    if(keyCode === inputMap["uparrow"]) {
      if(!ctrlHeld) this.selection.move(0, -1);
      else this.selection.resizeCenter(0, -1);
    }
    if(keyCode === inputMap["downarrow"]) {
      if(!ctrlHeld) this.selection.move(0, 1);
      else this.selection.resizeCenter(0, 1);
    }
    redrawCanvas1();
  }

  /*
  onMouseUp() {
    this.selection = null;
  }

  onMouseLeaveCanvas() {
    this.selection = null;
  }
  */

}

class MoveTool extends Tool {

}

class ResizeTool extends Tool {

}