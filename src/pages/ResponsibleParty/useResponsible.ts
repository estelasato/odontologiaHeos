import { RefObject } from "react";
import { toast } from "react-toastify";
import { useMutation, useQuery } from "@tanstack/react-query";

import { modalRefProps } from "@/components/Modal";
import responsiblePartyService from "@/services/responsiblePartyService";

export const useResponsible = (
  modalRemoveRef?: RefObject<modalRefProps>
) => {
  const { data: responsibleList, refetch } = useQuery({
    queryKey: ["responsibleList"],
    queryFn: () => responsiblePartyService.getAll()
  })

  const { mutateAsync: deleteResponsible } = useMutation({
    mutationFn: (id: number) => responsiblePartyService.delete(id)
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
    responsibleList,
    handleRemove,
    refetch,
  }
}
