import { forwardRef, useEffect } from "react";
import { DateTimePicker as TimeCalendar } from "@mui/x-date-pickers/DateTimePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { Controller, useFormContext } from "react-hook-form";
import { ptBR } from '@mui/x-date-pickers/locales';

interface DateProps {
  label?: string;
  name?: string;
  initialValue?: Date;
  error?: any;
  minDate?: any;
  defaultValue?: Date;
  className?: string;
  hasTime?: boolean;
  minTime?: any;
  maxTime?: any;
  maxDate?: any;
  handleChange?: (date: any) => void;
  disabled?: boolean;
}

export const DatetimePicker = forwardRef<HTMLInputElement, DateProps>(
  (
    {
      label,
      name,
      initialValue,
      error,
      minDate,
      defaultValue,
      className,
      hasTime,
      minTime,
      maxTime,
      maxDate,
      handleChange,
      disabled,
      ...props
    },
    ref
  ) => {
    const { control, setValue } = useFormContext();

    useEffect(() => {
      if (defaultValue && name) {
        setValue(name, new Date(defaultValue));
      }
    }, [defaultValue]);

    return (
      <div>
        <Controller
          control={control}
          {...props}
          name={name || 'datetimepicker'}
          render={() => {
            return (
              <LocalizationProvider dateAdapter={AdapterDayjs} localeText={ptBR.components.MuiLocalizationProvider.defaultProps.localeText}>
                <TimeCalendar
                  disablePast

                  // label={label}
                  // value={initialValue}
                  // onChange={handleChange}
                  // minTime={minTime}
                  // maxTime={maxTime}
                  // disabled={disabled}
                  {...props}
                />
              </LocalizationProvider>
            );
          }}
        />
      </div>
    );
  }
);
