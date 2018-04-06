/**
 * Function that returns a numerical value indicating the success of the
 * match it made - a draw score indicated the most successful match possible.
 * The highest reward is 100, achieved by both teams having achieved equal scores
 * during the football match.
 * @TODO: Adjust ratios in case scores exceed 100
 */
function obtainReward(match) {
  let reward = 0;
  let difference = Math.abs(match.teams[0].score - match.teams[1].score);
  //take the absolute value of the difference and use as reward value
  let relativeDifference =
    difference / (match.teams[0].score + match.teams[1].score) * 100;

  reward = 100 - relativeDifference;
  //ensure reward is greater than 0
  reward = reward < 0 ? 0 : reward;
  return reward;
}

module.exports = obtainReward;
