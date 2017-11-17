// actions
export const WORKING_SEASON_SELECTED = 'WORKING_SEASON_SELECTED';
export const WORKING_QUARTER_SELECTED = 'WORKING_QUARTER_SELECTED';

export const QUARTER_SELECTED = 'QUARTER_SELECTED';

export const QUARTER_CHANGED = 'QUARTER_CHANGED';
export const WEEK_CHANGED = 'WEEK_CHANGED';

export const LINEUPS_LOADED = 'LINEUP_LOADED';
export const LINEUPS_FAILED = 'LINEUP_FAILED';
export const GAMEDATA_LOADED = 'GAMEDATA_LOADED';
export const GAMEDATA_FAILED = 'GAMEDATA_FAILED';

export const QUARTERPICKER_INITIALIZED = 'QUARTERPICKER_INITIALIZED';

export const quarterPickerInitialized = () => ({
  type: QUARTERPICKER_INITIALIZED,
});

export const quarterChanged = () => ({
  type: QUARTER_CHANGED,
});

export const workingSeasonSelected = value => ({
  type: WORKING_SEASON_SELECTED,
  value: parseInt(value, 10),
});

export const workingQuarterSelected = value => ({
  type: WORKING_QUARTER_SELECTED,
  value: parseInt(value, 10),
});

// don't need props as it works off working props
export const quarterSelected = () => ({
  type: QUARTER_SELECTED,
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
