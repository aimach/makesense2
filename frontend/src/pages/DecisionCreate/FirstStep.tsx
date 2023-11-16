import style from "./DecisionCreate.module.scss";

export default function FirstStep() {
  return (
    <>
      <div className={style.inputContainer}>
        <label htmlFor="title">Titre *</label>
        <input type="text" name="title" placeholder="Le titre de ta décision" />
      </div>
      <div className={style.inputContainer}>
        <label htmlFor="description">Description *</label>
        <input
          type="text"
          name="description"
          placeholder="Décris ta décision"
        />
      </div>
    </>
  );
}
