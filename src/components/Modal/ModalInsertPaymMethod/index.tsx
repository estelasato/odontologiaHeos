import { IPaymentMethod } from "@/services/paymentMethodService";
import { RefObject, useState } from "react";
import { toast } from "react-toastify";
import Modal from "..";
import { Container } from "../ModalResponsible/styles";
import { PaymentMethods } from "@/pages/PaymentMethods";
import { Button } from "@/components/Button";

interface IModalInsertPaymMethod {
  modalRef: RefObject<any>;
  selectData: (data: IPaymentMethod) => void;
}

export const ModalInsertPaymMethod = ({ modalRef, selectData }: IModalInsertPaymMethod) => {
  const [data, setData] = useState<IPaymentMethod | undefined>();

  const handleSelect = () => {
    if (data && !!data.status) {
      selectData(data)
      modalRef.current?.close()
    } else toast.error('Selecione uma forma de pagamento ativa')
  }

  return (
    <Modal ref={modalRef} width="90%">
      <Container>
        <PaymentMethods onClick={(e) => setData(e)}/>

        <div>
          <Button className="select-btn" onClick={() => handleSelect()}>Selecionar forma de pagamento</Button>
        </div>
      </Container>
    </Modal>
  )
}
