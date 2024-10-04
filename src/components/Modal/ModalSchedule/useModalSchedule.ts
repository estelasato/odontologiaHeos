import patientService, { PatientProps } from "@/services/patientService";
import professionalService, {
  ProfessionalProps,
} from "@/services/professionalService";
import { useEffect, useMemo, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { modalRefProps } from "..";
import { format, addMinutes } from "date-fns";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import scheduleServices from "@/services/scheduleServices";
import { ScheduleSchema, scheduleSchema } from "@/validators/scheduleValidator";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "react-toastify";
import { useSchedule } from "@/pages/Schedule/useSchedule";

export const useModalSchedule = (
  isCreate = false,
  modalRef?: React.RefObject<modalRefProps>,
  values?: any
) => {
  const [patientData, setPatientData] = useState<PatientProps>();
  const [professionalData, setProfessionalData] = useState<ProfessionalProps>();

  const insertPatientRef = useRef<modalRefProps>(null);
  const insertProfessionalRef = useRef<modalRefProps>(null);
  const queryClient = useQueryClient();

  const scheduleForm = useForm<scheduleSchema>({
    resolver: zodResolver(ScheduleSchema),
  });
  const { setValue, reset } = scheduleForm;

  const { data: scheduleData } = useQuery({
    queryKey: ["scheduleData", values],
    queryFn: () => {
      return values?.id && scheduleServices.getById(values?.id);
    },
  });

  const { data: patientOpts } = useQuery({
    queryKey: ["patientOpts", values],
    queryFn: () => {
      return patientService.getAllPatients();
    },
    select: (data) => {
      if (data) {
        return data
          ?.filter((a: PatientProps) => a.ativo)
          .map((d: PatientProps) => ({ label: d.nome, value: d.id }));
      } else return [];
    },
  });

  const { data: professionalOpts } = useQuery({
    queryKey: ["professionalOpts", values],
    queryFn: () => {
      return professionalService.getAll();
    },
    select: (data) => {
      if (data) {
        return data
          ?.filter((a: ProfessionalProps) => a.ativo)
          .map((d: ProfessionalProps) => ({ label: d.nome, value: d.id }));
      } else return [];
    },
  });

  useEffect(() => {
    scheduleData
      ? reset(scheduleData)
      : reset({
          id: 0,
          idPaciente: undefined,
          idProfissional: undefined,
          horario: new Date(),
          duracao: undefined,
          obs: "",
          status: "Agendado",
        });
  }, [scheduleData]);

  const { mutateAsync: createSchedule } = useMutation({
    mutationKey: ["createSchedule"],
    mutationFn: async (data: any) => {
      return scheduleServices.create(data);
    },
  });

  const { mutateAsync: updateState } = useMutation({
    mutationKey: ["updateState"],
    mutationFn: async (params: any) => {
      return scheduleServices.update(params.id, params);
    },
  });

  const { refetch } = useSchedule();

  // const validSchedule = (data: scheduleSchema) => {
  // const dtInicio = new Date(data.horario);
  // const dtFim  =  new Date(dtInicio.getTime() + data.duracao * 60000);

  // const findSchedule = schedules.find((s) => {
  //   const sInicio = new Date(s.horario);
  //   const sFim = new Date(sInicio.getTime() + s.duracao * 60000);

  //   if (dtFim >= sInicio && dtInicio <= sFim) {
  //     console.log('achou', s)
  //     return s;
  //   }
  // if ((h >= dtInicio && h <= dtFim) || (h <= dtInicio && h >= dtFim)) return h
  // return (h >= dtInicio && h <= dtFim) || (dtInicio >= h && dtInicio <= new Date(s.horario));
  // })
  // console.log(data, '-', dtInicio, '-', dtFim, '-', findSchedule);
  // if (findSchedule) {
  //   if ((findSchedule.idPaciente === data.idPaciente) || (findSchedule.idProfissional === data.idProfissional)) {

  //     return toast.error("Já existe uma consulta marcada para esse horário");
  //   } return toast.success("marcado");
  // }
  // console.log(findSchedule);
  //   return
  // }

  // TODO: sempre verificar se ja tem horario marcado, e com mesmo paciente ou dentista
  const onSubmit = async (data: scheduleSchema) => {
    try {
      if (data && new Date(data.horario) < new Date()) {
        return toast.error("Não é possível agendar em datas passadas");
      }

      let value = { ...data };
      if (!data?.status) {
        value.status = "AGENDADO";
      }
      if (isCreate) {
        await createSchedule(value);
      } else {
        await updateState(value);
      }
      refetch();
      queryClient.invalidateQueries({ queryKey: ["scheduleList"] });
      toast.success("Salvo com sucesso");
      modalRef?.current?.close();
    } catch (e) {
      console.log(e);
      toast.error("Ocorreu um erro!");
    }
  };

  const minOpts = useMemo(() => {
    const options = [];
    const minutesInDay = 24 * 15; // Total minutes in 24 hours
    const startTime = new Date(0, 0, 0, 0, 0); // Starting at midnight

    for (let i = 5; i <= minutesInDay; i += 5) {
      const newTime = addMinutes(startTime, i);
      const r = (i < 60 ? "" : "H'h'") + (i % 60 === 0 ? "" : " m'm'");
      const label = format(newTime, r);
      options.push({ label, value: i });
    }
    return options;
  }, []);

  useEffect(() => {
    if (patientData?.id) {
      setValue("idPaciente", patientData?.id);
      setValue("paciente", patientData?.nome);
      insertPatientRef.current?.close();
    }
  }, [patientData]);

  useEffect(() => {
    if (professionalData?.id) {
      setValue("idProfissional", professionalData?.id || 0);
      setValue("profissional", professionalData?.nome);
      insertProfessionalRef.current?.close();
    }
  }, [professionalData]);

  return {
    scheduleForm,
    setPatientData,
    setProfessionalData,
    insertPatientRef,
    insertProfessionalRef,
    minOpts,
    onSubmit,
    scheduleData,
    professionalOpts,
    patientOpts,
  };
};
