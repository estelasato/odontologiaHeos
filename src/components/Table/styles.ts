import styled, { css } from "styled-components";

type TdProps = {
  active?: boolean;
  handleOpenRow?: boolean;
};

export const TableGrid = styled.table`
  border-collapse: collapse;
  width: 100%;
  table-layout: auto;

  @media screen and (max-width: 800px) {
    min-width: 3-0px;
    thead tr {
      display: none;
    }
    tr {
      border-bottom: 1px solid ${({ theme }) => theme.colors.primary.main};
      display: block;
      margin-bottom: 0.25em;
    }
    td {
      border-bottom: 1px solid ${({ theme }) => theme.colors.gray[100]};
      display: block;
      font-size: 0.9em;
      text-align: right;
      height: 43px;
      width: 100%;
    }
    td::before {
      content: attr(accessKey);
      float: left;
      /* text-transform: uppercase; */
      font-weight: bold;
    }
  }
`;

export const Thead = styled.thead`
  border-bottom: 1px solid ${({ theme }) => theme.colors.primary.main}!important;
`;

export const Th = styled.th<{ align?: string }>`
  padding: 16px;
  /* font-size: 13px;
  font-weight: 400; */
  text-align: left;

  ${({ align }) => {
    if (align === "right")
      return css`
        display: flex;
        align-items: center;
        justify-content: right;
      `;
    if (align === "center")
      return css`
        display: flex;
        align-items: center;
        justify-content: center;
      `;
  }}

  cursor: auto;
`;


export const Tr = styled.tr` // hover na linha
  transition: all 0.3s ease;

  &:hover {
    cursor: pointer;
    /* background-color: ${({ theme }) => theme.colors.primary.main}; */
  }
`;

export const Td = styled.td<TdProps>`
  padding: 12px;
  white-space: pre-wrap;

  /* ${({ active }) => !active && `opacity: 0.4;`} */
  position: relative;

  ${({ align }) => {
    if (align === "right")
      return css`
        display: flex;
        align-items: center;
        justify-content: right;
      `;
    if (align === "center")
      return css`
        display: flex;
        align-items: center;
        justify-content: center;
      `;
  }}
`;

