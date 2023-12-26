import style from "./DecisionCard.module.scss";
import { CategoryType, DecisionType } from "../../utils/types";
import Tag from "../tag/Tag";
import { Link } from "react-router-dom";
import { Calendar } from "react-feather";
interface DecisionCardProps {
  decision: DecisionType;
}

export default function DecisionCard({ decision }: DecisionCardProps) {
  const descriptionSliced =
    decision.firstContent
      .split("")
      .slice(0, 35 * 4)
      .join("") + "...";

  const differenceInDays = Math.round(
    (new Date().getTime() - Date.parse(decision.createdAt)) / (1000 * 3600 * 24)
  );

  return (
    <Link to={`/decisions/${decision.id}`}>
      <div className={style.decisionCard}>
        <div className={style.titleSection}>
          <h4>{decision.title}</h4>
          <img src={decision.user.avatar as string} alt="avatar" />
        </div>
        <p>{descriptionSliced}</p>
        <div className={style.tagContainer}>
          {decision.categories.map((category: CategoryType) => (
            <Tag
              content={category.category.name}
              color={category.category.color}
              key={category.category.id}
            />
          ))}
        </div>
        <div className={style.dateContainer}>
          <p>{decision.status.name}</p>
          <div>
            <Calendar />{" "}
            {differenceInDays === 0
              ? "Aujourd'hui"
              : `il y a ${differenceInDays} jour${
                  differenceInDays > 1 ? "s" : ""
                } `}
          </div>
        </div>
      </div>
    </Link>
  );
}
