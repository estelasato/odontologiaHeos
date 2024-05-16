import { Switch } from "antd";
import styled from "styled-components";

export const SwitchComp = styled(Switch)<{ $active?: boolean }>`
  outline: none !important;
  border-color: none !important;
  box-shadow: none !important;
  background: ${({ $active, theme }) =>
    $active ? theme.colors.green[200] : theme.colors.danger.light} !important;

  ::before {
    background-color: ${({ $active, theme }) =>
      $active ? theme.colors.green[900] : theme.colors.danger.deep} !important;
  }
`;

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
`;
