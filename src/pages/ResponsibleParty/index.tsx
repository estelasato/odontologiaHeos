import { useEffect, useMemo, useRef, useState } from "react";
// import { CgTrash } from "react-icons/cg";

import Table from "@/components/Table";
import { modalRefProps } from "@/components/Modal";
import { SearchContainer } from "@/components/SearchContainer";
import { ModalResponsible } from "@/components/Modal/ModalResponsible";
import { ModalConfirmation } from "@/components/Modal/ModalConfirm";
import masks from "@/utils/masks";
import { Container } from "../Employees/styles";
import { useResponsible } from "./useResponsible";
import { ResponsibleProps } from "@/services/responsiblePartyService";
import { TableIconColumn } from "../shared/iconsTable";
import { FilterList } from "@/utils/shared/FilterList";
interface ResponsiblePartyProps {
  onClickRow?: (data: any) => void;
}

export const ResponsibleParty = ({ onClickRow }: ResponsiblePartyProps) => {
  const modalRef = useRef<modalRefProps>(null);
  const modalRemoveRef = useRef<modalRefProps>(null);

  const { responsibleList, handleRemove, isLoading } =
    useResponsible(modalRemoveRef);

  const [selectData, setSelectData] = useState<ResponsibleProps>();
  const [responsibles, setResponsibles] = useState<ResponsibleProps[]>([]);

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
  };

  useEffect(() => {
    onClickRow && onClickRow(selectData);
  }, [selectData]);

  useEffect(() => {
    responsibleList && setResponsibles(responsibleList);
  }, [responsibleList]);

  const handleSearch = (e: any) => {
    if (e) {
      const filtered = FilterList(responsibleList, e, ["id", "nome"]);
      setResponsibles(filtered || []);
    } else setResponsibles(responsibleList);
  };

  return (
    <Container>
      <ModalConfirmation
        modalRef={modalRemoveRef}
        title="Remover responsável?"
        message={`Tem certeza que deseja remover o ${selectData?.nome || ""}?`}
        onConfirm={() => selectData?.id && handleRemove(selectData?.id)}
      />
      <ModalResponsible modalRef={modalRef} />
      <h1>Responsáveis</h1>
      <SearchContainer modalRef={modalRef} onSearch={(e) => handleSearch(e)} />
      <Table
        isLoading={isLoading}
        cols={columns}
        data={responsibles || []}
        // se esstiver na modal de selecionar responsavel
        onClickRow={onClickRow ? (data) => handleClickRow(data) : undefined}
      />
    </Container>
  );
};
