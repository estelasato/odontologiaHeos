import masks from "@/utils/masks";
import * as z from "zod";

export const AccReceivableSchema = z.object({
  id: z.any().optional(),

  obs: z.string().optional().nullable(),
  parcela: z.number().optional().nullable(),
  desconto: z.number().optional().nullable(),
  multa: z.number().optional().nullable(),
  juros: z.number().optional().nullable(),
  valorParcela: z.string().or(z.number()).transform((value) => masks.unmask(`${value}`)).optional().nullable(),
  valorRecebido: z.string().or(z.number()).optional().nullable().transform((value) => masks.unmask(`${value}`)).optional().nullable(),
  situacao: z.string().optional().nullable(),

  dtVencimento: z.date({message: 'Campo obrigatório'}),
  dtRecebimento: z.date().optional().nullable(),
  dtCancelamento: z.date().optional().nullable(),
})

export type AccReceivableType = z.infer<typeof AccReceivableSchema>
