const fs = require('fs');
const adjustment = require('./adjustment');
const selection = require('./selection');
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

  //for each iteration, simulate a number of matches and adjust
  for (let i = 0; i < TOTAL_ITERATIONS; i++) {
    console.log('Iteration: ' + i);
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
  }

  console.log('Final adjusted team: ', adjustedTeam);
  fs.writeFile('test.csv', averageRewards, function(err) {
    if (err) {
      console.log('An error occured: ' + err);
    }
    console.log('File writing is finished.');
  });
};
