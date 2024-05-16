import { ComponentProps, forwardRef, useEffect } from "react";
import { Control, Controller, useFormContext } from "react-hook-form";

import { Checkbox as MuiCheckbox } from "@mui/material";
import { FormControlLabel } from "@mui/material";

import { Content } from "./styles";

interface CheckboxProps extends ComponentProps<"input"> {
  value?: string;
  label?: string;
  error?: any;
  control?: Control<any>;
  name: string;
  options: { label: any; value: any }[];
}

export const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(
  ({ defaultValue, control, name, label, value, options }) => {
    const { control: Control, setValue } = useFormContext();

    useEffect(() => {
      setValue(name, defaultValue);
    }, [defaultValue]);
    return (
      <div>
        <p className="label-input">{label}</p>
        <Controller
          name={name}
          control={control || Control}
          defaultValue={value}
          render={({ field }) => (
            <Content>
              {options.map((opt) => (
                <FormControlLabel
                  key={opt.value}
                  control={
                    <MuiCheckbox
                      defaultChecked={defaultValue == opt.value}
                      checked={field?.value == opt.value}
                      onChange={(e) => {
                        field.onChange(
                          e.target.checked ? opt.value : undefined
                        );
                      }}
                    />
                  }
                  label={opt.label}
                />
              ))}
            </Content>
          )}
        />
      </div>
    );
  }
);
