import { useEffect, useMemo, useRef, useState } from "react";
import Modal, { modalRefProps } from "..";
import { Container, FormCont } from "./styles";
import { Input } from "@/components/Form/Input";
import { useModalPaymTerms } from "./useModalPaymTerms";
import { FormProvider } from "react-hook-form";
import { Switch } from "@/components/Switch";
import { IPaymentTerm } from "@/services/paymentTermService";
import { Grid } from "@/config/grid";
import Table from "@/components/Table";
import { Select } from "@/components/Form/Select";
import { Button } from "@/components/Button";
import { ModalInsertPaymMethod } from "../ModalInsertPaymMethod";
import { FooterModal } from "../Footer";
import { TableIconColumn } from "@/pages/shared/iconsTable";

interface ModalPaymentTermProps {
  modalRef: React.RefObject<modalRefProps>;
}
export const ModalPaymentTerm = ({ modalRef }: ModalPaymentTermProps) => {
  const [values, setValues] = useState<IPaymentTerm | undefined>();
  const {
    paymTermsForm,
    listInstallm,
    paymentMethodOpt,
    handleInstallment,
    handleEditInstallment,
    handleRemoveInstallment,
    onSubmit,
  } = useModalPaymTerms(modalRef, values);
  const {
    register,
    formState: { errors },
    handleSubmit,
    clearErrors,
  } = paymTermsForm;

  useEffect(() => {
    clearErrors();
  }, [values]);

  const cols = useMemo(
    () => [
      {
        accessorKey: "numParcela",
        header: "Nº Parcela",
      },
      {
        accessorKey: "dias",
        header: "Dias",
      },
      {
        accessorKey: "perc",
        header: "%",
        cell: (row: any) => {
          return <>{row.row.original.perc}%</>;
        },
      },
      {
        accessorKey: "idFormaPag",
        header: "Cód. Forma Pag.",
        meta: { alignText: "center" },
      },
      {
        accessorKey: "FormaPagamento",
        header: "Forma de Pagamento",
        cell: (row: any) => {
          const paym = paymentMethodOpt?.find(
            (p: any) => p.value === row.row.original.idFormaPag
          );
          return <>{paym?.label || ""}</>;
        },
      },
      {
        header: "",
        accessorKey: "delete",
        meta: { alignText: "right" },
        cell: (row: any) => (
          <TableIconColumn
            handleEdit={() => handleEditInstallment(row.row.index)}
            handleRemove={() => handleRemoveInstallment(row.row.index)}
          />
        ),
      },
    ],
    [listInstallm, paymentMethodOpt]
  );

  const insertRef = useRef<modalRefProps>(null);
  return (
    <Modal ref={modalRef} getValues={setValues} width="800px">
      <FormProvider {...paymTermsForm}>
        <ModalInsertPaymMethod
          modalRef={insertRef}
          selectData={(e) => console.log(e)}
        />
        <Container>
          <h2>{values ? "Edição" : "Cadastro"}</h2>

          <Grid $template="1fr 1fr" $templateMd="1fr 1fr">
            <Grid $template="100px 1fr" $templateMd="100px 1fr">
              <Input {...register("id")} label="Código" disabled />

              <Input
                {...register("descricao")}
                label="Condição de Pagamento*"
                error={errors.descricao?.message}
              />
            </Grid>

            <Grid
              $template="1fr 1fr 1fr 1fr"
              $templateMd="1fr 1fr 1fr 1fr"
              $templateSm="1fr 1fr 1fr 1fr"
            >
              <Input
                {...register("desconto")}
                label="Desconto %"
                type="number"
                error={errors.desconto?.message}
              />
              <Input
                {...register("juros")}
                label="Juros %"
                type="number"
                error={errors.juros?.message}
              />
              <Input
                {...register("multa")}
                label="Multa %"
                type="number"
                error={errors.multa?.message}
              />
              <Switch
                value={values?.status}
                {...register("status")}
                label="Ativo"
              />
            </Grid>
          </Grid>
          <FormCont>
            <Grid $template="1fr 1fr">
              <Grid
                $template="75px 1fr 1fr 1fr"
                $templateMd="75px 1fr 1fr 1fr"
                $templateSm="1fr 1fr"
              >
                <Input
                  {...register("numParcela")}
                  label="Nº Parcela*"
                  mask="number"
                  error={errors.numParcela?.message}
                />
                <Input
                  {...register("dias")}
                  label="dias*"
                  mask="number"
                  error={errors.dias?.message}
                />
                <Input
                  {...register("perc")}
                  label="%*"
                  type="number"
                  error={errors.perc?.message}
                />
                <Input
                  {...register("percTotal")}
                  type="number"
                  label="% Total"
                  disabled
                />
              </Grid>

              <Grid
                $template="1fr 70px"
                $templateMd="1fr 70px"
                $templateSm="1fr 70px"
              >
                <Select
                  {...register("idFormaPag")}
                  label="Forma de Pagamento*"
                  options={paymentMethodOpt}
                  error={errors.idFormaPag?.message}
                />
                <Button spaceLabel onClick={() => insertRef.current?.open()}>
                  +
                </Button>
              </Grid>
            </Grid>

            <Button variant="link" onClick={() => handleInstallment()}>
              Salvar parcela
            </Button>
          </FormCont>

          <FormCont>
            <Table cols={cols} data={listInstallm || []} />
          </FormCont>

          <FooterModal
            modalRef={modalRef}
            dtCadastro={values?.dtCadastro || new Date()}
            dtUltAlt={values?.dtUltAlt || new Date()}
            handleSubmit={handleSubmit(onSubmit)}
          />
        </Container>
      </FormProvider>
    </Modal>
  );
};
