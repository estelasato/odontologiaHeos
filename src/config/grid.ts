import styled from 'styled-components';

interface GridProps {
  $minWidth?: string,
  $maxWidth?: string,
  $columnGap?: string,
  $rowGap?: string,
  $template?: string,
  $alignItems?: string,
  $customMedia?: string,
  $templateMd?: string,
  $templateSm?: string,
}

export const Grid = styled.div<GridProps>`
  display: grid;
  width: 100%;
  row-gap: ${({ $rowGap }) => $rowGap || '12px'};
  column-gap: ${({ $columnGap }) => $columnGap || '12px'};
  grid-template-columns: ${({ $template, $minWidth, $maxWidth }) =>
    $template
      ? $template
      : `repeat(auto-fill, minmax(${$minWidth || '200px'}, ${$maxWidth || '1fr'}))`};

  @media(max-width: ${({ $customMedia }) => $customMedia || '800px'}) {
    grid-template-columns: ${({ $template, $templateMd }) => $template && ($templateMd || '1fr 1fr')};
  }

  @media(max-width: ${({ $customMedia }) => $customMedia || '520px'}) {
    grid-template-columns: ${({ $template, $templateSm }) => $template && ($templateSm || '1fr')};
  }
  align-items: ${({ $alignItems }) => $alignItems && $alignItems};
`;
