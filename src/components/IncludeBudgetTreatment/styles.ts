import { Container as ResponsibleBox } from "@/components/AddressForm/styles";
import styled from "styled-components";

export const Container = styled(ResponsibleBox)`
  hr {
    width: 100%;
    height: 1px;
  }

  .total-treatment-table, .qty-treatment-table  {
    input {
      text-align: right !important;
    }
  }

  @media (max-width: 800px) {
    .column-treatment-table{
      width: auto !important;
    }
    input {
      text-align: right !important;
      max-width: auto !important;
    }
    .total-treatment-table, .qty-treatment-table{
      width: auto !important;
      input {
        text-align: right !important;
        max-width: auto !important;
      }
    }
  }
`;

export const FooterTable = styled.div`
  width: 100%;
  display: flex;
  justify-content: flex-end;
  gap: 10px;
  padding-right: 12px;

  padding-right: 52px;
  input {
    text-align: end;
  }
`;

export const TableCont = styled.div`
  display: flex;
  width: 100%;
`;


export const Box = styled.div`
  display: flex;
  align-items: flex-end;
  gap: 12px;
`;
