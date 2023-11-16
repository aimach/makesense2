import style from "./DecisionCreate.module.scss";

export default function ThirdStep() {
  return (
    <>
      <div className={style.inputContainer}>
        <label>Bénéfices</label>
        <input
          type="text"
          placeholder="Les bénéfices qu'engendrerait ta décision"
        />
      </div>
      <div className={style.inputContainer}>
        <label>Risques</label>
        <input
          type="text"
          placeholder="Les risques qu'engendrerait ta décision"
        />
      </div>
    </>
  );
}
