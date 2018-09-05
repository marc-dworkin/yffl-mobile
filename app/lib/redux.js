import { put, call } from 'redux-saga/effects';

export default {};

const REQUESTED = 'REQUESTED';
const PROCESSING = 'PROCESSING';
const SUCCEEDED = 'SUCCEEDED';
const FAILED = 'FAILED';
const URL = 'URL';

export const createActionType = (base, url) => {
  const res = {};
  // eslint-disable-next-line
  [REQUESTED, PROCESSING, SUCCEEDED, FAILED].forEach(
    (type) => { (res[type] = `${base}_${type}`); },
  );
  res[URL] = url;
  return res;
};

export const createAction = (type, payload = {}) => ({ type, ...payload });

// TODO: Normalizr
const fetchAndParse = async (url) => {
  const result = {};
  try {
    const response = await fetch(url);
    result.json = await response.json();

    if (!response.ok) {
      result.error = result.json; // response.statusText?
      result.ok = false;
    } else {
      result.ok = true;
    }
    return result;
  } catch (e) {
    e.url = url;
    e.message = `${e.message} (url: ${url})`;
    throw e;
  }
};

export function* fetchAction(reqType, appendToUrl = '') {
  yield put(createAction(reqType.PROCESSING));

  try {
    const response = yield call(fetchAndParse, reqType.URL + appendToUrl);
    if (!response.ok) {
      yield put(createAction(reqType.FAILED, { response }));
    } else {
      // TODO: Normalizr?
      yield put(createAction(reqType.SUCCEEDED, { response }));
    }
  } catch (e) {
    const failedAction = createAction(reqType.FAILED, { message: e.message });
    yield put(failedAction);
  }
}
