import style from "./DecisionCard.module.scss";
import logo from "../../assets/img/logo.svg";
import { DecisionType } from "../../utils/types";

interface DecisionCardProps {
  decision: DecisionType;
}

export default function DecisionCard({ decision }: DecisionCardProps) {
  return (
    <div className={style.decisionCard}>
      <div className={style.titleSection}>
        <h4>{decision.title}</h4>
        <img src={logo} alt="avatar" />
      </div>
      <p>
        Lorem ipsum, dolor sit amet consectetur adipisicing elit. Porro numquam
        odio necessitatibus? Molestiae aperiam, repudiandae officia commodi esse
        explicabo beatae possimus, maiores ad at pariatur quisquam quia tenetur
        minus quis!
      </p>
      <div className={style.tagContainer}>
        {/* {decision.tags.map((tag) => (
          <Tag content={tag.name} color={tag.color} />
        ))} */}
      </div>
    </div>
  );
}
