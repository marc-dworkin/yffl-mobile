// redux

// ..action
export const WEEK_SELECTED = 'WEEK_SELECTED';

export const weekSelected = value => ({
  type: WEEK_SELECTED,
  value: parseInt(value, 10),
});

// ..reducers

const initialState = {
  week: null,
};

export const getBoxScoreState = (state = initialState) => {
  // TODO: Figure out why not initialized properly
  if (state.BoxScoreState) {
    return state.BoxScoreState;
  }
  return state;
};

// TODO: access current quarter to get week object?
export const getWeekNumber = state => getBoxScoreState(state).weekNumber;

export const BoxScoreState = (state = initialState, action) => {
  const res = {
    ...state,
  };

  // console.log(action);

  switch (action.type) {
    case WEEK_SELECTED:
      res.weekNumber = action.value;
      break;
    default:
      break;
  }
  return res;
};
