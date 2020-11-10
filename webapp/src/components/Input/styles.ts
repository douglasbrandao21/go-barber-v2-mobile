import styled, { css } from 'styled-components';

import Tooltip from '../Tooltip';

interface ContainerProps {
  isFocused: boolean;
  isFilled: boolean;
  isErrored: boolean;
}

export const Container = styled.div<ContainerProps>`
  background-color: #232129;
  border-radius: 8px;
  padding: 16px;
  width: 100%;
  transition: ease 0.3s;

  border: 2px solid #232129;
  color: #666360;

  display: flex;
  align-items: center;

  input:-webkit-autofill {
    -webkit-box-shadow: 0 0 0 30px #232129 inset;
    -webkit-text-fill-color: #FFF;
    font-family: Poppins;
  }

  @keyframes autofill {
    100% {
      background: transparent;
      color: inherit;
      font-size: inherit;
    }
  }

  @-webkit-keyframes autofill {
    100% {
      background: transparent;
      color: inherit;
      font-size: inherit;
    }
  }

  & + div {
    margin-top: 8px;
  }

  ${props =>
    props.isErrored && css`
      border-color: #c53030;
    `
  }

  ${props =>
    props.isFocused && css`
      color: #ff9000;
      border-color: #ff9000;
    `
  }

  ${props =>
    props.isFilled && css`
      color: #ff9000;
    `
  }

 input {
    max-width: 80%;
    background: transparent;
    border: 0;
    color: #f4ede8;

    &::placeholder {
      color: #666360;
    }
  }

  svg {
    margin-right: 8px;
  }
`;

export const Error = styled(Tooltip)`
  height: 20px;
  margin-left: 16px;

  svg {
    margin: 0;
  }

  span {
    background: #c53030;
    color: #FFF;

    &::before {
      border-color: #c53030 transparent;
    }
  }
`;
