import { useEffect, useState } from "react";
import Modal from "..";

import { FooterModal } from "../Footer";
import { Container } from "../ModalEmployee/styles";
import { Grid } from "@/config/grid";
import { Input } from "@/components/Form/Input";
import { TextArea } from "@/components/Form/TextArea";
import { FormProvider } from "react-hook-form";
import { useModalAnamnesis } from "./useModalAnamnesis";
import { AnamnesisDefaultValue, IllnessAnamnesisType } from "@/validators/anamnesisValidator";
import { IncludeIllness } from "@/components/IncludeIllness";
import { useMediaQuery } from "react-responsive";
import { IncludeMed } from "@/components/IncludeMed";
import { IncludeAllergies } from "@/components/IncludeAllergies";

interface ModalBasic {
  modalRef: React.RefObject<any>;
}

export const ModalAnamnesis = ({ modalRef }: ModalBasic) => {
  const [values, setValues] = useState<any>(null);
  const { anamnesisForm, onSubmit, AnamnesisData } = useModalAnamnesis(
    values,
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
      reset(AnamnesisDefaultValue);
    }

    if (AnamnesisData) {
      reset(AnamnesisData);
    }
  }, [values, AnamnesisData]);

  const mobileScreen = useMediaQuery({maxWidth: 500})

  const filterSubmit = (data: any) => {
    const doencas = data.doencas.filter((d: IllnessAnamnesisType) => d.idDoenca);
    onSubmit({ ...data, doencas });
  }

  return (
    <Modal
      width={mobileScreen ? "90%" : "85%"}
      ref={modalRef}
      title={values ? "Edição" : "Cadastro"}
      getValues={setValues}
    >
      <FormProvider {...anamnesisForm}>
        <Container>
          <Grid $template="100px">
            <Input
              {...register("id")}
              label="Código"
              disabled={true}
              type="number"
            />
          </Grid>
          <Grid $template="1fr 1fr">
            <TextArea width="100%" {...register("queixas")} label="Queixas" />
            <TextArea width="100%" {...register("obs")} label="Observação" />
          </Grid>

          <IncludeIllness listData={AnamnesisData?.doencas}/>
          <IncludeMed listData={AnamnesisData?.medicamentos}/>
          <IncludeAllergies listData={AnamnesisData?.alergias}/>

          <FooterModal
            modalRef={modalRef}
            dtCadastro={values?.dtCadastro}
            dtUltAlt={values?.dtUltAlt}
            handleSubmit={handleSubmit(filterSubmit)}
          />
        </Container>
      </FormProvider>
    </Modal>
  );
};
