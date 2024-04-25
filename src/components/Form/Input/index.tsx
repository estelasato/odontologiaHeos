// import masks, { MaskFunctions } from "@utils/masks";
import {
  ChangeEvent,
  ComponentProps,
  forwardRef,
  useCallback,

} from "react";

import { Control, Controller, useForm } from "react-hook-form";
import masks, { MaskFunctions } from "../../../utils/masks";
import { Container, InputStyle, StyledInput } from "./styles";

interface InputProps extends ComponentProps<"input"> {
  value?: string;
  type?: string;
  mask?: keyof typeof masks;
  label?: string;
  placeholder?: string;
  fullWidth?: boolean;
  // variant?: "outlined" | "standard";
  required?: boolean;
  // autoComplete?: string;
  // leftIcon?: React.ReactNode;
  width?: string;
  handleBlur?: (e?: any) => void;
  error?: any;
  disabled?: boolean;
  control: Control<any>;
  handleChange?: (value: ChangeEvent<HTMLInputElement>) => void;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    {
      control,
      name,
      value,
      type = "text",
      mask,
      label,
      placeholder,
      fullWidth = true,
      width,
      // variant,
      required = false,
      // autoComplete = "off",
      // leftIcon,
      handleBlur: customHandleBlur,
      handleChange,
      error,
      onBlur,
      disabled,
      ...props
    },
    ref
  ) => {
    const isPasswordInput = type === "password";

    const { setValue } = useForm();

    const handleInputChange = useCallback(
      (e: ChangeEvent<HTMLInputElement>) => {
        if (handleChange) {
          handleChange(e.target.value as any);
        }

        if (mask) {
          const maskFunction: MaskFunctions[keyof MaskFunctions] = masks[mask];
          if (!maskFunction) throw new Error("Máscara não definida");

          const { value } = e.target;
          const maskedValue = maskFunction(value);
          setValue(name as string, maskedValue);
        }
      },
      [handleChange, mask, name, setValue]
    );

    const handleBlur = (e: any) => {
      onBlur && onBlur(e);
      if (customHandleBlur) customHandleBlur(e);
    };

    return (
      <Controller
        name={name || "name"}
        {...props}
        control={control}
        render={({ field: { onChange, value } }) => (
          <Container $width={width}>
            <p className="label-input">{label}</p>
            <StyledInput
              placeholder={placeholder}
              {...(props as any)}
              onChange={(e) => {
                onChange(e);
                handleInputChange(e as any);
              }}
              fullWidth={true}
              onBlur={handleBlur}
              value={value || ""}
              InputProps={{
                readOnly: disabled ,
              }}
              variant="standard"
              // type={isPasswordInput ? "password" : props.type}
              inputRef={ref}
            />
          </Container>
        )}
      />
    );
  }
);
