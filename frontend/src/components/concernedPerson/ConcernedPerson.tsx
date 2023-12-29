import { UserType } from "../../utils/types";
import style from "./ConcernedPerson.module.scss";

interface concernedProps {
  type: string;
  users: { user: UserType; type: string }[];
  handleClick: () => void;
}

export default function ConcernedPerson({
  type,
  users,
  handleClick,
}: concernedProps) {
  const filteredUsers = users.filter((user) => {
    return user.type === type;
  });
  return (
    <div className={style.concernedContainer}>
      <h3>{`Personnes ${type}es`}</h3>
      <div>
        {filteredUsers.length === 0 ? (
          <p>{`Pas de ${type}s`}</p>
        ) : (
          <>
            <div>
              {filteredUsers.map((user) => (
                <img
                  src={user.user.avatar as string}
                  alt={user.user.firstname}
                  key={user.user.id}
                />
              ))}
            </div>
            <button type="button" onClick={handleClick}>
              Voir les avis
            </button>
          </>
        )}
      </div>
    </div>
  );
}
