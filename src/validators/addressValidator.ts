import masks from "@/utils/masks";
import * as zod from "zod";

export const AddressValidator = zod.object({
  cep: zod.string().optional().nullable().transform((value) => value && masks.unmask(value)),
  logradouro: zod.string().optional().nullable(),
  numero: zod.coerce.number().optional(),
  bairro: zod.string().optional().nullable(),
  complemento: zod.string().optional().nullable(),
  idCidade: zod.string().optional().nullable(),
  // nome puxado automático
  uf: zod.string().optional().nullable(),
  pais: zod.string().optional().nullable(),
})

export interface AddressType {
  cep?: string,
  logradouro?: string,
  bairro?: string,
  numero?: number,
  complemento?: string,
}

export type AddressDefaultValue = {
  cep?: undefined,
  logradouro?: undefined,
  bairro?: undefined,
  numero?: undefined,
  complemento?: undefined,
}
