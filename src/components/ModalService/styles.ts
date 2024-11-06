import styled from "styled-components";


export const Container = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

export const BoxPayment = styled.div`
  display: flex;
  gap: 16px;
  width: 100%;
  justify-content: flex-start;
`;

export const Content = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;

  .select_status {
    width: 160px;
  }
`;
