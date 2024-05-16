import { Select } from "antd";
import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 3px;
  border: none;
  min-width: 200px;
`;

export const SelectComp = styled(Select)`
  height: auto !important;
  font-family: Inter;

  .ant-select-selector{
    border: 1px solid ${({ theme }) => theme.colors.border} !important;
    box-shadow: none !important;
    padding: 8px 16px !important;
    border-radius: 8px !important;
  }

  .ant-select-selection-item {
    line-height: 23px !important;
    font-size: 1rem !important;
  }

  .ant-select-selection-search {
    display: flex;
    align-self: center;
    height: 23px !important;
    line-height: 23px !important;
    input {
      height:  1.4375em !important;
      line-height: 1.5 !important;
    }
  }

  .ant-select-selection-placeholder{
    line-height: 23px !important;
  }

  .ant-select-selector:after{
    line-height: 23px !important;
  }

  svg {
    height: 8px;
    width: 12px;
    path {

  };}

`;
