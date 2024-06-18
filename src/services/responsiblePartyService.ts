import api from "@/config/api";
import { AddressType } from "@/validators/addressValidator";

export interface ResponsibleProps extends AddressType{
  id?: number
  nome: string
  cpf?: string
  rg?: string
  dtNascimento: Date
  email?: string
  celular: string
  sexo?: string
  estCivil?: string
  obs?: string
  profissao?: string
  ativo: number
  idCidade?: number
}


class ResponsibleService {
  async getAll() {
    const { data: response } = await api.get("responsible-party");
    return response;
  }

  async getById(id: number) {
    const { data: response } = await api.get(`responsible-party/${id}`);
    return response;
  }

  async update(id: number, data: any) {
    const { data: response } = await api.put(`responsible-party/${id}`, data);
    return response;
  }

  async create(data: ResponsibleProps) {
    const { data: response } = await api.post("responsible-party/", data);
    return response;
  }

  async delete(id: number) {
    return await api.delete(`/responsible-party/${id}`);
  }
}

export default new ResponsibleService();
