import { TableIconColumn } from "./iconsTable";

const columnsBasicForm = ({ setSelectData, modalRef, modalRemoveRef }: any) => [
  { header: "Código", accessorKey: "id" },
  {
    header: "Nome",
    accessorKey: "nome",
    cell: (row: any) => {
      return <>{row.getValue() || 0}</>;
    },
  },
  {
    header: "Ativo",
    accessorKey: "ativo",
    cell: (row: any) => {
      return <>{row.getValue() === true ? "Sim" : "Não"}</>;
    },
  },
  {
    header: "",
    accessorKey: "delete",
    meta: { alignText: "right" },
    cell: (row: any) => (
      <TableIconColumn
        handleEdit={() => modalRef.current?.open(row.row.original)}
        handleRemove={() => {
          setSelectData(row.row.original);
          modalRemoveRef.current?.open();
        }}
      />
    ),
  },
];

export default columnsBasicForm;
