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

export const Allergy = () => {
  const modalRef = useRef<modalRefProps>(null);
  const modalRemoveRef = useRef<modalRefProps>(null);
  const [selectData, setSelectData] = useState<BasicProps>();
  const [allergies, setAllergies] = useState<BasicProps[]>([])
  const { list, handleRemove } = useBasicForm("allergy", modalRemoveRef);

  const cols = useMemo(
    () => columnsBasicForm({ setSelectData, modalRef, modalRemoveRef }),
    []
  );

  useEffect(() => {
    list && setAllergies(list);
  }, [list]);

  const handleSearch = (e: any) => {
    if (e) {
      const filtered = FilterList(list, e, ["id", "nome"]);
      setAllergies(filtered || []);
    } else setAllergies(list);
  };

  return (
    <Container>
      <ModalConfirmation
        modalRef={modalRemoveRef}
        title="Remover alergia"
        message={"Tem certeza que deseja remover esta alergia?"}
        onConfirm={() => selectData?.id && handleRemove(selectData.id)}
      />
      <ModalBasicForm modalRef={modalRef} type="allergy"/>

      <h1>Alergias</h1>

      <SearchContainer modalRef={modalRef} onSearch={(e) => handleSearch(e)} />
      <Table
        cols={cols}
        data={allergies || []}
        onOpenRow={(data) => modalRef.current?.open(data)}
      />
    </Container>
  )
}
