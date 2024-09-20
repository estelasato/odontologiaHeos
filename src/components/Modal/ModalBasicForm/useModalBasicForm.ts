import { RefObject } from "react"
import { modalRefProps } from ".."
import { useForm } from "react-hook-form"
import { BasicFormSchema, BasicSchema, defaultValuesBasicForm } from "@/validators/basicFormValidator"
import { zodResolver } from "@hookform/resolvers/zod"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import basicServices, { BasicProps } from "@/services/basicServices"
import { useBasicForm } from "@/pages/shared/useBasicForm"
import { toast } from "react-toastify"


export const useModalBasicForm = (
  type: string,
  isCreate = false,
  modalRef: RefObject<modalRefProps>
) => {

  const basicForm = useForm<BasicFormSchema>({
    resolver: zodResolver(BasicSchema),
    defaultValues: defaultValuesBasicForm,
  });

  const { mutateAsync: create } = useMutation({
    mutationKey: [`create-${type}`],
    mutationFn: (data: BasicProps) => basicServices.create(type, data)
  })

  const { mutateAsync: update } = useMutation({
    mutationKey: [`update-${type}`],
    mutationFn: (data: any) => basicServices.update(type, data.id, data)
  })

  const { refetch } = useBasicForm(type);
  const queryClient = useQueryClient();

  const onSubmit = async (data?: any) => {
    try {
      if (isCreate) {
        await create(data);
      } else await update(data)
      toast.success("Salvo com sucesso!");

      switch (type) {
        case 'illness':
          queryClient.invalidateQueries({ queryKey: ['illnessOptions'] });
          break;
        case 'medications':
          queryClient.invalidateQueries({ queryKey: ['medOptions'] });
          break;
      }
      refetch();
      modalRef.current?.close();
    } catch (e) {
      toast.error("Ocorreu um erro!")
    }
  }

  return {
    basicForm,
    onSubmit,
  }
}
