import { useEffect, useMemo, useRef, useState } from "react";

import Table from "@/components/Table";
import { modalRefProps } from "@/components/Modal";
import { ModalCity } from "@/components/Modal/ModalCity";
import { ModalConfirmation } from "@/components/Modal/ModalConfirm";
import { CityProps } from "@/services/cityServices";

import useCity from "./useCity";
import { Container } from "../Country/styles";
import { SearchContainer } from "@/components/SearchContainer";
import { TableIconColumn } from "@/pages/shared/iconsTable";
import { FilterList } from "@/utils/shared/FilterList";

interface CityTypes {
  onClickRow?: (data: any) => void;
}

export const City = ({ onClickRow }: CityTypes) => {
  const modalRef = useRef<modalRefProps>(null);
  const modalRemoveRef = useRef<modalRefProps>(null);
  const [selectedCity, setSelectedCity] = useState<CityProps>();
  const [cities, setCities] = useState<CityProps[]>([]);

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
              setSelectedCity(row.row.original);
              modalRemoveRef.current?.open();
            }}
          />
        ),
      },
    ],
    []
  );

  const handleClickRow = (data?: any) => {
    selectedCity?.id === data.id ? setSelectedCity(undefined) : setSelectedCity(data);
  };


  useEffect(() => {
    onClickRow && onClickRow(selectedCity);
  }, [selectedCity]);

  useEffect(() => {
    cityList && setCities(cityList);
  }, [cityList]);

  const handleSearch = (e: any) => {
    if (e) {
      const filtered = FilterList(cityList as any, e, ["id", "cidade"]);
      setCities(filtered || []);
    } else setCities(cityList);
  };
  return (
    <>
      <ModalConfirmation
        modalRef={modalRemoveRef}
        title="Remover cidade"
        message={"Tem certeza que deseja remover esta cidade?"}
        onConfirm={() => selectedCity?.id && handleRemove(selectedCity?.id)}
      />
      <Container>
        <ModalCity modalRef={modalRef} />
        <SearchContainer
          modalRef={modalRef}
          onSearch={(e) => handleSearch(e)}
        />
        <Table
          cols={columns}
          data={cities || []}
          onClickRow={onClickRow ? (data) => handleClickRow(data) : undefined}
        />
      </Container>
    </>
  );
};
