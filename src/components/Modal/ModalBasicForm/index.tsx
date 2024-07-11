import { useEffect, useState } from "react";
import Modal from "..";
import { useModalBasicForm } from "./useModalBasicForm";
import { defaultValuesBasicForm } from "@/validators/basicFormValidator";
import { FooterModal } from "../Footer";
import { Container } from "../ModalEmployee/styles";
import { Grid } from "@/config/grid";
import { Input } from "@/components/Form/Input";
import { TextArea } from "@/components/Form/TextArea";
import { FormProvider } from "react-hook-form";
import { Content } from "../ModalCountry/styles";
import { Switch } from "@/components/Switch";

interface ModalBasic {
  type: string;
  modalRef: React.RefObject<any>;
}

export const ModalBasicForm = ({ type, modalRef }: ModalBasic) => {
  const [values, setValues] = useState<any>(null);
  const { basicForm, onSubmit } = useModalBasicForm(type, !values, modalRef);

  const {
    handleSubmit,
    reset,
    register,
    formState: { errors },
  } = basicForm;
  console.log(errors);

  useEffect(() => {
    if (values) {
      reset(values);
    } else {
      reset();
      reset(defaultValuesBasicForm);
    }
  }, [values]);

  return (
    <Modal
      ref={modalRef}
      title={values ? "Edição" : "Cadastro"}
      getValues={setValues}
    >
      <FormProvider {...basicForm}>
        <Container>
          <Grid $template="1fr 3fr">
            <Input
              {...register("id")}
              label="Código"
              disabled={true}
              type="number"
            />
            <Input
              {...register("nome")}
              label="Nome"
              error={errors.nome?.message}
            />
          </Grid>
          <Content>
            <TextArea {...register("descricao")} label="Descrição" />
            <Switch
              value={values?.ativo}
              {...register("ativo")}
              label="Ativo"
            />
          </Content>
          <FooterModal
            modalRef={modalRef}
            dtCadastro={values?.dtCadastro}
            dtUltAlt={values?.dtUltAlt}
            handleSubmit={handleSubmit(onSubmit)}
          />
        </Container>
      </FormProvider>
    </Modal>
  );
};
