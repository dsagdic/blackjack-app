// TODO: aces should be count as 11 or 1.
// FIX: two aces can bust the game since aces count as only 11.

const player = {
  name: 'Player',
  chips: 500,
};
let playerCards = [];
let playerSum = 0;
let houseCards = [];
let houseSum = 0;
let hasBlackJack = false;
let isAlive = false;
let message = '';
const messageEl = document.getElementById('message-el');
const sumEl = document.getElementById('sum-el');
const cardsEl = document.getElementById('cards-el');
const houseSumEl = document.getElementById('house-sum-el');
const houseCardsEl = document.getElementById('house-cards-el');
const playerEl = document.getElementById('player-el');

playerEl.textContent = `${player.name}: $${player.chips}`;

function getRandomCard() {
  const randomNumber = Math.floor(Math.random() * 13) + 1;
  let cardValue = randomNumber;
  if (randomNumber > 10) {
    cardValue = 10;
  } else if (randomNumber === 1) {
    cardValue = 11;
  }
  return cardValue;
}

function renderGame() {
  cardsEl.textContent = 'Player Cards: ';
  houseCardsEl.textContent = 'House Cards: ';
  for (let i = 0; i < playerCards.length; i += 1) {
    cardsEl.textContent += `${playerCards[i]} `;
  }

  houseCardsEl.textContent += houseCards[0];

  sumEl.textContent = `Player Sum: ${playerSum}`;
  if (playerSum <= 20) {
    message = 'Do you want to draw a new card?';
  } else if (playerSum === 21) {
    message = "You've got Blackjack!";
    player.chips += 150;
    playerEl.textContent = `${player.name}: $${player.chips}`;
    hasBlackJack = true;
  } else {
    message = "BUST: You're out of the game!";
    isAlive = false;
  }
  houseSumEl.textContent = 'House Sum: ';
  messageEl.textContent = message;
}

// eslint-disable-next-line
function startGame() {
  isAlive = true;
  const playerFirstCard = getRandomCard();
  const playerSecondCard = getRandomCard();
  playerCards = [playerFirstCard, playerSecondCard];
  playerSum = playerFirstCard + playerSecondCard;

  const houseFirstCard = getRandomCard();
  const houseSecondCard = getRandomCard();
  houseCards = [houseFirstCard, houseSecondCard];
  houseSum = houseFirstCard + houseSecondCard;

  player.chips -= 100;
  playerEl.textContent = `${player.name}: $${player.chips}`;
  renderGame();
}

// eslint-disable-next-line
function newCard() {
  if (isAlive && !hasBlackJack) {
    const card = getRandomCard();
    playerSum += card;
    playerCards.push(card);
    renderGame();
  }
}

// eslint-disable-next-line
function hold() {
  if (isAlive && !hasBlackJack) {
    houseCardsEl.textContent = 'House Cards: ';
    houseSumEl.textContent = `House Sum: ${houseSum}`;
    for (let i = 0; i < houseCards.length; i += 1) {
      houseCardsEl.textContent += `${houseCards[i]} `;
    }

    if (houseSum < 17 && houseSum < playerSum) {
      const card = getRandomCard();
      houseSum += card;
      houseCards.push(card);
      hold();
    } else if (playerSum > houseSum || houseSum > 21) {
      message = 'You WIN!';
      player.chips += 200;
      playerEl.textContent = `${player.name}: $${player.chips}`;
      isAlive = false;
    } else if (playerSum === houseSum) {
      message = 'TIE!';
      player.chips += 100;
      playerEl.textContent = `${player.name}: $${player.chips}`;
      isAlive = false;
    } else {
      message = 'YOU LOSE!';
      isAlive = false;
    }
    messageEl.textContent = message;
  }
}
