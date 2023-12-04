import { useEffect, useState } from "react";
import { Search, Tag, Calendar, ChevronDown } from "react-feather";
import style from "./Searchbar.module.scss";
import "./Searchbar.module.scss";
import { DecisionType, StatusType } from "../../utils/types";
import axios from "axios";
import { IFilters } from "../../pages/Home/Home";
import { Link } from "react-router-dom";

interface searchbarProps {
  filters: IFilters;
  setFilters: (arg0: IFilters) => void;
  allDecisions: DecisionType[];
}
export default function Searchbar({ filters, setFilters }: searchbarProps) {
  const [status, setStatus] = useState<StatusType[] | []>([]);
  const [displayStatusModal, setDisplayStatusModal] = useState<boolean>(false);
  const [displayDateModal, setDisplayDateModal] = useState<boolean>(false);

  function addStatus(event: React.ChangeEvent<HTMLInputElement>) {
    const newStatus: number[] = [
      ...filters.status,
      parseInt(event.target.id, 10),
    ];
    setFilters({ ...filters, status: newStatus });
  }

  function removeStatus(event: React.ChangeEvent<HTMLInputElement>) {
    const newStatus: number[] = filters.status.filter(
      (item) => item !== parseInt(event.target.id, 10)
    );
    setFilters({ ...filters, status: newStatus });
  }

  console.log(filters.text);

  function createQueryParams(filters: IFilters) {
    let query = "?";
    const queryParams: string[] = [];
    if (filters.text !== "") queryParams.push(`text=${filters.text}`);
    if (filters.status.length > 0) {
      queryParams.push(`status=${filters.status}`);
    }
    return query + queryParams.join("&");
  }

  useEffect(() => {
    axios
      .get<StatusType[]>(`${import.meta.env.VITE_BACKEND_URL as string}/status`)
      .then((res) => setStatus(res.data))
      .catch((err) => console.error(err));
  }, []);

  return (
    <>
      <div className={style.homeSearchBar}>
        <form>
          <input
            type="text"
            placeholder="Mots clés..."
            className={style.emptyInputStyle}
            onChange={(event) => {
              setFilters({ ...filters, text: event.target.value });
            }}
          />
          <div className={`${style.searchSelect} ${style.emptyInputStyle}`}>
            <Tag />
            <p>
              Statut{" "}
              {filters.status.length > 0 ? (
                <span>{filters.status.length}</span>
              ) : null}
            </p>
            <ChevronDown
              onClick={() => setDisplayStatusModal(!displayStatusModal)}
            />
          </div>
          <div className={style.searchSelect}>
            <Calendar />
            Date
            <ChevronDown
              onClick={() => setDisplayDateModal(!displayDateModal)}
            />
          </div>
          <button type="button" className={style.buttonSearch}>
            <Link
              to={{
                pathname: "/decisions/search",
                search: createQueryParams(filters),
              }}
            >
              <Search />
            </Link>
          </button>
        </form>
        {displayStatusModal && status && (
          <div className={style.selectModal}>
            {status.map((item: StatusType) => (
              <div key={item.id}>
                <input
                  type="checkbox"
                  id={item.id.toString()}
                  name={item.name}
                  onChange={(event) => {
                    if (event.target.checked) {
                      addStatus(event);
                    } else {
                      removeStatus(event);
                    }
                  }}
                />
                <label htmlFor={item.id.toString()}>{item.name}</label>
              </div>
            ))}
          </div>
        )}
        {displayDateModal && (
          <div className={style.selectModal}>
            <input
              type="date"
              id="date"
              name="date"
              onChange={(event) => {
                if (event.target.checked) {
                  addStatus(event);
                } else {
                  removeStatus(event);
                }
              }}
            />
          </div>
        )}
      </div>
    </>
  );
}
