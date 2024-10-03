import { motion } from "framer-motion";
import { Box, Container, Content } from "./styles";
import { FormProvider } from "react-hook-form";
import { useBudget } from "./useBudget";
import { Input } from "@/components/Form/Input";
import { FaChevronLeft } from "react-icons/fa6";
import { Select } from "@/components/Form/Select";
import { BudgetStatusOpts } from "@/utils/shared/Options";
import { Grid } from "@/config/grid";
import { Button } from "@/components/Button";
import { FooterModal } from "@/components/Modal/Footer";
import { IncludeBudgetTreatm } from "@/components/IncludeBudgetTreatment";

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
}

const Budget = ({ setOpen }: IBudget) => {
  const {
    formBudgets,
    onSubmit,
    anamnesisOpt,
    paymentTermOpt,
    professionalOpt,
  } = useBudget();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = formBudgets;

  console.log(errors, "errors");

  return (
    <motion.div
      initial="initial"
      animate="in"
      exit="out"
      variants={pageVariants}
      transition={pageTransition}
      style={{ height: "calc(100vh - 185px)" }}
    >
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
              options={BudgetStatusOpts}
              label="Status"
            />
          </Box>

          <Grid $alignItems="flex-end" $template="1fr 1fr 1fr">
            <Grid $template="1fr 60px" $templateMd="1fr 60px" $templateSm="1fr 60px" $alignItems="flex-end">
              <Select
                // width="120px"
                {...register("idAnamnese")}
                label="Anamnese"
                error={errors.idAnamnese?.message}
                options={anamnesisOpt || []}
              />
              <Button variant="link">+</Button>
            </Grid>

            <Grid $template="1fr 60px" $templateMd="1fr 60px" $templateSm="1fr 60px" $alignItems="flex-end">
              <Select
                {...register("idProfissional")}
                label="Profissional"
                error={errors.idProfissional?.message}
                options={professionalOpt || []}
              />
              <Button variant="link">+</Button>
            </Grid>

            <Grid $template="1fr 60px" $templateMd="1fr 60px" $templateSm="1fr 60px" $alignItems="flex-end">
              <Select
                {...register("idCondPagamento")}
                label="Condição de Pagamento"
                error={errors.idCondPagamento?.message}
                options={paymentTermOpt || []}
              />
              <Button variant="link">+</Button>
            </Grid>
          </Grid>

          <IncludeBudgetTreatm/>

          <FooterModal
            // modalRef={modalRef}
            // dtCadastro={values?.dtCadastro}
            // dtUltAlt={values?.dtUltAlt}
            handleSubmit={handleSubmit(onSubmit)}
          />
        </Container>
      </FormProvider>
    </motion.div>
  );
};

export default Budget;
