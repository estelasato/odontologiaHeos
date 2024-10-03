import styled, { css } from 'styled-components';

interface IButtonContainer {
  $isFullWidth: boolean,
  $isDisabled: boolean,
  $variant?: 'link' | 'secondary',
  $spaceLabel?: boolean,
}

export type VariantsType = {
  [key: string]: () => any;
};

export const Container = styled.button<IButtonContainer>`
  cursor: pointer;
  width: ${(props) => props.$isFullWidth && '100%'};
  font-size: 0.938rem;
  height: 38px;
  padding: 0 2rem;
  border: none;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center !important;

  color: #fff;
  font-weight: 700;

  transition: 0.2s ease all;
  -moz-transition: 0.2s ease all;
  -webkit-transition: 0.2s ease all;

  background-color: ${({ theme }) => theme.colors.primary.main};

  margin-top: ${(props) => props.$spaceLabel ? '21px' : '0'};

  #spinner {
    margin: 0 auto;
    color: #fff;
  }

  ${(props) => props.$isDisabled && css`
    pointer-events: none;
    opacity: 0.6;
  `};


  ${({ theme, $variant }) => {
    if ($variant === 'link') {
      return css`
        padding: 0 18px;
        background: transparent;
        /* border: 0; */
        color: ${theme.colors.primary.main};
        font-weight: 700;
        font-size: 1rem;
        border: 1px solid ${({ theme }) => theme.colors.primary.main};
      `;}
    }}

  ${({ $variant }) => {
    if ($variant === 'secondary') {
      return css`
        border-radius: 160px;
        height: 40px;
      `;}
    }}
`;
