import paymentTermService, {
  IInstallments,
  IPaymentTerm,
} from "@/services/paymentTermService";
import {
  paymentTermsSchema,
  PaymTermsFormSchema,
} from "@/validators/paymentTermsValidator";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { modalRefProps } from "..";
import { useEffect, useState } from "react";
import paymentMethodService from "@/services/paymentMethodService";
import { toast } from "react-toastify";

export const useModalPaymTerms = (
  modalRef: React.RefObject<modalRefProps>,
  values: any
) => {
  const [listInstallm, setListInstallm] = useState<IInstallments[]>([]);
  const paymTermsForm = useForm<PaymTermsFormSchema>({
    resolver: zodResolver(paymentTermsSchema),
  });

  const {
    getValues,
    setError,
    clearErrors,
    formState: { errors },
    setValue,
  } = paymTermsForm;

  const { data: paymentTermsData } = useQuery({
    queryKey: ["paymentTermsData", values],
    queryFn: () => values?.id && paymentTermService.getById(values?.id),
  });

  const { data: paymentMethodOpt } = useQuery({
    queryKey: ["paymentMethodOpt", values],
    queryFn: () => paymentMethodService.getAll(),
    select: (data) => {
      if (data) {
        return data
          .filter((a: any) => a.status) // Filtra apenas os ativos
          .map((a: any) => ({ value: a.id, label: a.descricao })); // Mapeia para o formato desejado
      }
      return [];
    },
  });

  const getErrors = (obj: any) => {
    let hasErrors = false
    Object.keys(obj).forEach((key) => {
      const value = obj[key as keyof typeof obj];
      if (!value || (!!value && value == 0)) {
        hasErrors = true
        setError(key as any, {
          message: !!value ? "Campo inválido" : "Campo obrigatório",
        });
      }
    });
    return hasErrors
  };

  const handleInstallment = () => {
    clearErrors();
    const { numParcela, perc, dias, idFormaPag } = getValues();
    const obj = { numParcela, perc, dias, idFormaPag };


    // if (!numParcela || (!!numParcela && numParcela == 0))
    //   setError("numParcela", {
    //     message: !!numParcela ? "Campo inválido" : "Campo obrigatório",
    //   });
    // if (!perc || (!!perc && perc == 0))
    //   setError("perc", {
    //     message: !!perc ? "Campo inválido" : "Campo obrigatório",
    //   });
    // if (!dias || (!!dias && dias == 0))
    //   setError("dias", {
    //     message: !!dias ? "Campo inválido" : "Campo obrigatório",
    //   });
    // if (!idFormaPag || (!!idFormaPag && idFormaPag == 0))
    //   setError("idFormaPag", {
    //     message: !!idFormaPag ? "Campo inválido" : "Campo obrigatório",
    //   });
    console.log(getErrors(obj), 'valid', obj)
    if (!getErrors(obj)) {
      if (Object.keys(errors).length == 0) {
        // se é criacao (ja tem esse num de parcela)
        const index = listInstallm?.findIndex(
          (item) => item.numParcela === numParcela
        );
        if (index == -1) {
          createInstallment();
        } else {
          editInstallment(index);
        }
      }
    }
  };

  const createInstallment = () => {
    const { numParcela, perc, dias, idFormaPag } = getValues();

    const list = [...listInstallm];
    list.push({ numParcela, perc, dias, idFormaPag } as IInstallments);
    setListInstallm(list);
    clearInstallments();
  };
  const editInstallment = (index: number) => {
    const { numParcela, perc, dias, idFormaPag } = getValues();
    let list = [...listInstallm];
    list[index] = { numParcela, perc, dias, idFormaPag } as IInstallments;
    setListInstallm(list);
  };

  const clearInstallments = () => {
    setValue("idParcela", undefined);
    setValue("numParcela", undefined);
    setValue("dias", undefined);
    setValue("perc", undefined);
    setValue("idFormaPag", undefined);
  };

  const handleEditInstallment = (index: number) => {
    const { numParcela, perc, dias, idFormaPag } = listInstallm[index];
    setValue("numParcela", numParcela);
    setValue("dias", dias);
    setValue("perc", perc);
    console.log(idFormaPag, 'idForma', paymentMethodOpt);
    setValue("idFormaPag", idFormaPag);

    let list = listInstallm.length > 0 ? [...listInstallm] : [];
    list[index] = { numParcela, perc, dias, idFormaPag };
    setListInstallm(list);
  };

  const handleRemoveInstallment = (index: number) => {
    let list = [...listInstallm];
    list.splice(index, 1);
    setListInstallm(list);
  };

  const { mutateAsync: createPaymentTerm } = useMutation({
    mutationKey: ["createPaymentTerm"],
    mutationFn: async (data: IPaymentTerm) => {
      return paymentTermService.create(data);
    },
  });

  const { mutateAsync: updatePeymentTerm } = useMutation({
    mutationKey: ["updatePeymentTerm"],
    mutationFn: async (params: { data: IPaymentTerm; id: number }) => {
      console.log(params);
      return paymentTermService.update(params.id, params.data);
    },
  });

  const queryClient = useQueryClient();
  const onSubmit = async (data: PaymTermsFormSchema) => {
    const { percTotal } = getValues();
    const newData = {
      descricao: data.descricao,
      status: data.status,
      id: values?.id,
      parcelas: [...listInstallm],
      idFormaPag: data.idFormaPag,
    };
    if (newData.parcelas.length == 0)
      return toast.error("Insira ao menos uma parcela");
    if (percTotal != 100)
      return toast.error("A porcentagem total deve ser 100%");
    try {
      if (newData.id) {
        await updatePeymentTerm({ data: newData, id: values.id });
      } else {
        await createPaymentTerm(newData);
      }
      queryClient.invalidateQueries({ queryKey: ["paymTermsList"] });
      queryClient.invalidateQueries({ queryKey: ["paymentTermOpt"] });
      modalRef.current?.close();
      toast.success("Salvo com sucesso");
    } catch (error) {
      toast.error("Erro ao salvar condição de pagamento");
    }
  };

  useEffect(() => {
    let total = 0;
    if (Array.isArray(listInstallm) && listInstallm.length > 0) {
      listInstallm.forEach((item) => {
        total += Number(item.perc);
      });
    }
    console.log(total)
    paymTermsForm.setValue("percTotal", total);
  }, [listInstallm]);

  useEffect(() => {
    setListInstallm(paymentTermsData?.parcelas || []);
    const total = paymentTermsData?.parcelas.reduce((acc: 0, item: IInstallments) => acc + item.perc, 0);
    paymTermsForm.setValue("percTotal", total);

  }, [paymentTermsData])

  useEffect(() => {
    clearErrors();
    if (values) {
      paymTermsForm.reset({
        descricao: values.descricao,
        status: values.status,
        id: values.id,
        idFormaPag: undefined,
        numParcela: null,
        dias: null,
        perc: null,
        percTotal: null,
      });
    }
  }, [values])

  return {
    paymTermsForm,
    listInstallm,
    paymentMethodOpt,
    handleInstallment,
    handleEditInstallment,
    handleRemoveInstallment,
    onSubmit,
  };
};
