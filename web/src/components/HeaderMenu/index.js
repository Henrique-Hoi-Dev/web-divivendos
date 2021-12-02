import React from 'react'
import { Link } from 'react-router-dom';
import { Container, Header } from './styles';
import logo from '../../assets/bitcoin-preview.png'

export default function Home() {
  return (
    <Container>
      <img src={logo} alt="img" />
      <Header> 
        <Link to="/registreAccount">
          Registrar Nova Dívida
        </Link>               
      </Header>
    </Container>
  );
}
