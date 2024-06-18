import masks from "@/utils/masks";
import * as zod from "zod";
import { AddressValidator } from "./addressValidator";

export const ProfessionalSchema = AddressValidator.extend({
  id: zod.any().optional(),
  nome: zod.string().min(1, "Campo obrigatório"),
  cpfCnpj: zod
    .string()
    .optional()
    .transform((value) => value && masks.unmask(value)),
  rg: zod
    .string()
    .optional()
    .transform((value) => value && masks.unmask(value)),
    dtNascimento: zod.string(({ message: 'Campo obrigatório'})).or(zod.date({ message: 'Campo obrigatório'})),
  email: zod.string().optional(),
  celular: zod.string().transform((value) => value && masks.unmask(value)),
  sexo: zod
    .string({ message: "Campo obrigatório" })
    .min(1, "Campo obrigatório"),
  estCivil: zod.string().optional().nullable(),

  cro: zod.string().min(4, "CRO inválido").max(6, "CRO inválido"),
  especialidade: zod.any().optional(),
  formacoes: zod.string().optional().nullable(),
  certificacoes: zod.string().optional(),

  ativo: zod
    .boolean()
    .optional()
    .transform((value) => (!!value ? 1 : 0)),
  idCidade: zod.number().optional().nullable(),
});

export type ProfessionalFormSchema = zod.infer<typeof ProfessionalSchema>;

export const defaultValuesProfessional = {
  id: undefined,
  nome: "",
  cpfCnpj: "",
  rg: "",
  dtNascimento: undefined,
  email: "",
  celular: "",
  sexo: "",
  estCivil: "",

  cro: '',
  especialidade: '',
  formacoes: '',
  certificacoes: '',

  dtCadastro: "",
  dtUltAlt: "",
  idCidade: undefined,
  ativo: undefined,
};
