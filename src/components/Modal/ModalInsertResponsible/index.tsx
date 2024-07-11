import { RefObject, useState } from "react";
import Modal from ".."
import { ResponsibleParty } from "@/pages/ResponsibleParty";
import { Container } from "./styles";
import { Button } from "@/components/Button";
import { ResponsibleProps } from "@/services/responsiblePartyService";
import { toast } from "react-toastify";

interface ModalInsertResponsibleProps {
  modalRef: RefObject<any>;
  selectData: (data: ResponsibleProps) => void;
}
export const ModalInsertResponsible = ({ modalRef, selectData }: ModalInsertResponsibleProps) => {
  const [data, setData] = useState<ResponsibleProps | undefined>();

  const handleSelect = () => {
    if (data) {
      selectData(data)
    } else toast.error('Selecione um responsável')
  }

  return (
    <Modal ref={modalRef} width="90%">
      <Container>
        <ResponsibleParty onClickRow={(e) => setData(e)}/>
        <Button className="select-btn" onClick={() => handleSelect()}>Inserir responsável</Button>
      </Container>
    </Modal>
  )
}
