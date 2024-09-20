import { useEffect, useMemo, useRef, useState } from "react";

import Table from "@/components/Table";
import { modalRefProps } from "@/components/Modal";
import { ModalConfirmation } from "@/components/Modal/ModalConfirm";

import { SearchContainer } from "@/components/SearchContainer";
import { TableIconColumn } from "@/pages/shared/iconsTable";
import { FilterList } from "@/utils/shared/FilterList";
import { useAnamnesis } from "./useAnamnesis";
import masks from "@/utils/masks";
import { Container } from "@/pages/Employees/styles";
import { ModalAnamnesis } from "@/components/Modal/ModalAnamnesis";
import { AnamnesisProps } from "@/services/anamnesisService";

interface AnamnesisType {
  onClickRow?: (data: any) => void;
}

export const Anamnesis = ({ onClickRow }: AnamnesisType) => {
  const modalRef = useRef<modalRefProps>(null);
  const modalRemoveRef = useRef<modalRefProps>(null);
  const [selectedAnamnesis, setSelectedAnamnesis] = useState<AnamnesisProps>();
  const [anamnesis, setAnamnesis] = useState<AnamnesisProps[]>([]);

  const { anamnesisList, handleRemove } = useAnamnesis(modalRemoveRef);

  const columns = useMemo(
    () => [
      {
        header: "Código",
        accessorKey: "id",
      },
      {
        header: "Queixas",
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

  const handleClickRow = (data?: any) => {
    selectedAnamnesis?.id === data.id
      ? setSelectedAnamnesis(undefined)
      : setSelectedAnamnesis(data);
  };

  useEffect(() => {
    onClickRow && onClickRow(selectedAnamnesis);
  }, [selectedAnamnesis]);

  useEffect(() => {
    anamnesisList && setAnamnesis(anamnesisList);
  }, [anamnesisList]);

  const handleSearch = (e: any) => {
    if (e) {
      const filtered = FilterList(anamnesisList as any, e, ["id", "createdAt"]);
      setAnamnesis(filtered || []);
    } else setAnamnesis(anamnesisList);
  };

  return (
    <>
      <ModalConfirmation
        modalRef={modalRemoveRef}
        title="Remover anamnese"
        message={"Tem certeza que deseja remover esta anamnese?"}
        onConfirm={() =>
          selectedAnamnesis?.id && handleRemove(selectedAnamnesis?.id)
        }
      />
      <Container>
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
