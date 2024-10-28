import { useEffect, useRef, useState } from "react";
import { FormProvider } from "react-hook-form";
import Modal, { modalRefProps } from "..";
import { useModalSchedule } from "./useModalSchedule";
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
import { ModalConfirmation } from "../ModalConfirm";


interface ModalScheduleProps {
  modalRef: React.RefObject<any>;
}
export const ModalSchedule = ({ modalRef }: ModalScheduleProps) => {
  const [values, setValues] = useState<any>();

  const removeRef = useRef<modalRefProps>(null);

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
    onRemove,
  } = useModalSchedule(!values, modalRef, values);
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = scheduleForm;

  useEffect(() => {
    reset(values);
  }, [values]);

  return (
    <Modal
      getValues={setValues}
      ref={modalRef}
      title={"Agendamento"}
      width="650px"
    >
      <ModalConfirmation
        modalRef={removeRef}
        message="Tem certeza que deseja remover este agendamento?"
        onConfirm={() => onRemove({ idProfissional: Number(values?.idProfissional), horario: values?.horario })}
        title="Remover agendamento"
      />
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
          <Grid $template="1fr 1fr">
            <Select
              {...register("idPaciente")}
              label="Paciente*"
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
              label="Profissional*"
              disabled={!!values}
              options={professionalOpts}
              error={errors.idProfissional?.message}
            />
            {!values && (
              <Button
                spaceLabel
                onClick={() => insertProfessionalRef.current?.open()}
              >
                + Profissional
              </Button>
            )}
          </Grid>

          <Grid $template="1fr 150px 1fr">
            {/* <DatetimePicker/> */}
            <DatePicker
              disabled={!!values}
              label="Data e hora*"
              {...register("horario")}
              hasTime
              minDate={new Date()}
              minTime={new Date()}
              error={errors.horario?.message}
            />
            <Select
              // disabled
              {...register("duracao")}
              label="Duração*"
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

          {values && (
            <div onClick={() => removeRef.current?.open()}>
              <Button>Remover agendamento</Button>
            </div>
          )}
          <FooterModal
            dtCadastro={values?.dtCadastro}
            dtUltAlt={values?.dtCadastro}
            handleSubmit={handleSubmit(onSubmit)}
          />
        </Container>
      </FormProvider>
    </Modal>
  );
};
