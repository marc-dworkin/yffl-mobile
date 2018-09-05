import seasons, { currentYear, currentQuarter } from '../../../data/yfflSeasons';

import {
  WORKING_SEASON_SELECTED,
  WORKING_QUARTER_SELECTED,
  QUARTERPICKER_INITIALIZED,
  QUARTER_SELECTED,
  LINEUPS_LOADED,
  GAME_DATA_LOADED,
  QUARTER_DATA_LOADED,
  QUARTER_DATA_LOADING,
  GAME_DATA_FAILED,
} from './actions';

// assume first year is current
// TODO: make this work in off-season

export const initialState = {
  season: currentYear,
  quarter: currentQuarter,
  working: {
    season: currentYear,
    quarter: currentQuarter,
  },
  isQuarterPickerLoading: false,
  isQuarterPickerInitialized: false,
};

export const getQuarterPickerState = (state = initialState) => {
  // TODO: Figure out why not initialized properly
  if (state.QuarterPickerState) {
    return state.QuarterPickerState;
  }
  return state;
};

// internal week picker state
export const getQuarterPickerWorkingState = state => getQuarterPickerState(state).working;
export const getQuarterPickerWorkingSeason = state => getQuarterPickerWorkingState(state).season;
export const getQuarterPickerWorkingSeasonYear = state => getQuarterPickerWorkingSeason(state).year;
export const getQuarterPickerWorkingQuarter = state => getQuarterPickerWorkingState(state).quarter;

export const getQuarterPickerWorkingQuarterNumber = state => getQuarterPickerWorkingQuarter(state).number;

export const getQuarterPickerWorkingQuarterName = state => getQuarterPickerWorkingQuarter(state).name;

export const getQuarterPickerWorkingWeek = state => getQuarterPickerWorkingState(state).week;
export const getQuarterPickerWorkingWeekNumber = state => getQuarterPickerWorkingWeek(state).number;

// for other components
export const getSeason = (state) => {
  console.log(state || initialState);
  return getQuarterPickerState(state || initialState).season;
};

export const getSeasonYear = state => getSeason(state).year;
export const getQuarter = state => getQuarterPickerState(state).quarter;
export const getQuarterNumber = state => getQuarter(state).number;
export const getQuarterName = state => getQuarter(state).name;
export const getWeek = state => getQuarterPickerState(state).week;
export const getWeekNumber = state => getWeek(state).number;

export const getLineups = state => getQuarterPickerState(state).lineups;
export const getGameData = state => getQuarterPickerState(state).gameData;

export const getIsQuarterPickerLoading = state => getQuarterPickerState(state).isQuarterPickerLoading;

export const getIsQuarterPickerInitialized = state => getQuarterPickerState(state).isQuarterPickerInitialized;

export const QuarterPickerState = (state = initialState, action) => {
  const res = {
    ...state,
  };

  //  console.log(`action.type: ${action.type}`);
  //  console.log(`action.value: ${action.value}`);

  switch (action.type) {
    case QUARTER_SELECTED:
      res.season = res.working.season;
      res.quarter = res.working.quarter;
      // done in saga
      //      res.gameData = {};
      //      res.lineups = [];
      break;
    case LINEUPS_LOADED:
      if (action.value != null) {
        res.lineups = action.value;
      }
      break;
    case GAME_DATA_LOADED:
      if (action.value != null) {
        //        console.log(`GAME_DATA_LOADED: ${action.value.seasonYear} ${action.value.weekNumber}`);
        res.gameData = action.value;
      }
      break;
    case QUARTERPICKER_INITIALIZED:
      res.isQuarterPickerInitialized = true;
      break;
    case WORKING_SEASON_SELECTED:
      if (action.value != null) {
        const quarterNumber = action.value === currentYear.year && res.working.quarter.number > currentQuarter.number
          ? currentQuarter.number
          : res.working.quarter.number;

        res.working.season = { ...seasons.filter(s => s.year === action.value)[0] };
        // this doesn't always work because: https://github.com/facebook/react-native/issues/13351
        res.working.quarter = {
          ...res.working.season.quarters.filter(s => s.number === quarterNumber)[0],
        };
      }
      break;
    case WORKING_QUARTER_SELECTED:
      if (action.value != null) {
        res.working.quarter = {
          ...res.working.season.quarters.filter(s => s.number === action.value)[0],
        };
      }
      break;
    case QUARTER_DATA_LOADED:
      res.isQuarterPickerLoading = false;
      break;
    case QUARTER_DATA_LOADING:
      res.isQuarterPickerLoading = true;
      break;
    case GAME_DATA_FAILED:
      //      console.log(action);
      break;
    default:
      break;
  }
  return res;
};
