import { TextField } from "@mui/material";
import styled from "styled-components";

interface StyledProps {
  $width?: string;
  $fullWidth?: boolean;
}

export const Container = styled.div<StyledProps>`
  display: flex;
  flex-direction: column;
  gap: 3px;

  max-width: ${props => props.$fullWidth ? '100%' : '700px'};
  width: ${props => props.$width ? props.$width : '100%'};
`;

export const InputStyle = styled(TextField)({

});

export const StyledInput = styled(TextField)(({}) => ({
  'label + &': {
    marginTop: '5px'
  },

  "& .MuiInputBase-root": {
    "& .MuiInput-input": {
      border: '1px solid #E0E3E7',
      borderRadius: 8,
      padding: '8px 16px'
    },
    "&::after": {
      display: "none",
    },
    "&::before": {
      display: "none",
    }
  }
}));
