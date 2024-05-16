import { ComponentProps, forwardRef } from "react";
import { Controller, useFormContext } from "react-hook-form";

import { ErrorMessage } from "@/components/ErrorMessage";
import { Container, SelectComp } from "./styles";

export interface Option {
  value: any;
  label: any;
  isDefault?: boolean;
}

interface SelectProps extends ComponentProps<"select"> {
  label?: string;
  options?: Option[];
  name: string;
  fullWidth?: boolean;
  defaultValue?: string;
  isLoading?: boolean;
  placeholder?: string;
  control?: any;
  error?: any;
}

export const Select = forwardRef<HTMLInputElement, SelectProps>(
  (
    {
      label,
      options = [],
      name,
      error,
      defaultValue,
      isLoading,
      placeholder,
      control,
    }
  ) => {
    const { control: Control } = useFormContext();

    return (
      <Controller
        name={name || "select"}
        control={control || Control}
        render={({ field }) => (
          <Container>
            <p className="label-input">{label}</p>
            <SelectComp
              loading={isLoading}
              options={options}
              {...field}
              placeholder={placeholder}
              defaultValue={defaultValue}
            />
            {!!error && <ErrorMessage error={error} />}
          </Container>
        )}
      />
    );
  }
);
