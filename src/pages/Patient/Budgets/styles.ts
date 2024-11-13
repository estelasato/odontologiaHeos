import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  height: calc(100vh - 120px);
`;

export const BtnContent = styled.div`
  display: flex;
  justify-content: flex-end;

  .add-btn-budget {
    border: none;
  }
`;
