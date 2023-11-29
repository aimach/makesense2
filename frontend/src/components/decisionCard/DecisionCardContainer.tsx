import { DecisionType } from "../../utils/types";
import DecisionCard from "./DecisionCard";
import style from "./DecisionCard.module.scss";

type DecisionCardContainerProps = {
  allDecisions: DecisionType[];
};
export default function DecisionCardContainer({
  allDecisions,
}: DecisionCardContainerProps) {
  return (
    <div className={style.decisionCardContainer}>
      {allDecisions.map((decision) => (
        <DecisionCard decision={decision} />
      ))}
    </div>
  );
}
