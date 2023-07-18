import { Search } from "react-feather";

export default function Searchbar() {
  return (
    <div>
      <form>
        <input type="text" placeholder="Mots clés..." />
        <select name="pets" id="pet-select">
          <option value="">Status</option>
          <option value="dog">Dog</option>
          <option value="cat">Cat</option>
          <option value="hamster">Hamster</option>
          <option value="parrot">Parrot</option>
          <option value="spider">Spider</option>
          <option value="goldfish">Goldfish</option>
        </select>
        <select name="pets" id="pet-select">
          <option value="">Date</option>
          <option value="dog">Dog</option>
          <option value="cat">Cat</option>
          <option value="hamster">Hamster</option>
          <option value="parrot">Parrot</option>
          <option value="spider">Spider</option>
          <option value="goldfish">Goldfish</option>
        </select>
        <button type="submit">
          <Search />
        </button>
      </form>
    </div>
  );
}
