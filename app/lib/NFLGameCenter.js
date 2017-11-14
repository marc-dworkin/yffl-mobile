import { parseString } from 'react-native-xml2js';
// import util from '../lib/util';

function parseGameSideData(sideData) {
  const passing = sideData.passing;
  const rushing = sideData.rushing;
  const receiving = sideData.receiving;
  const kicking = sideData.kicking;

  const result = {};

  if (passing != null) {
    Object.keys(passing).forEach((playerId) => {
      result[playerId] = { passing: passing[playerId] };
    });
  }

  if (rushing != null) {
    Object.keys(rushing).forEach((playerId) => {
      if (playerId in result) {
        result[playerId].rushing = rushing[playerId];
      } else {
        result[playerId] = { rushing: rushing[playerId] };
      }
    });
  }
  if (receiving != null) {
    Object.keys(receiving).forEach((playerId) => {
      if (playerId in result) {
        result[playerId].receiving = receiving[playerId];
      } else {
        result[playerId] = { receiving: receiving[playerId] };
      }
    });
  }

  if (kicking != null) {
    Object.keys(kicking).forEach((playerId) => {
      if (playerId in result) {
        result[playerId].kicking = kicking[playerId];
      } else {
        result[playerId] = { kicking: kicking[playerId] };
      }
    });
  }

  return result;
}

function parseGameData(gameData) {
  // game hasn't happened yet
  if (gameData === undefined) {
    return {};
  }
  const homeStats = parseGameSideData(gameData.home.stats);
  const awayStats = parseGameSideData(gameData.away.stats);
  return Object.assign({}, homeStats, awayStats);
}

export const loadGameCenterGameData = async function loadGameData(eid) {
  const url = `http://www.nfl.com/liveupdate/game-center/${eid}/${eid}_gtd.json`;
  // console.log(url);
  const response = await fetch(url);
  const result = await response.json();

  if (result.error) {
    return result;
  }

  const rawGameData = result[eid];
  return parseGameData(rawGameData, eid);
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

  return gameList
    .map(c => c.$)
    .map(c => ({ eid: c.eid, HomeTeamName: c.h, gsis_id: c.gsis, RoadTeamName: c.v }));
};

export const loadGameCenterWeekData = async function loadWeekData(seasonYear, weekNumber) {
  const gameList = await loadGameCenterSchedule(seasonYear, weekNumber);

  const results = await Promise.all(
    gameList.map(
      c =>
        new Promise((resolve, reject) => {
          const gameData = loadGameCenterGameData(c.eid);
          if (gameData.error) {
            reject(gameData.error);
          } else {
            resolve(gameData);
          }
        }),
    ),
  );

  const weekData = results.reduce((acc, cv) => Object.assign(acc, cv), {});

  //  console.log(`weekData.length: ${weekData.length}`);
  // console.log(weekData);
  return weekData;
};
