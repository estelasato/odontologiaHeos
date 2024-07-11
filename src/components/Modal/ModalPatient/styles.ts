import { Grid } from "@/config/grid";
import styled from "styled-components";

// compartilhado
export const Container = styled.form`
  	display: flex;
    flex-direction: column;
    gap: 14px;
    width: 100%;
    /* align-items: center; */

    .subtitleForm {
      color: ${({ theme }) => theme.colors.gray[400]};
      font-size: 1rem;
      font-weight: 500;
      align-self: flex-start;
    }
`;

export const Content = styled.div`
  display: flex;
  align-items: center;
  gap: 14px;
  width: 100%;
  align-self: flex-start;
`;

export const GridComp = styled(Grid)`
  /* @media (max-width: 900px){
    grid-template-columns: ${({ $template, $templateMd }) => $template && ($templateMd || '1fr 1fr 1fr')};
  }
  @media (max-width: 600px){
    grid-template-columns: ${({ $template, $templateMd }) => $template && ($templateMd || '1fr 1fr')};
  }
  @media (max-width: 350px){
    grid-template-columns: ${({ $template, $templateMd }) => $template && ($templateMd || '1fr')};
  } */
`;


