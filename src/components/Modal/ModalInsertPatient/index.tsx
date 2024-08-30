import { PatientProps } from "@/services/patientService";
import { RefObject, useState } from "react";
import { toast } from "react-toastify";
import Modal from "..";
import { Container } from "../ModalResponsible/styles";
// import { Patients } from "@/pages/Patients";
import { Button } from "@/components/Button";
import { Patients } from "@/pages/Patients";

interface ModalInsertPatientProps {
  modalRef: RefObject<any>;
  selectData: (data: PatientProps) => void;
}

export const ModalInsertPatient = ({ modalRef, selectData }: ModalInsertPatientProps) => {
  const [data, setData] = useState<PatientProps | undefined>();

  const handleSelect = () => {
    if (data) {
      selectData(data)
    } else toast.error('Selecione um paciente')
  }

  return (
    <Modal ref={modalRef} width="90%">
      <Container>
        <Patients onClick={(e) => setData(e)}/>

        <div>
          <Button className="select-btn" onClick={() => handleSelect()}>Selecionar paciente</Button>
        </div>
      </Container>
    </Modal>
  )
}
