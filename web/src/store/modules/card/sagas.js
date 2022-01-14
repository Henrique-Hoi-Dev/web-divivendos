import { takeLatest, call, all, put } from 'redux-saga/effects';
import { toast } from 'react-toastify';

import api from '~/services/api';

import { 
  findAllCardTotalSuccess,
  findAllCardPaidSuccess,
  findAllCardOwingSuccess,
  findAllCardOverdueSuccess,  
  cardFailure } from './actions';

export function* findAllTotalCard() {
  try {
    const response = yield call(api.get, '/infoCardTotal');

    yield put(findAllCardTotalSuccess(response.data));
  } catch (err) {
    toast.error('Error no encontra valor card.');
    yield put(cardFailure());
  }
}
export function* findAllPaidCard() {
  try {
    const response = yield call(api.get, '/infoCardPaid');

    yield put(findAllCardPaidSuccess(response.data));
  } catch (err) {
    toast.error('Error no encontra valor card.');
    yield put(cardFailure());
  }
}
export function* findAllOverdueCard() {
  try {
    const response = yield call(api.get, '/infoCardOverdue');

    yield put(findAllCardOverdueSuccess(response.data));
  } catch (err) {
    toast.error('Error no encontra valor card.');
    yield put(cardFailure());
  }
}
export function* findAllOwingCard() {
  try {
    const response = yield call(api.get, '/infoCardOwing');

    yield put(findAllCardOwingSuccess(response.data));
  } catch (err) {
    toast.error('Error no encontra valor card.');
    yield put(cardFailure());
  }
}

export default all([
  takeLatest('@card/FIND_ALL_CARD_TOTAL_REQUEST', findAllTotalCard),
  takeLatest('@card/FIND_ALL_CARD_PAID_REQUEST', findAllPaidCard),
  takeLatest('@card/FIND_ALL_CARD_OVERDUE_REQUEST', findAllOverdueCard),
  takeLatest('@card/FIND_ALL_CARD_OWING_REQUEST', findAllOwingCard),
]);
