import { takeLatest, call, all, put } from 'redux-saga/effects';
import { toast } from 'react-toastify';

import history from '~/services/history';
import api from '~/services/api2';

import {
  findAllAccountSuccess,
  getByIdAccountSuccess,
  accountFailure
} from './actions';

export function* createAccount({ payload }) {
  try {
    const result = yield call(api.post, '/account/new', payload.values);

    toast.success('Conta salva com sucesso.');
    history.push(`/registrePortion/${result.data.id}`)
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
    history.push(`/`)
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

export function* deletePortionTotal({ payload }) {
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

export function* deletePortionPaid({ payload }) {
  try {
    yield call(api.delete, `/portion/${payload.data}`);

    const response = yield call(api.get, '/paidAccount');

    yield put(findAllAccountSuccess(response.data));
    toast.success('Parcela deletada');
  } catch (err) {
    toast.error('Erro em excluir parcela');
    yield put(accountFailure());
  }
}

export function* deletePortionOverdue({ payload }) {
  try {
    yield call(api.delete, `/portion/${payload.data}`);

    const response = yield call(api.get, '/overdues');

    yield put(findAllAccountSuccess(response.data));
    toast.success('Parcela deletada');
  } catch (err) {
    toast.error('Erro em excluir parcela');
    yield put(accountFailure());
  }
}

export function* deletePortionPending({ payload }) {
  try {
    yield call(api.delete, `/portion/${payload.data}`);

    const response = yield call(api.get, '/pendingAccount');

    yield put(findAllAccountSuccess(response.data));
    toast.success('Parcela deletada');
  } catch (err) {
    toast.error('Erro em excluir parcela');
    yield put(accountFailure());
  }
}

export function* deletePortionCancel({ payload }) {
  try {
    yield call(api.delete, `/portion/${payload.data}`);

    const response = yield call(api.get, '/cancelAccount');

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
  takeLatest('@account/DELETE_PORTION_TOTAL_REQUEST', deletePortionTotal),
  takeLatest('@account/DELETE_PORTION_PAID_REQUEST', deletePortionPaid),
  takeLatest('@account/DELETE_PORTION_PENDING_REQUEST', deletePortionPending),
  takeLatest('@account/DELETE_PORTION_CANCEL_REQUEST', deletePortionCancel),
  takeLatest('@account/DELETE_PORTION_OVERDUE_REQUEST', deletePortionOverdue),
]);
