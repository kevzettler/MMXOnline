export class Color {

  r: number;
  g: number;
  b: number;
  a: number;

  constructor(r:number, g: number, b: number, a: number) {
    this.r = r;
    this.g = g;
    this.b = b;
    this.a = a;
  }

  get hex() {
    return "#" + this.r.toString(16) + this.g.toString(16) + this.b.toString(16) + this.a.toString(16);
  }

}

let paletteCanvas = document.createElement("canvas");
let paletteCtx = paletteCanvas.getContext("2d");

export class Palette {

  imageEl: HTMLImageElement;
  imagePath: string = "";
  colorMap: { [color: string]: Color; } = {};

  constructor(path: string) {
    this.imagePath = path;
    this.imageEl = document.createElement("img");
    this.imageEl.src = path;
    this.imageEl.onload = () => this.onLoad();
  }

  onLoad() {

    paletteCanvas.width = this.imageEl.width;
    paletteCanvas.height = this.imageEl.height;
    paletteCtx.clearRect(0, 0, this.imageEl.width, this.imageEl.height);
    paletteCtx.drawImage(this.imageEl, 0, 0);
    let imageData = paletteCtx.getImageData(0, 0, paletteCanvas.width, paletteCanvas.height);
    let data = imageData.data;

    for (let i = 0, j = 0; i < data.length/2; i += 4, j++) {
      let r = data[i];
      let g = data[i+1];
      let b = data[i+2];
      let a = data[i+3];
      let topColor = new Color(r, g, b, a);

      let r2 = data[i + data.length/2];
      let g2 = data[i + 1 + data.length/2];
      let b2 = data[i + 2 + data.length/2];
      let a2 = data[i + 3 + data.length/2];
      let botColor = new Color(r2, g2, b2, a2);

      this.colorMap[topColor.hex] = botColor;
    }
  }

}