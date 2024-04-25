import { useMemo } from "react";
import { useQuery } from "@tanstack/react-query";

import Table  from '../../../components/Table';
import stateServices from "../../../services/stateServices";

export const State = () => {

  const { data } = useQuery({
    queryKey: ["getStates"],
    queryFn: () => {
      return stateServices.getAllStates();
    },
  });

  const columns = useMemo(() => [
    {
      header: "Código",
      accessorKey: "estado_ID",
    },
    {
      header: "Estado",
      accessorKey: "estado",
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
      header: "UF",
      accessorKey: "uf",
    },
    {
      header: "País",
      accessorKey: "pais.pais",
    },
  ], [])

  return (
    <div>

      <Table
        cols={columns}
        data={data || []}
      />
    </div>

  )
}
