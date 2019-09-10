import createSagaMiddleware from 'redux-saga';
import { createStore, combineReducers, applyMiddleware } from 'redux';

import { rootQuarterPickerSaga } from '../containers/QuarterPicker';
import { reducers } from '../containers';


const combinedReducer = combineReducers({
  ...reducers,
});

const sagaMiddleware = createSagaMiddleware();

const store = createStore(
  combinedReducer,
  // initialState,
  applyMiddleware(sagaMiddleware),
);

sagaMiddleware.run(rootQuarterPickerSaga);

export default store;
