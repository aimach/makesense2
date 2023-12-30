import { useEffect } from "react";
import style from "./concernedForm.module.scss";
import SearchSelect from "../globals/searchSelect/SearchSelect";
import Tag from "../tag/Tag";
import { UserType } from "../../utils/types";
import { newDecisionProps } from "../../pages/DecisionCreate/DecisionCreate";
import { getUsersByName } from "../../utils/api/userApi";

interface concernedFormProps extends newDecisionProps {
  type: string;
  searchValue: string;
  setSearchValue: (searchValue: string) => void;
  concernedList: UserType[];
  setConcernedList: (concernedList: UserType[]) => void;
}

export default function ConcernedForm({
  type,
  newDecision,
  setNewDecision,
  searchValue,
  setSearchValue,
  concernedList,
  setConcernedList,
}: concernedFormProps) {
  useEffect(() => {
    const getUsersList = async () => {
      try {
        const response: void | UserType[] = await getUsersByName(searchValue);
        setConcernedList(response as UserType[]);
      } catch (error) {
        console.error(error);
      }
    };
    getUsersList();
  }, [searchValue]);

  const handleSelectConcerned = (concernedId: number) => {
    const newConcerned = {
      user: { connect: { id: concernedId } },
      type: type,
    };
    if (newDecision.users !== undefined) {
      if (
        !newDecision.users.some(
          (user) => user.user.connect.id === concernedId && user.type === type
        )
      ) {
        setNewDecision({
          ...newDecision,
          users: [...newDecision.users, newConcerned],
        });
      }
      setSearchValue("");
    }
  };

  return (
    <div className={`${style.inputContainer}`}>
      <h3>Ajouter des {type}s</h3>
      <div className={style.concernedContainer}>
        <SearchSelect
          searchValue={searchValue}
          setSearchValue={setSearchValue}
          array={concernedList}
          handleClick={handleSelectConcerned}
        />
        <div className={style.concernedTagContainer}>
          {newDecision.users !== undefined &&
            newDecision.users
              .filter((user) => user.type === type)
              .map((user) => (
                <Tag
                  key={user.user.connect.id}
                  type="person"
                  content={user.user.connect.id}
                  color={type === "expert" ? "#196c84" : "#9b084f"}
                  canBeSelected={false}
                />
              ))}
        </div>
      </div>
    </div>
  );
}
