'use strict';

const player0El = document.querySelector('.player--0');
const player1El = document.querySelector('.player--1');
const btnNew = document.querySelector('.btn--new');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');
const diceEl = document.querySelector('.dice');
const score0El = document.getElementById('score--0');
const score1El = document.getElementById('score--1');
const current0El = document.getElementById('current--0');
const current1El = document.getElementById('current--1');

let playerScores, currentScore, activePlayer, playing;

const init = function () {
  playerScores = [0, 0];
  currentScore = 0;
  activePlayer = 0;
  playing = true;

  score0El.textContent = 0;
  score1El.textContent = 0;

  diceEl.classList.add('hidden');
  player0El.classList.remove('player--winner');
  player1El.classList.remove('player--winner');
  player0El.classList.add('player--active');
  player1El.classList.remove('player--active');
  playing = true;
};
init();

const dice = function () {
  let diceResult = Math.trunc(Math.random() * 6) + 1;
  diceEl.src = `dice-${diceResult}.png`;
  diceEl.classList.remove('hidden');
  return diceResult;
};

const switchPlayers = function () {
  activePlayer = activePlayer === 0 ? 1 : 0;
  player0El.classList.toggle('player--active');
  player1El.classList.toggle('player--active');
};

const winner = function () {
  document
    .querySelector(`.player--${activePlayer}`)
    .classList.add('player--winner');
  playing = false;
  diceEl.classList.add('hidden');
};

btnRoll.addEventListener('click', function () {
  if (playing) {
    let rollDice = dice();
    if (rollDice !== 1) {
      currentScore += rollDice;
      document.getElementById(`current--${activePlayer}`).textContent =
        currentScore;
    } else {
      currentScore = 0;
      document.getElementById(`current--${activePlayer}`).textContent =
        currentScore;
      playerScores[activePlayer] = 0;
      document.getElementById(`score--${activePlayer}`).textContent =
        playerScores[activePlayer];
      switchPlayers();
    }
  }
});

btnHold.addEventListener('click', function () {
  if (playing) {
    playerScores[activePlayer] += currentScore;
    document.getElementById(`score--${activePlayer}`).textContent =
      playerScores[activePlayer];
    currentScore = 0;
    document.getElementById(`current--${activePlayer}`).textContent =
      currentScore;

    if (playerScores[activePlayer] >= 100) {
      winner();
    } else {
      switchPlayers();
    }
  }
});

btnNew.addEventListener('click', init);
