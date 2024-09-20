import styled from "styled-components";

export const Container = styled.div<{ $width?: string}>`
  display: flex;
  flex-direction: column;
  gap: 3px;
  font-size: 14px;
  max-width: ${({ $width }) => $width ? $width : '700px'};
  width: 100%;

  .ant-input {
    padding: 7px;
  }

  .label-input {
    font-size: 14px;
    color: ${({ theme }) => theme.colors.gray[400]}
  }
`;
