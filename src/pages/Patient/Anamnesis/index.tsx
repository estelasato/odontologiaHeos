import { useMemo, useRef } from "react";

import Table from "@/components/Table";
import { ModalMessage } from "@/components/Modal/ModalMessage";
import { modalRefProps } from "@/components/Modal";
import { ModalAnamnesis } from "@/components/Modal/ModalAnamnesis";
import { ModalConfirmation } from "@/components/Modal/ModalConfirm";

import { SearchContainer } from "@/components/SearchContainer";
import { TableIconColumn } from "@/pages/shared/iconsTable";
import { useAnamnesis } from "./useAnamnesis";
import masks from "@/utils/masks";
// import { Container } from "./styles";
import { Container } from "@/pages/Employees/styles";

interface AnamnesisType {
  onClickRow?: (data: any) => void;
}

export const Anamnesis = ({ onClickRow }: AnamnesisType) => {
  const modalRef = useRef<modalRefProps>(null);
  const modalRemoveRef = useRef<modalRefProps>(null);
  const modalMessageRef = useRef<modalRefProps>(null);

  const {
    handleRemove,
    handleClickRow,
    handleSearch,
    anamnesis,
    setSelectedAnamnesis,
    selectedAnamnesis,
    hasTreatments,
    message,
  } = useAnamnesis(modalRemoveRef, onClickRow);

  const columns = useMemo(
    () => [
      {
        header: "Código",
        accessorKey: "id",
      },
      {
        header: "Descrição",
        accessorKey: "queixas",
        cell: (row: any) => {
          return <>{row.getValue() || 0}</>;
        },
      },
      {
        header: "Data de criação",
        accessorKey: "dtCadastro",
        cell: (row: any) => {
          return <>{masks.convertToDateString(row.getValue() as string)}</>;
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
              setSelectedAnamnesis(row.row.original);
              modalRemoveRef.current?.open();
            }}
          />
        ),
      },
    ],
    []
  );

  const onRemove = () => {
    if (selectedAnamnesis?.id) {
      const list = hasTreatments(selectedAnamnesis.id);
      if (list.length > 0) {
        modalMessageRef.current?.open();
        modalRemoveRef.current?.close();
      } else {
        handleRemove(selectedAnamnesis.id);
      }
    }
  };

  return (
    <>
      <Container>
        <ModalMessage
          modalRef={modalMessageRef}
          title="Não é possível excluir anamnese"
          message={message}
        />
        <ModalConfirmation
          modalRef={modalRemoveRef}
          title="Remover anamnese"
          message={"Tem certeza que deseja remover esta anamnese?"}
          onConfirm={() => onRemove()}
        />
        <ModalAnamnesis modalRef={modalRef} />
        <SearchContainer
          modalRef={modalRef}
          onSearch={(e) => handleSearch(e)}
        />
        <Table
          cols={columns}
          data={anamnesis || []}
          onClickRow={onClickRow ? (data) => handleClickRow(data) : undefined}
        />
      </Container>
    </>
  );
};
