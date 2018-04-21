/*
class Hand {

  name: string;
  cards: Card[];
  kickers: Card[] = []; //Cards that don't contribute to the special hand type.
  value: number;
  player: Player;

  constructor(cards: Card[]) {
    cards.sort((a, b) => { return a.value - b.value; });
    this.cards = cards;

    if(this.isStraightFlush()) {
      this.kickers = [];
      this.name = "straight flush";
      this.value = 1000; 
    } else if(this.isFours()) {
      this.name = "four of a kind";
      this.value = 900;
    } else if(this.isFullHouse()) {
      this.kickers = [];
      this.name = "full house";
      this.value = 800;
    } else if(this.isFlush()) {
      this.kickers = [];
      this.name = "flush";
      this.value = 700;
    } else if(this.isStraight()) {
      this.kickers = [];
      this.name = "straight";
      this.value = 600;
    } else if(this.isThrees()) {
      this.name = "three of a kind";
      this.value = 600;
    } else if(this.isTwoPair()) {
      this.name = "two pair";
      this.value = 500;
    } else if(this.isPair()) {
      this.name = "pair";
      this.value = 400;
    } else {
      this.kickers = this.cards.slice(0);
      this.name = "high card";
      this.value = 300;
    }
  }

  isStraightFlush(): boolean {
    return this.isStraight() && this.isFlush();
  }

  isFours(): boolean {
    return this.getModeMapping()[4] > 0;
  }

  isFullHouse(): boolean {
    return this.getModeMapping()[2] > 0 && this.getModeMapping()[3] > 0;
  }

  isFlush(): boolean {
    return (this.cards[0].suit == this.cards[1].suit &&
        this.cards[1].suit == this.cards[2].suit &&
        this.cards[2].suit == this.cards[3].suit &&
        this.cards[3].suit == this.cards[4].suit);
  }

  isStraight(): boolean {
    return (this.cards[0].value == this.cards[1].value - 1 &&
        this.cards[1].value == this.cards[2].value - 1 &&
        this.cards[2].value == this.cards[3].value - 1 &&
        this.cards[3].value == this.cards[4].value - 1);
  }

  isThrees(): boolean {
    return this.getModeMapping()[3] > 0;
  }

  isTwoPair(): boolean {
    return this.getModeMapping()[2] > 1;
  }

  isPair(): boolean {
    return this.getModeMapping()[2] > 0;
  }

  //Example: returns
  // { 2: 1, 3: 1, 4: 0 } (FULL HOUSE)
  // { 2: 2, 3: 0, 4: 0 } (TWO PAIR)
  getModeMapping() : any {
    let consecutives = 1;
    let consecutives2 = 1;
    let whichConsecutive = 0;
    this.kickers = this.cards.slice(0);
    let indicesToRemove: any = {};
    for(let i = 0; i < this.cards.length - 1; i++) {
      if(this.cards[i].value == this.cards[i+1].value) {
        indicesToRemove[i] = this.cards[i];
        indicesToRemove[i + 1] = this.cards[i + 1];
        if(whichConsecutive == 0) {
          consecutives++;
        } else {
          consecutives2++;
        }
      } else if(consecutives > 1) {
        whichConsecutive++;
      }
    }
    _.each(indicesToRemove, (value, key) => {
      _.remove(this.kickers, (val) => { return val === value; });
    });
    let retObj: any = {
      2: 0,
      3: 0,
      4: 0
    };
    retObj[consecutives] = 1;
    retObj[consecutives2] = 1;
    if(consecutives == 2 && consecutives2 == 2) {
      retObj[consecutives] = 2;
    }
    return retObj;
  }

  getHighestCardValue(): number {
    return _.maxBy(this.cards, (card) => {
      return card.getValue();
    }).getValue();
  }

  //Compare two hands, seeing which one is higher. Returns -1, 0, 1 scheme used by JS sort callbacks
  static compare(hand1: Hand, hand2: Hand) {
    if(hand1.value > hand2.value) {
      return 1;
    } else if(hand1.value == hand2.value) {
      //First compare hand cards (non-kickers)
      let myHandCards: Card[] = _.difference(hand1.cards, hand1.kickers);
      let otherHandCards: Card[] = _.difference(hand2.cards, hand2.kickers);
      let comparison = Hand.compareEqualHands(myHandCards, otherHandCards);
      if(comparison == 0) {
        return Hand.compareEqualHands(hand1.kickers, hand2.kickers);
      }
      return comparison;
    } else {
      return -1;
    }
  }

  //Compare two sets of cards.
  static compareEqualHands(set1: Card[], set2: Card[]): number {
    //Make sure they're sorted asc first
    set1.sort((a, b) => { return b.value - a.value; });
    set2.sort((a, b) => { return b.value - a.value; });
    for(let i = 0; i < set1.length && i < set2.length; i++) {
      if(set1[i].value > set2[i].value) return 1;
      else if(set1[i].value < set2[i].value) return -1;
    }
    return 0;
  }

}
*/