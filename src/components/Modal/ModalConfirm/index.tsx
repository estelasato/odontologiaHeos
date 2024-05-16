import { RefObject } from "react";

import { Button } from "../../../components/Button";
import Modal, { modalRefProps } from "..";
import { BtnContainer, Container } from "./styles";

interface confirmationProps {
  title?: string;
  message: any;
  index?: number;
  onConfirm: (args?: any) => void;
  modalRef: RefObject<modalRefProps>
}

export const ModalConfirmation = ({
  modalRef,
  title,
  message,
  onConfirm,
}: confirmationProps) => {

  return (
    <Modal ref={modalRef} title={title || "Confirmação"}  width="400px">
      <Container>
        {message}
        <BtnContainer>
          <Button onClick={onConfirm as any}>Remover</Button>
        </BtnContainer>
      </Container>
    </Modal>
  );
};
