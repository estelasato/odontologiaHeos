import { RefObject } from "react";
import { toast } from "react-toastify";
import { useMutation, useQuery } from "@tanstack/react-query";

import { modalRefProps } from "@/components/Modal";
import professionalService from "@/services/professionalService";

export const useProfessional = (
  modalRemoveRef?: RefObject<modalRefProps>
) => {
  const { data: professionalList, refetch } = useQuery({
    queryKey: ["professionalList"],
    queryFn: () => professionalService.getAll()
  })

  const { mutateAsync: deleteResponsible } = useMutation({
    mutationFn: (id: number) => professionalService.delete(id)
  })

  const handleRemove = async (id: number) => {
    try {
      await deleteResponsible(id)
      modalRemoveRef?.current?.close()
      toast.success('Removido com sucesso')
      refetch()
    } catch(e) {
      toast.error('Ocorreu um erro')
    }
  }


  return {
    professionalList,
    handleRemove,
    refetch,
  }
}
