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
 * Function used to sort players into teams based on the information gathered
 * about the players in previous iterations.
 */
function exploit(players) {
  let teams = null;
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
  let teams = explore(players);
  return teams;
}

module.exports = selection;
