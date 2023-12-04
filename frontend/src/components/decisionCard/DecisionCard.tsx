import style from "./DecisionCard.module.scss";
import { CategoryType, DecisionType } from "../../utils/types";
import Tag from "../tag/Tag";
import { Link } from "react-router-dom";
interface DecisionCardProps {
  decision: DecisionType;
}

export default function DecisionCard({ decision }: DecisionCardProps) {
  const descriptionSliced =
    decision.firstContent
      .split("")
      .slice(0, 35 * 4)
      .join("") + "...";
  return (
    <Link to={`/decisions/${decision.id}`}>
      <div className={style.decisionCard}>
        <div className={style.titleSection}>
          <h4>{decision.title}</h4>
          <img src={decision.user.avatar as string} alt="avatar" />
        </div>
        <p>{descriptionSliced}</p>
        <p>{decision.status.name}</p>
        <div className={style.tagContainer}>
          {decision.categories.map((category: CategoryType) => (
            <Tag
              content={category.category.name}
              color={category.category.color}
              key={category.category.id}
            />
          ))}
        </div>
      </div>
    </Link>
  );
}
