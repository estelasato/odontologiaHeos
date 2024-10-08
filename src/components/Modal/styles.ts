// import { zoomIn } from "react-animations";
import styled, { keyframes } from "styled-components";

const fadeIn = keyframes`
  from { opacity: 0; }
  to { opacity: 1; }
`;

// const zoomInAnimation = keyframes`${zoomIn}`;

export const Container = styled.div`
  position: fixed;

  overflow-y: auto;

  animation: 200ms ${fadeIn};

  width: 100vw;
  height: 100vh;
  z-index: 999;
  top: 0;
  left: 0;
  background-color: #00000050;

  display: flex;
  align-items: center;
  justify-content: center;

  @media ${500} {
    padding: 15px;
  }
`;

/* animation: 300ms ${zoomInAnimation};  no Content*/
export const Content = styled.div<{ $width?: string }>`
  position: relative;
  width: 100%;
  background: #fff;
  border-radius: 20px;
  padding: 32px;
  box-shadow: 1px 6px 12px rgba(0, 0, 0, 0.1);

  max-width: ${({ $width }) => $width ? $width : '500px'};

  display: flex;
  flex-direction: column;
  gap: 16px;

  margin: auto;

  .close-icon {
    position: absolute;
    top: 16px;
    right: 16px;
    cursor: pointer;
    width: 25px;
    height: 25px;

  }
`;

export const Title = styled.p`
  color: ${({ theme }) => theme.colors.primary.main};
  font-size: 25px;
  font-style: normal;
  font-weight: 700;
  line-height: 32px;
  letter-spacing: 0.083px;
`;
