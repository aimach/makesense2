import { useState } from "react";
import style from "./DecisionCreate.module.scss";
import FirstStep from "./FirstStep";
import SecondStep from "./SecondStep";
import ThirdStep from "./ThirdStep";
import FourthStep from "./FourthStep";
import FifthStep from "./FifthStep";
import { ChevronLeft } from "react-feather";

export default function DecisionCreate() {
  const [step, setStep] = useState<number>(0);
  const components: JSX.Element[] = [
    <FirstStep />,
    <SecondStep />,
    <ThirdStep />,
    <FourthStep />,
    <FifthStep />,
  ];

  return (
    <div>
      <div>
        <img src="" alt="title" />
      </div>
      <div>
        <div>
          {components.map((_, index) => (
            <div
              className={`${style.stepRounded} ${
                step === index ? style.stepRoundedRed : ""
              }`}
            />
          ))}
        </div>
        <div>
          <form>{components[step]}</form>
          {step > 0 && (
            <button onClick={() => setStep(step - 1)}>
              <ChevronLeft /> Retour
            </button>
          )}

          {step < 4 ? (
            <button onClick={() => setStep(step + 1)}>Etape suivante</button>
          ) : (
            <button>Publier la décision</button>
          )}
        </div>
      </div>
    </div>
  );
}
