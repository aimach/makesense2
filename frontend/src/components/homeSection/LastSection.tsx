import { Clock } from "react-feather";
import style from "./HomeSection.module.scss";

export default function LastSection() {
  return (
    <div className={style.homeSectionTitle}>
      <Clock />
      <h3>Les dernières déposées</h3>
    </div>
  );
}
