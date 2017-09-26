// import { takeEvery, call, put, select } from 'redux-saga/effects';

import teams from '../../data/teams';
import seasons from '../../data/seasons';

// actions
export const SEASON_SELECTED = 'SEASON_SELECTED';
export const TEAM_SELECTED = 'TEAM_SELECTED';
export const QUARTER_SELECTED = 'QUARTER_SELECTED';
export const WEEK_SELECTED = 'WEEK_SELECTED';
export const LINEUPS_REQUESTED = 'LINEUPS_REQUESTED';
export const LINEUPS_LOADED = 'LINEUP_LOADED';
export const LINEUPS_FAILED = 'LINEUP_FAILED';

export const seasonSelected = value => ({
  type: SEASON_SELECTED,
  value: parseInt(value, 10),
});

export const quarterSelected = value => ({
  type: QUARTER_SELECTED,
  value: parseInt(value, 10),
});

export const teamSelected = value => ({
  type: TEAM_SELECTED,
  value: (value !== null)
    ? teams.find(t => t.owner === value || t.name === value || t.number === parseInt(value, 10))
    : value,
});


export const weekSelected = value => ({
  type: WEEK_SELECTED,
  value: parseInt(value, 10),
});

export const lineupsRequested = value => ({
  type: LINEUPS_REQUESTED,
  value,
});

export const lineupsLoaded = value => ({
  type: LINEUPS_LOADED,
  value,
});

export const lineupsFailed = value => ({
  type: LINEUPS_FAILED,
  value,
});

/*

// sagas
export const loadLineupsFunc = (year, quarter) => fetch(`http://yffl-174812.appspot.com/lineups?year=${year}&quarter=${quarter}`);

const loadLineups = function* (action) {
  try {
    const response = yield call(loadLineupsFunc, action.year, action.quarter);
    const result = yield response.json();
    if (result.error) {
      yield put({ type: LINEUPS_LOAD_FAILED, value: result.error });
    } else {
      yield put({ type: LINEUPS_LOADED, result });
    }
  } catch (error) {
    yield put({ type: LINEUPS_FAILED, value: error.message });
  }
};

export const rootSaga = function*() {
  yield takeEvery(LINEUPS_REQUESTED, loadLineups);
}

*/

// reducers

// assume first year is current
// TODO: make this work in off-season
const currentYear = seasons[0];
// console.log(`currentYear: ${currentYear}`);
const currentQuarter = currentYear.quarters.filter(s => s.isCurrent)[0];

// console.log('currentQuarter.weeks:');
// console.log(currentQuarter.weeks);
const currentWeek = currentQuarter.weeks.filter(s => s.isCurrent)[0];

const initialState = {
  team: teams[0],
  season: seasons[0],
  quarter: currentQuarter,
  week: currentWeek,
};

// console.log(currentQuarter);

export const BoxScoreState = (state = initialState, action) => {
  const res = {
    ...state,
  };


  switch (action.type) {
    case TEAM_SELECTED:
      res.team = action.value || initialState.team;
      break;
    case SEASON_SELECTED:
      if (action.value != null) {
        res.season = seasons.filter(s => s.year === action.value)[0];
        res.quarter = res.season.quarters[res.season.quarters.length - 1];
        res.week = res.quarter.weeks[res.quarter.weeks.length - 1];
        // TODO      } else {
        //        res.season = initialState;
      }
      break;
    case QUARTER_SELECTED:
      if (action.value != null) {
        res.quarter = res.season.quarters.filter(s => s.number === action.value)[0];
        res.week = res.quarter.weeks[res.quarter.weeks.length - 1];
        // TODO } else {
        //  res.quarter = res.season.quarters[0];
      }
      break;
    case WEEK_SELECTED:
      if (action.value != null) {
        // todo: error handle if week not in quarter
        res.week = res.quarter.weeks.filter(s => s.number === action.value)[0];
        // TODO: } else {
        //  res.quarter = res.year.quarters[0];
      }
      break;
    default:
      break;
  }

  /*
  console.log('action');
  console.log(action);
  console.log('state');
  console.log(res);
  */
  return res;
};
