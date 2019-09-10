import { createStore, combineReducers, applyMiddleware } from 'redux';
// import { composeWithDevTools } from 'remote-redux-devtools';
import logger from 'redux-logger';
import createSagaMiddleware from 'redux-saga';
// import { all } from 'redux-saga/effects';
// import { combinedReducer, rootSaga } from '../containers';

const sagaMiddleware = createSagaMiddleware();

const initialState = {};

export const appState = (state = initialState /* , action */) => {
  const newState = {
    ...state,
  };
  return newState;
};

export const combinedReducer = combineReducers({
  appState,
  //  feedListState,
  //  feedState
});

const store = createStore(
  appState,
  //  combinedReducer,
  //  initialState,
  applyMiddleware(sagaMiddleware, logger),
  // composeWithDevTools(applyMiddleware(sagaMiddleware, logger)),
);

export default store;

/*
export function* rootSaga() {
  yield all([]); // [fork(feedListSaga), fork(feedSaga)];
}


sagaMiddleware.run(rootSaga);


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

/*
if (process.env.NODE_ENV === 'production') {
  module.exports = require('./redux.prod'); // eslint-disable-line global-require
} else {
  module.exports = require('./redux.dev'); // eslint-disable-line global-require
}
*/
