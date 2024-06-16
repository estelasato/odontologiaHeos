import { CgTrash } from "react-icons/cg";

const columnsBasicForm =
  ({setSelectData, modalRemoveRef}: any) => [
    { header: "Código", accessorKey: "id" },
    {
      header: "Nome",
      accessorKey: "nome",
      cell: (row: any) => {
        return <>{row.getValue() || 0}</>;
      },
    },
    { header: "Ativo", accessorKey: "ativo" },
    {
      header: "",
      accessorKey: "delete",
      meta: { alignText: "right" },
      cell: (row: any) => (
        <div
          onClick={(e) => {
            e.stopPropagation();
            setSelectData(row.row.original);
            modalRemoveRef.current?.open();
          }}
          style={{ paddingRight: "35px", width: "15px", cursor: "pointer" }}
        >
          <CgTrash />
        </div>
      ),
    },
  ];

  export default columnsBasicForm

