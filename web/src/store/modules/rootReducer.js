import { combineReducers } from 'redux';

import portion from './portion/reducer';
import account from './account/reducer';

export default combineReducers({ portion, account });
