import { createStore, applyMiddleware, combineReducers } from 'redux';
// import { composeWithDevTools } from 'remote-redux-devtools';
import logger from 'redux-logger';
import createSagaMiddleware from 'redux-saga';
// import { all } from 'redux-saga/effects';
// import { combinedReducer, rootSaga } from '../containers';


const sagaMiddleware = createSagaMiddleware();

const initialState = {
};

export const appState = (state = initialState/* , action */) => {
  const newState = {
    ...state,
  };
  return newState;
};


export const combinedReducer = combineReducers({
  appState,
});

const store = createStore(
  combinedReducer,
  //  initialState,
  applyMiddleware(sagaMiddleware, logger),
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
