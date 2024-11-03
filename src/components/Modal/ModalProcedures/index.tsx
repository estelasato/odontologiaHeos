import { FormProvider } from "react-hook-form";
import Modal from "..";
import { FooterModal } from "../Footer";
import { Container } from "../ModalEmployee/styles";
import { Grid } from "@/config/grid";
import { Input } from "@/components/Form/Input";
import { Switch } from "@/components/Switch";
import { TextArea } from "@/components/Form/TextArea";
import { useEffect, useState } from "react";
import { useModalProcedures } from "./useModalProcedures";
import { defaultValuesProcedure } from "@/validators/procedureValidator";

interface IModalProcedures {
  modalRef: React.RefObject<any>;
}

export const ModalProcedures = ({ modalRef }: IModalProcedures) => {
  const [values, setValues] = useState<any>(null);

  const {form, onSubmit, proceduresData} = useModalProcedures(modalRef, values);
  const {
    register,
    formState: { errors },
    handleSubmit,
    reset
  } = form;

  useEffect(() => {
    if (values) {
      reset(values);
    } else {
      reset(defaultValuesProcedure);
    }

    if (proceduresData) {
      reset(proceduresData);
    }
  }, [values, proceduresData]);

  return (
    <Modal
      ref={modalRef}
      title={values ? "Edição" : "Cadastro"}
      getValues={setValues}
    >
      <FormProvider {...form}>
        <Container>
          <Grid $template="1fr 3fr" $templateMd="1fr 2fr">
            <Input
              {...register("id")}
              label="Código"
              disabled={true}
              type="number"
            />
            <Input
              {...register("nome")}
              label="Nome*"
              error={errors.nome?.message}
            />
          </Grid>
          <TextArea {...register("descricao")} label="Descrição" />
          {/* <Switch
              value={values?.ativo}
              {...register("ativo")}
              label="Ativo"
            /> */}

          <Grid $template="150px 70px 1fr" $templateMd="150px 70px 1fr" $templateSm="150px 70px 1fr">
            <Input
              {...register("valor")}
              label="Valor"
              mask="currency"
              width="150px"
            />
            <Switch
              value={values?.ativo}
              {...register("ativo")}
              label="Ativo"
            />
          </Grid>
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
