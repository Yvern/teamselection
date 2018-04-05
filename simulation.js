const RANDOM_PERCENTAGE_VARIATION = 5;

/**
 * A function to simulate match outcomes based on given player strengths (as
 * set for testing, this will not be adjusted) and a small percentage random
 * chance
 */
module.exports = function(teams) {
  //create a copy of teams
  let match = { teams: JSON.parse(JSON.stringify(teams)) };
  console.log('simulate');
  //calculate the total weight for each team
  let totalWeight = 0;
  let totalWeights = teams.map(({ players }) => {
    let sumWeight = 0;
    players.forEach(player => {
      sumWeight += player.hiddenWeight;
      totalWeight += player.hiddenWeight;
    });
    return sumWeight;
  });

  //generate scores based on total weight and a small random chance value
  let scores = totalWeights.map((weight, i) => {
    //calculate the average player weight
    let relativeWeight = weight / totalWeight * 100;
    //randomly add or subtract a number between 0 or the specified percentage
    let randomRelativeWeight =
      Math.floor(Math.random() * 2 + 1) === 1
        ? relativeWeight +
          Math.floor(Math.random() * RANDOM_PERCENTAGE_VARIATION)
        : relativeWeight -
          Math.floor(Math.random() * RANDOM_PERCENTAGE_VARIATION);
    return Math.floor(randomRelativeWeight);
  });
  console.log('Team weights: ' + scores + ' , ' + totalWeights);

  //add simulated scores to match teams
  for (i = 0; i < match.teams.length; i++) {
    match.teams[i].score = scores[i];
  }

  return match;
};

//alternative simulation idea:
//make it more like a match, set a for loop with up to 20 (or something) rounds
//to 'score' and give each team a chance to score based on the team's total
//weighting. This chance will diminish over time. E.g. the chance to score
//first round will be 60% for team 1 and 40% for team 2, but by round 10 it will
//be 20% for team 1 and 10% for team 2. Can set the diminish rate of the lower
//weighted team to be quicker too, so their likelihood of 'scoring' in the late
//rounds will decrease more quickly.
