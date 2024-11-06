import { useEffect, useState } from "react";
import { FormProvider } from "react-hook-form";

// import masks from "@/utils/masks";
import { Switch } from "@/components/Switch";
import { Input } from "@/components/Form/Input";
import { Select } from "@/components/Form/Select";
import { StateProps } from "@/services/stateServices";

import { useModalState } from "./useModalState";
import Modal from "..";
import { FooterModal } from "../Footer";
import { Box, Container } from "./styles";
import { Grid } from "@/config/grid";

export const ModalState = ({ modalRef }: any) => {
  const [values, setValues] = useState<StateProps | null>(null);

  const { onSubmit, stateForm, countryOptions } = useModalState(
    !values,
    modalRef
  );

  const {
    handleSubmit,
    formState: { errors },
    reset,
    register,
    setValue,
  } = stateForm;

  const defaultValues = {
    id: undefined,
    estado: "",
    uf: "",
    idPais: undefined,
    ativo: undefined,
    dtCadastro: "",
    dtUltAlt: "",
  };

  useEffect(() => {
    if (values) {
      reset(values);
    } else {
      reset(defaultValues);
      setValue("ativo", 1);
    }
  }, [values]);

  return (
    <Modal
      ref={modalRef}
      title={values ? "Edição" : "Cadastro"}
      getValues={setValues}
    >
      <FormProvider {...stateForm}>
        <Container onSubmit={handleSubmit(onSubmit)}>
          <Box>
            <Input
              {...register("id")}
              label="Código"
              width="100px"
              disabled={true}
            />
            <Input
              {...register("estado")}
              label="Estado*"
              error={errors.estado?.message}
            />
            <Switch
              value={values?.ativo}
              {...register("ativo")}
              label="Ativo"
            />
          </Box>
          <Grid $template="1fr 2fr">
            <Input
              {...register("uf")}
              label="UF*"
              error={errors.uf?.message}
              type="number"
              mask="uf"
            />
            <Select
              {...register("idPais")}
              label="País*"
              minWidth="200px"
              options={countryOptions}
              error={errors.idPais?.message}
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
