import api from "@/config/api";

export interface AnamnesisProps{
  id?: number
  obs?: string
  queixas?: string
  idPaciente: number
}

export interface AnamnesisFilter {
  idPaciente?: number;
  id?: number;
  dataInicio?: string;
  dataFim?: string;
}

class AnamnesisService {
  async getAll(params: AnamnesisFilter) {
    const { data: response } = await api.get("anamnesis", {params});
    return response;
  }

  async getById(id: number) {
    const { data: response } = await api.get(`anamnesis/${id}`);
    return response;
  }

  async update(id: number, data: any) {
    const { data: response } = await api.put(`anamnesis/${id}`, data);
    return response;
  }

  async create(data: AnamnesisProps) {
    const { data: response } = await api.post("anamnesis/", data);
    return response;
  }

  async delete(id: number) {
    return await api.delete(`anamnesis/${id}`);
  }
}

export default new AnamnesisService();
