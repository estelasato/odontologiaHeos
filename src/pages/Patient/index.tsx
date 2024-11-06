import { useState } from "react";

import { Container, LabelCont, TabsCont } from "@/pages/Registrations/styles";
import { About } from "./About";
import { Anamnesis } from "./Anamnesis";
import { useParams } from "react-router-dom";
import { Treatments } from "./Treatments";
import { Budgets } from "./Budgets";
import { ServicesList } from "../ServicesList";

export const Patient = () => {
  const {id} = useParams();
  const [step, setStep] = useState(0);

  const tabs = [
    { label: "Sobre", component: <About />, enable: true },
    { label: "Anamneses", component: <Anamnesis />, enable: id ?? false},
    { label: "Orçamentos", component: <Budgets />, enable: id ?? false },
    { label: "Serviços", component: <ServicesList />, enable: id ?? false },
    { label: "Tratamentos", component: <Treatments />, enable: true }, // sera todos os tratamentos realizados
  ];

  return (
    <Container>
      <h1>Paciente</h1>

      <TabsCont>
        {tabs.map((tab, index) => (
          <LabelCont
            $enable={!!tab.enable}
            $selected={step === index}
            key={index}
            onClick={() => tab.enable && setStep(index)}
          >
            {tab.label}
          </LabelCont>
        ))}
      </TabsCont>

      {tabs[step]?.component}
    </Container>
  );
};
