import { useEffect, useMemo, useRef, useState } from "react";

import masks from "@/utils/masks";
import Table from "@/components/Table";
import { modalRefProps } from "@/components/Modal";
import { ModalCountry } from "@/components/Modal/ModalCountry";
import { ModalConfirmation } from "@/components/Modal/ModalConfirm";
import { CountryProps } from "@/services/countryServices";

import useCountry from "./useCountry";
import { Container } from "./styles";
import { SearchContainer } from "@/components/SearchContainer";
import { TableIconColumn } from "@/pages/shared/iconsTable";
import { FilterList } from "@/utils/shared/FilterList";

export const Country = () => {
  const modalRef = useRef<modalRefProps>(null);
  const modalRemoveRef = useRef<modalRefProps>(null);
  const [selectedCountry, setSelectedCountry] = useState<CountryProps>();
  const [list, setList] = useState<CountryProps[]>([])

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
        cell: (row: any) => {
          return <>{row.getValue() === true ? "Sim" : "Não"}</>;
        },
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
          <TableIconColumn
            handleEdit={() => modalRef.current?.open(row.row.original)}
            handleRemove={() => {
              setSelectedCountry(row.row.original);
              modalRemoveRef.current?.open();
            }}
          />
        ),
      },
    ],
    []
  );
  useEffect(() => {
    countryList && setList(countryList);
  }, [countryList])

  const handleSearch = (e: any) => {
    if (e) {
      const filtered = FilterList(countryList as any, e, ["id", "pais"]);
      setList(filtered || []);
    } else setList(countryList);
  };
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
        <SearchContainer modalRef={modalRef} onSearch={(e) => handleSearch(e)} />
        <Table
          cols={columns}
          data={list || []}
          onOpenRow={(data) => modalRef.current?.open(data)}
        />
      </Container>
    </>
  );
};
