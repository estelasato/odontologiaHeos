import { ComponentProps, forwardRef, useEffect } from "react";
import { Controller, useFormContext } from "react-hook-form";

import { Container, SwitchComp } from "./styles";

interface SwitchTypes extends ComponentProps<any> {
  value?: boolean;
  name?: string;
  control?: any;
  handleChange?: (e: any) => void;
  label?: string;
  disabled?: boolean;
}

export const Switch = forwardRef<HTMLInputElement, SwitchTypes>(
  ({ disabled = false, label, handleChange, value = true, name, control, ...props }, ref) => {
    const method = useFormContext();

    useEffect(() => {
      console.log(value)
      method.setValue(name || "switch", value);
    }, [value]);

    return (
      <Controller
        {...(props as any)}
        ref={ref}
        name={name || "switch"}
        control={control || method.control}
        defaultValue={true}
        render={({ field }) => {
          return (
            <Container>
              <p className="label-input">{label}</p>
              <SwitchComp
                disabled={disabled}
                {...field}
                onChange={(e) => {
                  field.onChange(e);
                  handleChange && handleChange(e);
                }}
                $active={field.value == true || field.value == 1}
                defaultChecked={true}
              />
            </Container>
          );
        }}
      />
    );
  }
);
