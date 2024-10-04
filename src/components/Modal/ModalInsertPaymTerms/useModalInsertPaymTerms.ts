import paymentTermService, { IPaymentTerm } from "@/services/paymentTermService"
import { useMutation, useQuery } from "@tanstack/react-query"
import { useEffect, useState } from "react"
import { toast } from "react-toastify";


export const useModalInsertPaymTerms = (
  removeRef: React.RefObject<any>
) => {
  const [list, setList] = useState<IPaymentTerm[]>();

  const { data: paymTermsList} = useQuery({
    queryKey: ['paymTermsList'],
    queryFn: () => paymentTermService.getAll(),
  })

  const {mutateAsync: removePaymTerms} = useMutation({
    mutationKey: ['removePaymTerms'],
    mutationFn: (id: number) => paymentTermService.remove(id),
  })

  useEffect(() => {
    setList(paymTermsList)
  }, [paymTermsList])

  const handleRemove = async (id: number) => {
    try {
      await removePaymTerms(id)
      setList(list?.filter((item) => item.id !== id))
      removeRef.current?.close()
      toast.success('Condição de pagamento removida com sucesso')
    } catch (error) {
      toast.error('Erro ao remover condição de pagamento')
    }
  }

  return {
    paymTermsList,
    list,
    handleRemove,
  }
}
