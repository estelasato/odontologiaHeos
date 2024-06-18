import { RefObject } from "react";
import { toast } from "react-toastify";
import { useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";

import { zodResolver } from "@hookform/resolvers/zod";
import { modalRefProps } from "..";
import { PatientFormSchema, PatientsSchema, defaultValuesPatient } from "@/validators/patientValidator";
import patientService, { PatientProps } from "@/services/patientService";
import { usePatient } from "@/pages/Patient/usePatient";

export const useModalPatient = (
  isCreate = false,
  modalRef: RefObject<modalRefProps>
) => {
  const patientForm = useForm<PatientFormSchema>({
    resolver: zodResolver(PatientsSchema),
    defaultValues: defaultValuesPatient,
  });

  const { mutateAsync: createPatient } = useMutation({
    mutationKey: ["createPatient"],
    mutationFn: async (data: PatientProps) => {
      return patientService.createPatient(data)
    }
  })

  const { mutateAsync: updatePatient } = useMutation({
    mutationKey: ["updatePatient"],
    mutationFn: async (params: any) => {
      return patientService.updatePatient(params.id, params);
    }
  })

  const { refetch } = usePatient();

  const onSubmit = async (data?: any) => {
    try {
      console.log(data)
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
  }

  return {
    patientForm,
    // defaultValues,
    onSubmit,

  };
};
