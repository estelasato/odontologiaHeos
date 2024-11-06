import { forwardRef, useEffect } from "react";
import { useFormContext, Controller } from "react-hook-form";
import "react-datepicker/dist/react-datepicker.css";
import Calendar from "react-datepicker";
import { ptBR } from "date-fns/locale/pt-BR";

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
  maxDate?: any;
  handleChange?: (date: any) => void;
  disabled?: boolean;
}

export const DatePicker = forwardRef<HTMLInputElement, DateProps>(
  (
    {
      handleChange,
      label,
      name,
      error,
      minDate,
      className,
      defaultValue = undefined,
      hasTime = false,
      minTime,
      maxTime,
      maxDate,
      disabled,
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

    // Função para filtrar horários entre 08:00 e 18:00
    const filterPassedTime = (time: any) => {
      const selectedDate = new Date(time);
      const hours = selectedDate.getHours();

      // Permitir apenas horários entre 08:00 e 18:00
      return hours >= 8 && hours < 19;
    };
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
          render={({ field: { value, onChange, ...fieldProps } }) => {
            return (
              <>
                <Calendar
                  onChange={(date) => {
                    handleChange && handleChange(date);
                    onChange(date);
                  }}
                  minDate={minDate}
                  {...fieldProps}
                  disabled={disabled}
                  // minTime={minTime}
                  // maxTime={maxTime}
                  maxDate={maxDate}
                  ref={ref as any}
                  selected={value ? new Date(value) : undefined}
                  dateFormat={hasTime ? "dd/MM/yyyy HH:mm" : "dd/MM/yyyy"}
                  locale={ptBR as any}
                  className="custom-datepicker-input"
                  timeInputLabel="Horário:"
                  timeFormat="HH:mm"
                  timeIntervals={30}
                  showTimeSelect={hasTime}
                  filterTime={filterPassedTime}

                  // minTime={setMinutes(now, 0)}
                  // maxTime={setHours(setMinutes(now, 45), 23)}
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
