import { RefObject, useState } from "react";
import { toast } from "react-toastify";
import { useForm } from "react-hook-form";
import { useMutation, useQuery } from "@tanstack/react-query";

import { zodResolver } from "@hookform/resolvers/zod";
import { modalRefProps } from "..";
import {
  PatientFormSchema,
  PatientsSchema,
  defaultValuesPatient,
} from "@/validators/patientValidator";
import patientService, { PatientProps } from "@/services/patientService";
import { usePatient } from "@/pages/Patient/usePatient";

export const useModalPatient = (modalRef: RefObject<modalRefProps>) => {
  const [values, setValues] = useState<any>(null);
  const isCreate = !values;

  const patientForm = useForm<PatientFormSchema>({
    resolver: zodResolver(PatientsSchema),
    defaultValues: defaultValuesPatient,
  });

  const { mutateAsync: createPatient, isPending: pendingCreate } = useMutation({
    mutationKey: ["createPatient"],
    mutationFn: async (data: PatientProps) => {
      return patientService.createPatient(data);
    },
  });

  const { mutateAsync: updatePatient, isPending: pendingEdit } = useMutation({
    mutationKey: ["updatePatient"],
    mutationFn: async (params: any) => {
      return patientService.updatePatient(params.id, params);
    },
  });

  const { data: patientData } = useQuery({
    queryKey: ["patientData", values],
    queryFn: () => values?.id && patientService.getPatientById(values?.id),
  });

  const { refetch } = usePatient();

  const onSubmit = async (data?: any) => {
    try {
      if (isCreate) {
        await createPatient(data);
      } else {
        await updatePatient(data);
      }
      toast.success("Salvo com sucesso");
      refetch();
      modalRef.current?.close();
    } catch (e) {
      console.log(e);
      toast.error("Ocorreu um erro!");
    }
  };

  return {
    patientForm,
    isLoading: pendingCreate || pendingEdit,
    // defaultValues,
    patientData,
    onSubmit,
    setValues,
    values,
  };
};
