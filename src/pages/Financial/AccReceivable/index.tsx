import Table from "@/components/Table"
import { useAccReceivable } from "./useAccReceivable"
import { useMemo } from "react"
import masks from "@/utils/masks"
import { Container } from "@/pages/Employees/styles"
import { SearchContainer } from "@/components/SearchContainer"


export const AccReceivable = () => {
  const {accReceivableList} = useAccReceivable()

  const cols = useMemo(() => [
    {
      header: 'Código',
      accessorKey: 'id',
    },
    {
      header: 'Paciente',
      accessorKey: 'nomePaciente',
    },
    {
      header: 'Profissional',
      accessorKey: 'nomeProfissional',
    },
    {
      header: 'Parcela',
      accessorKey: 'parcela',
      meta: { alignText: 'center', alignHeader: 'center' }
    },
    {
      header: 'Valor',
      accessorKey: 'valorParcela',
      cell: (r: any) => {
        const value = r.getValue() as Date
        return (
          <p>{masks.currencyAllPlatforms(`${value}`)}</p>
        )
      }
    },
    {
      header: 'Data Vencimento',
      accessorKey: 'dtVencimento',
      cell: (r: any) => {
        const value = r.getValue() as Date
        return (
          <p>{masks.convertToDateString(`${value}`)}</p>
        )
      },
      meta: { alignText: 'center', alignHeader: 'center' }
    },
    {
      header: 'Código Orçamento',
      accessorKey: 'idOrcamento',
      meta: { alignText: 'center', alignHeader: 'center' }
    },
    // {
    //   header: 'situacao',
    //   accessorKey: 'id',
    // },
  ], [])
  return(
    <Container>
      <SearchContainer
        onSearch={(e) => console.log(e)}
      />
    <Table
      cols={cols}
      data={accReceivableList || []}
      />
      </Container>
  )
}
