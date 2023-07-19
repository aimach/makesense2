import { Search, Tag, Calendar, ChevronDown } from "react-feather";
import style from "./Searchbar.module.scss";

export default function Searchbar() {
  return (
    <div className={style.homeSearchBar}>
      <form>
        <input
          type="text"
          placeholder="Mots clés..."
          className={style.emptyInputStyle}
        />
        <div className={`${style.searchSelect} ${style.emptyInputStyle}`}>
          <Tag />
          <p>Statut</p>
          <ChevronDown />
        </div>
        <div className={style.searchSelect}>
          <Calendar />
          Date
          <ChevronDown />
        </div>
        <button type="submit" className={style.buttonSearch}>
          <Search />
        </button>
      </form>
    </div>
  );
}
