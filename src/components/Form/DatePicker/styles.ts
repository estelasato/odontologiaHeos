import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;

  :focus-within {
    box-shadow: 0 0 0 !important;
  };


  .custom-datepicker-input {
    height: 38px;
    padding: 0 12px;
    color: ${({ theme }) => theme.colors.gray[800]};
    border: 1px solid ${({ theme }) => theme.colors.border} !important;
    border-radius: 8px;
    width: 100%;
    font-size: 16px;
  }
`;

export const Label = styled.p`
  font-size: 0.875rem;
  color: ${({ theme }) => theme.colors.gray[900]};
  margin-bottom: 2px;
`;
