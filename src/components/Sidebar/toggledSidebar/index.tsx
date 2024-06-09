import { Menu, MenuItem, Sidebar } from "react-pro-sidebar";
import { Link } from "react-router-dom";

import adminRoutes from "@/routes/admin.routes";

import { ItemRootStyle, ItemStyle } from "../styles";

type toggledProps = {
  isOpen: boolean;
  // handleLogout: () => void;
  setIsOpen: (data: boolean) => void;
  // routes: RoutesProps[];
  // isAdmin: boolean;
};

export const ToggledSidebar = ({ isOpen, setIsOpen }: toggledProps) => {
  return (
    <Sidebar
      backgroundColor={"#65000b"}
      onBackdropClick={() => setIsOpen(false)}
      toggled={isOpen}
      breakPoint="all"
      collapsedWidth="70px"
      width="240px"
    >
      <Menu
        menuItemStyles={ItemRootStyle}
        rootStyles={{
          padding: isOpen ? "24px 16px" : "auto",
        }}
      >
        {adminRoutes.map((r) => {
          return (
            <MenuItem
              rootStyles={ItemStyle}
              key={r.name}
              title={r.name}
              icon={r?.icon}
              component={<Link to={r.route} />}
            >
              {r.name}
            </MenuItem>
          );
        })}
      </Menu>
    </Sidebar>
  );
};
