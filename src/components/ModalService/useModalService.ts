import saleOfServiceService, { IServiceProps } from "@/services/saleOfServiceService";
import { ServiceFormSchema, ServiceSchema } from "@/validators/serviceValidator";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";

export const useModalService = (submitData?: () => void,values?: IServiceProps) => {
  const {id} = useParams();

  const { mutateAsync: createService } = useMutation({
    mutationKey: ["createService"],
    mutationFn: (data: ServiceFormSchema) => saleOfServiceService.create(data),
  });

  const {data: serviceData} = useQuery({
    queryKey: ['serviceData', values],
    queryFn: () => values && values.id && saleOfServiceService.getById(values.id),
  })

  const form = useForm({
    resolver: zodResolver(ServiceSchema),
    // defaultValues: values || defaultValuesService
  })
  const onSubmit = async(values: any) => {
    try {
      if (!values.id) {
        await createService({...values, idPaciente: Number(id)});
        toast.success('Serviço salvo com sucesso');
        submitData && submitData();
      }
      else toast.error('atualização ainda n disponível')
    } catch(e) {
      toast.error("Erro ao salvar orçamento");
    }
  }

  return {
    onSubmit,
    form,
    serviceData,
  }
}
