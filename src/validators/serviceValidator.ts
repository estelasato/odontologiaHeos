import masks from "@/utils/masks";
import * as zod from "zod";

export const ServiceSchema = zod.object({
  id: zod.any().optional(),
  idCondPagamento: zod.number({ message: 'Campo obrigatório'}),
  idOrcamento: zod.number(),
  status: zod.string().optional(),
  obs: zod.string().optional(),
  valor: zod.any().optional().transform((value) => Number(masks.number(value))),
  percDesconto: zod.any().optional().nullable().transform((value) => Number(masks.number(value))),
  contasReceber: zod.any().optional().nullable(),
})

export type ServiceFormSchema = zod.infer<typeof ServiceSchema>

export const defaultValuesService = {
  id: undefined,
  idCondPagamento: undefined,
  idOrcamento: undefined,
  status: undefined,
  obs: undefined,
  valor: undefined,
  percDesconto: undefined,
  contasRecerber: undefined,
}
