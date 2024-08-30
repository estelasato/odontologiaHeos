import { RefObject } from "react";
import { toast } from "react-toastify";
import { useParams } from "react-router-dom";
import { useMutation, useQuery } from "@tanstack/react-query";

import { modalRefProps } from "@/components/Modal";
import treatmentsServices from "@/services/treatmentsServices";


export const useTreatments = (
  modalRemoveRef?: RefObject<modalRefProps>
) => {
  const {id} = useParams();

  const { data: tratmentsList, refetch } = useQuery({
    queryKey: ["tratmentsList"],
    queryFn: () => id && treatmentsServices.getAll({ idPaciente: Number(id) })
  })

  const { mutateAsync: deleteAnamnesis } = useMutation({
    mutationFn: (id: number) => treatmentsServices.delete(id)
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
    tratmentsList,
    handleRemove,
    refetch,
  }
}
