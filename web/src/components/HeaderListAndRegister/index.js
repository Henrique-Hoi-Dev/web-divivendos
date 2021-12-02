import React from 'react';

import { PageHeader } from './styles';
import logo from '../../assets/logo-logo.png';

function HeaderListAndRegister(props) {
  return (
    <PageHeader>
      <div className="header-content">
        <img src={logo} alt="voltar" height="100px" />
        <h2>{props.title}</h2>
      </div>
    </PageHeader>
  );
}

export default HeaderListAndRegister;
