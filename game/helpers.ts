import { Rect } from "./rect";
import { Point } from "./point";
import { Shape } from "./shape";
import { Palette } from "./color";

export function inRect(x: number, y: number, rect: Rect): boolean {
  let rx:number = rect.x1;
  let ry:number = rect.y1;
  let rx2:number = rect.x2;
  let ry2:number = rect.y2;
  return x >= rx && x <= rx2 && y >= ry && y <= ry2;
}

export function inCircle(x: number, y: number, circleX: number, circleY: number, r: number): boolean {

  if(Math.sqrt( Math.pow(x - circleX, 2) + Math.pow(y - circleY, 2)) <= r) {
      return true;
  }
  return false;
}

export function toZero(num: number, inc: number, dir: number) {
  if(dir === 1) {
    num -= inc;
    if(num < 0) num = 0;
    return num;
  }
  else if(dir === -1) {
    num += inc;
    if(num > 0) num = 0;
    return num;
  }
  else {
    throw "Must pass in -1 or 1 for dir";
  }
}

export function incrementRange(num: number, min: number, max: number) {
  num++;
  if(num >= max) num = min;
  return num;
}

export function decrementRange(num: number, min: number, max: number) {
  num--;
  if(num < min) num = max - 1;
  return num;
}

export function clamp01(num: number) {
  if(num < 0) num = 0;
  if(num > 1) num = 1;
  return num;
}

//Inclusive
export function randomRange(start: number, end: number) {
  /*
  end++;
  let dist = end - start;
  return Math.floor(Math.random() * dist) + start;
  */
  //@ts-ignore
  return _.random(start, end);
}

export function clampMax(num: number, max: number) {
  return num < max ? num : max;
}

export function clampMin(num: number, min: number) {
  return num > min ? num : min;
}

export function clampMin0(num: number) {
  return clampMin(num, 0);
}

export function clamp(num: number, min: number, max: number) {
  if(num < min) return min;
  if(num > max) return max;
  return num;
}

export function sin(degrees: number) {
  let rads = degrees * Math.PI / 180;
  return Math.sin(rads);
}

export function cos(degrees: number) {
  let rads = degrees * Math.PI / 180;
  return Math.cos(rads);
}

export function atan(value: number) {
  return Math.atan(value) * 180 / Math.PI;
}

export function moveTo(num: number, dest: number, inc: number) {
  inc *= Math.sign(dest - num);
  num += inc;
  return num;
}

export function lerp(num: number, dest: number, timeScale: number) {
  num = num + (dest - num)*timeScale;
  return num;
}

export function lerpNoOver(num: number, dest: number, timeScale: number) {
  num = num + (dest - num)*timeScale;
  if(Math.abs(num - dest) < 1) num = dest;
  return num;
}

//Expects angle and destAngle to be > 0 and < 360
export function lerpAngle(angle: number, destAngle: number, timeScale: number) {
  let dir = 1;
  if(Math.abs(destAngle - angle) > 180) {
    dir = -1;
  }
  angle = angle + dir*(destAngle - angle) * timeScale;
  return to360(angle);
}

export function to360(angle: number) {
  if(angle < 0) angle += 360;
  if(angle > 360) angle -= 360;
  return angle;
}

export function getHex(r: number, g: number, b: number, a: number) {
  return "#" + r.toString(16) + g.toString(16) + b.toString(16) + a.toString(16);
}

export function roundEpsilon(num: number) {
  let numRound = Math.round(num);
  let diff = Math.abs(numRound - num);
  if(diff < 0.0001) {
    return numRound;
  }
  return num;
}

let autoInc = 0;
export function getAutoIncId() {
  autoInc++;
  return autoInc;
}

export function noCanvasSmoothing(c: CanvasRenderingContext2D) {
  c.webkitImageSmoothingEnabled = false;
  c.mozImageSmoothingEnabled = false;
  c.imageSmoothingEnabled = false; /// future
}

let helperCanvas = document.createElement("canvas");
let helperCtx = helperCanvas.getContext("2d");
noCanvasSmoothing(helperCtx);

let helperCanvas2 = document.createElement("canvas");
let helperCtx2 = helperCanvas2.getContext("2d");
noCanvasSmoothing(helperCtx2);

let helperCanvas3 = document.createElement("canvas");
let helperCtx3 = helperCanvas3.getContext("2d");
noCanvasSmoothing(helperCtx3);

export function drawImage(ctx: CanvasRenderingContext2D, imgEl: HTMLImageElement, sX: number, sY: number, sW?: number, sH?: number, 
  x?: number, y?: number, flipX?: number, flipY?: number, options?: string, alpha?: number, palette?: Palette, scaleX?: number, scaleY?: number): void {
  
  if(!sW) {
    ctx.drawImage(imgEl, Math.ceil(sX), Math.ceil(sY));
    return;
  }

  ctx.globalAlpha = (alpha === null || alpha === undefined) ? 1 : alpha;

  helperCanvas.width = sW;
  helperCanvas.height = sH;
  
  helperCtx.save();
  scaleX = scaleX || 1;
  scaleY = scaleY || 1;
  flipX = (flipX || 1);
  flipY = (flipY || 1);
  helperCtx.scale(flipX * scaleX, flipY * scaleY);

  helperCtx.clearRect(0, 0, helperCanvas.width, helperCanvas.height);
  helperCtx.drawImage(
    imgEl,
    sX, //source x
    sY, //source y
    sW, //source width
    sH, //source height
    0,  //dest x
    0, //dest y
    flipX * sW, //dest width
    flipY * sH  //dest height
  );

  if(palette) {
    let imageData = helperCtx.getImageData(0, 0, helperCanvas.width, helperCanvas.height);
    let data = imageData.data;
    for (let i = 0; i < data.length; i += 4) {
      let r = data[i];
      let g = data[i+1];
      let b = data[i+2];
      let a = data[i+3];

      let color = palette.colorMap[getHex(r, g, b, a)];
      if(color !== null && color !== undefined) {
        data[i] = color.r;
        data[i+1] = color.g;
        data[i+2] = color.b;
      }
    }
    helperCtx.putImageData(imageData, 0, 0);​
  }

  if(options === "flash") {
    let imageData = helperCtx.getImageData(0, 0, helperCanvas.width, helperCanvas.height);
    let data = imageData.data;
    for (let i = 0; i < data.length; i += 4) {
      let r = data[i];
      let g = data[i+1];
      let b = data[i+2];
      let a = data[i+3];
      data[i] = clampMax(r + 64, 255);
      data[i+1] = clampMax(g + 64, 255);
      data[i+2] = clampMax(b + 128, 255);
    }
    helperCtx.putImageData(imageData, 0, 0);​
  }
  else if(options === "hit") {
    let imageData = helperCtx.getImageData(0, 0, helperCanvas.width, helperCanvas.height);
    let data = imageData.data;
    for (let i = 0; i < data.length; i += 4) {
      let r = data[i];
      let g = data[i+1];
      let b = data[i+2];
      let a = data[i+3];
      data[i] = clampMax(r + 128, 255);
      data[i+1] = clampMax(g + 128, 255);
      data[i+2] = clampMax(b + 128, 255);
    }
    helperCtx.putImageData(imageData, 0, 0);​
  }

  if(flipX === 1) x = Math.ceil(x);
  else if(flipX === -1) x = Math.floor(x);
  if(flipY === 1) y = Math.ceil(y);
  else if(flipY === -1) y = Math.floor(y);
  ctx.drawImage(helperCanvas, x, y);
  
  ctx.globalAlpha = 1;
  helperCtx.restore();
}

export function drawRect(ctx: CanvasRenderingContext2D, rect: Rect, fillColor?: string, strokeColor?: string, strokeWidth?: number, fillAlpha?: number): void {
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

export function drawPolygon(ctx: CanvasRenderingContext2D, shape: Shape, closed: boolean, fillColor?: string, lineColor?: string, lineThickness?: number, fillAlpha?: number): void {

  let vertices = shape.points;

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

export function drawTextMMX(ctx: CanvasRenderingContext2D, text: string, x: number, y: number, size: number, hAlign: string, vAlign: string) {
  ctx.save();
  
  ctx.shadowColor = "black" // string
  ctx.shadowOffsetX = size/2; // integer
  ctx.shadowOffsetY = size/2; // integer
  ctx.shadowBlur = 0; // integer
  
  let gradient = ctx.createLinearGradient(x, y - size/2, x, y);
  gradient.addColorStop(0, "#6090D0");
  gradient.addColorStop(0.5, "#C8D8E8");
  gradient.addColorStop(1.0, "#6090D0");
  ctx.fillStyle = gradient;

  size = size || 14;
  hAlign = hAlign || "center";  //start,end,left,center,right
  vAlign = vAlign || "middle";  //Top,Bottom,Middle,Alphabetic,Hanging

  ctx.font = size + "px mmx_font";
  ctx.textAlign = hAlign;
  ctx.textBaseline = vAlign;
  ctx.fillText(text,x,y);
  ctx.restore();
}

export function drawText(ctx: CanvasRenderingContext2D, text: string, x: number, y: number, fillColor: string, outlineColor: string, size: number, hAlign: string, vAlign: string, font: string) {
  ctx.save();
  /*
  ctx.scale(0.25, 0.25);
  x *= 4;
  y *= 4;
  */
  fillColor = fillColor || "black";
  size = size || 14;
  hAlign = hAlign || "center";  //start,end,left,center,right
  vAlign = vAlign || "middle";  //Top,Bottom,Middle,Alphabetic,Hanging
  font = font || "Arial";
  ctx.font = size + "px " + font;
  ctx.fillStyle = fillColor;
  ctx.textAlign = hAlign;
  ctx.textBaseline = vAlign;
  ctx.fillText(text,x,y);
  if(outlineColor) {
    ctx.lineWidth = 1;
    ctx.strokeStyle = outlineColor;
    ctx.strokeText(text,x,y);
  }
  ctx.restore();
}

export function drawCircle(ctx: CanvasRenderingContext2D, x: number, y: number, r: number, fillColor?: string, lineColor?: string, lineThickness?: number) {
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

export function drawLine(ctx: CanvasRenderingContext2D, x: number, y: number, x2: number, y2: number, color?: string, thickness?: number) {

  if(!thickness) thickness = 1;
  if(!color) color = 'black';

  ctx.beginPath();
  ctx.moveTo(x, y);
  ctx.lineTo(x2, y2);
  ctx.lineWidth = thickness;
  ctx.strokeStyle = color;
  ctx.stroke();
}

export function linepointNearestMouse(x0: number, y0: number, x1: number, y1: number, x: number, y: number): Point {
  function lerp(a: number,b: number,x: number):number{ return(a+x*(b-a)); };
  let dx: number=x1-x0;
  let dy: number=y1-y0;
  let t: number = ((x-x0)*dx+(y-y0)*dy)/(dx*dx+dy*dy);
  let lineX: number = lerp(x0, x1, t);
  let lineY: number = lerp(y0, y1, t);
  return new Point(lineX,lineY);
}

export function inLine(mouseX: number, mouseY: number, x0: number, y0: number, x1: number, y1: number): boolean {

  let threshold: number = 4;

  let small_x: number = Math.min(x0,x1);
  let big_x: number = Math.max(x0,x1);

  if(mouseX < small_x - (threshold*0.5) || mouseX > big_x + (threshold*0.5)){
    return false;
  }

  let linepoint: Point = linepointNearestMouse(x0, y0, x1, y1, mouseX, mouseY);
  let dx: number = mouseX - linepoint.x;
  let dy: number = mouseY - linepoint.y;
  let distance: number = Math.abs(Math.sqrt(dx*dx+dy*dy));
  if(distance < threshold) {
    return true;
  }
  else {
    return false;
  }
}
