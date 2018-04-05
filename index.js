const teamSelection = require('./teamselectionsimple.js');

//test team data
const team = {
  players: [
    { id: 'PLAYER1', weight: 50, hiddenWeight: 64 },
    { id: 'PLAYER2', weight: 50, hiddenWeight: 81 },
    { id: 'PLAYER3', weight: 50, hiddenWeight: 40 },
    { id: 'PLAYER4', weight: 50, hiddenWeight: 55 },
    { id: 'PLAYER5', weight: 50, hiddenWeight: 60 },
    { id: 'PLAYER6', weight: 50, hiddenWeight: 38 },
    { id: 'PLAYER7', weight: 50, hiddenWeight: 92 },
    { id: 'PLAYER8', weight: 50, hiddenWeight: 70 },
    { id: 'PLAYER9', weight: 50, hiddenWeight: 26 },
    { id: 'PLAYER10', weight: 50, hiddenWeight: 46 }
  ]
};

//match data included which player played on which team, scores, etc.
const match = {
  teams: [
    {
      score: 2,
      players: [
        { id: 'PLAYER1', weight: 50, hiddenWeight: 64 },
        { id: 'PLAYER2', weight: 50, hiddenWeight: 81 },
        { id: 'PLAYER3', weight: 50, hiddenWeight: 40 },
        { id: 'PLAYER4', weight: 50, hiddenWeight: 55 },
        { id: 'PLAYER5', weight: 50, hiddenWeight: 60 }
      ]
    },
    {
      score: 6,
      players: [
        { id: 'PLAYER6', weight: 50, hiddenWeight: 38 },
        { id: 'PLAYER7', weight: 50, hiddenWeight: 92 },
        { id: 'PLAYER8', weight: 50, hiddenWeight: 70 },
        { id: 'PLAYER9', weight: 50, hiddenWeight: 26 },
        { id: 'PLAYER10', weight: 50, hiddenWeight: 46 }
      ]
    }
  ]
};

//run teamselection
teamSelection(team, match);
