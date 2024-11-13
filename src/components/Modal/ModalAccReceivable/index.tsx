import { FormProvider, useForm } from "react-hook-form";
import Modal, { modalRefProps } from "..";
import { Container } from "./styles";
import { Input } from "@/components/Form/Input";
import { Grid } from "@/config/grid";

import { FooterModal } from "../Footer";
import { useEffect, useState } from "react";
import { useModalAccReceivable } from "./useModalAccReceivable";
import { IPaymTerms } from "@/components/IncludeAccReceivable";
import { IPaymentMethod } from "@/services/paymentMethodService";
import { AccReceivableType } from "@/validators/accReceivableValidator";

interface IModalAccReceivable {
  modalRef: React.RefObject<modalRefProps>;
}

export const ModalAccReceivable = ({ modalRef }: IModalAccReceivable) => {
  const [values, setValues] = useState<accReceivableList>();

  const {form, handlePayment, paymentMethods} = useModalAccReceivable(modalRef, values)
  const { register, handleSubmit } = form

  useEffect(() => {
    const id = form.getValues("idFormaPag")
    const paymentMethod = paymentMethods?.find((item: IPaymentMethod) => item.id === id)
    form.setValue("formaPag", paymentMethod?.descricao)
  }, [paymentMethods])

  return(
    <Modal ref={modalRef} width="620px" getValues={setValues}>
      <FormProvider {...form}>

      <Container>
        <h1>Parcela</h1>

        <Input {...register("id")} label="Código" width="120px" />

        <Grid $template="130px 1fr">
            <Input
              {...register("idPaciente")}
              label="Código paciente"
              disabled

            />
            <Input
              {...register("nomePaciente")}
              label="Paciente"
              disabled
            />
          </Grid>
        <Grid $template="130px 1fr">
            <Input
              {...register("idFormaPag")}
              label="Código Pagamento"
              disabled

            />
            <Input
              {...register("formaPag")}
              label="Forma de Pagamento"
              disabled
            />
          </Grid>

          <Grid $template="1fr 1fr 1fr" $templateMd="1fr fr 1fr">
            <Input
              {...register("parcela")}
              label="N° Parcela"
              disabled
            />
            <Input
              // {...register("valorParcela")}
              label="Valor Parcela"
              mask="currency"
              disabled
              control={form.control}
              name="valorParcela"
            />
            <Input
              label="Data de Vencimento"
              disabled
              control={form.control}
              name="dtVencimento"
              mask="convertToDateRegex"
            />
          </Grid>
{/*
          <Grid $template="1fr 1fr 1fr">
            <Input
              {...register("juros")}
              label="Juros"
              disabled
            />
            <Input
              {...register("Multa")}
              label="Multa"
              disabled
            />
            <Input
              {...register("desconto")}
              label="Desconto"
              disabled
            />
          </Grid> */}
          <FooterModal
            labelConfirmBtn={values?.situacao === 'PAGO' ? 'Parcela paga' : "Marcar como paga"}
            // isLoading={isLoading}
            modalRef={modalRef}
            dtCadastro={values?.dtCadastro}
            dtUltAlt={values?.dtUltAlt}
            handleSubmit={handleSubmit((e) => values?.situacao == 'PAGO' ? '' : handlePayment())}
          />
      </Container>
      </FormProvider>
    </Modal>
  )
}
