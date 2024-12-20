import { useEffect, useMemo, useRef, useState } from "react";

import Table from "@/components/Table";
import { modalRefProps } from "@/components/Modal";
import { ModalConfirmation } from "@/components/Modal/ModalConfirm";

import { SearchContainer } from "@/components/SearchContainer";
import { TableIconColumn } from "@/pages/shared/iconsTable";
import { FilterList } from "@/utils/shared/FilterList";

import masks from "@/utils/masks";
import { Container } from "@/pages/Employees/styles";

import { useTreatments } from "./useTreatments";
import { TreatmentsProps } from "@/services/treatmentsServices";
import { ModalTreatment } from "@/components/Modal/ModalTreatment";
import { toothsOptions } from "@/utils/toothsOptions";

interface ITreatmentsProps {
  onClickRow?: (data: any) => void;
}

export const Treatments = ({ onClickRow }: ITreatmentsProps) => {
  const modalRef = useRef<modalRefProps>(null);
  const modalRemoveRef = useRef<modalRefProps>(null);
  const [selectedTreatment, setSelectedTreatment] = useState<TreatmentsProps>();
  const [treatments, setTreatments] = useState<TreatmentsProps[]>([]);

  const { tratmentsList, handleRemove, isLoading } =
    useTreatments(modalRemoveRef);

  const columns = useMemo(
    () => [
      {
        header: "Código",
        accessorKey: "id",
      },
      {
        header: "Descrição",
        accessorKey: "descricao",
        cell: (row: any) => {
          const value = row.getValue() as string;
          return <div style={{
            maxWidth: "200px",
            overflow: "hidden",
            textOverflow: "ellipsis",
            whiteSpace: "nowrap",
          }}>{value}</div>;
        },
      },
      {
        header: "Data de início",
        accessorKey: "dataInicio",
        cell: (row: any) => {
          return <>{masks.convertToDateString(row.getValue() as string)}</>;
        },
      },
      {
        header: "Data de término",
        accessorKey: "dataFim",
        cell: (row: any) => {
          const data = row.getValue() as string;
          return <>{data ? masks.convertToDateString(data) : "-"}</>;
        },
      },
      {
        header: "Dente",
        accessorKey: "dente",
        cell: (row: any) => {
          const v = row.getValue()
          const obj = toothsOptions?.find((t) => t.value == v)
          return <div>{obj?.label || '-'}</div>
        }
      },
      {
        header: "",
        accessorKey: "delete",
        meta: { alignText: "right" },
        cell: (row: any) => (
          <TableIconColumn
            handleEdit={() => modalRef.current?.open(row.row.original)}
            handleRemove={() => {
              setSelectedTreatment(row.row.original);
              modalRemoveRef.current?.open();
            }}
          />
        ),
      },
    ],
    []
  );

  const handleClickRow = (data?: any) => {
    selectedTreatment?.id === data.id
      ? setSelectedTreatment(undefined)
      : setSelectedTreatment(data);
  };

  useEffect(() => {
    onClickRow && onClickRow(selectedTreatment);
  }, [selectedTreatment]);

  useEffect(() => {
    tratmentsList && setTreatments(tratmentsList);
  }, [tratmentsList]);

  const handleSearch = (e: any) => {
    if (e) {
      const filtered = FilterList(tratmentsList as any, e, [
        "id",
        "descricao",
        "idAnamnese",
        "dataInicio",
        "dataFim",
      ]);
      setTreatments(filtered || []);
    } else setTreatments(tratmentsList);
  };

  return (
    <>
      <ModalConfirmation
        modalRef={modalRemoveRef}
        title="Remover tratamento"
        message={"Tem certeza que deseja remover este tratamento?"}
        onConfirm={() =>
          selectedTreatment?.id && handleRemove(selectedTreatment?.id)
        }
      />
      {/* <ModalProfessional modalRef={modalRef} /> */}
      <ModalTreatment modalRef={modalRef} />
      <Container>
        <SearchContainer
          // modalRef={modalRef}
          onSearch={(e) => handleSearch(e)}
          onClick={() => modalRef.current?.open()}
        />
        <Table
          isLoading={isLoading}
          cols={columns}
          data={treatments || []}
          // onClickRow={(data) => handleClickRow(data)}
          onClickRow={onClickRow ? (data) => handleClickRow(data) : undefined}
        />
      </Container>
    </>
  );
};
