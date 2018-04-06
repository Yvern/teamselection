const teamSelectionSimple = require('./iteration1/teamselectionsimple.js');
const teamSelectionImproved = require('./iteration2/teamselectionimproved.js');

//test team data
const team = {
  players: [
    {
      id: 'PLAYER1',
      weight: 50,
      hiddenWeight: 64,
      gamesPlayed: 0,
      gamesWon: 0,
      gamesLost: 0
    },
    {
      id: 'PLAYER2',
      weight: 50,
      hiddenWeight: 81,
      gamesPlayed: 0,
      gamesWon: 0,
      gamesLost: 0
    },
    {
      id: 'PLAYER3',
      weight: 50,
      hiddenWeight: 40,
      gamesPlayed: 0,
      gamesWon: 0,
      gamesLost: 0
    },
    {
      id: 'PLAYER4',
      weight: 50,
      hiddenWeight: 55,
      gamesPlayed: 0,
      gamesWon: 0,
      gamesLost: 0
    },
    {
      id: 'PLAYER5',
      weight: 50,
      hiddenWeight: 60,
      gamesPlayed: 0,
      gamesWon: 0,
      gamesLost: 0
    },
    {
      id: 'PLAYER6',
      weight: 50,
      hiddenWeight: 38,
      gamesPlayed: 0,
      gamesWon: 0,
      gamesLost: 0
    },
    {
      id: 'PLAYER7',
      weight: 50,
      hiddenWeight: 92,
      gamesPlayed: 0,
      gamesWon: 0,
      gamesLost: 0
    },
    {
      id: 'PLAYER8',
      weight: 50,
      hiddenWeight: 70,
      gamesPlayed: 0,
      gamesWon: 0,
      gamesLost: 0
    },
    {
      id: 'PLAYER9',
      weight: 50,
      hiddenWeight: 26,
      gamesPlayed: 0,
      gamesWon: 0,
      gamesLost: 0
    },
    {
      id: 'PLAYER10',
      weight: 50,
      hiddenWeight: 46,
      gamesPlayed: 0,
      gamesWon: 0,
      gamesLost: 0
    }
  ]
};

//match data included which player played on which team, scores, etc.
const match = {
  teams: [
    {
      score: 2,
      players: [
        {
          id: 'PLAYER1',
          weight: 50,
          hiddenWeight: 64,
          gamesPlayed: 0,
          gamesWon: 0,
          gamesLost: 0
        },
        {
          id: 'PLAYER2',
          weight: 50,
          hiddenWeight: 81,
          gamesPlayed: 0,
          gamesWon: 0,
          gamesLost: 0
        },
        {
          id: 'PLAYER3',
          weight: 50,
          hiddenWeight: 40,
          gamesPlayed: 0,
          gamesWon: 0,
          gamesLost: 0
        },
        {
          id: 'PLAYER4',
          weight: 50,
          hiddenWeight: 55,
          gamesPlayed: 0,
          gamesWon: 0,
          gamesLost: 0
        },
        {
          id: 'PLAYER5',
          weight: 50,
          hiddenWeight: 60,
          gamesPlayed: 0,
          gamesWon: 0,
          gamesLost: 0
        }
      ]
    },
    {
      score: 6,
      players: [
        {
          id: 'PLAYER6',
          weight: 50,
          hiddenWeight: 38,
          gamesPlayed: 0,
          gamesWon: 0,
          gamesLost: 0
        },
        {
          id: 'PLAYER7',
          weight: 50,
          hiddenWeight: 92,
          gamesPlayed: 0,
          gamesWon: 0,
          gamesLost: 0
        },
        {
          id: 'PLAYER8',
          weight: 50,
          hiddenWeight: 70,
          gamesPlayed: 0,
          gamesWon: 0,
          gamesLost: 0
        },
        {
          id: 'PLAYER9',
          weight: 50,
          hiddenWeight: 26,
          gamesPlayed: 0,
          gamesWon: 0,
          gamesLost: 0
        },
        {
          id: 'PLAYER10',
          weight: 50,
          hiddenWeight: 46,
          gamesPlayed: 0,
          gamesWon: 0,
          gamesLost: 0
        }
      ]
    }
  ]
};

//run teamselection
teamSelectionImproved(team, match);
