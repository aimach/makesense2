import style from "./DecisionCreate.module.scss";
import { Plus } from "react-feather";
import { stepProps } from "./DecisionCreate";
import { useEffect, useState } from "react";
import { UserType } from "../../utils/types";
import { getUsersByName } from "../../utils/api/userApi";

export default function FourthStep({ newDecision, setNewDecision }: stepProps) {
  const [searchValue, setSearchValue] = useState<string>("");
  const [expertsList, setExpertsList] = useState<UserType[]>([]);

  console.log(expertsList);

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

  return (
    <>
      <div className={`${style.inputContainer} ${style.normalInput}`}>
        <label htmlFor="expert">Les experts</label>

        <button>
          <Plus />
          Ajouter un expert
        </button>
        <div id="myDropdown" className="dropdown-content">
          <input
            type="text"
            placeholder="Rechercher..."
            id="search"
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
          />
          <select name="expert" id="expert">
            {expertsList.map((expert) => (
              <option
                key={expert.id}
                // onClick={() =>
                //   setNewDecision({
                //     ...newDecision,
                //     users: [...newDecision.users, expert],
                //   })
                // }
              >
                {expert.firstname} {expert.lastname}
              </option>
            ))}
          </select>
        </div>
      </div>
      <div className={`${style.inputContainer} ${style.normalInput}`}>
        <label>Les impactés</label>
        <button>
          <Plus />
          Ajouter un impacté
        </button>
      </div>
    </>
  );
}
