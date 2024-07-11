import { useEffect, useMemo, useRef, useState } from "react";

import Table from "@/components/Table";
import { modalRefProps } from "@/components/Modal";
import { StateProps } from "@/services/stateServices";
import { ModalState } from "@/components/Modal/ModalState";
import { ModalConfirmation } from "@/components/Modal/ModalConfirm";

import useStateData from "./useState";
import { Container } from "../Country/styles";
import { SearchContainer } from "@/components/SearchContainer";
import { TableIconColumn } from "@/pages/shared/iconsTable";
import { FilterList } from "@/utils/shared/FilterList";

export const State = () => {
  const modalRef = useRef<modalRefProps>(null);
  const modalRemoveRef = useRef<modalRefProps>(null);
  const [selectedState, setSelectedState] = useState<StateProps>();
  const [states, setStates] = useState<StateProps[]>([]);
  const { stateList, handleRemove } = useStateData(modalRemoveRef);

  const columns = useMemo(
    () => [
      {
        header: "Código",
        accessorKey: "id",
      },
      {
        header: "Estado",
        accessorKey: "estado",
        cell: (row: any) => {
          return <>{row.getValue() || 0}</>;
        },
      },
      {
        header: "UF",
        accessorKey: "uf",
      },
      {
        header: "País",
        accessorKey: "pais.pais",
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
              setSelectedState(row.row.original);
              modalRemoveRef.current?.open();
            }}
          />
        ),
      },
    ],
    []
  );
  useEffect(() => {
    stateList && setStates(stateList);
  }, [stateList])

  const handleSearch = (e: any) => {
    if (e) {
      const filtered = FilterList(stateList as any, e, ["id", "estado"]);
      setStates(filtered || []);
    } else setStates(stateList);
  };

  return (
    <Container>
      <ModalConfirmation
        modalRef={modalRemoveRef}
        title="Remover estado"
        message={`Deseja realmente remover o estado ${selectedState?.id}?`}
        onConfirm={() => {
          selectedState?.id && handleRemove(selectedState?.id);
        }}
      />
      <ModalState modalRef={modalRef} />
      <SearchContainer
        modalRef={modalRef}
        onSearch={(e) => handleSearch(e)}
      />

      <Table
        cols={columns}
        data={states || []}
        onOpenRow={(data) => modalRef.current?.open(data)}
      />
    </Container>
  );
};
