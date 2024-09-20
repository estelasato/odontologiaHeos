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

export const Treatments = () => {

  const modalRef = useRef<modalRefProps>(null);
  const modalRemoveRef = useRef<modalRefProps>(null);
  const [selectedTreatment, setSelectedTreatment] = useState<TreatmentsProps>();
  const [treatments, setTreatments] = useState<TreatmentsProps[]>([]);

  const { tratmentsList, handleRemove } = useTreatments(modalRemoveRef);

  const columns = useMemo(
    () => [
      {
        header: "Código",
        accessorKey: "id",
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
          return <>{masks.convertToDateString(row.getValue() as string) || '-'}</>;
        },
      },
      {
        header: "Código Anamnese",
        accessorKey: "idAnamnese",
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

  // const handleClickRow = (data?: any) => {
  //   selectedTreatment?.id === data.id
  //     ? setSelectedTreatment(undefined)
  //     : setSelectedTreatment(data);
  // };

  // useEffect(() => {
  //   onClickRow && onClickRow(selectedCity);
  // }, [selectedCity]);

  useEffect(() => {
    tratmentsList && setTreatments(tratmentsList);
  }, [tratmentsList]);

  const handleSearch = (e: any) => {
    if (e) {
      const filtered = FilterList(tratmentsList as any, e, ["id", "idAnamnese", "dataInicio", "dataFim"]);
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
      <ModalTreatment modalRef={modalRef}/>
      <Container>
        <SearchContainer
          // modalRef={modalRef}
          onSearch={(e) => handleSearch(e)}
        />
        <Table
          cols={columns}
          data={treatments || []}
          // onClickRow={(data) => handleClickRow(data)}
          // onClickRow={onClickRow ? (data) => handleClickRow(data) : undefined}
        />
      </Container>
    </>
  );
};
