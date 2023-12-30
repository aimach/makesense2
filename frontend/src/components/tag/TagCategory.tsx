import { useState } from "react";
import style from "./Tag.module.scss";
import { X } from "react-feather";
import { DecisionType } from "../../utils/types";

interface TagProps {
  content: string;
  color: string;
  id: number;
  canBeSelected: boolean;
  newDecision?: DecisionType;
  setNewDecision?: (newDecision: DecisionType) => void;
}

export default function TagCategory({
  content,
  color,
  newDecision,
  setNewDecision,
  id,
  canBeSelected,
}: TagProps) {
  const noSelectedStyle = {
    backgroundColor: "white",
    border: `2px solid ${color}`,
    color: color,
  };

  const selectedStyle = {
    backgroundColor: color,
    border: `2px solid ${color}`,
    color: "white",
  };

  const [isSelected, setIsSelected] = useState(false);

  const handleClickSelect = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    setIsSelected(true);
    const newCategory = {
      category: {
        connect: {
          id: id,
        },
      },
    };
    if (setNewDecision && newDecision && newDecision.categories !== undefined)
      if (
        !newDecision.categories.some(
          (category) => category.category.connect.id === id
        )
      ) {
        setNewDecision({
          ...newDecision,
          categories: [...newDecision.categories, newCategory],
        });
      } else {
        const newDecisionCategories = newDecision.categories.filter(
          (category) => category.category.connect.id !== id
        );
        setNewDecision({
          ...newDecision,
          categories: newDecisionCategories,
        });
        setIsSelected(false);
      }
  };

  return (
    <button
      style={isSelected && canBeSelected ? selectedStyle : noSelectedStyle}
      className={style.tag}
      onClick={handleClickSelect}
    >
      {content}
      {canBeSelected && isSelected ? <X /> : null}
    </button>
  );
}
