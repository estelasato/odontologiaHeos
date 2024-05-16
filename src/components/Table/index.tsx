import {
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { TableGrid, Td, Th, Thead, Tr } from "./styles";

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
}

const Table: React.FunctionComponent<TableProps> = ({
  cols,
  // isLoading = false,
  data,
  // onSort,
  onOpenRow,
  dataPagination,
  // setPagination,
  // numberData
}) => {
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

  return (
    <div>
      <TableGrid>
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
                <Tr key={row.id}>
                  {row.getVisibleCells().map((cell) => {
                    const alignTr =
                      cell.column.columnDef.meta?.alignText || "left";
                    return (
                      <Td
                        $alignTr={alignTr}
                        accessKey={`${cell.column.columnDef.header}`}
                        key={cell.id}
                        onClick={() =>
                          onOpenRow && onOpenRow(cell.row.original)
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
    </div>
  );
};

export default Table;
