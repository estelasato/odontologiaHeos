import * as zod from "zod";

export const ScheduleSchema = zod.object({
  id: zod.any().optional(),
  idPaciente: zod.coerce.number({ message: "Campo obrigatório" }).min(1, 'Campo obrigatório'),
  idProfissional: zod.coerce.number({ message: "Campo obrigatório" }).min(1, 'Campo obrigatório'),
  horario: zod
  .string({ message: "Campo obrigatório" })
  .or(zod.date({ message: "Campo obrigatório" })),
  duracao: zod.number({ message: 'Campo obrigatório'}).min(1, 'Campo obrigatório').int().positive({message: 'Campo inválido'}),
  obs: zod.string().optional().nullable(),
  status: zod.string().optional().nullable(),

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
