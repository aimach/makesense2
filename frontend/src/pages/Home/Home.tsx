import { useState } from "react";
import { useLoaderData } from "react-router-dom";
import title from "../../assets/img/title.svg";
import DecisionCardContainer from "../../components/decisionCard/DecisionCardContainer";
import CategorySection from "../../components/homeSection/CategorySection";
import LastSection from "../../components/homeSection/LastSection";
import Searchbar from "../../components/searchbar/Searchbar";
import style from "./Home.module.scss";
import { DecisionType } from "../../utils/types";

type LoaderData = DecisionType[];
export interface IFilters {
  text: string;
  status: number[] | [];
  date: string;
}

export default function Home() {
  const [filters, setFilters] = useState<IFilters>({
    text: "",
    status: [],
    date: "",
  });
  const allDecisions = useLoaderData() as LoaderData;
  const filteredDecisions = allDecisions.filter(
    (decision) =>
      filters.status.length === 0 || filters.status.includes(decision.statusId)
  );
  console.log(filteredDecisions);
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
        <DecisionCardContainer allDecisions={filteredDecisions} />
      </section>
    </div>
  );
}
