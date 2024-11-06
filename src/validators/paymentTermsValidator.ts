import * as zod from "zod";


export const installmentsSchema = zod.object({
  id: zod.any().optional().nullable(),
  idFormaPag: zod.number().min(1, { message: 'Campo obrigatório' }),
  numParcela: zod.string().min(1, { message: 'Campo obrigatório' }).transform((d) => Number(d)),
  dias: zod.string().min(1, { message: 'Campo obrigatório' }).transform((d) => Number(d)),
  perc: zod.string().min(1, { message: 'Campo obrigatório' }).transform((d) => Number(d)),
})

export const paymentTermsSchema = zod.object({
  id: zod.any().optional(),
  descricao: zod.string().min(1, { message: 'Campo obrigatório' }),
  desconto: zod.string().transform((d) => Number(d)).optional().nullable(),
  juros: zod.string().transform((d) => Number(d)).optional().nullable(),
  multa: zod.string().transform((d) => Number(d)).nullable(),
  status: zod.boolean().optional().transform((value) => !!value ? 1 : 0),

  idParcela: zod.coerce.number().optional(),
  numParcela:  zod.coerce.number().optional().nullable(),
  dias:  zod.coerce.number().optional().nullable(),
  perc:  zod.coerce.number().optional().nullable(),
  percTotal:  zod.coerce.number().optional().nullable(),
  idFormaPag:  zod.coerce.number().optional().nullable(),

  parcelas: zod.array(installmentsSchema).optional().nullable(),
})

export type PaymTermsFormSchema = zod.infer<typeof paymentTermsSchema>

export const defaultValuesPaymentTerms = {
  id: undefined,
  descricao: '',
  desconto: undefined,
  status: 1,
}
