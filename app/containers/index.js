import { combineReducers } from 'redux';
import { all } from 'redux-saga/effects';


/*
import {
  FeedListMenu,
  FeedListTable,
  feedListState,
  feedListSaga
} from './FeedList';
import Feed, { feedState, feedSaga } from './Feed';
*/
export default null;

// export { Feed, FeedListMenu, FeedListTable };


// reducers
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
//  feedListState,
//  feedState
});

export function* rootSaga() {
  yield all([]); // [fork(feedListSaga), fork(feedSaga)];
}
