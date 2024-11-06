import { modalRefProps } from "@/components/Modal";
import { BasicProps } from "@/services/basicServices";
import { useEffect, useMemo, useRef, useState } from "react";
import { Container } from "../Employees/styles";
import { ModalConfirmation } from "@/components/Modal/ModalConfirm";
import { SearchContainer } from "@/components/SearchContainer";
import Table from "@/components/Table";
import { ModalProcedures } from "@/components/Modal/ModalProcedures";
import { useProcedures } from "./useProcedures";
import { TableIconColumn } from "../shared/iconsTable";
import { FilterList } from "@/utils/shared/FilterList";
import masks from "@/utils/masks";

interface IMedication {
  onClick?: (data: any) => void;
}

export const Procedures = ({ onClick }: IMedication) => {
  const modalRef = useRef<modalRefProps>(null);
  const modalRemoveRef = useRef<modalRefProps>(null);
  const [selectData, setSelectData] = useState<BasicProps>();
  const [list, setList] = useState<BasicProps[]>([])
  const { proceduresList, handleRemove } = useProcedures(modalRemoveRef);

  const cols = useMemo(
    () => [
      {
        header: 'Código',
        accessorKey: 'id',
      },
      {
        header: 'Nome',
        accessorKey: 'nome',
      },
      {
        header: "Valor",
        accessorKey: "valor",
        cell: (row: any) => {
          const result = row.getValue() as number
          return <>{masks.currencyAllPlatforms(`${result}`)}</>;
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

  const handleClickRow = (data?: any) => {
    selectData?.id === data.id ? setSelectData(undefined) : setSelectData(data);
    onClick && onClick(data?.id ? data : undefined);
  };

  useEffect(() => {
    proceduresList && setList(proceduresList);
  }, [proceduresList]);

  const handleSearch = (e: any) => {
    if (e) {
      const filtered = FilterList(proceduresList, e, ["id", "nome"]);
      setList(filtered || []);
    } else setList(proceduresList);
  };

  return (
    <Container>
      <ModalConfirmation
        modalRef={modalRemoveRef}
        title="Remover procedimento"
        message={"Tem certeza que deseja remover este procedimento?"}
        onConfirm={() => selectData?.id && handleRemove(selectData.id)}
      />
      <ModalProcedures modalRef={modalRef} />

      <SearchContainer modalRef={modalRef} onSearch={(e) => handleSearch(e)} />
      <Table
        cols={cols}
        data={list || []}
        onOpenRow={(data) => modalRef.current?.open(data)}
        onClickRow={handleClickRow}
      />
    </Container>
  )
}
