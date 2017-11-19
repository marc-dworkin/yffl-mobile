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

export const QUARTER_CHANGED = 'QUARTER_CHANGED';
export const quarterChanged = () => ({
  type: QUARTER_CHANGED,
});

export const LINEUPS_LOADED = 'LINEUP_LOADED';
export const lineupsLoaded = value => ({
  type: LINEUPS_LOADED,
  value,
});

export const GAMEDATA_FAILED = 'GAMEDATA_FAILED';
export const gameDataFailed = value => ({
  type: GAMEDATA_FAILED,
  value,
});

export const GAMEDATA_LOADED = 'GAMEDATA_LOADED';
export const gameDataLoaded = value => ({
  type: GAMEDATA_LOADED,
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

export const QUARTERDATA_LOADING = 'QUARTERDATA_LOADING';
export const quarterDataLoading = () => ({
  type: QUARTERDATA_LOADING,
});

export const QUARTERDATA_LOADED = 'QUARTERDATA_LOADED';
export const quarterDataLoaded = () => ({
  type: QUARTERDATA_LOADED,
});
