import style from "./DecisionCreate.module.scss";
import TextEditor from "../../components/globals/wysiwyg/TextEditor";

export default function SecondStep() {
  return (
    <>
      <div className={style.inputContainer}>
        <label>Impact</label>
        <TextEditor placeholder={"L'impact qu'aura ta décision"} />
      </div>
    </>
  );
}
