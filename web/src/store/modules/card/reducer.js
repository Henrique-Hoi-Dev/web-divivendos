import produce from 'immer';

const INITIAL_STATE = {
  valorTotal: {},
  valorPaid: {},
  valorOverdue: {},
  valorOwing: {},
};

export default function card(state = INITIAL_STATE, action) {
  return produce(state, (draft) => {
    switch (action.type) {
      case '@card/FIND_ALL_CARD_TOTAL_SUCCESS': {
        draft.valorTotal = action.payload.data;
        break;
      }
      case '@card/FIND_ALL_CARD_PAID_SUCCESS': {
        draft.valorPaid = action.payload.data;
        break;
      }
      case '@card/FIND_ALL_CARD_OVERDUE_SUCCESS': {
        draft.valorOverdue = action.payload.data;
        break;
      }
      case '@card/FIND_ALL_CARD_OWING_SUCCESS': {
        draft.valorOwing = action.payload.data;
        break;
      }
      default:
    }
  });
}
