import masks from "@/utils/masks";
import { AddressValidator } from "./addressValidator";
import * as zod from "zod";

export const ResponsibleSchema = AddressValidator.extend({
  id: zod.any().optional(),
  nome: zod.string().min(1, 'Campo obrigatório'),
  cpf: zod
  .string()
  .optional()
  .transform((value) => value && masks.unmask(value)),
  rg: zod.string().optional().transform((value) => value && masks.unmask(value)),
  dtNascimento: zod.string(({ message: 'Campo obrigatório'})).or(zod.date({ message: 'Campo obrigatório'})),
  email: zod.string().optional(),
  celular: zod
  .string()
  .transform((value) => value && masks.unmask(value)),
  sexo: zod.string().optional().nullable(),
  estCivil: zod.string().optional().nullable(),
  profissao: zod.string().optional(),
  ativo: zod.boolean().optional().transform((value) => !!value ? 1 : 0),
  idCidade: zod.number().optional().nullable(),
  idResponsavel: zod.number().optional().nullable(),
})

export type ResponsibleFormSchema = zod.infer<typeof ResponsibleSchema>

export const defaultValuesResponsible = {
  id: null,
  nome: '',
  cpf: '',
  rg: '',
  dtNascimento: undefined,
  email: '',
  celular: '',
  sexo: '',
  estCivil: '',
  profissao: '',
  dtCadastro: '',
  dtUltAlt: '',
  idCidade: undefined,
  idResponsavel: undefined,
  ativo: undefined,
}
