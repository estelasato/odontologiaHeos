import { useMemo, useRef, useState } from "react";
import { CgTrash } from "react-icons/cg";

import Table from "@/components/Table";
import { Button } from "@/components/Button";
import { modalRefProps } from "@/components/Modal";
import { ModalCity } from "@/components/Modal/ModalCity";
import { ModalConfirmation } from "@/components/Modal/ModalConfirm";
import { CityProps } from "@/services/cityServices";

import useCity from "./useCity";
import { Container } from "../Country/styles";

export const City = () => {
  const modalRef = useRef<modalRefProps>(null);
  const modalRemoveRef = useRef<modalRefProps>(null);
  const [selectedCity, setSelectedCity] = useState<CityProps>();

  const { cityList, handleRemove } = useCity(modalRemoveRef);

  const columns = useMemo(
    () => [
      {
        header: "Código",
        accessorKey: "id",
      },
      {
        header: "Cidade",
        accessorKey: "cidade",
        cell: (row: any) => {
          return <>{row.getValue() || 0}</>;
        },
      },
      {
        header: "DDD",
        accessorKey: "ddd",
      },
      {
        header: "Estado",
        accessorKey: "estado.estado",
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
              setSelectedCity(row.row.original);
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
    <>
      <ModalConfirmation
        modalRef={modalRemoveRef}
        title="Remover cidade"
        message={"Tem certeza que deseja remover esta cidade?"}
        onConfirm={() =>
          selectedCity?.id && handleRemove(selectedCity?.id)
        }
      />
      <Container>
        <ModalCity modalRef={modalRef} />
        <Table
          cols={columns}
          data={cityList || []}
          onOpenRow={(e) => modalRef.current?.open(e)}
        />
        <Button variant="link" onClick={() => modalRef?.current?.open()}>
          + Adicionar
        </Button>
      </Container>
    </>
  );
};
