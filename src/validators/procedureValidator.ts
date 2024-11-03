import masks from "@/utils/masks";
import * as zod from "zod";

export const ProcedureSchema = zod.object({
  id: zod.any().optional(),
  nome: zod.string().min(1, 'Campo obrigatório'),
  valor: zod.any()
  .transform((value) => value && value.replace(',', '.'))
  .transform((value) => value && Number(masks.number(value))),
  descricao: zod.string().optional(),
  ativo: zod.boolean().optional().transform((value) => !!value ? 1 : 0),
})

export type ProcedureFormSchema = zod.infer<typeof ProcedureSchema>

export const defaultValuesProcedure = {
  id: undefined,
  nome: '',
  descricao: '',
  valor: undefined,
  ativo: true,
}
