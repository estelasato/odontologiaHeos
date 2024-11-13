import { Grid } from "@/config/grid";
import { Input } from "../Form/Input";
import { Select } from "../Form/Select";
import { useAddressForm } from "./useAddressForm";

import { Container, GridCont } from "./styles";
import { Button } from "../Button";
import { ModalInsertCity } from "../Modal/ModalInsertCity";
import { useRef } from "react";
import { modalRefProps } from "../Modal";
import { toast } from "react-toastify";

export const defaultAddressValues = {
  cep: "",
  logradouro: "",
  bairro: "",
  numero: undefined,
  complemento: "",
};

export const AddressForm = () => {
  const modalCityRef = useRef<modalRefProps>();
  const { cityOpt, addressForm, refetch } = useAddressForm();

  const {
    register,
    formState: { errors },
    setValue,
  } = addressForm;

  const handleInclude = (data: any) => {
    refetch();
    if (!data.ativo) {
      toast.error("Cidade inativa, selecione outra cidade");
    } else {
      setValue("idCidade", data.id);
      modalCityRef.current?.close();
    }
  };

  return (
    <Container>
      <ModalInsertCity
        modalRef={modalCityRef}
        selectData={(data) => handleInclude(data)}
      />
      <p className="title">Endereço</p>
      <Grid $template="1fr 3fr 1fr 2fr" $templateMd="1fr 2fr 1fr 1fr">
        <Input {...register("cep")} label="Cep*" mask="zipcode" error={errors.cep?.message} />
        <Input {...register("logradouro")} label="Logradouro*" maxSize={50} error={errors.cep?.message} />
        <Input {...register("numero")} label="Número*" mask="number" error={errors.cep?.message} />
        <Input {...register("bairro")} label="Bairro*" error={errors.cep?.message} />
      </Grid>
      <GridCont $template="1fr 1fr 70px 1fr 50px">
        <Input {...register("complemento")} label="Complemento" />

        <Select
          {...register("idCidade")}
          label="Cidade*"
          options={cityOpt || []}
          error={errors.idEstado?.message}
        />
        <Input {...register("uf")} label="UF" disabled={true} />
        <Input {...register("pais")} label="País" disabled={true} />
        <Button variant="link" onClick={() => modalCityRef.current?.open()}>+</Button>
      </GridCont>
    </Container>
  );
};
