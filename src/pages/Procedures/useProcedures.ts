import { RefObject } from "react";
import { toast } from "react-toastify";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { modalRefProps } from "@/components/Modal";
import procedureService from "@/services/procedureService";

export const useProcedures = (
  modalRemoveRef?: RefObject<modalRefProps>
) => {
  const { data: proceduresList, refetch } = useQuery({
    queryKey: ['proceduresList'],
    queryFn: () => {
      return procedureService.getAll();
    },
  })

  const { mutateAsync: deleteItem } = useMutation({
    mutationFn: (id: number) => procedureService.delete(id),
  })

  const queryClient = useQueryClient();
  const handleRemove = async (id: number) => {
    try {
      await deleteItem(id)
      modalRemoveRef?.current?.close()
      queryClient.invalidateQueries({ queryKey: ['proceduresList'] });
      toast.success('Removido com sucesso')
      refetch()
    } catch (e) {
      toast.error('Ocorreu um erro')
    }
  }

  return {
    proceduresList,
    handleRemove,
    refetch
  }
}
