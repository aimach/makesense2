import TextEditor from "../../components/globals/wysiwyg/TextEditor";
import style from "./DecisionCreate.module.scss";

export default function FirstStep() {
  return (
    <>
      <div className={style.inputContainer}>
        <label htmlFor="title">Titre *</label>
        <input type="text" name="title" placeholder="Le titre de ta décision" />
      </div>
      <div className={`${style.inputContainer}`}>
        <label htmlFor="description">Description *</label>
        <TextEditor placeholder={"La décision que tu dois prendre"} />
      </div>
    </>
  );
}
