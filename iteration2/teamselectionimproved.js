const fs = require('fs');
const adjustment = require('./adjustment');
const selection = require('./selection').selection;
const simulateMatch = require('./simulation');

//testing variables
const ITERATIONS_PER_ADJUSTMENT = 20; //number of matches simulated with same player variables
const TOTAL_ITERATIONS = 100; //total number of times adjustments will be done

/**
 * A testing function meant to simulate iterations of players of various strengths
 * playing matches, selecting a team based on selection rules and player
 * information, and adjusting the player weights based on match outcomes
 */
module.exports = function(team, match) {
  let adjustedTeam = team;
  let matchResults = match;

  let averageRewards = [];

  //overwrite initial test file that will save more detailed results of the
  //test to inspect for the user
  fs.writeFile('test.txt', averageRewards, function(err) {
    if (err) {
      console.log('An error occured: ' + err);
    }
    console.log('Writing details to file...');
  });

  //used to store details that will be written to file at the end of the test
  let fileText = '';

  //for each iteration, simulate a number of matches and adjust
  for (let i = 0; i < TOTAL_ITERATIONS; i++) {
    let sumReward = 0;

    //for each iteration, simulate a match with the same variables
    let matchTeams;
    let matchOutcome;
    for (j = 0; j < ITERATIONS_PER_ADJUSTMENT; j++) {
      //generate teams for the match based on learned rules
      matchTeams = selection(team.players);
      //simulateMatch
      matchOutcome = simulateMatch(matchTeams);
      sumReward += adjustment.obtainReward(matchOutcome);
    }

    //adjust teams based on match outcome
    adjustedTeam = adjustment.adjust(team, matchOutcome);
    averageRewards.push(sumReward / ITERATIONS_PER_ADJUSTMENT);
    fileText = fileText.concat(
      fileWriteInfo(i, matchTeams, matchOutcome, adjustedTeam)
    );
  }

  console.log('Final adjusted team: ', adjustedTeam);
  fs.writeFile('results.csv', averageRewards, function(err) {
    if (err) {
      console.log('An error occured: ' + err);
    }
    console.log('File writing is finished.');
  });

  fs.writeFile('test.txt', fileText, function(err) {
    if (err) {
      console.log('An error occured: ' + err);
    }
  });
};

function fileWriteInfo(iteration, matchTeams, matchOutcome, adjustedTeam) {
  let iterationString = 'ITERATION: ' + iteration + '\n\n';
  let teamInfo = 'Match teams: \n' + JSON.stringify(matchTeams) + '\n\n';
  let matchInfo = 'Match outcome: \n' + JSON.stringify(matchOutcome) + '\n\n';
  let newTeamInfo = 'Adjusted team: \n' + JSON.stringify(adjustedTeam) + '\n\n';

  let info = iterationString + teamInfo + matchInfo + newTeamInfo + '\n\n';

  return info;
}
