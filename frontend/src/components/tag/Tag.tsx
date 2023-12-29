import { useState } from "react";
import style from "./Tag.module.scss";

interface TagProps {
  content: string;
  color: string;
  canBeSelected: boolean;
}

export default function Tag({ content, color, canBeSelected }: TagProps) {
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

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();

    setIsSelected(!isSelected);
  };

  return canBeSelected ? (
    <button
      style={isSelected ? selectedStyle : noSelectedStyle}
      className={style.tag}
      onClick={handleClick}
    >
      {content} sqdf
    </button>
  ) : (
    <div style={noSelectedStyle} className={style.tag}>
      {content}
    </div>
  );
}
