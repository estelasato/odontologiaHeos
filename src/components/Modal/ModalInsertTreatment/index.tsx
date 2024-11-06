import { RefObject, useState } from "react";
import { toast } from "react-toastify";
import Modal from "..";
import { Container } from "../ModalInsertResponsible/styles";
import { Button } from "@/components/Button";
import { Procedures } from "@/pages/Procedures";

interface ModalInsertTreatmentProps {
  modalRef: RefObject<any>;
  selectData: (data: IProcedure) => void;
}
export const ModalInsertTreatment = ({ modalRef, selectData }: ModalInsertTreatmentProps) => {
  const [data, setData] = useState<IProcedure | undefined>();

  const handleSelect = () => {
    if (data) {
      selectData(data)
    } else toast.error('Selecione um procedimento')
  }

  return (
    <Modal ref={modalRef} width="90%">
      <Container>
        <Procedures onClick={(e) => setData(e)}/>
        <Button className="select-btn" onClick={() => handleSelect()}>Inserir procedimento</Button>
      </Container>
    </Modal>
  )
}
