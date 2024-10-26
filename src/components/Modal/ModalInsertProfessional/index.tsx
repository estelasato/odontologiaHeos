import { RefObject, useState } from "react";
import { toast } from "react-toastify";

import Modal from "..";
import { Container } from "../ModalResponsible/styles";
import { Button } from "@/components/Button";
import { Professional } from "@/pages/Professional";
import { ProfessionalProps } from "@/services/professionalService";

interface ModalInsertProfessionalProps {
  modalRef: RefObject<any>;
  selectData: (data: ProfessionalProps) => void;
}

export const ModalInsertProfessional = ({ modalRef, selectData }: ModalInsertProfessionalProps) => {
  const [data, setData] = useState<ProfessionalProps | undefined>();

  const handleSelect = () => {
    if (data) {
      selectData(data)
    } else toast.error('Selecione o dentista')
  }

  return (
    <Modal ref={modalRef} width="90%">
      <Container>
        <Professional onClick={(e) => setData(e)}/>

        <div>
          <Button className="select-btn" onClick={() => handleSelect()}>Selecionar profissional</Button>
        </div>
      </Container>
    </Modal>
  )
}
