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

  .react-datepicker__month-container {
    border-radius: 8px;
  }

  .react-datepicker__header {
    background-color: ${({ theme }) => theme.colors.bg.main};
    padding: 12px;
    border-top-right-radius: 8px;
    border-top-left-radius: 8px;
  }
  .react-datepicker__triangle {
    display: none;
  }
  .react-datepicker {
    border: none;
    border-radius: 8px;
    box-shadow: 1px 6px 12px rgba(0, 0, 0, 0.1);
  }
`;

export const Label = styled.p`
  font-size: 0.875rem;
  color: ${({ theme }) => theme.colors.gray[900]};
  margin-bottom: 2px;
`;
