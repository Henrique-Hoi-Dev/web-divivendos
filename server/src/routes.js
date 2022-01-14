import { Router } from 'express';

import AccountController from './app/controller/AccountController';
import CardController from './app/controller/CardController';
import PortionController from './app/controller/PortionController';

const routes = new Router();

routes.post('/account', AccountController.storeAccount)
      .get('/accounts', AccountController.getAccountDetails)
      .put('/account/:id', AccountController.updateAccountId)
      .get('/account/:id', AccountController.getAccountDetailsId)
      .delete('/account/:id', AccountController.deleteAccountId);

routes.post('/portion/:account_id', PortionController.storePortion)
      .get('/portions/:account_id', PortionController.getPortionDetailsWithValeuAll)
      .put('/portion/:id', PortionController.updatePortionId)
      .get('/portion/:id', PortionController.getPortionDetailsId)
      .delete('/portion/:id', PortionController.deletePortionId);

routes.get('/infoCardOverdue', CardController.getCardOverdueDetails)
      .get('/infoCardOwing', CardController.getCardOwingDetails)
      .get('/infoCardPaid', CardController.getCardPaidDetails)
      .get('/infoCardTotal', CardController.getCardTotalDetails);

export default routes;
