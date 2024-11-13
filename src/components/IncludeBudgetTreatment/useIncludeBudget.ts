import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useFormContext } from "react-hook-form";
import { IBudgetProcedure } from ".";
import { toast } from "react-toastify";
import { modalRefProps } from "../Modal";
import { BudgetProcedureType } from "@/validators/budgetValidator";
import masks from "@/utils/masks";

export const useIncludeBudget = (setProcedures: (data: any) => void) => {
  const treatmentRef = useRef<modalRefProps>();
  const [list, setList] = useState<any>([]);
  const { setValue, getValues, watch } = useFormContext();

  function resetTreatm() {
    setValue("idProcedimento", undefined),
    setValue("procedimento", "");
    setValue("obs", "");
    setValue("valor", null);
    setValue("qtd", 1);
    setValue("subtotal", null);
  }

  const handleInsertForm = (data: IProcedure) => {
    //inserir no form de tratamento
    const exist = list?.find((r: IBudgetProcedure) => r.idProcedimento === data.id);
    // if (data.dataFim) {
    //   const df = new Date(data.dataFim);
    //   const today = new Date();
    //   today > df && toast.error("Este tratamento já foi finalizado!");
    // }
    if (exist) toast.error("Procedimento já incluso");
    else {
      setValue("idProcedimento", data.id),
      setValue("procedimento", data?.nome);
      setValue("obs", "");
      setValue("valor", data.valor);
      setValue("qtd", 1);
      setValue("subtotal", data.valor);
      treatmentRef.current?.close();
    }
  };

  function create() {
    const { idProcedimento, procedimento, obs, valor, qtd, subtotal } = getValues();
    const newL = [...list];
    newL.push({
      idProcedimento,
      nome: procedimento,
      obs,
      valor,
      qtd: Number(qtd),
      total: subtotal,
    });
    setList(newL);
    resetTreatm();
  }

  function edit(index: number) {
    const { idProcedimento, procedimento, obs, valor, qtd, subtotal } = getValues();
    let newL = [...list];
    newL[index] = {
      idProcedimento,
      nome: procedimento,
      obs,
      valor,
      qtd: Number(qtd),
      total: subtotal,
    };
    setList(newL);
  }

  const handleSave = () => {
    const idProcedimento = getValues("idProcedimento");
    if (!idProcedimento) return toast.error("Insira um procedimento");

    const index = list?.findIndex(
      (i: BudgetProcedureType) => i.idProcedimento == idProcedimento
    );

    if (index == -1) create();
    else edit(index);
  };

  const handleRemove = useCallback(
    (id: number) => {
      const newList = list?.filter((r: IBudgetProcedure) => {
        return r.idProcedimento != id;
      });

      setList(newList);
      if (newList.length == 0) {
        setValue("total", undefined)
        setValue("percDesconto", undefined)
      }
    },
    [list]
  );

  const handleEdit = useCallback(
    (id: number) => {
      const { idProcedimento, descricao, obs, valor, qtd, total } = list[id];
      setValue("idProcedimento", idProcedimento), setValue("tratamento", descricao);
      setValue("obs", obs);
      setValue("valor", valor);
      setValue("qtd", Number(qtd));
      setValue("subtotal", total);
    },
    [list]
  );

  const handleUpdateSubtotal = () => {
    const {qtd, valor} = getValues()
    const total = Number(qtd) * Number(masks.number(valor))
    setValue('subtotal', total)
  }
  const watchList = watch('procedimentos')

  useEffect(() => {
    console.log(watchList, 'watch')
    // resetTreatm();
    setList(watchList || []);
  }, [watchList]);
  // useEffect(() => {
  //   resetTreatm();
  //   setList(listData);
  // }, []);

  useEffect(() => {
    if (list && list.length > 0) {
      let sumTotal = 0;
      list.map((e: any) => {
        sumTotal += Number(masks.number(e.total));
      });
      setValue("total", sumTotal);
      setProcedures(list)
      calcDiscount()
    }
  }, [list]);

  const sumTotal = useMemo(() => {
    if (list && list.length > 0) {
      let sumTotal = 0;
      list.map((e: any) => {
        sumTotal += Number(masks.number(e.total));
      });
      setValue("total", sumTotal);
      setProcedures(list)
      return sumTotal;
    } return 0
  }, [list])

  const watchPerc = watch('percDesconto')


  function calcDiscount() {
    if (!sumTotal) return toast.error('Total inválido')
      if (watchPerc < 0 || watchPerc > 100) return toast.error('Desconto inválido')
    const perc = Number(watchPerc)
    const total = Number(sumTotal)
    const discount = total * (perc / 100)
    const newTotal = total - discount
    setValue('total', masks.currency(`${newTotal}`))
  }

  return {
    handleEdit,
    handleRemove,
    handleInsertForm,
    handleUpdateSubtotal,
    handleSave,
    treatmentRef,
    list,
    calcDiscount,
  };
};
