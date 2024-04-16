import { Outlet } from "react-router-dom";
import { Container, Content } from "./styles";
import Sidebar from "../../components/Sidebar";


export function PrivateLayout() {

  return (
    <Container>
      <Sidebar />
      <Content>
        {<Outlet />}
      </Content>
    </Container>
  )
}
