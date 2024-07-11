import { useEffect, useMemo, useRef, useState } from "react";

import { modalRefProps } from "@/components/Modal";
import { PatientProps } from "@/services/patientService";
import { ModalConfirmation } from "@/components/Modal/ModalConfirm";
import { SearchContainer } from "@/components/SearchContainer";
import { ModalPatient } from "@/components/Modal/ModalPatient";
import Table from "@/components/Table";
import masks from "@/utils/masks";
import { Container } from "../Employees/styles";
import { usePatient } from "./usePatient";
import { TableIconColumn } from "../shared/iconsTable";
import { FilterList } from "@/utils/shared/FilterList";

export const Patient = () => {
  const modalRef = useRef<modalRefProps>(null);
  const modalRemoveRef = useRef<modalRefProps>(null);
  const [selectData, setSelectData] = useState<PatientProps>();
  const [list, setList] = useState<PatientProps[]>([])

  const { patientList, handleRemove } = usePatient(modalRemoveRef);

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
      {
        header: "Contato",
        accessorKey: "celular",
        cell: (row: any) => {
          const data = row.getValue() as string;
          return masks.cell(data);
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
    ],
    []
  );

  useEffect(() => {
    patientList && setList(patientList);
  }, [patientList])

  const handleSearch = (e: any) => {
    if (e) {
      const filtered = FilterList(patientList as any, e, ["id", "nome"]);
      setList(filtered || []);
    } else setList(patientList);
  };

  return (
    <Container>
      <ModalConfirmation
        modalRef={modalRemoveRef}
        title="Remover paciente?"
        message={`Tem certeza que deseja remover o paciente ${
          selectData?.nome || ""
        }?`}
        onConfirm={() => selectData?.id && handleRemove(selectData?.id)}
      />
      <ModalPatient modalRef={modalRef} />
      <h1>Pacientes</h1>
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
