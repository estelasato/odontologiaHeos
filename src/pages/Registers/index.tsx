import { Container, LabelCont, TabsCont } from "@/pages/Registrations/styles";
import { useState } from "react";
import { Allergy } from "../Allergy";
import { Illnesses } from "../Illness";
import { Medication } from "../Medication";
import { Procedures } from "../Procedures";


export const Registers = () => {
  // const {id} = useParams();
  const [step, setStep] = useState(0);

  const tabs = [
    { label: "Medicamentos", component: <Medication /> },
    { label: "Doenças", component: <Illnesses />   },
    { label: "Alergias", component: <Allergy />  },
    { label: "Procedimentos", component: <Procedures /> },
  ];

  return (
    <Container>
      <h1>Cadastros gerais </h1>

      <TabsCont>
        {tabs.map((tab, index) => (
          <LabelCont
            $enable={true}
            $selected={step === index}
            key={index}
            onClick={() => setStep(index)}
          >
            {tab.label}
          </LabelCont>
        ))}
      </TabsCont>

      {tabs[step]?.component}
    </Container>
  )
}
