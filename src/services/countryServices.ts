import api from "../config/api";
import { CountryForm } from "../validators/locationValidator";

export interface CountryProps {
  id?: number;
  pais?: string;
  ddi?: string;
  sigla?: string;
  ativo?: any;
  dtCadastro?: any;
  dtUltAlt?: any;
}

class CountryService {
  async getAllCountries() {
    const { data: response } = await api.get("country");
    return response;
  }

  async getCountryById(id: number) {
    const { data: response } = await api.get(`country/${id}`);
    return response;
  }

  async updateCountry(id: number, data: CountryProps) {
    const { data: response } = await api.put(`country/${id}`, data);
    return response;
  }

  async createCountry(data: CountryForm) {
    const { data: response } = await api.post("country/", data);
    return response;
  }

  async deleteCountry(id: number) {
    return await api.delete(`/country/${id}`);
  }
}

export default new CountryService();
