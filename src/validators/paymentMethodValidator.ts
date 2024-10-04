import * as zod from "zod";

export const paymentMethodSchema = zod.object({
  id: zod.any().optional().nullable(),
  descricao: zod.string().min(1, { message: 'Campo obrigatório' }),
  status: zod.any().optional(),
})

export type PaymMethodFormSchema = zod.infer<typeof paymentMethodSchema>

export const defaultValuesPaymentMethod = {
  id: undefined,
  descricao: '',
  desconto: undefined,
  status: true,
}
