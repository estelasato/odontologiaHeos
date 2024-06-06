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
    id: 0,
    pais: "",
    ddi: "",
    sigla: "",
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
      <FormProvider {...countryForm}>
        <Container onSubmit={handleSubmit(onSubmit)}>
          <Box>
            <Input
              {...register("id")}
              label="Código"
              width="100px"
              disabled={true}
              type="number"
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
