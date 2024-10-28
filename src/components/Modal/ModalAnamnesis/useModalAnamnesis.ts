import { RefObject } from "react"
import { modalRefProps } from ".."
import { toast } from "react-toastify"
import { useForm } from "react-hook-form"
import { useParams } from "react-router-dom"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { AnamnesisDefaultValue } from "@/validators/anamnesisValidator"
import anamnesisService, { AnamnesisProps } from "@/services/anamnesisService"
import { useAnamnesis } from "@/pages/Patient/Anamnesis/useAnamnesis"
// import { zodResolver } from "@hookform/resolvers/zod"


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
  const queryClient = useQueryClient();

  const onSubmit = async (data?: any) => {
    try {
      // TODO: ajustar validação
      const desc = anamnesisForm.getValues('queixas')
      if (!desc) return anamnesisForm.setError('queixas', {message: 'Campo obrigfatório'})
      if (isCreate) {
        await create(data);
      } else await update(data)
      queryClient.invalidateQueries({queryKey: ['anamnesisOpt', id]});
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
