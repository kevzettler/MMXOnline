/*
enum CardValue {
  Two = 2,
  Three = 3,
  Four = 4,
  Five = 5,
  Six = 6,
  Seven = 7,
  Eight = 8,
  Nine = 9,
  Ten = 10,
  Jack = 11,
  Queen = 12,
  King = 13,
  Ace = 14
}

enum CardSuit {
  Clubs = 0,
  Diamonds,
  Hearts,
  Spades
}

class Card {
  value: CardValue;
  suit: CardSuit;
  humanReadableName: string;

  constructor(value: CardValue, suit: CardSuit) {
    this.value = value;
    this.suit = suit;

    this.humanReadableName = this.getFormattedName();
  }

  getFormattedValue(): string {
    let valComponent = "";
    if(this.value == CardValue.Jack) valComponent = "J";
    else if(this.value == CardValue.Queen) valComponent = "Q";
    else if(this.value == CardValue.King) valComponent = "K";
    else if(this.value == CardValue.Ace) valComponent = "A";
    else valComponent = String(this.value);
    return valComponent;
  }

  getFormattedSuit(): string {
    let suitComponent = "";
    if(this.suit == CardSuit.Clubs) suitComponent = "\u2663";
    else if(this.suit == CardSuit.Diamonds) suitComponent = "\u2666";
    else if(this.suit == CardSuit.Hearts) suitComponent = "\u2665";
    else if(this.suit == CardSuit.Spades) suitComponent = "\u2660";
    return suitComponent;
  }

  getFormattedName(): string {
    return this.getFormattedValue() + this.getFormattedSuit();
  }

  drawCard(faceUp: boolean, x: number, y: number) {
    let val = this.value - 1;
    if(this.value == CardValue.Ace) val = 0;
    if(faceUp) {
      let xOffset: number = val * cardWidth;
      let yOffset: number;
      if(this.suit == CardSuit.Clubs) yOffset = 0;
      if(this.suit == CardSuit.Hearts) yOffset = 1;
      if(this.suit == CardSuit.Spades) yOffset = 2;
      if(this.suit == CardSuit.Diamonds) yOffset = 3;
      yOffset *= cardHeight;
      ctx.drawImage(cardSpriteSheet, xOffset, yOffset, cardWidth, cardHeight, x - cardDrawWidth * 0.5, y - cardDrawHeight * 0.5, cardDrawWidth, cardDrawHeight);
    } else {
      ctx.drawImage(cardBackImage, x - cardDrawWidth * 0.5, y - cardDrawHeight * 0.5, cardDrawWidth, cardDrawHeight);
    }
  }

  getValue(): number {
    return this.value;
  }

}
*/