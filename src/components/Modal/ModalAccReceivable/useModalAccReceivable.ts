import accReceivableService from "@/services/accReceivableService";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { modalRefProps } from "..";
import paymentMethodService from "@/services/paymentMethodService";
import { useAccReceivable } from "@/pages/Financial/AccReceivable/useAccReceivable";

export const useModalAccReceivable = (
  modalRef: React.RefObject<modalRefProps>,
  values?: accReceivableList) => {

  const form = useForm();

  const queryClient = useQueryClient();

  const {mutateAsync: markAsPaid} = useMutation({
    mutationKey: ['markAsPaid'],
    mutationFn: async (id: number) => accReceivableService.markAsPaid(id),
  })

  const {data: paymentMethods} = useQuery({
    queryKey: ['paymentMethods'],
    queryFn: () => paymentMethodService.getAll()
  })

  const { refetch } = useAccReceivable()

  const handlePayment = async () => {
    try {
      values?.id && markAsPaid(values?.id);
      toast.success("Parcela marcada como paga");
      queryClient.invalidateQueries({ queryKey: ['accReceivableList'] });
      refetch();
      modalRef.current?.close();
    } catch (e) {
      toast.error("Erro ao marcar como paga");
    }
  };

  // TODO:  calc multa juros desconto etc
  useEffect(() => {
    if (values) form.reset(values);
  }, [values]);

  return {
    form,
    handlePayment,
    paymentMethods,
  };
};
