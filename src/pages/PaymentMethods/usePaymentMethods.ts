import paymentMethodService from "@/services/paymentMethodService"
import { useMutation, useQuery } from "@tanstack/react-query"
import { toast } from "react-toastify"

export const usePaymentMethods = (
  modalRemoveRef?: React.RefObject<any>,
) => {
  const {data: paymentMethodList, refetch} = useQuery({
    queryKey	: ['paymentMethodList'],
    queryFn	: () =>  paymentMethodService.getAll(),
  })

  const { mutateAsync: deletePaymMethod } = useMutation({
    mutationFn: (id: number) => paymentMethodService.delete(id)
  })
  const handleRemove = async (id: number) => {
    try {
      await deletePaymMethod(id)
      modalRemoveRef?.current?.close()
      toast.success('Removido com sucesso')
      refetch()
    } catch(e) {
      toast.error('Ocorreu um erro')
    }
  }

  return {
    paymentMethodList,
    handleRemove,
    refetch,
  }
}
