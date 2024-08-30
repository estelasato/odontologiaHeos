import * as zod from "zod";

export const TreatmentsSchema = zod.object({
  id: zod.any().optional(),
  obs: zod.string().optional(),
  queixas: zod.string().optional(),
  idPaciente: zod.number(),
})

export interface Treatmentsype {
  id: number
  idPaciente?: number
  idProfissional: number
  dataFim?: Date | string
  dataInicio?: Date | string
  dente: string
  descricao?: string
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
}
