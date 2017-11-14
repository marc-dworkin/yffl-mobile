import { takeEvery, select, call, put } from 'redux-saga/effects';
import {
  BOXSCORE_INITIALIZED,
  SEASON_SELECTED,
  QUARTER_SELECTED,
  WEEK_SELECTED,
  LINEUPS_LOADED,
  LINEUPS_FAILED,
  GAMEDATA_LOADED,
  GAMEDATA_FAILED,
} from './actions';

import { getSeasonYear, getQuarterName, getWeekNumber } from './reducers';

import { loadGameCenterWeekData } from '../../../lib/NFLGameCenter';

export const loadWeekData = function* loadWeekData() {
  try {
    const seasonYear = yield select(getSeasonYear);
    const weekNumber = yield select(getWeekNumber);
    console.log(`loadWeekData ${seasonYear} W${weekNumber}`);

    const result = yield loadGameCenterWeekData(seasonYear, weekNumber);

    if (result.error) {
      //  console.log(result.error);
      yield put({ type: GAMEDATA_FAILED, value: result.error });
    } else {
      //      console.log(`Object.keys(result).length: ${Object.keys(result).length}`);
      yield put({ type: GAMEDATA_LOADED, value: result });
    }
  } catch (error) {
    console.log(error);
    yield put({ type: GAMEDATA_FAILED, value: error.message });
  }
};

const loadLineupsFunc = (seasonYear, quarterName) => {
  const url = `https://storage.googleapis.com/y_1993/live-scoring/${quarterName}-${seasonYear}-lineups.json`;
  console.log(url);
  return fetch(url);
};

const loadLineups = function* loadLineups() {
  const seasonYear = yield select(getSeasonYear);
  const quarterName = yield select(getQuarterName);
  console.log(`loadLineups ${seasonYear} ${quarterName}`);
  try {
    const response = yield call(loadLineupsFunc, seasonYear, quarterName);
    const result = yield response.json();
    if (result.error) {
      // console.log(result);
      yield put({ type: LINEUPS_FAILED, value: result.error });
    } else {
      //      console.log(result.lineups.length);
      yield put({ type: LINEUPS_LOADED, value: result.lineups });
    }
  } catch (error) {
    console.log(error);
    yield put({ type: LINEUPS_FAILED, value: error.message });
  }
};

export const rootBoxScoreSaga = function* rootBoxScoreSaga() {
  yield takeEvery(SEASON_SELECTED, loadWeekData);
  yield takeEvery(QUARTER_SELECTED, loadWeekData);
  yield takeEvery(WEEK_SELECTED, loadWeekData);
  yield takeEvery(SEASON_SELECTED, loadLineups);
  yield takeEvery(QUARTER_SELECTED, loadLineups);
  yield takeEvery(BOXSCORE_INITIALIZED, loadLineups);
  yield takeEvery(BOXSCORE_INITIALIZED, loadWeekData);
};
