import api from "@/config/api";

export interface filterBudgtes {
  idPaciente?: number;
  idProfissional?: number;
  status?: string;
  dataInicial?: Date;
  dataFinal?: Date;
  idAnamnese?: number;
}

class budgetsService {
  async create() {

  }
  async getAll(params: filterBudgtes) {
    const {data} = await api.get('/budgets', {params})
    return data
  }


}

export default new budgetsService();
