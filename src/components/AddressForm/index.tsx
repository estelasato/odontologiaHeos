import { Grid } from "@/config/grid";
import { Input } from "../Form/Input";
import { Select } from "../Form/Select";
import { useAddressForm } from "./useAddressForm";

import { Container, GridCont } from "./styles";

export const defaultAddressValues = {
  cep: "",
  logradouro: "",
  bairro: "",
  numero: undefined,
  complemento: "",
};

export const AddressForm = () => {
  const { cityOpt, addressForm } = useAddressForm();

  const {
    register,
    formState: { errors },
  } = addressForm;

  return (
    <Container>
      <p className="titleAddress">Endereço</p>
      <Grid $template="1fr 3fr 1fr" $templateMd="1fr 2fr 1fr">
        <Input {...register("cep")} label="Cep" mask="zipcode" />
        <Input {...register("logradouro")} label="Logradouro" />
        <Input {...register("numero")} label="Número" mask="number" />
      </Grid>
      <GridCont
        $template="1fr 1fr 1fr 70px 1fr"
      >
        <Input {...register("bairro")} label="Bairro" />
        <Input {...register("complemento")} label="Complemento" />

        <Select
          {...register("idCidade")}
          label="Cidade"
          options={cityOpt || []}
          error={errors.idEstado?.message}
        />
        <Input {...register("uf")} label="UF"/>
        <Input {...register("pais")} label="País" />
      </GridCont>
    </Container>
  );
};
