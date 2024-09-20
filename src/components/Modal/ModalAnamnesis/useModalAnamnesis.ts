import { RefObject } from "react"
import { modalRefProps } from ".."
import { toast } from "react-toastify"
import { useForm } from "react-hook-form"
import { useParams } from "react-router-dom"
import { useMutation, useQuery } from "@tanstack/react-query"
import { AnamnesisDefaultValue } from "@/validators/anamnesisValidator"
import anamnesisService, { AnamnesisProps } from "@/services/anamnesisService"
import { useAnamnesis } from "@/pages/Patient/Anamnesis/useAnamnesis"


export const useModalAnamnesis = (
  values: any,
  modalRef: RefObject<modalRefProps>
) => {
  const {id} = useParams();
  const isCreate = !values;

  const { data: AnamnesisData } = useQuery({
    queryKey: ['AnamnesisData', values],
    queryFn: async () => values?.id && anamnesisService.getById(values?.id)
  })

  const anamnesisForm = useForm({
    // resolver: zodResolver(AnamnesisSchema),
    defaultValues: id ? AnamnesisData : AnamnesisDefaultValue,
  });

  const { mutateAsync: create } = useMutation({
    mutationKey: ['createAnamnesis'],
    mutationFn: (data: AnamnesisProps) => anamnesisService.create({...data, idPaciente: Number(id)})
  })

  const { mutateAsync: update } = useMutation({
    mutationKey: ['updateAnamnesis'],
    mutationFn: (data: any) => anamnesisService.update(data.id, data)
  })

  const { refetch } = useAnamnesis();

  const onSubmit = async (data?: any) => {
    console.log(data, 'data')
    try {
      if (isCreate) {
        const anamnesis = await create(data);
        console.log(anamnesis)
      } else await update(data)
      toast.success("Salvo com sucesso!");
      refetch();
      modalRef.current?.close();
    } catch (e) {
      toast.error("Ocorreu um erro!")
    }
  }

  return {
    anamnesisForm,
    onSubmit,
    AnamnesisData,
  }
}