import { useState } from "react";
import style from "./DecisionCreate.module.scss";
import FirstStep from "./FirstStep";
import SecondStep from "./SecondStep";
import ThirdStep from "./ThirdStep";
import FourthStep from "./FourthStep";
import FifthStep from "./FifthStep";
import SixthStep from "./SixthStep";
import { ChevronLeft } from "react-feather";
import formBG from "../../assets/img/form-bg.jpg";
import { DecisionType } from "../../utils/types";
import { decisionValidation } from "../../utils/validation";

export interface newDecisionProps {
  newDecision: DecisionType;
  setNewDecision: (newDecision: DecisionType) => void;
  error: { type: string; key: string };
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
    categories: [],
  });
  const [error, setError] = useState<{ type: string; key: string }>({});
  const components: JSX.Element[] = [
    <FirstStep
      newDecision={newDecision}
      setNewDecision={setNewDecision}
      error={error}
    />,
    <SecondStep
      newDecision={newDecision}
      setNewDecision={setNewDecision}
      error={error}
    />,
    <ThirdStep
      newDecision={newDecision}
      setNewDecision={setNewDecision}
      error={error}
    />,
    <FourthStep
      newDecision={newDecision}
      setNewDecision={setNewDecision}
      error={error}
    />,
    <FifthStep
      newDecision={newDecision}
      setNewDecision={setNewDecision}
      error={error}
    />,
    <SixthStep
      newDecision={newDecision}
      setNewDecision={setNewDecision}
      error={error}
    />,
  ];

  // console.log(newDecision);
  console.log(error);

  const handleClickToPassStep = () => {
    const validation = decisionValidation(step, newDecision);
    console.log(validation);
    if (validation !== undefined && validation.error) {
      setError({
        type: validation.error.details[0].type,
        key: validation.error.details[0].path[0] as string,
      });
    } else {
      setStep(step + 1);
    }
  };

  const handleClickOnPostButton = () => {
    console.log(newDecision);
  };

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

            {step < 5 ? (
              <button
                onClick={handleClickToPassStep}
                className={style.nextButton}
              >
                Etape suivante
              </button>
            ) : (
              <button
                className={style.nextButton}
                onClick={() => handleClickOnPostButton()}
              >
                Publier la décision
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
