import style from "./DecisionCreate.module.scss";
import { Plus } from "react-feather";
import { stepProps } from "./DecisionCreate";

export default function FourthStep({ newDecision, setNewDecision }: stepProps) {
  return (
    <>
      <div className={`${style.inputContainer} ${style.normalInput}`}>
        <label>Les experts</label>
        <button>
          <Plus />
          Ajouter un expert
        </button>
      </div>
      <div className={`${style.inputContainer} ${style.normalInput}`}>
        <label>Les impactés</label>
        <button>
          <Plus />
          Ajouter un impacté
        </button>
      </div>
    </>
  );
}
