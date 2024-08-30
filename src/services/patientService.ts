import api from "@/config/api";
import { AddressType } from "@/validators/addressValidator";

export interface PatientProps extends AddressType{
  id?: number
  nome: string
  cpf?: string
  rg?: string
  dtNascimento: Date
  email?: string
  celular: string
  sexo: string
  estCivil?: string
  obs?: string
  profissao?: string
  indicacao?: string
  ativo: number
  idCidade?: number
}
class PatientService {
  async getAllPatients() {
    const { data: response } = await api.get("patient");
    return response;
  }

  async getPatientById(id: number) {
    const { data: response } = await api.get(`patient/${id}`);
    return response;
  }

  async updatePatient(id: number, data: any) {
    const { data: response } = await api.put(`patient/${id}`, data);
    return response;
  }

  async createPatient(data: PatientProps) {
    const { data: response } = await api.post("patient/", data);
    return response;
  }

  async deletePatient(id: number) {
    return await api.delete(`/patient/${id}`);
  }
}

export default new PatientService();
