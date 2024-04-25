import api from "../config/api";

export interface CountryProps{
  pais_Id?: number;
  pais?: string;
  ddi?: string;
  sigla?: string;
  ativo?: boolean;
  data_cadastro?: any;
  data_ult_alt?: any;
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

  async createCountry(data: CountryProps) {
    const { data: response } = await api.post("country/", data);
    return response;
  }

  async deleteCountry(id: number) {
    return await api.delete(`/country/${id}`);
  }
}

export default new CountryService();
