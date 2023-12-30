import { useState } from "react";
import { newDecisionProps } from "./DecisionCreate";
import ConcernedForm from "../../components/concernedForm/ConcernedForm";
import { UserType } from "../../utils/types";

export default function FourthStep({
  newDecision,
  setNewDecision,
}: newDecisionProps) {
  const [searchExpertValue, setSearchExpertValue] = useState<string>("");
  const [searchImpactValue, setSearchImpactValue] = useState<string>("");
  const [expertList, setExpertList] = useState<UserType[]>([]);
  const [impactList, setImpactList] = useState<UserType[]>([]);

  return (
    <>
      <ConcernedForm
        type="expert"
        newDecision={newDecision}
        setNewDecision={setNewDecision}
        searchValue={searchExpertValue}
        setSearchValue={setSearchExpertValue}
        concernedList={expertList}
        setConcernedList={setExpertList}
      />
      <ConcernedForm
        type="impacté"
        newDecision={newDecision}
        setNewDecision={setNewDecision}
        searchValue={searchImpactValue}
        setSearchValue={setSearchImpactValue}
        concernedList={impactList}
        setConcernedList={setImpactList}
      />
    </>
  );
}
