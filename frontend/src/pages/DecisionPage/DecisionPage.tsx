import { useParams } from "react-router-dom";
import style from "./DecisionPage.module.scss";
import { useEffect, useState } from "react";
import { CategoryType, DecisionType } from "../../utils/types";
import axios from "axios";
import Tag from "../../components/tag/Tag";

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
      <section>
        <div className={style.tagContainer}>
          {decision?.categories.map((category) => (
            <Tag
              content={category.category.name}
              color={category.category.color}
            />
          ))}
        </div>
        <div className={style.titleContainer}>
          <h2>{decision?.title}</h2>
          <div>
            <img
              src={decision?.user.avatar as string}
              alt={`${decision?.user.firstname as string} ${
                decision?.user.lastname as string
              }`}
            />
            <div>
              par{" "}
              <span>
                {decision?.user.firstname} {decision?.user.lastname}
              </span>
            </div>
          </div>
        </div>
      </section>
      <aside></aside>
    </div>
  );
}
