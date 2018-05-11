This project folder is designated for tests to operate the team selection algorithm.

--- Overall algorithm summary ---

The algorithm designed in this project is intended to create balanced teams. This
is based on a given set of players, e.g. two teams created from a pool of ten players.
The ideal match outcome would be a draw score, e.g. 5 for Team 1 and 5 for Team 2.
If this goal is not met, player variables will be adjusted to try to achieve this
for the next match. The algorithm is based on reinforcement learning, where it will
'learn' through trial and error by balancing its exploring of possible variables with
exploiting of information that it gains.

--- Running the algorithm ---
To run the algorithm on a local machine, Node.js must be installed. When installed,
use the command line within the teamselection folder (where this README.md document is)
and execute:

node index.js

This will start the algorithm to test based on given test parameters and output the
results to a 'results.csv' file.

--- ITERATION 1 ---

Simple adjusting not dependent on relative score, only based on win vs loss. If a draw
occurs, no changes need to be made. The winning and losing team's player variables
will be adjusted to reflect their team's result (win or loss) in order to compensate
next game. The rate of adjustment will be a flat rate, e.g. if a player was on the
winning team, its score will be increased by 1 and if a player was on the losing team
its score will be decreased by 1. This will happen regardless of whether the team won
or lost by 1 point or by 10 points. The teams will not be purposefully varied each
match, and so teams may end up becoming the same each match.

Files:

teamselectionsimple.js
-> File that holds the functions to test the algorithm's functionality, uses
iterations and simulated information to test the algorithm on.

reward.js
-> Holds the function that determines the given reward based on a match outcome.

adjustment.js
-> Various functions that are used to determine if and how to adjust the current
'rules' for each player that affects how they are sorted during team selection.

selection.js
-> Functions to select teams using explore or exploit methodology.

% Team Selection Problem %
This problem vaguely falls into the category of Subset Sum Problems, one of the
NP-Complete problems. However, the problem is simplified by the fact that the
teams must be of equal or close to equal size.

For this 'simple' first iteration, the approach used will be to sort players
according to their respective 'weight', then use a parity function based on the
binary position of each player in the sorted array. For example:
Player weights when sorted: 91, 77, 62, 55, 40, 26
Parity function:
91 - 0000 - Even
77 - 0001 - Odd
62 - 0010 - Odd
55 - 0011 - Even
40 - 0100 - Odd
26 - 0101 - Even

Resulting teams: 91, 55, 26 (total: 172) VS 77, 62, 40 (total: 179)

This will achieve a fairly equal weighting, but is imperfect.

--- ITERATION 2 ---
teamselectionimproved.js
-> File that holds the functions to test the algorithm's functionality, uses
iterations and simulated information to test the algorithm on

teamselectionsurvey.js
-> File that holds the functions to use the algorithm to create predictions based
on real obtained data. This will be used in a survey.

reward.js
-> Holds the function that determines the given reward based on a match outcome.
Rewards now penalise match outcomes with greatly differing scores more by using
squared 'error'.

adjustment.js
-> Adjustment now adjusts based on relative score difference and takes into
consideration the games played.

selection.js
-> Functions to select teams based on explore and exploit. The explore vs exploit
algorithm, or calling schedule, has been refined in this iteration to use a
sigmoid curve to calculate the probability of choosing exploit over explore.
