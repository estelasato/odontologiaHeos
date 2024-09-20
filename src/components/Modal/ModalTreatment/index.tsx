import { RefObject, useEffect, useRef, useState } from "react";
import Modal, { modalRefProps } from "..";
import { FormProvider } from "react-hook-form";
import { Box, Container } from "./styles";
import { useModalTreatment } from "./useModalTreatment";
import { DatePicker } from "@/components/Form/DatePicker";
import { TextArea } from "@/components/Form/TextArea";
import { Input } from "@/components/Form/Input";
import { Select } from "@/components/Form/Select";
import { Grid } from "@/config/grid";
import { toothsOptions } from "@/utils/toothsOptions";
import { Button } from "@/components/Button";
import { ModalInsertAnamnesis } from "../ModalInsertAnamnesis";
import { FooterModal } from "../Footer";
import { TreatmentsProps } from "@/services/treatmentsServices";

interface ModalTreatmentProps {
  modalRef: RefObject<any>;
}

export const ModalTreatment = ({ modalRef }: ModalTreatmentProps) => {
  const [values, setValues] = useState<TreatmentsProps | null>(null);
  const { treatmentForm, professionalOpts, onSubmit } = useModalTreatment();
  const {
    reset,
    register,
    setValue,
    formState: { errors },
    handleSubmit
  } = treatmentForm;
  const modalAnamnesisRef = useRef<modalRefProps>();

  const handleInclude = (data: any) => {
    // refetch();

    setValue("idAnamnese", data.id);
    modalAnamnesisRef.current?.close();
  };

  useEffect(() => {
    if (values) {
      reset(values)
    } else {
      reset()
    }

  }, [values])

  return (
    <Modal ref={modalRef} title="Tratamento" getValues={setValues}>
      <ModalInsertAnamnesis
        modalRef={modalAnamnesisRef}
        selectData={(data) => handleInclude(data)}
      />
      <FormProvider {...treatmentForm}>
        <Container>
          <Input disabled {...register("id")} label="Código" width="100px" />
          <Grid>
            <DatePicker {...register("dataInicio")} label="Data de início" />
            <DatePicker {...register("dataFim")} label="Data de término" />
          </Grid>
          <TextArea {...register("descricao")} label="Descrição" />
          {/* <Input {...register('dente')} label="Nº Dente" width="100px"/> */}

          <Select
            {...register("dente")}
            label="Dente"
            options={toothsOptions}
          />

          {/* <Input {...register('idProfissional')} disabled/> */}
          <Select
            {...register("idProfissional")}
            label="Profissional"
            options={professionalOpts}
          />
          <Box>
            <Input
              width="100px"
              {...register("idAnamnese")}
              label="Anamnese"
              error={errors.idAnamnese?.message}
            />
            <Button
              variant="link"
              onClick={() => modalAnamnesisRef.current?.open()}
            >
              + Anamnese
            </Button>
          </Box>

          <FooterModal
            dtCadastro={values?.dtCadastro}
            dtUltAlt={values?.dtUltAlt}
            handleSubmit={handleSubmit(onSubmit)}
          />
        </Container>
      </FormProvider>
    </Modal>
  );
};
