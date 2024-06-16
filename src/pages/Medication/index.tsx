import { modalRefProps } from "@/components/Modal";
import { BasicProps } from "@/services/basicServices";
import { useMemo, useRef, useState } from "react";
import { useBasicForm } from "../shared/useBasicForm";
import columnsBasicForm from "../shared/basicTableData";
import { Container } from "../Employees/styles";
import { ModalConfirmation } from "@/components/Modal/ModalConfirm";
import { ModalBasicForm } from "@/components/Modal/ModalBasicForm";
import { SearchContainer } from "@/components/SearchContainer";
import Table from "@/components/Table";


export const Medication = () => {
  const modalRef = useRef<modalRefProps>(null);
  const modalRemoveRef = useRef<modalRefProps>(null);
  const [selectData, setSelectData] = useState<BasicProps>();

  const { list, handleRemove } = useBasicForm("medication", modalRemoveRef);

  const cols = useMemo(
    () => columnsBasicForm({ setSelectData, modalRemoveRef }),
    []
  );

  return (
    <Container>
      <ModalConfirmation
        modalRef={modalRemoveRef}
        title="Remover medicamento"
        message={"Tem certeza que deseja remover este medicamento?"}
        onConfirm={() => selectData?.id && handleRemove(selectData.id)}
      />
      <ModalBasicForm modalRef={modalRef} type="medication"/>

      <h1>Doenças</h1>

      <SearchContainer modalRef={modalRef} onSearch={(e) => console.log(e)} />
      <Table
        cols={cols}
        data={list || []}
        onOpenRow={(data) => modalRef.current?.open(data)}
      />
    </Container>
  )
}
