import { createStore, combineReducers, applyMiddleware } from 'redux';
// import logger from 'redux-logger';
import createSagaMiddleware from 'redux-saga';

import { QuarterPickerState, rootQuarterPickerSaga } from '../containers/QuarterPicker';
import { TeamPickerState } from '../containers/TeamPicker';
import { BoxScoreNavigator, BoxScoreState } from '../containers/BoxScore';

// import Navigation from './routes';

const sagaMiddleware = createSagaMiddleware();

const NavigationState = (state, action) => {
  const newState = BoxScoreNavigator.router.getStateForAction(action, state);
  return newState || state;
};

const reducer = combineReducers({
  QuarterPickerState,
  TeamPickerState,
  NavigationState,
  BoxScoreState,
});

const middleware = [sagaMiddleware];

if (process.env.NODE_ENV === 'doesnt seem useful') {
  // 'development') {
  //  middleware.push(logger);
}

const store = createStore(reducer, applyMiddleware(...middleware));

sagaMiddleware.run(rootQuarterPickerSaga);

export default store;
