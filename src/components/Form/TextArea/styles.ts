import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 3px;
  font-size: 14px;
  max-width: 700px;
  width: 100%;

  .label-input {
    font-size: 14px;
    color: ${({ theme }) => theme.colors.gray[400]}
  }
`;
