/*
let debug = false;
let debugNum = 8;

let canvas: HTMLCanvasElement = <HTMLCanvasElement> document.getElementById("canvas");
let ctx: CanvasRenderingContext2D = canvas.getContext("2d");

let cardSpriteSheet: HTMLImageElement = <HTMLImageElement> document.createElement("img"); 
cardSpriteSheet.src = "img/cards.png";

let deckImage: HTMLImageElement = <HTMLImageElement> document.createElement("img"); 
deckImage.src = "img/deck.png";

let cardBackImage: HTMLImageElement = <HTMLImageElement> document.createElement("img"); 
cardBackImage.src = "img/cardBack.png";

const canvasWidth = 1200;
const canvasHeight = 600;

const cardWidth: number = 73;
const cardHeight: number = 98;

const cardDrawWidth: number = 73 * 0.875;
const cardDrawHeight: number = 98 * 0.875;

const smallCardWidth: number = 73 * 0.575;
const smallCardHeight: number = 98 * 0.575;

$(window).on("load", init);
//deckImage.onload = init;

let game: Game;

function init() {
  let num: number;
  if(debug) {
    num = debugNum;
  } else {
    let promptString = prompt("How many players? (Enter a number from 2-8)");
    num = Number(promptString);
    if(isNaN(num) || num < 2 || num > 8) {
      alert("Defaulting to 8 players. Press OK to start game.");
      num = 8;
    }
  }
  game = new Game(num);
}

function k_combinations(set: any, k: number): any {
	var i, j, combs, head, tailcombs;
	if (k > set.length || k <= 0) {
		return [];
	}
	if (k == set.length) {
		return [set];
	}
	if (k == 1) {
		combs = [];
		for (i = 0; i < set.length; i++) {
			combs.push([set[i]]);
		}
		return combs;
	}
	combs = [];
	for (i = 0; i < set.length - k + 1; i++) {
		head = set.slice(i, i + 1);
		tailcombs = k_combinations(set.slice(i + 1), k - 1);
		for (j = 0; j < tailcombs.length; j++) {
			combs.push(head.concat(tailcombs[j]));
		}
	}
	return combs;
}

//Inclusive for both sides
function rand(min: number, max: number) {
  return Math.floor((Math.random() * max) + min)
}
*/