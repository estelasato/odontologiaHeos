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

  .label-input {
    /* font-weight: 500; */
  }
`;

export const InputStyle = styled(TextField)({

});

export const StyledInput = styled(TextField)(({}) => ({
  'label + &': {
    marginTop: '5px'
  },

  "& .MuiInputBase-root": {
      // border: '1px solid #E0E3E7',

    "& .MuiInput-input": {
      border: '1px solid #E0E3E7',
      height: '34px',
      borderRadius: 8,
      padding: '5px 16px'
    },
    "&::after": {
      display: "none",
    },
    "&::before": {
      display: "none",
    }
  }
  // "& .MuiInputBase-input": {
  //   borderRadius: 4,
  //   position: "relative",
  //   backgroundColor: "#F3F6F9",
  //   border: "1px solid",
  //   borderColor:  "#E0E3E7",
  //   fontSize: 16,
  //   width: "auto",
  //   padding: "10px 12px",

  //   // Use the system font instead of the default Roboto font.
  // },
}));
