const ifNull = (val, ifNullVal = 0) => {
  if (val) {
    return val;
  }
  return ifNullVal;
};

export const getYFFLPoints = (section, stats) => {
  let pts = 6 * ifNull(stats.tds);
  pts += 2 * ifNull(stats.twoptm);

  switch (section) {
    case 'passing':
      // Q. Each 100 yards passing = +1
      pts += parseInt(ifNull(stats.yds) / 100, 10);
      break;
    case 'rushing':
      /*
      H. Rushes for 100-149 yds = +1
I. Rushes for 150-199 yds = +2
J. Rushes for 200-249 yds = +4
K. Rushes for 250+ yds = +6
*/
      if (stats.yds > 249) {
        pts += 6;
      } else if (stats.yds > 199) {
        pts += 4;
      } else if (stats.yds > 149) {
        pts += 2;
      } else if (stats.yds > 99) {
        pts += 1;
      }
      break;
    case 'receiving':
      // P. Each 100 yards receiving = +1
      pts += parseInt(ifNull(stats.yds) / 100, 10);

      /*
L. Receives 6-8 passes = +1
M. Receives 9-11 passes = +2
N. Receives 12-14 passes = +3
O. Receives 15+ passes = +4
*/
      if (stats.rec > 14) {
        pts += 4;
      } else if (stats.rec > 11) {
        pts += 3;
      } else if (stats.rec > 8) {
        pts += 2;
      } else if (stats.rec > 5) {
        pts += 1;
      }

      break;
    case 'kicking':
      pts += 3 * ifNull(stats.fgm, 0);
      pts += 1 * ifNull(stats.xpmade, 0);
      break;
    default:
      break;
  }
  return pts;
};

// TODO: Use lib/collections to make this more readable
export const compileTeamPlayerWeekData = (gameData, lineups) => {
  if (gameData && lineups) {
    // list of players, map arr to object keys for efficiency
    const players = lineups
      .reduce((accumulator, currentValue) => {
        accumulator[currentValue.gsis_id] = currentValue;
        return accumulator;
      }, {});


    // dict of team_id -> player_id -> 'weekData' -> week_number -> data
    // && team_id -> player_id -> 'player'
    const teamPlayerWeekData = {};

    // initialize dictionary (ensure all playyers in lineup are in)
    Object.entries(players).forEach(([playerId, player]) => {
      if (teamPlayerWeekData[player.yffl_team] === undefined) {
        teamPlayerWeekData[player.yffl_team] = {};
      }
      const teamData = teamPlayerWeekData[player.yffl_team];
      teamData[playerId] = {
        weekData: {},
        player,
      };
    });

    gameData.forEach((weekData) => {
      // populate game info for each week
      const teamPlayerData = {};

      Object.entries(weekData.weekData.playerData).forEach(([playerId, playerGameData]) => {
        if (playerId in players) {
          const player = players[playerId];

          const playerGameDataCopy = { ...playerGameData };

          let points = 0;
          Object.entries(playerGameData).forEach(([section, stats]) => {
            if (section !== 'gameInfo') {
              const pts = getYFFLPoints(section, stats);
              points += pts;
              playerGameDataCopy[section]._pts = pts;
            }
          });
          playerGameDataCopy.yfflInfo = {
            Points: points,
            IsStarter: false,
            weekNumber: weekData.weekNumber,
          };

          teamPlayerWeekData[player.yffl_team][playerId]
            .weekData[weekData.weekNumber] = playerGameDataCopy;

          if (teamPlayerData[player.yffl_team] === undefined) {
            teamPlayerData[player.yffl_team] = {};
          }
          if (teamPlayerData[player.yffl_team][player.position] === undefined) {
            teamPlayerData[player.yffl_team][player.position] = {};
          }
          teamPlayerData[player.yffl_team][player.position][playerId] = playerGameDataCopy;
        }
      });

      // now score each team for each week
      Object.entries(teamPlayerData).forEach(([yfflTeam, positionPlayerData]) => {
        Object.entries(positionPlayerData).forEach(([position, playerData]) => {
          let numberOfStarters = 0;
          switch (position) {
            case 'QB':
              numberOfStarters = 1;
              break;
            case 'K':
              numberOfStarters = 1;
              break;
            case 'WR':
              numberOfStarters = 2;
              break;
            case 'RB':
              numberOfStarters = 2;
              break;
            default:
              numberOfStarters = 0;
          }

          //          console.log(playerData);
          Object.values(playerData)
            .sort((a, b) => b.yfflInfo.Points - a.yfflInfo.Points)
            .slice(0, numberOfStarters)
            // eslint-disable-next-line no-param-reassign
            .forEach((p) => { p.yfflInfo.IsStarter = true; });
        });
      });
    });
    return teamPlayerWeekData;
  }
  return null;
};


export default null;
