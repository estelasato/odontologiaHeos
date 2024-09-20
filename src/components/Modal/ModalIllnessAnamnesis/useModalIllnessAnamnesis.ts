import { RefObject, useEffect, useMemo, useState } from "react"
import { modalRefProps } from ".."
import { useFormContext } from "react-hook-form"
import { useParams } from "react-router-dom"
import { IllnessAnamnesisSchema } from "@/validators/anamnesisValidator"

export const useModalIllnessAnamnesis = (
  modalRef: RefObject<modalRefProps>,
  list: any[],
  setList: (list: any[]) => void
) => {
  const [fieldErrors, setFieldErrors] = useState<any>(null);
  const [values, setValues] = useState<any>(null);
  const {id} = useParams();
  const {setValue} = useFormContext();

  const index = useMemo(() => {
    return values ? (list?.length > 0 ? values?.index : list?.length ): list?.length;
  }, [values]);

  const onSubmit = (data: any) => {
    setFieldErrors(null);
    const parseData = IllnessAnamnesisSchema.safeParse(data.doencas[index])
    console.log(parseData, 'ee')
    if (!parseData.success) {
      const errors = parseData.error.issues;
      const r = errors.reduce((acc: any, e: any) => {
        const key = e.path[0]
        acc[key] = e;
        return acc
      }, {})
      setFieldErrors(r);
    } else {
      let newL = [...list];
      if (values) {
        newL[values.index] = data.doencas[index];
      } else {
        newL.push(data.doencas[index]);
      }
      setList(newL);
      modalRef.current?.close();
    }
  };

  useEffect(() => {
    console.log(values)
    setFieldErrors(null);
    setValue(`doencas.${index}.idDoenca`, values?.idDoenca || undefined);
    setValue(`doencas.${index}.gravidade`, values?.gravidade || '');
    setValue(`doencas.${index}.cronica`, (typeof values?.cronica != 'boolean') ? null : values?.cronica);
    setValue(`doencas.${index}.complicacoes`, values?.complicacoes || '');
    setValue(`doencas.${index}.obs`, values?.obs || '');
    setValue(`doencas.${index}.tratamento`, values?.tratamento || '');
    setValue("idPaciente", id ? Number(id) : undefined);
  }, [values]);

  return {
    onSubmit,
    index,
    values,
    setValues,
    fieldErrors,
  }
}
