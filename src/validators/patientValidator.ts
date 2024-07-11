import masks from "@/utils/masks";
import { AddressValidator } from "./addressValidator";
import * as zod from "zod";
import { handleSearch } from "@/utils/shared/FilterList";
import { validarCPF } from "@/utils/validaDoc";

export const ResponsibleList = zod.object({
  id: zod.coerce.number(),
  nome: zod.string(),
  celular: zod.string().optional(),
  cpf: zod.string().optional(),
});

export const BasicList = zod.object({
  id: zod.coerce.number(),
  nome: zod.string(),
  descricao: zod.string().optional(),
});

export const PatientsSchema = AddressValidator.extend({
  id: zod.any().optional(),
  nome: zod.string().min(1, "Campo obrigatório"),
  cpf: zod
    .string()
    .optional()
    .nullable()
    .transform((value) => value && masks.unmask(value)),
  rg: zod
    .string()
    .optional()
    .nullable()
    .transform((value) => value && masks.unmask(value)),
  dtNascimento: zod
    .string({ message: "Campo obrigatório" })
    .or(zod.date({ message: "Campo obrigatório" })),
  email: zod.string().optional(),
  celular: zod
    .string()
    .optional()
    .transform((value) => value && masks.unmask(value)),
  sexo: zod
    .string({ message: "Campo obrigatório" })
    .min(1, "Campo obrigatório"),
  estCivil: zod.string().optional().nullable(),
  obs: zod.string().optional(),
  profissao: zod.string().optional(),
  indicacao: zod.string().optional(),
  ativo: zod
    .boolean()
    .optional()
    .transform((value) => (!!value ? 1 : 0)),
  idCidade: zod.number().optional().nullable(),
  idResponsavel: zod.number().optional().nullable(),

  responsaveis: ResponsibleList.array().optional().nullable(),
  habitos: BasicList.array().optional().nullable(),
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

export type PatientFormSchema = zod.infer<typeof PatientsSchema>;

export const defaultValuesPatient = {
  id: null,
  nome: "",
  cpf: null,
  rg: null,
  dtNascimento: undefined,
  email: "",
  celular: "",
  sexo: "",
  estCivil: "",
  obs: "",
  profissao: "",
  indicacao: "",
  dtCadastro: "",
  dtUltAlt: "",
  idCidade: undefined,
  idResponsavel: undefined,
  ativo: undefined,

  responsaveis: [],
  habitos: [],
};
