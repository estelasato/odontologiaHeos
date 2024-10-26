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
      return (
        values?.id &&
        scheduleServices.getById(values?.idProfissional, values?.horario)
      );
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
  // setValue('duracao', 30);
  useEffect(() => {
    scheduleData
      ? reset(scheduleData)
      : reset({
          idPaciente: undefined,
          idProfissional: undefined,
          horario: undefined,
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
      return scheduleServices.update(params);
    },
  });

  const { mutateAsync: removeSchedule } = useMutation({
    mutationKey: ["removeSchedule"],
    mutationFn: async (params: {
      idProfissional: number;
      horario: Date | string;
    }) => {
      return scheduleServices.remove(params.idProfissional, params.horario);
    },
  });

  const { refetch } = useSchedule();

  function isOverlap(existingEvent: any, newEvent: any) {
    const existingStart = new Date(existingEvent.horario);
    const existingEnd = new Date(existingStart.getTime() + existingEvent.duracao * 60 * 1000); // Convertendo duração para ms

    const newStart = new Date(newEvent.horario);
    const newEnd = new Date(newStart.getTime() + newEvent.duracao * 60 * 1000);

    // Verifica se há sobreposição
    const sameProfissional = existingEvent.idProfissional === newEvent.idProfissional;
    const samePatient = existingEvent.idPaciente === newEvent.idPaciente;
    return (newStart < existingEnd && newEnd > existingStart) && (sameProfissional || samePatient);
  }

  // Função para verificar se o horário está disponível
  function isTimeAvailable(events: any, newEvent: any) {
    console.log(events, newEvent);
    return !events?.some((event: any) => isOverlap(event, newEvent));
  }

  const schedules = queryClient.getQueriesData({ queryKey: ["scheduleList"] });
  // TODO: sempre verificar se ja tem horario marcado, e com mesmo paciente ou dentista
  const onSubmit = async (data: scheduleSchema) => {
    try {
      if (schedules&& schedules.length > 0 && !isTimeAvailable(schedules[0][1], data)) {
        return toast.error("Insira um horário válido");
      }
      if (data && new Date(data.horario) < new Date()) {
        return toast.error("Insira um horário válido");
      }

      let value = { ...data };
      if (!data?.status) {
        value.status = "AGENDADO";
      }
      console.log(value);
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

  const onRemove = async (data: {
    idProfissional: number;
    horario: Date | string;
  }) => {
    try {
      console.log(data);
      await removeSchedule(data);
      refetch();
      queryClient.invalidateQueries({ queryKey: ["scheduleList"] });
      toast.success("Removido com sucesso");
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

    for (let i = 15; i <= minutesInDay; i += 15) {
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
    onRemove,
  };
};
