import style from "./DecisionCreate.module.scss";
import { Plus } from "react-feather";

export default function FourthStep() {
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
