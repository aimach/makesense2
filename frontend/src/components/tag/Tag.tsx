import { useEffect, useState } from "react";
import style from "./Tag.module.scss";
import { getUserById } from "../../utils/api/userApi";
import { UserType } from "../../utils/types";
import { X } from "react-feather";
import { newDecisionProps } from "../../pages/DecisionCreate/DecisionCreate";

interface TagProps extends newDecisionProps {
  content: string;
  color: string;
  canBeSelected: boolean;
  canBeRemoved: boolean;
  type: string;
  handleClickRemove: (id: string) => void;
}

export default function Tag({
  content,
  color,
  canBeSelected,
  canBeRemoved,
  type,
  newDecision,
  setNewDecision,
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
    setIsSelected(!isSelected);
  };

  const handleClickRemoved = (concernedId: string) => {
    const newDecisionUsers = newDecision.users.filter(
      (user) =>
        user.user.connect.id !== parseInt(concernedId, 10) && user.type !== type
    );
    setNewDecision({
      ...newDecision,
      users: newDecisionUsers,
    });
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
      onClick={handleClickSelect}
    >
      {content}
    </button>
  ) : (
    <div style={person ? selectedStyle : noSelectedStyle} className={style.tag}>
      {type === "person"
        ? `${(person as UserType).firstname} ${(person as UserType).lastname}`
        : content}
      {canBeRemoved ? (
        <X
          onClick={() => handleClickRemoved((person as UserType).id.toString())}
        />
      ) : null}
    </div>
  );
}
