import api from "../config/api";

export interface CityProps{
  state_ID?: string;
  city_ID?: string;
  cidade?: string
  ddd?: string;
  ativo?: boolean;
  data_cadastro?: any;
  data_ult_alt?: any;
}

class CityServices {
  async getAllCities() {
    const { data: response } = await api.get("city");
    return response;
  }

  async getCityById(id: number) {
    const { data: response } = await api.get(`city/${id}`);
    return response;
  }

  async updateCity(id: number, data: CityProps) {
    const { data: response } = await api.put(`city/${id}`, data);
    return response;
  }

  async createCity(data: CityProps) {
    const { data: response } = await api.post("city/", data);
    return response;
  }

  async deleteCity(id: number) {
    return await api.delete(`/state/${id}`);
  }
}

export default new CityServices();
