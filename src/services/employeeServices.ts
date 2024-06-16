import api from "@/config/api";
import { AddressType } from "@/validators/addressValidator";

export interface EmployeeProps extends AddressType{
  id?: number
  nome: string
  cpf?: string
  rg?: string
  dtNascimento: Date
  email?: string
  celular: string
  sexo: string
  estCivil?: string
  cargo: string
  salario: string
  pis: string
  dtAdmissao?: Date
  dtDemissao?: Date
  ativo: number
  idCidade?: number
}


class EmployeService {
  async getAllEmployees() {
    const { data: response } = await api.get("employee");
    return response;
  }

  async getEmployeeById(id: number) {
    const { data: response } = await api.get(`employee/${id}`);
    return response;
  }

  async updateEmployee(id: number, data: any) {
    const { data: response } = await api.put(`employee/${id}`, data);
    return response;
  }

  async createEmployee(data: EmployeeProps) {
    const { data: response } = await api.post("employee/", data);
    return response;
  }

  async deleteEmployee(id: number) {
    return await api.delete(`/employee/${id}`);
  }
}

export default new EmployeService();
