import Tag from "../tag/Tag";
import style from "./DecisionCard.module.scss";
import logo from "../../assets/img/logo.svg";

interface DecisionCardProps {
  decision: {
    title: string;
    description: string;
    tags: {
      name: string;
      color: string;
    }[];
  };
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
        {decision.tags.map((tag) => (
          <Tag content={tag.name} color={tag.color} />
        ))}
      </div>
    </div>
  );
}
