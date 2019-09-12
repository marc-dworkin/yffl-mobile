import { all } from 'redux-saga/effects';
import { QuarterPickerState } from './QuarterPicker';
import { TeamPickerState } from './TeamPicker';
import { BoxScoreNavigator, BoxScoreState } from './BoxScore';

export default null;

// TODO: What is this for?  url?
const BoxScoreNavigationState = (state, action) => {
  const newState = BoxScoreNavigator.router.getStateForAction(action, state);
  return newState || { ...state };
};

// reducers
export const reducers = {
  QuarterPickerState,
  TeamPickerState,
  BoxScoreState,
  BoxScoreNavigationState,
};

export function* rootSaga() {
  yield all([]); // [fork(feedListSaga), fork(feedSaga)];
}
