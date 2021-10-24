/**
 * Skæri, blað, steinn.
 * Spilað gegnum viðmót.
 */



/**
 * Spilar einn leik.
 * @returns -1 ef tölva vann, 0 ef jafntefli, 1 ef spilari vann
 */
function round() {
  const player = prompt('Hvað setur þú út? Skæri (1), blað (2), eða steinn (3)?');

  if (player === null) {
    return null;
  }

  if (playAsText(player) === 'Óþekkt') {
    alert(`${player} er ógilt gildi! Tölva sigrar.`);
  }

  const computer = Math.floor(Math.random() * 2 + 1).toString();

  const result = checkGame(player, computer);

  alert(`Þú spilaðir: ${playAsText(player)}.
Tölva spilaði: ${playAsText(computer)}.
${result === 1 ? 'Þú sigrar.' : (result === -1 ? 'Tölva sigrar.' : 'Jafntefli.')}`);

  return result;
}
// Hér getum við ekki skrifað test þar sem fallið mun biðja notanda um inntak!

/**
 * Spilar leik og bætir útkomu (sigur eða tap) við í viðeigandi global breytu.
 */
function play() {
  const bestOf = prompt(`Besta af hve mörgum leikjum? Verður að vera jákvæð oddatala minni en ${MAX_BEST_OF}.`)
  const bestOfNumber = Number.parseInt(bestOf, 10);

  if (bestOfNumber === null) {
    return;
  }

  if (!isValidBestOf(bestOf)) {
    console.error(`${bestOf} er ekki löglegt gildi.`);
    return;
  }

  let playerWins = 0;
  let computerWins = 0;

  let done = false;
  do {
    const result = round();

    if (result === null) {
      return;
    }

    if (result === 1) {
      playerWins += 1;
    } else if (result === -1) {
      computerWins += 1;
    }

    done = (playerWins / bestOf > 0.5) || (computerWins / bestOf > 0.5);
  } while (!done);

  if (playerWins > computerWins) {
    alert('Þú vinnur!');
    wins += 1;
  } else {
    alert('Tölva vinnur.');
    losses += 1;
  }
}
// Hér getum við ekki skrifað test þar sem fallið mun biðja notanda um inntak!

/**
 * Birtir stöðu spilara.
 */
function games() {
  const total = wins + losses;
  console.log(`Þú hefur spilað ${total} leiki.`);

  if (total > 0) {
    console.log(`Þú hefur unnið ${wins}, eða ${(wins/total * 100).toFixed(2)}% af heild.
Þú hefur tapað ${losses}, eða ${(losses/total * 100).toFixed(2)}% af heild.`)
  }
}
// Hér getum við ekki skrifað test þar sem fallið les úr global state
