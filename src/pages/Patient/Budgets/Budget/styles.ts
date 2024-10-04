import styled from "styled-components";

export const Container = styled.form`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

export const Content = styled.div`
  display: flex;
  /* justify-content: space-between; */
  align-items: center;
  gap: 16px;

  .insert-cont {
  }
`;

export const FormContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

export const InsertCont = styled.div`
  display: flex;
  gap: 10px;
  align-items: flex-end;
  width: 100%;
`;

export const Box = styled.div`
  display: flex;
  gap: 16px;
  width: 100%;
  justify-content: space-between;
  align-items: center;

  .select_status {
    min-width: 200px !important;
  }
`;

export const BoxPayment = styled.div`
  display: flex;
  gap: 16px;
  width: 100%;
  justify-content: flex-start;
`;
