import { takeEvery, select, call, put } from 'redux-saga/effects';
import {
  QUARTER_CHANGED,
  LINEUPS_LOADED,
  LINEUPS_FAILED,
  GAMEDATA_LOADED,
  GAMEDATA_FAILED,
} from './actions';

import { getSeasonYear, getQuarter, getQuarterName } from './reducers';

import { loadGameCenterWeekData } from '../../../lib/NFLGameCenter';

const loadQuarterData = function* loadQuarterData() {
  console.log('loadQuarterData');
  try {
    const quarter = yield select(getQuarter);
    const seasonYear = yield select(getSeasonYear);

    const results = yield Promise.all(
      quarter.weeks.map(
        w =>
          new Promise(async (resolve, reject) => {
            const weekNumber = w.number;
            console.log(`loadWeekData ${seasonYear} W${weekNumber}`);
            const result = await loadGameCenterWeekData(seasonYear, weekNumber);
            if (result.error) {
              reject(result.error);
            } else {
              resolve({ seasonYear, weekNumber, weekData: result });
            }
          }),
      ),
    );

    if (results.error) {
      //  console.log(result.error);
      yield put({ type: GAMEDATA_FAILED, value: results.error });
    } else {
      //      console.log(`Object.keys(result).length: ${Object.keys(result).length}`);
      yield put({ type: GAMEDATA_LOADED, value: results });
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

export const rootQuarterPickerSaga = function* rootBoxScoreSaga() {
  //  yield takeEvery(QUARTERPICKER_INITIALIZED, loadLineups);
  //  yield takeEvery(QUARTERPICKER_INITIALIZED, loadQuarterData);
  yield takeEvery(QUARTER_CHANGED, loadQuarterData);
  yield takeEvery(QUARTER_CHANGED, loadLineups);
};

export default rootQuarterPickerSaga;
