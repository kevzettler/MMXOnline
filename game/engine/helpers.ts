function inRect(x: number, y: number, rect: Rect): boolean {
  let rx:number = rect.x1;
  let ry:number = rect.y1;
  let rx2:number = rect.x2;
  let ry2:number = rect.y2;
  return x >= rx && x <= rx2 && y >= ry && y <= ry2;
}

function inCircle(x: number, y: number, circleX: number, circleY: number, r: number): boolean {

  if(Math.sqrt( Math.pow(x - circleX, 2) + Math.pow(y - circleY, 2)) <= r) {
      return true;
  }
  return false;
}

function drawImage(ctx: CanvasRenderingContext2D, imgEl: HTMLImageElement, sX: number, sY: number, sW?: number, sH?: number, x?: number, y?: number, flipX?: number, flipY?: number): void {

  ctx.save();
  flipX = flipX ? -1: 1;
  flipY = flipY ? -1: 1;
  ctx.scale(flipX, 1);

  if(!sW) {
    ctx.drawImage(imgEl, Math.round(sX), Math.round(sY));
  } 
  else {
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
  }

  ctx.restore();
}

function drawRect(ctx: CanvasRenderingContext2D, rect: Rect, fillColor?: string, strokeColor?: string, strokeWidth?: number, fillAlpha?: number): void {
  let rx: number = Math.round(rect.x1);
  let ry: number = Math.round(rect.y1);
  let rx2: number = Math.round(rect.x2);
  let ry2: number = Math.round(rect.y2);

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

function drawPolygon(ctx, vertices, closed, fillColor, lineColor, lineThickness, fillAlpha): void {

  if(fillAlpha) {
    ctx.globalAlpha = fillAlpha;
  }

  ctx.beginPath();
  ctx.moveTo(vertices[0].x, vertices[0].y);

  for(let i: number = 1; i < vertices.length; i++) {
      ctx.lineTo(vertices[i].x, vertices[i].y);
  }

  if(closed) {
      ctx.closePath();

      if(fillColor) {
          ctx.fillStyle = fillColor;
          ctx.fill();
      }
  }

  if(lineColor) {
      ctx.lineWidth = lineThickness;
      ctx.strokeStyle = lineColor;
      ctx.stroke();
  }

  ctx.globalAlpha = 1;
}

function pointInPolygon(x: number, y: number, vertices: Point[]): boolean {
  // ray-casting algorithm based on
  // http://www.ecse.rpi.edu/Homepages/wrf/Research/Short_Notes/pnpoly.html
  let inside: boolean = false;
  for (let i:number = 0, j:number = vertices.length - 1; i < vertices.length; j = i++) {
      let xi:number = vertices[i].x, yi:number = vertices[i].y;
      let xj:number = vertices[j].x, yj:number = vertices[j].y;

      let intersect: boolean = ((yi > y) !== (yj > y))
          && (x < (xj - xi) * (y - yi) / (yj - yi) + xi);
      if (intersect) inside = !inside;
  }

  return inside;
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

function linepointNearestMouse(x0, y0, x1, y1, x, y) {
  var lerp=function(a,b,x){ return(a+x*(b-a)); };
  var dx=x1-x0;
  var dy=y1-y0;
  var t = ((x-x0)*dx+(y-y0)*dy)/(dx*dx+dy*dy);
  var lineX = lerp(x0, x1, t);
  var lineY = lerp(y0, y1, t);
  return({x:lineX,y:lineY});
}

function inLine(mouseX, mouseY, x0, y0, x1, y1) {

  var threshold = 4;

  var small_x = Math.min(x0,x1);
  var big_x = Math.max(x0,x1);

  if(mouseX < small_x - (threshold*0.5) || mouseX > big_x + (threshold*0.5)){
      return false;
  }

  var linepoint = linepointNearestMouse(x0, y0, x1, y1, mouseX, mouseY);
  var dx = mouseX - linepoint.x;
  var dy = mouseY - linepoint.y;
  var distance = Math.abs(Math.sqrt(dx*dx+dy*dy));
  if(distance < threshold){
      return true;
  }
  else{
      return false;
  }
}