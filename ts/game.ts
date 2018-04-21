/*
enum Move {
  Check,
  Call,
  Raise,
  Fold
}

enum Stage {
  PreFlop,
  Flop,
  Turn,
  River
}

class Game {

  deck: Deck;
  players: Player[] = [];
  playersInPlay: Player[] = [];
  whoseTurn: number = 0;
  dealer: number = 0;
  smallBlind: number = 0;
  bigBlind: number = 0;
  currentBet: number = 0;
  lastBetter: number = 0;
  pot: number = 0;
  stage: Stage = Stage.PreFlop;
  
  get curPlayer(): Player {
    return this.playersInPlay[this.whoseTurn];
  }
  set curPlayer(player: Player) {
    this.playersInPlay[this.whoseTurn] = player;
  }

  positions = [
    { x: canvasWidth / 2, y: 500 },
    { x: canvasWidth - 325, y: 500 },
    { x: canvasWidth - 125, y: 300 },
    { x: canvasWidth - 325, y: 125 },
    { x: canvasWidth / 2, y: 125 },
    { x: 325, y: 125 },
    { x: 125, y: 300 },
    { x: 325, y: 500 },
  ];

  positionConfigs: any = {
    2: [0, 4],
    3: [0, 2, 6],
    4: [0, 2, 4, 6],
    5: [0, 2, 3, 5, 6],
    6: [0, 2, 3, 4, 5, 6],
    7: [0, 2, 3, 4, 5, 6, 7],
    8: [0, 1, 2, 3, 4, 5, 6, 7],
  }

  constructor(numPlayers: number) {

    var positionConfig = this.positionConfigs[numPlayers];
    //Create the players, assigning them two cards each
    for(let i:number = 0; i < numPlayers; i++) {
      let isHuman: boolean =  i == 0 ? true: false;
      let name: string = "";
      if(isHuman) {
        name = "Player 1";
      } else {
        name = "CPU " + (numPlayers - i);
      }
      let player:Player = new Player(name, [], isHuman, 100, this.positions[positionConfig[i]]);
      this.players.push(player);
    }
    
    this.newRound(true);

    //Bind event handlers
    $("#check").on("click", () => {
      this.endTurn(Move.Check, 0);
    });
    $("#call").on("click", () => {
      this.endTurn(Move.Call, 0);
    });
    $("#raise").on("click", () => {
      let raiseAmount: number = Number($("#raiseAmount").val());
      if(raiseAmount < this.getMinRaiseAmount() || raiseAmount > this.getMaxRaiseAmount()) {
        window.alert("Invalid bet/raise amount!");
        return;
      }
      $("#raiseAmount").val("");
      this.endTurn(Move.Raise, raiseAmount);
    });
    $("#allin").on("click", () => {
      this.endTurn(Move.Raise, this.getMaxRaiseAmount());
    });
    $("#fold").on("click", () => {
      this.endTurn(Move.Fold, 0);
    });
    $("#continueNextRound").on("click", () => {
      this.newRound(false);
    });
    $("#continueNextRound").hide();
    $("#continue").on("click", () => {
      this.aiDecide();
    });
    $("#continue").hide();
  }

  playerOffsetIndex(startIndex: number, offset: number) {
    //Sanity checks
    if(this.playersInPlay.length <= 1) return startIndex;
    if(_.every(this.playersInPlay, (player) => { return player.folded || player.chips <= 0;})) return startIndex;

    let curPlayer: Player;
    let moveCount: number = 0;
    do {
      startIndex += Math.sign(offset);
      if(startIndex < 0) startIndex = this.playersInPlay.length - 1;
      else if(startIndex >= this.playersInPlay.length) startIndex = 0;
      curPlayer = this.playersInPlay[startIndex];
      if(!curPlayer.folded && curPlayer.chips > 0) {
        moveCount++;
      }
    } while(moveCount < Math.abs(offset));
    return startIndex;
  }

  startTurn() {
    let player: Player = this.curPlayer;

    //The big blind on the preflop gets a chance to re-raise. If someone has already raised, they need to match it.
    if(this.stage == Stage.PreFlop && player == this.playersInPlay[this.bigBlind]) {
      this.currentBet -= 2; //They already contributed 2 to the bet.
      player.lastRaise = 0;
    }

    this.enableDOMUI(true);
    this.updateDOM();
    if(player.isHuman) {   
      this.logMessage("It is your turn.");
      $("#continue").hide();
    } else {
      this.logMessage(player.name + "'s turn.");
      if(!debug) {
        //Disable DOM UI
        this.enableDOMUI(false);   
        
        //$("#continue").show();
        //this.logMessage(player.name + "'s turn. Press continue to make the computer make a move.");
        
        setTimeout(() => { this.aiDecide(); }, 1000);
      }
    }
    this.redraw();

    //this.testFinish();
  }

  testFinish() {
    this.deck.placeCommunityCards(5);
    this.finishRoundWithShowdown();
  }

  aiDecide() {
    let move: Move;
    let betAmount = 0;
    let randMove = rand(1, 20);

    //If the current bet is over 25% of player's chips, have a 75% chance of folding
    let betPercent = this.currentBet / (this.curPlayer.chips+1);
    if(betPercent > 0.25) {
      if(rand(1, 4) != 1) {
        move = Move.Fold;
        this.endTurn(move, betAmount);
        return;
      }
    }

    if(randMove >= 1 && randMove < 8 && this.canRaise()) {
      move = Move.Raise;
      betAmount = rand(this.getMinRaiseAmount(), this.getMaxRaiseAmount());
      if(rand(1, 10) != 1) betAmount = _.clamp(betAmount, 2, 10);  //Place sane bets most of the time
    }
    else if(randMove == 8) {
      move = Move.Fold;
    }
    else {
      move = this.canCall() ? Move.Call : Move.Check;
    }
    this.endTurn(move, betAmount);
  }

  endTurn(move: Move, betAmount: number) {
    let player: Player = this.curPlayer;
    let newLastBetter: number = -1;

    if(move == Move.Check) {
      this.logMessage(player.name + " checked!");
      player.lastRaise = 0;
    }
    else if(move == Move.Call) {
      let chipsPlaced: number = player.deductChips(this.currentBetForPlayer());
      this.pot += chipsPlaced;
      this.logMessage(player.name + " called! (Put in " + chipsPlaced + " chips.)");
      player.lastRaise = 0;
    }
    else if(move == Move.Raise) {
      let chipsPlaced = player.deductChips(this.currentBetForPlayer() + betAmount);
      if(player.chips == 0)
        this.logMessage(player.name + " went all-in! (Put in " + chipsPlaced + " chips.)");
      else if(this.currentBet == 0) 
        this.logMessage(player.name + " placed a bet! (Put in " + chipsPlaced + " chips.)");
      else
        this.logMessage(player.name + " raised the bet! (Put in " + chipsPlaced + " chips.)");
      this.currentBet += betAmount;
      this.pot += chipsPlaced;
      this.lastBetter = this.whoseTurn;
      player.lastRaise = betAmount;
    } 
    else if(move == Move.Fold) {
      player.folded = true;
      this.logMessage(player.name + " folded!");
      player.lastRaise = 0;
    }

    //If the player was the last better and ran out of chips, must set last better to next player in line.
    if((move == Move.Fold || player.chips == 0) && this.lastBetter === this.whoseTurn) {
      newLastBetter = this.playerOffsetIndex(this.whoseTurn, -1);
    }

    //All but one player has folded
    let lastStanding: Player = this.getLastStanding();
    if(lastStanding) {
      this.finishRound([lastStanding], lastStanding.name + " wins the round because everyone else folded, and takes pot of " + this.pot + " chips!");
      return;
    }

    //Special case of everyone having zero chips/folded: just finish the whole round.
    if(_.every(this.playersInPlay, (player) => {
      return player.chips <= 0 || player.folded;
    })) {
      this.deck.placeAllCommunityCards();
      this.finishRoundWithShowdown();
      return;
    }
    
    this.whoseTurn = this.playerOffsetIndex(this.whoseTurn, -1);

    //Move on to the next stage
    if(this.lastBetter == this.whoseTurn) {
      this.clearLastRaises();
      this.currentBet = 0;
      this.whoseTurn = this.playerOffsetIndex(this.dealer, -1);
      this.lastBetter = this.whoseTurn;
      
      //Special case of only one person in play that has more than zero chips: advance immediately to the showdown
      let numPlayersWithChips = _.filter(this.playersInPlay, (p) => { return p.chips > 0 && !p.folded; }).length;
      if(numPlayersWithChips == 1) {
        this.stage = Stage.River + 1;
        this.deck.placeAllCommunityCards();
        this.finishRoundWithShowdown();
        return;
      }
      
      this.stage++;
      if(this.stage == Stage.Flop) {
        this.deck.placeCommunityCards(3);
        this.logMessage("Flop revealed!");
      } else if(this.stage == Stage.Turn) {
        this.deck.placeCommunityCards(1);
        this.logMessage("Turn revealed!");
      } else if(this.stage == Stage.River) {
        this.deck.placeCommunityCards(1);
        this.logMessage("River revealed!");
      } else {
        this.finishRoundWithShowdown();
        return;
      }
    }

    if(newLastBetter != -1) {
      this.lastBetter = newLastBetter;
    }

    this.startTurn();
  }

  finishRoundWithShowdown() {
    this.enableDOMUI(false);
    let winningHands = this.deck.getWinningHands(this.playersInPlay);
    let winners = _.map(winningHands, (hand) => { return hand.player; });
    //One winner
    if(winningHands.length == 1) {
      let winMsg = winningHands[0].player.name + " wins the round with a " + winningHands[0].name + " and takes pot of " + this.pot + " chips!"
      this.finishRound(winners, winMsg);
    } 
    //Split pot
    else {
      let winMsg = "";
      for(let i = 0; i < winningHands.length; i++) {
        let hand = winningHands[i];
        winMsg += hand.player.name;
        if(i == winningHands.length - 2) winMsg += " and "
        else if(i < winningHands.length - 2) winMsg += " ,";
      }
      winMsg += " split the pot, tieing with a best hand of " + winningHands[0].name + "!";
      this.finishRound(winners, winMsg);
    }
  }

  clearLastRaises() {
    _.each(this.playersInPlay, function(player) {
      player.lastRaise = 0;
    });
  }

  getLastStanding(): Player {
    let lastStanding: Player = null;
    for(let player of this.playersInPlay) {
      if(!player.folded) {
        if(!lastStanding) {
          lastStanding = player;
        } else {
          lastStanding = null;
          return null;
        }
      }
    }
    return lastStanding;
  }

  getLastWithChips(): Player {
    let lastStanding: Player = null;
    for(let player of this.players) {
      if(player.chips > 0) {
        if(!lastStanding) {
          lastStanding = player;
        } else {
          lastStanding = null;
          return null;
        }
      }
    }
    return lastStanding;
  }
  
  finishRound(winners: Player[], winMsg: string) {

    this.enableDOMUI(false);
    this.clearLastRaises();

    //this.enableDOMUI(false);

    //Reveal all cards
    this.redraw(true, winners);

    this.logMessage(winMsg);

    //TODO pot split logic is more complicated than this in real poker.
    for(let winner of winners) {
      winner.chips += Math.floor(this.pot / winners.length);
    }

    this.pot = 0;

    //Check if someone won the whole game
    let lastWithChips: Player = this.getLastWithChips();
    if(lastWithChips) {
      this.redraw(true, winners);
      window.setTimeout(() => {
        window.alert((lastWithChips.isHuman ? "You " : lastWithChips.name) + " won the game and claimed a pot of " + winners[0].chips + " chips! Everyone else has been eliminated.");
      }, 0);
      return;
    }

    $("#continueNextRound").show();
  }

  newRound(isFirstTime: boolean) {

    $("#continueNextRound").hide();
    
    if(!isFirstTime) {
      this.logMessage("======================");
      this.logMessage("A new round has begun.");
      this.logMessage("======================");
    }

    this.deck = new Deck();

    this.playersInPlay = [];
    for(let player of this.players) {
      player.folded = false;
      player.hand = [];
      if(player.chips > 0) {
        player.hand = this.deck.take(2);
        this.playersInPlay.push(player);
      }
    }

    if(!isFirstTime) {
      this.dealer = this.playerOffsetIndex(this.dealer, -1);
    } else {
      //this.dealer = Math.floor(Math.random() * this.players.length);
       //Always make the player go first, to prevent confusion
      if(this.players.length > 2)
        this.dealer = this.playerOffsetIndex(0, 3);
      else
        this.dealer = 0;
    }

    if(this.playersInPlay.length > 2) {
      this.smallBlind = this.playerOffsetIndex(this.dealer, -1);
      this.bigBlind = this.playerOffsetIndex(this.dealer, -2);
      this.whoseTurn = this.playerOffsetIndex(this.dealer, -3);
      //For the first round only, the big blind better gets an oppertunity for a turn (to raise).
      this.lastBetter = this.whoseTurn;
    }
    else {
      //2 players is a special case: dealer is small blind and goes first
      this.smallBlind = this.dealer;
      this.bigBlind = this.playerOffsetIndex(this.dealer, -1);
      this.whoseTurn = this.dealer;
      this.lastBetter = this.dealer;  
    }
    
    this.pot += this.playersInPlay[this.smallBlind].deductChips(1);
    this.pot += this.playersInPlay[this.bigBlind].deductChips(2);
    this.players[this.smallBlind].lastRaise = 1;
    this.players[this.bigBlind].lastRaise = 1;

    this.logMessage(this.players[this.smallBlind].name + " put in a small blind bet of 1 chip.")
    this.logMessage(this.players[this.bigBlind].name + " put in a big blind bet of 2 chips.")

    this.currentBet = 2;
    
    this.stage = Stage.PreFlop;

    this.startTurn();
  }

  numNotFolded(): number {
    return _.filter(this.playersInPlay, (player) => { return !player.folded; }).length;
  }

  redraw(endOfRound?: boolean, winners?: Player[]) {
     
    let bestHands: Hand[] = [];
    if(endOfRound && this.numNotFolded() > 1) {
      bestHands = this.deck.getAllPlayersBestHands(this.playersInPlay);
    }

    ctx.clearRect(0, 0, canvasWidth, canvasHeight);

    //Draw the table
    this.drawRoundRect(0, 0, canvasWidth, canvasHeight, 300, "#555555");
    let edgeWidth = 25;
    this.drawRoundRect(edgeWidth, edgeWidth, canvasWidth-edgeWidth, canvasHeight-edgeWidth, 300-edgeWidth, "#5ed15e");

    //Draw the deck
    let startX = 435;
    ctx.drawImage(deckImage, startX - cardDrawWidth/2, 300 - cardDrawHeight/2, cardDrawWidth, cardDrawHeight);

    //Draw the community cards
    for(let i = 0; i < 5; i++) {
      if(this.deck.communityCards[i]) this.deck.communityCards[i].drawCard(true, startX + cardDrawWidth*(i+1)*1.05, 300);
      else {
        ctx.strokeStyle = "gray";
        ctx.strokeRect(startX + 1 + (cardDrawWidth*(i+1)*1.05) - cardDrawWidth/2, 300 + 1 - cardDrawHeight/2, cardDrawWidth-2, cardDrawHeight-2);
        ctx.font = "normal 20px arial";
        ctx.fillStyle = "gray";
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.fillText("?", startX + cardDrawWidth*(i+1)*1.05, 300);
      }
    }

    //Draw the pot text
    ctx.fillStyle = "black";
    ctx.font = "normal 20px arial";
    ctx.textAlign = "center";
    ctx.fillText("Pot: " + this.pot + " / Bet: " + this.currentBet, canvasWidth/2, 240);

    //Draw each player's cards
    for(let i = 0; i < this.players.length; i++) {
      let player: Player = this.players[i];
      let position = player.position;

      var drawBoxMessage = function(type: number) {
        let text = player.name + "'s turn";
        ctx.strokeStyle = "yellow";
        if(type == 1) {
          text = "Round Winner!";
          ctx.strokeStyle = "blue";
          ctx.fillStyle = "blue";
        } 
        ctx.font = "italic 16px arial";
        ctx.textAlign = "center";
        ctx.textBaseline = "top";
        ctx.lineWidth = 4;
        let w = 100, h = 100;
        ctx.strokeRect(position.x - w, position.y - h - 10, w*2, h*1.87);
        ctx.fillText(text, position.x, position.y - h - 7);
      }

      //Current turn: draw a box
      if(!endOfRound) {
        if(this.curPlayer == player) {
          drawBoxMessage(0);
        }
      }
      else {
        if(winners.indexOf(player) != -1) {
          drawBoxMessage(1);
        }
      }
      
      ctx.textBaseline = "middle";
      ctx.lineWidth = 1;

      //Not eliminated: draw cards
      if(this.playersInPlay.indexOf(player) > -1) {
        if(player.isHuman) {
          //Draw the cards, face up
          player.drawHand(true, position.x, position.y, player.folded);
        } else {
          let cpuFaceUp: boolean = player.folded || endOfRound;
          player.drawHand(cpuFaceUp, position.x, position.y, player.folded);
        }
        //Also draw their last raise
        if(player.lastRaise > 0) {
          ctx.font = "normal 16px arial";
          ctx.fillStyle = "black";
          ctx.fillText("Last bet/raise: +" + player.lastRaise, position.x, position.y + 12 + cardDrawHeight/2);
        }
      }

      //Draw texts
      ctx.fillStyle = "black";
      ctx.textAlign = "center";

      let caption: string = "";
      if(player === this.playersInPlay[this.dealer]) caption = " (Dealer)";
      else if(player === this.playersInPlay[this.smallBlind]) caption = " (Small Blind)";
      else if(player === this.playersInPlay[this.bigBlind]) caption = " (Big Blind)";

      ctx.font = "bold 16px arial";
      ctx.fillText(player.name + caption, position.x, position.y - 80);
      ctx.font = "normal 16px arial";
      ctx.fillText("Chips: " + player.chips, position.x, position.y - 60);

      //Player eliminated
      if(this.playersInPlay.indexOf(player) == -1) {
        ctx.font = "bold 30px arial";
        ctx.fillStyle = "white";
        ctx.fillText("ELIMINATED", position.x, position.y);
        ctx.strokeStyle = "black";
        ctx.strokeText("ELIMINATED", position.x, position.y);
      } 
      //Player folded
      else if(player.folded) {
        ctx.font = "bold 30px arial";
        ctx.fillStyle = "white";
        ctx.fillText("FOLDED", position.x, position.y);
        ctx.strokeStyle = "black";
        ctx.strokeText("FOLDED", position.x, position.y);
      } 
      //End of round
      else if(endOfRound && this.numNotFolded() > 1) {
        ctx.font = "bold 12px arial";
        ctx.textAlign = "center";
        //Draw the best hands
        let index = 0;
        let curHand = _.find(bestHands, (hand) => { return hand.player == player });
        curHand.cards.reverse();
        ctx.fillText("Best hand: " + curHand.name, position.x, position.y + 9 + cardDrawHeight/2);
        for(let card of curHand.cards) {
          ctx.fillStyle = "black";
          ctx.fillText(card.getFormattedValue(), position.x + (index*20) - 40, position.y + 23 + cardDrawHeight/2);
          if(card.suit == CardSuit.Diamonds || card.suit == CardSuit.Hearts) ctx.fillStyle = "red";
          ctx.fillText(card.getFormattedSuit(), position.x + (index*20) - 40 + 8, position.y + 23 + cardDrawHeight/2)
          index++;
        }
      }
    }
  }

  messageLog: string = "";
  
  logMessage(message: string) {
    this.messageLog += message + "\n";
    $("#messageLog").text(this.messageLog);
    $("#messageLog").scrollTop($("#messageLog")[0].scrollHeight - $("#messageLog").height());
  }

  enableDOMUI(enable: boolean) {
    $("#check").prop("disabled", !enable);
    $("#call").prop("disabled", !enable);
    $("#raise").prop("disabled", !enable);
    $("#raiseChips").prop("disabled", !enable);
    $("#allin").prop("disabled", !enable);
    $("#fold").prop("disabled", !enable);

    if(enable) {
      if(this.currentBet == 0) {
        $("#raise").html("Bet");
      } else {
        $("#raise").html("Raise");
      }
      $("#raiseAmount").prop("placeholder", this.getMinRaiseAmount() + "-" + this.getMaxRaiseAmount());
    }
  }

  getMinRaiseAmount(): number {
    //No bet? Just 2
    if(this.currentBet == 0) return 2;
    return this.playersInPlay[this.lastBetter].lastRaise;
  }

  getMaxRaiseAmount(): number {
    return this.curPlayer.chips - this.currentBetForPlayer();
  }

  currentBetForPlayer(): number {
    //For successive raises, the player already paid the amount necessary for their own raise
    return this.currentBet - this.curPlayer.lastRaise;
  }

  canRaise(): boolean {
    return this.curPlayer.chips > this.currentBetForPlayer();
  }

  canCall(): boolean {
    return this.currentBetForPlayer() > 0;
  }

  updateDOM() {
    //No bet: disable call
    if(!this.canCall()) {
      $("#call").prop("disabled", true);
    }
    else {
      $("#check").prop("disabled", true);
    }
    //Can't raise if chips <= the current bet.
    if(!this.canRaise()) {
      $("#raise").prop("disabled", true);
      $("#raiseChips").prop("disabled", true);
    }
  }

  drawRoundRect(x0: number, y0: number, x1: number, y1: number, r: number, color: string)
  {
    let w = x1 - x0;
    let h = y1 - y0;
    if (r > w/2) r = w/2;
    if (r > h/2) r = h/2;
    ctx.beginPath();
    ctx.moveTo(x1 - r, y0);
    ctx.quadraticCurveTo(x1, y0, x1, y0 + r);
    ctx.lineTo(x1, y1-r);
    ctx.quadraticCurveTo(x1, y1, x1 - r, y1);
    ctx.lineTo(x0 + r, y1);
    ctx.quadraticCurveTo(x0, y1, x0, y1 - r);
    ctx.lineTo(x0, y0 + r);
    ctx.quadraticCurveTo(x0, y0, x0 + r, y0);
    ctx.closePath();
    ctx.fillStyle = color;
    ctx.fill();
  }

}
*/