import api from "@/config/api";

class paymentTermService {
  async getAll() {
    const { data } = await api.get("/payment-terms");
    return data;
  }
}

export default new paymentTermService();
