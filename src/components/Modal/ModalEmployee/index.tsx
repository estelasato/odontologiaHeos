import { FormProvider } from "react-hook-form";
import Modal from "..";
import { Container, GridComp } from "./styles";
import { AddressForm, defaultAddressValues } from "@/components/AddressForm";
import { useEffect, useState } from "react";
import { Input } from "@/components/Form/Input";
import { Grid } from "@/config/grid";
// import masks from "@/utils/masks";
import { FooterModal } from "../Footer";
import { DatePicker } from "@/components/Form/DatePicker";
import { useModalEmployee } from "./useModalEmployee";
import { Select } from "@/components/Form/Select";
import { GenderOpt } from "@/utils/shared/Options";
import { Switch } from "@/components/Switch";

interface ModalEmployeeProps {
  modalRef: React.RefObject<any>;
}

export const ModalEmployee = ({ modalRef }: ModalEmployeeProps) => {
  const [values, setValues] = useState<any>(null);

  const { employeeForm, onSubmit } = useModalEmployee(!values, modalRef);

  const {
    handleSubmit,
    formState: { errors },
    reset,
    register,
  } = employeeForm;
  console.log(errors);

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
      title={values ? "Edição" : "Cadastro"}
      getValues={setValues}
    >
      <FormProvider {...employeeForm}>
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

          <Grid $template="3fr 2fr 2fr">
            <Input
              {...register("email")}
              label="E-mail"
              error={errors.email?.message}
            />
            <DatePicker
              {...register("dtNascimento")}
              // name="dtNascimento"
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
          </Grid>

          <AddressForm />

          <Grid>
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
          </Grid>

          <GridComp $template="2fr 1fr 1fr 1fr 1fr">
            <Input
              {...register("cargo")}
              label="Cargo"
              error={errors.cargo?.message}
            />
            <Input
              {...register("salario")}
              label="Salário"
              error={errors.salario?.message}
              mask="currency"
            />
            <Input
              {...register("pis")}
              label="PIS"
              error={errors.pis?.message}
              mask="pis"
            />
          {/* </Grid> */}

          {/* <Grid $template="1fr 1fr 1fr" $templateMd="1fr 1fr"> */}
            <DatePicker
              label="Data de Admissão"
              error={errors.dtAdmissao?.message}
              defaultValue={values?.dtAdmissao}
              {...register("dtAdmissao")}
            />
            <DatePicker
              label="Data de Demissão"
              error={errors.dtDemissao?.message}
              defaultValue={values?.dtDemissao}
              {...register("dtDemissao")}
            />
            <Switch
              value={values?.ativo}
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
