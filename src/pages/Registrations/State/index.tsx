import { useMemo, useRef, useState } from "react";
import { CgTrash } from "react-icons/cg";

import Table from "@/components/Table";
import { modalRefProps } from "@/components/Modal";
import { StateProps } from "@/services/stateServices";
import { ModalState } from "@/components/Modal/ModalState";
import { ModalConfirmation } from "@/components/Modal/ModalConfirm";

import useStateData from "./useState";
import { Container } from "../Country/styles";
import { SearchContainer } from "@/components/SearchContainer";

export const State = () => {
  const modalRef = useRef<modalRefProps>(null);
  const modalRemoveRef = useRef<modalRefProps>(null);
  const [selectedState, setSelectedState] = useState<StateProps>();

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
      },
      {
        header: "",
        accessorKey: "delete",
        meta: { alignText: "right" },
        cell: (row: any) => (
          <div
            onClick={(e) => {
              e.stopPropagation();
              setSelectedState(row.row.original);
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
        title="Remover estado"
        message={`Deseja realmente remover o estado ${selectedState?.id}?`}
        onConfirm={() => {
          selectedState?.id && handleRemove(selectedState?.id);
        }}
      />
      <ModalState modalRef={modalRef} />
      <SearchContainer
        modalRef={modalRef}
        onSearch={(e) => console.log(e, "search")}
      />

      <Table
        cols={columns}
        data={stateList || []}
        onOpenRow={(data) => modalRef.current?.open(data)}
      />
    </Container>
  );
};
