import { RefObject } from "react";
import { toast } from "react-toastify";
import { useMutation, useQuery } from "@tanstack/react-query";

import { modalRefProps } from "@/components/Modal";
import anamnesisService from "@/services/anamnesisService";
import { useParams } from "react-router-dom";

export const useAnamnesis = (
  modalRemoveRef?: RefObject<modalRefProps>
) => {
  const {id} = useParams();

  const { data: anamnesisList, refetch } = useQuery({
    queryKey: ["anamnesisList"],
    queryFn: () => id && anamnesisService.getAll({idPaciente: Number(id)})
  })

  const { mutateAsync: deleteAnamnesis } = useMutation({
    mutationFn: (id: number) => anamnesisService.delete(id)
  })

  const handleRemove = async (id: number) => {
    try {
      await deleteAnamnesis(id)
      modalRemoveRef?.current?.close()
      toast.success('Removido com sucesso')
      refetch()
    } catch(e) {
      toast.error('Ocorreu um erro')
    }
  }

  return {
    anamnesisList,
    handleRemove,
    refetch,
  }
}
