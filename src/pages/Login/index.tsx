import { useLogin } from './useLogin';
import { FormContainer } from './styles';
import { Input } from '@/components/Form/Input';
import { Button } from '@/components/Button';
import { FormProvider } from 'react-hook-form';

export function Login() {
  const {
    onSubmitForm,
    loginForm
    // isPending,
  } = useLogin();

  const {register, handleSubmit, formState: {errors}} = loginForm

  return (
    <FormProvider {...loginForm}>
      <label>Bem-vindo</label>
      <FormContainer onSubmit={handleSubmit(onSubmitForm)}>
        <div className="inputs-container">
          <Input
            {...register('email')}
            label="E-mail"
            placeholder='Digite seu e-mail cadastrado'
            error={errors.email?.message}
          />

          <Input
            {...register('senha')}
            type="password"
            label="Senha"
            placeholder='Insira sua senha'
            error={errors.senha?.message}
          />
        </div>

        <Button type="submit"
        //  isLoading={isPending}
         >Login</Button>
      </FormContainer>
    </FormProvider>
  );
}
