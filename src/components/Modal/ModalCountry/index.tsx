// import { ModalProps } from "src/interfaces/Modal";
import { useEffect, useState } from "react";
import Modal from "..";
import { ModalProps } from "../../../interfaces/Modal";
import { Button } from "../../Button";
import { Checkbox } from "../../Form/Checkbox";
import { Input } from "../../Form/Input";
import { Box, Container } from "./styles";
import { useForm } from "react-hook-form";
import { CountryProps } from "../../../services/countryServices";
import masks from "../../../utils/masks";


export const ModalCountry = ({ modalRef }: ModalProps) => {
  const [values, setValues] = useState<CountryProps | null>(null)
  const {
    handleSubmit,
    formState: { errors },
    reset,
    control,
  } = useForm();
  console.log(errors);

  const onSubmit = (data?: any) => {
    console.log(data, "submit");
  };

  const options = [
    { label: "Sim", value: "sim" },
    { label: "Não", value: "nao" },
  ]

  useEffect(() => {
    if (values) {
      reset(values)
    }
  }, [values])

  return (
    <Modal ref={modalRef} title="País" getValues={setValues}>
      <Container onSubmit={handleSubmit(onSubmit)}>
        <Box>
          <Input control={control} name="pais_ID" label="Código" width="100px" disabled={true}/>
          <Input
            control={control}
            name="pais"
            label="País"
            placeholder="Nome do país"
          />
        </Box>
        <Box>
          <Input control={control} name="ddi" label="DDI" />
          <Input control={control} name="sigla" label="Sigla" />
          <Checkbox name="ativo" options={options} label="Ativo" control={control} />
        </Box>

        <Box className="dates" style={{ gap: '20px'}}>
          <div>
            <p>Data de cadastro</p>
            <p>{values?.data_cadastro && masks.convertDateISO(values?.data_cadastro)}</p>
          </div>
          <div>
            <p>Data da última alteração</p>
            <p>{values?.data_ult_alt && masks.convertDateISO(values?.data_ult_alt)}</p>
          </div>
        </Box>

        <Box className="buttons">
          {/* <Button variant="link" onClick={() => onSubmit()}>Enviar</Button> */}
          <Button type="submit">Enviar</Button>
        </Box>
      </Container>
    </Modal>
  );
};
