import { useEffect, useState } from "react";
import { FormProvider } from "react-hook-form";

// import masks from "@/utils/masks";
import { Switch } from "@/components/Switch";
import { Input } from "@/components/Form/Input";
import { Select } from "@/components/Form/Select";
import { StateProps } from "@/services/stateServices";

import Modal from "..";
import { useModalCity } from "./useModalCity";
import { Box, Container } from "../ModalCountry/styles";
import { FooterModal } from "../Footer";
import { Grid } from "@/config/grid";

export const ModalCity = ({ modalRef }: any) => {
  const [values, setValues] = useState<StateProps | null>(null);

  const { onSubmit, cityForm, stateOpt } = useModalCity(!values, modalRef);

  const {
    handleSubmit,
    formState: { errors },
    reset,
    register,
  } = cityForm;

  const defaultValues = {
    idEstado: undefined,
    id: undefined,
    cidade: "",
    ddd: "",
    ativo: 1,
    dtCadastro: "",
    dtUltAlt: "",
  };

  useEffect(() => {
    if (values) {
      console.log(values);
      reset(values);
    } else reset(defaultValues as any);
  }, [values]);

  return (
    <Modal
      ref={modalRef}
      title={values ? "Edição" : "Cadastro"}
      getValues={setValues}
    >
      <FormProvider {...cityForm}>
        <Container onSubmit={handleSubmit(onSubmit)}>
          <Box>
            <Input
              {...register("id")}
              label="Código"
              width="100px"
              disabled={true}
            />
            <Input
              {...register("cidade")}
              label="Cidade*"
              error={errors.cidade?.message}
            />
            <Switch
              value={values?.ativo}
              {...register("ativo")}
              label="Ativo"
            />
          </Box>
          <Grid $template="1fr 2fr">
            <Input
              {...register("ddd")}
              label="DDD"
              error={errors.ddd?.message}
            />
            <Select
              {...register("idEstado")}
              label="Estado*"
              options={stateOpt}
              error={errors.idEstado?.message}
            />
          </Grid>

          <FooterModal
            dtCadastro={values?.dtCadastro}
            dtUltAlt={values?.dtUltAlt}
            handleSubmit={handleSubmit(onSubmit)}
          />
        </Container>
      </FormProvider>
    </Modal>
  );
};
