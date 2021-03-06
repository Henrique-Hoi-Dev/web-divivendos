import { takeLatest, call, all, put } from 'redux-saga/effects';
import { toast } from 'react-toastify';

import history from '~/services/history';
import api from '~/services/api';

import {
  getByIdPortionSuccess,
  getByIdPortionAllValueSuccess,
  UpdatePortionSuccess, 
  portionFailure
} from './actions';

export function* createPortion({ payload }) {
  try {
    yield call(api.post, `/portion/${payload.id}`, payload.values);

    toast.success('Parcela salva com sucesso.');
  } catch (err) {
    toast.error('Error salvar parcela.');
    yield put(portionFailure());
  }
}

export function* getByIdPortion({ payload }) {
  try {
    const response = yield call(api.get, `/portion/${payload.data}`);

    yield put(getByIdPortionSuccess(response.data));
  } catch (err) {
    toast.error('Error no encontrar parcela.');
    yield put(portionFailure());
  }
}

export function* getByIdPortionValueAll({ payload }) {
  try {
    const response = yield call(api.get, `/portions/${payload.data}`);

    yield put(getByIdPortionAllValueSuccess(response.data));
  } catch (err) {
    toast.error('Error no encontrar parcela.');
    yield put(portionFailure());
  }
}

export function* UpdatePortion({ payload }) {
  try {
    const response = yield call(api.put, `/portion/${payload.data.id}`, payload.data.values);

    yield put(UpdatePortionSuccess(response.data));
    toast.success('Editado com sucesso.');
    history.push('/')
  } catch (err) {
    toast.error('Error no editar parcela.');
    yield put(portionFailure());
  }
}

export default all([
  takeLatest('@portion/CREATE_PORTION_REQUEST', createPortion),
  takeLatest('@portion/GET_BYID_PORTION_ALL_VALUE_REQUEST', getByIdPortionValueAll),
  takeLatest('@portion/GET_BYID_PORTION_REQUEST', getByIdPortion),
  takeLatest('@portion/UPDATE_PORTION_REQUEST', UpdatePortion),
]);
