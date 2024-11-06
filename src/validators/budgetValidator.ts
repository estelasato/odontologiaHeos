import masks from "@/utils/masks";
import * as zod from "zod";

export const BudgetProcedureSchema = zod.object({
  id: zod.any().optional().nullable(),
  total: zod.any().transform((value) => Number(masks.unmask(value))),
  idProcedimento: zod.number({message: 'Campo obrigatório'}),
  nome: zod.string().optional().nullable(),
  valor: zod.string().or(zod.number()).transform((value) => masks.unmask(`${value}`)).optional().nullable(),
  obs: zod.string().optional().nullable(),
  qtd: zod.coerce.number().optional().nullable(),
})

export const BudgetSchema = zod.object({
  id: zod.any().optional().nullable(),
  // idPaciente: zod.number(),
  idProfissional: zod.number({message: 'Campo obrigatório'}),
  percDesconto: zod.any().transform((d) => Number(d)).optional().nullable(),
  status: zod.string({message: 'Campo obrigatório'}),
  total: zod.any().transform((value) => Number(masks.number(value))),

  // desconto: zod.any().transform((value) => Number(masks.number(value))),

  // para insercao apenas
  idProcedimento: zod.any().optional().nullable(),
  procedimento: zod.string().optional().nullable(),
  obs: zod.string().optional().nullable(),
  valor: zod.any().optional().nullable(),
  qtd: zod.any().optional().nullable(),
  subtotal: zod.any().optional().nullable(),

  procedimentos: zod.array(BudgetProcedureSchema).optional().nullable(),
  // contasReceber: zod.array(AccReceivableSchema).optional().nullable(),
})

export type BudgetProcedureType = zod.infer<typeof BudgetProcedureSchema>
export type BudgetType = zod.infer<typeof BudgetSchema>
