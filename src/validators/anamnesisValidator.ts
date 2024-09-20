import * as zod from "zod";

export const IllnessAnamnesisSchema = zod.object({
  id: zod.number().optional(),
  idDoenca: zod.number({ required_error: 'Campo obrigatório'}).min(1, 'Campo obrigatório'),
  gravidade: zod.string(),
  obs: zod.string().optional(),
  cronica: zod.boolean().optional().nullable(),
  complicacoes: zod.string().optional(),
  tratamento: zod.string().optional(),
})
export const MedAnamnesisSchema = zod.object({
  id: zod.number().optional(),
  idMedicamento:  zod.number({ required_error: 'Campo obrigatório'}).min(1, 'Campo obrigatório'),
  dosagem: zod.string().optional().nullable(),
  frequencia: zod.string().optional().nullable(),
  motivo: zod.string().optional().nullable(),
  obs: zod.string().optional().nullable(),
})
export const AllergyAnamnesisSchema = zod.object({
  id: zod.number().optional(),
  idAlergia: zod.number().min(1, 'Campo obrigatório'),
  obs: zod.string().optional(),
  gravidade: zod.string().optional(),
  complicacoes: zod.string().optional(),
  tratamento: zod.string().optional(),
})
export const AnamnesisSchema = zod.object({
  id: zod.any().optional(),
  obs: zod.string().optional(),
  queixas: zod.string().optional(),
  idPaciente: zod.number(),

  doencas: zod.array(IllnessAnamnesisSchema).optional().nullable(),
  medicamentos: zod.array(MedAnamnesisSchema).optional().nullable(),
  alergias: zod.array(AllergyAnamnesisSchema).optional().nullable(),
})

export interface IllnessAnamnesisType {
  id?: number,
  idDoenca: number,
  gravidade: string,
  obs?: string,
  cronica?: boolean,
  complicacoes?: string,
  tratamento?: string,
}
export interface MedAnamnesisType {
  id?: number,
  idMedicamento: number,
  dosagem?: string,
  frequencia?: string,
  motivo?: string,
  obs?: string,
}
export interface AllergyAnamnesisType {
  id?: number,
  idAlergia: number,
  obs?: string,
  gravidade?: string,
  complicacoes?: string,
  tratamento?: string,
}

export interface AnamnesisType {
  id?: number,
  obs?: string,
  queixas?: string,
  idPaciente: number,

  doencas?: IllnessAnamnesisType[] | null,
  medicamentos?: MedAnamnesisType[] | null,
  alergias?: AllergyAnamnesisType[] | null,

}

export type AnamnesisFormSchema = zod.infer<typeof AnamnesisSchema>;

export const AnamnesisDefaultValue = {
  id: undefined,
  obs: '',
  queixas: '',
  idPaciente: undefined,
}

export const IllnessAnamnesisDefault = {
  id: undefined,
  idDoenca: undefined,
  gravidade: '',
  obs: '',
  cronica: false,
  complicacoes: '',
  tratamento: '',
}
export const MedAnamnesisDefault = {
  id: undefined,
  idMedicamento: undefined,
  dosagem: '',
  frequencia: '',
  motivo: '',
  obs: '',
}
export const AllergyAnamnesisDefault = {
  id: undefined,
  idAlergia: undefined,
  obs: '',
  gravidade: '',
  complicacoes: '',
  tratamento: '',
}
