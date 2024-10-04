import { useEffect, useMemo } from "react";
import { FormProvider } from "react-hook-form";

import { AddressForm, defaultAddressValues } from "@/components/AddressForm";
import { IncludeResponsible } from "@/components/IncludeResponsible";
import { DatePicker } from "@/components/Form/DatePicker";
import { Input } from "@/components/Form/Input";
import { Select } from "@/components/Form/Select";
import { Switch } from "@/components/Switch";
import { GenderOpt, estadoCivilOpt } from "@/utils/shared/Options";
import { Grid } from "@/config/grid";

import { Container, GridComp } from "./styles";
import { useAbout } from "./useAbout";
import { FooterModal } from "@/components/Modal/Footer";
import { useParams } from "react-router-dom";
import Spinner from "@/components/Spinner";

export const About = () => {
  const { id } = useParams();
  const { patientForm, onSubmit, isLoading, patientData } = useAbout();

  const {
    handleSubmit,
    formState: { errors },
    reset,
    register,
  } = patientForm;

  useEffect(() => {
    if (id) {
      reset(patientData);
    } else {
      reset();
      reset(defaultAddressValues);
    }
  }, [patientData, id]);

  const maxDate = useMemo(() => {
    const date = new Date();
    date.setMonth(date.getMonth() - 6);
    return date;
  }, []);

  return (
    <FormProvider {...patientForm}>
      {id && !patientData && (
        <div>
          <Spinner size={15} />
        </div>
      )}
      <Container onSubmit={handleSubmit(onSubmit)}>
        <Grid $template="60% 40%" $templateMd="1fr">
          <Grid $template="1fr 3fr" $templateMd="1fr 3fr">
            <Input
              {...register("id")}
              label="Código"
              disabled={true}
              type="number"
            />
            <Input
              {...register("nome")}
              label="Nome"
              error={errors.nome?.message}
            />
          </Grid>
          {/* <div> */}
          <Grid $template="3fr 1fr" $templateMd="2fr 1fr 1fr">
            <Select
              {...register("sexo")}
              label="Sexo"
              error={errors.sexo?.message}
              options={GenderOpt}
            />
            <Switch
              value={patientData?.ativo}
              {...register("ativo")}
              label="Ativo"
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
            maxDate={maxDate}
            label="Data de Nascimento"
            error={errors.dtNascimento?.message}
            defaultValue={patientData?.dtNascimento}
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

        <GridComp $template="1fr 1fr 1fr 1fr">
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
        </GridComp>

        <IncludeResponsible listData={patientData?.responsaveis} />
        <FooterModal
          isLoading={isLoading}
          dtCadastro={patientData?.dtCadastro}
          dtUltAlt={patientData?.dtUltAlt}
          handleSubmit={handleSubmit(onSubmit)}
        />
        {/* <IncludeHabits listData={patientData?.habitos}/> */}
      </Container>
    </FormProvider>
  );
};
