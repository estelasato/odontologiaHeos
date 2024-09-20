import { RefObject, useState } from "react";
import Modal from ".."
import { Container } from "./styles";
import { Button } from "@/components/Button";
import { ResponsibleProps } from "@/services/responsiblePartyService";
import { toast } from "react-toastify";
import { City } from "@/pages/Registrations/City";

interface ModalInsertCityProps {
  modalRef: RefObject<any>;
  selectData: (data: ResponsibleProps) => void;
}
export const ModalInsertCity = ({ modalRef, selectData }: ModalInsertCityProps) => {
  const [data, setData] = useState<ResponsibleProps | undefined>();

  const handleSelect = () => {
    if (data) {
      selectData(data)
    } else toast.error('Selecione uma cidade')
  }

  return (
    <Modal ref={modalRef} width="90%" title="Cidades">
      <Container>
        <City onClickRow={(e) => setData(e)}/>
        <Button className="select-btn" onClick={() => handleSelect()}>Inserir cidade</Button>
      </Container>
    </Modal>
  )
}
