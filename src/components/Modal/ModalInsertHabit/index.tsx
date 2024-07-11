import { RefObject, useState } from "react";
import { toast } from "react-toastify";

import Modal from ".."
import { Button } from "@/components/Button";
import { Habit } from "@/pages/Habit";
import { ResponsibleProps } from "@/services/responsiblePartyService";
import { Container } from "./styles";

interface ModalInsertHabitProps {
  modalRef: RefObject<any>;
  selectData: (data: ResponsibleProps) => void;
}
export const ModalInsertHabit = ({ modalRef, selectData }: ModalInsertHabitProps) => {
  const [data, setData] = useState<ResponsibleProps | undefined>();

  const handleSelect = () => {
    if (data) {
      selectData(data)
    } else toast.error('Selecione um hábito')
  }

  return (
    <Modal ref={modalRef} width="90%">
      <Container>
        <Habit onClickRow={(e) => setData(e)}/>
        <Button className="select-btn" onClick={() => handleSelect()}>Inserir hábito</Button>
      </Container>
    </Modal>
  )
}
