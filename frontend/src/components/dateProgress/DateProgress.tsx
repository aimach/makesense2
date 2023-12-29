import style from "./DateProgress.module.scss";
import { isFuture, isPast, format, differenceInDays } from "date-fns";
import { fr } from "date-fns/locale";

interface dateProgressProps {
  dates: { label: string; date: string | undefined }[];
}

export default function DateProgress({ dates }: dateProgressProps) {
  return (
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
            value={dates.filter((date) => isPast(date.date as string)).length}
            max={dates.filter((date) => date.date != null).length}
            style={{
              width:
                (dates.filter((date) => date.date != null).length - 0.5) * 60,
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
                      {differenceInDays(new Date(date.date), new Date()) !== 0
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
  );
}
