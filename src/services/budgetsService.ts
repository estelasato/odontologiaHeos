import api from "@/config/api";

export interface IBudgetProcedures {
  idProcedimento?: number;
  nome?: string;
  obs?: string;
  qtd: number;
  valor?: number;
  id: number;
}

export interface IBudget {
  id?: number,
  idPaciente?: number,
  idProfissional: number,
  idAnamnese: number,
  idCondPagamento: number,
  status: string,
  total: number,
  procedimentos: IBudgetProcedures[]
}
export interface filterBudgtes {
  idPaciente?: number;
  idProfissional?: number;
  status?: string;
  dataInicial?: Date;
  dataFinal?: Date;
  idAnamnese?: number;
}

class budgetsService {
  async create(params: IBudget) {
    const {data} = await api.post('/budgets', params )
    return data
  }
  async update(id:number, params: IBudget) {
    const {data} = await api.put(`/budgets/${id}`, params )
    return data
  }
  async getAll(params: filterBudgtes) {
    const {data} = await api.get('/budgets', {params})
    return data
  }
  async getById(id: number) {
    const {data} = await api.get(`/budgets/${id}`)
    return data
  }


}

export default new budgetsService();
