import { modalRefProps } from "@/components/Modal";
import { BasicProps } from "@/services/basicServices";
import { useEffect, useMemo, useRef, useState } from "react";
import { useBasicForm } from "../shared/useBasicForm";
import columnsBasicForm from "../shared/basicTableData";
import { Container } from "../Employees/styles";
import { ModalConfirmation } from "@/components/Modal/ModalConfirm";
import { ModalBasicForm } from "@/components/Modal/ModalBasicForm";
import { SearchContainer } from "@/components/SearchContainer";
import Table from "@/components/Table";
import { FilterList } from "@/utils/shared/FilterList";

interface IMedication {
  onClick?: (data: any) => void;
}

export const Medication = ({ onClick }: IMedication) => {
  const modalRef = useRef<modalRefProps>(null);
  const modalRemoveRef = useRef<modalRefProps>(null);
  const [selectData, setSelectData] = useState<BasicProps>();
  const [medications, setMedications] = useState<BasicProps[]>([]);

  const { list, handleRemove } = useBasicForm("medications", modalRemoveRef);

  const cols = useMemo(
    () => columnsBasicForm({ setSelectData, modalRef, modalRemoveRef }),
    []
  );

  const handleClickRow = (data?: any) => {
    selectData?.id === data.id ? setSelectData(undefined) : setSelectData(data);
    onClick && onClick(data?.id ? data : undefined);
  };

  useEffect(() => {
    console.log(list)
    list && setMedications(list);
  }, [list]);

  const handleSearch = (e: any) => {
    if (e) {
      const filtered = FilterList(list, e, ["id", "nome"]);
      setMedications(filtered || []);
    } else setMedications(list);
  };

  return (
    <Container>
      <ModalConfirmation
        modalRef={modalRemoveRef}
        title="Remover medicamento"
        message={"Tem certeza que deseja remover este medicamento?"}
        onConfirm={() => selectData?.id && handleRemove(selectData.id)}
      />
      <ModalBasicForm modalRef={modalRef} type="medications"/>

      <h1>Medicamentos</h1>

      <SearchContainer modalRef={modalRef} onSearch={(e) => handleSearch(e)} />
      <Table
        cols={cols}
        data={medications || []}
        onOpenRow={(data) => modalRef.current?.open(data)}
        onClickRow={handleClickRow}
      />
    </Container>
  )
}
