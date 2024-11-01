import { useState } from "react";

import { Country } from "./Country";
import { State } from "./State";
import { City } from "./City";
import { Container, LabelCont, TabsCont } from "./styles";

export const Registrations = () => {
  const [step, setStep] = useState(0);

  const tabs = [
    { label: "Países", component: <Country /> },
    { label: "Estados", component: <State /> },
    { label: "Cidades", component: <City /> },
  ];
  console.log('aaa')
  return (
    <Container>
      <h1>Cadastros</h1>

      <TabsCont>
        {tabs.map((tab, index) => (
          <LabelCont
            $enable
            $selected={step === index}
            key={index}
            onClick={() => setStep(index)}
          >
            {tab.label}
          </LabelCont>
        ))}
      </TabsCont>

      {tabs[step].component}
    </Container>
  );
};
