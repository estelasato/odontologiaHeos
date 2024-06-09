import { useForm } from "react-hook-form";

export const useEmployee = () => {
  const employeeForm = useForm();


  const defaultValues = {
    id: '',
    nome: '',
    cpf: '',
    rg: '',
    dtNascimento: '',
    email: '',
    celular: '',
    sexo: '',
    estCivil: '',

    cargo: '',
    salario: '',
    pis: '',
    dtAdmissao: '',
    dtDemissao: '',

    dtCadastro: '',
    dtUltAlt: '',
    idCidade: '',
    ativo: undefined,
  }

  const onSubmit = async (data?: any) => {

  }

  return {
    employeeForm,
    defaultValues,
  };
};
