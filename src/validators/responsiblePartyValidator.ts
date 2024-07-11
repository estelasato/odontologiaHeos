import masks from "@/utils/masks";
import { AddressValidator } from "./addressValidator";
import * as zod from "zod";
import { handleSearch } from "@/utils/shared/FilterList";
import { validarCPF } from "@/utils/validaDoc";

export const ResponsibleSchema = AddressValidator.extend({
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
    .min(8, "Campo obrigatório")
    .transform((value) => value && masks.unmask(value)),
  sexo: zod.string().optional().nullable(),
  estCivil: zod.string().optional().nullable(),
  profissao: zod.string().optional(),
  ativo: zod
    .boolean()
    .optional()
    .transform((value) => (!!value ? 1 : 0)),
  idCidade: zod.number().optional().nullable(),
  idResponsavel: zod.number().optional().nullable(),
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

export type ResponsibleFormSchema = zod.infer<typeof ResponsibleSchema>;

export const defaultValuesResponsible = {
  id: null,
  nome: "",
  cpf: null,
  rg: null,
  dtNascimento: undefined,
  email: "",
  celular: "",
  sexo: "",
  estCivil: "",
  profissao: "",
  dtCadastro: "",
  dtUltAlt: "",
  idCidade: undefined,
  idResponsavel: undefined,
  ativo: undefined,
};
