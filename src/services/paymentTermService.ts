import api from "@/config/api";

export interface IInstallments {
  id?: number;
  numParcela: number;
  dias: number;
  perc: number;
  // percTotal: number;
  idFormaPag: number;
  idCondPag?: number;
}
export interface IPaymentTerm {
  id?: number;
  descricao: string;
  desconto?: number;
  juros?: number;
  multa?: number;
  status?: boolean  | number;
  parcelas?: IInstallments[];
  dtCadastro?: string;
  dtUltAlt?: string;
}
class paymentTermService {
  async create(data: IPaymentTerm) {
    await api.post("/payment-terms", data);
  }
  async update(id: number, data: IPaymentTerm) {
    await api.put(`/payment-terms/${id}`, data);
  }
  async getAll() {
    const { data } = await api.get("/payment-terms");
    return data;
  }
  async getById(id: number) {
    const { data } = await api.get(`/payment-terms/${id}`);
    return data;
  }
  async remove(id: number) {
    const { data } = await api.delete(`/payment-terms/${id}`);
    return data;
  }
}

export default new paymentTermService();
