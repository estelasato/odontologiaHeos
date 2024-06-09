import * as zod from "zod";

export const EmployeeSchema = zod.object({
  id: zod.number().optional(),
  nome: zod.number().min(1,'Campo obrigatório'),
  cpf: zod.number().optional(),
  rg: zod.number().optional(),
  dtNascimento: zod.date().optional(),
  email: zod.string().optional(),
  celular: zod.string().optional(),
  sexo: zod.string().optional(),
  estCivil: zod.string().optional(),

  cargo: zod.string().optional(),
  salario: zod.number().optional(),
  pis: zod.number().optional(),
  dtAdmissao: zod.date().optional(),
  dtDemissao: zod.date().optional(),

  idCidade: zod.number().optional(),
  ativo: zod.boolean().optional().transform((value) => !!value ? 1 : 0),
})
