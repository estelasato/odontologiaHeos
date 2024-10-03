import { FormProvider } from "react-hook-form";
import Modal from "..";
import { Container } from "./styles";
import { useModalBudgets } from "./useModalBudgets";
import { Input } from "@/components/Form/Input";

interface IModalBudgets {
  modalRef: React.RefObject<any>;
}

export const ModalBudgets = ({ modalRef }: IModalBudgets) => {
  const {
    formBudgets,
    // onSubmit
  } = useModalBudgets(modalRef);
  const {
    register,
    // handleSubmit,
    formState: { errors },
  } = formBudgets;

  return (
    <Modal ref={modalRef} width="1000px">
      <FormProvider {...formBudgets}>
        <Container>
          <Input
            {...register("id")}
            label="Código"
            error={errors.id?.message}
          />


        </Container>
      </FormProvider>
    </Modal>
  );
};
