import { useMemo } from "react";
import { useQuery } from "@tanstack/react-query";

import Table  from '../../../components/Table';
import cityServices from "../../../services/cityServices";

export const City = () => {

  const { data } = useQuery({
    queryKey: ["getCities"],
    queryFn: () => {
      return cityServices.getAllCities();
    },
  });

  const columns = useMemo(() => [
    {
      header: "Código",
      accessorKey: "cidade_ID",
    },
    {
      header: "Cidade",
      accessorKey: "cidade",
      cell: (row: any) => {
        return (
          <>
            {row.getValue() || 0}
          </>
        );
      },
    },
    {
      header: "DDD",
      accessorKey: "ddd",
    },
    {
      header: "Estado",
      accessorKey: "estado.estado",
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
