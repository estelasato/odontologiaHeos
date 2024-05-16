import { useEffect, useState } from "react";
import { FormProvider } from "react-hook-form";

import { Input } from "../../Form/Input";
import masks from "@/utils/masks";
import { CountryProps } from "@/services/countryServices";

import { useModalCountry } from "./useModalCountry";
import { Switch } from "@/components/Switch";
import { Button } from "@/components/Button";
import { ModalProps } from "@/interfaces/Modal";

import Modal from "..";
import { Box, Container } from "./styles";

export const ModalCountry = ({ modalRef }: ModalProps) => {
  const [values, setValues] = useState<CountryProps | null>(null);

  const { onSubmit, countryForm } = useModalCountry(!values, modalRef);

  const {
    handleSubmit,
    formState: { errors },
    reset,
    register,
  } = countryForm;

  const defaultValues = {
    pais_ID: undefined,
    pais: "",
    ddi: "",
    sigla: "",
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
      <FormProvider {...countryForm}>
        <Container onSubmit={handleSubmit(onSubmit)}>
          <Box>
            <Input
              {...register("pais_ID")}
              label="Código"
              width="100px"
              disabled={true}
            />
            <Input
              {...register("pais")}
              label="País"
              error={errors.pais?.message}
            />
          </Box>
          <Box>
            <Input
              {...register("ddi")}
              label="DDI"
              error={errors.ddi?.message}
            />
            <Input
              {...register("sigla")}
              label="Sigla"
              error={errors.sigla?.message}
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
