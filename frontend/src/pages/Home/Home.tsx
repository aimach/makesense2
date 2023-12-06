import { useState } from "react";
import { useLoaderData } from "react-router-dom";
import title from "../../assets/img/title.svg";
import DecisionCardContainer from "../../components/decisionCard/DecisionCardContainer";
import CategorySection from "../../components/homeSection/CategorySection";
import LastSection from "../../components/homeSection/LastSection";
import Searchbar from "../../components/searchbar/Searchbar";
import style from "./Home.module.scss";
import { DecisionType } from "../../utils/types";
import { JSDateToNormalDate } from "../../utils/utils";

type LoaderData = DecisionType[];
export interface IFilters {
  text: string;
  status: number[] | [];
  after: string;
  before: string;
}

export default function Home() {
  const [filters, setFilters] = useState<IFilters>({
    text: "",
    status: [],
    after: "",
    before: "",
  });
  const allDecisions = useLoaderData() as LoaderData;

  return (
    <div className={style.homeStyle}>
      <div className={style.homeTitleAndSearchSection}>
        <img src={title} alt="title" />
        <Searchbar filters={filters} setFilters={setFilters} />
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
