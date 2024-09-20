import { AnamnesisProps } from "@/services/anamnesisService";
import Modal from "..";
import { Container } from "../ModalInsertCity/styles";
import { Anamnesis } from "@/pages/Patient/Anamnesis";
import { toast } from "react-toastify";
import { RefObject, useState } from "react";
import { Button } from "@/components/Button";

interface ModalInsertAnamnesisProps {
  modalRef: RefObject<any>;
  selectData: (data: AnamnesisProps) => void;
}

export const ModalInsertAnamnesis = ({
  modalRef,
  selectData,
}: ModalInsertAnamnesisProps) => {
  const [data, setData] = useState<AnamnesisProps | undefined>();

  const handleSelect = () => {
    if (data) {
      selectData(data);
    } else toast.error("Selecione uma anamnese");
  };

  return (
    <Modal ref={modalRef} width="70%" title="Anamneses">
      <Container>
        <Anamnesis onClickRow={(e) => setData(e)} />
        <Button className="select-btn" onClick={() => handleSelect()}>
          Inserir anamnese
        </Button>
      </Container>
    </Modal>
  );
};
