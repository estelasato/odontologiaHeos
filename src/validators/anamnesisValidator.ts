import * as zod from "zod";

export const AnamnesisSchema = zod.object({
  id: zod.any().optional(),
  obs: zod.string().optional(),
  queixas: zod.string().optional(),
  idPaciente: zod.number(),
})

export interface AnamnesisType {
  id?: number,
  obs?: string
  queixas?: string
  idPaciente: number
}

export type AnamnesisFormSchema = zod.infer<typeof AnamnesisSchema>;

export const AnamnesisDefaultValue = {
  id: undefined,
  obs: '',
  queixas: '',
  idPaciente: undefined,
}
