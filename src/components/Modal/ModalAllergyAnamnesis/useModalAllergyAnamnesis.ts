import { RefObject, useEffect, useMemo, useState } from "react"
import { modalRefProps } from ".."
import { useFormContext } from "react-hook-form";
import { useParams } from "react-router-dom";
import { AllergyAnamnesisSchema } from "@/validators/anamnesisValidator";


export const useModalAllergyAnamnesis = (
  modalRef: RefObject<modalRefProps>,
  list: any[],
  setList: (list: any[]) => void
) => {
  const [fieldErrors, setFieldErrors] = useState<any>(null);
  const [values, setValues] = useState<any>(null);
  const { id } = useParams();
  const { setValue } = useFormContext();

  const index = useMemo(() => {
    return values
      ? list?.length > 0
        ? values?.index
        : list?.length
      : list?.length;
  }, [values]);

  const onSubmit = (data: any) => {
    setFieldErrors(null);
    const parseData = AllergyAnamnesisSchema.safeParse(data.alergias[index])
    if (!parseData.success) {
      const errors = parseData.error.issues;
      const r = errors.reduce((acc: any, e: any) => {
        const key = e.path[0]
        acc[key] = e;
        return acc
      }, {})
      setFieldErrors(r);
    } else {
      setFieldErrors(null);
      let newL = [...list];
      if (values) {
        newL[values.index] = data.alergias[index];
      } else {
        newL.push(data.alergias[index]);
      }
      setList(newL);
      modalRef.current?.close();
    }
  };

  useEffect(() => {
    console.log(values)
    setValue("idPaciente", id ? Number(id) : undefined);
    setValue(`alergias.${index}.idAlergia`, values?.idAlergia || undefined);
    setValue(`alergias.${index}.gravidade`, values?.gravidade || '');
    setValue(`alergias.${index}.complicacoes`, values?.complicacoes || '');
    setValue(`alergias.${index}.tratamento`, values?.tratamento || '');
    setValue(`alergias.${index}.obs`, values?.obs || '');
  }, [values]);


  return {
    onSubmit,
    index,
    values,
    setValues,
    fieldErrors,
  }
}
