import { useParams } from "react-router-dom";
import style from "./DecisionPage.module.scss";
import { useEffect, useState } from "react";
import { DecisionType } from "../../utils/types";
import axios from "axios";

export default function DecisionPage() {
  const { decisionId } = useParams();
  const [decision, setDecision] = useState<DecisionType | null>(null);

  useEffect(() => {
    axios
      .get<DecisionType>(
        `${import.meta.env.VITE_BACKEND_URL as string}/decisions/${
          decisionId as string
        }`
      )
      .then((res) => {
        setDecision(res.data);
      })
      .catch((err) => console.error(err));
  }, [decisionId]);

  console.log(decision);

  return (
    <div className={style.decisionPageContainer}>
      <section></section>
      <aside></aside>
    </div>
  );
}
