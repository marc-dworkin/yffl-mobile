import teams from '../../../data/teams';

// actions
export const BOXSCORE_INITIALIZED = 'BOXSCORE_INITIALIZED';
export const SEASON_SELECTED = 'SEASON_SELECTED';
export const TEAM_SELECTED = 'TEAM_SELECTED';
export const QUARTER_SELECTED = 'QUARTER_SELECTED';
export const WEEK_SELECTED = 'WEEK_SELECTED';
export const LINEUPS_LOADED = 'LINEUP_LOADED';
export const LINEUPS_FAILED = 'LINEUP_FAILED';
export const GAMEDATA_LOADED = 'GAMEDATA_LOADED';
export const GAMEDATA_FAILED = 'GAMEDATA_FAILED';

export const boxScoreInitialized = () => ({
  type: BOXSCORE_INITIALIZED,
});

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
  value:
    value !== null
      ? teams.find(t => t.owner === value || t.name === value || t.number === parseInt(value, 10))
      : value,
});

export const weekSelected = value => ({
  type: WEEK_SELECTED,
  value: parseInt(value, 10),
});

export const lineupsLoaded = value => ({
  type: LINEUPS_LOADED,
  value,
});

export const lineupsFailed = value => ({
  type: LINEUPS_FAILED,
  value,
});

export const gameDataLoaded = value => ({
  type: GAMEDATA_LOADED,
  value,
});
export const gameDataFailed = value => ({
  type: GAMEDATA_FAILED,
  value,
});
// sagas
export const getBoxScoreState = state => state.BoxScoreState;
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
