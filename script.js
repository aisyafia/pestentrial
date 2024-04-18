const suits = ["♠", "♣", "♥", "♦"];
const values = [
  "A",
  "K",
  "Q",
  "J",
  "2",
  "3",
  "4",
  "5",
  "6",
  "7",
  "8",
  "9",
  "10",
];

class Deck {
  constructor(cards = freshDeck()) {
    this.cards = cards;
  }

  push(card) {
    this.cards.push(card);
  }
}

class Card {
  constructor(suit, value) {
    this.suit = suit;
    this.value = value;
  }

  getHTML() {
    const cardDiv = document.createElement("div");
    cardDiv.innerText = `${this.value} ${this.suit}`;
    cardDiv.dataset.value = `${this.value} ${this.suit}`;
    return cardDiv;
  }
}
// step 1: create fresh deck
const freshDeck = () => {
  return suits.flatMap((suit) => {
    return values.map((value) => {
      return new Card(suit, value);
    });
  });
};

// console.log("does this work?", freshDeck());
//step2: shuffle the deck
const shuffleDeck = (deck) => {
  for (let i = deck.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [deck[i], deck[j]] = [deck[j], deck[i]];
  }
  return deck;
};

const deck = new Deck();
const shuffled = shuffleDeck(deck.cards);
// console.log("now?", shuffled);

// step3: create 4 players
let player1, player2, player3, player4, drawPile;

const startGame = () => {
  player1 = new Deck(deck.cards.slice(0, 7));
  player2 = new Deck(deck.cards.slice(7, 14));
  player3 = new Deck(deck.cards.slice(14, 21));
  player4 = new Deck(deck.cards.slice(21, 28));
  drawPile = new Deck(deck.cards.slice(28, deck.cards.length));
};

startGame();

// console.log("playas", player1, player2, player3, player4, drawPile);

// step 4: discard pile
let topCard = drawPile.cards.shift();

let discardPile = new Deck([]);
discardPile.cards.push(topCard);

// console.log("probably wrong", discardPile);

// intermediary step: mounted the HTML
const playerContainers = [
  document.querySelector(".player-1"),
  document.querySelector(".player-2"),
  document.querySelector(".player-3"),
  document.querySelector(".player-4"),
];

let players = [player1, player2, player3, player4];
const appendPlayerCards = (players, containers) => {
  players.forEach((player, index) => {
    const container = containers[index];
    player.cards.forEach((card) => {
      const cardDiv = card.getHTML();
      container.appendChild(cardDiv);
    });
  });
};

appendPlayerCards(players, playerContainers);

//discard pile display
const discardContainer = document.querySelector(".discard-pile");

const discardPileCards = (pile, container) => {
  pile.cards.forEach((card) => {
    const cardDiv = card.getHTML();
    container.appendChild(cardDiv);
  });
};
discardPileCards(discardPile, discardContainer);

// step 5: each player take turn to add to the dicard pile
const playerCardsCheck = (currentPlayer) => {
  return currentPlayer.cards.filter((card) => {
    return card.suit === topCard.suit || card.value === topCard.value;
  });
};

// console.log("Array of playable cards:", player1CardsCheck(player1));

//step 6: first matching card to the discardpile
// const player1Discard = (player1CardsCheck, discardPile, drawPile, topCard) => {
//   if (player1CardsCheck.length > 0) {
//     discardPile.cards.push(player1CardsCheck[0]);
//     console.log("Player 1 add the following card: ", player1CardsCheck[0]);
//   } else {
//     console.log("Player 1 found no matching card, drawing from draw-pile:");

//     const drawnCard = drawPile.cards.shift();
//     console.log("Drawn card from deck:", drawnCard);

//     if (drawnCard.suit === topCard.suit || drawnCard.value === topCard.value) {
//       console.log("Found a playable card: ");
//       discardPile.push(drawnCard);
//     } else {
//       console.log("Drawn card not matching top card, card added to own deck");
//       player1.cards.push(drawnCard);
//     }
//   }
// };

// player1Discard(playerCardsCheck(player1), discardPile, drawPile, topCard);

// console.log("New top card?", discardPile.cards[discardPile.cards.length - 1]);

// //step 7: player 2 card check, repeat the process above
// const player2Discard = (player2CardsCheck, discardPile, drawPile, topCard) => {
//   if (player2CardsCheck.length > 0) {
//     discardPile.cards.push(player2CardsCheck[0]);
//     console.log("Player 2 add the following card: ", player2CardsCheck[0]);
//   } else {
//     console.log("Player 2 found no matching card, drawing from draw-pile:");

//     const drawnCard = drawPile.cards.shift();
//     console.log("Drawn card from deck:", drawnCard);

//     if (drawnCard.suit === topCard.suit || drawnCard.value === topCard.value) {
//       console.log("Found a playable card: ");
//       discardPile.push(drawnCard);
//     } else {
//       console.log("Drawn card not matching top card, card added to own deck");
//       player1.cards.push(drawnCard);
//     }
//   }
// };

// player2Discard(playerCardsCheck(player2), discardPile, drawPile, topCard);

// console.log("New top card?", discardPile.cards[discardPile.cards.length - 1]);

// //step 8 : repeat for player 3
// const player3Discard = (player3CardsCheck, discardPile, drawPile, topCard) => {
//   if (player3CardsCheck.length > 0) {
//     discardPile.cards.push(player3CardsCheck[0]);
//     console.log("Player 3 add the following card: ", player3CardsCheck[0]);
//   } else {
//     console.log("Player 3 found no matching card, drawing from draw-pile:");

//     const drawnCard = drawPile.cards.shift();
//     console.log("Drawn card from deck:", drawnCard);

//     if (drawnCard.suit === topCard.suit || drawnCard.value === topCard.value) {
//       console.log("Found a playable card: ");
//       discardPile.push(drawnCard);
//     } else {
//       console.log("Drawn card not matching top card, card added to own deck");
//       player1.cards.push(drawnCard);
//     }
//   }
// };

// player3Discard(playerCardsCheck(player3), discardPile, drawPile, topCard);

// console.log("New top card?", discardPile.cards[discardPile.cards.length - 1]);

// //step 9: repeat for player 4
// const player4Discard = (player4CardsCheck, discardPile, drawPile, topCard) => {
//   if (player4CardsCheck.length > 0) {
//     discardPile.cards.push(player4CardsCheck[0]);
//     console.log("Player 4 add the following card: ", player4CardsCheck[0]);
//   } else {
//     console.log("Player 4 found no matching card, drawing from draw-pile:");

//     const drawnCard = drawPile.cards.shift();
//     console.log("Drawn card from deck:", drawnCard);

//     if (drawnCard.suit === topCard.suit || drawnCard.value === topCard.value) {
//       console.log("Found a playable card: ");
//       discardPile.push(drawnCard);
//     } else {
//       console.log("Drawn card not matching top card, card added to own deck");
//       player1.cards.push(drawnCard);
//     }
//   }
// };

// player4Discard(playerCardsCheck(player4), discardPile, drawPile, topCard);

// console.log("New top card?", discardPile.cards[discardPile.cards.length - 1]);

//step 10: loop?
// let gameOver = false;

// while (!gameOver) {
//   for (let i = 0; i < players.length; i++) {
//     const currentPlayer = players[i];

//     console.log(`Player ${i + 1}'s turn`);

//     const cardCheck = playerCardsCheck(currentPlayer);

//     const playerDiscard = (
//       playerCardsCheck,
//       discardPile,
//       drawPile,
//       topCard
//     ) => {
//       if (playerCardsCheck.length > 0) {
//         discardPile.cards.push(playerCardsCheck[0]);
//         console.log(
//           `Player ${i + 1} add the following card: `,
//           playerCardsCheck[0]
//         );
//       } else {
//         console.log(
//           `Player ${i + 1} found no matching card, drawing from draw-pile:`
//         );

//         const drawnCard = drawPile.cards.shift();
//         console.log("Drawn card from deck:", drawnCard);

//         if (
//           drawnCard.suit === topCard.suit ||
//           drawnCard.value === topCard.value
//         ) {
//           console.log("Found a playable card: ");
//           discardPile.cards.push(drawnCard);
//         } else {
//           console.log(
//             "Drawn card not matching top card, card added to own deck"
//           );
//           currentPlayer.cards.push(drawnCard);
//         }
//       }
//     };

//     playerDiscard(cardCheck, discardPile, drawPile, topCard);

//     console.log(
//       "New top card?",
//       discardPile.cards[discardPile.cards.length - 1]
//     );

//     //check how many cards a player have left

//     for (const player of players) {
//       if (player.cards.length === 1) {
//         console.log(
//           `Player ${players.indexOf(player) + 1} has only 1 card left!`
//         );
//       }
//       if (player.cards.length === 0) {
//         console.log(`Player ${players.indexOf(player) + 1} has won`);
//         gameOver = true;
//         break;
//       }
//     }

//     if (gameOver) {
//       break;
//     }
//   }
// }
const playerDiscard = (
  currentPlayer,
  playerCardsCheck,
  discardPile,
  drawPile,
  topCard
) => {
  if (playerCardsCheck.length > 0) {
    discardPile.cards.push(playerCardsCheck[0]);
    console.log(
      `Player ${currentPlayer} add the following card: `,
      playerCardsCheck[0]
    );
    if (currentPlayer.cards.length === 0) {
      console.log(`Player wins`);
      gameEnded = true;
    }
  } else {
    console.log(
      `Player ${currentPlayer} found no matching card, drawing from draw-pile:`
    );

    const drawnCard = drawPile.cards.shift();
    console.log("Drawn card from deck:", drawnCard);

    if (drawnCard.suit === topCard.suit || drawnCard.value === topCard.value) {
      console.log("Found a playable card: ");
      discardPile.cards.push(drawnCard);
    } else {
      console.log("Drawn card not matching top card, card added to own deck");
      currentPlayer.cards.push(drawnCard);
    }
  }
};

let currentPlayerIndex = 0;

let gameEnded = false;

while (!gameEnded) {
  const currentPlayer = players[currentPlayerIndex];
  console.log(`Player ${currentPlayerIndex + 1}'s turn`);

  const cardCheck = playerCardsCheck(currentPlayer);

  playerDiscard(currentPlayer, cardCheck, discardPile, drawPile, topCard);

  console.log("New top card?", discardPile.cards[discardPile.cards.length - 1]);

  currentPlayerIndex = (currentPlayerIndex + 1) % players.length;
}
