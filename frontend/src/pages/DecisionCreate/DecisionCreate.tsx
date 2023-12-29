import { useState } from "react";
import style from "./DecisionCreate.module.scss";
import FirstStep from "./FirstStep";
import SecondStep from "./SecondStep";
import ThirdStep from "./ThirdStep";
import FourthStep from "./FourthStep";
import FifthStep from "./FifthStep";
import { ChevronLeft } from "react-feather";
import formBG from "../../assets/img/form-bg.jpg";
import { DecisionType } from "../../utils/types";

export interface stepProps {
  newDecision: DecisionType;
  setNewDecision: (newDecision: DecisionType) => void;
}

export default function DecisionCreate() {
  const [step, setStep] = useState<number>(0);
  const [newDecision, setNewDecision] = useState<DecisionType>({
    title: "",
    firstContent: "",
    // impact: "",
    pros: "",
    cons: "",
    users: [],
    firstDeadline: "",
    firstDecision: "",
    secondDeadline: "",
    finalDecision: "",
  });
  const components: JSX.Element[] = [
    <FirstStep newDecision={newDecision} setNewDecision={setNewDecision} />,
    <SecondStep newDecision={newDecision} setNewDecision={setNewDecision} />,
    <ThirdStep newDecision={newDecision} setNewDecision={setNewDecision} />,
    <FourthStep newDecision={newDecision} setNewDecision={setNewDecision} />,
    <FifthStep newDecision={newDecision} setNewDecision={setNewDecision} />,
  ];

  return (
    <div className={style.decisionCreateContainer}>
      <div className={style.imgContainer}>
        <img src={formBG} alt="title" />
      </div>
      <div className={style.formDecisionContainer}>
        <div className={style.progressContainer}>
          {components.map((_, index) => (
            <div
              className={`${style.stepRounded} ${
                step === index ? style.stepRoundedRed : ""
              }`}
              key={index}
            />
          ))}
        </div>
        <div className={style.formContainer}>
          <form>{components[step]}</form>
          <div className={style.buttonContainer}>
            {step > 0 && (
              <button
                onClick={() => setStep(step - 1)}
                className={style.backButton}
              >
                <ChevronLeft /> Retour
              </button>
            )}

            {step < 4 ? (
              <button
                onClick={() => setStep(step + 1)}
                className={style.nextButton}
              >
                Etape suivante
              </button>
            ) : (
              <button className={style.nextButton}>Publier la décision</button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
