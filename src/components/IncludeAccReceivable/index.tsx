import { Container } from "./styles"
import { useMemo } from "react"
import Table from "../Table"
import { useIncludeAccReceivable } from "./useIncludeAccReceivable"
import masks from "@/utils/masks"

export const IncludeAccReceivable = () => {
  const { isLoading, dataTable } = useIncludeAccReceivable()
  // console.log(getValues('idCondPagamento'))

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
