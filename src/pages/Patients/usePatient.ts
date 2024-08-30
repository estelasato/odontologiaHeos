import { RefObject } from "react";
import { toast } from "react-toastify";
import { useMutation, useQuery } from "@tanstack/react-query";

import { modalRefProps } from "@/components/Modal";
import patientService from "@/services/patientService";

export const usePatient = (
  modalRemoveRef?: RefObject<modalRefProps>
) => {
  const { data: patientList, refetch } = useQuery({
    queryKey: ["patientList"],
    queryFn: () => patientService.getAllPatients()
  })

  const { mutateAsync: deletePatient } = useMutation({
    mutationFn: (id: number) => patientService.deletePatient(id)
  })

  const handleRemove = async (id: number) => {
    try {
      await deletePatient(id)
      modalRemoveRef?.current?.close()
      toast.success('Removido com sucesso')
      refetch()
    } catch(e) {
      toast.error('Ocorreu um erro')
    }
  }


  return {
    patientList,
    handleRemove,
    refetch,
  }
}
