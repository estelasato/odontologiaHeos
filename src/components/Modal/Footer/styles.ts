import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  width: 100%;
  align-items: center;
  justify-content: space-between;

  @media (max-width: 500px) {
    flex-direction: column;
    /* align-items: flex-start; */
    gap: 12px;
  }
`;

export const Content = styled.div`
  display: flex;
  align-items: center;
  gap: 14px;
  text-align: center;

  @media (max-width: 500px) {
    /* justify-content: space-around; */
    & > .btn-cancel {
      padding: 0 10px;
    }
  }
`;
