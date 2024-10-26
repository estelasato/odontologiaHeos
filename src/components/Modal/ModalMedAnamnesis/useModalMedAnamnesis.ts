import { RefObject, useEffect, useMemo, useState } from "react";
import { modalRefProps } from "..";
import { useParams } from "react-router-dom";
import { useFormContext } from "react-hook-form";
import { useQuery } from "@tanstack/react-query";
import basicServices, { BasicProps } from "@/services/basicServices";
import { MedAnamnesisSchema } from "@/validators/anamnesisValidator";

export const useModalMedAnamnesis = (
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
    const parseData = MedAnamnesisSchema.safeParse(data.medicamentos[index])
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
        newL[values.index] = data.medicamentos[index];
      } else {
        newL.push(data.medicamentos[index]);
      }
      setList(newL);
      modalRef.current?.close();
    }
  };

  const { data: medOptions } = useQuery({
    queryKey: ["medOptions"],
    queryFn: async () => {
      return await basicServices.getAll("medications");
    },
    select: (data) => {
      const med = data?.filter((d: BasicProps) => !!d.ativo);
      const options = med?.map((i: BasicProps) => ({
        value: i.id,
        label: i.nome,
      }));
      return options;
    },
  });

  useEffect(() => {
    setValue("idPaciente", id ? Number(id) : undefined);
    setValue(`medicamentos.${index}.idMedicamento`, values?.idMedicamento || undefined);
    setValue(`medicamentos.${index}.dosagem`, values?.dosagem || '');
    setValue(`medicamentos.${index}.frequencia`, values?.frequencia || '');
    setValue(`medicamentos.${index}.motivo`, values?.motivo || '');
    setValue(`medicamentos.${index}.obs`, values?.obs || '');
  }, [values]);

  return {
    onSubmit,
    index,
    values,
    setValues,
    fieldErrors,
    medOptions,
  };
};
