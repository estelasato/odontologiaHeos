import masks from "@/utils/masks";
import * as zod from "zod";
import { AddressValidator } from "./addressValidator";
import { handleSearch } from "@/utils/shared/FilterList";
import { validarCPF } from "@/utils/validaDoc";

export const EmployeeSchema = AddressValidator.extend({
  id: zod.coerce.number().optional().nullable(),
  nome: zod.string().min(1,'Campo obrigatório'),
  cpf: zod
  .string()
  .min(11, { message: 'Campo obrigatório' })
  .transform((value) => value && masks.unmask(value))
  .refine((value) => {
    if (value && !validarCPF(value)) {
      return false;
    }
    return true;
  }, {
    message: "CPF inválido",
  }),
  rg: zod.string().optional().nullable().transform((value) => value && masks.unmask(value)).nullable(),
  dtNascimento: zod.string(({ message: 'Campo obrigatório'})).or(zod.date({ message: 'Campo obrigatório'})),
  email: zod.string().optional(),
  celular: zod
  .string()
  .min(9, { message: 'Campo obrigatório' })
  .transform((value) => value && masks.unmask(value)),
  sexo: zod.string({message: 'Campo obrigatório'}).min(1, 'Campo obrigatório'),
  estCivil: zod.string().optional().nullable(),

  cargo: zod.string().min(1, 'Campo obrigatório'),
  salario: zod.coerce
  .string({ required_error: 'Campo obrigatório' })
  .min(1, 'Campo obrigaório')
  .transform((value) => value && masks.unmask(value))
  .transform((value) => value && masks.number(value))
  .refine((value) => {
    if (!value) {
      return false;
    }
    return true;
  }, {
    message: 'Campo inválido'
  }),
  pis: zod
  .string()
  .min(11, 'Insira um PIS válido')
  .transform((value) => value && masks.unmask(value)).nullable(),
  dtAdmissao: zod.coerce.date({ message: 'Campo obrigatório', invalid_type_error: 'Data inválida', required_error: 'Campo obrigatório' }),
  dtDemissao: zod.coerce.date().optional().nullable(),

  ativo: zod.boolean().optional().transform((value) => !!value ? 1 : 0),
  idCidade: zod.number().optional().nullable(),
}).superRefine((data, ctx) => {
  if (data.idCidade) {
    if (handleSearch(data.pais) === handleSearch("Brasil")) {
      if (!data.cpf) {
        ctx.addIssue({
          code: zod.ZodIssueCode.custom,
          message: "Campo obrigatório",
          path: ["cpf"],
        });
      }
      if (data.cpf && !validarCPF(data.cpf)) {
        ctx.addIssue({
          code: zod.ZodIssueCode.custom,
          message: "CPF inválido",
          path: ["cpf"],
        });
      }
    }
  }
});

export type EmployeeFormSchema = zod.infer<typeof EmployeeSchema>

export const defaultValuesEmployee = {
  id: undefined,
  nome: '',
  cpf: undefined,
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

