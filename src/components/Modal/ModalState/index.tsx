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
    } else reset(defaultValues);
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
              label="Estado"
              error={errors.estado?.message}
            />
          </Box>
          <Box>
            <Input {...register("uf")} label="UF" error={errors.uf?.message} />
            <Select
              {...register("idPais")}
              label="País"
              options={countryOptions}
              error={errors.idPais?.message}
            />
            <Switch
              value={values?.ativo}
              {...register("ativo")}
              label="Ativo"
            />
          </Box>

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
