import { useEffect, useState } from "react";
import style from "./Tag.module.scss";
import { getUserById } from "../../utils/api/userApi";
import { UserType } from "../../utils/types";

interface TagProps {
  content: string;
  color: string;
  canBeSelected: boolean;
  type: string;
}

export default function Tag({ content, color, canBeSelected, type }: TagProps) {
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

  const [person, setPerson] = useState<UserType | void>({} as UserType);

  const getUserName = async (userId: string): Promise<void> => {
    setPerson(await getUserById(userId));
  };

  useEffect(() => {
    if (type === "person") {
      getUserName(content);
    }
  }, [type, content]);

  return canBeSelected ? (
    <button
      style={isSelected ? selectedStyle : noSelectedStyle}
      className={style.tag}
      onClick={handleClick}
    >
      {content}
    </button>
  ) : (
    <div style={person ? selectedStyle : noSelectedStyle} className={style.tag}>
      {type === "person"
        ? `${(person as UserType).firstname} ${(person as UserType).lastname}`
        : content}
    </div>
  );
}
