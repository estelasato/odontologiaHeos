import paymentTermService from "@/services/paymentTermService"
import { useQuery } from "@tanstack/react-query"
import { useEffect, useMemo, useState } from "react"
import { useFormContext } from "react-hook-form"
import paymentMethodService from "@/services/paymentMethodService"
import masks from "@/utils/masks"
import { AccReceivableType } from "@/validators/accReceivableValidator"
import { IBudget } from "@/services/budgetsService"

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
  situacao: number | 1 | 0
  idFormaPag: number
}
export const useIncludeAccReceivable = (defaultValues?: IBudget) => {
  const { watch, setValue} = useFormContext()
  const watchPaymentTerm = watch('idCondPagamento')
  const watchTotal = watch('total')
  const watchStataus = watch('status')

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

  const getSituation = useMemo(() => {
    if (watchStataus == 'PENDENTE' || watchStataus == 'CANCELADO') {
      return 0
    } else return 1
  }, [watchStataus])

  useEffect(() => {
    if (defaultValues?.contasReceber) {
      const newL = defaultValues?.contasReceber?.map((r: AccReceivableType) => {
        return {
          ...r,
          parcela: Number(r.parcela),
          formaPagamento: `${r.idFormaPag} - ${paymMethods[r.idFormaPag as keyof typeof paymMethods]}`,
          dtVencimento: r.dtVencimento,
          valorParcela: Number(r.valorParcela),
          situacao: !r.situacao ? 0 : 1,
          idFormaPag: r.idFormaPag
        }
      })
      setDataTable(newL)
      setValue('contasReceber', newL)
    }
  }, [defaultValues])

  useEffect(() => {
    if (watchPaymentTerm && paymentTermData && (!defaultValues || defaultValues.status === 'PENDENTE') || defaultValues?.contasReceber?.length == 0) {

      const contasRec: IDataTable[] = []
      paymentTermData?.parcelas?.forEach((p: IBudgetTreatment) => {
        const namePayMethod = paymMethods[p.idFormaPag as keyof typeof paymMethods]
        const installmValue = (Number(masks.number(watchTotal)) * p.perc) / 100 || 0

        contasRec.push({
          parcela: p.numParcela,
          formaPagamento: `${p.idFormaPag} - ${namePayMethod}`,
          dtVencimento: calcDate(p.dias),
          valorParcela: installmValue || 0,
          situacao: getSituation,
          idFormaPag: p.idFormaPag

        })
      })
      console.log(contasRec, 'contasRec', dataTable)
      setDataTable(contasRec)
      setValue('contasReceber', contasRec)
    }
  }, [watchPaymentTerm, watchTotal, watchStataus, paymentTermData,defaultValues])

  return {
    isLoading,
    dataTable,
    setDataTable
  }
}
