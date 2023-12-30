import style from "./DecisionCreate.module.scss";
import { Search, X } from "react-feather";
import { stepProps } from "./DecisionCreate";
import { useEffect, useState } from "react";
import { UserType } from "../../utils/types";
import { getUsersByName } from "../../utils/api/userApi";
import Tag from "../../components/tag/Tag";

export default function FourthStep({ newDecision, setNewDecision }: stepProps) {
  const [searchValue, setSearchValue] = useState<string>("");
  const [expertsList, setExpertsList] = useState<UserType[]>([]);
  const [displayExpertsList, setDisplayExpertsList] = useState<boolean>(false);

  useEffect(() => {
    const getUsersList = async () => {
      try {
        const response: void | UserType[] = await getUsersByName(searchValue);
        setExpertsList(response as UserType[]);
      } catch (error) {
        console.error(error);
      }
    };
    getUsersList();
  }, [searchValue]);

  const handleSelectExpert = (event, expertId: number) => {
    event.preventDefault();
    const newExpert = {
      user: { connect: { id: expertId } },
      type: "expert",
    };
    if (newDecision.users !== undefined) {
      if (
        !newDecision.users.some((user) => user.user.connect.id === expertId)
      ) {
        setNewDecision({
          ...newDecision,
          users: [...newDecision.users, newExpert],
        });
      }
      setDisplayExpertsList(false);
      setSearchValue("");
    }
  };

  console.log(expertsList);

  return (
    <>
      <div className={`${style.inputContainer}`}>
        <label htmlFor="expert">Ajouter des experts</label>
        <div className={style.concernedContainer}>
          <input
            type="text"
            placeholder="Rechercher..."
            id="search"
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
          />
          <Search />
          {searchValue !== "" && (
            <div className={style.resultList}>
              {expertsList.map((expert) => (
                <button
                  type="button"
                  key={expert.id}
                  onClick={(event) => handleSelectExpert(event, expert.id)}
                >
                  {expert.firstname} {expert.lastname}, {expert.position} -{" "}
                  {expert.service.name}
                </button>
              ))}{" "}
            </div>
          )}
          <div className={style.concernedTagContainer}>
            {newDecision.users !== undefined &&
              newDecision.users.map((expert) => (
                <Tag
                  key={expert.user.connect.id}
                  type="person"
                  content={expert.user.connect.id}
                  color="#196c84"
                  canBeSelected={false}
                />
              ))}
          </div>
        </div>
      </div>
      <div className={`${style.inputContainer} ${style.normalInput}`}>
        <label>Les impactés</label>
        <button>Ajouter un impacté</button>
      </div>
    </>
  );
}
