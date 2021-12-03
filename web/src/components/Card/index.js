import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';

import { Container } from './styles';

import { 
  findAllCardTotalRequest,
  findAllCardPaidRequest,
  findAllCardOwingRequest,
  findAllCardOverdueRequest  } from '~/store/modules/card/actions';

export default function Card() {
  const dispatch = useDispatch();
  const { valorTotal, valorPaid, valorOverdue, valorOwing } = useSelector((state) => state.card);

  useEffect(() => {
    dispatch(findAllCardTotalRequest());
    dispatch(findAllCardPaidRequest());
    dispatch(findAllCardOwingRequest());
    dispatch(findAllCardOverdueRequest());
  }, [dispatch]);

  //formatção do preço do produto
  function currencyFormat(num) {
    if (num) {
      return (
        'R$' +
        parseFloat(num)
          .toFixed(2)
          .replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')
      );
    }
  }

  return (
    <Container>
      <div className="card">
        <div className="total">
          <label>Total</label>
          <span>{currencyFormat(valorTotal.totalContas)}</span>
        </div>
        <div className="pago">
          <label>Pago</label>
          <span>{currencyFormat(valorPaid.totalPagas)}</span>
        </div>
        <div className="pendente">
          <label>Devedor</label>
          <span>{currencyFormat(-valorOwing.totalPendente)}</span>
        </div>
        <div className="vencido">
          <label>Vencido</label>
          <span>{currencyFormat(valorOverdue)}</span>
        </div>
      </div>
    </Container>
  );
}
