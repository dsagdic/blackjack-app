const player = {
  name: 'Player',
  chips: 500,
};
let cards = [];
let sum = 0;
let hasBlackJack = false;
let isAlive = false;
let message = '';
const messageEl = document.getElementById('message-el');
const sumEl = document.getElementById('sum-el');
const cardsEl = document.getElementById('cards-el');
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
  cardsEl.textContent = 'Cards: ';
  for (let i = 0; i < cards.length; i += 1) {
    cardsEl.textContent += `${cards[i]} `;
  }

  sumEl.textContent = `Sum: ${sum}`;
  if (sum <= 20) {
    message = 'Do you want to draw a new card?';
  } else if (sum === 21) {
    message = "You've got Blackjack!";
    hasBlackJack = true;
  } else {
    message = "You're out of the game!";
    isAlive = false;
  }
  messageEl.textContent = message;
}

// eslint-disable-next-line
function startGame() {
  isAlive = true;
  const firstCard = getRandomCard();
  const secondCard = getRandomCard();
  cards = [firstCard, secondCard];
  sum = firstCard + secondCard;
  renderGame();
}

// eslint-disable-next-line
function newCard() {
  if (isAlive && !hasBlackJack) {
    const card = getRandomCard();
    sum += card;
    cards.push(card);
    renderGame();
  }
}
