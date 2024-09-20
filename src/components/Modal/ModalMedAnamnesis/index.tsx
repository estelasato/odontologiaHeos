import { useFormContext } from "react-hook-form";
import Modal from "..";
import { Box } from "../ModalIllnessAnamnesis/styles";
import { Input } from "@/components/Form/Input";
import { useModalMedAnamnesis } from "./useModalMedAnamnesis";
import { Grid } from "@/config/grid";
import { Select } from "@/components/Form/Select";
import { TextArea } from "@/components/Form/TextArea";
import { FooterModal } from "../Footer";
import { Button } from "@/components/Button";
import { useEffect, useRef, useState } from "react";
import { ModalInsertMed } from "../ModalInsertMed";
import { BasicProps } from "@/services/basicServices";

interface IModalMedAnamnesis {
  modalRef: React.RefObject<any>;
  setList: (list: any) => void;
  list: any[];
}

export const ModalMedAnamnesis = ({
  modalRef,
  setList,
  list = [],
}: IModalMedAnamnesis) => {
  const { onSubmit, index, values, setValues, fieldErrors, medOptions } =
    useModalMedAnamnesis(modalRef, list, setList);
  const addMedRef = useRef<any>(null);

  const { handleSubmit, register, setValue } = useFormContext();

  const [selectData, setSelectData] = useState<BasicProps>();
  useEffect(() => {
    setValue(`medicamentos.${index}.idMedicamento`, selectData?.id);
  }, [selectData]);

  return (
    <Modal ref={modalRef} getValues={setValues}>
      <ModalInsertMed modalRef={addMedRef} selectData={setSelectData} />
      <Box>
        <Grid
          $template="1fr 75px"
          $templateMd="1fr 75px"
          $templateSm="1fr 75px"
        >
          <Select
            {...register(`medicamentos.${index}.idMedicamento`)}
            label="Medicamento"
            options={medOptions}
            error={fieldErrors?.idMedicamento?.message}
          />
          <div style={{ paddingTop: "20px" }}>
            <Button onClick={() => addMedRef.current?.open()}>+</Button>
          </div>
        </Grid>
        <Input {...register(`medicamentos.${index}.dosagem`)} error={fieldErrors?.dosagem?.message} label="Dosagem" />
        <Input
          {...register(`medicamentos.${index}.frequencia`)}
          label="Frequência"
          error={fieldErrors?.frequencia?.message}
        />
        <Input {...register(`medicamentos.${index}.motivo`)} label="Motivo" error={fieldErrors?.motivo?.message}/>
        <TextArea
          {...register(`medicamentos.${index}.obs`)}
          label="Observação"
        />

        <FooterModal
          dtCadastro={values?.dtCadastro}
          dtUltAlt={values?.dtUltAlt}
          handleSubmit={handleSubmit(onSubmit)}
        />
      </Box>
    </Modal>
  );
};
