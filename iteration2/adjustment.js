const obtainReward = require('./reward');

/**
 * Function to compare two given teams based on score, where a higher score will
 * sort the team into a lower order
 */
function rankTeams(teamA, teamB) {
  if (teamA.score > teamB.score) {
    return -1;
  }
  if (teamA.score < teamB.score) {
    return 1;
  }
  return 0;
}

function adjustWinner(player, adjustment) {
  player.weight += adjustment;
  player.gamesWon += 1;
  return player;
}

function adjustLoser(player, adjustment) {
  player.weight -= adjustment;
  player.gamesLost += 1;
  return player;
}

function adjust(team, match) {
  let adjustedTeam = JSON.parse(JSON.stringify(team));

  let difference = Math.abs(match.teams[0].score - match.teams[1].score);
  let reward = obtainReward(match);
  if (reward === 100) {
    console.log('Yay, a draw! Reward: ' + reward);
  } else {
    //sort teams in order of score, where rankedTeams[0] is the highest scoring
    //team
    let rankedTeams = match.teams.sort(rankTeams);

    //adjust player variables if they were in the winning team or losing team
    adjustedTeam.players = team.players.map(player => {
      player.gamesPlayed += 1;

      //if the player was on the winning team, adjust for win
      rankedTeams[0].players.forEach(winningPlayer => {
        if (player.id === winningPlayer.id) {
          return adjustWinner(player, difference);
        }
      });
      //if the player was on the losing team, adjust for loss
      rankedTeams[1].players.forEach(losingPlayer => {
        if (player.id === losingPlayer.id) {
          return adjustLoser(player, difference);
        }
      });
      //if player was not in the match, don't change
      return player;
    });
  }

  //return the team with adjust players
  return adjustedTeam;
}

/**
 * Function intended for testing.
 */
module.exports = {
  adjust: adjust,
  obtainReward: obtainReward
};
