import { modalRefProps } from "@/components/Modal"
import basicServices from "@/services/basicServices"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { RefObject } from "react"
import { toast } from "react-toastify"

export const useBasicForm = (
  type: string,
  modalRemoveRef?: RefObject<modalRefProps>
) => {
  const { data: list, refetch } = useQuery({
    queryKey: [`${type}List`],
    queryFn: () => {
      return basicServices.getAll(type);
    },
  })

  const { mutateAsync: deleteItem } = useMutation({
    mutationFn: (id: number) => basicServices.delete(type, id),
  })
  const queryClient = useQueryClient();
  const handleRemove = async (id: number) => {
    try {
      await deleteItem(id)
      modalRemoveRef?.current?.close()

      switch (type) {
        case 'illness':
          queryClient.invalidateQueries({ queryKey: ['illnessOptions'] });
          break;
        case 'medications':
          queryClient.invalidateQueries({ queryKey: ['medOptions'] });
          break;
      }
      toast.success('Removido com sucesso')
      refetch()
    } catch (e) {
      toast.error('Ocorreu um erro')
    }
  }

  return {
    list,
    handleRemove,
    refetch
  }
}
