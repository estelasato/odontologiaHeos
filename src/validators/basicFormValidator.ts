import * as zod from "zod";

export const BasicSchema = zod.object({
  id: zod.any().optional(),
  nome: zod.string().min(1, 'Campo obrigatório'),
  descricao: zod.string().optional(),
  ativo: zod.boolean().optional().transform((value) => !!value ? 1 : 0),
})

export type BasicFormSchema = zod.infer<typeof BasicSchema>

export const defaultValuesBasicForm = {
  id: undefined,
  nome: '',
  descricao: '',
  ativo: undefined,
}
