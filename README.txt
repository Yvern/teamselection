This project folder is designated for tests to operate the team selection algorithm.

--- Overall algorithm summary ---

The algorithm designed in this project is intended to create balanced teams. This 
is based on a given set of players, e.g. two teams created from a pool of ten players.
The ideal match outcome would be a draw score, e.g. 5 for Team 1 and 5 for Team 2. 
If this goal is not met, player variables will be adjusted to try to achieve this 
for the next match. The algorithm is based on reinforcement learning, where it will
'learn' through trial and error by balancing its exploring of possible variables with 
exploiting of information that it gains.


--- ITERATION 1 ---

Simple adjusting not dependent on relative score, only based on win vs loss. If a draw
occurs, no changes need to be made. The winning and losing team's player variables 
will be adjusted to reflect their team's result (win or loss) in order to compensate
next game. The rate of adjustment will be a flat rate, e.g. if a player was on the 
winning team, its score will be increased by 1 and if a player was on the losing team 
its score will be decreased by 1. This will happen regardless of whether the team won
or lost by 1 point or by 10 points. The teams will not be purposefully varied each 
match, and so teams may end up becoming the same each match. 