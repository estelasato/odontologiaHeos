import { Link } from 'react-router-dom';
import styled from 'styled-components';

export const FormContainer = styled.form`
  display: flex;
  align-items: stretch;
  flex-direction: column;
  gap: 24px;

  .inputs-container {
    display: flex;
    flex-direction: column;
    row-gap: 16px;
  }

  .sb-row {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin: 16px 0 24px ;
    color: ${({ theme }) => theme.colors.primary.main}
  }

  > span {
    font-size: 0.75rem;
    margin-top: 16px;
    text-align: center;
  }
`;

export const PageLink = styled(Link)<{ $fontWeight?: number }>`
  font-size: 0.75rem;
  font-weight: ${(props) => props.$fontWeight || 400};
`;
