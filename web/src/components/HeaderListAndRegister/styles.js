import styled from 'styled-components';

export const PageHeader = styled.div`
  display: flex;
  flex-direction: column;
  background-color: #8945de;

  .header-content {
    width: 90%;
    margin: 0 auto;
    position: relative;
    display: flex;
    flex-direction: row-reverse;
    justify-content: space-between;
    margin: 5.2rem auto;
    align-items: flex-end;
    margin: 5.2rem auto;

    h2 {
      font: 600 3.1rem Archivo;
      line-height: 4.2rem;
      color: #ffffff;
    }
  }
`;
