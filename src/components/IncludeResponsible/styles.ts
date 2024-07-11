import {Container as ResponsibleBox } from "@/components/AddressForm/styles";
import styled from "styled-components";

export const ResponsibleCont = styled(ResponsibleBox)`

    .resp-btn {
      cursor: pointer;
      white-space: nowrap;
      display: flex;
      gap: 8px;
      align-self: flex-end;
      & > button {
        font-weight: 400;
        height: 38px;

      }
    }

    .trash-icon {
      align-self: flex-end;
      padding-bottom: 5px;
      cursor: pointer;
    }
`;

export const Content = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;

  .open-icon {
    cursor: pointer;
  }
`;
