import { RefObject, useEffect } from "react";
import { FormProvider } from "react-hook-form";

import Modal from "..";
import { useModalPatient } from "./useModalPatient";
import { AddressForm, defaultAddressValues } from "@/components/AddressForm";
import { IncludeResponsible } from "@/components/IncludeResponsible";
import { DatePicker } from "@/components/Form/DatePicker";
import { Input } from "@/components/Form/Input";
import { Select } from "@/components/Form/Select";
import { Switch } from "@/components/Switch";
import { GenderOpt, estadoCivilOpt } from "@/utils/shared/Options";
import { Grid } from "@/config/grid";
import { FooterModal } from "../Footer";

import { Container, GridComp } from "./styles";
import { IncludeHabits } from "@/components/IncludeHabits";
import { defaultValuesPatient } from "@/validators/patientValidator";
import { maxBirthDateAge, minBirthDate } from "@/utils/validAge";

interface ModalPatientProps {
  modalRef: RefObject<any>;
}

export const ModalPatient = ({ modalRef }: ModalPatientProps) => {
  const { patientForm, onSubmit, isLoading, setValues, values, patientData } =
    useModalPatient(modalRef);

  const {
    handleSubmit,
    formState: { errors },
    reset,
    register,
  } = patientForm;

  useEffect(() => {
    if (values) {
      reset(values);
    } else {
      reset(defaultValuesPatient as any);
      reset(defaultAddressValues);
    }
  }, [values]);

  console.log(values)

  return (
    <Modal
      width={"1000px"}
      ref={modalRef}
      title={values ? "Editar Paciente" : "Cadastrar Paciente"}
      getValues={setValues}
    >
      <FormProvider {...patientForm}>
        <Container onSubmit={handleSubmit(onSubmit)}>
          <Grid $template="120px 6fr" $templateMd="1fr 5fr">
            <Input
              {...register("id")}
              label="Código"
              disabled={true}
              type="number"
            />
            <Grid $template="3fr 1fr" $templateMd="2fr 1fr">
              <Input
                {...register("nome")}
                label="Nome"
                error={errors.nome?.message}
              />
              <Select
                {...register("sexo")}
                label="Sexo"
                error={errors.sexo?.message}
                options={GenderOpt}
              />
            </Grid>
          </Grid>

          <Grid $template="2fr 1fr 1fr 1fr">
            <Input
              {...register("email")}
              label="E-mail"
              error={errors.email?.message}
            />
            <DatePicker
              {...register("dtNascimento")}
              // name="dtNascimento"
              minDate={minBirthDate()}
              maxDate={maxBirthDateAge()}
              label="Data de Nascimento"
              error={errors.dtNascimento?.message}
              defaultValue={values?.dtNascimento}
            />
            <Input
              {...register("celular")}
              label="Celular"
              error={errors.celular?.message}
              mask="cell"
            />
            <Select
              {...register("estCivil")}
              label="Estado Civil"
              options={estadoCivilOpt}
              error={errors.estCivil?.message}
            />
          </Grid>

          <AddressForm />

          <GridComp $template="1fr 1fr 1fr 1fr 70px">
            <Input
              {...register("rg")}
              label="RG"
              error={errors.rg?.message}
              mask="rg"
            />
            <Input
              {...register("cpf")}
              label="CPF"
              error={errors.cpf?.message}
              mask="cpf"
            />
            <Input
              {...register("profissao")}
              label="Profissão"
              error={errors.profissao?.message}
            />
            <Input
              {...register("indicacao")}
              label="Indicação"
              error={errors.indicacao?.message}
            />
            <Switch
              value={values?.ativo}
              {...register("ativo")}
              label="Ativo"
              disabled={ values ? false : true }
            />
          </GridComp>

          <IncludeResponsible listData={patientData?.responsaveis}/>
          <IncludeHabits listData={patientData?.habitos}/>
          <FooterModal
            isLoading={isLoading}
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
