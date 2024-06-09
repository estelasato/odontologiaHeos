import { FormProvider } from "react-hook-form";
import Modal from "..";
import { useEmployee } from "./useEmployee";
import { Container } from "./styles";
import { AddressForm, defaultAddressValues } from "@/components/AddressForm";
import { useEffect, useState } from "react";
import { Input } from "@/components/Form/Input";
import { Grid } from "@/config/grid";
// import masks from "@/utils/masks";
import { FooterModal } from "../Footer";
import { DatePicker } from "@/components/Form/DatePicker";

interface ModalEmployeeProps {
  modalRef: React.RefObject<any>;
}

export const ModalEmployee = ({ modalRef }: ModalEmployeeProps) => {
  const [values, setValues] = useState<any>(null);

  const { employeeForm, defaultValues } = useEmployee();

  const {
    handleSubmit,
    formState: { errors },
    reset,
    register,
  } = employeeForm;

  useEffect(() => {
    if (values) {
      reset(values);
    } else {
      reset(defaultValues);
      reset(defaultAddressValues);
    }
  }, [values]);

  return (
    <Modal width="800px" ref={modalRef} title={values ? "Edição" : "Cadastro"}>
      <FormProvider {...employeeForm}>
        <Container>
          <Grid $template="1fr 4fr 2fr">
            <Input {...register("codigo")} label="Código" disabled={true} />
            <Input {...register("nome")} label="Nome" />
            <Input {...register("sexo")} label="Sexo" />
          </Grid>

          <Grid $template="3fr 2fr 2fr">
            <Input {...register("email")} label="E-mail" />
            <Input {...register("dtNascimento")} label="Data de Nascimento" />
            <Input {...register("celular")} label="Celular" />
          </Grid>

          <AddressForm />

          <Grid>
            <Input {...register("rg")} label="RG" />
            <Input {...register("cpf")} label="CPF" />
          </Grid>

          <Grid $template="1fr 1fr 1fr">
            <Input {...register("cargo")} label="Cargo" />
            <Input {...register("salario")} label="Salário" />
            <Input {...register("pis")} label="PIS" />
          </Grid>

          <Grid $template="1fr 1fr 1fr" $templateMd="1fr 1fr">
            <DatePicker name="dtAdmissao" label="Data Admissão" />
            <DatePicker name="dtDemissao" label="Data Demissão" />
          </Grid>

          <FooterModal
            dtCadastro={values?.dtCadastro}
            dtUltAlt={values?.dtUltAlt}
            handleSubmit={() => console.log("submit")}
          />
        </Container>
      </FormProvider>
    </Modal>
  );
};
