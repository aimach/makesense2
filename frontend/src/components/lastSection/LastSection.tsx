import { Clock } from "react-feather";
import style from "./LastSection.module.scss";
import { DecisionType } from "../../utils/types";
import DecisionCardContainer from "../decisionCard/DecisionCardContainer";

interface Props {
  allDecisions: DecisionType[];
}

export default function LastSection({ allDecisions }: Props) {
  return (
    <div>
      <div className={style.lastSectionTitle}>
        <Clock />
        <h3>Les dernières déposées</h3>
      </div>
      <DecisionCardContainer allDecisions={allDecisions} />
    </div>
  );
}
