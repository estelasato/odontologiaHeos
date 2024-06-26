import api from "../config/api";

export interface CityProps {
  idEstado?: number;
  id?: number;
  cidade?: string;
  ddd?: string;
  ativo?: any;
  dtCadastro?: any;
  dtUltAlt?: any;
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
    return await api.delete(`/city/${id}`);
  }
}

export default new CityServices();
