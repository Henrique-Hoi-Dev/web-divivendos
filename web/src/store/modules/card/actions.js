export function findAllCardTotalRequest() {
  return {
    type: '@card/FIND_ALL_CARD_TOTAL_REQUEST',
    payload: {  },
  };
}

export function findAllCardTotalSuccess(data) {
  return {
    type: '@card/FIND_ALL_CARD_TOTAL_SUCCESS',
    payload: { data },
  };
}
export function findAllCardPaidRequest() {
  return {
    type: '@card/FIND_ALL_CARD_PAID_REQUEST',
    payload: {  },
  };
}
export function findAllCardPaidSuccess(data) {
  return {
    type: '@card/FIND_ALL_CARD_PAID_SUCCESS',
    payload: { data },
  };
}

export function findAllCardOwingRequest() {
  return {
    type: '@card/FIND_ALL_CARD_OWING_REQUEST',
    payload: {  },
  };
}
export function findAllCardOwingSuccess(data) {
  return {
    type: '@card/FIND_ALL_CARD_OWING_SUCCESS',
    payload: { data },
  };
}

export function findAllCardOverdueRequest() {
  return {
    type: '@card/FIND_ALL_CARD_OVERDUE_REQUEST',
    payload: {  },
  };
}
export function findAllCardOverdueSuccess(data) {
  return {
    type: '@card/FIND_ALL_CARD_OVERDUE_SUCCESS',
    payload: { data },
  };
}

export function cardFailure() {
  return {
    type: '@card/CARD_FAILURE',
  };
}