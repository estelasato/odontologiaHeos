import * as zod from "zod";

export const ScheduleSchema = zod.object({
  id: zod.any().optional(),
  idPaciente: zod.coerce.number().int().positive(),
  idProfissional: zod.coerce.number().int().positive(),
  horario: zod
  .string({ message: "Campo obrigatório" })
  .or(zod.date({ message: "Campo obrigatório" })),
  duracao: zod.number().int().positive(),
  obs: zod.string().optional(),
  status: zod.string().optional(),

  paciente: zod.string().optional().nullable(),
  profissional: zod.string().optional().nullable(),
})

export type scheduleSchema = zod.infer<typeof ScheduleSchema>

export const defaultValuesSchedule = {
  id: undefined,
  idPaciente: '',
  idProfissional: '',
  horario: undefined,
  duracao: undefined,
  obs: '',
  status: 'AGENDADO',

  paciente: undefined,
  profissional: undefined,
}
