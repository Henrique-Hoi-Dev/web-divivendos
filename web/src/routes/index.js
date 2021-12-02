import React from 'react';
import { Switch, Route } from 'react-router-dom';

import ListTodasAccounts from '~/pages/ListTodasAccounts';
import RegistrationAccount from '~/pages/RegistrationAccounts'
import RegistrationPortion from '~/pages/RegistrationAccounts/RegistrationPortion'

function RoutesApp() {
  return (
    <Switch>
      <Route  path="/" exact component={ListTodasAccounts} />
      <Route  path="/registreAccount" exact component={RegistrationAccount} />
      <Route  path="/registrePortion/:id" exact component={RegistrationPortion} />
      <Route  path="/account/:id" exact component={RegistrationAccount} />
      <Route  path="/portion/:id" exact component={RegistrationPortion} />
    </Switch>
  );
}

export default RoutesApp;
