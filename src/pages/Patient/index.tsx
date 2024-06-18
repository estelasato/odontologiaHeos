import { useMemo, useRef, useState } from "react";
import { CgTrash } from "react-icons/cg";

import { modalRefProps } from "@/components/Modal";
import { PatientProps } from "@/services/patientService";
import { ModalConfirmation } from "@/components/Modal/ModalConfirm";
import { SearchContainer } from "@/components/SearchContainer";
import { ModalPatient } from "@/components/Modal/ModalPatient";
import Table from "@/components/Table";
import masks from "@/utils/masks";
import { Container } from "../Employees/styles";
import { usePatient } from "./usePatient";

export const Patient = () => {
  const modalRef = useRef<modalRefProps>(null);
  const modalRemoveRef = useRef<modalRefProps>(null);
  const [selectData, setSelectData] = useState<PatientProps>();

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
    ],
    []
  );

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
        onSearch={(e) => console.log(e, "search")}
      />
      <Table
        cols={columns}
        data={patientList || []}
        onOpenRow={(data) => modalRef.current?.open(data)}
      />
    </Container>
  );
};
