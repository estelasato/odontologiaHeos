import { useCallback, useEffect, useRef, useState } from "react";
import { useFormContext } from "react-hook-form";
import { IBudgetTreatm } from ".";
import { toast } from "react-toastify";
import { TreatmentsProps } from "@/services/treatmentsServices";
import { modalRefProps } from "../Modal";
import { BudgetTreatmType } from "@/validators/budgetValidator";
import masks from "@/utils/masks";

export const useIncludeBudget = (setTreatments: (data: any) => void, listData?: IBudgetTreatm[]) => {
  const treatmentRef = useRef<modalRefProps>();
  const [list, setList] = useState<any>([]);
  const { setValue, getValues, watch } = useFormContext();

  function resetTreatm() {
    setValue("idTratamento", undefined), setValue("tratamento", "");
    setValue("obs", "");
    setValue("valor", null);
    setValue("qtd", 1);
    setValue("subtotal", null);
  }

  const handleInsertForm = (data: TreatmentsProps) => {
    //inserir no form de tratamento
    const exist = list?.find((r: IBudgetTreatm) => r.idTratamento === data.id);
    if (data.dataFim) {
      const df = new Date(data.dataFim);
      const today = new Date();
      today > df && toast.error("Este tratamento já foi finalizado!");
    }
    if (exist) toast.error("Tratamento já incluso");
    else {
      setValue("idTratamento", data.id),
      setValue("tratamento", data?.descricao);
      setValue("obs", "");
      setValue("valor", null);
      setValue("qtd", 1);
      setValue("subtotal", null);
      treatmentRef.current?.close();
    }
  };

  function create() {
    const { idTratamento, tratamento, obs, valor, qtd, subtotal } = getValues();
    const newL = [...list];
    newL.push({
      idTratamento,
      descricao: tratamento,
      obs,
      valor,
      qtd: Number(qtd),
      total: subtotal,
    });
    setList(newL);
    resetTreatm();
  }

  function edit(index: number) {
    const { idTratamento, tratamento, obs, valor, qtd, subtotal } = getValues();
    let newL = [...list];
    newL[index] = {
      idTratamento,
      descricao: tratamento,
      obs,
      valor,
      qtd: Number(qtd),
      total: subtotal,
    };
    setList(newL);
  }

  const handleSave = () => {
    const idTratamento = getValues("idTratamento");
    if (!idTratamento) return toast.error("Insira um tratamento");

    const index = list?.findIndex(
      (i: BudgetTreatmType) => i.idTratamento == idTratamento
    );

    if (index == -1) create();
    else edit(index);
  };

  const handleRemove = useCallback(
    (id: number) => {
      const newList = list?.filter((r: IBudgetTreatm) => {
        return r.idTratamento != id;
      });
      console.log(newList, "remove", id, list);
      setList(newList);
    },
    [list]
  );

  const handleEdit = useCallback(
    (id: number) => {
      const { idTratamento, descricao, obs, valor, qtd, total } = list[id];
      setValue("idTratamento", idTratamento), setValue("tratamento", descricao);
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
  const watchList = watch('tratamentos')
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
      setTreatments(list)
    }
  }, [list]);

  return {
    handleEdit,
    handleRemove,
    handleInsertForm,
    handleUpdateSubtotal,
    handleSave,
    treatmentRef,
    list,
  };
};
