import { useEffect, useState } from "react";
import style from "./Tag.module.scss";
import { getUserById } from "../../utils/api/userApi";
import { UserType } from "../../utils/types";
import { X } from "react-feather";
import { newDecisionProps } from "../../pages/DecisionCreate/DecisionCreate";

interface TagPersonProps extends newDecisionProps {
  content: string;
  color: string;
  type: string;
}

export default function TagPerson({
  content,
  color,
  type,
  newDecision,
  setNewDecision,
}: TagPersonProps) {
  const tagStyle = {
    backgroundColor: color,
    border: `2px solid ${color}`,
    color: "white",
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
    getUserName(content);
  }, [type, content]);

  return (
    <div style={tagStyle} className={style.tag}>
      {(person as UserType).firstname} {(person as UserType).lastname}
      <X
        onClick={() => handleClickRemoved((person as UserType).id.toString())}
      />
    </div>
  );
}
