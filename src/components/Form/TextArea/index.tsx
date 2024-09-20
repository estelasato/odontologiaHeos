import { ComponentProps, forwardRef } from "react";
import { Controller, useFormContext } from "react-hook-form";
import { Container } from "./styles";
import { Input } from "antd";

interface TextAreaProps extends ComponentProps<"textarea"> {
  label?: string;
  placeholder?: string;
  fullWidth?: boolean;
  required?: boolean;
  width?: string;
  rows?: number;
  name?: string;
  className?: string;
}

export const TextArea = forwardRef<HTMLTextAreaElement, TextAreaProps>(
  ({
    label,
    placeholder,
    fullWidth,
    required,
    width,
    rows,
    name,
    className,
    ...props
  }, ref ) => {
    const { control } = useFormContext();

    return (
      <Controller
        name={name || 'textarea'}
        {...props}
        control={control}
        render={({ field }) =>
          <Container $width={width} className={className}>
            <p className="label-input">{label}</p>
            <Input.TextArea
              rows={rows}
              {...field}
              ref={ref}
              size="middle"
            />
          </Container>
        }
      />
    )
  }
)
