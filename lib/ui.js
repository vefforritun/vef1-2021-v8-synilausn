import { el } from './helpers.js';
import { playAsText, isValidBestOf } from './rock-paper-scissors.js';

export function createButtons(max, onClick) {
  // Takkar til að velja fjölda umferða
  const roundsButtons = document.querySelector('.rounds__buttons');

  // Búa til takka fyrir fjölda rounds, round() tekur við þegar ýtt á takka,
  // setur fjölda rounda í `rounds` breytu og sýnir næsta part af leik
  for (let i = 1; i < max; i++) {
    if (!isValidBestOf(i)) {
      continue;
    }
    const button = el('button', i.toString());
    button.addEventListener('click', onClick);
    button.dataset.num = i;
    button.classList.add('button');
    roundsButtons.appendChild(button);
  }
}

export function show(part) {
  // Element fyrir „parta“ leiks sem við viljum fela og sýna
  const start = document.querySelector('.start');
  const rounds = document.querySelector('.rounds');
  const play = document.querySelector('.play');
  const result = document.querySelector('.result');

  // Felum allt
  start.classList.add('hidden');
  rounds.classList.add('hidden');
  play.classList.add('hidden');
  result.classList.add('hidden');

  // og sýnum það sem beðið er um
  switch (part) {
    case 'start':
      start.classList.remove('hidden');
      break;
    case 'rounds':
      rounds.classList.remove('hidden');
      break;
    case 'play':
      play.classList.remove('hidden');
      break;
    case 'result':
      result.classList.remove('hidden');
      break;
    default:
      console.warn(`${part} óþekkt`);
  }
}

export function updateResultScreen({ player, computer, result, currentRound, totalRounds, playerWins, computerWins }) {
  const resultPlayer = document.querySelector('.result__player');
  const resultComputer = document.querySelector('.result__computer');
  const resultText = document.querySelector('.result__result');
  const gameStatusText = document.querySelector('.result__status');
  const currentRoundElement = document.querySelector('.result__currentRound');
  const totalRoundsElement = document.querySelector('.result__totalRounds');

  resultPlayer.textContent = playAsText(player.toString());
  resultComputer.textContent = playAsText(computer);

  currentRoundElement.textContent = currentRound.toString();
  totalRoundsElement.textContent = totalRounds.toString();
  resultText.textContent = result === 1 ? 'Þú sigrar.' : (result === -1 ? 'Tölva sigrar.' : 'Jafntefli.');
  gameStatusText.textContent = `Staðan er ${playerWins}—${computerWins}.`;
}
