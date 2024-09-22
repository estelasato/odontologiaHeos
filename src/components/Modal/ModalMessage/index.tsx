import { Button } from "@/components/Button";
import Modal, { modalRefProps } from ".."
import { Container } from "./styles"

interface IModalMessage {
  modalRef: React.RefObject<modalRefProps>;
  title?: string;
  message?: string;
}
export const ModalMessage = ({ modalRef, message, title}: IModalMessage) => {

  return (
    <Modal ref={modalRef} title={title} className="modal-message">
      <Container>
        {message && (
          <p>{message}</p>
        )}

        <Button onClick={() => modalRef.current?.close()}>Fechar</Button>
      </Container>
    </Modal>
  )
}
