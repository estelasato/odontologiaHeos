import api from "@/config/api";

interface filterListAccReceivable {
  idPacientes?: number[],
  idProfissionais?: number[],
  dtVencimento?: Date,
  dtCancelamento?: Date,
  idFormaPag?: number,
  situacao?: number
}

class accReceivableService {
  async getAll(filter?: filterListAccReceivable) {
    const { data: response } = await api.get<accReceivableList[]>('/acc-receivable', { params: filter });
    return response
  }
}

export default new accReceivableService();
