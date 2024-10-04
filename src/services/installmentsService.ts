import api from "@/config/api";

export interface IInstallments {
  id?: number;
  numParcela: number;
  dias: number;
  perc: number;
  idFormaPag: number;
  idCondPag: number;
}

class InstallmentService {
  async getAll() {
    const { data } = await api.get("/installments");
    return data;
  }
  async getByPaymTerms(id: number) {
    const { data } = await api.get(`/installments/${id}`);
    return data;
  }
}

export default new InstallmentService();
