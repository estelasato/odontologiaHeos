import styled from 'styled-components';
// import fadeIn from '../../styles/animations/fadeIn';

interface IBackgroundImage {
  $source?: string,
}

export const Container = styled.div`
  height: 100vh;
  display: flex;
  background-color: ${({ theme }) => theme.colors.primary.main};
  overflow: auto;
  justify-content: center;
`;

export const BackgroundImage = styled.div<IBackgroundImage>`
  background-image: url(${props => props.$source && props.$source});
  height: 100vh;
  width: 100%;
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;

  @media(max-width: 900px) {
    background-image: none;
  }
`;

export const Content = styled.div`
  min-width: 600px;
  max-width: 1000px;
  width: 100%;
  /* width: 50%; */
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  gap: 24px;
  padding-top: 80px;
  overflow: auto;
  background-color: ${({ theme }) => theme.colors.primary.main};

  /* @media(max-width: 900px) {
    position: absolute;
    background: ${({ theme }) => theme.colors.primary.main};

    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);

    width: 100%;
  } */
`;

export const Card = styled.div`
  min-width: 300px;
  margin-bottom: 20px;
  padding: 32px;
  width: 60%;

  display: flex;
  align-items: stretch;
  flex-direction: column;

  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0px 4px 10px 0px rgba(0, 0, 0, 0.06);

  > label:first-child {
    line-height: 1.3;
    font-size: 28px;
    font-weight: 700;
    text-align: center;
    margin-bottom: 20px;
    color: ${({ theme }) => theme.colors.title}
  }
`;
