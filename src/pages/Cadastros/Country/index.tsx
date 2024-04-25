import { useMemo, useRef } from "react";
// import { Table } from "src/components/Table";
import { useQuery } from "@tanstack/react-query";
import Table  from '../../../components/Table';

import { ModalCountry } from "../../../components/Modal/ModalCountry";
import { modalRefProps } from "../../../components/Modal";
import masks from "../../../utils/masks";
import countryServices from "../../../services/countryServices";

export const Country = () => {

  const { data } = useQuery({
    queryKey: ["getCountries"],
    queryFn: () => {
      return countryServices.getAllCountries();
    },
  });

  const modalRef = useRef<modalRefProps>(null)

  const columns = useMemo(() => [
    {
      header: "Código",
      accessorKey: "pais_ID",
    },
    {
      header: "País",
      accessorKey: "pais",
      // meta: { alignText: "right"},
      cell: (row: any) => {
        return (
          <>
            {row.getValue() || 0}
          </>
        );
      },
    },
    {
      header: "DDI",
      accessorKey: "ddi",
    },
    {
      header: "Sigla",
      accessorKey: "sigla",
    },
    {
      header: "Ativo",
      accessorKey: "ativo",
    },
    {
      header: "Cadastro",
      accessorKey: "data_cadastro",
      cell: (row: any) => {
        return (
          <>
            {masks.convertToDateString(row.getValue() as string)}
          </>
        );
      }
    },
    {
      header: "Última alteração",
      accessorKey: "data_ult_alt",
      cell: (row: any) => {
        return (
          <>
            {masks.convertToDateString(row.getValue() as string)}
          </>
        );
      }
    },
  ], [])

  return (
    <>
    <ModalCountry modalRef={modalRef} />
    <div>

      <Table
        cols={columns}
        data={data ?  data : []}
        onOpenRow={(data) => modalRef.current?.open(data)}
        />
    </div>
    </>

  )
}
