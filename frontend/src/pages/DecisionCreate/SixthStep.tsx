import style from "./DecisionCreate.module.scss";
import { newDecisionProps } from "./DecisionCreate";
import { format } from "date-fns/format";

export default function SixthStep({
  newDecision,
  setNewDecision,
}: newDecisionProps) {
  console.log(newDecision);
  return (
    <div>
      <h3>Définir le calendrier</h3>
      <div className={style.dateContainer}>
        <label htmlFor="firstDeadline">Deadline pour donner son avis</label>
        <input
          type="date"
          value={newDecision.firstDeadline}
          min={format(new Date(), "yyyy-MM-dd")}
          required
          onChange={(event) =>
            setNewDecision({
              ...newDecision,
              firstDeadline: event.target.value,
            })
          }
        />
        <label htmlFor="firstDeadline">
          Date de la prise de décision définitive
        </label>
        <input
          type="date"
          value={newDecision.firstDecision}
          min={format(new Date(), "yyyy-MM-dd")}
          required
          onChange={(event) =>
            setNewDecision({
              ...newDecision,
              firstDecision: event.target.value,
            })
          }
        />
      </div>
    </div>
  );
}
