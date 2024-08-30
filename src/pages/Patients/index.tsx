import { useEffect, useMemo, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

import Table from "@/components/Table";
import { modalRefProps } from "@/components/Modal";
import { PatientProps } from "@/services/patientService";
import { SearchContainer } from "@/components/SearchContainer";
import { ModalConfirmation } from "@/components/Modal/ModalConfirm";

import masks from "@/utils/masks";
import { FilterList } from "@/utils/shared/FilterList";
import { Container } from "../Employees/styles";
import { usePatient } from "./usePatient";
import { TableIconColumn } from "../shared/iconsTable";

interface PatientTypes {
  onClick?: (data: any) => void;
}

export const Patients = ({ onClick }: PatientTypes ) => {
  const modalRemoveRef = useRef<modalRefProps>(null);

  const [selectData, setSelectData] = useState<PatientProps>();
  const [list, setList] = useState<PatientProps[]>([])

  const { patientList, handleRemove } = usePatient(modalRemoveRef);

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
            handleEdit={() => navigate(`/patient/${row.row.original.id}`)}
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
    onClick && onClick(selectData);
  };

  useEffect(() => {
    onClick && onClick(selectData);
  }, [selectData]);

  useEffect(() => {
    patientList && setList(patientList);
  }, [patientList])

  const handleSearch = (e: any) => {
    if (e) {
      const filtered = FilterList(patientList as any, e, ["id", "nome"]);
      setList(filtered || []);
    } else setList(patientList);
  };

  const navigate = useNavigate();
  return (
    <Container>
      <ModalConfirmation
        modalRef={modalRemoveRef}
        title="Remover paciente?"
        message={`Tem certeza que deseja remover o paciente ${
          selectData?.nome || ""
        }?`}
        onConfirm={() => selectData?.id && handleRemove(selectData?.id)}
      />
      {/* <ModalPatient modalRef={modalRef} /> */}
      <h1>Pacientes</h1>
      <SearchContainer
        onClick={() => navigate('/patient')}
        onSearch={(e) => handleSearch(e)}
      />
      <Table
        cols={columns}
        data={list || []}
        // onOpenRow={(data) => navigate(`/patient/${data.id}`)}
        onClickRow={(data) => onClick ?  handleClickRow(data) : navigate(`/patient/${data.id}`)}
      />
    </Container>
  );
};
