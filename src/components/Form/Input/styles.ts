import { TextField } from "@mui/material";
import styled from "styled-components";

interface StyledProps {
  $width?: string;
  $fullWidth?: boolean;
  $disabled?: boolean;
}

export const Container = styled.div<StyledProps>`
  display: flex;
  flex-direction: column;
  gap: 3px;
  font-size: 14px;

  max-width: ${props => props.$fullWidth ? '100%' : '700px'};
  width: ${props => props.$width ? props.$width : '100%'};

  & > * {
    color: ${({ $disabled, theme }) => $disabled && theme.colors.border};
  }
`;

export const InputStyle = styled(TextField)({

});

export const StyledInput = styled(TextField)(({}) => ({
  'label + &': {
    marginTop: '5px'
  },

  "& .MuiInputBase-root": {
      fontSize: '14px',
    "& .MuiInput-input": {
      border: '1px solid #E0E3E7',
      borderRadius: 8,
      padding: '8px 12px'
    },
    "&::after": {
      display: "none",
    },
    "&::before": {
      display: "none",
    }
  }
}));
