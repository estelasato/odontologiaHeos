import masks from "@/utils/masks";
import * as zod from "zod";

export const BudgetTreatmSchema = zod.object({
  // id: zod.number().optional().nullable(),
  // idOrcamento: zod.number({message: 'Campo obrigatório'}),
  id: zod.number({message: 'Campo obrigatório'}),
  descricao: zod.string().optional().nullable(),
  valor: zod.string().transform((value) => masks.unmask(value)).optional().nullable(),
  obs: zod.string().optional().nullable(),
  qtd: zod.coerce.number().optional().nullable(),
})

export const BudgetSchema = zod.object({
  id: zod.string().optional().nullable(),
  // idPaciente: zod.number(),
  idProfissional: zod.number({message: 'Campo obrigatório'}),
  idAnamnese: zod.number({message: 'Campo obrigatório'}),
  idCondPagamento: zod.number({message: 'Campo obrigatório'}),
  status: zod.string({message: 'Campo obrigatório'}),
  total: zod.string({message: 'Campo obrigatório'}),

  tratamentos: zod.array(BudgetTreatmSchema).optional().nullable(),
})

export type BudgetTreatmType = zod.infer<typeof BudgetTreatmSchema>
export type BudgetType = zod.infer<typeof BudgetSchema>
