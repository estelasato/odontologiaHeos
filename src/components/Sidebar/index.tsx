import { useMediaQuery } from "react-responsive";
import { Container, ItemRootStyle, ItemStyle, TextItemMenu } from "./styles";
import { Menu, MenuItem, Sidebar as SidebarCont } from "react-pro-sidebar";
import adminRoutes from "../../routes/admin.routes";
import { useState } from "react";
import { LuClock } from "react-icons/lu";
import { Link } from "react-router-dom";
export default function Sidebar() {
  const isMobileScreen = useMediaQuery({ maxWidth: 900 });
  const [isOpen, setIsOpen] = useState(true);

  return (
    <Container>
      {!isMobileScreen && (
        <SidebarCont
          rootStyles={{ borderRadius: "0 16px "}}
          backgroundColor={"#65000B"}
          collapsed={!isOpen}
          collapsedWidth="70px"
          width="240px"
        >
          <Menu
           menuItemStyles={ItemRootStyle}
            rootStyles={{
              padding: isOpen ?  "24px 16px" : "auto"
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
        </SidebarCont>
      )}
    </Container>
  );
}
