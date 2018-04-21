"use strict";

var inputMap = [];
inputMap[17] = 'ctrl';
inputMap[16] = 'shift';
inputMap[9] = 'tab';
inputMap[27] = 'escape';
inputMap[13] = 'enter';
inputMap[187] = '+';
inputMap[189] = '-';
inputMap[32] = 'space';
inputMap[37] = 'leftarrow';
inputMap[39] = 'rightarrow';
inputMap[38] = 'uparrow';
inputMap[40] = 'downarrow';

for(var i = 65; i <= 90; i++) {
  inputMap[i] = String.fromCharCode(i + 32);
}
for(var i = 0; i <= 9; i++) {
  inputMap[i] = String.fromCharCode(i + 48);
}

var keysHeld = [];

function isKeyDown(key) {
  var keyCode;
  if(key.length === 1) {
    if(/^[a-z]+$/i.test(key)) {
      keyCode = key.charCodeAt(0) - 32;
    }
    else if(/^[0-9]+$/i.test(key)) {
      keyCode = key.charCodeAt(0);   
    }
    else {
      keyCode = inputMap[key];
    }
  }
  else {
    keyCode = inputMap[key];
  }
  return keysHeld[keyCode];
}