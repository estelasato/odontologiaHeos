import { RefObject } from "react";
import { toast } from "react-toastify";
import { useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";

import { zodResolver } from "@hookform/resolvers/zod";
import { modalRefProps } from "..";
import { ProfessionalFormSchema, ProfessionalSchema, defaultValuesProfessional } from "@/validators/professionalValidator";
import professionalService, { ProfessionalProps } from "@/services/professionalService";
import { useProfessional } from "@/pages/Professional/useProfessional";
// import { , ResponsibleSchema, defaultValuesResponsible } from "@/validators/responsiblePartyValidator";
// import responsiblePartyService, { ResponsibleProps } from "@/services/responsiblePartyService";
// import { useResponsible } from "@/pages/ResponsibleParty/useResponsible";

export const useModalProfessional = (
  isCreate = false,
  modalRef: RefObject<modalRefProps>
) => {
  const professionalForm = useForm<ProfessionalFormSchema>({
    resolver: zodResolver(ProfessionalSchema),
    defaultValues: defaultValuesProfessional,
  });

  const { mutateAsync: createProfessional } = useMutation({
    mutationKey: ["createResponsible"],
    mutationFn: async (data: ProfessionalProps) => {
      return professionalService.create(data)
    }
  })

  const { mutateAsync: updateProfessional } = useMutation({
    mutationKey: ["updateResponsible"],
    mutationFn: async (params: any) => {
      return professionalService.update(params.id, params);
    }
  })

  const { refetch } = useProfessional();
console.log(professionalForm.formState.errors)
  const onSubmit = async (data?: any) => {
    try {
      console.log(data)
      if (isCreate) {
        await createProfessional(data);
      } else {
        await updateProfessional(data);
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
    professionalForm,
    // defaultValues,
    onSubmit,
  };
};
