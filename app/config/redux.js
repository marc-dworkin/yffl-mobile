import { createStore, combineReducers, applyMiddleware } from 'redux';
import logger from 'redux-logger';
// import { createSagaMiddleware, delay } from 'redux-saga';

import { BoxScoreState } from '../screens/BoxScore';
import { sampleState } from '../screens/Sample';

// console.log(BoxScoreState);
// console.log('Combining Reducers...');


/*
const sagaMiddleware = createSagaMiddleware(helloSaga);

function* helloSaga() {
  yield delay(1000);
  //  console.log('Hello Sagas!');
}
*/

const reducer = combineReducers({
  BoxScoreState, sampleState,
});


const middleware = [];

if (process.env.NODE_ENV === 'development') {
  middleware.push(logger);
}
const store = createStore(reducer,
  applyMiddleware(...middleware));
// sagaMiddleware.run(helloSaga);

export default store;
