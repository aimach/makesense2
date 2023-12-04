import "./DecisionResult.scss";
import { useEffect, useState } from "react";
import axios from "axios";
import { DecisionType } from "../../utils/types";
import DecisionCardContainer from "../../components/decisionCard/DecisionCardContainer";
import { useLocation } from "react-router-dom";

export default function DecisionResult() {
  // const text: string | null = new URLSearchParams(location.search).get("text");
  // const status: number[] = fromStringToArray(
  //   new URLSearchParams(location.search).get("status") as string
  // );
  const { search } = useLocation();

  const [filteredDecisions, setFilteredDecisions] = useState<
    DecisionType[] | []
  >([]);

  useEffect(() => {
    axios
      .get<DecisionType[]>(
        `${import.meta.env.VITE_BACKEND_URL as string}/decisions${search}`
      )
      .then((res) => {
        setFilteredDecisions(res.data);
      })
      .catch((err) => console.error(err));
  }, [search]);

  return (
    <div>
      <DecisionCardContainer allDecisions={filteredDecisions} />
    </div>
  );
}
