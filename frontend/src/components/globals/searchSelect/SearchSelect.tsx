import { UserType } from "../../../utils/types";
import style from "./searchSelect.module.scss";
import { Search } from "react-feather";

interface searchSelectProps {
  searchValue: string;
  setSearchValue: (searchValue: string) => void;
  array: UserType[];
  handleClick: (id: number) => void;
}

export default function SearchSelect({
  searchValue,
  setSearchValue,
  array,
  handleClick,
}: searchSelectProps) {
  return (
    <>
      <input
        type="text"
        placeholder="Rechercher..."
        id="search"
        value={searchValue}
        onChange={(e) => setSearchValue(e.target.value)}
        className={style.searchSelectInput}
      />
      <Search />
      {searchValue !== "" && (
        <div className={style.resultList}>
          {array.map((item: UserType) => (
            <button
              type="button"
              key={item.id}
              onClick={() => handleClick(item.id)}
            >
              {item.firstname} {item.lastname}, {item.position},{" "}
              {item.service.name}
            </button>
          ))}{" "}
        </div>
      )}
    </>
  );
}
