import { AccReceivableType } from "@/validators/accReceivableValidator";
import api from "../config/api";

export interface IServiceProps {
  id?: number;
  valor: number;
  obs?: string;
  status?: string;
  idCondPagamento: number;
  idOrcamento: number;
  idPaciente?: number;
  dtCadastro?: any;
  dtUltAlt?: any;
  percDesconto?: number;
  contasReceber?: AccReceivableType[]
}

class SaleOfServiceServices {
  async getAll() {
    const { data: response } = await api.get("services");
    return response;
  }

  async getById(id: number) {
    const { data: response } = await api.get(`services/${id}`);
    return response;
  }

  async update(id: number, data: IServiceProps) {
    const { data: response } = await api.put(`services/${id}`, data);
    return response;
  }

  async create(data: IServiceProps) {
    const { data: response } = await api.post("services/", data);
    return response;
  }

  async delete(id: number) {
    return await api.delete(`/services/${id}`);
  }
}

export default new SaleOfServiceServices();
