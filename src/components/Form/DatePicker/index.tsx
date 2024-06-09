
import { useFormContext, Controller } from 'react-hook-form';

import { DatePicker as Calendar } from 'antd'
import { Container, Label } from './styles';
import { ErrorMessage } from '@/components/ErrorMessage';
import { ConfigProvider } from 'antd';
import ptBr from 'antd/lib/locale/pt_BR';

type DateProps = {
  label?: string;
  name: string;
  initialValue?: Date;
  error?: any;
  minDate?: any;
  defaultValue?: Date;
  className?: string;
};

export function DatePicker({
  label,
  name,
  error,
  minDate,
  className,
  defaultValue = new Date(),
}: DateProps) {
  const { control } = useFormContext();

  return (
    <Container>
      <Label>{label}</Label>
      <Controller
        control={control}
        name={name}
        defaultValue={defaultValue}
        render={({ field: { value, ...fieldProps } }) => {
          return (
            <ConfigProvider locale={ptBr}>
              <Calendar
                placeholder=""
                minDate={minDate}
                {...fieldProps}
                format="DD/MM/YYYY"
                // value={value ? new Date(value) : null}
                className="custom-datepicker-input"
              />

              {error && <ErrorMessage error={error} />}
            </ConfigProvider>
          );
        }}
      />
    </Container>
  );
}
