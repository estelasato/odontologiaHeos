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

  async update(data: any) {
    const { data: response } = await api.put(`schedule/${data.idProfissional}`, data);
    return response;
  }

  async getById(idProfissional: number, horario: any) {
    const { data: response } = await api.get(`schedule/${idProfissional}`, { params: { horario } });
    return response;
  }

  async remove(idProfisisonal: number, horario: Date | string) {
    console.log(idProfisisonal, horario);
    await api.delete(`schedule/${idProfisisonal}`, { params: { horario } });
  }
}

export default new ScheduleServices();
