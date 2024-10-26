import anamnesisService from "@/services/anamnesisService";
import budgetsService, {
  IBudget,
  IBudgetTreatm,
} from "@/services/budgetsService";
import paymentTermService, {
  IPaymentTerm,
} from "@/services/paymentTermService";
import professionalService from "@/services/professionalService";
import masks from "@/utils/masks";
import { BudgetSchema, BudgetType } from "@/validators/budgetValidator";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";

export const useBudget = (setOpen?: any, values?: IBudget) => {
  const { id } = useParams();
  const [selectData, setSelectData] = useState<any>();
  const [tratamentosList, setTratamentosList] = useState<IBudgetTreatm[]>();
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const queryClient = useQueryClient();

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
  console.log(formBudgets.formState.errors)
  const onSubmit = async (data: BudgetType) => {
    try {
      setIsLoading(true);
      const filterTrat = tratamentosList?.filter((t) => t.qtd && t.qtd > 0);
      if (
        !tratamentosList ||
        tratamentosList?.length == 0 ||
        !filterTrat ||
        filterTrat.length == 0
      )
        return toast.error("Insira ao menos um tratamento");

      let newData = {
        ...data,
        total: data.total,
        idPaciente: Number(id),
        tratamentos: filterTrat?.map((item: any) => ({
          ...item,
          idTratamento: item.idTratamento,
          total: Number(masks.number(`${item.total}`)),
          valor: Number(masks.number(`${item.valor}`)),
        })),
      };
      if (values && values.id) {
        await updateBudget({ id: values.id, data: newData });
      } else {
        if (data.status == "PENDENTE") newData.contasReceber = [];
        await createBudget(newData);
      }
      setOpen && setOpen(false);
      refetch();
      queryClient.invalidateQueries({ queryKey: ["budgets"] });
      setIsLoading(false);
      toast.success("Orçamento salvo com sucesso");
    } catch (error) {
      setIsLoading(false);
      toast.error("Erro ao salvar orçamento");
    } finally {
      setIsLoading(false);
    }
  };

  const { setValue, reset } = formBudgets;

  useEffect(() => {
    if (selectData) setValue("idCondPagamento", selectData?.id);
  }, [selectData]);

  const handlePaymentTerm = (data: IPaymentTerm) => {
    if (!data.status) {
      return toast.error("Selecione uma condição ativa");
    }
    setSelectData(data);
  };

  const watchStatus = formBudgets.watch("status");
  if (!watchStatus) setValue("status", "PENDENTE");

  useEffect(() => {
    reset(budgetData);
    // console.log(budgetData, "data");
  }, [budgetData]);

  return {
    formBudgets,
    onSubmit,
    anamnesisOpt,
    paymentTermOpt,
    professionalOpt,
    budgetData,
    isPending: isLoading,
    handlePaymentTerm,
    setTratamentosList,
  };
};
