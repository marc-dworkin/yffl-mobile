// import seasons, { currentYear, currentQuarter } from '../../../data/yfflSeasons';

import { takeEvery, select, call, put, all } from 'redux-saga/effects';
import {
  QUARTER_DATA_REQUESTED,
  QUARTERPICKER_INITIALIZED,
  lineupsLoaded,
  lineupsFailed,
  gameDataLoaded,
  gameDataFailed,
  quarterDataLoading,
  quarterDataLoaded,
  quarterDataRequested,
} from './actions';

import { getSeasonYear, getQuarter, getQuarterName } from './reducers';

import { loadGameCenterWeekData } from '../../../lib/NFLGameCenter';

const loadGameData = function* loadGameData() {
  //  console.log('loadQuarterData');
  try {
    const quarter = yield select(getQuarter);
    const seasonYear = yield select(getSeasonYear);

    // TODO: don't load games that aren't started..

    const results = yield Promise.all(
      quarter.weeks.map(
        w =>
          new Promise(async (resolve) => {
            const weekNumber = w.number;
            try {
              // https://stackoverflow.com/questions/31424561/wait-until-all-es6-promises-complete-even-rejected-promises
              const result = await loadGameCenterWeekData(seasonYear, weekNumber);
              resolve({ seasonYear, weekNumber, weekData: result });
            } catch (error) {
              resolve({ seasonYear, weekNumber, error });
            }
          }),
      ),
    );

    //      console.log(`Object.keys(result).length: ${Object.keys(result).length}`);
    yield put(gameDataLoaded(results));
  } catch (error) {
    console.log(`error: ${error}`);
    yield put(gameDataFailed(error.message));
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
  try {
    const response = yield call(loadLineupsFunc, seasonYear, quarterName);
    const result = yield response.json();
    if (result.error) {
      yield put(lineupsFailed(result.error));
    } else {
      yield put(lineupsLoaded(result.lineups));
    }
  } catch (error) {
    yield put(lineupsFailed(error.message));
  }
};

const quarterDataSaga = function* quarterDataSaga() {
  yield put(quarterDataLoading());
  yield all([call(loadLineups), call(loadGameData)]);
  yield put(quarterDataLoaded());
};

const quarterPickerInitializedSaga = function* quarterPickerInitializedSaga() {
  yield put(quarterDataRequested());
};

export const rootQuarterPickerSaga = function* rootBoxScoreSaga() {
  yield takeEvery(QUARTER_DATA_REQUESTED, quarterDataSaga);
  yield takeEvery(QUARTERPICKER_INITIALIZED, quarterPickerInitializedSaga);
};

export default rootQuarterPickerSaga;
