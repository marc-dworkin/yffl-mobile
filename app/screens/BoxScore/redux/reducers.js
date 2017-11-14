import seasons from '../../../data/seasons';
import teams from '../../../data/teams';

import {
  BOXSCORE_INITIALIZED,
  SEASON_SELECTED,
  TEAM_SELECTED,
  QUARTER_SELECTED,
  WEEK_SELECTED,
  LINEUPS_LOADED,
} from './actions';

import { GAMEDATA_LOADED } from './index';

// assume first year is current
// TODO: make this work in off-season

const currentYear = seasons[0];
const currentQuarter = currentYear.quarters.filter(s => s.isCurrent)[0];

const currentWeek = currentQuarter.weeks.filter(s => s.isCurrent)[0];

const initialState = {
  team: teams[0],
  season: currentYear,
  quarter: currentQuarter,
  week: currentWeek,
};

export const getBoxScoreState = (state = initialState) => {
  // TODO: Figure out why not initialized properly
  if (state.BoxScoreState) {
    return state.BoxScoreState;
  }
  return state;
};
export const getSeason = state => getBoxScoreState(state).season;
export const getSeasonYear = state => getSeason(state).year;
export const getQuarter = state => getBoxScoreState(state).quarter;
export const getQuarterNumber = state => getQuarter(state).number;
export const getQuarterName = state => getQuarter(state).name;
export const getWeek = state => getBoxScoreState(state).week;
export const getWeekNumber = state => getWeek(state).number;
export const getTeam = state => getBoxScoreState(state).team;
export const getTeamNumber = state => getTeam(state).number;
export const getLineups = state => getBoxScoreState(state).lineups;
export const getGameData = state => getBoxScoreState(state).gameData;
export const getIsBoxScoreInitialized = state => getBoxScoreState(state).isBoxScoreInitialized;

export const BoxScoreState = (state = initialState, action) => {
  const res = {
    ...state,
  };

  console.log(action.type);

  switch (action.type) {
    case TEAM_SELECTED:
      res.team = action.value || initialState.team;
      break;
    case SEASON_SELECTED:
      if (action.value != null) {
        if (action.value === currentYear.year) {
          console.log('NOW');
          res.season = currentYear;
          res.quarter = currentQuarter;
          res.week = currentWeek;
        } else {
          res.season = seasons.filter(s => s.year === action.value)[0];
          res.quarter = res.season.quarters[res.season.quarters.length - 1];
          res.week = res.quarter.weeks[res.quarter.weeks.length - 1];
        }
        res.lineups = [];
        res.gameData = {};
      }
      break;
    case QUARTER_SELECTED:
      if (action.value != null) {
        //        console.log(action.value);
        res.quarter = res.season.quarters.filter(s => s.number === action.value)[0];
        res.week = res.quarter.weeks[res.quarter.weeks.length - 1];
        res.lineups = [];
        res.gameData = {};
      }
      break;
    case WEEK_SELECTED:
      if (action.value != null) {
        // todo: error handle if week not in quarter
        res.week = res.quarter.weeks.filter(s => s.number === action.value)[0];
        res.gameData = {};
      }
      break;
    case LINEUPS_LOADED:
      if (action.value != null) {
        res.lineups = action.value;
      }
      break;
    case GAMEDATA_LOADED:
      if (action.value != null) {
        res.gameData = action.value;
      }
      break;
    case BOXSCORE_INITIALIZED:
      res.isBoxScoreInitialized = true;
      break;
    default:
      break;
  }
  return res;
};
