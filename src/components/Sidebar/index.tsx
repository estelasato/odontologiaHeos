import { useEffect, useState } from "react";
import { useMediaQuery } from "react-responsive";
import { Link } from "react-router-dom";
import { Menu, MenuItem, Sidebar as SidebarCont } from "react-pro-sidebar";

import adminRoutes from "../../routes/admin.routes";
import { RxHamburgerMenu } from "react-icons/rx";
import { ButtonClose, Container, ItemRootStyle, ItemStyle } from "./styles";
import { ToggledSidebar } from "./toggledSidebar";

export default function Sidebar() {
  const isMobileScreen = useMediaQuery({ maxWidth: 900 });
  const [isOpen, setIsOpen] = useState(true);

  useEffect(() => {
    isMobileScreen ? setIsOpen(false) : setIsOpen(true);
  }, [isMobileScreen]);

  return (
    <Container>
      {isMobileScreen ? (
        <ToggledSidebar isOpen={isOpen} setIsOpen={setIsOpen} />
      ) : (
        <SidebarCont
          rootStyles={{ borderRadius: "0 16px " }}
          backgroundColor={"#65000B"}
          collapsed={!isOpen}
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
        </SidebarCont>
      )}
      {isMobileScreen && (
        <ButtonClose onClick={() => setIsOpen(!isOpen)}>
          <RxHamburgerMenu
            size={20}
            // color={"#65000B"}

          />
        </ButtonClose>
      )}
    </Container>
  );
}
