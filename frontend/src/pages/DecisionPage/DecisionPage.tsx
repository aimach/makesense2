import { useParams } from "react-router-dom";
import style from "./DecisionPage.module.scss";
import { useEffect, useState } from "react";
import { DecisionType, UserType } from "../../utils/types";
import axios from "axios";
import Tag from "../../components/tag/TagCategory";
import Summary from "../../components/globals/summary/Summary";
import ConcernedPerson from "../../components/concernedPerson/ConcernedPerson";
import DateProgress from "../../components/dateProgress/DateProgress";
import TagCategory from "../../components/tag/TagCategory";

export default function DecisionPage() {
  const { decisionId } = useParams();
  const [isLoaded, setIsLoaded] = useState(false);
  const [decision, setDecision] = useState<DecisionType | null>(null);
  console.log(decision);

  const handleClick = () => {
    const detailsElements = document.getElementsByTagName("details");
    detailsElements[detailsElements.length - 1].setAttribute("open", "true");
  };

  useEffect(() => {
    axios
      .get<DecisionType>(
        `${import.meta.env.VITE_BACKEND_URL as string}/decisions/${
          decisionId as string
        }`
      )
      .then((res) => {
        setDecision(res.data);
        setIsLoaded(true);
      })
      .catch((err) => console.error(err));
  }, [decisionId]);

  const summaryToDisplay = [
    { summary: "Les détails de la décision", details: decision?.firstContent },
    { summary: "Impact sur l'organisation", details: decision?.context },
    { summary: "Bénéfices 👍", details: decision?.pros },
    { summary: "Risques potentiels 🚨", details: decision?.cons },
    { summary: "Avis 💬", details: decision?.comments },
  ];

  const dates = [
    { label: "Prise de décision commencée", date: decision?.createdAt },
    { label: "Deadline pour donner son avis", date: decision?.firstDeadline },
    { label: "Première décision prise", date: decision?.firstDecision },
    {
      label: "Deadline pour rentrer en conflit",
      date: decision?.secondDeadline,
    },
    { label: "Décision définitive", date: decision?.finalDecision },
  ];

  return (
    isLoaded && (
      <div className={style.decisionPageContainer}>
        <section>
          <div className={style.tagContainer}>
            {decision?.categories.map((category) => (
              <TagCategory
                content={category.category.name}
                color={category.category.color}
                id={category.category.id}
                key={category.category.id}
                canBeSelected={false}
              />
            ))}
          </div>
          <div className={style.titleContainer}>
            <h2>{decision?.title}</h2>
            <div>
              <img
                src={decision?.user.avatar as string}
                alt={`${decision?.user.firstname as string} ${
                  decision?.user.lastname as string
                }`}
              />
              <div>
                par{" "}
                <span>
                  {decision?.user.firstname} {decision?.user.lastname}
                </span>
              </div>
            </div>
          </div>
          <div className={style.decisionContainer}>
            {summaryToDisplay.map((item, index) => (
              <Summary
                summary={item.summary}
                details={item.details as string}
                key={index}
              />
            ))}
          </div>
        </section>
        <aside className={style.decisionAside}>
          <DateProgress dates={dates} />
          <ConcernedPerson
            type="concerné"
            users={decision?.users as { user: UserType; type: string }[]}
            handleClick={handleClick}
          />
          <ConcernedPerson
            type="expert"
            users={decision?.users as { user: UserType; type: string }[]}
            handleClick={handleClick}
          />
        </aside>
      </div>
    )
  );
}
