import { createStore, combineReducers, applyMiddleware } from 'redux';
import logger from 'redux-logger';
import createSagaMiddleware from 'redux-saga';

import { BoxScoreState, rootBoxScoreSaga } from '../screens/BoxScore';

const sagaMiddleware = createSagaMiddleware();

const reducer = combineReducers({
  BoxScoreState,
});

const middleware = [sagaMiddleware];

if (process.env.NODE_ENV === 'doesnt seem useful') {
  // 'development') {
  middleware.push(logger);
}

const store = createStore(reducer, applyMiddleware(...middleware));

sagaMiddleware.run(rootBoxScoreSaga);

export default store;
