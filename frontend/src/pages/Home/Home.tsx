import title from "../../assets/img/title.svg";
import CategorySection from "../../components/categorySection/CategorySection";
import Searchbar from "../../components/searchbar/Searchbar";
import style from "./Home.module.scss";

export default function Home() {
  return (
    <div className={style.homeStyle}>
      <div className={style.homeTitleAndSearchSection}>
        <img src={title} alt="title" />
        <Searchbar />
      </div>
      <CategorySection />
    </div>
  );
}
