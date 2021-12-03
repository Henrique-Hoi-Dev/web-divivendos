export function createAccountRequest(values) {
  return {
    type: '@account/CREATE_ACCOUNT_REQUEST',
    payload: { values },
  };
}

export function getByIdAccountRequest(data) {
  return {
    type: '@account/GET_BYID_ACCOUNT_REQUEST',
    payload: { data },
  };
}

export function getByIdAccountSuccess(data) {
  return {
    type: '@account/GET_BYID_ACCOUNT_SUCCESS',
    payload: { data },
  };
}

export function findAllAccountRequest(data) {
  return {
    type: '@account/FIND_ALL_ACCOUNT_REQUEST',
    payload: { data },
  };
}

export function findAllAccountSuccess(data) {
  return {
    type: '@account/FIND_ALL_ACCOUNT_SUCCESS',
    payload: { data },
  };
}

export function UpdateAccountRequest(data) {
  return {
    type: '@account/UPDATE_ACCOUNT_REQUEST',
    payload: { data },
  };
}

export function UpdateAccountSuccess(data) {
  return {
    type: '@account/UPDATE_ACCOUNT_SUCCESS',
    payload: { data },
  };
}

export function deleteAccountRequest(data) {
  return {
    type: '@account/DELETE_ACCOUNT_REQUEST',
    payload: { data },
  };
}

export function deletePortionTotalRequest(data) {
  return {
    type: '@account/DELETE_PORTION_TOTAL_REQUEST',
    payload: { data },
  };

}

export function deletePortionPaidRequest(data) {
  return {
    type: '@account/DELETE_PORTION_PAID_REQUEST',
    payload: { data },
  };
}

export function deletePortionOverdueRequest(data) {
  return {
    type: '@account/DELETE_PORTION_OVERDUE_REQUEST',
    payload: { data },
  };
}

export function deletePortionPendingRequest(data) {
  return {
    type: '@account/DELETE_PORTION_PENDING_REQUEST',
    payload: { data },
  };
}

export function deletePortionCancelRequest(data) {
  return {
    type: '@account/DELETE_PORTION_CANCEL_REQUEST',
    payload: { data },
  };
}

export function accountFailure() {
  return {
    type: '@account/ACCOUNT_FAILURE',
  };
}

export function resetFormulario() {
  return {
    type: '@account/RESET_FORM',
  };
}
