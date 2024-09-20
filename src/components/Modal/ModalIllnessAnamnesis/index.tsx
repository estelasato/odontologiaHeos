import Modal from "..";

import { FooterModal } from "../Footer";
import { Grid } from "@/config/grid";
import { Input } from "@/components/Form/Input";
import { TextArea } from "@/components/Form/TextArea";
import { useFormContext } from "react-hook-form";
import { useModalIllnessAnamnesis } from "./useModalIllnessAnamnesis";
import { Box } from "./styles";
import { Select } from "@/components/Form/Select";
import { useIncludeIllness } from "@/components/IncludeIllness/useIncluseIllness";
import { Button } from "@/components/Button";
import { useMediaQuery } from "react-responsive";
import { useEffect, useRef, useState } from "react";
import { ModalInsertIllness } from "../ModalInsertIllness";
import { BasicProps } from "@/services/basicServices";

interface IModalIllnessAnamnesis {
  modalRef: React.RefObject<any>;
  setList: (list: any) => void;
  list: any[];
}

export const ModalIllnessAnamnesis = ({
  modalRef,
  setList,
  list = [],
}: IModalIllnessAnamnesis) => {
  const { onSubmit, index, values, setValues, fieldErrors } =
    useModalIllnessAnamnesis(modalRef, list, setList);
  const addIllnessRef = useRef<any>(null);

  const { handleSubmit, register, setValue } = useFormContext();

  const { illnessOptions } = useIncludeIllness();

  const [selectIllness, setSelectIllness] = useState<BasicProps>();
  useEffect(() => {
    setValue(`doencas.${index}.idDoenca`, selectIllness?.id);
  }, [selectIllness]);

  const mobileScreen = useMediaQuery({ maxWidth: 520 });
  return (
    <Modal
      width={mobileScreen ? "90%" : "600px"}
      ref={modalRef}
      title={values ? "Edição" : "Cadastro"}
      getValues={setValues}
    >
      <ModalInsertIllness
        modalRef={addIllnessRef}
        selectData={setSelectIllness}
      />
      <Box>
        <Grid $template="1fr 1fr" $templateMd="1fr">
          <Grid
            $template="1fr 70px"
            $templateMd="1fr 70px"
            $templateSm="1fr 70px"
          >
            <Select
              {...register(`doencas.${index}.idDoenca`)}
              label="Doença"
              options={illnessOptions}
              error={fieldErrors?.idDoenca.message}
            />
            <div style={{ paddingTop: "20px" }}>
              <Button onClick={() => addIllnessRef.current?.open()}>+</Button>
            </div>
          </Grid>
          <Input
            {...register(`doencas.${index}.gravidade`)}
            label="Gravidade"
          />
        </Grid>
        <Grid $template="100px 1fr">
          <Select
            {...register(`doencas.${index}.cronica`)}
            label="Cronica"
            options={[
              { value: true, label: "Sim" },
              { value: false, label: "Não" },
            ]}
          />

          <Input
            {...register(`doencas.${index}.complicacoes`)}
            label="Complicações"
          />
        </Grid>

        <TextArea
          width="auto"
          rows={2}
          {...register(`doencas.${index}.obs`)}
          label="Obs"
        />
        <TextArea
          width="auto"
          rows={2}
          {...register(`doencas.${index}.tratamento`)}
          label="Tratamento"
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
