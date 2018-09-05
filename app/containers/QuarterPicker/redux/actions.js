// actions
export const WORKING_SEASON_SELECTED = 'WORKING_SEASON_SELECTED';
export const workingSeasonSelected = value => ({
  type: WORKING_SEASON_SELECTED,
  value: parseInt(value, 10),
});

export const WORKING_QUARTER_SELECTED = 'WORKING_QUARTER_SELECTED';
export const workingQuarterSelected = value => ({
  type: WORKING_QUARTER_SELECTED,
  value: parseInt(value, 10),
});

export const QUARTER_SELECTED = 'QUARTER_SELECTED';
// don't need action props as it gets value from  working props
export const quarterSelected = () => ({
  type: QUARTER_SELECTED,
});

export const QUARTER_DATA_REQUESTED = 'QUARTER_DATA_REQUESTED';
export const quarterDataRequested = () => ({
  type: QUARTER_DATA_REQUESTED,
});

export const LINEUPS_LOADED = 'LINEUP_LOADED';
export const lineupsLoaded = value => ({
  type: LINEUPS_LOADED,
  value,
});

export const GAME_DATA_FAILED = 'GAME_DATA_FAILED';
export const gameDataFailed = value => ({
  type: GAME_DATA_FAILED,
  value,
});

export const GAME_DATA_LOADED = 'GAME_DATA_LOADED';
export const gameDataLoaded = value => ({
  type: GAME_DATA_LOADED,
  value,
});

export const LINEUP_FAILED = 'LINEUP_FAILED';
export const lineupsFailed = value => ({
  type: LINEUP_FAILED,
  value,
});

export const QUARTERPICKER_INITIALIZED = 'QUARTERPICKER_INITIALIZED';
export const quarterPickerInitialized = () => ({
  type: QUARTERPICKER_INITIALIZED,
});

export const QUARTER_DATA_LOADING = 'QUARTER_DATA_LOADING';
export const quarterDataLoading = () => ({
  type: QUARTER_DATA_LOADING,
});

export const QUARTER_DATA_LOADED = 'QUARTER_DATA_LOADED';
export const quarterDataLoaded = () => ({
  type: QUARTER_DATA_LOADED,
});
