import { useEffect, useState } from "react";
import Modal from "..";

import { FooterModal } from "../Footer";
import { Container } from "../ModalEmployee/styles";
import { Grid } from "@/config/grid";
import { Input } from "@/components/Form/Input";
import { TextArea } from "@/components/Form/TextArea";
import { FormProvider } from "react-hook-form";
import { useModalAnamnesis } from "./useModalAnamnesis";
import { AnamnesisDefaultValue } from "@/validators/anamnesisValidator";

interface ModalBasic {
  modalRef: React.RefObject<any>;
}

export const ModalAnamnesis = ({ modalRef }: ModalBasic) => {
  const [values, setValues] = useState<any>(null);
  const { anamnesisForm, onSubmit } = useModalAnamnesis(
    !values,
    modalRef
  );

  const {
    handleSubmit,
    reset,
    register,
    setValue,
  } = anamnesisForm;

  useEffect(() => {
    if (values) {
      reset(values);
      setValue("idPaciente", values.idPaciente);
    } else {
      reset();
      reset(AnamnesisDefaultValue);
    }
  }, [values]);

  return (
    <Modal
      ref={modalRef}
      title={values ? "Edição" : "Cadastro"}
      getValues={setValues}
    >
      <FormProvider {...anamnesisForm}>
        <Container>
          <Grid $template="1fr 3fr">
            <Input
              {...register("id")}
              label="Código"
              disabled={true}
              type="number"
            />
          </Grid>
          <TextArea {...register("queixas")} label="Queixas" />
          <TextArea {...register("obs")} label="Observação" />
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
