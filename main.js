import { checkGame, computerPlay } from './lib/rock-paper-scissors.js';
import { el } from './lib/helpers.js';
import { createButtons, show, updateResultScreen } from './lib/ui.js';

/** Hámarks fjöldi best-of leikja, ætti að vera jákvæð heiltala stærri en 0 */
const MAX_BEST_OF = 10;

let totalRounds;
let currentRound;
let games = [];
let totalWins = 0;
let playerWins = 0;
let computerWins = 0;

function playRound(player) {
  const computer = computerPlay();

  const result = checkGame(player.toString(), computer);

  if (result === 1) {
    playerWins += 1;
  } else if (result === -1) {
    computerWins += 1;
  }

  const done = (playerWins / totalRounds > 0.5) || (computerWins / totalRounds > 0.5);

  // Uppfærum result glugga áður en við sýnum
  updateResultScreen({
    player: player.toString(),
    computer,
    result,
    currentRound,
    totalRounds,
    playerWins,
    computerWins,
  });

  // Uppfærum teljara ef ekki jafntefli, verðum að gera eftir að við setjum titil
  if (result !== 0) {
    currentRound += 1;
  }

  // Ákveðum hvaða takka skuli sýna
  const finishGameButton = document.querySelector('.result__buttons .finishGame');
  const nextRoundButton = document.querySelector('.result__buttons .nextRound');

  if (done) {
    finishGameButton.classList.remove('hidden');
    nextRoundButton.classList.add('hidden');
  } else {
    finishGameButton.classList.add('hidden');
    nextRoundButton.classList.remove('hidden');
  }

  // Sýnum niðurstöðuskjá
  show('result');
}

function round(e) {
  const { target } = e;
  const value = target.dataset.num;
  totalRounds = parseInt(value, 10);
  currentRound = 1;

  show('play');
}

// Takki sem byrjar leik
document
  .querySelector('.start button')
  .addEventListener('click', () => show('rounds'));

createButtons(MAX_BEST_OF, round);

// Event listeners fyrir skæri, blað, steinn takka
document.querySelector('button.scissor').addEventListener('click', () => playRound(1));
document.querySelector('button.paper').addEventListener('click', () => playRound(2));
document.querySelector('button.rock').addEventListener('click', () => playRound(3));

function finishGame() {
  // Bætum við nýjasta leik
  const win = playerWins > computerWins;

  games.push({
    player: playerWins,
    computer: computerWins,
    win,
  });

  if (win) {
    totalWins += 1;
  }

  const total = games.length;
  const losses = total - totalWins;

  // Uppfærum stöðu
  document.querySelector('.games__played').textContent = total.toString();
  document.querySelector('.games__wins').textContent = totalWins.toString();
  document.querySelector('.games__winratio').textContent = (totalWins / total * 100).toFixed(2);
  document.querySelector('.games__losses').textContent = losses.toString();
  document.querySelector('.games__lossratio').textContent = (losses / total * 100).toFixed(2);

  // Bætum leik við
  const element = el('li', `${win ? 'Þú vannst ' : 'Tölva vann '} ${playerWins}–${computerWins}`);
  element.classList.add('games__game');
  document.querySelector('.games__list').appendChild(element);

  // Núllstillum breytur
  currentRound = undefined;
  totalRounds = undefined;
  playerWins = 0;
  computerWins = 0;

  // Byrjum nýjan leik!
  show('rounds');
}

// Næsta umferð og ljúka leik takkar
document.querySelector('button.finishGame').addEventListener('click', finishGame);
document.querySelector('button.nextRound').addEventListener('click', () => show('play'));
