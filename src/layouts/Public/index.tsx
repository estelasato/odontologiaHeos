import { Outlet  } from 'react-router-dom';
// import logoIcon from '@assets/img/logo.png';
// import companyIcon from '../../assets/svg/razzo-icon.svg'

import { Container, Content, Card } from './styles';

export function PublicLayout() {
  return (
    <Container>
      {/* <BackgroundImage $source={bgLayout} /> */}
      <Content>
        {/* <img src={logoIcon} alt="" width="30%"/> */}

        <Card>
          <Outlet />
        </Card>
      </Content>
    </Container>
  );
}

