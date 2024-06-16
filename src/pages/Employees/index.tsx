import { useMemo, useRef, useState } from "react";
import { CgTrash } from "react-icons/cg";

import Table from "@/components/Table";
import { SearchContainer } from "@/components/SearchContainer";
import { modalRefProps } from "@/components/Modal";
import { ModalEmployee } from "@/components/Modal/ModalEmployee";
import { EmployeeProps } from "@/services/employeeServices";

import { useEmployee } from "./useEmployee";
import { Container } from "./styles";
import { ModalConfirmation } from "@/components/Modal/ModalConfirm";
import masks from "@/utils/masks";

export const Employees = () => {
  const modalRef = useRef<modalRefProps>(null);
  const modalRemoveRef = useRef<modalRefProps>(null);
  const [selectEmployee, setSelectEmployee] = useState<EmployeeProps>();

  const { employeeList, handleRemove } = useEmployee(modalRemoveRef);

  const columns = useMemo(
    () => [
      { header: "Código", accessorKey: "id" },
      {
        header: "Nome",
        accessorKey: "nome",
        cell: (row: any) => {
          return <>{row.getValue() || 0}</>;
        },
      },
      { header: "Cargo", accessorKey: "cargo" },
      {
        header: "Contato",
        accessorKey: "celular",
        cell: (row: any) => {
          const data = row.getValue() as string;
          return masks.cell(data)
        }
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
              setSelectEmployee(row.row.original);
              modalRemoveRef.current?.open();
            }}
            style={{ paddingRight: "35px", width: "15px", cursor: "pointer" }}
          >
            <CgTrash />
          </div>
        ),
      },
    ],
    []
  );

  return (
    <Container>
      <ModalConfirmation
        modalRef={modalRemoveRef}
        title="Remover funcionário"
        message={"Tem certeza que deseja remover este funcionário?"}
        onConfirm={() =>
          selectEmployee?.id && handleRemove(selectEmployee?.id)
        }
      />
      <ModalEmployee modalRef={modalRef} />
      <h1>Funcionários</h1>
      <SearchContainer
        modalRef={modalRef}
        onSearch={(e) => console.log(e, "search")}
      />
      <Table
        cols={columns}
        data={employeeList || []}
        onOpenRow={(data) => modalRef.current?.open(data)}
      />
    </Container>
  );
};
