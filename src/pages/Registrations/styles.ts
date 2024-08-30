import styled, { css } from "styled-components";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 32px;
`;

export const TabsCont = styled.div`
  display: flex;
  align-items: self-start;
  gap: 32px;
`;

export const LabelCont = styled.div<{
  $selected: boolean;
  $disabled?: boolean;
  $enable?: boolean;
}>`
  font-size: 14px;
  font-weight: 700;
  cursor: ${({ $enable }) => ($enable ? "pointer" : "not-allowed")};
  position: relative;

  color: ${({ $enable, theme }) => ($enable ? theme.colors.text : theme.colors.gray[100])};

  ${({ $selected, theme }) =>
    $selected === true &&
    css`
      color: ${theme.colors.primary.main };

      &::before {
        flex-shrink: 0;
        content: "";
        position: absolute;
        bottom: -8px;
        left: 50%;
        transform: translateX(-50%);
        width: 100%;
        height: 4px;
        background: ${theme.colors.primary.main};
        border-radius: 10px;
      }
    `}
`;
