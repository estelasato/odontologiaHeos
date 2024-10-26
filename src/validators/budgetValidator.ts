import masks from "@/utils/masks";
import * as zod from "zod";
import { AccReceivableSchema } from "./accReceivableValidator";

export const BudgetTreatmSchema = zod.object({
  id: zod.any().optional().nullable(),
  total: zod.any().transform((value) => Number(masks.unmask(value))),
  idTratamento: zod.number({message: 'Campo obrigatório'}),
  descricao: zod.string().optional().nullable(),
  valor: zod.string().or(zod.number()).transform((value) => masks.unmask(`${value}`)).optional().nullable(),
  obs: zod.string().optional().nullable(),
  qtd: zod.coerce.number().optional().nullable(),
})

export const BudgetSchema = zod.object({
  id: zod.any().optional().nullable(),
  // idPaciente: zod.number(),
  idProfissional: zod.number({message: 'Campo obrigatório'}),
  idAnamnese: zod.number({message: 'Campo obrigatório'}),
  idCondPagamento: zod.number({message: 'Campo obrigatório'}),
  status: zod.string({message: 'Campo obrigatório'}),
  total: zod.any().transform((value) => Number(masks.number(value))),

  // desconto: zod.any().transform((value) => Number(masks.number(value))),

  // para insercao apenas
  idTratamento: zod.any().optional().nullable(),
  tratamento: zod.string().optional().nullable(),
  obs: zod.string().optional().nullable(),
  valor: zod.any().optional().nullable(),
  qtd: zod.any().optional().nullable(),
  subtotal: zod.any().optional().nullable(),

  tratamentos: zod.array(BudgetTreatmSchema).optional().nullable(),
  contasReceber: zod.array(AccReceivableSchema).optional().nullable(),
})

export type BudgetTreatmType = zod.infer<typeof BudgetTreatmSchema>
export type BudgetType = zod.infer<typeof BudgetSchema>
