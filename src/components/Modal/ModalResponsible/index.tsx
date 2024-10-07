import { RefObject, useEffect, useState } from "react";
import { AddressForm, defaultAddressValues } from "@/components/AddressForm";
import Modal from "..";
import { FormProvider } from "react-hook-form";
import { Input } from "@/components/Form/Input";
import { DatePicker } from "@/components/Form/DatePicker";
import { Grid } from "@/config/grid";
import { GenderOpt, estadoCivilOpt } from "@/utils/shared/Options";
import { Select } from "@/components/Form/Select";
import { Container, GridComp } from "./styles";
import { Switch } from "@/components/Switch";
import { FooterModal } from "../Footer";
import { useModalResponsible } from "./useModalResponsible";

interface ModalResponsibleProps {
  modalRef: RefObject<any>;
}

export const ModalResponsible = ({ modalRef }: ModalResponsibleProps) => {
  const [values, setValues] = useState<any>(null);

  const { responsibleForm, onSubmit } = useModalResponsible(!values, modalRef);

  const {
    handleSubmit,
    formState: { errors },
    reset,
    register,
  } = responsibleForm;

  console.log(errors, 'error respo');
  useEffect(() => {
    if (values) {
      reset(values);
    } else {
      reset();
      reset(defaultAddressValues);
    }
  }, [values]);

  return (
    <Modal
      width={"1000px"}
      ref={modalRef}
      title={values ? "Editar Responsável" : "Cadastrar Responsável"}
      getValues={setValues}
    >
      <FormProvider {...responsibleForm}>
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
              label="Sexo"
              error={errors.sexo?.message}
              options={GenderOpt}
            />
          </Grid>

          <Grid $template="3fr 2fr 2fr 2fr">
            <Input
              {...register("email")}
              label="E-mail"
              error={errors.email?.message}
            />
            <DatePicker
              {...register("dtNascimento")}
              // name="dtNascimento"
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
            <Select
              {...register("estCivil")}
              label="Estado Civil"
              options={estadoCivilOpt}
              error={errors.estCivil?.message}
            />
          </Grid>

          <AddressForm />

          <GridComp $template="1fr 1fr 1fr 70px">
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

            <Switch
              value={values?.ativo != false ? true : false}
              {...register("ativo")}
              label="Ativo"
            />
          </GridComp>

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
