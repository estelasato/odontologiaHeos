import { motion } from "framer-motion";
import { Box, BoxPayment, Container, Content } from "./styles";
import { FormProvider } from "react-hook-form";
import { useBudget } from "./useBudget";
import { Input } from "@/components/Form/Input";
import { FaChevronLeft } from "react-icons/fa6";
import { Select } from "@/components/Form/Select";
import {
  BudgetStatusOpts,
  createBudgetStatusOpts,
} from "@/utils/shared/Options";
import { Grid } from "@/config/grid";
import { Button } from "@/components/Button";
import { FooterModal } from "@/components/Modal/Footer";
// import { IncludeBudgetProcedure } from "@/components/IncludeBudgetProcedureent";
import { ModalInsertPaymentTerms } from "@/components/Modal/ModalInsertPaymTerms";
import { modalRefProps } from "@/components/Modal";
import { useRef } from "react";
import { IncludeAccReceivable } from "@/components/IncludeAccReceivable";
import { ModalService } from "@/components/ModalService";
import { IncludeBudgetProcedure } from "@/components/IncludeBudgetTreatment";
import masks from "@/utils/masks";

// Defina as variantes de animação
const pageVariants = {
  initial: {
    opacity: 0,
    x: "100vw", // Começa fora da tela à direita
  },
  in: {
    opacity: 1,
    x: 0, // Entra na posição correta
  },
  out: {
    opacity: 0,
    x: "100vw", // Sai para fora da tela à esquerda
  },
};

const pageTransition = {
  type: "tween",
  ease: "anticipate",
  duration: 0.5,
};

interface IBudget {
  setOpen: (open: boolean) => void;
  data?: any;
}

const Budget = ({ setOpen, data }: IBudget) => {
  const {
    formBudgets,
    onSubmit,
    anamnesisOpt,
    paymentTermOpt,
    professionalOpt,
    budgetData,
    isPending,
    handlePaymentTerm,
    setProcedureList,
    modalServiceRef,
  } = useBudget(setOpen, data);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = formBudgets;

  const modalInsertRef = useRef<modalRefProps>(null);

  function submitService() {
    modalServiceRef.current?.close();
    setOpen(false);
  }
  return (
    <motion.div
      initial="initial"
      animate="in"
      exit="out"
      variants={pageVariants}
      transition={pageTransition}
      style={{ height: "calc(100vh - 185px)" }}
    >
      <ModalInsertPaymentTerms
        modalRef={modalInsertRef}
        selectData={handlePaymentTerm}
      />
      <ModalService modalRef={modalServiceRef} submitData={submitService} />
      <FormProvider {...formBudgets}>
        <Container>
          <Content>
            <FaChevronLeft onClick={() => setOpen(false)} />
            <h3>Orçamento</h3>
          </Content>

          {/* <FormContent>

          </FormContent> */}

          <Box>
            <Input
              width="100px"
              {...register("id")}
              label="Código"
              disabled
              error={errors.id?.message}
            />

            <Select
              className="select_status"
              {...register("status")}
              options={data ? BudgetStatusOpts : createBudgetStatusOpts}
              label="Status"
            />
          </Box>

          <Grid $alignItems="flex-start" $template="1fr 1fr 1fr">
            <Select
              {...register("idProfissional")}
              label="Profissional*"
              error={errors.idProfissional?.message}
              options={professionalOpt || []}
              disabled={budgetData?.status == "APROVADO"}
            />
          </Grid>

          <IncludeBudgetProcedure
            setProcedures={(data) => setProcedureList(data)}
          />

          {budgetData?.status == "APROVADO" ? (
            <Content>
              <div>
                <p>Data de cadastro</p>
                <p>{masks.convertDateISO(budgetData?.dtCadastro || new Date())}</p>
              </div>
              <div>
                <p>Data da última alteração</p>
                <p>{masks.convertDateISO(budgetData?.dtUltAlt || new Date())}</p>
              </div>
            </Content>
          ) : (
            <FooterModal
              // modalRef={modalRef}
              handleCancel={() => setOpen(false)}
              dtCadastro={budgetData?.dtCadastro}
              dtUltAlt={budgetData?.dtUltAlt}
              isLoading={isPending}
              handleSubmit={handleSubmit(onSubmit)}
            />
          )}
        </Container>
      </FormProvider>
    </motion.div>
  );
};

export default Budget;
