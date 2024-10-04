import styled from "styled-components";

export const Container = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1rem;

  .button-component {
    max-width: 165px;
  }
`;

export const FormCont = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
  width: 100%;
  padding: 20px 20px 20px;
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: 8px;
`;
