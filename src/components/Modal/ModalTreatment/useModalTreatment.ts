import { useProfessional } from "@/pages/Professional/useProfessional";
import anamnesisService from "@/services/anamnesisService";
import { ProfessionalProps } from "@/services/professionalService";
import treatmentsServices from "@/services/treatmentsServices";
import { TreatmentsDefaultValue, TreatmentsFormSchema, TreatmentsSchema } from "@/validators/treatmentsValidator";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useEffect, useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";

export const useModalTreatment = () => {
  const {id} = useParams();
  const queryClient = useQueryClient();
  const { professionalList } = useProfessional();

  const [minDate, setMinDate] = useState<Date | null>(null);

  const professionals = queryClient.getQueryData<ProfessionalProps[]>([
    "professionalList",
  ]);

  const professionalOpts = useMemo(() => {
    const list = professionals || professionalList;
    if (list) {
      return list.filter((a: ProfessionalProps) => a.ativo)?.map((p: ProfessionalProps) => ({
        value: p.id,
        label: p.nome,
      }));
    }
  }, [professionals, professionalList]);

  const treatmentForm = useForm<TreatmentsFormSchema>({
    resolver: zodResolver(TreatmentsSchema),
    defaultValues: TreatmentsDefaultValue
  });

  const { mutateAsync: saveTreatment} = useMutation({
    mutationFn: (data: TreatmentsFormSchema) => {
      const newData = {
        ...data,
        idPaciente: Number(id)
      }
      return data.id ? treatmentsServices.update(data?.id, newData) : treatmentsServices.create(newData)
    }
  })

  // data de término mín
  const startDate = treatmentForm.watch('dataInicio')
  useEffect(() => {
    setMinDate(startDate)
  }, [startDate])

  const { data: anamnesisOpt} = useQuery({
    queryKey: ['anamnesisOpt', id],
    queryFn: () => anamnesisService.getAll({idPaciente: Number(id)}),
    select: (data) => data.map((a: any) => ({value: a.id, label: a.queixas}))
  })

  const onSubmit = async (data: TreatmentsFormSchema) => {
    try {
      await saveTreatment(data)
      queryClient.invalidateQueries({queryKey: ['treatmentsList', id]})
      toast.success('Salvo com sucesso')
    } catch(e) {
      toast.error('Ocorreu um erro')
    }
  };

  return {
    treatmentForm,
    professionalOpts,
    onSubmit,
    minDate,
    anamnesisOpt,
  };
};
