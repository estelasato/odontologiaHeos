import { Container as ResponsibleBox } from "@/components/AddressForm/styles";
import styled from "styled-components";

export const ResponsibleCont = styled(ResponsibleBox)`
  .trash-icon {
    align-self: flex-end;
    padding-bottom: 5px;
    cursor: pointer;
  }
`;

export const ButtonContainer = styled.div`
  cursor: pointer;
  white-space: nowrap;
  display: flex;
  gap: 8px;
  padding-top: 4px;
  align-self: flex-start;
  & > button {
    font-weight: 400;
    height: 38px;
  }
`;

// compartilhado
export const Content = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;

  .open-icon {
    cursor: pointer;
  }
`;
