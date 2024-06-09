import styled from 'styled-components';

export type InputStyledProps = {
  $width?: string,
}

export const SearchContainer = styled.div<InputStyledProps>`
    display: flex;
    max-width: ${({ $width }) => $width ? $width : '200px'};
    position: relative;
    width: 100%;

    .left-icon {
      position: absolute;
      padding: 10px;
    }
`;

export const SearchInput = styled.input<InputStyledProps>`
  border: none;
  flex: 1;
  margin: 0;
  font-size: 14px;

-webkit-appearance: none;
  max-width: ${props => props.$width ? props.$width : '100%'};
  height: 38px;
  width: 100%;
  padding: 0px 36px;
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: 8px;

  &:focus {
    border: 1px solid ${({ theme }) => theme.colors.primary.main};
  }

`;
