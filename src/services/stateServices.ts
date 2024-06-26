import api from "../config/api";

export interface StateProps{
  idPais?: number;
  id?: number;
  estado?: string;
  uf?: string;
  ativo?: any;
  dtCadastro?: any;
  dtUltAlt?: any;
  pais?: {
    id?: string,
    pais: string,
  }
}

class StateServices {
  async getAllStates() {
    const { data: response } = await api.get("state");
    return response;
  }

  async getStateById(id: number) {
    const { data: response } = await api.get<StateProps>(`state/${id}`);
    return response;
  }

  async updateState(id: number, data: StateProps) {
    const { data: response } = await api.put(`state/${id}`, data);
    return response;
  }

  async createState(data: StateProps) {
    const { data: response } = await api.post("state/", data);
    return response;
  }

  async deleteState(id: number) {
    return await api.delete(`/state/${id}`);
  }
}

export default new StateServices();
