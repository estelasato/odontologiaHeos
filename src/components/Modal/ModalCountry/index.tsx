import { useEffect, useState } from "react";
import { FormProvider } from "react-hook-form";

import { Input } from "../../Form/Input";
// import masks from "@/utils/masks";
import { CountryProps } from "@/services/countryServices";

import { useModalCountry } from "./useModalCountry";
import { Switch } from "@/components/Switch";
import { ModalProps } from "@/interfaces/Modal";

import Modal from "..";
import { FooterModal } from "../Footer";
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
    id: undefined,
    pais: "",
    ddi: "",
    sigla: "",
    ativo: true,
    dtCadastro: "",
    dtUltAlt: "",
  };

  useEffect(() => {
    if (values) {
      reset(values);
    } else {
      reset(defaultValues as any);
    }
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
              label="País*"
              error={errors.pais?.message}
            />
          </Box>
          <Box>
            <Input
              {...register("ddi")}
              label="DDI*"
              type="number"
              error={errors.ddi?.message}
              mask="ddi"
            />
            <Input
              {...register("sigla")}
              label="Sigla"
              error={errors.sigla?.message}
              mask="sigla"
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
