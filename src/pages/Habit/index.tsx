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

interface HabitProps {
  onClickRow?: (data: any) => void;
}


export const Habit = ({ onClickRow }: HabitProps) => {
  const modalRef = useRef<modalRefProps>(null);
  const modalRemoveRef = useRef<modalRefProps>(null);
  const [selectData, setSelectData] = useState<BasicProps>();
  const [habits, setHabits] = useState<BasicProps[]>([]);

  const { list, handleRemove } = useBasicForm("habit", modalRemoveRef);

  const cols = useMemo(
    () => columnsBasicForm({ setSelectData, modalRef, modalRemoveRef }),
    []
  );

  const handleClickRow = (data?: any) => {
    selectData?.id === data.id ? setSelectData(undefined) : setSelectData(data);
  };

  useEffect(() => {
    onClickRow && onClickRow(selectData);
  }, [selectData]);

  useEffect(() => {
    list && setHabits(list);
  }, [list]);

  const handleSearch = (e: any) => {
    if (e) {
      const filtered = FilterList(list, e, ["id", "nome"]);
      setHabits(filtered || []);
    } else setHabits(list);
  };
  return (
    <Container>
      <ModalConfirmation
        modalRef={modalRemoveRef}
        title="Remover hábito"
        message={`Tem certeza que deseja remover o hábito ${selectData?.nome || ''}?`}
        onConfirm={() => selectData?.id && handleRemove(selectData.id)}
      />
      <ModalBasicForm modalRef={modalRef} type="habit"/>

      <h1>Hábitos</h1>

      <SearchContainer modalRef={modalRef} onSearch={(e) => handleSearch(e)} />
      <Table
        cols={cols}
        data={habits || []}
        onClickRow={onClickRow ? (data) => handleClickRow(data) : undefined}
      />
    </Container>
  )
}
