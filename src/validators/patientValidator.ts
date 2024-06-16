import masks from "@/utils/masks";
import { AddressValidator } from "./addressValidator";
import * as zod from "zod";

export const PatientsSchema = AddressValidator.extend({
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
  sexo: zod.string({message: 'Campo obrigatório'}).min(1, 'Campo obrigatório'),
  estCivil: zod.string().optional().nullable(),
  obs: zod.string().optional(),
  profissao: zod.string().optional(),

  ativo: zod.boolean().optional().transform((value) => !!value ? 1 : 0),
  idCidade: zod.number().optional().nullable(),
  idResponsavel: zod.number().optional().nullable(),
})

export type PatientFormSchema = zod.infer<typeof PatientsSchema>

export const defaultValuesPatient = {
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
  profissao: '',


  dtCadastro: '',
  dtUltAlt: '',
  idCidade: undefined,
  idResponsavel: undefined,
  ativo: undefined,
}
