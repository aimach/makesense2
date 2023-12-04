import { useParams } from "react-router-dom";
import "./DecisionPage.scss";

export default function DecisionPage() {
  const { decisionId } = useParams();
  console.log(decisionId);
  return <div>DecisionPage</div>;
}
