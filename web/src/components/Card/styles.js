import styled from 'styled-components';

export const Container = styled.div`
  margin-top: -80px;

  .card {
    display: flex;
    flex-direction: row;

    margin-left: 160px;
    margin-bottom: 25px;

    .total {
      background: #4d4c4c;
      padding: 6px;
      border-radius: 8px;
      margin-right: 9px;
      display: flex;
      flex-direction: column;
      min-width: 90px;

      label {
        font-weight: 700;
        color: grey;
      }
    }
    .pendente {
      background: #4d4c4c;
      padding: 6px;
      border-radius: 8px;
      margin-right: 9px;
      display: flex;
      flex-direction: column;
      min-width: 90px;

      label {
        font-weight: 700;
        color: red;
      }
    }
    .pago {
      background: #4d4c4c;
      padding: 6px;
      border-radius: 8px;
      margin-right: 9px;
      display: flex;
      flex-direction: column;
      min-width: 90px;

      label {
        font-weight: 700;
        color: green;
      }
    }
    .vencido {
      background: #4d4c4c;
      padding: 6px;
      border-radius: 8px;
      margin-right: 9px;
      display: flex;
      flex-direction: column;
      min-width: 90px;

      label {
        font-weight: 700;
      }
    }
  }
`;

