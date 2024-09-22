import { useEffect, useRef, useState } from "react";
import { useModalAllergyAnamnesis } from "./useModalAllergyAnamnesis";
import { BasicProps } from "@/services/basicServices";
import { useFormContext } from "react-hook-form";
import Modal from "..";
import { Grid } from "@/config/grid";
import { Button } from "@/components/Button";
import { Select } from "@/components/Form/Select";
import { useIncludeAllergies } from "@/components/IncludeAllergies/useIncludeAllergies";
import { Input } from "@/components/Form/Input";
import { TextArea } from "@/components/Form/TextArea";
import { FooterModal } from "../Footer";
import { Box } from "../ModalIllnessAnamnesis/styles";
import { ModalInsertAllergy } from "./ModalInsertAllergy";

interface IModalAllergyAnamnesis {
  modalRef: React.RefObject<any>;
  setList: (list: any) => void;
  list: any[];
}

export const ModalAllergyAnamnesis = ({
  modalRef,
  setList,
  list,
}: IModalAllergyAnamnesis) => {
  const { fieldErrors, index, onSubmit, setValues, values } =
    useModalAllergyAnamnesis(modalRef, list, setList);

  const { allergyOptions } = useIncludeAllergies();
  const addAllergyRef = useRef<any>(null);
  const { handleSubmit, register, setValue } = useFormContext();

  const [selectData, setSelectData] = useState<BasicProps>();
  useEffect(() => {
    setValue(`alergias.${index}.idAlergia`, selectData?.id);
  }, [selectData]);

  return (
    <Modal ref={modalRef} getValues={setValues}>
      <ModalInsertAllergy modalRef={addAllergyRef} selectData={setSelectData}/>
      <Box>
        <Grid
          $template="1fr 75px"
          $templateMd="1fr 75px"
          $templateSm="1fr 75px"
        >
          <Select
            {...register(`alergias.${index}.idAlergia`)}
            label="Alergia"
            options={allergyOptions}
            error={fieldErrors?.idAlergia?.message}
          />
          <div style={{ paddingTop: "22px" }}>
            <Button onClick={() => addAllergyRef.current?.open()}>+</Button>
          </div>
        </Grid>

        <Input
          {...register(`alergias.${index}.gravidade`)}
          label="Gravidade"
          error={fieldErrors?.frequencia?.message}
        />
        <Input
          {...register(`alergias.${index}.complicacoes`)}
          label="Complicações"
          error={fieldErrors?.frequencia?.message}
        />
        <Input
          {...register(`alergias.${index}.tratamento`)}
          label="Tratamento"
          error={fieldErrors?.frequencia?.message}
        />
        <TextArea {...register(`alergias.${index}.obs`)} label="Observação" />

        <FooterModal
          dtCadastro={values?.dtCadastro}
          dtUltAlt={values?.dtUltAlt}
          handleSubmit={handleSubmit(onSubmit)}
        />
      </Box>
    </Modal>
  );
};
