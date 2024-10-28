import {
  ChangeEvent,
  ComponentProps,
  forwardRef,
  useCallback,
  useEffect,
} from "react";
import { Control, Controller, useForm, useFormContext } from "react-hook-form";

import { ErrorMessage } from "@/components/ErrorMessage";
import masks, { MaskFunctions } from "../../../utils/masks";
import { Container, StyledInput } from "./styles";

interface InputProps extends ComponentProps<"input"> {
  value?: string;
  type?: string;
  mask?: keyof typeof masks;
  label?: string;
  placeholder?: string;
  fullWidth?: boolean;
  required?: boolean;
  width?: string;
  handleBlur?: (e?: any) => void;
  error?: any;
  disabled?: boolean;
  control?: Control<any>;
  handleChange?: (value: ChangeEvent<HTMLInputElement>) => void;
  isPassword?: boolean;
  variant?: "invisible";
  className?: string;
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
      required = false,
      handleBlur: customHandleBlur,
      handleChange,
      error,
      onBlur,
      disabled,
      isPassword = false,
      className,
      variant,
      ...props
    },
    ref
  ) => {
    // const isPasswordInput = type === "password";
    const { setValue, control: Control, getValues } = useFormContext() || useForm();

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

    useEffect(() => {
      if (name) {
        const defaultV = getValues(name);
        if (mask && name) {
          // console.log(masks[mask](`${value}`), "aa", defaultV);
          setValue(name, masks[mask](`${defaultV}`));
        }

      }
    }, [mask, name]);

    return (
      <Controller
        name={name || "name"}
        {...props}
        control={control || Control}
        render={({ field: { onChange, value } }) => (
          <Container
            className={className}
            $width={width}
            $disabled={disabled}
            $variant={variant}
          >
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
              value={mask ? masks[mask](`${value}`) : value || ""}
              InputProps={{ readOnly: disabled }}
              variant="standard"
              type={isPassword ? "password" : type}
              ref={ref}
            />
            {!!error && <ErrorMessage error={error} />}
          </Container>
        )}
      />
    );
  }
);
