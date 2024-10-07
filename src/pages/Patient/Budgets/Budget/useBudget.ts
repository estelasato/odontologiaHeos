import anamnesisService from "@/services/anamnesisService";
import budgetsService, { IBudget } from "@/services/budgetsService";
import paymentTermService from "@/services/paymentTermService";
import professionalService from "@/services/professionalService";
import masks from "@/utils/masks";
import { BudgetSchema, BudgetType } from "@/validators/budgetValidator";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";

export const useBudget = (setOpen?: any, values?: IBudget) => {
  const { id } = useParams();
  const formBudgets = useForm<BudgetType>({
    resolver: zodResolver(BudgetSchema),
  });
  const { data: anamnesisOpt } = useQuery({
    queryKey: ["anamnesisOpt", id],
    queryFn: () => anamnesisService.getAll({ idPaciente: Number(id) }),
    select: (data) => data.map((a: any) => ({ value: a.id, label: a.queixas })),
  });

  const { data: budgetData, refetch } = useQuery({
    queryKey: ["budgetData", values],
    queryFn: () => values?.id && budgetsService.getById(values?.id),
  });

  const { data: professionalOpt } = useQuery({
    queryKey: ["professionalOpt", id],
    queryFn: () => professionalService.getAll(),
    select: (data) => {
      if (data) {
        return data
          ?.filter((a: any) => a.ativo) // Filtra apenas os ativos
          ?.map((a: any) => ({ value: a.id, label: a.nome })); // Mapeia para o formato desejado
      }
      return [];
    },
  });

  const { data: paymentTermOpt } = useQuery({
    queryKey: ["paymentTermOpt", id],
    queryFn: () => paymentTermService.getAll(),
    select: (data) => {
      if (data) {
        return data
          .filter((a: any) => a.status) // Filtra apenas os ativos
          .map((a: any) => ({ value: a.id, label: a.descricao })); // Mapeia para o formato desejado
      }
      return [];
    },
  });

  const { mutateAsync: createBudget, isPending: pendingCreate } = useMutation({
    mutationKey: ["createBudget"],
    mutationFn: (data: any) => budgetsService.create(data),
  });

  const { mutateAsync: updateBudget, isPending: pendingUpdate } = useMutation({
    mutationKey: ["updateBudget"],
    mutationFn: (params: { id: number; data: any }) =>
      budgetsService.update(params.id, params.data),
  });

  // corrigir orçamento
  // console.log(formBudgets.formState.errors, formBudgets.getValues());
  // console.log(formBudgets.formState.errors, "errors");
  const onSubmit = async (data: BudgetType) => {
    const newData = {
      ...data,
      total: data.total,
      idPaciente: Number(id),
      tratamentos: data.tratamentos?.map((item: any) => ({
        ...item,
        idTratamento: item.idTratamento,
        total: Number(masks.number(`${item.total}`)),
        valor: Number(masks.number(`${item.valor}`)),
      })),
    };
    if (!data.tratamentos || data.tratamentos?.length == 0)
      return toast.error("Insira ao menos um tratamento");
    // console.log(newData, "newData");
    try {
      if (values && values.id) {
        await updateBudget({ id: values.id, data: newData });
      } else await createBudget(newData);
      setOpen && setOpen(false);
      refetch();
      toast.success("Orçamento salvo com sucesso");
    } catch (error) {
      toast.error("Erro ao salvar orçamento");
    }
  };

  return {
    formBudgets,
    onSubmit,
    anamnesisOpt,
    paymentTermOpt,
    professionalOpt,
    budgetData,
    isPending: pendingCreate || pendingUpdate,
  };
};
