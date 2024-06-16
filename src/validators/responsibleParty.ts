import masks from "@/utils/masks";
import { AddressValidator } from "./addressValidator";
import * as zod from "zod";

export const ReponsiblePartySchema = AddressValidator.extend({
  id: zod.any().optional(),
  nome: zod.string().min(1, 'Campo obrigatório'),
  cpf: zod
  .string()
  .optional()
  .transform((value) => value && masks.unmask(value)),
  rg: zod.string().optional().transform((value) => value && masks.unmask(value)),
  dtNascimento: zod.coerce.date({message: 'Data inválida'}),
  email: zod.string().optional(),
  celular: zod
  .string()
  .transform((value) => value && masks.unmask(value)),
  sexo: zod.string({message: 'Campo obrigatório'}).optional(),
  estCivil: zod.string().optional().nullable(),
  obs: zod.string().optional(),
  profissao: zod.string().optional(),
  ativo: zod.boolean().optional().transform((value) => !!value ? 1 : 0),
  idCidade: zod.number().optional().nullable().optional(),
})

export type PatientFormSchema = zod.infer<typeof ReponsiblePartySchema>

export const defaultValuesReponsible = {
  id: undefined,
  nome: '',
  cpf: '',
  rg: '',
  dtNascimento: undefined,
  email: '',
  celular: '',
  sexo: '',
  estCivil: '',
  obs: '',

  dtCadastro: '',
  dtUltAlt: '',
  idCidade: undefined,
  ativo: undefined,
}
