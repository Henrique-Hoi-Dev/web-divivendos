import { combineReducers } from 'redux';

import portion from './portion/reducer';
import account from './account/reducer';
import card from './card/reducer';

export default combineReducers({ portion, account, card });
