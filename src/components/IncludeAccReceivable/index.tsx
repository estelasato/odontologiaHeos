import { Container } from "./styles"
import { useMemo } from "react"
import Table from "../Table"
import { useIncludeAccReceivable } from "./useIncludeAccReceivable"
import masks from "@/utils/masks"

export interface IPaymTerms {
  // id?: number,
  // idPaciente?: number,
  // idProfissional?: number,
  // idAnamnese?: number,
  // idCondPagamento: number,
  // status?: string,
  // total: number,
  // procedimentos?: IBudgetProcedures[]
  // contasReceber?: any[]
}

export interface IIncludeAcc {
  defaultValues?: any
}

export const IncludeAccReceivable = ({defaultValues}: IIncludeAcc) => {
  const { isLoading, dataTable } = useIncludeAccReceivable(defaultValues)

  const cols = useMemo(() => [
    {
      accessorKey: 'parcela',
      header: 'Parcela',
    },
    {
      accessorKey: 'formaPagamento',
      header: 'Cód - Forma de Pagamento',
    },
    {
      accessorKey: 'dtVencimento',
      header: 'Data Vencimento',
      cell: (r: any) => {
        const d = r.getValue()
        return `${masks.convertToDateString(d)}`
      }
    },
    {
      accessorKey: 'valorParcela',
      header: 'Valor Parcela',
      cell: (r: any) => {
        const d = r.getValue()
        return `${masks.currencyAllPlatforms(d)}`
      }
    },
    {
      accessorKey: 'situacao',
      header: 'Situação',
    },
  ], [])

  return (
    <Container>
      <Table
        isLoading={isLoading}
        cols={cols}
        data={dataTable || []}
        // variant="invisible"
      />
    </Container>
  )
}
