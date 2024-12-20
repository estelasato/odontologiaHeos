import * as zod from "zod";

export const countrySchema = zod.object({
  id: zod.coerce.number().optional(),
  ddi: zod.string().max(3, 'Máximo 3 caracteres').min(1, 'Campo obrigatório'),
  ativo: zod.coerce.boolean().optional().transform((value) => !!value ? 1 : 0),
  pais: zod.string().min(1,'Campo obrigatório'),
  sigla: zod.string().optional(),
});

export type CountryForm = zod.infer<typeof countrySchema>;

export const stateSchema = zod.object({
  id: zod.any().optional(),
  estado: zod.string().min(1,'Campo obrigatório'),
  uf: zod.string().min(1,'Campo obrigatório'),
  ativo: zod.coerce.boolean().optional().transform((value) => !!value ? 1 : 0),
  idPais: zod.coerce.number({ message: 'Campo obrigatório'}).min(1, 'Campo obrigatório'),
});

export type stateForm = zod.infer<typeof stateSchema>;

export const citySchema = zod.object({
  idEstado: zod.coerce.number({ message: 'Campo obrigatório'}).min(1, 'Campo obrigatório'),
  id: zod.any().optional(),
  cidade: zod.string().min(1,'Campo obrigatório'),
  ddd: zod.string(),
  ativo: zod.coerce.boolean().optional().transform((value) => !!value ? 1 : 0),
})

export type CityForm = zod.infer<typeof citySchema>;
