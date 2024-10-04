import paymentMethodService from "@/services/paymentMethodService"
import { paymentMethodSchema, PaymMethodFormSchema } from "@/validators/paymentMethodValidator"
import { zodResolver } from "@hookform/resolvers/zod"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { useForm } from "react-hook-form"
import { toast } from "react-toastify"
import { modalRefProps } from ".."
import { usePaymentMethods } from "@/pages/PaymentMethods/usePaymentMethods"
import { useEffect, useState } from "react"

export const useModalPaymMethod = (
  modalRef: React.RefObject<modalRefProps>,
) => {
  const [values, setValues] = useState<any>();
  const paymMethodForm = useForm<PaymMethodFormSchema>({
    resolver: zodResolver(paymentMethodSchema)
  })

  const {mutateAsync: createPaymMethod} = useMutation({
    mutationKey: ['createPaymMethod'],
    mutationFn: (data: PaymMethodFormSchema) => paymentMethodService.create(data)
  })

  const {mutateAsync: updatePaymMethod} = useMutation({
    mutationKey: ['updatePaymMethod'],
    mutationFn: (params: {data: PaymMethodFormSchema, id: number}) => paymentMethodService.update(params.id, params.data)
  })

  const {refetch} = usePaymentMethods()
  const queryClient = useQueryClient();

  const onSubmit = async (data: PaymMethodFormSchema) => {
    let newData = {
      ...data,
      status: data.status ? 1 : 0
    }

    try {
      if (data.id) {
        await updatePaymMethod({data: newData, id: data.id})
      } else {
        await createPaymMethod(newData)
      }
      refetch()
      queryClient.invalidateQueries({ queryKey: ['paymentMethodOpt'] })
      modalRef.current?.close()
      toast.success('Forma de pagamento salva com sucesso')
    } catch (error) {
      toast.error('Erro ao salvar forma de pagamento')
    }
  }

  const defaultV = {
    id: undefined,
    descricao: "",
    status: true,
  }

  useEffect(() => {
    if (values) {
      paymMethodForm.reset(values)
    }else {
      paymMethodForm.reset(defaultV)
    }
  }, [values])
  return {
    paymMethodForm,
    onSubmit,
    setValues,
    values,
  }

}
