import { useEffect, useState } from "react";
import { FormProvider } from "react-hook-form";

import masks from "@/utils/masks";
import { Switch } from "@/components/Switch";
import { Button } from "@/components/Button";
import { Input } from "@/components/Form/Input";
import { Select } from "@/components/Form/Select";
import { StateProps } from "@/services/stateServices";

import Modal from "..";
import { useModalCity } from "./useModalCity";
import { Box, Container } from "../ModalCountry/styles";

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
    ativo: undefined,
    dtCadastro: "",
    dtUltAlt: "",
  };

  useEffect(() => {
    if (values) {
      console.log(values);
      reset(values);
    } else reset(defaultValues);
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
              label="Cidade"
              error={errors.cidade?.message}
            />
          </Box>
          <Box>
            <Input
              {...register("ddd")}
              label="DDD"
              error={errors.ddd?.message}
            />
            <Select
              {...register("idEstado")}
              label="Estado"
              options={stateOpt}
              error={errors.idEstado?.message}
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
                {values?.dtCadastro &&
                  masks.convertDateISO(values?.dtCadastro)}
              </p>
            </div>
            <div>
              <p>Data da última alteração</p>
              <p>
                {values?.dtUltAlt &&
                  masks.convertDateISO(values?.dtUltAlt)}
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
