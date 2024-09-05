const gameContainer = document.getElementById('game');
const attemptsElement = document.getElementById('attempts');
let attempts = 0;
let firstCard = null;
let secondCard = null;
let lockBoard = false;
let matches = 0;

const cards = [
  '🐱', '🐱', '🐶', '🐶', '🐰', '🐰', '🦊', '🦊',
  '🐼', '🐼', '🦁', '🦁', '🐯', '🐯', '🐻', '🐻'
];

// Function to shuffle cards
function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

// Create card elements
function createCards() {
  shuffle(cards).forEach(card => {
    const cardElement = document.createElement('div');
    cardElement.classList.add('card');
    cardElement.dataset.value = card;
    cardElement.innerText = '';
    cardElement.addEventListener('click', flipCard);
    gameContainer.appendChild(cardElement);
  });
}

// Function to flip card
function flipCard() {
  if (lockBoard) return;
  if (this === firstCard) return;  // Prevent double click on the same card

  this.classList.add('flipped');
  this.innerText = this.dataset.value;

  if (!firstCard) {
    firstCard = this;
    return;
  }

  secondCard = this;
  attempts++;
  attemptsElement.innerText = attempts;

  checkForMatch();
}

// Check if cards match
function checkForMatch() {
  let isMatch = firstCard.dataset.value === secondCard.dataset.value;

  if (isMatch) {
    matches++;
    disableCards();
    if (matches === cards.length / 2) {
      setTimeout(() => alert(`🎉 Game completed in ${attempts} attempts! 🎉`), 500);
    }
  } else {
    unflipCards();
  }
}

// Disable matched cards
function disableCards() {
  firstCard.removeEventListener('click', flipCard);
  secondCard.removeEventListener('click', flipCard);
  resetBoard();
}

// Unflip cards if no match
function unflipCards() {
  lockBoard = true;
  setTimeout(() => {
    firstCard.classList.remove('flipped');
    secondCard.classList.remove('flipped');
    firstCard.innerText = '';
    secondCard.innerText = '';
    resetBoard();
  }, 1000);
}

// Reset board state
function resetBoard() {
  [firstCard, secondCard] = [null, null];
  lockBoard = false;
}

// Initialize game
createCards();
