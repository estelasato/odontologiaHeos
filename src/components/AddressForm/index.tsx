import { useFormContext } from "react-hook-form";

import { Grid } from "@/config/grid";
import { Input } from "../Form/Input";
import { Select } from "../Form/Select";

import { Container } from "./styles";

export const defaultAddressValues = {
  cep: "",
  logradouro: "",
  bairro: "",
  numero: "",
  complemento: "",
};

export const AddressForm = () => {
  const addressForm = useFormContext();

  const {
    register,
    formState: { errors },
  } = addressForm;

  return (
    <Container>
      <p className="titleAddress">Endereço</p>
      <Grid $template="1fr 3fr 1fr" $templateMd="1fr 2fr 1fr">
        <Input {...register("cep")} label="Cep" />
        <Input {...register("logradouro")} label="Logradouro" />
        <Input {...register("numero")} label="Número" />
      </Grid>
      <Grid $templateMd="2fr 2fr 2fr">
        <Input {...register("bairro")} label="Bairro" />
        <Input {...register("complemento")} label="Complemento" />
        <Select
          {...register("idCidade")}
          label="Cidade"
          options={[]}
          error={errors.idEstado?.message}
        />
      </Grid>
    </Container>
  );
};
