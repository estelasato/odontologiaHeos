import { RefObject } from "react";
import { toast } from "react-toastify";
import { useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import { zodResolver } from "@hookform/resolvers/zod";
import { modalRefProps } from "..";
import { ResponsibleFormSchema, ResponsibleSchema, defaultValuesResponsible } from "@/validators/responsiblePartyValidator";
import responsiblePartyService, { ResponsibleProps } from "@/services/responsiblePartyService";
import { useResponsible } from "@/pages/ResponsibleParty/useResponsible";
import { validAge } from "@/utils/validAge";

export const useModalResponsible = (
  isCreate = false,
  modalRef: RefObject<modalRefProps>
) => {
  const responsibleForm = useForm<ResponsibleFormSchema>({
    resolver: zodResolver(ResponsibleSchema),
    defaultValues: defaultValuesResponsible,
  });

  const { mutateAsync: createResponsible } = useMutation({
    mutationKey: ["createResponsible"],
    mutationFn: async (data: ResponsibleProps) => {
      return responsiblePartyService.create(data)
    }
  })

  const { mutateAsync: updateResponsible } = useMutation({
    mutationKey: ["updateResponsible"],
    mutationFn: async (params: any) => {
      return responsiblePartyService.update(params.id, params);
    }
  })

  const { refetch } = useResponsible();
  const queryClient = useQueryClient();

  const onSubmit = async (data?: any) => {
    try {
      console.log(data)
      if (data?.dtNascimento && validAge(data?.dtNascimento)) {
          return toast.error("O responsável deve ser maior de idade");
      }
      if (isCreate) {
        await createResponsible(data);
      } else {
        await updateResponsible(data);
      }
      toast.success("Salvo com sucesso");
      queryClient.invalidateQueries({queryKey: ['responsibleList']});
      refetch();
      modalRef.current?.close();
    } catch (e) {
      console.log(e);
      toast.error("Ocorreu um erro!");
    }
  }

  return {
    responsibleForm,
    // defaultValues,
    onSubmit,

  };
};
