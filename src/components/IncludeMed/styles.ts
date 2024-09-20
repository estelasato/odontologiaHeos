import styled from "styled-components";
import { Container as BorderBox } from "@/components/AddressForm/styles";

export const Container = styled(BorderBox)`
  gap: 8px;

  .title {
    font-weight: 600;
    font-size: 1rem;
  }

  .icons-cont {
    max-width: 50px;
    display: flex;
    align-items: center;
    gap: 12px;
    justify-content: space-between;

    svg {
      cursor: pointer;
    }
  }
`;

export const ListCont = styled.div`
  display:flex;
  flex-direction: column;
  gap: 12px;
  width: 100%;
`;

export const Box = styled.div`
  display: flex;
  gap: 12px;
  flex-direction: column;
`;
