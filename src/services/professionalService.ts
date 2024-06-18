import api from "@/config/api";
import { AddressType } from "@/validators/addressValidator";

export interface ProfessionalProps extends AddressType{
  id?: number
  nome: string
  cpf?: string
  rg?: string
  dtNascimento: Date
  email?: string
  celular: string
  sexo?: string
  estCivil?: string

  cro: string
  especialidade?: string
  formacoes?: string
  certificacoes?: string
  obs?: string

  ativo: number
  idCidade?: number
}


class ProfessionalService {
  async getAll() {
    const { data: response } = await api.get("professional");
    return response;
  }

  async getById(id: number) {
    const { data: response } = await api.get(`professional/${id}`);
    return response;
  }

  async update(id: number, data: any) {
    const { data: response } = await api.put(`professional/${id}`, data);
    return response;
  }

  async create(data: ProfessionalProps) {
    const { data: response } = await api.post("professional/", data);
    return response;
  }

  async delete(id: number) {
    return await api.delete(`/professional/${id}`);
  }
}

export default new ProfessionalService();
