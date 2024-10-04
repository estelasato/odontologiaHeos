import api from "@/config/api";

export interface IPaymentMethod {
  id?: number;
  status?: number | boolean;
  descricao: string;
}
class paymentMethodsService {
  async getAll() {
    const { data } = await api.get("/payment-methods");
    return data;
  }
  async getById(id: number) {
    const { data } = await api.get(`/payment-methods/${id}`);
    return data;
  }
  async create(data: IPaymentMethod) {
    await api.post("/payment-methods", data);
  }
  async update(id: number, data: IPaymentMethod) {
    await api.put(`/payment-methods/${id}`, data);
  }
  async delete(id: number) {
    await api.delete(`/payment-methods/${id}`);
  }
}

export default new paymentMethodsService();
