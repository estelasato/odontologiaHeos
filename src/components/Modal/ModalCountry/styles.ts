import styled from "styled-components";


export const Container = styled.form<{ $isEdit?: boolean}>`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 16px;

  .buttons {
    justify-content: ${props => props.$isEdit ? 'space-between' : 'flex-end'};
  }

  .dates {
    justify-content: flex-start;
  }

`;

export const Content = styled.div`
  display: flex;
  align-items: center;
  gap: 9px;
`;

export const Box = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  width: 100%;
  justify-content: center;
`;
