import { all } from 'redux-saga/effects';

import account from './account/sagas';
import portion from './portion/sagas';

export default function* rootSaga() {
  return yield all([ account, portion, ]);
}
