import { useMemo, useRef, useState } from "react";
import { CgTrash } from "react-icons/cg";

import masks from "@/utils/masks";
import Table from "@/components/Table";
import { modalRefProps } from "@/components/Modal";
import { ModalCountry } from "@/components/Modal/ModalCountry";
import { ModalConfirmation } from "@/components/Modal/ModalConfirm";
import { CountryProps } from "@/services/countryServices";

import useCountry from "./useCountry";
import { Container } from "./styles";
import { SearchContainer } from "@/components/SearchContainer";

export const Country = () => {
  const modalRef = useRef<modalRefProps>(null);
  const modalRemoveRef = useRef<modalRefProps>(null);
  const [selectedCountry, setSelectedCountry] = useState<CountryProps>();

  const { countryList, handleRemove } = useCountry(modalRemoveRef);

  const columns = useMemo(
    () => [
      {
        header: "Código",
        accessorKey: "id",
      },
      {
        header: "País",
        accessorKey: "pais",
        cell: (row: any) => {
          return <>{row.getValue() || 0}</>;
        },
      },
      {
        header: "DDI",
        accessorKey: "ddi",
      },
      {
        header: "Sigla",
        accessorKey: "sigla",
      },
      {
        header: "Ativo",
        accessorKey: "ativo",
      },
      {
        header: "Cadastro",
        accessorKey: "dtCadastro",
        cell: (row: any) => {
          return <>{masks.convertToDateString(row.getValue() as string)}</>;
        },
      },
      {
        header: "Última alteração",
        accessorKey: "dtUltAlt",
        meta: { alignText: "center", alignHeader: "center" },
        cell: (row: any) => {
          return <>{masks.convertToDateString(row.getValue() as string)}</>;
        },
      },
      {
        header: "",
        accessorKey: "delete",
        meta: { alignText: "right" },
        cell: (row: any) => (
          <div
            onClick={(e) => {
              e.stopPropagation();
              setSelectedCountry(row.row.original);
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
        title="Remover país"
        message={"Tem certeza que deseja remover este país?"}
        onConfirm={() =>
          selectedCountry?.id && handleRemove(selectedCountry?.id)
        }
      />
      <ModalCountry modalRef={modalRef} />
      <Container>
        <SearchContainer modalRef={modalRef} onSearch={(e) => console.log(e, 'search')} />
        <Table
          cols={columns}
          data={countryList || []}
          onOpenRow={(data) => modalRef.current?.open(data)}
        />
      </Container>
    </>
  );
};
