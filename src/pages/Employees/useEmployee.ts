import { RefObject } from "react";
import { toast } from "react-toastify";
import { useMutation, useQuery } from "@tanstack/react-query"

import { modalRefProps } from "@/components/Modal";
import employeeServices from "@/services/employeeServices";

export const useEmployee = (
  modalRemoveRef?: RefObject<modalRefProps>
) => {
  const { data: employeeList, refetch } = useQuery({
    queryKey: ["employeeList"],
    queryFn: () => {
      return employeeServices.getAllEmployees();
    },
  })

  const { mutateAsync: deleteEmployee } = useMutation({
    mutationFn: (id: number) => employeeServices.deleteEmployee(id),
  })

  const handleRemove = async (id: number) => {
    try {
      await deleteEmployee(id)
      modalRemoveRef?.current?.close()
      toast.success('Removido com sucesso')
      refetch()
    } catch(e) {
      toast.error('Ocorreu um erro')
    }
  }

  return {
    employeeList,
    handleRemove,
    refetch
  }

}
