import style from "./DecisionCreate.module.scss";
import TextEditor from "../../components/globals/wysiwyg/TextEditor";
import { stepProps } from "./DecisionCreate";

export default function SecondStep({ newDecision, setNewDecision }: stepProps) {
  return (
    <>
      <div className={style.inputContainer}>
        <label>Impact</label>
        <TextEditor
          placeholder={"L'impact qu'aura ta décision"}
          newDecision={newDecision}
          setNewDecision={setNewDecision}
          decisionKey="impact"
        />
      </div>
    </>
  );
}
