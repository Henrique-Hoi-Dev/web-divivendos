import styled from 'styled-components';
import { darken } from 'polished';

export const Container = styled.div`
  position: absolute;
  z-index: 1;
  width: 100%;
  height: 5rem;

  background: #353535;
  box-sizing: border-box;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;

  img {
    height: 50px;
    width: 50px;
    
    margin-left: 20px;
  }
`;

export const Header = styled.div`
  display: flex;
  justify-content: flex-start;

  a {
    font: 700 1rem Archivo;
    margin-left: 30px;
    color: #9c98a6;
    text-decoration: none;

    &:hover {
        color: ${darken(0.03, '#9c98a6')};
        transform: scale(1.1);
        transition: all 0.5s;
      }
  }
`;
