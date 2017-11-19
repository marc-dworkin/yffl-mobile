import { parseString } from 'react-native-xml2js';
// import util from '../lib/util';

function parseGameSideData(sideData, gameInfo) {
  const passing = sideData.passing;
  const rushing = sideData.rushing;
  const receiving = sideData.receiving;
  const kicking = sideData.kicking;

  const result = {};

  if (passing != null) {
    Object.keys(passing).forEach((playerId) => {
      result[playerId] = { passing: passing[playerId], gameInfo };
    });
  }

  if (rushing != null) {
    Object.keys(rushing).forEach((playerId) => {
      if (playerId in result) {
        result[playerId].rushing = rushing[playerId];
      } else {
        result[playerId] = { rushing: rushing[playerId], gameInfo };
      }
    });
  }
  if (receiving != null) {
    Object.keys(receiving).forEach((playerId) => {
      if (playerId in result) {
        result[playerId].receiving = receiving[playerId];
      } else {
        result[playerId] = { receiving: receiving[playerId], gameInfo };
      }
    });
  }

  if (kicking != null) {
    Object.keys(kicking).forEach((playerId) => {
      if (playerId in result) {
        result[playerId].kicking = kicking[playerId];
      } else {
        result[playerId] = { kicking: kicking[playerId], gameInfo };
      }
    });
  }

  return result;
}

function parseGameData(gameData, gameInfo) {
  // game hasn't happened yet
  if (gameData === undefined) {
    return {};
  }
  const homeStats = parseGameSideData(gameData.home.stats, gameInfo);
  const awayStats = parseGameSideData(gameData.away.stats, gameInfo);
  return Object.assign({}, homeStats, awayStats);
}

export const loadGameCenterGameData = async function loadGameCenterGameData(gameInfo) {
  const url = `http://www.nfl.com/liveupdate/game-center/${gameInfo.eid}/${gameInfo.eid}_gtd.json`;
  // console.log(url);
  const response = await fetch(url);
  const result = await response.json();

  if (result.error) {
    return result;
  }

  const rawGameData = result[gameInfo.eid];
  return parseGameData(rawGameData, gameInfo);
};

export const loadGameCenterSchedule = async function loadGameList(seasonYear, weekNumber) {
  const url = `http://www.nfl.com/ajax/scorestrip?season=${seasonYear}&seasonType=REG&week=${weekNumber}`;
  //  console.log(url);
  const gameListResponse = await fetch(url);
  const gameListXML = await gameListResponse.text();
  /*
  18:41:05: Object {
    "$": Object {
      "d": "Thu",
      "eid": "2016112400",
      "ga": "",
      "gsis": "57062",
      "gt": "REG",
      "h": "DET",
      "hnn": "lions",
      "hs": "16",
      "k": "",
      "p": "",
      "q": "F",
      "rz": "",
      "t": "12:30",
      "v": "MIN",
      "vnn": "vikings",
      "vs": "13",
    },
  }
  */
  let gameList = {};

  parseString(gameListXML, (err, result) => {
    gameList = result.ss.gms[0].g;
  });

  return gameList.map(c => c.$).map(c => ({
    eid: c.eid,
    HomeTeamName: c.h,
    HomeTeamScore: c.hs,
    gsis_id: c.gsis,
    RoadTeamName: c.v,
    RoadTeamSCore: c.vs,
    Day: c.d,
    Time: c.t,
    // TODO:    RedZone: c.rz,
  }));
};

export const loadGameCenterWeekData = async function loadGameCenterWeekData(
  seasonYear,
  weekNumber,
) {
  const gameList = await loadGameCenterSchedule(seasonYear, weekNumber);

  // https://stackoverflow.com/questions/31424561/wait-until-all-es6-promises-complete-even-rejected-promises
  const results = await Promise.all(
    gameList.map(
      c =>
        new Promise(async (resolve) => {
          try {
            const gameData = await loadGameCenterGameData(c);
            resolve(gameData);
          } catch (error) {
            resolve({ error });
          }
        }),
    ),
  );

  // TODO: captureErrors better.
  const playerData = results.reduce((acc, cv) => Object.assign(acc, cv), {});

  //  console.log(results.length);

  //  console.log(`weekData.length: ${weekData.length}`);
  // console.log(weekData);
  return { gameList, playerData };
};
