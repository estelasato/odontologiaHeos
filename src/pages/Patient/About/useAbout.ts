import { useState } from "react";
import { toast } from "react-toastify";
import { useForm } from "react-hook-form";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import { zodResolver } from "@hookform/resolvers/zod";
import {
  PatientFormSchema,
  PatientsSchema,
  defaultValuesPatient,
} from "@/validators/patientValidator";
import patientService, { PatientProps } from "@/services/patientService";
import { useNavigate, useParams } from "react-router-dom";

export const useAbout = () => {
  const {id} = useParams()
  const [values, setValues] = useState<any>(null);
  const isCreate = !id;

  const patientForm = useForm<PatientFormSchema>({
    resolver: zodResolver(PatientsSchema),
    defaultValues: defaultValuesPatient,
  });

  const { data: patientData } = useQuery({
    queryKey: ["patientData", id],
    queryFn: () => id && patientService.getPatientById(parseInt(id)),
  });

  const { mutateAsync: createPatient, isPending: pendingCreate } = useMutation({
    mutationKey: ["createPatient"],
    mutationFn: async (data: PatientProps) => {
      return patientService.createPatient(data);
    },
    onSuccess: (data) => {
      if (!!data.id) {
        navigate(`/patient/${data.id}`)
      }
    }
  });

  const { mutateAsync: updatePatient, isPending: pendingEdit } = useMutation({
    mutationKey: ["updatePatient"],
    mutationFn: async (params: any) => {
      return patientService.updatePatient(params.id, params);
    },
  });

  const queryClient = useQueryClient();
  const navigate = useNavigate()

  function needResponsible (birthdate: Date) {
    const date = new Date();
    date.setFullYear(date.getFullYear() - 18);
    const result = birthdate.getFullYear() > date.getFullYear()
    return result
  }

  const onSubmit = async (data?: any) => {
    if (needResponsible(data?.dtNascimento)) {
      if (!data?.responsaveis || data.responsaveis.length === 0) {
        toast.error("Menor de idade precisa de um responsável");
        return;
      }
    }
    try {
      if (isCreate) {
        await createPatient(data);
        navigate('/patients')
        } else {
        await updatePatient(data);
      }
      queryClient.resetQueries({ queryKey: ["patientData", id] });
      toast.success("Salvo com sucesso");
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
