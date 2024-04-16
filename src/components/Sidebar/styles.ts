import { MenuItemStyles } from "react-pro-sidebar";
import styled from "styled-components";

export const Container = styled.div`
  /* background-color: #F4F; */
  display: flex;

  .ps-sidebar-container {
    border-radius: 0 16px 16px 0;

  }
`;

export const TextItemMenu = styled.h4`
  color: ${({ theme }) => theme.colors.bg.main};
  font-weight: 500;
`;

export const ItemStyle = {
  color: '#fff',
  padding: 0,
  height: '55px',
  fontWeight: 500,
}

export const ItemRootStyle: MenuItemStyles = {
  button: {
    '&:hover': {
      backgroundColor: 'transparent',
    },
  }
}
