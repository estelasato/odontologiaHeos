import { useProfessional } from "@/pages/Professional/useProfessional";
import { ProfessionalProps } from "@/services/professionalService";
import { TreatmentsDefaultValue, TreatmentsFormSchema, TreatmentsSchema } from "@/validators/treatmentsValidator";
import { zodResolver } from "@hookform/resolvers/zod";
import { useQueryClient } from "@tanstack/react-query";
import { useMemo } from "react";
import { useForm } from "react-hook-form";

export const useModalTreatment = () => {
  const queryClient = useQueryClient();
  const { professionalList } = useProfessional();

  const professionals = queryClient.getQueryData<ProfessionalProps[]>([
    "professionalList",
  ]);

  const professionalOpts = useMemo(() => {
    const list = professionals || professionalList;
    if (list) {
      return list?.map((p: ProfessionalProps) => ({
        value: p.id,
        label: p.nome,
      }));
    }
  }, [professionals, professionalList]);

  const treatmentForm = useForm<TreatmentsFormSchema>({
    resolver: zodResolver(TreatmentsSchema),
    defaultValues: TreatmentsDefaultValue
  });

  const onSubmit = () => {};

  return {
    treatmentForm,
    professionalOpts,
    onSubmit,
  };
};
