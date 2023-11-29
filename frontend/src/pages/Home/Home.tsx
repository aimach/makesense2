import { useLoaderData } from "react-router-dom";
import title from "../../assets/img/title.svg";
import DecisionCardContainer from "../../components/decisionCard/DecisionCardContainer";
import CategorySection from "../../components/homeSection/CategorySection";
import LastSection from "../../components/homeSection/LastSection";
import Searchbar from "../../components/searchbar/Searchbar";
import style from "./Home.module.scss";
import { DecisionType } from "../../utils/types";

type LoaderData = {
  allDecisions: DecisionType[];
};

export default function Home() {
  const { allDecisions } = useLoaderData() as LoaderData;
  console.log(allDecisions);
  return (
    <div className={style.homeStyle}>
      <div className={style.homeTitleAndSearchSection}>
        <img src={title} alt="title" />
        <Searchbar />
      </div>
      <section>
        <h2>Trouver une décision à impact positif</h2>
        <CategorySection />
        <LastSection />
        <DecisionCardContainer allDecisions={allDecisions} />
      </section>
    </div>
  );
}
