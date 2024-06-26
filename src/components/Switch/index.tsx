import { ComponentProps, forwardRef } from "react";
import { Controller, useFormContext } from "react-hook-form";

import { Container, SwitchComp } from "./styles";

interface SwitchTypes extends ComponentProps<any> {
  value?: boolean;
  name?: string;
  control?: any;
  handleChange?: (e: any) => void;
  label?: string;
}

export const Switch = forwardRef<HTMLInputElement, SwitchTypes>(
  ({ label, handleChange, value = false, name, control, ...props }, ref) => {
    const method = useFormContext();

    return (
      <Controller
        {...(props as any)}
        ref={ref}
        name={name || "switch"}
        control={control || method.control}
        defaultValue={value}
        render={({ field }) => {
          return (
            <Container>
              <p className="label-input">{label}</p>
              <SwitchComp
                {...field}
                onChange={(e) => {
                  field.onChange(e);
                  handleChange && handleChange(e);
                }}
                $active={field.value === true}
                defaultChecked={value}
              />
            </Container>
          );
        }}
      />
    );
  }
);
