interface IUsuario {
  id: any;
  nome: string;
  email: string;
  ativo?: boolean | number;
  role?: stirng // admin, func, prof
}

interface ILoginOutput {
  token: string;
  usuario: IUsuario
}

interface IRegisterInput {
  nome: string
  email: string
  senha: string
  role?: string
  ativo:1
}
