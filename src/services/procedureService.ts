import api from "@/config/api";

export interface BasicProps {
  id?: number
  nome: string
  descricao?: string
  ativo: number
}

class ProcedureService {
  async getAll() {
    const { data: response } = await api.get('/procedures');
    return response;
  }

  async getById(id: number) {
    const { data: response } = await api.get(`/procedures/${id}`);
    return response;
  }

  async update(id: number, data: any) {
    const { data: response } = await api.put(`/procedures/${id}`, data);
    return response;
  }

  async create(data: IProcedure) {
    const { data: response } = await api.post('/procedures', data);
    return response;
  }

  async delete(id: number) {
    return await api.delete(`/procedures/${id}`);
  }
}

export default new ProcedureService();
