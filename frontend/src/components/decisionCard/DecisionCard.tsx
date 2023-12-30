import style from "./DecisionCard.module.scss";
import { CategoryType, DecisionType } from "../../utils/types";
import { Link } from "react-router-dom";
import { Calendar } from "react-feather";
import { differenceInDays } from "date-fns";
import TagCategory from "../tag/TagCategory";

interface DecisionCardProps {
  decision: DecisionType;
}

export default function DecisionCard({ decision }: DecisionCardProps) {
  const descriptionSliced =
    decision.firstContent
      .split("")
      .slice(0, 35 * 2)
      .join("") + "...";

  const differenceInDaysWithToday = differenceInDays(
    new Date(),
    new Date(decision.createdAt)
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
          {decision.categories.map((category: { category: CategoryType }) => (
            <TagCategory
              content={category.category.name}
              color={category.category.color}
              id={category.category.id}
              key={category.category.id}
              newDecision={decision}
              setNewDecision={() => null}
              canBeSelected={false}
            />
          ))}
        </div>
        <div className={style.dateContainer}>
          <p>{decision.status.name}</p>
          <div>
            <Calendar />{" "}
            {differenceInDaysWithToday === 0
              ? "Aujourd'hui"
              : `il y a ${differenceInDaysWithToday} jour${
                  differenceInDaysWithToday > 1 ? "s" : ""
                } `}
          </div>
        </div>
      </div>
    </Link>
  );
}
