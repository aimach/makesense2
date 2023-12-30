import style from "./DecisionCreate.module.scss";
import TextEditor from "../../components/globals/wysiwyg/TextEditor";
import { newDecisionProps } from "./DecisionCreate";

export default function ThirdStep({
  newDecision,
  setNewDecision,
}: newDecisionProps) {
  return (
    <>
      <div className={style.inputContainer}>
        <label>Bénéfices</label>
        <TextEditor
          placeholder={"Les bénéfices qu'engendrerait ta décision"}
          newDecision={newDecision}
          setNewDecision={setNewDecision}
          decisionKey="pros"
        />
      </div>
      <div className={style.inputContainer}>
        <label>Risques</label>
        <TextEditor
          placeholder={"Les risques qu'engendrerait ta décision"}
          newDecision={newDecision}
          setNewDecision={setNewDecision}
          decisionKey="cons"
        />
      </div>
    </>
  );
}
