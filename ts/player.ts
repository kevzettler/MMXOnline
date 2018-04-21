/*
class Player {

  name: string = "";
  hand: Card[];
  isHuman: boolean;
  chips: number;
  folded: boolean = false;
  position: any;
  lastRaise: number;
  
  constructor(name: string, hand: Card[], isHuman: boolean, chips: number, position: any) {
    this.name = name;
    this.hand = hand;
    this.isHuman = isHuman;
    this.chips = chips;
    this.position = position;
    this.lastRaise = 0;
  }

  deductChips(amount: number): number {
    if(this.chips >= amount) {
      this.chips -= amount;
      return amount;
    } 
    else {
      let retAmount: number = this.chips;
      this.chips = 0;
      return retAmount;
    }
  }

  drawHand(faceUp: boolean, x: number, y: number, folded: boolean) {
    if(folded) {
      ctx.globalAlpha = 0.5;
    }
    this.hand[0].drawCard(faceUp, x - cardDrawWidth * 0.52, y);
    this.hand[1].drawCard(faceUp, x + cardDrawWidth * 0.52, y);
    ctx.globalAlpha = 1;
  }
  
}
*/