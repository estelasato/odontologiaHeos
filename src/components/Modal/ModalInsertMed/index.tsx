import { BasicProps } from "@/services/basicServices";
import { RefObject, useState } from "react";
import { toast } from "react-toastify";
import Modal from "..";
import { Container } from "../ModalInsertCity/styles";
import { Medication } from "@/pages/Medication";
import { Button } from "@/components/Button";

interface ModalInsertMedAnamnesis {
  modalRef: RefObject<any>;
  selectData: (data: BasicProps) => void;
}

export const ModalInsertMed = ({ modalRef, selectData}: ModalInsertMedAnamnesis) => {
  const [data, setData] = useState<BasicProps | undefined>();

  const handleSelect = () => {
    if (data && !!data.ativo) {
      selectData(data)
      modalRef.current?.close()
    } else toast.error('Selecione um medicamento ativo')
  }

  return (
    <Modal ref={modalRef} width="90%">
      <Container>
        <Medication onClick={(e) => setData(e)}/>
        <Button className="select-btn" onClick={handleSelect}>Inserir doença</Button>
      </Container>
    </Modal>
  )
}
