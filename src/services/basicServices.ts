import api from "@/config/api";

export interface BasicProps {
  id?: number
  nome: string
  descricao?: string
  ativo: number
}

class BasicService {
  async getAll(type: string) {
    const { data: response } = await api.get(`${type}`);
    return response;
  }

  async getById(type: string, id: number) {
    const { data: response } = await api.get(`${type}/${id}`);
    return response;
  }

  async update(type: string, id: number, data: any) {
    const { data: response } = await api.put(`${type}/${id}`, data);
    return response;
  }

  async create(type: string, data: BasicProps) {
    const { data: response } = await api.post(`${type}/`, data);
    return response;
  }

  async delete(type: string, id: number) {
    return await api.delete(`${type}/${id}`);
  }
}

export default new BasicService();
