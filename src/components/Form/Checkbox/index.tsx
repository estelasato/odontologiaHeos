import { ComponentProps, forwardRef } from "react";

import { Checkbox as MuiCheckbox } from "@mui/material";
import { Control, Controller } from "react-hook-form";

import {  Content } from "./styles";
import { FormControlLabel } from "@mui/material";

interface CheckboxProps extends ComponentProps<"input"> {
  value?: string;
  label?: string;
  error?: any;
  control: Control<any>;
  name: string;
  options: { label: string; value: string }[];
}

export const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(
  ({ control, name, label, value, error, options, ...props }, ref) => {
    return (
      <div>
        <p className="label-input">{label}</p>
        <Controller
          name={name}
          control={control}
          defaultValue={value}
          render={({ field }) => (
            <Content>
              {options.map((opt) => (
                <FormControlLabel
                  key={opt.value}
                  control={
                    <MuiCheckbox
                      checked={field.value === opt.value}
                      onChange={(e) =>
                        field.onChange(e.target.checked ? opt.value : undefined)
                      }
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
