import { RefObject } from "react"
import { modalRefProps } from ".."
import { toast } from "react-toastify"
import { useForm } from "react-hook-form"
import { useParams } from "react-router-dom"
import { zodResolver } from "@hookform/resolvers/zod"
import { useMutation } from "@tanstack/react-query"
import { AnamnesisFormSchema, AnamnesisDefaultValue, AnamnesisSchema } from "@/validators/anamnesisValidator"
import anamnesisService, { AnamnesisProps } from "@/services/anamnesisService"
import { useAnamnesis } from "@/pages/Patient/Anamnesis/useAnamnesis"


export const useModalAnamnesis = (
  isCreate = false,
  modalRef: RefObject<modalRefProps>
) => {
  const {id} = useParams();

  const anamnesisForm = useForm<AnamnesisFormSchema>({
    resolver: zodResolver(AnamnesisSchema),
    defaultValues: AnamnesisDefaultValue,
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
    anamnesisForm,
    onSubmit,
  }
}
