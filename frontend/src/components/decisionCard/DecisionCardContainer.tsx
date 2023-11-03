import DecisionCard from "./DecisionCard";
import style from "./DecisionCard.module.scss";

export default function DecisionCardContainer() {
  const decisions = [
    {
      title: "Décision A",
      description: "Description de la Décision A.",
      tags: [
        { name: "stratégie", color: "rgb(116,66,159)" },
        { name: "planification", color: "rgb(1,162,22)" },
        { name: "analyse", color: "rgb(165,201,248)" },
      ],
    },
    {
      title: "Décision B",
      description: "Description de la Décision B.",
      tags: [
        { name: "stratégie", color: "rgb(116,66,159)" },
        { name: "planification", color: "rgb(1,162,22)" },
        { name: "analyse", color: "rgb(165,201,248)" },
      ],
    },
    {
      title: "Décision C",
      description: "Description de la Décision C.",
      tags: [
        { name: "stratégie", color: "rgb(116,66,159)" },
        { name: "planification", color: "rgb(1,162,22)" },
        { name: "analyse", color: "rgb(165,201,248)" },
      ],
    },
    {
      title: "Décision A",
      description: "Description de la Décision A.",
      tags: [
        { name: "stratégie", color: "rgb(116,66,159)" },
        { name: "planification", color: "rgb(1,162,22)" },
        { name: "analyse", color: "rgb(165,201,248)" },
      ],
    },
    {
      title: "Décision B",
      description: "Description de la Décision B.",
      tags: [
        { name: "stratégie", color: "rgb(116,66,159)" },
        { name: "planification", color: "rgb(1,162,22)" },
        { name: "analyse", color: "rgb(165,201,248)" },
      ],
    },
    {
      title: "Décision C",
      description: "Description de la Décision C.",
      tags: [
        { name: "stratégie", color: "rgb(116,66,159)" },
        { name: "planification", color: "rgb(1,162,22)" },
        { name: "analyse", color: "rgb(165,201,248)" },
      ],
    },
  ];
  return (
    <div className={style.decisionCardContainer}>
      {decisions.map((decision) => (
        <DecisionCard decision={decision} />
      ))}
    </div>
  );
}
