import api from "@/config/api";

export interface TreatmentsProps{
  id?: number
  idPaciente?: number
  idProfissional: number
  dataFim?: Date | string
  dataInicio?: Date | string
  dente?: string
  descricao?: string
  dtCadastro?: string
  dtUltAlt?: string
}

interface TreatmentsFilter {
  idPaciente?: number;
}

class TreatmentsService {
  async getAll(filter?: TreatmentsFilter) {
    const { data: response } = await api.get("treatments", {params: filter});
    return response;
  }

  async getById(id: number) {
    const { data: response } = await api.get(`treatments/${id}`);
    return response;
  }

  async update(id: number, data: any) {
    const { data: response } = await api.put(`treatments/${id}`, data);
    return response;
  }

  async create(data: TreatmentsProps) {
    const { data: response } = await api.post("treatments/", data);
    return response;
  }

  async delete(id: number) {
    return await api.delete(`treatments/${id}`);
  }
}

export default new TreatmentsService();
