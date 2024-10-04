import { useEffect, useMemo, useRef, useState } from "react";

import Table from "@/components/Table";
import { modalRefProps } from "@/components/Modal";
import { SearchContainer } from "@/components/SearchContainer";
import { ModalConfirmation } from "@/components/Modal/ModalConfirm";
import masks from "@/utils/masks";
import { Container } from "../Employees/styles";

import { ResponsibleProps } from "@/services/responsiblePartyService";
import { useProfessional } from "./useProfessional";
import { ModalProfessional } from "@/components/Modal/ModalProfessional";
import { TableIconColumn } from "../shared/iconsTable";
import { FilterList } from "@/utils/shared/FilterList";

interface ProfessionalProps {
  onClick?: (data: any) => void;
}

export const Professional = ({ onClick }: ProfessionalProps) => {
  const modalRef = useRef<modalRefProps>(null);
  const modalRemoveRef = useRef<modalRefProps>(null);

  const { professionalList, handleRemove } = useProfessional(modalRemoveRef);

  const [selectData, setSelectData] = useState<ResponsibleProps>();
  const [professionals, setProfessionals] = useState<ResponsibleProps[]>([]);


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
    onClick && onClick(selectData);
  }, [selectData]);

  useEffect(() => {
    professionalList && setProfessionals(professionalList);
  }, [professionalList]);

  const handleSearch = (e: any) => {
    if (e) {
      const filtered = FilterList(professionalList as any, e, ["id", "nome"]);
      setProfessionals(filtered || []);
    } else setProfessionals(professionalList);
  };


  return (
    <Container>
      <ModalConfirmation
        modalRef={modalRemoveRef}
        title="Remover profissional?"
        message={`Tem certeza que deseja remover ${
          selectData?.nome || ""
        }?`}
        onConfirm={() => selectData?.id && handleRemove(selectData?.id)}
      />
      <ModalProfessional modalRef={modalRef} />
      <h1>Profissionais</h1>
      <SearchContainer
        modalRef={modalRef}
        onSearch={(e) => handleSearch(e)}
      />
      <Table
        cols={columns}
        data={professionals || []}
        onClickRow={onClick ? (data) => handleClickRow(data) : undefined}

      />
    </Container>
  );
}
