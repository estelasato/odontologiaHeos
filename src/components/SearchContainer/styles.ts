import styled from "styled-components";

export const Content = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;

  & > .button-component {
    width: 125px;
  }
`;


export const Container = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-between;
  align-items: center;
  padding: 14px 0 20px;

  .button-component {
    border: none;
  }

  @media (max-width: 550px) {
    flex-direction: column;
    gap: 10px;
    align-items: flex-start;

    .searchbar-comp {
      max-width: 100%;
    }
    .button-component {
      width: 100%;
    }

    ${Content} {
      width: 100%;
    }
  }
`;

export const AddButton = styled.div`
  padding-left: 0;
  /* font-weight: 400; */
  font-size: 14px;
`;

