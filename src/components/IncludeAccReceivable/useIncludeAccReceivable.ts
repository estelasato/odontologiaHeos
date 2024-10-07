import paymentTermService from "@/services/paymentTermService"
import { useQuery } from "@tanstack/react-query"
import { useEffect, useMemo, useState } from "react"
import { useFormContext } from "react-hook-form"
import paymentMethodService from "@/services/paymentMethodService"
import masks from "@/utils/masks"

export interface IBudgetTreatment {
  id?: number
  idCondPag: number
  idFormaPag: number
  numParcela: number
  dias: number
  perc: number
  status?: string
}

interface IDataTable {
  parcela: number
  formaPagamento: string
  dtVencimento: Date
  valorParcela: number
}
export const useIncludeAccReceivable = () => {
  const { watch } = useFormContext()
  const watchPaymentTerm = watch('idCondPagamento')
  const watchTotal = watch('total')
  const [dataTable, setDataTable] = useState<IDataTable[]>([])

  const {data: paymentTermData, isLoading} = useQuery({
    queryKey: ['paymentTermData', watchPaymentTerm],
    queryFn: () => watchPaymentTerm && paymentTermService.getById(watchPaymentTerm),
  })
  const {data: payMethodList} = useQuery({
    queryKey: ['payMethodList'],
    queryFn: () =>  paymentMethodService.getAll(),
  })

  const paymMethods = useMemo(() => {
    return payMethodList?.reduce((acc: any, p: any) => {
      acc[p.id] = p.descricao;
      return acc;
    }, {});
  }, [payMethodList]);

  const calcDate = (dias: number) => {
    const date = new Date()
    date.setDate(date.getDate() + dias)
    return date
  }

  useEffect(() => {
    if (watchPaymentTerm && paymentTermData) {
      const contasRec: IDataTable[] = []
      paymentTermData?.parcelas?.forEach((p: IBudgetTreatment) => {
        const namePayMethod = paymMethods[p.idFormaPag as keyof typeof paymMethods]
        const installmValue = (Number(masks.number(watchTotal)) * p.perc) / 100 || 0
        contasRec.push({
          parcela: p.numParcela,
          formaPagamento: `${p.idFormaPag} - ${namePayMethod}`,
          dtVencimento: calcDate(p.dias),
          valorParcela: installmValue || 0,
        })
      })

      setDataTable(contasRec)
    }
  }, [watchPaymentTerm, watchTotal])

  return {
    isLoading,
    dataTable,
  }
}
