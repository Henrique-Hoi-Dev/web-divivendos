import { takeLatest, call, all, put } from 'redux-saga/effects';
import { toast } from 'react-toastify';

import history from '~/services/history';
import api from '~/services/api';

import {
  findAllAccountSuccess,
  getByIdAccountSuccess,
  accountFailure
} from './actions';

export function* createAccount({ payload }) {
  try {
    const result = yield call(api.post, '/account', payload.values);

    toast.success('Conta salva com sucesso.');
    yield history.push(`/registrePortion/${result.data.responseData.id}`)
  } catch (err) {
    yield put(accountFailure());
    toast.error('Error salvar conta.');
  }
}

export function* findAllAccount() {
  try {
    const response = yield call(api.get, '/accounts');

    yield put(findAllAccountSuccess(response.data));
  } catch (err) {
    toast.error('Error searching account check data.');
    yield put(accountFailure());
  }
}

export function* getByIdAccount({ payload }) {
  try {
    const response = yield call(api.get, `/account/${payload.data}`);

    yield put(getByIdAccountSuccess(response.data));
  } catch (err) {
    toast.error('Error no encontra conta.');
    yield put(accountFailure());
  }
}

export function* UpdateAccount({ payload }) {
  try {

    yield call(api.put, `/account/${payload.data.account_id}`, payload.data.values);

    const response = yield call(api.get, `/accounts`);

    yield put(findAllAccountSuccess(response.data));
    toast.success('Editado com sucesso.');
    history.push('/')
  } catch (err) {
    toast.error('Error no editar conta.');
    yield put(accountFailure());
  }
}

export function* deleteAccount({ payload }) {
  try {
    yield call(api.delete, `/account/${payload.data}`);

    const response = yield call(api.get, '/accounts');

    yield put(findAllAccountSuccess(response.data));
    toast.success('Dívidendo deletado');
  } catch (err) {
    toast.error('Erro em excluir dívidendo');
    yield put(accountFailure());
  }
}

export function* deletePortion({ payload }) {
  try {
    yield call(api.delete, `/portion/${payload.data}`);

    const response = yield call(api.get, '/accounts');

    yield put(findAllAccountSuccess(response.data));
    toast.success('Parcela deletada');
  } catch (err) {
    toast.error('Erro em excluir parcela');
    yield put(accountFailure());
  }
}

export default all([
  takeLatest('@account/CREATE_ACCOUNT_REQUEST', createAccount),
  takeLatest('@account/FIND_ALL_ACCOUNT_REQUEST', findAllAccount),
  takeLatest('@account/GET_BYID_ACCOUNT_REQUEST', getByIdAccount),
  takeLatest('@account/UPDATE_ACCOUNT_REQUEST', UpdateAccount),
  takeLatest('@account/DELETE_ACCOUNT_REQUEST', deleteAccount),
  takeLatest('@account/DELETE_PORTION_REQUEST', deletePortion),
]);
