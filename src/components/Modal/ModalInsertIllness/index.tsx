import { BasicProps } from "@/services/basicServices";
import { RefObject, useState } from "react";
import { toast } from "react-toastify";
import Modal from "..";
import { Container } from "../ModalInsertCity/styles";
import { Illnesses } from "@/pages/Illness";
import { Button } from "@/components/Button";

interface ModalInsertIllnessProps {
  modalRef: RefObject<any>;
  selectData: (data: BasicProps) => void;
}
export const ModalInsertIllness = ({ modalRef, selectData }: ModalInsertIllnessProps) => {
  const [data, setData] = useState<BasicProps | undefined>();

  const handleSelect = () => {
    if (data && !!data.ativo) {
      selectData(data)
      modalRef.current?.close()
    } else toast.error('Selecione uma doença ativa')
  }

  return (
    <Modal ref={modalRef} width="90%">
      <Container>
        <Illnesses onClick={(e) => setData(e)}/>
        <Button className="select-btn" onClick={handleSelect}>Inserir doença</Button>
      </Container>
    </Modal>
  )
}
