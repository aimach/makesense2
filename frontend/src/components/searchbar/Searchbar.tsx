import { Search } from "react-feather";
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
        <select name="pets" id="pet-select" className={style.emptyInputStyle}>
          <option value="">Status</option>
          <option value="dog">Dog</option>
          <option value="cat">Cat</option>
          <option value="hamster">Hamster</option>
          <option value="parrot">Parrot</option>
          <option value="spider">Spider</option>
          <option value="goldfish">Goldfish</option>
        </select>
        <select name="pets" id="pet-select" className={style.emptyInputStyle}>
          <option value="">Date</option>
          <option value="dog">Dog</option>
          <option value="cat">Cat</option>
          <option value="hamster">Hamster</option>
          <option value="parrot">Parrot</option>
          <option value="spider">Spider</option>
          <option value="goldfish">Goldfish</option>
        </select>
        <button type="submit" className={style.buttonSearch}>
          <Search />
        </button>
      </form>
    </div>
  );
}
