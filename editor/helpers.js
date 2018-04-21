function inRect(x,y,rect) {
  var rx = rect.x1;
  var ry = rect.y1;
  var rx2 = rect.x2;
  var ry2 = rect.y2;
  return x >= rx && x <= rx2 && y >= ry && y <= ry2;
}

function drawImage(ctx, imgEl, x, y) {
  ctx.drawImage(imgEl, Math.round(x), Math.round(y));
}

function drawImage(ctx, imgEl, sX, sY, sW, sH, x, y, flipX, flipY) {
  
  ctx.save();
  flipX = flipX ? -1: 1;
  flipY = flipY ? -1: 1;
  ctx.scale(flipX, 1);

  /*
  ctx.drawImage(
    imgEl,
    Math.round(sX), //source x
    Math.round(sY), //source y
    Math.round(sW), //source width
    Math.round(sH), //source height
    Math.round(x),  //dest x
    Math.round(y),  //dest y
    Math.round(sW), //dest width
    Math.round(sH)  //dest height
  );
  */

  ctx.drawImage(
    imgEl,
    Math.round(sX), //source x
    Math.round(sY), //source y
    Math.round(sW), //source width
    Math.round(sH), //source height
    flipX * Math.round(x),  //dest x
    Math.round(y),  //dest y
    flipX * Math.round(sW), //dest width
    Math.round(sH)  //dest height
  );

  ctx.restore();
  //ctx.scale(1, 1);
}

function drawRect(ctx, rect, fillColor, strokeColor, strokeWidth, fillAlpha) {
  var rx = Math.round(rect.x1);
  var ry = Math.round(rect.y1);
  var rx2 = Math.round(rect.x2);
  var ry2 = Math.round(rect.y2);

  ctx.beginPath();
  ctx.rect(rx, ry, rx2 - rx, ry2 - ry);      
  
  if(fillAlpha) {
    ctx.globalAlpha = fillAlpha;
  }

  if(strokeColor) {
    strokeWidth = strokeWidth ? strokeWidth : 1;
    ctx.lineWidth = strokeWidth;
    ctx.strokeStyle = strokeColor;
    ctx.stroke();
  }
  
  if(fillColor) {
    ctx.fillStyle = fillColor;
    ctx.fill();
  }

  ctx.globalAlpha = 1;
}

function get2DArrayFromImage(imageData) {
  var data = imageData.data;
  var arr = [];
  var row = [];
  for(let i=0; i<data.length; i+=4) {
    
    if(i % (imageData.width*4) === 0) {
      if(i > 0) {
        arr.push(row);
      }
      row = [];
    }

    var red = data[i];
    var green = data[i+1];
    var blue = data[i+2];
    var alpha = data[i+3];
    
    row.push(new Color(red, green, blue, alpha));

    if(i === data.length - 4) {
      arr.push(row);
    }
  }

  for(let i = 0; i < arr.length; i++) {
    for(let j = 0; j < arr[i].length; j++) {
      arr[i][j] = {
        x: j,
        y: i,
        rgb: arr[i][j],
        neighbors: []
      };
    }
  }

  for(let i = 0; i < arr.length; i++) {
    for(let j = 0; j < arr[i].length; j++) {
      arr[i][j].neighbors.push(get2DArrayEl(arr, i-1, j-1));
      arr[i][j].neighbors.push(get2DArrayEl(arr, i-1, j));
      arr[i][j].neighbors.push(get2DArrayEl(arr, i-1, j+1));
      arr[i][j].neighbors.push(get2DArrayEl(arr, i, j-1));
      arr[i][j].neighbors.push(get2DArrayEl(arr, i, j));
      arr[i][j].neighbors.push(get2DArrayEl(arr, i, j+1));
      arr[i][j].neighbors.push(get2DArrayEl(arr, i+1, j-1));
      arr[i][j].neighbors.push(get2DArrayEl(arr, i+1, j));
      arr[i][j].neighbors.push(get2DArrayEl(arr, i+1, j+1));
      _.pull(arr[i][j].neighbors, null);
    }
  }

  return arr;
}

function getPixelClumpRect(x, y, imageArr) {

  var selectedNode = imageArr[y][x];
  if(selectedNode.rgb.a === 0) {
    console.log("Clicked transparent pixel");
    return null;
  }

  var queue = [];
  queue.push(selectedNode);

  var minX = Infinity;
  var minY = Infinity;
  var maxX = -1;
  var maxY = -1;

  var num  = 0;
  var visitedNodes = new Set();
  while(queue.length > 0) {
    var node = queue.shift();
    num++;
    if(node.x < minX) minX = node.x;
    if(node.y < minY) minY = node.y;
    if(node.x > maxX) maxX = node.x;
    if(node.y > maxY) maxY = node.y;

    for(var neighbor of node.neighbors) {
      if(visitedNodes.has(neighbor)) continue;
      if(queue.indexOf(neighbor) === -1) {
        queue.push(neighbor);
      }
    }
    visitedNodes.add(node);
  }
  //console.log(num);
  return createRect(Math.round(minX),Math.round(minY),Math.round(maxX+1),Math.round(maxY+1));

}

function get2DArrayEl(arr, i, j) {
  if(i < 0 || i >= arr.length) return null;
  if(j < 0 || j >= arr[0].length) return null;
  if(arr[i][j].rgb.a === 0) return null;
  return arr[i][j];
}

function drawText(ctx, text, x, y, color, size, hAlign, vAlign, font) {
  color = color || "black";
  size = size || 14;
  hAlign = hAlign || "center";  //start,end,left,center,right
  vAlign = vAlign || "middle";  //Top,Bottom,Middle,Alphabetic,Hanging
  font = font || "Arial";
  ctx.font = size + "px " + font;
  ctx.fillStyle = color;
  ctx.textAlign = hAlign;
  ctx.textBaseline = vAlign;
  ctx.strokeText(text,x,y);
}

function drawCircle(ctx, x, y, r, fillColor, lineColor, lineThickness) {
  ctx.beginPath();
  ctx.arc(x, y, r, 0, 2*Math.PI, false);
  
  if(fillColor) {
      ctx.fillStyle = fillColor;
      ctx.fill();
  }
  
  if(lineColor) {
      ctx.lineWidth = lineThickness;
      ctx.strokeStyle = lineColor;
      ctx.stroke();
  }

}

function drawLine(ctx, x, y, x2, y2, color, thickness) {

  if(!thickness) thickness = 1;
  if(!color) color = 'black';

  ctx.beginPath();
  ctx.moveTo(x, y);
  ctx.lineTo(x2, y2);
  ctx.lineWidth = thickness;
  ctx.strokeStyle = color;
  ctx.stroke();
}

function deserializeES6(obj) {
  
  if(Array.isArray(obj)) {
    for(var i = 0; i < obj.length; i++) {
      obj[i] = deserializeES6(obj[i]);
    }
  }
  else if(typeof obj === "object") {

    if(obj.className) {
      var tempObj = new classes[obj.className]();
      Object.assign(tempObj, obj);
      obj = tempObj;
    }

    for(var key in obj) {
      if(!obj.hasOwnProperty(key)) continue;
      obj[key] = deserializeES6(obj[key]);
    }
  }
  return obj;
  
}