import { useState } from "react";

import { Container, LabelCont, TabsCont } from "@/pages/Registrations/styles";
import { AccReceivable } from "./AccReceivable";

export const Financial = () => {
  // const {id} = useParams();
  const [step, setStep] = useState(0);

  const tabs = [
    { label: "Contas a Receber", component: <AccReceivable />, enable: true },
  ];

  return (
    <Container>
      <h1>Financeiro </h1>

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
