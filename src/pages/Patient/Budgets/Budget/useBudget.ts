import { modalRefProps } from "@/components/Modal";
import anamnesisService from "@/services/anamnesisService";
import budgetsService, {
  IBudget,
  IBudgetProcedures,
} from "@/services/budgetsService";
import paymentTermService, {
  IPaymentTerm,
} from "@/services/paymentTermService";
import professionalService from "@/services/professionalService";
import masks from "@/utils/masks";
import { BudgetSchema, BudgetType } from "@/validators/budgetValidator";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";

export const useBudget = (setOpen?: any, values?: IBudget) => {
  const { id } = useParams();
  const [selectData, setSelectData] = useState<any>();
  const [procedureList, setProcedureList] = useState<IBudgetProcedures[]>();
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const modalServiceRef = useRef<modalRefProps>(null);

  const queryClient = useQueryClient();

  // const formBudgets = useForm<any>({
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

  const { mutateAsync: createBudget } = useMutation({
    mutationKey: ["createBudget"],
    mutationFn: (data: any) => budgetsService.create(data),
  });

  const { mutateAsync: updateBudget } = useMutation({
    mutationKey: ["updateBudget"],
    mutationFn: (params: { id: number; data: any }) =>
      budgetsService.update(params.id, params.data),
  });
  // console.log(formBudgets.formState.errors)
  const onSubmit = async (data: BudgetType) => {
    try {
      setIsLoading(true);
      // console.log(data)
      const filterProc = procedureList?.filter((t) => t.qtd && t.qtd > 0);
      if (
        !procedureList ||
        procedureList?.length == 0 ||
        !filterProc ||
        filterProc.length == 0
      )
        return toast.error("Insira ao menos um tratamento");
      const newObj = {
        id: data?.id,
        idProfissional: data?.idProfissional,
        idPaciente: Number(id),
        percDesconto: data?.percDesconto,
        status: data?.status,
        total: data?.total,
        procedimentos: filterProc?.map((item: any) => ({
          ...item,
          idTratamento: item.idTratamento,
          total: Number(masks.number(`${item.total}`)),
          valor: Number(masks.number(`${item.valor}`)),
        })),
      };

      let result: IBudget | undefined;
      if (values && values.id) {
      // if (values && values.id && values.status != 'APROVADO') {
        await updateBudget({ id: values.id, data: newObj });
      }

      else {
        result = await createBudget(newObj);

        if (data.status != "APROVADO") {
          setOpen && setOpen(false);
          refetch();
        }
      }

      queryClient.invalidateQueries({ queryKey: ["budgets"] });
      setIsLoading(false);
      toast.success("Orçamento salvo com sucesso");

      // // abre modal de serviço passando o orçamento aprovado
      if (data.status == "APROVADO")
      (values?.id || result?.id) && modalServiceRef.current?.open({ idOrcamento: values?.id || result?.id, total: data.total, idProfissional: data.idProfissional });
    } catch (error) {
      setIsLoading(false);
      toast.error("Erro ao salvar orçamento");
    } finally {
      setIsLoading(false);
    }
  };

  const { setValue, reset } = formBudgets;

  // useEffect(() => {
  //   if (selectData) setValue("idCondPagamento", selectData?.id);
  // }, [selectData]);

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
    setProcedureList,
    modalServiceRef,
  };
};
