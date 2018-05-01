const lineReader = require('readline');
const fs = require('fs');
const teamSelectionSimple = require('./iteration1/teamselectionsimple.js');
const teamSelectionImproved = require('./iteration2/teamselectionimproved.js');
const teamSelectionSurvey = require('./iteration2/teamselectionsurvey.js');

//test team data
const team = {
  players: [
    {
      id: 'PLAYER1',
      weight: 50,
      hiddenWeight: 64,
      gamesPlayed: 0,
      gamesWon: 0,
      gamesLost: 0,
      streak: {
        isWinStreak: true,
        streak: 0
      }
    },
    {
      id: 'PLAYER2',
      weight: 50,
      hiddenWeight: 81,
      gamesPlayed: 0,
      gamesWon: 0,
      gamesLost: 0,
      streak: {
        isWinStreak: true,
        streak: 0
      }
    },
    {
      id: 'PLAYER3',
      weight: 50,
      hiddenWeight: 40,
      gamesPlayed: 0,
      gamesWon: 0,
      gamesLost: 0,
      streak: {
        isWinStreak: true,
        streak: 0
      }
    },
    {
      id: 'PLAYER4',
      weight: 50,
      hiddenWeight: 55,
      gamesPlayed: 0,
      gamesWon: 0,
      gamesLost: 0,
      streak: {
        isWinStreak: true,
        streak: 0
      }
    },
    {
      id: 'PLAYER5',
      weight: 50,
      hiddenWeight: 60,
      gamesPlayed: 0,
      gamesWon: 0,
      gamesLost: 0,
      streak: {
        isWinStreak: true,
        streak: 0
      }
    },
    {
      id: 'PLAYER6',
      weight: 50,
      hiddenWeight: 38,
      gamesPlayed: 0,
      gamesWon: 0,
      gamesLost: 0,
      streak: {
        isWinStreak: true,
        streak: 0
      }
    },
    {
      id: 'PLAYER7',
      weight: 50,
      hiddenWeight: 92,
      gamesPlayed: 0,
      gamesWon: 0,
      gamesLost: 0,
      streak: {
        isWinStreak: true,
        streak: 0
      }
    },
    {
      id: 'PLAYER8',
      weight: 50,
      hiddenWeight: 70,
      gamesPlayed: 0,
      gamesWon: 0,
      gamesLost: 0,
      streak: {
        isWinStreak: true,
        streak: 0
      }
    },
    {
      id: 'PLAYER9',
      weight: 50,
      hiddenWeight: 26,
      gamesPlayed: 0,
      gamesWon: 0,
      gamesLost: 0,
      streak: {
        isWinStreak: true,
        streak: 0
      }
    },
    {
      id: 'PLAYER10',
      weight: 50,
      hiddenWeight: 46,
      gamesPlayed: 0,
      gamesWon: 0,
      gamesLost: 0,
      streak: {
        isWinStreak: true,
        streak: 0
      }
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

function readPlayers(filePath) {
  let fileContent = '';
  let players = [];

  try {
    fileContent = fs.readFileSync(filePath, 'utf8');
  } catch (e) {
    console.log('Error: ', e.stack);
  }

  let lines = fileContent.split('#');
  lines.forEach((line, i) => {
    if (i !== 0 && line.length > 10) {
      let fields = line.split(';');
      console.log(fields);
      let names = fields[2].split(',').concat(fields[3].split(','));

      names.forEach(name => {
        //don't register guests
        if (!name.includes('Guest')) {
          //if not already in players, add player
          if (players.indexOf(name) === -1) {
            players.push(name);
          }
        }
      });
    }
  });

  console.log(players);

  return {
    players: players.map(player => ({
      id: player,
      weight: 50,
      gamesPlayed: 0,
      gamesWon: 0,
      gamesLost: 0
    }))
  };
}

let players = readPlayers('scoresAndTeams.txt');
console.log(players);

//run teamselection
//teamSelectionImproved(team, match);
teamSelectionSurvey(players);
