import { useParams } from "react-router-dom";
import style from "./DecisionPage.module.scss";

export default function DecisionPage() {
  const { decisionId } = useParams();
  console.log(decisionId);
  return (
    <div className={style.decisionPageContainer}>
      <section></section>
      <aside></aside>
    </div>
  );
}
