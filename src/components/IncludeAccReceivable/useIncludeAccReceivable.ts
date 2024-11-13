import paymentTermService from "@/services/paymentTermService"
import { useQuery } from "@tanstack/react-query"
import { useEffect, useMemo, useState } from "react"
import { useFormContext } from "react-hook-form"
import paymentMethodService from "@/services/paymentMethodService"
import masks from "@/utils/masks"
import { AccReceivableType } from "@/validators/accReceivableValidator"


export interface IBudgetProcedures {
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
  situacao: ISituation
  idFormaPag: number
  idProfissional: number
}
export const useIncludeAccReceivable = (defaultValues?: any) => {
  const { watch, setValue} = useFormContext()
  const watchPaymentTerm = watch('idCondPagamento')

  const watchValor = watch('valor')
  // const watchStataus = watch('status'
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

  // const calcDate = (dias: number) => {
  //   const date = new Date()
  //   date.setDate(date.getDate() + dias)
  //   return date
  // }

  // const getSituation = useMemo(() => {
  //   if (watchStataus == 'PENDENTE' || watchStataus == 'CANCELADO') {
  //     return 0
  //   } else return 1
  // }, [watchStataus])

  // const defaultContasReceber = getValues('contasReceber') as AccReceivableType[]
  useEffect(() => {
    // qnd mudar a cond de pagamento, atualiza a tabela de contas a receber
    if (watchPaymentTerm && watchValor && paymentTermData) {
      const contasRec: IDataTable[] = []
      paymentTermData?.parcelas?.forEach((p: IBudgetProcedures) => {
        const namePayMethod = paymMethods[p.idFormaPag as keyof typeof paymMethods]
        const installmValue = (Number(masks.number(watchValor)) * p.perc) / 100 || 0

        contasRec.push({
          parcela: p.numParcela,
          formaPagamento: `${p.idFormaPag} - ${namePayMethod}`,
          dtVencimento: new Date(),
          valorParcela: installmValue || 0,
          situacao: defaultValues.situacao || "PENDENTE" as ISituation,
          idFormaPag: p.idFormaPag,
          idProfissional: defaultValues.idProfissional,
        })
      })
      setDataTable(contasRec)
      setValue('contasReceber', contasRec)
    } else {
      setDataTable([])
      setValue('contasReceber', [])
    }
  }, [watchPaymentTerm, watchValor, paymentTermData])

  useEffect(() => {
    // console.log(defaultValues, 'aa')
    if (defaultValues?.contasReceber) {
      const newL = defaultValues?.contasReceber?.map((r: AccReceivableType) => {
        return {
          ...r,
          parcela: Number(r.parcela),
          formaPagamento: `${r.idFormaPag} - ${paymMethods[r.idFormaPag as keyof typeof paymMethods]}`,
          dtVencimento: r.dtVencimento,
          valorParcela: Number(r.valorParcela),
          situacao: r.situacao,
          idFormaPag: r.idFormaPag,
          idProfissional: defaultValues.idProfissional,
        }
      })
      setDataTable(newL)
      setValue('contasReceber', newL)
    }
  }, [defaultValues])

  return {
    isLoading,
    dataTable,
  }
}
