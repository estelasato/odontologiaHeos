import { useMemo, useRef, useState } from "react";
import { CgTrash } from "react-icons/cg";

import Table from "@/components/Table";
import { modalRefProps } from "@/components/Modal";
import { SearchContainer } from "@/components/SearchContainer";
import { ModalResponsible } from "@/components/Modal/ModalResponsible";
import { ModalConfirmation } from "@/components/Modal/ModalConfirm";
import masks from "@/utils/masks";
import { Container } from "../Employees/styles";
import { useResponsible } from "./useResponsible";
import { ResponsibleProps } from "@/services/responsiblePartyService";

export const ResponsibleParty = () => {
  const modalRef = useRef<modalRefProps>(null);
  const modalRemoveRef = useRef<modalRefProps>(null);
  const [selectData, setSelectData] = useState<ResponsibleProps>();

  const { responsibleList, handleRemove } = useResponsible(modalRemoveRef);

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
        title="Remover responsável?"
        message={`Tem certeza que deseja remover o responsável ${
          selectData?.nome || ""
        }?`}
        onConfirm={() => selectData?.id && handleRemove(selectData?.id)}
      />
      <ModalResponsible modalRef={modalRef} />
      <h1>Responsáveis</h1>
      <SearchContainer
        modalRef={modalRef}
        onSearch={(e) => console.log(e, "search")}
      />
      <Table
        cols={columns}
        data={responsibleList || []}
        onOpenRow={(data) => modalRef.current?.open(data)}
      />
    </Container>
  );
}
