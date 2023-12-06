import "./DecisionResult.scss";
import { useEffect, useState } from "react";
import axios from "axios";
import { DecisionType } from "../../utils/types";
import DecisionCardContainer from "../../components/decisionCard/DecisionCardContainer";
import { useLocation } from "react-router-dom";
import Searchbar from "../../components/searchbar/Searchbar";
import { IFilters } from "../Home/Home";

export default function DecisionResult() {
  const { search } = useLocation();
  const text = new URLSearchParams(location.search).get("text");
  const status = new URLSearchParams(location.search).get("status");
  const before = new URLSearchParams(location.search).get("before");
  const after = new URLSearchParams(location.search).get("after");
  const [filters, setFilters] = useState<IFilters>({
    text: text ?? "",
    status: status?.split(",").map((item: string) => parseInt(item, 10)) ?? [],
    after: after as string,
    before: before as string,
  });
  const [sort, setSort] = useState<string>("date");

  const [filteredDecisions, setFilteredDecisions] = useState<
    DecisionType[] | []
  >([]);

  useEffect(() => {
    const sortQuery = (search === "" ? "?" : "&") + `sort=${sort}`;
    axios
      .get<DecisionType[]>(
        `${
          import.meta.env.VITE_BACKEND_URL as string
        }/decisions${search}${sortQuery}`
      )
      .then((res) => {
        setFilteredDecisions(res.data);
      })
      .catch((err) => console.error(err));
  }, [search, sort]);

  return (
    <div className="decisionResultSection">
      <Searchbar filters={filters} setFilters={setFilters} />
      <div className="separator" />
      <div className="decisionResultContainer">
        <p>
          <span>{filteredDecisions.length}</span> décisions
        </p>

        {filteredDecisions.length > 0 && (
          <>
            |
            <select
              name="sort"
              id="sort"
              onChange={(event) => setSort(event.target.value)}
            >
              <option value="date">Trier par date de dépôt</option>
              <option value="status">Trier par status</option>
            </select>
          </>
        )}
      </div>
      <DecisionCardContainer allDecisions={filteredDecisions} />
      <p>
        Votre recherche correspond à {filteredDecisions.length} résultat
        {filteredDecisions.length > 1 ? "s" : ""}.
      </p>
    </div>
  );
}
