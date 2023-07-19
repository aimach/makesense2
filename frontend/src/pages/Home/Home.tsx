import title from "../../assets/img/title.svg";
import CategorySection from "../../components/homeSection/CategorySection";
import LastSection from "../../components/homeSection/LastSection";
import Searchbar from "../../components/searchbar/Searchbar";
import style from "./Home.module.scss";

export default function Home() {
  return (
    <div className={style.homeStyle}>
      <div className={style.homeTitleAndSearchSection}>
        <img src={title} alt="title" />
        <Searchbar />
      </div>
      <section>
        {/* <h2>Trouver une décision à impact positif</h2> */}
        <CategorySection />
        <LastSection />
      </section>
    </div>
  );
}
