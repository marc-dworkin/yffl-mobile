import { composeWithDevTools } from 'remote-redux-devtools';
import logger from 'redux-logger';
import createSagaMiddleware from 'redux-saga';
// import { all } from 'redux-saga/effects';
import { createStore, combineReducers, applyMiddleware } from 'redux';
// import logger from 'redux-logger';

import { reducers } from '../containers';

const combinedReducer = combineReducers({
  ...reducers,
});

const sagaMiddleware = createSagaMiddleware();

/*
const sagaMiddleware = createSagaMiddleware();
const middleware = [sagaMiddleware];

if (process.env.NODE_ENV === 'doesnt seem useful') {
  // 'development') {
  //  middleware.push(logger);
}

const store = createStore(reducer, applyMiddleware(...middleware));

sagaMiddleware.run(rootQuarterPickerSaga);

export default store;
*/

const store = createStore(
  combinedReducer,
  //  initialState,
  composeWithDevTools(applyMiddleware(sagaMiddleware, logger)),
);

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

sagaMiddleware.run(rootSaga);

export default store;
