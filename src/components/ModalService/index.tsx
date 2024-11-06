import { FormProvider } from "react-hook-form";
import { Select } from "../Form/Select";
import Modal, { modalRefProps } from "../Modal";
import { BoxPayment, Container, Content } from "./styles";
import { Button } from "../Button";
import { useEffect, useRef, useState } from "react";
import { IncludeAccReceivable } from "../IncludeAccReceivable";
import { Input } from "../Form/Input";
import { FooterModal } from "../Modal/Footer";
import { useModalService } from "./useModalService";
import { toast } from "react-toastify";
import { ModalInsertPaymentTerms } from "../Modal/ModalInsertPaymTerms";
import { IPaymentTerm } from "@/services/paymentTermService";
import { useBudget } from "@/pages/Patient/Budgets/Budget/useBudget";

interface IModalService {
  modalRef: React.RefObject<modalRefProps>;
  submitData?: () => void;
}

export const ModalService = ({ modalRef, submitData }: IModalService) => {
  const [values, setValues] = useState<any>();
  const { form, onSubmit, serviceData } = useModalService(submitData, values);

  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
    setValue,
    getValues,
    watch,
  } = form;

  useEffect(() => {
    if (values) {
      reset(values);
      setValue("valor", values.total || values.valor);
      setValue("percDesconto", undefined);
    }
    serviceData && reset(serviceData)
  }, [values, serviceData]);

  const watchPerc = watch("percDesconto");
  const valor = getValues("valor");

  function calcDiscount() {
    if (!valor) return toast.error("Total inválido");
    if (watchPerc && (watchPerc < 0 || watchPerc > 99))
      return toast.error("Desconto inválido");
    if (!watchPerc)  setValue("valor", values.total);
    const perc = Number(watchPerc);
    const total = Number(valor);
    const discount = total * (perc / 100);
    const newTotal = total - discount;
    setValue("valor", newTotal as any || values.total);
  }

  const handlePaymentTerm = (data: IPaymentTerm) => {
    if (!data.status) {
      return toast.error("Selecione uma condição ativa");
    }
    data.id && setValue("idCondPagamento", data.id);
  };

  const serviceOpt = [
    { value: 'EM ANDAMENTO', label: 'Em andamento' },
    { value: 'CONCLUIDO', label: 'Concluído' },
  ]

const {paymentTermOpt} = useBudget()
  const modalInsertRef = useRef<modalRefProps>(null);
  return (
    <Modal getValues={setValues} ref={modalRef} title="Serviço" width="900px">
      <FormProvider {...form}>
        <Container>
      <ModalInsertPaymentTerms
        modalRef={modalInsertRef}
        selectData={handlePaymentTerm}
      />
          <Content>
            <Input {...register("id")} label="Código" width="120px" />
            <Select
              className="select_status"
              {...register("status")}
              options={serviceOpt || []}
              label="Status"
              disabled
            />
          </Content>
          <BoxPayment>
            {/* TODO puxar resumo do orcamento */}
            <Input
              {...register("idOrcamento")}
              label="Código orçamento"
              width="120px"
              disabled
            />
            {/* TODO abrir modal para selecionar orçamento, preenche total */}

            {/* caso n crie serviço direto de um cadastro de orçamento, pode selecionar */}
            {!values && (
              <Button
                variant="link"
                spaceLabel
                // onClick={() => modalInsertRef.current?.open()}
              >
                +
              </Button>
            )}

            <Input
              mask="currency"
              // {...register("valor")}
              label="Total"
              width="120px"
              name="valor"
              control={form.control}
            />

            <Input
              width="100px"
              label="% Desconto"
              {...register("percDesconto")}
              type="number"
              placeholder="0"
              // error={errors.percDesconto?.message}
            />

            <Button variant="link" spaceLabel onClick={()=> calcDiscount()}>Salvar</Button>
          </BoxPayment>
          <BoxPayment>
            <Select
              // disabled={budgetData && budgetData?.status != 'PENDENTE'}
              width="300px"
              {...register("idCondPagamento")}
              label="Condição de Pagamento*"
              error={errors.idCondPagamento?.message}
              options={paymentTermOpt || []}
            />
            {/* {!budgetData || budgetData?.status == 'PENDENTE' && ( */}
            <Button
              variant="link"
              spaceLabel
              onClick={() => modalInsertRef.current?.open()}
            >
              +
            </Button>

            {/* )} */}
          </BoxPayment>

          <IncludeAccReceivable
            defaultValues={{
              total: valor,
              contasReceber: serviceData?.contasReceber || values?.contasReceber,
              idProfissional: values?.idProfissional,
              idCondPagamento: getValues("idCondPagamento"),
            }}
          />

          <FooterModal
            // modalRef={modalRef}
            // dtCadastro={budgetData?.dtCadastro}
            // dtUltAlt={budgetData?.dtUltAlt}
            // isLoading={isPending}
            handleSubmit={handleSubmit(onSubmit)}
          />
        </Container>
      </FormProvider>
    </Modal>
  );
};
