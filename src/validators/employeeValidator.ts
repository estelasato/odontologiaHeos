import masks from "@/utils/masks";
import * as zod from "zod";
import { AddressValidator } from "./addressValidator";

export const EmployeeSchema = AddressValidator.extend({
  id: zod.coerce.number().optional().nullable(),
  nome: zod.string().min(1,'Campo obrigatório'),
  cpf: zod
  .string()
  .nullable()
  .transform((value) => value && masks.unmask(value)).nullable(),
  rg: zod.string().optional().nullable().transform((value) => value && masks.unmask(value)).nullable(),
  dtNascimento: zod.string(({ message: 'Campo obrigatório'})).or(zod.date({ message: 'Campo obrigatório'})),
  email: zod.string().optional(),
  celular: zod
  .string()
  .transform((value) => value && masks.unmask(value)),
  sexo: zod.string({message: 'Campo obrigatório'}).min(1, 'Campo obrigatório'),
  estCivil: zod.string().optional().nullable(),

  cargo: zod.string().min(1, 'Campo obrigatório'),
  salario: zod
  .coerce
  .string({ required_error: 'Campo obrigatório' })
  .min(1, 'Campo obrigaório')
  .transform((value) => value && masks.unmask(value))
  .transform((value) => value && masks.number(value))
  .refine((value) => !value || parseFloat(value) > 1, { message: 'Campo inválido' }),
  pis: zod
  .string()
  .min(11, 'Insira um PIS válido')
  .transform((value) => value && masks.unmask(value)).nullable(),
  dtAdmissao: zod.coerce.date().optional(),
  dtDemissao: zod.coerce.date().optional(),

  ativo: zod.boolean().optional().transform((value) => !!value ? 1 : 0),
  idCidade: zod.number().optional().nullable(),
})

export type EmployeeFormSchema = zod.infer<typeof EmployeeSchema>

export const defaultValuesEmployee = {
  id: undefined,
  nome: '',
  cpf: null,
  rg: null,
  dtNascimento: undefined,
  email: '',
  celular: '',
  sexo: '',
  estCivil: '',

  cargo: '',
  salario: '',
  pis: undefined,
  dtAdmissao: undefined,
  dtDemissao: undefined,

  dtCadastro: '',
  dtUltAlt: '',
  idCidade: undefined,
  ativo: undefined,
}

