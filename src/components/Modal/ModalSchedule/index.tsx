import { FormProvider } from "react-hook-form";
import Modal from "..";
import { useModalSchedule } from "./useModalSchedule";
import { Container } from "./style";
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

interface ModalScheduleProps {
  modalRef: React.RefObject<any>;
}
export const ModalSchedule = ({ modalRef }: ModalScheduleProps) => {
  const {
    scheduleForm,
    setPatientData,
    setProfessionalData,
    insertPatientRef,
    insertProfessionalRef,
    minOpts,
    onSubmit,
  } = useModalSchedule(true, modalRef);
  const { register, handleSubmit } = scheduleForm;

  return (
    <Modal ref={modalRef} title={"Agendamento"} width="650px">
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
          <Grid $alignItems="flex-end" $template="100px 1fr 1fr">
            <Input
              {...register("idPaciente")}
              label="Código"
              width="100px"
              disabled={true}
            />
            <Input {...register("paciente")} label="Paciente" disabled={true} />
            <Button onClick={() => insertPatientRef.current?.open()}>
              Selecionar Paciente
            </Button>
          </Grid>

          <Grid $alignItems="flex-end" $template="100px 1fr 1fr">
            <Input
              {...register("idProfissional")}
              label="Código"
              width="100px"
              disabled={true}
            />
            <Input
              {...register("profissional")}
              label="Profissional"
              disabled={true}
            />
            <Button onClick={() => insertProfessionalRef.current?.open()}>
              Selecionar Profissional
            </Button>
          </Grid>

          <Grid $template="1fr 150px 1fr">
            <DatePicker label="Data e hora" {...register("horario")} hasTime />
            <Select
              {...register("duracao")}
              label="Duração"
              options={minOpts}
              width="150px"
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
