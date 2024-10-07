import { RefObject, useEffect, useState } from "react";
import { AddressForm, defaultAddressValues } from "@/components/AddressForm";
import Modal from "..";
import { FormProvider } from "react-hook-form";
import { Input } from "@/components/Form/Input";
import { DatePicker } from "@/components/Form/DatePicker";
import { Grid } from "@/config/grid";
import { GenderOpt } from "@/utils/shared/Options";
import { Select } from "@/components/Form/Select";

import { Switch } from "@/components/Switch";
import { FooterModal } from "../Footer";
import { useModalProfessional } from "./useModalProfessional";
import { Container, GridComp } from "./styles";
import { maxBirthDateAge, minBirthDate } from "@/utils/validAge";

interface ModalResponsibleProps {
  modalRef: RefObject<any>;
}

export const ModalProfessional = ({ modalRef }: ModalResponsibleProps) => {
  const [values, setValues] = useState<any>(null);

  const { professionalForm, onSubmit } = useModalProfessional(
    !values,
    modalRef
  );

  const {
    handleSubmit,
    formState: { errors },
    reset,
    register,
    setValue,
  } = professionalForm;

  useEffect(() => {
    if (values) {
      reset(values);
    } else {
      reset();
      reset(defaultAddressValues);
      setValue("ativo", 1);
    }
  }, [values]);

  return (
    <Modal
      width={"1000px"}
      ref={modalRef}
      title={values ? "Edição" : "Cadastro"}
      getValues={setValues}
    >
      <FormProvider {...professionalForm}>
        <Container onSubmit={handleSubmit(onSubmit)}>
          <Grid $template="1fr 4fr 2fr">
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
            <Select
              {...register("sexo")}
              label="Sexo*"
              error={errors.sexo?.message}
              options={GenderOpt}
            />
          </Grid>

          <Grid $template="3fr 2fr 2fr">
            <Input
              {...register("email")}
              label="E-mail"
              error={errors.email?.message}
            />
            <DatePicker
              {...register("dtNascimento")}
              // name="dtNascimento"
              maxDate={maxBirthDateAge()}
              minDate={minBirthDate()}
              label="Data de Nascimento*"
              error={errors.dtNascimento?.message}
              defaultValue={values?.dtNascimento}
            />
            <Input
              {...register("celular")}
              label="Celular*"
              error={errors.celular?.message}
              mask="cell"
            />
          </Grid>

          <AddressForm />

          <GridComp $template="1fr 1fr 70px  1fr ">
            <Input
              {...register("rg")}
              label="RG"
              error={errors.rg?.message}
              mask="rg"
            />
            <Input
              {...register("cpfCnpj")}
              label="CPF/CNPJ"
              error={errors.cpfCnpj?.message}
              mask="documento"
            />

            <Switch
              value={values?.ativo}
              {...register("ativo")}
              label="Ativo"
            />
          </GridComp>

          <Grid $template="1fr 2fr 2fr 2fr">
            <Input
              {...register("cro")}
              label="CRO*"
              error={errors.cro?.message}
            />
            <Input
              {...register("especialidade")}
              label="Especialidade"
              error={errors.especialidade?.message}
            />
            <Input
              {...register("certificacoes")}
              label="Certificacoes"
              error={errors.certificacoes?.message}
            />
            <Input
              {...register("formacoes")}
              label="Formacoes"
              error={errors.formacoes?.message}
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
