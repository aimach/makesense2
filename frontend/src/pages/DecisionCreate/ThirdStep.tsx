import style from "./DecisionCreate.module.scss";
import TextEditor from "../../components/globals/wysiwyg/TextEditor";

export default function ThirdStep() {
  return (
    <>
      <div className={style.inputContainer}>
        <label>Bénéfices</label>
        <TextEditor placeholder={"Les bénéfices qu'engendrerait ta décision"} />
      </div>
      <div className={style.inputContainer}>
        <label>Risques</label>
        <TextEditor placeholder={"Les risques qu'engendrerait ta décision"} />
      </div>
    </>
  );
}
