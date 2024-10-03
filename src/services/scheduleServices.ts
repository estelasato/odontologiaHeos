import api from "@/config/api";

export interface ScheduleProps {
  id?: number;
  idPaciente: number;
  idProfissional: number;
  horario: Date;
  duracao?: number;
  obs?: string;
  status?: number;
}

export interface returnSchedule extends ScheduleProps {
  nomePaciente: string;
  nomeProfissional: string;
}

export interface filterSchedProps{
  idPacientes?: string,
  idProfisisonais?: string;
  status?: string;
  dataInicial?: string;
  dataFinal?: string;
}

class ScheduleServices {

  async getAllSchedules(filter?: filterSchedProps) {
    const { data: response } = await api.get<returnSchedule[]>("schedule", { params: filter });
    return response;
  }

  async create(data: ScheduleProps) {
    const { data: response } = await api.post("schedule", data);
    return response;
  }

  async update(id: number, data: any) {
    const { data: response } = await api.put(`schedule/${id}`, data);
    return response;
  }

  async getById(id: number) {
    const { data: response } = await api.get(`schedule/${id}`);
    return response;
  }
}

export default new ScheduleServices();
