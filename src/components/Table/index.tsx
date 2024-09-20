import {
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { Empty, TableGrid, Td, Th, Thead, Tr } from "./styles";
import { useState } from "react";
import Spinner from "../Spinner";

declare module "@tanstack/react-table" {
  interface ColumnMeta<TData, TValue> {
    alignHeader?: "right" | "center";
    alignText?: "right" | "center"; // padrão left
    justifyContent?: "right" | "center";
  }
}

export interface TableProps {
  cols: any[];
  isLoading?: boolean;
  data: any[];
  onSort?: (data: any) => void;
  onOpenRow?: (data: any, type?: string) => void;
  dataPagination?: any;
  setPagination?: (page: any) => void;
  numberData?: { rows?: number; columns?: number };
  onClickRow?: (data: any) => void;
  variant?: "default" | "compact";
}

const Table: React.FunctionComponent<TableProps> = ({
  cols,
  isLoading = false,
  data,
  // onSort,
  dataPagination,
  // setPagination,
  // numberData
  variant="default",
  onClickRow,
}) => {
  const [selectedRow, setSelectedRow] = useState(undefined);

  const table = useReactTable({
    data,
    columns: cols,
    state: {
      pagination: {
        pageIndex: dataPagination?.page || 0,
        pageSize: dataPagination?.totalPage || 10,
      },
    },
    manualPagination: true,
    // onPaginationChange: setPagination,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    debugTable: true,
  });

  const handleSelectedRow = (value: any) => {
    selectedRow === value.id
      ? setSelectedRow(undefined)
      : setSelectedRow(value.id);
    onClickRow && onClickRow(value);
  };

  return (
    <div>
      <TableGrid $variant={variant}>
        <Thead>
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => {
                const alignTr = header.column.columnDef.meta?.alignHeader;

                return (
                  <Th key={header.id} $align={alignTr}>
                    {flexRender(
                      header.column.columnDef.header,
                      header.getContext()
                    )}
                  </Th>
                );
              })}
            </tr>
          ))}
        </Thead>
        <tbody>
          {table.getRowModel().rows?.length > 0 &&
            table.getRowModel().rows.map((row) => {
              return (
                <Tr
                  key={row.id}
                  $selected={selectedRow === row.original.id}
                  $hasHover={!onClickRow}
                >
                  {row.getVisibleCells().map((cell) => {
                    const alignTr =
                      cell.column.columnDef.meta?.alignText || "left";
                    return (
                      <Td
                        $alignTr={alignTr}
                        accessKey={`${cell.column.columnDef.header}`}
                        key={cell.id}
                        onClick={() =>
                          onClickRow && handleSelectedRow(cell.row.original)
                        }
                      >
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext()
                        )}
                      </Td>
                    );
                  })}
                </Tr>
              );
            })}
        </tbody>
      </TableGrid>

      {!isLoading && (data?.length === 0 || !data) && (
        <Empty>Nenhum item encontrado</Empty>
      )}
      {isLoading && (
        <Empty>
          <Spinner size={30} />
        </Empty>
      )}
    </div>
  );
};

export default Table;
