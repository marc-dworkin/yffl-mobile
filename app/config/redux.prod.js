import { createStore, applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga';
import { combinedReducer, rootSaga } from '../containers';

// const configureStore = (history, initialState) => {
const sagaMiddleware = createSagaMiddleware();
const store = createStore(
  combinedReducer,
  // initialState,
  applyMiddleware(sagaMiddleware)
);

sagaMiddleware.run(rootSaga);

export default store;
