import { Grid } from "@/config/grid";
import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
  align-items: center;
  justify-content: flex-start;
  width: 100%;
  padding: 20px 20px 20px;
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: 8px;

  .titleAddress {
    color: ${({ theme }) => theme.colors.gray[400]};
    font-size: 1rem;
    font-weight: 500;
    align-self: flex-start;
  }
`;

export const Content = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  gap: 12px;
`;

export const GridCont = styled(Grid)`
  @media(max-width: 950px) {
    grid-template-columns: ${({ $template, $templateMd }) => $template && ($templateMd || '1fr 1fr 1fr ')};
  }
  @media(max-width: 630px) {
    grid-template-columns: ${({ $template, $templateMd }) => $template && ($templateMd || '1fr 1fr')};
  }
  @media(max-width: 450px) {
    grid-template-columns: ${({ $template, $templateMd }) => $template && ($templateMd || '1fr')};
  }
`;

export const InfoCont = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
`;

export const Box = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  gap: 12px;
`;
