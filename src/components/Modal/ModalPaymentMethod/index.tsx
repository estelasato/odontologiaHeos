import { FormProvider } from "react-hook-form";
import Modal, { modalRefProps } from "..";
import { useModalPaymMethod } from "./useModalPaymentMethod";
import { Container, Content } from "./styles";
import { Input } from "@/components/Form/Input";
import { Switch } from "@/components/Switch";

import { FooterModal } from "../Footer";

export interface IModalPaymentMethod {
  modalRef: React.RefObject<modalRefProps>;
}
export const ModalPaymentMethod = ({ modalRef }: IModalPaymentMethod) => {
  const { onSubmit, paymMethodForm, setValues, values } =
    useModalPaymMethod(modalRef);
  const { register, handleSubmit } = paymMethodForm;

  return (
    <Modal ref={modalRef} getValues={setValues} width="550px">
      <FormProvider {...paymMethodForm}>
        <Container>
          <h2>Forma de Pagamento</h2>

          <Content>
            <Input width="100px" {...register("id")} label="Código" disabled />

            <Switch
              value={values?.status}
              {...register("status")}
              label="Ativo"
              disabled={ values ? false : true }
            />
          </Content>
          <Input {...register("descricao")} label="Forma de Pagamento" />

          <FooterModal
            dtCadastro={values?.dtCadastro || new Date()}
            dtUltAlt={new Date()}
            handleSubmit={handleSubmit(onSubmit)}
          />
        </Container>
      </FormProvider>
    </Modal>
  );
};
