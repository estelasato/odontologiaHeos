import { BasicProps } from "@/services/basicServices";
import { RefObject, useState } from "react";
import { toast } from "react-toastify";
import Modal from "../..";

import { Button } from "@/components/Button";
import { Allergy } from "@/pages/Allergy";
import { Container } from "../../ModalInsertCity/styles";

interface ModalInsertAllergyAnamnesis {
  modalRef: RefObject<any>;
  selectData: (data: BasicProps) => void;
}

export const ModalInsertAllergy = ({ modalRef, selectData}: ModalInsertAllergyAnamnesis) => {
  const [data, setData] = useState<BasicProps | undefined>();

  const handleSelect = () => {
    if (data && !!data.ativo) {
      selectData(data)
      modalRef.current?.close()
    } else toast.error('Selecione uma alergia ativa')
  }

  return (
    <Modal ref={modalRef} width="80%">
      <Container>
        <Allergy onClick={(e) => setData(e)}/>
        <Button className="select-btn" onClick={handleSelect}>Inserir doença</Button>
      </Container>
    </Modal>
  )
}

