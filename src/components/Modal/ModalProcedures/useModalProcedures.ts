import { RefObject } from "react"
import { modalRefProps } from ".."
import { useParams } from "react-router-dom";
import { useMutation, useQuery } from "@tanstack/react-query";
import procedureService from "@/services/procedureService";
import { useForm } from "react-hook-form";
import { defaultValuesProcedure, ProcedureSchema } from "@/validators/procedureValidator";
import { useProcedures } from "@/pages/Procedures/useProcedures";
import { toast } from "react-toastify";
import { zodResolver } from "@hookform/resolvers/zod";

export const useModalProcedures = (
  modalRef: RefObject<modalRefProps>,
  values?: any,
) => {
  const {id} = useParams();
  const isCreate = !values;

  const { data: proceduresData } = useQuery({
    queryKey: ['proceduresData', values],
    queryFn: async () => values?.id && procedureService.getById(values?.id)
  })


  const form = useForm({
    resolver: zodResolver(ProcedureSchema),
    defaultValues: id ? proceduresData : defaultValuesProcedure,
  });

  const { mutateAsync: create } = useMutation({
    mutationKey: ['createProcedures'],
    mutationFn: (data: IProcedure) => procedureService.create(data)
  })

  const { mutateAsync: update } = useMutation({
    mutationKey: ['updateProcedures'],
    mutationFn: (data: any) => procedureService.update(data.id, data)
  })

  const { refetch } = useProcedures();

  const onSubmit = async (data?: any) => {
    try {
      if (isCreate) {
        await create(data);
      } else await update(data)
      toast.success("Salvo com sucesso!");
      refetch();
      modalRef.current?.close();
    } catch (e) {
      toast.error("Ocorreu um erro!")
    }
  }

  return {
    form,
    onSubmit,
    proceduresData,
  }
}
