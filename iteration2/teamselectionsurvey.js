const fs = require('fs');
const adjustment = require('./adjustment');
const selection = require('./selection').selection;
const random = require('./selection').random;
const simulateMatch = require('./simulation');

//testing variables
const NUMBER_OF_SURVEY_TEAMS = 5;

/**
 * A function meant to generate teams based on real collected data that will
 * be assessed in a survey to give an indication of the quality of suggestions.
 */
module.exports = function(players) {
  let adjustedPlayers = players;

  //for each match registered in the file, adjust team based on results

  matchTeams = [];
  matchOutcomes = getMatchInformation('scoresAndTeams.txt');

  matchOutcomes.forEach(matchOutcome => {
    //adjust teams based on match outcome
    adjustedPlayers = adjustment.adjust(players, matchOutcome);
    reward = adjustment.obtainReward(matchOutcome);
  });

  console.log('Final adjusted team: ', adjustedPlayers);

  let frequentPlayers = adjustedPlayers.filter(player => {
    return player.gamesPlayed >= 3;
  });

  //matchTeams = selection(adjustedPlayers.slice(0, 10));
  //console.log('MATCH TEAM 1', matchTeams[0].players);
  //console.log('MATCH TEAM 2', matchTeams[1].players);

  /*
  for (let i = 0; i < NUMBER_OF_SURVEY_TEAMS; i++) {
    shuffle(adjustedPlayers);
    matchTeams = random(frequentPlayers.slice(0, 10));
    //console.log('MATCH TEAM 1', matchTeams[0].players);
    //console.log('MATCH TEAM 2', matchTeams[1].players);


    let match = i + '\n';
    let team1 =
      'TEAM 1: ' + matchTeams[0].players.map(player => player.id) + '\n';
    let team2 =
      'TEAM 2: ' + matchTeams[1].players.map(player => player.id) + '\n';

    let fileInfo = i + team1 + team2;

    fs.appendFileSync('random.txt', fileInfo, function(err) {
      if (err) {
        console.log(err);
      }
      console.log('Writing...');
    });
  }
  */

  //generate actual team based on given players
  let usedPlayers = [
    'Jonnie',
    'Njabulo',
    'Tamas',
    'StephenL',
    'Wazzy',
    'MattL',
    'Jason',
    'Oliver',
    'Jake',
    'Emilian',
    'TomM',
    'Josh'
  ];
  let teamPlayers = [];
  adjustedPlayers.forEach(player => {
    usedPlayers.forEach(name => {
      if (player.id === name) {
        teamPlayers.push(player);
        console.log(player, name);
      }
    });
  });
  console.log('TEAM players: ', teamPlayers);

  console.log('MATCH TEAMS: ', selection(teamPlayers));
  console.log('TEAM 1: ', selection(teamPlayers)[0].players);
  console.log('TEAM 2: ', selection(teamPlayers)[1].players);
};

function getMatchInformation(filePath) {
  let fileContent = '';
  let matchOutcomes = [];

  try {
    fileContent = fs.readFileSync(filePath, 'utf8');
  } catch (e) {
    console.log('Error: ', e.stack);
  }

  let lines = fileContent.split('#');
  lines.forEach((line, i) => {
    if (i !== 0 && line.length > 10) {
      let matchOutcome = [];
      let fields = line.split(';');

      //read match info from file
      matchOutcome.push({
        players: fields[2].split(',').map(player => ({ id: player })),
        score: parseInt(fields[4])
      });

      matchOutcome.push({
        players: fields[3].split(',').map(player => ({ id: player })),
        score: parseInt(fields[5])
      });

      matchOutcomes.push({ teams: matchOutcome });
    }
  });
  return matchOutcomes;
}

/**
 * Shuffles array in place according to Fisher-Yates shuffle.
 * @param {Array} a items An array containing the items.
 */
function shuffle(a) {
  var j, x, i;
  for (i = a.length - 1; i > 0; i--) {
    j = Math.floor(Math.random() * (i + 1));
    x = a[i];
    a[i] = a[j];
    a[j] = x;
  }
  return a;
}
