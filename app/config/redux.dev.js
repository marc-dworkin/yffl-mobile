// eslint-disable-next-line import/no-extraneous-dependencies
import { composeWithDevTools } from 'remote-redux-devtools';
import logger from 'redux-logger';
import createSagaMiddleware from 'redux-saga';
// import { all } from 'redux-saga/effects';
import { createStore, combineReducers, applyMiddleware } from 'redux';
// import logger from 'redux-logger';

import ReactotronConfig from './ReactotronConfig';


import { rootQuarterPickerSaga } from '../containers/QuarterPicker';
import { reducers } from '../containers';

const combinedReducer = combineReducers({
  ...reducers,
});

// const sagaMiddleware = createSagaMiddleware();
const sagaMonitor = ReactotronConfig.createSagaMonitor();
const sagaMiddleware = createSagaMiddleware({ sagaMonitor });

const store = createStore(
  combinedReducer,
  //  initialState,
  // use reactotron, rather than logging
  //  composeWithDevTools(applyMiddleware(sagaMiddleware, logger), ReactotronConfig.createEnhancer()),
  composeWithDevTools(applyMiddleware(sagaMiddleware), ReactotronConfig.createEnhancer()),
);

sagaMiddleware.run(rootQuarterPickerSaga);

/*

export function* rootSaga() {
  yield all([]); // [fork(feedListSaga), fork(feedSaga)];
}


const store = createStore(
  combinedReducer,
  //  initialState,
  composeWithDevTools(applyMiddleware(sagaMiddleware, logger)),
);

/*
if (module.hot) {
  // Enable Webpack hot module replacement for reducers
  module.hot.accept('../modules/rootReducer', () => {
    // eslint-disable-next-line
    const nextRootReducer = require('../modules/rootReducer').default;
    store.replaceReducer(nextRootReducer);
  });
}
*/

export default store;
