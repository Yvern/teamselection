/**
 * Function used to sort players randomly when the algorithm needs to gather
 * more information in order to make an informed decision.
 */
function explore(players) {
  var currentIndex = players.length,
    temporaryValue,
    randomIndex;

  // randomly shuffle the available players to create teams from according to
  // the Fisher-Yates random sorting algorithm
  while (0 !== currentIndex) {
    // pick a random player
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    // swap the random player with the player in current position
    temporaryValue = players[currentIndex];
    players[currentIndex] = players[randomIndex];
    players[randomIndex] = temporaryValue;
  }

  //split the set of players into two seperate teams
  let teams = [
    {
      players: players.slice(0, Math.ceil(players.length / 2))
    },
    {
      players: players.slice(Math.ceil(players.length / 2), players.length)
    }
  ];

  return teams;
}

/**
 * Function to compare two given players based on score, where a higher score will
 * sort the player into a lower order
 */
function rankPlayers(playerA, playerB) {
  if (playerA.weight > playerB.weight) {
    return -1;
  }
  if (playerA.weight < playerB.weight) {
    return 1;
  }
  return 0;
}

/**
 * Calculates a player's win ratio based on the number of games played, won and
 * lost.
 */
function calculateWinRatio({ gamesPlayed, gamesWon, gamesLost }) {
  gamesDrawn = gamesPlayed - gamesWon - gamesLost;
  points = gamesWon + gamesDrawn * 0.5;
  winRatio = points / gamesPlayed;
  return winRatio;
}

/**
 * Calculates an adjustment to the player weight based on the winRatio
 */
function calculateWinRatioAdjustment({ gamesPlayed }, winRatio) {
  //adjust the winRatio to be negative if lower than 0.5 and positive if higher
  let adjustRatio = winRatio - 0.5;
  //increase the adjustment in weight based on the number of games played
  let weightAdjustment = winRatio * gamesPlayed;
  return weightAdjustment;
}

/**
 * Returns a weight adjustment based on the length of a possible win or loss
 * streak, e.g. if a player has lost 4 games in a row, adjust score to be lower
 */
function calculateWinStreakAdjustment({ streak }) {
  //make adjustment value negative or positive depending on whether the streak
  //is a loss streak or win streak
  let multiplier = streak.isWinStreak ? 1 : -1;
  return multiplier * streak.streak;
}

/**
 * Function used to sort players into teams based on the information gathered
 * about the players in previous iterations.
 */
function exploit(players) {
  // @TODO: Research the subset sum problem in order to find a more optimal
  // solution to this problem which should be more accurate

  //Sort players according to their weight, then sort them using the parity
  //function (see README)

  let playersCopy = JSON.parse(JSON.stringify(players));
  /*
  playersCopy.forEach(player => {
    player.weight += calculateWinRatioAdjustment(
      player,
      calculateWinRatio(player)
    );
    if (player.streak) {
      players.weight += calculateWinStreakAdjustment(player);
    }
  });
*/
  let sortedPlayers = playersCopy.sort(rankPlayers);

  //initialise empty teams
  let teams = [
    {
      players: []
    },
    {
      players: []
    }
  ];

  //Sort players into teams based on parity function
  sortedPlayers.forEach((player, i) => {
    binaryPosition = i.toString(2);
    let ones = 0;
    for (var i = 0; i < binaryPosition.length; i++) {
      if (binaryPosition.charAt(i) === '1') {
        ones++;
      }
    }

    //add player to team 1 or team 2 based on whether number of 1s is odd/even
    ones % 2 === 0
      ? teams[0].players.push(player)
      : teams[1].players.push(player);
  });

  return teams;
}

/**
 * Function to split a set of players into two teams with the intent of making
 * the teams as balanced as possible.
 * The function will first determine whether it is most useful to explore (by
 * randomizing teams to gather information) or to exploit the information that
 * has been gathered on players so far to create better teams.
 */
function selection(players) {
  sumGamesPlayed = 0;
  players.forEach(({ gamesPlayed }) => {
    sumGamesPlayed += gamesPlayed;
  });

  averageGamesPlayed = sumGamesPlayed / players.length;
  let teams;

  //decide between explore and exploit based on average games played
  // @TODO: NEEDS REFINEMENT!
  if (averageGamesPlayed >= 3) {
    teams = exploit(players);
  } else {
    teams = explore(players);
  }

  return teams;
}

module.exports = { selection, random: explore };
