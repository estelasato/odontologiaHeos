import { TreatmentsProps } from "@/services/treatmentsServices";
import { RefObject, useState } from "react";
import { toast } from "react-toastify";
import Modal from "..";
import { Container } from "../ModalInsertResponsible/styles";
import { Button } from "@/components/Button";
import { Treatments } from "@/pages/Patient/Treatments";

interface ModalInsertTreatmentProps {
  modalRef: RefObject<any>;
  selectData: (data: TreatmentsProps) => void;
}
export const ModalInsertTreatment = ({ modalRef, selectData }: ModalInsertTreatmentProps) => {
  const [data, setData] = useState<TreatmentsProps | undefined>();

  const handleSelect = () => {
    if (data) {
      selectData(data)
    } else toast.error('Selecione um tratamento')
  }

  return (
    <Modal ref={modalRef} width="90%">
      <Container>
        <Treatments onClickRow={(e) => setData(e)}/>
        <Button className="select-btn" onClick={() => handleSelect()}>Inserir tratamento</Button>
      </Container>
    </Modal>
  )
}
