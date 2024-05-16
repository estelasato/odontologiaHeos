import { useEffect, useState } from "react";
import { FormProvider } from "react-hook-form";

import masks from "@/utils/masks";
import { Switch } from "@/components/Switch";
import { Button } from "@/components/Button";
import { Input } from "@/components/Form/Input";
import { Select } from "@/components/Form/Select";
import { StateProps } from "@/services/stateServices";

import { useModalState } from "./useModalState";
import Modal from "..";
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
    estado_ID: undefined,
    estado: "",
    uf: "",
    pais_ID: undefined,
    ativo: undefined,
    data_cadastro: "",
    data_ult_alt: "",
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
              {...register("estado_ID")}
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
              {...register("pais_ID")}
              label="País"
              options={countryOptions}
              error={errors.pais_ID?.message}
            />
            <Switch
              value={values?.ativo}
              {...register("ativo")}
              label="Ativo"
            />
          </Box>

          <Box className="dates" style={{ gap: "20px" }}>
            <div>
              <p>Data de cadastro</p>
              <p>
                {values?.data_cadastro &&
                  masks.convertDateISO(values?.data_cadastro)}
              </p>
            </div>
            <div>
              <p>Data da última alteração</p>
              <p>
                {values?.data_ult_alt &&
                  masks.convertDateISO(values?.data_ult_alt)}
              </p>
            </div>
          </Box>

          <Box className="buttons">
            <Button type="submit">Salvar</Button>
          </Box>
        </Container>
      </FormProvider>
    </Modal>
  );
};
