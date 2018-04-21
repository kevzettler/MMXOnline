/*
class Deck {

  cards: Card[] = [];
  communityCards: Card[] = [];  //Cards dealt face-up in middle
  
  constructor() {
    for(let i: number = 2; i <= 14; i++) {
      for(let j: number = 0; j <= 3; j++) {
        let card: Card = new Card(i, j);
        this.cards.push(card);
      }
    }
    this.shuffle();
    this.communityCards = [];
  }

  shuffle() {
    this.cards = _.shuffle(this.cards);
  }

  placeAllCommunityCards() {
    while(this.communityCards.length < 5) {
      this.communityCards.push(this.cards.pop());
    }
  }

  placeCommunityCards(amount: number) {
    this.communityCards = this.communityCards.concat(this.take(amount));
  }

  take(amount: number): Card[] {
    let returnCards: Card[] = [];
    for(let i: number = 0; i < amount; i++) {
      let card = this.cards.pop();
      returnCards.push(card);
    }
    return returnCards;
  }

  getBestHand(playerHand: Card[]): Hand {
    let handCombos: Card[][] = k_combinations(playerHand.concat(this.communityCards), 5);
    let hands = _.map(handCombos, (hand) => { return new Hand(hand); });
    hands.sort(Hand.compare);
    return hands[hands.length - 1];
  }

  getAllPlayersBestHands(players: Player[]): Hand[] {
    let unfoldedPlayers = _.filter(players, (player) => {
      return !player.folded;
    });
    let maxHandValue = -1;
    let bestHand: Hand = null;
    let bestHands: Hand[] = [];
    for(let player of unfoldedPlayers) {
      let playerBestHand = this.getBestHand(player.hand);
      playerBestHand.player = player;
      bestHands.push(playerBestHand);
    }
    bestHands.sort(Hand.compare);
    bestHands.reverse();

    return bestHands;
  }

  getWinningHands(players : Player[]): Hand[] {
    let unfoldedPlayers = _.filter(players, (player) => {
      return !player.folded;
    });
    let allPlayerBestHands: Hand[] = this.getAllPlayersBestHands(unfoldedPlayers);
    let bestHandsReturn: Hand[] = [allPlayerBestHands[0]];
    //As long as the runner-up matches the best hand, they will split the pot.
    for(let i = 0; i < allPlayerBestHands.length - 1; i++) {
      if(Hand.compare(allPlayerBestHands[i], allPlayerBestHands[i + 1]) == 0) {
        bestHandsReturn.push(allPlayerBestHands[i+1]);
      } else {
        break;
      }
    }
    return bestHandsReturn;
  }


}
*/