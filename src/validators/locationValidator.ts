import * as zod from "zod";

export const countrySchema = zod.object({
  id: zod.number().optional(),
  ddi: zod.string().optional(),
  ativo: zod.boolean().optional().transform((value) => !!value ? 1 : 0),
  pais: zod.string().min(1,'Campo obrigatório'),
  sigla: zod.string().optional(),
});

export type CountryForm = zod.infer<typeof countrySchema>;

export const stateSchema = zod.object({
  id: zod.any().optional(),
  estado: zod.string().min(1,'Campo obrigatório'),
  uf: zod.string().min(1,'Campo obrigatório'),
  ativo: zod.boolean().optional().transform((value) => !!value ? 1 : 0),
  idPais: zod.number().min(1, 'Campo obrigatório'),
});

export type stateForm = zod.infer<typeof stateSchema>;

export const citySchema = zod.object({
  idEstado: zod.number().min(1, 'Campo obrigatório'),
  id: zod.any().optional(),
  cidade: zod.string().min(1,'Campo obrigatório'),
  ddd: zod.string(),
  ativo: zod.boolean().optional().transform((value) => !!value ? 1 : 0),
})

export type CityForm = zod.infer<typeof citySchema>;
