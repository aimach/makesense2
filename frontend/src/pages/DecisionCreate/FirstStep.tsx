import TextEditor from "../../components/globals/wysiwyg/TextEditor";
import style from "./DecisionCreate.module.scss";
import { stepProps } from "./DecisionCreate";

export default function FirstStep({ newDecision, setNewDecision }: stepProps) {
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNewDecision({ ...newDecision, [event.target.name]: event.target.value });
  };

  return (
    <>
      <div className={style.inputContainer}>
        <label htmlFor="title">Titre *</label>
        <input
          type="text"
          name="title"
          placeholder="Le titre de ta décision"
          value={newDecision.title}
          onChange={(event) => handleChange(event)}
        />
      </div>
      <div className={`${style.inputContainer}`}>
        <label htmlFor="description">Description *</label>
        <TextEditor
          placeholder={"La décision que tu dois prendre"}
          newDecision={newDecision}
          setNewDecision={setNewDecision}
          decisionKey="firstContent"
        />
      </div>
    </>
  );
}
