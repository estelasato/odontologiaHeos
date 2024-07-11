import { useMemo, useRef, useState } from "react";

import Table from "@/components/Table";
import { modalRefProps } from "@/components/Modal";
import { SearchContainer } from "@/components/SearchContainer";
import { ModalConfirmation } from "@/components/Modal/ModalConfirm";
import masks from "@/utils/masks";
import { Container } from "../Employees/styles";

import { ResponsibleProps } from "@/services/responsiblePartyService";
import { useProfessional } from "./useProfessional";
import { ModalProfessional } from "@/components/Modal/ModalProfessional";
import { TableIconColumn } from "../shared/iconsTable";

export const Professional = () => {
  const modalRef = useRef<modalRefProps>(null);
  const modalRemoveRef = useRef<modalRefProps>(null);
  const [selectData, setSelectData] = useState<ResponsibleProps>();

  const { professionalList, handleRemove } = useProfessional(modalRemoveRef);

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

  return (
    <Container>
      <ModalConfirmation
        modalRef={modalRemoveRef}
        title="Remover profissional?"
        message={`Tem certeza que deseja remover ${
          selectData?.nome || ""
        }?`}
        onConfirm={() => selectData?.id && handleRemove(selectData?.id)}
      />
      <ModalProfessional modalRef={modalRef} />
      <h1>Profissionais</h1>
      <SearchContainer
        modalRef={modalRef}
        onSearch={(e) => console.log(e, "search")}
      />
      <Table
        cols={columns}
        data={professionalList || []}
        onOpenRow={(data) => modalRef.current?.open(data)}
      />
    </Container>
  );
}
