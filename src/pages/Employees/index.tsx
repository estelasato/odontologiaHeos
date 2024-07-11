import { useEffect, useMemo, useRef, useState } from "react";

import Table from "@/components/Table";
import { SearchContainer } from "@/components/SearchContainer";
import { modalRefProps } from "@/components/Modal";
import { ModalEmployee } from "@/components/Modal/ModalEmployee";
import { EmployeeProps } from "@/services/employeeServices";

import { useEmployee } from "./useEmployee";
import { Container } from "./styles";
import { ModalConfirmation } from "@/components/Modal/ModalConfirm";
import masks from "@/utils/masks";
import { TableIconColumn } from "../shared/iconsTable";
import { FilterList } from "@/utils/shared/FilterList";

export const Employees = () => {
  const modalRef = useRef<modalRefProps>(null);
  const modalRemoveRef = useRef<modalRefProps>(null);
  const [selectEmployee, setSelectEmployee] = useState<EmployeeProps>();
  const [list, setList] = useState<EmployeeProps[]>([])
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
              setSelectEmployee(row.row.original);
              modalRemoveRef.current?.open();
            }}
          />
        ),
      },
    ],
    []
  );

  useEffect(() => {
    employeeList && setList(employeeList);
  }, [employeeList]);

  const handleSearch = (e: any) => {
    if (e) {
      const filtered = FilterList(list, e, ["id", "nome"]);
      setList(filtered || []);
    } else setList(employeeList);
  };
  return (
    <Container>
      <ModalConfirmation
        modalRef={modalRemoveRef}
        title="Remover funcionário"
        message={`Tem certeza que deseja remover o funcionário ${selectEmployee?.nome || ''}?`}        onConfirm={() =>
          selectEmployee?.id && handleRemove(selectEmployee?.id)
        }
      />
      <ModalEmployee modalRef={modalRef} />
      <h1>Funcionários</h1>
      <SearchContainer
        modalRef={modalRef}
        onSearch={(e) => handleSearch(e)}
      />
      <Table
        cols={columns}
        data={list || []}
        onOpenRow={(data) => modalRef.current?.open(data)}
      />
    </Container>
  );
};
