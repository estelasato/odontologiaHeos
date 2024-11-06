import * as zod from "zod";

export const TreatmentsSchema = zod.object({
  id: zod.any().optional(),
  // obs: zod.string().optional(),
  queixas: zod.string().optional(),
  // idPaciente: zod.number(),
  idAnamnese: zod.number({message: 'Campo obrigatório'}).min(1, 'Campo obrigatório'),
  // dataInicio: zod.any().refine((val) => val !== undefined && val !== null, {
  //   message: 'Campo obrigatório',
  // }),
  dataInicio: zod.any(),
  dataFim: zod.any().optional(),
  descricao: zod.string().min(1, 'Campo obrigatório'),
  dente: zod.string().optional(),
  idProfissional:zod.number({message: 'Campo obrigatório'}).min(1, 'Campo obrigatório'),
})

export interface Treatmentsype {
  id: number
  idPaciente?: number
  idProfissional: number
  dataFim?: Date | string
  dataInicio?: Date | string
  dente?: string
  descricao?: string
  idAnamnese: number,

}

export type TreatmentsFormSchema = zod.infer<typeof TreatmentsSchema>;

export const TreatmentsDefaultValue = {
  id: undefined,
  idPaciente: undefined,
  idProfissional: undefined,
  dataFim: undefined,
  dataInicio: undefined,
  dente: '',
  descricao: '',
  idAnamnese: undefined,
}
