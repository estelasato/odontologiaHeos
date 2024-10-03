import { forwardRef, useEffect } from "react";
import { useFormContext, Controller } from "react-hook-form";
import "react-datepicker/dist/react-datepicker.css";
import Calendar from "react-datepicker";
import ptBR from "date-fns/locale/pt-BR";

import { ErrorMessage } from "@/components/ErrorMessage";
import { Container, Label } from "./styles";

interface DateProps {
  label?: string;
  name: string;
  initialValue?: Date;
  error?: any;
  minDate?: any;
  defaultValue?: Date;
  className?: string;
  hasTime?: boolean;
  minTime?: any;
  maxTime?: any;
}

export const DatePicker = forwardRef<HTMLInputElement, DateProps>(
  (
    {
      label,
      name,
      error,
      minDate,
      className,
      defaultValue = undefined,
      hasTime = false,
      minTime,
      maxTime,
      ...props
    },
    ref
  ) => {
    const { control, setValue } = useFormContext();

    useEffect(() => {
      if (defaultValue) {
        setValue(name, new Date(defaultValue));
      }
    }, [defaultValue]);

    return (
      <Container className={className}>
        <Label>{label}</Label>
        <Controller
          control={control}
          {...props}
          name={name}
          defaultValue={
            defaultValue ? new Date(defaultValue as any) : undefined
          }
          render={({ field: { value, ...fieldProps } }) => {
            return (
              <>
                <Calendar
                  minDate={minDate}
                  {...fieldProps}
                  minTime={minTime}
                  maxTime={maxTime}
                  ref={ref as any}
                  selected={value ? new Date(value) : undefined}
                  dateFormat={hasTime ? "dd/MM/yyyy HH:mm" : "dd/MM/yyyy"}
                  locale={ptBR as any}
                  className="custom-datepicker-input"
                  timeInputLabel="Horário:"
                  showTimeInput={hasTime}
                  timeFormat="HH:mm"
                  timeIntervals={15}
                />

                {error && <ErrorMessage error={error} />}
              </>
            );
          }}
        />
      </Container>
    );
  }
);
