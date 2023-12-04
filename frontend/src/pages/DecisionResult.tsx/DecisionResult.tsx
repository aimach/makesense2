import "./DecisionResult.scss";
import { useEffect, useState } from "react";
import axios from "axios";
import { DecisionType } from "../../utils/types";
import DecisionCardContainer from "../../components/decisionCard/DecisionCardContainer";

export default function DecisionResult() {
  const text: string | null = new URLSearchParams(location.search).get("text");
  const status: number[] = fromStringToArray(
    new URLSearchParams(location.search).get("status") as string
  );

  const [filteredDecisions, setFilteredDecisions] = useState<
    DecisionType[] | []
  >([]);

  useEffect(() => {
    axios
      .get<DecisionType[]>(
        `${import.meta.env.VITE_BACKEND_URL as string}/decisions`
      )
      .then((res) => {
        const filteredDecisionsForSetter = filterDecisions(res.data);
        setFilteredDecisions(filteredDecisionsForSetter);
      })
      .catch((err) => console.error(err));
  }, []);

  console.log(filteredDecisions);
  function filterDecisions(array: DecisionType[]) {
    return array
      .filter(
        (decision) => status === null || status.includes(decision.statusId)
      )
      .filter((decision) =>
        text !== null
          ? decision.title.includes(text) ||
            decision.firstContent.includes(text)
          : true
      );
    // il va falloir gérer les majuscules et minuscules
  }

  function fromStringToArray(string: string) {
    if (string !== null) {
      return string.split(",").map((item) => parseInt(item, 10));
    } else return [];
  }

  return (
    <div>
      <DecisionCardContainer allDecisions={filteredDecisions} />
    </div>
  );
}
