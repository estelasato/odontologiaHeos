import { FormContainer } from './styles';
import { Input } from '@/components/Form/Input';
import { Button } from '@/components/Button';
import { FormProvider } from 'react-hook-form';
import { useRegister } from './useRegister';

export function Register() {
  const {
    onSubmitForm,
    RegisterForm
    // isPending,
  } = useRegister();

  const {register, handleSubmit, formState: {errors}} = RegisterForm

  return (
    <FormProvider {...RegisterForm}>
      <label>Cadastre-se</label>
      <FormContainer onSubmit={handleSubmit(onSubmitForm)}>
        <div className="inputs-container">
          <Input
            {...register('nome')}
            label="Nome*"
            placeholder='Digite seu nome'
            error={errors.nome?.message}
          />
          <Input
            {...register('email')}
            label="E-mail*"
            placeholder='Digite seu e-mail'
            error={errors.email?.message}
          />

          <Input
            {...register('senha')}
            type="password"
            label="Senha*"
            placeholder='Insira sua senha'
            error={errors.senha?.message}
          />
        </div>

        <Button type="submit"
        //  isLoading={isPending}
         >Register</Button>
      </FormContainer>
    </FormProvider>
  );
}
