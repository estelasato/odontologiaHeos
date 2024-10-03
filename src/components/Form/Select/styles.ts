import { Select } from "antd";
import styled from "styled-components";

export const Container = styled.div<{ $width?: string, $minW?: string }>`
  display: flex;
  flex-direction: column;
  gap: 3px;
  border: none;
  max-width: ${({ $width }) => $width || "100%"};
  min-width: ${({ $minW }) => !$minW ? "auto" : $minW };
`;

export const SelectComp = styled(Select)`
  height: auto !important;
  font-family: Inter;

  .ant-select-selector{
    border: 1px solid ${({ theme }) => theme.colors.border} !important;
    box-shadow: none !important;
    padding: 8px 12px !important;
    border-radius: 8px !important;
  }

  .ant-select-selection-item {
    line-height: 20px !important;
    font-size: 14px !important;
  }

  .ant-select-selection-search {
    display: flex;
    align-self: center;
    height: 23px !important;
    line-height: 23px !important;
    input {
      /* height:  14px !important; */
      line-height: 20px !important;
    }
  }

  .ant-select-selection-placeholder{
    line-height: 20px !important;
  }

  .ant-select-selector:after{
    line-height: 20px !important;
  }

  svg {
    height: 12px;
    width: 12px;
  ;}

`;
