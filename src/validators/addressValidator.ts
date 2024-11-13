import masks from "@/utils/masks";
import * as zod from "zod";

export const AddressValidator = zod.object({
  cep: zod.string().min(1, 'Campo obrigatório').transform((value) => value && masks.unmask(value)),
  logradouro: zod.string().min(1, 'Campo obrigatório'),
  numero: zod.coerce.number().min(1, 'Campo obrigatório'),
  bairro: zod.string().min(1, 'Campo obrigatório'),
  complemento: zod.string().optional().nullable(),
  idCidade: zod.string().min(1, 'Campo obrigatório'),
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
