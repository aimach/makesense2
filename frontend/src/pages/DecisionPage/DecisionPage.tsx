import { useParams } from "react-router-dom";
import style from "./DecisionPage.module.scss";
import { useEffect, useState } from "react";
import { DecisionType } from "../../utils/types";
import axios from "axios";
import Tag from "../../components/tag/Tag";
import Summary from "../../components/globals/summary/Summary";
import { differenceInDays, format, isFuture, isPast } from "date-fns";
import { fr } from "date-fns/locale";

export default function DecisionPage() {
  const { decisionId } = useParams();
  const [decision, setDecision] = useState<DecisionType | null>(null);

  useEffect(() => {
    axios
      .get<DecisionType>(
        `${import.meta.env.VITE_BACKEND_URL as string}/decisions/${
          decisionId as string
        }`
      )
      .then((res) => {
        setDecision(res.data);
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
    <div className={style.decisionPageContainer}>
      <section>
        <div className={style.tagContainer}>
          {decision?.categories.map((category) => (
            <Tag
              content={category.category.name}
              color={category.category.color}
              key={category.category.id}
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
        <div>
          <h3>Dates à retenir</h3>
          <div className={style.datesContainer}>
            <div className={style.datesContainer__dates}>
              {dates.map((date) => {
                if (date.date != null) {
                  return (
                    <div
                      key={date.date}
                      className={
                        isFuture(date.date)
                          ? style.datesContainer__future
                          : style.datesContainer__pass
                      }
                    >
                      {format(new Date(date.date), "dd MMM yy", {
                        locale: fr,
                      })}
                    </div>
                  );
                }
              })}
            </div>
            <div className={style.datesContainer__progress}>
              <progress
                value={
                  dates.filter((date) => isPast(date.date as string)).length
                }
                max={dates.filter((date) => date.date != null).length}
                style={{
                  width:
                    (dates.filter((date) => date.date != null).length - 0.5) *
                    60,
                }}
              />
            </div>
            <div className={style.datesContainer__labels}>
              {dates.map((date) => {
                if (date.date != null) {
                  return (
                    <div
                      key={date.date}
                      className={
                        isFuture(date.date)
                          ? style.datesContainer__future
                          : style.datesContainer__pass
                      }
                    >
                      {date.label}
                      {dates.filter((date) => isFuture(date.date as string))
                        .length > 0 &&
                      dates.filter((date) => isFuture(date.date as string))[0]
                        .label === date.label ? (
                        <p>
                          {differenceInDays(new Date(date.date), new Date()) !==
                          0
                            ? `Plus que ${differenceInDays(
                                new Date(date.date),
                                new Date()
                              )} jours`
                            : "Aujourdhui"}
                        </p>
                      ) : null}
                    </div>
                  );
                }
              })}
            </div>
          </div>
        </div>
        <div>
          <h3>Personnes impactées</h3>
          {decision?.users
            .filter((user) => {
              return user.type === "concerné";
            })
            .map((user) => (
              <img
                src={user.user.avatar as string}
                alt={user.user.firstname}
                key={user.user.id}
              />
            ))}
        </div>
        <div className={style.expertsContainer}>
          <h3>Personnes expertes</h3>
          {decision?.users
            .filter((user) => {
              return user.type === "expert";
            })
            .map((user) => (
              <img
                src={user.user.avatar as string}
                alt={user.user.firstname}
                key={user.user.id}
              />
            ))}
        </div>
      </aside>
    </div>
  );
}
