import style from "./DecisionCreate.module.scss";

export default function SecondStep() {
  return (
    <>
      <div className={style.inputContainer}>
        <label>Impact</label>
        <input
          type="text"
          placeholder="L'impact que peut avoir ta décision"
          className={style.inputContainer}
        />
      </div>
    </>
  );
}
