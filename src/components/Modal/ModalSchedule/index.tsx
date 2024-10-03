import { useState } from "react";
import { FormProvider } from "react-hook-form";
import Modal from "..";
import { useModalSchedule } from "./useModalSchedule";
import { Input } from "@/components/Form/Input";
import { Button } from "@/components/Button";
import { DatePicker } from "@/components/Form/DatePicker";
import { TextArea } from "@/components/Form/TextArea";
import { Select } from "@/components/Form/Select";
import { StatusOpts } from "@/utils/shared/Options";
import { Grid } from "@/config/grid";

import { ModalInsertPatient } from "../ModalInsertPatient";
import { ModalInsertProfessional } from "../ModalInsertProfessional";
import { FooterModal } from "../Footer";
import { Container } from "./style";

interface ModalScheduleProps {
  modalRef: React.RefObject<any>;
}
export const ModalSchedule = ({ modalRef }: ModalScheduleProps) => {
  const [values, setValues] = useState<any>();

  const {
    scheduleForm,
    setPatientData,
    setProfessionalData,
    insertPatientRef,
    insertProfessionalRef,
    minOpts,
    onSubmit,
    professionalOpts,
    patientOpts,
  } = useModalSchedule(!values, modalRef, values);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = scheduleForm;
  console.log(errors);

  return (
    <Modal
      getValues={setValues}
      ref={modalRef}
      title={"Agendamento"}
      width="650px"
    >
      <FormProvider {...scheduleForm}>
        <ModalInsertPatient
          modalRef={insertPatientRef}
          selectData={setPatientData}
        />
        <ModalInsertProfessional
          modalRef={insertProfessionalRef}
          selectData={setProfessionalData}
        />
        <Container>
          <Input
            {...register("id")}
            label="Código"
            width="100px"
            disabled={true}
          />
          <Grid $template="1fr 1fr">
            <Select
              {...register("idPaciente")}
              label="Paciente"
              options={patientOpts}
              error={errors.idPaciente?.message}
            />
            <Button spaceLabel onClick={() => insertPatientRef.current?.open()}>
              + Paciente
            </Button>
          </Grid>

          <Grid $template="1fr 1fr">
            <Select
              {...register("idProfissional")}
              label="Profissional"
              options={professionalOpts}
              error={errors.idProfissional?.message}
            />
            <Button
              spaceLabel
              onClick={() => insertProfessionalRef.current?.open()}
            >
              + Profissional
            </Button>
          </Grid>

          <Grid $template="1fr 150px 1fr">
            <DatePicker
              label="Data e hora"
              {...register("horario")}
              hasTime
              minDate={new Date()}
              minTime={new Date()}
              error={errors.horario?.message}
            />
            <Select
              {...register("duracao")}
              label="Duração"
              options={minOpts}
              width="150px"
              error={errors.duracao?.message}
            />
            <Select
              {...register("status")}
              label="Status"
              options={StatusOpts}
              defaultValue="AGENDADO"
            />
          </Grid>

          <TextArea
            {...register("obs")}
            label="Observação"
            fullWidth
            rows={4}
          />

          <FooterModal
            dtCadastro={new Date()}
            dtUltAlt={new Date()}
            handleSubmit={handleSubmit(onSubmit)}
          />
        </Container>
      </FormProvider>
    </Modal>
  );
};
