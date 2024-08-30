import { PatientProps } from "@/services/patientService";
import { ProfessionalProps } from "@/services/professionalService";
import { useEffect, useMemo, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { modalRefProps } from "..";
import { format, addMinutes } from "date-fns";
import { useMutation } from "@tanstack/react-query";
import scheduleServices from "@/services/scheduleServices";
import { ScheduleSchema, scheduleSchema } from "@/validators/scheduleValidator";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "react-toastify";
import { useSchedule } from "@/pages/Schedule/useSchedule";

export const useModalSchedule = (
  isCreate = false,
  modalRef?: React.RefObject<modalRefProps>
) => {
  const [patientData, setPatientData] = useState<PatientProps>();
  const [professionalData, setProfessionalData] = useState<ProfessionalProps>();

  const insertPatientRef = useRef<modalRefProps>(null);
  const insertProfessionalRef = useRef<modalRefProps>(null);

  const scheduleForm = useForm<scheduleSchema>({
    resolver: zodResolver(ScheduleSchema),
  });
  const { setValue } = scheduleForm;

  const { mutateAsync: createSchedule } = useMutation({
    mutationKey: ["createSchedule"],
    mutationFn: async (data: any) => {
      return scheduleServices.create(data);
    },
  });

  const { refetch } = useSchedule();

  const onSubmit = async (data?: scheduleSchema) => {
    try {
      console.log(data)
      if (isCreate) {
        await createSchedule(data);
      } else {
        // await updateState(data);
      }
      refetch();
      toast.success("Salvo com sucesso");
      modalRef?.current?.close();
    } catch (e) {
      console.log(e);
      toast.error("Ocorreu um erro!");
    }
  };
  // const { mutateAsync: updateState } = useMutation({
  //   mutationKey: ["updateState"],
  //   mutationFn: async (params: any) => {
  //     return scheduleServices.update(params.id, params);
  //   },
  // });

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
  };
};
